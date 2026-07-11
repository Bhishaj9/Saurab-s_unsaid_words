import type { Variants } from "framer-motion";
import type { NavigationDirection } from "@/types/diary";

/* --------------------------------------------------------------------------
   Screen-level transitions (phase changes, opening / closing)
   -------------------------------------------------------------------------- */

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

/* --------------------------------------------------------------------------
   Page-level transition within the diary reader
   -------------------------------------------------------------------------- */

/** Direction-aware page transition — a subtle zoom + fade that gives the
 *  impression of one page dissolving into the next. The direction is supplied
 *  via Framer Motion's `custom` prop so exit animations correctly read the
 *  direction the page was navigated *away* with.
 *
 *  Easing is tuned for a gentle, physical feel: a soft ease-out on enter
 *  (settling) and a faster ease-in on exit (withdrawing). */
export const pageVariants: Variants = {
  initial: (direction: NavigationDirection = "forward") => ({
    opacity: 0,
    scale: 0.97,
    y: direction === "forward" ? 8 : -6,
  }),
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (direction: NavigationDirection = "forward") => ({
    opacity: 0,
    scale: 0.96,
    y: direction === "forward" ? -8 : 6,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  }),
};

/* --------------------------------------------------------------------------
   Micro-interaction presets (applied via spread in components)
   -------------------------------------------------------------------------- */

export const microHoverSubtle = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 500, damping: 30 },
};
