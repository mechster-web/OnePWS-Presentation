Guided slide walkthroughs live here, one MP3 per highlighted section.

The scene plays these in order and highlights whatever section is being spoken,
so each file must stay a single beat: splitting the narration this way keeps the
highlight in step with the voice without needing word-level timings.

Text and file names both come from `src/content/slideNarration.ts`. To record or
re-record a set:

```
npm run voiceover:segments -- --dry-run          # show what would be written
npm run voiceover:segments                       # write the missing files
npm run voiceover:segments -- --force            # replace existing files
npm run voiceover:segments -- --only human-centred-philosophy
```
