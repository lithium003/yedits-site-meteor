import React from 'react';

export const TrackOption = ({ label, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer"
      >
        {label}
      </button>
    </>
  );
};
