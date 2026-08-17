import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Expand,
  Factory,
  FileText,
  Globe2,
  Headphones,
  Map,
  MonitorCog,
  PenTool,
  Ruler,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getAsset } from "../../content/assetManifest";
import { enabledChapters } from "../../content/chapters";
import { credentialProofPoints } from "../../content/credentials";
import { getCustomerPathRecommendations } from "../../content/customerPaths";
import { featureStories } from "../../content/featureStories";
import { projects } from "../../content/projects";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Props = {
  chapter: Chapter;
};

type ProofMetric = {
  value: string;
  label: string;
  Icon: LucideIcon;
};

type NextStep = {
  title: string;
  detail: string;
  Icon: LucideIcon;
};

const proofValue = (id: string, fallback: string) =>
  credentialProofPoints.find((point) => point.id === id)?.value ?? fallback;

const closingProofMetrics: ProofMetric[] = [
  { value: proofValue("control-desk-solutions", "75,000+"), label: "Control desk solutions", Icon: MonitorCog },
  { value: proofValue("design-build-solutions", "450+"), label: "Design-build interiors", Icon: Building2 },
  { value: proofValue("workspace-customers", "250+"), label: "Customers served globally", Icon: Users },
  { value: proofValue("onepws-countries", "35+"), label: "Countries served by OnePWS", Icon: Globe2 },
  { value: proofValue("workspace-certifications", "20+"), label: "International certifications", Icon: BadgeCheck },
  { value: proofValue("workspace-factory-area", "170,000 sq. ft."), label: "Dedicated factory area", Icon: Factory },
];

const designProcessSteps: NextStep[] = [
  {
    title: "Discovery",
    detail: "Confirm mission, operators, workflows, site constraints and success criteria.",
    Icon: CalendarClock,
  },
  {
    title: "Site Inputs",
    detail: "Collect room dimensions, utilities, display needs, system interfaces and timelines.",
    Icon: Ruler,
  },
  {
    title: "Ergonomic Study",
    detail: "Validate sightlines, reach, seating, console posture and operator movement.",
    Icon: Users,
  },
  {
    title: "Concept Layout",
    detail: "Translate requirements into room zoning, console positions and operating modes.",
    Icon: PenTool,
  },
  {
    title: "Engineering Proposal",
    detail: "Define technical scope, materials, systems, manufacturing approach and delivery plan.",
    Icon: FileText,
  },
  {
    title: "Technical Review",
    detail: "Align stakeholders before final design, production and implementation.",
    Icon: ClipboardCheck,
  },
];

const decisionReasons = [
  "One accountable partner from concept to commissioning",
  "Operator performance designed into the room from the beginning",
  "Manufacturing, quality and certification proof in the same story",
  "Project references across mission-critical operating environments",
  "A future-ready path toward connected intelligence and lifecycle support",
];

