/**
 * Uploads everything under public/assets to Cloudinary, into one folder so the
 * deck's media stays separated from anything else in the account.
 *
 * The local folder structure is preserved inside that folder, so
 *   public/assets/products/control-room.png
 * becomes
 *   <CLOUDINARY_ASSET_FOLDER>/products/control-room
 *
 * Credentials come from .env (CLOUDINARY_URL). Nothing is read from the network
 * except the Cloudinary upload endpoint.
 *
 *   node scripts/upload-assets-to-cloudinary.mjs [--dry-run] [--only <substring>] [--force]
 *
 * Re-running is safe: uploads use overwrite=true, so a second run refreshes the
 * remote copy rather than creating duplicates.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_DIR = path.join(ROOT, "public", "assets");
const MANIFEST_PATH = path.join(ROOT, "docs", "cloudinary-assets.json");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const FORCE = args.includes("--force");
const ONLY = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : undefined;
const CONCURRENCY = 4;
/** Cloudinary answers 429 "Out of Processing Capacity" under burst; back off and retry. */
const RETRIES = 4;

/** Cloudinary's own limits, so oversized files are reported instead of failing mid-flight. */
const MAX_BYTES = { image: 10 * 1024 * 1024, raw: 10 * 1024 * 1024, video: 100 * 1024 * 1024 };

const RESOURCE_TYPES = {
  ".png": "image", ".jpg": "image", ".jpeg": "image", ".webp": "image",
  ".svg": "image", ".gif": "image", ".avif": "image",
  ".mp4": "video", ".webm": "video", ".mov": "video", ".mp3": "video", ".wav": "video",
};

function loadEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) {
    throw new Error("No .env found. Copy .env.example to .env and add CLOUDINARY_URL.");
  }
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

/** cloudinary://<key>:<secret>@<cloud> */
function parseCloudinaryUrl(url) {
  const match = /^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/.exec(url ?? "");
  if (!match) throw new Error("CLOUDINARY_URL is missing or malformed in .env");
  return { apiKey: match[1], apiSecret: match[2], cloudName: match[3] };
}

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(full)));
    else files.push(full);
  }
  return files;
}

/**
 * Cloudinary strips the extension from image/video public ids but keeps it for
 * raw, so raw ids have to carry it or the delivery URL will not resolve.
 */
function toPublicId(relativePath, resourceType, folder) {
  const posix = relativePath.split(path.sep).join("/");
  const withoutExt = posix.replace(/\.[^./]+$/, "");
  return `${folder}/${resourceType === "raw" ? posix : withoutExt}`;
}

function sign(params, apiSecret) {
  const canonical = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha1").update(canonical + apiSecret).digest("hex");
}

async function upload(file, config) {
  const relative = path.relative(SOURCE_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const resourceType = RESOURCE_TYPES[ext] ?? "raw";
  const publicId = toPublicId(relative, resourceType, config.folder);
  const size = (await stat(file)).size;

  if (size > MAX_BYTES[resourceType]) {
    return { relative, publicId, resourceType, size, skipped: `exceeds ${resourceType} limit` };
  }
  if (DRY_RUN) return { relative, publicId, resourceType, size, dryRun: true };

  const bytes = await readFile(file);
  const endpoint = `https://api.cloudinary.com/v1_1/${config.cloudName}/${resourceType}/upload`;

  let lastError;
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    if (attempt) await new Promise((resolve) => setTimeout(resolve, 1500 * 2 ** (attempt - 1)));

    // Rebuilt per attempt: a FormData body is consumed by the first fetch, and the
    // signature is only valid for about an hour either side of its timestamp.
    const signed = { overwrite: "true", public_id: publicId, timestamp: String(Math.floor(Date.now() / 1000)) };
    const form = new FormData();
    form.append("file", new Blob([bytes]), path.basename(file));
    form.append("api_key", config.apiKey);
    for (const [key, value] of Object.entries(signed)) form.append(key, value);
    form.append("signature", sign(signed, config.apiSecret));

    const response = await fetch(endpoint, { method: "POST", body: form });
    const body = await response.json().catch(() => ({}));
    if (response.ok) {
      return { relative, publicId, resourceType, size, url: body.secure_url, bytes: body.bytes };
    }

    lastError = new Error(`${response.status} ${body?.error?.message ?? response.statusText}`);
    // Only throttling and transient server faults are worth another attempt.
    if (response.status !== 429 && response.status < 500) break;
  }
  throw lastError;
}

/** Runs tasks with a fixed worker pool so a large deck does not open 180 sockets. */
async function pooled(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (cursor < items.length) {
        const index = cursor++;
        results[index] = await worker(items[index], index);
      }
    })
  );
  return results;
}

const env = loadEnv();
const config = { ...parseCloudinaryUrl(env.CLOUDINARY_URL), folder: env.CLOUDINARY_ASSET_FOLDER || "onepws-presentation" };

let files = (await collectFiles(SOURCE_DIR)).filter((file) => !file.endsWith(".md"));
if (ONLY) files = files.filter((file) => ONLY.some((needle) => file.includes(needle)));

console.log(`Cloud: ${config.cloudName}  Folder: ${config.folder}`);
console.log(`${files.length} files${DRY_RUN ? " (dry run)" : ""}\n`);

let done = 0;
const uploaded = [];
const skipped = [];
const failed = [];

await pooled(files, CONCURRENCY, async (file) => {
  const relative = path.relative(SOURCE_DIR, file);
  try {
    const result = await upload(file, config);
    done++;
    if (result.skipped) {
      skipped.push(result);
      console.log(`[${done}/${files.length}] SKIP ${relative} -- ${result.skipped} (${(result.size / 1048576).toFixed(1)} MB)`);
    } else {
      uploaded.push(result);
      console.log(`[${done}/${files.length}] ok   ${relative}`);
    }
  } catch (error) {
    done++;
    failed.push({ relative, message: String(error.message ?? error) });
    console.log(`[${done}/${files.length}] FAIL ${relative} -- ${error.message ?? error}`);
  }
});

if (!DRY_RUN && uploaded.length) {
  // Merged rather than replaced, so a targeted re-run (--only) tops up the manifest
  // instead of shrinking it to just the files that run touched.
  const existing = existsSync(MANIFEST_PATH) ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8")).assets ?? {} : {};
  for (const item of uploaded) {
    existing["/assets/" + item.relative.split(path.sep).join("/")] = {
      publicId: item.publicId,
      resourceType: item.resourceType,
      url: item.url,
    };
  }
  const manifest = {
    cloudName: config.cloudName,
    folder: config.folder,
    assets: Object.fromEntries(Object.entries(existing).sort(([a], [b]) => a.localeCompare(b))),
  };
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nManifest written to ${path.relative(ROOT, MANIFEST_PATH)}`);
}

console.log(`\nuploaded ${uploaded.length}   skipped ${skipped.length}   failed ${failed.length}`);
for (const item of skipped) console.log(`  skipped: ${item.relative} (${item.skipped})`);
for (const item of failed) console.log(`  failed:  ${item.relative} -- ${item.message}`);
if (failed.length && !FORCE) process.exitCode = 1;
