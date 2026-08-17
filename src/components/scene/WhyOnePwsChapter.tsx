import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Factory,
  FileCheck2,
  Globe2,
  Headphones,
  Map,
  MonitorCog,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getAsset } from "../../content/assetManifest";
import { credentialProofPoints, customerLogoReferences } from "../../content/credentials";
import { projects } from "../../content/projects";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type ProofMetric = {
  value: string;
  label: string;
  detail: string;
  Icon: LucideIcon;
};

type DecisionPillar = {
  title: string;
  detail: string;
  proof: string;
  Icon: LucideIcon;
  accent: string;
};

const proofValue = (id: string, fallback: string) =>
  credentialProofPoints.find((point) => point.id === id)?.value ?? fallback;

const whyOnePwsMetrics: ProofMetric[] = [
  {
    value: proofValue("control-desk-solutions", "75,000+"),
    label: "Control desk solutions",
    detail: "Installed product depth for control-room environments.",
    Icon: MonitorCog,
  },
  {
    value: proofValue("design-build-solutions", "450+"),
    label: "Design-build interiors",
    detail: "Interior delivery experience across mission-critical spaces.",
    Icon: Building2,
  },
  {
    value: proofValue("workspace-customers", "250+"),
    label: "Customers served globally",
    detail: "Referenced across public sector, transport, energy and industry.",
    Icon: Users,
  },
  {
    value: proofValue("onepws-countries", "35+"),
    label: "Countries served",
    detail: "Global presence for OnePWS projects and customers.",
    Icon: Globe2,
  },
  {
    value: proofValue("workspace-certifications", "20+"),
    label: "International certifications",
    detail: "Product certification and compliance proof points.",
    Icon: BadgeCheck,
  },
  {
    value: proofValue("workspace-factory-area", "170,000 sq. ft."),
    label: "Dedicated factory area",
    detail: "Manufacturing capability dedicated to workspace solutions.",
    Icon: Factory,
  },
];

const decisionPillars: DecisionPillar[] = [
  {
    title: "One Accountable Partner",
    detail: "Design, engineering, manufacturing, integration and support come together under one responsibility.",
    proof: "Reduces handoff risk",
    Icon: Network,
    accent: "text-control-warm",
  },
  {
    title: "Built Around Operators",
    detail: "Ergonomics, sightlines, reach, comfort and intelligent features are treated as performance requirements.",
    proof: "Human-centered by design",
    Icon: Users,
    accent: "text-blue-600",
  },
  {
    title: "Engineered for Reliability",
    detail: "Consoles, architecture, power, environment, access and AV systems are planned as one operational ecosystem.",
    proof: "Mission-critical room logic",
    Icon: ShieldCheck,
    accent: "text-green-600",
  },
  {
    title: "Manufactured with Control",
    detail: "Dedicated production capacity, SAP-enabled process discipline and long-term project records support quality.",
    proof: "Traceable execution",
    Icon: Wrench,
    accent: "text-orange-600",
  },
  {
    title: "Proven Across Sectors",
    detail: "References span rail, smart city, public safety, energy, oil and gas, utilities, industrial and technology.",
    proof: `${customerLogoReferences.length} sourced names`,
    Icon: Award,
    accent: "text-violet-600",
  },
  {
    title: "Future-Ready Platform",
    detail: "The room can evolve from furniture and displays into connected intelligence, software workflows and lifecycle insight.",
    proof: "Ready for the next operating model",
    Icon: Sparkles,
    accent: "text-cyan-600",
  },
];

const buyerOutcomes = [
  "Fewer coordination gaps",
  "Clearer technical ownership",
  "More consistent operator experience",
  "Stronger project confidence",
  "Better lifecycle support",
];

const featuredProjectNames = projects
  .filter((project) => project.featured)
  .slice(0, 6)
  .map((project) => project.name.replace("WDFCC / Dedicated Freight Corridor, Ahmedabad", "DFCC Ahmedabad"));

