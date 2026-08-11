import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Eye,
  EyeOff,
  Headphones,
  Info,
  Maximize2,
  Route,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getAsset } from "../../content/assetManifest";
import {
  connectedIntelligenceFeatures,
  connectedIntelligenceVisual,
  type ConnectedFeature,
} from "../../content/connectedIntelligenceFeatures";
import { getFeatureStory, type FeatureStoryId } from "../../content/featureStories";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { entrance, revealTransition, spatialTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { FeatureStory } from "../feature/FeatureStory";

type Props = {
  chapter: Chapter;
};

export function ConnectedIntelligenceChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const voiceover = useVoiceover();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [exploreId, setExploreId] = useState<FeatureStoryId | null>(null);
  const [hotspotsVisible, setHotspotsVisible] = useState(true);
  const [tourActive, setTourActive] = useState(false);
  const roomImage = getAsset(connectedIntelligenceVisual.assetId);
  const orderedFeatures = useMemo(
    () => [...connectedIntelligenceFeatures].sort((a, b) => a.tourOrder - b.tourOrder),
    [],
  );
  const activeFeature = useMemo(
    () => connectedIntelligenceFeatures.find((feature) => feature.id === activeId) ?? null,
    [activeId],
  );
  const activeTourIndex = activeFeature
    ? orderedFeatures.findIndex((feature) => feature.id === activeFeature.id)
    : -1;
  const exploredFeature = getFeatureStory(exploreId);

  useEffect(() => {
    if (tourActive && !activeFeature) {
      setActiveId(orderedFeatures[0]?.id ?? null);
    }
  }, [activeFeature, orderedFeatures, tourActive]);

  function listenToHotspot(feature: ConnectedFeature) {
    const hotspotVoiceover = getVoiceover("hotspot", feature.id);
    if (!hotspotVoiceover) {
      return;
    }

    dispatch({ type: "UNLOCK_AUDIO" });

    if (voiceover.active?.id === hotspotVoiceover.id && voiceover.status === "playing") {
      voiceover.pause();
      return;
    }

    if (voiceover.active?.id === hotspotVoiceover.id && voiceover.status === "paused") {
      voiceover.resume();
      return;
    }

    voiceover.play(hotspotVoiceover);
  }

  function startTour() {
    setHotspotsVisible(true);
    setTourActive(true);
    setActiveId(orderedFeatures[0]?.id ?? null);
  }

  function exploreFreely() {
    setHotspotsVisible(true);
    setTourActive(false);
  }

  function moveTour(direction: 1 | -1) {
    const fallbackIndex = direction === 1 ? 0 : orderedFeatures.length - 1;
    const currentIndex = activeTourIndex >= 0 ? activeTourIndex : fallbackIndex;
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), orderedFeatures.length - 1);
    setActiveId(orderedFeatures[nextIndex]?.id ?? null);
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <ConnectedRoomVisual
        activeFeature={activeFeature}
        imageAlt={roomImage?.alt}
        imageSrc={roomImage?.src}
        reducedMotion={state.reducedMotion}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.62)_38%,rgba(255,255,255,0.2)_67%,rgba(255,255,255,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_64%_48%,rgba(207,31,43,0.08),transparent_34%)]" />

      <section className="absolute left-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.8rem)] z-20 max-w-[30rem]">
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          initial={false}
          transition={revealTransition(state.reducedMotion)}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          {...entrance.informationFocus(state.reducedMotion)}
          className="mt-3 text-balance text-[clamp(2.15rem,3.5vw,4.25rem)] font-semibold leading-[0.98] text-control-text"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.1)}
        >
          One Environment. Connected Intelligence.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-4 max-w-lg text-sm leading-6 text-control-soft"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.2)}
        >
          Select verified and internally planned control-room capabilities without leaving the full-room view.
        </motion.p>
      </section>

      <div className="absolute right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.8rem)] z-30 flex max-w-[25rem] flex-wrap justify-end gap-2">
        <button
          className="quiet-action min-h-10 px-3 text-sm"
          onClick={() => {
            setHotspotsVisible((visible) => !visible);
            if (hotspotsVisible) {
              setTourActive(false);
              setActiveId(null);
            }
          }}
          type="button"
        >
          {hotspotsVisible ? <EyeOff aria-hidden="true" size={17} /> : <Eye aria-hidden="true" size={17} />}
          {hotspotsVisible ? "Hide hotspots" : "Show hotspots"}
        </button>
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={startTour} type="button">
          <Route aria-hidden="true" size={17} />
          Guided hotspot tour
        </button>
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={exploreFreely} type="button">
          Explore freely
        </button>
      </div>

      <AnimatePresence>
        {hotspotsVisible ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={revealTransition(state.reducedMotion)}
          >
            {orderedFeatures.map((feature) => (
              <FeatureHotspot
                feature={feature}
                isActive={activeId === feature.id}
                key={feature.id}
                onActivate={(id) => {
                  setActiveId(id);
                  if (!tourActive) {
                    setTourActive(false);
                  }
                }}
                reducedMotion={state.reducedMotion}
              />
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-[calc(var(--stage-safe-y)+5.2rem)] left-[var(--stage-safe-x)] z-20 flex max-w-[31rem] flex-wrap gap-2">
        {orderedFeatures.slice(0, 8).map((feature) => (
          <button
            className={`pointer-events-auto h-2.5 w-9 border transition ${
              feature.id === activeFeature?.id
                ? "border-control-warm bg-control-warm"
                : "border-control-line bg-control-line/45 hover:border-control-warm"
            }`}
            key={feature.id}
            onClick={() => {
              setHotspotsVisible(true);
              setActiveId(feature.id);
            }}
            type="button"
            aria-label={`Select ${feature.name}`}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeFeature ? (
          <FeatureFocusPanel
            activeTourIndex={activeTourIndex}
            feature={activeFeature}
            isTourActive={tourActive}
            key={activeFeature.id}
            onClose={() => {
              setActiveId(null);
              setTourActive(false);
            }}
            onExplore={() => setExploreId(activeFeature.featureStoryId)}
            onListen={() => listenToHotspot(activeFeature)}
            onTechnical={() =>
              dispatch({
                type: "SET_OVERLAY",
                overlay: {
                  type: "technical",
                  chapterId: chapter.id,
                  layer: activeFeature.name,
                },
              })
            }
            onTourMove={moveTour}
            totalFeatures={orderedFeatures.length}
          />
        ) : null}
      </AnimatePresence>

      {!activeFeature ? (
        <div className="absolute bottom-[calc(var(--stage-safe-y)+5.2rem)] right-[var(--stage-safe-x)] z-20 max-w-[23rem] border-l border-control-warm bg-white/88 p-4 shadow-control backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Room system</p>
          <p className="mt-3 text-lg font-medium text-control-text">Sixteen selectable capability points.</p>
          <p className="mt-2 text-sm leading-6 text-control-muted">
            Start the guided tour or tap any marker to inspect the connected control-room layer.
          </p>
        </div>
      ) : null}

      <AnimatePresence>
        {exploredFeature ? (
          <FeatureStory
            feature={exploredFeature}
            key={exploredFeature.id}
            onClose={() => setExploreId(null)}
            onNavigate={setExploreId}
          />
        ) : null}
      </AnimatePresence>
    </article>
  );
}

function FeatureHotspot({
  feature,
  isActive,
  onActivate,
  reducedMotion,
}: {
  feature: ConnectedFeature;
  isActive: boolean;
  onActivate: (id: string) => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.button
      animate={{ opacity: 1, scale: 1 }}
      aria-label={`Inspect ${feature.name}`}
      className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 touch-manipulation ${
        isActive ? "z-40" : ""
      }`}
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.72 }}
      onClick={() => onActivate(feature.id)}
      onFocus={() => onActivate(feature.id)}
      onMouseEnter={() => onActivate(feature.id)}
      style={{ left: `${feature.x}%`, top: `${feature.y}%` }}
      transition={{
        duration: reducedMotion ? 0.01 : 0.34,
        delay: reducedMotion ? 0 : feature.tourOrder * 0.035,
      }}
      type="button"
    >
      <span className={`hotspot-marker ${isActive ? "hotspot-marker-active" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      <span className="sr-only">{feature.shortName}</span>
    </motion.button>
  );
}

function FeatureFocusPanel({
  activeTourIndex,
  feature,
  isTourActive,
  onClose,
  onExplore,
  onListen,
  onTechnical,
  onTourMove,
  totalFeatures,
}: {
  activeTourIndex: number;
  feature: ConnectedFeature;
  isTourActive: boolean;
  onClose: () => void;
  onExplore: () => void;
  onListen: () => void;
  onTechnical: () => void;
  onTourMove: (direction: 1 | -1) => void;
  totalFeatures: number;
}) {
  return (
    <motion.aside
      animate={{ opacity: 1, x: 0 }}
      className="architectural-panel absolute bottom-[calc(var(--stage-safe-y)+5.4rem)] right-[var(--stage-safe-x)] z-40 w-[min(33rem,36vw)] p-5 shadow-control"
      exit={{ opacity: 0, x: 18 }}
      initial={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.24 }}
    >
      <button
        aria-label="Close hotspot detail"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center border border-control-line text-control-muted transition hover:border-control-warm hover:text-control-text"
        onClick={onClose}
        type="button"
      >
        <X aria-hidden="true" size={17} />
      </button>
      <div className="pr-12">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">
          {String(feature.tourOrder).padStart(2, "0")} / {feature.group}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-control-text">{feature.name}</h2>
        <p className="mt-2 text-sm leading-6 text-control-soft">{feature.benefit}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={onListen} type="button">
          <Headphones aria-hidden="true" size={16} />
          Listen
        </button>
        <button className="premium-action min-h-10 px-3 text-sm" onClick={onExplore} type="button">
          <Maximize2 aria-hidden="true" size={16} />
          Explore
        </button>
        <button className="quiet-action min-h-10 px-3 text-sm" onClick={onTechnical} type="button">
          <Wrench aria-hidden="true" size={16} />
          Technical details
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-control-line/70 pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-control-warm">Value</p>
          <p className="mt-2 text-xs leading-5 text-control-muted">{feature.operationalValue}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-control-warm">Integration</p>
          <p className="mt-2 text-xs leading-5 text-control-muted">{feature.architecturalIntegration}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-4">
        <div>
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-control-muted">
            <Info aria-hidden="true" size={14} />
            {feature.sourceStatus === "verified" ? "OnePWS capability" : "Concept layer"}
          </p>
          <p className="mt-2 text-sm leading-6 text-control-soft">
            {feature.relatedProject
              ? `${feature.relatedProject.name}: ${feature.relatedProject.note.replace(/confirmation required/gi, "reviewed with the OnePWS team")}`
              : "Related project references can be discussed with the OnePWS team."}
          </p>
        </div>
        {isTourActive ? (
          <div className="flex gap-2">
            <button
              className="control-button"
              disabled={activeTourIndex <= 0}
              onClick={() => onTourMove(-1)}
              type="button"
              aria-label="Previous hotspot"
            >
              <ChevronRight aria-hidden="true" className="rotate-180" size={17} />
            </button>
            <button
              className="control-button"
              disabled={activeTourIndex >= totalFeatures - 1}
              onClick={() => onTourMove(1)}
              type="button"
              aria-label="Next hotspot"
            >
              <ChevronRight aria-hidden="true" size={17} />
            </button>
          </div>
        ) : null}
      </div>
    </motion.aside>
  );
}

function ConnectedRoomVisual({
  activeFeature,
  imageAlt,
  imageSrc,
  reducedMotion,
}: {
  activeFeature: ConnectedFeature | null;
  imageAlt?: string;
  imageSrc?: string;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      animate={{ scale: activeFeature ? 1.012 : 1, x: activeFeature ? -5 : 0 }}
      className="absolute inset-0"
      transition={spatialTransition(reducedMotion)}
    >
      {imageSrc ? (
        <img
          alt={imageAlt ?? "OnePWS control-room environment"}
          className="absolute inset-0 h-full w-full object-cover opacity-100"
          draggable={false}
          src={imageSrc}
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_35%,#2a3038_0%,#12161b_34%,#08090b_72%)]" />
      )}
      <div className="absolute inset-0 bg-white/14" />
      <div className="absolute left-[17%] top-[14%] h-[38%] w-[66%] border border-control-line/45 bg-white/10">
        <div className="absolute inset-5 grid grid-cols-5 gap-3 opacity-70">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="border border-control-line/55 bg-white/30" key={index}>
              <div className="mx-4 mt-5 h-px bg-control-warm/35" />
              <div className="mx-4 mt-4 h-px bg-control-muted/20" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-[21%] top-[55%] h-[16%] w-[43%] border border-control-line/60 bg-white/24">
        <div className="absolute inset-x-8 top-1/2 h-px bg-control-warm/35" />
        <div className="absolute left-[14%] top-[-16px] h-8 w-[17%] border border-control-line bg-control-panel" />
        <div className="absolute left-[42%] top-[-16px] h-8 w-[17%] border border-control-line bg-control-panel" />
        <div className="absolute left-[70%] top-[-16px] h-8 w-[17%] border border-control-line bg-control-panel" />
      </div>
      <div className="absolute left-[67%] top-[58%] h-[17%] w-[14%] border border-control-line bg-control-panel/55" />
      <div className="absolute left-[81%] top-[55%] h-[21%] w-[11%] border border-control-line bg-white/24" />
      <div className="absolute left-[12%] top-[32%] h-[38%] w-[5%] border border-control-line bg-control-panel/30" />
      <div className="absolute left-[18%] top-[79%] h-[4%] w-[66%] border border-control-line bg-white/34">
        <motion.div
          animate={
            reducedMotion
              ? { opacity: 0.14 }
              : { opacity: activeFeature ? 0.28 : 0.14, scaleX: activeFeature ? 1 : 0.62 }
          }
          className="h-full w-[18%] origin-left bg-control-warm/18"
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="absolute left-[20%] top-[20%] h-px w-[62%] bg-control-warm/25" />
      <div className="absolute left-[23%] top-[26%] h-px w-[55%] bg-control-warm/20" />
    </motion.div>
  );
}
