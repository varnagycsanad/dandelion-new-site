import { existsSync, readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const ADMIN_API_BASE = "https://analyticsadmin.googleapis.com/v1beta";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const ANALYTICS_SCOPE = "https://www.googleapis.com/auth/analytics.edit";
const OAUTH_REDIRECT_URI = "http://127.0.0.1:53684/oauth2callback";
const DEFAULT_TOKEN_PATH = ".secrets/ga4-admin-oauth-token.json";

loadDotEnv();

const args = parseArgs(process.argv);

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "auth") {
    await createOAuthToken(args);
  } else if (args.command === "property") {
    await getProperty(args);
  } else if (args.command === "data-streams") {
    await listDataStreams(args);
  } else if (args.command === "key-events") {
    await listKeyEvents(args);
  } else if (args.command === "create-key-event") {
    await createKeyEvent(args);
  } else if (args.command === "custom-dimensions") {
    await listCustomDimensions(args);
  } else if (args.command === "google-ads-links") {
    await listGoogleAdsLinks(args);
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`GA4 Admin API helper

Usage:
  node scripts/google-analytics-admin.mjs auth
  node scripts/google-analytics-admin.mjs property [--property 123456789] [--format md|json|csv]
  node scripts/google-analytics-admin.mjs data-streams [--property 123456789] [--format md|json|csv]
  node scripts/google-analytics-admin.mjs key-events [--property 123456789] [--format md|json|csv]
  node scripts/google-analytics-admin.mjs create-key-event --event dnd_booking_confirmation [--property 123456789] [--counting once-per-event|once-per-session] [--format md|json|csv]
  node scripts/google-analytics-admin.mjs custom-dimensions [--property 123456789] [--format md|json|csv]
  node scripts/google-analytics-admin.mjs google-ads-links [--property 123456789] [--format md|json|csv]

Required env:
  GA4_PROPERTY_ID or GA_PROPERTY_ID
  GA_OAUTH_CLIENT_JSON or GEO_OAUTH_CLIENT_JSON
  plus a token file created with the auth command

Optional env:
  GA_ADMIN_OAUTH_TOKEN_JSON=.secrets/ga4-admin-oauth-token.json
`);
}

