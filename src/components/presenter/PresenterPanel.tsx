import {
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  EyeOff,
  ExternalLink,
  FileWarning,
  HardDriveDownload,
  Maximize2,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Presentation,
  RotateCcw,
  Search,
  SkipBack,
  SkipForward,
  Timer,
  Trash2,
  Undo2,
  UserRound,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getPathPresenterPoint } from "../../content/customerPaths";
import { getVoiceover } from "../../content/voiceovers";
import { useFullscreen } from "../../hooks/useFullscreen";
import { buildPresenterModel } from "../../presenter/presenterModel";
import { clearPwaCaches } from "../../pwa/registerServiceWorker";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";
import type { PresentationMode } from "../../data/contentTypes";
import { buildNavigationModel, destinationSearch } from "../../navigation/navigationModel";

const presenterModes: Array<{ mode: PresentationMode; label: string; icon: typeof Presentation }> = [
  { mode: "presenter", label: "Presenter", icon: Presentation },
  { mode: "selfGuided", label: "Self-guided", icon: UserRound },
  { mode: "autoPlay", label: "Auto-play", icon: MonitorPlay },
];

export function PresenterPanel() {
  const { dispatch, state } = usePresentation();
  const { isFullscreen, toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const model = useMemo(() => buildPresenterModel(state), [state]);
  const navigationModel = useMemo(() => buildNavigationModel(state), [state]);
  const [searchQuery, setSearchQuery] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [online, setOnline] = useState(navigator.onLine);
  const chapterVoiceover = getVoiceover("chapter", state.chapterId);
  const isBookmarked = state.bookmarks.includes(state.chapterId);
  const presenterPoint =
    getPathPresenterPoint(state.customerPath, state.chapterId) ?? model.currentChapter.presenterTalkingPoint;
  const voiceoverIsPlaying =
    voiceover.status === "playing" || voiceover.status === "loading" || voiceover.status === "missing";

  useEffect(() => {
    const interval = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleOnline() {
      setOnline(true);
    }

    function handleOffline() {
      setOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  function playOrPauseVoiceover() {
    if (voiceoverIsPlaying) {
      voiceover.pause();
      return;
    }

    if (voiceover.status === "paused") {
      voiceover.resume();
      return;
    }

    if (chapterVoiceover) {
      voiceover.play(chapterVoiceover);
    }
  }

  function resetPresentation() {
    if (window.confirm("Reset the presentation to the opening chapter?")) {
      voiceover.stop();
      setElapsedSeconds(0);
      dispatch({ type: "RESET_PRESENTATION" });
    }
  }

  function customerDisplayUrl() {
    const params = new URLSearchParams(window.location.search);
    params.set("view", "customer-display");
    return `${window.location.origin}${window.location.pathname}?${params.toString()}#${state.chapterId}`;
  }

  function openCustomerDisplay() {
    window.open(customerDisplayUrl(), "onepws-customer-display", "popup,width=1440,height=900");
  }

  async function copyCustomerDisplayLink() {
    await navigator.clipboard.writeText(customerDisplayUrl());
  }

  async function clearCacheAndReload() {
    if (window.confirm("Clear offline cache and reload the presentation?")) {
      await clearPwaCaches();
      window.location.reload();
    }
  }

  return (
    <aside className="relative z-[70] flex h-dvh min-w-0 flex-col border-l border-control-line/80 bg-control-deep/96 text-control-text shadow-control backdrop-blur-xl">
      <header className="border-b border-control-line p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-control-warm">Private Presenter Console</p>
            <h2 className="mt-2 text-xl font-semibold">Presenter console</h2>
          </div>
          <div className="quiet-action min-h-10 shrink-0 px-3 py-2 text-sm">
            <Timer aria-hidden="true" size={15} />
            {formatTime(elapsedSeconds)}
          </div>
        </div>
        <p className="mt-3 text-xs leading-5 text-control-muted">
          Guide the customer-facing experience with live controls, scene preview, narration tools and journey
          navigation. Keep this console on the presenter device or private screen.
        </p>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <PanelSection title="Presentation mode">
          <div className="grid grid-cols-3 gap-2">
            {presenterModes.map(({ icon: Icon, label, mode }) => {
              const isActive = state.mode === mode;
              return (
                <button
                  aria-pressed={isActive}
                  className={`quiet-action min-h-11 px-2 py-2 text-xs ${
                    isActive
                      ? "!border-control-warm !bg-control-warm !text-control-black"
                      : ""
                  }`}
                  key={mode}
                  onClick={() => dispatch({ type: "SET_MODE", mode })}
                  type="button"
                >
                  <Icon aria-hidden="true" size={15} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </PanelSection>

        <PanelSection title="Display sync">
          <div className="architectural-panel p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-control-warm">
              Two-window presenter system
            </p>
            <p className="mt-2 text-xs leading-5 text-control-muted">
              Open the customer display in a separate browser window and move it to the external screen. This
              console will keep it synced to the current scene and journey state.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button className="quiet-action min-h-10 px-3 py-2 text-sm" onClick={openCustomerDisplay} type="button">
                <ExternalLink aria-hidden="true" size={16} />
                Open display
              </button>
              <button className="quiet-action min-h-10 px-3 py-2 text-sm" onClick={() => void copyCustomerDisplayLink()} type="button">
                <Copy aria-hidden="true" size={16} />
                Copy link
              </button>
            </div>
          </div>
        </PanelSection>

        <PanelSection title="Current customer-facing screen">
          <div className="architectural-panel p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-control-muted">
              {String(model.currentChapter.order).padStart(2, "0")} / {model.currentChapter.eyebrow}
            </p>
            <p className="mt-3 text-lg font-medium leading-6">{model.currentChapter.title}</p>
            <p className="mt-2 text-sm leading-6 text-control-muted">{model.currentChapter.supportingMessage}</p>
          </div>
        </PanelSection>

        <PanelSection title="Next chapter preview">
          <button
            className="quiet-action w-full justify-start p-4 text-left"
            onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: model.nextChapter.id })}
            type="button"
          >
            <p className="text-xs uppercase tracking-[0.24em] text-control-muted">
              {String(model.nextChapter.order).padStart(2, "0")} / Next
            </p>
            <p className="mt-2 text-sm font-medium text-control-soft">{model.nextChapter.title}</p>
          </button>
        </PanelSection>

        <PanelSection title="Navigation intelligence">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <StatusTile label="Journey" value={navigationModel.journey.name} />
            <StatusTile label="Position" value={`${navigationModel.routePosition + 1} of ${navigationModel.route.length}`} />
            <StatusTile label="Remaining" value={`${Math.round(navigationModel.remainingDurationMs / 60_000)} min`} />
            <StatusTile label="Branch" value={state.branchStack.at(-1)?.branchId ?? "Main journey"} />
          </div>
          {state.branchStack.length > 0 ? (
            <button className="quiet-action mt-3 min-h-10 px-3 py-2 text-sm" onClick={() => dispatch({ type: "RETURN_TO_JOURNEY" })} type="button">
              <Undo2 aria-hidden="true" size={16} />
              Return to main journey
            </button>
          ) : null}
        </PanelSection>

        <PanelSection title="Presenter search">
          <label className="grid grid-cols-[1rem_1fr] items-center gap-2 border border-control-line bg-control-black/24 px-3 py-2">
            <Search aria-hidden="true" className="text-control-muted" size={15} />
            <input
              className="min-w-0 bg-transparent text-sm text-control-text outline-none placeholder:text-control-muted"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title, keyword, outcome"
              type="search"
              value={searchQuery}
            />
          </label>
          <div className="mt-3 grid max-h-48 gap-2 overflow-y-auto pr-1">
            {destinationSearch(searchQuery, state).map((destination) => (
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 border border-control-line bg-control-black/18 p-2" key={destination.id}>
                <button
                  className="min-w-0 text-left text-xs"
                  onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: destination.chapterId })}
                  type="button"
                >
                  <span className="block truncate font-semibold text-control-text">{destination.title}</span>
                  <span className="mt-1 block text-control-muted">
                    {destination.completionState} · {Math.round(destination.duration / 60_000)} min · {destination.sceneType ?? "legacy"}
                  </span>
                </button>
                <button
                  aria-label={`Add ${destination.title} as next temporary route destination`}
                  className="control-button !h-9 !w-9"
                  onClick={() => dispatch({ type: "ADD_TEMPORARY_ROUTE_CHAPTER", chapterId: destination.chapterId })}
                  type="button"
                >
                  <Check aria-hidden="true" size={15} />
                </button>
              </div>
            ))}
            {searchQuery && destinationSearch(searchQuery, state).length === 0 ? (
              <p className="text-sm text-control-muted">No matching destination.</p>
            ) : null}
          </div>
        </PanelSection>

        <PanelSection title="Temporary presenter route">
          <div className="grid gap-2">
            {state.temporaryRouteChapterIds.length > 0 ? (
              state.temporaryRouteChapterIds.map((chapterId, index) => {
                const chapter = model.chapterSequence.find((item) => item.id === chapterId) ?? model.currentChapter;
                return (
                  <div className="grid grid-cols-[1fr_auto] items-center gap-2 border border-control-line bg-control-black/18 p-2" key={chapterId}>
                    <span className="min-w-0 text-xs">
                      <span className="block truncate font-semibold">{index + 1}. {chapter.title}</span>
                      <span className="text-control-muted">{Math.round(chapter.durationMs / 60_000)} min</span>
                    </span>
                    <button
                      aria-label={`Remove ${chapter.title} from temporary route`}
                      className="control-button !h-9 !w-9"
                      onClick={() => dispatch({ type: "REMOVE_TEMPORARY_ROUTE_CHAPTER", chapterId })}
                      type="button"
                    >
                      <Trash2 aria-hidden="true" size={14} />
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-control-muted">Search destinations and add them here during the meeting.</p>
            )}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className="quiet-action min-h-10 px-3 py-2 text-sm"
              disabled={state.temporaryRouteChapterIds.length === 0}
              onClick={() => dispatch({ type: "START_TEMPORARY_ROUTE" })}
              type="button"
            >
              Start route
            </button>
            <button className="quiet-action min-h-10 px-3 py-2 text-sm" onClick={() => dispatch({ type: "RESET_TEMPORARY_ROUTE" })} type="button">
              Reset route
            </button>
          </div>
        </PanelSection>

        <PanelSection title="Meeting controls">
          <div className="grid grid-cols-2 gap-2">
            <button className="quiet-action min-h-10 px-3 py-2 text-sm" onClick={() => void toggleFullscreen()} type="button">
              <Maximize2 aria-hidden="true" size={16} />
              {isFullscreen ? "Exit full screen" : "Full screen"}
            </button>
            <button
              className={`quiet-action min-h-10 px-3 py-2 text-sm ${
                state.blankScreenActive ? "!border-control-warm !bg-control-warm !text-control-black" : ""
              }`}
              onClick={() => dispatch({ type: "SET_BLANK_SCREEN", active: !state.blankScreenActive })}
              type="button"
            >
              <EyeOff aria-hidden="true" size={16} />
              Blank screen
            </button>
            <button className="quiet-action min-h-10 px-3 py-2 text-sm" onClick={resetPresentation} type="button">
              <FileWarning aria-hidden="true" size={16} />
              Restart
            </button>
            <button
              className="quiet-action min-h-10 px-3 py-2 text-sm"
              onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
              type="button"
            >
              <Presentation aria-hidden="true" size={16} />
              Chapter menu
            </button>
            <button
              className="quiet-action min-h-10 px-3 py-2 text-sm"
              onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "next-steps-closing" })}
              type="button"
            >
              <SkipForward aria-hidden="true" size={16} />
              Closing
            </button>
          </div>
        </PanelSection>

        <PanelSection title="Presenter notes">
          <p className="border-l border-control-warm/45 pl-4 text-sm leading-6 text-control-soft">
            {presenterPoint}
          </p>
        </PanelSection>

        <PanelSection title="Chapter navigation">
          <div className="grid grid-cols-3 gap-2">
            <button className="control-button !w-full" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} type="button">
              <SkipBack aria-hidden="true" size={17} />
            </button>
            <button
              className="control-button !w-full"
              onClick={() => dispatch({ type: "SET_PLAYING", isPlaying: !state.isPlaying })}
              type="button"
            >
              {state.isPlaying ? <Pause aria-hidden="true" size={17} /> : <Play aria-hidden="true" size={17} />}
            </button>
            <button className="control-button !w-full" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} type="button">
              <SkipForward aria-hidden="true" size={17} />
            </button>
          </div>
          <div className="mt-3 grid max-h-44 gap-2 overflow-y-auto pr-1">
            {model.chapterSequence.map((chapter) => (
              <button
                className={`quiet-action min-h-9 justify-start px-3 py-2 text-left text-xs ${
                  chapter.id === state.chapterId
                    ? "!border-control-warm !text-control-warm"
                    : "!text-control-muted"
                }`}
                key={chapter.id}
                onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: chapter.id })}
                type="button"
              >
                {String(chapter.order).padStart(2, "0")} / {chapter.title}
              </button>
            ))}
          </div>
        </PanelSection>

        <PanelSection title="Voiceover controls">
          <div className="flex flex-wrap gap-2">
            <button className="control-button" disabled={!chapterVoiceover} onClick={playOrPauseVoiceover} type="button">
              {voiceoverIsPlaying ? <Pause aria-hidden="true" size={17} /> : <Mic2 aria-hidden="true" size={17} />}
            </button>
            <button className="control-button" disabled={!voiceover.active && !chapterVoiceover} onClick={voiceover.replay} type="button">
              <RotateCcw aria-hidden="true" size={17} />
            </button>
            <button className="control-button" onClick={voiceover.toggleMute} type="button">
              {voiceover.muted ? <VolumeX aria-hidden="true" size={17} /> : <Volume2 aria-hidden="true" size={17} />}
            </button>
            <button className="control-button" onClick={() => dispatch({ type: "TOGGLE_NARRATION" })} type="button">
              <Volume1 aria-hidden="true" size={17} />
            </button>
          </div>
          <div className="mt-3 h-1 bg-control-line">
            <div className="h-1 bg-control-warm" style={{ width: `${voiceover.progress * 100}%` }} />
          </div>
          <label className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-control-muted">
            Level
            <input
              aria-label="Presenter voiceover volume"
              className="w-full accent-control-warm"
              max="1"
              min="0"
              onChange={(event) => voiceover.setVolume(Number(event.target.value))}
              step="0.05"
              type="range"
              value={voiceover.volume}
            />
          </label>
        </PanelSection>

        <PanelSection title="Audio and media status">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <StatusTile label="Audio unlock" value={state.audioUnlocked ? "Ready" : "Awaiting interaction"} />
            <StatusTile label="Narration" value={state.narrationEnabled ? "Enabled" : "Disabled"} />
            <StatusTile label="Voiceover" value={chapterVoiceover ? chapterVoiceover.plannedFile : "No chapter track"} />
            <StatusTile label="Playback" value={voiceover.status} />
            <StatusTile label="Network" value={online ? "Online" : "Offline"} />
            <StatusTile label="Media" value={mediaStatus(model.currentChapter.media)} />
          </div>
        </PanelSection>

        <PanelSection title="Auto-play controls">
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`quiet-action min-h-10 px-3 py-2 text-sm ${
                state.isPlaying ? "!border-control-warm !bg-control-warm !text-control-black" : ""
              }`}
              onClick={() => dispatch({ type: "SET_PLAYING", isPlaying: true })}
              type="button"
            >
              Run sequence
            </button>
            <button
              className="quiet-action min-h-10 px-3 py-2 text-sm"
              onClick={() => dispatch({ type: "SET_PLAYING", isPlaying: false })}
              type="button"
            >
              Hold position
            </button>
          </div>
        </PanelSection>

        <PanelSection title="Bookmarks">
          <button
            className="quiet-action min-h-10 px-3 py-2 text-sm"
            onClick={() => dispatch({ type: "TOGGLE_BOOKMARK", chapterId: state.chapterId })}
            type="button"
          >
            {isBookmarked ? <BookmarkCheck aria-hidden="true" size={16} /> : <Bookmark aria-hidden="true" size={16} />}
            {isBookmarked ? "Remove save" : "Save this chapter"}
          </button>
          <div className="mt-3 flex flex-wrap gap-2">
            {model.bookmarkChapters.length > 0 ? (
              model.bookmarkChapters.map((chapter) => (
                <button
                  className="quiet-action min-h-9 px-3 py-2 text-xs !text-control-muted"
                  key={chapter.id}
                  onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: chapter.id })}
                  type="button"
                >
                  {chapter.title}
                </button>
              ))
            ) : (
              <p className="text-sm text-control-muted">No bookmarks yet.</p>
            )}
          </div>
        </PanelSection>

        <PanelSection title="Quick feature access">
          <div className="grid max-h-36 grid-cols-2 gap-2 overflow-y-auto pr-1">
            {model.quickFeatures.slice(0, 10).map((feature) => (
              <button
                className="quiet-action min-h-9 justify-start px-3 py-2 text-left text-xs !text-control-muted"
                key={feature.id}
                onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "complete-ecosystem" })}
                type="button"
              >
                {feature.title}
              </button>
            ))}
          </div>
        </PanelSection>

        <PanelSection title="Quick project access">
          <div className="grid max-h-36 gap-2 overflow-y-auto pr-1">
            {model.quickProjects.slice(0, 10).map((project) => (
              <button
                className="quiet-action min-h-9 justify-start px-3 py-2 text-left text-xs !text-control-muted"
                key={project.id}
                onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "project-portfolio" })}
                type="button"
              >
                {project.name}
              </button>
            ))}
          </div>
        </PanelSection>

        <PanelSection title="Quick certification access">
          <div className="grid grid-cols-2 gap-2">
            {model.quickCertifications.map((certification) => (
              <button
                className="quiet-action min-h-9 justify-start px-3 py-2 text-left text-xs !text-control-muted"
                key={certification.title}
                onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "company-at-a-glance" })}
                type="button"
              >
                {certification.title}
              </button>
            ))}
          </div>
        </PanelSection>

        <PanelSection title="Quick technical detail">
          <div className="flex flex-wrap gap-2">
            {model.technicalLayers.map((layer) => (
              <button
                className="quiet-action min-h-9 px-3 py-2 text-xs !text-control-muted"
                key={layer}
                onClick={() =>
                  dispatch({
                    type: "SET_OVERLAY",
                    overlay: { type: "technical", chapterId: state.chapterId, layer },
                  })
                }
                type="button"
              >
                {layer}
              </button>
            ))}
          </div>
        </PanelSection>
      </div>

      <footer className="grid grid-cols-2 gap-2 border-t border-control-line p-4">
        <button
          className="quiet-action min-h-11 px-3 py-2 text-sm"
          onClick={resetPresentation}
          type="button"
        >
          <FileWarning aria-hidden="true" size={16} />
          Reset
        </button>
        <button
          className="quiet-action min-h-11 px-3 py-2 text-sm"
          onClick={() => void clearCacheAndReload()}
          type="button"
        >
          <HardDriveDownload aria-hidden="true" size={16} />
          Clear cache
        </button>
      </footer>
    </aside>
  );
}

function StatusTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 border border-control-line bg-control-black/24 p-3">
      <p className="text-[10px] uppercase tracking-[0.2em] text-control-muted">{label}</p>
      <p className="mt-2 truncate text-control-soft" title={value}>
        {value}
      </p>
    </div>
  );
}

function PanelSection({ children, title }: { children: ReactNode; title: string }) {
  return (
    <section>
      <p className="mb-3 text-xs uppercase tracking-[0.28em] text-control-warm">{title}</p>
      {children}
    </section>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function mediaStatus(media?: { backgroundVideoAssetId?: string; fallbackImageAssetId?: string; narrationAssetId?: string }) {
  if (!media) {
    return "No media linked";
  }

  const ids = [media.backgroundVideoAssetId, media.fallbackImageAssetId, media.narrationAssetId].filter(Boolean);
  return ids.length > 0 ? `${ids.length} linked asset${ids.length > 1 ? "s" : ""}` : "No media linked";
}
