import { useCallback, useEffect, useRef, useState } from "react";
import ambienceSrc from "@/assets/ambience.mp3";

export function useAmbience() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const start = useCallback(() => {
    if (audioRef.current) return;

    const audio = new Audio(ambienceSrc);
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    audio.play().then(() => setIsPlaying(true)).catch(() => {
      audioRef.current = null;
    });
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (audioRef.current) stop();
    else start();
  }, [start, stop]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { isPlaying, start, stop, toggle };
}
