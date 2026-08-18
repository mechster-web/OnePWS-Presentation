/**
 * Generates chapter narration MP3s with ElevenLabs.
 *
 * This runs in Node at build time, never in the browser: the API key stays in
 * .env (gitignored) and only the finished MP3 ships with the deck. Do not move
 * the key to a VITE_ variable -- Vite inlines those into the client bundle,
 * which would publish the key to every visitor.
 *
 * The narration text and the file name for each chapter come from
 * src/content/voiceovers.ts, so a generated file is picked up by the player
 * without any further wiring.
 *
 *   node scripts/generate-voiceovers.mjs --voices
 *   node scripts/generate-voiceovers.mjs --only human-centred-philosophy
 *   node scripts/generate-voiceovers.mjs --all [--force] [--dry-run]
 *   node scripts/generate-voiceovers.mjs --only <id> --voice "Vikram S"
 */
import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.elevenlabs.io/v1";

const args = process.argv.slice(2);
const valueOf = (flag) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
};
const LIST_VOICES = args.includes("--voices") || args.includes("--list-voices");
const ONLY = valueOf("--only");
const ALL = args.includes("--all");
const FORCE = args.includes("--force");
const DRY_RUN = args.includes("--dry-run");
const VOICE_ARG = valueOf("--voice");
/** Segment mode narrates one slide beat per file so the scene can highlight along. */
const SEGMENTS = args.includes("--segments");

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) {
    throw new Error("No .env found. Copy .env.example to .env and add ELEVENLABS_API_KEY.");
  }
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    // A value may carry a trailing ` # note`, which is not part of the value.
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).replace(/\s+#.*$/, "").trim();
  }
  return env;
}

const env = loadEnv();
const apiKey = env.ELEVENLABS_API_KEY;
if (!apiKey) {
  throw new Error("ELEVENLABS_API_KEY is missing from .env");
}

async function api(endpoint, init = {}) {
  const response = await fetch(API + endpoint, {
    ...init,
    headers: { "xi-api-key": apiKey, ...(init.headers ?? {}) },
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`ElevenLabs ${endpoint} failed: ${response.status} ${response.statusText}\n${detail.slice(0, 400)}`);
  }
  return response;
}

async function listVoices() {
  const response = await api("/voices");
  const body = await response.json();
  return (body.voices ?? []).map((voice) => ({
    id: voice.voice_id,
    name: voice.name,
    category: voice.category ?? "",
    labels: Object.values(voice.labels ?? {}).join(", "),
  }));
}

/**
 * Resolves --voice / ELEVENLABS_VOICE_ID to an id. A name is matched
 * case-insensitively so "Vikram S" works as well as the raw id.
 */
async function resolveVoiceId(requested) {
  if (!requested) return null;
  const voices = await listVoices();
  const byId = voices.find((voice) => voice.id === requested);
  if (byId) return byId.id;
  const wanted = requested.toLowerCase();
  const byName =
    voices.find((voice) => voice.name.toLowerCase() === wanted) ??
    voices.find((voice) => voice.name.toLowerCase().includes(wanted));
  if (!byName) {
    throw new Error(`No ElevenLabs voice matches "${requested}". Run --voices to list what this account has.`);
  }
  return byName.id;
}

/**
 * The narration registry is TypeScript and reads Vite's import.meta.env, so it
 * is bundled in memory rather than imported directly.
 */
async function loadVoiceovers() {
  const bundle = await esbuild.build({
    entryPoints: ["src/content/voiceovers.ts"],
    absWorkingDir: ROOT,
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent",
    define: {
      "import.meta.env.DEV": "false",
      "import.meta.env.PROD": "true",
      "import.meta.env.MODE": '"production"',
    },
  });

  const encoded = Buffer.from(bundle.outputFiles[0].text).toString("base64");
  const module = await import("data:text/javascript;base64," + encoded);
  return module.voiceovers.filter((voiceover) => voiceover.scope === "chapter");
}

