import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
  Database,
  Expand,
  Factory,
  FileBadge,
  Globe2,
  Headphones,
  Leaf,
  Map,
  MonitorCog,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { assets } from "../../content/assets";
import { credentialProofPoints, customerLogoReferences } from "../../content/credentials";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { AudioPulse } from "../../design-system/components/AudioPulse";
import { PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SafeArea, SceneCanvas, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePerformanceMode } from "../../design-system/usePerformanceMode";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordEvidenceEvent, type EvidenceEvent } from "./evidenceAnalytics";
import {
  evidenceExperiences,
  getEvidenceExperience,
  type EvidenceCategory,
  type EvidenceExperience,
  type EvidenceProofItem,
} from "./evidenceExperienceConfig";
import { evidenceNarration } from "./evidenceNarration";
import { validateEvidenceExperience } from "./evidenceValidation";

type EvidenceLayer = "relevance" | "evidence" | "verification";

type ManufacturingItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type ManufacturingStat = {
  title: string;
  value: string;
  prefix?: string;
  suffix?: string;
  Icon: LucideIcon;
};

type ProductCertification = ManufacturingItem & {
  logoSrc: string;
};

const manufacturingMetrics: ManufacturingStat[] = [
  { title: "Sq. ft. Manufacturing Area", value: "1,000,000", Icon: Factory },
  { title: "People Working with us", value: "2,500+", Icon: Users },
  { title: "Engineered Products", value: "50+", Icon: Settings },
  { title: "Countries Served", value: "75+", Icon: Globe2 },
  { title: "Sales FY 2025-26", value: "1,056", prefix: "INR", suffix: "Cr", Icon: TrendingUp },
  { title: "Patents Granted", value: "25", Icon: FileBadge },
];

const turnoverBars = [
  { year: "2000", value: 7 },
  { year: "2006", value: 64 },
  { year: "2012", value: 279 },
  { year: "2015", value: 322 },
  { year: "2018", value: 458 },
  { year: "2021", value: 572 },
  { year: "2022", value: 664 },
  { year: "2023", value: 854 },
  { year: "2024", value: 940 },
  { year: "2025", value: 977 },
  { year: "2026", value: 1056 },
];

const qualityStepItems: ManufacturingItem[] = [
  { title: "SAP implementation", description: "Implementation of SAP to manage master data & system configurations.", Icon: MonitorCog },
  { title: "Long-term project database", description: "Complete project database including modification is stored for a minimum period of 20 years after supply.", Icon: Database },
  { title: "Data-managed manufacturing", description: "Only manufacturing company in this industry implementing SAP for data management.", Icon: Award },
];

const managementCertifications = ["ISO 9001", "ISO 14001", "ISO 45001"];

const certificationMetrics: (ManufacturingItem & { value: string })[] = [
  { title: "International Product Certifications", value: "20+", description: "", Icon: Globe2 },
  { title: "Patents Applied", value: "15", description: "", Icon: Award },
];

const productCertifications: ProductCertification[] = [
  { title: "ASTM International", logoSrc: "/assets/certificates/astm-international.svg", description: "International standards for materials, products and systems.", Icon: BadgeCheck },
  { title: "BIFMA", logoSrc: "/assets/certificates/bifma.svg", description: "Furniture standards and performance guidance.", Icon: BadgeCheck },
  { title: "BIFMA LEVEL", logoSrc: "/assets/certificates/bifma-level.svg", description: "Sustainability standard for furniture products.", Icon: Leaf },
  { title: "GREENGUARD", logoSrc: "/assets/certificates/greenguard.svg", description: "Low chemical emissions certification.", Icon: Leaf },
  { title: "GREENGUARD Gold", logoSrc: "/assets/certificates/greenguard-gold.svg", description: "Stricter emissions criteria for sensitive interiors.", Icon: Leaf },
  { title: "ISO 11064", logoSrc: "/assets/certificates/iso-11064.svg", description: "Ergonomic design principles for control centres.", Icon: ShieldCheck },
  { title: "LEVEL 3", logoSrc: "/assets/certificates/level-3.svg", description: "High level sustainability certification.", Icon: Leaf },
  { title: "Life Cycle Assessment", logoSrc: "/assets/certificates/life-cycle-assessment.svg", description: "Lifecycle impact assessment reference.", Icon: Leaf },
  { title: "RoHS", logoSrc: "/assets/certificates/rohs.svg", description: "Restriction of hazardous substances compliance.", Icon: Leaf },
  { title: "Seismic", logoSrc: "/assets/certificates/seismic.svg", description: "Seismic performance reference for resilient installations.", Icon: ShieldCheck },
  { title: "UL", logoSrc: "/assets/certificates/ul.svg", description: "Safety and reliability testing reference.", Icon: BadgeCheck },
];

