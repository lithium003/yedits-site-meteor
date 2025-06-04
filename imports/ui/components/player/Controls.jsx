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
  const {
    currentTrack,
    audioRef,
    setDuration,
    duration,
    setTimeProgress,
    progressBarRef,
    setTrackIndex,
    setCurrentTrack,
    queue,
    isPlaying,
    setIsPlaying
  } = useAudioPlayerContext();
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const playAnimationRef = useRef(null);

  const updateProgress = useCallback(() => {
    if (audioRef.current && progressBarRef.current && duration) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime.toString();
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      );
    }
  }, [duration, setTimeProgress, audioRef, progressBarRef]);

  const startAnimation = useCallback(() => {
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
      if (playAnimationRef.current !== null) {
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

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
      updateProgress();
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
      updateProgress();
    }
  };

  const handlePrevious = useCallback(() => {
    setTrackIndex(prev => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * queue.length)
        : prev === 0
          ? queue.length - 1 // Loop back around if at first track
          : prev - 1;
      setCurrentTrack(queue[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex]);

  const handleNext = useCallback(() => {
    setTrackIndex(prev => {
      const newIndex = isShuffle
        ? Math.floor(Math.random() * queue.length)
        : prev >= queue.length - 1
          ? 0
          : prev + 1;
      setCurrentTrack(queue[newIndex]);
      return newIndex;
    });
  }, [isShuffle, setCurrentTrack, setTrackIndex, queue]);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    if (currentAudioRef) {
      currentAudioRef.onended = () => {
        if (isRepeat) {
          currentAudioRef.play();
        } else {
          handleNext();
        }
      };
    }
    return () => {
      if (currentAudioRef) {
        currentAudioRef.onended = null;
      }
    };
  }, [isRepeat, handleNext, audioRef]);

  return (
    <>
      <div className="flex gap-4 items-center">
        <audio
          src={currentTrack.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <button onClick={handlePrevious}>
          <BsSkipStartFill size={20} />
        </button>
        <button onClick={skipBackward}>
          <BsFillRewindFill size={20} />
        </button>
        <button onClick={() => setIsPlaying(prev => !prev)}>
          {isPlaying ? (
            <BsFillPauseFill size={30} />
          ) : (
            <BsFillPlayFill size={30} />
          )}
        </button>
        <button onClick={skipForward}>
          <BsFillFastForwardFill size={20} />
        </button>
        <button onClick={handleNext}>
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
