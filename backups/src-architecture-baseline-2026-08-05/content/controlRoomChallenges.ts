export type ChallengeHotspot = {
  id: string;
  title: string;
  label: string;
  area: string;
  x: number;
  y: number;
  focus: { x: number; y: number; scale: number };
  explanation: string;
  impact: string;
  technicalDetail: string;
  voiceover: string;
};

export const controlRoomChallenges: ChallengeHotspot[] = [
  {
    id: "operator-fatigue",
    title: "Operator fatigue",
    label: "Fatigue",
    area: "Operator position",
    x: 40,
    y: 65,
    focus: { x: -5, y: -7, scale: 1.16 },
    explanation:
      "Long shifts become harder when screens, posture, lighting and reach zones are not designed around the operator.",
    impact:
      "Fatigue reduces attention quality, slows interpretation and makes small abnormalities easier to miss.",
    technicalDetail:
      "Review seating posture, monitor height, reach envelope, glare, ambient lighting and shift-duration comfort. Exact ergonomic standards require confirmation.",
    voiceover:
      "Operator fatigue is not only a human issue. It is often a room-design issue. The workstation should support attention across the full shift.",
  },
  {
    id: "information-overload",
    title: "Information overload",
    label: "Overload",
    area: "Display wall",
    x: 58,
    y: 32,
    focus: { x: -14, y: 9, scale: 1.2 },
    explanation:
      "When every source competes for attention, operators must spend energy separating signal from background noise.",
    impact:
      "Critical alerts can lose hierarchy, and the room becomes visually busy exactly when clarity matters most.",
    technicalDetail:
      "Define primary, secondary and task-level display zones. Group information by role, priority and response path before final display-wall planning.",
    voiceover:
      "Information overload happens when the room displays everything with the same urgency. A control room needs hierarchy, not more visual noise.",
  },
  {
    id: "poor-ergonomics",
    title: "Poor ergonomics",
    label: "Ergonomics",
    area: "Desk geometry",
    x: 33,
    y: 73,
    focus: { x: 6, y: -11, scale: 1.2 },
    explanation:
      "A console that looks functional can still force awkward viewing angles, poor posture or repeated reach strain.",
    impact:
      "Physical discomfort becomes operational drag, especially in rooms that run continuously.",
    technicalDetail:
      "Validate console depth, monitor distance, chair clearance, keyboard/mouse position, knee space, cable access and operator circulation.",
    voiceover:
      "Poor ergonomics quietly compounds over time. The console, chair, screens and room geometry must be designed as one operator position.",
  },
  {
    id: "fragmented-systems",
    title: "Fragmented systems",
    label: "Fragmented",
    area: "Separate work zones",
    x: 73,
    y: 54,
    focus: { x: -25, y: -4, scale: 1.14 },
    explanation:
      "Disconnected systems force operators and supervisors to reconcile information manually across desks, screens and teams.",
    impact:
      "Coordination slows because the environment does not make relationships between systems visible.",
    technicalDetail:
      "Map operator roles, shared views, escalation paths, supervisor lines of sight and collaboration zones before layout finalization.",
    voiceover:
      "Fragmented systems create fragmented attention. The room should help teams understand relationships between events, people and actions.",
  },
  {
    id: "slow-response",
    title: "Slow incident response",
    label: "Response",
    area: "Incident workflow",
    x: 63,
    y: 68,
    focus: { x: -18, y: -11, scale: 1.18 },
    explanation:
      "When alerts, people and decision zones are poorly aligned, response depends on workarounds instead of room intelligence.",
    impact:
      "Seconds are lost while teams identify ownership, verify context and coordinate the next action.",
    technicalDetail:
      "Design response paths around alert priority, handoff points, supervisor intervention, shared displays and communication flow.",
    voiceover:
      "Incident response should feel rehearsed by the room itself. The environment must make detection, ownership and coordination obvious.",
  },
  {
    id: "inconsistent-environments",
    title: "Inconsistent environments",
    label: "Consistency",
    area: "Room envelope",
    x: 23,
    y: 41,
    focus: { x: 18, y: 4, scale: 1.13 },
    explanation:
      "Lighting, acoustics, finishes, furniture and thermal comfort are often solved separately, creating uneven operator experience.",
    impact:
      "Different positions in the same room can perform differently because the environment is not consistent.",
    technicalDetail:
      "Coordinate lux levels, glare control, HVAC distribution, acoustic surfaces, finish reflectance and workstation spacing as one envelope.",
    voiceover:
      "A control room must be consistent from seat to seat. Comfort and visibility should not depend on where an operator happens to sit.",
  },
  {
    id: "difficult-maintenance",
    title: "Difficult maintenance",
    label: "Maintenance",
    area: "Cable and service void",
    x: 49,
    y: 84,
    focus: { x: -4, y: -23, scale: 1.22 },
    explanation:
      "Poor service access turns routine maintenance into disruption, especially when cabling and equipment access are hidden after installation.",
    impact:
      "Repairs, upgrades and inspections become slower, riskier and more intrusive for live operations.",
    technicalDetail:
      "Plan access floor zones, cable segregation, service panels, equipment ventilation and maintenance clearances before installation.",
    voiceover:
      "Maintenance is part of the operating life of the room. Service access must be designed before the first cable is installed.",
  },
  {
    id: "limited-scalability",
    title: "Limited scalability",
    label: "Scalability",
    area: "Future expansion zone",
    x: 82,
    y: 78,
    focus: { x: -31, y: -18, scale: 1.16 },
    explanation:
      "Rooms planned only for today’s equipment struggle when operations expand, teams grow or new systems are added.",
    impact:
      "Growth becomes clutter: extra desks, temporary screens, compromised circulation and harder maintenance.",
    technicalDetail:
      "Reserve expansion zones for consoles, displays, power/data, HVAC load, cable routing, operator circulation and supervisor visibility.",
    voiceover:
      "A mission-critical room should be ready for change. Scalability is a design decision made at the beginning, not a retrofit later.",
  },
];
