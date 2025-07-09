const { Meteor } = require('meteor/meteor');
import { convertPath, db } from '/server/Firestore';
import { COMPS } from '../collections/AvailableCollections';

Meteor.methods({
  async getTopWorks({ collection: collection = COMPS }) {
    try {
      const snapshot = await db
        .collection(collection)
        .orderBy('rating', 'desc')
        .limit(10)
        .get();

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
      const snapshot = await db
        .collection(collection)
        .orderBy('release_date', 'desc')
        .limit(10)
        .get();

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
      const snapshot = await db
        .collection(collection)
        .orderBy('added_date', 'desc')
        .limit(10)
        .get();

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
  }
});
