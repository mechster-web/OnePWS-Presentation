import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Cog,
  DraftingCompass,
  Expand,
  FileCheck2,
  Headphones,
  Map,
  MessageSquare,
  Network,
  Puzzle,
  ShieldCheck,
  Target,
  Truck,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordEvidenceEvent } from "./evidenceAnalytics";

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  image?: string;
  visual?: "blueprint";
};

type DesignBuildReason = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type CapabilityItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "Understand operations, people, goals and challenges.",
    Icon: MessageSquare,
    image: "/assets/products/process-icons/01-discover-control-room-requirements-workshop.webp",
  },
  {
    number: "02",
    title: "Design",
    description: "Ergonomic layouts, 3D visualization and engineering solutions.",
    Icon: DraftingCompass,
    image: "/assets/products/process-icons/02-design-ergonomic-control-room-3d-layout.webp",
  },
  {
    number: "03",
    title: "Engineer",
    description: "Detailed engineering, simulations and compliance validation.",
    Icon: FileCheck2,
    image: "/assets/products/process-icons/03-engineer-control-room-technical-floor-plan.webp",
  },
  {
    number: "04",
    title: "Manufacture",
    description: "Precision manufacturing with quality control at every step.",
    Icon: Cog,
    image: "/assets/products/process-icons/04-manufacture-control-room-systems-factory.webp",
  },
  {
    number: "05",
    title: "Build & Integrate",
    description: "Expert installation and integration of all systems.",
    Icon: Truck,
    image: "/assets/products/process-icons/05-build-integrate-control-room-systems.webp",
  },
  {
    number: "06",
    title: "Commission & Support",
    description: "Testing, training and ongoing support for sustained performance.",
    Icon: ShieldCheck,
    image: "/assets/products/process-icons/06-commission-support-control-room-training.webp",
  },
];

const designBuildReasons: DesignBuildReason[] = [
  {
    title: "Single Point of Accountability",
    description: "One partner for the entire journey reduces risk, simplifies communication and ensures commitment.",
    Icon: UsersRound,
  },
  {
    title: "Faster Delivery",
    description: "Parallel processes and in-house capabilities reduce project timelines without compromising quality.",
    Icon: Clock3,
  },
  {
    title: "Quality Assured",
    description: "Every detail validated through stringent engineering, testing and international standards.",
    Icon: ShieldCheck,
  },
  {
    title: "Built for Performance",
    description: "Solutions that work together as one system to deliver long-term reliability and operator excellence.",
    Icon: Target,
  },
];

const capabilityItems: CapabilityItem[] = [
  {
    title: "End-to-End Expertise",
    description: "From strategy to support, everything under one roof.",
    Icon: UserRound,
  },
  {
    title: "Cross-Disciplinary Team",
    description: "Designers, engineers, ergonomists, project managers and technicians working as one.",
    Icon: UsersRound,
  },
  {
    title: "Integrated Systems",
    description: "Furniture, technology, architecture and MEP systems integrated seamlessly.",
    Icon: Network,
  },
  {
    title: "Risk Mitigation",
    description: "Proven process reduces uncertainty, rework and cost overruns.",
    Icon: ShieldCheck,
  },
  {
    title: "Future-Ready",
    description: "Scalable, adaptable solutions that evolve with your operations.",
    Icon: Target,
  },
];

const meaningItems: CapabilityItem[] = [
  { title: "One Vision", description: "Aligned from day one.", Icon: Target },
  { title: "One Plan", description: "Coordinated and clash-free.", Icon: Puzzle },
  { title: "One Execution", description: "Delivered right, the first time.", Icon: Cog },
  { title: "One Commitment", description: "We own the outcome, always.", Icon: BadgeCheck },
];