export function WhyOnePwsChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;
  const roomAsset = getAsset("showroom-control-room-wide") ?? getAsset("ambient-control-room");

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef3f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute right-[3cqw] top-[12cqh] h-[36cqh] w-[38cqw] rounded-full bg-control-warm/5 blur-[76px]" />
      <div className="pointer-events-none absolute left-[1cqw] top-[14cqh] h-[58cqh] w-[40cqw] opacity-[0.055] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <section className="relative z-10 flex h-full flex-col px-[1.55cqw] pb-[8.4cqh] pt-[9.65cqh]">
        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-[1.45cqh]">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(30rem,0.72fr)_minmax(0,1fr)] gap-[1.4cqw]"
            initial={false}
            transition={{ duration: 0.72, ease }}
          >
            <div className="min-w-0 pl-[0.35cqw] pt-[1.05cqh]">
              <h1 className="text-[clamp(2.45rem,3.2cqw,4.45rem)] font-bold uppercase leading-[1.02] tracking-normal text-black md:text-[2.42cqw]">
                <span className="block">Why</span>
                <span className="block text-control-warm">OnePWS.</span>
              </h1>
              <div className="mt-[1.15cqh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.25cqh] max-w-[48rem] text-[clamp(0.92rem,1.04cqw,1.2rem)] font-medium leading-[1.38] text-slate-900 md:text-[0.9cqw]">
                One accountable capability for the complete control room: design, ergonomics, manufacturing,
                integration, compliance, project proof and lifecycle support.
              </p>
            </div>

            <div className="grid min-h-0 grid-cols-3 grid-rows-2 gap-x-[0.72cqw] gap-y-[0.9cqh] pt-[0.35cqh]">
              {whyOnePwsMetrics.map((metric, index) => (
                <WhyMetricCard index={index} key={metric.label} metric={metric} />
              ))}
            </div>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(32rem,0.98fr)_minmax(0,1.02fr)] gap-[1.35cqw]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.08, ease }}
          >
            <section className="relative min-h-0 overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/72 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.8rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              {roomAsset?.src ? (
                <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" draggable={false} src={roomAsset.src} />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.82)_0%,rgb(255_255_255/0.32)_48%,rgb(255_255_255/0.1)_100%)]" />
              <div className="absolute left-[1.1cqw] top-[1.5cqh] max-w-[22rem] rounded-[0.65rem] border border-white/84 bg-white/76 p-[1.05cqw] shadow-[0_0.75rem_1.8rem_rgb(15_23_42/0.09)] backdrop-blur-[18px]">
                <p className="text-[clamp(0.82rem,0.92cqw,1.08rem)] font-semibold uppercase leading-tight text-control-text">
                  The buying decision is not furniture versus technology.
                </p>
                <p className="mt-[0.65cqh] text-[clamp(0.68rem,0.78cqw,0.92rem)] font-medium leading-[1.32] text-slate-700">
                  It is whether the whole room can perform as one environment.
                </p>
              </div>
              <div className="absolute bottom-[1.2cqh] left-[1.1cqw] right-[1.1cqw] grid grid-cols-3 gap-[0.62cqw]">
                {["People", "Room", "Systems"].map((label, index) => (
                  <div className="rounded-[0.7rem] border border-white/78 bg-white/72 px-[0.75cqw] py-[0.85cqh] text-center shadow-sm backdrop-blur-[14px]" key={label}>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-slate-500">0{index + 1}</p>
                    <p className="mt-[0.25cqh] text-[0.94rem] font-semibold text-control-text">{label}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex min-h-0 flex-col">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[clamp(1rem,1.14cqw,1.34rem)] font-semibold uppercase leading-tight text-control-text">
                    What Makes the Decision Safer
                  </h2>
                  <div className="mt-[0.7cqh] h-[2px] w-[2.6rem] bg-control-warm" />
                </div>
                <p className="rounded-full border border-slate-200 bg-white/82 px-3 py-1 text-[clamp(0.58rem,0.66cqw,0.76rem)] font-semibold uppercase tracking-[0.14em] text-slate-600">
                  Customer-facing proof
                </p>
              </div>

              <div className="mt-[1.2cqh] grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-x-[0.82cqw] gap-y-[0.95cqh]">
                {decisionPillars.map((pillar) => (
                  <WhyPillarCard key={pillar.title} pillar={pillar} />
                ))}
              </div>
            </section>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] gap-[1.35cqw]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.14, ease }}
          >
            <section className="rounded-[0.65rem] border border-slate-200/86 bg-white/78 px-[1.35cqw] py-[1.35cqh] shadow-[0_0.9rem_2.2rem_rgb(15_23_42/0.065)]">
              <h2 className="text-[clamp(0.94rem,1.04cqw,1.18rem)] font-semibold uppercase leading-tight text-control-text">
                Proven Where Control Rooms Matter
              </h2>
              <div className="mt-[0.55cqh] h-[2px] w-[2.35rem] bg-control-warm" />
              <div className="mt-[0.9cqh] grid grid-cols-3 gap-x-[0.55cqw] gap-y-[0.65cqh]">
                {featuredProjectNames.map((project) => (
                  <div className="rounded-[0.45rem] border border-slate-200/86 bg-white/76 px-[0.7cqw] py-[0.62cqh] text-[clamp(0.64rem,0.72cqw,0.84rem)] font-semibold leading-tight text-slate-800" key={project}>
                    <span className="block">{project}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid min-h-0 grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] rounded-[0.65rem] border border-slate-200/86 bg-white/78 p-[0.45cqw] shadow-[0_0.9rem_2.2rem_rgb(15_23_42/0.065)]">
              <div className="border-r border-slate-200/90 px-[1.35cqw] py-[1.3cqh]">
                <p className="text-[clamp(1.28rem,1.66cqw,1.95rem)] font-semibold leading-tight text-control-text">
                  Better rooms start with <span className="text-control-warm">one accountable system.</span>
                </p>
                <p className="mt-[0.75cqh] text-[clamp(0.68rem,0.76cqw,0.88rem)] font-medium leading-[1.3] text-slate-700">
                  A complete control-room partner helps customers align operators, technology, space and long-term support.
                </p>
              </div>
              <div className="grid content-center gap-[0.55cqh] px-[1.35cqw] py-[1.2cqh]">
                {buyerOutcomes.map((outcome) => (
                  <div className="flex items-center gap-2.5 text-[clamp(0.66rem,0.76cqw,0.88rem)] font-semibold text-slate-800" key={outcome}>
                    <CheckCircle2 aria-hidden="true" className="shrink-0 text-control-warm" size={18} strokeWidth={1.8} />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[1.7cqh] left-[1.65cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.42, ease }}>
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

function WhyMetricCard({ metric }: { metric: ProofMetric; index: number }) {
  return (
    <article className="grid min-w-0 content-center rounded-[0.65rem] border border-white/85 bg-white/76 px-[0.8cqw] py-[1cqh] text-center shadow-[0_0.85rem_2rem_rgb(15_23_42/0.065)]">
      <div className="grid place-items-center">
        <span className="grid size-11 place-items-center rounded-full bg-control-warm/7 text-control-warm">
          <metric.Icon aria-hidden="true" size={28} strokeWidth={1.55} />
        </span>
      </div>
      <strong className="mt-[0.55cqh] block text-[clamp(1.35rem,1.66cqw,1.95rem)] font-semibold leading-none text-control-warm">{metric.value}</strong>
      <span className="mt-[0.55cqh] block text-[clamp(0.68rem,0.78cqw,0.92rem)] font-semibold leading-tight text-control-text">{metric.label}</span>
      <span className="sr-only">{metric.detail}</span>
    </article>
  );
}

function WhyPillarCard({ pillar }: { pillar: DecisionPillar }) {
  return (
    <article className="h-full min-h-0 overflow-hidden rounded-[0.55rem] border border-slate-200/86 bg-white/72 p-[0.78cqw] shadow-[0_0.55rem_1.35rem_rgb(15_23_42/0.045)]">
      <div className="flex items-start gap-2.5">
        <span className={`grid size-10 shrink-0 place-items-center rounded-full bg-slate-50 ${pillar.accent}`}>
          <pillar.Icon aria-hidden="true" size={25} strokeWidth={1.65} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[clamp(0.68rem,0.78cqw,0.92rem)] font-semibold uppercase leading-tight text-control-text">{pillar.title}</h3>
          <p className="mt-[0.42cqh] text-[clamp(0.54rem,0.62cqw,0.72rem)] font-medium leading-[1.2] text-slate-700">{pillar.detail}</p>
          <p className="mt-[0.48cqh] text-[clamp(0.48rem,0.56cqw,0.66rem)] font-semibold uppercase tracking-[0.08em] text-control-warm">{pillar.proof}</p>
        </div>
      </div>
    </article>
  );
}


