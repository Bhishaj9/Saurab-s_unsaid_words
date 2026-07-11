import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/animations/transitions";

interface ClosingScreenProps {
  onReopen: () => void;
}

export function ClosingScreen({ onReopen }: ClosingScreenProps) {
  const [showKeepsake, setShowKeepsake] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowKeepsake(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      variants={fadeUpVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-cover-dark px-8 text-center shadow-cover-book"
    >
      {/* Desk texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0, rgba(139,90,43,0.08) 1px, transparent 2px, transparent 50px, rgba(120,80,40,0.05) 51px, transparent 52px), repeating-linear-gradient(102deg, transparent 0, rgba(139,90,43,0.05) 1px, transparent 3px, transparent 80px, rgba(120,80,40,0.03) 81px, transparent 83px)",
        }}
        aria-hidden="true"
      />

      {/* Subtle cover texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Warm directional lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(210,180,140,0.04) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(180,155,120,0.02) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="mb-6 h-px w-16 bg-cover-light/30 sm:mb-8" aria-hidden="true" />

      <h2 className="font-serif text-fluid-2xl leading-relaxed text-paper-cream sm:text-fluid-3xl md:text-fluid-4xl">
        Some stories don't end with answers.
        <br />
        They simply become memories.
      </h2>

      <div className="my-6 h-px w-24 bg-cover-light/20 sm:my-8" aria-hidden="true" />

      <p className="max-w-reading font-serif text-fluid-base leading-relaxed text-cover-light/70">
        Thank you for taking the time to read these pages.
      </p>

      <button
        type="button"
        onClick={onReopen}
        className="mt-14 inline-flex items-center rounded-full border border-cover-light/30 px-8 py-3 font-sans text-xs uppercase tracking-wider text-cover-light/70 transition-all duration-gentle hover:-translate-y-0.5 hover:border-paper-cream/40 hover:text-paper-cream hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cover-dark"
      >
        Read again
      </button>

      <div className="mt-8 h-px w-16 bg-cover-light/30" aria-hidden="true" />

      {/* Hidden memory — a small folded note on the desk edge */}
      {showKeepsake ? (
        <motion.div
          className="fixed bottom-8 right-8 z-10"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setNoteVisible(!noteVisible)}
            onMouseEnter={() => setNoteVisible(true)}
            onMouseLeave={() => setNoteVisible(false)}
            aria-label={noteVisible ? "Hidden note visible" : "Discover a hidden note"}
            className="group relative flex cursor-default items-center gap-3"
          >
            {/* Folded paper with paper clip */}
            <span
              className={`relative block transition-all duration-700 ease-out ${
                noteVisible ? "opacity-90" : "opacity-20 hover:opacity-50"
              }`}
              aria-hidden="true"
            >
              <svg
                width="36"
                height="28"
                viewBox="0 0 36 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Paper body */}
                <rect
                  x="1"
                  y="4"
                  width="31"
                  height="23"
                  rx="1"
                  fill="rgba(210,195,175,0.6)"
                  stroke="rgba(180,165,145,0.4)"
                  strokeWidth="0.5"
                />
                {/* Fold corner */}
                <path
                  d="M23 4 L32 13 L23 13 Z"
                  fill="rgba(195,180,160,0.5)"
                  stroke="rgba(180,165,145,0.3)"
                  strokeWidth="0.3"
                />
                {/* Paper clip */}
                <path
                  d="M25 2 C25 -2, 29 -2, 29 2 L29 16 C29 20, 25 20, 25 16 L25 8"
                  stroke="rgba(180,165,145,0.5)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            {/* Note text */}
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={
                noteVisible
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -8 }
              }
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-48 rounded-sm bg-paper-cream/10 px-3 py-2 font-serif text-xs italic leading-relaxed text-paper-cream/80 backdrop-blur-sm"
            >
              Chocolate waffle cake — still warm, still yours.
            </motion.span>
          </button>
        </motion.div>
      ) : null}
    </motion.section>
  );
}
