import {
  awardsRecognition,
  certificationReferences,
  credentialProofPoints,
  customerLogoReferences,
  manufacturingReferences,
  qualitySystemReferences,
  traceabilityReferences,
  type SourceRef,
} from "../../content/credentials";
import { projects, projectFilters, type ProjectRecord } from "../../content/projects";
import type { ChapterId } from "../../data/contentTypes";

export type EvidenceTrustState =
  | "verified"
  | "approved"
  | "approved-anonymised"
  | "pending-review"
  | "expired"
  | "historical"
  | "confidential"
  | "conceptual"
  | "unavailable";

export type EvidenceCategory =
  | "company-capability"
  | "history-continuity"
  | "design-engineering"
  | "manufacturing-quality"
  | "certification-standards"
  | "project-experience"
  | "customer-presence"
  | "service-support"
  | "trust-memory";

export type EvidenceProofItem = {
  id: string;
  label: string;
  value: string;
  customerRelevance: string;
  evidence: string;
  verification: string;
  source: SourceRef;
  trustState: EvidenceTrustState;
  confidentiality: "public" | "presenter-only" | "redacted" | "internal-review";
  assetId?: string;
  restrictedWording: string;
};

export type EvidenceExperience = {
  chapterId: ChapterId;
  title: string;
  category: EvidenceCategory;
  customerQuestion: string;
  mainStatement: string;
  proofItems: EvidenceProofItem[];
  featuredProjects: ProjectRecord[];
  sourceAccess: "customer-safe" | "presenter-only" | "development-only";
  claimBoundary: string;
  autoplayMs: number;
  memoryMoment: boolean;
};

const proofBoundary =
  "Use sourced wording only. Do not invent customers, projects, locations, certification scope, patent status, capacity, outcomes, endorsements or performance metrics.";

const source = { document: "Source presentation analysis", page: 4, note: "Derived from structured source content." };

export const evidenceChapterIds: ChapterId[] = [
  "company-at-a-glance",
  "system-driven-execution",
  "design-build-approach",
  "delivery-methodology",
  "manufacturing-quality",
  "certification-overview",
  "project-portfolio",
  "customer-presence",
];

