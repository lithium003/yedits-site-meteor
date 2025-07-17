import {
  faDownload,
  faPlay,
  faShareAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { PillCheckbox } from '../search/PillCheckbox';
import { getDateFromTimestamp } from '/imports/utils/firestoreHandling';

import { useAudioPlayerContext } from '/imports/contexts/AudioPlayerContext';

export const CompHeader = ({ comp, edits = [] }) => {
  const { setQueue, setCurrentTrack, setTrackIndex, setIsPlaying } =
    useAudioPlayerContext();

  const playAll = () => {
    const newQueue = edits;
    setQueue(newQueue);
    const newIndex = 0;
    setTrackIndex(newIndex);
    setCurrentTrack(newQueue[newIndex]);
    setIsPlaying(true);
  };

  return (
    <>
      <section className="text-center mb-8 w-full ">
        <div className="flex items-start justify-center gap-12 border-t-4 border-purple-600 bg-[#2c2c2d] rounded-4xl px-8 py-6">
          {/* Comp Art */}
          <div className="mt-4 w-64 h-64 rounded-xl overflow-hidden">
            <img
              src={comp.art_path}
              alt={comp.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Comp Info */}
          <div className="flex-1 items-start text-left ">
            <h1 className="text-7xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              {comp.name}
            </h1>
            <Link to={`/yeditor/${comp.yeditor}`}>
              <span className="text-3xl font-bold text-indigo-300 mb-2">
                {comp.yeditor_name || 'Unknown Yeditor'}
              </span>
            </Link>
            <p className="text-xl text-gray-300 mb-2 max-w-2xl">
              {comp.desc || 'No description provided.'}
            </p>
            <div className="mb-2">
              <PillCheckbox
                label={comp.era || 'Unknown Era'}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
              />
              <PillCheckbox
                label={comp.artist_name || 'Unknown Artist'}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
              />
              <PillCheckbox
                label={
                  getDateFromTimestamp(comp.release_date)
                    .getFullYear()
                    .toString() || 'Unknown Artist'
                }
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
              />
              <PillCheckbox
                label={comp.rating.toFixed(1) || '-'}
                icon={faStar}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
              />
            </div>
            <div className="mb-2">
              <PillCheckbox
                label="Play All"
                icon={faPlay}
                onClick={playAll}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
                pillClassName="text-2xl px-6 py-3"
              />
              <PillCheckbox
                label="Download"
                icon={faDownload}
                onClick={() => {}}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
                pillClassName="text-2xl px-6 py-3"
              />
              <PillCheckbox
                label="Share"
                icon={faShareAlt}
                onClick={() => {}}
                type="tag"
                activeColor="bg-blue-500"
                inactiveColor="bg-gray-300"
                textColor="text-white"
                className="px-0.5"
                pillClassName="text-2xl px-6 py-3"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
