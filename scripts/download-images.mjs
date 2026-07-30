/**
 * Download product images from slabhead.co.za and save locally.
 * Creates an asset manifest mapping old URLs to new local paths.
 *
 * Usage: node scripts/download-images.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

// Image map: localPath -> sourceURL (extracted from products.ts)
const imageMap = [
  // Pokemon Slabbed
  { local: "images/products/pokemon-slabbed/charizard-vmax-psa-10.png", remote: "https://slabhead.co.za/wp-content/uploads/2025/08/Screenshot-2025-08-07-at-09.14.06.png" },
  { local: "images/products/pokemon-slabbed/1st-ed-dark-houndoom-psa-10.jpg", remote: "https://slabhead.co.za/wp-content/uploads/2026/02/893a1fb6-612d-4040-8daf-db4980107119-scaled.jpg" },
  { local: "images/products/pokemon-slabbed/dark-charizard-cgc-8-5.png", remote: "https://slabhead.co.za/wp-content/uploads/2025/07/DARK-CHARIZARD-CGC-BLUE-8.5-JPN-scaled.png" },
  { local: "images/products/pokemon-slabbed/rayquaza-psa-10.png", remote: "https://slabhead.co.za/wp-content/uploads/2026/02/Screenshot-2026-02-19-at-15.00.36.png" },
  { local: "images/products/pokemon-slabbed/charizard-cgc-8.jpg", remote: "https://slabhead.co.za/wp-content/uploads/2026/02/43B6C8F5-F1F2-426F-B414-3D6A1E7249F3-2-scaled.jpg" },
  { local: "images/products/pokemon-slabbed/magnemite-cgc-10.png", remote: "https://slabhead.co.za/wp-content/uploads/2025/07/MAGNEMITE-CGC-10-scaled.png" },
  { local: "images/products/pokemon-slabbed/pikachu-psa-9.jpg", remote: "https://slabhead.co.za/wp-content/uploads/2025/07/14F3A290-7084-424F-B88F-E6C8DB2487D8-scaled.jpg" },
  { local: "images/products/pokemon-slabbed/rosemon-psa-10.jpg", remote: "https://slabhead.co.za/wp-content/uploads/2025/07/IMG_1206-scaled.jpg" },
  // TCG Accessories
  { local: "images/products/tcg-accessories/professor-juniper-card-sleeves.jpeg", remote: "https://slabhead.co.za/wp-content/uploads/2025/01/JUNIPERCS.jpeg" },
  { local: "images/products/tcg-accessories/ultra-pro-charmander-playmat.jpeg", remote: "https://slabhead.co.za/wp-content/uploads/2025/01/Char.jpeg" },
];

const manifest = {};
let successCount = 0;
let failCount = 0;

for (const { local, remote } of imageMap) {
  const destPath = join(PUBLIC, local);
  const destDir = dirname(destPath);

  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  try {
    console.log(`Downloading: ${remote.split("/").pop()}`);
    const res = await fetch(remote);
    if (!res.ok) {
      console.error(`  FAIL (${res.status}): ${remote}`);
      failCount++;
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    writeFileSync(destPath, buffer);
    manifest[local] = { original: remote, local: `/${local}`, size: buffer.length };
    successCount++;
    console.log(`  OK (${(buffer.length / 1024).toFixed(0)} KB)`);
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
    failCount++;
  }
}

// Write manifest
const manifestPath = join(ROOT, "src", "data", "asset-manifest.json");
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nDone: ${successCount} downloaded, ${failCount} failed.`);
console.log(`Manifest written to: ${manifestPath}`);
