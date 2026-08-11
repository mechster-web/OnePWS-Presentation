import { experienceRedesignFlags } from "../../config/experience-redesign";
import { enabledChapters } from "../../content/chapters";
import type { DirectedExperienceState } from "../../experience/ExperienceDirector";
import { movementForChapter } from "../../experience/final-experience/ExperienceFlowEngine";
import { scoreExperience } from "../../experience/final-experience/ExperienceScore";
import { buildNavigationModel } from "../../navigation/navigationModel";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  director: DirectedExperienceState;
};

export function ExperienceDebugOverlay({ director }: Props) {
  const { state } = usePresentation();
  const voiceover = useVoiceover();
  const navigation = buildNavigationModel(state);
  const movement = movementForChapter(state.chapterId);
  const score = scoreExperience(enabledChapters);
  const enabled =
    experienceRedesignFlags.enableDevelopmentOverlay ||
    experienceRedesignFlags.forceDevelopmentOverlayInProduction;

  if (!enabled || !state.developmentOverlayActive) {
    return null;
  }

  const chapter = director.currentChapter;
  const mediaIds = [
    chapter.media?.backgroundVideoAssetId,
    chapter.media?.fallbackImageAssetId,
    chapter.media?.narrationAssetId,
  ].filter(Boolean);

  return (
    <aside className="pointer-events-none absolute left-4 top-4 z-[90] w-[min(28rem,calc(100%-2rem))] border border-control-warm/70 bg-black/82 p-4 font-mono text-[11px] leading-5 text-white shadow-control">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-control-warm">
        Experience Director
      </p>
      <DebugRow label="Chapter" value={chapter.id} />
      <DebugRow label="Scene" value={chapter.sceneType ?? "unset"} />
      <DebugRow
        label="Journey"
        value={[director.selectedCustomerJourney.industry, director.selectedCustomerJourney.role]
          .filter(Boolean)
          .join(" / ") || "default"}
      />
      <DebugRow label="Mode" value={director.presentationMode} />
      <DebugRow label="Interaction" value={chapter.interactionType ?? "unset"} />
      <DebugRow label="Energy" value={String(chapter.experience?.energyLevel ?? "unset")} />
      <DebugRow label="Visual" value={String(chapter.experience?.visualIntensity ?? "unset")} />
      <DebugRow label="Narration" value={`${voiceover.status} / ${director.narrationState.enabled ? "on" : "off"}`} />
      <DebugRow label="Media" value={mediaIds.join(", ") || "none"} />
      <DebugRow label="Previous" value={director.previousChapter?.id ?? "none"} />
      <DebugRow label="Next" value={director.nextChapter?.id ?? "none"} />
      <DebugRow label="Status" value={chapter.redesignStatus ?? "legacy"} />
      <DebugRow label="Nav mode" value={state.mode === "autoPlay" ? "autoplay-active" : state.mode === "presenter" ? "presenter-active" : "exploring"} />
      <DebugRow label="Journey" value={navigation.journey.id} />
      <DebugRow label="Route pos" value={`${navigation.routePosition + 1}/${navigation.route.length}`} />
      <DebugRow label="Return" value={state.branchStack.at(-1)?.returnDestination ?? "none"} />
      <DebugRow label="Complete" value={navigation.currentDestination.completionState} />
      <DebugRow label="Remain" value={`${Math.round(navigation.remainingDurationMs / 60_000)} min`} />
      <DebugRow label="Warnings" value={navigation.warnings.map((warning) => warning.code).join(", ") || "none"} />
      <DebugRow label="Emotion" value={movement?.design.emotionalGoal ?? "unset"} />
      <DebugRow label="Camera" value={movement?.design.camera ?? "unset"} />
      <DebugRow label="Connect" value={movement?.connectionToNext ?? "unset"} />
      <DebugRow label="Score" value={`${score.overall}/100`} />
    </aside>
  );
}

function DebugRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2">
      <span className="text-white/55">{label}</span>
      <span className="break-words text-white">{value}</span>
    </div>
  );
}
