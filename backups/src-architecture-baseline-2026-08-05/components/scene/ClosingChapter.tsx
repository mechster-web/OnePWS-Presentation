import { motion } from "framer-motion";
import {
  CalendarClock,
  FileText,
  LayoutGrid,
  PlayCircle,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import { enabledChapters } from "../../content/chapters";
import { getCustomerPathRecommendations } from "../../content/customerPaths";
import { featureStories } from "../../content/featureStories";
import { projects } from "../../content/projects";
import type { Chapter } from "../../data/contentTypes";
import { getAsset } from "../../content/assetManifest";
import { entrance, revealTransition } from "../../motion/motionSystem";
import { usePresentation } from "../../state/PresentationProvider";
import type { ReactNode } from "react";

type Props = {
  chapter: Chapter;
};

export function ClosingChapter({ chapter }: Props) {
  const { dispatch, state } = usePresentation();
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
  const suggestedNextStep = state.conceptSelection
    ? "Request a conceptual layout using the selected room direction."
    : "Start a control-room consultation to capture the mission, operators and room constraints.";

  return (
    <article className="relative h-full w-full overflow-hidden bg-control-black text-control-text">
      <ClosingBackdrop />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.86)_48%,rgba(255,255,255,0.66)_100%)]" />

      <section className="absolute left-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+4.8rem)] z-20 max-w-[500px]">
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="text-xs uppercase tracking-[0.42em] text-control-warm"
          initial={false}
          transition={revealTransition(state.reducedMotion)}
        >
          {chapter.eyebrow}
        </motion.p>
        <motion.h1
          {...entrance.informationFocus(state.reducedMotion)}
          className="mt-3 text-balance text-[clamp(2rem,2.9vw,3.4rem)] font-semibold leading-[1.03] text-control-text"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.12)}
        >
          The Future of Control Rooms Starts Here.
        </motion.h1>
        <motion.p
          {...entrance.quietReveal(state.reducedMotion, 8)}
          className="mt-3 max-w-lg text-sm leading-6 text-control-soft"
          initial={false}
          transition={revealTransition(state.reducedMotion, 0.24)}
        >
          This is the beginning of the design process: selected context, explored solutions and the
          next practical action gathered into one direction.
        </motion.p>
      </section>

      <section className="absolute bottom-[calc(var(--stage-safe-y)+5rem)] left-[var(--stage-safe-x)] top-[46%] z-20 w-[min(650px,42vw)]">
        <div className="grid gap-2 md:grid-cols-2">
          <SummaryBlock title="Selected industry" items={[selectedIndustry]} />
          <SummaryBlock
            title="Selected priorities"
            items={selectedPriorities.length > 0 ? selectedPriorities.slice(0, 3) : ["Operational continuity", "Operator comfort"]}
          />
          <SummaryBlock
            title="Explored solutions"
            items={exploredSolutions.length > 0 ? exploredSolutions.slice(0, 3) : ["Connected room systems", "Ergonomic engineering"]}
          />
          <SummaryBlock
            title="Bookmarked products"
            items={bookmarkedProducts.length > 0 ? bookmarkedProducts.slice(0, 2) : ["Control-room consoles", "Integrated room systems"]}
          />
          <SummaryBlock
            title="Relevant projects"
            items={relevantProjects.length > 0 ? relevantProjects.slice(0, 2) : ["Selected references available"]}
          />
          <SummaryBlock
            title="Relevant chapters"
            items={relevantChapters.length > 0 ? relevantChapters.slice(0, 2) : ["Complete journey remains available"]}
          />
        </div>
        <div className="instrument-panel mt-2 p-3">
          <p className="text-xs uppercase tracking-[0.28em] text-control-warm">Suggested next step</p>
          <p className="mt-2 text-sm leading-6 text-control-soft">{suggestedNextStep}</p>
        </div>
      </section>

      <aside className="architectural-panel absolute bottom-[calc(var(--stage-safe-y)+5rem)] right-[var(--stage-safe-x)] top-[calc(var(--stage-safe-y)+5.4rem)] z-20 w-[min(830px,52vw)] overflow-hidden p-5 shadow-control">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Start the design process</p>
        <div className="mt-3 grid gap-2">
          <ActionButton
            icon={<CalendarClock aria-hidden="true" size={17} />}
            label="Start a control-room consultation"
            note="Discuss mission, room, operators and timeline"
          />
          <ActionButton
            icon={<FileText aria-hidden="true" size={17} />}
            label="Request a conceptual layout"
            note="Uses the Shape Your Control Room pathway"
            onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "configure-direction" })}
          />
          <ActionButton
            icon={<ShieldCheck aria-hidden="true" size={17} />}
            label="View technical credentials"
            note="Opens the credibility proof chapter"
            onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "intelligent-layers" })}
          />
          <ActionButton
            icon={<PlayCircle aria-hidden="true" size={17} />}
            label="Replay the experience"
            note="Restarts from the cinematic opening"
            onClick={() => dispatch({ type: "START_AUTOPLAY", restartFromOpening: true })}
          />
          <ActionButton
            icon={<LayoutGrid aria-hidden="true" size={17} />}
            label="Return to the main menu"
            note="Opens the guided journey"
            onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
          />
        </div>

        <div className="mt-3 grid min-h-[116px] items-stretch gap-4 border border-control-line bg-white/72 p-3 md:grid-cols-[116px_1fr]">
          <div className="grid min-h-[92px] place-items-center border border-control-line bg-white">
            <QrCode aria-hidden="true" className="text-control-warm" size={56} />
            <span className="sr-only">Consultation QR code</span>
          </div>
          <div className="grid content-center gap-2 text-sm leading-5 text-control-muted">
            <PlaceholderLine label="Scan to continue" value="Open the OnePWS consultation path" />
            <PlaceholderLine label="Proposal access" value="Customer-specific link shared after discussion" />
            <PlaceholderLine label="Appointment" value="Schedule with the OnePWS team" />
          </div>
        </div>
      </aside>
    </article>
  );
}

