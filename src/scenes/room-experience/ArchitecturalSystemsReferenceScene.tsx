import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cable,
  Cctv,
  ChevronLeft,
  ChevronRight,
  Expand,
  FastForward,
  Flame,
  Headphones,
  Leaf,
  Map,
  Monitor,
  Network,
  ShieldCheck,
  Sun,
  Target,
  Thermometer,
  UserRound,
  Volume2,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordRoomExperienceEvent } from "./roomAnalytics";

type Feature = {
  title: string;
  Icon: LucideIcon;
};

type SystemCard = {
  title: string;
  bullets: string[];
  Icon: LucideIcon;
  image: string;
  color: string;
};

type DetailItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
  color?: string;
};

const heroFeatures: Feature[] = [
  { title: "Integrated Systems", Icon: Network },
  { title: "Real-Time Monitoring", Icon: Monitor },
  { title: "Energy Efficient", Icon: Leaf },
  { title: "Comfort Optimized", Icon: UserRound },
  { title: "Performance Driven", Icon: Target },
  { title: "Future Ready", Icon: FastForward },
];

const systemCards: SystemCard[] = [
  {
    title: "Lighting Systems",
    bullets: ["Tunable, circadian lighting", "Task & ambient lighting", "Emergency lighting", "Daylight integration"],
    Icon: Sun,
    image: "/assets/source-pdf/p20_050_1781x1016.jpg",
    color: "bg-control-warm",
  },
  {
    title: "HVAC Systems",
    bullets: ["Precise temperature control", "Fresh air & ventilation", "Humidity management", "Energy efficient operation"],
    Icon: Wind,
    image: "/assets/source-pdf/p31_059_2078x1168.jpg",
    color: "bg-emerald-500",
  },
  {
    title: "Acoustic Systems",
    bullets: ["Noise control & absorption", "Speech intelligibility", "Reverberation management", "Sound masking"],
    Icon: Volume2,
    image: "/assets/source-pdf/p32_060_2002x1125.jpg",
    color: "bg-violet-500",
  },
  {
    title: "Power Systems",
    bullets: ["Redundant power supply", "UPS & backup systems", "Power monitoring", "Surge protection"],
    Icon: Zap,
    image: "/assets/source-pdf/p33_061_2088x1172.jpg",
    color: "bg-amber-500",
  },
  {
    title: "Structured Cabling",
    bullets: ["Organized cable pathways", "High-density infrastructure", "Easy access & maintenance", "Future-ready capacity"],
    Icon: Cable,
    image: "/assets/source-pdf/p36_066_616x302.jpg",
    color: "bg-blue-700",
  },
  {
    title: "Security Systems",
    bullets: ["Access control", "CCTV surveillance", "Intrusion detection", "Incident management"],
    Icon: Cctv,
    image: "/assets/source-pdf/p36_068_278x181.jpg",
    color: "bg-blue-800",
  },
  {
    title: "Fire & Safety Systems",
    bullets: ["Early detection", "Alarms & notification", "Gas suppression", "Life safety compliance"],
    Icon: Flame,
    image: "/assets/source-pdf/p36_069_245x206.jpg",
    color: "bg-red-600",
  },
];

const environmentalItems: DetailItem[] = [
  { title: "Temperature Control", description: "Maintains optimal comfort for sustained focus.", Icon: Thermometer, color: "text-control-warm" },
  { title: "Air Quality Management", description: "Monitors CO2, humidity and air purity in real time.", Icon: Wind, color: "text-emerald-600" },
  { title: "Lighting Control", description: "Adaptive lighting for visual comfort and energy efficiency.", Icon: Sun, color: "text-amber-500" },
  { title: "Acoustic Optimization", description: "Reduces distraction, enhances speech clarity and concentration.", Icon: Volume2, color: "text-violet-600" },
];

const peopleItems: DetailItem[] = [
  { title: "Seamless Integration", description: "Architectural and environmental systems work together as one.", Icon: Network },
  { title: "Enhanced Well-Being", description: "Comfortable environments reduce fatigue and improve operator performance.", Icon: UserRound },
  { title: "Operational Continuity", description: "Resilient infrastructure ensures reliability in mission-critical situations.", Icon: ShieldCheck },
  { title: "Sustainable by Design", description: "Energy-efficient systems for a greener, smarter tomorrow.", Icon: Leaf },
];

