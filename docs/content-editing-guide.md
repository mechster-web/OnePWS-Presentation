# Content Editing Guide

This presentation is designed so approved content can be edited without changing React components.

Most editable content lives in:

```text
src/content/
```

Media files should live in:

```text
public/assets/
```

## Content Files

| Content type | File |
| --- | --- |
| Chapters, chapter order, headlines, supporting text, presenter notes | `src/content/chapters.ts` |
| Voiceover metadata | `src/content/voiceovers.ts` |
| Subtitle text and caption-file paths | `src/content/subtitles.ts` |
| Feature stories, benefits, product text, technical details | `src/content/featureStories.ts` |
| Connected-room hotspot labels and technical detail | `src/content/connectedIntelligenceFeatures.ts` |
| Conventional-room challenge hotspots | `src/content/controlRoomChallenges.ts` |
| Projects and reference details | `src/content/projects.ts` |
| Company proof points, partnerships, awards, customer logos | `src/content/credentials.ts` |
| Industry and role mappings | `src/content/customerPaths.ts` |
| Concept selector options and recommendation logic | `src/content/conceptSelector.ts` |
| Auto-play timing | `src/content/autoplayTimings.ts` |
| Images, video, audio and logo asset references | `src/content/assets.ts` |

## Change Text

For chapter text, edit `src/content/chapters.ts`.

Common fields:

```ts
title: "Project Experience",
headline: "Explore the environments already referenced.",
supportingMessage: "Filter control-room references by industry...",
presenterTalkingPoint: "Use this chapter as proof exploration..."
```

For product/feature text, edit `src/content/featureStories.ts`.

For project text, edit `src/content/projects.ts`.

For customer-path recommendations, edit `src/content/customerPaths.ts`.

## Replace an Image

1. Add the image to `public/assets/images/`.
2. Open `src/content/assets.ts`.
3. Add or update the asset entry:

```ts
{
  id: "opening-control-room-fallback",
  type: "image",
  src: "/assets/images/opening-control-room.webp",
  alt: "Approved control-room image description.",
  publicSafe: true
}
```

4. Use the asset id in the related content file.

Keep `alt` text meaningful. The app warns when image alt text is missing.

## Add a Project

Open `src/content/projects.ts` and add a new project object to `projects`.

Required fields:

```ts
{
  id: "unique-project-id",
  name: "Project name",
  location: {
    city: "City",
    country: "Country",
    locationConfidence: "city-confirmed"
  },
  industry: "Smart city",
  controlRoomType: "Integrated command and control centre",
  operators: { label: "Information unavailable" },
  scope: "Control Room Interiors",
  scale: {
    label: "Information unavailable",
    sourceNote: "Source note",
    publicSafe: true
  },
  customerChallenge: "Information unavailable",
  onePwsScope: "Confirmed scope text",
  designApproach: "Confirmed design approach or Information unavailable",
  keyDeliveredSystems: ["Control-room interiors"],
  gallery: [{ label: "Image description", sourcePage: "Approved source" }],
  relatedFeatures: ["scada-triggered-video-wall"],
  proofPoints: ["Confirmed proof point"],
  featured: false
}
```

Do not invent outcomes, operator counts, values or scope. Use `Information unavailable` when the source does not provide details.

## Add a Feature

Open `src/content/featureStories.ts`.

1. Add the new feature id to `FeatureStoryId`.
2. Add a new object to `featureStories`.
3. Include headline, value proposition, benefits, technical details and presenter notes.
4. Use `confirmation required` for specifications not approved yet.

To make the feature appear as a hotspot in the connected room, also add an entry in:

```text
src/content/connectedIntelligenceFeatures.ts
```

## Replace a Video

1. Add the video file to `public/assets/video/`.
2. Add/update an asset in `src/content/assets.ts`:

```ts
{
  id: "feature-video-id",
  type: "video",
  src: "/assets/video/feature-video.mp4",
  publicSafe: true
}
```

3. Reference that asset id from the relevant feature or chapter media field.

Use compressed MP4/WebM files suitable for offline playback.

## Add a Voiceover

1. Add the audio file to:

```text
public/assets/audio/en/chapters/
public/assets/audio/en/features/
public/assets/audio/en/hotspots/
public/assets/audio/en/simulation/
```

2. Open `src/content/voiceovers.ts`.
3. Add or update `src` for the matching voiceover:

```ts
src: "/assets/audio/en/chapters/01-world-never-stops.mp3"
```

4. Update `durationMs`.

If `src` is missing, the app uses `fallbackText` where browser speech support is available.

## Edit Subtitles

Open `src/content/subtitles.ts`.

Edit `text` for on-screen subtitles:

```ts
text: "The subtitle shown during narration."
```

Optional `.vtt` files can be placed under:

```text
public/assets/subtitles/en/
```

Then update `captionFile`.

## Change Chapter Order

Open `src/content/chapters.ts`.

Change the `order` number:

```ts
order: 4
```

Keep order numbers unique. The enabled chapter list is sorted by `order`.

## Disable a Chapter

Open `src/content/chapters.ts`.

Add:

```ts
enabled: false
```

Example:

```ts
{
  id: "traditional-limits",
  enabled: false,
  order: 4,
  ...
}
```

Disabled chapters are removed from:

- Main navigation
- Progress indicator
- Presenter chapter sequence
- Auto-play sequence
- Chapter map

## Change Auto-Play Timing

Open `src/content/autoplayTimings.ts`.

Edit:

```ts
{
  chapterId: "incident-response",
  durationMs: 92000,
  pauseForMediaMs: 8000,
  narrationStartDelayMs: 1500,
  skipTechnicalLayers: true
}
```

Use `durationMs` for main chapter hold time.

Use `pauseForMediaMs` when the chapter needs extra time for a video, animation or scenario.

## Industry and Role Mappings

Open `src/content/customerPaths.ts`.

Each mapping controls:

- Recommended chapters
- Recommended products
- Surfaced projects
- Presenter talking points
- Neutral recommendation when source content is unavailable

Do not add claims that are not supported by the source presentation or approved project data.

## Validation

The app validates core content at runtime through:

```text
src/content/contentValidation.ts
```

If required content is missing, a graceful warning appears in the top-left of the presentation.

Validation currently checks:

- At least one enabled chapter
- Required chapter text
- Duplicate chapter ids
- Missing auto-play timing
- Missing chapter voiceover metadata
- Feature title/headline/value proposition
- Feature technical details
- Project name and country
- Company proof points
- Customer logo references
- Industry/role mappings
- Subtitle text
- Image alt text

Warnings do not stop the presentation. Errors indicate content that should be fixed before customer use.
