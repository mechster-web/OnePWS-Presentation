import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Expand,
  Flame,
  Gauge,
  Headphones,
  Layers3,
  Map,
  PanelTop,
  Shield,
  ShieldCheck,
  Cloud,
  Thermometer,
  Users,
  Eye,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { getAsset } from "../../content/assetManifest";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type SimpleItem = {
  title: string;
  detail: string;
  Icon: LucideIcon;
};

type SurfaceItem = SimpleItem & {
  bullets: string[];
  image: "ceiling" | "wall" | "floor";
};

type CalloutItem = SimpleItem & {
  className: string;
};

type PerformanceItem = {
  value: string;
  label: string;
  detail: string;
  Icon: LucideIcon;
};

const safetyPrinciples: SimpleItem[] = [
  { title: "Protect People", detail: "Safe egress, low smoke and toxic emissions.", Icon: Shield },
  { title: "Protect Assets", detail: "Fire-rated systems limit spread and damage.", Icon: Building2 },
  { title: "Protect Operations", detail: "Maintain critical functions and reduce downtime.", Icon: Clock3 },
  { title: "Protect Compliance", detail: "Meets global fire safety codes and standards.", Icon: CheckCircle2 },
];

const safetyCallouts: CalloutItem[] = [
  {
    title: "Fire-Rated Wall Systems",
    detail: "Inhibits flame spread, reduces smoke and protects structural walls.",
    Icon: PanelTop,
    className: "left-[3%] top-[34%]",
  },
  {
    title: "Fire-Rated Ceiling",
    detail: "Limits fire spread above the ceiling and maintains compartment integrity.",
    Icon: Layers3,
    className: "left-[42%] top-[11%]",
  },
  {
    title: "Compartmentation",
    detail: "Fire-resistant boundaries help contain fire and protect adjacent areas.",
    Icon: ShieldCheck,
    className: "right-[3%] top-[34%]",
  },
  {
    title: "Fire-Rated Flooring",
    detail: "Limits fire penetration and supports safe egress.",
    Icon: Flame,
    className: "left-[43%] bottom-[4.5%]",
  },
];

const firePerformance: PerformanceItem[] = [
  { value: "Class A / A2-s1,d0", label: "Reaction to Fire", detail: "Low flame spread, low smoke, no flaming droplets.", Icon: Flame },
  { value: "s1 - s2", label: "Smoke Development", detail: "Low smoke production for clearer visibility.", Icon: Cloud },
  { value: "<= 25", label: "Flame Spread", detail: "Low Flame Spread Index for enhanced safety.", Icon: Gauge },
  { value: "Up to 120 min", label: "Fire Resistance", detail: "Rated assemblies maintain integrity and insulation.", Icon: Thermometer },
  { value: "NFPA, EN, ISO", label: "Standards Compliance", detail: "Designed to meet international fire safety standards.", Icon: CheckCircle2 },
];

const fireSurfaces: SurfaceItem[] = [
  {
    title: "Fire-Rated Ceiling Systems",
    detail: "Maintains integrity and limits heat transfer above the ceiling.",
    bullets: ["Non-combustible core", "Fire-rated mineral tiles", "Sealed joints and edges", "Concealed grid options"],
    image: "ceiling",
    Icon: Layers3,
  },
  {
    title: "Fire-Rated Wall Systems",
    detail: "Inhibits fire and smoke spread while maintaining acoustic and structural performance.",
    bullets: ["Fire-rated gypsum boards", "Mineral wool insulation", "Metal stud system", "Fire-stopping at penetrations"],
    image: "wall",
    Icon: PanelTop,
  },
  {
    title: "Fire-Rated Flooring Systems",
    detail: "Resists fire penetration and supports load and egress safety.",
    bullets: ["Low flame spread finishes", "Fire-rated underlayment", "High density core", "Sealed penetrations"],
    image: "floor",
    Icon: Flame,
  },
];

const confidenceItems: SimpleItem[] = [
  { title: "Feel Safe", detail: "Designed for life safety and peace of mind.", Icon: Shield },
  { title: "Stay Focused", detail: "Low smoke and heat help maintain visibility and control.", Icon: Eye },
  { title: "Stay Operational", detail: "Fire-resistant design helps protect critical systems.", Icon: RefreshCw },
  { title: "Work With Trust", detail: "A safer room builds confidence in every decision.", Icon: Users },
];

