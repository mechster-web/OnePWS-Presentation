import { AnimatePresence, motion } from "framer-motion";
import { Expand, FileText, Layers3, Printer, RotateCcw, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  conceptOptions,
  defaultConceptSelection,
  generateConceptRecommendation,
  resolveConceptNames,
  type ConceptSelection,
} from "../../content/conceptSelector";
import { getAsset } from "../../content/assetManifest";
import type { Chapter } from "../../data/contentTypes";
import { usePresentation } from "../../state/PresentationProvider";

type Props = {
  chapter: Chapter;
};

type OptionKey = keyof ConceptSelection;

const primarySelectors: Array<{ key: OptionKey; label: string; options: string[] }> = [
  { key: "industry", label: "Industry", options: conceptOptions.industries },
  { key: "operators", label: "Operators", options: conceptOptions.operators },
  { key: "operatingPattern", label: "Pattern", options: conceptOptions.operatingPatterns },
  { key: "consolePreference", label: "Console", options: conceptOptions.consolePreferences },
  { key: "priority", label: "Priority", options: conceptOptions.priorities },
  { key: "visualCharacter", label: "Character", options: conceptOptions.visualCharacters },
];

const supportSelectors: Array<{ key: OptionKey; label: string; options: string[] }> = [
  { key: "integrationLevel", label: "Intelligence", options: conceptOptions.integrationLevels },
  { key: "supervisorRequirement", label: "Supervisor", options: conceptOptions.requirementLevels },
  { key: "emergencyCollaborationRequirement", label: "Emergency room", options: conceptOptions.requirementLevels },
];

