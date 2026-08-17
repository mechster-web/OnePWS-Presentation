import { motion } from "framer-motion";
import {
  Box,
  ChevronLeft,
  ChevronRight,
  Clock3,
  DollarSign,
  Expand,
  Headphones,
  Layers3,
  Leaf,
  Map,
  Maximize2,
  PanelTop,
  Puzzle,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
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

type BuildingBlock = {
  title: string;
  detail: string;
  image: string;
};

type StepItem = {
  title: string;
  detail: string;
  image: string;
};

type LayoutItem = {
  title: string;
  image: string;
};

type AdaptItem = {
  title: string;
  detail: string;
  image: string;
};

const legoPrinciples: SimpleItem[] = [
  { title: "Standardize", detail: "Fewer parts. Smarter inventory.", Icon: Box },
  { title: "Connect", detail: "Tool-less or minimal tools installation.", Icon: Puzzle },
  { title: "Combine", detail: "Endless layouts and configurations.", Icon: Maximize2 },
  { title: "Evolve", detail: "Modify, expand or reconfigure anytime.", Icon: RefreshCw },
];

const capabilityStrip: SimpleItem[] = [
  { title: "Any Shape", detail: "Linear, curved or freeform layouts.", Icon: Puzzle },
  { title: "Any Scale", detail: "From small rooms to enterprise control centers.", Icon: Box },
  { title: "Fast to Build", detail: "Pre-engineered for faster installation and handover.", Icon: Clock3 },
  { title: "Easy to Change", detail: "Rearrange, expand or reconfigure with minimal downtime.", Icon: SlidersHorizontal },
  { title: "Robust & Reliable", detail: "Engineered for acoustic, fire, seismic and mechanical performance.", Icon: ShieldCheck },
  { title: "Sustainable Choice", detail: "Reusable components. Lower waste. Longer life cycle.", Icon: Leaf },
];

const buildingBlocks: BuildingBlock[] = [
  { title: "Vertical Profiles", detail: "Strong, slim and precise aluminium profiles.", image: "/assets/products/unified-control-room/vertical-aluminum-profiles.png" },
  { title: "Infill Panels", detail: "Acoustic, fire-rated or glazed infill options.", image: "/assets/products/unified-control-room/infill-panel-profiles.png" },
  { title: "Glazing Modules", detail: "Single, double or integrated blinds.", image: "/assets/products/unified-control-room/glazing-module-assembly.png" },
  { title: "Doors & Frames", detail: "Standardized doors for every requirement.", image: "/assets/products/unified-control-room/door-and-frame-system.png" },
  { title: "Connectors & Accessories", detail: "Intelligent connectors for seamless integration.", image: "/assets/products/unified-control-room/connector-hardware.png" },
];

const connectSteps: StepItem[] = [
  { title: "Set the Structure", detail: "Install vertical profiles on floor and ceiling.", image: "/assets/products/unified-control-room/structural-posts.png" },
  { title: "Add the Modules", detail: "Drop in panels, glazing or doors.", image: "/assets/products/unified-control-room/module-post-assembly.png" },
  { title: "Lock & Secure", detail: "Connect and lock modules in place.", image: "/assets/products/unified-control-room/locking-connectors.png" },
  { title: "Complete & Adapt", detail: "Add accessories. Ready to perform.", image: "/assets/products/unified-control-room/complete-frame-system.png" },
];

const layoutItems: LayoutItem[] = [
  { title: "Linear Layout", image: "/assets/products/unified-control-room/linear-glass-control-room.png" },
  { title: "Curved Layout", image: "/assets/products/unified-control-room/curved-glass-control-room.png" },
  { title: "Corner Layout", image: "/assets/products/unified-control-room/corner-glass-control-room.png" },
  { title: "Freeform Layout", image: "/assets/products/unified-control-room/freeform-glass-control-room.png" },
];

const adaptItems: AdaptItem[] = [
  { title: "Initial Setup", detail: "Start with what you need.", image: "/assets/products/unified-control-room/initial-room-isometric.png" },
  { title: "Expand", detail: "Add modules easily.", image: "/assets/products/unified-control-room/expand-room-isometric.png" },
  { title: "Reconfigure", detail: "Change layouts without rebuild.", image: "/assets/products/unified-control-room/reconfigured-room-isometric.png" },
];

const whyItMatters: SimpleItem[] = [
  { title: "Reduced Time to Deploy", detail: "Up to 50% faster installation.", Icon: Clock3 },
  { title: "Lower Total Cost of Ownership", detail: "Less waste. Reuse and reconfigure.", Icon: DollarSign },
  { title: "Certified Performance", detail: "Acoustic, fire, seismic and durability certified.", Icon: ShieldCheck },
  { title: "Future Ready", detail: "Your room evolves, your system adapts.", Icon: Leaf },
];

export function UnifiedControlRoomChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#f8fafc_55%,#eef5fb_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute left-[2cqw] top-[15cqh] h-[50cqh] w-[42cqw] opacity-[0.045] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px]" />

      <section className="absolute inset-x-[1.9cqw] top-[10.2cqh] bottom-[7.05cqh] z-10">
        <div className="grid h-[34.6cqh] grid-cols-[minmax(0,0.31fr)_minmax(0,0.44fr)_minmax(0,0.25fr)] gap-[1cqw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="min-h-0 pt-[1.2cqh]" initial={false} transition={{ duration: 0.72, ease }}>
            <h1 className="text-[clamp(1.95rem,2.55cqw,3.55rem)] font-bold uppercase leading-[1.02] tracking-normal text-slate-950 md:text-[2.5cqw]">
              <span className="block">Designed Like Lego.</span>
              <span className="block text-[#0872c9]">Built for Control.</span>
            </h1>
            <div className="mt-[1.1cqh] h-[2px] w-[3rem] bg-[#0872c9]" />
            <p className="mt-[1cqh] text-[clamp(0.74rem,0.9cqw,1.08rem)] font-semibold uppercase leading-[1.12] tracking-[0.04em] text-[#0872c9] md:text-[0.8cqw]">
              Modular partitions that adapt, evolve and last.
            </p>
            <p className="mt-[0.85cqh] max-w-[34rem] text-[clamp(0.62rem,0.75cqw,0.9rem)] font-medium leading-[1.34] text-slate-800">
              Our partition and panelling systems use a lego-type modular philosophy, standardized building blocks that connect seamlessly to create any layout, at any scale, with ease.
            </p>
          </motion.aside>

          <motion.section animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[0.42rem] border border-slate-200/86 bg-white shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)]" initial={false} transition={{ duration: 0.72, delay: 0.06, ease }}>
            <img
              alt="Unified modular glass control-room system"
              className="absolute inset-0 h-full w-full object-cover object-center"
              draggable={false}
              src="/assets/products/unified-control-room/unified-control-room-hero.png"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.02),transparent_72%,rgb(3_30_57/0.16))]" />
          </motion.section>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="rounded-[0.42rem] border border-slate-200/86 bg-white/84 p-[1.05cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[20px]" initial={false} transition={{ duration: 0.72, delay: 0.12, ease }}>
            <h2 className="text-[clamp(0.82rem,1cqw,1.18rem)] font-semibold uppercase leading-tight text-control-text">The Lego Principle</h2>
            <p className="mt-[0.25cqh] text-[clamp(0.62rem,0.74cqw,0.86rem)] font-bold uppercase tracking-[0.02em] text-slate-700">
              Standard modules. Infinite possibilities.
            </p>
            <div className="mt-[0.75cqh] h-[2px] w-[2.6rem] bg-[#0872c9]" />
            <div className="mt-[1.25cqh] grid grid-cols-4 divide-x divide-slate-200/90">
              {legoPrinciples.map((item) => (
                <div className="grid min-w-0 justify-items-center px-[0.42cqw] text-center first:pl-0 last:pr-0" key={item.title}>
                  <item.Icon aria-hidden="true" className="text-[#0872c9]" size={29} strokeWidth={1.55} />
                  <p className="mt-[0.62cqh] text-[clamp(0.42rem,0.5cqw,0.6rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</p>
                  <p className="mt-[0.3cqh] text-[clamp(0.35rem,0.42cqw,0.5rem)] font-medium leading-[1.16] text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="mt-[1.15cqh] grid h-[10.6cqh] grid-cols-6 overflow-hidden rounded-[0.35rem] bg-[#07345f] text-white shadow-[0_1rem_2.4rem_rgb(15_23_42/0.13)]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          {capabilityStrip.map((item) => (
            <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-[0.58cqw] border-r border-white/20 px-[0.75cqw] last:border-r-0" key={item.title}>
              <item.Icon aria-hidden="true" className="text-sky-300" size={30} strokeWidth={1.5} />
              <span>
                <strong className="block text-[clamp(0.52rem,0.62cqw,0.74rem)] font-semibold uppercase leading-tight">{item.title}</strong>
                <span className="mt-[0.22cqh] block text-[clamp(0.42rem,0.5cqw,0.6rem)] font-semibold leading-[1.12] text-sky-50/90">{item.detail}</span>
              </span>
            </div>
          ))}
        </motion.section>

        <motion.section animate={{ opacity: 1, y: 0 }} className="mt-[1.05cqh] grid h-[31.2cqh] grid-cols-[0.23fr_0.19fr_0.24fr_0.19fr_0.15fr] gap-[0.85cqw]" initial={false} transition={{ duration: 0.72, delay: 0.24, ease }}>
          <InfoPanel title="The Modular Building Blocks">
            <div className="grid gap-[0.34cqh]">
              {buildingBlocks.map((item) => (
                <div className="grid grid-cols-[4.35rem_minmax(0,1fr)] items-center gap-[0.55cqw] border-b border-slate-200/80 pb-[0.42cqh] last:border-b-0 last:pb-0" key={item.title}>
                  <AssetThumbnail alt={item.title} src={item.image} />
                  <span>
                    <strong className="block text-[clamp(0.52rem,0.61cqw,0.72rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</strong>
                    <span className="mt-[0.16cqh] block text-[clamp(0.42rem,0.49cqw,0.58rem)] font-medium leading-[1.14] text-slate-600">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="How It Connects">
            <div className="grid gap-[0.82cqh]">
              {connectSteps.map((item, index) => (
                <div className="grid grid-cols-[1.55rem_minmax(0,1fr)_4.5rem] items-center gap-[0.45cqw] border-b border-slate-200/80 pb-[0.62cqh] last:border-b-0 last:pb-0" key={item.title}>
                  <span className="grid size-6 place-items-center rounded-full bg-control-warm text-[0.68rem] font-semibold text-white">{index + 1}</span>
                  <span>
                    <strong className="block text-[clamp(0.49rem,0.58cqw,0.68rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
                    <span className="mt-[0.18cqh] block text-[clamp(0.41rem,0.49cqw,0.58rem)] font-medium leading-[1.16] text-slate-600">{item.detail}</span>
                  </span>
                  <AssetThumbnail alt={item.title} compact src={item.image} />
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="One System. Many Layouts.">
            <div className="grid grid-cols-2 gap-[0.65cqw]">
              {layoutItems.map((item) => (
                <div className="overflow-hidden rounded-[0.3rem] border border-slate-200/80 bg-white/86 p-[0.34cqw] text-center shadow-[0_0.45rem_1rem_rgb(15_23_42/0.06)]" key={item.title}>
                  <img alt={item.title} className="h-[8.8cqh] w-full rounded-[0.2rem] object-cover object-center" draggable={false} src={item.image} />
                  <p className="mt-[0.42cqh] text-[clamp(0.5rem,0.6cqw,0.7rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</p>
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="Adapt. Expand. Reconfigure.">
            <p className="text-[clamp(0.5rem,0.59cqw,0.69rem)] font-semibold leading-tight text-slate-700">Built to change as your needs evolve.</p>
            <div className="mt-[1cqh] grid gap-[1cqh]">
              {adaptItems.map((item) => (
                <div className="grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-[0.55cqw]" key={item.title}>
                  <span>
                    <strong className="block text-[clamp(0.51rem,0.6cqw,0.7rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</strong>
                    <span className="mt-[0.18cqh] block text-[clamp(0.42rem,0.5cqw,0.59rem)] font-medium leading-tight text-slate-600">{item.detail}</span>
                  </span>
                  <img alt={item.title} className="h-14 w-full rounded-[0.24rem] border border-slate-200/80 bg-white object-cover object-center" draggable={false} src={item.image} />
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="Why It Matters">
            <div className="grid gap-[1.05cqh]">
              {whyItMatters.map((item) => (
                <div className="grid grid-cols-[2.9rem_minmax(0,1fr)] items-center gap-[0.55cqw]" key={item.title}>
                  <span className="grid size-11 place-items-center rounded-full border border-sky-200 bg-sky-50 text-[#0872c9]">
                    <item.Icon aria-hidden="true" size={24} strokeWidth={1.55} />
                  </span>
                  <span>
                    <strong className="block text-[clamp(0.51rem,0.6cqw,0.7rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</strong>
                    <span className="mt-[0.18cqh] block text-[clamp(0.42rem,0.5cqw,0.59rem)] font-medium leading-[1.16] text-slate-600">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </InfoPanel>
        </motion.section>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.42, ease }}>
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

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-h-0 overflow-hidden rounded-[0.35rem] border border-slate-200/86 bg-white/84 p-[0.78cqw] shadow-[inset_0_1px_0_rgb(255_255_255/0.94),0_1rem_2.2rem_rgb(15_23_42/0.07)] backdrop-blur-[18px]">
      <h2 className="text-[clamp(0.7rem,0.82cqw,0.96rem)] font-semibold uppercase leading-tight text-control-text">{title}</h2>
      <div className="mt-[0.48cqh] h-[2px] w-[2.25rem] bg-[#0872c9]" />
      <div className="mt-[0.65cqh]">{children}</div>
    </section>
  );
}

function AssetThumbnail({ alt, compact = false, src }: { alt: string; compact?: boolean; src: string }) {
  return (
    <div className={`${compact ? "h-11" : "h-12"} overflow-hidden rounded-[0.22rem] border border-slate-200/80 bg-white`}>
      <img alt={alt} className="h-full w-full object-cover object-center" draggable={false} src={src} />
    </div>
  );
}


