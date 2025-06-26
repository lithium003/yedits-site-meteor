import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export const NavBar = () => (
  <>
    <nav
      className="
    sticky top-0 z-[1000]
    flex items-center
    bg-[#2c2c2d] px-4 py-2
    "
    >
      {/* Nav Links */}
      <div className="flex gap-4 w-1/4 min-w-fit">
        <Link to="/" className="text-white hover:bg-gray-600 px-3 py-2 rounded">
          Home
        </Link>
        <Link
          to="/Sample"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          Sample
        </Link>
        <Link
          to="/404"
          className="text-white hover:bg-gray-600 px-3 py-2 rounded"
        >
          404
        </Link>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-md">
          <SearchBar className="w-full" />
        </div>
      </div>

      {/* Add an empty div for symmetry */}
      <div className="w-1/4 min-w-fit bg-red-500 "></div>
    </nav>
  </>
);
