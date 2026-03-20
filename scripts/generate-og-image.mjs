/**
 * Builds public/og-image.png from Images/metadata.png with a LEFT-aligned crop.
 * Social networks center-crop by default; this pre-composes the asset so the
 * primary content (logo, headline, left CTA) stays visible.
 *
 * Usage: node scripts/generate-og-image.mjs
 */
import sharp from "sharp";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "Images", "metadata.png");
const out = join(root, "public", "og-image.png");

const W = 1200;
const H = 630;

if (!existsSync(src)) {
  console.error("Missing:", src);
  process.exit(1);
}

await sharp(src)
  .resize(W, H, {
    fit: "cover",
    // Top-left anchor: logo + headline + left CTA (avoids center-crop losing “PK”)
    position: "northwest",
  })
  .png({ compressionLevel: 9 })
  .toFile(out);

const meta = await sharp(out).metadata();
console.log("Wrote:", out, `(${meta.width}×${meta.height})`);
