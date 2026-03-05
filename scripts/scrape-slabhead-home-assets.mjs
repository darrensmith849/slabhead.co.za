#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { chromium } from "playwright";

const SOURCE_URL = process.env.SLABHEAD_SOURCE_URL || "https://slabhead.co.za/";
const OUT_DIR = path.resolve(process.cwd(), "public", "slabhead-import", "home");
const MANIFEST_PATH = path.resolve(process.cwd(), "src", "data", "asset-manifest.home.json");

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function stripQuery(u) {
  try {
    const url = new URL(u);
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return u;
  }
}

function extFromUrl(u) {
  try {
    const p = new URL(u).pathname;
    const m = p.match(/\.([a-zA-Z0-9]+)$/);
    return m ? `.${m[1].toLowerCase()}` : "";
  } catch {
    return "";
  }
}

function guessExtFromContentType(ct) {
  const c = (ct || "").toLowerCase();
  if (c.includes("image/jpeg")) return ".jpg";
  if (c.includes("image/png")) return ".png";
  if (c.includes("image/webp")) return ".webp";
  if (c.includes("image/gif")) return ".gif";
  if (c.includes("image/svg+xml")) return ".svg";
  if (c.includes("image/avif")) return ".avif";
  return "";
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function downloadToFile(originalUrl, outDir) {
  const url = stripQuery(originalUrl);
  const urlHash = sha256(url).slice(0, 16);
  const urlObj = new URL(url);

  const baseName = path.basename(urlObj.pathname) || `asset-${urlHash}`;
  const baseExt = extFromUrl(url);

  const res = await fetch(url, {
    redirect: "follow",
    headers: {
      "User-Agent": "slabhead-home-importer (compatible)",
      "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

  const ct = res.headers.get("content-type") || "";
  const buf = Buffer.from(await res.arrayBuffer());

  const contentHash = sha256(buf).slice(0, 16);
  const ext = baseExt || guessExtFromContentType(ct) || ".bin";

  const safeName = `${contentHash}-${baseName}`.replace(/[^a-zA-Z0-9._-]+/g, "-");
  const filename = safeName.endsWith(ext) ? safeName : `${safeName}${ext}`;
  const filePath = path.join(outDir, filename);

  await fs.writeFile(filePath, buf);

  return {
    originalUrl: url,
    localPath: `/slabhead-import/home/${filename}`,
    bytes: buf.length,
    contentType: ct,
    sha256: sha256(buf),
  };
}

async function main() {
  await ensureDir(OUT_DIR);
  await ensureDir(path.dirname(MANIFEST_PATH));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log(`Loading ${SOURCE_URL}`);
  await page.goto(SOURCE_URL, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(1500);

  const discovered = await page.evaluate(() => {
    const out = new Set();

    const add = (u) => {
      if (!u) return;
      if (u.startsWith("data:") || u.startsWith("blob:")) return;
      try {
        const abs = new URL(u, window.location.href).toString();
        out.add(abs);
      } catch {}
    };

    // <img> + srcset
    document.querySelectorAll("img").forEach((img) => {
      add(img.getAttribute("src"));
      add(img.src);
      const srcset = img.getAttribute("srcset") || "";
      srcset.split(",").forEach((part) => add(part.trim().split(/\s+/)[0]));
    });

    // <source srcset>
    document.querySelectorAll("source").forEach((s) => {
      const srcset = s.getAttribute("srcset") || "";
      srcset.split(",").forEach((part) => add(part.trim().split(/\s+/)[0]));
    });

    // Icons
    document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach((l) => {
      add(l.getAttribute("href"));
    });

    // Inline background images
    document.querySelectorAll('[style*="background"]').forEach((el) => {
      const style = el.getAttribute("style") || "";
      const matches = style.match(/url\(([^)]+)\)/g) || [];
      matches.forEach((m) => {
        const raw = m.replace(/^url\(/, "").replace(/\)$/, "").trim().replace(/^['"]|['"]$/g, "");
        add(raw);
      });
    });

    // Computed background-image (Divi often uses this)
    const candidates = Array.from(
      document.querySelectorAll("header, section, footer, [class*='et_pb'], [class*='hero'], [class*='banner']")
    ).slice(0, 1500);

    for (const el of candidates) {
      const bg = window.getComputedStyle(el).getPropertyValue("background-image");
      if (bg && bg !== "none") {
        const re = /url\(([^)]+)\)/g;
        let m;
        while ((m = re.exec(bg)) !== null) {
          const raw = m[1].trim().replace(/^['"]|['"]$/g, "");
          add(raw);
        }
      }
    }

    // Resources loaded by JS (often includes images)
    performance.getEntriesByType("resource").forEach((e) => add(e.name));

    return Array.from(out);
  });

  await browser.close();

  const urls = discovered
    .map((u) => {
      try {
        const x = new URL(u);
        x.search = "";
        x.hash = "";
        return x.toString();
      } catch {
        return u;
      }
    })
    .filter((u) => u.startsWith("http"))
    .filter((u) => {
      const lower = u.toLowerCase();
      return (
        lower.includes("/wp-content/") ||
        lower.endsWith(".png") ||
        lower.endsWith(".jpg") ||
        lower.endsWith(".jpeg") ||
        lower.endsWith(".webp") ||
        lower.endsWith(".gif") ||
        lower.endsWith(".svg") ||
        lower.endsWith(".avif")
      );
    });

  const unique = Array.from(new Set(urls));
  console.log(`Discovered URLs: ${discovered.length}`);
  console.log(`Candidate image URLs: ${unique.length}`);

  const manifest = {};
  let ok = 0;
  let fail = 0;

  const CONCURRENCY = 6;
  let idx = 0;

  async function worker() {
    while (idx < unique.length) {
      const i = idx++;
      const u = unique[i];
      try {
        const rec = await downloadToFile(u, OUT_DIR);
        manifest[rec.originalUrl] = {
          localPath: rec.localPath,
          bytes: rec.bytes,
          contentType: rec.contentType,
          sha256: rec.sha256,
          source: "homepage",
          downloadedAt: new Date().toISOString(),
        };
        ok++;
      } catch (e) {
        fail++;
        console.warn(`FAIL (${u}): ${e?.message || e}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  await fs.writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n");

  console.log(`Downloaded: ${ok}, Failed: ${fail}`);
  console.log(`Manifest: ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  console.log(`Assets:   ${path.relative(process.cwd(), OUT_DIR)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
