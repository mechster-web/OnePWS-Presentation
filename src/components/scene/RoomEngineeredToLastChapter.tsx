import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Cog,
  Droplets,
  Expand,
  Gauge,
  Hammer,
  Headphones,
  Layers3,
  Leaf,
  Map,
  PanelTop,
  RefreshCw,
  ShieldCheck,
  Thermometer,
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

const durabilityPrinciples: SimpleItem[] = [
  { title: "Strong by Design", detail: "High-performance materials and robust construction.", Icon: ShieldCheck },
  { title: "Built for Load", detail: "Supports heavy equipment, people and operations.", Icon: Layers3 },
  { title: "Resilient by Nature", detail: "Withstands impact, vibration, moisture and wear.", Icon: Cog },
  { title: "Reliable for Years", detail: "Long life. Low maintenance. Maximum uptime.", Icon: Clock3 },
];

const durabilityCallouts: CalloutItem[] = [
  {
    title: "High-Impact Walls",
    detail: "Resist impact, abrasion and daily wear.",
    Icon: PanelTop,
    className: "left-[3%] top-[34%]",
  },
  {
    title: "Rigid & Stable Ceilings",
    detail: "Maintain shape and performance over time, even in extreme conditions.",
    Icon: Layers3,
    className: "left-[42%] top-[10%]",
  },
  {
    title: "Structural Integrity",
    detail: "Engineered joints and frames for long-term stability.",
    Icon: ShieldCheck,
    className: "right-[3%] top-[36%]",
  },
  {
    title: "Heavy-Duty Flooring",
    detail: "High load capacity with excellent dimensional stability.",
    Icon: Gauge,
    className: "left-[43%] bottom-[4.5%]",
  },
];

const builtToPerform: PerformanceItem[] = [
  { value: "2.0 - 5.0 kN/m2", label: "Floor Load Capacity", detail: "Suitable for heavy equipment.", Icon: Layers3 },
  { value: "IK 08 - IK 10", label: "Impact Resistance", detail: "For walls and panels.", Icon: Hammer },
  { value: "IP 40 - IP 54", label: "Dust & Moisture Protection", detail: "Specified as per environment.", Icon: Droplets },
  { value: "-20 C to 60 C", label: "Temperature Tolerance", detail: "Stability in demanding conditions.", Icon: Thermometer },
  { value: "15+ Years", label: "Service Life", detail: "With minimal performance loss.", Icon: Clock3 },
];

const durableSurfaces: SurfaceItem[] = [
  {
    title: "Ceiling Systems",
    detail: "Engineered for long-term performance and easy maintenance.",
    bullets: ["High dimensional stability", "Moisture and sag resistant", "Easy access for services", "Fire-rated options available"],
    image: "ceiling",
    Icon: Layers3,
  },
  {
    title: "Wall Panel Systems",
    detail: "Built to handle daily impact while maintaining aesthetics and performance.",
    bullets: ["High-impact and scratch resistant", "Strong, rigid and stable panels", "Seamless precision joints", "Acoustic and fire-rated options"],
    image: "wall",
    Icon: PanelTop,
  },
  {
    title: "Floor Systems",
    detail: "Designed for stability, safety and long-term reliability under heavy loads.",
    bullets: ["High load bearing capacity", "Wear and abrasion resistant", "Vibration and shock control", "Anti-static options available"],
    image: "floor",
    Icon: Gauge,
  },
];

const longTermBenefits: SimpleItem[] = [
  { title: "Lower Maintenance", detail: "Fewer repairs. Lower life-cycle costs.", Icon: ShieldCheck },
  { title: "Higher Availability", detail: "Reliable systems mean maximum uptime.", Icon: Clock3 },
  { title: "Better ROI", detail: "Durable by design. Value that lasts for years.", Icon: BarChart3 },
  { title: "Sustainable Choice", detail: "Quality materials that reduce waste and last longer.", Icon: Leaf },
];

