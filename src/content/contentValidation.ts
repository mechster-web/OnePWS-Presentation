import { assets } from "./assets";
import { autoPlayTimings } from "./autoplayTimings";
import { enabledChapters } from "./chapters";
import { credentialProofPoints, customerLogoReferences, strategicPartnerships } from "./credentials";
import { customerPathMappings } from "./customerPaths";
import { featureStories } from "./featureStories";
import { projects } from "./projects";
import { subtitles } from "./subtitles";
import { voiceovers } from "./voiceovers";

export type ContentValidationIssue = {
  severity: "error" | "warning";
  area: string;
  message: string;
};

function missing(value: unknown) {
  return value === undefined || value === null || value === "";
}

function duplicateValues(values: string[]) {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

export function validateContent(): ContentValidationIssue[] {
  const issues: ContentValidationIssue[] = [];

  if (enabledChapters.length === 0) {
    issues.push({ severity: "error", area: "Chapters", message: "At least one chapter must be enabled." });
  }

  const duplicateChapterIds = duplicateValues(enabledChapters.map((chapter) => chapter.id));
  if (duplicateChapterIds.length > 0) {
    issues.push({ severity: "error", area: "Chapters", message: `Duplicate chapter ids: ${duplicateChapterIds.join(", ")}` });
  }

  enabledChapters.forEach((chapter) => {
    ["title", "headline", "supportingMessage", "presenterTalkingPoint"].forEach((field) => {
      if (missing(chapter[field as keyof typeof chapter])) {
        issues.push({ severity: "error", area: "Chapters", message: `${chapter.id} is missing ${field}.` });
      }
    });

    const timing = autoPlayTimings.find((item) => item.chapterId === chapter.id);
    if (!timing) {
      issues.push({ severity: "warning", area: "Auto-play timings", message: `${chapter.id} uses fallback auto-play timing.` });
    }

    const voiceover = voiceovers.find((item) => item.scope === "chapter" && item.ownerId === chapter.id);
    if (!voiceover) {
      issues.push({ severity: "warning", area: "Voiceovers", message: `${chapter.id} has no chapter voiceover metadata.` });
    }
  });

  featureStories.forEach((feature) => {
    if (missing(feature.title) || missing(feature.headline) || missing(feature.valueProposition)) {
      issues.push({ severity: "error", area: "Features", message: `${feature.id} is missing title, headline or value proposition.` });
    }
    if (feature.technicalDetails.length === 0) {
      issues.push({ severity: "warning", area: "Technical details", message: `${feature.id} has no technical details.` });
    }
  });

  projects.forEach((project) => {
    if (missing(project.name) || missing(project.location.country)) {
      issues.push({ severity: "error", area: "Projects", message: `${project.id} is missing project name or country.` });
    }
  });

  if (credentialProofPoints.length === 0) {
    issues.push({ severity: "error", area: "Company proof", message: "Company proof points are empty." });
  }

  if (customerLogoReferences.length === 0) {
    issues.push({ severity: "warning", area: "Customer logos", message: "Customer logo references are empty." });
  }

  if (customerPathMappings.length === 0) {
    issues.push({ severity: "warning", area: "Industry / role mappings", message: "Customer path mappings are empty." });
  }

  strategicPartnerships.forEach((partner) => {
    if (missing(partner.partner) || missing(partner.summary)) {
      issues.push({ severity: "warning", area: "Strategic partnerships", message: "A partnership entry is incomplete." });
    }
  });

  subtitles.forEach((subtitle) => {
    if (missing(subtitle.text)) {
      issues.push({ severity: "warning", area: "Subtitles", message: `${subtitle.id} has empty subtitle text.` });
    }
  });

  assets.forEach((asset) => {
    if (asset.type === "image" && missing(asset.alt)) {
      issues.push({ severity: "warning", area: "Assets", message: `${asset.id} is missing alt text.` });
    }
  });

  return issues;
}