const certificationGridPlaceholders = Array.from({ length: (11 - (productCertifications.length % 11)) % 11 });
const customerPresenceMetrics = [
  {
    value: credentialProofPoints.find((point) => point.id === "workspace-customers")?.value ?? "250+",
    label: "Customers served globally",
    Icon: Users,
  },
  {
    value: credentialProofPoints.find((point) => point.id === "onepws-countries")?.value ?? "35+",
    label: "Countries served by OnePWS",
    Icon: Globe2,
  },
  {
    value: credentialProofPoints.find((point) => point.id === "design-build-solutions")?.value ?? "450+",
    label: "Design-build interior solutions",
    Icon: Building2,
  },
  {
    value: credentialProofPoints.find((point) => point.id === "control-desk-solutions")?.value ?? "75,000+",
    label: "Control desk solutions",
    Icon: MonitorCog,
  },
];

const customerSectorGroups = [
  {
    title: "Energy, Oil & Gas",
    accent: "text-red-600",
    Icon: Factory,
    names: ["Shell", "ADNOC", "ONGC", "IndianOil", "Hindustan Petroleum", "Bharat Petroleum", "Oil India", "KNPC"],
  },
  {
    title: "Transport & Metro",
    accent: "text-blue-600",
    Icon: Globe2,
    names: ["Indian Railways", "Delhi Metro", "Mumbai Metro", "Lucknow Metro", "Kochi Metro", "Doha Metro", "Dedicated Freight Corridor", "Alstom"],
  },
  {
    title: "Defense, Space & Public Sector",
    accent: "text-green-600",
    Icon: ShieldCheck,
    names: ["ISRO", "DRDO", "Airport Authority of India", "BARC", "Engineers India Limited", "NHPC"],
  },
  {
    title: "Technology & Industrial",
    accent: "text-violet-600",
    Icon: Settings,
    names: ["Accenture", "Infosys", "GE", "ABB", "Siemens", "Honeywell", "Schneider Electric", "Yokogawa"],
  },
  {
    title: "Infrastructure & Utilities",
    accent: "text-cyan-600",
    Icon: TrendingUp,
    names: ["Dubai Electricity & Water Authority", "Saudi Electricity Company", "Qatar General Electricity & Water Corporation", "Abu Dhabi Airport", "NEOM"],
  },
  {
    title: "Manufacturing & Materials",
    accent: "text-orange-600",
    Icon: Award,
    names: ["Reliance Industries", "Tata Steel", "Vedanta", "UltraTech Cement", "Jindal Steel & Power", "JSW", "Dangote", "Nestle"],
  },
];

const customerPresenceProof = [
  { title: "Sector breadth", detail: "Referenced names span energy, transport, defense, utilities, industrial and technology environments.", Icon: Map },
  { title: "Critical-room relevance", detail: "Proof is organized around mission-critical operating contexts, not generic logo volume.", Icon: ShieldCheck },
  { title: "Global delivery signal", detail: "35+ countries served, with project and customer references across India and international markets.", Icon: Globe2 },
  { title: "Customer-safe posture", detail: "Use references as presence examples; final logo usage can be approved separately.", Icon: BadgeCheck },
];

export function EvidenceExperienceScene({ chapter, fallback }: { chapter: Chapter; fallback: ReactNode }) {
  const experience = getEvidenceExperience(chapter.id);
  if (!experience) {
    return <>{fallback}</>;
  }

  if (chapter.id === "manufacturing-quality") {
    return <ManufacturingQualityScene chapter={chapter} />;
  }

  if (chapter.id === "certification-overview") {
    return <CertificationOverviewScene chapter={chapter} />;
  }

  if (chapter.id === "customer-presence") {
    return <CustomerPresenceScene chapter={chapter} />;
  }

  return <EvidenceStage chapter={chapter} experience={experience} />;
}

function ManufacturingQualityScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;
  const maxTurnover = Math.max(...turnoverBars.map((bar) => bar.value));

  useEffect(() => {
    recordEvidenceEvent("manufacturing_stage_opened", { chapterId: chapter.id, detail: "manufacturing-quality-reference-redesign" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef3f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6cqh] grid grid-rows-[32.2cqh_13.6cqh_31.1cqh] gap-[1.05cqh]">
          <motion.section animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.4cqw] top-[3.2cqh] z-20">
              <h1 className="text-[clamp(2.8rem,4cqw,5.75rem)] font-bold uppercase leading-[0.98] tracking-normal text-black md:text-[2.5cqw]">
                <span className="block">Manufacturing</span>
                <span className="block text-control-warm">and Quality.</span>
              </h1>
              <div className="mt-[1.65cqh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.75cqh] max-w-[35rem] text-[clamp(0.86rem,1.12cqw,1.38rem)] font-medium leading-[1.32] text-slate-900 md:text-[0.8cqw]">
                State-of-the-art manufacturing infrastructure and robust quality systems that ensure precision, reliability and long-term performance.
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 w-[65%] overflow-hidden rounded-[0.2rem]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" src="/assets/brand/onepws-facility-exterior.webp" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgb(255_255_255/0.82)_12%,rgb(255_255_255/0.08)_42%,rgb(255_255_255/0)_100%)]" />
            </div>
          </motion.section>

          <motion.section animate={{ opacity: 1, y: 0 }} className="grid grid-cols-6 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/70 px-[0.85cqw] py-[1.25cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.7, delay: 0.08, ease }}>
            {manufacturingMetrics.map((item, index) => (
              <ManufacturingMetric index={index} item={item} key={item.title} />
            ))}
          </motion.section>

          <motion.section animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)] gap-[0.9cqw]" initial={false} transition={{ duration: 0.72, delay: 0.16, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/68 px-[1.45cqw] py-[1.9cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.9rem,1.1cqw,1.25rem)] font-semibold uppercase leading-tight text-control-text">Group Turnover</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[2.15rem] bg-control-warm" />
              <p className="mt-[1.1cqh] text-[clamp(0.56rem,0.68cqw,0.78rem)] font-medium text-control-text">In Cr. INR</p>
              <div className="relative mt-[1.1cqh] h-[19cqh] border-b border-slate-300/90">
                <div className="absolute inset-y-0 left-0 flex w-[2.5rem] flex-col justify-between text-[clamp(0.46rem,0.55cqw,0.64rem)] font-medium text-control-text">
                  <span>1200</span>
                  <span>800</span>
                  <span>600</span>
                  <span>400</span>
                  <span>200</span>
                  <span>0</span>
                </div>
                <div className="absolute inset-y-0 left-[3.2rem] right-0 grid grid-cols-11 items-end gap-[0.65cqw]">
                  {turnoverBars.map((bar) => (
                    <TurnoverBar bar={bar} max={maxTurnover} key={bar.year} />
                  ))}
                </div>
              </div>
              <p className="mt-[0.72cqh] text-center text-[clamp(0.56rem,0.66cqw,0.76rem)] font-medium text-control-text">Year</p>
            </section>

            <section className="grid min-h-0 grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/68 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="px-[1.45cqw] py-[1.9cqh]">
                <h2 className="text-[clamp(0.9rem,1.1cqw,1.25rem)] font-semibold uppercase leading-tight text-control-text">Quality at Every Step</h2>
                <div className="mt-[0.7cqh] h-[2px] w-[2.15rem] bg-control-warm" />
                <div className="mt-[1.7cqh] grid gap-[1.35cqh]">
                  {qualityStepItems.map((item) => (
                    <QualityStep item={item} key={item.title} />
                  ))}
                </div>
              </div>
              <div className="border-l border-slate-200/90 px-[1.4cqw] py-[7.2cqh]">
                <h3 className="text-center text-[clamp(0.72rem,0.9cqw,1.05rem)] font-semibold uppercase leading-tight text-control-text">Management Certifications</h3>
                <div className="mt-[3.1cqh] grid grid-cols-3 gap-[1cqw]">
                  {managementCertifications.map((item) => (
                    <CertificationBadge label={item} key={item} />
                  ))}
                </div>
              </div>
            </section>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function ManufacturingMetric({ item, index }: { item: ManufacturingStat; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[3.1rem_minmax(0,1fr)] items-center gap-[0.66cqw] px-[0.78cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full bg-control-warm/[0.07] text-control-warm">
        <Icon aria-hidden="true" size={28} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="flex items-baseline gap-[0.22em] whitespace-nowrap text-[clamp(1.02rem,1.32cqw,1.6rem)] font-semibold leading-none tracking-[-0.012em] text-control-warm [font-variant-numeric:tabular-nums]">
          {item.prefix ? <span className="text-[0.6em] font-semibold tracking-[0.04em]">{item.prefix}</span> : null}
          {item.value}
          {item.suffix ? <span className="text-[0.6em] font-semibold tracking-[0.04em]">{item.suffix}</span> : null}
        </strong>
        <span className="mt-[0.62cqh] block min-h-[2.4em] text-[clamp(0.62rem,0.74cqw,0.88rem)] font-medium leading-[1.2] text-control-text">{item.title}</span>
      </span>
    </div>
  );
}

function TurnoverBar({ bar, max }: { bar: (typeof turnoverBars)[number]; max: number }) {
  return (
    <div className="relative flex h-full min-w-0 flex-col items-center justify-end">
      <span className="mb-[0.38cqh] text-[clamp(0.42rem,0.52cqw,0.62rem)] font-medium leading-none text-control-text">{bar.value}</span>
      <div className="w-[1.35rem] rounded-t-[0.08rem] bg-control-warm shadow-[0_0.45rem_1rem_rgb(239_68_68/0.16)]" style={{ height: `${Math.max(2, (bar.value / max) * 82)}%` }} />
      <span className="mt-[0.55cqh] text-[clamp(0.45rem,0.56cqw,0.66rem)] font-medium leading-none text-control-text">{bar.year}</span>
    </div>
  );
}

function QualityStep({ item }: { item: ManufacturingItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[3.4rem_minmax(0,1fr)] items-start gap-[0.85cqw]">
      <Icon aria-hidden="true" className="text-control-warm" size={34} strokeWidth={1.45} />
      <p className="text-[clamp(0.62rem,0.76cqw,0.9rem)] font-medium leading-[1.32] text-control-text">{item.description}</p>
    </div>
  );
}

function CertificationBadge({ label }: { label: string }) {
  const [, code] = label.split(" ");
  return (
    <div className="min-w-0 text-center">
      <div className="mx-auto grid h-[4.9rem] w-[4.9rem] place-items-center rounded-[0.65rem] border border-control-warm/60 bg-white/65 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
        <span className="text-center">
          <strong className="block text-[1.2rem] font-semibold leading-none">ISO</strong>
          <span className="mt-1 block text-[0.86rem] font-semibold leading-none">{code}</span>
        </span>
      </div>
      <p className="mt-[1.1cqh] text-[clamp(0.52rem,0.64cqw,0.76rem)] font-medium text-control-text">{label}</p>
    </div>
  );
}

function CertificationOverviewScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordEvidenceEvent("certification_opened", { chapterId: chapter.id, detail: "international-certifications-reference-redesign" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef3f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6cqh] grid grid-rows-[44.6cqh_32.3cqh] gap-[1.2cqh]">
          <motion.section animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.4cqw] top-[4cqh] z-20">
              <h1 className="text-[clamp(2.75rem,4cqw,5.65rem)] font-bold uppercase leading-[0.98] tracking-normal text-black md:text-[2.5cqw]">
                <span className="block">International</span>
                <span className="block text-control-warm">Certifications</span>
              </h1>
              <div className="mt-[1.65cqh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.75cqh] max-w-[37rem] text-justify text-[clamp(0.86rem,1.12cqw,1.38rem)] font-medium leading-[1.32] text-slate-900 md:text-[0.8cqw]">
                Our products are tested and certified to meet globally recognized standards for safety, quality and environmental responsibility.
              </p>

              <section className="mt-[2.35cqh] grid w-[38.8cqw] grid-cols-2 overflow-hidden rounded-[0.62rem] border border-white/70 bg-sky-50/25 px-[1cqw] py-[1.25cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.72),0_1rem_2.5rem_rgb(15_23_42/0.055)] backdrop-blur-[26px]">
                {certificationMetrics.map((item, index) => (
                  <CertificationMetric index={index} item={item} key={item.title} />
                ))}
              </section>
            </div>

            <div className="absolute right-[1.2cqw] top-[0.8cqh] h-[31cqh] w-[51cqw]">
              <img alt="" className="absolute inset-0 h-full w-full object-contain object-center opacity-80 mix-blend-multiply" src="/assets/generated/international-certifications-map.png" />
            </div>

            <section className="absolute right-[8.2cqw] bottom-[3.4cqh] grid max-w-[36rem] grid-cols-[0.18rem_minmax(0,1fr)] gap-[1.25cqw]">
              <span className="mt-[0.25cqh] h-[5.2cqh] bg-control-warm" />
              <span>
                <h2 className="text-[clamp(0.9rem,1.15cqw,1.32rem)] font-semibold uppercase leading-tight text-control-text">Trusted Worldwide</h2>
                <p className="mt-[0.55cqh] text-[clamp(0.66rem,0.86cqw,1rem)] font-medium leading-[1.32] text-control-text">
                  Our certified products are trusted in <span className="font-semibold text-control-warm">75+</span> countries across the globe.
                </p>
              </span>
            </section>
          </motion.section>

          <motion.section animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[0.62rem] border border-white/70 bg-sky-100/20 px-[0.8cqw] py-[1.5cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.72),0_1rem_2.5rem_rgb(15_23_42/0.06)] backdrop-blur-[28px]" initial={false} transition={{ duration: 0.72, delay: 0.12, ease }}>
            <div className="flex items-center justify-center gap-[1.6cqw]">
              <span className="h-[2px] w-[2rem] bg-control-warm" />
              <h2 className="text-[clamp(0.9rem,1.15cqw,1.32rem)] font-semibold uppercase leading-tight text-control-text">Product Certifications</h2>
              <span className="h-[2px] w-[2rem] bg-control-warm" />
            </div>
            <div className="mt-[1.45cqh] grid grid-cols-11 gap-[0.45cqw]">
              {productCertifications.map((item) => (
                <ProductCertificationCard item={item} key={item.title} />
              ))}
              {certificationGridPlaceholders.map((_, index) => (
                <span aria-hidden="true" className="invisible h-[23.4cqh]" key={`certificate-placeholder-${index}`} />
              ))}
            </div>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function CertificationMetric({ item, index }: { item: ManufacturingItem & { value: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[4.3rem_minmax(0,1fr)] items-center gap-[0.95cqw] px-[0.8cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className="grid h-[4rem] w-[4rem] place-items-center rounded-full bg-control-warm/7 text-control-warm">
        <Icon aria-hidden="true" size={40} strokeWidth={1.4} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(1.28rem,1.75cqw,2.1rem)] font-semibold leading-none text-control-warm">{item.value}</strong>
        <span className="mt-[0.42cqh] block text-[clamp(0.68rem,0.85cqw,1rem)] font-medium leading-[1.17] text-control-text">{item.title}</span>
      </span>
    </div>
  );
}

function ProductCertificationCard({ item }: { item: ProductCertification }) {
  return (
    <article
      className="grid h-[18.6cqh] min-w-0 grid-rows-[6.9rem_auto] justify-items-center rounded-[0.5rem] border border-white/60 bg-sky-50/25 px-[0.38cqw] py-[0.9cqh] text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.64)] backdrop-blur-[18px]"
      title={item.description}
    >
      <div className="grid h-[6.6rem] w-full place-items-center px-[0.18rem] py-[0.18rem]">
        <img alt={`${item.title} logo`} className="max-h-[5.65rem] max-w-full object-contain" src={item.logoSrc} />
      </div>
      <h3 className="min-w-0 max-w-full self-start text-wrap text-[clamp(0.5rem,0.58cqw,0.68rem)] font-semibold uppercase leading-[1.14] text-control-text">
        {item.title}
      </h3>
    </article>
  );
}

function CustomerPresenceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;
  const referencedCount = customerLogoReferences.length;

  useEffect(() => {
    recordEvidenceEvent("sector_selected", { chapterId: chapter.id, detail: "customer-presence-reference-redesign" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef3f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute right-[4cqw] top-[12cqh] h-[32cqh] w-[38cqw] rounded-full bg-control-warm/5 blur-[70px]" />
      <div className="pointer-events-none absolute left-[1.5cqw] top-[12cqh] h-[50cqh] w-[34cqw] opacity-[0.06] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <section className="absolute inset-x-[1.55cqw] top-[9.65cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[10.4cqh] grid grid-rows-[21.8cqh_37.2cqh_10.8cqh] gap-[1cqh]">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-[minmax(31rem,0.78fr)_minmax(0,1fr)] gap-[2cqw]"
            initial={false}
            transition={{ duration: 0.72, ease }}
          >
            <div className="min-w-0 pl-[0.4cqw] pt-[1.25cqh]">
              <h1 className="text-[clamp(2.35rem,3.45cqw,4.85rem)] font-bold uppercase leading-[0.98] tracking-normal text-black md:text-[2.5cqw]">
                <span className="block">Customers and</span>
                <span className="block text-control-warm">Global Presence</span>
              </h1>
              <div className="mt-[1.15cqh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.15cqh] max-w-[47rem] text-[clamp(0.76rem,0.95cqw,1.1rem)] font-medium leading-[1.3] text-slate-900 md:text-[0.8cqw]">
                Trusted across mission-critical environments, with customer references spanning public sector,
                transport, energy, utilities, industrial and technology operations.
              </p>
            </div>

            <div className="grid min-h-0 grid-cols-4 gap-[0.75cqw] pt-[0.65cqh]">
              {customerPresenceMetrics.map((item, index) => (
                <CustomerPresenceMetric index={index} item={item} key={item.label} />
              ))}
            </div>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(0,1fr)_minmax(26rem,0.55fr)] gap-[1.1cqw]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.08, ease }}
          >
            <div className="min-h-0 overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/72 p-[0.9cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[clamp(0.92rem,1.08cqw,1.28rem)] font-semibold uppercase leading-tight text-control-text">
                    Customer References by Sector
                  </h2>
                  <div className="mt-[0.7cqh] h-[2px] w-[2.6rem] bg-control-warm" />
                </div>
                <p className="rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {referencedCount} sourced names
                </p>
              </div>
              <div className="mt-[1cqh] grid grid-cols-3 gap-[0.65cqw]">
                {customerSectorGroups.map((group) => (
                  <CustomerSectorCard group={group} key={group.title} />
                ))}
              </div>
            </div>

            <div className="grid min-h-0 grid-rows-[1fr_auto] gap-[1.1cqh]">
              <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/72 p-[0.95cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.92rem,1.05cqw,1.22rem)] font-semibold uppercase leading-tight text-control-text">
                  Global Delivery Signal
                </h2>
                <div className="mt-[0.7cqh] h-[2px] w-[2.6rem] bg-control-warm" />
                <div className="relative mt-[1.1cqh] h-[19.6cqh] rounded-[0.8rem] border border-slate-200/80 bg-[radial-gradient(circle_at_25%_40%,rgba(220,38,38,0.13),transparent_22%),radial-gradient(circle_at_64%_35%,rgba(37,99,235,0.11),transparent_24%),linear-gradient(135deg,#f8fafc,#ffffff)]">
                  <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,#64748b_1.2px,transparent_1.2px)] [background-size:12px_12px]" />
                  <div className="absolute left-[10%] top-[32%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute left-[43%] top-[38%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute left-[61%] top-[28%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute left-[74%] top-[51%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute bottom-[1.3cqh] left-[1cqw] right-[1cqw] grid grid-cols-3 gap-[0.55cqw]">
                    {["India", "Middle East", "International markets"].map((region) => (
                      <div className="rounded-[0.55rem] bg-white/82 px-3 py-2 text-center text-[0.72rem] font-semibold text-slate-800 shadow-sm" key={region}>
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-[0.9rem] border border-control-warm/15 bg-control-warm/6 px-[0.95cqw] py-[0.85cqh]">
                <p className="text-[clamp(0.74rem,0.86cqw,0.98rem)] font-semibold leading-[1.28] text-slate-950">
                  Presence proof is strongest when it is organized around the customer’s operating environment,
                  not as a generic logo wall.
                </p>
              </section>
            </div>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/76 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.14, ease }}
          >
            {customerPresenceProof.map((item, index) => (
              <div className={`grid grid-cols-[2.6rem_minmax(0,1fr)] items-center gap-[0.75cqw] px-[1cqw] py-[1cqh] ${index ? "border-l border-slate-200/90" : ""}`} key={item.title}>
                <span className="grid size-9 place-items-center rounded-full bg-control-warm/7 text-control-warm">
                  <item.Icon aria-hidden="true" size={21} strokeWidth={1.6} />
                </span>
                <span>
                  <strong className="block text-[clamp(0.62rem,0.72cqw,0.84rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
                  <span className="mt-[0.25cqh] block text-[clamp(0.5rem,0.58cqw,0.68rem)] font-medium leading-[1.18] text-slate-700">{item.detail}</span>
                </span>
              </div>
            ))}
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.42, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : (
            <button aria-label="Toggle narration" className="pws-scene-control" onClick={() => dispatch({ type: "TOGGLE_NARRATION" })} title="Narration" type="button"><Headphones aria-hidden="true" size={22} /></button>
          )}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function CustomerPresenceMetric({ item, index }: { item: { value: string; label: string; Icon: LucideIcon }; index: number }) {
  return (
    <article className="grid min-w-0 grid-rows-[2.95rem_auto_minmax(0,1fr)] rounded-[0.85rem] border border-white/80 bg-white/72 px-[0.8cqw] py-[1cqh] text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.08)] backdrop-blur-[24px]">
      <div className="grid place-items-center">
        <span className="grid size-10 place-items-center rounded-full bg-control-warm/7 text-control-warm">
          <item.Icon aria-hidden="true" size={25} strokeWidth={1.55} />
        </span>
      </div>
      <strong className="mt-[0.35cqh] block text-[clamp(1.35rem,1.82cqw,2.05rem)] font-semibold leading-none text-control-warm">{item.value}</strong>
      <span className="mt-[0.5cqh] block text-[clamp(0.62rem,0.74cqw,0.86rem)] font-semibold leading-tight text-control-text">{item.label}</span>
    </article>
  );
}

function CustomerSectorCard({ group }: { group: { title: string; accent: string; Icon: LucideIcon; names: string[] } }) {
  return (
    <article className="min-h-[14.3cqh] rounded-[0.75rem] border border-slate-200/86 bg-white/66 p-[0.68cqw] shadow-[0_0.75rem_1.7rem_rgb(15_23_42/0.055)]">
      <div className="flex items-center gap-2">
        <group.Icon aria-hidden="true" className={group.accent} size={22} strokeWidth={1.7} />
        <h3 className="text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold uppercase leading-tight text-control-text">{group.title}</h3>
      </div>
      <div className="mt-[0.72cqh] flex flex-wrap gap-[0.28cqw]">
        {group.names.map((name) => (
          <span className="rounded-full border border-slate-200/90 bg-white/74 px-[0.42rem] py-[0.28rem] text-[clamp(0.42rem,0.49cqw,0.58rem)] font-bold leading-none text-slate-700" key={name}>
            {name}
          </span>
        ))}
      </div>
    </article>
  );
}

function EvidenceStage({ chapter, experience }: { chapter: Chapter; experience: EvidenceExperience }) {
  const { state } = usePresentation();
  const { mode: performanceMode } = usePerformanceMode();
  const reducedMotion = state.reducedMotion || performanceMode === "reduced";
  const [activeProofId, setActiveProofId] = useState(experience.proofItems[0]?.id ?? "");
  const [activeLayer, setActiveLayer] = useState<EvidenceLayer>("relevance");
  const [sourceOpen, setSourceOpen] = useState(false);
  const activeProof = useMemo(
    () => experience.proofItems.find((proof) => proof.id === activeProofId) ?? experience.proofItems[0],
    [activeProofId, experience.proofItems],
  );
  const cue = evidenceNarration[chapter.id]?.[activeLayer === "verification" ? 1 : 0];
  const asset = activeProof?.assetId ? assets.find((item) => item.id === activeProof.assetId) : null;
  const publicProofs = experience.proofItems.filter((proof) => proof.confidentiality === "public");
  const visibleProofs = state.mode === "presenter" ? experience.proofItems : publicProofs.length > 0 ? publicProofs : experience.proofItems.slice(0, 3);

  useEffect(() => {
    validateEvidenceExperience(evidenceExperiences);
    recordEvidenceEvent("evidence_journey_started", { chapterId: chapter.id, detail: experience.category });
  }, [chapter.id, experience.category]);

  useEffect(() => {
    if (state.mode !== "autoPlay") {
      return;
    }

    const timers = [
      ...visibleProofs.slice(0, 5).map((proof, index) =>
        window.setTimeout(() => {
          setActiveProofId(proof.id);
          setActiveLayer(index % 3 === 2 ? "verification" : index % 3 === 1 ? "evidence" : "relevance");
          recordEvidenceEvent(eventForCategory(experience.category), { chapterId: chapter.id, detail: proof.label });
        }, 4_000 + index * 5_800),
      ),
      window.setTimeout(() => setSourceOpen(false), Math.min(experience.autoplayMs - 3_000, 42_000)),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [chapter.id, experience.autoplayMs, experience.category, state.mode, visibleProofs]);

  function selectProof(proof: EvidenceProofItem) {
    setActiveProofId(proof.id);
    recordEvidenceEvent(eventForCategory(experience.category), { chapterId: chapter.id, detail: proof.label });
  }

  function openSource() {
    setSourceOpen(true);
    recordEvidenceEvent("evidence_source_opened", { chapterId: chapter.id, detail: activeProof.label });
  }

  return (
    <SceneCanvas className={`pws-evidence-scene pws-evidence-${experience.category}`} performanceMode={performanceMode} theme={chapter.themeVariant ?? "data-dark"}>
      <StructuralLayer variant={experience.category === "project-experience" ? "focus" : "data"} />
      <AmbientLayer atmosphere={experience.memoryMoment ? "bloom" : "linework"} intensity="low" />
      <SafeArea className="pws-evidence-safe">
        <section className="pws-evidence-narrative">
          <p className="pws-technical-label">{chapter.eyebrow}</p>
          <h1 className="pws-chapter-title mt-4">{chapter.headline}</h1>
          <p className="pws-body-copy mt-5">{chapter.supportingMessage}</p>
          <p className="pws-evidence-question mt-6">{experience.customerQuestion}</p>
        </section>

        <section className="pws-evidence-stage-wrap" aria-label={`${experience.title}: ${activeProof.label}`}>
          <EvidenceVisual
            activeLayer={activeLayer}
            assetSrc={asset?.src}
            experience={experience}
            proof={activeProof}
            reducedMotion={reducedMotion}
          />
          {sourceOpen ? <EvidenceSourceViewer experience={experience} proof={activeProof} onClose={() => setSourceOpen(false)} /> : null}
        </section>

        <section className="pws-evidence-controls" aria-label="Evidence controls">
          <div>
            <p className="pws-technical-label">Proof points</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {visibleProofs.slice(0, 10).map((proof) => (
                <button
                  aria-pressed={activeProof.id === proof.id}
                  className={`pws-evidence-proof-button ${activeProof.id === proof.id ? "is-active" : ""}`}
                  key={proof.id}
                  onClick={() => selectProof(proof)}
                  type="button"
                >
                  {proof.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <PrecisionButton onClick={() => setActiveLayer("relevance")}>Relevance</PrecisionButton>
            <PrecisionButton onClick={() => setActiveLayer("evidence")}>Evidence</PrecisionButton>
            <PrecisionButton onClick={() => setActiveLayer("verification")}>Verify</PrecisionButton>
            <PrecisionButton onClick={openSource} variant="primary">Open source</PrecisionButton>
          </div>
        </section>

        <aside className="pws-evidence-status">
          {chapter.narration?.recommended ? <AudioPulse reducedMotion={reducedMotion} state={state.narrationEnabled ? "available" : "paused"} /> : null}
          <p>{cue?.text ?? experience.claimBoundary}</p>
        </aside>
      </SafeArea>
    </SceneCanvas>
  );
}

function EvidenceVisual({
  activeLayer,
  assetSrc,
  experience,
  proof,
  reducedMotion,
}: {
  activeLayer: EvidenceLayer;
  assetSrc?: string;
  experience: EvidenceExperience;
  proof: EvidenceProofItem;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: reducedMotion ? 1 : activeLayer === "verification" ? 0.996 : 1 }}
      className="pws-evidence-stage"
      data-category={experience.category}
      data-layer={activeLayer}
      transition={{ duration: reducedMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {assetSrc ? <img alt="" className="pws-evidence-media" src={assetSrc} /> : null}
      <div className="pws-evidence-proof-line" />
      <div className="pws-evidence-proof-core">
        <span>{proof.label}</span>
        <strong>{proof.value}</strong>
        <em>{labelForLayer(activeLayer)}</em>
      </div>
      <div className="pws-evidence-proof-detail">
        {activeLayer === "relevance" ? proof.customerRelevance : activeLayer === "evidence" ? proof.evidence : proof.verification}
      </div>
      <div className="pws-evidence-trust-rail">
        <span className="is-active">Customer relevance</span>
        <span className={activeLayer !== "relevance" ? "is-active" : ""}>Evidence</span>
        <span className={activeLayer === "verification" ? "is-active" : ""}>Verification</span>
      </div>
      <div className="pws-evidence-map-list">
        {experience.featuredProjects.slice(0, 5).map((project) => (
          <span key={project.id}>
            {project.location.city ?? project.location.stateOrRegion ?? project.location.country}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function EvidenceSourceViewer({
  experience,
  onClose,
  proof,
}: {
  experience: EvidenceExperience;
  onClose: () => void;
  proof: EvidenceProofItem;
}) {
  return (
    <div className="pws-evidence-source-viewer" role="dialog" aria-modal="true" aria-label={`Evidence source for ${proof.label}`}>
      <p className="pws-technical-label">Evidence Source</p>
      <h2>{proof.label}</h2>
      <dl>
        <div><dt>Source</dt><dd>{proof.source.document}</dd></div>
        <div><dt>Page</dt><dd>{proof.source.page}</dd></div>
        <div><dt>Status</dt><dd>{proof.trustState}</dd></div>
        <div><dt>Access</dt><dd>{proof.confidentiality}</dd></div>
        <div><dt>Scope</dt><dd>{proof.source.note}</dd></div>
        <div><dt>Restriction</dt><dd>{proof.restrictedWording}</dd></div>
      </dl>
      <p>{experience.claimBoundary}</p>
      <button className="pws-evidence-close" onClick={onClose} type="button">Close source</button>
    </div>
  );
}

function labelForLayer(layer: EvidenceLayer) {
  if (layer === "evidence") return "Evidence";
  if (layer === "verification") return "Verification";
  return "Customer relevance";
}

function eventForCategory(category: EvidenceCategory): EvidenceEvent {
  switch (category) {
    case "manufacturing-quality":
      return "manufacturing_stage_opened";
    case "design-engineering":
      return "engineering_stage_opened";
    case "certification-standards":
      return "certification_opened";
    case "project-experience":
      return "project_opened";
    case "customer-presence":
      return "sector_selected";
    case "service-support":
      return "support_service_opened";
    default:
      return "capability_viewed";
  }
}


