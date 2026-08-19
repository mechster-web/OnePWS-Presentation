import { motion } from "framer-motion";
import {
  BarChart3,
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
  ShieldCheck,
  Thermometer,
  type LucideIcon,
} from "lucide-react";
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

type PerformanceItem = {
  value: string;
  label: string;
  detail: string;
  Icon: LucideIcon;
};

type RoomHotspot = {
  title: string;
  detail: string;
  Icon: LucideIcon;
  x: string;
  y: string;
  align?: "left" | "right";
};

const durabilityPrinciples: SimpleItem[] = [
  { title: "Strong by Design", detail: "High-performance materials and robust construction.", Icon: ShieldCheck },
  { title: "Built for Load", detail: "Supports heavy equipment, people and operations.", Icon: Layers3 },
  { title: "Resilient by Nature", detail: "Withstands impact, vibration, moisture and wear.", Icon: Cog },
  { title: "Reliable for Years", detail: "Long life. Low maintenance. Maximum uptime.", Icon: Clock3 },
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

const roomHotspots: RoomHotspot[] = [
  { title: "Rigid Ceiling Grid", detail: "Stable overhead structure for long service life.", Icon: Layers3, x: "50%", y: "14%" },
  { title: "Impact-Resistant Walls", detail: "Durable panels protect high-traffic operations.", Icon: PanelTop, x: "16%", y: "45%" },
  { title: "Heavy-Duty Console Zone", detail: "Designed around equipment load and daily use.", Icon: Gauge, x: "69%", y: "57%", align: "right" },
  { title: "Wear-Resistant Flooring", detail: "Reliable floor surface for rolling chairs and uptime.", Icon: ShieldCheck, x: "36%", y: "77%" },
];

export function RoomEngineeredToLastChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="grid h-full w-full grid-rows-[minmax(0,1fr)_auto_auto] gap-[28px] overflow-hidden bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_62%,#fff1f3_100%)] px-[1.55cqw] pb-[1.2cqh] pt-[8.9cqh] text-control-text">
      <motion.div animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[minmax(16rem,0.28fr)_minmax(0,1fr)_minmax(18rem,0.31fr)] gap-[1.05cqw]" initial={false} transition={{ duration: 0.72, ease }}>
        <aside className="flex min-h-0 flex-col justify-between">
          <div>
            <h1 className="text-[clamp(1.85rem,2.62cqw,3.6rem)] mt-[4.8cqh] font-bold leading-[1.2] tracking-normal text-slate-950 md:text-[3cqw]">
              <span className="block">The Room Is</span>
              <span className="block text-red-600">Engineered</span>
              <span className="block">to <span className="text-control-warm">Last.</span></span>
            </h1>
            <div className="mt-[1.1cqh] h-[2px] w-[3rem] bg-control-warm" />
            <p className="mt-[1.15cqh] text-[clamp(0.76rem,0.92cqw,1.08rem)] font-medium leading-[1.42] text-slate-900 md:text-[0.84cqw]">
              Every surface, every system and every connection is engineered for strength, durability and long-term performance in the most demanding environments.
            </p>
          </div>

          <section className="rounded-[0.42rem] border border-slate-200/86 bg-white p-[0.9cqw] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-blue-200 bg-white text-red-600">
                <ShieldCheck aria-hidden="true" size={31} strokeWidth={1.55} />
              </span>
              <p className="text-[clamp(0.76rem,0.9cqw,1.05rem)] font-semibold leading-[1.45] text-slate-900">
                Built strong.
                <span className="block">Built smart.</span>
                <span className="block font-semibold text-red-600">Built to perform-year after year.</span>
              </p>
            </div>
          </section>
        </aside>

        <main className="grid min-h-0 grid-rows-[auto_minmax(0,41cqh)] overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <section className="px-[1.15cqw] pb-[0.12cqh] pt-[3.62cqh]">
            <h2 className="text-[clamp(1rem,1.18cqw,1.36rem)] font-semibold uppercase leading-tight text-control-text">
              Engineered for Durability. Designed for Demanding Environments.
            </h2>
            <div className="mt-[3.38cqh] grid grid-cols-4 divide-x divide-slate-200/90">
              {durabilityPrinciples.map((item) => (
                <div className="grid grid-cols-[3.75rem_minmax(0,1fr)] items-start gap-[0.72cqw] px-[0.78cqw] first:pl-0 last:pr-0" key={item.title}>
                  <span className="grid size-14 place-items-center rounded-full border border-blue-200 bg-white text-red-600">
                    <item.Icon aria-hidden="true" size={31} strokeWidth={1.65} />
                  </span>
                  <span>
                    <strong className="block text-[clamp(0.68rem,0.76cqw,0.88rem)] font-semibold leading-tight text-slate-950">{item.title}</strong>
                    <span className="mt-[0.18cqh] block text-[clamp(0.58rem,0.66cqw,0.78rem)] font-medium leading-[1.26] text-slate-900">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex min-h-0 flex-col bg-white">
            <div className="relative min-h-0 flex-1 overflow-hidden bg-white">
              <img alt="Structurally engineered control room with high-impact wall, rigid ceiling, joint integrity and heavy-duty flooring callouts" className="h-full w-full object-cover object-center" draggable={false} src="/assets/generated/rooms/room-engineered-to-last-structure.png" />
              {roomHotspots.map((hotspot) => (
                <RoomHotspotMarker hotspot={hotspot} key={hotspot.title} />
              ))}
            </div>
          </section>
        </main>

        <aside className="grid min-h-0">
          <section className="overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white px-[1.25cqw] py-[1.3cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
            <h2 className="text-[clamp(0.9rem,1.05cqw,1.18rem)] font-semibold uppercase leading-tight text-control-text">
              Built to Perform
            </h2>
            <div className="mt-[1.8cqh] mb-[1.8cqh] h-[2px] w-[2.5rem] bg-control-warm" />
            <div className="mt-[1.1cqh] grid gap-[3cqh]">
              {builtToPerform.map((metric) => (
                <PerformanceMetric metric={metric} key={metric.value} />
              ))}
            </div>
          </section>
        </aside>
      </motion.div>

      <motion.div animate={{ opacity: 1, y: 0 }} className="grid grid-cols-[minmax(0,1fr)_minmax(18rem,0.32fr)] gap-[1.05cqw]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
        <section className="overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white px-[1.05cqw] pb-[0.75cqh] pt-[1.05cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <h2 className="text-[clamp(0.96rem,1.1cqw,1.28rem)] font-semibold uppercase leading-tight text-control-text">
            Engineered Surfaces. Proven Performance.
          </h2>
          <div className="mt-[0.55cqh] h-[2px] w-[2.5rem] bg-control-warm" />
          <div className="mt-[0.72cqh] grid grid-cols-3 gap-[0.78cqw]">
            {durableSurfaces.map((item) => (
              <SurfaceCard item={item} key={item.title} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white px-[1.05cqw] pb-[0.75cqh] pt-[1.05cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <h2 className="text-[clamp(0.98rem,1.12cqw,1.3rem)] font-semibold uppercase leading-tight text-control-text">
            Long-Term Benefits
          </h2>
          <div className="mt-[0.55cqh] h-[2px] w-[2.5rem] bg-control-warm" />
          <div className="mt-[3.05cqh] grid grid-cols-4 gap-[0.6cqw]">
            {longTermBenefits.map((item) => (
              <div className="text-center" key={item.title}>
                <item.Icon aria-hidden="true" className="mx-auto text-red-600" size={28} strokeWidth={1.55} />
                <p className="mt-[0.52cqh] text-[clamp(0.58rem,0.66cqw,0.78rem)] font-semibold leading-tight text-control-text">{item.title}</p>
                <p className="mt-[0.34cqh] text-[clamp(0.48rem,0.54cqw,0.64rem)] font-medium leading-[1.24] text-slate-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.div>

      <motion.div animate={{ opacity: 1, y: 0 }} className="flex justify-start" initial={false} transition={{ duration: 0.62, delay: 0.42, ease }}>
        <div className="flex gap-[0.7cqw]">
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
        </div>
      </motion.div>
    </article>
  );
}

function RoomHotspotMarker({ hotspot }: { hotspot: RoomHotspot }) {
  return (
    <div className="absolute z-10" style={{ left: hotspot.x, top: hotspot.y }}>
      <motion.span
        animate={{
          boxShadow: [
            "0 0 0 0.38rem rgb(220 38 38 / 0.16), 0 0 0 0 rgb(220 38 38 / 0.32)",
            "0 0 0 0.62rem rgb(220 38 38 / 0.08), 0 0 1.4rem 0.18rem rgb(220 38 38 / 0.44)",
            "0 0 0 0.38rem rgb(220 38 38 / 0.16), 0 0 0 0 rgb(220 38 38 / 0.32)",
          ],
          opacity: [0.86, 1, 0.86],
        }}
        className="absolute left-0 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-red-600"
        transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
      />
      <motion.article
        animate={{
          boxShadow: [
            "0 0.75rem 1.8rem rgb(15 23 42 / 0.18), 0 0 0 0 rgb(220 38 38 / 0)",
            "0 0.9rem 2.2rem rgb(15 23 42 / 0.18), 0 0 1.2rem 0.1rem rgb(220 38 38 / 0.28)",
            "0 0.75rem 1.8rem rgb(15 23 42 / 0.18), 0 0 0 0 rgb(220 38 38 / 0)",
          ],
          opacity: [0.94, 1, 0.94],
        }}
        className={[
          "absolute top-0 w-[min(13.2rem,20cqw)] rounded-[0.42rem] border border-white/70 bg-white/95 p-[0.48rem] text-slate-950 backdrop-blur-md",
          "left-[1.05rem] -translate-y-1/2",
        ].join(" ")}
        transition={{ duration: 2.15, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="flex items-start gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full border border-red-100 bg-white text-red-600">
            <hotspot.Icon aria-hidden="true" size={18} strokeWidth={1.7} />
          </span>
          <span className="min-w-0">
            <strong className="block text-[clamp(0.56rem,0.66cqw,0.78rem)] font-semibold leading-tight">{hotspot.title}</strong>
            <span className="mt-[0.18rem] block text-[clamp(0.48rem,0.56cqw,0.66rem)] font-medium leading-[1.22] text-slate-700">{hotspot.detail}</span>
          </span>
        </div>
      </motion.article>
    </div>
  );
}

function PerformanceMetric({ metric }: { metric: PerformanceItem }) {
  return (
    <article className="grid grid-cols-[3.9rem_minmax(0,1fr)] items-center gap-[0.72cqw] border-b border-slate-200/86 pb-[1cqh] last:border-b-0 last:pb-0">
      <span className="grid size-16 place-items-center rounded-full border border-red-100 bg-white text-red-600">
        <metric.Icon aria-hidden="true" size={34} strokeWidth={1.45} />
      </span>
      <span className="min-w-0">
        <strong className="block break-words text-[clamp(1rem,1.22cqw,1.46rem)] font-semibold leading-[1.06] text-red-600">{metric.value}</strong>
        <span className="mt-[0.42cqh] block text-[clamp(0.6rem,0.7cqw,0.82rem)] font-semibold leading-tight text-control-text">{metric.label}</span>
        <span className="mt-[0.2cqh] block text-[clamp(0.52rem,0.6cqw,0.7rem)] font-medium leading-[1.24] text-slate-800">({metric.detail})</span>
      </span>
    </article>
  );
}

function SurfaceCard({ item }: { item: SurfaceItem }) {
  return (
    <article className="grid min-h-[17.4cqh] grid-cols-[minmax(9.5rem,0.48fr)_minmax(0,0.52fr)] gap-[0.95cqw] rounded-[0.46rem] bg-white p-[0.52cqw]">
      <SurfaceStack type={item.image} />
      <div className="min-w-0">
        <h3 className="text-[clamp(0.72rem,0.84cqw,0.98rem)] font-semibold uppercase leading-tight text-red-600">{item.title}</h3>
        <ul className="mt-[0.68cqh] grid gap-[0.27cqh]">
          {item.bullets.map((bullet) => (
            <li className="flex gap-2 text-[clamp(0.56rem,0.66cqw,0.78rem)] font-medium leading-[1.2] text-slate-900" key={bullet}>
              <span className="mt-[0.34rem] h-1 w-1 shrink-0 rounded-full bg-slate-900" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-[0.68cqh] h-[2px] w-[2.35rem] bg-red-600" />
        <p className="mt-[0.5cqh] text-[clamp(0.56rem,0.66cqw,0.78rem)] font-medium leading-[1.24] text-slate-800">{item.detail}</p>
      </div>
    </article>
  );
}

function SurfaceStack({ type }: { type: SurfaceItem["image"] }) {
  const systemImages: Record<SurfaceItem["image"], string> = {
    ceiling: "/assets/products/room-systems/ceiling-systems.png",
    wall: "/assets/products/room-systems/wall-panel-systems.png",
    floor: "/assets/products/room-systems/floor-systems.png",
  };

  return (
    <div className="grid h-full place-items-center overflow-hidden rounded-[0.28rem] bg-white p-[0.12rem]">
      <img alt={`${type} system layered detail`} className="h-full w-full object-contain" draggable={false} src={systemImages[type]} />
    </div>
  );
}