function loadDotEnv(filePath = ".env") {
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

function parseArgs(argv) {
  const parsed = {
    command: argv[2],
    format: "md",
    propertyId: process.env.GA4_PROPERTY_ID || process.env.GA_PROPERTY_ID,
    tokenPath: process.env.GA_ADMIN_OAUTH_TOKEN_JSON || DEFAULT_TOKEN_PATH,
    countingMethod: "once-per-event"
  };

  if (parsed.command === "--help" || parsed.command === "-h") {
    parsed.help = true;
    parsed.command = undefined;
    return parsed;
  }

  for (let index = 3; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--property") {
      parsed.propertyId = next;
      index += 1;
    } else if (arg === "--event") {
      parsed.eventName = next;
      index += 1;
    } else if (arg === "--counting") {
      parsed.countingMethod = next;
      index += 1;
    } else if (arg === "--token") {
      parsed.tokenPath = next;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function normalizePropertyId(propertyId) {
  if (!propertyId) {
    throw new Error("Missing GA4 property ID.");
  }

  const normalized = String(propertyId).replace(/^properties\//, "").trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error("GA4 property ID must be numeric.");
  }

  return normalized;
}

function resolvePropertyResourceName(args) {
  return `properties/${normalizePropertyId(args.propertyId)}`;
}

function loadOAuthClient() {
  const clientPath =
    process.env.GA_OAUTH_CLIENT_JSON ||
    process.env.GEO_OAUTH_CLIENT_JSON ||
    process.env.GOOGLE_OAUTH_CLIENT_JSON;

  if (!clientPath) {
    throw new Error("Set GA_OAUTH_CLIENT_JSON or GEO_OAUTH_CLIENT_JSON to an OAuth client JSON file.");
  }

  const payload = JSON.parse(readFileSync(path.resolve(clientPath), "utf8"));
  const client = payload.installed || payload.web;
  if (!client?.client_id || !client?.client_secret) {
    throw new Error("OAuth client JSON must include installed.client_id and installed.client_secret.");
  }

  return client;
}

async function createOAuthToken({ tokenPath }) {
  const client = loadOAuthClient();
  const authLink = new URL(AUTH_URL);
  authLink.searchParams.set("client_id", client.client_id);
  authLink.searchParams.set("redirect_uri", OAUTH_REDIRECT_URI);
  authLink.searchParams.set("response_type", "code");
  authLink.searchParams.set("scope", ANALYTICS_SCOPE);
  authLink.searchParams.set("access_type", "offline");
  authLink.searchParams.set("prompt", "consent");

  console.log("Open this URL, sign in with the Google account that has GA4 admin access, then approve:");
  console.log(authLink.toString());

  const code = await waitForOAuthCode();
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: client.client_id,
      client_secret: client.client_secret,
      redirect_uri: OAUTH_REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  const token = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth code exchange failed: ${JSON.stringify(token)}`);
  }

  const resolvedTokenPath = path.resolve(tokenPath);
  writeFileSync(resolvedTokenPath, `${JSON.stringify(token, null, 2)}\n`);
  console.log(`Saved OAuth token to ${resolvedTokenPath}`);
}

function waitForOAuthCode() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((request, response) => {
      const requestUrl = new URL(request.url || "/", OAUTH_REDIRECT_URI);
      const code = requestUrl.searchParams.get("code");
      const error = requestUrl.searchParams.get("error");

      response.setHeader("Content-Type", "text/plain; charset=utf-8");
      if (error) {
        response.end(`OAuth error: ${error}`);
        server.close();
        reject(new Error(`OAuth authorization failed: ${error}`));
        return;
      }

      if (!code) {
        response.end("Missing OAuth code.");
        return;
      }

      response.end("GA4 Admin authorization complete. You can return to Codex.");
      server.close();
      resolve(code);
    });

    server.listen(new URL(OAUTH_REDIRECT_URI).port, "127.0.0.1");
  });
}

async function getOAuthAccessToken({ tokenPath }) {
  const client = loadOAuthClient();
  const resolvedTokenPath = path.resolve(tokenPath);
  if (!existsSync(resolvedTokenPath)) {
    throw new Error(`OAuth token not found at ${resolvedTokenPath}. Run: node scripts/google-analytics-admin.mjs auth`);
  }

  const token = JSON.parse(readFileSync(resolvedTokenPath, "utf8"));
  if (!token.refresh_token) {
    throw new Error("OAuth token file does not include refresh_token. Re-run auth.");
  }

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

  const refreshedToken = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth refresh failed: ${JSON.stringify(refreshedToken)}`);
  }

  return refreshedToken.access_token;
}

async function adminRequest(resourcePath, args, options = {}) {
  const { method = "GET", body } = options;
  const accessToken = await getOAuthAccessToken(args);
  const url = new URL(`${ADMIN_API_BASE}/${resourcePath.replace(/^\/+/, "")}`);
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    ...(body ? { body: JSON.stringify(body) } : {})
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(`GA4 Admin API ${response.status}: ${data?.error?.message || response.statusText}`);
  }

  return data;
}

async function getProperty(args) {
  const property = await adminRequest(resolvePropertyResourceName(args), args);
  const rows = [
    {
      name: property.name,
      displayName: property.displayName,
      propertyType: property.propertyType,
      industryCategory: property.industryCategory,
      timeZone: property.timeZone,
      currencyCode: property.currencyCode,
      serviceLevel: property.serviceLevel
    }
  ];

  printRows(rows, args.format, [
    ["name", "Name"],
    ["displayName", "Display name"],
    ["propertyType", "Type"],
    ["industryCategory", "Industry"],
    ["timeZone", "Time zone"],
    ["currencyCode", "Currency"],
    ["serviceLevel", "Service level"]
  ]);
}

async function listDataStreams(args) {
  const result = await adminRequest(`${resolvePropertyResourceName(args)}/dataStreams`, args);
  const rows = (result.dataStreams || []).map((stream) => ({
    name: stream.name,
    displayName: stream.displayName,
    type: stream.type,
    uri: stream.webStreamData?.defaultUri || "",
    measurementId: stream.webStreamData?.measurementId || ""
  }));

  printRows(rows, args.format, [
    ["name", "Name"],
    ["displayName", "Display name"],
    ["type", "Type"],
    ["uri", "Default URI"],
    ["measurementId", "Measurement ID"]
  ]);
}

