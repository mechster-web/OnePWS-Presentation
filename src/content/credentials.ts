export type SourceRef = {
  document: string;
  page: number;
  note: string;
};

export type CredentialProofPoint = {
  id: string;
  label: string;
  value: string;
  context: string;
  category:
    | "experience"
    | "manufacturing"
    | "products"
    | "patents"
    | "countries"
    | "customers"
    | "certifications"
    | "partnerships"
    | "projects"
    | "awards"
    | "traceability"
    | "quality"
    | "exhibitions";
  source: SourceRef;
  primary: boolean;
};

export type CredentialTimelineItem = {
  year: string;
  title: string;
  detail: string;
  source: SourceRef;
};

export type TurnoverPoint = {
  year: number;
  valueCrores: number;
  source: SourceRef;
};

export type StrategicPartnership = {
  partner: string;
  summary: string;
  source: SourceRef;
  confirmationRequired?: boolean;
};

export type AwardRecognition = {
  title: string;
  detail: string;
  source: SourceRef;
  confirmationRequired?: boolean;
};

export type CustomerLogoReference = {
  name: string;
  sector: string;
  source: SourceRef;
  confirmationRequired?: boolean;
};

export type ExhibitionReference = {
  name: string;
  location: string;
  year: string;
  source: SourceRef;
  confirmationRequired?: boolean;
};

export type ManufacturingReference = {
  title: string;
  detail: string;
  source: SourceRef;
  confirmationRequired?: boolean;
};

export type CertificationReference = {
  title: string;
  detail: string;
  source: SourceRef;
  confirmationRequired?: boolean;
};

const deck = "Source presentation analysis";

export const credentialProofPoints: CredentialProofPoint[] = [
  {
    id: "workspace-formed",
    label: "Experience",
    value: "2006",
    context: "OnePWS continuity from Pyrotech Workspace formation year.",
    category: "experience",
    source: { document: deck, page: 4, note: "Current OnePWS credentials." },
    primary: true,
  },
  {
    id: "workspace-factory-area",
    label: "Manufacturing capability",
    value: "170,000 sq. ft.",
    context: "Dedicated factory manufacturing area.",
    category: "manufacturing",
    source: { document: deck, page: 4, note: "Current OnePWS credentials." },
    primary: true,
  },
  {
    id: "control-desk-solutions",
    label: "Control desk solutions",
    value: "75,000+",
    context: "Control desk solutions in current OnePWS credentials.",
    category: "products",
    source: { document: deck, page: 4, note: "Current OnePWS credentials; meaning/scope confirmation recommended." },
    primary: true,
  },
  {
    id: "onepws-patents-applied",
    label: "Patents applied",
    value: "15",
    context: "Patents applied as listed in current OnePWS credentials.",
    category: "patents",
    source: { document: deck, page: 4, note: "Current OnePWS credentials." },
    primary: true,
  },
  {
    id: "onepws-countries",
    label: "Countries served",
    value: "35+",
    context: "Countries served globally by OnePWS.",
    category: "countries",
    source: { document: deck, page: 4, note: "Current OnePWS credentials." },
    primary: true,
  },
  {
    id: "workspace-customers",
    label: "Customers served",
    value: "250+",
    context: "Customers served globally by OnePWS.",
    category: "customers",
    source: { document: deck, page: 4, note: "Current OnePWS credentials." },
    primary: true,
  },
  {
    id: "workspace-certifications",
    label: "Major certifications",
    value: "20+",
    context: "International certifications in current OnePWS credentials.",
    category: "certifications",
    source: { document: deck, page: 4, note: "Current OnePWS credentials; detailed certificate scope requires confirmation." },
    primary: true,
  },
  {
    id: "design-build-solutions",
    label: "Design-build interiors",
    value: "450+",
    context: "Design-build interior solutions in current OnePWS credentials.",
    category: "projects",
    source: { document: deck, page: 4, note: "Current OnePWS credentials; scope confirmation recommended." },
    primary: true,
  },
  {
    id: "onepws-sales",
    label: "OnePWS sales",
    value: "236 Cr.",
    context: "Sales in FY 2025-26.",
    category: "experience",
    source: { document: deck, page: 4, note: "Current OnePWS credentials." },
    primary: true,
  },
  {
    id: "group-manufacturing-area",
    label: "Group manufacturing",
    value: "1,000,000 sq. ft.",
    context: "Pyrotech Group manufacturing area.",
    category: "manufacturing",
    source: { document: deck, page: 3, note: "Current Pyrotech Group strength." },
    primary: false,
  },
  {
    id: "group-people",
    label: "Group people",
    value: "2,500+",
    context: "People at Pyrotech Group level.",
    category: "experience",
    source: { document: deck, page: 3, note: "Current Pyrotech Group strength." },
    primary: false,
  },
  {
    id: "group-engineered-products",
    label: "Group engineered products",
    value: "50+",
    context: "Engineered products at Pyrotech Group level.",
    category: "products",
    source: { document: deck, page: 3, note: "Current Pyrotech Group strength." },
    primary: false,
  },
  {
    id: "group-countries",
    label: "Group countries",
    value: "75+",
    context: "Countries served at Pyrotech Group level.",
    category: "countries",
    source: { document: deck, page: 3, note: "Current Pyrotech Group strength." },
    primary: false,
  },
  {
    id: "group-sales-current",
    label: "Group sales",
    value: "1056 Cr.",
    context: "Sales in FY 2025-26 at Pyrotech Group level.",
    category: "experience",
    source: { document: deck, page: 3, note: "Current Pyrotech Group strength." },
    primary: false,
  },
  {
    id: "design-build-presence",
    label: "Design-build reach",
    value: "25 countries",
    context: "More than 200 customers from 25 countries appreciated design-build solutions.",
    category: "countries",
    source: { document: deck, page: 13, note: "Current presence/showroom reference." },
    primary: false,
  },
];

