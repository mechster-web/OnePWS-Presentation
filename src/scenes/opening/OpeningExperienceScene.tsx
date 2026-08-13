import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import { usePresentation } from "../../state/PresentationProvider";
import { sceneTransition, transitionAnimate, transitionInitial } from "../../design-system/motionLanguage";
import { getAsset } from "../../content/assetManifest";
import { openingAssets, openingJourneyOptions, type OpeningStageId } from "./openingConfig";
import { navigationJourneys } from "../../config/navigation";
import type { CustomerPathSelection } from "../../content/customerPaths";
import { preloadOpeningAssets } from "./openingPreload";
import { recordOpeningEvent } from "./openingAnalytics";
import { useOpeningDirector } from "./OpeningDirector";
import { OpeningProgress } from "./OpeningProgress";
import { SystemAwakeningScene } from "./SystemAwakeningScene";
import { HumanChallengeScene } from "./HumanChallengeScene";
import { EnvironmentResponseScene } from "./EnvironmentResponseScene";
import { ConnectedIntelligenceOpeningScene } from "./ConnectedIntelligenceOpeningScene";
import { BrandRevealScene } from "./BrandRevealScene";
import { JourneySelectionScene } from "./JourneySelectionScene";
import { OpeningVideoScene } from "./OpeningVideoScene";