export function ClosingChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);
  const ease = [0.16, 1, 0.3, 1] as const;
  const roomAsset = getAsset("ambient-control-room");
  const selectedIndustry = state.conceptSelection?.industry ?? state.customerPath.industry ?? "Mission-critical operations";
  const pathRecommendations = getCustomerPathRecommendations({
    industry: state.conceptSelection?.industry ?? state.customerPath.industry,
    role: state.customerPath.role,
  });
  const exploredSolutions = state.exploredFeatureIds
    .map((id) => featureStories.find((feature) => feature.id === id)?.title)
    .filter((title): title is string => Boolean(title));
  const bookmarkedProducts = state.bookmarkedFeatureIds
    .map((id) => featureStories.find((feature) => feature.id === id)?.title)
    .filter((title): title is string => Boolean(title));
  const relevantProjects = pathRecommendations.surfacedProjects
    .map((id) => projects.find((project) => project.id === id)?.name)
    .filter((name): name is string => Boolean(name));
  const relevantChapters = pathRecommendations.recommendedChapters
    .slice(0, 4)
    .map((id) => enabledChapters.find((item) => item.id === id)?.title)
    .filter((title): title is string => Boolean(title));
  const selectedPriorities = [
    state.conceptSelection?.priority,
    state.conceptSelection?.operatingPattern,
    state.conceptSelection?.visualCharacter,
    state.conceptSelection?.integrationLevel,
  ].filter(Boolean).map(String);

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_55%,#eef3f7_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[8.6cqh] h-px bg-slate-200/80" />
      <div className="pointer-events-none absolute right-[2cqw] top-[12cqh] h-[36cqh] w-[38cqw] rounded-full bg-control-warm/5 blur-[76px]" />
      <div className="pointer-events-none absolute left-[1cqw] top-[14cqh] h-[58cqh] w-[40cqw] opacity-[0.055] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(90deg,#000,transparent)]" />

      <section className="relative z-10 flex h-full flex-col px-[1.55cqw] pb-[8.4cqh] pt-[9.65cqh]">
        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-[1.45cqh]">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(30rem,0.72fr)_minmax(0,1fr)] gap-[1.25cqw]"
            initial={false}
            transition={{ duration: 0.72, ease }}
          >
            <div className="min-w-0 pl-[0.35cqw] pt-[1.05cqh]">
              <h1 className="text-[clamp(2.45rem,3.2cqw,4.45rem)] font-bold uppercase leading-[1.02] tracking-normal text-black md:text-[2.42cqw]">
                <span className="block">The Future</span>
                <span className="block text-control-warm">Starts Here.</span>
              </h1>
              <div className="mt-[1.1cqh] h-[2px] w-[3rem] bg-control-warm" />
              <p className="mt-[1.25cqh] max-w-[48rem] text-[clamp(0.92rem,1.04cqw,1.2rem)] font-medium leading-[1.38] text-slate-900 md:text-[0.9cqw]">
                The next step is a structured design process that turns your mission, operators,
                systems and room constraints into one complete control-room environment.
              </p>
            </div>

            <div className="grid min-h-0 grid-cols-3 grid-rows-2 gap-x-[0.72cqw] gap-y-[0.9cqh] pt-[0.35cqh]">
              {closingProofMetrics.map((metric) => (
                <ClosingMetricCard key={metric.label} metric={metric} />
              ))}
            </div>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(32rem,0.98fr)_minmax(0,1.02fr)] gap-[1.35cqw]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.08, ease }}
          >
            <section className="relative min-h-0 overflow-hidden rounded-[0.9rem] border border-slate-200/86 bg-white/72 shadow-[inset_0_1px_0_rgb(255_255_255/0.92),0_1rem_2.8rem_rgb(15_23_42/0.08)] backdrop-blur-[26px]">
              {roomAsset?.src ? (
                <img alt="" className="absolute inset-0 h-full w-full object-cover object-center" draggable={false} src={roomAsset.src} />
              ) : null}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(255_255_255/0.9)_0%,rgb(255_255_255/0.36)_48%,rgb(255_255_255/0.1)_100%)]" />
              <div className="absolute left-[1.1cqw] top-[1.5cqh] max-w-[22rem] rounded-[0.65rem] border border-white/84 bg-white/76 p-[1.05cqw] shadow-[0_0.75rem_1.8rem_rgb(15_23_42/0.09)] backdrop-blur-[18px]">
                <p className="text-[clamp(0.82rem,0.92cqw,1.08rem)] font-semibold uppercase leading-tight text-control-text">
                  From presentation to project direction.
                </p>
                <p className="mt-[0.65cqh] text-[clamp(0.68rem,0.78cqw,0.92rem)] font-medium leading-[1.32] text-slate-700">
                  We move from what the room can become to what the first technical discussion should confirm.
                </p>
              </div>
              <div className="absolute bottom-[1.15cqh] left-[1.1cqw] right-[1.1cqw] grid grid-cols-5 gap-[0.55cqw]">
                {decisionReasons.map((reason) => (
                  <div className="rounded-[0.6rem] border border-white/78 bg-white/72 px-[0.72cqw] py-[0.82cqh] text-[clamp(0.58rem,0.66cqw,0.78rem)] font-semibold leading-[1.22] text-slate-800 shadow-sm backdrop-blur-[14px]" key={reason}>
                    {reason}
                  </div>
                ))}
              </div>
            </section>

            <section className="flex h-full min-h-0 flex-col rounded-[0.65rem] border border-slate-200/86 bg-white/76 px-[1.05cqw] pb-[1.35cqh] pt-[1.2cqh] shadow-[0_0.9rem_2.3rem_rgb(15_23_42/0.065)]">
              <h2 className="text-[clamp(1rem,1.14cqw,1.34rem)] font-semibold uppercase leading-tight text-control-text">
                Start the Design Process
              </h2>
              <div className="mt-[0.65cqh] h-[2px] w-[2.6rem] bg-control-warm" />
              <div className="mt-[1.2cqh] grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-x-[0.82cqw] gap-y-[0.95cqh]">
                {designProcessSteps.map((step, index) => (
                  <ProcessStepCard index={index} key={step.title} step={step} />
                ))}
              </div>
            </section>
          </motion.section>

          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="grid min-h-0 grid-cols-[minmax(0,0.52fr)_minmax(0,0.48fr)] gap-[1.35cqw]"
            initial={false}
            transition={{ duration: 0.72, delay: 0.14, ease }}
          >
            <section className="rounded-[0.65rem] border border-slate-200/86 bg-white/78 px-[1.35cqw] py-[1.35cqh] shadow-[0_0.9rem_2.2rem_rgb(15_23_42/0.065)]">
              <h2 className="text-[clamp(0.94rem,1.04cqw,1.18rem)] font-semibold uppercase leading-tight text-control-text">
                Customer Direction Captured
              </h2>
              <div className="mt-[0.55cqh] h-[2px] w-[2.35rem] bg-control-warm" />
              <div className="mt-[0.9cqh] grid grid-cols-3 gap-x-[0.55cqw] gap-y-[0.65cqh]">
                <SummaryChip title="Operating context" value={selectedIndustry} />
                <SummaryChip title="Priorities" value={selectedPriorities.length > 0 ? selectedPriorities.slice(0, 2).join(", ") : "Operational continuity, operator comfort"} />
                <SummaryChip title="Explored solutions" value={exploredSolutions.length > 0 ? exploredSolutions.slice(0, 2).join(", ") : "Connected room systems, ergonomic engineering"} />
                <SummaryChip title="Bookmarked products" value={bookmarkedProducts.length > 0 ? bookmarkedProducts.slice(0, 2).join(", ") : "Control-room consoles, integrated room systems"} />
                <SummaryChip title="Relevant projects" value={relevantProjects.length > 0 ? relevantProjects.slice(0, 2).join(", ") : "Selected references available"} />
                <SummaryChip title="Useful chapters" value={relevantChapters.length > 0 ? relevantChapters.slice(0, 2).join(", ") : "Complete journey remains available"} />
              </div>
            </section>

            <section className="grid min-h-0 grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] rounded-[0.65rem] border border-slate-200/86 bg-white/78 p-[0.45cqw] shadow-[0_0.9rem_2.2rem_rgb(15_23_42/0.065)]">
              <div className="border-r border-slate-200/90 px-[1.35cqw] py-[1.3cqh]">
                <p className="text-[clamp(1.28rem,1.66cqw,1.95rem)] font-semibold leading-tight text-control-text">
                  Next decision: <span className="text-control-warm">approve the technical discovery.</span>
                </p>
                <p className="mt-[0.75cqh] text-[clamp(0.68rem,0.76cqw,0.88rem)] font-medium leading-[1.3] text-slate-700">
                  Once inputs are confirmed, OnePWS can convert the vision into a concept layout and engineering proposal.
                </p>
              </div>
              <div className="grid content-center gap-[0.55cqh] px-[1.35cqw] py-[1.2cqh]">
                {["Mission and workflows", "Room dimensions and site constraints", "Operator count and shift pattern", "Displays, applications and systems", "Timeline, stakeholders and approval path"].map((item) => (
                  <div className="flex items-center gap-2.5 text-[clamp(0.66rem,0.76cqw,0.88rem)] font-semibold text-slate-800" key={item}>
                    <CheckCircle2 aria-hidden="true" className="shrink-0 text-control-warm" size={18} strokeWidth={1.8} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.section>
        </div>

        <motion.div animate={{ opacity: 1, y: 0 }} className="pws-scene-control-dock absolute bottom-[1.7cqh] left-[1.65cqw] z-40 justify-start" initial={false} transition={{ duration: 0.62, delay: 0.42, ease }}>
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
          ) : (
            <button aria-label="Toggle narration" className="pws-scene-control" onClick={() => dispatch({ type: "TOGGLE_NARRATION" })} title="Narration" type="button"><Headphones aria-hidden="true" size={22} /></button>
          )}
          <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand aria-hidden="true" size={22} /></button>
        </motion.div>
      </section>
    </article>
  );
}

