import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Cloud,
  Expand,
  Flame,
  Gauge,
  Headphones,
  Layers3,
  Map,
  PanelTop,
  RefreshCw,
  Shield,
  Thermometer,
  Users,
  Eye,
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

const safetyPrinciples: SimpleItem[] = [
  { title: "Protect People", detail: "Safe egress, low smoke and toxic emissions.", Icon: Shield },
  { title: "Protect Assets", detail: "Fire-rated systems limit spread and damage.", Icon: Building2 },
  { title: "Protect Operations", detail: "Maintain critical functions and reduce downtime.", Icon: Clock3 },
  { title: "Protect Compliance", detail: "Meets global fire safety codes and standards.", Icon: CheckCircle2 },
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

const roomHotspots: RoomHotspot[] = [
  { title: "Fire-Rated Ceiling", detail: "Overhead assembly supports compartment safety.", Icon: Layers3, x: "51%", y: "17%" },
  { title: "Low-Smoke Wall Panels", detail: "Wall systems help limit flame and smoke spread.", Icon: PanelTop, x: "17%", y: "43%" },
  { title: "Protected Equipment Zone", detail: "Critical controls remain shielded by rated surfaces.", Icon: Shield, x: "70%", y: "55%", align: "right" },
  { title: "Safe Egress Floor", detail: "Floor finishes support movement during an incident.", Icon: Flame, x: "38%", y: "77%" },
];

export function RoomBuiltToProtectChapter({ chapter }: { chapter: Chapter }) {
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
            <h1 className="mt-[4.8cqh] text-[clamp(1.85rem,2.62cqw,3.6rem)] font-bold leading-[1.2] tracking-normal text-slate-950 md:text-[3cqw]">
              <span className="block">The Room</span>
              <span className="block">Is Built to</span>
              <span className="block text-red-600">Protect.</span>
            </h1>
            <div className="mt-[1.1cqh] h-[2px] w-[3rem] bg-control-warm" />
            <p className="mt-[1.15cqh] text-[clamp(0.76rem,0.92cqw,1.08rem)] font-medium leading-[1.42] text-slate-900 md:text-[0.84cqw]">
              Fire safety is designed into every surface-helping protect people, assets and operations when it matters most.
            </p>
          </div>

          <section className="rounded-[0.42rem] border border-slate-200/86 bg-white p-[0.9cqw] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-full border border-red-100 bg-white text-red-600">
                <Shield aria-hidden="true" size={31} strokeWidth={1.55} />
              </span>
              <p className="text-[clamp(0.76rem,0.9cqw,1.05rem)] font-semibold leading-[1.45] text-slate-900">
                Integrated fire protection.
                <span className="block font-semibold text-red-600">Built in. Not added on.</span>
              </p>
            </div>
          </section>
        </aside>

        <main className="grid min-h-0 grid-rows-[auto_minmax(0,41cqh)] overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <section className="px-[1.15cqw] pb-[0.12cqh] pt-[3.62cqh]">
            <h2 className="text-[clamp(1rem,1.18cqw,1.36rem)] font-semibold uppercase leading-tight text-control-text">
              Engineered for Fire Safety. Built for Continuity.
            </h2>
            <div className="mt-[3.38cqh] grid grid-cols-4 divide-x divide-slate-200/90">
              {safetyPrinciples.map((item) => (
                <div className="grid grid-cols-[3.75rem_minmax(0,1fr)] items-start gap-[0.72cqw] px-[0.78cqw] first:pl-0 last:pr-0" key={item.title}>
                  <span className="grid size-14 place-items-center rounded-full border border-red-100 bg-white text-red-600">
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
              <img alt="Fire-protected control room with fire-rated ceiling, wall, compartmentation and flooring callouts" className="h-full w-full object-cover object-center" draggable={false} src="/assets/generated/rooms/room-built-to-protect-fire.png" />
              {roomHotspots.map((hotspot) => (
                <RoomHotspotMarker hotspot={hotspot} key={hotspot.title} />
              ))}
            </div>
          </section>
        </main>

        <aside className="grid min-h-0">
          <section className="overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white px-[1.25cqw] py-[1.3cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
            <h2 className="text-[clamp(0.9rem,1.05cqw,1.18rem)] font-semibold uppercase leading-tight text-control-text">
              Fire Safety Performance
            </h2>
            <div className="mb-[1.8cqh] mt-[1.8cqh] h-[2px] w-[2.5rem] bg-control-warm" />
            <div className="mt-[0.85cqh] grid gap-[1.65cqh]">
              {firePerformance.map((metric) => (
                <PerformanceMetric metric={metric} key={metric.value} />
              ))}
            </div>
          </section>
        </aside>
      </motion.div>

      <motion.div animate={{ opacity: 1, y: 0 }} className="grid grid-cols-[minmax(0,1fr)_minmax(18rem,0.32fr)] gap-[1.05cqw]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
        <section className="overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white px-[1.05cqw] pb-[0.75cqh] pt-[1.05cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <h2 className="text-[clamp(0.96rem,1.1cqw,1.28rem)] font-semibold uppercase leading-tight text-control-text">
            Fire-Safe Surfaces. Reliable by Design.
          </h2>
          <div className="mt-[0.55cqh] h-[2px] w-[2.5rem] bg-control-warm" />
          <div className="mt-[1.55cqh] grid grid-cols-3 gap-[0.78cqw]">
            {fireSurfaces.map((item) => (
              <SurfaceCard item={item} key={item.title} />
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white px-[1.05cqw] pb-[0.75cqh] pt-[1.05cqh] shadow-[0_0.7rem_1.8rem_rgb(15_23_42/0.045)]">
          <h2 className="text-[clamp(0.98rem,1.12cqw,1.3rem)] font-semibold uppercase leading-tight text-control-text">
            Operator Confidence
          </h2>
          <div className="mt-[0.55cqh] h-[2px] w-[2.5rem] bg-control-warm" />
          <div className="mt-[3.05cqh] grid grid-cols-4 gap-[0.6cqw]">
            {confidenceItems.map((item) => (
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
    <article className="grid grid-cols-[3.55rem_minmax(0,1fr)] items-center gap-[0.68cqw] border-b border-slate-200/86 pb-[0.72cqh] last:border-b-0 last:pb-0">
      <span className="grid size-14 place-items-center rounded-full border border-red-100 bg-white text-red-600">
        <metric.Icon aria-hidden="true" size={30} strokeWidth={1.45} />
      </span>
      <span className="min-w-0">
        <strong className="block break-words text-[clamp(0.92rem,1.12cqw,1.32rem)] font-semibold leading-[1.05] text-red-600">{metric.value}</strong>
        <span className="mt-[0.28cqh] block text-[clamp(0.56rem,0.65cqw,0.76rem)] font-semibold leading-tight text-control-text">{metric.label}</span>
        <span className="mt-[0.14cqh] block text-[clamp(0.49rem,0.56cqw,0.66rem)] font-medium leading-[1.16] text-slate-800">({metric.detail})</span>
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
    ceiling: "/assets/products/room-systems/fire-rated-ceiling-systems.png",
    wall: "/assets/products/room-systems/fire-rated-wall-systems.png",
    floor: "/assets/products/room-systems/fire-rated-flooring-systems.png",
  };

  return (
    <div className="grid h-full place-items-center overflow-hidden rounded-[0.28rem] bg-white p-[0.12rem]">
      <img alt={`${type} fire-rated system detail`} className="h-full w-full object-contain" draggable={false} src={systemImages[type]} />
    </div>
  );
}
