import React, { ChangeEvent, useEffect, useState } from 'react';
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from 'react-icons/io';
import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';

export const VolumeControl = () => {
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const handleVolumeChange = e => {
    setVolume(Number(e.target.value));
  };

  const { audioRef } = useAudioPlayerContext();
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  return (
    <>
      <div className="flex items-center gap-3">
        <button onClick={() => setMuteVolume(prev => !prev)}>
          {muteVolume || volume === 0 ? (
            <IoMdVolumeOff size={25} />
          ) : volume < 40 ? (
            <IoMdVolumeLow size={25} />
          ) : (
            <IoMdVolumeHigh size={25} />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          className="volume"
          onChange={handleVolumeChange}
          style={{
            background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)`
          }}
        />
      </div>
    </>
  );
};
