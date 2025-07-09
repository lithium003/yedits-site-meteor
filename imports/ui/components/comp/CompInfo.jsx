import { Link } from 'react-router-dom';
import React from 'react';

export const CompInfo = ({ comp }) => {
  const { name, yeditor, yeditor_name, art_path } = comp;

  return (
    <>
      <div className="w-[300px] flex flex-col items-center justify-center space-y-2">
        <img
          className="w-full h-[300px] rounded-xl object-cover mb-1"
          src={art_path}
          alt={name}
        />
        <span className="text-center text-md font-bold truncate mb-0 w-full">
          {name}
        </span>

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
