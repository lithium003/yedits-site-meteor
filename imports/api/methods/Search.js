// @ts-nocheck
import { Meteor } from 'meteor/meteor';
import {
  ARTISTS,
  COMPS,
  EDITS,
  YEDITORS
} from '/imports/api/collections/AvailableCollections';
import { db } from '/server/Firestore';
import { getDocsWithConvertedPaths, handleMethod } from '/server/utils';

Meteor.methods({
  async getSearchResults({
    collection = COMPS,
    searchTerm = '',
    era = null,
    tags = [],
    artistId = null,
    lastId = null
  }) {
    const numResults = 5;
    return handleMethod(async () => {
      let query = db.collection(collection);

      if (era) {
        if (collection !== YEDITORS) {
          query = query.where('era', '==', era);
        } else {
          return {};
        }
      }

      if (collection !== YEDITORS) {
        query = query.where('tags', 'array-contains-any', tags);
        if (artistId) {
          query = query.where('artist', '==', artistId);
        }
      }
      // Ordering by name_search before rating would be more performance- and cost-
      // efficient, but this would mean when you search for "vultures" you get
      // all comps called 'vultures' before ones called 'vultures 2' even if they're
      // lowly rated random vultures comps.
      switch (collection) {
        case COMPS:
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
          throw new Meteor.Error(
            'firebase-error',
            `Unknown collection: ${collection}`
          );
      }

      if (lastId) {
        const lastDoc = await db.collection(collection).doc(lastId).get();
        query = query.startAfter(lastDoc);
      }

      return await getDocsWithConvertedPaths(query);
    }, `Error fetching results for ${collection}`);
  },

  async getAllArtists() {
    return handleMethod(async () => {
      const snapshot = await db.collection(ARTISTS).get();
      return snapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data
          };
        })
        .filter(artist => artist.name);
    }, 'Error fetching list of all artists');
  }
});
