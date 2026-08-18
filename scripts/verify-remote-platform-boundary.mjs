import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const remoteRoot = path.join(root, "scripts", "remote-platform");
const forbiddenInSource = [
  "graph.facebook.com",
  "googleapis.com",
  "oauth2.googleapis.com",
  "chm.sabeeapp.com",
];

async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(fullPath));
    else if (entry.isFile() && fullPath.endsWith(".mjs")) files.push(fullPath);
  }
  return files;
}

const remoteFiles = await filesIn(remoteRoot);
const sourceFiles = (await filesIn(path.join(root, "src"))).filter((file) => !file.includes(`${path.sep}admin-disabled${path.sep}`));
const violations = [];
for (const file of sourceFiles) {
  const content = await readFile(file, "utf8");
  for (const marker of forbiddenInSource) {
    if (content.includes(marker)) violations.push(`${path.relative(root, file)} contains ${marker}`);
  }
}

if (violations.length > 0) {
  console.error("[FAIL] Remote-platform boundary violations:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log(`[OK] ${remoteFiles.length} remote-platform script(s) are physically isolated from Astro source.`);
}
