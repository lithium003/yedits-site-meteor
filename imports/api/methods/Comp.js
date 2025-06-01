import { Meteor } from 'meteor/meteor';
import { COMPS } from '/imports/api/collections/AvailableCollections';
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
  }
});
