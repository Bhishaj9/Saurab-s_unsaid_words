import { memo, useState, useCallback } from "react";
import type { DiaryPage as DiaryPageType } from "@/types/diary";

interface DiaryPageProps {
  page: DiaryPageType;
  priority?: boolean;
}

function DiaryPageComponent({ page, priority = false }: DiaryPageProps) {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => setLoaded(true), []);

  const pageNumber = page.id.replace("page-", "");
  const label = page.date
    ? `Diary page ${pageNumber}, dated ${page.date}`
    : `Diary page ${pageNumber}`;

  return (
    <figure className="group flex h-full w-full items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Warm ambient glow around the paper — desk lamp spill */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-sm opacity-70 dark:opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 40% 30%, rgba(255,248,240,0.15) 0%, rgba(255,238,215,0.06) 25%, transparent 55%), radial-gradient(ellipse at 60% 80%, rgba(43,38,32,0.04) 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />

        {/* Warm desk lamp edge light on top-left, cool shadow bottom-right */}
        <div
          className="pointer-events-none absolute -inset-3 rounded-sm opacity-40 dark:opacity-25"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,238,215,0.08) 0%, transparent 35%), linear-gradient(225deg, rgba(0,0,0,0.04) 0%, transparent 45%)",
          }}
          aria-hidden="true"
        />

        <div className={`relative ${loaded ? "shadow-paper-depth" : ""}`}>
          <img
            src={page.image}
            alt={label}
            className={
              "max-h-[90dvh] max-w-full select-none object-contain " +
              "shadow-page-book transition-all duration-gentle " +
              "group-hover:shadow-page-book-hover " +
              (loaded ? "opacity-100" : "opacity-0")
            }
            draggable={false}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
            onLoad={onLoad}
          />
        </div>

        {!loaded ? (
          <div
            className="absolute inset-0 skeleton-pulse rounded-sm"
            aria-hidden="true"
          />
        ) : null}
      </div>
      {page.transcription ? (
        <figcaption className="sr-only">{page.transcription}</figcaption>
      ) : null}
    </figure>
  );
}

export const DiaryPage = memo(DiaryPageComponent);
