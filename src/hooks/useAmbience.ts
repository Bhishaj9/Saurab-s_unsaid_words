import { useCallback, useEffect, useRef, useState } from "react";
import ambienceSrc from "@/assets/ambience.mp3";

const FADE_DURATION = 3200;
const FADE_STEPS = 24;
const TARGET_VOLUME = 0.25;

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  onDone?: () => void,
) {
  const step = (to - from) / FADE_STEPS;
  const interval = FADE_DURATION / FADE_STEPS;
  let current = from;
  let count = 0;

  const handle = setInterval(() => {
    count++;
    current += step;
    audio.volume = Math.max(0, Math.min(TARGET_VOLUME, current));
    if (count >= FADE_STEPS) {
      clearInterval(handle);
      audio.volume = to;
      onDone?.();
    }
  }, interval);

  return () => clearInterval(handle);
}

export function useAmbience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelFadeRef = useRef<(() => void) | null>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const stop = useCallback(() => {
    cancelFadeRef.current?.();
    cancelFadeRef.current = null;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  const start = useCallback(() => {
    if (audioRef.current) return;

    const audio = new Audio(ambienceSrc);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "metadata";
    audioRef.current = audio;
    userPausedRef.current = false;

    audio.play().then(() => {
      setIsPlaying(true);
      cancelFadeRef.current?.();
      cancelFadeRef.current = fadeVolume(audio, 0, TARGET_VOLUME);
    }).catch(() => {
      audioRef.current = null;
    });
  }, []);

  const toggle = useCallback(() => {
    if (audioRef.current) {
      userPausedRef.current = true;
      cancelFadeRef.current?.();
      cancelFadeRef.current = fadeVolume(
        audioRef.current,
        audioRef.current.volume,
        0,
        () => stop(),
      );
    } else {
      userPausedRef.current = false;
      start();
    }
  }, [start, stop]);

  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        if (!audio.paused) {
          cancelFadeRef.current?.();
          cancelFadeRef.current = fadeVolume(audio, audio.volume, 0, () => {
            audio.pause();
          });
        }
      } else {
        if (audio.paused && !userPausedRef.current) {
          audio.play().then(() => {
            setIsPlaying(true);
            audio.volume = 0;
            cancelFadeRef.current?.();
            cancelFadeRef.current = fadeVolume(audio, 0, TARGET_VOLUME);
          }).catch(() => {});
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    return () => {
      cancelFadeRef.current?.();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { isPlaying, start, stop, toggle };
}
