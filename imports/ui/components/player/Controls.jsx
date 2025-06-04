import React, { useEffect, useState } from 'react';
import {
  BsFillFastForwardFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillRewindFill,
  BsSkipEndFill,
  BsSkipStartFill,
  BsShuffle,
  BsRepeat
} from 'react-icons/bs';
import { useAudioPlayerContext } from '../../../contexts/AudioPlayerContext';

export const Controls = () => {
  const { currentTrack, audioRef } = useAudioPlayerContext();
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, audioRef]);

  return (
    <>
      <div className="flex gap-4 items-center">
        <audio src={currentTrack.src} ref={audioRef} />
        <button onClick={() => {}}>
          <BsSkipStartFill size={20} />
        </button>
        <button onClick={() => {}}>
          <BsFillRewindFill size={20} />
        </button>
        <button onClick={() => setIsPlaying(prev => !prev)}>
          {isPlaying ? (
            <BsFillPauseFill size={30} />
          ) : (
            <BsFillPlayFill size={30} />
          )}
        </button>
        <button onClick={() => {}}>
          <BsFillFastForwardFill size={20} />
        </button>
        <button onClick={() => {}}>
          <BsSkipEndFill size={20} />
        </button>
        <button onClick={() => setIsShuffle(prev => !prev)}>
          <BsShuffle size={20} className={isShuffle ? 'text-[#f50]' : ''} />
        </button>
        <button onClick={() => setIsRepeat(prev => !prev)}>
          <BsRepeat size={20} className={isRepeat ? 'text-[#f50]' : ''} />
        </button>
      </div>
    </>
  );
};
