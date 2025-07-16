import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../search/SearchBar';

export const NavBar = () => (
  <>
    <nav
      className="
        sticky top-0 z-50
        flex items-center
        bg-[#2c2c2d] px-4 py-2
      "
    >
      {/* Logo */}
      <Link to="/" className="flex items-center mr-3">
        <img
          src="/yedits-YE-logo-white.webp"
          className="w-14 h-14 object-contain" // Larger logo
          alt="Yedits Logo"
        />
      </Link>
      {/* Nav Links */}
      <div className="flex gap-1 w-1/4 min-w-fit items-center">
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
          <SearchBar />
        </div>
      </div>
      {/* Right-side empty div for symmetry */}
      <div className="w-1/4 min-w-fit"></div>
    </nav>
  </>
);
