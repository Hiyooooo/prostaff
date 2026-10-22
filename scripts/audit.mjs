import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");

async function getFiles(dir, extensions) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      files.push(...(await getFiles(res, extensions)));
    } else {
      if (!extensions || extensions.some((ext) => res.endsWith(ext))) {
        files.push(res);
      }
    }
  }
  return files;
}

async function runAudit() {
  const allSrcFiles = await getFiles(srcDir, [".ts", ".tsx", ".css"]);
  const componentFiles = await getFiles(path.join(srcDir, "components"), [".ts", ".tsx"]);

  let violations = [];

  // 1. Em dash
  for (const file of allSrcFiles) {
    const content = await fs.readFile(file, "utf-8");
    if (content.includes("—")) {
      const rel = path.relative(rootDir, file);
      // Check line by line
      const lines = content.split("\n");
      lines.forEach((line, i) => {
        if (line.includes("—")) {
          violations.push(`[1. Em Dash] ${rel}:${i + 1}: ${line.trim()}`);
        }
      });
    }
  }

  // 2. Gradient, shadow, blur (CSS classes/properties, not DOM .blur())
  const regex2 = /gradient|\bvia-|\bfrom-\[|\bto-\[|shadow|(?<!\.)\bblur\b(?!\()|backdrop-/;
  for (const file of allSrcFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      // Exclude comments
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (regex2.test(line)) {
        violations.push(`[2. Gradient/Shadow/Blur] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // 3. Excess radius
  const regex3 = /rounded-(sm|md|lg|xl|2xl|3xl|full)|border-radius:\s*([5-9]|[1-9][0-9])px/;
  for (const file of allSrcFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (regex3.test(line)) {
        violations.push(`[3. Radius] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // 4. Hex colors outside globals.css & brand.ts
  const hexRegex = /#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b|rgba?\(/;
  const tailwindColorRegex = /\b(bg|text|border|ring|fill|stroke)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone|black|white)(-[0-9]{2,3})?\b/;
  for (const file of allSrcFiles) {
    const rel = path.relative(rootDir, file);
    if (rel === "src\\app\\globals.css" || rel === "src/app/globals.css" || rel === "src\\lib\\brand.ts" || rel === "src/lib/brand.ts") continue;
    // Satori og-image is allowed BRAND tokens, not inline hex
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (hexRegex.test(line)) {
        violations.push(`[4. Hex color] ${rel}:${i + 1}: ${line.trim()}`);
      }
      if (tailwindColorRegex.test(line)) {
        violations.push(`[4. Tailwind raw color] ${rel}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // 5. Animations
  const animRegex = /infinite|animate-|@keyframes|setInterval|requestAnimationFrame/;
  for (const file of allSrcFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (animRegex.test(line)) {
        violations.push(`[5. Animation] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // 6. Client network & hardware APIs
  const clientNetRegex = /XMLHttpRequest|geolocation|getUserMedia|createObjectURL|localStorage|sessionStorage|window\.open|\sdownload=/;
  for (const file of allSrcFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (clientNetRegex.test(line)) {
        violations.push(`[6. Client Hardware/Storage API] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // 7. Raw SVG in src/components
  for (const file of componentFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (line.includes("<svg")) {
        violations.push(`[7. Custom SVG in components] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // 8. Cliche copy, exclamation, forbidden claims, other brands
  const clicheRegex = /revolusioner|terdepan|seamless|game-changer|all-in-one|canggih|inovatif|solusi terbaik|kelas dunia|cutting-edge|next-level|supercharge|effortless/i;
  const forbiddenClaimsRegex = /100% ?aman|tidak bisa diubah|iso ?27001|bersertifikat|tersertifikasi|terhubung langsung|dipercaya oleh/i;
  const otherBrandsRegex = /notion|vercel/i;
  const exclamationRegex = /[A-Za-z0-9)]!( |$|"|'|<)/;

  for (const file of componentFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (clicheRegex.test(line)) {
        violations.push(`[8. Cliche copy] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
      if (forbiddenClaimsRegex.test(line)) {
        violations.push(`[8. Forbidden claim] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
      if (otherBrandsRegex.test(line)) {
        violations.push(`[8. Other brand mentioned] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
      // Check exclamation in copy (exclude operator !)
      if (exclamationRegex.test(line) && !line.includes("!=") && !line.includes("!is") && !line.includes("!prev") && !line.includes("!open") && !line.includes("!clean") && !line.includes("!target") && !line.includes("!enabled") && !line.includes("!number")) {
        violations.push(`[8. Exclamation in copy] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // 9. Photo rules
  for (const file of allSrcFiles) {
    const content = await fs.readFile(file, "utf-8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) return;
      if (line.includes("<img")) {
        violations.push(`[9. Raw <img> tag] ${path.relative(rootDir, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  // Check next.config.ts for remotePatterns
  const nextConfigContent = await fs.readFile(path.join(rootDir, "next.config.ts"), "utf-8");
  if (nextConfigContent.includes("remotePatterns")) {
    violations.push("[9. remotePatterns in next.config.ts]");
  }

  // 10. Forbidden packages
  const pkgContent = await fs.readFile(path.join(rootDir, "package.json"), "utf-8");
  const pkgRegex = /framer-motion|gsap|lottie|recharts|chart\.js|"d3|react-icons|@heroicons|shadcn|@mui|@chakra/;
  if (pkgRegex.test(pkgContent)) {
    violations.push(`[10. Forbidden dependency in package.json]`);
  }

  console.log(`\n=== AUDIT ANTI-SLOP SELESAI ===`);
  if (violations.length === 0) {
    console.log("SEMUA 10 BLOK AUDIT BERSIH TANPA VIOLASI! (0 temuan)");
  } else {
    console.log(`Ditemukan ${violations.length} pelanggaran:`);
    violations.forEach((v) => console.log(`  - ${v}`));
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error(err);
  process.exit(1);
});
