import type { Variants } from "framer-motion";
import type { NavigationDirection } from "@/types/diary";

/* --------------------------------------------------------------------------
   Screen-level transitions (phase changes, opening / closing)
   -------------------------------------------------------------------------- */

export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 0.03, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.35, ease: [0.3, 0.08, 0.4, 1] },
  },
};

export const fadeUpVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.03, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: [0.3, 0.08, 0.4, 1] },
  },
};

/* --------------------------------------------------------------------------
   Page-level transition within the diary reader
   -------------------------------------------------------------------------- */

/** Direction-aware page transition — simulates gently lifting, settling,
 *  and resting a physical sheet of paper.
 *
 *  Enter: the page rises slightly and settles into place (paper setting down).
 *  Exit:  the page lifts away in the direction of travel (paper lifting off).
 *
 *  Easing uses a slow ease-out for the settle and a slightly quicker
 *  ease-in for the lift, mimicking the weight and friction of paper. */
export const pageVariants: Variants = {
  initial: (direction: NavigationDirection = "forward") => ({
    opacity: 0,
    scale: 0.97,
    y: direction === "forward" ? 10 : -8,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  }),
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.18, 0.02, 0.2, 1] },
  },
  exit: (direction: NavigationDirection = "forward") => ({
    opacity: 0,
    scale: 0.96,
    y: direction === "forward" ? -10 : 8,
    transition: { duration: 0.3, ease: [0.3, 0.08, 0.4, 1] },
  }),
};

/* --------------------------------------------------------------------------
   Micro-interaction presets (applied via spread in components)
   -------------------------------------------------------------------------- */

export const microHoverSubtle = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.96 },
  transition: { type: "spring", stiffness: 450, damping: 28 },
};
