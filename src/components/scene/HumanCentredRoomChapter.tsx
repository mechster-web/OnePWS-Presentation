import { motion } from "framer-motion";
import { Armchair, Lightbulb, Ruler, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { getAsset } from "../../content/assetManifest";
import type { Chapter } from "../../data/contentTypes";
import { entrance, layerTransition, revealTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";

type Props = {
  chapter: Chapter;
};

const designInputs: Array<{ title: string; message: string; icon: ReactNode }> = [
  {
    title: "Operator centred",
    message: "Ergonomics, posture, reach and viewing comfort shape the workstation before finishes are considered.",
    icon: <Armchair aria-hidden="true" size={17} />,
  },
  {
    title: "Task aligned",
    message: "Displays, consoles and supervisor visibility are planned around operating decisions and escalation paths.",
    icon: <Workflow aria-hidden="true" size={17} />,
  },
  {
    title: "Architecturally integrated",
    message: "Lighting, acoustics, HVAC, raised floor and wall systems become part of the same room logic.",
    icon: <Ruler aria-hidden="true" size={17} />,
  },
  {
    title: "Calm under pressure",
    message: "The room communicates state without visual clutter, helping people stay oriented during long shifts.",
    icon: <Lightbulb aria-hidden="true" size={17} />,
  },
];

export function HumanCentredRoomChapter({ chapter }: Props) {
  const { state } = usePresentation();

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <HumanRoomBackdrop reducedMotion={state.reducedMotion} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.84)_48%,rgba(255,255,255,0.6)_100%)]" />

      <section className="absolute bottom-[15%] left-8 top-[13%] z-20 flex w-[min(860px,60cqw)] flex-col md:left-12 lg:left-16">
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          transition={revealTransition(state.reducedMotion)}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          {...entrance.informationFocus(state.reducedMotion)}
          className="mt-4 max-w-[690px] text-balance text-[clamp(2rem,3.05cqw,3.65rem)] font-semibold leading-[1.04] text-control-text"
          transition={revealTransition(state.reducedMotion, 0.1)}
        >
          A human-centred control room, designed as one environment.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-4 max-w-[680px] text-sm leading-6 text-control-soft md:text-base"
          transition={revealTransition(state.reducedMotion, 0.22)}
        >
          Architecture, ergonomics, technology and infrastructure work together around the operator,
          so the room supports decision-making instead of adding pressure.
        </motion.p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {designInputs.map((input, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="instrument-panel min-h-[112px] p-3"
              initial={{ opacity: 0, y: state.reducedMotion ? 0 : 16 }}
              key={input.title}
              transition={revealTransition(state.reducedMotion, 0.16 + index * 0.08)}
            >
              <div className="flex items-center gap-3 text-control-warm">
                <span className="control-button !h-9 !w-9 shrink-0">{input.icon}</span>
                <h2 className="text-base font-semibold leading-tight text-control-text">{input.title}</h2>
              </div>
              <p className="mt-2 text-xs leading-5 text-control-soft">{input.message}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <aside className="instrument-panel absolute right-8 top-[22%] z-30 hidden w-[390px] p-6 xl:block">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Solution reveal</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight">The environment becomes the operating system.</h2>
        <p className="mt-4 text-sm leading-6 text-control-soft">
          The next chapter opens the complete connected ecosystem: consoles, chairs, video wall,
          lighting, acoustics, floor, supervisor area and collaboration spaces.
        </p>
      </aside>
    </article>
  );
}

function HumanRoomBackdrop({ reducedMotion }: { reducedMotion: boolean }) {
  const asset = getAsset("showroom-control-room-wide");

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      {asset?.src ? (
        <img alt={asset.alt ?? "OnePWS control room"} className="absolute inset-y-0 right-0 h-full w-[64%] object-cover opacity-30" src={asset.src} />
      ) : null}
      <motion.div
        animate={{ opacity: 0.7 }}
        className="absolute left-[40%] top-[15%] h-[36%] w-[46%] border border-control-line/60 bg-white/36"
        initial={{ opacity: 0.24 }}
        transition={layerTransition(reducedMotion, 0.2)}
      >
        <div className="absolute inset-5 grid grid-cols-5 gap-3">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div
              animate={{ opacity: 0.56, y: 0 }}
              className="border border-control-line bg-white/62"
              initial={{ opacity: 0.18, y: reducedMotion ? 0 : 8 }}
              key={index}
              transition={revealTransition(reducedMotion, 0.28 + index * 0.04)}
            >
              <div className="mx-4 mt-5 h-px bg-control-warm/35" />
              <div className="mx-4 mt-4 h-px bg-control-muted/20" />
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="absolute left-[31%] top-[58%] h-[16%] w-[44%] border border-control-line bg-white/58">
        <motion.div
          animate={{ scaleX: 1, opacity: 0.68 }}
          className="absolute left-9 top-1/2 h-px w-[78%] origin-left bg-control-warm/42"
          initial={{ scaleX: 0.12, opacity: 0.16 }}
          transition={layerTransition(reducedMotion, 0.5)}
        />
        <div className="absolute left-[14%] top-[-18px] h-9 w-[16%] border border-control-warm/55 bg-control-warm/10" />
        <div className="absolute left-[42%] top-[-18px] h-9 w-[16%] border border-control-line bg-control-panel" />
        <div className="absolute left-[70%] top-[-18px] h-9 w-[16%] border border-control-line bg-control-panel" />
      </div>
      <motion.div
        animate={reducedMotion ? { opacity: 0.22 } : { opacity: [0.12, 0.3, 0.18] }}
        className="absolute left-[20%] top-[79%] h-[4%] w-[64%] border border-control-line bg-control-warm/12"
        transition={{ duration: 3.8, repeat: reducedMotion ? 0 : Infinity }}
      />
    </div>
  );
}
