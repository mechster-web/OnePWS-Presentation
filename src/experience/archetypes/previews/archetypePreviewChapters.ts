import type { Chapter } from "../../../data/contentTypes";
import { sceneArchetypeLibrary } from "../archetypeLibrary";

export const archetypePreviewChapters: Chapter[] = sceneArchetypeLibrary.map((archetype, index) => ({
  id: `dev-preview-${archetype.id}`,
  order: index + 1,
  title: archetype.name,
  eyebrow: "Development Archetype Preview",
  headline: `${archetype.name} composition`,
  supportingMessage:
    "Synthetic preview content for internal validation only. Customer-facing chapter data is not changed by this gallery.",
  subtitle: `${archetype.name} internal preview`,
  narrative:
    "This scene demonstrates layout, navigation state, interaction readiness, motion fallback and density handling for the selected archetype.",
  supportingCopy:
    "Longer preview copy can be simulated in the gallery to validate text wrapping, focus order, caption layout and presenter pacing.",
  sceneType: archetype.id,
  mood: "assured",
  intensity: archetype.supportsMemoryMoment ? "peak" : "medium",
  chapterPurpose: archetype.supportedContentTypes.includes("closing") ? "closing" : "context",
  audience: archetype.suitableAudiences,
  interactionType: archetype.supportedInteractionTypes[0] ?? "guided-continue",
  transitionIn: archetype.supportedTransitions[0],
  transitionOut: archetype.supportedTransitions[1] ?? archetype.supportedTransitions[0],
  backgroundTreatment: archetype.differentiation.backgroundTreatment as Chapter["backgroundTreatment"],
  themeVariant: archetype.defaultTheme,
  navigationVisibility: archetype.defaultNavigationState,
  durationMs: Math.min(Math.max(30_000, archetype.recommendedDurationRange[0]), archetype.recommendedDurationRange[1]),
  visualNote: `${archetype.name} placeholder visual language. Replace with approved OnePWS assets during chapter migration.`,
  presenterTalkingPoint:
    "Presenter can advance, skip internal motion, jump to final state and continue without waiting for long animation.",
  technicalLayers: [
    "Operator focus",
    "Room intelligence",
    "Engineering clarity",
    "Presentation control",
    "Reduced-motion fallback",
  ],
  beats: [
    { id: "context", label: "Context", startsAtMs: 0, durationMs: 10_000, motionPreset: "fade" },
    { id: "focus", label: "Focus", startsAtMs: 10_000, durationMs: 10_000, motionPreset: "layerReveal" },
    { id: "response", label: "Response", startsAtMs: 20_000, durationMs: 10_000, motionPreset: "scan" },
  ],
  narration: {
    recommended: archetype.supportsNarration,
    assetId: undefined,
  },
  hotspots: archetype.supportsHotspots
    ? [
        { id: "focus", label: "Operator focus", description: "Preview hotspot" },
        { id: "systems", label: "Room systems", description: "Preview hotspot" },
        { id: "response", label: "Response", description: "Preview hotspot" },
      ]
    : [],
  callToAction: { label: "Continue" },
  duration: 30_000,
  presenterNotes: "Internal preview only.",
  optionalNextDestinations: [],
  experience: {
    energyLevel: archetype.supportsMemoryMoment ? 5 : 3,
    informationDensity: archetype.informationDensityRange[0] as 1 | 2 | 3 | 4 | 5,
    interactionLevel: archetype.interactionLevelRange[0] as 0 | 1 | 2 | 3 | 4 | 5,
    visualIntensity: archetype.supportsMemoryMoment ? 5 : 3,
    recommendedDurationMs: 30_000,
    narrationRecommended: archetype.supportsNarration,
    userInputExpected: archetype.interactionLevelRange[1] > 1,
    memoryMoment: archetype.supportsMemoryMoment,
    skippableInAutoplay: true,
    optionalInPresenterMode: true,
  },
  redesignStatus: "redesigned",
}));
