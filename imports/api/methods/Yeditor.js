// @ts-nocheck

import { Meteor } from 'meteor/meteor';
import { COMPS, YEDITORS } from '../collections/AvailableCollections';
import { db } from '/server/Firestore';
import {
  getDocsWithConvertedPaths,
  handleMethod,
  mapDocWithPaths
} from '/server/utils';

Meteor.methods({
  async getYeditor(id) {
    return handleMethod(async () => {
      const doc = await db.collection(YEDITORS).doc(id).get();
      if (!doc.exists) {
        throw new Meteor.Error('not-found', `Yeditor with id ${id} not found`);
      }
      const data = mapDocWithPaths(doc);
      return { id: doc.id, ...data };
    }, `Failed to fetch yeditor doc with id ${id}`);
  },

  async getYeditorWorks({
    collection = COMPS,
    numResults = 5,
    yeditorId = null,
    orderField = 'rating',
    orderDirection = 'desc',
    lastId = null
  }) {
    return handleMethod(async () => {
      let query = db.collection(collection);

      if (collection === COMPS) {
        query = query.where('standalone_edit', '==', false);
      }
      query = query
        .where('yeditor', '==', yeditorId)
        .orderBy(orderField, orderDirection)
        .limit(numResults);

      if (lastId) {
        const lastDoc = await db.collection(collection).doc(lastId).get();
        query = query.startAfter(lastDoc);
      }

      return await getDocsWithConvertedPaths(query);
    }, `Failed to fetch top ${collection} for yeditor ${yeditorId}`);
  }
});
