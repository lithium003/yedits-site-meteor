import { Meteor } from 'meteor/meteor';
import {
  ARTISTS,
  COMPS,
  EDITS
} from '/imports/api/collections/AvailableCollections';
import { db } from '/server/Firestore';
import { convertPath } from '/server/Firestore';
import { searchableName } from '/imports/utils/stringUtils';

Meteor.methods({
  async getComp(id) {
    try {
      const doc = await db.collection(COMPS).doc(id).get();

      const data = doc.data();
      if (data.art_path) {
        data.art_path = convertPath(data.art_path);
      }

      return {
        id: doc.id,
        ...data
      };
    } catch (error) {
      console.error('Error fetching comp:', error);
      throw new Meteor.Error(
        'firebase-error',
        `Failed to fetch comp with id ${id}`
      );
    }
  },

  async getCompEdits(id) {
    try {
      const snapshot = await db
        .collection(EDITS)
        .where('comp', '==', id)
        .orderBy('track_number')
        .get();
      // TODO turn `number` into an int rather than string so alphabetical sorting works

      const edits = snapshot.docs.map(doc => {
        const data = doc.data();

        if (data.art_path) {
          data.art_path = convertPath(data.art_path);
        }

        if (data.filepath) {
          data.filepath = convertPath(data.filepath);
        }

        return {
          id: doc.id,
          ...data
        };
      });

      return edits;
    } catch (error) {
      console.error('Error fetching edits from comp:', error);
      throw new Meteor.Error(
        'firebase-error',
        `Failed to fetch edits for comp with id ${id}`
      );
    }
  },

  async convertTracknums(compId) {
    try {
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
    } catch (error) {
      console.error('Error converting track numbers:', error);
      throw new Meteor.Error(
        'firebase-error',
        `Failed to convert track numbers for comp with id ${compId}`
      );
    }
  },

  async addArtistNameSearchField() {
    try {
      const artistsSnapshot = await db.collection(ARTISTS).get();

      const batch = db.batch();

      artistsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.name) {
          const nameSearch = searchableName(data.name);
          batch.update(doc.ref, { name_search: nameSearch });
        }
      });

      await batch.commit();
      return 'Artist name search field added successfully';
    } catch (error) {
      console.error('Error adding artist name search field:', error);
      throw new Meteor.Error(
        'firebase-error',
        'Failed to add artist name search field'
      );
    }
  },

  async addCompArtistNameField(compId) {
    try {
      const compDoc = await db.collection(COMPS).doc(compId).get();
      if (!compDoc.exists) {
        throw new Meteor.Error('not-found', `Comp with id ${compId} not found`);
      }

      const compData = compDoc.data();
      if (compData.artist) {
        console.log('Comp field `artist` exists:', compData.artist);
        const artistDoc = await db
          .collection(ARTISTS)
          .doc(compData.artist)
          .get();
        if (artistDoc.exists) {
          console.log('Artist document found:', artistDoc.id);
          const artistData = artistDoc.data();
          if (artistData.name) {
            console.log('Artist name found:', artistData.name);
            await db.collection(COMPS).doc(compId).update({
              artist_name: artistData.name
            });
          }
          return 'Artist name field added successfully';
        } else {
          throw new Meteor.Error('invalid-data', 'Artist name is missing');
        }
      } else {
        console.error('Comp field `artist` is missing');
      }
      throw new Meteor.Error('invalid-data', 'Comp field `artist` is missing');
    } catch (error) {
      console.error('Error adding artist name field to comp:', error);
      throw new Meteor.Error(
        'firebase-error',
        `Failed to add artist name field for comp with id ${compId}`
      );
    }
  }

  //
});
