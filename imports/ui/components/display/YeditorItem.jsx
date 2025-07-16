import React from 'react';
import { Link } from 'react-router-dom';
import { YeditorPhoto } from '../yeditor/YeditorPhoto';

/**
 * An Item representing a Yeditor.
 * @param yeditor - the Yeditor data object
 * @returns JSX
 * @constructor
 */
export const YeditorItem = ({ data }) => {
  const { id, display_name } = data;
  const pageLink = `/yeditor/${id}`;
  return (
    <>
      <div className="w-[200px] flex flex-col items-center justify-center space-y-2">
        <YeditorPhoto yeditor={data} size={200} />
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
