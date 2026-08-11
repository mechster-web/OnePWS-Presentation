import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import "@google/model-viewer";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Crosshair,
  DoorOpen,
  Expand,
  Headphones,
  Map as MapIcon,
  Minimize2,
  MonitorCog,
  Palette,
  Puzzle,
  Rotate3D,
  Ruler,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  UserRound,
  UsersRound,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { AudioPulse } from "../../design-system/components/AudioPulse";
import { PrecisionButton } from "../../design-system/components/InteractionCues";
import { AmbientLayer, SceneCanvas, SafeArea, StructuralLayer } from "../../design-system/components/ScenePrimitives";
import { usePerformanceMode } from "../../design-system/usePerformanceMode";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import { recordProductExperienceEvent } from "./productAnalytics";
import { getProductExperience, type ProductExperience, type ProductModule, type ProductSceneMode } from "./productExperienceConfig";
import { productNarration } from "./productNarration";

export function ProductExperienceScene({ chapter, fallback }: { chapter: Chapter; fallback: ReactNode }) {
  if (chapter.id === "console-portfolio") {
    return <ConsolePortfolioStage chapter={chapter} />;
  }

  const consoleDetail = consoleDetailByChapterId.get(chapter.id);
  if (consoleDetail) {
    return <ConsoleDetailStage chapter={chapter} detail={consoleDetail} />;
  }

  const experience = getProductExperience(chapter.id);
  if (!experience) {
    return <>{fallback}</>;
  }

  return <ProductExperienceStage chapter={chapter} experience={experience} />;
}

export function isConsoleExperienceChapter(chapterId: string) {
  return chapterId === "console-portfolio" || consoleDetailByChapterId.has(chapterId);
}

type PortfolioSpec = {
  label: string;
  value: string;
  Icon: typeof Crosshair;
};

type PortfolioCard = {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  soft: string;
  specs: PortfolioSpec[];
};

type PortfolioSupport = {
  title: string;
  detail: string;
  accent: string;
  soft: string;
  Icon: typeof ShieldCheck;
};

type ConsoleDetail = PortfolioCard & {
  chapterId: string;
  modelPath: string;
  promise: string;
  fit: string;
  descriptor: string;
  capabilities: string[];
  operatorValue: string[];
  colors: ConsoleColorOption[];
  views: ConsoleView[];
  hotspots: ConsoleHotspot[];
  ergonomicViews: ConsoleErgoView[];
  relatedFeatures: string[];
};

type ConsoleColorOption = {
  name: string;
  surface: string;
  edge: string;
};

type ConsoleView = {
  id: string;
  label: string;
  cameraOrbit: string;
  transform: string;
  caption: string;
};

type ConsoleHotspot = {
  id: string;
  label: string;
  description: string;
  x: string;
  y: string;
  Icon: typeof Crosshair;
};

type ConsoleErgoView = {
  id: string;
  label: string;
  description: string;
  metric: string;
  Icon: typeof Crosshair;
};

const consolePortfolioCards: PortfolioCard[] = [
  {
    id: "edge",
    name: "XLAT XE",
    title: "Curve Console",
    description: "Premium curved command desk for immersive visibility, superior reach and operator comfort.",
    image: "/assets/source-pdf/p07_012_382x215.jpg",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.12)",
    specs: [
      { label: "Best for", value: "Command & Control Centers", Icon: Crosshair },
      { label: "Configuration", value: "Curved / Semi-Circular", Icon: SlidersHorizontal },
      { label: "Operator", value: "1 to 6", Icon: UsersRound },
      { label: "Key Highlight", value: "Immersive view, superior reach", Icon: Star },
    ],
  },
  {
    id: "linear",
    name: "XLAT SE",
    title: "Straight Console",
    description: "Clean linear console for focused monitoring, modular expansion and efficient operations.",
    image: "/assets/source-pdf/p07_019_593x334.jpg",
    accent: "#2367b7",
    soft: "rgb(35 103 183 / 0.12)",
    specs: [
      { label: "Best for", value: "NOC, SOC, Utility & Transport", Icon: Crosshair },
      { label: "Configuration", value: "Straight / Linear", Icon: SlidersHorizontal },
      { label: "Operator", value: "1 to 4", Icon: UsersRound },
      { label: "Key Highlight", value: "Space efficient, modular", Icon: Star },
    ],
  },
  {
    id: "vista",
    name: "XLAT ZE",
    title: "Multi-Tier Console",
    description: "Layered control desk for stronger sightlines, display hierarchy and shared awareness.",
    image: "/assets/source-pdf/p06_009_477x254.jpg",
    accent: "#0f9678",
    soft: "rgb(15 150 120 / 0.12)",
    specs: [
      { label: "Best for", value: "Control Rooms, Surveillance", Icon: Crosshair },
      { label: "Configuration", value: "Multi-Tier", Icon: SlidersHorizontal },
      { label: "Operator", value: "1 to 5", Icon: UsersRound },
      { label: "Key Highlight", value: "Optimized sightlines, information hierarchy", Icon: Star },
    ],
  },
  {
    id: "elevate",
    name: "Dynamic XE",
    title: "Sit-Stand Console",
    description: "Height-adjustable consoles that adapt to every operator and every task.",
    image: "/assets/source-pdf/p07_018_520x293.jpg",
    accent: "#7a3db7",
    soft: "rgb(122 61 183 / 0.12)",
    specs: [
      { label: "Best for", value: "24/7 Operations, Mission Critical Environments", Icon: Crosshair },
      { label: "Configuration", value: "Sit-Stand / Height Adjustable", Icon: SlidersHorizontal },
      { label: "Operator", value: "1 to 4", Icon: UsersRound },
      { label: "Key Highlight", value: "Healthier posture, dynamic adjustment", Icon: Star },
    ],
  },
  {
    id: "collab",
    name: "Center HUB",
    title: "Collaboration Console",
    description: "Designed for teamwork, briefings and decision-making in real time.",
    image: "/assets/source-pdf/p06_010_574x312.jpg",
    accent: "#f06b18",
    soft: "rgb(240 107 24 / 0.12)",
    specs: [
      { label: "Best for", value: "War Rooms, Meeting Rooms", Icon: Crosshair },
      { label: "Configuration", value: "Open / Collaborative", Icon: SlidersHorizontal },
      { label: "Operator", value: "4 to 12", Icon: UsersRound },
      { label: "Key Highlight", value: "Built for collaboration, seamless interaction", Icon: Star },
    ],
  },
];

const consoleSupportItems: PortfolioSupport[] = [
  {
    title: "Certified Ergonomics",
    detail: "Designed to meet ISO 11064 standards for control rooms.",
    accent: "#d51d2a",
    soft: "rgb(213 29 42 / 0.11)",
    Icon: ShieldCheck,
  },
  {
    title: "Seamless Integration",
    detail: "Fully compatible with displays, AV, IT and building systems.",
    accent: "#2367b7",
    soft: "rgb(35 103 183 / 0.11)",
    Icon: Puzzle,
  },
  {
    title: "Built to Last",
    detail: "Durable materials and precision engineering for 24/7 uptime.",
    accent: "#0f9678",
    soft: "rgb(15 150 120 / 0.11)",
    Icon: Settings,
  },
  {
    title: "Future Ready",
    detail: "Modular architecture for easy upgrades and scalability.",
    accent: "#7a3db7",
    soft: "rgb(122 61 183 / 0.11)",
    Icon: SlidersHorizontal,
  },
  {
    title: "End-to-End Support",
    detail: "Design, delivery, installation and lifecycle support.",
    accent: "#f06b18",
    soft: "rgb(240 107 24 / 0.11)",
    Icon: Headphones,
  },
];

