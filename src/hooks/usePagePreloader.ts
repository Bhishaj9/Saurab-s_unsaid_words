import { useEffect } from "react";
import type { DiaryPages } from "@/types/diary";

interface PreloadOptions {
  pages: DiaryPages;
  currentIndex: number;
  /** How many pages on each side to eagerly preload. */
  radius?: number;
}

/**
 * Warms the browser cache for pages adjacent to the current one by decoding
 * them via `new Image()`. This keeps pagination snappy without eagerly
 * mounting every page (which would hurt initial load and memory).
 *
 * Re-runs whenever the current page changes.
 */
export function usePagePreloader({
  pages,
  currentIndex,
  radius = 1,
}: PreloadOptions): void {
  useEffect(() => {
    const toPreload: string[] = [];

    for (let offset = 1; offset <= radius; offset++) {
      const next = pages[currentIndex + offset];
      const prev = pages[currentIndex - offset];
      if (next) toPreload.push(next.image);
      if (prev) toPreload.push(prev.image);
    }

    toPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [pages, currentIndex, radius]);
}