function SummaryBlock({ items, title }: { items: string[]; title: string }) {
  return (
    <section className="min-h-[82px] border-l border-control-line/80 bg-white/58 py-2.5 pl-3 pr-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-control-warm">{title}</p>
      <ul className="mt-1.5 space-y-1 text-xs leading-5 text-control-soft">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <span className="mt-[0.65rem] h-px w-4 shrink-0 bg-control-warm/70" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ActionButton({
  icon,
  label,
  note,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  note: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="group grid min-h-[3.35rem] w-full grid-cols-[50px_minmax(210px,0.92fr)_minmax(0,1fr)] items-center border border-control-line/70 bg-white/72 px-4 py-2 text-left text-control-soft backdrop-blur transition hover:border-control-warm/80 hover:bg-white"
      onClick={onClick}
      type="button"
    >
      <span className="grid h-8 w-8 place-items-center justify-self-center text-control-soft group-hover:text-control-warm">
        {icon}
      </span>
      <span className="min-w-0 text-base font-medium leading-5 text-control-text group-hover:text-control-warm">{label}</span>
      <span className="min-w-0 text-sm leading-5 text-control-muted">{note}</span>
    </button>
  );
}

function PlaceholderLine({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="block text-[10px] uppercase tracking-[0.2em] text-control-warm">{label}</span>
      {value}
    </p>
  );
}

function ClosingBackdrop() {
  const asset = getAsset("ambient-control-room");

  return (
    <div className="absolute inset-0">
      {asset?.src ? (
        <img alt={asset.alt ?? "OnePWS control room"} className="absolute inset-0 h-full w-full object-cover opacity-26" src={asset.src} />
      ) : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_32%,rgba(207,31,43,0.08),transparent_32%)]" />
    </div>
  );
}