export function DesignBuildReferenceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordEvidenceEvent("evidence_journey_started", { chapterId: chapter.id, detail: "design-build-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[#fbfbfa]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/90" />

      <div className="pointer-events-none absolute bottom-[10.8cqh] left-0 z-[5] h-[25.2cqh] w-[22.9cqw] overflow-hidden border-r border-t border-slate-200/82 bg-white/38">
        <img alt="" className="h-full w-full object-cover" loading="lazy" src="/assets/products/design-build-bottom-left.png" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.16)_0%,rgb(255_255_255/0.02)_62%,rgb(255_255_255/0.12)_100%)]" />
      </div>

      <section className="absolute inset-x-[1.95cqw] top-[11.2cqh] bottom-[2.8cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[10.35cqh] grid grid-cols-[minmax(16rem,0.49fr)_minmax(0,1.64fr)] gap-[1.85cqw]">
          <motion.aside
            animate={{ opacity: 1, x: 0 }}
            className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-[1.2cqh] overflow-hidden border-r border-slate-200/88 pb-[25.5cqh] pr-[1.45cqw]"
            initial={false}
            transition={{ duration: 0.72, ease }}
          >
            <div className="grid grid-cols-[0.28rem_minmax(0,1fr)] gap-[1.25cqw] pt-[0.75cqh]">
              <span className="h-full min-h-[13.5cqh] w-[3px] bg-control-warm" />
              <div>
                <h1 className="text-[clamp(1.85rem,2.38cqw,3.16rem)] font-bold leading-[1.04] tracking-normal text-control-text md:text-[2.34cqw]">
                  <span className="block">Integrated</span>
                  <span className="block">Design-Build</span>
                  <span className="block text-control-warm">Approach.</span>
                </h1>
                <p className="mt-[1.55cqh] max-w-[18rem] text-[clamp(0.72rem,0.78cqw,0.9rem)] font-medium leading-[1.34] text-slate-800 md:text-[.74cqw]">
                  One team. One process. One responsibility. Seamless from concept to commissioning.
                </p>
              </div>
            </div>

            <div className="grid min-h-0 content-start gap-[2.42cqh] overflow-hidden">
              {designBuildReasons.map((item, index) => (
                <ReasonRow index={index} item={item} key={item.title} />
              ))}
            </div>

          </motion.aside>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="relative grid min-h-0 grid-rows-[minmax(0,1fr)_9.6cqh_15.3cqh] gap-[1.05cqh]"
            initial={false}
            transition={{ duration: 0.74, delay: 0.08, ease }}
          >
            <section className="relative min-h-0">
              <h2 className="text-[clamp(1.02rem,1.14cqw,1.36rem)] font-bold uppercase tracking-normal text-control-text">Our Integrated Delivery Process</h2>
              <div className="mt-[1.05cqh] h-[2px] w-[2.35rem] bg-control-warm" />
              <div className="mt-[1.8cqh] grid grid-cols-[repeat(6,minmax(0,1fr))] gap-[1.08cqw]">
                {processSteps.map((step, index) => (
                  <ProcessStepCard index={index} key={step.number} step={step} />
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.28rem] border border-slate-200/90 bg-white/72 px-[1.05cqw] py-[0.92cqh] shadow-[0_0.6rem_1.5rem_rgb(15_23_42/0.045)]">
              <div className="grid h-full grid-cols-5">
                {capabilityItems.map((item, index) => (
                  <CapabilityCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="relative min-h-0 overflow-hidden px-[1.05cqw] py-[0.94cqh]">
              <h2 className="text-[clamp(0.9rem,1.02cqw,1.16rem)] font-bold uppercase tracking-normal text-control-text">What This Means for You</h2>
              <div className="mt-[0.7cqh] h-[2px] w-[2.1rem] bg-control-warm" />
              <div className="mt-[1.2cqh] grid min-h-0 grid-cols-[repeat(4,minmax(0,1fr))_minmax(15.5rem,0.9fr)] items-center gap-[1cqw]">
                {meaningItems.map((item, index) => (
                  <MeaningCell index={index} item={item} key={item.title} />
                ))}
                <div className="relative min-h-0 border-l border-slate-400/80 pl-[1.7cqw]">
                  <p className="max-w-[21rem] text-[clamp(0.88rem,1.02cqw,1.18rem)] font-semibold leading-[1.12] text-control-warm">
                    Better Control. Better Decisions. Better Outcomes.
                  </p>
                  <p className="mt-[0.5cqh] max-w-[22rem] text-[clamp(0.62rem,0.7cqw,0.82rem)] font-medium leading-[1.25] text-slate-800">
                    An integrated approach that delivers control rooms built for performance, people and the future.
                  </p>
                  <span className="pointer-events-none absolute bottom-[-1rem] right-0 h-[6rem] w-[10rem] text-slate-500 opacity-[0.07]">
                    <WorldMapMark />
                  </span>
                </div>
              </div>
            </section>
          </motion.section>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={false}
          transition={{ duration: 0.62, delay: 0.82, ease }}
        >
          <button aria-label="Previous scene" className="pws-scene-control min-w-[8.25rem] gap-3 text-[0.92rem] font-medium" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" size={22} />
            <span>Previous</span>
          </button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
            <ChevronRight aria-hidden="true" size={23} />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <Map aria-hidden="true" size={22} />
          </button>
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
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" size={22} />
          </button>
        </motion.div>

      </section>
    </article>
  );
}

function ReasonRow({ item, index }: { item: DesignBuildReason; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-[0.7cqw] py-[0.54cqh] ${index ? "border-t border-slate-200/90" : ""}`}>
      <span className="grid h-[2.45rem] w-[2.45rem] place-items-center rounded-full border border-slate-200 bg-white text-control-warm shadow-[0_0.65rem_1.55rem_rgb(15_23_42/0.075)]">
        <Icon aria-hidden="true" size={30} strokeWidth={1.0} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.6rem,0.8cqw,1.76rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.52rem,0.58cqw,0.67rem)] font-medium leading-[1.24] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = step.Icon;
  return (
    <div className="relative min-w-0 pt-[0.95rem]">
      <span className="absolute left-1/2 top-0 z-20 grid h-[2rem] w-[2rem] -translate-x-1/2 place-items-center rounded-full bg-control-warm text-[0.68rem] font-bold leading-none text-white shadow-[0_0.5rem_1.2rem_rgb(213_29_42/0.26)]">
        {step.number}
      </span>
      {index < processSteps.length - 1 ? (
        <span className="absolute right-[-0.84cqw] top-[1.08rem] z-20 grid h-[13.7cqh] place-items-center text-[1.45rem] font-light leading-none text-slate-600">{">"}</span>
      ) : null}
      <article className="relative flex h-[20.6cqh] flex-col items-center justify-center overflow-hidden rounded-[0.45rem] border border-slate-200/90 bg-white/80 px-[0.7cqw] py-[1.15rem] text-center shadow-[0_0.65rem_1.55rem_rgb(15_23_42/0.06)]">
        <Icon aria-hidden="true" className="shrink-0 text-control-text" size={48} strokeWidth={1.45} />
        <h3 className="mt-[1.2cqh] text-[clamp(0.78rem,0.82cqw,0.98rem)] font-bold uppercase leading-tight tracking-[0.01em] text-control-text">{step.title}</h3>
        <p className="mt-[0.78cqh] text-[clamp(0.68rem,0.72cqw,0.86rem)] font-medium leading-[1.34] text-slate-700">{step.description}</p>
      </article>
      <div className="relative mt-[0.95cqh] h-[18.7cqh] overflow-hidden rounded-[0.42rem] border border-slate-200/90 bg-[radial-gradient(circle_at_50%_42%,rgb(255_255_255/0.96),rgb(241_245_249/0.92))]">
        {step.visual === "blueprint" ? <BlueprintVisual /> : <img alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" src={step.image} />}
        <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgb(15_23_42/0.05)_100%)]" />
      </div>
    </div>
  );
}

function BlueprintVisual() {
  return (
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgb(15_23_42/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(15_23_42/0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-[12%] border-2 border-slate-500/55" />
      <div className="absolute left-[18%] top-[22%] h-[42%] w-[26%] border border-slate-500/65" />
      <div className="absolute right-[18%] top-[18%] h-[52%] w-[30%] border border-slate-500/65" />
      <div className="absolute bottom-[16%] left-[22%] right-[14%] h-px bg-slate-500/75" />
      <div className="absolute left-[50%] top-[22%] h-[45%] w-px bg-slate-500/75" />
      <FileCheck2 aria-hidden="true" className="absolute bottom-[16%] right-[13%] text-control-warm" size={30} strokeWidth={1.5} />
    </div>
  );
}

function CapabilityCell({ item, index }: { item: CapabilityItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-[0.78cqw] px-[0.78cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="text-control-warm" size={38} strokeWidth={1.6} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.78rem,0.82cqw,0.96rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-1 block text-[clamp(0.66rem,0.7cqw,0.82rem)] font-medium leading-[1.22] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function MeaningCell({ item, index }: { item: CapabilityItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.85rem_minmax(0,1fr)] items-center gap-[0.72cqw] ${index ? "border-l border-slate-200/90 pl-[0.92cqw]" : ""}`}>
      <Icon aria-hidden="true" className={index === 0 ? "text-control-warm" : "text-control-text"} size={36} strokeWidth={1.6} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.74rem,0.78cqw,0.92rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-1 block text-[clamp(0.62rem,0.68cqw,0.8rem)] font-medium leading-[1.2] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function WorldMapMark() {
  return (
    <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 220 120">
      <path d="M21 45h21l10-12 18 9 17-8 16 12-7 16 18 8 23-9 15 7 28-13 24 9-11 15-30 4-11 16-30-8-18 12-29-6-18 8-14-17-32-5z" fill="currentColor" />
      <path d="M129 27l20-8 24 8 6 18-25 1-12-8-21 7z" fill="currentColor" opacity=".72" />
      <path d="M55 18l20-6 18 9-14 11-19-2z" fill="currentColor" opacity=".55" />
    </svg>
  );
}
