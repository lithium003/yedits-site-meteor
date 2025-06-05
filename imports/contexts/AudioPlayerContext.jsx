import { Meteor } from 'meteor/meteor';
import React, { createContext, useContext, useRef, useState } from 'react';

const AudioPlayerContext = createContext(undefined);
export const AudioPlayerProvider = ({ children, tracks }) => {
  const [queue, setQueue] = useState(tracks);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const contextValue = {
    currentTrack,
    setCurrentTrack,
    audioRef,
    progressBarRef,
    timeProgress,
    setTimeProgress,
    duration,
    setDuration,
    setTrackIndex,
    queue,
    setQueue,
    isPlaying,
    setIsPlaying
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
export const useAudioPlayerContext = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Meteor.Error(
      'useAudioPlayerContext must be used within an AudioPlayerProvider'
    );
  }
  return context;
};
