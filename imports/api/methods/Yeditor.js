import { Meteor } from 'meteor/meteor';
import { COMPS, YEDITORS } from '../collections/AvailableCollections';
import { convertPath, db } from '/server/Firestore';

Meteor.methods({
  async getYeditor(id) {
    try {
      const doc = await db.collection(YEDITORS).doc(id).get();
      const data = doc.data();
      if (data.art_path) {
        data.art_path = convertPath(data.art_path);
      }

      return {
        id: doc.id,
        ...data
      };
    } catch (error) {
      console.error('Error fetching yeditor doc:', error);
      throw new Meteor.Error('firebase-error', 'Failed to fetch yeditor doc');
    }
  },

  async getYeditorWorks({
    collection = COMPS,
    numResults = 5,
    yeditorId = null,
    orderField = 'rating',
    orderDirection = 'desc',
    lastId = null
  }) {
    try {
      console.log('COLLECTION IN BACKEND:', collection);
      let query = db
        .collection(collection)
        .where('yeditor', '==', yeditorId)
        .orderBy(orderField, orderDirection)
        .limit(numResults);

      if (lastId) {
        const lastDoc = await db.collection(collection).doc(lastId).get();
        query = query.startAfter(lastDoc);
      }

      const snapshot = await query.get();
      // noinspection UnnecessaryLocalVariableJS
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
      return results;
    } catch (error) {
      console.error(
        `Error fetching top ${collection} for yeditor ${yeditorId}:`,
        error
      );
      throw new Meteor.Error(
        'firebase-error',
        `Failed to fetch top ${collection} for yeditor ${yeditorId}`
      );
    }
  }
});
