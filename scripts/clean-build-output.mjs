import { rm } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");

await rm(distDir, {
  recursive: true,
  force: true,
});

console.log(`[prebuild] Removed ${path.relative(projectRoot, distDir)}`);
