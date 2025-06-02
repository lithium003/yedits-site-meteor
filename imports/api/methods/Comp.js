import { Meteor } from 'meteor/meteor';
import { COMPS, EDITS } from '/imports/api/collections/AvailableCollections';
import admin from 'firebase-admin';

const { projectId, clientEmail, privateKey } = Meteor.settings.private.firebase;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n')
    })
  });
}

const db = admin.firestore();

function convertPath(input) {
  // Remove the leading '/static'
  let output = input.replace(/^\/static/, '');

  // Replace all backslashes with forward slashes
  output = output.replace(/\\/g, '/');

  // Remove the trailing '.webp' extension
  output = output.replace(/\.webp$/, '');

  return output;
}

// Define Meteor Methods for SampleCollection (client-side calls)
Meteor.methods({
  async getTop5Comps() {
    try {
      const snapshot = await db
        .collection(COMPS)
        .orderBy('rating', 'desc')
        .limit(10)
        .get();

      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // console.log(results); // Or return to client via a Meteor method
      return results;
    } catch (error) {
      console.error('Error fetching top comps:', error);
      throw new Meteor.Error('firebase-error', 'Failed to fetch top comps');
    }
  },

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
