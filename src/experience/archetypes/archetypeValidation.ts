import type { Chapter } from "../../data/contentTypes";
import { sceneArchetypeLibrary, sceneArchetypeMap } from "./archetypeLibrary";
import type { ArchetypeValidationWarning, SceneArchetype } from "./types";

export function validateChapterForArchetype(chapter: Chapter): ArchetypeValidationWarning[] {
  const archetype = sceneArchetypeMap[chapter.sceneType ?? "chapter-title"];
  if (!archetype) {
    return [
      {
        archetypeId: chapter.sceneType ?? "chapter-title",
        chapterId: chapter.id,
        ruleId: "unknown-archetype",
        severity: "error",
        message: `Chapter ${chapter.id} references an unknown scene archetype.`,
      },
    ];
  }

  const warnings: ArchetypeValidationWarning[] = [];

  for (const field of archetype.requiredFields) {
    const value = chapter[field];
    if (value === undefined || value === null || value === "") {
      warnings.push({
        archetypeId: archetype.id,
        chapterId: chapter.id,
        ruleId: "required-fields",
        severity: "error",
        message: `${archetype.name} expects ${String(field)} on ${chapter.id}.`,
      });
    }
  }

  const density = chapter.experience?.informationDensity ?? 3;
  if (!inRange(density, archetype.informationDensityRange)) {
    warnings.push({
      archetypeId: archetype.id,
      chapterId: chapter.id,
      ruleId: "density-fit",
      severity: "warning",
      message: `${chapter.id} has density ${density}, outside ${archetype.name} range ${archetype.informationDensityRange.join("-")}.`,
    });
  }

  const interaction = chapter.experience?.interactionLevel ?? 1;
  if (!inRange(interaction, archetype.interactionLevelRange)) {
    warnings.push({
      archetypeId: archetype.id,
      chapterId: chapter.id,
      ruleId: "interaction-fit",
      severity: "warning",
      message: `${chapter.id} has interaction level ${interaction}, outside ${archetype.name} range ${archetype.interactionLevelRange.join("-")}.`,
    });
  }

  const duration = chapter.experience?.recommendedDurationMs ?? chapter.durationMs;
  if (!inRange(duration, archetype.recommendedDurationRange)) {
    warnings.push({
      archetypeId: archetype.id,
      chapterId: chapter.id,
      ruleId: "duration-fit",
      severity: "info",
      message: `${chapter.id} duration ${duration}ms is outside recommended ${archetype.recommendedDurationRange.join("-")}ms.`,
    });
  }

  warnings.push(...specificRules(chapter, archetype));

  if (import.meta.env.DEV && warnings.length > 0) {
    console.groupCollapsed(`[OnePWS archetype validation] ${chapter.id}`);
    warnings.forEach((warning) => console.warn(warning.message));
    console.groupEnd();
  }

  return warnings;
}

export function validateArchetypeDifferentiation() {
  const warnings: string[] = [];
  const keys = ["primaryLayout", "textPosition", "mediaPosition", "revealPattern", "backgroundTreatment"] as const;

  for (const key of keys) {
    const buckets = new Map<string, SceneArchetype[]>();
    for (const archetype of sceneArchetypeLibrary) {
      const value = archetype.differentiation[key];
      buckets.set(value, [...(buckets.get(value) ?? []), archetype]);
    }

    for (const [value, archetypes] of buckets.entries()) {
      if (archetypes.length > 3) {
        warnings.push(
          `${archetypes.length} archetypes share ${key} "${value}": ${archetypes.map((item) => item.id).join(", ")}`,
        );
      }
    }
  }

  if (import.meta.env.DEV && warnings.length > 0) {
    console.groupCollapsed("[OnePWS archetype differentiation]");
    warnings.forEach((warning) => console.warn(warning));
    console.groupEnd();
  }

  return warnings;
}

function specificRules(chapter: Chapter, archetype: SceneArchetype): ArchetypeValidationWarning[] {
  const warnings: ArchetypeValidationWarning[] = [];
  const copyLength = (chapter.supportingCopy ?? chapter.supportingMessage ?? "").length;
  const hotspotCount = chapter.hotspots?.length ?? chapter.technicalLayers.length;
  const mediaExists = Boolean(chapter.media?.fallbackImageAssetId || chapter.media?.backgroundVideoAssetId || chapter.visualNote);

  if (archetype.id === "cinematic-opening" && copyLength > 180) {
    warnings.push(rule(archetype, chapter, "opening-copy-length", "warning", "Cinematic openings should not show dense body copy."));
  }

  if (archetype.id === "product-hero" && !mediaExists) {
    warnings.push(rule(archetype, chapter, "dominant-media", "warning", "Product hero should provide dominant product media or a documented visual reference."));
  }

  if (archetype.id === "interactive-hotspot" && hotspotCount > 6) {
    warnings.push(rule(archetype, chapter, "hotspot-count", "warning", "Hotspot scenes should sequence or cluster more than six visible points."));
  }

  if (archetype.id === "before-after" && chapter.technicalLayers.length < 2) {
    warnings.push(rule(archetype, chapter, "comparison-states", "warning", "Before-after needs at least two states or labels."));
  }

  if (archetype.id === "data-story" && chapter.technicalLayers.length === 0) {
    warnings.push(rule(archetype, chapter, "data-context", "warning", "Data story needs a source, context or clearly labelled qualitative insight."));
  }

  if (archetype.id === "process-sequence" && chapter.beats.length < 2) {
    warnings.push(rule(archetype, chapter, "stage-order", "warning", "Process sequence needs ordered stages."));
  }

  if (archetype.id === "comparison" && chapter.technicalLayers.length < 2) {
    warnings.push(rule(archetype, chapter, "comparison-options", "warning", "Comparison needs at least two options or attributes."));
  }

  if (archetype.id === "customer-choice" && !chapter.callToAction && (chapter.optionalNextDestinations?.length ?? 0) === 0) {
    warnings.push(rule(archetype, chapter, "confirmation", "warning", "Customer choice should define confirmation or destinations."));
  }

  if (archetype.id === "voice-guided" && !chapter.supportingMessage) {
    warnings.push(rule(archetype, chapter, "silent-fallback", "warning", "Voice-guided scenes need visible copy and captions fallback."));
  }

  if (archetype.id === "cinematic-closing" && !chapter.callToAction) {
    warnings.push(rule(archetype, chapter, "closing-action", "warning", "Closing needs a clear next action or ending behaviour."));
  }

  return warnings;
}

function rule(
  archetype: SceneArchetype,
  chapter: Chapter,
  ruleId: string,
  severity: ArchetypeValidationWarning["severity"],
  message: string,
): ArchetypeValidationWarning {
  return { archetypeId: archetype.id, chapterId: chapter.id, ruleId, severity, message };
}

function inRange(value: number, range: [number, number]) {
  return value >= range[0] && value <= range[1];
}
