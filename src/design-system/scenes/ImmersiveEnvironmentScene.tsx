import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import { usePresentation } from "../../state/PresentationProvider";
import { AudioPulse } from "../components/AudioPulse";
import { InteractionCue, PrecisionButton } from "../components/InteractionCues";
import { MediaStage } from "../components/MediaStage";
import { AmbientLayer, CinematicGrid, NarrativePanel, SafeArea, SceneCanvas, StructuralLayer } from "../components/ScenePrimitives";
import { motionFamilyTransition } from "../motionLanguage";
import { useSceneState } from "../useSceneState";
import { mediaAssetForChapter } from "./sceneMedia";

export function ImmersiveEnvironmentScene({ chapter }: SceneComponentProps) {
  const { dispatch, state } = usePresentation();
  const { interactionReady } = useSceneState(state.reducedMotion ? 0 : 650);
  const isMissionCriticalOpening = chapter.id === "mission-critical-environments";

  return (
    <SceneCanvas theme={chapter.themeVariant ?? "cinematic-dark"} performanceMode="balanced">
      <MediaStage
        assetId={mediaAssetForChapter(chapter)}
        focalPoint="58% center"
        overlayStrength="medium"
        panDirection="left"
        panDistance={1.8}
        parallaxIntensity={0.7}
        reveal="masked"
        scale={1.02}
      />
      <AmbientLayer atmosphere="vignette" intensity="medium" />
      <AmbientLayer atmosphere="linework" intensity="low" />
      <StructuralLayer variant="focus" />
      {isMissionCriticalOpening ? (
        <SafeArea className="pws-mission-critical-center">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-[72rem] text-center"
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
            transition={motionFamilyTransition("cinematic-reveal", state.reducedMotion, 0.12)}
          >
            <p className="pws-technical-label">Mission-Critical Control Rooms</p>
            <h1 className="mt-5 text-balance text-[clamp(3.2rem,7cqw,8.6rem)] font-[780] leading-[0.92] text-white">
              {chapter.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-[56rem] text-balance text-[clamp(1rem,1.55cqw,1.55rem)] leading-relaxed text-white/78">
              {chapter.supportingMessage}
            </p>
            <div className="mx-auto mt-9 grid max-w-[42rem] grid-cols-3 gap-3 text-left">
              {chapter.beats.map((beat, index) => (
                <div className="border-l border-white/28 bg-black/14 px-4 py-3 backdrop-blur-md" key={beat.id}>
                  <p className="text-xs text-white/46">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{beat.label}</p>
                </div>
              ))}
            </div>
          </motion.section>
        </SafeArea>
      ) : (
        <SafeArea>
        <CinematicGrid layout="asymmetric">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: state.reducedMotion ? 0 : -18 }}
            transition={motionFamilyTransition("cinematic-reveal", state.reducedMotion, 0.1)}
          >
            <NarrativePanel
              copy={chapter.supportingMessage}
              eyebrow={chapter.eyebrow}
              title={chapter.headline}
            />
            <div className="mt-[var(--pws-space-5)] flex flex-wrap items-center gap-4">
              <PrecisionButton onClick={() => dispatch({ type: "NEXT_CHAPTER" })} variant="primary">
                Continue <ChevronRight aria-hidden="true" size={16} />
              </PrecisionButton>
              <AudioPulse reducedMotion={state.reducedMotion} state={chapter.narration?.recommended ? "available" : "unavailable"} />
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="hidden self-end justify-self-end lg:block"
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
            transition={motionFamilyTransition("architectural-reveal", state.reducedMotion, 0.45)}
          >
            <div className="pws-glass-surface w-[min(26rem,32cqw)] p-4">
              <p className="pws-technical-label">Operational sequence</p>
              <div className="mt-4 grid gap-3">
                {chapter.beats.map((beat, index) => (
                  <div className="pws-feature-line pt-3" key={beat.id}>
                    <p className="text-xs text-[var(--pws-theme-muted)]">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-sm font-semibold">{beat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">{interactionReady ? <InteractionCue kind="swipe" label="Swipe or continue when ready" /> : null}</div>
          </motion.div>
        </CinematicGrid>
      </SafeArea>
      )}
    </SceneCanvas>
  );
}
