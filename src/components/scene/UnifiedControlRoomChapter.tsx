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

type BuildingBlock = {
  title: string;
  detail: string;
  variant: "profile" | "panel" | "glass" | "door" | "connector";
};

type StepItem = {
  title: string;
  detail: string;
  variant: "structure" | "modules" | "lock" | "complete";
};

type LayoutItem = {
  title: string;
  shape: "linear" | "curved" | "corner" | "freeform";
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
  { title: "Vertical Profiles", detail: "Strong, slim and precise aluminium profiles.", variant: "profile" },
  { title: "Infill Panels", detail: "Acoustic, fire-rated or glazed infill options.", variant: "panel" },
  { title: "Glazing Modules", detail: "Single, double or integrated blinds.", variant: "glass" },
  { title: "Doors & Frames", detail: "Standardized doors for every requirement.", variant: "door" },
  { title: "Connectors & Accessories", detail: "Intelligent connectors for seamless integration.", variant: "connector" },
];

const connectSteps: StepItem[] = [
  { title: "Set the Structure", detail: "Install vertical profiles on floor and ceiling.", variant: "structure" },
  { title: "Add the Modules", detail: "Drop in panels, glazing or doors.", variant: "modules" },
  { title: "Lock & Secure", detail: "Connect and lock modules in place.", variant: "lock" },
  { title: "Complete & Adapt", detail: "Add accessories. Ready to perform.", variant: "complete" },
];

