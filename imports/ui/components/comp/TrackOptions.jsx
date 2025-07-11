import React from 'react';

export const TrackOptions = ({ onClose, playNext, playLast, share }) => {
  return (
    <>
      {/* Full-screen invisible background */}
      <div className="fixed inset-0 z-60 cursor-default" onClick={onClose} />

      {/* Options menu */}
      <div
        className="track-options absolute bottom-4 right-8 mb-2 bg-[#1c1c1d] rounded-lg p-1 shadow-lg z-70 w-48"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-2">
          <button
            onClick={playNext}
            className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Play Next
          </button>
          <button
            onClick={playLast}
            className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Play Last
          </button>
          <button
            onClick={share}
            className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Share
          </button>
          <button className="text-left hover:bg-gray-700 p-2 rounded cursor-pointer">
            Download
          </button>
        </div>
      </div>
    </>
  );
};
