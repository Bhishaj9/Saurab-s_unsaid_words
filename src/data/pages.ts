import type { DiaryPage, DiaryPages } from "@/types/diary";

/**
 * ---------------------------------------------------------------------------
 * SINGLE SOURCE OF TRUTH FOR DIARY CONTENT
 * ---------------------------------------------------------------------------
 *
 * Adding or removing a diary page requires NO code changes elsewhere in the
 * app: simply drop a new image into the `pics/` folder (or remove one). Pages
 * are rendered dynamically from this list.
 *
 * How it works:
 *   1. `import.meta.glob` eagerly collects every supported image under `/pics`.
 *   2. Paths are sorted naturally so the reading order is deterministic.
 *   3. Optional `dateOverrides` lets us attach a curated date to a specific
 *      filename without renaming the source asset.
 *
 * To add a transcription later, extend `DiaryPage.transcription` and the
 * `transcriptionOverrides` map below.
 * ---------------------------------------------------------------------------
 */

// Eager import so all image URLs are resolved at build time and available
// synchronously. Returns a map of path -> resolved module (the image URL).
// NOTE: the glob pattern must be an inline string literal for Vite's static
// analysis (it cannot be a variable reference).
const imageModules = import.meta.glob("../assets/diary/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const SUPPORTED_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp"];

/**
 * Optional curated metadata keyed by the source filename (basename only).
 * Use this to attach dates/transcriptions without touching the component code.
 */
const dateOverrides: Record<string, string> = {
  // Example:
  // "WhatsApp Image 2026-07-11 at 12.05.10 AM.jpeg": "July 10, 2026",
};

const transcriptionOverrides: Record<string, string> = {
  // Example:
  // "WhatsApp Image 2026-07-11 at 12.05.10 AM.jpeg": "Dear diary, ...",
};

function basename(path: string): string {
  return path.split("/").pop() ?? path;
}

/**
 * Natural sort so that filenames like `image (1)`, `image (2)`, `image (10)`
 * order correctly instead of lexicographically (`(10)` before `(2)`).
 */
function naturalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function buildPages(): DiaryPages {
  const paths = Object.keys(imageModules)
    .filter((path) =>
      SUPPORTED_EXTENSIONS.some((ext) => path.toLowerCase().endsWith(ext)),
    )
    .sort(naturalSort);

  return paths.map((path, index) => {
    const name = basename(path);
    return {
      id: `page-${index + 1}`,
      date: dateOverrides[name],
      image: imageModules[path],
      transcription: transcriptionOverrides[name],
    } satisfies DiaryPage;
  });
}

/** Ordered, ready-to-render list of diary pages. */
export const pages: DiaryPages = buildPages();
