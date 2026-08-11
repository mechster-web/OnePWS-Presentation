import fs from "node:fs";
import path from "node:path";
import PptxGenJS from "pptxgenjs";

const OUT = "output/OnePWS-Control-Room-Capability-Presentation.pptx";

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OnePWS Private Limited";
pptx.company = "OnePWS Private Limited";
pptx.subject = "Control Room Capability Presentation";
pptx.title = "OnePWS Control Room Capability Presentation";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineLayout({ name: "LAYOUT_WIDE", width: 13.333, height: 7.5 });

const C = {
  white: "FFFFFF",
  black: "0A0A0A",
  charcoal: "1D1F22",
  graphite: "3B3F45",
  light: "F3F4F5",
  rule: "D9DDE2",
  muted: "72777F",
  red: "D71920",
  redTint: "FBE8EA",
};

const W = 13.333;
const H = 7.5;
const M = { l: 0.65, r: 0.65, t: 0.48, b: 0.48 };
const TOTAL = 65;

const slidePlan = [
  ["cover", "Opening and positioning", "OnePWS Control Room Capability Presentation", "Control Room Consoles, Design-Build Solutions & Ergonomic Engineering"],
  ["headline", "Opening and positioning", "Control Rooms Are Mission-Critical Environments", "Continuous monitoring, coordination and decisions in high-stakes environments."],
  ["headline", "Opening and positioning", "OnePWS Positioning Statement", "Consoles, ergonomic engineering and integrated design-build environments."],
  ["process", "Opening and positioning", "Presentation Roadmap", "Credentials | Understanding | Products | Ergonomics | Design-build | Manufacturing | Certifications | Projects | Next steps"],
  ["proof", "OnePWS company credentials", "OnePWS At A Glance", "Current OnePWS facts from the 2026 capability presentation."],
  ["headline", "OnePWS company credentials", "Formerly Pyrotech Workspace Solutions", "Historical continuity shown only where it supports credibility."],
  ["proof", "OnePWS company credentials", "Pyrotech Group Strength", "Group scale backing the OnePWS control-room capability."],
  ["fullImage", "OnePWS company credentials", "Manufacturing Footprint", "Replace image with approved factory or manufacturing photograph."],
  ["proof", "OnePWS company credentials", "Global Customer Reach", "250+ customers and 35+ countries from current source deck."],
  ["proof", "OnePWS company credentials", "Awards And Recognition", "Thales, CII and approved legacy recognition."],
  ["cert", "OnePWS company credentials", "Management Systems And SAP", "ISO 9001, ISO 14001, ISO 45001 and SAP-backed data management."],
  ["section", "Understanding mission-critical control rooms", "Understanding Mission-Critical Control Rooms", "The operating environment, the human pressure and the design response."],
  ["comparison", "Understanding mission-critical control rooms", "Challenges Faced By Operators", "Fatigue, overload, posture, glare, noise, fragmented displays and difficult escalation."],
  ["comparison", "Understanding mission-critical control rooms", "Operational Risks Of Poor Design", "Poor sightlines, maintenance disruption and unmanaged expansion risk."],
  ["headline", "Understanding mission-critical control rooms", "Human-Centred Control-Room Philosophy", "The room, console and environment planned around human decisions."],
  ["productOverview", "Understanding mission-critical control rooms", "Complete Control-Room Ecosystem", "Consoles, video wall, lighting, acoustics, raised floor, wall systems and service access."],
  ["section", "Control-room products and intelligent features", "Control-Room Products And Intelligent Features", "Console families and advanced feature layers for operator environments."],
  ["productOverview", "Control-room products and intelligent features", "Control-Room Console Portfolio", "Standard ranges and custom builds for operator consoles and command desks."],
  ["productOverview", "Control-room products and intelligent features", "Standard And Custom Console Ranges", "Dynamic XE, Dynamic M, Xlat, Xlat CE, Xlat Cyber, Xlat XE, Xlat ZE, Xtron and Xlat SERD."],
  ["productDetail", "Control-room products and intelligent features", "Adaptive Console Systems", "Adaptive sit-stand console, rotatable direction and operator-specific adjustment."],
  ["productDetail", "Control-room products and intelligent features", "Operator Intelligence Features", "Operator Alertness Management System, voice command and universal controller."],
  ["productDetail", "Control-room products and intelligent features", "Situational Awareness And Room-State Features", "Situational awareness, RFID user adjustment and user-specific room behaviour."],
  ["productDetail", "Control-room products and intelligent features", "Safety And Movement Systems", "Safe anti-collision mechanism and automatic articulated monitor arm."],
  ["productDetail", "Control-room products and intelligent features", "Cable And Equipment Integration", "Cable routing, equipment placement, service access and integration planning."],
  ["section", "Ergonomic engineering", "Ergonomic Engineering", "Human-factor validation for safer, clearer and more comfortable control-room work."],
  ["process", "Ergonomic engineering", "ISO 11064 Methodology", "Task review | Sightline validation | Console dimension validation | Environmental review"],
  ["process", "Ergonomic engineering", "Task And Workflow Analysis", "Review roles, shifts, critical displays and operating workflows."],
  ["productDetail", "Ergonomic engineering", "Sightline And Viewing Geometry", "Console positions, video-wall geometry and primary viewing zones."],
  ["productDetail", "Ergonomic engineering", "Reach, Posture And Work-Zone Validation", "Knee space, foot space, reach, worktop height and monitor positions."],
  ["productDetail", "Ergonomic engineering", "Lighting, Glare, Acoustic And Thermal Comfort", "Lux, glare, acoustics, thermal comfort and fatigue factors reviewed."],
  ["technical", "Ergonomic engineering", "Ergonomic Study Deliverables", "Task review, layout validation, console validation and environmental recommendations."],
  ["section", "Integrated design-build capability", "Integrated Design-Build Capability", "One coordinated scope from design and engineering to supply and site execution."],
  ["process", "Integrated design-build capability", "Integrated Design-Build Approach", "Design | Supply | Quality control | FAT | Site execution | SAT | Warranty | AMC"],
  ["fullImage", "Integrated design-build capability", "Architecture And Interior Design", "Replace image with approved control-room plan, render or project photograph."],
  ["productDetail", "Integrated design-build capability", "Wall, Cladding And Acoustic Systems", "Wall systems, cladding, acoustic panels and control-room sound control."],
  ["productDetail", "Architectural and environmental systems", "Ceiling And Lighting Systems", "Ceiling coordination for lighting, acoustics, HVAC and glare management."],
  ["productDetail", "Architectural and environmental systems", "Raised Access Flooring", "Power, data, service routing and lifecycle access below the room."],
  ["productDetail", "Architectural and environmental systems", "Video-Wall Integration", "Video-wall geometry, viewing zones, structure, power and data coordination."],
  ["productDetail", "Architectural and environmental systems", "Supervisor And Collaboration Areas", "Supervisor sightlines, escalation paths, review desks and collaboration spaces."],
  ["section", "Engineering and project methodology", "Engineering And Project Methodology", "A delivery pathway built for technical coordination and accountable execution."],
  ["process", "Engineering and project methodology", "Design-To-Delivery Process", "Discover | Design | Engineer | Manufacture | FAT | Install | SAT | Handover"],
  ["process", "Engineering and project methodology", "Engineering Coordination", "Architecture | Structural | Mechanical | Electrical | Plumbing | Ergonomics | Acoustics | Illumination"],
  ["process", "Engineering and project methodology", "Project Planning And Execution", "Project planning, supply, quality control, packaging, forwarding and site execution."],
  ["process", "Engineering and project methodology", "FAT, SAT And Handover", "Factory Acceptance Test, Site Acceptance Test, quality control, commissioning and handover."],
  ["section", "Manufacturing and quality", "Manufacturing And Quality", "In-house manufacturing, equipment strength and process discipline."],
  ["proof", "Manufacturing and quality", "In-House Manufacturing Strength", "100% in-house manufacturing and major equipment strength."],
  ["technical", "Manufacturing and quality", "Major Manufacturing Equipment", "Biesse, Trumpf, Salvagnini, Feldar, Weeke and other listed equipment."],
  ["technical", "Manufacturing and quality", "Raw-Material And Component Quality", "Approved material and component proof from the current source deck."],
  ["process", "Manufacturing and quality", "Internal Quality-Improvement Programme", "Supplier evaluation | MTTR | SPC | CAPA | 8D | 5Why | SAP traceability"],
  ["section", "International certifications", "International Certifications", "Safety, sustainability, ergonomic and control-centre compliance proof."],
  ["cert", "International certifications", "International Compliance Overview", "EPD, BIFMA LEVEL, ASTM, BS EN 527, LCA, GREENGUARD, RoHS, UL, Seismic Zone 5, ISO 11064, BIFMA X5.5."],
  ["cert", "International certifications", "Safety, Sustainability And Ergonomic Certifications", "UL, ANSI/BIFMA e3-2019, FIRA, BS EN ISO 11064, BS EN 527, GREENGUARD, RoHS and ASTM E84."],
  ["section", "Project credentials", "Project Credentials", "Approved project proof should carry the capability story."],
  ["project", "Project credentials", "Project Portfolio Overview", "Transport, smart city, energy, governance, public safety and international renovation."],
  ["project", "Project credentials", "DFCC Ahmedabad", "Flagship transport and infrastructure control-room proof."],
  ["project", "Project credentials", "Chandigarh ICCC And ITMS Noida", "Smart-city and transport command-centre proof."],
  ["project", "Project credentials", "Adani Khavda, Kutch", "Current energy/infrastructure project reference."],
  ["project", "Project credentials", "RTGC Andhra Pradesh", "Governance/control-room project reference."],
  ["project", "Project credentials", "ACPO/APCO Ahmedabad And Shell Brunei", "Public safety reference and live-renovation proof."],
  ["proof", "Global customers and presence", "Esteemed Customers And Global Presence", "Curated logos by sector, 250+ customers and 35+ countries."],
  ["section", "Why OnePWS", "Why OnePWS", "Integrated capability, technical credibility, manufacturing control and project proof."],
  ["comparison", "Why OnePWS", "One Partner Across The Complete Control Room", "From study and design to manufacturing, installation, SAT, warranty and AMC."],
  ["process", "Next steps and closing", "Engagement Process", "Discovery | Site data | Ergonomic study | Concept layout | Engineering proposal | Execution"],
  ["closing", "Next steps and closing", "The Future Of Control Rooms Starts Here", "Start the next control-room consultation with OnePWS."],
  ["technical", "Technical appendix", "Contact, Confidentiality And Technical Appendix Index", "Current contact details, updated confidentiality and backup appendix index."],
];

