import React from 'react';
import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';
import { BsMusicNoteBeamed } from 'react-icons/bs';

export const TrackInfo = () => {
  const { currentTrack } = useAudioPlayerContext();
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 flex itesm-center justiofy-center bg-gray-200 rounded-md overflow-hidden">
          {currentTrack.art_path ? (
            <img
              className="w-full h-full object-cover"
              src={currentTrack.art_path}
              alt={currentTrack.name}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
              <span className="text-xl text-gray-600">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div>
          <p className="font-bold lg:truncate lg:max-w-64">
            {currentTrack.name}
          </p>
          <p className="text-sm text-gray-400">{currentTrack.yeditor_name}</p>
        </div>
      </div>
    </>
  );
};
