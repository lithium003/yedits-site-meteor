import React from 'react';
import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';
export const ProgressBar = () => {
  const { progressBarRef, audioRef, timeProgress, duration } =
    useAudioPlayerContext();
  const handleProgressChange = () => {
    console.log('test');
    if (audioRef.current && progressBarRef.current) {
      const newTime = Number(progressBarRef.current.value);
      audioRef.current.currentTime = newTime;
    }
  };
  return (
    <>
      <div className="flex items-center justify-center gap-5 w-full">
        <span>{timeProgress}</span>
        <input
          ref={progressBarRef}
          className="max-w-[80%] bg-gray-300"
          type="range"
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span>{duration}</span>
      </div>
    </>
  );
};
