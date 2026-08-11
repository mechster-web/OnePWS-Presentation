import { enabledChapters } from "./chapters";
import { connectedIntelligenceFeatures } from "./connectedIntelligenceFeatures";
import { controlRoomChallenges } from "./controlRoomChallenges";
import { featureStories } from "./featureStories";
import { incidentSimulationSteps } from "./incidentSimulation";
import type { VoiceoverScope } from "./voiceovers";

export type SubtitleMeta = {
  id: string;
  scope: VoiceoverScope;
  ownerId: string;
  language: string;
  text: string;
  captionFile?: string;
};

export const subtitles: SubtitleMeta[] = [
  ...enabledChapters.map((chapter) => ({
    id: `subtitle-chapter-${chapter.id}-en`,
    scope: "chapter" as const,
    ownerId: chapter.id,
    language: "en",
    text: chapter.supportingMessage,
    captionFile: `/assets/subtitles/en/chapters/${chapter.order.toString().padStart(2, "0")}-${chapter.id}.vtt`,
  })),
  ...featureStories.map((feature) => ({
    id: `subtitle-feature-${feature.id}-en`,
    scope: "feature" as const,
    ownerId: feature.id,
    language: "en",
    text: feature.valueProposition,
    captionFile: `/assets/subtitles/en/features/${feature.id}.vtt`,
  })),
  ...controlRoomChallenges.map((hotspot) => ({
    id: `subtitle-hotspot-${hotspot.id}-en`,
    scope: "hotspot" as const,
    ownerId: hotspot.id,
    language: "en",
    text: hotspot.explanation,
    captionFile: `/assets/subtitles/en/hotspots/${hotspot.id}.vtt`,
  })),
  ...connectedIntelligenceFeatures.map((hotspot) => ({
    id: `subtitle-hotspot-${hotspot.id}-en`,
    scope: "hotspot" as const,
    ownerId: hotspot.id,
    language: "en",
    text: hotspot.benefit,
    captionFile: `/assets/subtitles/en/hotspots/${hotspot.id}.vtt`,
  })),
  ...incidentSimulationSteps.map((step) => ({
    id: `subtitle-simulation-${step.id}-en`,
    scope: "simulation" as const,
    ownerId: step.id,
    language: "en",
    text: step.operatorMessage,
    captionFile: `/assets/subtitles/en/simulation/${step.id}.vtt`,
  })),
];

export function getSubtitle(scope: VoiceoverScope, ownerId: string, language = "en") {
  return (
    subtitles.find(
      (subtitle) => subtitle.scope === scope && subtitle.ownerId === ownerId && subtitle.language === language,
    ) ?? null
  );
}