/**
 * Slide narration is split into one file per highlighted section, so the scene
 * can follow the audio without needing word-level timings.
 */
async function loadSegments() {
  const bundle = await esbuild.build({
    entryPoints: ["src/content/slideNarration.ts"],
    absWorkingDir: ROOT,
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent",
  });

  const encoded = Buffer.from(bundle.outputFiles[0].text).toString("base64");
  const module = await import("data:text/javascript;base64," + encoded);
  return Object.entries(module.slideNarrationSets).flatMap(([chapterId, segments]) =>
    segments.map((segment) => ({ ...segment, chapterId })),
  );
}

async function synthesise(voiceId, text) {
  const response = await api(`/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: env.ELEVENLABS_MODEL_ID || "eleven_multilingual_v2",
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.15, use_speaker_boost: true },
    }),
  });
  return Buffer.from(await response.arrayBuffer());
}

if (LIST_VOICES) {
  const voices = await listVoices();
  console.log(`${voices.length} voices on this account:\n`);
  for (const voice of voices) {
    console.log(`  ${voice.name.padEnd(24)} ${voice.id}  ${voice.category}${voice.labels ? ` (${voice.labels})` : ""}`);
  }
  console.log("\nSet ELEVENLABS_VOICE_ID in .env, or pass --voice \"<name>\".");
  process.exit(0);
}

if (!ONLY && !ALL && !SEGMENTS) {
  console.log("Nothing selected. Use --only <chapter-id>, --all, --segments, or --voices.");
  process.exit(0);
}

const voiceId = await resolveVoiceId(VOICE_ARG || env.ELEVENLABS_VOICE_ID);
if (!voiceId) {
  throw new Error('No voice selected. Run --voices, then set ELEVENLABS_VOICE_ID in .env or pass --voice "<name>".');
}

const chapters = SEGMENTS
  ? (await loadSegments()).map((segment) => ({
      ownerId: `${segment.chapterId}/${segment.id}`,
      plannedFile: segment.file,
      fallbackText: segment.text,
      chapterId: segment.chapterId,
    }))
  : await loadVoiceovers();
const selected = ONLY
  ? chapters.filter((chapter) => chapter.ownerId === ONLY || chapter.chapterId === ONLY)
  : chapters;
if (!selected.length) {
  throw new Error(`No chapter narration matches "${ONLY}".`);
}

console.log(`Voice ${voiceId} -- ${selected.length} chapter${selected.length === 1 ? "" : "s"}${DRY_RUN ? " (dry run)" : ""}\n`);

let written = 0;
let skipped = 0;

for (const chapter of selected) {
  const target = path.join(ROOT, "public", chapter.plannedFile.replace(/^\//, ""));
  const relative = path.relative(ROOT, target).replace(/\\/g, "/");

  if (existsSync(target) && !FORCE) {
    console.log(`  skip   ${chapter.ownerId} -- ${relative} already exists (use --force to replace)`);
    skipped += 1;
    continue;
  }

  const text = (chapter.fallbackText ?? "").trim();
  if (!text) {
    console.log(`  skip   ${chapter.ownerId} -- no narration text`);
    skipped += 1;
    continue;
  }

  if (DRY_RUN) {
    console.log(`  would  ${chapter.ownerId} -> ${relative} (${text.length} chars)`);
    continue;
  }

  const audio = await synthesise(voiceId, text);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, audio);
  console.log(`  wrote  ${chapter.ownerId} -> ${relative} (${(audio.length / 1024).toFixed(0)} kB)`);
  written += 1;
}

console.log(`\n${written} written, ${skipped} skipped.`);
if (written > 0) {
  console.log("Run `npm run voiceover:durations` so the remaining-time readout picks up the new audio.");
}

// esbuild keeps a worker alive; exiting explicitly avoids a noisy teardown on Windows.
process.exit(0);
