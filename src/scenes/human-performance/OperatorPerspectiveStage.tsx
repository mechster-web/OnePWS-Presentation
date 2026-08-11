import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpDown,
  AudioLines,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Ear,
  Expand,
  Eye,
  Globe2,
  Hand,
  Headphones,
  Lightbulb,
  Map,
  Monitor,
  Settings,
  ShieldCheck,
  Target,
  Thermometer,
  UserRound,
  UsersRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { AudioPulse } from "../../design-system/components/AudioPulse";
import { PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SceneCanvas, SafeArea, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { usePerformanceMode } from "../../design-system/usePerformanceMode";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordHumanPerformanceEvent } from "./humanPerformanceAnalytics";
import { getHumanScenario, getOperatorProfile, type HumanScenario } from "./humanPerformanceConfig";
import { humanPerformanceNarration } from "./humanPerformanceNarration";

type Props = {
  chapter: Chapter;
  fallback?: ReactNode;
};

type ErgonomicPrinciple = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type ErgonomicProcessStep = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type ErgonomicImpact = {
  value: string;
  label: string;
  Icon: LucideIcon;
};

type ErgonomicBottomItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type SightlineReason = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type SightlineGuideline = {
  title: string;
  value: string;
  description: string;
  Icon: LucideIcon;
};

type AdaptiveComfortItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

type SightlineOutcome = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

const ergonomicPrinciples: ErgonomicPrinciple[] = [
  { title: "Vision", description: "Clear sightlines, right information at the right distance.", Icon: Eye },
  { title: "Posture", description: "Neutral posture supported through seating, console and layout.", Icon: UserRound },
  { title: "Reach", description: "Frequently used controls within comfortable reach zones.", Icon: Hand },
  { title: "Environment", description: "Optimized lighting, acoustics, thermal comfort and air quality.", Icon: Ear },
  { title: "Work & Task", description: "Layout supports workflow, teamwork and decision making.", Icon: UsersRound },
];

const ergonomicProcessSteps: ErgonomicProcessStep[] = [
  { title: "Data Collection", description: "Anthropometry, task analysis and operator input.", Icon: UsersRound },
  { title: "Evaluation", description: "Digital human modeling and compliance assessment.", Icon: ClipboardList },
  { title: "Optimization", description: "Iterate layout, console and environment for best performance.", Icon: Settings },
  { title: "Validation", description: "Simulations and reviews to ensure ISO 11064 compliance.", Icon: ShieldCheck },
];

const ergonomicImpacts: ErgonomicImpact[] = [
  { value: "25%", label: "Improvement in Information Acquisition", Icon: Eye },
  { value: "30%", label: "Reduction in Operator Fatigue", Icon: UserRound },
  { value: "20%", label: "Faster Response Time", Icon: ArrowUpDown },
  { value: "100%", label: "ISO 11064 Compliance by Design", Icon: ShieldCheck },
];

const ergonomicBottomItems: ErgonomicBottomItem[] = [
  {
    title: "ISO 11064 Compliant",
    description: "Designed in alignment with international control room standards.",
    Icon: Globe2,
  },
  {
    title: "Human-Centred Design",
    description: "Built around real operators, real tasks and real environments.",
    Icon: UsersRound,
  },
  {
    title: "Evidence-Based",
    description: "Decisions backed by data, simulation and ergonomic research.",
    Icon: BarChart3,
  },
  {
    title: "Performance Assured",
    description: "Validated for comfort, focus, safety and sustained performance.",
    Icon: Settings,
  },
];

const sightlineReasons: SightlineReason[] = [
  { title: "Better Visibility", description: "Reduced eye movement and strain for sustained focus.", Icon: Eye },
  { title: "Effortless Reach", description: "Controls and critical systems always within the optimal zone.", Icon: UserRound },
  { title: "Operator Comfort", description: "Ergonomic posture and reduced fatigue across long shifts.", Icon: UserRound },
  { title: "Better Performance", description: "Comfortable operators make faster, more accurate decisions.", Icon: BarChart3 },
];

const sightlineGuidelines: SightlineGuideline[] = [
  { title: "Horizontal Sightline", value: "+30°", description: "Optimal viewing angle range", Icon: Eye },
  { title: "Top of Primary Screen", value: "15°", description: "Below eye level for neutral posture", Icon: Monitor },
  { title: "Viewing Distance", value: "700 - 1200 mm", description: "Ideal distance for video walls & monitors", Icon: ArrowUpDown },
  { title: "Screen Height Range", value: "900 - 1400 mm", description: "From finished floor to screen center", Icon: Monitor },
];

const adaptiveComfortItems: AdaptiveComfortItem[] = [
  { title: "Sit-Stand Adjustability", description: "Switch positions effortlessly, stay active, stay alert.", Icon: ArrowUpDown },
  { title: "Monitor Positioning", description: "Height, tilt and distance tuned to your line of sight.", Icon: Monitor },
  { title: "Adaptive Lighting", description: "Lighting that reduces glare and supports eye comfort.", Icon: Lightbulb },
  { title: "Thermal Comfort", description: "Consistent temperature for long-shift well-being.", Icon: Thermometer },
  { title: "Acoustic Control", description: "Balanced acoustics to minimize fatigue and distraction.", Icon: AudioLines },
];

