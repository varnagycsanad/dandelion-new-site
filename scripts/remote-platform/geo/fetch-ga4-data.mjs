import { createSign } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const GA4_API_BASE = "https://analyticsdata.googleapis.com/v1beta";
const ANALYTICS_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const OUTPUT_DIR = "data/geo/raw";

process.on("uncaughtException", handleFatalError);
process.on("unhandledRejection", handleFatalError);

await loadEnv();

const propertyId = process.env.GA4_PROPERTY_ID || process.env.GA_PROPERTY_ID;
if (!propertyId) {
  throw new Error("Hiányzó környezeti változó: GA4_PROPERTY_ID");
}

const accessToken = await resolveAccessToken();
const dateRange = getLast28Days();
const today = formatDate(new Date());

mkdirSync(OUTPUT_DIR, { recursive: true });

const pages = await runReport({
  accessToken,
  propertyId,
  dimensions: [{ name: "pagePath" }],
  metrics: [
    { name: "activeUsers" },
    { name: "sessions" },
    { name: "screenPageViews" },
    { name: "eventCount" }
  ],
  startDate: dateRange.startDate,
  endDate: dateRange.endDate,
  limit: 100
});

const events = await runReport({
  accessToken,
  propertyId,
  dimensions: [{ name: "eventName" }],
  metrics: [{ name: "eventCount" }],
  startDate: dateRange.startDate,
  endDate: dateRange.endDate,
  limit: 100
});

const pagesPath = path.join(OUTPUT_DIR, `ga4_pages_${today}.json`);
const eventsPath = path.join(OUTPUT_DIR, `ga4_events_${today}.json`);

writeJson(pagesPath, pages);
writeJson(eventsPath, events);

console.log("GA4 teszt lekérdezés kész.");
console.log(`Időszak: ${dateRange.startDate} - ${dateRange.endDate}`);
console.log(`Pages sorok: ${pages.rows?.length || 0}`);
console.log(`Events sorok: ${events.rows?.length || 0}`);
console.log(`Mentve: ${pagesPath}`);
console.log(`Mentve: ${eventsPath}`);

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

function loadServiceAccount(filePath) {
  const credentials = JSON.parse(readFileSync(path.resolve(filePath), "utf8"));
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("A service account JSON nem tartalmazza a szükséges mezőket.");
  }
  return credentials;
}

async function resolveAccessToken() {
  if (process.env.GA_OAUTH_CLIENT_JSON && process.env.GA_OAUTH_TOKEN_JSON) {
    const client = loadOAuthClient(process.env.GA_OAUTH_CLIENT_JSON);
    const token = loadOAuthToken(process.env.GA_OAUTH_TOKEN_JSON);
    return refreshOAuthAccessToken({ client, token });
  }

  if (process.env.GEO_OAUTH_CLIENT_JSON && process.env.GEO_OAUTH_TOKEN_JSON) {
    const client = loadOAuthClient(process.env.GEO_OAUTH_CLIENT_JSON);
    const token = loadOAuthToken(process.env.GEO_OAUTH_TOKEN_JSON);
    return refreshOAuthAccessToken({ client, token });
  }

  if (process.env.GA_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.log("FIGYELEM: nincs mukodo GA4 OAuth token, GA4 service account fallback indul.");
    const credentials = loadServiceAccount(process.env.GA_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS);
    return getServiceAccountAccessToken(credentials);
  }

  throw new Error(
    "Hiányzó GA4 auth beállítás. Használd a GA_OAUTH_CLIENT_JSON + GA_OAUTH_TOKEN_JSON párost, vagy állíts be GA_SERVICE_ACCOUNT_JSON-t."
  );
}

function loadOAuthClient(filePath) {
  const payload = JSON.parse(readFileSync(path.resolve(filePath), "utf8"));
  const client = payload.installed || payload.web;

  if (!client?.client_id || !client?.client_secret) {
    throw new Error("Az OAuth client JSON nem tartalmazza a szükséges mezőket.");
  }

  return client;
}

function loadOAuthToken(filePath) {
  const token = JSON.parse(readFileSync(path.resolve(filePath), "utf8"));
  if (!token.refresh_token) {
    throw new Error("A GEO OAuth token fájl nem tartalmaz refresh_token mezőt.");
  }

  const scopes = typeof token.scope === "string" ? token.scope.split(/\s+/).filter(Boolean) : [];
  if (!scopes.includes(ANALYTICS_SCOPE)) {
    throw new Error("A GEO OAuth token nem tartalmaz analytics.readonly scope-ot. Futtasd újra: npm run geo:create-token");
  }

  return token;
}

async function refreshOAuthAccessToken({ client, token }) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: client.client_id,
      client_secret: client.client_secret,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token"
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`GA4 OAuth token frissítés sikertelen. HTTP státusz: ${response.status}. ${safeApiMessage(payload)}`);
  }

  return payload.access_token;
}

async function getServiceAccountAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(JSON.stringify({
    iss: credentials.client_email,
    scope: ANALYTICS_SCOPE,
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now
  }));
  const unsignedJwt = `${header}.${claim}`;
  const signature = createSign("RSA-SHA256").update(unsignedJwt).sign(credentials.private_key);
  const assertion = `${unsignedJwt}.${base64Url(signature)}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`GA4 service account token kérés sikertelen. HTTP státusz: ${response.status}. ${safeApiMessage(payload)}`);
  }

  return payload.access_token;
}

async function runReport({ accessToken, propertyId, dimensions, metrics, startDate, endDate, limit }) {
  const response = await fetch(`${GA4_API_BASE}/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dateRanges: [{ startDate, endDate }],
      dimensions,
      metrics,
      limit
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`GA4 Data API hiba. HTTP státusz: ${response.status}. ${safeApiMessage(payload)}`);
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

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
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
