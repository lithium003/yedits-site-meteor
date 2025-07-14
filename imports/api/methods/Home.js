// @ts-nocheck
const { Meteor } = require('meteor/meteor');
import { convertPath, db } from '/server/Firestore';
import { COMPS } from '../collections/AvailableCollections';

Meteor.methods({
  async getTopWorks({ collection: collection = COMPS }) {
    try {
      let query = db.collection(collection);
      // Filter out standalone edits if necessary
      if (collection === COMPS) {
        query = query.where('standalone_edit', '==', false);
      }
      query = query.orderBy('rating', 'desc').limit(10);
      const snapshot = await query.get();

      const results = snapshot.docs.map(doc => {
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

      // console.log(results); // Or return to client via a Meteor method
      return results;
    } catch (error) {
      console.error('Error fetching top comps:', error);
      throw new Meteor.Error('firebase-error', 'Failed to fetch top comps');
    }
  },

  async getNewReleases({ collection: collection = COMPS }) {
    try {
      let query = db.collection(collection);
      // Filter out standalone edits if necessary
      if (collection === COMPS) {
        query = query.where('standalone_edit', '==', false);
      }
      query = query.orderBy('release_date', 'desc').limit(10);
      const snapshot = await query.get();

      const results = snapshot.docs.map(doc => {
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

      // console.log(results); // Or return to client via a Meteor method
      return results;
    } catch (error) {
      console.error('Error fetching new releases:', error);
      throw new Meteor.Error('firebase-error', 'Failed to fetch new releases');
    }
  },

  async getRecentlyAdded({ collection: collection = COMPS }) {
    try {
      // TODO eventually filter out recently released

      let query = db.collection(collection);
      // Filter out standalone edits if necessary
      if (collection === COMPS) {
        query = query.where('standalone_edit', '==', false);
      }
      query = query.orderBy('added_date', 'desc').limit(10);
      const snapshot = await query.get();

      const results = snapshot.docs.map(doc => {
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

      // console.log(results); // Or return to client via a Meteor method
      return results;
    } catch (error) {
      console.error('Error fetching recently added:', error);
      throw new Meteor.Error(
        'firebase-error',
        'Failed to fetch recently added'
      );
    }
  },

  // In your Meteor methods (Home.js)
  async getSpotlightedYeditor() {
    try {
      const doc = await db.collection('config').doc('yeditor_spotlight').get();
      if (!doc.exists)
        throw new Meteor.Error('not-found', 'No spotlighted Yeditor found');
      const spotlightId = doc.data().id_1;
      const yeditorDoc = await db.collection('yeditors').doc(spotlightId).get();
      if (!yeditorDoc.exists)
        throw new Meteor.Error('not-found', 'Yeditor not found');
      return { id: spotlightId, ...yeditorDoc.data() };
    } catch (error) {
      console.error('Error fetching spotlighted Yeditor:', error);
      throw new Meteor.Error(
        'firebase-error',
        'Failed to fetch spotlighted Yeditor'
      );
    }
  }
});
