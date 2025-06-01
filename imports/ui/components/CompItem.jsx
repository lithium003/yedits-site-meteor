import React from 'react';
import { Link } from 'react-router-dom';

export const CompItem = ({ comp }) => {
  function convertPath(input) {
    // Remove the leading '/static'
    let output = input.replace(/^\/static/, '');

    // Replace all backslashes with forward slashes
    output = output.replace(/\\/g, '/');

    // Remove the trailing '.webp' extension
    output = output.replace(/\.webp$/, '');

    return output;
  }

  // Destructure fields from the first item
  const { id, name, yeditor, yeditor_name, art_path } = comp;
  const mod_art_path = convertPath(art_path);

  return (
    <>
      <div className="w-[200px] flex flex-col items-center justify-center space-y-2">
        <Link to={`/comp/${id}`}>
          <img
            className="w-full h-[200px] rounded-xl object-cover mb-1"
            src={mod_art_path}
            alt={name}
          />
        </Link>
        <Link
          to={`/comp/${id}`}
          className="text-center text-md font-bold truncate mb-0 w-full"
        >
          {name}
        </Link>
        <Link
          to={`/yeditor/${yeditor}`}
          className="text-gray-400 text-md truncate"
        >
          <span className="hover:underline">{yeditor_name}</span>
        </Link>
      </div>
    </>
  );
};
