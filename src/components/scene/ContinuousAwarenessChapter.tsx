import { motion } from "framer-motion";
import { Eye, Layers3, RadioTower, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { getAsset } from "../../content/assetManifest";
import type { Chapter } from "../../data/contentTypes";
import { entrance, layerTransition, revealTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";

type Props = {
  chapter: Chapter;
};

const awarenessLayers: Array<{
  title: string;
  message: string;
  icon: ReactNode;
  x: string;
  y: string;
}> = [
  {
    title: "See what is happening",
    message: "A shared wall view keeps the operating picture visible without forcing every signal into the same priority.",
    icon: <Eye aria-hidden="true" size={17} />,
    x: "62%",
    y: "30%",
  },
  {
    title: "Understand what matters",
    message: "Operator task displays, supervisor sightlines and room lighting create hierarchy around the next decision.",
    icon: <Layers3 aria-hidden="true" size={17} />,
    x: "48%",
    y: "58%",
  },
  {
    title: "Coordinate the next action",
    message: "The environment supports operators, supervisors and collaborators as one decision field.",
    icon: <UsersRound aria-hidden="true" size={17} />,
    x: "74%",
    y: "62%",
  },
];

export function ContinuousAwarenessChapter({ chapter }: Props) {
  const { state } = usePresentation();

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <AwarenessBackdrop reducedMotion={state.reducedMotion} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.82)_48%,rgba(255,255,255,0.58)_100%)]" />

      <section className="absolute left-8 top-[13%] z-20 max-w-[560px] md:left-12 lg:left-16">
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          transition={revealTransition(state.reducedMotion)}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          {...entrance.informationFocus(state.reducedMotion)}
          className="mt-4 text-balance text-[clamp(2.15rem,3.35vw,4rem)] font-semibold leading-[1.04] text-control-text"
          transition={revealTransition(state.reducedMotion, 0.1)}
        >
          Critical operations demand continuous awareness.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-4 max-w-[520px] text-sm leading-6 text-control-soft md:text-base"
          transition={revealTransition(state.reducedMotion, 0.22)}
        >
          The control room must help teams see what is happening, understand what matters and
          coordinate the next action without adding visual noise.
        </motion.p>
      </section>

      <section className="absolute bottom-[15%] left-8 z-20 grid w-[min(980px,66vw)] grid-cols-3 gap-3 md:left-12 lg:left-16">
        {awarenessLayers.map((layer, index) => (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="instrument-panel min-h-[124px] items-start gap-3 p-3"
            initial={{ opacity: 0, x: state.reducedMotion ? 0 : -18 }}
            key={layer.title}
            transition={revealTransition(state.reducedMotion, 0.18 + index * 0.08)}
          >
            <span className="control-button !h-9 !w-9 shrink-0 text-control-warm">{layer.icon}</span>
            <div>
              <h2 className="text-base font-semibold leading-tight text-control-text">{layer.title}</h2>
              <p className="mt-2 text-xs leading-5 text-control-soft">{layer.message}</p>
            </div>
          </motion.div>
        ))}
      </section>

      <aside className="instrument-panel absolute right-8 top-[20%] z-20 hidden max-h-[50%] w-[390px] p-6 xl:block">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Room logic</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight">Awareness is spatial.</h2>
        <p className="mt-4 text-sm leading-6 text-control-soft">
          The wall, operator field of view, supervisor position and collaboration path each carry a
          different level of operational meaning.
        </p>
        <div className="mt-7 space-y-3 text-sm text-control-muted">
          {chapter.beats.map((beat) => (
            <p className="border-l border-control-warm/45 pl-4" key={beat.id}>
              {beat.label}
            </p>
          ))}
        </div>
      </aside>
    </article>
  );
}

function AwarenessBackdrop({ reducedMotion }: { reducedMotion: boolean }) {
  const asset = getAsset("project-itms-noida-control-room");

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      {asset?.src ? (
        <img alt={asset.alt ?? "Control room"} className="absolute inset-y-0 right-0 h-full w-[64%] object-cover opacity-32" src={asset.src} />
      ) : null}
      <div className="absolute left-[44%] top-[16%] h-[34%] w-[42%] border border-control-line/60 bg-white/36">
        <div className="absolute inset-5 grid grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              animate={{ opacity: [0.32, 0.68, 0.42] }}
              className="border border-control-line bg-white/60"
              key={index}
              transition={{
                duration: reducedMotion ? 0.01 : 2.8,
                repeat: reducedMotion ? 0 : Infinity,
                delay: index * 0.08,
              }}
            >
              <div className="mx-4 mt-5 h-px bg-control-warm/35" />
              <div className="mx-4 mt-4 h-px bg-control-muted/20" />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute left-[32%] top-[58%] h-[14%] w-[38%] border border-control-line bg-white/56">
        <motion.div
          animate={{ scaleX: 1, opacity: 0.66 }}
          className="absolute left-8 top-1/2 h-px w-[78%] origin-left bg-control-warm/45"
          initial={{ scaleX: 0.16, opacity: 0.2 }}
          transition={layerTransition(reducedMotion, 0.4)}
        />
      </div>
      <div className="absolute left-[72%] top-[55%] h-[18%] w-[12%] border border-control-line bg-control-panel/54" />
      {awarenessLayers.map((layer) => (
        <div className="absolute -translate-x-1/2 -translate-y-1/2" key={layer.title} style={{ left: layer.x, top: layer.y }}>
          <span className="hotspot-marker hotspot-marker-active !h-10 !w-10">
            <RadioTower aria-hidden="true" size={14} />
          </span>
        </div>
      ))}
    </div>
  );
}