const sightlineOutcomes: SightlineOutcome[] = [
  { title: "Improved Focus", description: "Reduced visual fatigue", Icon: Eye },
  { title: "Reduced Strain", description: "Lower physical stress", Icon: UserRound },
  { title: "Higher Endurance", description: "Sustained energy throughout shifts", Icon: Zap },
  { title: "Better Decisions", description: "Clarity, speed and confidence", Icon: ShieldCheck },
  { title: "Operational Excellence", description: "Ergonomics that drives mission success", Icon: BarChart3 },
];

export function OperatorPerspectiveStage({ chapter, fallback }: Props) {
  if (chapter.id === "ergonomic-methodology") {
    return <ErgonomicMethodologyReferenceStage chapter={chapter} />;
  }

  if (chapter.id === "sightline-comfort") {
    return <SightlineComfortReferenceStage chapter={chapter} />;
  }

  const scenario = getHumanScenario(chapter.id);
  if (!scenario) {
    return <>{fallback}</>;
  }

  return <HumanScenarioStage chapter={chapter} scenario={scenario} />;
}

function ErgonomicMethodologyReferenceStage({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const reducedMotion = state.reducedMotion;
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordHumanPerformanceEvent("human_journey_started", { chapterId: chapter.id, detail: "ergonomic-methodology-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_54%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.7vw] top-[9.85vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[7.35vh] grid grid-rows-[minmax(0,1fr)_11.4vh] gap-[1.25vh]">
        <div className="grid min-h-0 grid-cols-[minmax(0,0.88fr)_minmax(42rem,1.12fr)] gap-[1.35vw]">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="relative min-h-0 overflow-hidden"
            initial={false}
            transition={{ duration: 0.72, ease }}
          >
            <div className="absolute left-[0.1vw] top-[1.1vh] z-20 grid grid-cols-[0.28rem_minmax(0,1fr)] gap-[2.1vw]">
              <span className="h-[14.4vh] w-[3px] bg-control-warm" />
              <div className="w-[min(38vw,39rem)]">
                <h1 className="text-[clamp(2.75rem,4.05vw,5.35rem)] font-black leading-[0.98] tracking-normal text-control-text">
                  <span className="block">ISO 11064 and</span>
                  <span className="block"><span className="text-control-warm">Ergonomic</span> Study.</span>
                </h1>
                <p className="mt-[2.4vh] max-w-[36rem] text-[clamp(0.82rem,0.94vw,1.06rem)] font-medium leading-[1.55] text-slate-800">
                  Every control room we design is rooted in ISO 11064 standards and validated through ergonomic research, anthropometric data and real-operator simulations.
                </p>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 top-[24.4vh] overflow-hidden rounded-[0.55rem] border border-white/86 bg-white/48 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1.2rem_3rem_rgb(15_23_42/0.11)] backdrop-blur-[26px]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p06_010_574x312.jpg" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.92)_0%,rgb(255_255_255/0.5)_25%,rgb(255_255_255/0.12)_60%,rgb(255_255_255/0.34)_100%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.72)_0%,transparent_42%,rgb(255_255_255/0.22)_100%)]" />
              <ErgonomicCallout className="left-[1.4vw] top-[20%]" icon={<Eye size={21} />} label="Optimal Sightline" text="15 degree downward viewing angle for reduced neck strain." />
              <ErgonomicCallout className="right-[2vw] top-[22%]" icon={<UserRound size={21} />} label="Comfortable Reach Zone" text="Primary controls within natural reach envelope." />
              <ErgonomicCallout className="left-[1.4vw] bottom-[13%]" icon={<ArrowUpDown size={21} />} label="Adjustable Work Surface" text="Sit-stand consoles adapt to every operator." />
              <ErgonomicCallout className="left-[45%] bottom-[5%]" icon={<Settings size={21} />} label="Ergonomic Seating" text="Supports posture, reduces fatigue, improves focus." />
              <ErgonomicCallout className="right-[1.7vw] bottom-[8%]" icon={<UserRound size={21} />} label="Clear Leg Clearance" text="Unobstructed space for movement and blood circulation." />
            </div>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-rows-[0.78fr_0.92fr] gap-[1.25vh]"
            initial={false}
            transition={{ duration: 0.74, delay: 0.08, ease }}
          >
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[2vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.96rem,1.16vw,1.34rem)] font-black uppercase tracking-normal text-control-text">Designed Around Human Performance</h2>
              <div className="mt-[1vh] h-[2px] w-[2.1rem] bg-control-warm" />
              <div className="mt-[2.05vh] grid grid-cols-5">
                {ergonomicPrinciples.map((principle, index) => (
                  <ErgonomicPrincipleCell index={index} item={principle} key={principle.title} />
                ))}
              </div>
            </section>

            <div className="grid min-h-0 grid-cols-[minmax(0,1.33fr)_minmax(17rem,0.67fr)] gap-[0.95vw]">
              <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[2vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.86rem,1.02vw,1.2rem)] font-black uppercase tracking-normal text-control-text">Ergonomic Study Process</h2>
                <div className="mt-[1vh] h-[2px] w-[2.1rem] bg-control-warm" />
                <div className="mt-[2.05vh] grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-[0.55vw]">
                  {ergonomicProcessSteps.map((step, index) => (
                    <ErgonomicProcessNode item={step} key={step.title} showArrow={index < ergonomicProcessSteps.length - 1} />
                  ))}
                </div>
              </section>

              <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.2vw] py-[2vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.86rem,1.02vw,1.2rem)] font-black uppercase tracking-normal text-control-text">Measurable Impact</h2>
                <div className="mt-[1vh] h-[2px] w-[2.1rem] bg-control-warm" />
                <div className="mt-[1.8vh] grid gap-[1.35vh]">
                  {ergonomicImpacts.map((impact) => (
                    <div className="grid grid-cols-[2.25rem_4.3rem_minmax(0,1fr)] items-center gap-[0.55vw]" key={impact.label}>
                      <impact.Icon aria-hidden="true" className="text-control-warm" size={26} strokeWidth={1.65} />
                      <strong className="text-[clamp(1.2rem,1.5vw,1.78rem)] font-black leading-none text-control-warm">{impact.value}</strong>
                      <span className="text-[clamp(0.62rem,0.73vw,0.84rem)] font-medium leading-[1.35] text-slate-800">{impact.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </motion.section>
        </div>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.25vw] py-[1.7vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]"
          initial={false}
          transition={{ duration: 0.72, delay: 0.16, ease }}
        >
          <div className="grid h-full grid-cols-[minmax(18rem,0.95fr)_repeat(4,minmax(0,1fr))] items-center">
            <div className="grid min-w-0 grid-cols-[4.6rem_minmax(0,1fr)] items-center gap-[1vw] pr-[1.3vw]">
              <span className="grid h-[3.8rem] w-[3.8rem] place-items-center rounded-full border border-slate-200 bg-white/56 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.8rem_1.8rem_rgb(15_23_42/0.08)]">
                <ShieldCheck aria-hidden="true" size={34} strokeWidth={1.55} />
              </span>
              <div className="min-w-0">
                <p className="text-[clamp(0.82rem,0.96vw,1.1rem)] font-black leading-tight text-control-text">Ergonomics is not an add-on.</p>
                <p className="mt-1 text-[clamp(0.72rem,0.82vw,0.94rem)] font-black leading-tight text-control-warm">It is the foundation of every decision we design.</p>
              </div>
            </div>

            {ergonomicBottomItems.map((item) => (
              <ErgonomicBottomCell item={item} key={item.title} />
            ))}
          </div>
        </motion.section>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start"
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

function ErgonomicPrincipleCell({ item, index }: { item: ErgonomicPrinciple; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[1vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="mx-auto text-control-warm" size={38} strokeWidth={1.55} />
      <h3 className="mt-[1.25vh] text-[clamp(0.65rem,0.76vw,0.88rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[1.15vh] max-w-[9.8rem] text-[clamp(0.62rem,0.72vw,0.84rem)] font-medium leading-[1.52] text-slate-800">{item.description}</p>
    </div>
  );
}

function SightlineComfortReferenceStage({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordHumanPerformanceEvent("sightline_comparison_viewed", { chapterId: chapter.id, detail: "sightline-comfort-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_54%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.7vw] top-[9.85vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[7.35vh] grid grid-rows-[minmax(0,1fr)_11.4vh] gap-[1.25vh]">
          <div className="grid min-h-0 grid-cols-[minmax(17rem,0.42fr)_minmax(38rem,0.91fr)_minmax(31rem,0.77fr)] gap-[1.05vw]">
            <motion.aside
              animate={{ opacity: 1, y: 0 }}
              className="relative min-h-0"
              initial={false}
              transition={{ duration: 0.7, ease }}
            >
              <div className="absolute left-[0.15vw] top-[1.1vh] grid grid-cols-[0.28rem_minmax(0,1fr)] gap-[1.55vw]">
                <span className="h-[14.6vh] w-[3px] bg-control-warm" />
                <div>
                  <h1 className="text-[clamp(2.1rem,2.95vw,4rem)] font-black leading-[1.02] tracking-normal text-control-text">
                    <span className="block">Sightlines,</span>
                    <span className="block">Reach and</span>
                    <span className="block text-control-warm">Comfort.</span>
                  </h1>
                  <p className="mt-[1.6vh] max-w-[16rem] text-[clamp(0.76rem,0.86vw,0.98rem)] font-medium leading-[1.42] text-slate-800">
                    Every angle. Every reach. Every detail designed for operator performance.
                  </p>
                </div>
              </div>

              <section className="absolute inset-x-0 bottom-0 top-[30.4vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.55vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.82rem,0.96vw,1.1rem)] font-black uppercase tracking-normal text-control-warm">Why It Matters</h2>
                <div className="mt-[1vh] grid gap-[0.45vh]">
                  {sightlineReasons.map((reason, index) => (
                    <SightlineReasonRow index={index} item={reason} key={reason.title} />
                  ))}
                </div>
              </section>
            </motion.aside>

            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="relative min-h-0 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]"
              initial={false}
              transition={{ duration: 0.74, delay: 0.08, ease }}
            >
              <div className="absolute inset-x-[1.25vw] top-[1.95vh] z-20">
                <h2 className="text-[clamp(0.92rem,1.08vw,1.25rem)] font-black uppercase tracking-normal text-control-text">Optimized Sightlines</h2>
                <div className="mt-[1vh] h-[2px] w-[2rem] bg-control-warm" />
              </div>
              <div className="absolute inset-x-0 top-[7.2vh] bottom-[16.6vh] overflow-hidden">
                <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p06_010_574x312.jpg" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.1)_0%,rgb(255_255_255/0.04)_52%,rgb(15_23_42/0.16)_100%)]" />
                <SightlineArcOverlay />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[16.6vh] border-t border-slate-200/90 bg-white/72 px-[0.55vw] py-[1.05vh]">
                <h3 className="text-center text-[clamp(0.74rem,0.86vw,1rem)] font-black uppercase leading-none text-control-text">Recommended Guidelines (ISO 11064)</h3>
                <div className="mt-[1.25vh] grid grid-cols-4">
                  {sightlineGuidelines.map((guideline, index) => (
                    <SightlineGuidelineCell index={index} item={guideline} key={guideline.title} />
                  ))}
                </div>
              </div>
              <span className="absolute inset-x-2 bottom-[0.1rem] h-[2px] rounded-full bg-control-warm" />
            </motion.section>

            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="grid min-h-0 grid-rows-[0.76fr_0.42fr] gap-[1.25vh]"
              initial={false}
              transition={{ duration: 0.74, delay: 0.14, ease }}
            >
              <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.05vw] py-[1.55vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.92rem,1.08vw,1.25rem)] font-black uppercase tracking-normal text-control-text">Optimal Reach Zones</h2>
                <div className="mt-[1vh] h-[2px] w-[2rem] bg-control-warm" />
                <div className="mt-[0.45vh] grid grid-cols-[minmax(0,1fr)_11.2rem] items-center gap-[0.65vw]">
                  <ReachZoneDiagram />
                  <div className="grid gap-[1.15vh] text-[clamp(0.58rem,0.67vw,0.78rem)] font-medium text-control-text">
                    <ReachLegend color="bg-emerald-500" title="Primary Reach Zone" value="350 - 600 mm" />
                    <ReachLegend color="bg-amber-400" title="Secondary Reach Zone" value="600 - 900 mm" />
                    <ReachLegend color="bg-red-400" title="Maximum Reach Zone" value="900 - 1200 mm" />
                  </div>
                </div>
                <div className="mt-[0.45vh] grid grid-cols-[3.2rem_minmax(0,1fr)] items-center gap-[0.8vw] rounded-[0.52rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[0.78vh]">
                  <span className="grid h-[2.65rem] w-[2.65rem] place-items-center rounded-full bg-slate-100 text-control-text">
                    <UserRound aria-hidden="true" size={23} strokeWidth={1.55} />
                  </span>
                  <p className="text-[clamp(0.58rem,0.69vw,0.8rem)] font-medium leading-[1.34] text-slate-800">
                    Controls, keyboards and frequently used interfaces are placed within the <strong className="font-black text-control-text">primary reach zone</strong> for <strong className="font-black text-control-text">maximum comfort and efficiency.</strong>
                  </p>
                </div>
              </section>

              <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.05vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.88rem,1.02vw,1.18rem)] font-black uppercase tracking-normal text-control-text">Comfort That Adapts to You</h2>
                <div className="mt-[1vh] h-[2px] w-[2rem] bg-control-warm" />
                <div className="mt-[1.25vh] grid grid-cols-5">
                  {adaptiveComfortItems.map((item, index) => (
                    <AdaptiveComfortCell index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </motion.section>
          </div>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.18, ease }}
          >
            <div className="grid h-full grid-cols-[minmax(20rem,0.78fr)_repeat(5,minmax(0,1fr))] items-center">
              <div className="grid min-w-0 grid-cols-[3.9rem_minmax(0,1fr)] items-center gap-[0.85vw] pr-[1.1vw]">
                <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-control-warm/20 bg-white/56 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.8rem_1.8rem_rgb(15_23_42/0.08)]">
                  <Target aria-hidden="true" size={30} strokeWidth={1.5} />
                </span>
                <p className="text-[clamp(0.8rem,0.98vw,1.12rem)] font-medium leading-[1.26] text-control-text">
                  Thoughtful ergonomics aren't about comfort - they're about <span className="font-black text-control-warm">unlocking human potential.</span>
                </p>
              </div>
              {sightlineOutcomes.map((item) => (
                <SightlineOutcomeCell item={item} key={item.title} />
              ))}
            </div>
          </motion.section>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start"
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

function SightlineReasonRow({ item, index }: { item: SightlineReason; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.85rem_minmax(0,1fr)] items-center gap-[0.7vw] py-[0.55vh] ${index ? "border-t border-slate-200/90" : ""}`}>
      <span className="grid h-[2.45rem] w-[2.45rem] place-items-center rounded-full border border-slate-200 bg-white/54 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_0.55rem_1.4rem_rgb(15_23_42/0.06)]">
        <Icon aria-hidden="true" size={21} strokeWidth={1.6} />
      </span>
      <div className="min-w-0">
        <h3 className="text-[clamp(0.58rem,0.67vw,0.78rem)] font-black leading-tight text-control-text">{item.title}</h3>
        <p className="mt-0.5 text-[clamp(0.5rem,0.57vw,0.66rem)] font-medium leading-[1.26] text-slate-800">{item.description}</p>
      </div>
    </div>
  );
}

function SightlineArcOverlay() {
  return (
    <div className="absolute inset-0 text-white">
      <div className="absolute inset-x-[17%] top-[15%] h-[55%] rounded-t-full border-t-2 border-dashed border-white/88" />
      <span className="absolute left-1/2 top-[8%] h-[78%] w-px -translate-x-1/2 bg-white/72" />
      <span className="absolute left-[22%] top-[21%] h-px w-[28%] origin-right rotate-[31deg] border-t border-dashed border-white/88" />
      <span className="absolute right-[22%] top-[21%] h-px w-[28%] origin-left rotate-[-31deg] border-t border-dashed border-white/88" />
      <span className="absolute left-[25%] top-[23%] text-[clamp(0.82rem,1vw,1.18rem)] font-black">-30°</span>
      <span className="absolute left-1/2 top-[12%] -translate-x-1/2 text-[clamp(0.78rem,0.95vw,1.1rem)] font-black">0°</span>
      <span className="absolute right-[24%] top-[23%] text-[clamp(0.82rem,1vw,1.18rem)] font-black">+30°</span>
      <span className="absolute left-[18%] top-[52%] text-[clamp(0.82rem,1vw,1.14rem)] font-black">-60°</span>
      <span className="absolute right-[16%] top-[52%] text-[clamp(0.82rem,1vw,1.14rem)] font-black">+60°</span>
      <span className="absolute left-1/2 top-[34%] -translate-x-1/2 rounded-full bg-control-warm/16 px-5 py-2 text-center text-[clamp(0.82rem,0.98vw,1.13rem)] font-black text-white backdrop-blur-sm">Optimal View Zone</span>
      <span className="absolute left-[10%] top-[57%] text-[clamp(0.76rem,0.9vw,1.05rem)] font-black leading-tight">Acceptable<br />View Zone</span>
      <span className="absolute right-[10%] top-[57%] text-[clamp(0.76rem,0.9vw,1.05rem)] font-black leading-tight">Acceptable<br />View Zone</span>
      <span className="absolute left-[18%] top-[49%] h-px w-[22%] origin-right rotate-[-34deg] bg-control-warm" />
      <span className="absolute right-[18%] top-[49%] h-px w-[22%] origin-left rotate-[34deg] bg-control-warm" />
    </div>
  );
}

function SightlineGuidelineCell({ item, index }: { item: SightlineGuideline; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.8vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <div className="flex min-h-[1.35rem] items-center justify-center gap-[0.4vw] text-control-text">
        <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
        <span className="text-[clamp(0.48rem,0.56vw,0.64rem)] font-black leading-tight">{item.title}</span>
      </div>
      <strong className="mt-[0.65vh] block text-[clamp(0.98rem,1.22vw,1.42rem)] font-black leading-none text-control-text">{item.value}</strong>
      <p className="mx-auto mt-[0.65vh] max-w-[8.5rem] text-[clamp(0.48rem,0.56vw,0.65rem)] font-medium leading-[1.24] text-slate-800">{item.description}</p>
    </div>
  );
}

function ReachLegend({ color, title, value }: { color: string; title: string; value: string }) {
  return (
    <div className="grid grid-cols-[1.35rem_minmax(0,1fr)] items-start gap-[0.65vw]">
      <span className={`mt-1 h-[0.9rem] w-[0.9rem] rounded-full ${color}`} />
      <span>
        <strong className="block font-black leading-tight text-control-text">{title}</strong>
        <span className="mt-1 block text-slate-700">{value}</span>
      </span>
    </div>
  );
}

function ReachZoneDiagram() {
  return (
    <div className="relative mx-auto aspect-[1.34/1] w-full max-w-[17.6rem] overflow-hidden">
      <div className="absolute inset-x-[2%] top-[4%] h-[92%] rounded-t-full bg-[conic-gradient(from_232deg_at_50%_95%,rgb(34_197_94/0.28)_0deg,rgb(34_197_94/0.28)_42deg,rgb(250_204_21/0.34)_42deg,rgb(250_204_21/0.34)_78deg,rgb(239_68_68/0.3)_78deg,rgb(239_68_68/0.3)_112deg,transparent_112deg,transparent_360deg)]" />
      <div className="absolute inset-x-[14%] bottom-[5%] h-[64%] rounded-t-full border-[1.35rem] border-emerald-500/20 border-b-0" />
      <div className="absolute inset-x-[7%] bottom-[3%] h-[79%] rounded-t-full border-[1.45rem] border-amber-400/27 border-b-0" />
      <div className="absolute inset-x-0 bottom-0 h-[96%] rounded-t-full border-[1.5rem] border-red-400/24 border-b-0" />
      <span className="absolute left-1/2 top-[6%] h-[92%] w-px -translate-x-1/2 bg-white/80" />
      <span className="absolute bottom-[3%] left-1/2 h-[5.5rem] w-[4.2rem] -translate-x-1/2 rounded-t-full bg-slate-950/88 shadow-[0_0.8rem_2rem_rgb(15_23_42/0.25)]" />
      <span className="absolute bottom-[23%] left-[27%] h-[4rem] w-[1.15rem] rotate-[-28deg] rounded-full bg-slate-900/70" />
      <span className="absolute bottom-[23%] right-[27%] h-[4rem] w-[1.15rem] rotate-[28deg] rounded-full bg-slate-900/70" />
      <span className="absolute bottom-[26%] left-[20%] h-[1.05rem] w-[1.05rem] rounded-full bg-slate-900/78" />
      <span className="absolute bottom-[26%] right-[20%] h-[1.05rem] w-[1.05rem] rounded-full bg-slate-900/78" />
      <span className="absolute bottom-[13%] left-1/2 h-[2.6rem] w-[2.6rem] -translate-x-1/2 rounded-full bg-slate-900" />
      <span className="absolute inset-x-[4%] bottom-[2%] h-[1.2rem] rounded-[50%] bg-slate-400/32" />
    </div>
  );
}

function AdaptiveComfortCell({ item, index }: { item: AdaptiveComfortItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.65vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="mx-auto text-control-text" size={25} strokeWidth={1.55} />
      <h3 className="mx-auto mt-[0.65vh] max-w-[6.2rem] text-[clamp(0.52rem,0.61vw,0.7rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.45vh] max-w-[6.7rem] text-[clamp(0.46rem,0.53vw,0.61rem)] font-medium leading-[1.2] text-slate-800">{item.description}</p>
    </div>
  );
}

function SightlineOutcomeCell({ item }: { item: SightlineOutcome }) {
  const Icon = item.Icon;
  return (
    <div className="grid min-w-0 grid-cols-[2.55rem_minmax(0,1fr)] items-center gap-[0.65vw] border-l border-slate-200/90 px-[0.75vw]">
      <Icon aria-hidden="true" className="text-control-text" size={25} strokeWidth={1.55} />
      <div className="min-w-0">
        <h3 className="text-[clamp(0.52rem,0.6vw,0.7rem)] font-black leading-tight text-control-text">{item.title}</h3>
        <p className="mt-0.5 text-[clamp(0.46rem,0.53vw,0.61rem)] font-medium leading-[1.22] text-slate-800">{item.description}</p>
      </div>
    </div>
  );
}

function ErgonomicProcessNode({ item, showArrow }: { item: ErgonomicProcessStep; showArrow: boolean }) {
  const Icon = item.Icon;
  return (
    <>
      <div className="min-w-0 text-center">
        <span className="mx-auto grid h-[clamp(3.1rem,5.6vh,4.2rem)] w-[clamp(3.1rem,5.6vh,4.2rem)] place-items-center rounded-full border border-slate-200 bg-white/58 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_0.6rem_1.5rem_rgb(15_23_42/0.06)]">
          <Icon aria-hidden="true" size={28} strokeWidth={1.6} />
        </span>
        <h3 className="mt-[1.3vh] text-[clamp(0.58rem,0.68vw,0.78rem)] font-black leading-tight text-control-text">{item.title}</h3>
        <p className="mx-auto mt-[1vh] max-w-[8.2rem] text-[clamp(0.55rem,0.62vw,0.72rem)] font-medium leading-[1.43] text-slate-800">{item.description}</p>
      </div>
      {showArrow ? <div className="pt-[clamp(1.6rem,3vh,2.25rem)] text-[clamp(1.15rem,1.35vw,1.55rem)] font-light text-control-text">›</div> : null}
    </>
  );
}

function ErgonomicBottomCell({ item }: { item: ErgonomicBottomItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid min-w-0 grid-cols-[3.6rem_minmax(0,1fr)] items-center gap-[0.85vw] border-l border-slate-200/90 px-[1.15vw]">
      <span className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full border border-blue-700/22 bg-white/54 text-blue-700 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_0.55rem_1.35rem_rgb(15_23_42/0.06)]">
        <Icon aria-hidden="true" size={27} strokeWidth={1.65} />
      </span>
      <div className="min-w-0">
        <h3 className="text-[clamp(0.64rem,0.72vw,0.82rem)] font-black leading-tight text-control-text">{item.title}</h3>
        <p className="mt-1 text-[clamp(0.56rem,0.63vw,0.72rem)] font-medium leading-[1.35] text-slate-800">{item.description}</p>
      </div>
    </div>
  );
}

function ErgonomicCallout({ className, icon, label, text }: { className: string; icon: ReactNode; label: string; text: string }) {
  return (
    <div className={`absolute z-10 grid max-w-[13rem] grid-cols-[3.2rem_minmax(0,1fr)] items-center gap-[0.55vw] text-control-text ${className}`}>
      <span className="grid h-[2.9rem] w-[2.9rem] place-items-center rounded-full border border-slate-200 bg-white/62 text-control-text shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_0.65rem_1.7rem_rgb(15_23_42/0.14)] backdrop-blur-xl">
        {icon}
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.56rem,0.64vw,0.74rem)] font-black leading-tight">{label}</strong>
        <span className="mt-1 block text-[clamp(0.52rem,0.6vw,0.7rem)] font-medium leading-[1.35] text-slate-800">{text}</span>
      </span>
    </div>
  );
}

function HumanScenarioStage({ chapter, scenario }: { chapter: Chapter; scenario: HumanScenario }) {
  const { state } = usePresentation();
  const { mode: performanceMode } = usePerformanceMode();
  const reducedMotion = state.reducedMotion || performanceMode === "reduced";
  const profile = getOperatorProfile(scenario.operatorProfileId);
  const [activeFactors, setActiveFactors] = useState<string[]>([]);
  const [activeLayer, setActiveLayer] = useState<"story" | "explore" | "technical">("story");
  const [optimised, setOptimised] = useState(false);
  const [posture, setPosture] = useState<"seated" | "standing">("seated");
  const cues = humanPerformanceNarration[chapter.id] ?? [];
  const activeCue = cues[Math.min(activeFactors.length, Math.max(cues.length - 1, 0))];

  useEffect(() => {
    recordHumanPerformanceEvent("human_journey_started", { chapterId: chapter.id, detail: scenario.sceneKind });
  }, [chapter.id, scenario.sceneKind]);

  useEffect(() => {
    if (state.mode !== "autoPlay") {
      return;
    }

    const timers = scenario.factors.slice(0, 3).map((factor, index) =>
      window.setTimeout(() => {
        setActiveFactors((current) => (current.includes(factor) ? current : [...current, factor]));
        if (index === 2) {
          setOptimised(true);
        }
      }, 4_000 + index * 5_600),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [scenario.factors, state.mode]);

  const operatorState = useMemo(() => {
    if (optimised) return "supported";
    if (activeFactors.length >= 3) return "pressured";
    if (activeFactors.length > 0) return "transitioning";
    return scenario.operatorStates[0];
  }, [activeFactors.length, optimised, scenario.operatorStates]);

  function toggleFactor(factor: string) {
    setActiveFactors((current) => {
      const next = current.includes(factor)
        ? current.filter((item) => item !== factor)
        : current.length >= 3
          ? [...current.slice(1), factor]
          : [...current, factor];
      return next;
    });
    recordHumanPerformanceEvent(eventForScenario(scenario.sceneKind), { chapterId: chapter.id, detail: factor });
  }

  function activateResponse() {
    setOptimised(true);
    recordHumanPerformanceEvent("human_transformation_activated", { chapterId: chapter.id, detail: scenario.mainPrompt });
  }

  function reset() {
    setActiveFactors([]);
    setOptimised(false);
    setPosture("seated");
    setActiveLayer("story");
  }

  return (
    <SceneCanvas className={`pws-human-scene pws-human-${scenario.sceneKind}`} performanceMode={performanceMode} theme={chapter.themeVariant ?? "operational-dark"}>
      <StructuralLayer variant={scenario.sceneKind.includes("sightline") ? "focus" : "data"} />
      <AmbientLayer atmosphere={optimised ? "bloom" : activeFactors.length > 1 ? "data-trace" : "linework"} intensity={optimised ? "low" : "medium"} />
      <SafeArea className="pws-human-safe">
        <section className="pws-human-narrative">
          <p className="pws-technical-label">{chapter.eyebrow}</p>
          <h1 className="pws-chapter-title mt-4">{chapter.headline}</h1>
          <p className="pws-body-copy mt-5">{chapter.supportingMessage}</p>
          <div className="mt-6 grid gap-2 text-xs leading-5 text-[var(--pws-theme-muted)]">
            <span>{profile.role} / {profile.shiftType}</span>
            <span>{scenario.emotionalPurpose}</span>
          </div>
        </section>

        <section className="pws-human-stage" aria-label={`${scenario.scenarioRole}: ${operatorState}`}>
          <OperatorWorkspace
            activeFactors={activeFactors}
            optimised={optimised}
            posture={posture}
            reducedMotion={reducedMotion}
            scenario={scenario}
          />
          <HumanDetailLayer activeLayer={activeLayer} chapter={chapter} profile={profile} scenario={scenario} />
        </section>

        <section className="pws-human-controls" aria-label="Human-performance scene controls">
          <div>
            <p className="pws-technical-label">{scenario.mainPrompt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {scenario.factors.slice(0, 6).map((factor) => (
                <button
                  aria-pressed={activeFactors.includes(factor)}
                  className={`pws-human-factor ${activeFactors.includes(factor) ? "is-active" : ""}`}
                  key={factor}
                  onClick={() => toggleFactor(factor)}
                  type="button"
                >
                  {factor}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenario.sceneKind === "posture-adjustability" || scenario.sceneKind === "reach-movement" ? (
              <>
                <PrecisionButton onClick={() => setPosture("seated")}>Seated</PrecisionButton>
                <PrecisionButton onClick={() => setPosture("standing")}>Standing</PrecisionButton>
              </>
            ) : null}
            <PrecisionButton onClick={() => setActiveLayer(activeLayer === "technical" ? "story" : "technical")}>
              {activeLayer === "technical" ? "Hide technical" : scenario.technicalDetailPrompt}
            </PrecisionButton>
            <PrecisionButton onClick={activateResponse} variant="primary">{responseLabel(scenario.sceneKind)}</PrecisionButton>
            <PrecisionButton onClick={reset}>Reset</PrecisionButton>
          </div>
        </section>

        <aside className="pws-human-status">
          {chapter.narration?.recommended ? <AudioPulse reducedMotion={reducedMotion} state={state.narrationEnabled ? "available" : "paused"} /> : null}
          <p>{activeCue?.text ?? scenario.claimBoundary}</p>
        </aside>
      </SafeArea>
    </SceneCanvas>
  );
}

function OperatorWorkspace({
  activeFactors,
  optimised,
  posture,
  reducedMotion,
  scenario,
}: {
  activeFactors: string[];
  optimised: boolean;
  posture: "seated" | "standing";
  reducedMotion: boolean;
  scenario: HumanScenario;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: optimised || reducedMotion ? 1 : 1.01 }}
      className="pws-operator-workspace"
      data-optimised={optimised}
      data-posture={posture}
      transition={{ duration: reducedMotion ? 0.01 : 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pws-operator-video-wall" aria-hidden="true" />
      <div className="pws-operator-display primary" aria-hidden="true" />
      <div className="pws-operator-display secondary" aria-hidden="true" />
      <div className="pws-operator-desk" aria-hidden="true" />
      <div className="pws-operator-person" aria-hidden="true" />
      <div className="pws-reach-zone comfortable">Comfortable reach</div>
      <div className="pws-reach-zone extended">Extended reach</div>
      <div className="pws-sightline-zone">Conceptual sightline</div>
      <div className="pws-light-zone">Lighting balance</div>
      <div className="pws-acoustic-zone">Acoustic focus</div>
      {activeFactors.map((factor, index) => (
        <div className="pws-pressure-factor" key={factor} style={{ "--factor-i": index } as CSSProperties}>
          {factor}
        </div>
      ))}
      {optimised ? (
        <div className="pws-human-response-path">
          {scenario.responses.slice(0, 5).map((response) => <span key={response}>{response}</span>)}
        </div>
      ) : null}
    </motion.div>
  );
}

function HumanDetailLayer({
  activeLayer,
  chapter,
  profile,
  scenario,
}: {
  activeLayer: "story" | "explore" | "technical";
  chapter: Chapter;
  profile: ReturnType<typeof getOperatorProfile>;
  scenario: HumanScenario;
}) {
  if (activeLayer === "story") {
    return (
      <div className="pws-human-layer pws-human-layer-story">
        <strong>{scenario.scenarioRole}</strong>
        <span>{scenario.technicalPurpose}</span>
      </div>
    );
  }

  return (
    <div className="pws-human-layer">
      <p className="pws-technical-label">Technical Detail</p>
      <ul>
        {chapter.technicalLayers.map((layer) => <li key={layer}>{layer}</li>)}
      </ul>
      <p>{chapter.presenterNotes ?? chapter.presenterTalkingPoint}</p>
      <p>{profile.accessibilityNeeds}</p>
      <p>{scenario.claimBoundary}</p>
    </div>
  );
}

function responseLabel(kind: HumanScenario["sceneKind"]) {
  if (kind === "human-transformation") return "Align the room";
  if (kind === "sightline-visibility") return "Show improved view";
  if (kind === "reach-movement") return "Optimise task zone";
  if (kind === "collaboration-pressure") return "Trigger collaboration";
  return "Show response";
}

function eventForScenario(kind: HumanScenario["sceneKind"]) {
  switch (kind) {
    case "reach-movement":
      return "reach_comparison_viewed";
    case "sightline-visibility":
      return "sightline_comparison_viewed";
    case "lighting-alertness":
      return "lighting_state_selected";
    case "acoustic-comfort":
      return "acoustic_state_compared";
    case "information-overload":
      return "information_response_activated";
    case "collaboration-pressure":
      return "collaboration_mode_activated";
    default:
      return "pressure_factor_selected";
  }
}
