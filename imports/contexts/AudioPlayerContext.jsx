import { Meteor } from 'meteor/meteor';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react';

const AudioPlayerContext = createContext(undefined);
export const AudioPlayerProvider = ({ children, tracks }) => {
  if (tracks === undefined) {
    tracks = [
      {
        title: 'Slide',
        src: '/music/phIrTLTu5s5UnL3WqQdW/U82L7c84vyb6qoE0elFy/8._SLIDE.mp3',
        author: 'Akimbo',
        thumbnail:
          '/music/phIrTLTu5s5UnL3WqQdW/U82L7c84vyb6qoE0elFy/Vultures_2.png'
      }
      //
    ];
  }
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const contextValue = {
    currentTrack,
    setCurrentTrack
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
