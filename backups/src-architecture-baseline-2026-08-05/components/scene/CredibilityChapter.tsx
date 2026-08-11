import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  Factory,
  Globe2,
  History,
  Landmark,
  LineChart,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getAsset } from "../../content/assetManifest";
import {
  awardsRecognition,
  certificationReferences,
  credentialProofPoints,
  credentialTimeline,
  customerLogoReferences,
  exhibitionReferences,
  groupTurnover,
  landmarkProjectNames,
  manufacturingReferences,
  qualitySystemReferences,
  traceabilityReferences,
  workspaceTurnover,
  type CredentialProofPoint,
  type SourceRef,
} from "../../content/credentials";
import type { Chapter } from "../../data/contentTypes";
import { usePresentation } from "../../state/PresentationProvider";

type Props = {
  chapter: Chapter;
};

type LayerId =
  | "onepws"
  | "group"
  | "history"
  | "customers"
  | "presence"
  | "awards"
  | "exhibitions"
  | "manufacturing"
  | "certifications"
  | "traceability"
  | "quality"
  | "improvement";

type LayerConfig = {
  id: LayerId;
  title: string;
  summary: string;
  icon: ReactNode;
};

const layerConfigs: LayerConfig[] = [
  {
    id: "onepws",
    title: "OnePWS at a glance",
    summary: "Current OnePWS scale, reach and control-room capability.",
    icon: <ShieldCheck aria-hidden="true" size={18} />,
  },
  {
    id: "group",
    title: "Pyrotech Group strength",
    summary: "Group-level manufacturing, people and international reach.",
    icon: <Building2 aria-hidden="true" size={18} />,
  },
  {
    id: "history",
    title: "Growth history",
    summary: "A concise continuity timeline without legacy branding.",
    icon: <History aria-hidden="true" size={18} />,
  },
  {
    id: "customers",
    title: "Global customers",
    summary: "Searchable customer references shown in controlled batches.",
    icon: <Search aria-hidden="true" size={18} />,
  },
  {
    id: "presence",
    title: "International presence",
    summary: "Countries served, design-build reach and landmark references.",
    icon: <Globe2 aria-hidden="true" size={18} />,
  },
  {
    id: "awards",
    title: "Awards",
    summary: "Recognition items separated from the main pitch.",
    icon: <Award aria-hidden="true" size={18} />,
  },
  {
    id: "exhibitions",
    title: "Exhibitions",
    summary: "International exhibition activity from OnePWS source materials.",
    icon: <CalendarDays aria-hidden="true" size={18} />,
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    summary: "In-house capability and selected equipment groups.",
    icon: <Factory aria-hidden="true" size={18} />,
  },
  {
    id: "certifications",
    title: "Certifications",
    summary: "Major management-system and international certification proof.",
    icon: <BadgeCheck aria-hidden="true" size={18} />,
  },
  {
    id: "traceability",
    title: "SAP-enabled traceability",
    summary: "Project database and lifecycle traceability claims.",
    icon: <LineChart aria-hidden="true" size={18} />,
  },
  {
    id: "quality",
    title: "Quality systems",
    summary: "Management systems and delivery controls.",
    icon: <Settings2 aria-hidden="true" size={18} />,
  },
  {
    id: "improvement",
    title: "Continuous improvement",
    summary: "5S, safety, kaizen and value-stream improvement references.",
    icon: <Sparkles aria-hidden="true" size={18} />,
  },
];

const metricIcons: Partial<Record<CredentialProofPoint["category"], ReactNode>> = {
  experience: <ShieldCheck aria-hidden="true" size={18} />,
  manufacturing: <Factory aria-hidden="true" size={18} />,
  products: <Sparkles aria-hidden="true" size={18} />,
  patents: <BadgeCheck aria-hidden="true" size={18} />,
  countries: <Globe2 aria-hidden="true" size={18} />,
  customers: <Building2 aria-hidden="true" size={18} />,
  certifications: <Award aria-hidden="true" size={18} />,
  projects: <Landmark aria-hidden="true" size={18} />,
};

