import React from 'react';
import { TrackOption } from './TrackOption';

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
          <TrackOption label="Play Next" onClick={playNext} />
          <TrackOption label="Play Last" onClick={playLast} />
          <TrackOption label="Share" onClick={share} />
          <TrackOption label="Download" onClick={() => {}} />
        </div>
      </div>
    </>
  );
};
