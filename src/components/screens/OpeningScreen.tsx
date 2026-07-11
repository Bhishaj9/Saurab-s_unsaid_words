import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Music } from "lucide-react";
import { fadeUpVariants } from "@/animations/transitions";

interface OpeningScreenProps {
  onBegin: () => void;
  onBeginWithAmbience: () => void;
}

const delayedFadeVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function OpeningScreen({
  onBegin,
  onBeginWithAmbience,
}: OpeningScreenProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      variants={fadeUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-8 text-center dark:text-paper-cream/90"
    >
      {/* Decorative top */}
      <div className="mb-8 h-px w-12 bg-ink/10 dark:bg-paper-cream/15 sm:mb-10" aria-hidden="true" />

      <h1 className="font-serif text-fluid-4xl leading-none tracking-tight text-ink dark:text-paper-cream">
        The Unsent Diary
      </h1>

      <div className="my-6 h-px w-16 bg-ink/15 dark:bg-paper-cream/15 sm:my-8" aria-hidden="true" />

      <p className="max-w-reading font-serif text-fluid-base leading-[1.8] tracking-[0.01em] text-ink-soft dark:text-paper-cream/70">
        Before you turn the first page&hellip;
      </p>

      <p className="mt-3 max-w-reading font-serif text-fluid-base leading-[1.8] tracking-[0.01em] text-ink-soft dark:text-paper-cream/70 sm:mt-4">
        These words were never written to change the past.
        <br />
        They were written because some thoughts deserve to exist,
        <br />
        even when they are never spoken.
      </p>

      {/* Choices appear after a quiet pause */}
      <div className="mt-14 flex flex-col items-center gap-3">
        {showButton ? (
          <>
            <motion.div
              variants={delayedFadeVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                type="button"
                onClick={onBeginWithAmbience}
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 dark:border-paper-cream/20 px-10 py-3 font-sans text-xs uppercase tracking-wider text-ink dark:text-paper-cream transition-all duration-gentle hover:-translate-y-0.5 hover:shadow-button-hover hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-[#1a1612]"
              >
                <Music className="h-3.5 w-3.5" aria-hidden="true" />
                Read with Gentle Piano Ambience
              </button>
            </motion.div>

            <motion.div
              variants={delayedFadeVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                type="button"
                onClick={onBegin}
                className="inline-flex items-center rounded-full border border-ink/10 dark:border-paper-cream/10 px-7 py-2 font-sans text-[11px] uppercase tracking-wider text-ink-faint/60 dark:text-paper-cream/40 transition-all duration-gentle hover:-translate-y-0.5 hover:border-ink/20 hover:text-ink-soft dark:hover:border-paper-cream/20 dark:hover:text-paper-cream/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper dark:focus-visible:ring-offset-[#1a1612]"
              >
                Read in Silence
              </button>
            </motion.div>
          </>
        ) : null}
      </div>

      {/* Decorative bottom */}
      <div className="mt-10 h-px w-12 bg-ink/10 dark:bg-paper-cream/15" aria-hidden="true" />
    </motion.section>
  );
}
