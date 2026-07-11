import { useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import type { AppPhase } from "@/types/diary";
import { pages } from "@/data/pages";
import { OpeningScreen } from "@/components/screens/OpeningScreen";
import { DiaryCover } from "@/components/Diary/DiaryCover";
import { DiaryReader } from "@/components/screens/DiaryReader";
import { ClosingScreen } from "@/components/screens/ClosingScreen";

/**
 * Top-level application shell and screen-flow state machine.
 *
 * The experience is a guided, linear journey:
 *   opening → cover → reading → closing
 *
 * Phase state lives here; each screen owns its own internal state. We wrap
 * everything in `MotionConfig reducedMotion="user"` so users who prefer
 * reduced motion get static transitions automatically.
 */
export default function App() {
  const [phase, setPhase] = useState<AppPhase>("opening");
  const [ambienceEnabled, setAmbienceEnabled] = useState(true);

  const goToCover = () => setPhase("cover");
  const goToCoverWithAmbience = () => {
    setAmbienceEnabled(true);
    setPhase("cover");
  };
  const goToReading = () => setPhase("reading");
  const goToClosing = () => setPhase("closing");
  const goToOpening = () => {
    setAmbienceEnabled(false);
    setPhase("opening");
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative min-h-[100dvh] w-full bg-paper text-ink antialiased">
        <AnimatePresence mode="wait">
          {phase === "opening" ? (
            <OpeningScreen
              key="opening"
              onBegin={goToCover}
              onBeginWithAmbience={goToCoverWithAmbience}
            />
          ) : null}

          {phase === "cover" ? (
            <DiaryCover key="cover" onOpen={goToReading} totalPages={pages.length} />
          ) : null}

          {phase === "reading" ? (
            <DiaryReader
              key="reading"
              pages={pages}
              onFinish={goToClosing}
              ambienceEnabled={ambienceEnabled}
            />
          ) : null}

          {phase === "closing" ? (
            <ClosingScreen key="closing" onReopen={goToOpening} />
          ) : null}
        </AnimatePresence>
      </main>
    </MotionConfig>
  );
}
