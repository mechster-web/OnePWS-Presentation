import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import { usePresentation } from "../../state/PresentationProvider";
import { InteractionCue, PrecisionButton } from "../components/InteractionCues";
import { MediaStage } from "../components/MediaStage";
import { AmbientLayer, CinematicGrid, FocusLayer, NarrativePanel, SafeArea, SceneCanvas, StructuralLayer } from "../components/ScenePrimitives";
import { motionFamilyTransition } from "../motionLanguage";
import { mediaAssetForChapter } from "./sceneMedia";

export function InformationStoryScene({ chapter }: SceneComponentProps) {
  const { dispatch, state } = usePresentation();

  return (
    <SceneCanvas theme={chapter.themeVariant ?? "data-dark"} performanceMode="balanced">
      <MediaStage
        assetId={mediaAssetForChapter(chapter)}
        focalPoint="center"
        overlayStrength="strong"
        panDirection="up"
        panDistance={1}
        parallaxIntensity={0.35}
        reveal="fade"
        scale={1.01}
      />
      <AmbientLayer atmosphere="data-trace" intensity="low" />
      <StructuralLayer variant="data" />
      <SafeArea>
        <CinematicGrid layout="editorial">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: state.reducedMotion ? 0 : -14 }}
            transition={motionFamilyTransition("data-intelligence", state.reducedMotion, 0.08)}
          >
            <NarrativePanel copy={chapter.supportingMessage} eyebrow={chapter.eyebrow} title={chapter.headline} />
            <div className="mt-[var(--pws-space-4)]">
              <InteractionCue kind="expand" label="Progressive proof layers available" />
            </div>
          </motion.div>

          <FocusLayer className="grid content-center">
            <div className="pws-data-rail">
              {chapter.technicalLayers.map((layer, index) => (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: state.reducedMotion ? 0 : 12 }}
                  key={layer}
                  transition={motionFamilyTransition("architectural-reveal", state.reducedMotion, 0.18 + index * 0.1)}
                >
                  <p className="text-xs text-[var(--pws-theme-muted)]">{String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-xl font-semibold">{layer}</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--pws-theme-muted)]">
                    {index === 0 ? chapter.presenterTalkingPoint : chapter.visualNote}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-[var(--pws-space-5)] flex justify-end">
              <PrecisionButton onClick={() => dispatch({ type: "NEXT_CHAPTER" })} variant="primary">
                Continue <ChevronRight aria-hidden="true" size={16} />
              </PrecisionButton>
            </div>
          </FocusLayer>
        </CinematicGrid>
      </SafeArea>
    </SceneCanvas>
  );
}
