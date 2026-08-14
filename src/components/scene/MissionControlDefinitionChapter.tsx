import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Headphones,
  Map,
} from "lucide-react";
import { useState } from "react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type DefinitionChoice = {
  id: string;
  index: string;
  title: string;
  detail: string;
  response: string;
};

const fallbackChoice: DefinitionChoice = {
  id: "see-clearly",
  index: "01",
  title: "See clearly",
  detail: "Sightlines, display hierarchy and visual focus",
  response: "Critical information should be visible without unnecessary head or eye movement.",
};

const choices: DefinitionChoice[] = [
  {
    ...fallbackChoice,
  },
  {
    id: "reach-quickly",
    index: "02",
    title: "Reach quickly",
    detail: "Controls, equipment and frequently used tools within easy access",
    response: "Frequently used controls should remain accessible without repeated stretching or repositioning.",
  },
  {
    id: "stay-focused",
    index: "03",
    title: "Stay focused",
    detail: "Lighting, acoustics and information organised to reduce distraction",
    response: "The environment should reduce visual, acoustic and physical distractions.",
  },
  {
    id: "respond-together",
    index: "04",
    title: "Respond together",
    detail: "Shared awareness, collaboration and coordinated action",
    response: "People and information should come together quickly when situations escalate.",
  },
  {
    id: "keep-operating",
    index: "05",
    title: "Keep operating",
    detail: "Reliable infrastructure, maintainable systems and future-ready integration",
    response: "The room must remain reliable, serviceable and adaptable throughout its lifecycle.",
  },
];

