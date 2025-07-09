import React from 'react';
import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';

export const Track = ({ edit, highlight }) => {
  const { id, filepath, number, name, length } = edit;
  const { currentTrack, setCurrentTrack, queue, setQueue } =
    useAudioPlayerContext();

  const handlePlay = () => {
    setCurrentTrack(edit);
  };

  const handleAddToQueue = () => {
    setQueue([...queue, edit]);
  };

  return (
    <>
      <div
        className={`
        flex items-center justify-between
        text-white font-mono
        hover:bg-gray-700 cursor-pointer
        rounded px-4 py-2 
        ${
          id === currentTrack.id
            ? 'border-l-4 border-red-500'
            : highlight && 'border-l-4 border-yellow-500'
        }
        `}
        // Current marker and Highlight marker have to be mutually exclusive
        // or else Highlight can override Current marker.
        onClick={handlePlay}
      >
        <span className="w-8 text-center">{number}</span>
        <span className="flex-1 px-4 truncate">{name}</span>
        <span className="w-16 text-right px-4">{length}</span>
      </div>
    </>
  );
};
