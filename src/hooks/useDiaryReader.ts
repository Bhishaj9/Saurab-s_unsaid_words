import { useCallback, useState } from "react";
import type { DiaryPages, NavigationDirection } from "@/types/diary";

export interface UseDiaryReaderResult {
  currentIndex: number;
  currentPage: DiaryPages[number] | undefined;
  direction: NavigationDirection;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  prev: () => void;
}

/**
 * Encapsulates the reader's page state: the current index, navigation guards,
 * and the direction of the last navigation (for transition direction later).
 *
 * @param pages The ordered list of diary pages.
 */
export function useDiaryReader(pages: DiaryPages): UseDiaryReaderResult {
  const totalPages = pages.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<NavigationDirection>("forward");

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalPages - 1;

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= totalPages - 1) return prev;
      setDirection("forward");
      return prev + 1;
    });
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return prev;
      setDirection("backward");
      return prev - 1;
    });
  }, []);

  const currentPage = pages[currentIndex];

  return { currentIndex, currentPage, direction, isFirst, isLast, next, prev };
}