export function ConceptSelectorChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const [selection, setSelection] = useState<ConceptSelection>({
    ...defaultConceptSelection,
    industry: state.customerPath.industry ?? defaultConceptSelection.industry,
  });
  const [resultFullScreen, setResultFullScreen] = useState(false);
  const recommendation = useMemo(() => generateConceptRecommendation(selection), [selection]);
  const resolved = useMemo(() => resolveConceptNames(recommendation), [recommendation]);

  function updateSelection(key: OptionKey, value: string) {
    setSelection((current) => {
      const next = { ...current, [key]: value };
      dispatch({ type: "SET_CONCEPT_SELECTION", selection: next });
      return next;
    });
    if (key === "industry") {
      dispatch({ type: "SET_CUSTOMER_PATH", selection: { ...state.customerPath, industry: value as ConceptSelection["industry"] } });
    }
  }

  function reset() {
    setSelection(defaultConceptSelection);
    dispatch({ type: "SET_CONCEPT_SELECTION", selection: defaultConceptSelection });
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <ConceptBackdrop selection={selection} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.9)_48%,rgba(255,255,255,0.68)_100%)]" />

      <section className="absolute scene-content-safe z-20 grid grid-cols-[minmax(0,0.86fr)_minmax(30rem,0.94fr)] gap-6">
        <div className="relative z-30 min-w-0">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.42em] text-control-warm"
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 12 }}
          >
            {chapter.eyebrow}
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-balance text-[clamp(2rem,3.05cqw,3.55rem)] font-semibold leading-[1.02] text-control-text"
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
            transition={{ duration: state.reducedMotion ? 0.01 : 0.7, delay: 0.12 }}
          >
            Shape Your Control Room.
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 max-w-xl text-sm leading-6 text-control-soft"
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
            transition={{ duration: state.reducedMotion ? 0.01 : 0.62, delay: 0.24 }}
          >
            Build an early direction from mission, operator model and room character.
          </motion.p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {primarySelectors.map((selector) => (
              <SelectionControl
                key={selector.key}
                label={selector.label}
                onChange={(value) => updateSelection(selector.key, value)}
                options={selector.options}
                value={selection[selector.key]}
              />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {supportSelectors.map((selector) => (
              <CompactSelect
                key={selector.key}
                label={selector.label}
                onChange={(value) => updateSelection(selector.key, value)}
                options={selector.options}
                value={selection[selector.key]}
              />
            ))}
          </div>
          <button className="quiet-action mt-3 min-h-11 px-4 py-2 text-sm" onClick={reset} type="button">
            <RotateCcw aria-hidden="true" size={16} />
            Reset direction
          </button>
        </div>

        <aside className="architectural-panel relative z-20 min-h-0 overflow-hidden p-5 shadow-control">
          <ConceptSummary
            onFullScreen={() => setResultFullScreen(true)}
            onPrint={() => window.print()}
            recommendation={recommendation}
            resolved={resolved}
            selection={selection}
          />
        </aside>
      </section>

      <AnimatePresence>
        {resultFullScreen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="concept-print-root absolute inset-0 z-50 overflow-hidden bg-control-deep p-8 text-control-text"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <button
              aria-label="Close full-screen recommendation"
              className="control-button no-print fixed right-8 top-8 z-10 !h-11 !w-11"
              onClick={() => setResultFullScreen(false)}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <section className="mx-auto h-full max-w-6xl">
              <ConceptSummary
                full
                onFullScreen={() => setResultFullScreen(false)}
                onPrint={() => window.print()}
                recommendation={recommendation}
                resolved={resolved}
                selection={selection}
              />
            </section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function SelectionControl({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="architectural-panel block min-h-[78px] p-3">
      <span className="block truncate text-xs uppercase tracking-[0.26em] text-control-warm">{label}</span>
      <select
        className="mt-2 min-h-10 w-full border border-control-line/70 bg-white/78 px-3 text-sm text-control-soft outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function CompactSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="quiet-action min-h-10 min-w-0 justify-between px-3 py-2 text-[10px] !text-control-muted">
      <span className="truncate uppercase tracking-[0.18em]">{label}</span>
      <select
        className="max-w-[110px] bg-white/78 text-control-soft outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ConceptPreview({ selection }: { selection: ConceptSelection }) {
  const curved = selection.consolePreference === "Curved";
  const rotatable = selection.consolePreference === "Rotatable";

  return (
    <section className="pointer-events-none absolute bottom-[8%] left-[37%] top-[6%] z-0 w-[18%] opacity-70">
      <div className="absolute inset-0 border border-control-line/70 bg-control-black/34" />
      <div className="absolute left-[7%] right-[7%] top-[8%] h-[34%] border border-control-line/70 bg-control-panel/60">
        <div className="grid h-full grid-cols-3 gap-2 p-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <span className="border border-control-line bg-control-black/75" key={index}>
              <span className="mx-3 mt-4 block h-px bg-control-warm/35" />
            </span>
          ))}
        </div>
      </div>
      <motion.div
        animate={{
          borderRadius: curved ? "44% 44% 8px 8px" : "6px",
          rotate: rotatable ? [0, 2, -2, 0] : 0,
        }}
        className="absolute bottom-[24%] left-[9%] right-[9%] h-[26%] border border-control-warm/60 bg-control-black/70"
        transition={{ duration: 3.4, repeat: rotatable ? Infinity : 0 }}
      >
        <div className="absolute inset-x-8 top-1/2 h-px bg-control-warm/40" />
        <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.24em] text-control-muted">
          {selection.operators} operators
        </p>
      </motion.div>
      <div className="absolute bottom-7 left-7 right-7 flex justify-between text-xs uppercase tracking-[0.2em] text-control-muted">
        <span>{selection.operatingPattern}</span>
        <span>{selection.integrationLevel}</span>
      </div>
    </section>
  );
}

function ConceptSummary({
  full = false,
  onFullScreen,
  onPrint,
  recommendation,
  resolved,
  selection,
}: {
  full?: boolean;
  onFullScreen: () => void;
  onPrint: () => void;
  recommendation: ReturnType<typeof generateConceptRecommendation>;
  resolved: ReturnType<typeof resolveConceptNames>;
  selection: ConceptSelection;
}) {
  const featureItems = resolved.features.slice(0, full ? 8 : 3);
  const productItems = recommendation.productCategories.slice(0, full ? 7 : 3);
  const projectItems = resolved.projects.length > 0 ? resolved.projects.slice(0, full ? 5 : 2) : ["No direct sourced project match available."];

  return (
    <div className="concept-summary h-full">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-control-warm">Conceptual recommendation</p>
          <h2 className={`${full ? "mt-4 text-5xl" : "mt-2 text-[clamp(1.55rem,2cqw,2.35rem)]"} font-semibold leading-tight`}>
            {selection.industry} / {selection.visualCharacter}
          </h2>
        </div>
        <div className="no-print flex shrink-0 gap-2">
          <button aria-label="Display summary full screen" className="control-button" onClick={onFullScreen} type="button">
            <Expand aria-hidden="true" size={17} />
          </button>
          <button aria-label="Print summary" className="control-button" onClick={onPrint} type="button">
            <Printer aria-hidden="true" size={17} />
          </button>
        </div>
      </div>

      <p className="mt-3 border-l border-control-warm/50 bg-control-warm/8 py-2 pl-4 pr-3 text-sm leading-5 text-control-muted">
        Early conceptual recommendation only. Not an engineered design, quotation, BOQ or confirmed integration scope.
      </p>

      <section className="mt-4">
        <p className="text-xs uppercase tracking-[0.26em] text-control-warm">Layout direction</p>
        <p className="mt-2 text-sm leading-6 text-control-soft">{recommendation.layoutDirection}</p>
      </section>

      <div className={`mt-4 grid gap-3 ${full ? "md:grid-cols-2" : "md:grid-cols-2"}`}>
        <SummaryList title="Feature set" items={featureItems} />
        <SummaryList title="Product categories" items={productItems} />
        <SummaryList title="Reference projects" items={projectItems} />
        <SummaryList title="Next steps" items={recommendation.nextDesignSteps.slice(0, full ? 4 : 1)} />
      </div>

      <section className="instrument-panel mt-4 p-3">
        <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-control-warm">
          <FileText aria-hidden="true" size={14} />
          Selection record
        </p>
        <div className="grid gap-2 text-sm text-control-muted md:grid-cols-2">
          <p><span className="text-control-soft">Console:</span> {selection.consolePreference}</p>
          <p><span className="text-control-soft">Priority:</span> {selection.priority}</p>
          <p><span className="text-control-soft">Supervisor:</span> {selection.supervisorRequirement}</p>
          <p><span className="text-control-soft">Emergency:</span> {selection.emergencyCollaborationRequirement}</p>
        </div>
      </section>
    </div>
  );
}

function SummaryList({ items, title }: { items: string[]; title: string }) {
  return (
    <section>
      <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-control-warm">
        <Layers3 aria-hidden="true" size={13} />
        {title}
      </p>
      <ul className="space-y-1.5 text-sm leading-5 text-control-soft">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-[0.62rem] h-px w-4 shrink-0 bg-control-warm/70" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ConceptBackdrop({ selection }: { selection: ConceptSelection }) {
  const curved = selection.consolePreference === "Curved";
  const rotatable = selection.consolePreference === "Rotatable";
  const asset = getAsset("showroom-control-room");

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      {asset?.src ? (
        <img alt={asset.alt ?? "OnePWS control room"} className="absolute inset-y-0 right-0 h-full w-[58%] object-cover opacity-24" src={asset.src} />
      ) : null}
      <div className="absolute right-[12%] top-[14%] h-[34%] w-[52%] border border-control-line/50 bg-white/22">
        <div className="absolute inset-5 grid grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="border border-control-line bg-white/52" key={index}>
              <div className="mx-4 mt-5 h-px bg-control-warm/35" />
              <div className="mx-4 mt-4 h-px bg-control-muted/20" />
            </div>
          ))}
        </div>
      </div>
      <motion.div
        animate={{
          borderRadius: curved ? "45% 45% 8px 8px" : "6px",
          rotate: rotatable ? [0, 2, -2, 0] : 0,
        }}
        className="absolute bottom-[17%] right-[18%] h-[14%] w-[42%] border border-control-warm/60 bg-white/44"
        transition={{ duration: 3.4, repeat: rotatable ? Infinity : 0 }}
      >
        <div className="absolute inset-x-10 top-1/2 h-px bg-control-warm/40" />
      </motion.div>
    </div>
  );
}
