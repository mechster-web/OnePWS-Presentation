import type { EvidenceExperience, EvidenceProofItem } from "./evidenceExperienceConfig";

export type EvidenceValidationIssue = {
  severity: "warning" | "error";
  chapterId: string;
  proofId: string;
  message: string;
};

export function validateEvidenceExperience(experiences: EvidenceExperience[]) {
  const issues: EvidenceValidationIssue[] = [];
  const seen = new Set<string>();

  experiences.forEach((experience) => {
    experience.proofItems.forEach((proof) => {
      const key = `${experience.chapterId}:${proof.id}`;
      if (seen.has(key)) {
        issues.push(issue("warning", experience.chapterId, proof, "Duplicate proof item."));
      }
      seen.add(key);

      if (!proof.source?.document) {
        issues.push(issue("warning", experience.chapterId, proof, "Missing evidence source."));
      }
      if (!proof.source?.page) {
        issues.push(issue("warning", experience.chapterId, proof, "Missing source page/date reference."));
      }
      if (proof.trustState === "pending-review" && proof.confidentiality === "public") {
        issues.push(issue("error", experience.chapterId, proof, "Pending-review proof is public."));
      }
      if (proof.trustState === "confidential" && proof.confidentiality === "public") {
        issues.push(issue("error", experience.chapterId, proof, "Confidential proof is visible to customer mode."));
      }
      if (proof.label.toLowerCase().includes("patent") && !["pending-review", "verified"].includes(proof.trustState)) {
        issues.push(issue("warning", experience.chapterId, proof, "Patent status should be explicit."));
      }
    });
  });

  if (import.meta.env.DEV && issues.length > 0) {
    console.warn("[Evidence validation]", issues);
  }

  return issues;
}

function issue(severity: EvidenceValidationIssue["severity"], chapterId: string, proof: EvidenceProofItem, message: string): EvidenceValidationIssue {
  return { severity, chapterId, proofId: proof.id, message };
}
