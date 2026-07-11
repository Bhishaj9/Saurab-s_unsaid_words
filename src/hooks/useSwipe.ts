import { useRef } from "react";

interface SwipeOptions {
  onNext: () => void;
  onPrev: () => void;
  /** Minimum horizontal distance (px) to count as a swipe. */
  threshold?: number;
}

/**
 * Detects horizontal touch swipes on a target element and maps them to
 * navigation. Attach the returned `ref` to the swipeable container.
 *
 * A leftward swipe advances (next); a rightward swipe goes back (prev).
 */
export function useSwipe<T extends HTMLElement>({
  onNext,
  onPrev,
  threshold = 50,
}: SwipeOptions) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const ref = useRef<T | null>(null);

  const onTouchStart = (event: React.TouchEvent<T>) => {
    const touch = event.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
  };

  const onTouchEnd = (event: React.TouchEvent<T>) => {
    if (startX.current === null || startY.current === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - startX.current;
    const deltaY = touch.clientY - startY.current;

    // Ignore mostly-vertical gestures so vertical scrolling still works.
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= threshold) {
      if (deltaX < 0) {
        onNext();
      } else {
        onPrev();
      }
    }

    startX.current = null;
    startY.current = null;
  };

  return { ref, onTouchStart, onTouchEnd };
}
