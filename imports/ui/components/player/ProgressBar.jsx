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

  const formatTime = time => {
    if (typeof time === 'number' && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      // Convert to m:ss format
      const formatMinutes = minutes.toString();
      const formatSeconds = seconds.toString().padStart(2, '0');
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <>
      <div className="flex items-center justify-center gap-5 w-full">
        <span>{formatTime(timeProgress)}</span>
        <input
          ref={progressBarRef}
          className="max-w-[80%] bg-gray-300"
          type="range"
          defaultValue="0"
          onChange={handleProgressChange}
        />
        <span>{formatTime(duration)}</span>
      </div>
    </>
  );
};
