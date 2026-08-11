import { AnimatePresence, motion } from "framer-motion";
import {
  Armchair,
  Building2,
  ChevronRight,
  Factory,
  Grid2X2,
  ListTree,
  MonitorCog,
  Network,
  ShieldCheck,
  Target,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { enabledChapters } from "../../content/chapters";
import { usePresentation } from "../../state/PresentationProvider";
import { CustomerPathSelector } from "./CustomerPathSelector";

export function ChapterMapOverlay() {
  const { dispatch, state } = usePresentation();
  const overlay = state.activeOverlay;
  const isOpen = overlay?.type === "chapterMap" || overlay?.type === "technical" || overlay?.type === "customerPath";

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 grid place-items-center bg-control-black/86 p-5 text-control-text backdrop-blur-md"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: state.reducedMotion ? 0.01 : 0.22 }}
        >
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[min(47rem,86dvh)] w-[min(78rem,90dvw)] overflow-hidden border border-control-line bg-control-deep shadow-control"
            exit={{ opacity: 0, y: state.reducedMotion ? 0 : 12 }}
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
          >
            <button
              aria-label="Close overlay"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-control-line bg-control-black/70 text-control-muted transition hover:border-control-warm hover:text-control-text"
              onClick={() => dispatch({ type: "SET_OVERLAY", overlay: null })}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <div className="h-full overflow-hidden p-8 pr-20">
              {overlay?.type === "technical" ? (
                <TechnicalLayer chapterId={overlay.chapterId} layer={overlay.layer} />
              ) : overlay?.type === "customerPath" ? (
                <CustomerPathSelector />
              ) : (
                <ChapterMap />
              )}
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ChapterMap() {
  const { dispatch, state } = usePresentation();
  const [activeSectionId, setActiveSectionId] = useState<PrimaryNavigationSectionId>(
    primaryNavigationSections[0].id,
  );
  const [useAccessibleMenu, setUseAccessibleMenu] = useState(false);
  const activeSection = useMemo(
    () => primaryNavigationSections.find((section) => section.id === activeSectionId) ?? primaryNavigationSections[0],
    [activeSectionId],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.44em] text-control-warm">Main navigation</p>
          <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-none">
            Select a control-room zone.
          </h2>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            className="quiet-action px-4"
            onClick={() => setUseAccessibleMenu((current) => !current)}
            type="button"
          >
            {useAccessibleMenu ? <Grid2X2 aria-hidden="true" size={17} /> : <ListTree aria-hidden="true" size={17} />}
            {useAccessibleMenu ? "Visual Zones" : "Accessible Menu"}
          </button>
          <button
            className="quiet-action px-4"
            onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "opening-cover" })}
            type="button"
          >
            Main Journey
          </button>
        </div>
      </div>

      {useAccessibleMenu ? (
        <AccessibleSectionMenu />
      ) : (
        <div className="mt-7 grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_22rem] gap-6 overflow-hidden">
          <div className="relative overflow-hidden border border-control-line bg-control-black/35">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_42%,rgba(207,31,43,0.12),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_32%)]" />
            <div className="absolute inset-8 grid grid-cols-4 grid-rows-3 gap-3 opacity-60">
              {Array.from({ length: 12 }).map((_, index) => (
                <div className="border border-control-line/70 bg-control-panel/20" key={index}>
                  <div className="mx-4 mt-4 h-px bg-control-warm/35" />
                  <div className="mx-4 mt-3 h-px w-2/3 bg-control-line" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-[18%] left-[18%] right-[12%] h-[18%] border border-control-line/80 bg-control-black/45" />
            <div className="absolute bottom-[9%] left-[10%] right-[10%] h-px bg-control-warm/45" />

            {primaryNavigationSections.map((section, index) => {
              const Icon = section.icon;
              const isActive = section.id === activeSection.id;
              const isCurrent = section.chapterId === state.chapterId;
              const hasVisited = state.visitedChapterIds.includes(section.chapterId);

              return (
                <button
                  aria-describedby="section-purpose"
                  className={`group absolute grid min-h-16 w-[min(17rem,24%)] grid-cols-[2.6rem_1fr] items-center gap-3 border bg-control-black/60 px-3 py-3 text-left backdrop-blur transition ${
                    isActive || isCurrent
                      ? "z-20 border-control-warm text-control-text"
                      : "z-10 border-control-line text-control-soft hover:border-control-warm/70 hover:text-control-text"
                  }`}
                  key={section.id}
                  onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: section.chapterId })}
                  onFocus={() => setActiveSectionId(section.id)}
                  onMouseEnter={() => setActiveSectionId(section.id)}
                  style={{ left: section.position.left, top: section.position.top }}
                  type="button"
                >
                  <span className="relative grid h-10 w-10 place-items-center border border-control-line bg-control-panel/65">
                    <Icon aria-hidden="true" size={18} />
                    {hasVisited ? (
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-control-warm/80" />
                    ) : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.65rem] uppercase tracking-[0.24em] text-control-muted">
                      {String(index + 1).padStart(2, "0")} Guided
                    </span>
                    <span className="mt-1 block truncate text-sm font-medium">{section.title}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <aside className="border-l border-control-warm/55 bg-control-black/28 p-5">
            <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Section purpose</p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight">{activeSection.title}</h3>
            <p id="section-purpose" className="mt-4 text-sm leading-6 text-control-soft">
              {activeSection.description}
            </p>
            <div className="mt-7 space-y-3 text-xs uppercase tracking-[0.22em] text-control-muted">
              <p>Recommended sequence</p>
              <div className="flex flex-wrap gap-2">
                {primaryNavigationSections.map((section, index) => (
                  <button
                    aria-label={`Preview ${section.title}`}
                    className={`h-8 min-w-8 border px-2 transition ${
                      section.id === activeSection.id
                        ? "border-control-warm bg-control-warm text-white"
                        : state.visitedChapterIds.includes(section.chapterId)
                          ? "border-control-warm/55 bg-control-warm/10 text-control-text"
                          : "border-control-line text-control-muted hover:border-control-warm"
                    }`}
                    key={section.id}
                    onClick={() => setActiveSectionId(section.id)}
                    type="button"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
            <button
              className="premium-action mt-8 w-full px-5"
              onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: activeSection.chapterId })}
              type="button"
            >
              Enter Section
              <ChevronRight aria-hidden="true" size={17} />
            </button>
            <button
              className="quiet-action mt-3 w-full px-5"
              onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "customerPath" } })}
              type="button"
            >
              Select Customer Path
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}

