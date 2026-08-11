export type IncidentStepId =
  | "normal-operation"
  | "anomaly-detected"
  | "zone-highlight"
  | "lighting-change"
  | "video-wall-update"
  | "operator-prioritised"
  | "supervisor-alert"
  | "collaboration-activated"
  | "event-acknowledged"
  | "event-resolved"
  | "incident-summary";

export type IncidentZone =
  | "normal"
  | "console"
  | "lighting"
  | "videoWall"
  | "operator"
  | "copilot"
  | "supervisor"
  | "collaboration"
  | "summary";

export type IncidentSimulationStep = {
  id: IncidentStepId;
  sequence: number;
  title: string;
  shortLabel: string;
  zone: IncidentZone;
  timestamp: string;
  systemMessage: string;
  operatorMessage: string;
  visualInstruction: string;
  narration: string;
  status: "detecting" | "prioritising" | "coordinating" | "resolving" | "summarising";
};

export const incidentSimulationSteps: IncidentSimulationStep[] = [
  {
    id: "normal-operation",
    sequence: 1,
    title: "Normal operation",
    shortLabel: "Normal",
    zone: "normal",
    timestamp: "00:00",
    systemMessage: "The control room is in steady monitoring state.",
    operatorMessage: "Operators, supervisors, video wall and collaboration spaces remain ready but calm.",
    visualInstruction: "Room remains dark, balanced and stable.",
    narration:
      "The demonstration begins in normal operation. The room is calm, monitored and ready for escalation.",
    status: "detecting",
  },
  {
    id: "anomaly-detected",
    sequence: 2,
    title: "Operational anomaly detected",
    shortLabel: "Detect",
    zone: "console",
    timestamp: "00:07",
    systemMessage: "Anomaly signal enters the monitoring workflow.",
    operatorMessage: "A deviation is surfaced without forcing the operator to search across every display.",
    visualInstruction: "Signal pulse appears at the active operator console.",
    narration:
      "A sector-neutral anomaly is detected. This is a conceptual demonstration of how the environment could prioritise an exception.",
    status: "detecting",
  },
  {
    id: "zone-highlight",
    sequence: 3,
    title: "Relevant console and zone highlighted",
    shortLabel: "Zone",
    zone: "operator",
    timestamp: "00:12",
    systemMessage: "The affected console, desk zone and decision area are visually prioritised.",
    operatorMessage: "The operator can identify ownership immediately.",
    visualInstruction: "Console zone receives a controlled warm highlight.",
    narration:
      "The affected operator zone is highlighted so responsibility and attention are clear before escalation begins.",
    status: "prioritising",
  },
  {
    id: "lighting-change",
    sequence: 4,
    title: "Situational-awareness lighting changes",
    shortLabel: "Signal",
    zone: "lighting",
    timestamp: "00:18",
    systemMessage: "Room lighting shifts to a focused incident state.",
    operatorMessage: "The room communicates urgency without visual noise.",
    visualInstruction: "Architectural light bands move from steady monitoring to alert state.",
    narration:
      "Situational lighting changes the room state. Actual lighting integration requires confirmation for each deployed project.",
    status: "prioritising",
  },
  {
    id: "video-wall-update",
    sequence: 5,
    title: "Relevant information moves to the video wall",
    shortLabel: "Wall",
    zone: "videoWall",
    timestamp: "00:25",
    systemMessage: "Incident-relevant views move to the primary display hierarchy.",
    operatorMessage: "The team sees the same shared operating picture.",
    visualInstruction: "Video wall panels reorganise into incident overview, trend and location views.",
    narration:
      "The intelligent video wall shifts from normal monitoring to incident content, shown here as a conceptual control-room behaviour.",
    status: "prioritising",
  },
  {
    id: "operator-prioritised",
    sequence: 6,
    title: "Operator receives focused information",
    shortLabel: "Operator",
    zone: "operator",
    timestamp: "00:32",
    systemMessage: "Relevant signals, status and next actions are consolidated at the operator position.",
    operatorMessage: "Information is reduced to what is needed for the next decision.",
    visualInstruction: "Operator display compresses low-priority signals and raises incident context.",
    narration:
      "The affected operator receives a prioritised view, reducing search time and cognitive load during the response.",
    status: "prioritising",
  },
  {
    id: "supervisor-alert",
    sequence: 7,
    title: "Supervisor receives the event summary",
    shortLabel: "Supervise",
    zone: "supervisor",
    timestamp: "00:48",
    systemMessage: "Supervisor view shows owner, status, pending tasks and escalation path.",
    operatorMessage: "Supervisors can coordinate without interrupting primary operator focus.",
    visualInstruction: "Supervisor area receives task overview and escalation line.",
    narration:
      "The supervisor receives a concise task overview, supporting coordination while preserving operator focus.",
    status: "coordinating",
  },
  {
    id: "collaboration-activated",
    sequence: 8,
    title: "Team collaboration begins",
    shortLabel: "Coordinate",
    zone: "collaboration",
    timestamp: "00:58",
    systemMessage: "Emergency collaboration space is prepared for cross-functional response.",
    operatorMessage: "Specialists can coordinate away from the main operator workflow.",
    visualInstruction: "Collaboration room lights and display activate.",
    narration:
      "The emergency collaboration area activates for specialist coordination, shown here as a proposed room behaviour.",
    status: "coordinating",
  },
  {
    id: "event-acknowledged",
    sequence: 9,
    title: "Event is acknowledged",
    shortLabel: "Ack",
    zone: "copilot",
    timestamp: "01:08",
    systemMessage: "The event is acknowledged by the responsible operator or team.",
    operatorMessage: "Human judgement remains central; the room supports the response but does not replace accountability.",
    visualInstruction: "Acknowledgement state appears beside the operator context.",
    narration:
      "The event is acknowledged. This is shown as a conceptual workflow state, not a confirmed live software function.",
    status: "resolving",
  },
  {
    id: "event-resolved",
    sequence: 10,
    title: "Event is resolved",
    shortLabel: "Resolve",
    zone: "normal",
    timestamp: "01:20",
    systemMessage: "Incident state moves from active response back to stable monitoring.",
    operatorMessage: "The room returns to calm monitoring with the response trail preserved.",
    visualInstruction: "Alert states settle back to steady operation.",
    narration:
      "The event is resolved. The room returns to stable monitoring without losing the response trail.",
    status: "resolving",
  },
  {
    id: "incident-summary",
    sequence: 11,
    title: "Shift and incident summary produced",
    shortLabel: "Summary",
    zone: "summary",
    timestamp: "01:28",
    systemMessage: "A shift and incident summary is prepared for review.",
    operatorMessage: "The team can review what happened, what was done and what requires follow-up.",
    visualInstruction: "Summary panel appears with incident sequence, actions and follow-up notes.",
    narration:
      "A shift and incident summary is produced for review. Reporting integrations and exported formats require project-specific confirmation.",
    status: "summarising",
  },
];

export const incidentOutcomeSummary = {
  title: "Conceptual outcome",
  points: [
    "Anomaly visibility moved from detection to shared understanding.",
    "Operator, supervisor and collaboration zones were coordinated as one room experience.",
    "The response trail was preserved for shift review and follow-up.",
  ],
  disclaimer:
    "Conceptual demonstration only. Actual SCADA, BMS, video wall, AI, SOP, lighting and reporting integrations are not confirmed as deployed features unless verified for a specific project.",
};
