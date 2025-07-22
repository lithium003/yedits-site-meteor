import { Meteor } from 'meteor/meteor';
import {
  ARTISTS,
  COMPS,
  EDITS
} from '/imports/api/collections/AvailableCollections';
import { searchableName } from '/imports/utils/stringUtils';
import { db } from '/server/Firestore';
import { handleMethod, mapDocsWithPaths, mapDocWithPaths } from '/server/utils';

Meteor.methods({
  /**
   * Gets a comp object by its ID.
   * @param {*} id
   * @returns
   */
  async getComp(id) {
    return handleMethod(async () => {
      const doc = await db.collection(COMPS).doc(id).get();
      return mapDocWithPaths(doc);
    }, `Failed to fetch comp with id ${id}`);
  },

  /**
   * Gets an array of all edits in a comp by its ID, ordered by track number.
   * @param {string} id
   * @returns {Promise<Array>} An array of edits in the comp.
   * @throws {Meteor.Error} If an error occurs during the operation.
   * @throws {Meteor.Error} If the comp with the given ID does not exist.
   * @throws {Meteor.Error} If an error occurs while fetching the edits.
   */
  async getCompEdits(id) {
    return handleMethod(async () => {
      const snapshot = await db
        .collection(EDITS)
        .where('comp', '==', id)
        .orderBy('track_number')
        .get();
      return mapDocsWithPaths(snapshot);
    }, `Failed to fetch edits for comp with id ${id}`);
  },

  async convertTracknums(compId) {
    return handleMethod(async () => {
      const editsSnapshot = await db
        .collection(EDITS)
        .where('comp', '==', compId)
        .get();
      const batch = db.batch();
      editsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.number) {
          const newNumber = parseInt(data.number, 10);
          if (!isNaN(newNumber)) {
            batch.update(doc.ref, { track_number: newNumber });
          }
        }
      });
      await batch.commit();
      return 'Track numbers converted successfully';
    }, `Failed to convert track numbers for comp with id ${compId}`);
  },

  /**
   * Adds a name_search field with a searchable name for all artists.
   * Makes the artists work with the artist search bar in Advanced Search.
   *
   * @returns {Promise<string>} A message indicating success or failure.
   * @throws {Meteor.Error} If an error occurs during the operation.
   */
  async addArtistNameSearchField() {
    return handleMethod(async () => {
      const artistsSnapshot = await db.collection(ARTISTS).get();
      const batch = db.batch();
      artistsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.name) {
          batch.update(doc.ref, { name_search: searchableName(data.name) });
        }
      });
      await batch.commit();
      return 'Artist name search field added successfully';
    }, 'Failed to add artist name search field');
  },

  /**
   * Gets the name of the comp's artist by the id in its `artist` field, and assigns it as `artist_name`.
   *
   * @param {*} compId
   * @returns
   */
  async addCompArtistNameField(compId) {
    return handleMethod(async () => {
      const compDoc = await db.collection(COMPS).doc(compId).get();
      if (!compDoc.exists) {
        throw new Meteor.Error('not-found', `Comp with id ${compId} not found`);
      }
      const compData = compDoc.data();
      if (!compData.artist) {
        throw new Meteor.Error(
          'invalid-data',
          'Comp field `artist` is missing'
        );
      }
      const artistDoc = await db.collection(ARTISTS).doc(compData.artist).get();
      if (!artistDoc.exists || !artistDoc.data().name) {
        throw new Meteor.Error('invalid-data', 'Artist name is missing');
      }
      await db.collection(COMPS).doc(compId).update({
        artist_name: artistDoc.data().name
      });
      return 'Artist name field added successfully';
    }, `Failed to add artist name field for comp with id ${compId}`);
  },

  /**
   * Gets the name of the ALL comps' artists by the id in its `artist` field, and assigns it as `artist_name`.
   *
   * @returns
   */
  async addAllCompsArtistNameField() {
    return handleMethod(async () => {
      const compsSnapshot = await db.collection(COMPS).get();
      const batch = db.batch();
      for (const doc of compsSnapshot.docs) {
        const data = doc.data();
        if (data.artist) {
          const artistDoc = await db.collection(ARTISTS).doc(data.artist).get();
          const artistData = artistDoc.data();
          if (artistData && artistData.name) {
            batch.update(doc.ref, { artist_name: artistData.name });
          }
        }
      }
      await batch.commit();
      return 'Artist name search field added to all comps successfully';
    }, 'Failed to add artist name search field to all comps');
  }
});
