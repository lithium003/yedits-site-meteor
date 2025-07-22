import { Meteor } from 'meteor/meteor';

/**
 * Fetches documents from a Firestore query and converts their path fields
 * from the existing flask-based structure to one that works with the Meteor project structure.
 * @param {*} query The Firestore query to execute
 * @param {*} convertPath The function to convert document paths
 * @returns An array of documents with converted paths
 */
export async function getDocsWithConvertedPaths(query, convertPath) {
  const snapshot = await query.get();
  return snapshot.docs.map(doc => {
    const data = doc.data();
    if (data.art_path) data.art_path = convertPath(data.art_path);
    if (data.filepath) data.filepath = convertPath(data.filepath);
    return { id: doc.id, ...data };
  });
}

/**
 * Handles errors in Firebase method calls in Meteor methods.
 * @param {*} fn The function to execute
 * @param {*} errorMessage The error message to log if the function fails
 * @param  {...any} args Any arguments to pass to the function
 * @returns
 */
export async function handleMethod(fn, errorMessage, ...args) {
  try {
    return await fn(...args);
  } catch (error) {
    console.error(`${errorMessage}: ${error}`);
    throw new Meteor.Error(
      'firebase-error',
      `${errorMessage}: ${error.message}`
    );
  }
}