export function MissionControlDefinitionChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const [selectedId, setSelectedId] = useState(fallbackChoice.id);
  const selected = choices.find((choice) => choice.id === selectedId) ?? fallbackChoice;
  const motionDuration = state.reducedMotion ? 0.01 : 0.72;
  const processEase = [0.16, 1, 0.3, 1] as const;
  const orchestrationDelay = state.reducedMotion ? 0 : 0.08;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_48%,#edf3f7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.026)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.026)_1px,transparent_1px)] bg-[length:5.5rem_5.5rem] opacity-55" />

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 z-0 overflow-hidden"
        initial={state.reducedMotion ? false : { opacity: 0, scale: 1.015 }}
        transition={{ duration: motionDuration + 0.2, delay: 0.06, ease: processEase }}
      >
        <img
          alt="Mission-critical control room environment"
          className="h-full w-full object-cover object-[72%_50%]"
          src="/assets/source-pdf/p31_059_2078x1168.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.98)_0%,rgb(255_255_255/0.93)_26%,rgb(255_255_255/0.66)_43%,rgb(255_255_255/0.22)_64%,rgb(255_255_255/0.06)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.78)_0%,rgb(255_255_255/0.18)_26%,rgb(255_255_255/0.08)_60%,rgb(255_255_255/0.82)_100%)]" />
        {!state.reducedMotion ? (
          <>
            <motion.div
              animate={{ opacity: [0, 0.42, 0], x: ["-18%", "58%", "112%"] }}
              className="absolute top-[18cqh] h-px w-[42cqw] bg-[linear-gradient(90deg,transparent,rgb(207_31_43/0.52),transparent)]"
              initial={{ opacity: 0, x: "-18%" }}
              transition={{ duration: 3.6, delay: 0.72, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ opacity: [0, 0.18, 0.08], scaleX: [0.82, 1.06, 1] }}
              className="absolute left-[30cqw] top-[48cqh] h-[19cqh] w-[36cqw] origin-left rounded-full bg-[radial-gradient(circle,rgb(207_31_43/0.20)_0%,transparent_64%)] blur-3xl"
              initial={{ opacity: 0, scaleX: 0.82 }}
              transition={{ duration: 2.8, delay: 0.92, ease: processEase }}
            />
          </>
        ) : null}
      </motion.div>

      <section className="absolute inset-0 z-20 px-[3.55cqw] py-[3.15cqh]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.2cqh] bg-white/82 backdrop-blur-[2px]" />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[3.55cqw] top-[16.5cqh] w-[min(51cqw,58rem)]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: motionDuration, ease: processEase }}
        >
          <p className="text-[clamp(0.72rem,0.78cqw,0.9rem)] font-bold uppercase tracking-[0.22em] text-control-warm">
            {chapter.eyebrow}
          </p>
          <h1 className="mt-[2cqh] max-w-[18ch] text-balance text-[clamp(2.65rem,3.72cqw,4.85rem)] font-bold leading-[0.94] tracking-normal text-control-text md:text-[2.5cqw]">
            {chapter.headline}
          </h1>
          <p className="mt-[1.65cqh] max-w-[40rem] text-[clamp(0.9rem,0.98cqw,1.1rem)] leading-[1.32] text-control-soft md:text-[0.8cqw]">
            {chapter.supportingMessage}
          </p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[3.55cqw] top-[61.2cqh] w-[min(69cqw,84rem)]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: motionDuration, delay: 0.2, ease: processEase }}
        >
          <div className="mb-[1.05cqh] flex items-center gap-5">
            <p className="shrink-0 text-[clamp(0.68rem,0.75cqw,0.86rem)] font-bold uppercase tracking-[0.28em] text-control-warm">
              Select what matters most in your operation.
            </p>
            <div className="relative h-px flex-1 overflow-hidden bg-slate-300">
              <motion.div
                animate={{ scaleX: 1 }}
                className="absolute inset-y-0 left-0 w-full origin-left bg-control-warm"
                initial={state.reducedMotion ? false : { scaleX: 0 }}
                transition={{ duration: 1.15, delay: orchestrationDelay + 0.48, ease: processEase }}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-[1cqw]">
            {choices.map((choice, index) => {
              const isSelected = choice.id === selected.id;

              return (
                <motion.button
                  animate={{ opacity: 1, y: 0 }}
                  aria-pressed={isSelected}
                  className={`group relative flex h-[clamp(7.15rem,13cqh,8.65rem)] flex-col overflow-hidden rounded-[0.42rem] border px-[clamp(0.78rem,0.88cqw,1rem)] py-[clamp(0.58rem,0.72cqh,0.8rem)] text-left shadow-[0_0.9rem_2rem_rgb(15_23_42/0.06)] backdrop-blur-xl transition-colors ${
                    isSelected
                      ? "border-control-warm bg-white/88 shadow-[0_1rem_2.4rem_rgb(207_31_43/0.20)]"
                      : "border-slate-300/90 bg-white/72 hover:border-control-warm/50"
                  }`}
                  initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
                  key={choice.id}
                  onClick={() => setSelectedId(choice.id)}
                  transition={{ duration: motionDuration, delay: 0.26 + index * 0.055, ease: processEase }}
                  type="button"
                  whileHover={state.reducedMotion ? undefined : { y: -4, transition: { duration: 0.28, ease: processEase } }}
                >
                  {!state.reducedMotion ? (
                    <motion.span
                      aria-hidden="true"
                      animate={{ scaleX: isSelected ? 1 : 0 }}
                      className="absolute left-0 top-0 h-px w-full origin-left bg-control-warm/80"
                      initial={false}
                      transition={{ duration: 0.46, ease: processEase }}
                    />
                  ) : null}
                  <span className="block text-[clamp(0.95rem,1.08cqw,1.24rem)] font-semibold tracking-[0.05em] text-control-warm">
                    {choice.index}
                  </span>
                  <span className="mt-[0.48cqh] block text-[clamp(0.74rem,0.82cqw,0.94rem)] font-semibold leading-tight text-control-text">
                    {choice.title}
                  </span>
                  <span className="mt-[0.45cqh] block h-px w-8 bg-control-warm/70" />
                  <span className="mt-[0.45cqh] block overflow-hidden text-[clamp(0.53rem,0.58cqw,0.66rem)] leading-[1.22] text-control-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                    {choice.detail}
                  </span>
                  {isSelected ? <span className="absolute inset-x-0 bottom-0 h-1 bg-control-warm" /> : null}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[calc(12.3cqh-23px)] left-[3.55cqw] grid h-[clamp(4.7rem,7.5cqh,5.7rem)] w-[min(69cqw,84rem)] overflow-hidden rounded-[0.45rem] border border-slate-300/90 bg-white/84 shadow-[0_1rem_2.2rem_rgb(15_23_42/0.08)] backdrop-blur-xl"
          initial={state.reducedMotion ? false : { opacity: 0, y: 12 }}
          transition={{ duration: motionDuration, delay: 0.54, ease: processEase }}
        >
          {!state.reducedMotion ? (
            <motion.div
              aria-hidden="true"
              animate={{ x: ["-32%", "132%"], opacity: [0, 0.4, 0] }}
              className="pointer-events-none absolute inset-y-0 w-[28%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.9),transparent)]"
              initial={{ x: "-32%", opacity: 0 }}
              transition={{ duration: 1.25, delay: 0.84, ease: "easeInOut" }}
            />
          ) : null}
          <div className="grid grid-cols-[minmax(12rem,0.34fr)_1fr]">
            <div className="flex items-center border-r border-slate-300 px-[1.25cqw]">
              <div className="border-l-2 border-control-warm pl-[0.9cqw]">
                <p className="text-[clamp(0.78rem,0.9cqw,1.02rem)] font-semibold leading-tight text-control-text">
                Select one to see what it means.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-[1.35cqw]">
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="text-[clamp(0.88rem,1.02cqw,1.18rem)] font-bold leading-[1.24] text-control-text"
                initial={state.reducedMotion ? false : { opacity: 0, y: 8 }}
                key={selected.id}
                transition={{ duration: 0.42, ease: processEase }}
              >
                {selected.response}
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[0.1cqh] left-[0.1cqw] z-40 justify-start"
          initial={state.reducedMotion ? false : { opacity: 0, y: 10 }}
          transition={{ duration: motionDuration, delay: 0.72, ease: processEase }}
        >
            <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
              <ChevronRight aria-hidden="true" size={20} />
            </button>
            <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
              <Map aria-hidden="true" size={20} />
            </button>
            {chapterVoiceover ? (
              <button
                aria-label={chapterVoiceover.src ? "Play narration" : "Show narration status"}
                className="pws-scene-control"
                onClick={() => {
                  dispatch({ type: "UNLOCK_AUDIO" });
                  voiceover.play(chapterVoiceover);
                }}
                title="Narration"
                type="button"
              >
                <Headphones aria-hidden="true" size={20} />
              </button>
            ) : null}
            <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
              <Expand aria-hidden="true" size={20} />
            </button>
        </motion.div>
      </section>
    </article>
  );
}


