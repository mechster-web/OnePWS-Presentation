import { useState } from "react";
import { AudioPulse } from "../components/AudioPulse";
import { HotspotCallout, InteractionCue, PrecisionButton } from "../components/InteractionCues";
import { MemoryMoment } from "../components/MemoryMoment";
import { SceneFallback } from "../components/FallbackStates";
import { sceneThemeVariants, performanceModes } from "../tokens";
import type { PerformanceMode, PresentationMode, SceneThemeVariant } from "../../data/contentTypes";
import { ArchetypeGallery } from "../../experience/archetypes/previews/ArchetypeGallery";

export function DesignSystemShowcase() {
  const [theme, setTheme] = useState<SceneThemeVariant>("cinematic-dark");
  const [mode, setMode] = useState<PresentationMode>("selfGuided");
  const [performance, setPerformance] = useState<PerformanceMode>("balanced");
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <main className={`pws-showcase-shell pws-theme-${theme} pws-performance-${performance}`}>
      <section className="px-[clamp(1.5rem,5vw,6rem)] py-[clamp(2rem,5vw,6rem)]">
        <p className="pws-technical-label">OnePWS internal design system</p>
        <h1 className="mt-5 max-w-5xl text-[clamp(2.5rem,6vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.02em]">
          Cinematic control-room presentation language
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--pws-theme-muted)]">
          Development-only preview for typography, themes, motion families, interaction cues, audio states,
          memory moments, performance modes and fallback patterns.
        </p>
      </section>

      <section className="pws-showcase-section">
        <h2 className="pws-chapter-title">Preview Controls</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {(["presenter", "selfGuided", "autoPlay"] as PresentationMode[]).map((item) => (
            <button className="quiet-action px-4" key={item} onClick={() => setMode(item)} type="button">
              {mode === item ? "Active: " : ""}{item}
            </button>
          ))}
          {performanceModes.map((item) => (
            <button className="quiet-action px-4" key={item} onClick={() => setPerformance(item)} type="button">
              {performance === item ? "Performance: " : ""}{item}
            </button>
          ))}
          <button className="quiet-action px-4" onClick={() => setReducedMotion((value) => !value)} type="button">
            Reduced motion {reducedMotion ? "on" : "off"}
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {sceneThemeVariants.map((item) => (
            <button className="control-button !h-auto !w-auto px-3 py-2 text-xs" key={item} onClick={() => setTheme(item)} type="button">
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="pws-showcase-section grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(22rem,100%),1fr))]">
        <div>
          <p className="pws-technical-label">Typography</p>
          <h2 className="pws-display-headline mt-4">Designed around human decisions.</h2>
          <p className="pws-body-copy mt-5">Body copy remains calm and readable over imagery, light surfaces and dark cinematic environments.</p>
        </div>
        <div className="grid gap-4">
          <p className="pws-chapter-title">Chapter title</p>
          <p className="text-3xl font-semibold">Product title</p>
          <p className="text-xl font-medium">Supporting title</p>
          <p className="pws-technical-label">Technical label</p>
          <p className="text-sm text-[var(--pws-theme-muted)]">Caption / navigation / presenter note</p>
          <p className="pws-statistic">24/7</p>
        </div>
      </section>

      <section className="pws-showcase-section">
        <h2 className="pws-chapter-title">Surfaces, Cues And Audio States</h2>
        <div className="mt-8 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(15rem,100%),1fr))]">
          <div className="pws-glass-surface p-5">
            <p className="pws-technical-label">Surface</p>
            <p className="mt-3 text-sm text-[var(--pws-theme-muted)]">Restraint-first glass, used sparingly.</p>
          </div>
          <div className="pws-glass-surface p-5">
            <InteractionCue kind="hotspot" label="Tap to explore" />
            <div className="mt-4">
              <HotspotCallout label="Sightline" description="Operator focus layer" active />
            </div>
          </div>
          <div className="pws-glass-surface p-5">
            <div className="grid gap-3">
              <AudioPulse reducedMotion={reducedMotion} state="available" />
              <AudioPulse reducedMotion={reducedMotion} state="playing" />
              <AudioPulse reducedMotion={reducedMotion} state="paused" />
            </div>
          </div>
        </div>
      </section>

      <section className="pws-showcase-section grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(min(22rem,100%),1fr))]">
        <MemoryMoment active>
          <div className="min-h-[22rem] overflow-hidden border border-[var(--pws-theme-line)] bg-[radial-gradient(circle_at_62%_35%,rgb(207_31_43/0.18),transparent_26%),linear-gradient(135deg,var(--pws-theme-bg),var(--pws-theme-surface))] p-8">
            <p className="pws-technical-label">Memory moment</p>
            <h2 className="pws-chapter-title mt-5">A controlled visual takeover, not constant spectacle.</h2>
            <div className="mt-8">
              <PrecisionButton variant="primary">Presenter override</PrecisionButton>
            </div>
          </div>
        </MemoryMoment>
        <SceneFallback title="Missing media" message="A calm branded fallback appears while development logs retain detail." />
      </section>

      <section className="pws-showcase-section">
        <h2 className="pws-chapter-title">Navigation States</h2>
        <div className="mt-6 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(15rem,100%),1fr))]">
          {["visible", "minimal", "hidden-cinematic"].map((state) => (
            <div className="pws-glass-surface p-5" key={state}>
              <p className="pws-technical-label">{state}</p>
              <div className={`mt-5 flex gap-2 pws-nav-${state}`}>
                <button className="control-button" type="button">1</button>
                <button className="control-button" type="button">2</button>
                <button className="control-button" type="button">3</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ArchetypeGallery />
    </main>
  );
}

export default DesignSystemShowcase;

