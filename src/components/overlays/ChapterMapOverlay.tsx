import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Clock, CornerUpLeft, MapPinned, Route, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PresentationViewport } from "../PresentationViewport";
import { CustomerPathSelector } from "./CustomerPathSelector";
import { SceneRenderer } from "../../experience/SceneRenderer";
import { buildNavigationModel, chapterForDestination, destinationSearch, formatRemaining, type NavigationDestination } from "../../navigation/navigationModel";
import { usePresentation } from "../../state/PresentationProvider";

type MapLevel = "ecosystem" | "zone" | "destination";

export function ChapterMapOverlay() {
  const { dispatch, state } = usePresentation();
  const overlay = state.activeOverlay;
  const isOpen = overlay?.type === "chapterMap" || overlay?.type === "technical" || overlay?.type === "customerPath";

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 grid place-items-center bg-[var(--pws-graphite-950)]/88 p-5 text-[var(--pws-warm-white)] backdrop-blur-md"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: state.reducedMotion ? 0.01 : 0.22 }}
        >
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[min(54rem,92dvh)] w-[min(96rem,94dvw)] overflow-hidden border border-white/12 bg-[linear-gradient(135deg,#050607,#11151a)] shadow-control"
            exit={{ opacity: 0, y: state.reducedMotion ? 0 : 12 }}
            initial={{ opacity: 0, y: state.reducedMotion ? 0 : 18 }}
          >
            <button
              aria-label="Close experience map"
              className="absolute right-5 top-5 z-20 control-button"
              onClick={() => dispatch({ type: "SET_OVERLAY", overlay: null })}
              type="button"
            >
              <X aria-hidden="true" size={18} />
            </button>
            <div className="h-full overflow-hidden p-6 pr-16 [@media(max-width:1023px)]:p-5 [@media(max-width:1023px)]:pr-16">
              {overlay?.type === "technical" ? (
                <TechnicalLayer layer={overlay.layer} />
              ) : overlay?.type === "customerPath" ? (
                <CustomerPathSelector />
              ) : (
                <ExperienceMap />
              )}
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function ExperienceMap() {
  const { dispatch, state } = usePresentation();
  const model = useMemo(() => buildNavigationModel(state), [state]);
  const [level, setLevel] = useState<MapLevel>("ecosystem");
  const [activeGroupId, setActiveGroupId] = useState(model.currentDestination.mapGroup);
  const [activeChapterId, setActiveChapterId] = useState(model.currentDestination.chapterId);
  const [search, setSearch] = useState("");
  const activeGroup = model.mapGroups.find((group) => group.id === activeGroupId) ?? model.mapGroups[0];
  const activeChapter = chapterForDestination(activeChapterId);
  const searchResults = destinationSearch(search, state);
  const sidebarDestinations: NavigationDestination[] = search
    ? searchResults
    : model.recommendations
        .map((item) => model.destinations.find((destination) => destination.chapterId === item.chapterId))
        .filter((destination): destination is NavigationDestination => Boolean(destination));

  function previewGroup(groupId: string) {
    const group = model.mapGroups.find((item) => item.id === groupId);
    if (!group) {
      return;
    }

    setActiveGroupId(group.id);
    if (!group.chapterIds.includes(activeChapterId)) {
      setActiveChapterId(group.chapterIds[0]);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6 [@media(max-width:1023px)]:grid-cols-1">
        <div className="min-w-0">
          <p className="pws-technical-label">Experience map</p>
          <h2 className="mt-3 max-w-4xl text-[clamp(2.1rem,3.2vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.02em]">
            Navigate the OnePWS control-room ecosystem.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/62">
            Current route: {model.journey.name}. Explored areas, memory moments and optional branches stay connected to the main journey.
          </p>
        </div>
        <div className="mr-14 flex shrink-0 flex-wrap justify-end gap-2 [@media(max-width:1023px)]:mr-0 [@media(max-width:1023px)]:justify-start">
          {level !== "ecosystem" ? (
            <button className="quiet-action px-4" onClick={() => setLevel(level === "destination" ? "zone" : "ecosystem")} type="button">
              <ArrowLeft aria-hidden="true" size={16} />
              Back
            </button>
          ) : null}
          {state.branchStack.length > 0 ? (
            <button className="quiet-action px-4" onClick={() => dispatch({ type: "RETURN_TO_JOURNEY" })} type="button">
              <CornerUpLeft aria-hidden="true" size={16} />
              Return to journey
            </button>
          ) : null}
          <button className="quiet-action px-4" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "customerPath" } })} type="button">
            <Route aria-hidden="true" size={16} />
            Change journey
          </button>
        </div>
      </header>

      <div className="mt-5 grid min-h-0 flex-1 grid-cols-[minmax(0,1.35fr)_minmax(19rem,0.65fr)] gap-5 overflow-hidden [@media(max-width:1023px)]:grid-cols-1">
        <div className="relative overflow-hidden border border-white/12 bg-black/28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgb(207_31_43/0.12),transparent_28%),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[length:auto,84px_84px,84px_84px]" />
          {level === "ecosystem" ? (
            <div className="absolute inset-5 grid auto-rows-fr grid-cols-3 gap-3 [@media(max-width:1279px)]:grid-cols-2 [@media(max-width:639px)]:grid-cols-1">
              {model.mapGroups.map((group) => (
                <button
                  aria-label={`Open ${group.title}`}
                  className={`pws-map-node pws-map-node-flow ${group.id === activeGroupId ? "pws-map-node-active" : ""}`}
                  key={group.id}
                  onClick={() => {
                    previewGroup(group.id);
                    setLevel("zone");
                  }}
                  onFocus={() => previewGroup(group.id)}
                  onMouseEnter={() => previewGroup(group.id)}
                  type="button"
                >
                  <span className="block text-[11px] uppercase tracking-[0.2em] text-control-warm">{group.theme}</span>
                  <span className="mt-2 block text-base font-semibold leading-tight">{group.title}</span>
                  <span className="mt-2 block text-xs leading-5 text-white/62">{group.chapterIds.length} scenes</span>
                </button>
              ))}
            </div>
          ) : null}

          {level === "zone" ? (
            <div className="absolute inset-5 overflow-hidden">
              <div className="mb-3 flex items-end justify-between gap-4 border-b border-white/12 pb-3">
                <div>
                  <p className="pws-technical-label">{activeGroup.theme}</p>
                  <h3 className="mt-1 text-xl font-semibold leading-tight">{activeGroup.title}</h3>
                </div>
                <p className="shrink-0 text-xs text-white/54">{activeGroup.chapterIds.length} scenes</p>
              </div>
              <div className="grid max-h-[calc(100%-4.8rem)] content-start gap-2 overflow-y-auto pr-2">
                {activeGroup.chapterIds.map((chapterId, index) => {
                  const chapter = chapterForDestination(chapterId);
                  const destination = model.destinations.find((item) => item.chapterId === chapterId);
                  return (
                    <button
                      className={`grid min-h-[4.7rem] grid-cols-[2.6rem_minmax(0,1fr)_auto] items-center gap-3 border bg-black/46 px-4 py-3 text-left transition ${
                        chapterId === activeChapterId ? "border-control-warm" : "border-white/12 hover:border-control-warm/70"
                      }`}
                      key={chapterId}
                      onClick={() => {
                        setActiveChapterId(chapterId);
                        setLevel("destination");
                      }}
                      onFocus={() => setActiveChapterId(chapterId)}
                      onMouseEnter={() => setActiveChapterId(chapterId)}
                      type="button"
                    >
                      <span className="text-lg font-semibold text-control-warm">{String(index + 1).padStart(2, "0")}</span>
                      <span className="min-w-0">
                        <span className="block truncate text-base font-semibold">{chapter.title}</span>
                        <span className="mt-1 block text-xs text-white/58">{destination?.completionState ?? "available"}</span>
                      </span>
                      <ChevronRight aria-hidden="true" size={17} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {level === "destination" ? (
            <div className="absolute inset-10 grid grid-cols-[1fr_0.7fr] gap-8 [@media(max-width:1023px)]:grid-cols-1">
              <section className="grid content-center">
                <p className="pws-technical-label">{activeChapter.eyebrow}</p>
                <h3 className="mt-5 max-w-3xl text-5xl font-semibold leading-none">{activeChapter.title}</h3>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-white/66">{activeChapter.supportingMessage}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    className="premium-action px-5"
                    onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: activeChapter.id })}
                    type="button"
                  >
                    Open scene
                    <ChevronRight aria-hidden="true" size={17} />
                  </button>
                  <button
                    className="quiet-action px-5"
                    onClick={() => dispatch({ type: "ADD_TEMPORARY_ROUTE_CHAPTER", chapterId: activeChapter.id })}
                    type="button"
                  >
                    Add to presenter route
                  </button>
                </div>
              </section>
              <aside className="pws-glass-surface p-5">
                <p className="pws-technical-label">Scene preview</p>
                <div className="mt-5 grid gap-3 text-sm text-white/68">
                  <p><Clock aria-hidden="true" className="mr-2 inline" size={15} />{Math.round(activeChapter.durationMs / 60_000)} min</p>
                  <p><MapPinned aria-hidden="true" className="mr-2 inline" size={15} />{activeGroup.title}</p>
                  <p>Scene type: {activeChapter.sceneType ?? "legacy"}</p>
                  <p>Purpose: {activeChapter.chapterPurpose ?? "presentation"}</p>
                </div>
              </aside>
            </div>
          ) : null}
        </div>

        <aside className="flex min-h-0 flex-col overflow-hidden border-l border-control-warm/50 pl-5 [@media(max-width:1023px)]:border-l-0 [@media(max-width:1023px)]:border-t [@media(max-width:1023px)]:pl-0 [@media(max-width:1023px)]:pt-4">
          <label className="grid gap-2 text-xs uppercase tracking-[0.18em] text-white/54">
            Presenter search
            <span className="grid grid-cols-[1rem_1fr] items-center gap-2 border border-white/12 bg-black/30 px-3 py-2">
              <Search aria-hidden="true" size={15} />
              <input
                className="min-w-0 bg-transparent text-sm normal-case tracking-normal text-white outline-none placeholder:text-white/38"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title, outcome, keyword"
                type="search"
                value={search}
              />
            </span>
          </label>
          <div className="mt-4 grid max-h-[12rem] gap-2 overflow-y-auto pr-1">
            {sidebarDestinations.map((destination) => (
              <button
                className="quiet-action min-h-10 justify-start px-3 py-2 text-left text-xs"
                key={destination.id}
                onClick={() => {
                  setActiveChapterId(destination.chapterId);
                  setLevel("destination");
                }}
                onFocus={() => setActiveChapterId(destination.chapterId)}
                onMouseEnter={() => setActiveChapterId(destination.chapterId)}
                type="button"
              >
                {destination.shortTitle}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <p className="pws-technical-label">Current zone</p>
            <h3 className="mt-3 text-xl font-semibold leading-tight">{activeGroup.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/62">{activeGroup.description}</p>
          </div>
          {/* <div className="mt-6">
            <p className="pws-technical-label">Route state</p>
            <p className="mt-3 text-sm text-white/62">{model.routePosition + 1} of {model.route.length} · {formatRemaining(model.remainingDurationMs)}</p>
          </div> */}
          <SlidePreview chapter={activeChapter} />
        </aside>
      </div>
    </div>
  );
}

function SlidePreview({ chapter }: { chapter: ReturnType<typeof chapterForDestination> }) {
  return (
    <section aria-live="polite" className="mt-5 flex min-h-0 flex-1 flex-col">
      <div className="mb-2 flex items-end justify-between gap-3">
        <p className="pws-technical-label">Slide preview</p>
        <p className="max-w-[68%] truncate text-right text-xs text-white/54">{chapter.title}</p>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden  ">
        <div className="pointer-events-none absolute inset-0 select-none">
          <PresentationViewport presenterPreview>
            <SceneRenderer chapter={chapter} presenterPreview />
          </PresentationViewport>
        </div>
      </div>
    </section>
  );
}

function TechnicalLayer({ layer }: { layer: string }) {
  return (
    <div className="grid h-full grid-cols-[1fr_0.72fr] gap-10">
      <section>
        <p className="pws-technical-label">Technical detail layer</p>
        <h2 className="mt-5 max-w-3xl text-6xl font-semibold leading-none">{layer}</h2>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-white/70">
          Engineering diagrams, technical notes and source references open here without interrupting the customer journey.
        </p>
      </section>
      <aside className="border-l border-control-warm/50 pl-8 text-sm leading-7 text-white/58">
        <p className="pws-technical-label">Content rule</p>
        <p className="mt-4">
          Detailed specifications are kept in technical layers and reviewed with the OnePWS team when the customer moves into project definition.
        </p>
      </aside>
    </div>
  );
}
