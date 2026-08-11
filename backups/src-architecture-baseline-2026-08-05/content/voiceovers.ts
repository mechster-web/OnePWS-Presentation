import { enabledChapters } from "./chapters";
import { connectedIntelligenceFeatures } from "./connectedIntelligenceFeatures";
import { controlRoomChallenges } from "./controlRoomChallenges";
import { featureStories } from "./featureStories";
import { incidentSimulationSteps } from "./incidentSimulation";
import { getSubtitle } from "./subtitles";

export type VoiceoverScope = "chapter" | "feature" | "hotspot" | "simulation" | "project";

export type VoiceoverMeta = {
  id: string;
  scope: VoiceoverScope;
  ownerId: string;
  title: string;
  language: string;
  plannedFile: string;
  src?: string;
  durationMs: number;
  recommendedDuration: string;
  subtitle?: string;
  fallbackText: string;
};

const chapterVoiceoverText: Record<string, string> = {
  "opening-cover":
    "OnePWS Private Limited presents a focused capability journey for mission-critical control-room environments, from consoles and ergonomics to design-build delivery.",
  "mission-critical-environments":
    "Control rooms are mission-critical environments. They support continuous monitoring, coordination and decisions in high-stakes operations.",
  "onepws-positioning":
    "OnePWS is positioned around three connected capabilities: control-room consoles, ergonomic engineering and integrated design-build environments.",
  "journey-roadmap":
    "The main journey remains concise, while product detail, project proof, company credentials and technical reference layers open only when selected.",
};

function slug(value: string) {
  return value.replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").toLowerCase();
}

export const voiceovers: VoiceoverMeta[] = [
  ...enabledChapters.map((chapter) => ({
    id: `chapter-${chapter.id}-en`,
    scope: "chapter" as const,
    ownerId: chapter.id,
    title: chapter.title,
    language: "en",
    plannedFile: `/assets/audio/en/chapters/${chapter.order.toString().padStart(2, "0")}-${chapter.id}.mp3`,
    durationMs: Math.min(Math.max(chapter.durationMs, 20_000), 45_000),
    recommendedDuration: "20-45 seconds",
    subtitle: getSubtitle("chapter", chapter.id)?.text ?? chapter.supportingMessage,
    fallbackText: chapterVoiceoverText[chapter.id] ?? chapter.supportingMessage,
  })),
  ...featureStories.map((feature) => ({
    id: `feature-${feature.id}-en`,
    scope: "feature" as const,
    ownerId: feature.id,
    title: feature.title,
    language: "en",
    plannedFile: `/assets/audio/en/features/${slug(feature.id)}.mp3`,
    durationMs: 24_000,
    recommendedDuration: "15-30 seconds",
    subtitle: getSubtitle("feature", feature.id)?.text ?? feature.valueProposition,
    fallbackText: feature.voiceoverText,
  })),
  ...controlRoomChallenges.map((hotspot) => ({
    id: `hotspot-${hotspot.id}-en`,
    scope: "hotspot" as const,
    ownerId: hotspot.id,
    title: hotspot.title,
    language: "en",
    plannedFile: `/assets/audio/en/hotspots/${slug(hotspot.id)}.mp3`,
    durationMs: 12_000,
    recommendedDuration: "8-15 seconds",
    subtitle: getSubtitle("hotspot", hotspot.id)?.text ?? hotspot.explanation,
    fallbackText: hotspot.voiceover,
  })),
  ...connectedIntelligenceFeatures.map((hotspot) => ({
    id: `hotspot-${hotspot.id}-en`,
    scope: "hotspot" as const,
    ownerId: hotspot.id,
    title: hotspot.name,
    language: "en",
    plannedFile: `/assets/audio/en/hotspots/${slug(hotspot.id)}.mp3`,
    durationMs: 12_000,
    recommendedDuration: "8-15 seconds",
    subtitle: getSubtitle("hotspot", hotspot.id)?.text ?? hotspot.benefit,
    fallbackText: hotspot.voiceover,
  })),
  ...incidentSimulationSteps.map((step) => ({
    id: `simulation-${step.id}-en`,
    scope: "simulation" as const,
    ownerId: step.id,
    title: step.title,
    language: "en",
    plannedFile: `/assets/audio/en/simulation/${slug(step.id)}.mp3`,
    durationMs: 12_000,
    recommendedDuration: "8-15 seconds",
    subtitle: getSubtitle("simulation", step.id)?.text ?? step.operatorMessage,
    fallbackText: step.narration,
  })),
];

export function getVoiceover(scope: VoiceoverScope, ownerId: string, language = "en") {
  return (
    voiceovers.find(
      (voiceover) =>
        voiceover.scope === scope && voiceover.ownerId === ownerId && voiceover.language === language,
    ) ?? null
  );
}
