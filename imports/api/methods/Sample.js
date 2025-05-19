import { Meteor } from 'meteor/meteor';
import { SampleCollection } from '/imports/api/collections/Sample';
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
  async sampleCopiesInc(sampleId, amount) {
    // const sample = await SampleCollection.findOneAsync(
    //   { _id: sampleId },
    //   { fields: { copies: 1 } }
    // );
    // await SampleCollection.updateAsync(sampleId, {
    //   $set: { copies: sample.copies + amount } // $inc validation doesn't work. Use $set to workaround, see https://github.com/Meteor-Community-Packages/meteor-collection2/issues/12
    // });
    // await SampleCollection.updateAsync(sampleId, { $inc: { copies: amount } }); // $inc directly increments copies field by the amount, (validation not working)
    try {
      const snapshot = await db
        .collection('comps')
        .orderBy('rating', 'desc')
        .limit(5)
        .get();

      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(results); // Or return to client via a Meteor method
      return results;
    } catch (error) {
      console.error('Error fetching top comps:', error);
      throw new Meteor.Error('firebase-error', 'Failed to fetch top comps');
    }
  }
});