export function OpeningExperienceScene({ chapter }: SceneComponentProps) {
  const { dispatch, state } = usePresentation();
  const openingVideo = getAsset(openingAssets.video);
  const [videoOpeningActive, setVideoOpeningActive] = useState(() => Boolean(openingVideo?.src) && !state.reducedMotion);
  const director = useOpeningDirector({
    presentationMode: state.mode,
    reducedMotion: state.reducedMotion,
    isPlaying: !videoOpeningActive && (state.isPlaying || state.mode !== "presenter"),
    onComplete: () => dispatch({ type: "NEXT_CHAPTER" }),
  });
  const shouldShowVideoOpening = videoOpeningActive && Boolean(openingVideo?.src) && !state.reducedMotion;

  const completeVideoOpening = useCallback(() => {
    recordOpeningEvent("opening_completed", { mode: "video" });
    setVideoOpeningActive(false);
    dispatch({ type: "NEXT_CHAPTER" });
  }, [dispatch]);

  const fallbackFromVideoOpening = useCallback(() => {
    setVideoOpeningActive(false);
    director.replay();
  }, [director]);

  const skipVideoOpening = useCallback(() => {
    recordOpeningEvent("opening_skipped", { from: "opening-video" });
    setVideoOpeningActive(false);
    dispatch({ type: "NEXT_CHAPTER" });
  }, [dispatch]);

  useEffect(() => {
    preloadOpeningAssets();
  }, []);

  useEffect(() => {
    function handleOpeningKey(event: KeyboardEvent) {
      if (shouldShowVideoOpening || state.activeOverlay || state.chapterId !== "opening-cover") {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [role='button']")) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (director.currentStage === "environment-response" && !director.activated) {
          director.activateEnvironment();
          return;
        }
        director.advance();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopImmediatePropagation();
        director.previous();
      }
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        director.skipToJourney();
      }
    }

    window.addEventListener("keydown", handleOpeningKey, true);
    return () => window.removeEventListener("keydown", handleOpeningKey, true);
  }, [director, shouldShowVideoOpening, state.activeOverlay, state.chapterId]);

  function selectJourney(index: number) {
    const journey = openingJourneyOptions[index];
    const selection = journey.selection as CustomerPathSelection;
    const navigationJourney = navigationJourneys.find((item) =>
      (!item.selection?.role || item.selection.role === selection.role) &&
      (!item.selection?.industry || item.selection.industry === selection.industry)
    );
    dispatch({ type: "SET_CUSTOMER_PATH", selection });
    dispatch({
      type: "SET_ACTIVE_JOURNEY",
      journeyId: navigationJourney?.id ?? "complete-story",
      startAtOpeningDestination: true,
    });
    recordOpeningEvent("journey_selected", { journey: journey.id });
  }

  const showProgress = director.currentStage !== "system-awakening";

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onPointerUp={(event) => {
        if (shouldShowVideoOpening) {
          return;
        }
        const target = event.target as HTMLElement | null;
        if (target?.closest("button, a, input, textarea, select, [role='button']")) {
          return;
        }
        if (director.openingMode === "exhibition") {
          director.setOpeningMode("standard");
          return;
        }
        if (director.currentStage === "environment-response" && !director.activated) {
          director.activateEnvironment();
          return;
        }
        director.advance();
      }}
    >
      {shouldShowVideoOpening ? (
        <OpeningVideoScene
          asset={openingVideo!}
          onComplete={completeVideoOpening}
          onFallback={fallbackFromVideoOpening}
          onReplay={() => recordOpeningEvent("opening_replayed", { mode: "video" })}
          onSkip={skipVideoOpening}
        />
      ) : (
        <>
      <AnimatePresence mode="wait">
        <motion.div
          animate={transitionAnimate()}
          className="absolute inset-0"
          exit={{ opacity: 0, filter: state.reducedMotion ? "none" : "blur(8px)" }}
          initial={transitionInitial(stageTransition(director.currentStage), state.reducedMotion)}
          key={`${director.openingMode}-${director.currentStage}-${director.activated ? "active" : "idle"}`}
          transition={sceneTransition(stageTransition(director.currentStage), state.mode, state.reducedMotion)}
        >
          {renderStage()}
        </motion.div>
      </AnimatePresence>

      <OpeningProgress
        currentStage={director.currentStage}
        progress={director.progress}
        sequence={director.sequence}
        visible={showProgress}
      />
      {state.mode === "presenter" ? (
        <div className="absolute left-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+2.2rem)] z-[36] text-xs uppercase tracking-[0.2em] text-white/58">
          Presenter opening stage: {director.currentStage.replace(/-/g, " ")}
        </div>
      ) : null}

      {director.openingMode === "exhibition" ? (
        <button
          className="absolute bottom-[18%] left-1/2 z-[36] -translate-x-1/2 border border-white/20 bg-black/42 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md"
          onClick={() => director.setOpeningMode("standard")}
          type="button"
        >
          Touch to activate the control room
        </button>
      ) : null}

      <div className="absolute bottom-[var(--stage-safe-y)] left-[var(--stage-safe-x)] z-[34] hidden gap-2 text-xs text-white/58 md:grid">
        <span>Space / tap to advance</span>
        <span>Esc to choose journey</span>
      </div>
        </>
      )}
    </div>
  );

  function renderStage() {
    switch (director.currentStage) {
      case "system-awakening":
        return <SystemAwakeningScene reducedMotion={state.reducedMotion} />;
      case "human-challenge":
        return (
          <HumanChallengeScene
            exploredSignalIds={director.exploredSignalIds}
            onSignal={director.markSignalExplored}
            reducedMotion={state.reducedMotion}
          />
        );
      case "environment-response":
        return (
          <EnvironmentResponseScene
            activated={director.activated}
            onActivate={director.activateEnvironment}
            reducedMotion={state.reducedMotion}
          />
        );
      case "connected-intelligence":
        return (
          <ConnectedIntelligenceOpeningScene
            exploredConnectionIds={director.exploredConnectionIds}
            onConnection={director.markConnectionExplored}
            reducedMotion={state.reducedMotion}
          />
        );
      case "onepws-reveal":
        return <BrandRevealScene reducedMotion={state.reducedMotion} />;
      case "journey-selection":
        return (
          <JourneySelectionScene
            onCompleteStory={() => selectJourney(0)}
            onSelect={selectJourney}
            reducedMotion={state.reducedMotion}
          />
        );
    }
  }
}

function stageTransition(stage: OpeningStageId) {
  switch (stage) {
    case "system-awakening":
      return "fade-through-black";
    case "human-challenge":
      return "focus-pull";
    case "environment-response":
      return "aperture-open";
    case "connected-intelligence":
      return "data-trace-transition";
    case "onepws-reveal":
      return "light-sweep";
    case "journey-selection":
      return "spatial-pan";
  }
}
