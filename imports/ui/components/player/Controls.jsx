import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';
import React from 'react';

export const Controls = () => {
  const { currentTrack } = useAudioPlayerContext();
  return (
    <>
      <audio src={currentTrack.src} controls />
    </>
  );
};
