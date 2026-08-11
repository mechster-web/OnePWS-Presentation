import { Compass, LayoutGrid, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { selfGuidedConfig } from "../../content/autoplayTimings";
import { getPrioritizedChapterSequence } from "../../content/customerPaths";
import { usePresentation } from "../../state/PresentationProvider";
import { getChapter } from "../../state/selectors";

export function SelfGuidedAssist() {
  const { dispatch, state } = usePresentation();
  const [dismissed, setDismissed] = useState(true);
  const [now, setNow] = useState(Date.now());
  const sequence = useMemo(() => getPrioritizedChapterSequence(state.customerPath), [state.customerPath]);
  const currentIndex = sequence.findIndex((chapterId) => chapterId === state.chapterId);
  const nextChapter = getChapter(sequence[Math.min(currentIndex + 1, sequence.length - 1)]);
  const inactiveFor = Math.max(0, now - state.lastInteractionAt);
  const showInactivityHint = inactiveFor >= selfGuidedConfig.inactivityHintMs;
  const restartInSeconds = Math.max(
    0,
    Math.ceil((selfGuidedConfig.restartAfterInactivityMs - inactiveFor) / 1000),
  );

  useEffect(() => {
    if (state.mode !== "selfGuided") {
      return undefined;
    }

    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, [state.mode]);

  useEffect(() => {
    if (state.mode !== "selfGuided") {
      return undefined;
    }

    setDismissed(true);
    const timeout = window.setTimeout(() => setDismissed(true), selfGuidedConfig.instructionAutoHideMs);
    return () => window.clearTimeout(timeout);
  }, [state.chapterId, state.mode]);

  if (state.mode !== "selfGuided" || (dismissed && !showInactivityHint)) {
    return null;
  }

  return (
    <aside className="architectural-panel absolute right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.6rem)] z-30 w-[min(25rem,34vw)] p-4 text-control-soft max-lg:inset-x-[var(--stage-safe-x)] max-lg:bottom-[calc(var(--stage-safe-y)+4.2rem)] max-lg:top-auto max-lg:w-auto">
      <button
        aria-label="Hide self-guided help"
        className="absolute right-3 top-3 text-control-muted transition hover:text-control-text"
        onClick={() => setDismissed(true)}
        type="button"
      >
        <X aria-hidden="true" size={16} />
      </button>
      <p className="text-xs uppercase tracking-[0.32em] text-control-warm">Self-guided mode</p>
      <h2 className="mt-3 text-xl font-semibold text-control-text">Explore at your pace.</h2>
      <p className="mt-2 text-sm leading-6 text-control-muted">
        Tap hotspots, use arrows to move scenes, or open the journey menu. Narration only plays when you press Listen.
      </p>

      <div className="mt-4 grid gap-2">
        <button
          className="quiet-action min-h-11 justify-start px-3 py-2 text-sm"
          onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: nextChapter.id })}
          type="button"
        >
          <Compass aria-hidden="true" size={16} />
          {selfGuidedConfig.suggestedNextLabel}: {nextChapter.title}
        </button>
        <button
          className="quiet-action min-h-11 justify-start px-3 py-2 text-sm"
          onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: selfGuidedConfig.exploreFeatureChapterId })}
          type="button"
        >
          <Sparkles aria-hidden="true" size={16} />
          Explore features
        </button>
        <button
          className="quiet-action min-h-11 justify-start px-3 py-2 text-sm"
          onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
          type="button"
        >
          <LayoutGrid aria-hidden="true" size={16} />
          {selfGuidedConfig.mainMenuLabel}
        </button>
        <button
          className="quiet-action min-h-11 justify-start px-3 py-2 text-sm"
          onClick={() => dispatch({ type: "RESET_PRESENTATION" })}
          type="button"
        >
          <RotateCcw aria-hidden="true" size={16} />
          Restart
        </button>
      </div>

      {showInactivityHint ? (
        <p className="mt-4 border-l border-control-warm/55 pl-3 text-xs leading-5 text-control-muted">
          Inactivity recovery will restart showroom auto-play in {restartInSeconds}s.
        </p>
      ) : null}
    </aside>
  );
}
