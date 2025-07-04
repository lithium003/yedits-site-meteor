import React, { useEffect, useState } from 'react';
import { ERAS } from '../../../utils/eras';
import { tags } from '../../../utils/tags';
import { PillCheckbox } from './PillCheckbox';
import { searchableName } from '../../../utils/stringUtils';
import { RiCloseLargeFill } from 'react-icons/ri';

export const AdvancedSearch = ({ allArtists, filters, onClose, onSubmit }) => {
  useEffect(() => {
    console.log('Advanced Search Mounted');
  }, []);

  // Grab the name of the currently selected artist if there is one.
  const currentArtistName = allArtists.find(
    artist => artist.id === filters.artistFilter
  )?.name;
  const [artistNameInput, setArtistNameInput] = useState(
    currentArtistName ? currentArtistName : '' // Ensure at least an empty string to avoid "uncontrolled input" warning
  );

  const [artistNameInputValid, setArtistNameInputValid] = useState(true);
  const [possibleArtistMatches, setPossibleArtistMatches] = useState([]);

  // NOTES FOR FUTURE CONSIDERATION ON STORING AND FILTERING ERAS AND ARTISTS
  // I want to input names since those are human-readable.
  // but edits/comps store the artist ID, not the artist NAME, so we need to get the ID for the backend.
  // I could just use the name for everything in the frontend and let the backend run a query to get the id but that's one extra query every artist-based search
  // I could maybe pass the 'allArtists' variable to the backend and lookup the ID with that? avoids a query but adds an extra thing to pass
  // this would probably mean linking someone to your artist-search URL would break, because allArtists might not exist?
  // I suppose querying for an artist with a given name would only read one document anyway so it's not a big deal... plus most people won't search for artists.
  // If we ever do different 'sites' for each artist, the artist id would be hardcoded there and we could avoid the query.
  // If we add other artist eras, we will *need* to filter by artist to see the eras?
  // Theoretically we could refrain from running the artist filter if we have an era filter, since any MBDTF comp is necessarily a Kanye comp?
  // - How could this affect collab artist comps, esp. fanmade ones like TMNG TOHR?
  // could store artists on disk like eras, potentially doing away with IDs entirely

  /**
   * Handle a change in the 'Artist' input field
   * @param name the user-inputted artist name
   */
  const handleArtistInput = name => {
    // Control the input component
    setArtistNameInput(name);
    // Reset the existing artist filter as a new artist is being input
    filters.setArtistFilter('');
    // Remove caps, symbols, etc.
    const searchableNameInput = searchableName(name);

    if (name) {
      // Find potential artist name matches to display
      const filteredData = allArtists.filter(artist => {
        return artist.name_search.startsWith(searchableNameInput);
      });
      setPossibleArtistMatches(filteredData);

      // Check if the input is (case and symbols notwithstanding) the name of an artist
      const selectedArtist = allArtists.find(
        artist => artist.name_search === searchableNameInput
      );
      const selectedArtistId = selectedArtist ? selectedArtist.id : '';
      filters.setArtistFilter(selectedArtistId);

      // Input is valid if it gives an artist
      setArtistNameInputValid(!!selectedArtist);
    } else {
      setPossibleArtistMatches([]);
      // Input is also valid if it is empty
      setArtistNameInputValid(true);
    }
  };

  /**
   * Resets the values of all the filter states as well as the inputs.
   */
  const resetFilters = () => {
    // Filters
    filters.setArtistFilter('');
    filters.setTagsFilter(['~', 'Remaster', 'Rework', 'Remix', 'Recreation']);
    filters.setEraFilter('');
    // Inputs
    setArtistNameInput('');
  };

  // Get the styling of the selected era option, to apply it to the era selector itself.
  const selectedEra = ERAS.find(era => era.name === filters.eraFilter);
  const selectStyle = selectedEra ? selectedEra.style : {};

  return (
    <>
      <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c1c1d] rounded-lg p-4 shadow-lg z-50">
        <div className="space-y-4">
          {/* Artist Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Artist</label>
            <div
              className={`flex items-center w-full bg-[#2c2c2d] text-white rounded px-3 py-2 ${!artistNameInputValid && 'inset-ring-2 inset-ring-red-500/50'}`}
            >
              <input
                type="text"
                value={artistNameInput}
                onChange={e => {
                  handleArtistInput(e.target.value);
                }}
                className="w-full h-full border-none text-white outline-none py-0.25"
                placeholder="Filter by artist..."
              />
              {artistNameInput && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors px-1"
                  onClick={() => handleArtistInput('')}
                >
                  <RiCloseLargeFill />
                </button>
              )}
            </div>

            {possibleArtistMatches.map(artist => (
              <div
                className="hover:underline hover:cursor-pointer"
                onClick={() => {
                  handleArtistInput(artist.name);
                  setPossibleArtistMatches([]);
                }}
                key={artist.id}
              >
                <p>{artist.name}</p>
              </div>
            ))}
          </div>
          {/* Tag Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags</label>
            {/* Rework */}
            <div className="">
              {tags.map(tag => (
                <PillCheckbox
                  key={tag}
                  label={tag}
                  checked={filters.tagsFilter.includes(tag)}
                  onChange={e =>
                    filters.setTagsFilter(
                      e.target.checked
                        ? [...filters.tagsFilter, tag]
                        : filters.tagsFilter.filter(t => t !== tag)
                    )
                  }
                  className="px-0.5"
                />
              ))}
            </div>
          </div>
          {/* Era Filter */}
          <div>
            <label className="block text-sm text-gray-400 mb-1">Era</label>
            <select
              value={filters.eraFilter}
              onChange={e => filters.setEraFilter(e.target.value)}
              className="w-full bg-[#2c2c2d] text-white rounded px-3 py-2"
              style={{
                ...selectStyle,
                fontWeight: selectedEra ? 'bold' : 'normal'
              }}
            >
              <option value="">Select an era...</option>
              {ERAS.map(era => (
                <option
                  key={era.id}
                  value={era.name}
                  style={{
                    ...era.style,
                    fontWeight: 'bold'
                  }}
                >
                  {era.name}
                </option>
              ))}
            </select>
          </div>

          {/* Apply/Reset Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Reset
            </button>
            <button
              onClick={onSubmit}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Overlay - Enables clicking off to close */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </>
  );
};
