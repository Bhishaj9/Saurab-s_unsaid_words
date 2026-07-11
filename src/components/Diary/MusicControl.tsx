import { Volume2, VolumeX } from "lucide-react";

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicControl({ isPlaying, onToggle }: MusicControlProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/8 bg-paper/60 text-ink-lighter/60 shadow-sm backdrop-blur-sm transition-all duration-gentle hover:bg-paper hover:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-paper-cream/8 dark:bg-black/30 dark:text-paper-cream/40 dark:shadow-black/10 dark:hover:bg-black/50 dark:hover:text-paper-cream/70"
    >
      {isPlaying ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
