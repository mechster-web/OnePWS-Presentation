import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Armchair,
  AlertTriangle,
  Activity,
  BadgeCheck,
  Bell,
  BrainCircuit,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  Cpu,
  Database,
  Droplets,
  Eye,
  Expand,
  FastForward,
  Filter,
  Footprints,
  Gauge,
  Grid2X2,
  Headphones,
  Leaf,
  Moon,
  LockKeyhole,
  Map,
  Monitor,
  Radio,
  Server,
  Siren,
  ScanFace,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareCheckBig,
  Sun,
  Target,
  Thermometer,
  TrendingUp,
  UserCheck,
  Users,
  Video,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordIntelligentOperationsEvent } from "./intelligentOperationsAnalytics";

type SimpleItem = {
  title: string;
  description: string;
  Icon: LucideIcon;
  color?: string;
};

const readinessItems: SimpleItem[] = [
  { title: "Lighting Adjusted", description: "Set to your preferred brightness and tone.", Icon: Sun, color: "text-amber-500" },
  { title: "Console Height Set", description: "Sit-stand console moves to your saved height.", Icon: SlidersHorizontal, color: "text-control-warm" },
  { title: "Monitors Positioned", description: "Displays return to your preferred layout.", Icon: Monitor, color: "text-emerald-500" },
  { title: "Chair & Comfort Ready", description: "Lumbar, tilt and arm settings restored.", Icon: Armchair, color: "text-blue-600" },
  { title: "Dashboard Loaded", description: "Your favorite apps and dashboards are ready.", Icon: Grid2X2, color: "text-violet-600" },
];

const securityItems: SimpleItem[] = [
  { title: "Seamless Identification", description: "", Icon: ScanFace },
  { title: "Secure & Contactless", description: "", Icon: ShieldCheck },
  { title: "Instant Readiness", description: "", Icon: BadgeCheck },
];

const experienceSteps: SimpleItem[] = [
  { title: "You Approach", description: "Room detects your presence.", Icon: Footprints },
  { title: "You Are Recognized", description: "Identity confirmed securely.", Icon: ScanFace },
  { title: "Your Preferences Load", description: "Workspace settings are applied.", Icon: SlidersHorizontal },
  { title: "Environment Adjusts", description: "Lighting, temperature & comfort optimized.", Icon: SquareCheckBig },
  { title: "Systems Ready", description: "Applications, displays & alerts prepared.", Icon: Monitor },
  { title: "You Take Control", description: "Shift begins the moment you enter.", Icon: UserCheck },
];

const outcomeItems: SimpleItem[] = [
  { title: "Faster Start", description: "Access and preferences load before setup begins.", Icon: ShieldCheck },
  { title: "Cleaner Setup", description: "Lighting, screens and comfort return to a known profile.", Icon: Target },
  { title: "Consistent Every Shift", description: "Every setting returns exactly where it belongs.", Icon: UserCheck },
  { title: "Secure by Design", description: "Biometric recognition keeps access safe.", Icon: LockKeyhole },
  { title: "Ready Workspace", description: "The operator starts with the room already aligned.", Icon: Sparkles },
];

const consoleModeItems: (SimpleItem & { color: string })[] = [
  { title: "Monitor", description: "Day-to-day monitoring with real-time situational awareness.", Icon: Monitor, color: "text-blue-600" },
  { title: "Incident", description: "Automatic prioritization of critical systems and alarms.", Icon: Siren, color: "text-control-warm" },
  { title: "Collaborate", description: "Share, discuss and decide with your team in real time.", Icon: Users, color: "text-emerald-500" },
  { title: "Handover", description: "Summarize, document and transfer with full context.", Icon: ClipboardList, color: "text-amber-500" },
];

const consoleUnderstandsItems: SimpleItem[] = [
  { title: "What you do most often", description: "", Icon: Target },
  { title: "What time of day it is", description: "", Icon: Clock3 },
  { title: "System alerts & states", description: "", Icon: Bell },
  { title: "Your role & responsibilities", description: "", Icon: UserCheck },
  { title: "Your preferences & history", description: "", Icon: SlidersHorizontal },
  { title: "Team workload & collaboration", description: "", Icon: Users },
];

const consoleAdaptSteps: SimpleItem[] = [
  { title: "Detects Context", description: "Monitors activity, alerts and environment.", Icon: Gauge },
  { title: "Understands Priority", description: "Determines what's important right now.", Icon: ClipboardList },
  { title: "Reconfigures Workspace", description: "Moves displays, opens apps and adjusts settings.", Icon: SlidersHorizontal },
  { title: "Presents the Task View", description: "The active mode decides what belongs on screen.", Icon: UserCheck },
  { title: "Keeps Control Human", description: "Automation prepares the workspace; the operator acts.", Icon: SquareCheckBig },
];

const transitionItems = [
  { title: "Normal Monitoring", description: "All systems visible." },
  { title: "Incident Detected", description: "Critical alarm triggers." },
  { title: "Information Filters", description: "Non-critical info minimizes." },
  { title: "Focus On What Matters", description: "Critical systems move to primary displays." },
  { title: "Action Support", description: "Tools, SOPs and team comms ready." },
];

const consoleBenefits: SimpleItem[] = [
  { title: "Mode Clarity", description: "Monitoring, incident and handover screens stay distinct.", Icon: Target },
  { title: "Priority Fronting", description: "Critical data is placed where attention already is.", Icon: Clock3 },
  { title: "Lower Cognitive Load", description: "The console hides non-essential work surfaces.", Icon: SlidersHorizontal },
  { title: "Operator Authority", description: "The system prepares options without taking command.", Icon: ShieldCheck },
  { title: "Repeatable Handover", description: "Shift context moves with the workflow, not memory.", Icon: Gauge },
];

const informationDeliveryItems: SimpleItem[] = [
  { title: "Prioritizes critical events", description: "Highlights what matters most.", Icon: AlertTriangle },
  { title: "Filters the noise", description: "Removes unnecessary distractions.", Icon: Filter },
  { title: "Context aware", description: "Understands the situation and adapts automatically.", Icon: BrainCircuit },
  { title: "Right display. Right format", description: "Information appears where it's needed.", Icon: Monitor },
  { title: "Always one step ahead", description: "Anticipates the next information you need.", Icon: FastForward },
];

const informationHowItWorks: (SimpleItem & { color: string })[] = [
  { title: "Detect", description: "System monitors events, data and operator activity.", Icon: Target, color: "text-control-warm" },
  { title: "Analyze", description: "AI understands context, priority and urgency.", Icon: Filter, color: "text-amber-500" },
  { title: "Prioritize", description: "Critical information is ranked and organized.", Icon: Gauge, color: "text-green-500" },
  { title: "Deliver", description: "The active display receives the next useful view.", Icon: Monitor, color: "text-blue-600" },
  { title: "Act", description: "The operator acts from one organized context.", Icon: UserCheck, color: "text-control-text" },
];

const manualSearchItems: SimpleItem[] = [
  { title: "Multiple screens need to be checked", description: "", Icon: Monitor },
  { title: "Information scattered across systems", description: "", Icon: SlidersHorizontal },
  { title: "Important alerts can be missed", description: "", Icon: AlertTriangle },
  { title: "Slower decisions, higher risk", description: "", Icon: Clock3 },
];

const proactiveDeliveryItems: SimpleItem[] = [
  { title: "Critical information delivered instantly", description: "", Icon: Gauge, color: "text-green-500" },
  { title: "Focused, relevant and actionable", description: "", Icon: ShieldCheck, color: "text-green-500" },
  { title: "Search paths removed during incidents", description: "", Icon: Target, color: "text-green-500" },
  { title: "Shared context for the next handoff", description: "", Icon: Users, color: "text-green-500" },
];

const intelligentExamples = [
  { title: "Power Outage Detected", description: "System identifies fault, impacted area and severity.", image: "/assets/source-pdf/p18_046_529x352.jpg" },
  { title: "Traffic Incident", description: "Relevant camera feed, location and response plan displayed.", image: "/assets/source-pdf/p23_053_1418x798.jpg" },
  { title: "Equipment Anomaly", description: "Live telemetry, trend and maintenance history shown.", image: "/assets/source-pdf/p36_065_360x282.jpg" },
  { title: "Severe Weather Alert", description: "Trajectory, impact zone and recommended actions appear.", image: "/assets/source-pdf/p41_080_659x281.png" },
  { title: "Security Event", description: "Live camera, access logs and incident protocol displayed.", image: "/assets/source-pdf/p24_054_1418x798.jpg" },
  { title: "Operator Guidance", description: "SOP, checklist and previous similar events shown.", image: "/assets/source-pdf/p41_081_468x459.png" },
];

const operationalStates: (SimpleItem & { color: string; active?: boolean })[] = [
  { title: "Normal", description: "Daily operations and monitoring", Icon: ShieldCheck, color: "text-blue-600" },
  { title: "Focused", description: "High attention required", Icon: Target, color: "text-blue-600" },
  { title: "Incident", description: "Critical event in progress", Icon: AlertTriangle, color: "text-control-warm", active: true },
  { title: "Recovery", description: "Stabilize and restore", Icon: SlidersHorizontal, color: "text-amber-500" },
  { title: "Standby", description: "Low activity optimized", Icon: Moon, color: "text-slate-500" },
];

const roomResponseSystems: SimpleItem[] = [
  { title: "Lighting", description: "Adjusts brightness, color temperature and focus.", Icon: Sun, color: "text-blue-500" },
  { title: "Displays & Video Wall", description: "Reorganize layouts. Show what matters most.", Icon: Grid2X2, color: "text-blue-600" },
  { title: "Consoles", description: "Adjust height, position and posture settings automatically.", Icon: SlidersHorizontal, color: "text-blue-500" },
  { title: "Acoustics", description: "Reduce distraction. Enhance speech clarity.", Icon: Radio, color: "text-violet-600" },
  { title: "HVAC & Air Quality", description: "Move fresh-air and thermal setpoints into incident mode.", Icon: FastForward, color: "text-green-500" },
  { title: "Collaboration", description: "Enable rooms, audio, video and shared workspaces.", Icon: Users, color: "text-green-500" },
  { title: "Recording & Logging", description: "Start event recording and activity logs automatically.", Icon: Video, color: "text-amber-500" },
  { title: "Power & Infrastructure", description: "Ensure system redundancy and power stability.", Icon: ShieldCheck, color: "text-amber-500" },
  { title: "Access & Security", description: "Adjust access level and security protocols.", Icon: LockKeyhole, color: "text-violet-600" },
];

const operationalHowSteps: SimpleItem[] = [
  { title: "1. Detect", description: "Event, alert or operator input is detected.", Icon: Monitor },
  { title: "2. Determine", description: "System determines the required operational state.", Icon: BrainCircuit },
  { title: "3. Orchestrate", description: "All connected systems receive the new state.", Icon: SlidersHorizontal },
  { title: "4. Execute", description: "Systems adjust in real time and in sync.", Icon: SquareCheckBig },
  { title: "5. Confirm", description: "Operator sees a ready environment and acts.", Icon: UserCheck },
];

const incidentModeExamples = [
  { title: "Instant Lighting Change", description: "Reduces glare, improves contrast and operator focus.", image: "/assets/source-pdf/p23_053_1418x798.jpg" },
  { title: "Displays Reconfigure", description: "Critical systems move to primary screens.", image: "/assets/source-pdf/p22_052_1421x800.jpg" },
  { title: "Consoles Adjust", description: "Height, tilt and favorites load automatically.", image: "/assets/source-pdf/p20_050_1781x1016.jpg" },
  { title: "Rooms Activated", description: "Bridge to expert teams and command centers.", image: "/assets/source-pdf/p21_051_1672x940.jpg" },
  { title: "Recording Starts", description: "Audio, video and system logs capture automatically.", image: "/assets/source-pdf/p41_077_443x235.png" },
  { title: "HVAC Boosts", description: "Fresh air increases, temperature optimized.", image: "/assets/source-pdf/p41_080_659x281.png" },
];

const performanceEnvironmentCallouts: (SimpleItem & { color: string; className: string })[] = [
  { title: "Temperature", description: "Maintains thermal comfort for sustained focus.", Icon: Thermometer, color: "text-control-warm", className: "left-[4%] top-[31%]" },
  { title: "Humidity", description: "Keeps humidity in the ideal range for comfort and health.", Icon: Droplets, color: "text-blue-600", className: "left-[3%] bottom-[15%]" },
  { title: "Lighting", description: "Maintains ideal brightness and reduces eye strain.", Icon: Sun, color: "text-green-500", className: "left-[39%] top-[4%]" },
  { title: "Air Quality", description: "Keeps air fresh and oxygen levels optimal.", Icon: FastForward, color: "text-green-500", className: "right-[9%] top-[15%]" },
  { title: "Noise Control", description: "Holds background sound inside the target range.", Icon: Radio, color: "text-violet-600", className: "right-[4%] top-[44%]" },
  { title: "Ergonomics", description: "Supports posture, reach and comfort through intelligent adjustments.", Icon: Armchair, color: "text-orange-500", className: "right-[2%] bottom-[12%]" },
];

const performanceMetrics = [
  { title: "CO2 Level", unit: "ppm", value: "612", status: "Good", target: "Target: < 800 ppm", color: "text-green-600" },
  { title: "Temperature", unit: "°C", value: "23.4", status: "Optimal", target: "Target: 22 - 24 °C", color: "text-blue-600" },
  { title: "Humidity", unit: "%", value: "45", status: "Optimal", target: "Target: 40 - 60 %", color: "text-blue-600" },
  { title: "Noise Level", unit: "dBA", value: "46", status: "Good", target: "Target: < 55 dBA", color: "text-violet-600" },
  { title: "Light Level", unit: "lux", value: "520", status: "Optimal", target: "Target: 300 - 750 lux", color: "text-orange-500" },
  { title: "Air Quality (AQI)", unit: "", value: "38", status: "Good", target: "Target: < 50 AQI", color: "text-green-600" },
];

const proactiveAdjustments: SimpleItem[] = [
  { title: "Increase Fresh Air", description: "Airflow increased to reduce CO2 levels.", Icon: FastForward, color: "text-green-500" },
  { title: "Slight Cooling", description: "Temperature adjusted by -0.5 °C for comfort.", Icon: Thermometer, color: "text-control-warm" },
  { title: "Humidity Balanced", description: "Humidity balanced to maintain optimal range.", Icon: Droplets, color: "text-blue-600" },
  { title: "Noise Dampened", description: "Background noise reduced through acoustic tuning.", Icon: Radio, color: "text-violet-600" },
  { title: "Lighting Tuned", description: "Brightness and color temperature adjusted to reduce strain.", Icon: Sun, color: "text-green-500" },
  { title: "Posture Support", description: "Console and chair settings optimized for ergonomics.", Icon: Armchair, color: "text-orange-500" },
];

