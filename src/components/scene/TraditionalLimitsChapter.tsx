import { motion } from "framer-motion";
import { Cable, Gauge, MonitorX, Wrench } from "lucide-react";
import type { ReactNode } from "react";
import { getAsset } from "../../content/assetManifest";
import type { Chapter } from "../../data/contentTypes";
import { entrance, revealTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";

type Props = {
  chapter: Chapter;
};

const limits: Array<{ title: string; message: string; icon: ReactNode }> = [
  {
    title: "More displays, less clarity",
    message: "Expansion can add visual surface without improving hierarchy or decision flow.",
    icon: <MonitorX aria-hidden="true" size={17} />,
  },
  {
    title: "Infrastructure becomes exposed",
    message: "Cable, power, service access and equipment changes become harder when the room is not planned as one system.",
    icon: <Cable aria-hidden="true" size={17} />,
  },
  {
    title: "Maintenance interrupts operation",
    message: "A room that is difficult to service creates avoidable operational risk over its lifecycle.",
    icon: <Wrench aria-hidden="true" size={17} />,
  },
  {
    title: "Scalability is constrained",
    message: "Future operators, systems and display needs require an engineered expansion path from the beginning.",
    icon: <Gauge aria-hidden="true" size={17} />,
  },
];

export function TraditionalLimitsChapter({ chapter }: Props) {
  const { state } = usePresentation();

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <LimitsBackdrop reducedMotion={state.reducedMotion} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.86)_50%,rgba(255,255,255,0.68)_100%)]" />

      <section className="absolute bottom-[15%] left-8 top-[13%] z-20 flex w-[min(840px,58cqw)] flex-col md:left-12 lg:left-16">
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          transition={revealTransition(state.reducedMotion)}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          {...entrance.informationFocus(state.reducedMotion)}
          className="mt-4 max-w-[640px] text-balance text-[clamp(2rem,3.15cqw,3.75rem)] font-semibold leading-[1.04] text-control-text"
          transition={revealTransition(state.reducedMotion, 0.1)}
        >
          Traditional control rooms are no longer sufficient.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-4 max-w-[600px] text-sm leading-6 text-control-soft md:text-base"
          transition={revealTransition(state.reducedMotion, 0.22)}
        >
          Adding more desks and displays does not create better control when the environment is not
          integrated around people, serviceability and future change.
        </motion.p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {limits.map((limit, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="instrument-panel min-h-[112px] p-3"
              initial={{ opacity: 0, y: state.reducedMotion ? 0 : 16 }}
              key={limit.title}
              transition={revealTransition(state.reducedMotion, 0.16 + index * 0.08)}
            >
              <div className="flex items-center gap-3 text-control-warm">
                <span className="control-button !h-9 !w-9 shrink-0">{limit.icon}</span>
                <h2 className="text-base font-semibold leading-tight text-control-text">{limit.title}</h2>
              </div>
              <p className="mt-2 text-xs leading-5 text-control-soft">{limit.message}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <aside className="instrument-panel absolute right-8 top-[22%] z-30 hidden w-[390px] p-6 xl:block">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Design gap</p>
        <h2 className="mt-4 text-3xl font-semibold leading-tight">The room has to be engineered before it is filled.</h2>
        <p className="mt-4 text-sm leading-6 text-control-soft">
          This chapter bridges the diagnostic view and the intelligent room reveal: the issue is not
          furniture alone, display alone or software alone. It is the integration of the whole environment.
        </p>
      </aside>
    </article>
  );
}

function LimitsBackdrop({ reducedMotion }: { reducedMotion: boolean }) {
  const asset = getAsset("project-chandigarh-control-room");

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-white" />
      {asset?.src ? (
        <img alt={asset.alt ?? "Control room"} className="absolute inset-y-0 right-0 h-full w-[62%] object-cover opacity-28" src={asset.src} />
      ) : null}
      <div className="absolute left-[43%] top-[16%] h-[37%] w-[43%] border border-control-line/60 bg-white/36">
        <div className="absolute inset-5 grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }).map((_, index) => (
            <motion.div
              animate={reducedMotion ? { opacity: 0.38 } : { opacity: index % 3 === 0 ? [0.2, 0.62, 0.28] : 0.34 }}
              className="border border-control-line bg-white/62"
              key={index}
              transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.05 }}
            />
          ))}
        </div>
      </div>
      <div className="absolute left-[32%] top-[62%] h-[14%] w-[44%] border border-control-line bg-white/58">
        <div className="absolute inset-x-8 top-1/2 h-px bg-control-line" />
        <div className="absolute left-[12%] top-[-16px] h-8 w-[16%] border border-control-line bg-control-panel" />
        <div className="absolute left-[39%] top-[-16px] h-8 w-[16%] border border-control-line bg-control-panel" />
        <div className="absolute left-[66%] top-[-16px] h-8 w-[16%] border border-control-line bg-control-panel" />
      </div>
      <motion.div
        animate={{ scaleX: reducedMotion ? 1 : [0.28, 1, 0.55] }}
        className="absolute left-[58%] top-[78%] h-1 w-[24%] origin-left bg-control-warm/34"
        transition={{ duration: 3, repeat: reducedMotion ? 0 : Infinity }}
      />
    </div>
  );
}
