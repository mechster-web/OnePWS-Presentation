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
    image: "/assets/products/process-icons/01-discover-magnifier-people.png",
  },
  {
    number: "02",
    title: "Design",
    description: "Ergonomic layouts, 3D visualization and engineering solutions.",
    Icon: DraftingCompass,
    image: "/assets/products/process-icons/02-design-engineering-blueprint.png",
  },
  {
    number: "03",
    title: "Engineer",
    description: "Detailed engineering, simulations and compliance validation.",
    Icon: FileCheck2,
    image: "/assets/products/process-icons/03-engineering-validation-checklist.png",
  },
  {
    number: "04",
    title: "Manufacture",
    description: "Precision manufacturing with quality control at every step.",
    Icon: Cog,
    image: "/assets/products/process-icons/04-manufacturing-robotic-automation.png",
  },
  {
    number: "05",
    title: "Build & Integrate",
    description: "Expert installation and integration of all systems.",
    Icon: Truck,
    image: "/assets/products/process-icons/05-build-integrate-logistics-truck.png",
  },
  {
    number: "06",
    title: "Commission & Support",
    description: "Testing, training and ongoing support for sustained performance.",
    Icon: ShieldCheck,
    image: "/assets/products/process-icons/06-commission-support-technician.png",
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
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_54%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.7cqw] top-[9.85cqh] bottom-[7.05cqh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[7.35cqh] grid grid-cols-[minmax(15.5rem,0.36fr)_minmax(0,1.64fr)] gap-[1.55cqw]">
          <motion.aside
            animate={{ opacity: 1, x: 0 }}
            className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_13.2cqh] gap-[1cqh] overflow-hidden border-r border-slate-200/88 pr-[1.35cqw]"
            initial={false}
            transition={{ duration: 0.72, ease }}
          >
            <div className="grid grid-cols-[0.28rem_minmax(0,1fr)] gap-[1.25cqw] pt-[0.75cqh]">
              <span className="h-full min-h-[12cqh] w-[3px] bg-control-warm" />
              <div>
                <h1 className="text-[clamp(1.7rem,2.32cqw,3.05rem)] font-bold leading-[1.02] tracking-normal text-control-text md:text-[2.28cqw]">
                  <span className="block">Integrated</span>
                  <span className="block">Design-Build</span>
                  <span className="block text-control-warm">Approach.</span>
                </h1>
                <p className="mt-[1.15cqh] max-w-[18rem] text-[clamp(0.72rem,0.82cqw,0.95rem)] font-medium leading-[1.3] text-slate-800 md:text-[0.78cqw]">
                  One team. One process. One responsibility. Seamless from concept to commissioning.
                </p>
              </div>
            </div>

            <div className="grid min-h-0 content-start gap-[0.26cqh] overflow-hidden">
              {designBuildReasons.map((item, index) => (
                <ReasonRow index={index} item={item} key={item.title} />
              ))}
            </div>

            <div className="relative ml-[-1.7cqw] h-full overflow-hidden border-t border-slate-200/82 bg-white/38">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p06_010_574x312.jpg" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.42)_0%,rgb(255_255_255/0.08)_62%,rgb(255_255_255/0.34)_100%)]" />
            </div>
          </motion.aside>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="relative grid min-h-0 grid-rows-[minmax(0,1fr)_7.7cqh_13.8cqh] gap-[0.86cqh]"
            initial={false}
            transition={{ duration: 0.74, delay: 0.08, ease }}
          >
            <section className="relative min-h-0">
              <h2 className="text-[clamp(1.08rem,1.26cqw,1.48rem)] font-semibold uppercase tracking-normal text-control-text">Our Integrated Delivery Process</h2>
              <div className="mt-[1cqh] h-[2px] w-[2.2rem] bg-control-warm" />
              <div className="mt-[1.35cqh] grid grid-cols-[repeat(6,minmax(0,1fr))] gap-[0.82cqw]">
                {processSteps.map((step, index) => (
                  <ProcessStepCard index={index} key={step.number} step={step} />
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9cqw] py-[0.78cqh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="grid h-full grid-cols-5">
                {capabilityItems.map((item, index) => (
                  <CapabilityCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="relative min-h-0 overflow-hidden px-[0.9cqw] py-[0.72cqh]">
              <h2 className="text-[clamp(0.9rem,1.02cqw,1.16rem)] font-semibold uppercase tracking-normal text-control-text">What This Means for You</h2>
              <div className="mt-[0.65cqh] h-[2px] w-[2rem] bg-control-warm" />
              <div className="mt-[0.9cqh] grid min-h-0 grid-cols-[repeat(4,minmax(0,1fr))_minmax(15rem,0.9fr)] items-center gap-[0.82cqw]">
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
                  <span className="pointer-events-none absolute bottom-[-1rem] right-0 h-[6rem] w-[10rem] opacity-[0.07]">
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
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" size={22} />
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
    <div className={`grid min-w-0 grid-cols-[2.55rem_minmax(0,1fr)] items-center gap-[0.55cqw] py-[0.38cqh] ${index ? "border-t border-slate-200/90" : ""}`}>
      <span className="grid h-[2.22rem] w-[2.22rem] place-items-center rounded-full border border-slate-200 bg-white/56 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_0.65rem_1.55rem_rgb(15_23_42/0.07)]">
        <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.6rem,0.68cqw,0.78rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.52rem,0.59cqw,0.68rem)] font-medium leading-[1.2] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function ProcessStepCard({ step, index }: { step: ProcessStep; index: number }) {
  const Icon = step.Icon;
  return (
    <div className="relative min-w-0">
      <span className="absolute left-0 top-0 z-20 grid h-[1.72rem] min-w-[2.15rem] place-items-center rounded-br-[0.34rem] bg-control-warm px-[0.46rem] text-[0.62rem] font-semibold text-white shadow-[0_0.55rem_1.3rem_rgb(213_29_42/0.24)]">
        {step.number}
      </span>
      {index < processSteps.length - 1 ? <span className="absolute right-[-0.62cqw] top-[3.4rem] z-20 text-[1.1rem] font-light text-control-text">›</span> : null}
      <article className="relative overflow-hidden rounded-[0.56rem] border border-slate-200/86 bg-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.8rem_1.9rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
        <div className="grid h-[11.6cqh] grid-cols-[2.4rem_minmax(0,1fr)] items-start gap-[0.48cqw] px-[0.58cqw] pb-[0.62cqh] pt-[1.85rem]">
          <Icon aria-hidden="true" className="justify-self-end text-control-text" size={21} strokeWidth={1.55} />
          <div className="min-w-0">
            <h3 className="text-[clamp(0.56rem,0.64cqw,0.74rem)] font-semibold uppercase leading-tight text-control-text">{step.title}</h3>
            <p className="mt-[0.36cqh] text-[clamp(0.48rem,0.54cqw,0.63rem)] font-medium leading-[1.18] text-slate-800">{step.description}</p>
          </div>
        </div>
        <div className="relative h-[12.3cqh] overflow-hidden border-t border-slate-200/86 bg-[radial-gradient(circle_at_50%_42%,rgb(255_255_255/0.96),rgb(241_245_249/0.92))]">
          {step.visual === "blueprint" ? <BlueprintVisual /> : <img alt="" className="absolute inset-0 h-full w-full object-contain p-[0.32rem]" src={step.image} />}
          <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgb(15_23_42/0.05)_100%)]" />
        </div>
      </article>
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
    <div className={`grid min-w-0 grid-cols-[2.7rem_minmax(0,1fr)] items-center gap-[0.58cqw] px-[0.62cqw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="text-control-warm" size={23} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.55rem,0.62cqw,0.72rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.48rem,0.55cqw,0.64rem)] font-medium leading-[1.18] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function MeaningCell({ item, index }: { item: CapabilityItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] items-center gap-[0.48cqw] ${index ? "border-l border-slate-200/90 pl-[0.62cqw]" : ""}`}>
      <Icon aria-hidden="true" className="text-control-text" size={21} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.5rem,0.58cqw,0.68rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.45rem,0.52cqw,0.6rem)] font-medium leading-[1.16] text-slate-800">{item.description}</span>
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
