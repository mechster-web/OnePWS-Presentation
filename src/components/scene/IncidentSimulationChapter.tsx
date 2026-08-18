import { motion } from "framer-motion";
import { Fragment } from "react";
import {
  AudioWaveform,
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Expand,
  Headphones,
  LayoutDashboard,
  Lightbulb,
  Map,
  MonitorCheck,
  Quote,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  TriangleAlert,
  Users,
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

const responseFlow: SimpleItem[] = [
  { title: "Event Detected", detail: "Systems identify an event in real-time.", Icon: Bell },
  { title: "Information Prioritized", detail: "Critical data surfaces automatically.", Icon: MonitorCheck },
  { title: "Environment Adapts", detail: "Lighting, displays, acoustics and systems adjust.", Icon: SlidersHorizontal },
  { title: "Operator Acts", detail: "Faster decisions. Better outcomes.", Icon: CheckCircle2 },
];

const criticalMoments: SimpleItem[] = [
  { title: "Auto-Layout", detail: "Displays reorganize to highlight critical information instantly.", Icon: LayoutDashboard },
  { title: "Smart Lighting", detail: "Adjusts brightness and contrast to reduce eye strain and improve situational awareness.", Icon: Lightbulb },
  { title: "Acoustic Focus", detail: "Noise levels adapt to the situation to support clear communication.", Icon: AudioWaveform },
  { title: "Ergonomic Adaptation", detail: "Consoles and seating adjust to support performance under pressure.", Icon: Settings },
  { title: "Mission Mode", detail: "One touch activates predefined operational states across the entire room.", Icon: Target },
  { title: "Fail-Safe Design", detail: "Redundant systems ensure uninterrupted operations when it matters most.", Icon: ShieldCheck },
];

const bottomBenefits: SimpleItem[] = [
  { title: "Instant Response", detail: "Systems react in real-time to changing situations.", Icon: Target },
  { title: "Minimize Distraction", detail: "Critical information delivered, noise reduced.", Icon: ShieldCheck },
  { title: "Continuous Reliability", detail: "Designed for 24/7 uptime in mission-critical environments.", Icon: Clock3 },
  { title: "Team Synchronization", detail: "Everyone aligned, informed and ready to act-together.", Icon: Users },
];

const cardShell =
  "overflow-hidden rounded-[0.55rem] border border-slate-200/80 bg-white shadow-[0_0.7rem_1.9rem_rgb(15_23_42/0.05)]";

export function IncidentSimulationChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const operationsCentre = getAsset("incident-response-operations-center");
  const speedVisual = getAsset("incident-response-speed");
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="grid h-full w-full grid-rows-[minmax(0,1fr)_auto] gap-[1.1cqh] overflow-hidden bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_62%,#fff1f3_100%)] px-[1.55cqw] pb-[1.2cqh] pt-[8.9cqh] text-control-text">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="grid min-h-0 grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] gap-[1.05cqw]"
        initial={false}
        transition={{ duration: 0.72, ease }}
      >
        <section className="grid min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-[1.05cqh]">
          <div className={`relative min-h-0 ${cardShell}`}>
            {operationsCentre?.src ? (
              <img
                alt={operationsCentre.alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
                draggable={false}
                src={operationsCentre.src}
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(122%_92%_at_0%_0%,#ffffff_0%,#ffffff_30%,rgba(255,255,255,0.90)_42%,rgba(255,255,255,0.42)_58%,rgba(255,255,255,0)_76%)]" />

            <div className="relative z-10 max-w-[57%] px-[2.35cqw] pt-[2.6cqh]">
              <h1 className="text-[clamp(2.25rem,3.25cqw,4.55rem)] font-bold leading-[1.08] tracking-normal text-slate-950">
                <span className="block">When Every</span>
                <span className="block">Second <span className="text-red-600">Matters.</span></span>
              </h1>
              <div className="mt-[1.35cqh] h-[3px] w-[3rem] rounded-full bg-control-warm" />
              <p className="mt-[1.5cqh] max-w-[30rem] text-[clamp(0.86rem,1cqw,1.16rem)] font-medium leading-[1.5] text-slate-900">
                In critical moments, operators don&rsquo;t have time to search, adjust or wait. Our intelligent
                control room responds instantly&mdash;so operators can focus on what truly matters: the mission.
              </p>
            </div>

            <motion.div
              animate={state.reducedMotion ? { opacity: 1 } : { opacity: [0.82, 1, 0.82] }}
              className="absolute left-[68%] top-[46%] z-10 -translate-x-1/2 -translate-y-1/2 text-center"
              initial={false}
              transition={state.reducedMotion ? undefined : { duration: 2.4, ease: "easeInOut", repeat: Infinity }}
            >
              <TriangleAlert aria-hidden="true" className="mx-auto text-red-600" size={54} strokeWidth={1.7} />
              <p className="mt-[0.9cqh] text-[clamp(0.78rem,0.94cqw,1.12rem)] font-semibold uppercase tracking-[0.06em] text-red-600">
                Critical Alert
              </p>
              <p className="mt-[0.5cqh] text-[clamp(1.1rem,1.5cqw,1.85rem)] font-bold leading-none tabular-nums text-red-600">
                00:00:07
              </p>
            </motion.div>
          </div>

          <div className={`grid grid-cols-4 divide-x divide-slate-200/90 px-[1.15cqw] py-[1.35cqh] ${cardShell}`}>
            {bottomBenefits.map((item) => (
              <div className="grid grid-cols-[2.1rem_minmax(0,1fr)] items-start gap-[0.6cqw] px-[0.85cqw] first:pl-0 last:pr-0" key={item.title}>
                <item.Icon aria-hidden="true" className="mt-[0.1rem] text-red-600" size={30} strokeWidth={1.6} />
                <span>
                  <strong className="block text-[clamp(0.62rem,0.72cqw,0.86rem)] font-semibold leading-tight text-slate-950">{item.title}</strong>
                  <span className="mt-[0.4cqh] block text-[clamp(0.54rem,0.62cqw,0.74rem)] font-medium leading-[1.36] text-slate-700">{item.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)_auto] gap-[1.05cqh]">
          <section className={`px-[1.35cqw] py-[1.6cqh] ${cardShell}`}>
            <h2 className="text-[clamp(1.02rem,1.24cqw,1.46rem)] font-semibold leading-tight text-slate-950">
              From Event to Action &ndash; Instantly.
            </h2>
            <div className="mt-[0.75cqh] h-[3px] w-[2.5rem] rounded-full bg-control-warm" />
            <div className="mt-[1.55cqh] grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-[0.72cqw]">
              {responseFlow.map((item, index) => (
                <Fragment key={item.title}>
                  <FlowStep item={item} />
                  {index < responseFlow.length - 1 ? (
                    <ChevronRight aria-hidden="true" className="mt-[1.9rem] text-slate-400" size={20} strokeWidth={1.9} />
                  ) : null}
                </Fragment>
              ))}
            </div>
          </section>

          <section className={`min-h-0 px-[1.35cqw] py-[1.5cqh] ${cardShell}`}>
            <h2 className="text-[clamp(1rem,1.2cqw,1.4rem)] font-semibold leading-tight text-slate-950">
              Built for Critical Moments
            </h2>
            <div className="mt-[0.7cqh] h-[3px] w-[2.5rem] rounded-full bg-control-warm" />
            <div className="mt-[1.35cqh] grid grid-cols-3">
              {criticalMoments.map((item, index) => (
                <div
                  className={`grid grid-cols-[2.4rem_minmax(0,1fr)] items-start gap-[0.7cqw] px-[0.9cqw] py-[1.15cqh] ${
                    index % 3 === 0 ? "pl-0" : "border-l border-slate-200/90"
                  } ${index > 2 ? "border-t border-slate-200/90" : ""}`}
                  key={item.title}
                >
                  <item.Icon aria-hidden="true" className="mt-[0.1rem] text-red-600" size={32} strokeWidth={1.6} />
                  <span>
                    <strong className="block text-[clamp(0.62rem,0.72cqw,0.86rem)] font-semibold leading-tight text-slate-950">{item.title}</strong>
                    <span className="mt-[0.46cqh] block text-[clamp(0.54rem,0.62cqw,0.74rem)] font-medium leading-[1.42] text-slate-700">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={`grid min-h-[14cqh] grid-cols-[minmax(0,1fr)_minmax(13rem,0.34fr)] ${cardShell}`}>
            <div className="flex items-center gap-[1.05cqw] px-[1.45cqw] py-[1.3cqh]">
              <Quote aria-hidden="true" className="shrink-0 self-start text-control-warm" size={38} strokeWidth={1.55} />
              <div>
                <p className="text-[clamp(0.76rem,0.9cqw,1.04rem)] font-medium leading-[1.45] text-slate-900">
                  Technology should never slow you down.
                </p>
                <p className="mt-[0.85cqh] text-[clamp(0.78rem,0.94cqw,1.1rem)] font-semibold leading-tight text-red-600">
                  Our environment makes you faster, sharper and stronger.
                </p>
              </div>
            </div>
            <div className="relative min-h-0 overflow-hidden">
              {speedVisual?.src ? (
                <img
                  alt={speedVisual.alt}
                  className="absolute inset-0 h-full w-full object-contain object-right opacity-90"
                  draggable={false}
                  src={speedVisual.src}
                />
              ) : null}
            </div>
          </section>
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

function FlowStep({ item }: { item: SimpleItem }) {
  return (
    <div className="text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-control-warm/[0.13] text-red-600">
        <item.Icon aria-hidden="true" size={31} strokeWidth={1.55} />
      </span>
      <p className="mt-[0.8cqh] text-[clamp(0.6rem,0.7cqw,0.82rem)] font-semibold leading-tight text-slate-950">{item.title}</p>
      <p className="mx-auto mt-[0.35cqh] max-w-[9.5rem] text-[clamp(0.52rem,0.6cqw,0.72rem)] font-medium leading-[1.32] text-slate-700">{item.detail}</p>
    </div>
  );
}