if (slidePlan.length !== TOTAL) {
  throw new Error(`Expected ${TOTAL} slides, got ${slidePlan.length}`);
}

function addLogo(slide, x = M.l, y = 0.25, scale = 1) {
  slide.addText("ONE", {
    x, y, w: 0.52 * scale, h: 0.18 * scale,
    fontFace: "Aptos Display", fontSize: 8 * scale, bold: true, color: C.black,
    margin: 0, breakLine: false,
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: x + 0.46 * scale, y: y + 0.012 * scale, w: 0.14 * scale, h: 0.14 * scale,
    rotate: 90, fill: { color: C.red }, line: { color: C.red },
  });
  slide.addText("PWS", {
    x: x + 0.58 * scale, y, w: 0.5 * scale, h: 0.18 * scale,
    fontFace: "Aptos Display", fontSize: 8 * scale, bold: true, color: C.black,
    margin: 0,
  });
}

function addFooter(slide, idx, section, dark = false) {
  const y = 7.05;
  const color = dark ? "CBD0D6" : C.muted;
  const rule = dark ? "3B3F45" : C.rule;
  slide.addShape(pptx.ShapeType.line, { x: M.l, y, w: W - M.l - M.r, h: 0, line: { color: rule, width: 0.5 } });
  addLogo(slide, M.l, 7.18, 0.9);
  slide.addText(section, { x: 1.7, y: 7.15, w: 5.2, h: 0.18, fontSize: 7.5, color, margin: 0 });
  slide.addText("CONFIDENTIAL", { x: 9.4, y: 7.15, w: 1.25, h: 0.18, fontSize: 7.5, color, margin: 0, align: "right" });
  slide.addText(`${String(idx).padStart(2, "0")} / ${TOTAL}`, { x: 10.82, y: 7.15, w: 1.85, h: 0.18, fontSize: 7.5, color, margin: 0, align: "right" });
}