export const credentialTimeline: CredentialTimelineItem[] = [
  {
    year: "1976",
    title: "Pyrotech Group established",
    detail: "Group-level history shown in the reference presentation.",
    source: { document: deck, page: 2, note: "Pyrotech Group overview." },
  },
  {
    year: "2006",
    title: "Pyrotech Workspace formed",
    detail: "Workspace company formation year.",
    source: { document: deck, page: 3, note: "Pyrotech Workspace overview." },
  },
  {
    year: "2009",
    title: "Dedicated factory established",
    detail: "Dedicated Workspace factory with 170,000 sq. ft. manufacturing area.",
    source: { document: deck, page: 3, note: "Pyrotech Workspace overview." },
  },
  {
    year: "2024",
    title: "Workspace reaches 209 Cr. sales",
    detail: "FY 2023-24 sales shown in the Workspace overview.",
    source: { document: deck, page: 3, note: "Workspace sales fact." },
  },
];

export const groupTurnover: TurnoverPoint[] = [
  7, 21, 63, 133, 273, 315, 448, 472, 506, 560, 650, 835, 920,
].map((valueCrores, index) => ({
  year: [2000, 2003, 2006, 2009, 2012, 2015, 2018, 2019, 2020, 2021, 2022, 2023, 2024][index],
  valueCrores,
  source: { document: deck, page: 2, note: "Pyrotech Group turnover chart." },
}));

export const workspaceTurnover: TurnoverPoint[] = [
  14, 15, 32, 49, 52, 60, 80, 85, 91, 98, 124, 201, 209,
].map((valueCrores, index) => ({
  year: [2008, 2010, 2012, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024][index],
  valueCrores,
  source: { document: deck, page: 3, note: "Pyrotech Workspace turnover chart." },
}));

export const strategicPartnerships: StrategicPartnership[] = [
  {
    partner: "Schneider Electric",
    summary:
      "Preferred partner wording appears for control-room solutions including ergonomic study, task analysis, space engineering, lux level and HVAC calculations.",
    source: { document: deck, page: 30, note: "Global Tie-Ups slide." },
    confirmationRequired: true,
  },
  {
    partner: "Honeywell",
    summary:
      "Control desk supplier for Honeywell DFE domestic/export projects; supplied more than 800 operator stations to 50 projects in ME region.",
    source: { document: deck, page: 30, note: "Global Tie-Ups slide. DFE meaning confirmation required." },
    confirmationRequired: true,
  },
  {
    partner: "Larsen & Toubro",
    summary:
      "Single point console solution provider from past 7 years; more than 150 projects in Middle East, Africa and South America; 2,500+ ergonomic compliant consoles.",
    source: { document: deck, page: 30, note: "Global Tie-Ups slide." },
    confirmationRequired: true,
  },
  {
    partner: "Thales",
    summary:
      "Registered Indian offset partner for consoles and cabinets; delivered more than 10 projects and almost 200 consoles worldwide in three years.",
    source: { document: deck, page: 30, note: "Global Tie-Ups slide." },
    confirmationRequired: true,
  },
];

