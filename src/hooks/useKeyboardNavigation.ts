import { useEffect } from "react";

interface KeyboardNavigationOptions {
  onNext: () => void;
  onPrev: () => void;
  /** When false, listeners are not attached (e.g. during other phases). */
  enabled?: boolean;
}

/**
 * Wires Left/Right (and optionally Arrow/PageUp/PageDown) keys to navigation.
 * Used by the diary reader for keyboard accessibility.
 */
export function useKeyboardNavigation({
  onNext,
  onPrev,
  enabled = true,
}: KeyboardNavigationOptions): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          event.preventDefault();
          onNext();
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          onPrev();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, enabled]);
}