function addSectionLabel(slide, section, x = M.l, y = 0.78, color = C.red) {
  slide.addShape(pptx.ShapeType.rect, { x, y: y + 0.04, w: 0.28, h: 0.035, fill: { color }, line: { color } });
  slide.addText(section.toUpperCase(), { x: x + 0.36, y, w: 7, h: 0.18, fontSize: 7.5, color: C.muted, charSpace: 1.1, margin: 0 });
}

function addTitle(slide, section, title, subtitle) {
  addSectionLabel(slide, section);
  slide.addText(title, { x: M.l, y: 1.12, w: 5.6, h: 0.86, fontFace: "Aptos Display", fontSize: 30, bold: true, color: C.black, margin: 0, fit: "shrink" });
  if (subtitle) slide.addText(subtitle, { x: M.l, y: 2.08, w: 5.4, h: 0.5, fontSize: 13.5, color: C.graphite, margin: 0, fit: "shrink", breakLine: false });
}

function imagePlaceholder(slide, x, y, w, h, label = "Approved image placeholder") {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: C.light, transparency: 8 }, line: { color: C.rule, width: 1 } });
  slide.addShape(pptx.ShapeType.line, { x, y, w, h, line: { color: C.rule, width: 0.5, transparency: 25 } });
  slide.addShape(pptx.ShapeType.line, { x, y: y + h, w, h: -h, line: { color: C.rule, width: 0.5, transparency: 25 } });
  slide.addText(label, { x: x + 0.18, y: y + h / 2 - 0.13, w: w - 0.36, h: 0.26, fontSize: 10, color: C.muted, align: "center", margin: 0 });
}