export function RoomBuiltToProtectChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;
  const roomAsset = getAsset("ambient-control-room");

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#f4f6f8_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute right-[5vw] top-[12vh] h-[34vh] w-[36vw] rounded-full bg-red-500/6 blur-[76px]" />
      <div className="pointer-events-none absolute left-[1vw] top-[14vh] h-[58vh] w-[40vw] opacity-[0.055] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[10.1vh] grid grid-cols-[minmax(16rem,0.31fr)_minmax(0,1fr)_minmax(18rem,0.36fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="min-h-0 pt-[2.9vh]" initial={false} transition={{ duration: 0.72, ease }}>
            <h1 className="text-[clamp(2.05rem,2.85vw,4rem)] font-bold leading-[1.03] tracking-normal text-black md:text-[2.5vw]">
              <span className="block">The Room</span>
              <span className="block">Is Built to</span>
              <span className="block text-control-warm">Protect.</span>
            </h1>
            <div className="mt-[1.3vh] h-[2px] w-[3rem] bg-control-warm" />
            <p className="mt-[1.55vh] text-[clamp(0.76rem,0.95vw,1.1rem)] font-medium leading-[1.38] text-slate-900 md:text-[0.8vw]">
              Fire safety is designed into every surface, helping protect people, assets and operations when it matters most.
            </p>

            <section className="mt-[4vh] rounded-[0.85rem] border border-slate-200/86 bg-white/72 p-[1vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[24px]">
              <div className="flex items-center gap-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-full border border-red-200 bg-red-50 text-control-warm">
                  <Shield aria-hidden="true" size={34} strokeWidth={1.6} />
                </span>
                <p className="text-[clamp(0.8rem,0.95vw,1.08rem)] font-semibold leading-[1.35] text-slate-900">
                  Integrated fire protection. <span className="block font-semibold text-control-warm">Built in. Not added on.</span>
                </p>
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[9.3vh_minmax(0,1fr)_20.2vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.72, delay: 0.06, ease }}>
            <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/74 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.84rem,0.98vw,1.14rem)] font-semibold uppercase leading-tight text-control-text">
                Engineered for Fire Safety. Built for Continuity.
              </h2>
              <div className="mt-[0.65vh] grid grid-cols-4 divide-x divide-slate-200/90">
                {safetyPrinciples.map((item) => (
                  <div className="grid grid-cols-[2.65rem_minmax(0,1fr)] items-center gap-[0.55vw] px-[0.65vw] first:pl-0 last:pr-0" key={item.title}>
                    <span className="grid size-10 place-items-center rounded-full bg-red-50 text-control-warm">
                      <item.Icon aria-hidden="true" size={22} strokeWidth={1.65} />
                    </span>
                    <span>
                      <strong className="block text-[clamp(0.55rem,0.64vw,0.76rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
                      <span className="mt-[0.16vh] block text-[clamp(0.46rem,0.54vw,0.64rem)] font-semibold leading-[1.18] text-slate-600">{item.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.85rem] border border-slate-200/86 bg-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)]">
              {roomAsset?.src ? (
                <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" draggable={false} src={roomAsset.src} />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.18),rgb(255_255_255/0.02)_45%,rgb(255_255_255/0.2))]" />
              <div className="absolute inset-x-0 top-0 h-[26%] bg-[radial-gradient(circle_at_50%_20%,rgb(239_68_68/0.24),transparent_48%)]" />
              <div className="absolute left-[8%] right-[8%] top-[10%] h-[2px] bg-control-warm/70 shadow-[0_0_22px_rgb(239_68_68/0.58)]" />
              {safetyCallouts.map((item) => (
                <SafetyCallout item={item} key={item.title} />
              ))}
            </section>

            <section className="overflow-hidden rounded-[0.85rem] border border-slate-200/86 bg-white/74 px-[0.95vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.76rem,0.88vw,1rem)] font-semibold uppercase leading-tight text-control-text">
                Fire-Safe Surfaces. Reliable by Design.
              </h2>
              <div className="mt-[0.55vh] h-[2px] w-[2.5rem] bg-control-warm" />
              <div className="mt-[0.85vh] grid grid-cols-3 gap-[0.65vw]">
                {fireSurfaces.map((item) => (
                  <SurfaceCard item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_18vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.72, delay: 0.12, ease }}>
            <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/74 p-[1vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.82rem,0.96vw,1.1rem)] font-semibold uppercase leading-tight text-control-text">
                Fire Safety Performance
              </h2>
              <div className="mt-[0.65vh] h-[2px] w-[2.5rem] bg-control-warm" />
              <div className="mt-[1vh] grid gap-[0.65vh]">
                {firePerformance.map((metric) => (
                  <PerformanceMetric metric={metric} key={metric.value} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/74 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.74rem,0.86vw,1rem)] font-semibold uppercase leading-tight text-control-text">
                Operator Confidence
              </h2>
              <div className="mt-[0.55vh] h-[2px] w-[2.25rem] bg-control-warm" />
              <div className="mt-[0.8vh] grid grid-cols-4 gap-[0.45vw]">
                {confidenceItems.map((item) => (
                  <div className="text-center" key={item.title}>
                    <item.Icon aria-hidden="true" className="mx-auto text-control-warm" size={25} strokeWidth={1.55} />
                    <p className="mt-[0.35vh] text-[clamp(0.45rem,0.53vw,0.62rem)] font-semibold leading-tight text-control-text">{item.title}</p>
                    <p className="mt-[0.2vh] text-[clamp(0.38rem,0.45vw,0.52rem)] font-medium leading-[1.16] text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </motion.aside>
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

function SafetyCallout({ item }: { item: CalloutItem }) {
  return (
    <div className={`absolute max-w-[13.2rem] rounded-[0.7rem] border border-white/86 bg-white/80 px-[0.9vw] py-[0.85vh] shadow-[0_0.8rem_1.8rem_rgb(15_23_42/0.12)] backdrop-blur-[18px] ${item.className}`}>
      <div className="flex items-center gap-2">
        <item.Icon aria-hidden="true" className="text-control-warm" size={17} strokeWidth={1.75} />
        <strong className="text-[clamp(0.52rem,0.6vw,0.7rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</strong>
      </div>
      <p className="mt-[0.45vh] text-[clamp(0.46rem,0.54vw,0.63rem)] font-medium leading-[1.2] text-slate-700">{item.detail}</p>
    </div>
  );
}

function PerformanceMetric({ metric }: { metric: PerformanceItem }) {
  return (
    <article className="grid grid-cols-[3.65rem_minmax(0,1fr)] items-center gap-[0.8vw] border-b border-slate-200/86 pb-[0.7vh] last:border-b-0 last:pb-0">
      <span className="grid size-12 place-items-center rounded-full border border-red-200 bg-red-50 text-control-warm">
        <metric.Icon aria-hidden="true" size={24} strokeWidth={1.55} />
      </span>
      <span>
        <strong className="block text-[clamp(0.96rem,1.24vw,1.45rem)] font-semibold leading-none text-control-warm">{metric.value}</strong>
        <span className="mt-[0.35vh] block text-[clamp(0.54rem,0.64vw,0.74rem)] font-semibold uppercase leading-tight text-control-text">{metric.label}</span>
        <span className="mt-[0.18vh] block text-[clamp(0.46rem,0.54vw,0.64rem)] font-medium leading-[1.18] text-slate-600">{metric.detail}</span>
      </span>
    </article>
  );
}

function SurfaceCard({ item }: { item: SurfaceItem }) {
  return (
    <article className="grid min-h-[14.4vh] grid-cols-[minmax(6rem,0.47fr)_minmax(0,0.53fr)] gap-[0.65vw] rounded-[0.68rem] border border-slate-200/86 bg-white/68 p-[0.62vw]">
      <SurfaceStack type={item.image} />
      <div className="min-w-0">
        <h3 className="text-[clamp(0.54rem,0.64vw,0.76rem)] font-semibold uppercase leading-tight text-control-warm">{item.title}</h3>
        <ul className="mt-[0.55vh] grid gap-[0.2vh]">
          {item.bullets.map((bullet) => (
            <li className="flex gap-2 text-[clamp(0.42rem,0.5vw,0.58rem)] font-semibold leading-[1.16] text-slate-700" key={bullet}>
              <span className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-control-warm" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <p className="mt-[0.55vh] text-[clamp(0.42rem,0.5vw,0.58rem)] font-medium leading-[1.18] text-slate-600">{item.detail}</p>
      </div>
    </article>
  );
}

function SurfaceStack({ type }: { type: SurfaceItem["image"] }) {
  const layers =
    type === "wall"
      ? ["bg-slate-200", "bg-red-100", "bg-stone-300", "bg-slate-400", "bg-stone-200"]
      : type === "floor"
        ? ["bg-stone-300", "bg-slate-800", "bg-red-100", "bg-slate-300", "bg-stone-400"]
        : ["bg-slate-100", "bg-slate-300", "bg-slate-700", "bg-red-100", "bg-stone-200"];

  if (type === "wall") {
    return (
      <div className="flex h-full items-center justify-center gap-1 rounded-[0.45rem] bg-slate-50/80 p-2">
        {layers.map((layer, index) => (
          <span className={`h-[72%] w-[1rem] rounded-sm ${layer} shadow-[0_0.4rem_0.9rem_rgb(15_23_42/0.12)]`} key={`${layer}-${index}`} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative grid h-full place-items-center rounded-[0.45rem] bg-slate-50/80">
      {layers.map((layer, index) => (
        <span
          className={`absolute h-[0.92rem] w-[72%] -skew-x-12 rounded-sm ${layer} shadow-[0_0.45rem_0.9rem_rgb(15_23_42/0.14)]`}
          key={`${layer}-${index}`}
          style={{ transform: `translateY(${(index - 2) * 0.55}rem) skewX(-12deg)` }}
        />
      ))}
    </div>
  );
}


