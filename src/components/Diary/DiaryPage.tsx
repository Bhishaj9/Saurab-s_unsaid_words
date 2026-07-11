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
        {/* Warm edge light visible behind the page */}
        <div
          className="pointer-events-none absolute -inset-4 rounded-sm opacity-60 dark:opacity-30"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,248,240,0.12) 0%, transparent 35%), linear-gradient(225deg, rgba(43,38,32,0.03) 0%, transparent 40%)",
          }}
          aria-hidden="true"
        />

        <div className={`relative ${loaded ? "shadow-paper-depth" : ""}`}>
          <img
            src={page.image}
            alt={label}
            className={
              "max-h-full max-w-full select-none object-contain " +
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
            className="absolute inset-0 animate-pulse bg-paper-deep/40"
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