function noteBox(slide, x, y, w, h, title, body) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: C.white, transparency: 0 }, line: { color: C.rule, width: 0.8 } });
  slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.04, h, fill: { color: C.red }, line: { color: C.red } });
  slide.addText(title.toUpperCase(), { x: x + 0.18, y: y + 0.14, w: w - 0.34, h: 0.16, fontSize: 7.2, color: C.red, charSpace: 1.3, margin: 0 });
  slide.addText(body, { x: x + 0.18, y: y + 0.42, w: w - 0.34, h: h - 0.52, fontSize: 10.5, color: C.graphite, margin: 0.02, fit: "shrink" });
}

function addCover({ title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  imagePlaceholder(slide, 6.6, 0, 6.73, 7.5, "Replace with approved OnePWS control-room hero image");
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 6.95, h: 7.5, fill: { color: C.white, transparency: 0 }, line: { color: C.white } });
  addLogo(slide, M.l, 0.58, 1.35);
  slide.addText("CAPABILITY PRESENTATION", { x: M.l, y: 1.55, w: 4.4, h: 0.18, fontSize: 8, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText(title, { x: M.l, y: 2.02, w: 5.55, h: 1.35, fontFace: "Aptos Display", fontSize: 34, bold: true, color: C.black, margin: 0, fit: "shrink" });
  slide.addText(subtitle, { x: M.l, y: 3.55, w: 4.95, h: 0.72, fontSize: 16, color: C.graphite, margin: 0 });
  slide.addText("OnePWS Private Limited  |  2026", { x: M.l, y: 6.5, w: 3.5, h: 0.2, fontSize: 10, color: C.muted, margin: 0 });
  addFooter(slide, idx, "Opening and positioning");
}

function addSectionDivider({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.charcoal };
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.12, h: H, fill: { color: C.red }, line: { color: C.red } });
  addLogo(slide, M.l, 0.45, 1.1);
  slide.addText(section.toUpperCase(), { x: M.l, y: 1.62, w: 5.5, h: 0.22, fontSize: 8, color: "CBD0D6", charSpace: 1.4, margin: 0 });
  slide.addText(title, { x: M.l, y: 2.05, w: 8.6, h: 1.1, fontFace: "Aptos Display", fontSize: 40, bold: true, color: C.white, margin: 0, fit: "shrink" });
  slide.addText(subtitle, { x: M.l, y: 3.36, w: 6.3, h: 0.55, fontSize: 15, color: "D7DBE0", margin: 0 });
  imagePlaceholder(slide, 8.35, 1.1, 4.15, 4.65, "Approved technical / project image");
  addFooter(slide, idx, section, true);
}

