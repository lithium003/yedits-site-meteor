import React from 'react';
import { Link } from 'react-router-dom';

export const CompItem = ({ data }) => {
  // Destructure fields from the first item.
  // `comp` refers to the comp id and is only defined if an *edit* is passed in
  const { id, name, yeditor, yeditor_name, art_path, comp } = data;
  return (
    <>
      <div className="w-[200px] flex flex-col items-center justify-center space-y-2">
        <Link to={`/comp/${comp ? comp : id}`}>
          <img
            className="w-full h-[200px] rounded-xl object-cover mb-1"
            src={art_path}
            alt={name}
          />
        </Link>
        <Link
          to={`/comp/${comp ? comp : id}`}
          className="text-center text-md font-bold truncate mb-0 w-full"
        >
          <span className="hover:underline">{name}</span>
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
