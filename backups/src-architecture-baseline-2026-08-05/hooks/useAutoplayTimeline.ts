import { useEffect } from "react";
import { autoPlayConfig, getAutoPlayTiming } from "../content/autoplayTimings";
import { usePresentation } from "../state/PresentationProvider";
import { getPrioritizedChapterSequence } from "../content/customerPaths";

export function useAutoplayTimeline() {
  const { dispatch, state } = usePresentation();

  useEffect(() => {
    const timelineEnabled = state.mode === "autoPlay" || state.mode === "presenter";

    if (!timelineEnabled || !state.isPlaying || state.activeOverlay || state.blankScreenActive) {
      return undefined;
    }

    const sequence = getPrioritizedChapterSequence(state.customerPath);
    const currentIndex = sequence.findIndex((chapterId) => chapterId === state.chapterId);
    const isLastChapter = currentIndex === sequence.length - 1;
    const timing = getAutoPlayTiming(state.chapterId);
    const nextDelay = timing.durationMs + (timing.pauseForMediaMs ?? 0) + (isLastChapter ? autoPlayConfig.endHoldMs : 0);
    const timeout = window.setTimeout(() => {
      if (isLastChapter && autoPlayConfig.returnToOpening) {
        dispatch({ type: "START_AUTOPLAY", restartFromOpening: true });
        return;
      }

      dispatch({ type: "NEXT_CHAPTER" });
    }, nextDelay);

    return () => window.clearTimeout(timeout);
  }, [
    dispatch,
    state.activeOverlay,
    state.blankScreenActive,
    state.chapterId,
    state.customerPath,
    state.isPlaying,
    state.mode,
  ]);
}
