import { Meteor } from 'meteor/meteor';
import { convertPath } from './Firestore';
import { COMPS } from '/imports/api/collections/AvailableCollections';

/**
 * Fetches documents from a Firestore query and converts their path fields
 * from the existing flask-based structure to one that works with the Meteor project structure.
 * @param {*} query The Firestore query to execute
 * @returns An array of documents with converted paths
 */
export async function getDocsWithConvertedPaths(query) {
  const snapshot = await query.get();
  return snapshot.docs.map(doc => {
    const data = doc.data();
    if (data.art_path) data.art_path = convertPath(data.art_path);
    if (data.filepath) data.filepath = convertPath(data.filepath);
    return { id: doc.id, ...data };
  });
}

export function mapDocWithPaths(doc) {
  const data = doc.data();
  if (data.art_path) data.art_path = convertPath(data.art_path);
  if (data.filepath) data.filepath = convertPath(data.filepath);
  return { id: doc.id, ...data };
}

export function mapDocsWithPaths(snapshot) {
  return snapshot.docs.map(mapDocWithPaths);
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

/**
 * Removes standalone edit comps from the query if the collection is COMPS.
 * @param {*} query
 * @param {*} collection
 * @returns the query with standalone edits removed if the collection is COMPS, the query itself otherwise.
 */
export function removeStandaloneEditComps(query, collection) {
  if (collection === COMPS) {
    return query.where('standalone_edit', '==', false);
  }
  return query;
}
