/**
 * Gets a JavaScript Date object from a Firestore timestamp.
 * If the timestamp is invalid or not provided, it returns a default date of 1991-01-01.
 * @param timestamp - the Firestore timestamp object
 * @returns a JavaScript Date object
 * @example
 * const date = getDateFromTimestamp({ _seconds: 1609459200 });
 */
export const getDateFromTimestamp = timestamp => {
  if (!timestamp) return new Date('1991-01-01');
  try {
    return new Date(timestamp._seconds * 1000);
  } catch (error) {
    console.error('Error getting date from timestamp:', error);
    return new Date('1991-01-01');
  }
};
