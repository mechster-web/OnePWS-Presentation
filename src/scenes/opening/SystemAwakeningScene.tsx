import { motion } from "framer-motion";
import { MediaStage } from "../../design-system/components/MediaStage";
import { AmbientLayer, SceneCanvas } from "../../design-system/components/ScenePrimitives";
import { motionFamilyTransition } from "../../design-system/motionLanguage";
import { openingAssets } from "./openingConfig";

export function SystemAwakeningScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <SceneCanvas className="pws-opening-awakening bg-[var(--pws-graphite-950)]" theme="cinematic-dark" performanceMode="balanced">
      <div className="absolute inset-0 bg-[var(--pws-graphite-950)]" />
      <MediaStage
        assetId={openingAssets.firstFrame}
        focalPoint="50% 48%"
        overlayStrength="medium"
        panDirection="none"
        parallaxIntensity={0.2}
        reveal="fade"
        scale={1.01}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(5_6_7/0.86),rgb(5_6_7/0.52)_48%,rgb(5_6_7/0.72))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgb(255_255_255/0.08),transparent_32%),linear-gradient(180deg,rgb(5_6_7/0.68),rgb(5_6_7/0.18)_48%,rgb(5_6_7/0.82))]" />
      <AmbientLayer atmosphere="linework" intensity="low" />
      <motion.div
        animate={{ opacity: 1, scaleX: 1 }}
        className="pws-opening-scan-line"
        initial={{ opacity: 0, scaleX: 0 }}
        transition={motionFamilyTransition("architectural-reveal", reducedMotion, 0.35)}
      />
      <div className="pws-opening-detection-fragments" aria-hidden="true">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          transition={motionFamilyTransition("architectural-reveal", reducedMotion, 0.7)}
        >
          Operator focus
        </motion.span>
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          transition={motionFamilyTransition("architectural-reveal", reducedMotion, 1)}
        >
          Room geometry
        </motion.span>
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
          transition={motionFamilyTransition("architectural-reveal", reducedMotion, 1.3)}
        >
          System response
        </motion.span>
      </div>
      <motion.div
        animate={{ opacity: 1 }}
        className="pws-opening-awakening-copy"
        initial={{ opacity: 0 }}
        transition={motionFamilyTransition("cinematic-reveal", reducedMotion, 1.2)}
      >
        <p className="pws-technical-label">Control Room Awakening</p>
        <h1>
          <span>Behind every critical operation...</span>
          <span>there is a Control Room.</span>
        </h1>
        <p>
          The experience begins with the relationship between people, technology and the environment.
        </p>
      </motion.div>
    </SceneCanvas>
  );
}
