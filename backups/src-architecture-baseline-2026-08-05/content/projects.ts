import type { FeatureStoryId } from "./featureStories";

export type ProjectIndustry =
  | "Rail & metro"
  | "Smart city"
  | "Police & public safety"
  | "Governance"
  | "Defense & aerospace"
  | "Renewable energy"
  | "Oil & gas"
  | "Experience centre"
  | "Technology & education"
  | "Research & revenue"
  | "Information unavailable";

export type ControlRoomType =
  | "Traffic / transport operations"
  | "Integrated command and control centre"
  | "Police command centre"
  | "Real-time governance centre"
  | "Renewable energy control room"
  | "Industrial process control room"
  | "Defense / aerospace control room"
  | "Showroom / experience centre"
  | "Technology centre control room"
  | "Tech interiors with control room"
  | "Information unavailable";

export type ProjectScope =
  | "Control Room Interiors"
  | "Control room / meeting room interiors"
  | "Design order"
  | "Design-build reference"
  | "Experience centre"
  | "Tech Interiors"
  | "Information unavailable";

export type ProjectScale = {
  label: string;
  valueCrores?: number;
  sourceNote: string;
  publicSafe: boolean;
};

export type ProjectRecord = {
  id: string;
  name: string;
  location: {
    city?: string;
    stateOrRegion?: string;
    country: string;
    locationConfidence: "city-confirmed" | "country-confirmed" | "confirmation required";
  };
  industry: ProjectIndustry;
  controlRoomType: ControlRoomType;
  operators: {
    count?: number;
    label: string;
  };
  scope: ProjectScope;
  scale: ProjectScale;
  customerChallenge: string;
  onePwsScope: string;
  designApproach: string;
  keyDeliveredSystems: string[];
  gallery: {
    assetId?: string;
    label: string;
    sourcePage: string;
  }[];
  walkthroughVideoAssetId?: string;
  relatedFeatures: FeatureStoryId[];
  proofPoints: string[];
  featured: boolean;
  featuredNarrative?: {
    headline: string;
    message: string;
  };
};

const unavailable = "Information unavailable";
const confirmationRequired = "confirmation required";
const technicalDiscussion = "Detailed project scope available during technical discussion.";

