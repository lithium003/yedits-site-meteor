import {
  faDownload,
  faPlay,
  faShareAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';
import { getDateFromTimestamp } from '/imports/utils/firestoreHandling';

import { useAudioPlayerContext } from '/imports/contexts/AudioPlayerContext';

import { HeaderButton } from './HeaderButton';
import { HeaderTag } from './HeaderTag';
import { ERAS } from '/imports/utils/eras';

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

  /**
   * Copies the comp URL to the clipboard.
   */
  const share = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Share URL copied to clipboard!');
  };

  const selectedEra = ERAS.find(era => era.name === comp.era);

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

            {/* Tags */}
            <div className="mb-2">
              <HeaderTag
                label={comp.era || 'Unknown Era'}
                style={
                  selectedEra
                    ? {
                        backgroundColor: selectedEra.style.backgroundColor,
                        color: selectedEra.style.color,
                        borderColor: selectedEra.style.borderColor
                      }
                    : {}
                }
              />
              <HeaderTag label={comp.artist_name || 'Unknown Artist'} />
              <HeaderTag
                label={
                  getDateFromTimestamp(comp.release_date)
                    .getFullYear()
                    .toString() || 'Unknown Artist'
                }
              />
              <HeaderTag label={comp.rating.toFixed(1) || '-'} icon={faStar} />
            </div>

            {/* Buttons */}
            <div className="mb-2">
              <HeaderButton label="Play All" icon={faPlay} onClick={playAll} />
              <HeaderButton
                label="Download"
                icon={faDownload}
                onClick={() => {}}
              />
              <HeaderButton label="Share" icon={faShareAlt} onClick={share} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
