import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => (
  <>
    <nav className="bg-gray-400 p-4 flex gap-2">
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
    </nav>
  </>
);
