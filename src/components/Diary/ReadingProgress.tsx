interface ReadingProgressProps {
  current: number;
  total: number;
}

export function ReadingProgress({ current, total }: ReadingProgressProps) {
  const value = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`Reading progress: page ${current + 1} of ${total}`}
      className="h-px w-full overflow-hidden bg-ink/8 dark:bg-paper-cream/8"
    >
      <div
        className="h-full bg-accent/60 transition-[width] duration-500 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
