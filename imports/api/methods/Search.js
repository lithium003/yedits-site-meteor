import { Meteor } from 'meteor/meteor';
import { COMPS } from '/imports/api/collections/AvailableCollections';
import { convertPath, db } from '/server/Firestore';

Meteor.methods({
  async getSearchResults({
    collection = COMPS,
    searchTerm = '',
    lastId = null
  }) {
    const numResults = 5;
    try {
      console.log(lastId);
      let query = await db
        .collection(collection)
        .where('name_search', '>=', searchTerm)
        .where('name_search', '<=', searchTerm + '\uf8ff')
        .orderBy('rating', 'desc')
        .orderBy('name_search')
        .orderBy('__name__')
        .limit(numResults);

      // We need the actual document ID, but we modify its elements when we return them as a list.
      // TODO: Find a way to keep the doc so we don't have to get() it again
      console.log('LASTID IS ', lastId);
      if (lastId) {
        const lastDoc = await db.collection(collection).doc(lastId).get();
        query = query.startAfter(lastDoc);
      }

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
      console.error(`Error fetching results for ${collection}: ${error}`);
      throw new Meteor.Error('firebase-error', 'Failed to fetch results');
    }
  }
});
