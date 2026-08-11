import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Chapter } from "../../../data/contentTypes";
import { AudioPulse } from "../../../design-system/components/AudioPulse";
import { SceneFallback } from "../../../design-system/components/FallbackStates";
import { SceneCanvas, SafeArea } from "../../../design-system/components/ScenePrimitives";
import { motionFamilyTransition } from "../../../design-system/motionLanguage";
import { usePerformanceMode } from "../../../design-system/usePerformanceMode";
import { useSceneState } from "../../../design-system/useSceneState";
import { usePresentation } from "../../../state/PresentationProvider";
import { sceneArchetypeMap } from "../archetypeLibrary";
import { validateChapterForArchetype } from "../archetypeValidation";

type RuntimeProps = {
  chapter: Chapter;
  variant?: string;
  children: (runtime: ArchetypeRuntimeState) => ReactNode;
  className?: string;
  showAssist?: boolean;
};

export type ArchetypeRuntimeState = {
  ready: boolean;
  reducedMotion: boolean;
  performanceMode: ReturnType<typeof usePerformanceMode>["mode"];
  activeIndex: number;
  exploredIds: string[];
  markExplored: (id: string) => void;
  setActiveIndex: (index: number) => void;
  completeInteraction: () => void;
  restart: () => void;
  skipToEnd: () => void;
  warnings: ReturnType<typeof validateChapterForArchetype>;
};

export function ArchetypeRuntime({ chapter, variant, children, className = "", showAssist = true }: RuntimeProps) {
  const { state } = usePresentation();
  const performance = usePerformanceMode();
  const { sceneState, setSceneState, interactionReady } = useSceneState(state.mode === "presenter" ? 120 : 420);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exploredIds, setExploredIds] = useState<string[]>([]);
  const archetype = sceneArchetypeMap[chapter.sceneType ?? "chapter-title"];
  const warnings = useMemo(() => validateChapterForArchetype(chapter), [chapter]);
  const reducedMotion = state.reducedMotion || performance.mode === "reduced";

  useEffect(() => {
    setActiveIndex(0);
    setExploredIds([]);
    setSceneState("entering");
    const timeout = window.setTimeout(() => setSceneState("ready"), state.mode === "presenter" ? 80 : 360);
    return () => window.clearTimeout(timeout);
  }, [chapter.id, setSceneState, state.mode]);

  function markExplored(id: string) {
    setExploredIds((current) => (current.includes(id) ? current : [...current, id]));
    setSceneState("exploring");
  }

  function completeInteraction() {
    setSceneState("interaction-complete");
  }

  function restart() {
    setActiveIndex(0);
    setExploredIds([]);
    setSceneState("ready");
  }

  function skipToEnd() {
    setActiveIndex(Math.max(chapter.beats.length - 1, 0));
    setSceneState("interaction-complete");
  }

  if (!archetype) {
    return <SceneFallback title="Scene unavailable" message="This chapter is available through legacy fallback." />;
  }

  return (
    <SceneCanvas
      className={`pws-archetype pws-archetype-${archetype.id} ${className}`}
      performanceMode={performance.mode}
      theme={chapter.themeVariant ?? archetype.defaultTheme}
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="absolute inset-0"
        data-archetype={archetype.id}
        data-scene-state={sceneState}
        data-variant={variant ?? "default"}
        initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
        transition={motionFamilyTransition(archetype.defaultMotionFamily, reducedMotion, 0)}
      >
        {children({
          ready: interactionReady,
          reducedMotion,
          performanceMode: performance.mode,
          activeIndex,
          exploredIds,
          markExplored,
          setActiveIndex,
          completeInteraction,
          restart,
          skipToEnd,
          warnings,
        })}
      </motion.div>
      {showAssist ? <ArchetypeAssist chapter={chapter} /> : null}
    </SceneCanvas>
  );
}

export function ArchetypeCopyBlock({
  chapter,
  align = "left",
  dense = false,
}: {
  chapter: Chapter;
  align?: "left" | "center" | "right";
  dense?: boolean;
}) {
  return (
    <div className={`pws-archetype-copy text-${align}`}>
      <p className="pws-technical-label">{chapter.eyebrow}</p>
      <h1 className={dense ? "pws-chapter-title mt-4" : "pws-display-headline mt-4"}>{chapter.headline}</h1>
      <p className="pws-body-copy mt-5 max-w-[48rem]">{chapter.supportingMessage}</p>
    </div>
  );
}

export function ArchetypeAssist({ chapter }: { chapter: Chapter }) {
  const { state } = usePresentation();
  const narrationState = state.narrationEnabled ? "available" : "paused";

  return (
    <div className="pointer-events-none absolute bottom-[var(--stage-safe-y)] left-[var(--stage-safe-x)] z-[36] flex max-w-[70%] items-center gap-4">
      {chapter.narration?.recommended ? <AudioPulse reducedMotion={state.reducedMotion} state={narrationState} /> : null}
      {state.captionsEnabled ? (
        <div className="border-l border-[var(--pws-red)] pl-3 text-xs leading-5 text-[var(--pws-theme-muted)]">
          {chapter.supportingMessage}
        </div>
      ) : null}
    </div>
  );
}

export function ArchetypeSafe({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <SafeArea className={`pws-archetype-safe ${className}`}>{children}</SafeArea>;
}
