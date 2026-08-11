import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  incidentOutcomeSummary,
  incidentSimulationSteps,
  type IncidentSimulationStep,
  type IncidentZone,
} from "../../content/incidentSimulation";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { entrance, motionDuration, motionEase, revealTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type SimulationMode = "guided" | "manual";
type SimulationStatus = "idle" | "running" | "paused" | "complete";

const stepDurationMs = 6_200;

export function IncidentSimulationChapter({ chapter }: Props) {
  const { state } = usePresentation();
  const voiceover = useVoiceover();
  const [simulationMode, setSimulationMode] = useState<SimulationMode>("guided");
  const [status, setStatus] = useState<SimulationStatus>("idle");
  const [activeIndex, setActiveIndex] = useState(-1);

  const activeStep = activeIndex >= 0 ? incidentSimulationSteps[activeIndex] : null;
  const activeVoiceover = activeStep ? getVoiceover("simulation", activeStep.id) : null;
  const progress =
    status === "complete"
      ? 1
      : activeIndex < 0
        ? 0
        : Math.min(1, (activeIndex + 1) / incidentSimulationSteps.length);

  useEffect(() => {
    if (status !== "running" || simulationMode !== "guided" || activeIndex < 0) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      if (activeIndex >= incidentSimulationSteps.length - 1) {
        setStatus("complete");
      } else {
        setActiveIndex((index) => index + 1);
      }
    }, state.reducedMotion ? 2_800 : stepDurationMs);

    return () => window.clearTimeout(timeout);
  }, [activeIndex, simulationMode, state.reducedMotion, status]);

  useEffect(() => {
    if (!activeVoiceover || status !== "running" || !state.narrationEnabled) {
      return;
    }

    voiceover.play(activeVoiceover);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVoiceover?.id, state.narrationEnabled, status]);

  useEffect(() => {
    if (status === "paused" && voiceover.active?.scope === "simulation") {
      voiceover.pause();
    }
  }, [status, voiceover]);

  function start(mode: SimulationMode) {
    setSimulationMode(mode);
    setActiveIndex(0);
    setStatus("running");
  }

  function replay() {
    if (voiceover.active?.scope === "simulation") {
      voiceover.stop();
    }
    setActiveIndex(0);
    setStatus("running");
  }

  function pause() {
    setStatus((current) => (current === "paused" ? "running" : "paused"));
  }

  function nextStep() {
    setSimulationMode("manual");
    setStatus("running");
    setActiveIndex((index) => {
      if (index < 0) return 0;
      if (index >= incidentSimulationSteps.length - 1) {
        setStatus("complete");
        return index;
      }
      return index + 1;
    });
  }

  function selectStep(index: number) {
    setSimulationMode("manual");
    setActiveIndex(index);
    setStatus("running");
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <IncidentRoomScene activeZone={activeStep?.zone ?? "normal"} status={status} />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.72)_48%,rgba(255,255,255,0.86)_100%)]" />

      <section className="absolute left-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.6rem)] z-20 max-w-[570px]">
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          transition={revealTransition(state.reducedMotion)}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          {...entrance.informationFocus(state.reducedMotion)}
          className="mt-3 text-balance text-[clamp(2.15rem,4vw,4.7rem)] font-semibold leading-[0.96]"
          transition={revealTransition(state.reducedMotion, 0.1)}
        >
          When Every Second Matters.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-4 max-w-xl text-sm leading-6 text-control-soft"
          transition={revealTransition(state.reducedMotion, 0.2)}
        >
          Start with normal monitoring, then follow a conceptual incident response across operator,
          supervisor, room and collaboration zones.
        </motion.p>
        <p className="mt-4 max-w-xl border-l border-control-warm/60 pl-4 text-[10px] uppercase tracking-[0.14em] leading-5 text-control-soft">
          Conceptual control-room response demonstration.
        </p>
        <p className="mt-2 max-w-xl text-xs leading-5 text-control-muted">
          Actual software, SCADA, AI, SOP, lighting, video wall and reporting integrations are
          configured project by project. This scene shows the response logic without claiming a
          deployed software integration.
        </p>
      </section>

      <SimulationControlPanel
        activeStep={activeStep}
        activeVoiceoverId={activeVoiceover?.id}
        mode={simulationMode}
        onListen={() => activeVoiceover && voiceover.play(activeVoiceover)}
        onNext={nextStep}
        onPause={pause}
        onReplay={replay}
        onStart={start}
        progress={progress}
        status={status}
        voiceoverPlaying={voiceover.active?.id === activeVoiceover?.id && voiceover.status === "playing"}
      />

      {state.captionsEnabled && activeStep ? (
        <div className="absolute bottom-[calc(var(--stage-safe-y)+9.5rem)] left-1/2 z-40 w-[min(54rem,68vw)] -translate-x-1/2 border border-control-line bg-white/88 px-5 py-3 text-center text-sm leading-6 text-control-soft backdrop-blur-xl">
          {activeStep.narration}
        </div>
      ) : null}

      <IncidentTimeline
        activeIndex={activeIndex}
        onSelectStep={selectStep}
        progress={progress}
        status={status}
      />

      <AnimatePresence>
        {status === "complete" ? <OutcomeSummary onReplay={replay} /> : null}
      </AnimatePresence>
    </article>
  );
}

