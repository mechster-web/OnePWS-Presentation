import { motion } from "framer-motion";
import {
  AudioWaveform,
  BarChart3,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  Ear,
  Expand,
  Headphones,
  Layers3,
  Map,
  PanelTop,
  ShieldCheck,
  Users,
  Volume2,
  VolumeX,
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

const acousticPrinciples: SimpleItem[] = [
  { title: "Clear Speech", detail: "Better intelligibility for faster response.", Icon: AudioWaveform },
  { title: "Lower Noise", detail: "Reduced distraction and fatigue.", Icon: VolumeX },
  { title: "Balanced Sound", detail: "Consistent clarity across the room.", Icon: Crosshair },
  { title: "Higher Focus", detail: "Better concentration, better decisions.", Icon: Brain },
];

const acousticCallouts: CalloutItem[] = [
  {
    title: "Acoustic Wall Panels",
    detail: "Absorb mid to high frequencies and control reflections.",
    Icon: PanelTop,
    className: "left-[4%] top-[34%]",
  },
  {
    title: "Acoustic Ceiling",
    detail: "Controls reverberation and manages overall sound balance.",
    Icon: Layers3,
    className: "left-[42%] top-[15%]",
  },
  {
    title: "Isolation & Sealing",
    detail: "Prevents sound leakage between rooms and external sources.",
    Icon: ShieldCheck,
    className: "right-[4%] top-[35%]",
  },
  {
    title: "Acoustic Flooring",
    detail: "Reduces impact noise and vibration transfer.",
    Icon: AudioWaveform,
    className: "left-[45%] bottom-[9%]",
  },
];

const performanceMetrics = [
  { value: "0.4 - 0.6 s", label: "Optimal Reverberation Time (RT60)", detail: "For speech clarity", Icon: AudioWaveform },
  { value: "STI 0.75+", label: "Speech Transmission Index", detail: "For excellent intelligibility", Icon: BarChart3 },
  { value: "NC 25 - 30", label: "Noise Criteria", detail: "For distraction-free work", Icon: Volume2 },
  { value: "50+ dB", label: "Sound Isolation (STC)", detail: "Between control rooms", Icon: ShieldCheck },
  { value: "NRC 0.70 - 0.95", label: "Noise Reduction Coefficient", detail: "Across acoustic surfaces", Icon: CheckCircle2 },
];

const engineeredSurfaces: SurfaceItem[] = [
  {
    title: "Acoustic Ceiling",
    detail: "Delivers even sound absorption and reduces reverberation.",
    bullets: ["High NRC ceiling tiles", "Acoustic insulation layer", "Plenum absorption", "Sealed edges"],
    Icon: Layers3,
  },
  {
    title: "Acoustic Wall Panelling",
    detail: "Controls reflections and improves speech clarity across all frequencies.",
    bullets: ["Fabric / perforated finish", "Acoustic core material", "Air gap for absorption", "Backing board"],
    Icon: PanelTop,
  },
  {
    title: "Acoustic Flooring",
    detail: "Minimizes impact noise and vibration for quieter operations.",
    bullets: ["Low-impact flooring", "Acoustic underlayment", "Vibration damping layer", "Structural floor"],
    Icon: AudioWaveform,
  },
];

const operatorBenefits: SimpleItem[] = [
  { title: "Hear Clearly", detail: "Critical information comes through without distortion.", Icon: Ear },
  { title: "Focus Longer", detail: "Less distraction. More comfort. Higher productivity.", Icon: Crosshair },
  { title: "Decide Faster", detail: "Better clarity leads to faster, more confident decisions.", Icon: Brain },
  { title: "Work Better Together", detail: "Clear communication creates stronger team performance.", Icon: Users },
];

export function RoomSoundsRightChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;
  const reducedMotion = state.reducedMotion;
  const roomAsset = getAsset("ambient-control-room");

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef3f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />
      <motion.div
        animate={reducedMotion ? undefined : { opacity: [0.32, 0.58, 0.32], scale: [0.98, 1.04, 0.98] }}
        className="pointer-events-none absolute right-[5vw] top-[12vh] h-[34vh] w-[36vw] rounded-full bg-violet-500/6 blur-[76px]"
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute left-[1vw] top-[14vh] h-[58vh] w-[40vw] opacity-[0.055] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <section className="absolute inset-x-[1.9vw] top-[10.1vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[3.7vh] grid grid-cols-[minmax(16rem,0.29fr)_minmax(0,1fr)_minmax(17rem,0.31fr)] gap-[1.15vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="min-h-0 pt-[3vh]" initial={reducedMotion ? false : { opacity: 0, y: 18 }} transition={{ duration: 0.72, ease }}>
            <h1 className="text-[clamp(2.15rem,3.08vw,4.15rem)] font-bold leading-[0.99] tracking-normal text-black md:text-[2.5vw]">
              <span className="block">The Room</span>
              <span className="block text-[#cf1f2b]">Sounds Right.</span>
            </h1>
            <motion.div
              animate={{ scaleX: 1 }}
              className="mt-[1.35vh] h-[2px] w-[3rem] origin-left bg-control-warm"
              initial={reducedMotion ? false : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease }}
            />
            <p className="mt-[1.55vh] text-[clamp(0.76rem,0.95vw,1.12rem)] font-medium leading-[1.36] text-slate-900 md:text-[0.8vw]">
              Acoustic performance engineered into every surface so operators hear more clearly,
              focus longer, and decide faster.
            </p>

            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="mt-[3.7vh] rounded-[0.85rem] border border-slate-200/86 bg-white/76 p-[1vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[24px]"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              transition={{ duration: 0.64, delay: 0.24, ease }}
            >
              <div className="flex items-center gap-4">
                <motion.span
                  animate={reducedMotion ? undefined : { boxShadow: ["0 0 0 0 rgb(124 58 237 / 0.16)", "0 0 0 0.65rem rgb(124 58 237 / 0)", "0 0 0 0 rgb(124 58 237 / 0)"] }}
                  className="grid size-16 shrink-0 place-items-center rounded-full border border-violet-200 bg-violet-50 text-[#cf1f2b]"
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                >
                  <AudioWaveform aria-hidden="true" size={34} strokeWidth={1.6} />
                </motion.span>
                <p className="text-[clamp(0.8rem,0.95vw,1.08rem)] font-semibold leading-[1.35] text-slate-900">
                  Great rooms are not just built. <span className="block font-semibold text-[#cf1f2b]">They are tuned.</span>
                </p>
              </div>
            </motion.section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[12vh_minmax(0,1fr)_22.7vh] gap-[1vh]" initial={reducedMotion ? false : { opacity: 0, y: 20 }} transition={{ duration: 0.76, delay: 0.1, ease }}>
            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[0.9rem] border border-slate-200/86 bg-white/76 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[26px]"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              transition={{ duration: 0.62, delay: 0.16, ease }}
            >
              <h2 className="text-[clamp(0.84rem,0.98vw,1.14rem)] font-semibold uppercase leading-tight text-control-text">
                Acoustically Optimized. Purposefully Designed.
              </h2>
              <div className="mt-[0.62vh] grid grid-cols-4 divide-x divide-slate-200/90">
                {acousticPrinciples.map((item, index) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-[2.45rem_minmax(0,1fr)] items-center gap-[0.5vw] px-[0.55vw] first:pl-0 last:pr-0"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    key={item.title}
                    transition={{ duration: 0.5, delay: 0.28 + index * 0.08, ease }}
                  >
                    <motion.span
                      animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
                      className="grid size-9 place-items-center rounded-full bg-violet-50 text-[#cf1f2b] text-violet-600"
                      transition={{ duration: 3, delay: index * 0.28, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <item.Icon aria-hidden="true" size={20} strokeWidth={1.65} />
                    </motion.span>
                    <span>
                      <strong className="block text-[clamp(0.58rem,0.68vw,0.8rem)] font-semibold leading-tight text-control-text">{item.title}</strong>
                      <span className="mt-[0.16vh] block text-[clamp(0.5rem,0.58vw,0.68rem)] font-semibold leading-[1.18] text-slate-600">{item.detail}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-[0.85rem] border border-slate-200/86 bg-white/70 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)]"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.82, delay: 0.2, ease }}
            >
              {roomAsset?.src ? (
                <motion.img
                  alt=""
                  animate={reducedMotion ? undefined : { scale: [1.015, 1.035, 1.015] }}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  draggable={false}
                  src={roomAsset.src}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.18),rgb(255_255_255/0.04)_45%,rgb(255_255_255/0.18))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgb(124_58_237/0.20),transparent_28%)]" />
              {!reducedMotion ? (
                <div className="pointer-events-none absolute inset-0">
                  {[0, 1, 2].map((index) => (
                    <motion.span
                      animate={{ opacity: [0, 0.34, 0], scale: [0.78, 1.2, 1.48] }}
                      className="absolute left-1/2 top-[38%] h-[15rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-violet-300/55"
                      key={index}
                      transition={{ duration: 4.2, delay: index * 1.05, repeat: Infinity, ease: "easeOut" }}
                    />
                  ))}
                  <motion.span
                    animate={{ x: ["-18%", "118%"], opacity: [0, 0.24, 0] }}
                    className="absolute inset-y-0 left-[-20%] w-[15%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.58),transparent)]"
                    transition={{ duration: 4.8, delay: 0.6, repeat: Infinity, repeatDelay: 2.8, ease }}
                  />
                </div>
              ) : null}
              {acousticCallouts.map((item, index) => (
                <AcousticCallout index={index} item={item} key={item.title} reducedMotion={reducedMotion} />
              ))}
            </motion.section>

            <motion.section
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[0.85rem] border border-slate-200/86 bg-white/78 px-[0.95vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.4rem_rgb(15_23_42/0.07)] backdrop-blur-[26px]"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              transition={{ duration: 0.66, delay: 0.34, ease }}
            >
              <div className="grid h-full grid-cols-[13rem_minmax(0,1fr)] gap-[0.9vw]">
                <div className="border-r border-slate-200/90 pr-[0.85vw]">
                  <h2 className="text-[clamp(0.78rem,0.9vw,1.04rem)] font-semibold uppercase leading-tight text-control-text">
                    Engineered Surfaces.
                  </h2>
                  <div className="mt-[0.5vh] h-[2px] w-[2.4rem] bg-control-warm" />
                  <p className="mt-[0.62vh] text-[clamp(0.52rem,0.6vw,0.7rem)] font-semibold leading-[1.18] text-slate-600">
                    Ceiling, walls and floor work as one tuned acoustic envelope.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-[0.65vw]">
                {engineeredSurfaces.map((item, index) => (
                  <SurfaceCard index={index} item={item} key={item.title} reducedMotion={reducedMotion} />
                ))}
                </div>
              </div>
            </motion.section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_28vh] gap-[1.05vh]" initial={reducedMotion ? false : { opacity: 0, x: 18 }} transition={{ duration: 0.72, delay: 0.16, ease }}>
            <section className="rounded-[0.9rem] border border-slate-200/86 bg-white/76 p-[0.9vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.82rem,0.96vw,1.1rem)] font-semibold uppercase leading-tight text-control-text">
                Acoustic Performance at a Glance
              </h2>
              <div className="mt-[0.65vh] h-[2px] w-[2.5rem] bg-control-warm" />
              <div className="mt-[0.8vh] grid gap-[0.45vh]">
                {performanceMetrics.map((metric, index) => (
                  <PerformanceMetric index={index} metric={metric} key={metric.value} reducedMotion={reducedMotion} />
                ))}
              </div>
            </section>

            <section className="rounded-[0.9rem] border border-slate-200/86 bg-white/74 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.6rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.74rem,0.86vw,1rem)] font-semibold uppercase leading-tight text-control-text">
                The Operator Benefit
              </h2>
              <div className="mt-[0.55vh] h-[2px] w-[2.25rem] bg-control-warm" />
              <div className="mt-[0.75vh] grid grid-cols-2 gap-[0.5vw]">
                {operatorBenefits.map((item, index) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-[1.8rem_minmax(0,1fr)] items-start gap-[0.38vw] rounded-[0.62rem] bg-white/64 p-[0.42vw]"
                    initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                    key={item.title}
                    transition={{ duration: 0.48, delay: 0.5 + index * 0.08, ease }}
                  >
                    <item.Icon aria-hidden="true" className="text-violet-600" size={21} strokeWidth={1.55} />
                    <span>
                      <p className="text-[clamp(0.54rem,0.62vw,0.72rem)] font-semibold leading-tight text-control-text">{item.title}</p>
                      <p className="mt-[0.14vh] text-[clamp(0.44rem,0.51vw,0.6rem)] font-medium leading-[1.1] text-slate-600">{item.detail}</p>
                    </span>
                  </motion.div>
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

function AcousticCallout({ index, item, reducedMotion }: { index: number; item: CalloutItem; reducedMotion: boolean }) {
  return (
    <motion.div
      animate={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: [0, -3, 0] }}
      className={`absolute max-w-[13rem] rounded-[0.7rem] border border-white/92 bg-white/88 px-[0.82vw] py-[0.74vh] shadow-[0_0.8rem_1.8rem_rgb(15_23_42/0.12)] backdrop-blur-[20px] ${item.className}`}
      initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
      transition={reducedMotion ? { duration: 0.01 } : { opacity: { duration: 0.5, delay: 0.46 + index * 0.1 }, scale: { duration: 0.5, delay: 0.46 + index * 0.1 }, y: { duration: 3.2, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" } }}
    >
      <div className="flex items-center gap-2">
        <item.Icon aria-hidden="true" className="text-violet-600" size={17} strokeWidth={1.75} />
        <strong className="text-[clamp(0.58rem,0.66vw,0.78rem)] font-semibold uppercase leading-tight text-control-text">{item.title}</strong>
      </div>
      <p className="mt-[0.35vh] text-[clamp(0.5rem,0.58vw,0.68rem)] font-semibold leading-[1.18] text-slate-700">{item.detail}</p>
    </motion.div>
  );
}

function PerformanceMetric({ index, metric, reducedMotion }: { index: number; metric: PerformanceItem; reducedMotion: boolean }) {
  return (
    <motion.article
      animate={{ opacity: 1, x: 0 }}
      className="grid grid-cols-[2.85rem_minmax(0,1fr)] items-center gap-[0.62vw] border-b border-slate-200/86 pb-[0.42vh] last:border-b-0 last:pb-0"
      initial={reducedMotion ? false : { opacity: 0, x: 12 }}
      transition={{ duration: 0.46, delay: 0.28 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        animate={reducedMotion ? undefined : { scale: [1, 1.05, 1] }}
        className="grid size-10 place-items-center rounded-full border border-violet-200 bg-violet-50 text-violet-600"
        transition={{ duration: 3.4, delay: index * 0.25, repeat: Infinity, ease: "easeInOut" }}
      >
        <metric.Icon aria-hidden="true" size={20} strokeWidth={1.55} />
      </motion.span>
      <span>
        <strong className="block text-[clamp(0.9rem,1.12vw,1.34rem)] font-semibold leading-none text-violet-600">{metric.value}</strong>
        <span className="mt-[0.22vh] block text-[clamp(0.55rem,0.64vw,0.74rem)] font-semibold leading-tight text-control-text">{metric.label}</span>
        <span className="mt-[0.12vh] block text-[clamp(0.48rem,0.56vw,0.64rem)] font-medium leading-[1.1] text-slate-600">{metric.detail}</span>
      </span>
    </motion.article>
  );
}

function SurfaceCard({ index, item, reducedMotion }: { index: number; item: SurfaceItem; reducedMotion: boolean }) {
  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="min-h-0 rounded-[0.66rem] border border-slate-200/86 bg-white/72 p-[0.62vw]"
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      transition={{ duration: 0.52, delay: 0.46 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-[0.45vw]">
        <motion.span
          animate={reducedMotion ? undefined : { rotate: [0, -2, 2, 0] }}
          className="grid size-8 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600"
          transition={{ duration: 4, delay: index * 0.35, repeat: Infinity, ease: "easeInOut" }}
        >
          <item.Icon aria-hidden="true" size={18} strokeWidth={1.65} />
        </motion.span>
        <h3 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-semibold uppercase leading-tight text-violet-600">{item.title}</h3>
      </div>
      <p className="mt-[0.42vh] text-[clamp(0.5rem,0.58vw,0.68rem)] font-semibold leading-[1.16] text-slate-700">{item.detail}</p>
      <ul className="mt-[0.55vh] grid grid-cols-2 gap-x-[0.45vw] gap-y-[0.32vh]">
        {item.bullets.map((bullet) => (
          <li className="flex gap-1.5 text-[clamp(0.45rem,0.52vw,0.62rem)] font-semibold leading-[1.1] text-slate-600" key={bullet}>
            <span className="mt-[0.3rem] h-1 w-1 shrink-0 rounded-full bg-violet-600" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}