export const evidenceExperiences: EvidenceExperience[] = [
  {
    chapterId: "company-at-a-glance",
    title: "Company capability as customer proof",
    category: "company-capability",
    customerQuestion: "Can OnePWS actually deliver a complete control-room environment?",
    mainStatement: "Scale is useful only when it reduces delivery risk for the customer.",
    proofItems: credentialProofPoints.filter((point) => point.primary).slice(0, 8).map((point) => ({
      id: point.id,
      label: point.label,
      value: point.value,
      customerRelevance: point.context,
      evidence: point.category,
      verification: point.source.note,
      source: point.source,
      trustState: point.source.note.includes("confirmation") ? "pending-review" : "verified",
      confidentiality: point.source.note.includes("confirmation") ? "presenter-only" : "public",
      restrictedWording: "Do not combine OnePWS values with group values or older Pyrotech statistics.",
    })),
    featuredProjects: [],
    sourceAccess: "presenter-only",
    claimBoundary: proofBoundary,
    autoplayMs: 40_000,
    memoryMoment: false,
  },
  {
    chapterId: "system-driven-execution",
    title: "Standards and system-driven execution",
    category: "certification-standards",
    customerQuestion: "How does OnePWS keep delivery controlled across standards, systems and project records?",
    mainStatement: "Delivery confidence comes from standards, digital process control and traceable project information.",
    proofItems: [
      {
        id: "iso-9001",
        label: "Quality Management",
        value: "ISO 9001",
        customerRelevance: "Standardised processes, quality checkpoints, documented inspections and continual improvement.",
        evidence: "Management standard",
        verification: "Certificate scope and validity should be confirmed from current OnePWS certification records.",
        source,
        trustState: "pending-review",
        confidentiality: "presenter-only",
        restrictedWording: "Use only verified certificate names, current validity and approved scope.",
      },
      {
        id: "iso-14001",
        label: "Environmental Management",
        value: "ISO 14001",
        customerRelevance: "Structured control of environmental responsibilities, resource use, waste management and compliance.",
        evidence: "Management standard",
        verification: "Certificate scope and validity should be confirmed from current OnePWS certification records.",
        source,
        trustState: "pending-review",
        confidentiality: "presenter-only",
        restrictedWording: "Do not imply environmental outcomes beyond approved certification scope.",
      },
      {
        id: "iso-45001",
        label: "Occupational Health & Safety",
        value: "ISO 45001",
        customerRelevance: "Systematic identification and control of workplace risks across delivery activities.",
        evidence: "Management standard",
        verification: "Certificate scope and validity should be confirmed from current OnePWS certification records.",
        source,
        trustState: "pending-review",
        confidentiality: "presenter-only",
        restrictedWording: "Do not claim project-specific safety performance without verified records.",
      },
      {
        id: "sap-processes",
        label: "Integrated Business Operations",
        value: "SAP-Enabled Processes",
        customerRelevance: "Centralised management of materials, BOMs, production, procurement, inventory and project data.",
        evidence: "Digital process control",
        verification: "SAP process scope should be confirmed with current OnePWS operating procedure records.",
        source,
        trustState: "pending-review",
        confidentiality: "presenter-only",
        restrictedWording: "Do not imply integrations or automations that are not part of the approved workflow.",
      },
      {
        id: "configuration-change-control",
        label: "Configuration & Change Control",
        value: "Controlled from design to delivery",
        customerRelevance: "Approved revisions, modifications, configurations and project records stay structured through the lifecycle.",
        evidence: "Project governance",
        verification: "Confirm workflow evidence before sharing detailed process claims.",
        source,
        trustState: "pending-review",
        confidentiality: "presenter-only",
        restrictedWording: "Keep the wording process-based unless specific customer records are approved.",
      },
      {
        id: "project-traceability",
        label: "Project Traceability",
        value: "Information retained for long-term support",
        customerRelevance: "Project history, drawings, configurations, modifications and records remain accessible for support.",
        evidence: "Lifecycle documentation",
        verification: "Confirm retention practice and access scope from current OnePWS project documentation process.",
        source,
        trustState: "pending-review",
        confidentiality: "presenter-only",
        restrictedWording: "Do not promise retention periods or data access models unless contractually verified.",
      },
    ],
    featuredProjects: [],
    sourceAccess: "presenter-only",
    claimBoundary: proofBoundary,
    autoplayMs: 42_000,
    memoryMoment: false,
  },
  {
    chapterId: "design-build-approach",
    title: "Design and engineering proof",
    category: "design-engineering",
    customerQuestion: "Can OnePWS turn requirements into an engineered room?",
    mainStatement: "Design, engineering and site execution are connected as one accountable path.",
    proofItems: [
      proof("requirement", "Requirement", "Customer requirement", "Defines operating need before layout decisions.", "Source chapter content", 17),
      proof("study", "Study", "Ergonomic and spatial study", "Connects people, room geometry and technical constraints.", "Source chapter content", 17),
      proof("engineering", "Engineering", "Engineering coordination", "Moves the concept toward manufacturable and installable detail.", "Source chapter content", 17),
      proof("handoff", "Manufacturing handoff", "Production release", "Keeps design intent connected to delivery.", "Source chapter content", 17),
    ],
    featuredProjects: projects.filter((project) => project.featured).slice(0, 2),
    sourceAccess: "presenter-only",
    claimBoundary: proofBoundary,
    autoplayMs: 44_000,
    memoryMoment: false,
  },
  {
    chapterId: "delivery-methodology",
    title: "Project execution proof",
    category: "service-support",
    customerQuestion: "Can OnePWS manage the route from design intent to handover?",
    mainStatement: "A controlled delivery path protects the customer from gaps between design, manufacturing and site.",
    proofItems: [
      proof("discovery", "Discovery", "Discovery and site inputs", "Clarifies constraints before the project accelerates.", "Source chapter content", 19),
      proof("coordination", "Coordination", "Engineering coordination", "Reduces disconnects between room, product and services.", "Source chapter content", 19),
      proof("fat-sat", "FAT / SAT", "FAT, installation, SAT", "Keeps verification visible through delivery.", "Source chapter content", 19),
      ...traceabilityReferences.map((item) => referenceProof(item.title, item.detail, item.source, item.confirmationRequired)),
    ],
    featuredProjects: projects.filter((project) => project.featured).slice(0, 1),
    sourceAccess: "presenter-only",
    claimBoundary: proofBoundary,
    autoplayMs: 48_000,
    memoryMoment: false,
  },
  {
    chapterId: "manufacturing-quality",
    title: "Manufacturing and quality proof",
    category: "manufacturing-quality",
    customerQuestion: "Can OnePWS manufacture and control quality consistently?",
    mainStatement: "Manufacturing proof matters when it connects to repeatable delivery and quality control.",
    proofItems: [
      ...manufacturingReferences.map((item) => referenceProof(item.title, item.detail, item.source, item.confirmationRequired, "manufacturing-equipment-source")),
      ...qualitySystemReferences.map((item) => referenceProof(item.title, item.detail, item.source, item.confirmationRequired, "manufacturing-equipment-source")),
    ],
    featuredProjects: [],
    sourceAccess: "presenter-only",
    claimBoundary: proofBoundary,
    autoplayMs: 45_000,
    memoryMoment: false,
  },
  {
    chapterId: "certification-overview",
    title: "Certification and standards proof",
    category: "certification-standards",
    customerQuestion: "What independent evidence supports the quality and management system claims?",
    mainStatement: "Certification proof should be readable, scoped and connected to why it matters.",
    proofItems: certificationReferences.map((item) => referenceProof(item.title, item.detail, item.source, item.confirmationRequired)),
    featuredProjects: [],
    sourceAccess: "presenter-only",
    claimBoundary: proofBoundary,
    autoplayMs: 38_000,
    memoryMoment: false,
  },
  {
    chapterId: "project-portfolio",
    title: "Project experience proof",
    category: "project-experience",
    customerQuestion: "Has OnePWS delivered in relevant critical environments?",
    mainStatement: "Project proof is strongest when it stays specific, sourced and relevant to the buyer.",
    proofItems: projects.filter((project) => project.featured).slice(0, 8).map(projectProof),
    featuredProjects: projects.filter((project) => project.featured),
    sourceAccess: "customer-safe",
    claimBoundary: proofBoundary,
    autoplayMs: 48_000,
    memoryMoment: true,
  },
  {
    chapterId: "customer-presence",
    title: "Customer and sector presence",
    category: "customer-presence",
    customerQuestion: "Is OnePWS trusted across relevant sectors and geographies?",
    mainStatement: "Customer presence is curated as sector relevance, not a logo wall.",
    proofItems: [
      ...credentialProofPoints.filter((point) => ["customers", "countries", "projects"].includes(point.category)).map((point) => ({
        id: point.id,
        label: point.label,
        value: point.value,
        customerRelevance: point.context,
        evidence: point.category,
        verification: point.source.note,
        source: point.source,
        trustState: point.source.note.includes("confirmation") ? "pending-review" as const : "verified" as const,
        confidentiality: point.source.note.includes("confirmation") ? "presenter-only" as const : "public" as const,
        restrictedWording: "Do not imply endorsement from a customer logo or project listing.",
      })),
      {
        id: "logo-wall-permission",
        label: "Customer logo wall",
        value: `${customerLogoReferences.length} referenced names`,
        customerRelevance: "Logo usage rights and final sector grouping require confirmation before public deployment.",
        evidence: "Source logo wall",
        verification: "Customer identity visibility must be approved.",
        source: customerLogoReferences[0]?.source ?? source,
        trustState: "pending-review",
        confidentiality: "internal-review",
        assetId: "customer-logo-wall-source",
        restrictedWording: "Do not use the logo wall as endorsement or final public proof until permissions are confirmed.",
      },
    ],
    featuredProjects: projects.filter((project) => project.featured).slice(0, 4),
    sourceAccess: "presenter-only",
    claimBoundary: proofBoundary,
    autoplayMs: 35_000,
    memoryMoment: false,
  },
];