const commonConsoleColors: ConsoleColorOption[] = [
  { name: "Polar White", surface: "#f8fafc", edge: "#d9dee6" },
  { name: "Graphite", surface: "#2f343b", edge: "#111827" },
  { name: "Warm Grey", surface: "#d9d4cc", edge: "#9ca3af" },
  { name: "Signal Accent", surface: "#f8fafc", edge: "#d51d2a" },
];

const commonConsoleViews: ConsoleView[] = [
  { id: "front", label: "Front", cameraOrbit: "0deg 79deg 118%", transform: "translate3d(0,0,0) scale(1.02)", caption: "Operator-facing desk profile with monitors and primary controls." },
  { id: "left", label: "Left 90", cameraOrbit: "-90deg 79deg 118%", transform: "translate3d(-3.5%,0,0) scale(1.08) rotateY(4deg)", caption: "Side depth, cable access and return geometry." },
  { id: "rear", label: "Rear", cameraOrbit: "180deg 79deg 118%", transform: "translate3d(0,-1%,0) scale(1.12)", caption: "Service side view for access panels and integration channels." },
  { id: "right", label: "Right 90", cameraOrbit: "90deg 79deg 118%", transform: "translate3d(3.5%,0,0) scale(1.08) rotateY(-4deg)", caption: "Equipment bay, operator clearance and end-profile view." },
];

function enlargedCameraOrbit(cameraOrbit: string) {
  return cameraOrbit.replace(/[\d.]+%$/, "88%");
}

const commonHotspots: ConsoleHotspot[] = [
  { id: "door", label: "Service Door", description: "Click to reveal the front access door and maintenance bay for quick equipment service.", x: "38%", y: "64%", Icon: DoorOpen },
  { id: "cable", label: "Cable Channel", description: "Dedicated routing keeps AV, IT and power paths organized, accessible and separated.", x: "62%", y: "70%", Icon: Puzzle },
  { id: "monitor", label: "Monitor Rail", description: "Display supports align monitors to sightline requirements and task priorities.", x: "54%", y: "34%", Icon: MonitorCog },
  { id: "edge", label: "Edge Detail", description: "Durable work-surface edges resist daily impact while preserving a premium finish.", x: "24%", y: "55%", Icon: ShieldCheck },
];

const commonErgoViews: ConsoleErgoView[] = [
  { id: "sightline", label: "Sightline", description: "Screens are positioned for clear viewing with less neck movement across long shifts.", metric: "15° comfort viewing", Icon: Crosshair },
  { id: "reach", label: "Reach Zone", description: "Primary controls stay inside the comfortable reach envelope for frequent actions.", metric: "350-600 mm primary zone", Icon: Ruler },
  { id: "posture", label: "Posture", description: "Desk height, leg clearance and seating geometry support neutral operating posture.", metric: "Neutral seated posture", Icon: UserRound },
];