const whyItems: DetailItem[] = [
  { title: "Integrated Systems", description: "All elements work together seamlessly.", Icon: Target },
  { title: "Real-Time Awareness", description: "Instant insights for faster decisions.", Icon: Monitor },
  { title: "Environmental Control", description: "Ideal conditions for focus and well-being.", Icon: Leaf },
  { title: "Safety & Reliability", description: "Built to protect people and operations.", Icon: UserRound },
  { title: "Sustained Performance", description: "Better systems deliver better outcomes.", Icon: Target },
  { title: "Future-Ready Design", description: "Scalable solutions for evolving needs.", Icon: FastForward },
];

export function ArchitecturalSystemsReferenceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordRoomExperienceEvent("architectural_journey_started", { chapterId: chapter.id, detail: "architectural-systems-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_54%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.7vw] top-[9.85vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[7.35vh] grid grid-cols-[minmax(18rem,0.46fr)_minmax(42rem,1.05fr)_minmax(19rem,0.49fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-0 top-[1.3vh] grid grid-cols-[0.28rem_minmax(0,1fr)] gap-[1.45vw]">
              <span className="h-[14.4vh] w-[3px] bg-control-warm" />
              <div>
                <h1 className="text-[clamp(2rem,2.72vw,3.78rem)] font-bold leading-[1.03] tracking-normal text-control-text md:text-[2vw]">
                  <span className="block">Architectural and</span>
                  <span className="block">Environmental</span>
                  <span className="block text-control-warm">Systems.</span>
                </h1>
                <div className="mt-[1.45vh] h-[2px] w-[2rem] bg-control-warm" />
                <p className="mt-[2vh] max-w-[18rem] text-[clamp(0.72rem,0.82vw,0.94rem)] font-medium leading-[1.55] text-slate-800 md:text-[0.8vw]">
                  A control room is more than what you see. It's the integration of architecture, infrastructure and environment designed to enhance performance, safety and sustainability.
                </p>
              </div>
            </div>
            <div className="absolute inset-x-[0.1vw] top-[42.2vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/64 px-[1.1vw] py-[1.8vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="grid grid-cols-[4.6rem_minmax(0,1fr)] items-center gap-[1vw]">
                <span className="grid h-[3.9rem] w-[3.9rem] place-items-center rounded-full border border-slate-200 bg-white/56 text-control-warm shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.8rem_1.8rem_rgb(15_23_42/0.08)]">
                  <Network aria-hidden="true" size={34} strokeWidth={1.55} />
                </span>
                <p className="text-[clamp(0.86rem,1vw,1.16rem)] font-semibold leading-[1.45] text-control-text">
                  All systems.<br />One ecosystem.<br /><span className="text-control-warm">Seamlessly connected.</span>
                </p>
              </div>
            </div>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[32.5vh_minmax(0,1fr)_11vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <img alt="" className="absolute inset-x-0 top-0 h-[77%] w-full object-cover" src="/assets/source-pdf/p06_010_574x312.jpg" />
              <div className="absolute inset-x-0 top-0 h-[77%] bg-[linear-gradient(180deg,rgb(255_255_255/0.12)_0%,transparent_55%,rgb(255_255_255/0.15)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 grid h-[23%] grid-cols-6 items-center bg-white/78">
                {heroFeatures.map((feature, index) => (
                  <HeroFeature index={index} item={feature} key={feature.title} />
                ))}
              </div>
            </section>

            <section className="relative min-h-0">
              <h2 className="text-[clamp(0.78rem,0.92vw,1.06rem)] font-semibold uppercase tracking-normal text-control-text">Architecture & Infrastructure Systems</h2>
              <div className="mt-[0.8vh] h-[2px] w-[2rem] bg-control-warm" />
              <div className="mt-[1vh] grid h-[calc(100%-2.5rem)] grid-cols-7 gap-[0.65vw]">
                {systemCards.map((system) => (
                  <SystemCardView item={system} key={system.title} />
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.75vw] py-[0.75vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="grid h-full grid-cols-[6.2rem_repeat(6,minmax(0,1fr))] items-center">
                <div className="pr-[0.8vw]">
                  <h2 className="text-[clamp(0.58rem,0.68vw,0.78rem)] font-semibold uppercase leading-tight text-control-text">Why It Matters</h2>
                  <div className="mt-[0.7vh] h-[2px] w-[1.5rem] bg-control-warm" />
                </div>
                {whyItems.map((item, index) => (
                  <WhyCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[0.52fr_0.48fr] gap-[1.15vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <DetailPanel title="Environmental Intelligence" intro="Continuous monitoring and automatic adjustment create ideal environment for peak performance." items={environmentalItems} />
            <DetailPanel title="Built for People. Designed for Performance." items={peopleItems} />
          </motion.aside>
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

function HeroFeature({ item, index }: { item: Feature; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.7rem_minmax(0,1fr)] items-center gap-[0.55vw] px-[0.8vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={index === 0 ? "text-control-warm" : "text-control-text"} size={27} strokeWidth={1.55} />
      <strong className="text-[clamp(0.5rem,0.58vw,0.67rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
    </div>
  );
}

function SystemCardView({ item }: { item: SystemCard }) {
  const Icon = item.Icon;
  return (
    <article className="relative h-full min-w-0 overflow-hidden rounded-[0.5rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.7rem_1.7rem_rgb(15_23_42/0.07)]">
      <div className="relative h-[4.45rem] overflow-hidden bg-slate-100">
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={item.image} />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgb(15_23_42/0.16)_100%)]" />
      </div>
      <span className={`absolute left-[0.65rem] top-[3.25rem] grid h-[2.05rem] w-[2.05rem] place-items-center rounded-full text-white shadow-[0_0.55rem_1.2rem_rgb(15_23_42/0.16)] ${item.color}`}>
        <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
      </span>
      <div className="px-[0.58vw] pb-[0.65vh] pt-[1.35rem]">
        <h3 className="text-[clamp(0.46rem,0.54vw,0.62rem)] font-semibold leading-tight text-control-text">{item.title}</h3>
        <ul className="mt-[0.45vh] space-y-[0.18vh] text-[clamp(0.37rem,0.43vw,0.5rem)] font-medium leading-[1.14] text-slate-800">
          {item.bullets.map((bullet) => (
            <li key={bullet}>• {bullet}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function DetailPanel({ title, intro, items }: { title: string; intro?: string; items: DetailItem[] }) {
  return (
    <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
      <h2 className="text-[clamp(0.72rem,0.84vw,0.98rem)] font-semibold uppercase tracking-normal text-control-text">{title}</h2>
      <div className="mt-[0.65vh] h-[2px] w-[2rem] bg-control-warm" />
      {intro ? <p className="mt-[1vh] text-[clamp(0.5rem,0.58vw,0.68rem)] font-medium leading-[1.28] text-slate-800">{intro}</p> : null}
      <div className="mt-[0.9vh] grid gap-[0.35vh]">
        {items.map((item, index) => (
          <DetailRow index={index} item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}

function DetailRow({ item, index }: { item: DetailItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.65rem_minmax(0,1fr)] items-center gap-[0.6vw] py-[0.45vh] ${index ? "border-t border-slate-200/90" : ""}`}>
      <span className={`grid h-[2.18rem] w-[2.18rem] place-items-center rounded-full border border-slate-200 bg-white/56 ${item.color ?? "text-control-warm"}`}>
        <Icon aria-hidden="true" size={19} strokeWidth={1.55} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.49rem,0.57vw,0.66rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.43rem,0.5vw,0.58rem)] font-medium leading-[1.18] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function WhyCell({ item, index }: { item: DetailItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2rem_minmax(0,1fr)] items-center gap-[0.45vw] px-[0.62vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={index === 0 ? "text-control-warm" : "text-control-text"} size={22} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.43rem,0.5vw,0.58rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.36rem,0.42vw,0.49rem)] font-medium leading-[1.08] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}