export function RoomEngineeredToLastChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;
  const roomAsset = getAsset("ambient-control-room");

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#fff1f3_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute right-[5vw] top-[12vh] h-[34vh] w-[36vw] rounded-full bg-control-warm/7 blur-[76px]" />
      <div className="pointer-events-none absolute left-[1vw] top-[14vh] h-[58vh] w-[40vw] opacity-[0.055] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[10.1vh] grid grid-cols-[minmax(16rem,0.31fr)_minmax(0,1fr)_minmax(18rem,0.36fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="min-h-0 pt-[2.9vh]" initial={false} transition={{ duration: 0.72, ease }}>
            <h1 className="text-[clamp(2.05rem,2.85vw,4rem)] font-bold leading-[1.03] tracking-normal text-black md:text-[2.5vw]">
              <span className="block">The Room Is</span>
              <span className="block text-control-warm">Engineered</span>
              <span className="block">to <span className="text-control-warm">Last.</span></span>
            </h1>
            <div className="mt-[1.3vh] h-[2px] w-[3rem] bg-control-warm" />
            <p className="mt-[1.55vh] text-[clamp(0.76rem,0.95vw,1.1rem)] font-medium leading-[1.38] text-slate-900 md:text-[0.8vw]">
              Every surface, every system and every connection is engineered for strength, durability and long-term performance in demanding environments.
            </p>

            <section className="mt-[4vh] rounded-[0.85rem] border border-slate-200/86 bg-white/72 p-[1vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[24px]">
              <div className="flex items-center gap-4">
                <span className="grid size-16 shrink-0 place-items-center rounded-full border border-red-200 bg-red-50 text-control-warm">
                  <ShieldCheck aria-hidden="true" size={34} strokeWidth={1.6} />
                </span>
                <p className="text-[clamp(0.8rem,0.95vw,1.08rem)] font-semibold leading-[1.35] text-slate-900">
                  Built strong. Built smart. <span className="block font-semibold text-control-warm">Built to perform year after year.</span>
                </p>
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[9.3vh_minmax(0,1fr)_20.2vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.72, delay: 0.06, ease }}>
            <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/74 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.84rem,0.98vw,1.14rem)] font-semibold uppercase leading-tight text-control-text">
                Engineered for Durability. Designed for Demanding Environments.
              </h2>
              <div className="mt-[0.65vh] grid grid-cols-4 divide-x divide-slate-200/90">
                {durabilityPrinciples.map((item) => (
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
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.20),rgb(255_255_255/0.03)_45%,rgb(255_255_255/0.19))]" />
              <div className="absolute inset-x-0 top-0 h-[26%] bg-[radial-gradient(circle_at_50%_20%,rgb(213_29_42/0.20),transparent_48%)]" />
              {durabilityCallouts.map((item) => (
                <DurabilityCallout item={item} key={item.title} />
              ))}
            </section>

            <section className="overflow-hidden rounded-[0.85rem] border border-slate-200/86 bg-white/74 px-[0.95vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.76rem,0.88vw,1rem)] font-semibold uppercase leading-tight text-control-text">
                Engineered Surfaces. Proven Performance.
              </h2>
              <div className="mt-[0.55vh] h-[2px] w-[2.5rem] bg-control-warm" />
              <div className="mt-[0.85vh] grid grid-cols-3 gap-[0.65vw]">
                {durableSurfaces.map((item) => (
                  <SurfaceCard item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_18vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.72, delay: 0.12, ease }}>
            <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/74 p-[1vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.82rem,0.96vw,1.1rem)] font-semibold uppercase leading-tight text-control-text">
                Built to Perform
              </h2>
              <div className="mt-[0.65vh] h-[2px] w-[2.5rem] bg-control-warm" />
              <div className="mt-[1vh] grid gap-[0.65vh]">
                {builtToPerform.map((metric) => (
                  <PerformanceMetric metric={metric} key={metric.value} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/74 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.74rem,0.86vw,1rem)] font-semibold uppercase leading-tight text-control-text">
                Long-Term Benefits
              </h2>
              <div className="mt-[0.55vh] h-[2px] w-[2.25rem] bg-control-warm" />
              <div className="mt-[0.8vh] grid grid-cols-4 gap-[0.45vw]">
                {longTermBenefits.map((item) => (
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

function DurabilityCallout({ item }: { item: CalloutItem }) {
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
      ? ["bg-slate-200", "bg-stone-300", "bg-amber-200", "bg-slate-400", "bg-stone-200"]
      : type === "floor"
        ? ["bg-slate-300", "bg-slate-700", "bg-amber-200", "bg-slate-300", "bg-stone-500"]
        : ["bg-slate-100", "bg-slate-300", "bg-slate-800", "bg-amber-200", "bg-slate-200"];

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
