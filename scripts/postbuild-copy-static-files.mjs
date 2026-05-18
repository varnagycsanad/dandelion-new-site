import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourcePath = path.join(projectRoot, "public", ".htaccess");
const distDir = path.join(projectRoot, "dist");
const targetPath = path.join(distDir, ".htaccess");

await mkdir(distDir, { recursive: true });
await copyFile(sourcePath, targetPath);

console.log(`[postbuild] Copied ${path.relative(projectRoot, sourcePath)} -> ${path.relative(projectRoot, targetPath)}`);
