/**
 * Visual audit for the OnePWS deck.
 *
 * Walks every enabled chapter across a matrix of device sizes and browser zoom
 * levels, and reports any slide whose content escapes the fixed design canvas
 * or whose text has collapsed into a narrow column. Screenshots are optional so
 * regressions can be eyeballed as well as asserted.
 *
 *   node scripts/visual-audit.mjs [--url http://127.0.0.1:3000] [--shots]
 */
import { existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import esbuild from "esbuild";
import puppeteer from "puppeteer-core";

const args = process.argv.slice(2);

function valueOf(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

const BASE_URL = valueOf("--url") ?? "http://127.0.0.1:3000";
const WRITE_SHOTS = args.includes("--shots");
const ONLY = valueOf("--only");
const OUT_DIR = valueOf("--out") ?? path.join("docs", "visual-audit");

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];

// Real-world matrix: desktop defaults, the zoom levels a presenter actually
// uses, laptop panels, ultrawide, 4K, tablets and phones in both orientations.
const VIEWPORTS = [
  { name: "desktop-1920x1080", width: 1920, height: 1080, zoom: 1 },
  { name: "desktop-zoom-125", width: 1920, height: 1080, zoom: 1.25 },
  { name: "desktop-zoom-150", width: 1920, height: 1080, zoom: 1.5 },
  { name: "desktop-zoom-175", width: 1920, height: 1080, zoom: 1.75 },
  { name: "desktop-zoom-200", width: 1920, height: 1080, zoom: 2 },
  { name: "desktop-zoom-80", width: 1920, height: 1080, zoom: 0.8 },
  { name: "laptop-1440x900", width: 1440, height: 900, zoom: 1 },
  { name: "laptop-1366x768", width: 1366, height: 768, zoom: 1 },
  { name: "ultrawide-2560x1080", width: 2560, height: 1080, zoom: 1 },
  { name: "uhd-3840x2160", width: 3840, height: 2160, zoom: 1 },
  { name: "tablet-landscape-1024x768", width: 1024, height: 768, zoom: 1 },
  { name: "tablet-portrait-768x1024", width: 768, height: 1024, zoom: 1 },
  { name: "phone-landscape-844x390", width: 844, height: 390, zoom: 1 },
  { name: "phone-portrait-390x844", width: 390, height: 844, zoom: 1 },
];

function executablePath() {
  const found = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    throw new Error("No Chrome/Edge binary found. Looked in:\n" + CHROME_CANDIDATES.join("\n"));
  }
  return found;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Reads the chapter list straight from the app's own content module. Walking the
 * deck with the Next control was tried first, but the route a presenter takes
 * depends on the selected journey, so it silently under-reports chapters.
 */
async function collectChapterIds() {
  const bundle = await esbuild.build({
    entryPoints: ["src/content/chapters.ts"],
    bundle: true,
    format: "esm",
    platform: "node",
    write: false,
    logLevel: "silent",
    // The content module transitively reads Vite's import.meta.env, which does
    // not exist outside the bundler.
    define: {
      "import.meta.env.DEV": "false",
      "import.meta.env.PROD": "true",
      "import.meta.env.MODE": '"production"',
    },
  });

  const encoded = Buffer.from(bundle.outputFiles[0].text).toString("base64");
  const module = await import("data:text/javascript;base64," + encoded);
  return module.enabledChapters.map((chapter) => chapter.id);
}

/**
 * Scenes animate in, so measuring immediately would report transient positions.
 * Waits until the stage subtree stops moving before any assertion is made.
 */
async function waitForSettle(page, { timeout = 3000, quietFor = 2 } = {}) {
  const started = Date.now();
  let previous = null;
  let stable = 0;

  while (Date.now() - started < timeout) {
    const signature = await page.evaluate(() => {
      const stage = document.querySelector(".presentation-stage");
      if (!stage) {
        return "";
      }
      let hash = "";
      for (const node of stage.querySelectorAll("*")) {
        const rect = node.getBoundingClientRect();
        hash += Math.round(rect.left) + "," + Math.round(rect.top) + "," +
          Math.round(rect.width) + "," + Math.round(rect.height) + ";";
      }
      return hash;
    });

    if (signature === previous) {
      stable++;
      if (stable >= quietFor) {
        return true;
      }
    } else {
      stable = 0;
      previous = signature;
    }
    await wait(220);
  }
  return false;
}

/**
 * Measures the rendered slide. The stage is a fixed-size canvas, so content
 * sticking out of it, or a text box squeezed narrower than a couple of
 * characters, is a layout failure.
 */
async function inspectSlide(page) {
  return page.evaluate(() => {
    const stage = document.querySelector(".presentation-stage");
    if (!stage) {
      return { error: "stage-missing" };
    }

    const stageRect = stage.getBoundingClientRect();
    const scale = stageRect.width / stage.offsetWidth || 1;
    const overflow = [];
    const squeezed = [];
    const TOLERANCE = 2;

    for (const node of stage.querySelectorAll("*")) {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
        continue;
      }
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        continue;
      }

      const left = (rect.left - stageRect.left) / scale;
      const top = (rect.top - stageRect.top) / scale;
      const right = (rect.right - stageRect.left) / scale;
      const bottom = (rect.bottom - stageRect.top) / scale;

      const outBy = Math.max(-left, -top, right - stage.offsetWidth, bottom - stage.offsetHeight);

      if (outBy > TOLERANCE) {
        // Anything clipped by an ancestor is deliberate art direction.
        let clipped = false;
        for (let parent = node.parentElement; parent && parent !== stage; parent = parent.parentElement) {
          const parentStyle = getComputedStyle(parent);
          if (parentStyle.overflow !== "visible" || parentStyle.clipPath !== "none") {
            clipped = true;
            break;
          }
        }
        if (!clipped) {
          overflow.push({
            tag: node.tagName.toLowerCase(),
            cls: String(node.className ?? "").slice(0, 80),
            outBy: Math.round(outBy),
          });
        }
      }

      // Per-character text stacking: a leaf text box narrower than about two
      // characters, yet several lines tall, means its column has collapsed.
      const text = node.childElementCount === 0 ? (node.textContent ?? "").trim() : "";
      if (text.length > 3) {
        const fontSize = parseFloat(style.fontSize) || 16;
        const boxWidth = rect.width / scale;
        const boxHeight = rect.height / scale;
        if (boxWidth < fontSize * 2.2 && boxHeight > fontSize * 2.4) {
          squeezed.push({
            tag: node.tagName.toLowerCase(),
            text: text.slice(0, 40),
            width: Math.round(boxWidth),
            fontSize: Math.round(fontSize),
          });
        }
      }
    }

    const docOverflow =
      document.documentElement.scrollWidth > window.innerWidth + 2 ||
      document.documentElement.scrollHeight > window.innerHeight + 2;

    return {
      canvasWidth: stage.offsetWidth,
      canvasHeight: stage.offsetHeight,
      scale: Number(scale.toFixed(4)),
      renderedWidth: Math.round(stageRect.width),
      renderedHeight: Math.round(stageRect.height),
      fitsViewport: stageRect.width <= window.innerWidth + 2 && stageRect.height <= window.innerHeight + 2,
      docOverflow,
      overflow: overflow.slice(0, 6),
      squeezed: squeezed.slice(0, 6),
    };
  });
}

