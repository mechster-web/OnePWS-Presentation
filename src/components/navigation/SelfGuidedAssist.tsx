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
  const assistSuppressedChapters = new Set(["complete-ecosystem", "console-portfolio", "console-detail-edge", "console-detail-linear", "console-detail-vista", "console-detail-elevate", "console-detail-collab", "room-sounds-right", "room-built-to-protect", "room-engineered-to-last", "unified-control-room", "intelligent-features", "mechanical-strength-console", "incident-response", "ergonomic-methodology", "sightline-comfort", "design-build-approach", "architectural-systems", "manufacturing-quality", "certification-overview", "project-portfolio", "project-credentials-chandigarh-iccc", "project-credentials-adani-khavda", "project-credentials-rtgc-andhra", "project-credentials-acpo-ahmedabad", "project-credentials-itms-noida", "project-credentials-shell-brunei", "project-credentials-metro-rail-occ", "project-credentials-utility-command-centre", "project-credentials-industrial-operations-centre", "project-credentials-data-centre-noc", "project-credentials-emergency-response-centre", "project-credentials-airport-operations-centre", "project-credentials-manufacturing-control-centre", "customer-presence", "why-onepws", "next-steps-closing", "logo-finale", "room-recognizes-you", "console-understands-task", "information-comes-operator", "operational-state-room-responds", "room-protects-human-performance", "personal-workspace", "intelligence-beyond-desk", "digital-twin-control-room", "ai-silent-assistant", "software-defined-control-room"]);
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

  if (state.mode !== "selfGuided" || assistSuppressedChapters.has(state.chapterId) || (dismissed && !showInactivityHint)) {
    return null;
  }

  return (
    <aside className="architectural-panel absolute right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.6rem)] z-30 w-[min(25rem,34cqw)] p-4 text-control-soft [@container_stage_(max-width:1023px)]:inset-x-[var(--stage-safe-x)] [@container_stage_(max-width:1023px)]:bottom-[calc(var(--stage-safe-y)+4.2rem)] [@container_stage_(max-width:1023px)]:top-auto [@container_stage_(max-width:1023px)]:w-auto">
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