function ClosingMetricCard({ metric }: { metric: ProofMetric }) {
  return (
    <article className="grid min-w-0 content-center rounded-[0.65rem] border border-white/85 bg-white/76 px-[0.8cqw] py-[1cqh] text-center shadow-[0_0.85rem_2rem_rgb(15_23_42/0.065)]">
      <div className="grid place-items-center">
        <span className="grid size-11 place-items-center rounded-full bg-control-warm/7 text-control-warm">
          <metric.Icon aria-hidden="true" size={28} strokeWidth={1.55} />
        </span>
      </div>
      <strong className="mt-[0.55cqh] block text-[clamp(1.35rem,1.66cqw,1.95rem)] font-semibold leading-none text-control-warm">{metric.value}</strong>
      <span className="mt-[0.55cqh] block text-[clamp(0.68rem,0.78cqw,0.92rem)] font-semibold leading-tight text-control-text">{metric.label}</span>
    </article>
  );
}

function ProcessStepCard({ step, index }: { step: NextStep; index: number }) {
  return (
    <article className="h-full min-h-0 overflow-hidden rounded-[0.55rem] border border-slate-200/86 bg-white/72 p-[0.78cqw] shadow-[0_0.55rem_1.35rem_rgb(15_23_42/0.045)]">
      <div className="flex items-start gap-2.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-control-warm/7 text-control-warm">
          <step.Icon aria-hidden="true" size={25} strokeWidth={1.65} />
        </span>
        <div className="min-w-0">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-control-warm">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="text-[clamp(0.68rem,0.78cqw,0.92rem)] font-semibold uppercase leading-tight text-control-text">{step.title}</h3>
          <p className="mt-[0.42cqh] text-[clamp(0.54rem,0.62cqw,0.72rem)] font-medium leading-[1.2] text-slate-700">{step.detail}</p>
        </div>
      </div>
    </article>
  );
}

function SummaryChip({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-[0.45rem] border border-slate-200/86 bg-white/76 px-[0.7cqw] py-[0.62cqh]">
      <p className="text-[clamp(0.5rem,0.58cqw,0.68rem)] font-semibold uppercase tracking-[0.12em] text-control-warm">{title}</p>
      <p className="mt-[0.32cqh] line-clamp-2 text-[clamp(0.64rem,0.72cqw,0.84rem)] font-semibold leading-[1.2] text-slate-800">{value}</p>
    </article>
  );
}


