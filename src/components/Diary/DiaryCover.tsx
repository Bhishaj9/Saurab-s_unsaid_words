import { useState, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { BookOpen } from "lucide-react";
import { fadeVariants } from "@/animations/transitions";

interface DiaryCoverProps {
  onOpen: () => void;
  totalPages: number;
}

const coverElementVariants: Variants = {
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  hidden: (i: number = 0) => ({
    opacity: 0,
    y: -24 - i * 10,
    filter: "blur(4px)",
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeIn" },
  }),
};

const coverButtonVariants: Variants = {
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  hidden: {
    opacity: 0,
    y: -24,
    filter: "blur(4px)",
    transition: { duration: 0.45, delay: 0.2, ease: "easeIn" },
  },
};

export function DiaryCover({ onOpen, totalPages }: DiaryCoverProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => onOpen(), 550);
  }, [isOpening, onOpen]);

  return (
    <motion.section
      variants={fadeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-cover-dark px-6 py-16 text-center shadow-cover-book"
    >
      {/* Leather grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Warm directional lighting (soft upper-left glow) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 15%, rgba(210, 180, 140, 0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(180, 155, 120, 0.03) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Book spine edge */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-cover-edge shadow-[inset_0_0_4px_0_rgba(0,0,0,0.3)]"
        aria-hidden="true"
      />

      {/* Decorative top rule */}
      <motion.div
        className="mb-6 h-px w-16 bg-cover-light/30"
        aria-hidden="true"
        variants={coverElementVariants}
        custom={0}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      />

      {/* Title group */}
      <motion.p
        className="mb-5 font-sans text-[10px] uppercase tracking-[0.35em] text-cover-light/60"
        variants={coverElementVariants}
        custom={1}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      >
        A Private Collection
      </motion.p>

      <motion.h1
        className="font-serif text-4xl leading-tight tracking-tight text-paper-cream sm:text-5xl md:text-6xl lg:text-7xl"
        style={{
          textShadow:
            "0 1px 2px rgba(0,0,0,0.4), 0 -1px 1px rgba(250,245,237,0.06)",
        }}
        variants={coverElementVariants}
        custom={2}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      >
        The Unsent Diary
      </motion.h1>

      <motion.div
        className="my-8 h-px w-24 bg-cover-light/20"
        aria-hidden="true"
        variants={coverElementVariants}
        custom={3}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      />

      <motion.p
        className="max-w-md font-serif text-base leading-relaxed text-cover-light/70 sm:text-lg"
        variants={coverElementVariants}
        custom={4}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      >
        Pages written but never sent. Read them slowly, one at a time.
      </motion.p>

      {/* Button */}
      <motion.div
        className="mt-12"
        variants={coverButtonVariants}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      >
        <button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          className="inline-flex items-center gap-3 rounded-full border border-cover-light/30 bg-transparent px-8 py-4 font-sans text-xs uppercase tracking-wider text-paper-cream/80 transition-all duration-gentle hover:-translate-y-0.5 hover:bg-paper-cream/8 hover:border-paper-cream/40 hover:text-paper-cream hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cover-dark disabled:cursor-wait"
        >
          <BookOpen className="h-4 w-4" aria-hidden="true" />
          Open the diary
        </button>
      </motion.div>

      {/* Page count */}
      <motion.p
        className="mt-8 font-sans text-[10px] uppercase tracking-widest text-cover-light/40"
        variants={coverElementVariants}
        custom={5}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      >
        {totalPages} pages
      </motion.p>

      {/* Decorative bottom rule */}
      <motion.div
        className="mt-8 h-px w-16 bg-cover-light/30"
        aria-hidden="true"
        variants={coverElementVariants}
        custom={6}
        initial="visible"
        animate={isOpening ? "hidden" : "visible"}
      />
    </motion.section>
  );
}
