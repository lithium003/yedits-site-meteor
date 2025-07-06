export const getDateFromTimestamp = timestamp => {
  if (!timestamp) return new Date('1991-01-01');
  try {
    return new Date(timestamp._seconds * 1000);
  } catch (error) {
    console.error('Error getting date from timestamp:', error);
    return new Date('1991-01-01');
  }
};
