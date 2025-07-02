import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { RiCloseLargeFill, RiFilter3Line, RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AdvancedSearch } from './AdvancedSearch';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Advanced Search
  const [advancedOpen, setAdvancedOpen] = useState(false);
  // Object for resetting/default filters - list all filters & default values here
  const emptyFiltersObj = {
    artist: '',
    era: '',
    tags: ['t1', 'Remaster', 'Rework', 'Remix', 'Recreation']
  }; // TODO maybe remove the t1 and find another way to avoid empty array problem, maybe in the backend
  const [filters, setFilters] = useState(emptyFiltersObj);
  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };
  const resetFilters = () => {
    setFilters(emptyFiltersObj);
  };

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    console.log('Search Bar Mounted');
    Meteor.call('getAllArtists', (err, res) => {
      if (err) {
        console.error('Failed to fetch next results:', err);
      } else {
        setArtists(res);
        console.log('Artists:', res);
      }
    });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    // if (!searchTerm.trim()) return;
    setAdvancedOpen(false);
    const era = filters.era;
    const eraString = era ? `&e=${era}` : '';
    const tags = filters.tags;
    const tagString = tags.map(tag => `&t=${tag}`).join('');
    const artist = filters.artist.id; // Artist is an object so that id can be sent to backend? Grab the id for the url.
    const artistString = artist ? `&a=${artist}` : '';
    const navString =
      `/search?q=${searchTerm.trim()}` + tagString + artistString + eraString;
    navigate(navString);
    console.log('Era:', filters.era);
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
                artists={artists}
                filters={filters}
                handleFilterChange={handleFilterChange}
                resetFilters={resetFilters}
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
