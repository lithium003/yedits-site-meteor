import React, { useState } from 'react';
import { RiFilter3Line, RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AdvancedSearch } from './AdvancedSearch';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Advanced Search
  const [advancedOpen, setAdvancedOpen] = useState(false);
  // Object for resetting/default filters - list all filters & default values here
  const emptyFiltersObj = { era: '' };
  const [filters, setFilters] = useState(emptyFiltersObj);
  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };
  const resetFilters = () => {
    setFilters(emptyFiltersObj);
  };

  const handleSearch = e => {
    e.preventDefault();
    // if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm.trim()}`);
    console.log('Era:', filters.era);
  };

  return (
    <>
      <div className="relative">
        <form onSubmit={handleSearch}>
          <div className="flex items-center bg-[#1c1c1d] rounded-lg px-3 py-2">
            <RiSearchLine className="text-gray-400 mr-2" />
            <input
              type="text"
              className="bg-transparent text-white flex-1 outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
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
              filters={filters}
              handleFilterChange={handleFilterChange}
              resetFilters={resetFilters}
              onClose={() => setAdvancedOpen(false)}
              onSubmit={handleSearch}
            />
          )}
        </form>
      </div>
    </>
  );
};