export const executiveEvidenceRoute = {
  id: "credibility-executive",
  label: "Executive credibility route",
  durationLabel: "4-6 min",
  sequence: [
    "company-at-a-glance",
    "design-build-approach",
    "manufacturing-quality",
    "certification-overview",
    "project-portfolio",
    "delivery-methodology",
    "why-onepws",
  ] as ChapterId[],
};

export function getEvidenceExperience(chapterId: ChapterId) {
  return evidenceExperiences.find((experience) => experience.chapterId === chapterId);
}

export const evidenceProjectFilters = projectFilters;

function proof(id: string, label: string, value: string, relevance: string, evidence: string, page: number): EvidenceProofItem {
  return {
    id,
    label,
    value,
    customerRelevance: relevance,
    evidence,
    verification: `Source chapter content, page ${page}.`,
    source: { document: "Source presentation analysis", page, note: evidence },
    trustState: "verified",
    confidentiality: "public",
    restrictedWording: "Do not add unapproved process steps, dates or delivery outcomes.",
  };
}

function referenceProof(title: string, detail: string, sourceRef: SourceRef, confirmationRequired = false, assetId?: string): EvidenceProofItem {
  return {
    id: title.replace(/[^a-z0-9]+/gi, "-").toLowerCase(),
    label: title,
    value: confirmationRequired ? "Review required" : "Sourced",
    customerRelevance: detail,
    evidence: sourceRef.note,
    verification: `${sourceRef.document}, page ${sourceRef.page}.`,
    source: sourceRef,
    trustState: confirmationRequired ? "pending-review" : "verified",
    confidentiality: confirmationRequired ? "presenter-only" : "public",
    assetId,
    restrictedWording: "Do not treat confirmation-required wording as externally approved.",
  };
}

function projectProof(project: ProjectRecord): EvidenceProofItem {
  const firstGallery = project.gallery.find((item) => item.assetId);
  return {
    id: project.id,
    label: project.name,
    value: project.location.city ?? project.location.stateOrRegion ?? project.location.country,
    customerRelevance: project.featuredNarrative?.message ?? project.proofPoints[0] ?? "Project reference.",
    evidence: project.scope,
    verification: project.proofPoints.join(" "),
    source: { document: "Source presentation analysis", page: Number(firstGallery?.sourcePage.replace(/\D/g, "")) || 8, note: project.scale.sourceNote },
    trustState: project.scale.publicSafe ? "approved" : "confidential",
    confidentiality: project.scale.publicSafe ? "public" : "presenter-only",
    assetId: firstGallery?.assetId,
    restrictedWording: "Do not imply customer endorsement, undisclosed outcomes, operator counts or full project scope.",
  };
}