export const awardsRecognition: AwardRecognition[] = [
  {
    title: "Integrated Test Range Award by DRDO 2018",
    detail: "Listed in Awards & Recognition.",
    source: { document: deck, page: 6, note: "Awards & Recognition slide." },
  },
  {
    title: "Integrated Test Range Award by DRDO 2022",
    detail: "Listed in Awards & Recognition.",
    source: { document: deck, page: 6, note: "Awards & Recognition slide." },
  },
  {
    title: "ISRO Semi-Cryo Facility Award",
    detail: "Award date and details confirmation required.",
    source: { document: deck, page: 6, note: "Awards & Recognition slide." },
    confirmationRequired: true,
  },
  {
    title: "Thales Award for Indian commitment",
    detail: "Award date and details confirmation required.",
    source: { document: deck, page: 6, note: "Awards & Recognition slide." },
    confirmationRequired: true,
  },
];

export const exhibitionReferences: ExhibitionReference[] = [
  {
    name: "INTERSEC 2023",
    location: "Dubai",
    year: "2023",
    source: { document: deck, page: 18, note: "International exhibition references." },
  },
  {
    name: "INTERSEC 2024",
    location: "Dubai",
    year: "2024",
    source: { document: deck, page: 18, note: "International exhibition references." },
  },
  {
    name: "INTERSEC 2025",
    location: "Saudi Arabia",
    year: "2025",
    source: { document: deck, page: 18, note: "International exhibition references." },
  },
  {
    name: "INTERSEC 2026",
    location: "Saudi Arabia",
    year: "2026",
    source: { document: deck, page: 18, note: "International exhibition references." },
  },
  {
    name: "Airspace World 2025",
    location: "Lisbon",
    year: "2025",
    source: { document: deck, page: 18, note: "International exhibition references." },
  },
  {
    name: "Airspace World 2027",
    location: "Lisbon",
    year: "2027",
    source: { document: deck, page: 18, note: "Future exhibition reference; internal confirmation recommended." },
    confirmationRequired: true,
  },
];

export const manufacturingReferences: ManufacturingReference[] = [
  {
    title: "100% in-house manufacturing",
    detail: "Current presentation positions manufacturing as 100% in-house.",
    source: { document: deck, page: 36, note: "Manufacturing capability slide." },
  },
  {
    title: "CNC and panel-processing capability",
    detail: "Biesse Italy CNC, panel saw and edgebander references appear in the manufacturing equipment list.",
    source: { document: deck, page: 36, note: "Machine names and final spellings should be verified from source assets." },
    confirmationRequired: true,
  },
  {
    title: "Sheet-metal fabrication capability",
    detail: "Trumpf Trupunch, Trubend and Trulaser equipment references appear in the manufacturing equipment list.",
    source: { document: deck, page: 36, note: "Machine names and final spellings should be verified from source assets." },
    confirmationRequired: true,
  },
  {
    title: "Automated panel and bending systems",
    detail: "Weeke BHX050 and Salvagnini P4 references appear in the manufacturing equipment list.",
    source: { document: deck, page: 36, note: "Machine names and final spellings should be verified from source assets." },
    confirmationRequired: true,
  },
];

export const certificationReferences: CertificationReference[] = [
  {
    title: "ISO 9001",
    detail: "Quality management system certification appears in current management-system content.",
    source: { document: deck, page: 5, note: "Management systems and SAP slide." },
  },
  {
    title: "ISO 14001",
    detail: "Environmental management system certification appears in current management-system content.",
    source: { document: deck, page: 5, note: "Management systems and SAP slide." },
  },
  {
    title: "ISO 45001",
    detail: "Occupational health and safety management system certification appears in current management-system content.",
    source: { document: deck, page: 5, note: "Management systems and SAP slide." },
  },
  {
    title: "20+ international certifications",
    detail: "The current OnePWS credential page states 20+ international certifications.",
    source: { document: deck, page: 4, note: "Detailed certificate scope requires internal confirmation." },
    confirmationRequired: true,
  },
];

