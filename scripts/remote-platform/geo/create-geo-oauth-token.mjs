import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GEO_SCOPES = [
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/analytics.readonly"
];
const DEFAULT_REDIRECT_URI = "http://127.0.0.1:53683/oauth2callback";

await loadEnv();

const clientPath = process.env.GEO_OAUTH_CLIENT_JSON || process.env.GEO_GSC_OAUTH_CLIENT_JSON;
const tokenPath = process.env.GEO_OAUTH_TOKEN_JSON || ".secrets/dandelion-geo-token.json";

if (!clientPath) {
  console.error("HIÁNYZIK: állítsd be a GEO_OAUTH_CLIENT_JSON változót a .env fájlban.");
  process.exit(1);
}

if (!existsSync(clientPath)) {
  console.error(`HIÁNYZIK: OAuth client JSON nem található: ${clientPath}`);
  console.error("Töltsd le a Google Cloud Console-ból az installed/desktop OAuth client JSON-t, majd tedd erre az útvonalra.");
  process.exit(1);
}

const client = loadOAuthClient(clientPath);
const redirectUri = chooseRedirectUri(client);
const authUrl = buildAuthUrl(client, redirectUri);

console.log("Dandelion GEO kombinált OAuth token létrehozás");
console.log("");
console.log("Nyisd meg ezt az URL-t böngészőben, jelentkezz be azzal a Google fiókkal, amelyik látja a Search Console propertyt és a GA4 propertyt, majd hagyd jóvá a hozzáférést:");
console.log(authUrl.toString());
console.log("");
console.log("Kért scope-ok:");
for (const scope of GEO_SCOPES) {
  console.log(`- ${scope}`);
}
console.log("");
console.log("A jóváhagyás után a helyi callback oldal jelzi a befejezést. Token értékeket a script nem ír ki.");

const code = await waitForOAuthCode(redirectUri);
const token = await exchangeCodeForToken({ client, code, redirectUri });
saveToken(tokenPath, token);

console.log("");
console.log(`OK: kombinált GEO OAuth token mentve ide: ${tokenPath}`);
console.log("A token tartalmát nem írtam ki.");

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

function loadOAuthClient(filePath) {
  const payload = JSON.parse(readFileSync(path.resolve(filePath), "utf8"));
  const client = payload.installed || payload.web;

  if (!client?.client_id || !client?.client_secret) {
    throw new Error("Az OAuth client JSON nem tartalmazza a szükséges client_id és client_secret mezőket.");
  }

  return client;
}

function chooseRedirectUri(client) {
  const redirectUris = Array.isArray(client.redirect_uris) ? client.redirect_uris : [];
  return redirectUris.find((uri) => {
    try {
      const parsedUri = new URL(uri);
      return ["127.0.0.1", "localhost"].includes(parsedUri.hostname) && Boolean(parsedUri.port);
    } catch {
      return false;
    }
  }) || DEFAULT_REDIRECT_URI;
}

function buildAuthUrl(client, redirectUri) {
  const authUrl = new URL(AUTH_URL);
  authUrl.searchParams.set("client_id", client.client_id);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", GEO_SCOPES.join(" "));
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");
  return authUrl;
}

function waitForOAuthCode(redirectUri) {
  return new Promise((resolve, reject) => {
    const redirectUrl = new URL(redirectUri);
    const server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url || "/", redirectUri);
      const code = requestUrl.searchParams.get("code");
      const error = requestUrl.searchParams.get("error");

      response.setHeader("Content-Type", "text/plain; charset=utf-8");

      if (error) {
        response.end(`OAuth hiba: ${error}`);
        server.close();
        reject(new Error(`OAuth jóváhagyás sikertelen: ${error}`));
        return;
      }

      if (!code) {
        response.end("Hiányzó OAuth code.");
        return;
      }

      response.end("Dandelion GEO kombinált OAuth jóváhagyás kész. Visszatérhetsz a terminálhoz.");
      server.close();
      resolve(code);
    });

    server.listen(Number(redirectUrl.port), redirectUrl.hostname);
  });
}

async function exchangeCodeForToken({ client, code, redirectUri }) {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: client.client_id,
      client_secret: client.client_secret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code"
    })
  });

  const token = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth token csere sikertelen. HTTP státusz: ${response.status}`);
  }

  return token;
}

function saveToken(filePath, token) {
  const resolvedPath = path.resolve(filePath);
  mkdirSync(path.dirname(resolvedPath), { recursive: true });
  writeFileSync(resolvedPath, `${JSON.stringify(token, null, 2)}\n`);
}
