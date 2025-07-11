import React from 'react';
import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';
import { RiMoreFill } from 'react-icons/ri';
import { TrackOptions } from './TrackOptions';

export const Track = ({
  edit,
  highlight,
  optionsOpen,
  onOptionsToggle,
  onClose
}) => {
  const { id, number, name, length } = edit;
  const { currentTrack, setCurrentTrack, queue, setQueue } =
    useAudioPlayerContext();

  const handlePlay = () => {
    setCurrentTrack(edit);
  };

  const handleAddToQueue = () => {
    setQueue([...queue, edit]);
  };

  const handleOptionsClick = e => {
    e.stopPropagation();
    onOptionsToggle();
  };

  return (
    <>
      <div className="relative">
        <div
          className={`
        flex items-center justify-between
        text-white
        hover:bg-gray-700 cursor-pointer
        rounded px-4 py-4 
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
          <div className="flex items-center text-[#A2A2EE] text-right">
            <span className="w-16 px-4">{length}</span>
            <button
              className="hover:text-white flex items-center justify-center"
              onClick={handleOptionsClick}
            >
              <RiMoreFill />
            </button>
          </div>
        </div>
        {optionsOpen && (
          <TrackOptions
            onClose={onClose}
            edit={edit}
            handleAddToQueue={handleAddToQueue}
          />
        )}
      </div>
    </>
  );
};
