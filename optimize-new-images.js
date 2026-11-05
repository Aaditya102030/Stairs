
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "public", "images");
const outputDir = path.join(__dirname, "public", "images-optimized");
const backupDir = "D:\\Client\\stairs-images-backup\\new-originals";

async function optimizeImages() {
  if (!fs.existsSync(backupDir)) {
    throw new Error("Original backup folder not found!");
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs.readdirSync(backupDir)
    .filter(file => /\.(jpg|jpeg)$/i.test(file));

  let beforeTotal = 0;
  let afterTotal = 0;
  let processed = 0;

  for (const file of files) {
    const input = path.join(inputDir, file);
    const output = path.join(
      outputDir,
      `${path.parse(file).name}.webp`
    );

    if (!fs.existsSync(input)) {
      console.log(`Missing source: ${file}`);
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
        .resize({ width: 2000, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(output);

      beforeTotal += originalSize;
      afterTotal += result.size;
      processed++;

      console.log(
        `${file}: ${(originalSize / 1048576).toFixed(2)} MB -> ${(result.size / 1048576).toFixed(2)} MB`
      );
    } catch (error) {
      console.error(`Failed: ${file}`, error.message);
    }
  }

  console.log("\nOptimization complete!");
  console.log(`Processed: ${processed}`);
  console.log(`Original: ${(beforeTotal / 1048576).toFixed(2)} MB`);
  console.log(`WebP: ${(afterTotal / 1048576).toFixed(2)} MB`);
}

optimizeImages().catch(console.error);
