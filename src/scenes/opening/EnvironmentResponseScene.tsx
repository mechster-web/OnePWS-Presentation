import { motion } from "framer-motion";
import { MemoryMoment } from "../../design-system/components/MemoryMoment";
import { MediaStage } from "../../design-system/components/MediaStage";
import { InteractionCue, PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SafeArea, SceneCanvas, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { motionFamilyTransition } from "../../design-system/motionLanguage";
import { openingAssets } from "./openingConfig";

export function EnvironmentResponseScene({
  reducedMotion,
  activated,
  onActivate,
}: {
  reducedMotion: boolean;
  activated: boolean;
  onActivate: () => void;
}) {
  return (
    <SceneCanvas theme={activated ? "calm-state" : "operational-dark"} performanceMode="balanced">
      <MediaStage
        assetId={activated ? openingAssets.wide : openingAssets.detail}
        focalPoint={activated ? "50% center" : "56% center"}
        overlayStrength={activated ? "soft" : "strong"}
        panDirection={activated ? "none" : "left"}
        panDistance={1}
        parallaxIntensity={activated ? 0.15 : 0.35}
        reveal="masked"
        scale={1.01}
      />
      <AmbientLayer atmosphere={activated ? "bloom" : "vignette"} intensity={activated ? "low" : "medium"} />
      <StructuralLayer variant="architectural" />
      <MemoryMoment active={activated} holdMs={1_000}>
        <SafeArea>
          <div className="grid h-full content-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="max-w-[56rem]"
              initial={{ opacity: 0, y: reducedMotion ? 0 : 14 }}
              transition={motionFamilyTransition("human-focus", reducedMotion, 0.12)}
            >
              <p className="pws-technical-label">Environment response</p>
              <h1 className="pws-display-headline mt-[var(--pws-space-3)]">
                {activated ? "Not as separate products. As one intelligent environment." : "What if the room could respond to the operator?"}
              </h1>
              <div className="mt-[var(--pws-space-5)] flex flex-wrap items-center gap-4">
                {!activated ? (
                  <PrecisionButton onClick={onActivate} variant="primary">
                    Activate the responsive environment
                  </PrecisionButton>
                ) : (
                  <InteractionCue kind="reveal" label="Room systems aligned" />
                )}
              </div>
            </motion.div>
          </div>
        </SafeArea>
      </MemoryMoment>
    </SceneCanvas>
  );
}
