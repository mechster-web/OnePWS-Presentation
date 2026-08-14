import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Headphones, PanelRightOpen, Play, Volume2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  controlRoomChallenges,
  type ChallengeHotspot,
} from "../../content/controlRoomChallenges";
import { getAsset } from "../../content/assetManifest";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

export function CriticalOperationsChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const [selectedId, setSelectedId] = useState(controlRoomChallenges[0].id);
  const [impactId, setImpactId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selected = useMemo(
    () => controlRoomChallenges.find((item) => item.id === selectedId) ?? controlRoomChallenges[0],
    [selectedId],
  );

  function selectHotspot(hotspot: ChallengeHotspot) {
    setSelectedId(hotspot.id);
    setImpactId(null);
  }

  function revealNewApproach() {
    dispatch({ type: "GO_TO_CHAPTER", chapterId: "human-centred-room" });
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <div className="absolute inset-0 bg-white" />
      <motion.div
        animate={{
          x: state.reducedMotion ? 0 : selected.focus.x,
          y: state.reducedMotion ? 0 : selected.focus.y,
          scale: state.reducedMotion ? 1 : selected.focus.scale,
        }}
        className="absolute inset-0 z-10"
        transition={{ duration: state.reducedMotion ? 0.01 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <ConventionalRoomScene impactId={impactId} selected={selected} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.72)_48%,rgba(255,255,255,0.52)_100%)]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-30">
        {controlRoomChallenges.map((hotspot) => (
          <HotspotButton
            hotspot={hotspot}
            isSelected={hotspot.id === selected.id}
            key={hotspot.id}
            onSelect={selectHotspot}
          />
        ))}
      </div>

      <section className="pointer-events-none absolute left-8 top-[13%] z-20 max-w-[500px] md:left-12 lg:left-16">
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          initial={{ opacity: 0, y: state.reducedMotion ? 0 : 12 }}
          transition={{ duration: state.reducedMotion ? 0.01 : 0.55, delay: 0.15 }}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-balance text-[clamp(2.1rem,3.25cqw,4rem)] font-semibold leading-[1.04] text-control-text"
          initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
          transition={{ duration: state.reducedMotion ? 0.01 : 0.72, delay: 0.28 }}
        >
          Critical Operations. Human Decisions.
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 max-w-[500px] text-sm leading-6 text-control-soft md:text-base"
          initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
          transition={{ duration: state.reducedMotion ? 0.01 : 0.65, delay: 0.42 }}
        >
          Select pressure points inside a conventional control room to see how the environment can
          slow people down when decisions matter.
        </motion.p>
      </section>

      <ProblemPanel
        hotspot={selected}
        impactActive={impactId === selected.id}
        onImpact={() => setImpactId((current) => (current === selected.id ? null : selected.id))}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      <div className="absolute bottom-[16%] left-8 z-20 flex max-w-[420px] flex-wrap items-center gap-3 md:left-12 lg:left-16">
        <button
          className="premium-action px-5 py-3"
          onClick={revealNewApproach}
          type="button"
        >
          Reveal the Intelligent Room
          <ChevronRight aria-hidden="true" size={16} />
        </button>
        <p className="max-w-sm text-xs leading-5 text-control-muted">
          Moves directly to the intelligent-control-room chapter.
        </p>
      </div>

      <TechnicalDrawer
        hotspot={selected}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </article>
  );
}

