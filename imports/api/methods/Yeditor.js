import { Meteor } from 'meteor/meteor';
import { db } from '/server/Firestore';
import { YEDITORS, COMPS, EDITS } from '../collections/AvailableCollections';
import { convertPath } from '/server/Firestore';

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
      console.error('Error fetching yeditor document:', error);
      throw new Meteor.Error('firebase-error', 'Failed to fetch top comps');
    }
  }
});
