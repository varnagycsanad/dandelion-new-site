import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const REQUIRED_ENV = [
  "GEO_OAUTH_CLIENT_JSON",
  "GEO_OAUTH_TOKEN_JSON",
  "GEO_GSC_SITE_URL",
  "GA4_PROPERTY_ID"
];

const WEBMASTERS_READONLY_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const ANALYTICS_READONLY_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

await loadEnv();

let hasProblem = false;

console.log("Dandelion GEO auth környezet ellenőrzése");
console.log("");

for (const key of REQUIRED_ENV) {
  const value = process.env[key];
  if (value) {
    console.log(`OK: ${key} be van állítva.`);
  } else {
    console.log(`HIÁNYZIK: ${key} nincs beállítva.`);
    hasProblem = true;
  }
}

console.log("");
checkReferencedFile("Kombinált GEO OAuth client", process.env.GEO_OAUTH_CLIENT_JSON);
checkTokenFile("Kombinált GEO OAuth token", process.env.GEO_OAUTH_TOKEN_JSON);

if (process.env.GEO_GSC_OAUTH_TOKEN_JSON) {
  checkTokenFile("Régi Search Console-only OAuth token", process.env.GEO_GSC_OAUTH_TOKEN_JSON, { optional: true });
}

if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  checkReferencedFile("GA4 service account fallback", process.env.GOOGLE_APPLICATION_CREDENTIALS, { optional: true });
}

console.log("");
if (hasProblem) {
  console.log("Összegzés: vannak hiányzó beállítások vagy fájlok. Ez előkészítési fázisban elfogadható.");
  process.exitCode = 0;
} else {
  console.log("Összegzés: az alap GEO auth környezet ellenőrizhetőnek tűnik.");
}

async function loadEnv() {
  try {
    const dotenv = await import("dotenv");
    dotenv.config();
    return;
  } catch {
    loadDotEnvFallback(".env");
  }
}

function loadDotEnvFallback(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
}

function resolveLocalPath(filePath) {
  return path.resolve(process.cwd(), filePath);
}

function checkReferencedFile(label, filePath, options = {}) {
  if (!filePath) {
    console.log(`${options.optional ? "OPCIONÁLIS HIÁNYZIK" : "HIÁNYZIK"}: ${label} útvonala nincs beállítva.`);
    if (!options.optional) {
      hasProblem = true;
    }
    return;
  }

  const resolvedPath = resolveLocalPath(filePath);
  if (existsSync(resolvedPath)) {
    console.log(`OK: ${label} fájl létezik: ${filePath}`);
  } else {
    console.log(`${options.optional ? "OPCIONÁLIS HIÁNYZIK" : "HIÁNYZIK"}: ${label} fájl nem található: ${filePath}`);
    if (!options.optional) {
      hasProblem = true;
    }
  }
}

function checkTokenFile(label, filePath, options = {}) {
  if (!filePath) {
    console.log(`${options.optional ? "OPCIONÁLIS HIÁNYZIK" : "HIÁNYZIK"}: ${label} útvonala nincs beállítva.`);
    if (!options.optional) {
      hasProblem = true;
    }
    return;
  }

  const resolvedPath = resolveLocalPath(filePath);
  if (!existsSync(resolvedPath)) {
    console.log(`${options.optional ? "OPCIONÁLIS HIÁNYZIK" : "HIÁNYZIK"}: ${label} fájl nem található: ${filePath}`);
    if (!options.optional) {
      hasProblem = true;
    }
    return;
  }

  console.log(`OK: ${label} fájl létezik: ${filePath}`);

  try {
    const token = JSON.parse(readFileSync(resolvedPath, "utf8"));
    const scopes = typeof token.scope === "string" ? token.scope.split(/\s+/).filter(Boolean) : [];

    console.log(`  refresh_token van: ${token.refresh_token ? "igen" : "nem"}`);
    console.log(`  scope mező van: ${token.scope ? "igen" : "nem"}`);
    console.log(`  tartalmaz webmasters.readonly scope-ot: ${scopes.includes(WEBMASTERS_READONLY_SCOPE) ? "igen" : "nem"}`);
    console.log(`  tartalmaz analytics.readonly scope-ot: ${scopes.includes(ANALYTICS_READONLY_SCOPE) ? "igen" : "nem"}`);
  } catch {
    console.log("  HIBA: a token JSON nem olvasható biztonságosan.");
    hasProblem = true;
  }
}