function HotspotButton({
  hotspot,
  isSelected,
  onSelect,
}: {
  hotspot: ChallengeHotspot;
  isSelected: boolean;
  onSelect: (hotspot: ChallengeHotspot) => void;
}) {
  return (
    <button
      aria-label={`Inspect ${hotspot.title}`}
      className="pointer-events-auto absolute z-30 -translate-x-1/2 -translate-y-1/2"
      onClick={() => onSelect(hotspot)}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      type="button"
    >
      <span
        className={`hotspot-marker ${isSelected ? "hotspot-marker-active" : ""}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
    </button>
  );
}

function ProblemPanel({
  hotspot,
  impactActive,
  onImpact,
  onOpenDrawer,
}: {
  hotspot: ChallengeHotspot;
  impactActive: boolean;
  onImpact: () => void;
  onOpenDrawer: () => void;
}) {
  const { state } = usePresentation();
  const voiceover = useVoiceover();
  const hotspotVoiceover = getVoiceover("hotspot", hotspot.id);
  const isSpeaking = voiceover.active?.id === hotspotVoiceover?.id && voiceover.status === "playing";

  useEffect(() => {
    if (voiceover.active?.scope === "hotspot") {
      voiceover.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotspot.id]);

  return (
    <motion.aside
      animate={{ opacity: 1, x: 0 }}
      className="instrument-panel absolute right-8 top-[24%] z-40 w-[min(420px,30cqw)] p-5 text-control-text [@container_stage_(max-width:1023px)]:left-8 [@container_stage_(max-width:1023px)]:right-auto [@container_stage_(max-width:1023px)]:top-auto [@container_stage_(max-width:1023px)]:bottom-40 [@container_stage_(max-width:1023px)]:w-[calc(100%-4rem)]"
      initial={{ opacity: 0, x: state.reducedMotion ? 0 : 20 }}
      transition={{ duration: state.reducedMotion ? 0.01 : 0.55 }}
      key={hotspot.id}
    >
      <p className="text-xs uppercase tracking-[0.34em] text-control-warm">{hotspot.area}</p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight">{hotspot.title}</h2>
      <p className="mt-3 text-sm leading-6 text-control-soft">{hotspot.explanation}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          className="quiet-action px-3 py-2.5 text-sm"
          disabled={!hotspotVoiceover}
          onClick={() => {
            if (!hotspotVoiceover) return;
            if (isSpeaking) {
              voiceover.pause();
            } else if (voiceover.active?.id === hotspotVoiceover.id && voiceover.status === "paused") {
              voiceover.resume();
            } else {
              voiceover.play(hotspotVoiceover);
            }
          }}
          type="button"
        >
          {isSpeaking ? <Volume2 aria-hidden="true" size={16} /> : <Headphones aria-hidden="true" size={16} />}
          Listen
        </button>
        <button
          className={`quiet-action px-3 py-2.5 text-sm ${
            impactActive
              ? "!border-control-warm !text-control-warm"
              : ""
          }`}
          onClick={onImpact}
          type="button"
        >
          <Play aria-hidden="true" size={15} />
          Show Impact
        </button>
        <button
          className="quiet-action px-3 py-2.5 text-sm"
          onClick={onOpenDrawer}
          type="button"
        >
          <PanelRightOpen aria-hidden="true" size={16} />
          Engineering Notes
        </button>
      </div>
      <AnimatePresence>
        {impactActive ? (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 overflow-hidden border-t border-control-line/70 pt-3 text-xs leading-5 text-control-muted"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0, height: 0 }}
          >
            {hotspot.impact}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.aside>
  );
}

function TechnicalDrawer({
  hotspot,
  isOpen,
  onClose,
}: {
  hotspot: ChallengeHotspot;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          animate={{ x: 0 }}
          className="absolute bottom-28 right-8 top-[14%] z-50 w-[min(500px,88cqw)] border border-control-line bg-control-deep/96 p-6 shadow-control backdrop-blur"
          exit={{ x: "100%" }}
          initial={{ x: "100%" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            aria-label="Close technical detail"
            className="control-button absolute right-5 top-5 !h-10 !w-10"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={17} />
          </button>
          <p className="text-xs uppercase tracking-[0.4em] text-control-warm">Technical detail</p>
          <h3 className="mt-5 max-w-sm text-3xl font-semibold">{hotspot.title}</h3>
          <p className="mt-6 text-base leading-7 text-control-soft">{hotspot.technicalDetail}</p>
          <div className="mt-8 border-l border-control-warm/50 pl-5 text-sm leading-6 text-control-muted">
            This drawer is powered by structured hotspot data. Confirmed standards, calculations,
            diagrams and project examples can be added here without changing the scene component.
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function ConventionalRoomScene({
  selected,
  impactId,
}: {
  selected: ChallengeHotspot;
  impactId: string | null;
}) {
  const asset = getAsset("project-chandigarh-control-room");

  return (
    <div className="absolute inset-0">
      {asset?.src ? (
        <img alt={asset.alt ?? "Control room"} className="absolute inset-y-0 right-0 h-full w-[72%] object-cover opacity-34" src={asset.src} />
      ) : null}
      <div className="absolute left-[12%] top-[18%] h-[38%] w-[64%] border border-control-line/70 bg-white/34">
        <div className="absolute inset-5 grid grid-cols-4 gap-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              className={`border border-control-line bg-control-black/80 ${
                impactId === "information-overload" ? "animate-display-noise" : ""
              }`}
              key={index}
            >
              <div className="mx-3 mt-4 h-px bg-control-warm/35" />
              <div className="mx-3 mt-3 h-px bg-control-muted/20" />
              <div className="mx-3 mt-3 h-px w-2/3 bg-control-muted/15" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-[8%] top-[59%] h-[17%] w-[70%] border border-control-line/70 bg-white/58">
        <div className="absolute inset-x-10 top-1/2 h-px bg-control-line" />
        <div className="absolute left-[8%] top-[-18px] h-9 w-[11%] border border-control-line bg-control-panel" />
        <div className="absolute left-[25%] top-[-18px] h-9 w-[11%] border border-control-line bg-control-panel" />
        <div className="absolute left-[43%] top-[-18px] h-9 w-[11%] border border-control-line bg-control-panel" />
        <div className="absolute left-[61%] top-[-18px] h-9 w-[11%] border border-control-line bg-control-panel" />
      </div>
      <div
        className={`absolute left-[23%] top-[70%] h-[16%] w-[12%] border border-control-line bg-control-panel/70 ${
          impactId === "poor-ergonomics" || impactId === "operator-fatigue"
            ? "animate-ergonomic-strain"
            : ""
        }`}
      />
      <div className="absolute left-[44%] top-[80%] h-[5%] w-[24%] border border-control-line bg-white/68">
        <div
          className={`h-full bg-control-warm/20 ${
            impactId === "difficult-maintenance" ? "animate-maintenance-block" : ""
          }`}
        />
      </div>
      <div
        className={`absolute left-[70%] top-[47%] h-[23%] w-[16%] border border-control-line bg-control-panel/50 ${
          impactId === "fragmented-systems" ? "animate-fragmented-zone" : ""
        }`}
      />
      <div
        className={`absolute left-[59%] top-[64%] h-[2px] w-[18%] bg-control-warm/40 ${
          impactId === "slow-response" ? "animate-response-delay" : ""
        }`}
      />
      <div
        className={`absolute left-[14%] top-[31%] h-[32%] w-[16%] border border-control-line/80 ${
          impactId === "inconsistent-environments" ? "animate-inconsistent-light" : ""
        }`}
      />
      <div
        className={`absolute left-[78%] top-[73%] h-[13%] w-[13%] border border-control-line/70 ${
          impactId === "limited-scalability" ? "animate-scalability-limit" : ""
        }`}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 border border-control-warm/80 bg-control-warm/10"
        style={{
          height: "86px",
          left: `${selected.x}%`,
          top: `${selected.y}%`,
          width: "86px",
        }}
      />
    </div>
  );
}