const operatorImpactItems: SimpleItem[] = [
  { title: "Visual Comfort", description: "Lighting supports screen work without glare.", Icon: Target, color: "text-green-600" },
  { title: "Lower Fatigue Load", description: "Posture and climate are managed across long shifts.", Icon: Users, color: "text-green-600" },
  { title: "Maintained Alertness", description: "Room conditions stay inside defined thresholds.", Icon: Eye, color: "text-green-600" },
  { title: "Well-being by Design", description: "Air, ergonomics and safety are treated as systems.", Icon: ShieldCheck, color: "text-green-600" },
  { title: "Stable Conditions", description: "Operators work inside a controlled performance envelope.", Icon: TrendingUp, color: "text-green-600" },
];

const personalizedProfiles = [
  {
    name: "Arjun - Supervisor",
    focus: "Situational Awareness",
    image: "/assets/source-pdf/p24_054_1418x798.jpg",
    color: "from-blue-700 to-blue-500",
    accent: "text-blue-600",
    settings: [
      { title: "Console Height", value: "1100 mm", Icon: SlidersHorizontal },
      { title: "Monitors", value: "3 + Video Wall", Icon: Monitor },
      { title: "Lighting", value: "Cool White 5000K", Icon: Sun },
      { title: "Dashboard", value: "Operations Overview", Icon: Grid2X2 },
      { title: "Chair", value: "Lumbar High Support", Icon: Armchair },
    ],
  },
  {
    name: "Meera - Process Operator",
    focus: "Detail & Accuracy",
    image: "/assets/source-pdf/p20_050_1781x1016.jpg",
    color: "from-green-700 to-green-500",
    accent: "text-green-600",
    settings: [
      { title: "Console Height", value: "950 mm", Icon: SlidersHorizontal },
      { title: "Monitors", value: "4 (Detail)", Icon: Monitor },
      { title: "Lighting", value: "Neutral White 4000K", Icon: Sun },
      { title: "Dashboard", value: "Process Control", Icon: Grid2X2 },
      { title: "Chair", value: "Balanced Support", Icon: Armchair },
    ],
  },
  {
    name: "Karan - Maintenance Engineer",
    focus: "Diagnostics & Maintenance",
    image: "/assets/source-pdf/p23_053_1418x798.jpg",
    color: "from-violet-700 to-violet-500",
    accent: "text-violet-600",
    settings: [
      { title: "Console Height", value: "1040 mm", Icon: SlidersHorizontal },
      { title: "Monitors", value: "2 + Tools", Icon: Monitor },
      { title: "Lighting", value: "Warm White 3500K", Icon: Sun },
      { title: "Dashboard", value: "Maintenance Status", Icon: Grid2X2 },
      { title: "Chair", value: "Forward Tilt Support", Icon: Armchair },
    ],
  },
];

const personalizationFactors: SimpleItem[] = [
  { title: "Console Position", description: "Height, tilt and reach adjusted for comfort and posture.", Icon: UserCheck, color: "text-blue-600" },
  { title: "Monitor Layout", description: "Screens return to the operator's preferred arrangement.", Icon: Monitor, color: "text-blue-600" },
  { title: "Applications & Tools", description: "Frequently used apps, shortcuts and tools load automatically.", Icon: Grid2X2, color: "text-blue-600" },
  { title: "Lighting Preference", description: "Brightness and color temperature set to individual preference.", Icon: Sun, color: "text-blue-600" },
  { title: "Audio & Acoustics", description: "Volume zones and acoustic settings personalized.", Icon: Radio, color: "text-blue-600" },
  { title: "Seat & Ergonomics", description: "Chair position, lumbar support and posture settings restored.", Icon: Armchair, color: "text-blue-600" },
  { title: "Dashboard View", description: "Information hierarchy and widgets tailored to current tasks.", Icon: Monitor, color: "text-blue-600" },
  { title: "Environment", description: "Temperature and air settings optimized for individual comfort.", Icon: Sun, color: "text-blue-600" },
];

const switchUserSteps: (SimpleItem & { color: string })[] = [
  { title: "Identify", description: "User recognized automatically.", Icon: ScanFace, color: "text-blue-600" },
  { title: "Restore", description: "Settings restored in seconds.", Icon: SlidersHorizontal, color: "text-blue-600" },
  { title: "Ready", description: "Workspace ready before you sit.", Icon: SquareCheckBig, color: "text-blue-600" },
];

const consistencyItems = [
  "Reduces setup time",
  "Restores preferred views",
  "Minimizes errors",
  "Normalizes comfort settings",
  "Supports role-specific dashboards",
  "Supports long-shift performance",
];

const beyondDeskCategories: (SimpleItem & { color: string })[] = [
  { title: "People", description: "", Icon: UserCheck, color: "text-blue-600" },
  { title: "Systems", description: "", Icon: Server, color: "text-cyan-600" },
  { title: "Equipment", description: "", Icon: Gauge, color: "text-green-600" },
  { title: "Environment", description: "", Icon: Leaf, color: "text-green-600" },
  { title: "Infrastructure", description: "", Icon: Building2, color: "text-orange-500" },
  { title: "Energy", description: "", Icon: Zap, color: "text-violet-600" },
  { title: "Security", description: "", Icon: ShieldCheck, color: "text-violet-600" },
  { title: "Operations", description: "", Icon: TrendingUp, color: "text-blue-600" },
];

const intelligencePipeline: (SimpleItem & { color: string })[] = [
  { title: "Data", description: "Continuous collection from across the room", Icon: Database, color: "text-blue-600" },
  { title: "Insight", description: "AI analyzes patterns and detects changes", Icon: Sun, color: "text-green-600" },
  { title: "Action", description: "Automated or guided actions are triggered", Icon: Target, color: "text-orange-500" },
  { title: "Value", description: "Signals become operational evidence", Icon: TrendingUp, color: "text-violet-600" },
];

const roomUnderstandsItems: (SimpleItem & { color: string; bullets: string[] })[] = [
  { title: "People & Presence", description: "", Icon: UserCheck, color: "text-blue-600", bullets: ["Who is in the room", "Shift patterns", "Workload distribution", "Comfort preferences"] },
  { title: "Systems & Applications", description: "", Icon: Monitor, color: "text-cyan-600", bullets: ["Application usage", "Alarm & event frequency", "System performance", "Integration health"] },
  { title: "Equipment & Assets", description: "", Icon: Gauge, color: "text-green-600", bullets: ["Asset status & uptime", "Component load", "Lifecycle & age", "Utilization trends"] },
  { title: "Environment & Wellness", description: "", Icon: Leaf, color: "text-green-600", bullets: ["CO2, temperature, humidity", "Noise, lighting, air quality", "Comfort & ergonomics", "Wellness impact"] },
  { title: "Infrastructure", description: "", Icon: Building2, color: "text-orange-500", bullets: ["Power, UPS, HVAC status", "Network & bandwidth", "Room capacity", "Physical infrastructure"] },
  { title: "Energy & Sustainability", description: "", Icon: Zap, color: "text-violet-600", bullets: ["Energy consumption", "Efficiency trends", "Carbon footprint", "Cost insights"] },
  { title: "Operations & Performance", description: "", Icon: TrendingUp, color: "text-blue-600", bullets: ["SLA & response times", "Incident trends", "Decision timelines", "Operational KPIs"] },
];

const intelligenceGlanceItems = [
  { title: "Occupancy", value: "18", suffix: "/ 24", caption: "People in room", side: "Live Trend", Icon: Users, color: "text-green-600" },
  { title: "Energy Usage", value: "68.4", suffix: " kWh", caption: "Today", side: "12% vs yesterday", Icon: Zap, color: "text-blue-600" },
  { title: "Equipment Health", value: "96", suffix: "%", caption: "Healthy", side: "3 Warnings", Icon: Activity, color: "text-green-600" },
  { title: "Console Utilization", value: "82", suffix: "%", caption: "Average", side: "6 Underused", Icon: Armchair, color: "text-orange-500" },
  { title: "Environment Index", value: "91", suffix: "/ 100", caption: "Optimal", side: "All good Conditions", Icon: Thermometer, color: "text-violet-600" },
  { title: "Security Status", value: "Secure", suffix: "", caption: "All systems normal", side: "0 Alerts", Icon: ShieldCheck, color: "text-blue-600" },
];

const digitalTwinIntroItems: (SimpleItem & { color: string })[] = [
  { title: "One live room model.", description: "Assets, systems and people in one view.", Icon: Grid2X2, color: "text-blue-600" },
  { title: "See current state clearly.", description: "From power rooms to operator positions.", Icon: Activity, color: "text-green-600" },
  { title: "Test before rollout.", description: "Layouts and workflows can be simulated.", Icon: TrendingUp, color: "text-orange-500" },
  { title: "Plan with fewer blind spots.", description: "Change risk is visible earlier.", Icon: ShieldCheck, color: "text-violet-600" },
];

const digitalTwinCallouts = [
  { title: "Video Walls", lines: ["Status: Online", "Health: 98%"], Icon: Monitor, color: "text-blue-600", className: "left-[10%] top-[12%]" },
  { title: "HVAC System", lines: ["Temp: 22.4°C", "Status: Normal"], Icon: FastForward, color: "text-blue-600", className: "right-[17%] top-[10%]" },
  { title: "Power System", lines: ["Load: 68%", "Status: Normal"], Icon: Zap, color: "text-blue-600", className: "right-[3%] top-[34%]" },
  { title: "Operator Console 12", lines: ["User: Meera", "Status: Active"], Icon: Armchair, color: "text-blue-600", className: "left-[2.5%] bottom-[19%]" },
  { title: "Access Control", lines: ["Doors: Locked", "Status: Secure"], Icon: LockKeyhole, color: "text-blue-600", className: "right-[5%] bottom-[15%]" },
];

const digitalTwinMetrics: (SimpleItem & { value: string; color: string })[] = [
  { title: "Total Assets", value: "1,248", description: "All systems connected", Icon: Grid2X2, color: "text-blue-600" },
  { title: "System Health", value: "97%", description: "Live service status", Icon: Activity, color: "text-green-600" },
  { title: "Alerts", value: "3", description: "Requires attention", Icon: Bell, color: "text-orange-500" },
  { title: "Active Users", value: "24", description: "Across all shifts", Icon: UserCheck, color: "text-violet-600" },
  { title: "Energy Usage", value: "68.4 kWh", description: "Current room demand", Icon: Zap, color: "text-blue-600" },
];

const digitalTwinRepresents: (SimpleItem & { color: string })[] = [
  { title: "People", description: "Operators, roles, shifts, workloads", Icon: UserCheck, color: "text-blue-600" },
  { title: "Assets", description: "Consoles, displays, servers, devices", Icon: Grid2X2, color: "text-green-600" },
  { title: "Systems", description: "Power, HVAC, lighting, network, AV", Icon: Gauge, color: "text-orange-500" },
  { title: "Environment", description: "Temperature, humidity, air quality, noise", Icon: Thermometer, color: "text-violet-600" },
  { title: "Processes", description: "Workflows, procedures, alerts, actions", Icon: SlidersHorizontal, color: "text-cyan-600" },
  { title: "Data", description: "Live data, history, insights & trends", Icon: Database, color: "text-orange-500" },
];

const digitalTwinEnables: (SimpleItem & { color: string })[] = [
  { title: "Real-time Visibility", description: "Live status of every asset, system and space.", Icon: Eye, color: "text-blue-600" },
  { title: "Predict & Prevent", description: "AI detects issues before they impact operations.", Icon: BrainCircuit, color: "text-green-600" },
  { title: "Scenario Simulation", description: "Test layouts, workflows and events virtually.", Icon: Grid2X2, color: "text-orange-500" },
  { title: "Change Impact Analysis", description: "Understand the outcome before implementation.", Icon: TrendingUp, color: "text-violet-600" },
  { title: "Room Tuning Loop", description: "Observed usage feeds the next configuration review.", Icon: Activity, color: "text-cyan-600" },
];

const digitalTwinDecisionBullets = [
  "Data-driven planning",
  "Visible change impact",
  "Lower downtime",
  "Higher efficiency",
  "Increased safety",
  "Future-ready operations",
];

const novaCapabilityCallouts: (SimpleItem & { color: string; className: string })[] = [
  { title: "Anticipates", description: "Detects rising temperature trend and prepares cooling recommendation.", Icon: BrainCircuit, color: "text-blue-600", className: "left-[3%] top-[4%]" },
  { title: "Summarizes", description: "Condenses critical alerts and system health into actionable insights.", Icon: Sun, color: "text-violet-600", className: "left-[35%] top-[4%]" },
  { title: "Recommends", description: "Suggests optimal response based on historical and real-time data.", Icon: Sparkles, color: "text-orange-500", className: "right-[4%] top-[5%]" },
  { title: "Automates", description: "Executes routine tasks and workflows without manual input.", Icon: Gauge, color: "text-green-600", className: "left-[12%] bottom-[3%]" },
  { title: "Learns", description: "Adapts to your team's preferences and room operating style.", Icon: SlidersHorizontal, color: "text-cyan-600", className: "right-[14%] bottom-[3%]" },
];

const novaBehindScenesItems: (SimpleItem & { color: string })[] = [
  { title: "Continuously observes systems, people and environment", description: "", Icon: Eye, color: "text-blue-600" },
  { title: "Understands patterns, context and intent", description: "", Icon: BrainCircuit, color: "text-violet-600" },
  { title: "Anticipates likely next questions and options", description: "", Icon: Sun, color: "text-orange-500" },
  { title: "Delivers summaries and routine automation", description: "", Icon: Monitor, color: "text-green-600" },
  { title: "Learns from approved workflows and preferences", description: "", Icon: Activity, color: "text-cyan-600" },
];

const novaOperatorSupportItems: (SimpleItem & { color: string })[] = [
  { title: "Smart Context", description: "Understands who you are, what you're doing and what matters most.", Icon: UserCheck, color: "text-blue-600" },
  { title: "Proactive Alerts", description: "Not just alarms-early warnings with the likely impact and options.", Icon: Bell, color: "text-orange-500" },
  { title: "Instant Answers", description: "Find anything-documents, data, procedures-instantly.", Icon: Gauge, color: "text-green-600" },
  { title: "Decision Support", description: "Compares scenarios and explains likely tradeoffs.", Icon: Users, color: "text-violet-600" },
  { title: "Workload Balance", description: "Monitors operator load and helps balance attention.", Icon: Activity, color: "text-cyan-600" },
  { title: "Privacy First", description: "Works within your permissions. Your data stays secure.", Icon: LockKeyhole, color: "text-orange-500" },
];

const novaCanDoItems: (SimpleItem & { color: string })[] = [
  { title: "Natural language Q&A", description: "Ask anything. Get instant answers.", Icon: Monitor, color: "text-violet-600" },
  { title: "Cross-system intelligence", description: "Connects data across all systems.", Icon: Grid2X2, color: "text-blue-600" },
  { title: "Anomaly detection", description: "Spots issues humans might miss.", Icon: Target, color: "text-control-warm" },
  { title: "Predictive insights", description: "Shows likely changes before they become events.", Icon: TrendingUp, color: "text-green-600" },
  { title: "Workflow automation", description: "Runs approved routine actions in the background.", Icon: Gauge, color: "text-orange-500" },
];

