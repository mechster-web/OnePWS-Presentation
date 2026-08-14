import { motion } from "framer-motion";
import { getAsset } from "../../content/assetManifest";
import { MediaStage } from "../../design-system/components/MediaStage";
import { AudioPulse } from "../../design-system/components/AudioPulse";
import { AmbientLayer, SafeArea, SceneCanvas } from "../../design-system/components/ScenePrimitives";
import { motionFamilyTransition } from "../../design-system/motionLanguage";
import { openingAssets } from "./openingConfig";

export function BrandRevealScene({ reducedMotion }: { reducedMotion: boolean }) {
  const logo = getAsset(openingAssets.brand);

  return (
    <SceneCanvas theme="cinematic-dark" performanceMode="balanced">
      <MediaStage
        assetId={openingAssets.wide}
        focalPoint="50% center"
        overlayStrength="medium"
        panDirection="none"
        parallaxIntensity={0.1}
        reveal="fade"
        scale={1}
      />
      <AmbientLayer atmosphere="vignette" intensity="low" />
      <SafeArea>
        <div className="grid h-full place-items-center text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            transition={motionFamilyTransition("cinematic-reveal", reducedMotion, 0.2)}
          >
            {logo?.src ? (
              <img alt={logo.alt ?? "OnePWS Private Limited"} className="mx-auto max-h-16 w-auto invert" draggable={false} src={logo.src} />
            ) : (
              <p className="text-4xl font-semibold">OnePWS</p>
            )}
            <h1 className="mt-[var(--pws-space-4)] text-[clamp(2rem,4cqw,4.8rem)] font-bold leading-[0.98] tracking-[-0.02em] md:text-[2.5cqw]">
              Maximising human potential at work
            </h1>
            <p className="pws-body-copy mx-auto mt-[var(--pws-space-4)] max-w-2xl">
              Control room consoles, design-build solutions and ergonomic engineering.
            </p>
            <div className="mt-[var(--pws-space-5)] flex justify-center">
              <AudioPulse reducedMotion={reducedMotion} state="available" />
            </div>
          </motion.div>
        </div>
      </SafeArea>
    </SceneCanvas>
  );
}

