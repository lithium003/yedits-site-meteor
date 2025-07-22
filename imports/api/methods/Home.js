// @ts-nocheck
const { Meteor } = require('meteor/meteor');
import { convertPath, db } from '/server/Firestore';
import { COMPS } from '../collections/AvailableCollections';
import {
  getDocsWithConvertedPaths,
  handleMethod,
  removeStandaloneEditComps
} from '/server/utils';

const shelfLimit = 5;

Meteor.methods({
  /**
   * Fetches the top works (comps/edits) in the database.
   * @param {*} collection The Firestore collection to fetch top works from, defaults to COMPS
   * @returns An array of the top works.
   */
  async getTopWorks({ collection = COMPS }) {
    return handleMethod(async () => {
      let query = db.collection(collection);
      query = removeStandaloneEditComps(query, collection);
      query = query.orderBy('rating', 'desc').limit(shelfLimit);
      return await getDocsWithConvertedPaths(query, convertPath);
    }, `Failed to fetch top ${collection}`);
  },

  /**
   * Fetches the most recently released works (comps/edits) in the database.
   * @param {*} collection The Firestore collection to fetch new releases from, defaults to COMPS
   * @returns An array of the most recently released works.
   */
  async getNewReleases({ collection = COMPS }) {
    return handleMethod(async () => {
      let query = db.collection(collection);
      query = removeStandaloneEditComps(query, collection);
      query = query.orderBy('release_date', 'desc').limit(shelfLimit);
      return await getDocsWithConvertedPaths(query, convertPath);
    }, `Failed to fetch newly released ${collection}`);
  },

  /**
   * Fetches the most recently added works (comps/edits) in the database.
   * @param {*} collection The Firestore collection to fetch recently added works from, defaults to COMPS
   * @returns An array of the most recently added works.
   */
  async getRecentlyAdded({ collection = COMPS }) {
    return handleMethod(async () => {
      let query = db.collection(collection);
      query = removeStandaloneEditComps(query, collection);
      query = query.orderBy('added_date', 'desc').limit(shelfLimit);
      return await getDocsWithConvertedPaths(query, convertPath);
    }, `Failed to fetch recently added ${collection}`);
  },

  /**
   * Fetches the spotlighted Yeditor id and fetches its document.
   * @returns The spotlighted Yeditor document.
   */
  async getSpotlightedYeditor() {
    return handleMethod(async () => {
      const configDoc = await db
        .collection('config')
        .doc('yeditor_spotlight')
        .get();
      if (!configDoc.exists) {
        throw new Meteor.Error('not-found', 'No spotlighted Yeditor found');
      }
      const spotlightId = configDoc.data().id_1;
      const yeditorDoc = await db.collection('yeditors').doc(spotlightId).get();
      if (!yeditorDoc.exists) {
        throw new Meteor.Error('not-found', 'Yeditor not found');
      }
      return { id: spotlightId, ...yeditorDoc.data() };
    }, 'Failed to fetch spotlighted Yeditor');
  }
});
