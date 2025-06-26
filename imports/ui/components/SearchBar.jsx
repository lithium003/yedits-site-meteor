import React from 'react';
import { RiFilter3Line, RiSearchLine } from 'react-icons/ri';

export const SearchBar = () => {
  return (
    <>
      <div className="relative rounded-full bg-white text-gray-500 p-2 flex items-center gap-2">
        <RiSearchLine color="grey" />
        Search...
        <RiFilter3Line color="grey" className="absolute right-4" />
      </div>
    </>
  );
};