const primaryNavigationSections = [
  {
    id: "challenge",
    title: "The Control Room Challenge",
    description:
      "Start with operator pressure, information load and the operational risks of rooms that are not planned as decision environments.",
    chapterId: "operator-challenges",
    icon: Target,
    position: { left: "7%", top: "15%" },
  },
  {
    id: "human-centred",
    title: "Human-Centred Design",
    description:
      "Reveal the design philosophy: the room, console and environment are planned around the people making critical decisions.",
    chapterId: "human-centred-philosophy",
    icon: Users,
    position: { left: "34%", top: "12%" },
  },
  {
    id: "consoles",
    title: "Intelligent Consoles",
    description:
      "Enter the product story around console portfolios, workstation pairing and intelligent feature layers.",
    chapterId: "console-portfolio",
    icon: MonitorCog,
    position: { left: "63%", top: "16%" },
  },
  {
    id: "environment",
    title: "Integrated Environment",
    description:
      "Explore the complete control-room ecosystem, including architecture, video wall, lighting, acoustics and service access.",
    chapterId: "complete-ecosystem",
    icon: Network,
    position: { left: "18%", top: "43%" },
  },
  {
    id: "ergonomics",
    title: "Ergonomic Engineering",
    description:
      "Open the engineering path for ISO methodology, task analysis, sightlines, reach, posture and comfort.",
    chapterId: "ergonomic-methodology",
    icon: Armchair,
    position: { left: "49%", top: "45%" },
  },
  {
    id: "projects",
    title: "Project Credentials",
    description:
      "Move into selected project proof, galleries and case-study layers with concise sourced detail.",
    chapterId: "project-portfolio",
    icon: Building2,
    position: { left: "6%", top: "70%" },
  },
  {
    id: "manufacturing",
    title: "Manufacturing and Compliance",
    description:
      "Review manufacturing capability, quality systems and international certification proof at the appropriate depth.",
    chapterId: "manufacturing-quality",
    icon: Factory,
    position: { left: "38%", top: "71%" },
  },
  {
    id: "why-onepws",
    title: "Why OnePWS",
    description:
      "Close the decision case around integrated solutions, ergonomic engineering, manufacturing, compliance, project proof and lifecycle support.",
    chapterId: "why-onepws",
    icon: ShieldCheck,
    position: { left: "67%", top: "70%" },
  },
] as const;

type PrimaryNavigationSectionId = (typeof primaryNavigationSections)[number]["id"];

function AccessibleSectionMenu() {
  const { dispatch, state } = usePresentation();

  return (
    <div className="mt-7 grid min-h-0 flex-1 grid-cols-2 gap-3 overflow-hidden">
      {primaryNavigationSections.map((section, index) => {
        const Icon = section.icon;
        const hasVisited = state.visitedChapterIds.includes(section.chapterId);
        return (
          <button
            className={`group grid grid-cols-[3.2rem_1fr_auto] items-center gap-4 border px-4 text-left transition ${
              section.chapterId === state.chapterId
                ? "border-control-warm bg-control-warm/10"
                : "border-control-line bg-control-black/30 hover:border-control-warm/70"
            }`}
            key={section.id}
            onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: section.chapterId })}
            type="button"
          >
            <span className="relative grid h-11 w-11 place-items-center border border-control-line text-sm text-control-muted">
              <Icon aria-hidden="true" size={18} />
              {hasVisited ? <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-control-warm/80" /> : null}
            </span>
            <span>
              <span className="block text-xs uppercase tracking-[0.28em] text-control-muted">
                {String(index + 1).padStart(2, "0")} Recommended
              </span>
              <span className="mt-2 block text-lg font-medium text-control-text">{section.title}</span>
              <span className="mt-1 block text-sm leading-5 text-control-muted">{section.description}</span>
            </span>
            <ChevronRight
              aria-hidden="true"
              className="text-control-muted transition group-hover:translate-x-1 group-hover:text-control-warm"
              size={17}
            />
          </button>
        );
      })}
    </div>
  );
}

function TechnicalLayer({ layer }: { chapterId: string; layer: string }) {
  return (
    <div className="grid h-full grid-cols-[1fr_0.72fr] gap-10">
      <section>
        <p className="text-xs uppercase tracking-[0.44em] text-control-warm">Technical detail layer</p>
        <h2 className="mt-5 max-w-3xl text-6xl font-semibold leading-none">{layer}</h2>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-control-soft">
          Engineering diagrams, technical notes and source references open here without interrupting
          the customer journey.
        </p>
      </section>
      <aside className="border-l border-control-warm/50 pl-8 text-sm leading-7 text-control-muted">
        <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Content rule</p>
        <p className="mt-4">
          Detailed specifications are kept in technical layers and reviewed with the OnePWS team
          when the customer moves into project definition.
        </p>
      </aside>
    </div>
  );
}
