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

const manufacturingMetrics: (ManufacturingItem & { value: string })[] = [
  { title: "Sq. ft. Manufacturing Area", value: "1000,000", description: "", Icon: Factory },
  { title: "People Working with us", value: "2500+", description: "", Icon: Users },
  { title: "Engineered Products", value: "50+", description: "", Icon: Settings },
  { title: "Countries Served", value: "75+", description: "", Icon: Globe2 },
  { title: "Sales FY 2025-26", value: "INR 1056 Cr.", description: "", Icon: TrendingUp },
  { title: "Patents Granted", value: "25", description: "", Icon: FileBadge },
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

const productCertifications: (ManufacturingItem & { logo: string; accent: string })[] = [
  { title: "GREENGUARD", logo: "UL", accent: "bg-green-500 text-white", description: "Certified for low chemical emissions, contributing to healthier indoor environments.", Icon: Leaf },
  { title: "GREENGUARD GOLD", logo: "UL", accent: "bg-green-500 text-white", description: "Meets more stringent emission standards for sensitive environments and vulnerable occupants.", Icon: Leaf },
  { title: "UL CERTIFIED", logo: "UL", accent: "bg-black text-white", description: "Products tested to UL standards for safety and reliability.", Icon: BadgeCheck },
  { title: "CE MARK", logo: "CE", accent: "bg-white text-black", description: "Conformity with European health, safety and environmental protection standards.", Icon: BadgeCheck },
  { title: "TÜV SÜD", logo: "TÜV", accent: "bg-blue-700 text-white", description: "Independently tested for safety, quality and performance.", Icon: ShieldCheck },
  { title: "FCC COMPLIANT", logo: "FCC", accent: "bg-white text-black", description: "Conforms to electromagnetic interference regulations for electronic components.", Icon: MonitorCog },
  { title: "ROHS COMPLIANT", logo: "RoHS", accent: "bg-white text-green-700", description: "Restriction of hazardous substances for environmental safety.", Icon: Leaf },
  { title: "ISO 13849", logo: "ISO", accent: "bg-blue-700 text-white", description: "Safety of machinery - safety-related parts of control systems.", Icon: ShieldCheck },
];

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
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-rows-[32.2vh_13.6vh_31.1vh] gap-[1.05vh]">
          <motion.section animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.4vw] top-[3.2vh] z-20">
              <h1 className="text-[clamp(2.8rem,4vw,5.75rem)] font-black uppercase leading-[0.98] tracking-normal text-black">
                <span className="block">Manufacturing</span>
                <span className="block text-control-warm">and Quality.</span>
              </h1>
              <div className="mt-[1.65vh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.75vh] max-w-[35rem] text-[clamp(0.86rem,1.12vw,1.38rem)] font-medium leading-[1.32] text-slate-900">
                State-of-the-art manufacturing infrastructure and robust quality systems that ensure precision, reliability and long-term performance.
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 w-[65%] overflow-hidden rounded-[0.2rem]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" src="/assets/generated/manufacturing-quality-hero.png" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgb(255_255_255/0.82)_12%,rgb(255_255_255/0.08)_42%,rgb(255_255_255/0)_100%)]" />
            </div>
          </motion.section>

          <motion.section animate={{ opacity: 1, y: 0 }} className="grid grid-cols-6 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/70 px-[0.85vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.7, delay: 0.08, ease }}>
            {manufacturingMetrics.map((item, index) => (
              <ManufacturingMetric index={index} item={item} key={item.title} />
            ))}
          </motion.section>

          <motion.section animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[minmax(0,0.47fr)_minmax(0,0.53fr)] gap-[0.9vw]" initial={false} transition={{ duration: 0.72, delay: 0.16, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/68 px-[1.45vw] py-[1.9vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.9rem,1.1vw,1.25rem)] font-black uppercase leading-tight text-control-text">Group Turnover</h2>
              <div className="mt-[0.7vh] h-[2px] w-[2.15rem] bg-control-warm" />
              <p className="mt-[1.1vh] text-[clamp(0.56rem,0.68vw,0.78rem)] font-medium text-control-text">In Cr. INR</p>
              <div className="relative mt-[1.1vh] h-[19vh] border-b border-slate-300/90">
                <div className="absolute inset-y-0 left-0 flex w-[2.5rem] flex-col justify-between text-[clamp(0.46rem,0.55vw,0.64rem)] font-medium text-control-text">
                  <span>1200</span>
                  <span>800</span>
                  <span>600</span>
                  <span>400</span>
                  <span>200</span>
                  <span>0</span>
                </div>
                <div className="absolute inset-y-0 left-[3.2rem] right-0 grid grid-cols-11 items-end gap-[0.65vw]">
                  {turnoverBars.map((bar) => (
                    <TurnoverBar bar={bar} max={maxTurnover} key={bar.year} />
                  ))}
                </div>
              </div>
              <p className="mt-[0.72vh] text-center text-[clamp(0.56rem,0.66vw,0.76rem)] font-medium text-control-text">Year</p>
            </section>

            <section className="grid min-h-0 grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/68 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="px-[1.45vw] py-[1.9vh]">
                <h2 className="text-[clamp(0.9rem,1.1vw,1.25rem)] font-black uppercase leading-tight text-control-text">Quality at Every Step</h2>
                <div className="mt-[0.7vh] h-[2px] w-[2.15rem] bg-control-warm" />
                <div className="mt-[1.7vh] grid gap-[1.35vh]">
                  {qualityStepItems.map((item) => (
                    <QualityStep item={item} key={item.title} />
                  ))}
                </div>
              </div>
              <div className="border-l border-slate-200/90 px-[1.4vw] py-[7.2vh]">
                <h3 className="text-center text-[clamp(0.72rem,0.9vw,1.05rem)] font-black uppercase leading-tight text-control-text">Management Certifications</h3>
                <div className="mt-[3.1vh] grid grid-cols-3 gap-[1vw]">
                  {managementCertifications.map((item) => (
                    <CertificationBadge label={item} key={item} />
                  ))}
                </div>
              </div>
            </section>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
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

