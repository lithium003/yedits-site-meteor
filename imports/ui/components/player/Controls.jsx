import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const { currentTrack, audioRef, setDuration, duration, setTimeProgress, progressBarRef } =
    useAudioPlayerContext();
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef(null);

  const updateProgress = useCallback(() =>{
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime= audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration,setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() =>{
    if (audioRef.current && progressBarRef.current && duration) {
      const animate = () => {
        updateProgress();
        playAnimationRef.current = requestAnimationFrame(animate);
      };
      playAnimationRef.current = requestAnimationFrame(animate);
    }
  }, [updateProgress, duration, audioRef, progressBarRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      startAnimation();
    } else {
      audioRef.current?.pause();
      if (playAnimationRef.current) {
        cancelAnimationFrame(playAnimationRef.current);
        playAnimationRef.current = null;
      }
      updateProgress(); // Ensure progress is updated immediately when paused
    }
    return () => {
      if (playAnimationRef.current !== null ) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
  }, [isPlaying, startAnimation, updateProgress, audioRef]);

  const onLoadedMetadata = () => {
    console.log('abc');
    console.log(audioRef.current?.duration);
    const seconds = audioRef.current?.duration;
    if (seconds !== undefined) {
      setDuration(seconds);
      progressBarRef.current.max = seconds.toString();
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <audio
          src={currentTrack.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
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
