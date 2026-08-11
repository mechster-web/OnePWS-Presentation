# Voiceover File Guide

This presentation uses a central voiceover system. Chapters, feature stories and hotspots all read narration metadata from `src/content/voiceovers.ts`.

No placeholder audio files are generated in the project. Current entries use `plannedFile` paths and fallback narration text, so the interface can be tested before final recordings are available.

## File Naming

Use short, lowercase, hyphenated filenames.

Chapter narration:

```text
public/assets/audio/en/chapters/01-world-never-stops.mp3
public/assets/audio/en/chapters/06-connected-environment.mp3
```

Feature narration:

```text
public/assets/audio/en/features/adaptive-sit-stand-console.mp3
public/assets/audio/en/features/operator-alertness-management-system.mp3
```

Hotspot narration:

```text
public/assets/audio/en/hotspots/operator-fatigue.mp3
public/assets/audio/en/hotspots/intelligent-video-wall.mp3
```

Incident simulation step narration:

```text
public/assets/audio/en/simulation/anomaly-detected.mp3
public/assets/audio/en/simulation/copilot-sop.mp3
```

Optional subtitle files should use the same base filename:

```text
public/assets/subtitles/en/chapters/01-world-never-stops.vtt
public/assets/subtitles/en/features/adaptive-sit-stand-console.vtt
public/assets/subtitles/en/hotspots/operator-fatigue.vtt
public/assets/subtitles/en/simulation/anomaly-detected.vtt
```

## Recommended Duration

Chapter voiceovers should usually run 45-85 seconds. They guide the cinematic storyline without turning each chapter into a lecture.

Feature voiceovers should run 20-35 seconds. They should explain operational value, user benefit and architectural integration at a high level.

Hotspot voiceovers should run 8-18 seconds. They should be direct, specific and easy to absorb while the visitor is looking at the selected area.

## Recommended Voice Style

Use a calm, premium, mission-critical voice. The tone should feel expert, measured and confident.

Avoid exaggerated promotional language, dramatic trailer delivery, fast corporate explainer pacing or technical jargon that is not visible on screen.

The voice should sound like a control-room specialist guiding a high-value customer through an operational environment.

## Recording Format

Use MP3 for the installed presentation build:

```text
MP3, 44.1 kHz or 48 kHz, 128-192 kbps, normalized loudness
```

Keep source masters as WAV when possible:

```text
WAV, 48 kHz, 24-bit
```

Recommended loudness target:

```text
-16 LUFS for stereo or -19 LUFS for mono, with no clipping
```

Leave a short natural pause at the beginning and end, but avoid long silence. The interface handles transitions; audio should feel responsive when selected.

## Folder Placement

Place final production audio inside `public/assets/audio`.

Recommended structure:

```text
public/
  assets/
    audio/
      en/
        chapters/
        features/
        hotspots/
        simulation/
    subtitles/
      en/
        chapters/
        features/
        hotspots/
        simulation/
```

Files in `public` are bundled as static offline assets and can be referenced with paths beginning `/assets/...`.

## How To Replace Audio

1. Add the final audio file to the correct folder under `public/assets/audio`.
2. Open `src/content/voiceovers.ts`.
3. Add a `src` value to the matching narration entry.
4. Keep `plannedFile` as the documented expected file path.
5. Update `durationMs` to match the final recording.
6. Add or update `subtitle` text if subtitles should appear in the interface.

Example:

```ts
{
  id: "feature-adaptive-console-en",
  scope: "feature",
  ownerId: "adaptive-console",
  language: "en",
  plannedFile: "/assets/audio/en/features/adaptive-console.mp3",
  src: "/assets/audio/en/features/adaptive-console.mp3",
  durationMs: 28000,
  subtitle: "A sit-stand operator console designed around comfort, focus and long-shift performance.",
  fallbackText: "..."
}
```

If `src` is missing or the file cannot be loaded, the system gracefully falls back to the approved text in `fallbackText` where browser speech support is available.

## How To Add Another Language

1. Create a new language folder using a standard language code, such as `hi`, `ar`, `fr` or `de`.
2. Mirror the English folder structure under `public/assets/audio/{language}`.
3. Add translated subtitle files under `public/assets/subtitles/{language}` if subtitles are required.
4. Add translated voiceover metadata entries in `src/content/voiceovers.ts`.
5. Use the same `scope` and `ownerId` values as the English entry.
6. Set `language` to the new language code.
7. Update `fallbackText`, `subtitle`, `src`, `plannedFile` and `durationMs`.

The presentation currently defaults to English. Future language selection can switch the active metadata lookup from `en` to the selected language without replacing the voiceover component.

## Playback Behaviour

Only one narration can play at a time. Starting any chapter, feature or hotspot voiceover smoothly stops the current narration.

Auto-Play Mode may start chapter narration automatically when narration is enabled.

Self-Guided Mode does not auto-play narration. Visitors must select the visible Listen control.

Presenter Mode allows narration to be enabled or disabled from the presentation controls. If narration is disabled, active narration stops.