const novaOutcomeItems = [
  "Faster awareness",
  "Clearer summaries",
  "Lower workload",
  "Fewer surprises",
  "Higher reliability",
  "Controlled automation",
];

const softwareDefineSteps: (SimpleItem & { color: string })[] = [
  { title: "Configure", description: "Design layouts, workflows & views", Icon: Gauge, color: "text-blue-600" },
  { title: "Deploy", description: "Push to any system. Anywhere.", Icon: FastForward, color: "text-green-600" },
  { title: "Adapt", description: "Room states update when workflows change", Icon: SlidersHorizontal, color: "text-orange-500" },
  { title: "Evolve", description: "New layouts and capabilities can be added", Icon: TrendingUp, color: "text-violet-600" },
];

const softwareDefinedByItems: (SimpleItem & { color: string })[] = [
  { title: "Dynamic Layouts", description: "Create, save and switch layouts in seconds.", Icon: Monitor, color: "text-blue-600" },
  { title: "Unified Platform", description: "People, systems, data and devices-all connected.", Icon: Grid2X2, color: "text-green-600" },
  { title: "Open & Integrable", description: "Works with your existing systems. Open APIs, open future.", Icon: FastForward, color: "text-violet-600" },
  { title: "Secure by Design", description: "Role-based access, encryption and audit-ready.", Icon: LockKeyhole, color: "text-orange-500" },
  { title: "Future-Ready", description: "Continuous updates. New features. Zero disruption.", Icon: Activity, color: "text-cyan-600" },
];

const softwarePlatformFlow: (SimpleItem & { color: string })[] = [
  { title: "People", description: "Roles, Teams, Permissions", Icon: Users, color: "text-blue-600" },
  { title: "Data", description: "All sources. One model.", Icon: Database, color: "text-green-600" },
  { title: "Applications", description: "Dashboards, Apps, Workflows", Icon: Monitor, color: "text-violet-600" },
  { title: "OnePWS Platform", description: "", Icon: FastForward, color: "text-blue-600" },
  { title: "Devices", description: "AV, IT, IoT, Control Systems", Icon: Grid2X2, color: "text-orange-500" },
  { title: "Intelligence", description: "AI/ML, Analytics, Predictions", Icon: TrendingUp, color: "text-violet-600" },
  { title: "Actions", description: "Alerts, Automation, Response", Icon: ShieldCheck, color: "text-green-600" },
];

const deployAnywhereItems: (SimpleItem & { color: string })[] = [
  { title: "On-Premise", description: "", Icon: Building2, color: "text-blue-600" },
  { title: "Private Cloud", description: "", Icon: FastForward, color: "text-green-600" },
  { title: "Hybrid Cloud", description: "", Icon: FastForward, color: "text-violet-600" },
  { title: "Multi-Site", description: "", Icon: Target, color: "text-orange-500" },
  { title: "Edge Locations", description: "", Icon: Radio, color: "text-cyan-600" },
];

const softwareBenefits = [
  { value: "70%", label: "Faster deployment of new layouts", Icon: Clock3, color: "text-blue-600" },
  { value: "40%", label: "Lower total cost of ownership", Icon: TrendingUp, color: "text-green-600" },
  { value: "99.9%", label: "System availability & reliability", Icon: ShieldCheck, color: "text-violet-600" },
  { value: "2X", label: "Operator productivity & situational clarity", Icon: TrendingUp, color: "text-orange-500" },
];

const builtForChangeItems = [
  "Add new screens or systems in minutes",
  "Scale from one operator to thousands",
  "Support hybrid & multi-site operations",
  "Reduce engineering time & cost",
  "Always aligned with your mission",
];

export function IntelligentRoomReferenceScene({ chapter }: { chapter: Chapter }) {
  if (chapter.id === "room-recognizes-you") {
    return <RoomRecognizesYouScene chapter={chapter} />;
  }

  if (chapter.id === "console-understands-task") {
    return <ConsoleUnderstandsTaskScene chapter={chapter} />;
  }

  if (chapter.id === "information-comes-operator") {
    return <InformationComesOperatorScene chapter={chapter} />;
  }

  if (chapter.id === "operational-state-room-responds") {
    return <OperationalStateRoomRespondsScene chapter={chapter} />;
  }

  if (chapter.id === "room-protects-human-performance") {
    return <RoomProtectsHumanPerformanceScene chapter={chapter} />;
  }

  if (chapter.id === "personal-workspace") {
    return <PersonalWorkspaceScene chapter={chapter} />;
  }

  if (chapter.id === "intelligence-beyond-desk") {
    return <IntelligenceBeyondDeskScene chapter={chapter} />;
  }

  if (chapter.id === "digital-twin-control-room") {
    return <DigitalTwinControlRoomScene chapter={chapter} />;
  }

  if (chapter.id === "ai-silent-assistant") {
    return <AiSilentAssistantScene chapter={chapter} />;
  }

  if (chapter.id === "software-defined-control-room") {
    return <SoftwareDefinedControlRoomScene chapter={chapter} />;
  }

  return null;
}

function RoomRecognizesYouScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "room-recognizes-you-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_54%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.7vw] top-[9.85vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[15.15vh] grid grid-cols-[minmax(17.5rem,0.43fr)_minmax(42rem,1.13fr)_minmax(18rem,0.44fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[2.4vh]">
              <h1 className="text-[clamp(2.5rem,3.35vw,4.7rem)] font-black leading-[1.02] tracking-normal text-control-text">
                <span className="block">The Room</span>
                <span className="block text-control-warm">Recognizes</span>
                <span className="block">You.</span>
              </h1>
              <div className="mt-[1.2vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.5vh] max-w-[18rem] text-[clamp(0.78rem,0.9vw,1.02rem)] font-medium leading-[1.48] text-slate-800">
                The moment you enter, the control room identifies you and prepares your workspace exactly the way you like it.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[35vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.55vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.72rem,0.84vw,0.98rem)] font-black uppercase tracking-normal text-control-warm">No Cards. No Passwords. No Delays.</h2>
              <div className="mt-[2.1vh] grid grid-cols-3">
                {securityItems.map((item, index) => (
                  <SecurityCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_16.2vh] gap-[1.25vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p20_050_1781x1016.jpg" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.2)_0%,rgb(15_23_42/0.05)_35%,rgb(255_255_255/0.04)_100%)]" />
              <RecognitionOverlay />
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.4vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.72rem,0.84vw,0.98rem)] font-black uppercase tracking-normal text-control-text">Your Experience. Ready Before You Sit.</h2>
              <div className="mt-[1.6vh] grid grid-cols-[repeat(6,minmax(0,1fr))] items-start">
                {experienceSteps.map((item, index) => (
                  <ExperienceStep index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_16.2vh] gap-[1.25vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="grid min-h-0 gap-[0.55vh]">
              {readinessItems.map((item) => (
                <ReadinessCard item={item} key={item.title} />
              ))}
            </section>
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.45vw] py-[2.2vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <p className="text-[clamp(2rem,3vw,3.4rem)] font-black leading-none text-control-warm">"</p>
              <p className="-mt-2 max-w-[17rem] text-[clamp(0.82rem,0.95vw,1.08rem)] font-medium leading-[1.34] text-slate-800">
                The shift doesn't begin after login.
              </p>
              <p className="mt-[1vh] max-w-[15rem] text-[clamp(0.9rem,1.05vw,1.2rem)] font-black leading-[1.25] text-control-warm">
                It begins the moment you enter.
              </p>
              <span className="pointer-events-none absolute bottom-0 right-0 h-[6.5rem] w-[6.5rem] opacity-10 [background-image:radial-gradient(circle,rgb(37_99_235/0.65)_1px,transparent_1px)] [background-size:7px_7px]" />
            </section>
          </motion.aside>

        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="absolute inset-x-0 bottom-[6.2vh] h-[7.7vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.05vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          <div className="grid h-full grid-cols-[8rem_repeat(5,minmax(0,1fr))] items-center">
            <div className="pr-[1vw]">
              <h2 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-black uppercase leading-tight text-control-text">What This Means for You</h2>
              <div className="mt-[0.7vh] h-[2px] w-[1.8rem] bg-control-warm" />
            </div>
            {outcomeItems.map((item, index) => (
              <OutcomeCell index={index} item={item} key={item.title} />
            ))}
          </div>
        </motion.section>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function ConsoleUnderstandsTaskScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "console-understands-task-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[18.2vh] grid grid-cols-[minmax(17rem,0.43fr)_minmax(43rem,1.1fr)_minmax(18rem,0.44fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[1vh]">
              <h1 className="text-[clamp(2.25rem,3.1vw,4.4rem)] font-black leading-[1.05] tracking-normal text-control-text">
                <span className="block">The Console</span>
                <span className="block text-control-warm">Understands</span>
                <span className="block">the Task.</span>
              </h1>
              <div className="mt-[1.35vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.5vh] max-w-[19rem] text-[clamp(0.78rem,0.9vw,1.02rem)] font-medium leading-[1.48] text-slate-800">
                Task modes bring the right controls, displays and guidance forward without making the operator rebuild the workspace.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[31.2vh] grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-[0.85vw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <span className="grid h-[3.7rem] w-[3.7rem] place-items-center rounded-full border border-control-warm/22 bg-white/58 text-control-warm">
                <BrainCircuit aria-hidden="true" size={36} strokeWidth={1.45} />
              </span>
              <span className="min-w-0">
                <strong className="block text-[clamp(0.68rem,0.78vw,0.9rem)] font-black leading-tight text-control-text">Smart Context Awareness</strong>
                <span className="mt-1 block text-[clamp(0.56rem,0.66vw,0.77rem)] font-medium leading-[1.3] text-slate-800">
                  Reads activity, priority and system state so each mode starts with the right operating context.
                </span>
              </span>
            </section>

            <section className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.35vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72vw,0.84rem)] font-black uppercase leading-tight text-control-warm">It Understands:</h2>
              <div className="mt-[1.25vh] grid grid-cols-3 gap-y-[1.05vh]">
                {consoleUnderstandsItems.map((item, index) => (
                  <MiniUnderstandingCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[20.6vh_minmax(0,1fr)_16.5vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.1vw] py-[1.35vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.72rem,0.84vw,0.98rem)] font-black uppercase tracking-normal text-control-text">One Console. Multiple Modes.</h2>
              <div className="mt-[1vh] h-[2px] w-[1.8rem] bg-control-warm" />
              <div className="mt-[1.35vh] grid grid-cols-4">
                {consoleModeItems.map((item, index) => (
                  <ConsoleModeCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.2),0_1rem_2.5rem_rgb(15_23_42/0.08)]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p24_054_1418x798.jpg" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_44%,rgb(239_68_68/0.18),transparent_24%),linear-gradient(180deg,rgb(15_23_42/0.04),rgb(15_23_42/0.18))]" />
              <div className="absolute bottom-[8%] left-[51%] h-[8.3rem] w-[12rem] rounded-[0.4rem] border border-cyan-300/28 bg-slate-950/62 p-[0.7rem] shadow-[0_0_2.2rem_rgb(37_99_235/0.28)] backdrop-blur-md">
                <div className="grid grid-cols-3 gap-1">
                  {["Context", "Priority", "Display", "Comms", "SOP", "Alerts"].map((label, index) => (
                    <span className={`rounded border px-1 py-1 text-center text-[0.48rem] font-black uppercase ${index === 1 ? "border-control-warm/70 bg-control-warm/22 text-red-100" : "border-cyan-300/25 bg-cyan-300/10 text-cyan-100"}`} key={label}>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.1vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.68rem,0.8vw,0.94rem)] font-black uppercase tracking-normal text-control-text">The Console Adapts Automatically</h2>
              <div className="mt-[1.15vh] grid grid-cols-5 items-start">
                {consoleAdaptSteps.map((item, index) => (
                  <ConsoleAdaptStep index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[0.42fr_0.58fr] gap-[0.8vw]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 px-[1vw] py-[1.65vh] text-white shadow-[0_1rem_2.5rem_rgb(15_23_42/0.12)]">
              <p className="text-[clamp(0.58rem,0.66vw,0.76rem)] font-medium uppercase tracking-normal text-slate-200">Good Evening,</p>
              <p className="mt-2 text-[clamp(0.95rem,1.15vw,1.35rem)] font-black">ARJUN</p>
              <div className="mt-[3vh] flex items-center justify-between text-[0.62rem] text-slate-300">
                <span>Today's Summary</span>
                <span>x</span>
              </div>
              <div className="mt-[1.6vh] space-y-[1.8vh]">
                {[
                  ["All Systems Normal", "✓", "bg-emerald-500"],
                  ["Open Alerts", "2", "bg-control-warm"],
                  ["Pending Actions", "5", "bg-blue-500"],
                  ["Team Messages", "3", "bg-blue-600"],
                ].map(([label, value, color]) => (
                  <div className="flex items-center justify-between gap-2 text-[clamp(0.52rem,0.62vw,0.72rem)] font-medium" key={label}>
                    <span className="min-w-0 truncate text-slate-200">{label}</span>
                    <span className={`grid h-[1.25rem] w-[1.25rem] place-items-center rounded-full ${color} text-[0.55rem] font-black text-white`}>{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72vw,0.84rem)] font-black uppercase leading-tight text-control-warm">Benefits</h2>
              <div className="mt-[1vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.25vh] divide-y divide-slate-200/90">
                {consoleBenefits.map((item) => (
                  <BenefitCell item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>
        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="absolute inset-x-0 bottom-[6.2vh] h-[10.7vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.05vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          <div className="grid h-full grid-cols-[14rem_repeat(5,minmax(0,1fr))] items-center gap-[0.75vw]">
            <div>
              <h2 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-black uppercase leading-[1.35] text-control-text">Example Transition:<br />From Monitor to Incident Mode</h2>
            </div>
            {transitionItems.map((item, index) => (
              <TransitionFrame index={index} item={item} key={item.title} />
            ))}
          </div>
        </motion.section>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function InformationComesOperatorScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "information-comes-operator-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[17.95vh] grid grid-cols-[minmax(15rem,0.34fr)_minmax(43rem,0.96fr)_minmax(23rem,0.55fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.7vh]">
              <h1 className="text-[clamp(2.15rem,2.85vw,4.1rem)] font-black leading-[1.04] tracking-normal text-control-text">
                <span className="block">Information</span>
                <span className="block text-control-warm">Comes</span>
                <span className="block">to the</span>
                <span className="block">Operator<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.25vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35vh] max-w-[17.4rem] text-[clamp(0.68rem,0.79vw,0.92rem)] font-medium leading-[1.42] text-slate-800">
                Critical context moves to the active display automatically, reducing screen-hunting during time-sensitive work.
              </p>
            </div>

            <section className="absolute inset-x-0 bottom-0 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-black uppercase leading-tight text-control-text">Intelligent Information Delivery</h2>
              <div className="mt-[0.75vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.1vh] space-y-[1vh]">
                {informationDeliveryItems.map((item) => (
                  <InfoDeliveryCell item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_19.1vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="absolute inset-x-[1vw] top-[1.35vh] z-10">
                <h2 className="text-[clamp(0.68rem,0.8vw,0.94rem)] font-black uppercase tracking-normal text-control-text">Critical Information. Delivered Proactively.</h2>
                <div className="mt-[0.8vh] h-[2px] w-[1.7rem] bg-control-warm" />
              </div>
              <img alt="" className="absolute inset-x-0 bottom-0 h-[88%] w-full object-cover" src="/assets/source-pdf/p23_053_1418x798.jpg" />
              <div className="absolute inset-x-0 bottom-0 h-[88%] bg-[linear-gradient(90deg,rgb(15_23_42/0.34),rgb(15_23_42/0.02)_42%,rgb(15_23_42/0.32))]" />
              <InfoHeroCallout className="left-[2.7%] top-[15.5%]" color="text-control-warm" Icon={AlertTriangle} title="Incident Alert" text="Power subsystem alarm in Zone 3. Recommended action displayed." />
              <InfoHeroCallout className="left-[2.7%] top-[47%]" color="text-blue-400" Icon={TrendingUp} title="Situation Summary" text="Live overview of impact, assets and response status." />
              <InfoHeroCallout className="right-[1.6%] top-[16%]" color="text-green-400" Icon={TrendingUp} title="Predictive Insight" text="AI suggests potential network congestion in 15 minutes." />
              <InfoHeroCallout className="right-[1.6%] top-[48.5%]" color="text-amber-400" Icon={ClipboardList} title="Action Guidance" text="Relevant SOP and checklist automatically displayed." />
              <span className="absolute left-[23%] top-[30%] h-px w-[16%] border-t border-dashed border-white/85" />
              <span className="absolute left-[28%] top-[61%] h-[18%] w-[11%] border-l border-b border-dashed border-white/85" />
              <span className="absolute right-[21%] top-[30%] h-px w-[18%] border-t border-dashed border-white/85" />
              <span className="absolute right-[24%] top-[61%] h-[18%] w-[13%] border-r border-b border-dashed border-white/85" />
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.1vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.66rem,0.78vw,0.9rem)] font-black uppercase tracking-normal text-control-text">How It Works</h2>
              <div className="mt-[0.75vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.05vh] grid grid-cols-5">
                {informationHowItWorks.map((item, index) => (
                  <InfoHowStep index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-cols-[0.52fr_0.48fr] gap-[0.8vw]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <div className="grid min-h-0 grid-rows-[1fr_1fr] gap-[1.05vh]">
              <ComparisonPanel accent="text-control-warm" items={manualSearchItems} title="Before: Manual Search" />
              <ComparisonPanel accent="text-green-500" items={proactiveDeliveryItems} title="After: Proactive Delivery" />
            </div>
            <div className="grid min-h-0 grid-rows-[minmax(0,1fr)_24.6vh] gap-[1.05vh]">
              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 px-[1vw] py-[1.35vh] text-white shadow-[0_1rem_2.5rem_rgb(15_23_42/0.12)]">
                <h2 className="text-[clamp(0.62rem,0.72vw,0.84rem)] font-black uppercase leading-tight text-white">Benefits</h2>
                <div className="mt-[0.8vh] h-[2px] w-[1.7rem] bg-control-warm" />
                <div className="mt-[1vh] divide-y divide-slate-700/90">
                  {consoleBenefits.map((item) => (
                    <BenefitCell dark item={item} key={item.title} />
                  ))}
                </div>
              </section>
              <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.3vw] py-[1.7vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <p className="text-[clamp(1.7rem,2.3vw,2.6rem)] font-black leading-none text-control-warm">"</p>
                <p className="mt-[0.3vh] max-w-[13rem] text-[clamp(0.72rem,0.83vw,0.96rem)] font-medium leading-[1.34] text-control-text">
                  Information doesn't wait for you to find it. It finds you.
                </p>
                <p className="mt-[1vh] text-[clamp(0.72rem,0.86vw,1rem)] font-black leading-[1.25] text-control-warm">Context arrives before the search begins.</p>
                <span className="pointer-events-none absolute bottom-0 right-0 h-[5.7rem] w-[5.7rem] opacity-10 [background-image:radial-gradient(circle,rgb(37_99_235/0.65)_1px,transparent_1px)] [background-size:7px_7px]" />
              </section>
            </div>
          </motion.aside>
        </div>

        <motion.section animate={{ opacity: 1, y: 0 }} className="absolute inset-x-0 bottom-[6.2vh] h-[10.45vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]" initial={false} transition={{ duration: 0.72, delay: 0.18, ease }}>
          <div className="grid h-full grid-cols-[12.5rem_repeat(6,minmax(0,1fr))] items-start gap-[0.75vw]">
            <div>
              <h2 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-[1.35] text-control-text">Examples of Intelligent Information Delivery</h2>
              <div className="mt-[0.7vh] h-[2px] w-[1.7rem] bg-control-warm" />
            </div>
            {intelligentExamples.map((item) => (
              <InfoExampleCard item={item} key={item.title} />
            ))}
          </div>
        </motion.section>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function OperationalStateRoomRespondsScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "operational-state-room-responds-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-cols-[minmax(15rem,0.34fr)_minmax(48rem,1fr)_minmax(16rem,0.38fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.7vh]">
              <h1 className="text-[clamp(1.72rem,2.18vw,3.05rem)] font-black leading-[1.07] tracking-normal text-control-text">
                <span className="block">One Operational</span>
                <span className="block">State.</span>
                <span className="block text-control-warm">The Entire</span>
                <span className="block text-control-warm">Room Responds.</span>
              </h1>
              <div className="mt-[1.2vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35vh] max-w-[17rem] text-[clamp(0.66rem,0.76vw,0.88rem)] font-medium leading-[1.38] text-slate-800">
                One event can activate a predefined room state across displays, lighting, acoustics, access, HVAC and logging.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[30.6vh] grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-[0.8vw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <span className="grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-control-warm/22 bg-white/58 text-control-warm">
                <SlidersHorizontal aria-hidden="true" size={31} strokeWidth={1.45} />
              </span>
              <span className="min-w-0">
                <strong className="block text-[clamp(0.62rem,0.72vw,0.84rem)] font-black leading-tight text-control-text">One state. Many systems.</strong>
                <span className="mt-1 block text-[clamp(0.58rem,0.68vw,0.78rem)] font-black leading-tight text-control-warm">Coordinated without manual chasing.</span>
              </span>
            </section>

            <section className="absolute inset-x-0 bottom-0 h-[27.6vh] overflow-hidden rounded-[0.62rem] border border-slate-800/70 bg-slate-950 px-[1vw] py-[1.15vh] text-white shadow-[0_1rem_2.5rem_rgb(15_23_42/0.14)]">
              <h2 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-tight text-white">Intelligent Information Delivery</h2>
              <div className="mt-[0.65vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.9vh] divide-y divide-slate-700/80">
                {informationDeliveryItems.map((item) => (
                  <InfoDeliveryCell dark item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[9.8vh_minmax(0,1fr)_16.5vh_14.5vh] gap-[1vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="grid grid-cols-5 overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              {operationalStates.map((item, index) => (
                <OperationalStateChip index={index} item={item} key={item.title} />
              ))}
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 shadow-[0_1rem_2.5rem_rgb(15_23_42/0.08)]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p23_053_1418x798.jpg" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_51%_25%,rgb(239_68_68/0.42),transparent_26%),linear-gradient(90deg,rgb(37_99_235/0.32),transparent_42%,rgb(249_115_22/0.28))]" />
              <span className="absolute left-0 top-0 h-[3px] w-[36%] bg-blue-400/80 shadow-[0_0_1.6rem_rgb(59_130_246/0.8)]" />
              <span className="absolute right-0 top-0 h-[3px] w-[42%] bg-orange-400/85 shadow-[0_0_1.6rem_rgb(249_115_22/0.8)]" />
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/70 px-[1vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-center text-[clamp(0.62rem,0.72vw,0.84rem)] font-black uppercase leading-tight text-control-text">The Entire Room Responds</h2>
              <div className="mt-[1.05vh] grid grid-cols-9">
                {roomResponseSystems.map((item, index) => (
                  <RoomResponseSystem index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <div className="grid min-h-0 grid-cols-[0.46fr_0.54fr] gap-[0.8vw]">
              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">How It Works</h2>
                <div className="mt-[0.6vh] h-[2px] w-[1.5rem] bg-control-warm" />
                <div className="mt-[0.8vh] grid grid-cols-5">
                  {operationalHowSteps.map((item, index) => (
                    <OperationalHowStep index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Example: Incident Mode Activated</h2>
                <div className="mt-[0.8vh] grid grid-cols-6 gap-[0.55vw]">
                  {incidentModeExamples.map((item, index) => (
                    <IncidentExampleFrame index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </div>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[1fr_1fr_17.6vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <ComparisonPanel accent="text-control-warm" items={manualSearchItems} title="Before: Manual Search" />
            <ComparisonPanel accent="text-green-500" items={proactiveDeliveryItems} title="After: Proactive Delivery" />
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.2vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <p className="text-[clamp(1.6rem,2.2vw,2.5rem)] font-black leading-none text-control-warm">"</p>
              <p className="mt-[0.1vh] max-w-[12rem] text-[clamp(0.62rem,0.74vw,0.86rem)] font-medium leading-[1.35] text-control-text">
                The room changes state once.
              </p>
              <p className="mt-[0.75vh] text-[clamp(0.64rem,0.76vw,0.9rem)] font-black leading-[1.25] text-control-text">Each connected layer follows the same operating condition.</p>
              <span className="pointer-events-none absolute bottom-0 right-0 h-[5.5rem] w-[5.5rem] opacity-10 [background-image:radial-gradient(circle,rgb(239_68_68/0.65)_1px,transparent_1px)] [background-size:7px_7px]" />
            </section>
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function RoomProtectsHumanPerformanceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "room-protects-human-performance-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-cols-[minmax(15rem,0.34fr)_minmax(52rem,1fr)_minmax(18rem,0.38fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.8vh]">
              <h1 className="text-[clamp(1.9rem,2.45vw,3.45rem)] font-black leading-[1.06] tracking-normal text-control-text">
                <span className="block">The Room</span>
                <span className="block text-control-warm">Protects</span>
                <span className="block">Human</span>
                <span className="block">Performance<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.2vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35vh] max-w-[17rem] text-[clamp(0.67rem,0.78vw,0.9rem)] font-medium leading-[1.4] text-slate-800">
                Operator focus depends on measurable room conditions: air, light, noise, temperature, posture and visual load.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[32.5vh] grid grid-cols-[4.8rem_minmax(0,1fr)] items-center gap-[0.8vw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.1vw] py-[1.5vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <ShieldCheck aria-hidden="true" className="text-control-warm" size={52} strokeWidth={1.35} />
              <p className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-medium leading-[1.42] text-slate-800">
                Environmental parameters are monitored as operational inputs.<br />
                <span className="font-black text-control-warm">Comfort becomes controllable.</span>
              </p>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_22.5vh_12.5vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-slate-950 shadow-[0_1rem_2.5rem_rgb(15_23_42/0.08)]">
              <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/assets/source-pdf/p20_050_1781x1016.jpg" />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.4),rgb(15_23_42/0.02)_45%,rgb(15_23_42/0.22))]" />
              <div className="absolute left-[5%] top-[8%] text-[clamp(0.8rem,0.95vw,1.1rem)] font-black leading-[1.45] text-white drop-shadow-[0_0.5rem_1.2rem_rgb(15_23_42/0.5)]">
                <p>Always Watching.</p>
                <p>Always Adjusting.</p>
                <p>Always Optimizing.</p>
              </div>
              <span className="absolute left-[17%] top-[8%] h-[55%] w-[42%] rounded-full border border-dashed border-white/70" />
              {performanceEnvironmentCallouts.map((item) => (
                <PerformanceCallout item={item} key={item.title} />
              ))}
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Continuous Monitoring. Real-Time Insights.</h2>
              <div className="mt-[0.95vh] grid grid-cols-[repeat(6,minmax(0,1fr))_8rem] gap-[0.7vw]">
                {performanceMetrics.map((item, index) => (
                  <MetricCard index={index} item={item} key={item.title} />
                ))}
                <ComfortIndexCard />
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-tight text-control-text">Proactive Adjustments. Before You Notice.</h2>
              <div className="mt-[0.85vh] grid grid-cols-6">
                {proactiveAdjustments.map((item, index) => (
                  <AdjustmentCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_20vh_15.2vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72vw,0.84rem)] font-black uppercase leading-tight text-control-text">Operator Impact</h2>
              <div className="mt-[0.8vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1vh] space-y-[1.35vh]">
                {operatorImpactItems.map((item) => (
                  <ImpactCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <QuotePanel emphasis="people protect operations." text="When the environment supports people," />
            <QuotePanel Icon={Sparkles} emphasis="measurable." text="A protected environment makes performance" />
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function PersonalWorkspaceScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "personal-workspace-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-cols-[minmax(15rem,0.34fr)_minmax(52rem,1fr)_minmax(17rem,0.34fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.7vh]">
              <h1 className="text-[clamp(1.85rem,2.35vw,3.3rem)] font-black leading-[1.07] tracking-normal text-control-text">
                <span className="block">Every Operator</span>
                <span className="block">Gets a</span>
                <span className="block text-control-warm">Personal</span>
                <span className="block text-control-warm">Workspace.</span>
              </h1>
              <div className="mt-[1.2vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35vh] max-w-[17rem] text-[clamp(0.66rem,0.76vw,0.88rem)] font-medium leading-[1.42] text-slate-800">
                Every operator can start from a known profile: preferred height, screens, apps, audio, lighting and dashboard context.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[34.2vh] grid grid-cols-[4.8rem_minmax(0,1fr)] items-center gap-[0.8vw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <UserCheck aria-hidden="true" className="text-control-warm" size={52} strokeWidth={1.35} />
              <p className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-medium leading-[1.36] text-slate-800">
                Personalization reduces setup variation and keeps repeated shifts consistent.
              </p>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[40.7vh_17.2vh_15.3vh_5.7vh] gap-[1vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Same Room. Different People. Personalized for Excellence.</h2>
              <div className="mt-[0.75vh] h-[2px] w-[1.8rem] bg-control-warm" />
              <div className="mt-[0.95vh] grid h-[34.3vh] grid-cols-3 gap-[0.8vw]">
                {personalizedProfiles.map((profile) => (
                  <OperatorProfileCard key={profile.name} profile={profile} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[0.95vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-tight text-control-text">Continuous Monitoring. Real-Time Insights.</h2>
              <div className="mt-[0.78vh] grid grid-cols-[repeat(6,minmax(0,1fr))_8rem] gap-[0.65vw]">
                {performanceMetrics.map((item, index) => (
                  <MetricCard index={index} item={item} key={item.title} />
                ))}
                <ComfortIndexCard />
              </div>
            </section>

            <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_24rem] gap-[0.8vw]">
              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.78vw] py-[0.85vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.52rem,0.61vw,0.72rem)] font-black uppercase leading-tight text-control-text">What Personalizes for Each Operator</h2>
                <div className="mt-[0.55vh] h-[2px] w-[1.6rem] bg-control-warm" />
                <div className="mt-[0.7vh] grid grid-cols-8">
                  {personalizationFactors.map((item, index) => (
                    <PersonalizationFactor index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[0.85vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.52rem,0.61vw,0.72rem)] font-black uppercase leading-tight text-control-text">Switch User. Instantly Adapted.</h2>
                <div className="mt-[0.55vh] h-[2px] w-[1.6rem] bg-control-warm" />
                <div className="mt-[0.8vh] grid grid-cols-3">
                  {switchUserSteps.map((item, index) => (
                    <SwitchUserStep index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>
            </div>

            <section className="grid grid-cols-[18rem_repeat(6,minmax(0,1fr))] items-center overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[0.65vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.52rem,0.62vw,0.72rem)] font-black uppercase leading-tight text-control-text">Consistent Experience. Every Shift. Every Time.</h2>
              {consistencyItems.map((item) => (
                <ConsistencyChip key={item} label={item} />
              ))}
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_20vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.62rem,0.72vw,0.84rem)] font-black uppercase leading-tight text-control-text">Operator Impact</h2>
              <div className="mt-[0.8vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.15vh] space-y-[2.05vh]">
                {operatorImpactItems.map((item) => (
                  <ImpactCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <QuotePanel emphasis="before work begins." text="The workspace is ready" />
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function IntelligenceBeyondDeskScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "intelligence-beyond-desk-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-cols-[minmax(15rem,0.33fr)_minmax(52rem,1fr)_minmax(18rem,0.36fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.8vh]">
              <h1 className="text-[clamp(2rem,2.55vw,3.58rem)] font-black leading-[1.07] tracking-normal text-control-text">
                <span className="block">Intelligence</span>
                <span className="block text-control-warm">Beyond</span>
                <span className="block">the Desk<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.25vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35vh] max-w-[16.8rem] text-[clamp(0.68rem,0.79vw,0.92rem)] font-medium leading-[1.42] text-slate-800">
                Room data extends into occupancy, energy, assets, environment and infrastructure, giving operators a measurable operating picture.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[34.8vh] grid grid-cols-[4.8rem_minmax(0,1fr)] items-center gap-[0.8vw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <Cpu aria-hidden="true" className="text-control-warm" size={52} strokeWidth={1.35} />
              <p className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-medium leading-[1.36] text-slate-800">
                <span className="font-black text-control-text">One Connected Intelligence Layer</span><br />
                Unifies people, systems, assets and the environment.
              </p>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[52.6vh_21.5vh] gap-[1vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95vw] py-[1.05vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-black uppercase leading-tight text-control-text">Everything Connected. Everything Measured.</h2>
              <div className="mt-[0.75vh] h-[2px] w-[1.8rem] bg-control-warm" />
              <div className="relative mt-[0.7vh] h-[34.2vh] overflow-hidden">
                <div className="absolute inset-x-[1vw] top-0 grid grid-cols-8">
                  {beyondDeskCategories.map((item) => (
                    <BeyondDeskCategory item={item} key={item.title} />
                  ))}
                </div>
                <div className="absolute inset-x-[1.2vw] bottom-0 top-[7.4vh] overflow-hidden rounded-[0.5rem]">
                  <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" src="/assets/source-pdf/p20_050_1781x1016.jpg" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.08),rgb(255_255_255/0.26)_74%,rgb(255_255_255/0.58))]" />
                  <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-white/82 to-transparent" />
                </div>
              </div>

              <div className="mx-[1vw] grid h-[7.5vh] grid-cols-4 overflow-hidden rounded-[0.52rem] border border-slate-200/86 bg-white/72 shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
                {intelligencePipeline.map((item, index) => (
                  <PipelineCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.75vw] py-[0.95vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-tight text-control-text">What the Room Understands</h2>
              <div className="mt-[0.65vh] h-[2px] w-[1.6rem] bg-control-warm" />
              <div className="mt-[0.7vh] grid grid-cols-7 gap-[0.55vw]">
                {roomUnderstandsItems.map((item) => (
                  <RoomUnderstandsCard item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_18.3vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Key Intelligence at a Glance</h2>
              <div className="mt-[0.7vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.8vh] grid gap-[0.72vh]">
                {intelligenceGlanceItems.map((item) => (
                  <IntelligenceGlanceCard item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <p className="text-[clamp(1.8rem,2.6vw,3rem)] font-black leading-none text-control-warm">"</p>
              <p className="mt-[0.1vh] max-w-[14rem] text-[clamp(0.68rem,0.8vw,0.94rem)] font-medium leading-[1.34] text-control-text">
                You can't improve what you don't measure.
              </p>
              <p className="mt-[0.55vh] max-w-[14rem] text-[clamp(0.7rem,0.82vw,0.96rem)] font-medium leading-[1.28] text-control-text">
                The intelligent room <span className="font-black text-control-warm">measures what matters.</span>
              </p>
              <span className="pointer-events-none absolute bottom-0 right-0 h-[5.8rem] w-[5.8rem] opacity-10 [background-image:radial-gradient(circle,rgb(15_23_42/0.75)_1px,transparent_1px)] [background-size:7px_7px]" />
            </section>
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function DigitalTwinControlRoomScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "digital-twin-control-room-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef4f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-cols-[minmax(15rem,0.31fr)_minmax(53rem,1fr)_minmax(18rem,0.34fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.7vh]">
              <h1 className="text-[clamp(1.78rem,2.4vw,3.35rem)] font-black leading-[1.07] tracking-normal text-control-text">
                <span className="block">A Digital Twin</span>
                <span className="block">of the Complete</span>
                <span className="block text-control-warm">Control Room.</span>
              </h1>
              <div className="mt-[1.25vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35vh] max-w-[17.4rem] text-[clamp(0.66rem,0.77vw,0.9rem)] font-medium leading-[1.44] text-slate-800">
                A live model mirrors people, assets, systems, environment and workflows so changes can be seen, tested and understood before rollout.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[32.7vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95vw] py-[1.05vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="divide-y divide-slate-200/90">
                {digitalTwinIntroItems.map((item) => (
                  <DigitalTwinIntroItem item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[58.2vh_15.9vh] gap-[1vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-black uppercase leading-tight text-control-text">Digital Twin - Live, Dynamic, Always in Sync</h2>
              <div className="mt-[0.75vh] flex items-center gap-[0.62vw]">
                {["3D Overview", "Asset View", "Systems View", "Environment View", "People View"].map((tab, index) => (
                  <DigitalTwinTab active={index === 0} key={tab} label={tab} />
                ))}
              </div>

              <div className="relative mt-[0.9vh] h-[39.4vh] overflow-hidden rounded-[0.55rem]">
                <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" src="/assets/source-pdf/p20_050_1781x1016.jpg" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.1),rgb(255_255_255/0.22)_58%,rgb(255_255_255/0.72))]" />
                <div className="absolute inset-[4%] rounded-[0.45rem] border border-blue-400/28 bg-blue-500/[0.03] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.38)]" />
                <div className="absolute inset-[8%] rounded-[0.4rem] border border-dashed border-blue-500/34" />
                <div className="absolute left-[28%] top-[21%] h-[42%] w-[34%] rounded-[0.45rem] border border-cyan-400/38 bg-cyan-400/8" />
                {digitalTwinCallouts.map((item) => (
                  <DigitalTwinCallout item={item} key={item.title} />
                ))}
              </div>

              <div className="mt-[0.8vh] grid h-[8vh] grid-cols-5 overflow-hidden rounded-[0.52rem] border border-slate-200/86 bg-white/72 shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
                {digitalTwinMetrics.map((item, index) => (
                  <DigitalTwinMetric index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="grid min-h-0 grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] gap-[1vw]">
              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.75vw] py-[0.9vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-tight text-control-text">What the Twin Represents</h2>
                <div className="mt-[0.6vh] h-[2px] w-[1.6rem] bg-control-warm" />
                <div className="mt-[0.65vh] grid grid-cols-6">
                  {digitalTwinRepresents.map((item, index) => (
                    <TwinRepresentationCell index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className="grid min-h-0 grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <div className="px-[0.8vw] py-[0.9vh]">
                  <h2 className="text-[clamp(0.55rem,0.65vw,0.76rem)] font-black uppercase leading-tight text-control-text">Built for Safer Changes</h2>
                  <div className="mt-[0.6vh] h-[2px] w-[1.6rem] bg-control-warm" />
                  <ul className="mt-[0.55vh] space-y-[0.18vh]">
                    {digitalTwinDecisionBullets.map((bullet) => (
                      <li className="grid grid-cols-[0.85rem_minmax(0,1fr)] items-center gap-1 text-[clamp(0.39rem,0.47vw,0.55rem)] font-medium leading-[1.08] text-control-text" key={bullet}>
                        <SquareCheckBig aria-hidden="true" className="text-green-600" size={12} strokeWidth={2} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative min-h-0 overflow-hidden bg-slate-950">
                  <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-92" src="/assets/source-pdf/p22_052_1421x800.jpg" />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(15_23_42/0.12),rgb(37_99_235/0.2))]" />
                  <div className="absolute inset-[12%] rounded-[0.3rem] border border-cyan-300/42" />
                </div>
              </section>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_20vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">What the Digital Twin Enables</h2>
              <div className="mt-[0.7vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.8vh] divide-y divide-slate-200/90">
                {digitalTwinEnables.map((item) => (
                  <TwinEnablementCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Digital Twin Accuracy</h2>
              <div className="mt-[0.7vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[1.1vh] grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-[0.9vw]">
                <div className="grid h-[5.5rem] w-[5.5rem] place-items-center rounded-full bg-[conic-gradient(#16a34a_0_99%,#e2e8f0_99%_100%)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.75)]">
                  <span className="grid h-[4.05rem] w-[4.05rem] place-items-center rounded-full bg-white">
                    <strong className="text-[1.32rem] font-black leading-none text-control-text">99.2%</strong>
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[clamp(0.56rem,0.66vw,0.78rem)] font-black leading-tight text-control-text">Model Accuracy</h3>
                  <p className="mt-[0.5vh] text-[clamp(0.5rem,0.58vw,0.68rem)] font-medium leading-[1.24] text-slate-800">Live sync with real-world data</p>
                  <p className="mt-[0.85vh] text-[clamp(0.47rem,0.55vw,0.64rem)] font-black leading-tight text-control-text">Last Updated</p>
                  <p className="mt-0.5 text-[clamp(0.47rem,0.55vw,0.64rem)] font-medium leading-tight text-slate-700">10:18:32 AM</p>
                </div>
              </div>
            </section>
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function AiSilentAssistantScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "ai-silent-assistant-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#f0f3f8_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-cols-[minmax(15rem,0.31fr)_minmax(52rem,1fr)_minmax(18rem,0.34fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.7vh]">
              <h1 className="text-[clamp(2rem,2.75vw,3.85rem)] font-black leading-[1.03] tracking-normal text-control-text">
                <span className="block">AI as the</span>
                <span className="block text-violet-600">Silent</span>
                <span className="block text-violet-600">Assistant<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.25vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.35vh] max-w-[17.6rem] text-[clamp(0.68rem,0.79vw,0.92rem)] font-medium leading-[1.43] text-slate-800">
                Nova watches approved signals in the background, summarizes what changed, and suggests the next step without taking command away from the operator.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[35.1vh] grid grid-cols-[4.7rem_minmax(0,1fr)] items-center gap-[0.75vw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <BrainCircuit aria-hidden="true" className="text-violet-600" size={50} strokeWidth={1.35} />
              <p className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-medium leading-[1.36] text-control-text">
                <span className="font-black">Proactive. Private.</span><br />
                Personalized.<br />
                Powerful.
              </p>
            </section>

            <section className="absolute inset-x-0 top-[48.8vh] overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.95vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-violet-600">Nova Works Behind the Scenes</h2>
              <div className="mt-[0.65vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.75vh] divide-y divide-slate-200/90">
                {novaBehindScenesItems.map((item) => (
                  <NovaBehindItem item={item} key={item.title} />
                ))}
              </div>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[52.2vh_17.2vh_7.6vh] gap-[0.85vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <img alt="" className="absolute inset-x-0 bottom-0 h-[78%] w-full object-cover object-center" src="/assets/source-pdf/p20_050_1781x1016.jpg" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.94)_0%,rgb(255_255_255/0.58)_29%,rgb(255_255_255/0.04)_60%,rgb(255_255_255/0.32)_100%)]" />
              <div className="absolute left-1/2 top-[42%] grid h-[11.8rem] w-[11.8rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-violet-300/90 bg-[radial-gradient(circle_at_50%_45%,rgb(30_27_75/0.92),rgb(59_7_100/0.88)_50%,rgb(37_99_235/0.86)_100%)] text-white shadow-[0_0_3rem_rgb(124_58_237/0.55)]">
                <span className="absolute inset-[-0.45rem] rounded-full border border-blue-400/55" />
                <span className="absolute inset-[1.1rem] rounded-full border border-white/15" />
                <span className="text-center">
                  <strong className="block text-[clamp(1.65rem,2.1vw,2.35rem)] font-black leading-none">NOVA</strong>
                  <span className="mt-[0.8vh] block text-[clamp(0.72rem,0.84vw,0.98rem)] font-black leading-tight">Silent. Smart.</span>
                  <span className="mt-[0.7vh] block text-[clamp(0.68rem,0.8vw,0.94rem)] font-black leading-tight">Always with you.</span>
                </span>
              </div>
              {novaCapabilityCallouts.map((item) => (
                <NovaCapabilityCallout item={item} key={item.title} />
              ))}
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.9vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-black uppercase leading-tight text-violet-600">How Nova Supports Every Operator</h2>
              <div className="mt-[0.8vh] grid grid-cols-6">
                {novaOperatorSupportItems.map((item, index) => (
                  <NovaSupportCell index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="grid grid-cols-[0.12fr_1fr_1fr_1fr_0.12fr] items-center overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <p className="text-center text-[clamp(1.6rem,2.4vw,2.8rem)] font-black leading-none text-violet-600">"</p>
              <p className="border-r border-slate-200/90 px-[1vw] text-center text-[clamp(0.52rem,0.62vw,0.72rem)] font-medium leading-tight text-control-text">Nova doesn't replace operators.</p>
              <p className="border-r border-slate-200/90 px-[1vw] text-center text-[clamp(0.52rem,0.62vw,0.72rem)] font-medium leading-tight text-control-text">Nova gives them context.</p>
              <p className="border-r border-slate-200/90 px-[1vw] text-center text-[clamp(0.52rem,0.62vw,0.72rem)] font-medium leading-tight text-control-text">You stay in control.</p>
              <p className="text-center text-[clamp(1.6rem,2.4vw,2.8rem)] font-black leading-none text-violet-600">"</p>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_21vh_14vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-violet-600">What Nova Can Do</h2>
              <div className="mt-[0.7vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.85vh] divide-y divide-slate-200/90">
                {novaCanDoItems.map((item) => (
                  <NovaCanDoCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-violet-600">The Outcome</h2>
              <div className="mt-[0.7vh] h-[2px] w-[1.7rem] bg-control-warm" />
              <div className="mt-[0.8vh] grid gap-[0.62vh]">
                {novaOutcomeItems.map((item) => (
                  <div className="grid grid-cols-[1.45rem_minmax(0,1fr)] items-center gap-[0.5vw]" key={item}>
                    <SquareCheckBig aria-hidden="true" className="text-violet-600" size={17} strokeWidth={1.8} />
                    <span className="text-[clamp(0.5rem,0.59vw,0.68rem)] font-medium leading-tight text-control-text">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <BrainCircuit aria-hidden="true" className="absolute left-[1vw] top-[2vh] text-violet-600" size={42} strokeWidth={1.35} />
              <p className="ml-[4rem] mt-[0.6vh] text-[clamp(0.68rem,0.8vw,0.94rem)] font-black leading-tight text-violet-600">AI You Can Trust</p>
              <p className="ml-[4rem] mt-[0.5vh] max-w-[12rem] text-[clamp(0.48rem,0.57vw,0.66rem)] font-medium leading-[1.24] text-control-text">Transparent. Explainable. Secure. Built for control rooms. Built for you.</p>
              <span className="pointer-events-none absolute bottom-0 right-0 h-[5.8rem] w-[5.8rem] opacity-10 [background-image:radial-gradient(circle,rgb(124_58_237/0.8)_1px,transparent_1px)] [background-size:7px_7px]" />
            </section>
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function SoftwareDefinedControlRoomScene({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    recordIntelligentOperationsEvent("intelligent_operations_started", { chapterId: chapter.id, detail: "software-defined-control-room-reference" });
  }, [chapter.id]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eff3f8_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6vh] h-px bg-slate-200/80" />

      <section className="absolute inset-x-[1.55vw] top-[9.65vh] bottom-[7.05vh] z-10">
        <div className="absolute inset-x-0 top-0 bottom-[6.6vh] grid grid-cols-[minmax(15rem,0.31fr)_minmax(52rem,1fr)_minmax(18rem,0.34fr)] gap-[1.05vw]">
          <motion.aside animate={{ opacity: 1, y: 0 }} className="relative min-h-0" initial={false} transition={{ duration: 0.72, ease }}>
            <div className="absolute left-[0.2vw] top-[0.7vh]">
              <h1 className="text-[clamp(2rem,2.68vw,3.75rem)] font-black leading-[1.06] tracking-normal text-control-text">
                <span className="block">The</span>
                <span className="block text-violet-600">Software-Defined</span>
                <span className="block">Control Room<span className="text-control-warm">.</span></span>
              </h1>
              <div className="mt-[1.35vh] h-[2px] w-[2rem] bg-control-warm" />
              <p className="mt-[1.45vh] max-w-[17.4rem] text-[clamp(0.68rem,0.79vw,0.92rem)] font-medium leading-[1.43] text-slate-800">
                The physical room stays engineered; the operating experience can be updated through software.
              </p>
              <p className="mt-[2.4vh] max-w-[17.4rem] text-[clamp(0.68rem,0.79vw,0.92rem)] font-medium leading-[1.43] text-slate-800">
                Layouts, workflows and device behavior can evolve after handover without rebuilding the room.
              </p>
            </div>

            <section className="absolute inset-x-0 top-[39.3vh] grid grid-cols-[4.7rem_minmax(0,1fr)] items-center gap-[0.75vw] rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <Grid2X2 aria-hidden="true" className="text-violet-600" size={50} strokeWidth={1.35} />
              <p className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-medium leading-[1.38] text-control-text">
                <span className="font-black">One platform.</span><br />
                Any layout. Any scale.<br />
                Always up to date.
              </p>
            </section>
          </motion.aside>

          <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[50.8vh_17.6vh_13vh] gap-[0.95vh]" initial={false} transition={{ duration: 0.74, delay: 0.08, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <div className="px-[1vw] py-[1.2vh]">
                <h2 className="text-[clamp(0.62rem,0.72vw,0.84rem)] font-black uppercase leading-tight text-control-text">Software Defines. You Decide.</h2>
                <div className="mt-[1.1vh] grid grid-cols-4">
                  {softwareDefineSteps.map((item, index) => (
                    <SoftwareDefineStep index={index} item={item} key={item.title} />
                  ))}
                </div>
              </div>
              <div className="relative h-[34.2vh] overflow-hidden">
                <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" src="/assets/source-pdf/p20_050_1781x1016.jpg" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(255_255_255/0.12),rgb(255_255_255/0.02)_55%,rgb(255_255_255/0.18))]" />
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.85vw] py-[1vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Software Powering Everything</h2>
              <div className="mt-[0.9vh] grid grid-cols-7 items-start">
                {softwarePlatformFlow.map((item, index) => (
                  <SoftwarePlatformNode index={index} item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="grid min-h-0 grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] gap-[1vw]">
              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.85vw] py-[0.95vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.55rem,0.65vw,0.76rem)] font-black uppercase leading-tight text-control-text">Deploy Anywhere</h2>
                <div className="mt-[0.9vh] grid grid-cols-5">
                  {deployAnywhereItems.map((item, index) => (
                    <DeployAnywhereCell index={index} item={item} key={item.title} />
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[0.85vw] py-[0.95vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
                <h2 className="text-[clamp(0.55rem,0.65vw,0.76rem)] font-black uppercase leading-tight text-control-text">Real Benefits</h2>
                <div className="mt-[0.9vh] grid grid-cols-4">
                  {softwareBenefits.map((item, index) => (
                    <SoftwareBenefitCell index={index} item={item} key={item.value} />
                  ))}
                </div>
              </section>
            </section>
          </motion.main>

          <motion.aside animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[minmax(0,1fr)_18vh_16vh] gap-[1.05vh]" initial={false} transition={{ duration: 0.74, delay: 0.14, ease }}>
            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Defined by Software. Not Hardware.</h2>
              <div className="mt-[0.8vh] divide-y divide-slate-200/90">
                {softwareDefinedByItems.map((item) => (
                  <SoftwareDefinedByCell item={item} key={item.title} />
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.15vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <h2 className="text-[clamp(0.58rem,0.68vw,0.8rem)] font-black uppercase leading-tight text-control-text">Built for Change</h2>
              <div className="mt-[0.78vh] grid gap-[0.55vh]">
                {builtForChangeItems.map((item) => (
                  <div className="grid grid-cols-[1.35rem_minmax(0,1fr)] items-center gap-[0.48vw]" key={item}>
                    <SquareCheckBig aria-hidden="true" className="text-violet-600" size={16} strokeWidth={1.8} />
                    <span className="text-[clamp(0.47rem,0.55vw,0.64rem)] font-medium leading-tight text-control-text">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.15vw] py-[1.45vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              <p className="text-[clamp(1.7rem,2.6vw,3rem)] font-black leading-none text-violet-600">"</p>
              <p className="mt-[0.1vh] max-w-[14rem] text-[clamp(0.68rem,0.8vw,0.94rem)] font-medium leading-[1.32] text-control-text">
                The room is engineered once.
              </p>
              <p className="mt-[0.55vh] max-w-[14rem] text-[clamp(0.68rem,0.8vw,0.94rem)] font-medium leading-[1.28] text-control-text">
                The operating experience can <span className="font-black text-violet-600">keep improving</span> as teams and missions change.
              </p>
              <span className="pointer-events-none absolute bottom-0 right-0 h-[5.8rem] w-[5.8rem] opacity-10 [background-image:radial-gradient(circle,rgb(37_99_235/0.8)_1px,transparent_1px)] [background-size:7px_7px]" />
            </section>
          </motion.aside>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[0.1vh] left-[0.1vw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.82, ease }}>
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft aria-hidden="true" size={22} /></button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight aria-hidden="true" size={23} /></button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={22} /></button>
          {chapterVoiceover ? (
            <button
              aria-label="Play narration"
              className="pws-scene-control"
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                voiceover.play(chapterVoiceover);
              }}
              title="Narration"
              type="button"
            >
              <Headphones aria-hidden="true" size={22} />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function RecognitionOverlay() {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-[9%] top-[15%] h-[63%] w-[22%]">
        <span className="absolute left-[38%] top-[2%] h-[16rem] w-[5.6rem] origin-top -skew-x-12 bg-cyan-400/22 blur-[1px]" />
        <span className="absolute left-[42%] top-[12%] h-[8.3rem] w-[4.2rem] rounded-t-full bg-slate-950/82 shadow-[0_1.2rem_2.8rem_rgb(15_23_42/0.28)]" />
        <span className="absolute left-[47%] top-[7%] h-[2.2rem] w-[2.2rem] rounded-full bg-slate-900" />
        <span className="absolute left-[33%] top-[10%] h-[7.5rem] w-[7.5rem] border border-cyan-200/85" />
        <span className="absolute left-[40%] top-[18%] h-[3rem] w-[3rem] rounded-full border border-cyan-200/75" />
      </div>
      <div className="absolute left-[25%] top-[34%] text-white drop-shadow-[0_0.5rem_1.4rem_rgb(15_23_42/0.38)]">
        <p className="text-[clamp(0.92rem,1.1vw,1.25rem)] font-black uppercase leading-none">Welcome</p>
        <p className="mt-1 text-[clamp(1.45rem,1.85vw,2.1rem)] font-black leading-none">ARJUN</p>
        <p className="mt-2 text-[clamp(0.52rem,0.62vw,0.72rem)] font-black uppercase tracking-normal">Identity Confirmed</p>
        <span className="mt-2 inline-grid h-[1.65rem] w-[1.65rem] place-items-center rounded-full border border-emerald-300/70 bg-emerald-500/32 text-emerald-200">
          <SquareCheckBig aria-hidden="true" size={18} />
        </span>
      </div>
      <div className="absolute right-[4%] top-[10%] h-[64%] w-[14%] border border-dashed border-white/75" />
      {["top-[20%]", "top-[33%]", "top-[47%]", "top-[61%]", "top-[75%]"].map((top, index) => (
        <span className={`absolute right-[-2%] ${top} h-px w-[20%] border-t border-dashed border-white/75`} key={index} />
      ))}
    </div>
  );
}

function MiniUnderstandingCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.55vw] text-center ${index % 3 ? "border-l border-slate-200/90" : ""} ${index > 2 ? "border-t border-slate-200/90 pt-[1vh]" : ""}`}>
      <Icon aria-hidden="true" className="mx-auto text-control-text" size={28} strokeWidth={1.5} />
      <p className="mx-auto mt-[0.75vh] max-w-[6.4rem] text-[clamp(0.5rem,0.59vw,0.68rem)] font-medium leading-[1.22] text-control-text">{item.title}</p>
    </div>
  );
}

function InfoDeliveryCell({ dark = false, item }: { dark?: boolean; item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.45rem_minmax(0,1fr)] items-center gap-[0.65vw] py-[0.55vh]">
      <Icon aria-hidden="true" className="text-control-warm" size={27} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.52rem,0.62vw,0.72rem)] font-black leading-tight ${dark ? "text-white" : "text-control-text"}`}>{item.title}</strong>
        <span className={`mt-0.5 block text-[clamp(0.48rem,0.55vw,0.64rem)] font-medium leading-[1.18] ${dark ? "text-slate-200" : "text-slate-800"}`}>{item.description}</span>
      </span>
    </div>
  );
}

function OperationalStateChip({ item, index }: { item: SimpleItem & { color: string; active?: boolean }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid grid-cols-[3.6rem_minmax(0,1fr)] items-center gap-[0.65vw] px-[0.95vw] ${index ? "border-l border-slate-200/90" : ""} ${item.active ? "bg-control-warm/6 ring-1 ring-inset ring-control-warm/22" : ""}`}>
      <Icon aria-hidden="true" className={item.color} size={36} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.56rem,0.66vw,0.76rem)] font-black uppercase leading-tight ${item.color}`}>{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.48rem,0.56vw,0.66rem)] font-medium leading-[1.18] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function RoomResponseSystem({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.55vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={item.color ?? "text-control-warm"} size={26} strokeWidth={1.55} />
      <h3 className="mt-[0.6vh] text-[clamp(0.45rem,0.54vw,0.63rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.42vh] max-w-[6.5rem] text-[clamp(0.39rem,0.47vw,0.55rem)] font-medium leading-[1.16] text-slate-700">{item.description}</p>
    </div>
  );
}

function OperationalHowStep({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.45vw] text-center">
      {index ? <span className="absolute left-[-0.25vw] top-[1rem] text-[1rem] font-light text-control-text">→</span> : null}
      <Icon aria-hidden="true" className={index === 1 ? "mx-auto text-amber-500" : index === 3 ? "mx-auto text-green-500" : "mx-auto text-control-warm"} size={25} strokeWidth={1.55} />
      <h3 className="mt-[0.55vh] text-[clamp(0.43rem,0.51vw,0.6rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.35vh] max-w-[5.6rem] text-[clamp(0.38rem,0.45vw,0.53rem)] font-medium leading-[1.13] text-slate-700">{item.description}</p>
    </div>
  );
}

function IncidentExampleFrame({ item, index }: { item: { title: string; description: string; image: string }; index: number }) {
  return (
    <article className="relative min-w-0">
      {index ? <span className="absolute left-[-0.46vw] top-[1.4rem] text-[1.1rem] font-light text-control-warm">›</span> : null}
      <div className="relative h-[2.75rem] overflow-hidden rounded-[0.34rem] border border-slate-200 bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" src={item.image} />
        <div className={index === 0 ? "absolute inset-0 bg-control-warm/24" : "absolute inset-0 bg-slate-950/8"} />
      </div>
      <h3 className="mt-[0.4vh] text-[clamp(0.42rem,0.5vw,0.58rem)] font-black leading-tight text-control-warm">{item.title}</h3>
      <p className="mt-[0.16vh] text-[clamp(0.36rem,0.43vw,0.5rem)] font-medium leading-[1.08] text-slate-700">{item.description}</p>
    </article>
  );
}

function PerformanceCallout({ item }: { item: SimpleItem & { color: string; className: string } }) {
  const Icon = item.Icon;
  return (
    <div className={`absolute z-20 grid w-[12.25rem] grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-[0.62rem] rounded-[0.5rem] border border-white/90 bg-white/92 px-[0.78rem] py-[0.72rem] shadow-[0_0.9rem_2rem_rgb(15_23_42/0.16)] backdrop-blur-[20px] ${item.className}`}>
      <Icon aria-hidden="true" className={item.color} size={33} strokeWidth={1.5} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.52rem,0.6vw,0.68rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-1 block text-[clamp(0.47rem,0.53vw,0.6rem)] font-semibold leading-[1.24] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function MetricCard({ item, index }: { item: (typeof performanceMetrics)[number]; index: number }) {
  return (
    <article className="relative min-w-0 overflow-hidden rounded-[0.45rem] border border-slate-200/86 bg-white/64 px-[0.65vw] py-[0.78vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[clamp(0.46rem,0.53vw,0.62rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
        <span className="text-[clamp(0.4rem,0.47vw,0.55rem)] font-medium text-slate-700">{item.unit}</span>
      </div>
      <p className={`mt-[0.45vh] text-[clamp(0.98rem,1.16vw,1.36rem)] font-black leading-none ${item.color}`}>{item.value}</p>
      <p className={`mt-[0.25vh] text-[clamp(0.46rem,0.53vw,0.62rem)] font-black ${item.status === "Good" ? "text-green-600" : "text-slate-700"}`}>{item.status}</p>
      <MiniSparkline color={item.color} index={index} />
      <p className="mt-[0.35vh] text-[clamp(0.42rem,0.48vw,0.57rem)] font-medium leading-tight text-control-text">{item.target}</p>
    </article>
  );
}

function MiniSparkline({ color, index }: { color: string; index: number }) {
  const stroke = color.includes("green") ? "#16a34a" : color.includes("blue") ? "#2563eb" : color.includes("violet") ? "#7c3aed" : "#f97316";
  const patterns = [
    "2,25 11,23 20,18 29,24 38,15 47,17 56,11 65,15 74,12 83,18 94,10",
    "2,17 11,15 20,18 29,14 38,19 47,16 56,18 65,13 74,16 83,12 94,15",
    "2,20 11,18 20,23 29,17 38,20 47,16 56,19 65,15 74,18 83,14 94,17",
  ];

  return (
    <svg aria-hidden="true" className="mt-[0.6vh] h-[1.5rem] w-full overflow-visible" viewBox="0 0 96 30">
      <polyline fill="none" points={patterns[index % patterns.length]} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function ComfortIndexCard() {
  return (
    <article className="min-w-0 rounded-[0.45rem] border border-slate-200/86 bg-white/64 px-[0.55vw] py-[0.72vh] text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <div className="mx-auto grid h-[4.7rem] w-[4.7rem] place-items-center rounded-full bg-[conic-gradient(#84cc16_0_82%,#e2e8f0_82%_100%)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.75)]">
        <span className="grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full bg-white">
          <span className="text-center">
            <strong className="block text-[1.35rem] font-black leading-none text-control-text">92</strong>
            <span className="text-[0.52rem] font-black text-slate-700">Excellent</span>
          </span>
        </span>
      </div>
      <p className="mx-auto mt-[0.45vh] max-w-[6.2rem] text-[clamp(0.4rem,0.47vw,0.55rem)] font-medium leading-[1.12] text-slate-700">Environment is optimized for peak performance.</p>
    </article>
  );
}

function AdjustmentCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.65rem_minmax(0,1fr)] items-center gap-[0.55vw] px-[0.65vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={item.color ?? "text-control-warm"} size={29} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.46rem,0.54vw,0.63rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.4rem,0.47vw,0.55rem)] font-medium leading-[1.12] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function ImpactCell({ item }: { item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.7rem_minmax(0,1fr)] items-center gap-[0.72vw]">
      <Icon aria-hidden="true" className={item.color ?? "text-green-600"} size={29} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.52rem,0.61vw,0.72rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.47rem,0.55vw,0.64rem)] font-medium leading-[1.2] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function QuotePanel({ Icon, emphasis, text }: { Icon?: LucideIcon; emphasis: string; text: string }) {
  const QuoteIcon = Icon;
  return (
    <section className="relative overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1.35vw] py-[1.55vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
      {QuoteIcon ? (
        <QuoteIcon aria-hidden="true" className="absolute left-[1.05vw] top-[2vh] text-control-warm" size={42} strokeWidth={1.35} />
      ) : (
        <p className="absolute left-[1.05vw] top-[1.4vh] text-[clamp(2rem,3vw,3.5rem)] font-black leading-none text-control-warm">"</p>
      )}
      <p className="ml-[4.4rem] mt-[1.4vh] max-w-[13.2rem] text-[clamp(0.72rem,0.85vw,0.98rem)] font-medium leading-[1.32] text-control-text">{text}</p>
      <p className="ml-[4.4rem] mt-[0.7vh] max-w-[13rem] text-[clamp(0.74rem,0.88vw,1.02rem)] font-black leading-[1.24] text-control-warm">{emphasis}</p>
      <span className="pointer-events-none absolute bottom-0 right-0 h-[5.8rem] w-[5.8rem] opacity-10 [background-image:radial-gradient(circle,rgb(239_68_68/0.65)_1px,transparent_1px)] [background-size:7px_7px]" />
    </section>
  );
}

function OperatorProfileCard({ profile }: { profile: (typeof personalizedProfiles)[number] }) {
  return (
    <article className="grid h-full min-w-0 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden rounded-[0.46rem] border border-slate-200/86 bg-white/70 shadow-[0_0.8rem_1.9rem_rgb(15_23_42/0.08)]">
      <div className={`bg-gradient-to-r ${profile.color} px-[0.78vw] py-[0.78vh] text-white`}>
        <h3 className="truncate text-[clamp(0.56rem,0.66vw,0.78rem)] font-black uppercase leading-tight">{profile.name}</h3>
        <p className="mt-0.5 truncate text-[clamp(0.5rem,0.58vw,0.68rem)] font-semibold leading-tight">Focus: {profile.focus}</p>
      </div>
      <div className="relative min-h-0 overflow-hidden bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-95" src={profile.image} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgb(15_23_42/0.18))]" />
      </div>
      <div className="grid grid-cols-5 divide-x divide-slate-200/90 px-[0.4vw] py-[0.75vh]">
        {profile.settings.map((setting) => {
          const Icon = setting.Icon;
          return (
            <div className="min-w-0 px-[0.28vw] text-center" key={setting.title}>
              <Icon aria-hidden="true" className={`mx-auto ${profile.accent}`} size={22} strokeWidth={1.55} />
              <p className="mt-[0.42vh] text-[clamp(0.38rem,0.45vw,0.52rem)] font-black leading-tight text-control-text">{setting.title}</p>
              <p className="mt-[0.18vh] text-[clamp(0.35rem,0.42vw,0.5rem)] font-medium leading-[1.08] text-slate-700">{setting.value}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function PersonalizationFactor({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.45vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={item.color ?? "text-blue-600"} size={24} strokeWidth={1.5} />
      <h3 className="mt-[0.55vh] text-[clamp(0.38rem,0.46vw,0.54rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.34vh] max-w-[5.4rem] text-[clamp(0.34rem,0.41vw,0.49rem)] font-medium leading-[1.1] text-slate-700">{item.description}</p>
    </div>
  );
}

function SwitchUserStep({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.55vw] text-center">
      {index ? <span className="absolute left-[-0.42vw] top-[1.15rem] text-[1.25rem] font-light text-control-text">→</span> : null}
      <span className={`mx-auto grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border border-current/25 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.55} />
      </span>
      <h3 className="mt-[0.55vh] text-[clamp(0.43rem,0.51vw,0.6rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.3vh] max-w-[6rem] text-[clamp(0.38rem,0.45vw,0.53rem)] font-medium leading-[1.1] text-slate-700">{item.description}</p>
    </div>
  );
}

function ConsistencyChip({ label }: { label: string }) {
  return (
    <div className="flex min-w-0 items-center justify-center gap-[0.32rem] px-[0.45vw]">
      <SquareCheckBig aria-hidden="true" className="shrink-0 text-blue-600" size={15} strokeWidth={1.8} />
      <span className="text-[clamp(0.36rem,0.45vw,0.54rem)] font-semibold leading-tight text-control-text">{label}</span>
    </div>
  );
}

function BeyondDeskCategory({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 text-center">
      <Icon aria-hidden="true" className={`mx-auto ${item.color}`} size={31} strokeWidth={1.45} />
      <p className="mt-[0.45vh] text-[clamp(0.5rem,0.59vw,0.68rem)] font-black leading-tight text-control-text">{item.title}</p>
      <span className={`absolute left-1/2 top-[5.1vh] h-[25vh] -translate-x-1/2 border-l border-dotted ${item.color.includes("green") ? "border-green-500" : item.color.includes("cyan") ? "border-cyan-500" : item.color.includes("orange") ? "border-orange-500" : item.color.includes("violet") ? "border-violet-500" : "border-blue-500"}`} />
    </div>
  );
}

function PipelineCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[3.35rem_minmax(0,1fr)] items-center gap-[0.55vw] px-[1vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={item.color} size={34} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.52rem,0.61vw,0.72rem)] font-black uppercase leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.46rem,0.54vw,0.63rem)] font-medium leading-[1.18] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function RoomUnderstandsCard({ item }: { item: SimpleItem & { color: string; bullets: string[] } }) {
  const Icon = item.Icon;
  return (
    <article className="min-w-0 rounded-[0.46rem] border border-slate-200/86 bg-white/66 px-[0.62vw] py-[0.85vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <Icon aria-hidden="true" className={`mx-auto ${item.color}`} size={31} strokeWidth={1.45} />
      <h3 className="mx-auto mt-[0.65vh] max-w-[8rem] text-center text-[clamp(0.43rem,0.51vw,0.6rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
      <ul className="mt-[0.62vh] space-y-[0.22vh]">
        {item.bullets.map((bullet) => (
          <li className="grid grid-cols-[0.45rem_minmax(0,1fr)] gap-1 text-[clamp(0.35rem,0.42vw,0.5rem)] font-medium leading-[1.18] text-slate-700" key={bullet}>
            <span className={item.color}>•</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function IntelligenceGlanceCard({ item }: { item: (typeof intelligenceGlanceItems)[number] }) {
  const Icon = item.Icon;
  return (
    <article className="grid min-h-[7.2vh] grid-cols-[3.6rem_minmax(0,1fr)_4.8rem] items-center gap-[0.55vw] rounded-[0.5rem] border border-slate-200/86 bg-white/66 px-[0.72vw] py-[0.68vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92)]">
      <span className={`grid h-[2.8rem] w-[2.8rem] place-items-center rounded-full border border-current/25 bg-white/62 ${item.color}`}>
        <Icon aria-hidden="true" size={27} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <h3 className="text-[clamp(0.46rem,0.54vw,0.63rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
        <p className="mt-[0.3vh] text-[clamp(1rem,1.22vw,1.42rem)] font-medium leading-none text-control-text">
          <span className={`font-black ${item.color}`}>{item.value}</span>
          <span className="text-control-text">{item.suffix}</span>
        </p>
        <p className="mt-[0.22vh] text-[clamp(0.4rem,0.48vw,0.56rem)] font-medium leading-tight text-slate-700">{item.caption}</p>
      </span>
      <span className="min-w-0 text-right">
        {item.title === "Occupancy" ? <GlanceSparkline /> : null}
        <span className={`block text-[clamp(0.56rem,0.66vw,0.78rem)] font-black leading-tight ${item.color}`}>{item.side.split(" ")[0]}</span>
        <span className="block text-[clamp(0.38rem,0.45vw,0.53rem)] font-medium leading-tight text-slate-700">{item.side.split(" ").slice(1).join(" ")}</span>
      </span>
    </article>
  );
}

function GlanceSparkline() {
  return (
    <svg aria-hidden="true" className="mb-[0.2vh] h-[1.9rem] w-full" viewBox="0 0 72 30">
      <polyline fill="none" points="2,23 10,17 18,20 26,12 34,16 42,8 50,11 60,5 70,2" stroke="#65a30d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function DigitalTwinIntroItem({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.6rem_minmax(0,1fr)] items-center gap-[0.7vw] py-[0.86vh] first:pt-0 last:pb-0">
      <span className={`grid h-[2.35rem] w-[2.35rem] place-items-center rounded-full border border-current/20 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={24} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.5rem,0.59vw,0.68rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.45rem,0.52vw,0.61rem)] font-medium leading-[1.18] text-slate-700">{item.description}</span>
      </span>
    </div>
  );
}

function DigitalTwinTab({ active, label }: { active?: boolean; label: string }) {
  return (
    <button
      className={`h-[4.2vh] min-w-[7.5rem] rounded-[0.28rem] border px-[1vw] text-[clamp(0.48rem,0.56vw,0.66rem)] font-black uppercase tracking-normal shadow-[inset_0_1px_0_rgb(255_255_255/0.92)] ${
        active ? "border-control-warm bg-control-warm text-white shadow-[0_0.75rem_1.7rem_rgb(239_68_68/0.16)]" : "border-slate-200/90 bg-white/64 text-control-text"
      }`}
      type="button"
    >
      {label}
    </button>
  );
}

function DigitalTwinCallout({ item }: { item: (typeof digitalTwinCallouts)[number] }) {
  const Icon = item.Icon;
  return (
    <div className={`absolute z-20 grid w-[10.3rem] grid-cols-[2.05rem_minmax(0,1fr)] gap-[0.5rem] rounded-[0.42rem] border border-white/90 bg-white/88 px-[0.62rem] py-[0.56rem] shadow-[0_0.9rem_2rem_rgb(15_23_42/0.16)] backdrop-blur-[18px] ${item.className}`}>
      <Icon aria-hidden="true" className={item.color} size={25} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[0.5rem] font-black uppercase leading-tight text-control-text">{item.title}</strong>
        {item.lines.map((line) => (
          <span className="mt-0.5 block text-[0.48rem] font-medium leading-tight text-slate-800" key={line}>
            {line.includes("Online") || line.includes("Normal") || line.includes("Active") || line.includes("Secure") ? (
              <>
                {line.split(": ")[0]}: <span className="font-black text-green-600">{line.split(": ")[1]}</span>
              </>
            ) : (
              line
            )}
          </span>
        ))}
      </span>
    </div>
  );
}

function DigitalTwinMetric({ item, index }: { item: SimpleItem & { value: string; color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.9rem_minmax(0,1fr)] items-center gap-[0.55vw] px-[0.8vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className={`grid h-[2.45rem] w-[2.45rem] place-items-center rounded-full border border-current/20 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <h3 className="text-[clamp(0.43rem,0.51vw,0.6rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
        <p className={`mt-[0.25vh] text-[clamp(0.92rem,1.1vw,1.3rem)] font-black leading-none ${item.color}`}>{item.value}</p>
        <p className="mt-[0.2vh] text-[clamp(0.38rem,0.45vw,0.53rem)] font-medium leading-tight text-slate-700">{item.description}</p>
      </span>
    </div>
  );
}

function TwinRepresentationCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.48vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={`mx-auto ${item.color}`} size={27} strokeWidth={1.45} />
      <h3 className="mt-[0.54vh] text-[clamp(0.4rem,0.48vw,0.56rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.28vh] max-w-[5.9rem] text-[clamp(0.34rem,0.41vw,0.49rem)] font-medium leading-[1.1] text-slate-700">{item.description}</p>
    </div>
  );
}

function TwinEnablementCell({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[3.1rem_minmax(0,1fr)] items-center gap-[0.68vw] py-[0.78vh] first:pt-0 last:pb-0">
      <span className={`grid h-[2.45rem] w-[2.45rem] place-items-center rounded-full border border-current/20 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.5rem,0.59vw,0.68rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.45rem,0.52vw,0.61rem)] font-medium leading-[1.18] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function NovaCapabilityCallout({ item }: { item: SimpleItem & { color: string; className: string } }) {
  const Icon = item.Icon;
  const border =
    item.color.includes("blue") ? "border-blue-400/38" : item.color.includes("violet") ? "border-violet-400/38" : item.color.includes("orange") ? "border-orange-400/38" : item.color.includes("cyan") ? "border-cyan-400/38" : "border-green-400/38";
  return (
    <div className={`absolute z-20 grid w-[13rem] grid-cols-[2.7rem_minmax(0,1fr)] gap-[0.62rem] rounded-[0.52rem] border bg-white/84 px-[0.78rem] py-[0.72rem] shadow-[0_0.9rem_2rem_rgb(15_23_42/0.14)] backdrop-blur-[18px] ${border} ${item.className}`}>
      <Icon aria-hidden="true" className={item.color} size={33} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className={`block text-[0.58rem] font-black uppercase leading-tight ${item.color}`}>{item.title}</strong>
        <span className="mt-1 block text-[0.54rem] font-medium leading-[1.28] text-control-text">{item.description}</span>
      </span>
    </div>
  );
}

function NovaBehindItem({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.55rem_minmax(0,1fr)] items-center gap-[0.65vw] py-[0.56vh] first:pt-0 last:pb-0">
      <span className={`grid h-[2.15rem] w-[2.15rem] place-items-center rounded-full border border-current/15 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={22} strokeWidth={1.55} />
      </span>
      <p className="text-[clamp(0.47rem,0.56vw,0.66rem)] font-medium leading-[1.18] text-control-text">{item.title}</p>
    </div>
  );
}

function NovaSupportCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.58vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <span className={`mx-auto grid h-[2.9rem] w-[2.9rem] place-items-center rounded-full border border-current/20 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={27} strokeWidth={1.5} />
      </span>
      <h3 className="mt-[0.65vh] text-[clamp(0.45rem,0.54vw,0.63rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.42vh] max-w-[6.9rem] text-[clamp(0.38rem,0.45vw,0.53rem)] font-medium leading-[1.15] text-slate-700">{item.description}</p>
    </div>
  );
}

function NovaCanDoCell({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[3.15rem_minmax(0,1fr)] items-center gap-[0.68vw] py-[0.9vh] first:pt-0 last:pb-0">
      <span className={`grid h-[2.55rem] w-[2.55rem] place-items-center rounded-full border border-current/20 bg-white/64 ${item.color}`}>
        <Icon aria-hidden="true" size={25} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.5rem,0.59vw,0.68rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.45rem,0.52vw,0.61rem)] font-medium leading-[1.18] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function SoftwareDefineStep({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`relative grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-center gap-[0.55vw] px-[0.75vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      {index ? <span className="absolute left-[-0.3vw] top-[1.25rem] text-[1.15rem] font-light text-control-text">›</span> : null}
      <Icon aria-hidden="true" className={item.color} size={34} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.5rem,0.59vw,0.68rem)] font-black uppercase leading-tight ${item.color}`}>{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.43rem,0.5vw,0.59rem)] font-medium leading-[1.18] text-control-text">{item.description}</span>
      </span>
    </div>
  );
}

function SoftwarePlatformNode({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  const isPlatform = item.title === "OnePWS Platform";
  return (
    <div className="relative min-w-0 px-[0.42vw] text-center">
      {index ? <span className="absolute left-[-0.32vw] top-[2.1rem] w-[1.1vw] border-t border-dotted border-blue-400/70" /> : null}
      <span className={`mx-auto grid place-items-center rounded-full border border-current/20 bg-white/64 ${item.color} ${isPlatform ? "h-[5.2rem] w-[5.2rem] shadow-[0_0_0_0.5rem_rgb(59_130_246/0.06)]" : "h-[3.25rem] w-[3.25rem]"}`}>
        <Icon aria-hidden="true" size={isPlatform ? 36 : 30} strokeWidth={1.45} />
      </span>
      <h3 className="mt-[0.65vh] text-[clamp(0.43rem,0.51vw,0.6rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
      {item.description ? <p className="mx-auto mt-[0.28vh] max-w-[6.1rem] text-[clamp(0.36rem,0.43vw,0.51rem)] font-medium leading-[1.12] text-slate-700">{item.description}</p> : null}
    </div>
  );
}

function DeployAnywhereCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`min-w-0 px-[0.42vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={`mx-auto ${item.color}`} size={31} strokeWidth={1.45} />
      <p className="mt-[0.6vh] text-[clamp(0.42rem,0.5vw,0.58rem)] font-medium leading-tight text-control-text">{item.title}</p>
    </div>
  );
}

function SoftwareBenefitCell({ item, index }: { item: (typeof softwareBenefits)[number]; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.4rem_minmax(0,1fr)] items-center gap-[0.5vw] px-[0.62vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className={item.color} size={27} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className="block text-[clamp(1rem,1.2vw,1.42rem)] font-medium leading-none text-control-text">{item.value}</strong>
        <span className="mt-[0.34vh] block text-[clamp(0.38rem,0.45vw,0.53rem)] font-medium leading-[1.14] text-slate-700">{item.label}</span>
      </span>
    </div>
  );
}

function SoftwareDefinedByCell({ item }: { item: SimpleItem & { color: string } }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[3.15rem_minmax(0,1fr)] items-center gap-[0.72vw] py-[0.92vh] first:pt-0 last:pb-0">
      <Icon aria-hidden="true" className={item.color} size={30} strokeWidth={1.45} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.5rem,0.59vw,0.68rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.45rem,0.52vw,0.61rem)] font-medium leading-[1.18] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}

function InfoHeroCallout({ Icon, className, color, text, title }: { Icon: LucideIcon; className: string; color: string; text: string; title: string }) {
  return (
    <div className={`absolute z-20 grid w-[11.4rem] grid-cols-[2.35rem_minmax(0,1fr)] gap-[0.55rem] rounded-[0.45rem] border border-white/28 bg-slate-950/78 px-[0.72rem] py-[0.65rem] text-white shadow-[0_0.9rem_2rem_rgb(15_23_42/0.24)] backdrop-blur-md ${className}`}>
      <Icon aria-hidden="true" className={color} size={28} strokeWidth={1.55} />
      <span>
        <strong className="block text-[0.58rem] font-black uppercase leading-tight">{title}</strong>
        <span className="mt-1 block text-[0.54rem] font-medium leading-[1.3] text-slate-100">{text}</span>
      </span>
    </div>
  );
}

function InfoHowStep({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.8vw] text-center">
      {index ? <span className="absolute left-[-0.3vw] top-[1.5rem] text-[1.35rem] font-light text-control-text">→</span> : null}
      <span className={`mx-auto grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-current/25 bg-white/55 ${item.color}`}>
        <Icon aria-hidden="true" size={30} strokeWidth={1.55} />
      </span>
      <h3 className="mt-[0.8vh] text-[clamp(0.54rem,0.63vw,0.72rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.55vh] max-w-[8.2rem] text-[clamp(0.48rem,0.56vw,0.65rem)] font-medium leading-[1.22] text-slate-800">{item.description}</p>
    </div>
  );
}

function ComparisonPanel({ accent, items, title }: { accent: string; items: SimpleItem[]; title: string }) {
  return (
    <section className="overflow-hidden rounded-[0.62rem] border border-slate-200/86 bg-white/62 px-[1vw] py-[1.25vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.5rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
      <h2 className="text-[clamp(0.6rem,0.7vw,0.82rem)] font-black uppercase leading-tight text-control-text">{title}</h2>
      <div className={`mt-[0.75vh] h-[2px] w-[1.7rem] ${accent === "text-green-500" ? "bg-green-500" : "bg-control-warm"}`} />
      <div className="mt-[0.8vh] divide-y divide-slate-200/90">
        {items.map((item) => {
          const Icon = item.Icon;
          return (
            <div className="grid grid-cols-[2.35rem_minmax(0,1fr)] items-center gap-[0.55vw] py-[0.78vh]" key={item.title}>
              <Icon aria-hidden="true" className={item.color ?? accent} size={25} strokeWidth={1.55} />
              <p className="text-[clamp(0.48rem,0.57vw,0.68rem)] font-medium leading-[1.22] text-control-text">{item.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function InfoExampleCard({ item }: { item: { title: string; description: string; image: string } }) {
  return (
    <article className="min-w-0">
      <div className="relative h-[3.05rem] overflow-hidden rounded-[0.34rem] border border-slate-200 bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-92" src={item.image} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(15_23_42/0.14))]" />
      </div>
      <h3 className="mt-[0.45vh] truncate text-[clamp(0.48rem,0.56vw,0.65rem)] font-black uppercase leading-tight text-control-text">{item.title}</h3>
      <p className="mt-[0.16vh] text-[clamp(0.44rem,0.51vw,0.6rem)] font-medium leading-[1.1] text-slate-800">{item.description}</p>
    </article>
  );
}

function ConsoleModeCell({ item, index }: { item: SimpleItem & { color: string }; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`px-[1.15vw] text-center ${index ? "border-l border-dashed border-slate-300" : ""}`}>
      <span className={`mx-auto grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-current/25 bg-white/55 ${item.color}`}>
        <Icon aria-hidden="true" size={31} strokeWidth={1.55} />
      </span>
      <h3 className={`mt-[1vh] text-[clamp(0.58rem,0.68vw,0.78rem)] font-black uppercase ${item.color}`}>{item.title}</h3>
      <p className="mx-auto mt-[0.7vh] max-w-[11.4rem] text-[clamp(0.54rem,0.63vw,0.73rem)] font-medium leading-[1.32] text-slate-800">{item.description}</p>
    </div>
  );
}

function ConsoleAdaptStep({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.8vw] text-center">
      {index ? <span className="absolute left-[-0.3vw] top-[1.05rem] text-[1.25rem] font-light text-control-text">→</span> : null}
      <Icon aria-hidden="true" className="mx-auto text-control-text" size={29} strokeWidth={1.55} />
      <h3 className="mt-[0.75vh] text-[clamp(0.54rem,0.63vw,0.72rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mx-auto mt-[0.55vh] max-w-[8rem] text-[clamp(0.49rem,0.57vw,0.66rem)] font-medium leading-[1.22] text-slate-800">{item.description}</p>
    </div>
  );
}

function BenefitCell({ dark = false, item }: { dark?: boolean; item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <div className="grid grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-[0.7vw] py-[1.35vh]">
      <Icon aria-hidden="true" className="text-control-warm" size={30} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className={`block text-[clamp(0.56rem,0.65vw,0.76rem)] font-black leading-tight ${dark ? "text-white" : "text-control-text"}`}>{item.title}</strong>
        <span className={`mt-0.5 block text-[clamp(0.49rem,0.57vw,0.67rem)] font-medium leading-[1.24] ${dark ? "text-slate-200" : "text-slate-800"}`}>{item.description}</span>
      </span>
    </div>
  );
}

function TransitionFrame({ item, index }: { item: { title: string; description: string }; index: number }) {
  return (
    <div className="relative min-w-0">
      {index ? <span className="absolute left-[-0.72vw] top-[1.55vh] text-[1.55rem] font-light text-slate-400">»</span> : null}
      <div className="relative h-[2.85rem] overflow-hidden rounded-[0.32rem] border border-slate-200 bg-slate-950">
        <img alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" src={index < 2 ? "/assets/source-pdf/p24_054_1418x798.jpg" : "/assets/source-pdf/p23_053_1418x798.jpg"} />
        <div className={`absolute inset-0 ${index >= 2 ? "bg-control-warm/22" : "bg-slate-950/12"}`} />
        <span className="absolute bottom-[-0.05rem] left-[-0.05rem] grid h-[1.12rem] w-[1.12rem] place-items-center rounded-full bg-control-warm text-[0.55rem] font-black text-white">{index + 1}</span>
      </div>
      <h3 className="mt-[0.38vh] text-[clamp(0.5rem,0.58vw,0.68rem)] font-medium leading-tight text-control-text">{item.title}</h3>
      <p className="mt-[0.16vh] text-[clamp(0.46rem,0.53vw,0.62rem)] font-medium leading-[1.12] text-slate-800">{item.description}</p>
    </div>
  );
}

function SecurityCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`px-[0.65vw] text-center ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="mx-auto text-control-text" size={34} strokeWidth={1.55} />
      <p className="mx-auto mt-[1.2vh] max-w-[6.5rem] text-[clamp(0.58rem,0.68vw,0.78rem)] font-black leading-tight text-control-text">{item.title}</p>
    </div>
  );
}

function ExperienceStep({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className="relative min-w-0 px-[0.8vw]">
      {index ? <span className="absolute left-[-0.3vw] top-[1rem] text-[1.25rem] font-light text-control-text">→</span> : null}
      <Icon aria-hidden="true" className="text-control-warm" size={29} strokeWidth={1.55} />
      <h3 className="mt-[0.8vh] text-[clamp(0.55rem,0.64vw,0.74rem)] font-black leading-tight text-control-text">{item.title}</h3>
      <p className="mt-[0.65vh] max-w-[8rem] text-[clamp(0.5rem,0.58vw,0.67rem)] font-medium leading-[1.28] text-slate-800">{item.description}</p>
    </div>
  );
}

function ReadinessCard({ item }: { item: SimpleItem }) {
  const Icon = item.Icon;
  return (
    <article className="grid min-h-0 grid-cols-[4.35rem_minmax(0,1fr)] items-center gap-[0.9vw] rounded-[0.52rem] border border-slate-200/86 bg-white/64 px-[1vw] py-[0.82vh] shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_0.6rem_1.5rem_rgb(15_23_42/0.06)] backdrop-blur-[26px]">
      <span className={`grid h-[3.45rem] w-[3.45rem] place-items-center rounded-full border border-slate-200 bg-white/58 ${item.color ?? "text-control-warm"}`}>
        <Icon aria-hidden="true" size={31} strokeWidth={1.55} />
      </span>
      <span className="min-w-0">
        <strong className="block text-[clamp(0.64rem,0.74vw,0.86rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-1 block text-[clamp(0.56rem,0.65vw,0.76rem)] font-medium leading-[1.28] text-slate-800">{item.description}</span>
      </span>
    </article>
  );
}

function OutcomeCell({ item, index }: { item: SimpleItem; index: number }) {
  const Icon = item.Icon;
  return (
    <div className={`grid min-w-0 grid-cols-[2.8rem_minmax(0,1fr)] items-center gap-[0.65vw] px-[0.95vw] ${index ? "border-l border-slate-200/90" : ""}`}>
      <Icon aria-hidden="true" className="text-control-warm" size={31} strokeWidth={1.55} />
      <span className="min-w-0">
        <strong className="block text-[clamp(0.56rem,0.65vw,0.76rem)] font-black leading-tight text-control-text">{item.title}</strong>
        <span className="mt-0.5 block text-[clamp(0.5rem,0.58vw,0.68rem)] font-medium leading-[1.22] text-slate-800">{item.description}</span>
      </span>
    </div>
  );
}
