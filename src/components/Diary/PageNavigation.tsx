import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { microHoverSubtle } from "@/animations/transitions";

interface PageNavigationProps {
  currentIndex: number;
  total: number;
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function PageNavigation({
  currentIndex,
  total,
  isFirst,
  isLast,
  onPrev,
  onNext,
}: PageNavigationProps) {
  const pageNumber = currentIndex + 1;

  return (
    <nav
      aria-label="Diary page navigation"
      className="flex w-full items-center justify-between gap-6"
    >
      <motion.button
        type="button"
        onClick={onPrev}
        disabled={isFirst}
        aria-label="Previous page"
        {...microHoverSubtle}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 dark:border-paper-cream/10 bg-paper/70 dark:bg-black/20 text-ink-soft dark:text-paper-cream/60 backdrop-blur-sm transition-colors hover:bg-paper dark:hover:bg-white/5 hover:text-ink dark:hover:text-paper-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:-translate-y-0"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </motion.button>

      <p
        className="font-sans text-xs tracking-wider text-ink-faint dark:text-paper-cream/40"
        aria-live="polite"
      >
        Page{" "}
        <span className="tabular-nums tracking-tight text-ink-soft dark:text-paper-cream/70">
          {pageNumber}
        </span>
        <span className="mx-2 inline-block text-ink-lighter/40 dark:text-paper-cream/20">/</span>
        <span className="tabular-nums tracking-tight text-ink-faint dark:text-paper-cream/40">
          {total}
        </span>
      </p>

      <motion.button
        type="button"
        onClick={onNext}
        disabled={isLast}
        aria-label="Next page"
        {...microHoverSubtle}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 dark:border-paper-cream/10 bg-paper/70 dark:bg-black/20 text-ink-soft dark:text-paper-cream/60 backdrop-blur-sm transition-colors hover:bg-paper dark:hover:bg-white/5 hover:text-ink dark:hover:text-paper-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none disabled:hover:-translate-y-0"
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </motion.button>
    </nav>
  );
}