const browser = await puppeteer.launch({
  executablePath: executablePath(),
  headless: "new",
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--hide-scrollbars", "--force-device-scale-factor=1"],
});

if (WRITE_SHOTS) {
  rmSync(OUT_DIR, { recursive: true, force: true });
  mkdirSync(OUT_DIR, { recursive: true });
}

const page = await browser.newPage();
page.on("pageerror", (error) => console.error("  ! page error:", error.message));

// Entrance and ambient motion make geometry measurements non-deterministic, and
// the deck already honours reduced motion, so the audit runs in that mode. It
// changes animation, never layout, which is what is under test here.
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

await page.setViewport({ width: 1920, height: 1080 });
await page.goto(BASE_URL, { waitUntil: "networkidle2" });
await page.waitForSelector(".presentation-stage", { timeout: 30000 });
await wait(1200);

const allChapters = await collectChapterIds();
const chapterIds = ONLY ? allChapters.filter((id) => id.includes(ONLY)) : allChapters;
console.log("Auditing " + chapterIds.length + " chapters x " + VIEWPORTS.length + " viewports\n");

const failures = [];
let checks = 0;

for (const viewport of VIEWPORTS) {
  // Browser zoom shrinks the CSS viewport, which is exactly what used to break
  // the layout, so it is modelled by dividing the device size by the zoom.
  const cssWidth = Math.round(viewport.width / viewport.zoom);
  const cssHeight = Math.round(viewport.height / viewport.zoom);
  await page.setViewport({ width: cssWidth, height: cssHeight, deviceScaleFactor: 1 });

  const shotDir = path.join(OUT_DIR, viewport.name);
  if (WRITE_SHOTS) {
    mkdirSync(shotDir, { recursive: true });
  }

  for (const chapterId of chapterIds) {
    await page.goto(BASE_URL + "/#" + chapterId, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".presentation-stage", { timeout: 30000 });
    await wait(400);
    await waitForSettle(page);

    const report = await inspectSlide(page);
    checks++;

    const problems = [];
    if (report.error) {
      problems.push(report.error);
    } else {
      if (!report.fitsViewport) {
        problems.push(
          "stage " + report.renderedWidth + "x" + report.renderedHeight +
            " exceeds viewport " + cssWidth + "x" + cssHeight,
        );
      }
      if (report.docOverflow) {
        problems.push("document scrolls");
      }
      if (report.canvasWidth !== 1920 || report.canvasHeight !== 1080) {
        problems.push("canvas is " + report.canvasWidth + "x" + report.canvasHeight + ", expected 1920x1080");
      }
      if (report.overflow.length) {
        problems.push(report.overflow.length + " element(s) outside canvas: " + JSON.stringify(report.overflow[0]));
      }
      if (report.squeezed.length) {
        problems.push(report.squeezed.length + " squeezed text box(es): " + JSON.stringify(report.squeezed[0]));
      }
    }

    if (problems.length) {
      failures.push({ viewport: viewport.name, chapterId, problems });
      console.log("FAIL " + viewport.name + " / " + chapterId);
      for (const problem of problems) {
        console.log("     - " + problem);
      }
    }

    if (WRITE_SHOTS) {
      await page.screenshot({ path: path.join(shotDir, chapterId + ".png") });
    }
  }
  console.log("checked " + viewport.name);
}

await browser.close();

console.log("\n" + checks + " slide renders checked, " + failures.length + " failing.");
if (failures.length) {
  const byChapter = {};
  for (const failure of failures) {
    byChapter[failure.chapterId] = (byChapter[failure.chapterId] ?? 0) + 1;
  }
  console.log("\nFailures per chapter:");
  for (const [chapterId, count] of Object.entries(byChapter).sort((a, b) => b[1] - a[1])) {
    console.log("  " + String(count).padStart(3) + "  " + chapterId);
  }
  process.exitCode = 1;
}
