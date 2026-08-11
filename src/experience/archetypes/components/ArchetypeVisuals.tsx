import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Chapter } from "../../../data/contentTypes";
import { HotspotCallout, PrecisionButton } from "../../../design-system/components/InteractionCues";
import { MediaStage } from "../../../design-system/components/MediaStage";
import { AmbientLayer, StructuralLayer } from "../../../design-system/components/ScenePrimitives";
import type { ArchetypeRuntimeState } from "./ArchetypeRuntime";

export function SceneMediaField({
  chapter,
  treatment = "environment",
}: {
  chapter: Chapter;
  treatment?: "environment" | "product" | "data" | "light";
}) {
  const assetId = chapter.media?.fallbackImageAssetId ?? chapter.media?.backgroundVideoAssetId;
  return (
    <>
      <MediaStage
        alt={chapter.visualNote}
        assetId={assetId}
        blur={treatment === "data" ? "soft" : "none"}
        focalPoint={treatment === "product" ? "62% 50%" : "center"}
        overlayStrength={treatment === "light" ? "soft" : treatment === "product" ? "none" : "medium"}
        panDirection={treatment === "environment" ? "left" : "none"}
        panDistance={1.4}
        parallaxIntensity={treatment === "product" ? 0.2 : 0.55}
        scale={treatment === "product" ? 0.96 : 1}
        vignette={treatment !== "light"}
      />
      <AmbientLayer atmosphere={treatment === "data" ? "data-trace" : treatment === "product" ? "bloom" : "linework"} intensity="low" />
    </>
  );
}

export function BeatRail({
  chapter,
  runtime,
  orientation = "vertical",
}: {
  chapter: Chapter;
  runtime: ArchetypeRuntimeState;
  orientation?: "vertical" | "horizontal";
}) {
  return (
    <div className={`pws-archetype-beat-rail ${orientation === "horizontal" ? "pws-archetype-beat-rail-horizontal" : ""}`}>
      {chapter.beats.map((beat, index) => (
        <button
          aria-current={runtime.activeIndex === index}
          className="pws-archetype-beat"
          key={beat.id}
          onClick={() => {
            runtime.setActiveIndex(index);
            runtime.markExplored(beat.id);
          }}
          type="button"
        >
          <span>{String(index + 1).padStart(2, "0")}</span>
          {beat.label}
        </button>
      ))}
    </div>
  );
}

export function LayerList({
  chapter,
  runtime,
  maxVisible = 4,
}: {
  chapter: Chapter;
  runtime: ArchetypeRuntimeState;
  maxVisible?: number;
}) {
  const layers = chapter.technicalLayers.slice(0, maxVisible);
  return (
    <div className="pws-archetype-layer-list">
      {layers.map((layer, index) => (
        <button
          className={`pws-archetype-layer ${runtime.exploredIds.includes(layer) ? "is-explored" : ""}`}
          key={layer}
          onClick={() => {
            runtime.markExplored(layer);
            runtime.setActiveIndex(index);
          }}
          type="button"
        >
          <span aria-hidden="true" />
          {layer}
        </button>
      ))}
    </div>
  );
}

export function SignalPath({ count = 4, activeIndex = 0 }: { count?: number; activeIndex?: number }) {
  return (
    <div aria-hidden="true" className="pws-signal-field">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          animate={{ opacity: index <= activeIndex ? 1 : 0.24, scaleX: index <= activeIndex ? 1 : 0.38 }}
          className="pws-signal-path"
          key={index}
          style={{ top: `${22 + index * 14}%`, left: `${12 + index * 6}%`, width: `${42 + index * 7}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

export function ProductSilhouette({ chapter, activeIndex = 0 }: { chapter: Chapter; activeIndex?: number }) {
  return (
    <div className="pws-product-silhouette" aria-label={chapter.visualNote}>
      <div className="pws-product-wall" />
      <div className="pws-product-screen" />
      <div className="pws-product-desk" />
      {chapter.technicalLayers.slice(0, 4).map((layer, index) => (
        <div className={`pws-product-callout-dot ${activeIndex === index ? "is-active" : ""}`} key={layer} style={{ "--dot-i": index } as CSSProperties}>
          <span>{layer}</span>
        </div>
      ))}
    </div>
  );
}

export function HotspotPanel({
  chapter,
  runtime,
}: {
  chapter: Chapter;
  runtime: ArchetypeRuntimeState;
}) {
  const active = chapter.technicalLayers[runtime.activeIndex] ?? chapter.technicalLayers[0] ?? chapter.title;
  return (
    <div className="pws-archetype-detail-panel">
      <p className="pws-technical-label">Focused Detail</p>
      <h2 className="mt-3 text-2xl font-semibold">{active}</h2>
      <p className="mt-4 text-sm leading-6 text-[var(--pws-theme-muted)]">{chapter.supportingMessage}</p>
      <div className="mt-5">
        <HotspotCallout active description="Keyboard, touch and presenter advance supported." label={active} />
      </div>
    </div>
  );
}

export function StepControls({ runtime, total }: { runtime: ArchetypeRuntimeState; total: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      <PrecisionButton onClick={() => runtime.setActiveIndex(Math.max(0, runtime.activeIndex - 1))}>Previous</PrecisionButton>
      <PrecisionButton
        variant="primary"
        onClick={() => {
          const next = Math.min(total - 1, runtime.activeIndex + 1);
          runtime.setActiveIndex(next);
          if (next === total - 1) runtime.completeInteraction();
        }}
      >
        Advance
      </PrecisionButton>
      <PrecisionButton onClick={runtime.skipToEnd}>Final state</PrecisionButton>
    </div>
  );
}

export function StructuralBackdrop({ variant = "architectural" }: { variant?: "architectural" | "data" | "focus" }) {
  return (
    <>
      <StructuralLayer variant={variant} />
      <div aria-hidden="true" className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_68%_42%,rgb(207_31_43/0.13),transparent_24%)]" />
    </>
  );
}
