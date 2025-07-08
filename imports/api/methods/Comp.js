import { Meteor } from 'meteor/meteor';
import { COMPS, EDITS } from '/imports/api/collections/AvailableCollections';
import { db } from '/server/Firestore';
import { convertPath } from '/server/Firestore';

// Define Meteor Methods for SampleCollection (client-side calls)
Meteor.methods({
  async getComp(id) {
    try {
      const doc = await db.collection(COMPS).doc(id).get();

      const data = doc.data();
      if (data.art_path) {
        data.art_path = convertPath(data.art_path);
      }

      return {
        id: doc.id,
        ...data
      };
    } catch (error) {
      console.error('Error fetching comp:', error);
      throw new Meteor.Error(
        'firebase-error',
        `Failed to fetch comp with id ${id}`
      );
    }
  },

  async getCompEdits(id) {
    try {
      const snapshot = await db
        .collection(EDITS)
        .where('comp', '==', id)
        .orderBy('number')
        .get();
      // TODO turn `number` into an int rather than string so alphabetical sorting works

      const edits = snapshot.docs.map(doc => {
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

      return edits;
    } catch (error) {
      console.error('Error fetching edits from comp:', error);
      throw new Meteor.Error(
        'firebase-error',
        `Failed to fetch edits for comp with id ${id}`
      );
    }
  }
});
