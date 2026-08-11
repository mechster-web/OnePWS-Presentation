import { useEffect, useMemo, useState } from "react";
import type { PerformanceMode, PresentationMode, SceneThemeVariant, SceneType } from "../../../data/contentTypes";
import { getSceneComponent } from "../../sceneRegistry";
import { sceneArchetypeLibrary, sceneArchetypeMap } from "../archetypeLibrary";
import { validateArchetypeDifferentiation, validateChapterForArchetype } from "../archetypeValidation";
import { archetypePreviewChapters } from "./archetypePreviewChapters";
import { usePresentation } from "../../../state/PresentationProvider";

export function ArchetypeGallery() {
  const { state, dispatch } = usePresentation();
  const [selected, setSelected] = useState<SceneType>("immersive-environment");
  const [theme, setTheme] = useState<SceneThemeVariant>("cinematic-dark");
  const [mode, setMode] = useState<PresentationMode>("selfGuided");
  const [performance, setPerformance] = useState<PerformanceMode>("balanced");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [captions, setCaptions] = useState(false);
  const [narration, setNarration] = useState(false);
  const [simulateMissingMedia, setSimulateMissingMedia] = useState(false);
  const [simulateLongText, setSimulateLongText] = useState(false);
  const [smallViewport, setSmallViewport] = useState(false);
  const [restartKey, setRestartKey] = useState(0);

  const archetype = sceneArchetypeMap[selected];
  const preview = archetypePreviewChapters.find((chapter) => chapter.sceneType === selected) ?? archetypePreviewChapters[0];
  const chapter = useMemo(
    () => ({
      ...preview,
      themeVariant: theme,
      media: simulateMissingMedia ? undefined : preview.media,
      supportingMessage: simulateLongText
        ? `${preview.supportingMessage} ${preview.supportingCopy} ${preview.presenterTalkingPoint} This extra copy validates progressive disclosure and responsive overflow without deleting any source content.`
        : preview.supportingMessage,
    }),
    [preview, simulateLongText, simulateMissingMedia, theme],
  );
  const Scene = getSceneComponent(selected);
  const warnings = validateChapterForArchetype(chapter);
  const differentiation = validateArchetypeDifferentiation();

  useEffect(() => {
    dispatch({ type: "SET_MODE", mode });
  }, [dispatch, mode]);

  useEffect(() => {
    dispatch({ type: "SET_REDUCED_MOTION", reducedMotion });
  }, [dispatch, reducedMotion]);

  useEffect(() => {
    if (state.captionsEnabled !== captions) {
      dispatch({ type: "TOGGLE_CAPTIONS" });
    }
  }, [captions, dispatch, state.captionsEnabled]);

  useEffect(() => {
    if (state.narrationEnabled !== narration) {
      dispatch({ type: "TOGGLE_NARRATION" });
    }
  }, [dispatch, narration, state.narrationEnabled]);

  function setPreviewPerformance(next: PerformanceMode) {
    window.localStorage.setItem("onepws-performance-mode", next);
    setPerformance(next);
    setRestartKey((value) => value + 1);
  }

  return (
    <section className="pws-showcase-section">
      <div className="grid gap-8 xl:grid-cols-[22rem_1fr]">
        <aside>
          <p className="pws-technical-label">Archetype Gallery</p>
          <h2 className="pws-chapter-title mt-3">Production scene library</h2>
          <div className="mt-6 grid max-h-[32rem] gap-2 overflow-auto pr-2">
            {sceneArchetypeLibrary.map((item) => (
              <button
                className={`quiet-action !justify-start px-3 text-left text-sm ${selected === item.id ? "!border-[var(--pws-red)]" : ""}`}
                key={item.id}
                onClick={() => setSelected(item.id)}
                type="button"
              >
                {item.name}
              </button>
            ))}
          </div>
        </aside>

        <div>
          <div className="flex flex-wrap gap-2">
            {(["presenter", "selfGuided", "autoPlay"] as PresentationMode[]).map((item) => (
              <button className="control-button !h-auto !w-auto px-3 py-2 text-xs" key={item} onClick={() => setMode(item)} type="button">
                {mode === item ? "Mode: " : ""}{item}
              </button>
            ))}
            {(["premium", "balanced", "reduced"] as PerformanceMode[]).map((item) => (
              <button className="control-button !h-auto !w-auto px-3 py-2 text-xs" key={item} onClick={() => setPreviewPerformance(item)} type="button">
                {performance === item ? "Perf: " : ""}{item}
              </button>
            ))}
            {(["cinematic-dark", "architectural-light", "operational-dark", "product-light", "data-dark", "calm-state", "alert-state"] as SceneThemeVariant[]).map((item) => (
              <button className="control-button !h-auto !w-auto px-3 py-2 text-xs" key={item} onClick={() => setTheme(item)} type="button">
                {item}
              </button>
            ))}
            <Toggle label="Reduced motion" on={reducedMotion} setOn={setReducedMotion} />
            <Toggle label="Narration" on={narration} setOn={setNarration} />
            <Toggle label="Captions" on={captions} setOn={setCaptions} />
            <Toggle label="Missing media" on={simulateMissingMedia} setOn={setSimulateMissingMedia} />
            <Toggle label="Long text" on={simulateLongText} setOn={setSimulateLongText} />
            <Toggle label="Small viewport" on={smallViewport} setOn={setSmallViewport} />
            <button className="premium-action px-4" onClick={() => setRestartKey((value) => value + 1)} type="button">Restart scene</button>
          </div>

          <div className={`pws-archetype-gallery-frame mt-6 pws-performance-${performance} ${smallViewport ? "is-small" : ""}`}>
            <Scene chapter={chapter} key={`${selected}-${restartKey}-${theme}-${performance}-${reducedMotion}-${captions}-${narration}`} />
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="pws-glass-surface p-5">
              <p className="pws-technical-label">Metadata</p>
              <pre className="mt-4 max-h-72 overflow-auto text-xs leading-5 text-[var(--pws-theme-muted)]">
                {JSON.stringify(
                  {
                    id: archetype.id,
                    purpose: archetype.purpose,
                    variants: archetype.variants.map((variant) => variant.id),
                    navigation: archetype.defaultNavigationState,
                    motion: archetype.defaultMotionFamily,
                    differentiation: archetype.differentiation,
                    simulated: { mode, performance, reducedMotion, narration, captions, simulateMissingMedia, simulateLongText },
                  },
                  null,
                  2,
                )}
              </pre>
            </div>
            <div className="pws-glass-surface p-5">
              <p className="pws-technical-label">Validation</p>
              <ul className="mt-4 grid gap-2 text-sm text-[var(--pws-theme-muted)]">
                {warnings.length === 0 ? <li>No warnings for selected preview.</li> : warnings.map((warning) => <li key={`${warning.ruleId}-${warning.message}`}>{warning.message}</li>)}
                {differentiation.map((warning) => <li key={warning}>{warning}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Toggle({ label, on, setOn }: { label: string; on: boolean; setOn: (value: boolean) => void }) {
  return (
    <button className="quiet-action px-3 text-xs" onClick={() => setOn(!on)} type="button">
      {label}: {on ? "on" : "off"}
    </button>
  );
}
