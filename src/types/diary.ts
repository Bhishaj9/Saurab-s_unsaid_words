/**
 * Core domain types for The Unsent Diary.
 *
 * The diary is modeled as an ordered collection of pages, each referencing an
 * original handwritten image. Transcriptions and dates are optional metadata
 * that we may surface in later iterations.
 */

/** A single diary page entry. */
export interface DiaryPage {
  /** Stable unique identifier (used for keys, routing, analytics). */
  id: string;
  /** Human-readable date of the entry. Optional until curated. */
  date?: string;
  /** Resolved, build-time asset URL for the original diary image. */
  image: string;
  /** Optional future plain-text transcription of the page. */
  transcription?: string;
}

/** The ordered list of all diary pages. */
export type DiaryPages = readonly DiaryPage[];

/**
 * The top-level screen flow of the application. The app is a linear, guided
 * experience that advances through these phases.
 */
export type AppPhase = "opening" | "cover" | "reading" | "closing";

/** Direction of a page transition, used for navigation animations. */
export type NavigationDirection = "forward" | "backward";