export const projects: ProjectRecord[] = [
  {
    id: "wdfcc-ahmedabad",
    name: "WDFCC / Dedicated Freight Corridor, Ahmedabad",
    location: {
      city: "Ahmedabad",
      stateOrRegion: "Gujarat",
      country: "India",
      locationConfidence: "city-confirmed",
    },
    industry: "Rail & metro",
    controlRoomType: "Traffic / transport operations",
    operators: { label: unavailable },
    scope: "Control Room Interiors",
    scale: {
      label: "17 Crores",
      valueCrores: 17,
      sourceNote: "Source project-value table lists Dedicated Freight Corridor, Ahmedabad - 17 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: "Control Room Interiors shown in the reference presentation.",
    designApproach:
      "Project imagery shows a large control-room environment and inauguration image; detailed design approach is confirmation required.",
    keyDeliveredSystems: ["Control-room interiors", "Video wall / display environment visible in imagery"],
    gallery: [
      { assetId: "project-dfcc-control-room", label: "Control room reference image", sourcePage: "Page 20" },
      { assetId: "project-dfcc-inauguration", label: "Project proof image", sourcePage: "Page 21" },
    ],
    relatedFeatures: [
      "scada-triggered-video-wall",
      "adaptive-sit-stand-console",
      "supervisor-oversight-system",
    ],
    proofPoints: ["Appears as a Control Room Interiors project reference.", "Project value listed in source table."],
    featured: true,
    featuredNarrative: {
      headline: "A transport operations reference with national-infrastructure weight.",
      message:
        "The deck positions WDFCC Ahmedabad as a marquee Control Room Interiors project. Detailed scope, operator count and outcomes remain confirmation required.",
    },
  },
  {
    id: "noida-itms",
    name: "Noida ITMS",
    location: {
      city: "Noida",
      stateOrRegion: "Uttar Pradesh",
      country: "India",
      locationConfidence: "city-confirmed",
    },
    industry: "Smart city",
    controlRoomType: "Traffic / transport operations",
    operators: { label: unavailable },
    scope: "Control room / meeting room interiors",
    scale: { label: unavailable, sourceNote: "No project scale found in source presentation.", publicSafe: true },
    customerChallenge: unavailable,
    onePwsScope: "Control room and meeting room photos are shown in the reference presentation.",
    designApproach: "Detailed design approach is confirmation required.",
    keyDeliveredSystems: ["Control-room interiors", "Meeting room interior shown in imagery"],
    gallery: [
      { assetId: "project-itms-noida-control-room", label: "Control room image", sourcePage: "Page 28" },
      { assetId: "project-itms-noida-control-room", label: "Meeting room / coordination image", sourcePage: "Page 28" },
    ],
    relatedFeatures: ["scada-triggered-video-wall", "supervisor-oversight-system"],
    proofPoints: ["Appears as a Control Room Interiors project reference."],
    featured: true,
    featuredNarrative: {
      headline: "Traffic operations presented through a control-room plus meeting-room environment.",
      message:
        "The source shows project imagery but does not provide operator count, delivery scope or measured outcomes.",
    },
  },
  {
    id: "chandigarh-iccc-smart-city",
    name: "Chandigarh ICCC Smart City",
    location: {
      city: "Chandigarh",
      country: "India",
      locationConfidence: "city-confirmed",
    },
    industry: "Smart city",
    controlRoomType: "Integrated command and control centre",
    operators: { label: unavailable },
    scope: "Control Room Interiors",
    scale: { label: unavailable, sourceNote: "No project scale found in source presentation.", publicSafe: true },
    customerChallenge: unavailable,
    onePwsScope: "Multiple control-room images shown in the reference presentation.",
    designApproach: "Detailed design approach is confirmation required.",
    keyDeliveredSystems: ["Integrated command centre interiors", "Display wall environment visible in imagery"],
    gallery: [
      { assetId: "project-chandigarh-control-room", label: "ICCC control-room image", sourcePage: "Page 22" },
      { assetId: "project-chandigarh-control-room", label: "Full-bleed project image", sourcePage: "Page 22" },
    ],
    relatedFeatures: [
      "scada-triggered-video-wall",
      "situational-awareness-lighting",
      "supervisor-oversight-system",
    ],
    proofPoints: ["Appears as a Smart City / ICCC project reference.", "Additional gallery image appears on the following slide."],
    featured: true,
    featuredNarrative: {
      headline: "A smart-city command centre reference with multiple visual proof points.",
      message:
        "The deck provides strong visual material, but challenge, operator count, exact systems and outcomes are not stated.",
    },
  },
  {
    id: "ahmedabad-police-apco",
    name: "Ahmedabad Police / APCO, Gujarat",
    location: {
      city: "Ahmedabad",
      stateOrRegion: "Gujarat",
      country: "India",
      locationConfidence: "city-confirmed",
    },
    industry: "Police & public safety",
    controlRoomType: "Police command centre",
    operators: { label: unavailable },
    scope: "Control Room Interiors",
    scale: {
      label: "8 Crores",
      valueCrores: 8,
      sourceNote: "Source project-value table lists Ahmedabad Police (APCO), Gujarat - 8 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: "Control-room photos are shown in the reference presentation.",
    designApproach: "Detailed design approach is confirmation required.",
    keyDeliveredSystems: ["Police command centre interiors", "Display environment visible in imagery"],
    gallery: [
      { assetId: "project-apco-ahmedabad", label: "Police control-room image", sourcePage: "Page 27" },
      { assetId: "project-apco-ahmedabad", label: "Display environment image", sourcePage: "Page 27" },
    ],
    relatedFeatures: [
      "scada-triggered-video-wall",
      "supervisor-oversight-system",
      "intelligent-acoustic-environment",
    ],
    proofPoints: ["Appears as a Control Room Interiors project reference.", "Project value listed in source table."],
    featured: true,
    featuredNarrative: {
      headline: "A public-safety control-room reference from Gujarat.",
      message:
        "The source supports the project name, location and value, but does not state operational outcomes or exact systems.",
    },
  },
  {
    id: "rtgc-andhra-pradesh",
    name: "RTGC, Andhra Pradesh",
    location: {
      stateOrRegion: "Andhra Pradesh",
      country: "India",
      locationConfidence: "country-confirmed",
    },
    industry: "Governance",
    controlRoomType: "Real-time governance centre",
    operators: { label: unavailable },
    scope: "Control Room Interiors",
    scale: { label: unavailable, sourceNote: "No project scale found in source presentation.", publicSafe: true },
    customerChallenge: unavailable,
    onePwsScope: "Control-room photos and inauguration image appear in the reference presentation.",
    designApproach: "Detailed design approach is confirmation required.",
    keyDeliveredSystems: ["Real-time governance centre interiors", "Display environment visible in imagery"],
    gallery: [
      { assetId: "project-rtgc-andhra-01", label: "Inauguration image", sourcePage: "Page 25" },
      { assetId: "project-rtgc-andhra-02", label: "Control-room image", sourcePage: "Page 26" },
    ],
    relatedFeatures: ["scada-triggered-video-wall", "supervisor-oversight-system"],
    proofPoints: ["Source states President of India inaugurates the RTGC at Andhra Pradesh, India."],
    featured: true,
    featuredNarrative: {
      headline: "A governance command-centre reference with high-profile inauguration proof.",
      message:
        "Exact client name, RTGC expansion/spelling and project scope beyond imagery are confirmation required.",
    },
  },
  {
    id: "adani-khavda-kutch",
    name: "Adani Khavda, Kutch",
    location: {
      city: "Khavda",
      stateOrRegion: "Kutch, Gujarat",
      country: "India",
      locationConfidence: "city-confirmed",
    },
    industry: "Renewable energy",
    controlRoomType: "Renewable energy control room",
    operators: { label: unavailable },
    scope: "Design-build reference",
    scale: { label: unavailable, sourceNote: "No project scale found in available source analysis.", publicSafe: true },
    customerChallenge: technicalDiscussion,
    onePwsScope: technicalDiscussion,
    designApproach: technicalDiscussion,
    keyDeliveredSystems: [technicalDiscussion],
    gallery: [
      { assetId: "project-adani-khavda-01", label: "Project photograph from source presentation", sourcePage: "Page 23" },
      { assetId: "project-adani-khavda-02", label: "Control-room photograph from source presentation", sourcePage: "Page 24" },
    ],
    relatedFeatures: ["adaptive-sit-stand-console", "scada-triggered-video-wall", "supervisor-oversight-system"],
    proofPoints: ["Appears in the approved final presentation structure as a project credential reference."],
    featured: true,
    featuredNarrative: {
      headline: "A renewable-energy project reference from Khavda, Kutch.",
      message:
        "The source architecture identifies Adani Khavda as a project credential. Detailed scope and outcomes remain available during technical discussion.",
    },
  },
  {
    id: "shell-brunei",
    name: "Shell Brunei",
    location: {
      country: "Brunei",
      locationConfidence: "country-confirmed",
    },
    industry: "Oil & gas",
    controlRoomType: "Industrial process control room",
    operators: { label: unavailable },
    scope: "Control Room Interiors",
    scale: { label: unavailable, sourceNote: "No project scale found in available source analysis.", publicSafe: true },
    customerChallenge: technicalDiscussion,
    onePwsScope: technicalDiscussion,
    designApproach: technicalDiscussion,
    keyDeliveredSystems: [technicalDiscussion],
    gallery: [{ label: "Project photograph from source presentation", sourcePage: "Current p29 / project proof section" }],
    relatedFeatures: ["adaptive-sit-stand-console", "scada-triggered-video-wall", "intelligent-acoustic-environment"],
    proofPoints: ["Appears in the project credential structure as Shell Brunei.", "Permission and final claim wording require confirmation."],
    featured: true,
    featuredNarrative: {
      headline: "An international oil-and-gas control-room reference.",
      message:
        "Shell Brunei is listed as a project proof reference. Detailed scope, permission and claim wording must be confirmed internally.",
    },
  },
  {
    id: "onepws-experience-centre",
    name: "OnePWS Showroom / Experience Centre",
    location: {
      country: "India",
      locationConfidence: "confirmation required",
    },
    industry: "Experience centre",
    controlRoomType: "Showroom / experience centre",
    operators: { label: unavailable },
    scope: "Experience centre",
    scale: { label: unavailable, sourceNote: "Showroom reference appears in source presentations; commercial scale not stated.", publicSafe: true },
    customerChallenge: "Showroom and demonstration destination for customer experience.",
    onePwsScope: "OnePWS showroom / experience-centre visual proof.",
    designApproach: technicalDiscussion,
    keyDeliveredSystems: ["Showroom / demo control-room environment", technicalDiscussion],
    gallery: [
      { assetId: "ambient-control-room", label: "Showroom control-room visual", sourcePage: "Page 31" },
      { assetId: "showroom-control-room-wide", label: "Experience-centre wide visual", sourcePage: "Page 32" },
      { assetId: "showroom-control-room-detail", label: "Experience-centre detail visual", sourcePage: "Page 33" },
      { assetId: "showroom-control-room", label: "Integrated room visual", sourcePage: "Page 34" },
    ],
    relatedFeatures: ["environment-intelligence", "adaptive-sit-stand-console", "situational-awareness-lighting"],
    proofPoints: ["Showroom/control-room experience visuals are identified as strong retained source material."],
    featured: true,
    featuredNarrative: {
      headline: "A physical experience layer for customer demonstration.",
      message:
        "The source decks show showroom visuals. Location, visit process and final naming require internal confirmation.",
    },
  },
  {
    id: "isro-iet",
    name: "ISRO IET",
    location: { country: "India", locationConfidence: "confirmation required" },
    industry: "Defense & aerospace",
    controlRoomType: "Defense / aerospace control room",
    operators: { label: unavailable },
    scope: "Information unavailable",
    scale: {
      label: "7.5 Crores",
      valueCrores: 7.5,
      sourceNote: "Source project-value table lists ISRO IET - 7.5 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: unavailable,
    designApproach: unavailable,
    keyDeliveredSystems: [unavailable],
    gallery: [{ label: "Source table reference only", sourcePage: "Page 8" }],
    relatedFeatures: ["adaptive-sit-stand-console", "scada-triggered-video-wall"],
    proofPoints: ["Project value listed in source table."],
    featured: false,
  },
  {
    id: "isro-icet",
    name: "ISRO ICET",
    location: { country: "India", locationConfidence: "confirmation required" },
    industry: "Defense & aerospace",
    controlRoomType: "Defense / aerospace control room",
    operators: { label: unavailable },
    scope: "Information unavailable",
    scale: {
      label: "8.25 Crores",
      valueCrores: 8.25,
      sourceNote: "Source project-value table lists ISRO ICET - 8.25 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: unavailable,
    designApproach: unavailable,
    keyDeliveredSystems: [unavailable],
    gallery: [{ label: "Source table reference only", sourcePage: "Page 8" }],
    relatedFeatures: ["adaptive-sit-stand-console", "scada-triggered-video-wall"],
    proofPoints: ["Project value listed in source table.", "ISRO Semi-Cryo Facility Award appears in awards slide; details confirmation required."],
    featured: false,
  },
  {
    id: "drdo-balasore",
    name: "DRDO (3 Projects), Balasore",
    location: {
      city: "Balasore",
      stateOrRegion: "Odisha",
      country: "India",
      locationConfidence: "city-confirmed",
    },
    industry: "Defense & aerospace",
    controlRoomType: "Defense / aerospace control room",
    operators: { label: unavailable },
    scope: "Information unavailable",
    scale: {
      label: "12 Crores",
      valueCrores: 12,
      sourceNote: "Source project-value table lists DRDO (3-Projects), Balasore - 12 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: unavailable,
    designApproach: unavailable,
    keyDeliveredSystems: [unavailable],
    gallery: [{ label: "Source table reference only", sourcePage: "Page 8" }],
    relatedFeatures: ["adaptive-sit-stand-console", "scada-triggered-video-wall"],
    proofPoints: ["Project value listed in source table.", "DRDO awards appear for 2018 and 2022."],
    featured: false,
  },
  {
    id: "dangote-refinery-nigeria",
    name: "Dangote Refinery, Nigeria",
    location: { country: "Nigeria", locationConfidence: "country-confirmed" },
    industry: "Oil & gas",
    controlRoomType: "Industrial process control room",
    operators: { label: unavailable },
    scope: "Information unavailable",
    scale: {
      label: "48 Crores",
      valueCrores: 48,
      sourceNote: "Source project-value table lists Dangote Refinery, Nigeria - 48 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: unavailable,
    designApproach: unavailable,
    keyDeliveredSystems: [unavailable],
    gallery: [{ label: "Source table reference only", sourcePage: "Page 8" }],
    relatedFeatures: ["adaptive-sit-stand-console", "scada-triggered-video-wall", "intelligent-acoustic-environment"],
    proofPoints: ["Project value listed in source table."],
    featured: true,
    featuredNarrative: {
      headline: "An international oil-and-gas reference with major project scale.",
      message:
        "The source confirms project name, country and value only. Scope, operator count and outcomes are unavailable.",
    },
  },
  {
    id: "reliance-dmd-nmd-gujarat",
    name: "Reliance DMD & NMD Design Order, Gujarat",
    location: { stateOrRegion: "Gujarat", country: "India", locationConfidence: "country-confirmed" },
    industry: "Oil & gas",
    controlRoomType: "Industrial process control room",
    operators: { label: unavailable },
    scope: "Design order",
    scale: {
      label: "2 Crores",
      valueCrores: 2,
      sourceNote: "Source project-value table lists Reliance DMD & NMD Design Order, Gujarat - 2 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: "Design order, as stated in source table.",
    designApproach: unavailable,
    keyDeliveredSystems: [unavailable],
    gallery: [{ label: "Source table reference only", sourcePage: "Page 8" }],
    relatedFeatures: ["adaptive-sit-stand-console", "scada-triggered-video-wall"],
    proofPoints: ["Project value listed in source table."],
    featured: false,
  },
  {
    id: "mgigss-jaipur",
    name: "MGIGSS Jaipur",
    location: { city: "Jaipur", stateOrRegion: "Rajasthan", country: "India", locationConfidence: "city-confirmed" },
    industry: "Information unavailable",
    controlRoomType: "Information unavailable",
    operators: { label: unavailable },
    scope: "Information unavailable",
    scale: {
      label: "105 Crores",
      valueCrores: 105,
      sourceNote: "Source project-value table lists MGIGSS Jaipur - 105 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: unavailable,
    designApproach: unavailable,
    keyDeliveredSystems: [unavailable],
    gallery: [{ label: "Source table reference only", sourcePage: "Page 8" }],
    relatedFeatures: [],
    proofPoints: ["Project value listed in source table."],
    featured: false,
  },
  {
    id: "rcat-jaipur",
    name: "RCAT Jaipur / Rajasthan Centre of Advanced Technology",
    location: { city: "Jaipur", stateOrRegion: "Rajasthan", country: "India", locationConfidence: "city-confirmed" },
    industry: "Technology & education",
    controlRoomType: "Tech interiors with control room",
    operators: { label: unavailable },
    scope: "Tech Interiors",
    scale: {
      label: "23 Crores",
      valueCrores: 23,
      sourceNote: "Source project-value table lists RCAT Jaipur - 23 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: "Tech Interiors shown in the reference presentation.",
    designApproach: "Images show Entrance, Reception, Classroom-2 and Tinkering Lab; control-room-specific detail unavailable.",
    keyDeliveredSystems: ["Entrance", "Reception", "Classroom-2", "Tinkering Lab"],
    gallery: [{ label: "Tech interiors image set", sourcePage: "Page 19" }],
    relatedFeatures: [],
    proofPoints: ["Appears as a Tech Interiors reference.", "Project value listed in source table."],
    featured: false,
  },
  {
    id: "bhamashah-techno-hub-jaipur",
    name: "Bhamashah Techno-HUB, Jaipur",
    location: { city: "Jaipur", stateOrRegion: "Rajasthan", country: "India", locationConfidence: "city-confirmed" },
    industry: "Technology & education",
    controlRoomType: "Information unavailable",
    operators: { label: unavailable },
    scope: "Information unavailable",
    scale: {
      label: "17 Crores",
      valueCrores: 17,
      sourceNote: "Source project-value table lists Bhamashah Techno-HUB, Jaipur - 17 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: unavailable,
    designApproach: unavailable,
    keyDeliveredSystems: [unavailable],
    gallery: [{ label: "Source table reference only", sourcePage: "Page 8" }],
    relatedFeatures: [],
    proofPoints: ["Project value listed in source table."],
    featured: false,
  },
  {
    id: "center-excellence-revenue-research-jaipur",
    name: "Center of Excellence for Revenue Research, Jaipur",
    location: { city: "Jaipur", stateOrRegion: "Rajasthan", country: "India", locationConfidence: "city-confirmed" },
    industry: "Research & revenue",
    controlRoomType: "Tech interiors with control room",
    operators: { label: unavailable },
    scope: "Tech Interiors",
    scale: {
      label: "25 Crores",
      valueCrores: 25,
      sourceNote: "Source project-value table lists Center of Excellence for Revenue Research, Jaipur - 25 Crores.",
      publicSafe: false,
    },
    customerChallenge: unavailable,
    onePwsScope: "Tech Interiors shown in the reference presentation.",
    designApproach: "Images show Reception, Auditorium, Control Room and Office Area.",
    keyDeliveredSystems: ["Reception", "Auditorium", "Control Room", "Office Area"],
    gallery: [
      { label: "Reception / auditorium / control room / office area", sourcePage: "Page 17" },
      { label: "Office-area image", sourcePage: "Page 18" },
    ],
    relatedFeatures: ["adaptive-sit-stand-console"],
    proofPoints: ["Appears as a Tech Interiors reference.", "Project value listed in source table."],
    featured: false,
  },
  {
    id: "br-ambedkar-law-university-jaipur",
    name: "B.R. Ambedkar Law University Jaipur",
    location: { city: "Jaipur", stateOrRegion: "Rajasthan", country: "India", locationConfidence: "city-confirmed" },
    industry: "Technology & education",
    controlRoomType: "Information unavailable",
    operators: { label: unavailable },
    scope: "Tech Interiors",
    scale: { label: unavailable, sourceNote: "No project scale found in source presentation.", publicSafe: true },
    customerChallenge: unavailable,
    onePwsScope: "Tech Interiors shown in the reference presentation.",
    designApproach: "Images show Moot Court, Board Room, Central Library and Admin Office.",
    keyDeliveredSystems: ["Moot Court", "Board Room", "Central Library", "Admin Office"],
    gallery: [{ label: "Tech interiors image set", sourcePage: "Page 20" }],
    relatedFeatures: [],
    proofPoints: ["Appears as a Tech Interiors reference."],
    featured: false,
  },
];

export const projectFilters = {
  industries: Array.from(new Set(projects.map((project) => project.industry))),
  countries: Array.from(new Set(projects.map((project) => project.location.country))),
  controlRoomTypes: Array.from(new Set(projects.map((project) => project.controlRoomType))),
  scopes: Array.from(new Set(projects.map((project) => project.scope))),
};
