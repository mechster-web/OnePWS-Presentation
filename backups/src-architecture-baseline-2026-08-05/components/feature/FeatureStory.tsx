import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAdjacentFeatureStories,
  type FeatureStory as FeatureStoryData,
  type FeatureStoryId,
} from "../../content/featureStories";
import { getVoiceover } from "../../content/voiceovers";
import { layerTransition, motionDuration, motionEase } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  feature: FeatureStoryData;
  onClose: () => void;
  onNavigate: (featureId: FeatureStoryId) => void;
};

export function FeatureStory({ feature, onClose, onNavigate }: Props) {
  const { dispatch, state } = usePresentation();
  const voiceover = useVoiceover();
  const [isPlaying, setIsPlaying] = useState(true);
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const adjacent = getAdjacentFeatureStories(feature.id);
  const featureVoiceover = getVoiceover("feature", feature.id);
  const featureVoiceoverActive = voiceover.active?.id === featureVoiceover?.id;
  const isBookmarked = state.bookmarkedFeatureIds.includes(feature.id);

  useEffect(() => {
    dispatch({ type: "MARK_FEATURE_EXPLORED", featureId: feature.id });
    setIsPlaying(true);
    setTechnicalOpen(false);
    if (voiceover.active?.scope === "feature") {
      voiceover.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, feature.id]);

  return (
    <motion.section
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-40 bg-control-black text-control-text"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_42%_28%,rgba(216,163,74,0.12),transparent_30%),linear-gradient(90deg,rgba(9,10,12,0.94)_0%,rgba(9,10,12,0.58)_52%,rgba(9,10,12,0.9)_100%)]" />
      <div className="absolute inset-0 control-grid opacity-25" />
      <FeatureHeroVisual feature={feature} isPlaying={isPlaying} replayKey={replayKey} />

      <button
        aria-label="Return to control-room overview"
        className="control-button absolute right-24 top-16 z-30 !h-12 !w-12"
        onClick={() => {
          if (voiceover.active?.scope === "feature") {
            voiceover.stop();
          }
          onClose();
        }}
        type="button"
      >
        <X aria-hidden="true" size={18} />
      </button>

      <section className="absolute bottom-[18%] left-8 z-20 max-w-[680px] md:left-14 lg:left-20">
        <p className="text-xs uppercase tracking-[0.42em] text-control-warm">Feature story</p>
        <h2 className="mt-4 text-balance text-[clamp(2.25rem,4.3vw,5.35rem)] font-semibold leading-[0.98]">
          {feature.headline}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-control-soft">
          {feature.valueProposition}
        </p>
        <div className="mt-5 grid max-w-3xl gap-3 md:grid-cols-3">
          {feature.operationalBenefits.map((benefit) => (
            <div className="border-t border-control-line pt-3 text-sm leading-6 text-control-muted" key={benefit}>
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <aside className="instrument-panel absolute right-8 top-[20%] z-20 hidden w-[390px] p-5 xl:block">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Operational value</p>
        <p className="mt-3 text-sm leading-6 text-control-soft">{feature.operationalValue}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.34em] text-control-warm">User benefit</p>
        <p className="mt-3 text-sm leading-6 text-control-soft">{feature.userBenefit}</p>
        <p className="mt-5 text-xs uppercase tracking-[0.34em] text-control-warm">
          Architectural integration
        </p>
        <p className="mt-3 text-sm leading-6 text-control-soft">{feature.architecturalIntegration}</p>
        <div className="mt-5 border-t border-control-line pt-4">
          <p className="text-xs uppercase tracking-[0.3em] text-control-warm">Related project</p>
          <p className="mt-3 text-sm font-medium text-control-text">{feature.relatedProject.name}</p>
          <p className="mt-2 text-xs leading-5 text-control-muted">{feature.relatedProject.note}</p>
        </div>
      </aside>

      <div className="absolute inset-x-8 bottom-7 z-30 flex items-center justify-between gap-3 md:inset-x-12">
        <div className="flex flex-wrap gap-2">
          <button aria-label={isPlaying ? "Pause feature motion" : "Play feature motion"} className="control-button" onClick={() => setIsPlaying((playing) => !playing)} type="button">
            {isPlaying ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
          </button>
          <button
            aria-label="Replay product animation"
            className="control-button"
            onClick={() => {
              setReplayKey((key) => key + 1);
              setIsPlaying(true);
              if (featureVoiceoverActive) {
                voiceover.replay();
              }
            }}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={18} />
          </button>
          <button aria-label="Mute voiceover" className="control-button" onClick={voiceover.toggleMute} type="button">
            {voiceover.muted ? <VolumeX aria-hidden="true" size={18} /> : <Volume2 aria-hidden="true" size={18} />}
          </button>
          <button
            className="quiet-action px-4 py-3 text-sm"
            disabled={!featureVoiceover}
            onClick={() => {
              if (!featureVoiceover) return;
              if (featureVoiceoverActive && voiceover.status === "playing") {
                voiceover.pause();
              } else if (featureVoiceoverActive && voiceover.status === "paused") {
                voiceover.resume();
              } else {
                voiceover.play(featureVoiceover);
              }
            }}
            type="button"
          >
            {featureVoiceoverActive && voiceover.status === "playing" ? (
              <Volume2 aria-hidden="true" size={16} />
            ) : (
              <Headphones aria-hidden="true" size={16} />
            )}
            {featureVoiceoverActive && voiceover.status === "playing" ? "Pause narration" : "Listen"}
          </button>
          <button
            className="quiet-action px-4 py-3 text-sm"
            onClick={() => setTechnicalOpen((open) => !open)}
            type="button"
          >
            Engineering Notes
          </button>
          <button
            className={`quiet-action px-4 py-3 text-sm ${
              isBookmarked
                ? "!border-control-warm !text-control-warm"
                : ""
            }`}
            onClick={() => dispatch({ type: "TOGGLE_FEATURE_BOOKMARK", featureId: feature.id })}
            type="button"
          >
            {isBookmarked ? <BookmarkCheck aria-hidden="true" size={16} /> : <Bookmark aria-hidden="true" size={16} />}
            {isBookmarked ? "Saved" : "Save"}
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="quiet-action px-4 py-3 text-sm"
            onClick={() => onNavigate(adjacent.previous.id)}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Previous layer
          </button>
          <button
            className="quiet-action px-4 py-3 text-sm"
            onClick={() => onNavigate(adjacent.next.id)}
            type="button"
          >
            Next layer
            <ArrowRight aria-hidden="true" size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {technicalOpen ? (
          <motion.aside
            animate={{ x: 0 }}
            className="absolute bottom-28 right-8 top-[14%] z-50 w-[min(500px,88vw)] border border-control-line bg-control-deep/96 p-6 shadow-control backdrop-blur"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            transition={{ duration: state.reducedMotion ? 0.01 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              aria-label="Close technical details"
              className="control-button absolute right-5 top-5 !h-10 !w-10"
              onClick={() => setTechnicalOpen(false)}
              type="button"
            >
              <X aria-hidden="true" size={17} />
            </button>
            <p className="text-xs uppercase tracking-[0.4em] text-control-warm">Engineering Notes</p>
            <h3 className="mt-5 max-w-sm text-3xl font-semibold">{feature.title}</h3>
            <ul className="mt-7 space-y-4 text-sm leading-6 text-control-soft">
              {feature.technicalDetails.map((detail) => (
                <li className="border-l border-control-warm/40 pl-4" key={detail}>
                  {detail}
                </li>
              ))}
            </ul>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <div aria-hidden="true" className="hidden">
        {feature.presenterNotes}
      </div>
    </motion.section>
  );
}

function FeatureHeroVisual({
  feature,
  isPlaying,
  replayKey,
}: {
  feature: FeatureStoryData;
  isPlaying: boolean;
  replayKey: number;
}) {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[50%] top-[14%] h-[48%] w-[38%] border border-control-line/70 bg-control-panel/34">
        <div className="absolute inset-6 border border-control-line/60" />
        <motion.div
          animate={isPlaying ? { scaleX: 1, opacity: 0.68 } : { opacity: 0.32 }}
          className="absolute left-10 top-12 h-px w-[78%] origin-left bg-control-warm/70"
          key={`${feature.id}-line-${replayKey}`}
          initial={{ scaleX: 0.18, opacity: 0.18 }}
          transition={{ duration: motionDuration.layer, ease: motionEase.mechanical }}
        />
        <motion.div
          animate={isPlaying ? { y: -6, opacity: 0.58 } : { y: 0, opacity: 0.28 }}
          className="absolute bottom-14 left-[18%] h-[28%] w-[62%] border border-control-warm/50 bg-control-warm/10"
          key={`${feature.id}-module-${replayKey}`}
          transition={{ ...layerTransition(false), duration: 0.72 }}
        />
      </div>
      <div className="absolute bottom-[18%] right-[13%] h-[12%] w-[34%] border border-control-line bg-control-black/65">
        <div className="absolute inset-x-9 top-1/2 h-px bg-control-warm/35" />
      </div>
      <p className="absolute bottom-[32%] right-[13%] max-w-sm text-xs uppercase tracking-[0.3em] text-control-muted">
        {feature.media.videoAssetId
          ? "Product video"
          : feature.media.animationLabel}
      </p>
    </div>
  );
}
