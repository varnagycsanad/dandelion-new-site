import { copyFile, cp, mkdir } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, "dist");
const htaccessSourcePath = path.join(projectRoot, "public", ".htaccess");
const htaccessTargetPath = path.join(distDir, ".htaccess");
const staticDirectories = ["scripts", "docs"];

await mkdir(distDir, { recursive: true });
await copyFile(htaccessSourcePath, htaccessTargetPath);

console.log(`[postbuild] Copied ${path.relative(projectRoot, htaccessSourcePath)} -> ${path.relative(projectRoot, htaccessTargetPath)}`);

for (const directoryName of staticDirectories) {
  const sourcePath = path.join(projectRoot, "public", directoryName);
  const targetPath = path.join(distDir, directoryName);

  await cp(sourcePath, targetPath, {
    recursive: true,
    force: true
  });

  console.log(`[postbuild] Copied ${path.relative(projectRoot, sourcePath)} -> ${path.relative(projectRoot, targetPath)}`);
}