export function CredibilityChapter({ chapter }: Props) {
  const { state } = usePresentation();
  const [activeLayer, setActiveLayer] = useState<LayerId>("onepws");
  const primaryProof = credentialProofPoints.filter((point) => point.primary).slice(0, 6);
  const activeConfig = layerConfigs.find((layer) => layer.id === activeLayer) ?? layerConfigs[0];
  const motionDuration = state.reducedMotion ? 0.01 : 0.62;

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <CredibilityBackdrop />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_48%,rgba(255,255,255,0.74)_100%)]" />

      <section className="absolute scene-content-safe z-20 grid grid-cols-[minmax(0,0.78fr)_minmax(32rem,1fr)] items-start gap-[min(3vw,3rem)] max-xl:grid-cols-1">
        <div className="min-w-0">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.42em] text-control-warm"
            initial={false}
            transition={{ duration: motionDuration }}
          >
            {chapter.eyebrow}
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 max-w-[12ch] text-balance text-[clamp(2.15rem,3.65vw,4.35rem)] font-semibold leading-[0.98]"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.08 }}
          >
            Engineered for Mission-Critical Environments.
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 max-w-[36rem] text-sm leading-6 text-control-soft"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.16 }}
          >
            Verified OnePWS proof points stay concise in the main journey. Deeper company,
            manufacturing, customer and certification detail opens only when selected.
          </motion.p>

          <MetricRail points={primaryProof} />
        </div>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="architectural-panel min-h-0 p-4 shadow-control"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.18 }}
        >
          <div className="grid grid-cols-[14rem_minmax(0,1fr)] gap-4">
            <LayerSelector activeLayer={activeLayer} onSelect={setActiveLayer} />
            <section className="min-w-0 border-l border-control-line/70 pl-5">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center border border-control-line bg-white/80 text-control-warm">
                  {activeConfig.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Optional credibility layer</p>
                  <h2 className="mt-2 text-3xl font-semibold leading-tight">{activeConfig.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-control-soft">{activeConfig.summary}</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5"
                  exit={{ opacity: 0, y: state.reducedMotion ? 0 : -8 }}
                  initial={{ opacity: 0, y: state.reducedMotion ? 0 : 10 }}
                  key={activeLayer}
                  transition={{ duration: state.reducedMotion ? 0.01 : 0.28 }}
                >
                  <LayerContent layer={activeLayer} />
                </motion.div>
              </AnimatePresence>
            </section>
          </div>
        </motion.aside>
      </section>
    </article>
  );
}

function LayerSelector({
  activeLayer,
  onSelect,
}: {
  activeLayer: LayerId;
  onSelect: (layer: LayerId) => void;
}) {
  return (
    <nav aria-label="Credibility layers" className="grid content-start gap-2">
      {layerConfigs.map((layer) => {
        const isActive = layer.id === activeLayer;
        return (
          <button
            className={`grid min-h-11 grid-cols-[1.7rem_1fr] items-center gap-3 border px-3 text-left text-xs transition ${
              isActive
                ? "border-control-warm bg-control-warm/12 text-control-text"
                : "border-control-line bg-white/68 text-control-soft hover:border-control-warm/70 hover:text-control-text"
            }`}
            key={layer.id}
            onClick={() => onSelect(layer.id)}
            type="button"
          >
            <span className={isActive ? "text-control-warm" : "text-control-muted"}>{layer.icon}</span>
            <span className="truncate font-medium">{layer.title}</span>
          </button>
        );
      })}
    </nav>
  );
}

