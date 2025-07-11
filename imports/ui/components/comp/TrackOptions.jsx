import React from 'react';

export const TrackOptions = ({ edit, onClose, handleAddToQueue }) => {
  return (
    <>
      {/* Full-screen invisible background */}
      <div className="fixed inset-0 z-60 cursor-default" onClick={onClose} />

      {/* Options menu */}
      <div
        className="track-options absolute top-full left-0 right-0 mt-2 bg-[#1c1c1d] rounded-lg p-4 shadow-lg z-70 cursor-default"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-2">
          <button
            onClick={handleAddToQueue}
            className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Add to Queue
          </button>
          <button className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer">
            Download
          </button>
          <button className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer">
            Share
          </button>
        </div>
      </div>
    </>
  );
};
