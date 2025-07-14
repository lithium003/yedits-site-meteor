import admin from 'firebase-admin';
import { Meteor } from 'meteor/meteor';

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
  // let output = input.replace(/^\/static/, '');
  //  let output = input.replace(/^\/static/, 'http://192.168.0.132:3001');

  // Replace all backslashes with forward slashes
  let output = input.replace(/\\/g, '/');

  // Remove the trailing '.webp' extension
  // NOTE: BIGGER PNGS (1-2MB) CAUSE SOME CHOPPINESS WHEN LOADING IN ON THE COMPSHELF.
  // COMMENTING THIS OUT TO ALLOW WEBPS FIXES THIS.
  // output = output.replace(/\.webp$/, '');
  console.log(output);
  return output;
}