function SimulationControlPanel({
  activeStep,
  activeVoiceoverId,
  mode,
  onListen,
  onNext,
  onPause,
  onReplay,
  onStart,
  progress,
  status,
  voiceoverPlaying,
}: {
  activeStep: IncidentSimulationStep | null;
  activeVoiceoverId?: string;
  mode: SimulationMode;
  onListen: () => void;
  onNext: () => void;
  onPause: () => void;
  onReplay: () => void;
  onStart: (mode: SimulationMode) => void;
  progress: number;
  status: SimulationStatus;
  voiceoverPlaying: boolean;
}) {
  const isActive = status !== "idle";

  return (
    <aside className="instrument-panel absolute right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+6rem)] z-30 w-[min(430px,32vw)] p-4 max-lg:left-8 max-lg:right-auto max-lg:top-auto max-lg:bottom-44 max-lg:w-[calc(100%-4rem)]">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.34em] text-control-warm">
            {isActive ? `${mode} simulation` : "Normal operation"}
          </p>
          <h2 className="mt-2 text-[clamp(1.35rem,1.55vw,1.8rem)] font-semibold leading-tight">
            {activeStep?.title ?? "Control room monitoring is stable."}
          </h2>
        </div>
        <span className="shrink-0 border border-control-line px-3 py-2 text-xs uppercase tracking-[0.22em] text-control-muted">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-control-soft">
        {activeStep?.operatorMessage ??
          "Displays, consoles, supervisor area and emergency collaboration room are in steady monitoring state."}
      </p>

      <div className="mt-3 border-t border-control-line pt-3">
        <p className="text-xs uppercase tracking-[0.3em] text-control-warm">System view</p>
        <p className="mt-2 text-sm leading-5 text-control-muted">
          {activeStep?.systemMessage ??
            "No active incident. The demonstration is ready to begin when selected."}
        </p>
      </div>

      {activeStep ? (
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-control-line pt-3 text-xs leading-5 text-control-muted">
          <div>
            <p className="uppercase tracking-[0.24em] text-control-warm">Response layer</p>
            <p className="mt-2">{activeStep.visualInstruction}</p>
          </div>
          <div>
            <p className="uppercase tracking-[0.24em] text-control-warm">Operator context</p>
            <p className="mt-2">{activeStep.operatorMessage}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-4 h-1 bg-control-line">
        <div className="h-1 bg-control-warm transition-[width]" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {status === "idle" ? (
          <>
            <button
              className="premium-action px-4 py-3 text-sm"
              onClick={() => onStart("guided")}
              type="button"
            >
              <Play aria-hidden="true" size={16} />
              Start Guided Simulation
            </button>
            <button
              className="quiet-action px-3 py-2.5 text-sm"
              onClick={() => onStart("manual")}
              type="button"
            >
              Step Manually
            </button>
          </>
        ) : (
          <>
            <button
              className="control-button"
              onClick={onPause}
              type="button"
              aria-label={status === "paused" ? "Resume simulation" : "Pause simulation"}
            >
              {status === "paused" ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
            </button>
            <button aria-label="Replay incident simulation" className="control-button" onClick={onReplay} type="button">
              <RotateCcw aria-hidden="true" size={18} />
            </button>
            <button
              aria-label="Advance incident simulation"
              className="control-button"
              onClick={onNext}
              type="button"
            >
              <SkipForward aria-hidden="true" size={18} />
            </button>
            <button
              className="quiet-action px-3 py-2.5 text-sm"
              disabled={!activeVoiceoverId}
              onClick={onListen}
              type="button"
            >
              {voiceoverPlaying ? <AlertTriangle aria-hidden="true" size={16} /> : <Headphones aria-hidden="true" size={16} />}
              Listen
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

function IncidentTimeline({
  activeIndex,
  onSelectStep,
  progress,
  status,
}: {
  activeIndex: number;
  onSelectStep: (index: number) => void;
  progress: number;
  status: SimulationStatus;
}) {
  return (
    <nav className="absolute inset-x-[var(--stage-safe-x)] bottom-[calc(var(--stage-safe-y)+5rem)] z-40" aria-label="Incident simulation timeline">
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-control-muted">
        <span>Incident progress</span>
        <span>{Math.round(progress * 100)}%</span>
      </div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-4 h-px bg-control-line" />
        <div
          className="absolute left-0 top-4 h-px bg-control-warm transition-[width]"
          style={{ width: `${progress * 100}%` }}
        />
        <ol
          className="relative grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${incidentSimulationSteps.length}, minmax(0, 1fr))` }}
        >
          {incidentSimulationSteps.map((step, index) => {
            const isCurrent = index === activeIndex;
            const isComplete = status === "complete" || index < activeIndex;
            return (
              <li key={step.id}>
                <button
                  aria-label={`Go to simulation step ${step.sequence}: ${step.title}`}
                  className={`group flex w-full flex-col items-center gap-1 text-center text-[8px] uppercase tracking-[0.06em] transition ${
                    isCurrent
                      ? "text-control-warm"
                      : isComplete
                        ? "text-control-soft"
                        : "text-control-muted hover:text-control-warm"
                  }`}
                  onClick={() => onSelectStep(index)}
                  type="button"
                >
                  <span
                    className={`relative flex h-7 w-7 items-center justify-center border text-[10px] backdrop-blur ${
                      isCurrent
                        ? "border-control-warm bg-control-warm text-control-black"
                        : isComplete
                          ? "border-control-warm/55 bg-control-black/70"
                          : "border-control-line bg-control-black/55 group-hover:border-control-warm"
                    }`}
                  >
                    {isComplete && !isCurrent ? <CheckCircle2 aria-hidden="true" size={15} /> : step.sequence}
                  </span>
                  <span className="hidden leading-3 lg:block">{step.shortLabel}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

function IncidentRoomScene({
  activeZone,
  status,
}: {
  activeZone: IncidentZone;
  status: SimulationStatus;
}) {
  const incidentActive = status !== "idle" && status !== "complete";

  return (
    <div className="absolute inset-0">
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          incidentActive
            ? "bg-[radial-gradient(circle_at_54%_28%,rgba(207,31,43,0.12),transparent_30%),radial-gradient(circle_at_82%_68%,rgba(207,31,43,0.08),transparent_26%),#ffffff]"
            : "bg-[radial-gradient(circle_at_54%_28%,rgba(104,113,125,0.12),transparent_34%),#ffffff]"
        }`}
      />
      <RoomZone
        active={activeZone === "videoWall"}
        className="left-[15%] top-[13%] h-[33%] w-[67%]"
        label="Intelligent video wall"
      >
        <div className="grid h-full grid-cols-5 gap-3 p-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.div
              animate={
                activeZone === "videoWall"
                  ? { opacity: 0.82, y: -2 }
                  : { opacity: 0.42 }
              }
              className="border border-control-line bg-control-black/75"
              key={index}
              transition={{ duration: motionDuration.focus, ease: motionEase.lighting }}
            >
              <div className="mx-4 mt-5 h-px bg-control-warm/45" />
              <div className="mx-4 mt-4 h-px bg-control-muted/25" />
              {incidentActive ? <div className="mx-4 mt-4 h-8 border border-control-warm/35" /> : null}
            </motion.div>
          ))}
        </div>
      </RoomZone>

      <RoomZone
        active={activeZone === "console" || activeZone === "operator"}
        className="left-[22%] top-[55%] h-[15%] w-[44%]"
        label="Affected operator console"
      >
        <div className="absolute inset-x-8 top-1/2 h-px bg-control-warm/40" />
        <div className="absolute left-[12%] top-[-18px] h-9 w-[18%] border border-control-line bg-control-panel" />
        <div className="absolute left-[41%] top-[-18px] h-9 w-[18%] border border-control-warm/60 bg-control-warm/10" />
        <div className="absolute left-[70%] top-[-18px] h-9 w-[18%] border border-control-line bg-control-panel" />
      </RoomZone>

      <RoomZone
        active={activeZone === "copilot"}
        className="left-[47%] top-[70%] h-[12%] w-[19%]"
        label="AI incident copilot"
      >
        <div className="p-4 text-xs leading-5 text-control-muted">
          <p className="uppercase tracking-[0.24em] text-control-warm">Recommended SOP</p>
          <p className="mt-3">Review, acknowledge, coordinate.</p>
        </div>
      </RoomZone>

      <RoomZone
        active={activeZone === "supervisor"}
        className="left-[70%] top-[55%] h-[19%] w-[13%]"
        label="Supervisor area"
      >
        <div className="absolute inset-x-4 top-8 h-px bg-control-warm/45" />
        <div className="absolute inset-x-4 top-14 h-px bg-control-muted/25" />
      </RoomZone>

      <RoomZone
        active={activeZone === "collaboration"}
        className="left-[84%] top-[52%] h-[24%] w-[10%]"
        label="Emergency collaboration"
      >
        <div className="absolute inset-4 border border-control-warm/35" />
      </RoomZone>

      <RoomZone
        active={activeZone === "lighting"}
        className="left-[12%] top-[82%] h-[3%] w-[72%]"
        label="Situational lighting"
      >
        <motion.div
          animate={{ opacity: incidentActive ? 0.9 : 0.32, scaleX: incidentActive ? 1 : 0.5 }}
          className={`h-full w-[18%] ${incidentActive ? "bg-control-warm/35" : "bg-control-muted/18"}`}
          transition={{ duration: motionDuration.environmental, ease: motionEase.lighting }}
        />
      </RoomZone>

      {activeZone === "summary" ? (
        <div className="absolute right-[10%] top-[18%] z-10 w-[340px] border border-control-warm/60 bg-white/86 p-5 shadow-control backdrop-blur">
          <p className="text-xs uppercase tracking-[0.3em] text-control-warm">Shift summary</p>
          <div className="mt-4 space-y-3 text-sm text-control-soft">
            <p>Incident sequence recorded</p>
            <p>Actions and acknowledgements listed</p>
            <p>Follow-up actions are ready for review</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RoomZone({
  active,
  children,
  className,
  label,
}: {
  active: boolean;
  children: ReactNode;
  className: string;
  label: string;
}) {
  return (
    <motion.div
      animate={active ? { scale: 1.012 } : { scale: 1 }}
      className={`absolute border bg-control-panel/48 transition-colors duration-500 ${
        active ? "border-control-warm shadow-glow" : "border-control-line/75"
      } ${className}`}
      transition={{ duration: motionDuration.focus, ease: motionEase.mechanical }}
    >
      {children}
      <p
        className={`absolute left-4 top-3 text-[10px] uppercase tracking-[0.24em] ${
          active ? "text-control-warm" : "text-control-muted"
        }`}
      >
        {label}
      </p>
    </motion.div>
  );
}

function OutcomeSummary({ onReplay }: { onReplay: () => void }) {
  return (
    <motion.aside
      animate={{ opacity: 1, y: 0 }}
      className="absolute left-[var(--stage-safe-x)] top-[40%] z-40 w-[min(620px,46vw)] border border-control-warm/70 bg-white/88 p-6 shadow-control backdrop-blur-md"
      exit={{ opacity: 0, y: 16 }}
      initial={{ opacity: 0, y: 16 }}
    >
      <p className="text-xs uppercase tracking-[0.34em] text-control-warm">{incidentOutcomeSummary.title}</p>
      <h2 className="mt-4 text-3xl font-semibold">Incident resolved. Response trail preserved.</h2>
      <ul className="mt-6 space-y-3 text-sm leading-6 text-control-soft">
        {incidentOutcomeSummary.points.map((point) => (
          <li className="border-l border-control-warm/45 pl-4" key={point}>
            {point}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs leading-5 text-control-muted">{incidentOutcomeSummary.disclaimer}</p>
      <button
        className="mt-6 inline-flex min-h-11 items-center gap-2 border border-control-line px-4 py-3 text-sm text-control-soft transition hover:border-control-warm hover:text-control-warm"
        onClick={onReplay}
        type="button"
      >
        <RotateCcw aria-hidden="true" size={16} />
        Replay simulation
      </button>
    </motion.aside>
  );
}
