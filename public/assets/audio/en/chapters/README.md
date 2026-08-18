Chapter narration files live here.

Use MP3 files named with the chapter order and chapter id:

`03-onepws-positioning.mp3`

The player resolves this name from `src/content/voiceovers.ts`, so a file
dropped in with the right name is picked up without any code change.

## Generating with ElevenLabs

`scripts/generate-voiceovers.mjs` reads the narration text for each chapter from
the same registry and writes the MP3 here under the expected name. It runs in
Node, so the API key stays in `.env` and never reaches the browser.

```
npm run voiceover:voices                                  # list the account's voices
npm run voiceover:generate -- --all --dry-run             # show what would be written
npm run voiceover:generate -- --only human-centred-philosophy
npm run voiceover:generate -- --all --force               # replace existing files
npm run voiceover:generate -- --only <id> --voice "Vikram S"
```

Existing files are skipped unless `--force` is passed, so hand-recorded tracks
are never overwritten by accident.

Recommended export (for manually recorded files):

- Format: MP3
- Sample rate: 44.1 kHz or 48 kHz
- Bitrate: 128-192 kbps
- Loudness: consistent spoken voice, no clipping
