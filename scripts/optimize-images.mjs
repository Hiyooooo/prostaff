import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const SLOTS = [
  {
    id: "IMG-01",
    inputFile: "hero-desk.jpg",
    outputFile: "hero-meja-kerja.webp",
    width: 800,
    height: 1000,
  },
  {
    id: "IMG-02",
    inputFile: "audience-law.jpg",
    outputFile: "audiens-hukum.webp",
    width: 800,
    height: 600,
  },
  {
    id: "IMG-03",
    inputFile: "audience-arch.jpg",
    outputFile: "audiens-arsitek.webp",
    width: 800,
    height: 600,
  },
  {
    id: "IMG-04",
    inputFile: "audience-software.jpg",
    outputFile: "audiens-developer.webp",
    width: 800,
    height: 600,
  },
  {
    id: "IMG-05",
    inputFile: "audience-professional.jpg",
    outputFile: "audiens-kantor.webp",
    width: 800,
    height: 600,
  },
  {
    id: "IMG-06",
    inputFile: "implementation.jpg",
    outputFile: "implementasi-rapat.webp",
    width: 1200,
    height: 800,
  },
  {
    id: "IMG-07",
    inputFile: "cta-office.jpg",
    outputFile: "cta-kantor-pagi.webp",
    width: 1920,
    height: 1080,
  },
];

async function optimize() {
  const inputDir = path.join(rootDir, "prostaff-hris-assets", "assets", "img");
  const rawDir = path.join(rootDir, "raw-images");
  const outputDir = path.join(rootDir, "public", "images");

  await fs.mkdir(rawDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });

  let totalBytes = 0;

  for (const slot of SLOTS) {
    const srcPath = path.join(inputDir, slot.inputFile);
    const rawPath = path.join(rawDir, slot.inputFile);
    const outPath = path.join(outputDir, slot.outputFile);

    // Copy to raw-images
    await fs.copyFile(srcPath, rawPath);

    let quality = 78;
    let buffer;
    let meta;

    while (quality >= 50) {
      buffer = await sharp(srcPath)
        .rotate()
        .grayscale()
        .resize(slot.width, slot.height, {
          fit: "cover",
          position: sharp.strategy.attention,
        })
        .webp({ quality })
        .toBuffer();

      if (buffer.length <= 220 * 1024 || quality <= 50) {
        break;
      }
      quality -= 4;
    }

    await fs.writeFile(outPath, buffer);
    meta = await sharp(buffer).metadata();

    const kb = (buffer.length / 1024).toFixed(1);
    totalBytes += buffer.length;
    console.log(
      `[${slot.id}] ${slot.outputFile}: ${meta.width}x${meta.height}, ${kb} KB (q${quality}, channels: ${meta.channels})`
    );
  }

  const totalKb = (totalBytes / 1024).toFixed(1);
  console.log(`\nTotal ukuran gambar: ${totalKb} KB (maksimal 1.400 KB)`);
}

optimize().catch((err) => {
  console.error(err);
  process.exit(1);
});
