import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, "public");
const src = join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const dest = join(publicDir, "pdf.worker.min.mjs");

try {
  mkdirSync(publicDir, { recursive: true });
  copyFileSync(src, dest);
  console.log("[copy-pdf-worker] Copied pdf.worker.min.mjs to public/");
} catch (e) {
  console.warn("[copy-pdf-worker] Skip:", e instanceof Error ? e.message : e);
}
