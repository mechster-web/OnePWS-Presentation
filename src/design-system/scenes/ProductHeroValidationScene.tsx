import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import { usePresentation } from "../../state/PresentationProvider";
import { HotspotCallout, InteractionCue, PrecisionButton } from "../components/InteractionCues";
import { MediaStage } from "../components/MediaStage";
import { AmbientLayer, CinematicGrid, FocusLayer, NarrativePanel, SafeArea, SceneCanvas, StructuralLayer } from "../components/ScenePrimitives";
import { motionFamilyTransition } from "../motionLanguage";
import { mediaAssetForChapter } from "./sceneMedia";

export function ProductHeroValidationScene({ chapter }: SceneComponentProps) {
  const { dispatch, state } = usePresentation();
  const [activeBeat, setActiveBeat] = useState(chapter.beats[0]?.id);

  return (
    <SceneCanvas theme={chapter.themeVariant ?? "product-light"} performanceMode="balanced">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#f6f3ed_0%,#dce3e7_55%,#f8f7f4_100%)]" />
      <AmbientLayer atmosphere="bloom" intensity="low" />
      <StructuralLayer variant="architectural" />
      <SafeArea>
        <CinematicGrid>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 16 }}
            transition={motionFamilyTransition("product-precision", state.reducedMotion, 0.05)}
          >
            <NarrativePanel copy={chapter.supportingMessage} eyebrow={chapter.eyebrow} title={chapter.headline} />
            <div className="mt-[var(--pws-space-4)] flex flex-wrap gap-3">
              {chapter.beats.map((beat) => (
                <HotspotCallout
                  active={activeBeat === beat.id}
                  description={beat.label}
                  key={beat.id}
                  label={beat.id}
                  onClick={() => {
                    setActiveBeat(beat.id);
                    dispatch({ type: "MARK_REQUIRED_INTERACTION_COMPLETE", chapterId: chapter.id });
                  }}
                />
              ))}
            </div>
            <div className="mt-[var(--pws-space-4)] flex items-center gap-4">
              <PrecisionButton onClick={() => dispatch({ type: "NEXT_CHAPTER" })} variant="primary">
                Continue <ChevronRight aria-hidden="true" size={16} />
              </PrecisionButton>
              <InteractionCue kind="tap" label="Select a feature layer" />
            </div>
          </motion.div>

          <FocusLayer className="pws-product-plinth overflow-hidden">
            <MediaStage
              assetId={mediaAssetForChapter(chapter)}
              className="!absolute inset-[7%] bg-transparent"
              fit="cover"
              overlayStrength="none"
              panDirection="none"
              reveal="aperture"
              scale={1}
              vignette={false}
            />
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-6 top-6 z-[24] w-[min(18rem,44%)] border-l border-[var(--pws-red)] bg-white/70 p-4 backdrop-blur-sm"
              initial={{ opacity: 0, x: state.reducedMotion ? 0 : 18 }}
              transition={motionFamilyTransition("product-precision", state.reducedMotion, 0.4)}
            >
              <p className="pws-technical-label">Selected layer</p>
              <p className="mt-3 text-lg font-semibold">
                {chapter.beats.find((beat) => beat.id === activeBeat)?.label ?? chapter.technicalLayers[0]}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--pws-theme-muted)]">{chapter.presenterTalkingPoint}</p>
            </motion.div>
          </FocusLayer>
        </CinematicGrid>
      </SafeArea>
    </SceneCanvas>
  );
}
