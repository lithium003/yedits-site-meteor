import { Meteor } from 'meteor/meteor';
import {
  COMPS,
  EDITS,
  YEDITORS
} from '/imports/api/collections/AvailableCollections';
import { convertPath, db } from '/server/Firestore';

Meteor.methods({
  async getSearchResults({
    collection = COMPS,
    searchTerm = '',
    era = null,
    lastId = null
  }) {
    const numResults = 5;

    try {
      // Ordering by name_search before rating would be more performance- and cost-
      // efficient, but this would mean when you search for "vultures"
      let query = await db.collection(collection);
      /* eslint-disable indent */
      switch (collection) {
        case COMPS:
          era && (query = query.where('era', '==', era));
          query = query
            .where('standalone_edit', '==', false)
            .where('name_search', '>=', searchTerm)
            .where('name_search', '<=', searchTerm + '\uf8ff')
            .orderBy('rating', 'desc')
            .orderBy('name_search')
            .orderBy('__name__')
            .limit(numResults);
          break;
        case EDITS:
          era && (query = query.where('era', '==', era));
          query = query
            .where('name_search', '>=', searchTerm)
            .where('name_search', '<=', searchTerm + '\uf8ff')
            .orderBy('rating', 'desc')
            .orderBy('name_search')
            .orderBy('__name__')
            .limit(numResults);
          break;
        case YEDITORS:
          query = query
            .where('display_name_search', '>=', searchTerm)
            .where('display_name_search', '<=', searchTerm + '\uf8ff')
            .orderBy('display_name_search')
            .orderBy('__name__')
            .limit(numResults);
          break;
        default:
          console.error(`Error fetching results for ${collection}`);
        // throw new Meteor.Error('firebase-error', 'Failed to fetch results');
      }
      /* eslint-enable indent */

      // We need the actual document ID, but we modify its elements when we return them as a list.
      // TODO: Find a way to keep the doc so we don't have to get() it again
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

      return results;
    } catch (error) {
      console.error(`Error fetching results for ${collection}: ${error}`);
      throw new Meteor.Error('firebase-error', 'Failed to fetch results');
    }
  }
});
