/**
 * Creates web-sized .webp copies of the heavy images the home page loads.
 *
 *   node optimize-home-images.js
 *
 * - Reads originals from  public/images/
 * - Writes copies to      public/images-optimized/   (same file name, .webp)
 * - Originals are NEVER modified or deleted.
 * - Files that already have an optimized copy are skipped.
 *
 * Needs the `sharp` package (already used by optimize-new-images.js). If it is missing:
 *   npm install --save-dev sharp
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "public", "images");
const outputDir = path.join(__dirname, "public", "images-optimized");

// Big camera photos used as card / section backgrounds on the home page (8-17 MB each right now).
const photos = [
  "DSC02060.JPG",
  "DSC01950.JPG",
  "DSC01938.JPG",
  "DSC02036.JPG",
  "DSC01806.JPG",
  "DSC01801.JPG",
  "DSC02201.JPG",
  "DSC02217.JPG",
  "DSC01960.JPG",
  "DSC01972.JPG",
  "DSC02035.JPG",
  "DSC01898.JPG",
  // service detail pages (app/services/[slug])
  "DSC01701.JPG",
  "DSC01737.JPG",
  "DSC01758.JPG",
  "DSC01776.JPG",
  "DSC01790.JPG",
  "DSC01810.JPG",
  "DSC01834.JPG",
  "DSC01864.JPG",
  "DSC01896.JPG",
  "DSC01897.JPG",
  "DSC01904.JPG",
  "DSC01920.JPG",
  "DSC01933.JPG",
  "DSC01934.JPG",
  "DSC01936.JPG",
  "DSC01937.JPG",
  "DSC01971.JPG",
  "DSC02002.JPG",
  "DSC02024.JPG",
  "DSC02039.JPG",
  "DSC02040.JPG",
  "DSC02057.JPG",
  "DSC02206.JPG",
  // pricing / initiatives page
  "IMG_3006.JPG.jpeg",
  "DSC01692.JPG",
  "2R5A9465.jpg",
  "2R5A9466.jpg",
  "2R5A9469.jpg",
  "2R5A9470.jpg",
  "2R5A9477.jpg",
  // trainers pages
  "0H9A0648.JPG",
  "0H9A0792.jpg",
  "0H9A0795.JPG",
  // about page
  "GRoup photo.jpg.jpeg",
];

// Testimonial screenshots (~1 MB PNG each).
const pngs = fs
  .readdirSync(inputDir)
  .filter((f) => /^Stairs (Welcome Guide|Corporate Deck)/i.test(f) && /\.png$/i.test(f));

const jobs = [
  ...photos.map((file) => ({ file, width: 1600, quality: 78 })),
  ...pngs.map((file) => ({ file, width: 900, quality: 80 })),
];

async function run() {
  fs.mkdirSync(outputDir, { recursive: true });
  let before = 0;
  let after = 0;

  for (const { file, width, quality } of jobs) {
    const input = path.join(inputDir, file);
    const output = path.join(outputDir, `${path.parse(file).name}.webp`);

    if (!fs.existsSync(input)) {
      console.log(`Missing source, skipped: ${file}`);
      continue;
    }
    if (fs.existsSync(output)) {
      console.log(`Already exists, skipped: ${file}`);
      continue;
    }

    try {
      const originalSize = fs.statSync(input).size;
      const result = await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toFile(output);
      before += originalSize;
      after += result.size;
      console.log(`${file}: ${(originalSize / 1048576).toFixed(2)} MB -> ${(result.size / 1048576).toFixed(2)} MB`);
    } catch (err) {
      console.error(`Failed: ${file}`, err.message);
    }
  }

  console.log("\nDone.");
  console.log(`Original: ${(before / 1048576).toFixed(1)} MB  ->  WebP: ${(after / 1048576).toFixed(1)} MB`);
}

run().catch(console.error);
