import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { RiCloseLargeFill, RiFilter3Line, RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AdvancedSearch } from './AdvancedSearch';
import { tags } from '../../../utils/tags';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Advanced Search
  const [advancedOpen, setAdvancedOpen] = useState(false);
  // Object for resetting/default filters - list all filters & default values here
  const [allArtists, setAllArtists] = useState([]);

  // Filters
  const [artistFilter, setArtistFilter] = useState('');
  const [tagsFilter, setTagsFilter] = useState([...tags, '~']);
  const [eraFilter, setEraFilter] = useState('');
  // Bundle up all the filter states and setStates for ease of passing as parameters.
  // Avoids having to type out many params and changing them in multiple places when filters are changed.
  const filters = {
    artistFilter,
    setArtistFilter,
    tagsFilter,
    setTagsFilter,
    eraFilter,
    setEraFilter
  };

  useEffect(() => {
    console.log('Search Bar Mounted');
    // Grab all the artists from the backend, to be potentially searched through in the Advanced Filters.
    // Grabbing them here rather than in AdvancedSearch to avoid querying every open/close of that window.
    Meteor.call('getAllArtists', (err, res) => {
      if (err) {
        console.error('Failed to fetch next results:', err);
      } else {
        setAllArtists(res);
      }
    });
  }, []);

  /**
   * Generates the search url with all the searchParams and navigates to it.
   * @param e
   */
  const handleSearch = e => {
    e.preventDefault();
    // if (!searchTerm.trim()) return; //UNCOMMENT THIS IF YOU WANT TO DISALLOW EMPTY SEARCHES
    setAdvancedOpen(false);
    const artistString = artistFilter ? `&a=${artistFilter}` : '';
    const tagString = tagsFilter.map(tag => `&t=${tag}`).join('');
    const eraString = eraFilter ? `&e=${eraFilter}` : '';
    const navString =
      `/search?q=${searchTerm.trim()}` + tagString + artistString + eraString;
    navigate(navString);
  };

  return (
    <>
      <div className="relative">
        <form onSubmit={handleSearch}>
          <label>
            <div className="flex items-center bg-[#1c1c1d] rounded-lg px-3 py-2">
              <RiSearchLine className="text-gray-400 mr-2" />
              <input
                type="text"
                className="bg-transparent text-white flex-1 outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors px-1"
                  onClick={() => setSearchTerm('')}
                >
                  <RiCloseLargeFill />
                </button>
              )}

              <button
                type="button"
                onClick={() => setAdvancedOpen(prev => !prev)}
                className={`text-gray-400 hover:text-white transition-colors ${
                  advancedOpen ? 'text-white' : ''
                }`}
              >
                <RiFilter3Line />
              </button>
            </div>
            {advancedOpen && (
              <AdvancedSearch
                allArtists={allArtists}
                filters={filters}
                onClose={() => setAdvancedOpen(false)}
                onSubmit={handleSearch}
              />
            )}
          </label>
        </form>
      </div>
    </>
  );
};