const layoutItems: LayoutItem[] = [
  { title: "Linear Layout", shape: "linear" },
  { title: "Curved Layout", shape: "curved" },
  { title: "Corner Layout", shape: "corner" },
  { title: "Freeform Layout", shape: "freeform" },
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
  const roomAsset = getAsset("ambient-control-room");

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef5ff_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute left-[2vw] top-[15vh] h-[50vh] w-[42vw] opacity-[0.045] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="pointer-events-none absolute right-[8vw] top-[11vh] h-[32vh] w-[38vw] rounded-full bg-blue-500/8 blur-[80px]" />

      <section className="absolute inset-x-[1.9vw] top-[10.2vh] bottom-[7.05vh] z-10">
        <div className="grid h-[34.6vh] grid-cols-[minmax(24rem,0.31fr)_minmax(0,1fr)_minmax(19rem,0.3fr)] gap-[1vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="min-h-0 pt-[1.2vh]" initial={false} transition={{ duration: 0.72, ease }}>
            <h1 className="text-[clamp(1.95rem,2.55vw,3.55rem)] font-black uppercase leading-[1.02] tracking-normal text-slate-950">
              <span className="block">Designed Like Lego.</span>
              <span className="block text-blue-600">Built for Control.</span>
            </h1>
            <div className="mt-[1.1vh] h-[2px] w-[3rem] bg-control-warm" />
            <p className="mt-[1vh] text-[clamp(0.74rem,0.9vw,1.08rem)] font-black uppercase leading-[1.12] tracking-[0.04em] text-blue-600">
              Modular partitions that adapt, evolve and last.
            </p>
            <p className="mt-[0.85vh] max-w-[34rem] text-[clamp(0.62rem,0.75vw,0.9rem)] font-medium leading-[1.34] text-slate-800">
              Our partition and panelling systems use a lego-type modular philosophy, standardized building blocks that connect seamlessly to create any layout, at any scale, with ease.
            </p>
          </motion.aside>

          <motion.section animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/76 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)]" initial={false} transition={{ duration: 0.72, delay: 0.06, ease }}>
            {roomAsset?.src ? (
              <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" draggable={false} src={roomAsset.src} />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.34),transparent_24%,transparent_76%,rgb(255_255_255/0.26))]" />
            <div className="absolute inset-x-[8%] top-[8%] h-[2px] rounded-full bg-blue-500 shadow-[0_0_18px_rgb(37_99_235/0.75)]" />
            <div className="absolute inset-y-[12%] left-[18%] w-px bg-blue-500/55 shadow-[0_0_16px_rgb(37_99_235/0.5)]" />
            <div className="absolute inset-y-[12%] right-[18%] w-px bg-blue-500/45 shadow-[0_0_16px_rgb(37_99_235/0.45)]" />
          </motion.section>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="rounded-[0.9rem] border border-slate-200/86 bg-white/76 p-[1.05vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.12, ease }}>
            <h2 className="text-[clamp(0.82rem,1vw,1.18rem)] font-black uppercase leading-tight text-control-text">The Lego Principle</h2>
            <p className="mt-[0.25vh] text-[clamp(0.62rem,0.74vw,0.86rem)] font-bold uppercase tracking-[0.02em] text-slate-700">
              Standard modules. Infinite possibilities.
            </p>
            <div className="mt-[0.75vh] h-[2px] w-[2.6rem] bg-control-warm" />
            <div className="mt-[1.1vh] grid grid-cols-2 gap-[0.65vw]">
              {legoPrinciples.map((item) => (
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-[0.48vw] rounded-[0.58rem] bg-white/62 p-[0.48vw]" key={item.title}>
                  <item.Icon aria-hidden="true" className="text-blue-600" size={26} strokeWidth={1.55} />
                  <span>
                    <p className="text-[clamp(0.5rem,0.6vw,0.72rem)] font-black uppercase leading-tight text-control-text">{item.title}</p>
                    <p className="mt-[0.2vh] text-[clamp(0.42rem,0.5vw,0.6rem)] font-medium leading-[1.14] text-slate-600">{item.detail}</p>
                  </span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="mt-[1.15vh] grid h-[10.6vh] grid-cols-6 overflow-hidden rounded-[0.75rem] bg-[#062f56] text-white shadow-[0_1rem_2.4rem_rgb(15_23_42/0.13)]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          {capabilityStrip.map((item) => (
            <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-[0.58vw] border-r border-white/20 px-[0.75vw] last:border-r-0" key={item.title}>
              <item.Icon aria-hidden="true" className="text-blue-300" size={30} strokeWidth={1.5} />
              <span>
                <strong className="block text-[clamp(0.52rem,0.62vw,0.74rem)] font-black uppercase leading-tight">{item.title}</strong>
                <span className="mt-[0.22vh] block text-[clamp(0.42rem,0.5vw,0.6rem)] font-semibold leading-[1.12] text-blue-50/92">{item.detail}</span>
              </span>
            </div>
          ))}
        </motion.section>

        <motion.section animate={{ opacity: 1, y: 0 }} className="mt-[1.05vh] grid h-[26.6vh] grid-cols-[0.23fr_0.19fr_0.24fr_0.19fr_0.15fr] gap-[0.85vw]" initial={false} transition={{ duration: 0.72, delay: 0.24, ease }}>
          <InfoPanel title="The Modular Building Blocks">
            <div className="grid gap-[0.34vh]">
              {buildingBlocks.map((item) => (
                <div className="grid grid-cols-[3.6rem_minmax(0,1fr)] items-center gap-[0.55vw] border-b border-slate-200/80 pb-[0.28vh] last:border-b-0 last:pb-0" key={item.title}>
                  <ModuleGraphic variant={item.variant} />
                  <span>
                    <strong className="block text-[clamp(0.46rem,0.55vw,0.66rem)] font-black uppercase leading-tight text-control-text">{item.title}</strong>
                    <span className="mt-[0.12vh] block text-[clamp(0.37rem,0.44vw,0.53rem)] font-medium leading-[1.1] text-slate-600">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="How It Connects">
            <div className="grid gap-[0.62vh]">
              {connectSteps.map((item, index) => (
                <div className="grid grid-cols-[1.35rem_minmax(0,1fr)_3.8rem] items-center gap-[0.45vw] border-b border-slate-200/80 pb-[0.5vh] last:border-b-0 last:pb-0" key={item.title}>
                  <span className="grid size-5 place-items-center rounded-full bg-blue-600 text-[0.62rem] font-black text-white">{index + 1}</span>
                  <span>
                    <strong className="block text-[clamp(0.43rem,0.52vw,0.62rem)] font-black leading-tight text-control-text">{item.title}</strong>
                    <span className="mt-[0.16vh] block text-[clamp(0.36rem,0.44vw,0.53rem)] font-medium leading-[1.15] text-slate-600">{item.detail}</span>
                  </span>
                  <ModuleGraphic variant={item.variant} compact />
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="One System. Many Layouts.">
            <div className="grid grid-cols-2 gap-[0.65vw]">
              {layoutItems.map((item) => (
                <div className="rounded-[0.55rem] border border-slate-200/80 bg-white/74 p-[0.45vw] text-center" key={item.title}>
                  <LayoutGraphic shape={item.shape} />
                  <p className="mt-[0.35vh] text-[clamp(0.45rem,0.54vw,0.64rem)] font-black uppercase leading-tight text-control-text">{item.title}</p>
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="Adapt. Expand. Reconfigure.">
            <p className="text-[clamp(0.44rem,0.52vw,0.62rem)] font-semibold leading-tight text-slate-700">Built to change as your needs evolve.</p>
            <div className="mt-[0.8vh] grid gap-[0.75vh]">
              {[
                ["Initial Setup", "Start with what you need."],
                ["Expand", "Add modules easily."],
                ["Reconfigure", "Change layouts without rebuild."],
              ].map(([title, detail], index) => (
                <div className="grid grid-cols-[minmax(0,1fr)_4.8rem] items-center gap-[0.55vw]" key={title}>
                  <span>
                    <strong className="block text-[clamp(0.45rem,0.54vw,0.64rem)] font-black uppercase leading-tight text-control-text">{title}</strong>
                    <span className="mt-[0.15vh] block text-[clamp(0.37rem,0.45vw,0.54rem)] font-medium leading-tight text-slate-600">{detail}</span>
                  </span>
                  <RoomBlock level={index} />
                </div>
              ))}
            </div>
          </InfoPanel>

          <InfoPanel title="Why It Matters">
            <div className="grid gap-[0.8vh]">
              {whyItMatters.map((item) => (
                <div className="grid grid-cols-[2.6rem_minmax(0,1fr)] items-center gap-[0.55vw]" key={item.title}>
                  <span className="grid size-10 place-items-center rounded-full border border-blue-200 bg-blue-50 text-blue-600">
                    <item.Icon aria-hidden="true" size={22} strokeWidth={1.55} />
                  </span>
                  <span>
                    <strong className="block text-[clamp(0.45rem,0.54vw,0.64rem)] font-black uppercase leading-tight text-control-text">{item.title}</strong>
                    <span className="mt-[0.16vh] block text-[clamp(0.37rem,0.45vw,0.54rem)] font-medium leading-[1.14] text-slate-600">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </InfoPanel>
        </motion.section>

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

function InfoPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-h-0 rounded-[0.72rem] border border-slate-200/86 bg-white/76 p-[0.72vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.2rem_rgb(15_23_42/0.06)] backdrop-blur-[22px]">
      <h2 className="text-[clamp(0.62rem,0.74vw,0.88rem)] font-black uppercase leading-tight text-control-text">{title}</h2>
      <div className="mt-[0.48vh] h-[2px] w-[2.25rem] bg-control-warm" />
      <div className="mt-[0.65vh]">{children}</div>
    </section>
  );
}

function ModuleGraphic({ variant, compact = false }: { variant: BuildingBlock["variant"] | StepItem["variant"]; compact?: boolean }) {
  const size = compact ? "h-8" : "h-9";
  if (variant === "profile" || variant === "structure") {
    return <div className={`${size} flex items-center justify-center gap-2 rounded bg-slate-50`}><span className="h-6 w-1.5 rounded bg-slate-900" /><span className="h-6 w-1.5 rounded bg-slate-500" /></div>;
  }
  if (variant === "panel" || variant === "modules") {
    return <div className={`${size} flex items-center justify-center gap-1 rounded bg-slate-50`}><span className="h-6 w-3.5 rounded-sm bg-slate-200" /><span className="h-6 w-3.5 rounded-sm bg-stone-300" /><span className="h-6 w-3.5 rounded-sm bg-slate-700" /></div>;
  }
  if (variant === "glass" || variant === "lock") {
    return <div className={`${size} flex items-center justify-center gap-1 rounded bg-slate-50`}><span className="h-7 w-4 rounded-sm border border-slate-500 bg-blue-100/70" /><span className="h-7 w-1.5 rounded bg-slate-800" /><span className="h-7 w-4 rounded-sm border border-slate-500 bg-blue-100/70" /></div>;
  }
  if (variant === "door" || variant === "complete") {
    return <div className={`${size} flex items-end justify-center gap-1 rounded bg-slate-50`}><span className="h-7 w-3.5 rounded-t-sm border border-slate-500 bg-white" /><span className="h-7 w-3.5 rounded-t-sm border border-slate-500 bg-blue-50" /><span className="h-7 w-3.5 rounded-t-sm border border-slate-500 bg-white" /></div>;
  }
  return <div className={`${size} grid grid-cols-3 place-items-center rounded bg-slate-50 p-1.5`}><span className="size-3 rounded bg-slate-700" /><span className="size-3 rounded bg-slate-300" /><span className="size-3 rounded bg-blue-500" /></div>;
}

function LayoutGraphic({ shape }: { shape: LayoutItem["shape"] }) {
  const common = "absolute border-2 border-slate-800 bg-blue-100/55";
  return (
    <div className="relative h-[7.2vh] overflow-hidden rounded-[0.45rem] bg-[linear-gradient(135deg,#f8fafc,#e8f1ff)]">
      {shape === "linear" ? <span className={`${common} left-[12%] top-[34%] h-[24%] w-[76%] rounded-sm`} /> : null}
      {shape === "curved" ? <span className={`${common} left-[17%] top-[18%] h-[70%] w-[66%] rounded-full`} /> : null}
      {shape === "corner" ? <><span className={`${common} left-[18%] top-[22%] h-[58%] w-[22%]`} /><span className={`${common} left-[18%] top-[58%] h-[22%] w-[62%]`} /></> : null}
      {shape === "freeform" ? <><span className={`${common} left-[14%] top-[26%] h-[22%] w-[42%] rotate-[-8deg]`} /><span className={`${common} left-[45%] top-[42%] h-[22%] w-[40%] rotate-[8deg]`} /><span className={`${common} left-[20%] top-[60%] h-[18%] w-[34%] rotate-[12deg]`} /></> : null}
      <span className="absolute bottom-[12%] left-[42%] size-3 rounded-full bg-blue-600" />
    </div>
  );
}

function RoomBlock({ level }: { level: number }) {
  return (
    <div className="relative h-11 rounded-[0.4rem] bg-slate-50">
      <span className="absolute left-[20%] top-[28%] h-[45%] w-[56%] -skew-x-12 rounded border border-slate-300 bg-white shadow-sm" />
      <span className="absolute left-[28%] top-[38%] h-[18%] w-[24%] -skew-x-12 rounded bg-blue-100" />
      <span className="absolute left-[54%] top-[36%] h-[20%] w-[16%] -skew-x-12 rounded bg-slate-300" />
      {level > 0 ? <span className="absolute left-[18%] top-[16%] h-[50%] w-[68%] -skew-x-12 rounded border border-blue-300 bg-blue-100/30" /> : null}
      {level > 1 ? <span className="absolute left-[10%] top-[26%] h-[44%] w-[78%] rotate-[-5deg] rounded border border-blue-500/60" /> : null}
    </div>
  );
}
