import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const GSC_API_BASE = "https://www.googleapis.com/webmasters/v3";
const WEBMASTERS_READONLY_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const OUTPUT_DIR = "data/geo/raw";

process.on("uncaughtException", handleFatalError);
process.on("unhandledRejection", handleFatalError);

await loadEnv();

const siteUrl = requireEnv("GEO_GSC_SITE_URL");
const clientPath = process.env.GEO_OAUTH_CLIENT_JSON || requireEnv("GEO_GSC_OAUTH_CLIENT_JSON");
const tokenPath = process.env.GEO_OAUTH_TOKEN_JSON || requireEnv("GEO_GSC_OAUTH_TOKEN_JSON");

const client = loadOAuthClient(clientPath);
const storedToken = loadToken(tokenPath);
const accessToken = await refreshAccessToken({ client, storedToken });
const dateRange = getLast28Days();
const today = formatDate(new Date());

mkdirSync(OUTPUT_DIR, { recursive: true });

const queries = await fetchSearchAnalytics({
  accessToken,
  siteUrl,
  startDate: dateRange.startDate,
  endDate: dateRange.endDate,
  dimensions: ["query"],
  rowLimit: 100
});

const pages = await fetchSearchAnalytics({
  accessToken,
  siteUrl,
  startDate: dateRange.startDate,
  endDate: dateRange.endDate,
  dimensions: ["page"],
  rowLimit: 100
});

const queriesPath = path.join(OUTPUT_DIR, `gsc_queries_${today}.json`);
const pagesPath = path.join(OUTPUT_DIR, `gsc_pages_${today}.json`);

writeJson(queriesPath, queries);
writeJson(pagesPath, pages);

console.log("GSC teszt lekérdezés kész.");
console.log(`Időszak: ${dateRange.startDate} - ${dateRange.endDate}`);
console.log(`Queries sorok: ${queries.rows?.length || 0}`);
console.log(`Pages sorok: ${pages.rows?.length || 0}`);
console.log(`Mentve: ${queriesPath}`);
console.log(`Mentve: ${pagesPath}`);

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

function requireEnv(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Hiányzó környezeti változó: ${key}`);
  }
  return value;
}

function loadOAuthClient(filePath) {
  const payload = JSON.parse(readFileSync(path.resolve(filePath), "utf8"));
  const client = payload.installed || payload.web;

  if (!client?.client_id || !client?.client_secret) {
    throw new Error("Az OAuth client JSON nem tartalmazza a szükséges mezőket.");
  }

  return client;
}

function loadToken(filePath) {
  const token = JSON.parse(readFileSync(path.resolve(filePath), "utf8"));
  if (!token.refresh_token) {
    throw new Error("A GEO/GSC OAuth token fájl nem tartalmaz refresh_token mezőt.");
  }

  const scopes = typeof token.scope === "string" ? token.scope.split(/\s+/).filter(Boolean) : [];
  if (!scopes.includes(WEBMASTERS_READONLY_SCOPE)) {
    throw new Error("A GEO/GSC OAuth token nem tartalmaz webmasters.readonly scope-ot. Futtasd újra: npm run geo:create-token");
  }
  return token;
}

async function refreshAccessToken({ client, storedToken }) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: client.client_id,
      client_secret: client.client_secret,
      refresh_token: storedToken.refresh_token,
      grant_type: "refresh_token"
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`GSC OAuth token frissítés sikertelen. HTTP státusz: ${response.status}. ${safeApiMessage(payload)}`);
  }

  return payload.access_token;
}

async function fetchSearchAnalytics({ accessToken, siteUrl, startDate, endDate, dimensions, rowLimit }) {
  const endpoint = `${GSC_API_BASE}/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate,
      endDate,
      dimensions,
      rowLimit
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`GSC Search Analytics hiba. HTTP státusz: ${response.status}. ${safeApiMessage(payload)}`);
  }

  return payload;
}

function getLast28Days() {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - 27);

  return {
    startDate: formatDate(start),
    endDate: formatDate(end)
  };
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function writeJson(filePath, payload) {
  writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function safeApiMessage(payload) {
  return payload?.error?.message || payload?.error_description || "Nincs részletes API hibaüzenet.";
}

function handleFatalError(error) {
  console.error(`HIBA: ${error?.message || "Ismeretlen hiba."}`);
  process.exit(1);
}
