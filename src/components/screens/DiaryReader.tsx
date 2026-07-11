import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Moon, Sun, X } from "lucide-react";
import type { DiaryPages } from "@/types/diary";
import { useDiaryReader } from "@/hooks/useDiaryReader";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useSwipe } from "@/hooks/useSwipe";
import { usePagePreloader } from "@/hooks/usePagePreloader";
import { useAmbience } from "@/hooks/useAmbience";
import { useDarkMode } from "@/hooks/useDarkMode";
import { pageVariants } from "@/animations/transitions";
import { DiaryPage } from "@/components/Diary/DiaryPage";
import { PageNavigation } from "@/components/Diary/PageNavigation";
import { ReadingProgress } from "@/components/Diary/ReadingProgress";
import { MusicControl } from "@/components/Diary/MusicControl";

interface DiaryReaderProps {
  pages: DiaryPages;
  onFinish: () => void;
  ambienceEnabled?: boolean;
}

export function DiaryReader({
  pages,
  onFinish,
  ambienceEnabled = false,
}: DiaryReaderProps) {
  const reader = useDiaryReader(pages);
  const ambience = useAmbience();
  const { isDark: isDarkMode, toggle: toggleDarkMode } = useDarkMode();
  const { currentIndex, currentPage, direction, isFirst, isLast, next, prev } =
    reader;

  const handleNext = useCallback(() => {
    if (isLast) onFinish();
    else next();
  }, [isLast, onFinish, next]);

  const handlePrev = useCallback(() => {
    prev();
  }, [prev]);

  useKeyboardNavigation({
    enabled: true,
    onNext: handleNext,
    onPrev: handlePrev,
  });

  const swipe = useSwipe<HTMLDivElement>({
    onNext: handleNext,
    onPrev: handlePrev,
  });

  usePagePreloader({ pages, currentIndex });

  useEffect(() => {
    if (ambienceEnabled && !ambience.isPlaying) {
      ambience.start();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (pages.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-paper px-8 text-center"
        aria-label="Empty diary"
      >
        <div className="mb-8 h-px w-16 bg-ink/15" aria-hidden="true" />

        <h2 className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
          No diary pages found
        </h2>

        <div className="my-6 h-px w-24 bg-ink/15" aria-hidden="true" />

        <p className="max-w-reading font-serif text-base leading-relaxed text-ink-soft sm:text-lg">
          Add diary page images to begin reading.
        </p>

        <button
          type="button"
          onClick={onFinish}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink/20 px-8 py-3 font-sans text-xs uppercase tracking-wider text-ink transition-all duration-gentle hover:-translate-y-0.5 hover:shadow-button-hover hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Go Back
        </button>

        <div className="mt-8 h-px w-16 bg-ink/15" aria-hidden="true" />
      </motion.section>
    );
  }

  if (!currentPage) return null;

  return (
    <section
      aria-label="Diary reader"
      className="reading-environment flex min-h-[100dvh] w-full flex-col"
    >
      {/* Header */}
      <header className="safe-area-pad-x flex items-center justify-between px-4 pt-4 sm:px-8 sm:pt-6 landscape:pt-2">
        <button
          type="button"
          onClick={onFinish}
          aria-label="Close the diary"
          className="touch-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/8 bg-paper/60 text-ink-lighter/60 shadow-sm backdrop-blur-sm transition-all duration-gentle hover:bg-paper hover:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-paper-cream/8 dark:bg-black/30 dark:text-paper-cream/40 dark:shadow-black/10 dark:hover:bg-black/50 dark:hover:text-paper-cream/70"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="touch-target inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/8 bg-paper/60 text-ink-lighter/60 shadow-sm backdrop-blur-sm transition-all duration-gentle hover:bg-paper hover:text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-paper-cream/8 dark:bg-black/30 dark:text-paper-cream/40 dark:shadow-black/10 dark:hover:bg-black/50 dark:hover:text-paper-cream/70"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <MusicControl
            isPlaying={ambience.isPlaying}
            onToggle={ambience.toggle}
          />
        </div>
      </header>

      {/* Reading surface */}
      <div
        ref={swipe.ref}
        onTouchStart={swipe.onTouchStart}
        onTouchEnd={swipe.onTouchEnd}
        className="desk-spotlight flex flex-1 items-center justify-center px-4 py-4 sm:px-10 sm:py-8 md:px-16 lg:px-24 xl:px-32 landscape:py-2"
      >
        <div className="flex h-full w-full max-w-reading items-center justify-center">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex h-full w-full items-center justify-center"
            >
              <DiaryPage page={currentPage} priority />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="safe-area-pad-x safe-area-pad-b flex flex-col gap-3 px-5 pb-5 sm:px-8 sm:pb-8 landscape:gap-2 landscape:pb-3">
        <div className="mx-auto w-full max-w-reading">
          <ReadingProgress current={currentIndex} total={pages.length} />
        </div>

        <div className="mx-auto w-full max-w-reading">
          <PageNavigation
            currentIndex={currentIndex}
            total={pages.length}
            isFirst={isFirst}
            isLast={isLast}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>

        {isLast ? (
          <motion.div
            className="mx-auto mt-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <button
              type="button"
              onClick={onFinish}
               className="touch-target rounded-full border border-ink/15 dark:border-paper-cream/15 px-6 py-2 font-sans text-[10px] uppercase tracking-wider text-ink-soft dark:text-paper-cream/60 transition-all duration-gentle hover:-translate-y-0.5 hover:border-ink/25 dark:hover:border-paper-cream/25 hover:text-ink dark:hover:text-paper-cream hover:shadow-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-[#1a1612]"
            >
              Close the diary
            </button>
          </motion.div>
        ) : null}
      </footer>
    </section>
  );
}
