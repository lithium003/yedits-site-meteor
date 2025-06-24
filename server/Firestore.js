import { Meteor } from 'meteor/meteor';
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

console.log('Firebase initialized');

export const db = admin.firestore();

// TODO move these to a Utils file
export function convertPath(input) {
  // Remove the leading '/static'
  let output = input.replace(/^\/static/, '');

  // Replace all backslashes with forward slashes
  output = output.replace(/\\/g, '/');

  // Remove the trailing '.webp' extension
  output = output.replace(/\.webp$/, '');

  return output;
}
