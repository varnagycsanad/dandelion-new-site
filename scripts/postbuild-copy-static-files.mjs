import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");
const htaccessSourcePath = path.join(projectRoot, "public", ".htaccess");
const htaccessTargetPath = path.join(distDir, ".htaccess");

await mkdir(distDir, { recursive: true });
await copyFile(htaccessSourcePath, htaccessTargetPath);

console.log(`[postbuild] Copied ${path.relative(projectRoot, htaccessSourcePath)} -> ${path.relative(projectRoot, htaccessTargetPath)}`);
