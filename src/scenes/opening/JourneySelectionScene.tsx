import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { MediaStage } from "../../design-system/components/MediaStage";
import { PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SafeArea, SceneCanvas, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { motionFamilyTransition } from "../../design-system/motionLanguage";
import { openingAssets, openingJourneyOptions } from "./openingConfig";
import { recordOpeningEvent } from "./openingAnalytics";

export function JourneySelectionScene({
  reducedMotion,
  onSelect,
  onCompleteStory,
}: {
  reducedMotion: boolean;
  onSelect: (index: number) => void;
  onCompleteStory: () => void;
}) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const focused = openingJourneyOptions[focusedIndex];

  return (
    <SceneCanvas theme="immersive-neutral" performanceMode="balanced">
      <MediaStage
        assetId={openingAssets.wide}
        focalPoint="50% center"
        overlayStrength="soft"
        panDirection="none"
        parallaxIntensity={0.1}
        reveal="fade"
        scale={1}
      />
      <AmbientLayer atmosphere="linework" intensity="low" />
      <StructuralLayer variant="architectural" />
      <SafeArea>
        <div className="grid h-full grid-cols-[minmax(0,0.68fr)_minmax(0,1.32fr)] items-center gap-[var(--pws-space-6)] [@container_stage_(max-width:1023px)]:grid-cols-1">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: reducedMotion ? 0 : -14 }}
            transition={motionFamilyTransition("human-focus", reducedMotion, 0.1)}
          >
            <p className="pws-technical-label">Choose the perspective</p>
            <h1 className="pws-chapter-title mt-[var(--pws-space-3)]">What would you like this control room to achieve?</h1>
            <p className="pws-body-copy mt-[var(--pws-space-4)] max-w-xl">{focused.outcome}</p>
            <p className="mt-[var(--pws-space-3)] text-sm font-semibold text-[var(--pws-red)]">{focused.duration}</p>
            <div className="mt-[var(--pws-space-5)]">
              <PrecisionButton onClick={focused.id === "complete" ? onCompleteStory : () => onSelect(focusedIndex)} variant="primary">
                Begin this journey <ChevronRight aria-hidden="true" size={16} />
              </PrecisionButton>
            </div>
          </motion.div>

          <div className="relative grid gap-3">
            {openingJourneyOptions.map((option, index) => (
              <motion.button
                animate={{ opacity: 1, y: 0 }}
                className={`group border-l-2 bg-white/55 px-5 py-4 text-left backdrop-blur-sm transition ${
                  focusedIndex === index ? "border-[var(--pws-red)] shadow-control" : "border-black/14 hover:border-[var(--pws-red)]"
                }`}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 10 }}
                key={option.id}
                onClick={() => {
                  setFocusedIndex(index);
                  recordOpeningEvent("journey_previewed", { journey: option.id });
                }}
                onFocus={() => setFocusedIndex(index)}
                transition={motionFamilyTransition("architectural-reveal", reducedMotion, 0.18 + index * 0.08)}
                type="button"
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="text-xl font-semibold text-[#101216]">{option.title}</span>
                  {option.recommended ? <span className="pws-technical-label">Preferred</span> : null}
                </span>
                <span className="mt-2 block text-sm leading-6 text-[#4f5864]">{option.outcome}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </SafeArea>
    </SceneCanvas>
  );
}
