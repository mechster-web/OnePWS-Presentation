import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { openingTiming, type OpeningMode, type OpeningStageId, durationForStage, sequenceForMode } from "./openingConfig";
import { recordOpeningEvent } from "./openingAnalytics";
import type { PresentationMode } from "../../data/contentTypes";

const completedKey = "onepws-opening-completed";
const modePreferenceKey = "onepws-opening-mode";

type OpeningDirectorInput = {
  presentationMode: PresentationMode;
  reducedMotion: boolean;
  isPlaying: boolean;
  onComplete: () => void;
};

export function useOpeningDirector({
  presentationMode,
  reducedMotion,
  isPlaying,
  onComplete,
}: OpeningDirectorInput) {
  const [openingMode, setOpeningModeState] = useState<OpeningMode>(() => {
    const queryMode = new URLSearchParams(window.location.search).get("opening");
    if (queryMode === "condensed" || queryMode === "exhibition" || queryMode === "standard") {
      return queryMode;
    }
    const stored = window.localStorage.getItem(modePreferenceKey);
    const hasCompleted = window.localStorage.getItem(completedKey) === "true";
    if (stored === "condensed" || stored === "exhibition" || stored === "standard") {
      return stored;
    }
    if (hasCompleted && openingTiming.returningVisitorDefault === "condensed") {
      return "condensed";
    }
    return "standard";
  });
  const sequence = useMemo(() => sequenceForMode(openingMode), [openingMode]);
  const [stageIndex, setStageIndex] = useState(0);
  const [activated, setActivated] = useState(false);
  const [transitionLocked, setTransitionLocked] = useState(false);
  const [skipAvailable, setSkipAvailable] = useState(false);
  const [exploredSignalIds, setExploredSignalIds] = useState<string[]>([]);
  const [exploredConnectionIds, setExploredConnectionIds] = useState<string[]>([]);
  const startedRef = useRef(false);
  const currentStage = sequence[stageIndex] ?? "system-awakening";
  const progress = sequence.length <= 1 ? 1 : stageIndex / (sequence.length - 1);

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      recordOpeningEvent(openingMode === "exhibition" ? "exhibition_mode_activated" : "opening_started", {
        mode: openingMode,
      });
      if (openingMode === "condensed") {
        recordOpeningEvent("condensed_opening_used");
      }
    }
  }, [openingMode]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSkipAvailable(true), openingTiming.skipAvailableAfterMs);
    return () => window.clearTimeout(timeout);
  }, []);

  const advance = useCallback(() => {
    if (transitionLocked) {
      return;
    }
    setTransitionLocked(true);
    window.setTimeout(() => setTransitionLocked(false), reducedMotion ? 80 : openingTiming.transitionLockMs);

    setStageIndex((index) => {
      if (index >= sequence.length - 1) {
        window.localStorage.setItem(completedKey, "true");
        recordOpeningEvent("opening_completed", { mode: openingMode });
        onComplete();
        return index;
      }
      return index + 1;
    });
  }, [openingMode, onComplete, reducedMotion, sequence.length, transitionLocked]);

  const previous = useCallback(() => {
    if (transitionLocked) {
      return;
    }
    setStageIndex((index) => Math.max(0, index - 1));
  }, [transitionLocked]);

  const goToJourney = useCallback(() => {
    setStageIndex(Math.max(0, sequence.indexOf("journey-selection")));
    setSkipAvailable(true);
  }, [sequence]);

  const skipToJourney = useCallback(() => {
    recordOpeningEvent("opening_skipped", { from: currentStage });
    goToJourney();
  }, [currentStage, goToJourney]);

  const replay = useCallback(() => {
    recordOpeningEvent("opening_replayed");
    setStageIndex(0);
    setActivated(false);
    setExploredSignalIds([]);
    setExploredConnectionIds([]);
    setSkipAvailable(false);
    window.setTimeout(() => setSkipAvailable(true), openingTiming.skipAvailableAfterMs);
  }, []);

  const activateEnvironment = useCallback(() => {
    setActivated(true);
    recordOpeningEvent("environment_activated");
  }, []);

  const markSignalExplored = useCallback((signalId: string) => {
    setExploredSignalIds((ids) => (ids.includes(signalId) ? ids : [...ids, signalId]));
    recordOpeningEvent("signal_explored", { signalId });
  }, []);

  const markConnectionExplored = useCallback((connectionId: string) => {
    setExploredConnectionIds((ids) => (ids.includes(connectionId) ? ids : [...ids, connectionId]));
    recordOpeningEvent("system_connection_explored", { connectionId });
  }, []);

  function setOpeningMode(nextMode: OpeningMode) {
    window.localStorage.setItem(modePreferenceKey, nextMode);
    setOpeningModeState(nextMode);
    setStageIndex(0);
    setActivated(false);
  }

  useEffect(() => {
    if (presentationMode === "presenter" || openingMode === "exhibition" || !isPlaying) {
      return undefined;
    }
    if (currentStage === "journey-selection" && presentationMode === "selfGuided") {
      return undefined;
    }

    const delay = durationForStage(currentStage, openingMode, reducedMotion);
    const timeout = window.setTimeout(() => {
      if (currentStage === "environment-response") {
        setActivated(true);
      }
      advance();
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [advance, currentStage, isPlaying, openingMode, presentationMode, reducedMotion]);

  return {
    openingMode,
    setOpeningMode,
    sequence,
    currentStage,
    stageIndex,
    progress,
    activated,
    activateEnvironment,
    transitionLocked,
    skipAvailable,
    exploredSignalIds,
    markSignalExplored,
    exploredConnectionIds,
    markConnectionExplored,
    advance,
    previous,
    replay,
    goToJourney,
    skipToJourney,
  };
}
