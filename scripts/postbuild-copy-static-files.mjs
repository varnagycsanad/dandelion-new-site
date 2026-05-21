import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");
const htaccessSourcePath = path.join(projectRoot, "public", ".htaccess");
const htaccessTargetPath = path.join(distDir, ".htaccess");
const englishPoolIndexPath = path.join(distDir, "en", "panorama-pool", "index.html");
const englishPoolAliasPath = path.join(distDir, "en", "panorama-pool.html");

await mkdir(distDir, { recursive: true });
await copyFile(htaccessSourcePath, htaccessTargetPath);
await copyFile(englishPoolIndexPath, englishPoolAliasPath);

console.log(`[postbuild] Copied ${path.relative(projectRoot, htaccessSourcePath)} -> ${path.relative(projectRoot, htaccessTargetPath)}`);
console.log(`[postbuild] Copied ${path.relative(projectRoot, englishPoolIndexPath)} -> ${path.relative(projectRoot, englishPoolAliasPath)}`);
