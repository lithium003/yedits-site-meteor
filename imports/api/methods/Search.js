// @ts-nocheck
import { Meteor } from 'meteor/meteor';
import {
  ARTISTS,
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
    tags = [],
    artistId = null,
    lastId = null
  }) {
    const numResults = 5;
    try {
      // Ordering by name_search before rating would be more performance- and cost-
      // efficient, but this would mean when you search for "vultures" you get
      // all comps called 'vultures' before ones called 'vultures 2' even if they're
      // lowly rated random vultures comps.
      let query = await db.collection(collection);
      if (era) {
        if (collection !== YEDITORS) {
          query = query.where('era', '==', era);
        } else {
          // Avoid unnecessary query, as yeditors don't have eras and wont be displayed
          return {};
        }
      }
      // TODO find a way to avoid this repeated yeditor special case check
      // Yeditors don't have tags, so don't search for them.
      // Since you're ALWAYS searching with tags unless you disable all of them, BUT WE NEVER DO THIS BC ARRAY_CONTAINS_ANY DOESNT WORK WITH AN EMPTY ARRAY
      // we still want to show yeditors even when tags are specified. JUST HAVE TO REQUIRE AT LEAST ONE TAG. ALTERNATIVELY COULD USE A DUMMY TAG TO SYMBOLIZE EMPTY
      if (collection !== YEDITORS) {
        query = query.where('tags', 'array-contains-any', tags);
        if (artistId) {
          if (artistId === '~') {
            artistId = 'NULL';
          }
          query = query.where('artist', '==', artistId);
        }
      }

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
          console.error(`Error fetching results for ${collection}`);
        // throw new Meteor.Error('firebase-error', 'Failed to fetch results');
      }

      // We need the actual document ID, but we modify its elements when we return them as a list.
      // TODO: Find a way to keep the doc so we don't have to get() it again
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
      console.error(`Error fetching results for ${collection}: ${error}`);
      throw new Meteor.Error('firebase-error', 'Failed to fetch results');
    }
  },

  async getAllArtists() {
    try {
      const query = db.collection(ARTISTS).get();
      const snapshot = await query;
      // noinspection UnnecessaryLocalVariableJS
      const results = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data
        };
      });
      return results;
    } catch (error) {
      console.error(`Error fetching list of all artists: ${error}`);
      throw new Meteor.Error('firebase-error', 'Failed to fetch artists');
    }
  }
});
