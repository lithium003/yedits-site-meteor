import React from 'react';

import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';
import { BsMusicNoteBeamed } from 'react-icons/bs';

export const PlayList = () => {
  const { currentTrack, queue } = useAudioPlayerContext();

  return (
    <>
      <ul className="bg-[#4c4848] text-white max-h-72 overflow-y-auto">
        {queue.map((track, index) => (
          <li
            key={index}
            className={`flex items-center gap-3 p-[0.5rem_10pm] cursor-pointer ${
              currentTrack.title === track.title ? 'bg-[#a66646]' : ''
            }`}
          >
            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-sm overflow-hidden">
              {track.thumbnail ? (
                <img
                  className="w-full h-full object-cover"
                  src={track.thumbnail}
                  alt={track.title}
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
              <p className="font-bold text-sm">{track.title}</p>
              <p className="text-sm text-gray-400">{track.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