async function listKeyEvents(args) {
  const result = await adminRequest(`${resolvePropertyResourceName(args)}/keyEvents`, args);
  const rows = (result.keyEvents || []).map((keyEvent) => ({
    name: keyEvent.name,
    eventName: keyEvent.eventName,
    countingMethod: keyEvent.countingMethod,
    createTime: keyEvent.createTime,
    deletable: keyEvent.deletable
  }));

  printRows(rows, args.format, [
    ["name", "Name"],
    ["eventName", "Event name"],
    ["countingMethod", "Counting"],
    ["createTime", "Created"],
    ["deletable", "Deletable"]
  ]);
}

function normalizeCountingMethod(value) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase()
    .replace(/-/g, "_");

  if (normalized === "ONCE_PER_EVENT" || normalized === "ONCE_PER_SESSION") {
    return normalized;
  }

  throw new Error("Counting method must be once-per-event or once-per-session.");
}

async function createKeyEvent(args) {
  const eventName = String(args.eventName || "").trim();
  if (!eventName) {
    throw new Error("Missing --event <event_name>.");
  }

  const keyEvent = await adminRequest(`${resolvePropertyResourceName(args)}/keyEvents`, args, {
    method: "POST",
    body: {
      eventName,
      countingMethod: normalizeCountingMethod(args.countingMethod)
    }
  });

  const rows = [
    {
      name: keyEvent.name,
      eventName: keyEvent.eventName,
      countingMethod: keyEvent.countingMethod,
      createTime: keyEvent.createTime,
      deletable: keyEvent.deletable
    }
  ];

  printRows(rows, args.format, [
    ["name", "Name"],
    ["eventName", "Event name"],
    ["countingMethod", "Counting"],
    ["createTime", "Created"],
    ["deletable", "Deletable"]
  ]);
}

async function listCustomDimensions(args) {
  const result = await adminRequest(`${resolvePropertyResourceName(args)}/customDimensions`, args);
  const rows = (result.customDimensions || []).map((dimension) => ({
    name: dimension.name,
    parameterName: dimension.parameterName,
    displayName: dimension.displayName,
    scope: dimension.scope,
    disallowAdsPersonalization: dimension.disallowAdsPersonalization
  }));

  printRows(rows, args.format, [
    ["name", "Name"],
    ["parameterName", "Parameter"],
    ["displayName", "Display name"],
    ["scope", "Scope"],
    ["disallowAdsPersonalization", "Ads personalization off"]
  ]);
}

async function listGoogleAdsLinks(args) {
  const result = await adminRequest(`${resolvePropertyResourceName(args)}/googleAdsLinks`, args);
  const rows = (result.googleAdsLinks || []).map((link) => ({
    name: link.name,
    customerId: link.customerId,
    canManageClients: link.canManageClients,
    adsPersonalizationEnabled: link.adsPersonalizationEnabled,
    createTime: link.createTime
  }));

  printRows(rows, args.format, [
    ["name", "Name"],
    ["customerId", "Customer ID"],
    ["canManageClients", "Can manage clients"],
    ["adsPersonalizationEnabled", "Ads personalization"],
    ["createTime", "Created"]
  ]);
}

function printRows(rows, format, columns) {
  if (format === "json") {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  if (format === "csv") {
    const header = columns.map(([, label]) => escapeCsv(label)).join(",");
    const body = rows
      .map((row) => columns.map(([key]) => escapeCsv(row[key] ?? "")).join(","))
      .join("\n");
    console.log([header, body].filter(Boolean).join("\n"));
    return;
  }

  const labels = columns.map(([, label]) => label);
  const widths = columns.map(([key], index) =>
    Math.max(labels[index].length, ...rows.map((row) => String(row[key] ?? "").length))
  );

  const header = labels.map((label, index) => label.padEnd(widths[index])).join(" | ");
  const separator = widths.map((width) => "-".repeat(width)).join(" | ");
  const lines = rows.map((row) =>
    columns.map(([key], index) => String(row[key] ?? "").padEnd(widths[index])).join(" | ")
  );

  console.log([header, separator, ...lines].join("\n"));
}

function escapeCsv(value) {
  const text = String(value ?? "");
  if (!/[",\n]/.test(text)) {
    return text;
  }
  return `"${text.replace(/"/g, "\"\"")}"`;
}