function ManufacturingMetric({ item, index }: { item: ManufacturingItem & { value: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[4.1rem_minmax(0,1fr)] items-center gap-[0.8vw] px-[0.8vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className="grid h-[3.8rem] w-[3.8rem] place-items-center rounded-full bg-control-warm/7 text-control-warm">
        <Icon aria-hidden="true" size={36} strokeWidth={1.45} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(1.25rem,1.62vw,1.9rem)] font-black leading-none text-control-warm">{item.value}</strong>
        <span className="mt-[0.45vh] block text-[clamp(0.68rem,0.82vw,0.98rem)] font-medium leading-[1.15] text-control-text">{item.title}</span>
      </span>
    </div>
  );
}

function TurnoverBar({ bar, max }: { bar: (typeof turnoverBars)[number]; max: number }) {
  return (
    <div className="relative flex h-full min-w-0 flex-col items-center justify-end">
      <span className="mb-[0.38vh] text-[clamp(0.42rem,0.52vw,0.62rem)] font-medium leading-none text-control-text">{bar.value}</span>
      <div className="w-[1.35rem] rounded-t-[0.08rem] bg-control-warm shadow-[0_0.45rem_1rem_rgb(239_68_68/0.16)]" style={{ height: `${Math.max(2, (bar.value / max) * 82)}%` }} />
      <span className="mt-[0.55vh] text-[clamp(0.45rem,0.56vw,0.66rem)] font-medium leading-none text-control-text">{bar.year}</span>
    </div>
  );
}

function QualityStep({ item }: { item: ManufacturingItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[3.4rem_minmax(0,1fr)] items-start gap-[0.85vw]">
      <Icon aria-hidden="true" className="text-control-warm" size={34} strokeWidth={1.45} />
      <p className="text-[clamp(0.62rem,0.76vw,0.9rem)] font-medium leading-[1.32] text-control-text">{item.description}</p>
    </div>
  );
}

function CertificationBadge({ label }: { label: string }) {
  const [, code] = label.split(" ");
  return (
    <div className="min-w-0 text-center">
      <div className="mx-auto grid h-[4.9rem] w-[4.9rem] place-items-center rounded-[0.65rem] border border-control-warm/60 bg-white/65 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
        <span className="text-center">
          <strong className="block text-[1.2rem] font-black leading-none">ISO</strong>
          <span className="mt-1 block text-[0.86rem] font-black leading-none">{code}</span>
        </span>
      </div>
      <p className="mt-[1.1vh] text-[clamp(0.52rem,0.64vw,0.76rem)] font-medium text-control-text">{label}</p>
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
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-rows-[44.6vh_32.3vh] gap-[1.2vh]">
          <motion.section animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.4vw] top-[4vh] z-20">
              <h1 className="text-[clamp(2.75rem,4vw,5.65rem)] font-black uppercase leading-[0.98] tracking-normal text-black">
                <span className="block">International</span>
                <span className="block text-control-warm">Certifications</span>
              </h1>
              <div className="mt-[1.65vh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.75vh] max-w-[37rem] text-[clamp(0.86rem,1.12vw,1.38rem)] font-medium leading-[1.32] text-slate-900">
                Our products are tested and certified to meet globally recognized standards for safety, quality and environmental responsibility.
              </p>

              <section className="mt-[2.35vh] grid w-[38.8vw] grid-cols-2 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/70 px-[1vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                {certificationMetrics.map((item, index) => (
                  <CertificationMetric index={index} item={item} key={item.title} />
                ))}
              </section>
            </div>

            <div className="absolute right-[1.2vw] top-[0.8vh] h-[31vh] w-[51vw]">
              <img alt="" className="absolute inset-0 h-full w-full object-contain object-center opacity-95" src="/assets/generated/international-certifications-map.png" />
            </div>

            <section className="absolute right-[8.2vw] bottom-[3.4vh] grid max-w-[36rem] grid-cols-[0.18rem_minmax(0,1fr)] gap-[1.25vw]">
              <span className="mt-[0.25vh] h-[5.2vh] bg-control-warm" />
              <span>
                <h2 className="text-[clamp(0.9rem,1.15vw,1.32rem)] font-black uppercase leading-tight text-control-text">Trusted Worldwide</h2>
                <p className="mt-[0.55vh] text-[clamp(0.66rem,0.86vw,1rem)] font-medium leading-[1.32] text-control-text">
                  Our certified products are trusted in <span className="font-black text-control-warm">75+</span> countries across the globe.
                </p>
              </span>
            </section>
          </motion.section>

          <motion.section animate={{ opacity: 1, y: 0 }} className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/70 px-[0.8vw] py-[1.5vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.12, ease }}>
            <div className="flex items-center justify-center gap-[1.6vw]">
              <span className="h-[2px] w-[2rem] bg-control-warm" />
              <h2 className="text-[clamp(0.9rem,1.15vw,1.32rem)] font-black uppercase leading-tight text-control-text">Product Certifications</h2>
              <span className="h-[2px] w-[2rem] bg-control-warm" />
            </div>
            <div className="mt-[1.8vh] grid grid-cols-8 gap-[0.75vw]">
              {productCertifications.map((item) => (
                <ProductCertificationCard item={item} key={item.title} />
              ))}
            </div>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
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
    <div className={`grid min-w-0 grid-cols-[4.3rem_minmax(0,1fr)] items-center gap-[0.95vw] px-[0.8vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className="grid h-[4rem] w-[4rem] place-items-center rounded-full bg-control-warm/7 text-control-warm">
        <Icon aria-hidden="true" size={40} strokeWidth={1.4} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(1.28rem,1.75vw,2.1rem)] font-black leading-none text-control-warm">{item.value}</strong>
        <span className="mt-[0.42vh] block text-[clamp(0.68rem,0.85vw,1rem)] font-medium leading-[1.17] text-control-text">{item.title}</span>
      </span>
    </div>
  );
}

function ProductCertificationCard({ item }: { item: ManufacturingItem & { logo: string; accent: string } }) {
  const Icon = item.Icon;
  return (
    <article className="grid h-[24vh] min-w-0 grid-rows-[5.6rem_auto_minmax(0,1fr)] rounded-[0.5rem] border border-slate-200/86 bg-white/62 px-[0.7vw] py-[1.1vh] text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.8rem_1.7rem_rgb(15_23_42/0.06)]">
      <div className="grid place-items-center">
        <div className={`grid h-[4.65rem] w-[4.65rem] place-items-center rounded-[0.7rem] border border-slate-200/70 ${item.accent} shadow-[0_0.55rem_1.25rem_rgb(15_23_42/0.08)]`}>
          <span className="text-center">
            {item.logo === "RoHS" ? <Icon aria-hidden="true" className="mx-auto mb-0.5" size={23} strokeWidth={1.7} /> : null}
            <strong className="block text-[clamp(1.05rem,1.28vw,1.52rem)] font-black leading-none">{item.logo}</strong>
            {item.title.includes("GOLD") ? <span className="mt-1 block text-[0.52rem] font-black uppercase">Gold</span> : null}
            {item.title === "GREENGUARD" ? <span className="mt-1 block text-[0.48rem] font-black uppercase">Greenguard</span> : null}
            {item.title === "ISO 13849" ? <span className="mt-1 block text-[0.6rem] font-black">13849</span> : null}
          </span>
        </div>
      </div>
      <h3 className="mt-[0.55vh] text-[clamp(0.55rem,0.67vw,0.78rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.72vh] max-w-[9.5rem] text-[clamp(0.48rem,0.58vw,0.68rem)] font-medium leading-[1.34] text-slate-800">{item.description}</p>
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
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute right-[4vw] top-[12vh] h-[32vh] w-[38vw] rounded-full bg-control-warm/5 blur-[70px]" />
      <div className="pointer-events-none absolute left-[1.5vw] top-[12vh] h-[50vh] w-[34vw] opacity-[0.06] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[10.4vh] grid grid-rows-[21.8vh_37.2vh_10.8vh] gap-[1vh]">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-[minmax(31rem,0.78fr)_minmax(0,1fr)] gap-[2vw]"
            initial={false}
            transition={{ duration: 0.72, ease }}
          >
            <div className="min-w-0 pl-[0.4vw] pt-[1.25vh]">
              <h1 className="text-[clamp(2.35rem,3.45vw,4.85rem)] font-black uppercase leading-[0.98] tracking-normal text-black">
                <span className="block">Customers and</span>
                <span className="block text-control-warm">Global Presence</span>
              </h1>
              <div className="mt-[1.15vh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.15vh] max-w-[47rem] text-[clamp(0.76rem,0.95vw,1.1rem)] font-medium leading-[1.3] text-slate-900">
                Trusted across mission-critical environments, with customer references spanning public sector,
                transport, energy, utilities, industrial and technology operations.
              </p>
            </div>

            <div className="grid min-h-0 grid-cols-4 gap-[0.75vw] pt-[0.65vh]">
              {customerPresenceMetrics.map((item, index) => (
                <CustomerPresenceMetric index={index} item={item} key={item.label} />
              ))}
            </div>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(0,1fr)_minmax(26rem,0.55fr)] gap-[1.1vw]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.08, ease }}
          >
            <div className="min-h-0 overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/72 p-[0.9vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[clamp(0.92rem,1.08vw,1.28rem)] font-black uppercase leading-tight text-control-text">
                    Customer References by Sector
                  </h2>
                  <div className="mt-[0.7vh] h-[2px] w-[2.6rem] bg-control-warm" />
                </div>
                <p className="rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-slate-600">
                  {referencedCount} sourced names
                </p>
              </div>
              <div className="mt-[1vh] grid grid-cols-3 gap-[0.65vw]">
                {customerSectorGroups.map((group) => (
                  <CustomerSectorCard group={group} key={group.title} />
                ))}
              </div>
            </div>

            <div className="grid min-h-0 grid-rows-[1fr_auto] gap-[1.1vh]">
              <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/72 p-[0.95vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.92rem,1.05vw,1.22rem)] font-black uppercase leading-tight text-control-text">
                  Global Delivery Signal
                </h2>
                <div className="mt-[0.7vh] h-[2px] w-[2.6rem] bg-control-warm" />
                <div className="relative mt-[1.1vh] h-[19.6vh] rounded-[0.8rem] border border-slate-200/80 bg-[radial-gradient(circle_at_25%_40%,rgba(220,38,38,0.13),transparent_22%),radial-gradient(circle_at_64%_35%,rgba(37,99,235,0.11),transparent_24%),linear-gradient(135deg,#f8fafc,#ffffff)]">
                  <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(circle,#64748b_1.2px,transparent_1.2px)] [background-size:12px_12px]" />
                  <div className="absolute left-[10%] top-[32%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute left-[43%] top-[38%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute left-[61%] top-[28%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute left-[74%] top-[51%] size-3 rounded-full bg-control-warm shadow-[0_0_0_0.55rem_rgb(220_38_38/0.10)]" />
                  <div className="absolute bottom-[1.3vh] left-[1vw] right-[1vw] grid grid-cols-3 gap-[0.55vw]">
                    {["India", "Middle East", "International markets"].map((region) => (
                      <div className="rounded-[0.55rem] bg-white/82 px-3 py-2 text-center text-[0.72rem] font-black text-slate-800 shadow-sm" key={region}>
                        {region}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-[0.9rem] border border-control-warm/15 bg-control-warm/6 px-[0.95vw] py-[0.85vh]">
                <p className="text-[clamp(0.74rem,0.86vw,0.98rem)] font-semibold leading-[1.28] text-slate-950">
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
              <div className={`grid grid-cols-[2.6rem_minmax(0,1fr)] items-center gap-[0.75vw] px-[1vw] py-[1vh] ${index ? "border-l border-slate-200/90" : ""}`} key={item.title}>
                <span className="grid size-9 place-items-center rounded-full bg-control-warm/7 text-control-warm">
                  <item.Icon aria-hidden="true" size={21} strokeWidth={1.6} />
                </span>
                <span>
                  <strong className="block text-[clamp(0.62rem,0.72vw,0.84rem)] font-black leading-tight text-control-text">{item.title}</strong>
                  <span className="mt-[0.25vh] block text-[clamp(0.5rem,0.58vw,0.68rem)] font-medium leading-[1.18] text-slate-700">{item.detail}</span>
                </span>
              </div>
            ))}
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.42, ease }}>
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
    <article className="grid min-w-0 grid-rows-[2.95rem_auto_minmax(0,1fr)] rounded-[0.85rem] border border-white/80 bg-white/72 px-[0.8vw] py-[1vh] text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.08)] backdrop-blur-[24px]">
      <div className="grid place-items-center">
        <span className="grid size-10 place-items-center rounded-full bg-control-warm/7 text-control-warm">
          <item.Icon aria-hidden="true" size={25} strokeWidth={1.55} />
        </span>
      </div>
      <strong className="mt-[0.35vh] block text-[clamp(1.35rem,1.82vw,2.05rem)] font-black leading-none text-control-warm">{item.value}</strong>
      <span className="mt-[0.5vh] block text-[clamp(0.62rem,0.74vw,0.86rem)] font-semibold leading-tight text-control-text">{item.label}</span>
    </article>
  );
}

function CustomerSectorCard({ group }: { group: { title: string; accent: string; Icon: LucideIcon; names: string[] } }) {
  return (
    <article className="min-h-[14.3vh] rounded-[0.75rem] border border-slate-200/86 bg-white/66 p-[0.68vw] shadow-[0_0.75rem_1.7rem_rgb(15_23_42/0.055)]">
      <div className="flex items-center gap-2">
        <group.Icon aria-hidden="true" className={group.accent} size={22} strokeWidth={1.7} />
        <h3 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-tight text-control-text">{group.title}</h3>
      </div>
      <div className="mt-[0.72vh] flex flex-wrap gap-[0.28vw]">
        {group.names.map((name) => (
          <span className="rounded-full border border-slate-200/90 bg-white/74 px-[0.42rem] py-[0.28rem] text-[clamp(0.42rem,0.49vw,0.58rem)] font-bold leading-none text-slate-700" key={name}>
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