export const traceabilityReferences: ManufacturingReference[] = [
  {
    title: "SAP implementation",
    detail: "The current presentation states SAP implementation as part of the management-system layer.",
    source: { document: deck, page: 5, note: "Management systems and SAP slide." },
  },
  {
    title: "Long-term project database",
    detail: "Complete project database and modifications are stored for a minimum of 20 years after supply.",
    source: { document: deck, page: 5, note: "Exact retention wording from current management-system content." },
  },
  {
    title: "Lifecycle modification record",
    detail: "Modification data can be referenced for future service and lifecycle discussion.",
    source: { document: deck, page: 5, note: "Operational interpretation; confirmation recommended for external wording." },
    confirmationRequired: true,
  },
];

export const qualitySystemReferences: ManufacturingReference[] = [
  {
    title: "Integrated management systems",
    detail: "ISO 9001, ISO 14001 and ISO 45001 are shown together in the current management-system content.",
    source: { document: deck, page: 5, note: "Management systems and SAP slide." },
  },
  {
    title: "Quality checks across delivery",
    detail: "Detailed FAT, SAT and inspection procedure wording should be confirmed before external presentation.",
    source: { document: deck, page: 5, note: "Quality process detail requires internal confirmation." },
    confirmationRequired: true,
  },
  {
    title: "Internal process improvement",
    detail: "Process-improvement programme details should be added from approved internal material.",
    source: { document: deck, page: 5, note: "Confirmation required; not enough detail in source presentations." },
    confirmationRequired: true,
  },
];

export const landmarkProjectNames = [
  "WDFCC / Dedicated Freight Corridor, Ahmedabad",
  "Noida ITMS",
  "Chandigarh ICCC Smart City",
  "Ahmedabad Police / APCO, Gujarat",
  "RTGC, Andhra Pradesh",
  "ISRO IET",
  "ISRO ICET",
  "DRDO (3 Projects), Balasore",
  "Dangote Refinery, Nigeria",
  "Reliance DMD & NMD Design Order, Gujarat",
  "MGIGSS Jaipur",
  "RCAT Jaipur",
  "Bhamashah Techno-HUB, Jaipur",
  "Center of Excellence for Revenue Research, Jaipur",
].map((name) => ({
  name,
  source: { document: deck, page: name.includes("WDFCC") ? 9 : 8, note: "Project table and project-reference slides." },
}));

export const customerLogoReferences: CustomerLogoReference[] = [
  "Shell",
  "Gulf",
  "Accenture",
  "ISRO",
  "DRDO",
  "Airport Authority of India",
  "ADNOC",
  "GE",
  "ABB",
  "Indian Railways",
  "Delhi Metro",
  "Mumbai Metro",
  "Lucknow Metro",
  "Kochi Metro",
  "Dedicated Freight Corridor",
  "Dubai Electricity & Water Authority",
  "Thales",
  "ONGC",
  "IndianOil",
  "Hindustan Petroleum",
  "Bharat Petroleum",
  "Oil India",
  "Schneider Electric",
  "Siemens",
  "Larsen & Toubro",
  "Reliance Industries",
  "Dangote",
  "Vedanta",
  "Baker Hughes",
  "Honeywell",
  "Abu Dhabi Airport",
  "Infosys",
  "Adani",
  "Tata Steel",
  "Alstom",
  "NEOM",
  "Doha Metro",
  "Engineers India Limited",
  "BARC",
  "UltraTech Cement",
  "Yokogawa",
  "Saudi Electricity Company",
  "KNPC",
  "NHPC",
  "Nestle",
  "Jindal Steel & Power",
  "JSW",
  "Hitachi",
  "Petroleum Development Oman",
  "Qatar General Electricity & Water Corporation",
].map((name) => ({
  name,
  sector: "Source logo wall sector grouping confirmation required",
  source: { document: deck, page: 4, note: "Clearly legible examples from customer-logo wall." },
}));