function MetricRail({ points }: { points: CredentialProofPoint[] }) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 grid max-w-3xl grid-cols-3 gap-2"
      initial={false}
      transition={{ duration: 0.5, delay: 0.24 }}
    >
      {points.map((point, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-h-[6.8rem] border-l border-control-line/80 bg-white/62 py-3 pl-3 pr-2"
          initial={false}
          key={point.id}
          transition={{ duration: 0.36, delay: 0.03 * index }}
        >
          <div className="flex items-center justify-between text-control-warm">
            {metricIcons[point.category] ?? <BadgeCheck aria-hidden="true" size={18} />}
            <span className="text-[10px] uppercase tracking-[0.22em] text-control-muted">p{point.source.page}</span>
          </div>
          <p className="mt-2 text-[clamp(1.35rem,2vw,2.3rem)] font-semibold leading-none">{point.value}</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-control-soft">{point.label}</p>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-control-muted">{point.context}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}

function LayerContent({ layer }: { layer: LayerId }) {
  switch (layer) {
    case "onepws":
      return (
        <MetricGrid
          points={credentialProofPoints.filter((point) => point.primary).slice(0, 8)}
          title="Concise current OnePWS proof"
        />
      );
    case "group":
      return (
        <>
          <MetricGrid points={credentialProofPoints.filter((point) => !point.primary).slice(0, 5)} title="Group context" />
          <div className="mt-5 grid grid-cols-2 gap-4">
            <TurnoverMini label="Group turnover" points={groupTurnover} />
            <TurnoverMini label="Workspace turnover" points={workspaceTurnover} />
          </div>
        </>
      );
    case "history":
      return (
        <div className="grid gap-3">
          {credentialTimeline.map((item) => (
            <div className="grid grid-cols-[4.5rem_1fr] gap-4 border border-control-line bg-control-black/24 p-4" key={item.title}>
              <p className="text-2xl font-semibold text-control-warm">{item.year}</p>
              <div>
                <p className="font-medium text-control-text">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-control-soft">{item.detail}</p>
                <SourceLine source={item.source} />
              </div>
            </div>
          ))}
        </div>
      );
    case "customers":
      return <CustomerPreview />;
    case "presence":
      return (
        <div className="grid gap-4">
          <MetricGrid
            points={credentialProofPoints.filter((point) => ["countries", "customers", "projects"].includes(point.category)).slice(0, 5)}
            title="Reach and references"
          />
          <CompactList
            items={landmarkProjectNames.slice(0, 6).map((project) => ({
              title: project.name,
              detail: "Landmark project reference from source materials.",
              source: project.source,
            }))}
            title="Selected landmark references"
          />
        </div>
      );
    case "awards":
      return (
        <CompactList
          items={awardsRecognition.map((award) => ({
            title: award.title,
            detail: award.detail.replace(/confirmation required/gi, "available on request"),
            source: award.source,
          }))}
          title="Awards and recognition"
        />
      );
    case "exhibitions":
      return (
        <div className="grid grid-cols-3 gap-3">
          {exhibitionReferences.map((event) => (
            <div className="border border-control-line bg-control-black/26 p-4" key={`${event.name}-${event.year}`}>
              <p className="text-2xl font-semibold text-control-text">{event.year}</p>
              <p className="mt-3 font-medium text-control-text">{event.name}</p>
              <p className="mt-1 text-sm text-control-soft">{event.location}</p>
              {event.confirmationRequired ? <ConfirmLine /> : null}
              <SourceLine source={event.source} />
            </div>
          ))}
        </div>
      );
    case "manufacturing":
      return <CompactList items={manufacturingReferences} title="Manufacturing capability" />;
    case "certifications":
      return <CompactList items={certificationReferences} title="Certifications" />;
    case "traceability":
      return <ProcessLayer items={traceabilityReferences} title="SAP-enabled traceability" />;
    case "quality":
      return <ProcessLayer items={qualitySystemReferences.slice(0, 2)} title="Quality systems" />;
    case "improvement":
      return <ProcessLayer items={qualitySystemReferences.slice(2)} title="Continuous improvement" />;
    default:
      return null;
  }
}

function MetricGrid({ points, title }: { points: CredentialProofPoint[]; title: string }) {
  return (
    <section>
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-control-warm">{title}</p>
      <div className="grid grid-cols-2 gap-3">
        {points.map((point) => (
          <div className="border border-control-line bg-control-black/24 p-4" key={point.id}>
            <div className="flex items-center justify-between text-control-muted">
              <span className="text-[10px] uppercase tracking-[0.2em]">{point.label}</span>
              <span className="text-[10px] uppercase tracking-[0.2em]">p{point.source.page}</span>
            </div>
            <p className="mt-3 text-3xl font-semibold text-control-text">{point.value}</p>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-control-soft">{point.context}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CustomerPreview() {
  const [query, setQuery] = useState("");
  const filteredCustomers = useMemo(
    () =>
      customerLogoReferences.filter((customer) =>
        `${customer.name} ${customer.sector}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  const visibleCustomers = filteredCustomers.slice(0, 10);

  return (
    <section>
      <SourceImageBanner assetId="customer-logo-wall-source" />
      <label className="mt-4 flex max-w-xl items-center gap-3 border border-control-line bg-white/76 px-4 py-3">
        <Search aria-hidden="true" className="text-control-warm" size={18} />
        <input
          className="w-full bg-transparent text-sm text-control-soft outline-none"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search customer references"
          type="search"
          value={query}
        />
      </label>
      <p className="mt-3 text-sm leading-6 text-control-muted">
        Showing {visibleCustomers.length} of {filteredCustomers.length} sourced references. Final brand artwork can be
        applied when approved logo files are supplied.
      </p>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {visibleCustomers.map((customer) => (
          <div className="grid min-h-[4.8rem] place-items-center border border-control-line bg-white/76 px-3 text-center" key={customer.name}>
            <div>
              <p className="text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-control-text">
                {customer.name}
              </p>
              <p className="mt-2 text-[7px] uppercase tracking-[0.12em] text-control-muted">Customer reference</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceImageBanner({ assetId }: { assetId: string }) {
  const asset = getAsset(assetId);

  if (!asset?.src) {
    return null;
  }

  return (
    <figure className="overflow-hidden border border-control-line bg-white">
      <img alt={asset.alt ?? "OnePWS visual record"} className="h-32 w-full object-cover object-left" src={asset.src} />
      <figcaption className="border-t border-control-line bg-white/88 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-control-muted">
        OnePWS visual record
      </figcaption>
    </figure>
  );
}

function CompactList({
  items,
  title,
}: {
  items: { title: string; detail: string; source: SourceRef; confirmationRequired?: boolean }[];
  title: string;
}) {
  return (
    <section>
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-control-warm">{title}</p>
      <div className="grid grid-cols-2 gap-3">
        {items.slice(0, 6).map((item) => (
          <div className="border border-control-line bg-control-black/24 p-4" key={item.title}>
            <p className="font-medium text-control-text">{item.title}</p>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-control-soft">{item.detail}</p>
            {item.confirmationRequired ? <ConfirmLine /> : null}
            <SourceLine source={item.source} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessLayer({
  items,
  title,
}: {
  items: { title: string; detail: string; source: SourceRef; confirmationRequired?: boolean }[];
  title: string;
}) {
  return (
    <section>
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-control-warm">{title}</p>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div className="grid grid-cols-[3rem_1fr] gap-4 border border-control-line bg-control-black/24 p-4" key={item.title}>
            <span className="grid h-10 w-10 place-items-center border border-control-warm/55 bg-control-warm/10 text-sm text-control-warm">
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-control-text">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-control-soft">{item.detail}</p>
              {item.confirmationRequired ? <ConfirmLine /> : null}
              <SourceLine source={item.source} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TurnoverMini({ label, points }: { label: string; points: { year: number; valueCrores: number }[] }) {
  const max = Math.max(...points.map((point) => point.valueCrores));

  return (
    <div className="border border-control-line bg-control-black/22 p-4">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-control-soft">{label}</span>
        <span className="text-control-muted">{points.at(-1)?.valueCrores} Cr.</span>
      </div>
      <div className="flex h-20 items-end gap-1 border-b border-control-line">
        {points.map((point) => (
          <div
            className="flex-1 bg-control-warm/65"
            key={`${label}-${point.year}`}
            style={{ height: `${Math.max(8, (point.valueCrores / max) * 100)}%` }}
            title={`${point.year}: ${point.valueCrores} Cr.`}
          />
        ))}
      </div>
      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-control-muted">Historical growth record</p>
    </div>
  );
}

function ConfirmLine() {
  return <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-control-warm">Detail available on request</p>;
}

function SourceLine({ source }: { source: SourceRef }) {
  return (
    <p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-control-muted">
      Source p{source.page}
    </p>
  );
}

function CredibilityBackdrop() {
  const asset = getAsset("showroom-control-room-wide");

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      {asset?.src ? (
        <img alt={asset.alt ?? "OnePWS control-room visual"} className="absolute right-0 top-0 h-full w-[58%] object-cover opacity-24" src={asset.src} />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(207,31,43,0.08),transparent_30%)]" />
    </div>
  );
}
