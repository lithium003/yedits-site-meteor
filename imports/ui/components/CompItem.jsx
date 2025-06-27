import React from 'react';
import { Link } from 'react-router-dom';

/**
 * An Item representing a Comp or an Edit.
 * @param data - the Comp/Edit data object
 * @returns {JSX.Element}
 * @constructor
 */
export const CompItem = ({ data }) => {
  // Destructure fields from the data object.
  // `comp` refers to the comp id and is only defined if an *edit* is passed in
  const { id, name, yeditor, yeditor_name, art_path, comp, display_name } =
    data;

  // For edits, link to its comp with the given edit highlighted.
  const pageLink = comp ? `/comp/${comp}?h=${id}` : `/comp/${id}`;
  return (
    <>
      <div className="w-[200px] flex flex-col items-center justify-center space-y-2">
        <Link to={pageLink}>
          <img
            className="w-full h-[200px] rounded-xl object-cover mb-1"
            src={art_path}
            alt={name}
          />
        </Link>
        <Link
          to={pageLink}
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
