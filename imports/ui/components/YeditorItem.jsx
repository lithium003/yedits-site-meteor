import React from 'react';
import { Link } from 'react-router-dom';

/**
 * An Item representing a Yeditor.
 * @param data - the Yeditor data object
 * @returns {JSX.Element}
 * @constructor
 */
export const YeditorItem = ({ data }) => {
  const { id, art_path, display_name } = data;
  const pageLink = `/yeditor/${id}`;
  return (
    <>
      <div className="w-[200px] flex flex-col items-center justify-center space-y-2">
        <Link to={pageLink}>
          <img
            className="w-full h-[200px] rounded-full object-cover mb-1"
            src={art_path}
            alt={display_name}
          />
        </Link>
        <Link
          to={pageLink}
          className="text-center text-md font-bold truncate mb-0 w-full"
        >
          <span className="hover:underline">{display_name}</span>
        </Link>
      </div>
    </>
  );
};
