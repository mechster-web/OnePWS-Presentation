import { motion } from "framer-motion";
import { HotspotCallout } from "../../design-system/components/InteractionCues";
import { MediaStage } from "../../design-system/components/MediaStage";
import { AmbientLayer, SafeArea, SceneCanvas, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { motionFamilyTransition } from "../../design-system/motionLanguage";
import { openingAssets, openingSignals } from "./openingConfig";

export function HumanChallengeScene({
  reducedMotion,
  exploredSignalIds,
  onSignal,
}: {
  reducedMotion: boolean;
  exploredSignalIds: string[];
  onSignal: (signalId: string) => void;
}) {
  return (
    <SceneCanvas theme="alert-state" performanceMode="balanced">
      <MediaStage
        assetId={openingAssets.environment}
        focalPoint="52% center"
        overlayStrength="strong"
        panDirection="right"
        panDistance={1.2}
        parallaxIntensity={0.35}
        reveal="fade"
        scale={1.015}
      />
      <AmbientLayer atmosphere="data-trace" intensity="low" />
      <StructuralLayer variant="focus" />
      <SafeArea>
        <div className="grid h-full grid-cols-[minmax(0,0.8fr)_minmax(20rem,1fr)] items-center gap-[var(--pws-space-6)] [@container_stage_(max-width:1023px)]:grid-cols-1">
          <div>
            {["More information.", "Less time.", "No room for hesitation."].map((line, index) => (
              <motion.p
                animate={{ opacity: 1, x: 0 }}
                className="mt-4 text-[clamp(2.2rem,4.3cqw,5.3rem)] font-semibold leading-[0.96] tracking-[-0.02em]"
                initial={{ opacity: 0, x: reducedMotion ? 0 : -18 }}
                key={line}
                transition={motionFamilyTransition("operational-response", reducedMotion, 0.18 + index * 0.42)}
              >
                {line}
              </motion.p>
            ))}
          </div>
          <div className="grid gap-3 justify-self-end">
            {openingSignals.map((signal, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                key={signal.id}
                transition={motionFamilyTransition("architectural-reveal", reducedMotion, 0.55 + index * 0.12)}
              >
                <HotspotCallout
                  active={exploredSignalIds.includes(signal.id)}
                  description={signal.outcome}
                  label={signal.label}
                  onClick={() => onSignal(signal.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </SafeArea>
    </SceneCanvas>
  );
}
