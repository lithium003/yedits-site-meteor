import React, { useState } from 'react';
import { RiFilter3Line, RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = e => {
    e.preventDefault();
    // if (!searchTerm.trim()) return;
    navigate(`/search?q=${searchTerm.trim()}`);
  };

  return (
    <>
      <div className="relative rounded-full bg-white text-black p-2 flex items-center gap-2">
        <RiSearchLine color="grey" />
        <form onSubmit={handleSearch} className="flex-1">
          <input
            className="w-full outline-none"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </form>
        <RiFilter3Line color="grey" className="" />
      </div>
    </>
  );
};
