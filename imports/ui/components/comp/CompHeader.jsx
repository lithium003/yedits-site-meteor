import {
  faDownload,
  faPlay,
  faShareAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDateFromTimestamp } from '/imports/utils/firestoreHandling';

import { useAudioPlayerContext } from '/imports/contexts/AudioPlayerContext';

import { HeaderButton } from './HeaderButton';
import { HeaderTag } from './HeaderTag';
import { ERAS } from '/imports/utils/eras';

import { saveAs } from 'file-saver';
import JSZip from 'jszip';

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

  /**
   * Downloads all tracks in the comp as a ZIP file.
   * Uses JSZip to create the ZIP and FileSaver to trigger the download.
   * TODO: Maybe change this to a server-side solution for performance?
   */
  const download = async () => {
    if (edits.length === 0) {
      alert('No tracks available for download.');
      return;
    }
    const fullName = `${comp.name} - ${comp.yeditor_name}`;
    console.log(`Downloading ${fullName} as ZIP...`);
    const zip = new JSZip();

    // Fetch each file and add to zip
    for (const track of edits) {
      const response = await fetch(track.filepath); // e.g., "/static/music/foo.mp3"
      const blob = await response.blob();
      zip.file(`${track.name}.mp3`, blob);
    }

    // Generate zip and trigger download
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `${fullName}.zip`);
  };

  const selectedEra = ERAS.find(era => era.name === comp.era);
  const navigate = useNavigate();
  /**
   * Navigates to the search page showing all comps of this comp's era.
   */
  const navigateToEraSearch = () => {
    if (selectedEra) {
      navigate(
        `/search?q=&t=Remaster&t=Rework&t=Remix&t=Recreation&t=~&e=${selectedEra.name}`
      );
    }
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

            {/* Tags */}
            <div className="mb-2">
              <HeaderTag
                label={comp.era || 'Unknown Era'}
                style={
                  selectedEra && {
                    backgroundColor: selectedEra.style.backgroundColor,
                    color: selectedEra.style.color,
                    borderColor: selectedEra.style.borderColor
                  }
                }
                onClick={navigateToEraSearch}
              />
              <HeaderTag label={comp.artist_name || 'Unknown Artist'} />
              <HeaderTag
                label={
                  getDateFromTimestamp(comp.release_date).toLocaleString(
                    'default',
                    { day: '2-digit', month: 'short', year: 'numeric' }
                  ) || 'Unknown Date'
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
                onClick={download}
              />
              <HeaderButton label="Share" icon={faShareAlt} onClick={share} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
