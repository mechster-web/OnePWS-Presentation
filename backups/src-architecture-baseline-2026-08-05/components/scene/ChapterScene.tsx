import { motion } from "framer-motion";
import { ChevronRight, Headphones } from "lucide-react";
import { getAsset } from "../../content/assetManifest";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { ConnectedIntelligenceChapter } from "./ConnectedIntelligenceChapter";
import { CredibilityChapter } from "./CredibilityChapter";
import { IncidentSimulationChapter } from "./IncidentSimulationChapter";
import { ProjectExperienceChapter } from "./ProjectExperienceChapter";

const sceneImageByChapterId: Record<string, string> = {
  "mission-critical-environments": "ambient-control-room",
  "onepws-positioning": "showroom-control-room",
  "journey-roadmap": "ambient-control-room",
  "group-and-growth": "sap-source",
  "control-room-definition": "project-itms-noida-control-room",
  "operator-challenges": "project-chandigarh-control-room",
  "human-centred-philosophy": "showroom-control-room",
  "console-portfolio": "ambient-control-room",
  "ergonomic-engineering": "project-itms-noida-control-room",
  "design-build-capability": "showroom-control-room",
  "manufacturing-quality": "manufacturing-equipment-source",
  "international-compliance": "sap-source",
  "why-onepws": "project-dfcc-control-room",
  closing: "ambient-control-room",
};

type Props = {
  chapter: Chapter;
};

export function ChapterScene({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const motionDuration = state.reducedMotion ? 0.01 : 0.72;

  if (chapter.id === "complete-ecosystem") {
    return <ConnectedIntelligenceChapter chapter={chapter} />;
  }

  if (chapter.id === "company-at-a-glance") {
    return <CredibilityChapter chapter={chapter} />;
  }

  if (chapter.id === "incident-response") {
    return <IncidentSimulationChapter chapter={chapter} />;
  }

  if (chapter.id === "project-portfolio") {
    return <ProjectExperienceChapter chapter={chapter} />;
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-white">
      <SceneArchitecture chapter={chapter} />

      <section className="absolute scene-content-safe grid grid-cols-[minmax(0,0.72fr)_minmax(30rem,1fr)] items-center gap-[min(4vw,4rem)] max-xl:grid-cols-1">
        <div className="scene-copy max-xl:max-w-[44rem]">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold uppercase tracking-[0.18em] text-control-warm"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.04 }}
          >
            {chapter.eyebrow}
          </motion.p>
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="scene-title mt-6 max-w-[13ch] text-balance font-extrabold tracking-normal text-control-text"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.12 }}
          >
            {chapter.headline}
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="scene-support mt-7 max-w-3xl text-control-soft"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.2 }}
          >
            {chapter.supportingMessage}
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 flex flex-wrap gap-3"
            initial={false}
            transition={{ duration: motionDuration, delay: 0.28 }}
          >
            <button
              className="premium-action px-5"
              onClick={() => dispatch({ type: "NEXT_CHAPTER" })}
              type="button"
            >
              Continue
              <ChevronRight aria-hidden="true" size={17} />
            </button>
            <button
              className="quiet-action px-5"
              onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
              type="button"
            >
              Explore Journey
            </button>
            {chapterVoiceover ? (
              <button
                className="quiet-action px-5"
                onClick={() => {
                  dispatch({ type: "UNLOCK_AUDIO" });
                  voiceover.play(chapterVoiceover);
                }}
                type="button"
              >
                <Headphones aria-hidden="true" size={17} />
                Listen
              </button>
            ) : null}
          </motion.div>
        </div>

        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 hidden 2xl:block"
          initial={false}
          transition={{ duration: motionDuration, delay: 0.18 }}
        >
          <div className="overflow-hidden border border-control-line bg-white shadow-control">
            <SceneImage chapter={chapter} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {chapter.beats.map((beat, index) => (
              <div
                className="border-l-2 border-control-warm/70 bg-white/70 py-3 pl-3 pr-2"
                key={beat.id}
              >
                <span className="text-xs font-semibold text-control-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-semibold text-control-text">{beat.label}</p>
              </div>
            ))}
          </div>

        </motion.aside>
      </section>
    </article>
  );
}

function SceneImage({ chapter }: { chapter: Chapter }) {
  const asset = getAsset(chapter.media?.fallbackImageAssetId ?? sceneImageByChapterId[chapter.id] ?? "ambient-control-room");

  return (
    <figure className="relative aspect-[16/10] bg-control-panel">
      {asset?.src ? (
        <img
          alt={asset.alt ?? chapter.visualNote}
          className="h-full w-full object-cover"
          draggable={false}
          src={asset.src}
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-sm text-control-muted">
          OnePWS visual
        </div>
      )}
      <div className="absolute inset-x-0 top-0 h-1.5 bg-control-warm" />
    </figure>
  );
}

function SceneArchitecture({ chapter }: { chapter: Chapter }) {
  const asset = getAsset(chapter.media?.fallbackImageAssetId ?? sceneImageByChapterId[chapter.id] ?? "ambient-control-room");

  return (
    <div className="absolute inset-0 overflow-hidden">
      {asset?.src ? (
        <img
          alt={asset.alt ?? chapter.visualNote}
          className="absolute inset-y-0 right-0 h-full w-[58%] object-cover opacity-35"
          draggable={false}
          src={asset.src}
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.92)_46%,rgba(255,255,255,0.72)_100%)]" />
      <div className="absolute right-[7%] top-[18%] h-[48%] w-[47%] border border-control-line/45 bg-white/30">
        <div className="absolute inset-7 grid grid-cols-4 grid-rows-3 gap-3 opacity-45">
          {Array.from({ length: 12 }).map((_, index) => (
            <div className="border border-control-line/55 bg-white/34" key={`${chapter.id}-panel-${index}`}>
              <div className="mx-5 mt-5 h-px bg-control-warm/30" />
              <div className="mx-5 mt-3 h-px w-2/3 bg-control-line/80" />
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-1/2 h-px w-full bg-control-warm/25" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-control-line/45" />
      </div>
      <div className="absolute bottom-[20%] right-[12%] h-[11%] w-[34%] border border-control-line/55 bg-white/58">
        <div className="absolute inset-x-8 top-1/2 h-px bg-control-warm/35" />
        <div className="absolute inset-y-4 left-[18%] w-px bg-control-line/80" />
        <div className="absolute inset-y-4 right-[18%] w-px bg-control-line/80" />
      </div>
    </div>
  );
}
