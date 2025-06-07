import React, { useState } from 'react';
import { useAudioPlayerContext } from '../../contexts/AudioPlayerContext';
import { TrackPopup } from './TrackPopup';

export const Track = ({ edit }) => {
  const { filepath, number, name, length } = edit;
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
        className="flex items-center justify-between text-white font-mono hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
        onClick={handlePlay}
      >
        <span className="w-8 text-center">{number}</span>
        <span className="flex-1 px-4 truncate">{name}</span>
        <span className="w-16 text-right px-4">{length}</span>
        <TrackPopup editId={edit.id} />
      </div>
    </>
  );
};
