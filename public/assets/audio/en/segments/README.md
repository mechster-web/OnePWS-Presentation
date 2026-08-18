Guided slide walkthroughs live here, one MP3 per highlighted section.

The scene plays these in order and highlights whatever section is being spoken,
so each file must stay a single beat: splitting the narration this way keeps the
highlight in step with the voice without needing word-level timings.

## Adding narration to a section

1. **Name the section.** Every highlightable part of a scene has an id
   (`headline`, `subheading`, `operator`, `people`, `quote`, ...). The scene
   marks itself with `narration.isSpeaking("<id>")`.
2. **Add a segment** to that slide's list in `src/content/slideNarration.ts` with
   the same id, a short `label` for the transport readout, and the spoken `text`.
3. **Put the audio here** as `<slide-id>/<section-id>.mp3`, either by dropping in
   a recording or by running the generator:

```
npm run voiceover:segments -- --dry-run          # show what would be written
npm run voiceover:segments                       # write the missing files
npm run voiceover:segments -- --force            # replace existing files
npm run voiceover:segments -- --only human-centred-philosophy
```

4. **Refresh the timings** so the header countdown uses the real audio:

```
npm run voiceover:durations
```

A section whose file is not there yet is skipped at playback, so narration can
be added one section at a time without breaking the walkthrough. Hand-recorded
files are never overwritten unless `--force` is passed.

## Adding a new slide

Add an entry to `slideNarrationSets` in `src/content/slideNarration.ts`, then in
that scene:

```tsx
const narration = useGuidedNarration(getSlideNarration(chapter.id));

<SlideNarrationBar narration={narration} onBeforePlay={unlockNarrationAudio} />
// and on each section:
className={narration.isSpeaking("operator") ? "<highlight classes>" : ""}
```

Nothing else is needed: the transport, the sequencing, the skipping of missing
files and the highlight all come from the hook.