const consoleDetailSlides: ConsoleDetail[] = consolePortfolioCards.map((card) => {
  const detailById: Record<string, Omit<ConsoleDetail, keyof PortfolioCard>> = {
    edge: {
      chapterId: "console-detail-edge",
      modelPath: "/assets/models/consoles/xlat-xe.glb",
      descriptor: "Curved command console",
      promise: "XLAT XE wraps the workspace around the operator so critical information, controls and displays stay naturally within view and reach.",
      fit: "Best suited for command and control centers where one operator must maintain panoramic awareness across multiple systems.",
      capabilities: ["Immersive semi-circular viewing geometry", "Comfortable reach to primary controls", "Integrated monitor and AV support", "Built for 1 to 6 operator positions"],
      operatorValue: ["Wider situational awareness", "Reduced movement and visual strain", "Faster cross-screen interpretation"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["Curved work surface", "Integrated monitor spine", "Hidden service bay", "Ambient edge lighting"],
    },
    linear: {
      chapterId: "console-detail-linear",
      modelPath: "/assets/models/consoles/xlat-se.glb",
      descriptor: "Straight modular console",
      promise: "XLAT SE gives operations teams a disciplined straight-line workstation that is easy to deploy, extend and maintain.",
      fit: "Best suited for NOC, SOC, utility and transport operations where layouts must stay organized, scalable and easy to maintain.",
      capabilities: ["Straight modular console architecture", "Space-efficient footprint", "Simple expansion across operator rows", "Built for 1 to 4 operator positions"],
      operatorValue: ["Cleaner task focus", "Faster deployment", "Easy future reconfiguration"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["Linear row planning", "Modular equipment bays", "Service-ready rear access", "Desk-to-video-wall alignment"],
    },
    vista: {
      chapterId: "console-detail-vista",
      modelPath: "/assets/models/consoles/xlat-ze.glb",
      descriptor: "Multi-tier visibility console",
      promise: "XLAT ZE organizes information vertically so priority screens, task displays and shared views sit in a clearer hierarchy.",
      fit: "Best suited for surveillance and control rooms where screen hierarchy, sightlines and shared wall visibility matter most.",
      capabilities: ["Layered monitor tiers", "Improved information hierarchy", "Clear line-of-sight planning", "Built for 1 to 5 operator positions"],
      operatorValue: ["Better visibility", "Lower visual search time", "More confident monitoring"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["Raised monitor deck", "Tiered cable routing", "Sightline-first geometry", "Supervisor visibility support"],
    },
    elevate: {
      chapterId: "console-detail-elevate",
      modelPath: "/assets/models/consoles/dynamic-xe.glb",
      descriptor: "Sit-stand mission console",
      promise: "Dynamic XE adapts to the operator in real time, supporting posture changes and long-shift comfort without disrupting the mission.",
      fit: "Best suited for 24/7 mission-critical teams where healthier posture and dynamic adjustment directly support performance.",
      capabilities: ["Height-adjustable sit-stand movement", "Stable equipment support", "Personal ergonomic positioning", "Built for 1 to 4 operator positions"],
      operatorValue: ["Reduced fatigue", "Healthier posture", "Sustained focus across long shifts"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["Motorized height adjustment", "Position memory", "Stable lift structure", "Sit-stand cable management"],
    },
    collab: {
      chapterId: "console-detail-collab",
      modelPath: "/assets/models/consoles/center-hub.glb",
      descriptor: "Team response console",
      promise: "Center HUB creates a shared workspace for briefings, escalations and coordinated action when decisions need the whole team.",
      fit: "Best suited for war rooms, meeting rooms and command reviews where multiple people need shared visibility and fast alignment.",
      capabilities: ["Open collaborative layout", "Shared display and AV integration", "Team-facing work surface", "Built for 4 to 12 operators"],
      operatorValue: ["Better team synchronization", "Faster briefings", "Clearer decisions in real time"],
      colors: commonConsoleColors,
      views: commonConsoleViews,
      hotspots: commonHotspots,
      ergonomicViews: commonErgoViews,
      relatedFeatures: ["Shared work surface", "Briefing mode", "Collaborative AV routing", "Multi-user cable access"],
    },
  };

  return { ...card, ...detailById[card.id] };
});

const consoleDetailByChapterId = new Map(consoleDetailSlides.map((detail) => [detail.chapterId, detail]));

function ConsolePortfolioStage({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const processEase = [0.16, 1, 0.3, 1] as const;
  const precisionEase = [0.18, 0.86, 0.24, 1] as const;
  const popEase = [0.2, 1.08, 0.22, 1] as const;
  const duration = state.reducedMotion ? 0.01 : 0.74;
  const revealDuration = state.reducedMotion ? 0.01 : 0.92;

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef4f7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.022)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.022)_1px,transparent_1px)] bg-[length:5.4rem_5.4rem] opacity-65" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.6vh] bg-white/90 backdrop-blur-[2px]" />

      {!state.reducedMotion ? (
        <>
          <motion.div
            animate={{ opacity: [0, 0.34, 0.14], scale: [0.98, 1.04, 1] }}
            className="pointer-events-none absolute left-[30vw] top-[14vh] h-[44vh] w-[66vw] rounded-full bg-[radial-gradient(circle_at_52%_45%,rgb(213_29_42/0.11),rgb(47_101_184/0.07)_36%,transparent_69%)] blur-3xl"
            initial={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 2.15, ease: processEase }}
          />
          <motion.div
            animate={{ opacity: [0, 0.56, 0.18], scaleX: 1 }}
            className="pointer-events-none absolute left-[25.35vw] top-[69.4vh] h-px w-[70vw] origin-left bg-[linear-gradient(90deg,rgb(213_29_42/0.55),rgb(15_150_120/0.22),transparent)]"
            initial={{ opacity: 0, scaleX: 0 }}
            transition={{ duration: 1.55, delay: 0.34, ease: processEase }}
          />
        </>
      ) : null}

      <section className="absolute inset-0 z-20 px-[2.75vw] py-[3vh]">
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[2.75vw] top-[13vh] z-20 w-[20.7vw]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 14 }}
          transition={{ duration, ease: processEase }}
        >
          <p className="text-[clamp(0.64rem,0.74vw,0.9rem)] font-extrabold uppercase tracking-[0.11em] text-control-warm">
            Our Console Range
          </p>
          <div className="mt-[1.9vh] h-[2px] w-8 bg-control-warm" />
          <h1 className="mt-[1.8vh] text-balance text-[clamp(1.98rem,2.58vw,3.42rem)] font-extrabold leading-[1.03] tracking-normal text-control-text">
            Control-Room Console <span className="text-control-warm">Portfolio.</span>
          </h1>
          <div className="mt-[2.2vh] h-px w-8 bg-slate-300" />
          <p className="mt-[1.7vh] max-w-[16.8rem] text-[clamp(0.82rem,0.91vw,1.08rem)] leading-[1.54] text-control-text">
            Engineered for performance.
            <br />
            Designed for people.
            <br />
            Built for 24/7 mission-critical operations.
          </p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-[3.8vh] flex items-start gap-[0.9vw] rounded-[0.8rem] border border-white/85 bg-white/76 p-[0.95vw] shadow-[0_1.1rem_2.65rem_rgb(15_23_42/0.095)] backdrop-blur-xl"
            initial={state.reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.72, delay: 0.42, ease: popEase }}
            whileHover={state.reducedMotion ? undefined : { y: -3, scale: 1.01, transition: { duration: 0.36, ease: precisionEase } }}
          >
            <span className="grid h-[3.08rem] w-[3.08rem] shrink-0 place-items-center rounded-full bg-[rgb(213_29_42/0.1)] text-control-warm">
              <UserRound size={29} strokeWidth={1.8} />
            </span>
            <div>
              <h2 className="text-[clamp(0.7rem,0.76vw,0.92rem)] font-extrabold text-control-text">Human-Centred by Design</h2>
              <p className="mt-[0.58vh] text-[clamp(0.61rem,0.68vw,0.82rem)] leading-[1.45] text-slate-700">
                Every console is built around operator comfort, optimal reach and seamless system integration.
              </p>
            </div>
          </motion.div>
        </motion.aside>

        <motion.div
          animate="show"
          className="absolute left-[25.3vw] right-[2.75vw] top-[13.8vh] grid h-[57.2vh] grid-cols-5 gap-[0.82vw] [perspective:1600px]"
          initial="hidden"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: state.reducedMotion ? 0 : 0.105, delayChildren: state.reducedMotion ? 0 : 0.12 } },
          }}
        >
          {consolePortfolioCards.map((item, cardIndex) => {
            const highlightSpec = item.specs.find((spec) => spec.label === "Key Highlight");
            const primarySpecs = item.specs.filter((spec) => spec.label !== "Key Highlight");

            return (
              <motion.button
              aria-label={`Open ${item.name} ${item.title} details`}
              className="group relative flex min-h-0 flex-col overflow-hidden rounded-[0.82rem] border border-white/90 bg-white/90 text-left shadow-[0_1rem_2.5rem_rgb(15_23_42/0.08)] ring-1 ring-slate-900/[0.045] will-change-transform backdrop-blur-xl transition outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
              key={item.id}
              onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: `console-detail-${item.id}` })}
              style={{ borderBottom: `3px solid ${item.accent}` }}
              type="button"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.94, rotateX: 6, filter: "blur(10px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  filter: "blur(0px)",
                  transition: { duration: revealDuration, ease: popEase },
                },
              }}
              whileHover={
                state.reducedMotion
                  ? undefined
                  : {
                      y: -7,
                      scale: 1.012,
                      boxShadow: "0 1.45rem 3rem rgb(15 23 42 / 0.14)",
                      transition: { duration: 0.42, ease: precisionEase },
                    }
              }
            >
              <motion.div
                className="pointer-events-none absolute inset-x-[0.75vw] top-[16.2vh] z-10 h-px origin-left"
                initial={state.reducedMotion ? false : { scaleX: 0, opacity: 0 }}
                style={{ backgroundColor: item.accent }}
                animate={{ scaleX: 1, opacity: 0.42 }}
                transition={{ duration: 0.8, delay: 0.44 + cardIndex * 0.08, ease: precisionEase }}
              />
              <div className="relative h-[16.2vh] overflow-hidden bg-[linear-gradient(135deg,#f5f7f9,#dce2e8)]">
                <img
                  alt={`${item.title} product render`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                  src={item.image}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgb(255_255_255/0.28))]" />
                {!state.reducedMotion ? (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-[-38%] w-[30%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.48),transparent)]"
                    animate={{ x: ["0%", "520%"] }}
                    transition={{ duration: 1.5, delay: 0.6 + cardIndex * 0.08, ease: precisionEase }}
                  />
                ) : null}
              </div>
              <div className="flex min-h-0 flex-1 flex-col px-[0.92vw] py-[1.08vh]">
                <div className="flex items-start justify-between gap-[0.5vw]">
                  <div>
                    <p className="text-[clamp(0.76rem,0.86vw,1.04rem)] font-extrabold uppercase leading-none" style={{ color: item.accent }}>
                      {item.name}
                    </p>
                    <h2 className="mt-[0.48vh] text-[clamp(0.76rem,0.86vw,1.04rem)] font-extrabold leading-[1.08] text-control-text">
                      {item.title}
                    </h2>
                  </div>
                  <span className="mt-[-0.08rem] h-[0.54rem] w-[0.54rem] shrink-0 rounded-full shadow-[0_0_0_0.28rem_rgb(255_255_255/0.9)]" style={{ backgroundColor: item.accent }} />
                </div>
                <p className="mt-[0.78vh] min-h-[4.9vh] text-[clamp(0.58rem,0.64vw,0.76rem)] leading-[1.3] text-slate-700">
                  {item.description}
                </p>
                <div className="my-[0.72vh] h-px bg-slate-200/90" />
                <dl className="grid gap-[0.5vh] self-stretch">
                  {primarySpecs.map((spec, specIndex) => (
                    <motion.div
                      animate={{ opacity: 1, x: 0 }}
                      className="grid grid-cols-[1.02rem_1fr] gap-x-[0.42vw] rounded-[0.52rem] bg-slate-50/78 px-[0.48vw] py-[0.48vh]"
                      initial={state.reducedMotion ? false : { opacity: 0, x: -8 }}
                      key={spec.label}
                      transition={{ duration: 0.46, delay: 0.38 + cardIndex * 0.08 + specIndex * 0.035, ease: precisionEase }}
                    >
                      <spec.Icon aria-hidden="true" className="mt-[0.02rem]" color={item.accent} size={15} strokeWidth={1.9} />
                      <div>
                        <dt className="text-[clamp(0.48rem,0.53vw,0.63rem)] font-extrabold uppercase leading-none text-control-text">{spec.label}</dt>
                        <dd className="mt-[0.13rem] text-[clamp(0.48rem,0.54vw,0.65rem)] leading-[1.18] text-slate-700">{spec.value}</dd>
                      </div>
                    </motion.div>
                  ))}
                </dl>
                {highlightSpec ? (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto grid grid-cols-[1.08rem_1fr] gap-x-[0.44vw] rounded-[0.62rem] px-[0.54vw] py-[0.62vh]"
                    initial={state.reducedMotion ? false : { opacity: 0, y: 8 }}
                    style={{ backgroundColor: item.soft }}
                    transition={{ duration: 0.46, delay: 0.56 + cardIndex * 0.08, ease: precisionEase }}
                  >
                    <highlightSpec.Icon aria-hidden="true" className="mt-[0.02rem]" color={item.accent} size={15.5} strokeWidth={1.9} />
                    <p className="text-[clamp(0.49rem,0.55vw,0.66rem)] font-semibold leading-[1.22] text-slate-800">
                      <span className="font-extrabold text-control-text">{highlightSpec.label}: </span>
                      {highlightSpec.value}
                    </p>
                  </motion.div>
                ) : null}
              </div>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[9.45vh] left-[4.2vw] right-[4.2vw] grid h-[8.6vh] grid-cols-5 overflow-hidden rounded-[0.82rem] border border-white/85 bg-white/78 shadow-[0_1rem_2.65rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
          initial={state.reducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
          transition={{ duration: 0.82, delay: 0.68, ease: popEase }}
        >
          {consoleSupportItems.map((item, index) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-[0.7vw] px-[1.05vw] ${index > 0 ? "border-l border-slate-200" : ""}`}
              initial={state.reducedMotion ? false : { opacity: 0, y: 12 }}
              key={item.title}
              transition={{ duration: 0.58, delay: 0.82 + index * 0.065, ease: precisionEase }}
              whileHover={state.reducedMotion ? undefined : { backgroundColor: item.soft, transition: { duration: 0.24 } }}
            >
              <span className="grid h-[2.92rem] w-[2.92rem] shrink-0 place-items-center rounded-[0.65rem]" style={{ backgroundColor: item.soft, color: item.accent }}>
                <item.Icon size={24} strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="text-[clamp(0.66rem,0.72vw,0.86rem)] font-extrabold leading-[1.12] text-control-text">{item.title}</h3>
                <p className="mt-[0.3vh] text-[clamp(0.55rem,0.61vw,0.72rem)] leading-[1.32] text-slate-700">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[2.25vh] left-[2.75vw] justify-start"
          initial={state.reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.56, delay: 0.74, ease: processEase }}
        >
          <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button">
            <ChevronRight aria-hidden="true" />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <MapIcon aria-hidden="true" />
          </button>
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
              <Headphones aria-hidden="true" />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" />
          </button>
        </motion.div>
      </section>
    </article>
  );
}

function ConsoleDetailStage({ chapter, detail }: { chapter: Chapter; detail: ConsoleDetail }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const processEase = [0.16, 1, 0.3, 1] as const;
  const precisionEase = [0.18, 0.86, 0.24, 1] as const;
  const popEase = [0.2, 1.08, 0.22, 1] as const;
  const primarySpecs = detail.specs.filter((spec) => spec.label !== "Key Highlight");
  const highlightSpec = detail.specs.find((spec) => spec.label === "Key Highlight");
  const [selectedColor, setSelectedColor] = useState(detail.colors[0]);
  const [selectedView, setSelectedView] = useState(detail.views[0]);
  const [activeHotspot, setActiveHotspot] = useState(detail.hotspots[0]);
  const [activeErgoView, setActiveErgoView] = useState(detail.ergonomicViews[0]);
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null);
  const [viewerMaximized, setViewerMaximized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setModelAvailable(null);

    fetch(detail.modelPath, { method: "HEAD" })
      .then((response) => {
        if (!cancelled) {
          setModelAvailable(response.ok);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setModelAvailable(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [detail.modelPath]);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_54%,#edf4f8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.022)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.022)_1px,transparent_1px)] bg-[length:5.4rem_5.4rem] opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[10.6vh] bg-white/90 backdrop-blur-[2px]" />
      {!state.reducedMotion ? (
        <motion.div
          animate={{ opacity: [0, 0.42, 0.18], scale: [0.98, 1.04, 1] }}
          className="pointer-events-none absolute left-[24vw] top-[18vh] h-[56vh] w-[70vw] rounded-full blur-3xl"
          initial={{ opacity: 0, scale: 0.98 }}
          style={{
            background: `radial-gradient(circle at 46% 44%, ${detail.soft}, rgb(35 103 183 / 0.07) 36%, transparent 70%)`,
          }}
          transition={{ duration: 2.15, ease: processEase }}
        />
      ) : null}

      <section className="absolute inset-0 z-20 px-[2.75vw] py-[3vh]">
        <motion.aside
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-[2.75vw] top-[12.4vh] w-[22vw]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 16 }}
          transition={{ duration: state.reducedMotion ? 0.01 : 0.72, ease: processEase }}
        >
          <button
            className="inline-flex items-center gap-3 rounded-full border border-white/85 bg-white/78 px-4 py-3 text-[clamp(0.72rem,0.78vw,0.95rem)] font-extrabold uppercase tracking-[0.08em] text-control-text shadow-[0_0.75rem_1.8rem_rgb(15_23_42/0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-control-warm"
            onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "console-portfolio" })}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            Back to Portfolio
          </button>
          <p className="mt-[3.2vh] text-[clamp(0.68rem,0.78vw,0.95rem)] font-extrabold uppercase tracking-[0.11em]" style={{ color: detail.accent }}>
            {detail.descriptor}
          </p>
          <div className="mt-[1.6vh] h-[2px] w-10" style={{ backgroundColor: detail.accent }} />
          <h1 className="mt-[1.8vh] text-balance text-[clamp(2.35rem,3.28vw,4.25rem)] font-extrabold leading-[0.98] tracking-normal text-control-text">
            {detail.name}
            <span className="block text-[0.48em] leading-[1.2]" style={{ color: detail.accent }}>
              {detail.title}
            </span>
          </h1>
          <p className="mt-[2vh] max-w-[20rem] text-[clamp(0.82rem,0.95vw,1.12rem)] leading-[1.48] text-slate-700">
            {detail.promise}
          </p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-[2.7vh] rounded-[0.9rem] border border-white/85 bg-white/78 p-[1vw] shadow-[0_1rem_2.45rem_rgb(15_23_42/0.085)] backdrop-blur-xl"
            initial={state.reducedMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.72, delay: 0.22, ease: popEase }}
          >
            <p className="text-[clamp(0.62rem,0.7vw,0.85rem)] font-extrabold uppercase tracking-[0.08em] text-control-text">Designed for</p>
            <p className="mt-[0.8vh] text-[clamp(0.7rem,0.78vw,0.94rem)] leading-[1.45] text-slate-700">{detail.fit}</p>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-[1.4vh] grid grid-cols-2 gap-[0.55vw]"
            initial={state.reducedMotion ? false : { opacity: 0, y: 14 }}
            transition={{ duration: 0.58, delay: 0.34, ease: precisionEase }}
          >
            {primarySpecs.slice(1, 3).map((spec) => (
              <div className="rounded-[0.7rem] border border-white/80 bg-white/68 p-[0.72vw] shadow-[0_0.7rem_1.6rem_rgb(15_23_42/0.055)]" key={spec.label}>
                <spec.Icon aria-hidden="true" color={detail.accent} size={22} strokeWidth={1.85} />
                <p className="mt-[0.55vh] text-[clamp(0.5rem,0.56vw,0.68rem)] font-extrabold uppercase tracking-[0.05em] text-control-text">{spec.label}</p>
                <p className="mt-[0.24vh] text-[clamp(0.58rem,0.66vw,0.78rem)] font-semibold leading-[1.22] text-slate-700">{spec.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.aside>

        <motion.section
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute left-[26.4vw] right-[3vw] top-[12.3vh] grid h-[61.6vh] grid-cols-[minmax(0,1.05fr)_minmax(19rem,0.58fr)] gap-[1.1vw]"
          initial={state.reducedMotion ? false : { opacity: 0, y: 22, scale: 0.985 }}
          transition={{ duration: 0.84, delay: 0.12, ease: popEase }}
        >
          <div className="relative overflow-hidden rounded-[1rem] border border-white/90 bg-white/80 shadow-[0_1.25rem_3rem_rgb(15_23_42/0.1)] ring-1 ring-slate-900/[0.04] backdrop-blur-xl">
            {modelAvailable ? (
              <>
                <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_18%,rgb(255_255_255/1)_0%,rgb(244_247_250/0.96)_44%,rgb(225_231_238/0.96)_100%)]" />
                <div className="pointer-events-none absolute inset-x-[10%] bottom-[15%] z-[1] h-[16%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(15_23_42/0.18)_0%,rgb(15_23_42/0.08)_34%,transparent_72%)] blur-xl" />
                <div className="pointer-events-none absolute left-[13%] right-[13%] top-[16%] z-[1] h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.85),transparent)]" />
                <div className="pointer-events-none absolute inset-x-[18%] bottom-[24%] z-[1] h-px bg-[linear-gradient(90deg,transparent,rgb(15_23_42/0.1),transparent)]" />
              </>
            ) : null}
            <div className="pointer-events-none absolute left-[1.25vw] top-[1.5vh] z-20 flex items-center gap-[0.55vw] rounded-full border border-white/85 bg-white/78 px-[0.8vw] py-[0.62vh] shadow-[0_0.7rem_1.7rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
              <Rotate3D aria-hidden="true" color={detail.accent} size={20} strokeWidth={1.8} />
              <span className="text-[clamp(0.56rem,0.64vw,0.78rem)] font-extrabold uppercase tracking-[0.08em] text-control-text">360 Desk View</span>
            </div>
            <button
              aria-label="Maximize 360 desk view"
              className="absolute right-[1.25vw] top-[1.5vh] z-30 inline-flex items-center gap-[0.52vw] rounded-full border border-white/85 bg-white/82 px-[0.82vw] py-[0.62vh] text-[clamp(0.56rem,0.64vw,0.78rem)] font-extrabold uppercase tracking-[0.08em] text-control-text shadow-[0_0.7rem_1.7rem_rgb(15_23_42/0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-control-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
              onClick={() => setViewerMaximized(true)}
              type="button"
            >
              <Expand aria-hidden="true" size={18} strokeWidth={1.85} />
              Full View
            </button>
            {modelAvailable ? (
              <model-viewer
                alt={`${detail.name} ${detail.title} 3D model`}
                camera-controls
                camera-orbit={selectedView.cameraOrbit}
                camera-target="0m 0.32m 0m"
                className="absolute inset-0 z-10 h-full w-full cursor-grab active:cursor-grabbing"
                disable-tap
                environment-image="neutral"
                exposure="1.16"
                field-of-view="27deg"
                interaction-prompt="none"
                max-camera-orbit="auto 86deg 180%"
                min-camera-orbit="auto 42deg 70%"
                poster={detail.image}
                shadow-intensity="0.9"
                shadow-softness="0.88"
                src={detail.modelPath}
                style={{ background: "transparent" }}
              />
            ) : (
              <>
                <motion.img
                  alt={`${detail.name} ${detail.title}`}
                  animate={{ transform: selectedView.transform }}
                  className="h-full w-full object-cover"
                  src={detail.image}
                  transition={{ duration: state.reducedMotion ? 0.01 : 0.62, ease: precisionEase }}
                />
                <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.16]" style={{ background: `linear-gradient(135deg, ${selectedColor.surface}, transparent 48%, ${selectedColor.edge})` }} />
                <div className="pointer-events-none absolute right-[1.25vw] top-[1.5vh] z-20 rounded-[0.72rem] border border-white/85 bg-white/78 px-[0.85vw] py-[0.7vh] shadow-[0_0.7rem_1.7rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
                  <p className="text-[clamp(0.5rem,0.58vw,0.7rem)] font-extrabold uppercase tracking-[0.08em] text-control-text">GLB slot ready</p>
                  <p className="mt-[0.22vh] text-[clamp(0.5rem,0.58vw,0.7rem)] leading-[1.2] text-slate-600">{detail.modelPath}</p>
                </div>
              </>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[22%]" style={{ background: `linear-gradient(180deg, transparent, ${selectedColor.edge}${modelAvailable ? "14" : "30"})` }} />
            <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,transparent_58%,rgb(255_255_255/0.72))]" style={{ opacity: modelAvailable ? 0.32 : 1 }} />
            {!state.reducedMotion ? (
              <motion.span
                aria-hidden="true"
                animate={{ x: ["-20%", "130%"], opacity: [0, 0.55, 0] }}
                className="pointer-events-none absolute inset-y-0 left-[-28%] w-[22%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.5),transparent)]"
                transition={{ duration: 1.8, delay: 0.58, ease: precisionEase }}
              />
            ) : null}

            {!modelAvailable
              ? detail.hotspots.map((hotspot, index) => {
                  const active = hotspot.id === activeHotspot.id;
                  return (
                    <button
                      aria-label={`Open hotspot: ${hotspot.label}`}
                      className="absolute z-30 grid h-[2.35rem] w-[2.35rem] place-items-center rounded-full border border-white/90 bg-white/86 text-control-text shadow-[0_0.75rem_1.7rem_rgb(15_23_42/0.14)] backdrop-blur-xl transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
                      key={hotspot.id}
                      onClick={() => setActiveHotspot(hotspot)}
                      style={{ left: hotspot.x, top: hotspot.y, color: active ? "#ffffff" : detail.accent, backgroundColor: active ? detail.accent : "rgb(255 255 255 / 0.86)" }}
                      type="button"
                    >
                      <hotspot.Icon aria-hidden="true" size={18} strokeWidth={2} />
                      {!state.reducedMotion ? (
                        <motion.span
                          aria-hidden="true"
                          animate={{ opacity: [0.36, 0], scale: [1, 1.75] }}
                          className="absolute inset-0 rounded-full border"
                          style={{ borderColor: detail.accent }}
                          transition={{ duration: 1.55, delay: index * 0.18, repeat: Infinity, ease: "easeOut" }}
                        />
                      ) : null}
                    </button>
                  );
                })
              : null}

            {!modelAvailable && activeHotspot.id === "door" ? (
              <motion.div
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                className="pointer-events-none absolute bottom-[19%] left-[37%] z-20 h-[22%] w-[14%] rounded-[0.45rem] border border-white/70 shadow-[0_1rem_2rem_rgb(15_23_42/0.22)]"
                initial={state.reducedMotion ? false : { opacity: 0, x: -22, rotateY: -28 }}
                style={{ background: `linear-gradient(135deg, ${selectedColor.edge}, #ffffff88)` }}
                transition={{ duration: 0.54, ease: popEase }}
              />
            ) : null}

            <div className="absolute bottom-[2.3vh] left-[1.35vw] right-[1.35vw] z-30 grid grid-cols-[1fr_auto] items-end gap-[1vw]">
              <div className="rounded-[0.82rem] border border-white/90 bg-white/84 px-[1vw] py-[1.05vh] shadow-[0_0.85rem_1.8rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
                <p className="text-[clamp(0.62rem,0.7vw,0.84rem)] font-extrabold text-control-text">{selectedView.label} view</p>
                <p className="mt-[0.25vh] text-[clamp(0.58rem,0.66vw,0.78rem)] leading-[1.28] text-slate-700">{selectedView.caption}</p>
              </div>
              <div className="flex rounded-full border border-white/90 bg-white/84 p-[0.28rem] shadow-[0_0.85rem_1.8rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
                {detail.views.map((view) => {
                  const active = view.id === selectedView.id;
                  return (
                    <button
                      aria-pressed={active}
                      className="rounded-full px-[0.82vw] py-[0.62vh] text-[clamp(0.52rem,0.58vw,0.7rem)] font-extrabold uppercase tracking-[0.04em] transition"
                      key={view.id}
                      onClick={() => setSelectedView(view)}
                      style={{ backgroundColor: active ? detail.accent : "transparent", color: active ? "#ffffff" : "#111827" }}
                      type="button"
                    >
                      {view.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[0.78fr_0.9fr_0.82fr] gap-[1vh]">
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[1rem] border border-white/85 bg-white/78 p-[1.05vw] shadow-[0_1rem_2.45rem_rgb(15_23_42/0.085)] backdrop-blur-xl"
              initial={state.reducedMotion ? false : { opacity: 0, x: 18 }}
              transition={{ duration: 0.7, delay: 0.28, ease: processEase }}
            >
              <div className="flex items-center gap-[0.65vw]">
                <Palette aria-hidden="true" color={detail.accent} size={24} strokeWidth={1.85} />
                <h2 className="text-[clamp(0.8rem,0.94vw,1.12rem)] font-extrabold uppercase tracking-[0.02em] text-control-text">Color options</h2>
              </div>
              <div className="mt-[1.1vh] grid grid-cols-4 gap-[0.5vw]">
                {detail.colors.map((color) => (
                  <button
                    aria-pressed={color.name === selectedColor.name}
                    className="group rounded-[0.7rem] border border-slate-200 bg-white/76 p-[0.42vw] text-left shadow-[0_0.55rem_1.2rem_rgb(15_23_42/0.045)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    type="button"
                  >
                    <span className="block h-[2.2vh] rounded-[0.42rem] border border-slate-200" style={{ background: `linear-gradient(90deg, ${color.surface} 0 62%, ${color.edge} 62% 100%)` }} />
                    <span className="mt-[0.45vh] block text-[clamp(0.46rem,0.52vw,0.62rem)] font-extrabold leading-[1.08] text-control-text">{color.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[1rem] border border-white/85 bg-white/78 p-[1.05vw] shadow-[0_1rem_2.45rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
              initial={state.reducedMotion ? false : { opacity: 0, x: 18 }}
              transition={{ duration: 0.7, delay: 0.38, ease: processEase }}
            >
              <div className="flex items-center gap-[0.65vw]">
                <activeHotspot.Icon aria-hidden="true" color={detail.accent} size={24} strokeWidth={1.85} />
                <h2 className="text-[clamp(0.8rem,0.94vw,1.12rem)] font-extrabold uppercase tracking-[0.02em] text-control-text">Console feature</h2>
              </div>
              <div className="mt-[1.05vh] rounded-[0.78rem] px-[0.82vw] py-[1vh]" style={{ backgroundColor: detail.soft }}>
                <p className="text-[clamp(0.72rem,0.84vw,1rem)] font-extrabold text-control-text">{activeHotspot.label}</p>
                <p className="mt-[0.42vh] text-[clamp(0.62rem,0.72vw,0.86rem)] leading-[1.34] text-slate-700">{activeHotspot.description}</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[1rem] border border-white/85 bg-white/78 p-[1.05vw] shadow-[0_1rem_2.45rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
              initial={state.reducedMotion ? false : { opacity: 0, x: 18 }}
              transition={{ duration: 0.7, delay: 0.46, ease: processEase }}
            >
              <h2 className="text-[clamp(0.8rem,0.94vw,1.12rem)] font-extrabold uppercase tracking-[0.02em] text-control-text">Console features</h2>
              <div className="mt-[1vh] grid grid-cols-2 gap-[0.55vw]">
                {detail.capabilities.map((item, index) => (
                  <div className="rounded-[0.68rem] bg-slate-50/82 px-[0.65vw] py-[0.64vh]" key={item}>
                    <p className="text-[clamp(0.56rem,0.64vw,0.76rem)] font-semibold leading-[1.22] text-slate-800">
                      <span style={{ color: detail.accent }}>{String(index + 1).padStart(2, "0")} </span>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-[9.65vh] left-[4.2vw] right-[4.2vw] grid h-[10.6vh] grid-cols-[0.82fr_1fr_0.78fr] overflow-hidden rounded-[0.9rem] border border-white/85 bg-white/78 shadow-[0_1rem_2.6rem_rgb(15_23_42/0.075)] backdrop-blur-xl"
          initial={state.reducedMotion ? false : { opacity: 0, y: 20 }}
          transition={{ duration: 0.72, delay: 0.54, ease: popEase }}
        >
          <div className="flex items-center gap-[0.9vw] border-r border-slate-200 px-[1.2vw]">
            <activeErgoView.Icon aria-hidden="true" color={detail.accent} size={34} strokeWidth={1.75} />
            <div>
              <p className="text-[clamp(0.58rem,0.66vw,0.8rem)] font-extrabold uppercase tracking-[0.07em] text-control-text">Ergonomic view</p>
              <p className="mt-[0.22vh] text-[clamp(0.72rem,0.84vw,1rem)] font-extrabold" style={{ color: detail.accent }}>{activeErgoView.metric}</p>
            </div>
          </div>
          <div className="grid grid-cols-3">
            {detail.ergonomicViews.map((view) => {
              const active = view.id === activeErgoView.id;
              return (
                <button
                  aria-pressed={active}
                  className={`px-[0.9vw] text-left transition ${active ? "bg-white/74" : "hover:bg-white/46"}`}
                  key={view.id}
                  onClick={() => setActiveErgoView(view)}
                  type="button"
                >
                  <p className="text-[clamp(0.62rem,0.72vw,0.86rem)] font-extrabold text-control-text">{view.label}</p>
                  <p className="mt-[0.28vh] text-[clamp(0.5rem,0.58vw,0.7rem)] leading-[1.22] text-slate-700">{view.description}</p>
                </button>
              );
            })}
          </div>
          <div className="border-l border-slate-200 px-[1.1vw] py-[1.1vh]">
            <p className="text-[clamp(0.58rem,0.66vw,0.8rem)] font-extrabold uppercase tracking-[0.07em] text-control-text">Related features</p>
            <div className="mt-[0.75vh] grid grid-cols-2 gap-[0.45vw]">
              {detail.relatedFeatures.map((feature) => (
                <span className="rounded-full bg-slate-50 px-[0.62vw] py-[0.35vh] text-[clamp(0.48rem,0.56vw,0.68rem)] font-semibold leading-none text-slate-700" key={feature}>{feature}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="pws-scene-control-dock absolute bottom-[2.25vh] left-[2.75vw] justify-start"
          initial={state.reducedMotion ? false : { opacity: 0, y: 18 }}
          transition={{ duration: 0.56, delay: 0.66, ease: processEase }}
        >
          <button aria-label="Back to console portfolio" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "console-portfolio" })} title="Back to Portfolio" type="button">
            <ArrowLeft aria-hidden="true" />
          </button>
          <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
            <MapIcon aria-hidden="true" />
          </button>
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
              <Headphones aria-hidden="true" />
            </button>
          ) : null}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
            <Expand aria-hidden="true" />
          </button>
        </motion.div>

        {viewerMaximized ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-[1.7vw] z-50 rounded-[1.25rem] border border-white/90 bg-white/90 shadow-[0_2.4rem_6rem_rgb(15_23_42/0.24)] backdrop-blur-2xl"
            exit={{ opacity: 0 }}
            initial={state.reducedMotion ? false : { opacity: 0 }}
            transition={{ duration: 0.28, ease: precisionEase }}
          >
            <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[radial-gradient(circle_at_50%_13%,rgb(255_255_255/1)_0%,rgb(244_247_250/0.98)_46%,rgb(223_230_238/0.98)_100%)]" />
            <div className="pointer-events-none absolute inset-x-[13%] bottom-[13%] h-[14%] rounded-full bg-[radial-gradient(ellipse_at_center,rgb(15_23_42/0.2)_0%,rgb(15_23_42/0.08)_36%,transparent_72%)] blur-2xl" />
            <div className="absolute left-[2vw] top-[6.2vh] z-30 flex items-center gap-[0.75vw] rounded-full border border-white/85 bg-white/80 px-[1vw] py-[0.82vh] shadow-[0_0.8rem_2rem_rgb(15_23_42/0.08)] backdrop-blur-xl">
              <Rotate3D aria-hidden="true" color={detail.accent} size={22} strokeWidth={1.8} />
              <span className="text-[clamp(0.66rem,0.78vw,0.92rem)] font-extrabold uppercase tracking-[0.08em] text-control-text">{detail.name} 360 Desk View</span>
            </div>
            <button
              aria-label="Restore 360 desk view"
              className="absolute right-[2vw] top-[6.2vh] z-30 inline-flex items-center gap-[0.6vw] rounded-full border border-white/85 bg-white/84 px-[1vw] py-[0.82vh] text-[clamp(0.66rem,0.78vw,0.92rem)] font-extrabold uppercase tracking-[0.08em] text-control-text shadow-[0_0.8rem_2rem_rgb(15_23_42/0.08)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:text-control-warm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
              onClick={() => setViewerMaximized(false)}
              type="button"
            >
              <Minimize2 aria-hidden="true" size={19} strokeWidth={1.85} />
              Restore
            </button>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[24%]"
              style={{ background: `linear-gradient(180deg, transparent, ${selectedColor.edge}18)` }}
            />
            {modelAvailable ? (
              <model-viewer
                alt={`${detail.name} ${detail.title} enlarged 3D model`}
                camera-controls
                camera-orbit={enlargedCameraOrbit(selectedView.cameraOrbit)}
                camera-target="0m 0.32m 0m"
                className="absolute bottom-[8.4vh] left-[2.2vw] right-[2.2vw] top-[8.7vh] z-10 h-auto w-auto cursor-grab active:cursor-grabbing"
                disable-tap
                environment-image="neutral"
                exposure="1.18"
                field-of-view="22deg"
                interaction-prompt="none"
                key={`maximized-${detail.id}`}
                max-camera-orbit="auto 86deg 132%"
                min-camera-orbit="auto 42deg 38%"
                poster={detail.image}
                shadow-intensity="1"
                shadow-softness="0.92"
                src={detail.modelPath}
                style={{ background: "transparent", display: "block", height: "calc(100% - 17.1vh)", width: "calc(100% - 4.4vw)" }}
              />
            ) : (
              <motion.img
                alt={`${detail.name} ${detail.title} enlarged`}
                animate={{ transform: selectedView.transform }}
                className="absolute bottom-[10vh] left-[3vw] right-[3vw] top-[4.8vh] z-10 h-auto w-auto object-contain"
                src={detail.image}
                transition={{ duration: state.reducedMotion ? 0.01 : 0.62, ease: precisionEase }}
              />
            )}
            <div className="absolute bottom-[2.3vh] left-[2vw] z-30 rounded-[1rem] border border-white/90 bg-white/86 px-[0.9vw] py-[0.78vh] shadow-[0_0.85rem_2rem_rgb(15_23_42/0.1)] backdrop-blur-xl">
              <div className="flex items-center gap-[0.55vw]">
                <Palette aria-hidden="true" color={detail.accent} size={18} strokeWidth={1.85} />
                <span className="text-[clamp(0.58rem,0.66vw,0.78rem)] font-extrabold uppercase tracking-[0.07em] text-control-text">Color Options</span>
              </div>
              <div className="mt-[0.72vh] flex items-center gap-[0.42vw]">
                {detail.colors.map((color) => {
                  const active = color.name === selectedColor.name;
                  return (
                    <button
                      aria-label={`Select ${color.name}`}
                      aria-pressed={active}
                      className="grid h-[2rem] w-[2rem] place-items-center rounded-full border border-white bg-white shadow-[0_0.45rem_1rem_rgb(15_23_42/0.08)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/70"
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      type="button"
                    >
                      <span
                        className="h-[1.45rem] w-[1.45rem] rounded-full border border-slate-200"
                        style={{
                          background: `linear-gradient(135deg, ${color.surface} 0 58%, ${color.edge} 58% 100%)`,
                          boxShadow: active ? `0 0 0 0.18rem ${detail.accent}33` : "none",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-[2.3vh] left-1/2 z-30 flex -translate-x-1/2 rounded-full border border-white/90 bg-white/86 p-[0.35rem] shadow-[0_0.85rem_2rem_rgb(15_23_42/0.1)] backdrop-blur-xl">
              {detail.views.map((view) => {
                const active = view.id === selectedView.id;
                return (
                  <button
                    aria-pressed={active}
                    className="rounded-full px-[1.15vw] py-[0.78vh] text-[clamp(0.66rem,0.76vw,0.9rem)] font-extrabold uppercase tracking-[0.05em] transition"
                    key={view.id}
                    onClick={() => setSelectedView(view)}
                    style={{ backgroundColor: active ? detail.accent : "transparent", color: active ? "#ffffff" : "#111827" }}
                    type="button"
                  >
                    {view.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </section>
    </article>
  );
}

function ProductExperienceStage({ chapter, experience }: { chapter: Chapter; experience: ProductExperience }) {
  const { state } = usePresentation();
  const { mode: performanceMode } = usePerformanceMode();
  const reducedMotion = state.reducedMotion || performanceMode === "reduced";
  const [activeModuleId, setActiveModuleId] = useState(experience.modules[0]?.id ?? "");
  const [activeTaskId, setActiveTaskId] = useState(experience.taskStates[0]?.id ?? "");
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const activeModule = useMemo(
    () => experience.modules.find((module) => module.id === activeModuleId) ?? experience.modules[0],
    [activeModuleId, experience.modules],
  );
  const activeCue = productNarration[chapter.id]?.[revealed ? 2 : 0];

  useEffect(() => {
    recordProductExperienceEvent("product_journey_started", { chapterId: chapter.id, detail: experience.flagshipProduct });
  }, [chapter.id, experience.flagshipProduct]);

  useEffect(() => {
    if (state.mode !== "autoPlay") {
      return;
    }

    const timers = [
      window.setTimeout(() => setRevealed(true), 3_500),
      ...experience.modules.slice(0, 4).map((module, index) =>
        window.setTimeout(() => {
          setActiveModuleId(module.id);
          recordProductExperienceEvent(eventForMode(module.mode), { chapterId: chapter.id, detail: module.productName });
        }, 8_000 + index * 7_500),
      ),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [chapter.id, experience.modules, state.mode]);

  function selectModule(module: ProductModule) {
    setActiveModuleId(module.id);
    setRevealed(true);
    recordProductExperienceEvent(eventForMode(module.mode), { chapterId: chapter.id, detail: module.productName });
  }

  function selectTask(taskId: string) {
    setActiveTaskId(taskId);
    setRevealed(true);
    recordProductExperienceEvent("product_state_changed", { chapterId: chapter.id, detail: taskId });
  }

  function revealProduct() {
    setRevealed(true);
    recordProductExperienceEvent("product_revealed", { chapterId: chapter.id, detail: experience.flagshipProduct });
  }

  return (
    <SceneCanvas className={`pws-product-experience pws-product-mode-${activeModule.mode}`} performanceMode={performanceMode} theme={chapter.themeVariant ?? "product-light"}>
      <StructuralLayer variant={activeModule.mode === "technology-integration" ? "data" : "focus"} />
      <AmbientLayer atmosphere={activeModule.mode === "materials" ? "bloom" : activeModule.mode === "technology-integration" ? "data-trace" : "linework"} intensity="low" />
      <SafeArea className="pws-product-safe">
        <section className="pws-product-story">
          <p className="pws-technical-label">{chapter.eyebrow}</p>
          <h1 className="pws-chapter-title mt-4">{chapter.headline}</h1>
          <p className="pws-body-copy mt-5">{chapter.supportingMessage}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <PrecisionButton onClick={revealProduct} variant="primary">Reveal product</PrecisionButton>
            <PrecisionButton onClick={() => setTechnicalOpen((open) => !open)}>
              {technicalOpen ? "Hide technical" : "Technical detail"}
            </PrecisionButton>
          </div>
        </section>

        <section className="pws-product-stage-wrap" aria-label={`${experience.flagshipProduct}: ${activeModule.productName}`}>
          <ProductStageVisual
            activeModule={activeModule}
            activeTaskId={activeTaskId}
            experience={experience}
            reducedMotion={reducedMotion}
            revealed={revealed}
          />
          <FeatureCalloutLayer activeModule={activeModule} modules={experience.modules} onSelect={selectModule} revealed={revealed} />
          {technicalOpen ? <ProductTechnicalLayer chapter={chapter} experience={experience} module={activeModule} /> : null}
        </section>

        <section className="pws-product-controls">
          <div>
            <p className="pws-technical-label">Product modules</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {experience.modules.map((module) => (
                <button
                  aria-pressed={activeModule.id === module.id}
                  className={`pws-product-module ${activeModule.id === module.id ? "is-active" : ""}`}
                  key={module.id}
                  onClick={() => selectModule(module)}
                  type="button"
                >
                  {module.category}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="pws-technical-label">Task states</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {experience.taskStates.map((task) => (
                <button
                  aria-pressed={activeTaskId === task.id}
                  className={`pws-product-state ${activeTaskId === task.id ? "is-active" : ""}`}
                  key={task.id}
                  onClick={() => selectTask(task.id)}
                  type="button"
                >
                  {task.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="pws-product-status">
          {chapter.narration?.recommended ? <AudioPulse reducedMotion={reducedMotion} state={state.narrationEnabled ? "available" : "paused"} /> : null}
          <p>{activeCue?.text ?? activeModule.approvedClaim}</p>
        </aside>
      </SafeArea>
    </SceneCanvas>
  );
}

function ProductStageVisual({
  activeModule,
  activeTaskId,
  experience,
  reducedMotion,
  revealed,
}: {
  activeModule: ProductModule;
  activeTaskId: string;
  experience: ProductExperience;
  reducedMotion: boolean;
  revealed: boolean;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: revealed || reducedMotion ? 1 : 0.985 }}
      className="pws-product-system-stage"
      data-mode={activeModule.mode}
      data-revealed={revealed}
      data-task={activeTaskId}
      transition={{ duration: reducedMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pws-product-edge-light" />
      <div className="pws-product-back-wall" />
      <div className="pws-product-monitor-cluster" />
      <div className="pws-product-console-body" />
      <div className="pws-product-console-leg left" />
      <div className="pws-product-console-leg right" />
      <div className="pws-product-chair-form" />
      <div className="pws-product-cable-path" />
      <div className="pws-product-material-lens" />
      {activeModule.mode === "modular-construction" || activeModule.mode === "cable-management" ? (
        <div className="pws-product-exploded-layers">
          {["Work surface", "Technology bay", "Cable route", "Service access"].map((layer, index) => (
            <span key={layer} style={{ "--product-layer-i": index } as CSSProperties}>{layer}</span>
          ))}
        </div>
      ) : null}
      {activeModule.mode === "configuration" ? (
        <div className="pws-product-config-preview">
          {experience.configurationChoices.map((choice) => (
            <span aria-disabled={!choice.supported} key={choice.id}>{choice.label}</span>
          ))}
        </div>
      ) : null}
      <div className="pws-product-mode-label">
        <strong>{activeModule.productName}</strong>
        <span>{activeModule.reveal}</span>
      </div>
    </motion.div>
  );
}

function FeatureCalloutLayer({
  activeModule,
  modules,
  onSelect,
  revealed,
}: {
  activeModule: ProductModule;
  modules: ProductModule[];
  onSelect: (module: ProductModule) => void;
  revealed: boolean;
}) {
  return (
    <div className="pws-product-callout-layer" data-revealed={revealed}>
      {modules.slice(0, 7).map((module, index) => (
        <button
          aria-label={`Open ${module.productName}`}
          className={`pws-product-callout ${activeModule.id === module.id ? "is-active" : ""}`}
          key={module.id}
          onClick={() => onSelect(module)}
          style={{ "--callout-i": index } as CSSProperties}
          type="button"
        >
          <span>{module.featureName}</span>
        </button>
      ))}
    </div>
  );
}

function ProductTechnicalLayer({
  chapter,
  experience,
  module,
}: {
  chapter: Chapter;
  experience: ProductExperience;
  module: ProductModule;
}) {
  return (
    <div className="pws-product-technical-layer">
      <p className="pws-technical-label">Technical Layer</p>
      <h2>{module.productName}</h2>
      <p>{module.technicalDetail}</p>
      <ul>
        {chapter.technicalLayers.map((layer) => <li key={layer}>{layer}</li>)}
      </ul>
      <p>{chapter.presenterNotes ?? chapter.presenterTalkingPoint}</p>
      <p>{experience.claimBoundary}</p>
      <p>{module.restrictedClaim}</p>
    </div>
  );
}

function eventForMode(mode: ProductSceneMode) {
  switch (mode) {
    case "sit-stand":
      return "sit_stand_state_selected";
    case "monitor-system":
      return "monitor_mode_selected";
    case "cable-management":
      return "cable_path_explored";
    case "technology-integration":
      return "technology_layer_opened";
    case "materials":
      return "material_selected";
    case "configuration":
      return "configuration_changed";
    case "comparison":
      return "product_compared";
    case "room-context":
      return "product_room_viewed";
    case "modular-construction":
      return "product_exploded";
    default:
      return "product_feature_opened";
  }
}