function addHeadlineSlide({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  imagePlaceholder(slide, 7.05, 1.0, 5.35, 4.6, "Replace with approved visual");
  noteBox(slide, M.l, 4.72, 5.45, 1.35, "Structured placeholder", "One concise insight, one proof point and one source note. Keep customer-facing text short.");
  addFooter(slide, idx, section);
}

function addCompanyProof({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  const metrics = ["Metric", "Metric", "Metric", "Metric"];
  metrics.forEach((m, i) => {
    const x = M.l + i * 2.95;
    slide.addShape(pptx.ShapeType.rect, { x, y: 3.0, w: 2.55, h: 1.45, fill: { color: C.white }, line: { color: C.rule } });
    slide.addText("00+", { x: x + 0.2, y: 3.24, w: 1.6, h: 0.45, fontSize: 28, bold: true, color: i === 0 ? C.red : C.black, margin: 0 });
    slide.addText(m.toUpperCase(), { x: x + 0.2, y: 3.86, w: 2, h: 0.18, fontSize: 7.2, color: C.muted, charSpace: 1.2, margin: 0 });
    slide.addText("Replace with sourced value", { x: x + 0.2, y: 4.12, w: 2.05, h: 0.22, fontSize: 8.5, color: C.graphite, margin: 0 });
  });
  noteBox(slide, M.l, 5.15, 11.85, 0.72, "Source control", "Use numbers only from current OnePWS deck or approved internal data. Put confirmation notes in speaker notes.");
  addFooter(slide, idx, section);
}

function addProductOverview({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  imagePlaceholder(slide, 6.85, 1.1, 5.55, 4.8, "Approved product or ecosystem visual");
  ["Capability 01", "Capability 02", "Capability 03"].forEach((label, i) => {
    const y = 3.0 + i * 0.82;
    slide.addShape(pptx.ShapeType.rect, { x: M.l, y, w: 4.9, h: 0.56, fill: { color: C.white }, line: { color: C.rule } });
    slide.addText(label, { x: M.l + 0.18, y: y + 0.12, w: 1.2, h: 0.16, fontSize: 7.5, color: C.red, margin: 0 });
    slide.addText("Editable capability placeholder", { x: M.l + 1.3, y: y + 0.1, w: 3.1, h: 0.18, fontSize: 10.5, bold: true, color: C.black, margin: 0 });
  });
  addFooter(slide, idx, section);
}

function addProductDetail({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  imagePlaceholder(slide, 0.65, 3.0, 5.55, 2.85, "Approved product image / editable technical diagram");
  noteBox(slide, 6.75, 1.18, 5.65, 1.05, "Operational value", "Placeholder for concise operational value. Use confirmation-required labels for unverified capabilities.");
  noteBox(slide, 6.75, 2.55, 5.65, 1.05, "User benefit", "Placeholder for operator, supervisor or maintenance benefit.");
  noteBox(slide, 6.75, 3.92, 5.65, 1.05, "Architectural integration", "Placeholder for how the feature fits into the control-room environment.");
  noteBox(slide, 6.75, 5.28, 5.65, 0.72, "Technical note", "Confirmation required before adding specifications.");
  addFooter(slide, idx, section);
}

function addProcessDiagram({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  const steps = subtitle.split("|").map((s) => s.trim()).filter(Boolean).slice(0, 8);
  const startX = M.l;
  const y = 3.35;
  const stepW = 1.36;
  steps.forEach((step, i) => {
    const x = startX + i * 1.46;
    slide.addShape(pptx.ShapeType.rect, { x, y, w: stepW, h: 0.72, fill: { color: i === 0 ? C.redTint : C.white }, line: { color: i === 0 ? C.red : C.rule } });
    slide.addText(String(i + 1).padStart(2, "0"), { x: x + 0.1, y: y + 0.08, w: 0.38, h: 0.16, fontSize: 7.5, color: C.red, margin: 0 });
    slide.addText(step, { x: x + 0.1, y: y + 0.32, w: stepW - 0.2, h: 0.24, fontSize: 8.5, color: C.black, bold: true, margin: 0, fit: "shrink" });
    if (i < steps.length - 1) {
      slide.addShape(pptx.ShapeType.line, { x: x + stepW, y: y + 0.36, w: 0.1, h: 0, line: { color: C.rule, width: 1 } });
    }
  });
  noteBox(slide, M.l, 5.25, 11.85, 0.72, "Editable process note", "Replace placeholders with approved process names, deliverables and proof points.");
  addFooter(slide, idx, section);
}

function addCertificationOverview({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  const items = ["Safety", "Sustainability", "Ergonomics", "Materials", "Acoustic", "Control centre"];
  items.forEach((item, i) => {
    const x = M.l + (i % 3) * 3.9;
    const y = 3.0 + Math.floor(i / 3) * 1.0;
    slide.addShape(pptx.ShapeType.rect, { x, y, w: 3.45, h: 0.72, fill: { color: C.white }, line: { color: C.rule } });
    slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.08, h: 0.72, fill: { color: i === 0 ? C.red : C.graphite }, line: { color: i === 0 ? C.red : C.graphite } });
    slide.addText(item, { x: x + 0.22, y: y + 0.13, w: 2.2, h: 0.18, fontSize: 11, bold: true, color: C.black, margin: 0 });
    slide.addText("Certification placeholder", { x: x + 0.22, y: y + 0.41, w: 2.8, h: 0.16, fontSize: 8, color: C.muted, margin: 0 });
  });
  noteBox(slide, M.l, 5.25, 11.85, 0.72, "Scope caution", "Do not imply every certification applies to every product unless certificate scope is confirmed.");
  addFooter(slide, idx, section);
}

function addProjectCaseStudy({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addSectionLabel(slide, section);
  slide.addText(title, { x: M.l, y: 1.1, w: 4.6, h: 0.64, fontFace: "Aptos Display", fontSize: 25, bold: true, color: C.black, margin: 0, fit: "shrink" });
  slide.addText(subtitle, { x: M.l, y: 1.9, w: 4.6, h: 0.45, fontSize: 11.5, color: C.graphite, margin: 0 });
  imagePlaceholder(slide, 5.65, 0.95, 6.75, 4.55, "Replace with approved project photograph");
  const rows = [
    [{ text: "Field", options: { bold: true, color: C.black } }, { text: "Placeholder" }],
    ["Location", "Information unavailable"],
    ["Sector", "Information unavailable"],
    ["OnePWS scope", "Confirmation required"],
    ["Key systems", "Confirmation required"],
  ];
  slide.addTable(rows, { x: M.l, y: 3.0, w: 4.65, h: 2.2, border: { type: "solid", color: C.rule, pt: 0.5 }, fontFace: "Aptos", fontSize: 8.5, color: C.graphite, fill: { color: C.white }, margin: 0.06 });
  noteBox(slide, 5.65, 5.76, 6.75, 0.55, "Source note", "Project content must come from approved source deck or internal confirmation.");
  addFooter(slide, idx, section);
}

function addFullImageProject({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  imagePlaceholder(slide, 0, 0, W, 7.02, "Replace with one approved full-slide image");
  slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 4.95, h: 7.02, fill: { color: C.white, transparency: 5 }, line: { color: C.white, transparency: 100 } });
  addSectionLabel(slide, section, M.l, 0.75);
  slide.addText(title, { x: M.l, y: 1.15, w: 3.8, h: 0.86, fontFace: "Aptos Display", fontSize: 28, bold: true, color: C.black, margin: 0, fit: "shrink" });
  slide.addText(subtitle, { x: M.l, y: 2.2, w: 3.55, h: 0.65, fontSize: 12, color: C.graphite, margin: 0 });
  noteBox(slide, M.l, 4.9, 3.75, 0.75, "Image approval", "Use only approved OnePWS/project photography.");
  addFooter(slide, idx, section);
}

function addComparisonSlide({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  ["Conventional issue", "OnePWS response"].forEach((h, i) => {
    const x = M.l + i * 6.05;
    slide.addShape(pptx.ShapeType.rect, { x, y: 3.08, w: 5.45, h: 2.35, fill: { color: i === 0 ? C.light : C.white }, line: { color: i === 0 ? C.rule : C.red } });
    slide.addText(h, { x: x + 0.22, y: 3.32, w: 4.4, h: 0.24, fontSize: 14, bold: true, color: i === 0 ? C.graphite : C.black, margin: 0 });
    slide.addText("Editable comparison points\\n- Short point\\n- Short point\\n- Short point", { x: x + 0.22, y: 3.85, w: 4.75, h: 1.1, fontSize: 11, color: C.graphite, margin: 0.03, breakLine: false });
  });
  addFooter(slide, idx, section);
}

function addTechnicalTable({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  addTitle(slide, section, title, subtitle);
  const rows = [
    [{ text: "Category", options: { bold: true, color: C.black } }, { text: "Source item", options: { bold: true, color: C.black } }, { text: "Confirmation", options: { bold: true, color: C.black } }],
    ["Placeholder", "Use sourced data only", "Required"],
    ["Placeholder", "Use sourced data only", "Required"],
    ["Placeholder", "Use sourced data only", "Required"],
    ["Placeholder", "Use sourced data only", "Required"],
  ];
  slide.addTable(rows, { x: M.l, y: 3.02, w: 11.85, h: 2.55, border: { type: "solid", color: C.rule, pt: 0.5 }, fontFace: "Aptos", fontSize: 9.2, color: C.graphite, fill: { color: C.white }, margin: 0.08, valign: "mid" });
  noteBox(slide, M.l, 5.95, 11.85, 0.42, "Technical appendix", "Tables remain editable. Replace placeholders with approved certificate, material, process or contact data.");
  addFooter(slide, idx, section);
}

function addClosingSlide({ section, title, subtitle }, idx) {
  const slide = pptx.addSlide();
  slide.background = { color: C.charcoal };
  imagePlaceholder(slide, 6.85, 0.7, 5.55, 4.45, "Replace with approved closing control-room image");
  addLogo(slide, M.l, 0.58, 1.25);
  slide.addText(title, { x: M.l, y: 1.65, w: 5.25, h: 0.95, fontFace: "Aptos Display", fontSize: 34, bold: true, color: C.white, margin: 0, fit: "shrink" });
  slide.addText(subtitle, { x: M.l, y: 2.95, w: 4.6, h: 0.4, fontSize: 14, color: "D7DBE0", margin: 0 });
  noteBox(slide, M.l, 4.7, 5.0, 1.05, "Next step", "Control-room consultation | Concept layout | Technical credentials | Experience centre visit");
  slide.addText("www.onepws.com  |  1800 889 6997", { x: M.l, y: 6.18, w: 4.4, h: 0.2, fontSize: 11, color: C.white, margin: 0 });
  addFooter(slide, idx, section, true);
}

function addSlideByType([type, section, title, subtitle], idx) {
  const payload = { section, title, subtitle };
  if (type === "cover") return addCover(payload, idx);
  if (type === "section") return addSectionDivider(payload, idx);
  if (type === "headline") return addHeadlineSlide(payload, idx);
  if (type === "proof") return addCompanyProof(payload, idx);
  if (type === "productOverview") return addProductOverview(payload, idx);
  if (type === "productDetail") return addProductDetail(payload, idx);
  if (type === "process") return addProcessDiagram(payload, idx);
  if (type === "cert") return addCertificationOverview(payload, idx);
  if (type === "project") return addProjectCaseStudy(payload, idx);
  if (type === "fullImage") return addFullImageProject(payload, idx);
  if (type === "comparison") return addComparisonSlide(payload, idx);
  if (type === "technical") return addTechnicalTable(payload, idx);
  if (type === "closing") return addClosingSlide(payload, idx);
  return addHeadlineSlide(payload, idx);
}

slidePlan.forEach((entry, i) => addSlideByType(entry, i + 1));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
await pptx.writeFile({ fileName: OUT });
console.log(`Generated ${OUT}`);
