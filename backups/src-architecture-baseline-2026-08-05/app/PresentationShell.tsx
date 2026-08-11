import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { LoadingScreen } from "../components/LoadingScreen";
import { ContentValidationNotice } from "../components/ContentValidationNotice";
import { PresentationViewport } from "../components/PresentationViewport";
import { AudioManager } from "../components/media/AudioManager";
import { MainNavigation } from "../components/navigation/MainNavigation";
import { ProgressIndicator } from "../components/navigation/ProgressIndicator";
import { ChapterScene } from "../components/scene/ChapterScene";
import { AutoPlayShowroomControls } from "../components/autoplay/AutoPlayShowroomControls";
import { ChapterMapOverlay } from "../components/overlays/ChapterMapOverlay";
import { PresenterPanel } from "../components/presenter/PresenterPanel";
import { OfflineStatusIndicator } from "../components/pwa/OfflineStatusIndicator";
import { SelfGuidedAssist } from "../components/navigation/SelfGuidedAssist";
import { useAutoplayTimeline } from "../hooks/useAutoplayTimeline";
import { useFullscreen } from "../hooks/useFullscreen";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { useMediaPreloader } from "../hooks/useMediaPreloader";
import { usePointerActivity } from "../hooks/usePointerActivity";
import { useReducedMotionMode } from "../hooks/useReducedMotionMode";
import { useShowroomAutoPlayRecovery } from "../hooks/useShowroomAutoPlayRecovery";
import { usePresentation } from "../state/PresentationProvider";
import { getChapter } from "../state/selectors";
import { spatialTransition } from "../motion/motionSystem";

export function PresentationShell() {
  const { dispatch, state } = usePresentation();
  useFullscreen();
  const [isLoading, setIsLoading] = useState(true);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const chapter = getChapter(state.chapterId);

  useKeyboardControls();
  usePointerActivity();
  useReducedMotionMode();
  useAutoplayTimeline();
  useShowroomAutoPlayRecovery();
  useMediaPreloader();

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), 950);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (window.location.hash !== `#${chapter.id}`) {
      window.history.replaceState(null, "", `#${chapter.id}`);
    }
  }, [chapter.id]);

  useEffect(() => {
    function handleHashChange() {
      const chapterId = window.location.hash.replace(/^#/, "");
      if (chapterId && chapterId !== state.chapterId) {
        dispatch({ type: "GO_TO_CHAPTER", chapterId: chapterId as typeof state.chapterId });
      }
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [dispatch, state.chapterId]);

  useEffect(() => {
    function preventWheel(event: WheelEvent) {
      event.preventDefault();
    }

    window.addEventListener("wheel", preventWheel, { passive: false });
    return () => window.removeEventListener("wheel", preventWheel);
  }, []);

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStart.current;
    if (!start) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 72 || Math.abs(deltaX) < Math.abs(deltaY) * 1.3) {
      return;
    }

    dispatch({ type: deltaX < 0 ? "NEXT_CHAPTER" : "PREVIOUS_CHAPTER" });
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const customerStage = (
    <PresentationViewport presenterPreview={state.mode === "presenter"}>
      <ProgressIndicator />
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.id}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
          exit={{ opacity: 0, filter: state.reducedMotion ? "none" : "blur(2px)" }}
          initial={false}
          transition={spatialTransition(state.reducedMotion)}
        >
          <ChapterScene chapter={chapter} />
        </motion.div>
      </AnimatePresence>
      <MainNavigation />
      <SelfGuidedAssist />
      <AutoPlayShowroomControls />
      <AudioManager />
      {state.blankScreenActive ? <BlankScreen /> : null}
    </PresentationViewport>
  );

  if (state.mode === "presenter") {
    return (
      <main
        className="relative grid h-dvh w-dvw grid-cols-[minmax(0,1fr)_minmax(29rem,32rem)] overflow-hidden bg-[#e9edf2] text-control-text"
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,31,43,0.10),transparent_34%),linear-gradient(180deg,#f7f8fa_0%,#e9edf2_100%)]" />
        <div className="absolute inset-0 control-grid opacity-35" />
        <section className="relative z-10 min-w-0 border-r border-control-line/70">
          <div className="absolute left-5 top-4 z-20 text-xs uppercase tracking-[0.28em] text-control-muted">
            Customer-facing presentation view
          </div>
          {customerStage}
        </section>
        <PresenterPanel />
        <ChapterMapOverlay />
        <ContentValidationNotice />
        <OfflineStatusIndicator />
      </main>
    );
  }

  return (
    <main
      className="relative h-dvh w-dvw touch-none overflow-hidden bg-[#e9edf2] text-control-text"
      onTouchEnd={handleTouchEnd}
      onTouchStart={handleTouchStart}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(207,31,43,0.10),transparent_34%),linear-gradient(180deg,#f7f8fa_0%,#e9edf2_100%)]" />
      <div className="absolute inset-0 control-grid opacity-35" />
      {customerStage}
      <ChapterMapOverlay />
      <ContentValidationNotice />
      <OfflineStatusIndicator />
    </main>
  );
}

function BlankScreen() {
  return <div className="absolute inset-0 z-[60] bg-black" aria-label="Customer display blanked" />;
}
