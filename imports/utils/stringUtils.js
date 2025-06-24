export const searchableName = name => {
  /**
   * Converts a name to a more searchable version of itself, removing symbols, spaces, and uppercase so that searches are more friendly to mixing up such things.
   * For instance, both 'back outside' and 'BACKOUTSIDE' will return 'backoutside'.
   * @param {string} name - The name to convert.
   * @returns {string} The searchable version of `name`.
   */

  // Replace ¥ and $ symbols with their letter counterparts
  let nameSearch = name.replace(/¥/g, 'Y');
  nameSearch = nameSearch.replace(/\$/g, 'S');

  // Put everything in lowercase
  nameSearch = nameSearch.toLowerCase();

  // Remove all symbols (anything that's not a word character)
  nameSearch = nameSearch.replace(/[^\w]/g, '');

  return nameSearch;
};
