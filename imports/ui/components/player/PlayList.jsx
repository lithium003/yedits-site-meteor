import React from 'react';

import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';
import { BsMusicNoteBeamed } from 'react-icons/bs';

export const PlayList = () => {
  const {
    queue = [],
    setIsPlaying,
    setCurrentTrack,
    trackIndex
  } = useAudioPlayerContext();
  const handleClick = track => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  console.log('Queue:', queue);
  console.log('Queue type:', typeof queue);
  return (
    <>
      <ul className="bg-[#4c4848] text-white max-h-72 overflow-y-auto">
        {queue.map((track, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 p-[0.5rem_10pm] cursor-pointer ${
              trackIndex === index ? 'bg-[#a66646]' : ''
            }`}
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(track);
              }
            }}
            onClick={() => handleClick(track)}
          >
            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-sm overflow-hidden">
              {track.art_path ? (
                <img
                  className="w-full h-full object-cover"
                  src={track.art_path}
                  alt={track.name}
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
              <p className="font-bold text-sm">{track.name}</p>
              <p className="text-sm text-gray-400">{track.yeditor_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
