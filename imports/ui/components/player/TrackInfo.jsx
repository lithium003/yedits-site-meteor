import React from 'react';
import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';
import { BsMusicNoteBeamed } from 'react-icons/bs';

export const TrackInfo = () => {
  const { currentTrack } = useAudioPlayerContext();
  const {
    art_path = '/yedits-YE-logo-colour.webp',
    name = 'No Music Playing',
    yeditor_name = 'Click on a track to play it'
  } = currentTrack || {};

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-md overflow-hidden">
          {art_path ? (
            <img
              className="w-full h-full object-cover"
              src={art_path}
              alt={name}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded-md">
              <span className="text-xl text-gray-600">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="max-w-[200px] min-w-[200px]">
          <p className="font-bold lg:truncate lg:max-w-64">{name}</p>
          <p className="text-sm text-gray-400">{yeditor_name}</p>
        </div>
      </div>
    </>
  );
};
