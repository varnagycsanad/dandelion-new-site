import { createSign } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GA4_API_BASE = "https://analyticsdata.googleapis.com/v1beta";
const ANALYTICS_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const OAUTH_REDIRECT_URI = "http://127.0.0.1:53682/oauth2callback";
const DEFAULT_OAUTH_TOKEN_PATH = "tmp/ga4-oauth-token.json";

const REPORTS = {
  overview: {
    title: "GA4 overview by day",
    dimensions: ["date"],
    metrics: ["activeUsers", "sessions", "screenPageViews", "eventCount"],
    orderBys: [{ dimension: { dimensionName: "date" } }]
  },
  pages: {
    title: "Top pages",
    dimensions: ["pagePathPlusQueryString"],
    metrics: ["screenPageViews", "activeUsers", "sessions"],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }]
  },
  landing: {
    title: "Top landing pages",
    dimensions: ["landingPagePlusQueryString"],
    metrics: ["sessions", "activeUsers", "screenPageViews"],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }]
  },
  sources: {
    title: "Traffic sources",
    dimensions: ["sessionDefaultChannelGroup", "sessionSourceMedium"],
    metrics: ["sessions", "activeUsers", "screenPageViews"],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }]
  },
  devices: {
    title: "Device categories",
    dimensions: ["deviceCategory"],
    metrics: ["sessions", "activeUsers", "screenPageViews"],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }]
  },
  countries: {
    title: "Countries",
    dimensions: ["country"],
    metrics: ["sessions", "activeUsers", "screenPageViews"],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }]
  },
  events: {
    title: "Top events",
    dimensions: ["eventName"],
    metrics: ["eventCount", "activeUsers"],
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }]
  }
};

function printHelp() {
  const names = Object.keys(REPORTS).join(", ");
  console.log(`GA4 report helper

Usage:
  node scripts/ga4-report.mjs <report> [options]
  node scripts/ga4-report.mjs auth

Reports:
  ${names}

Options:
  --days <number>       Relative date range ending yesterday. Default: 30
  --start <YYYY-MM-DD>  Start date. Overrides --days when --end is also set.
  --end <YYYY-MM-DD>    End date. Overrides --days when --start is also set.
  --limit <number>      Row limit. Default: 25
  --format <md|json|csv> Output format. Default: md

Required env:
  GA_PROPERTY_ID
  GA_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS
  or GA_OAUTH_CLIENT_JSON plus a token created with the auth command

Examples:
  node scripts/ga4-report.mjs auth
  node scripts/ga4-report.mjs overview --days 30
  node scripts/ga4-report.mjs pages --days 90 --limit 50 --format csv
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
  const args = {
    report: argv[2],
    days: 30,
    limit: 25,
    format: "md",
    tokenPath: process.env.GA_OAUTH_TOKEN_JSON || DEFAULT_OAUTH_TOKEN_PATH
  };

  if (args.report === "--help" || args.report === "-h") {
    args.help = true;
    args.report = undefined;
    return args;
  }

  for (let index = 3; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--days") {
      args.days = Number(next);
      index += 1;
    } else if (arg === "--start" || arg === "--startDate") {
      args.startDate = next;
      index += 1;
    } else if (arg === "--end" || arg === "--endDate") {
      args.endDate = next;
      index += 1;
    } else if (arg === "--limit") {
      args.limit = Number(next);
      index += 1;
    } else if (arg === "--format") {
      args.format = next;
      index += 1;
    } else if (arg === "--token") {
      args.tokenPath = next;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return args;
}

function resolveDateRange(args) {
  if (args.startDate && args.endDate) {
    return { startDate: args.startDate, endDate: args.endDate };
  }

  if (!Number.isInteger(args.days) || args.days < 1) {
    throw new Error("--days must be a positive integer.");
  }

  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - args.days + 1);

  return {
    startDate: toIsoDate(start),
    endDate: toIsoDate(end)
  };
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function loadServiceAccount() {
  const credentialPath = process.env.GA_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialPath) {
    throw new Error("Set GA_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS to a service account JSON file.");
  }

  const resolvedPath = path.resolve(credentialPath);
  const credentials = JSON.parse(readFileSync(resolvedPath, "utf8"));

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("Service account JSON must include client_email and private_key.");
  }

  return credentials;
}

function loadOAuthClient() {
  const clientPath = process.env.GA_OAUTH_CLIENT_JSON || process.env.GOOGLE_OAUTH_CLIENT_JSON;
  if (!clientPath) {
    throw new Error("Set GA_OAUTH_CLIENT_JSON to an OAuth desktop client JSON file.");
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

  console.log("Open this URL, sign in with the Google account that has GA4 access, then approve:");
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

      response.end("GA4 authorization complete. You can return to Codex.");
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
    throw new Error(`OAuth token not found at ${resolvedTokenPath}. Run: node scripts/ga4-report.mjs auth`);
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

async function resolveAccessToken(args) {
  if (process.env.GA_OAUTH_CLIENT_JSON || process.env.GOOGLE_OAUTH_CLIENT_JSON) {
    return getOAuthAccessToken(args);
  }

  const credentials = loadServiceAccount();
  return getAccessToken(credentials);
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: ANALYTICS_SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now
    })
  );
  const unsignedJwt = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedJwt);
  signer.end();
  const signature = signer.sign(credentials.private_key, "base64url");
  const jwt = `${unsignedJwt}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth token request failed: ${JSON.stringify(payload)}`);
  }

  return payload.access_token;
}

async function runReport({ accessToken, propertyId, report, dateRange, limit }) {
  const body = {
    dateRanges: [dateRange],
    dimensions: report.dimensions.map((name) => ({ name })),
    metrics: report.metrics.map((name) => ({ name })),
    orderBys: report.orderBys,
    limit
  };

  const response = await fetch(`${GA4_API_BASE}/properties/${propertyId}:runReport`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`GA4 runReport failed: ${JSON.stringify(payload)}`);
  }

  return payload;
}

function tableFromResponse(response) {
  const dimensions = response.dimensionHeaders?.map((header) => header.name) ?? [];
  const metrics = response.metricHeaders?.map((header) => header.name) ?? [];
  const headers = [...dimensions, ...metrics];
  const rows =
    response.rows?.map((row) => [
      ...(row.dimensionValues?.map((value) => value.value) ?? []),
      ...(row.metricValues?.map((value) => value.value) ?? [])
    ]) ?? [];

  return { headers, rows };
}

function formatMarkdown({ title, dateRange, table }) {
  const separator = table.headers.map(() => "---");
  const lines = [
    `# ${title}`,
    "",
    `Date range: ${dateRange.startDate} - ${dateRange.endDate}`,
    "",
    `Rows: ${table.rows.length}`,
    "",
    `| ${table.headers.join(" | ")} |`,
    `| ${separator.join(" | ")} |`,
    ...table.rows.map((row) => `| ${row.map(escapeMarkdownCell).join(" | ")} |`)
  ];

  return `${lines.join("\n")}\n`;
}

function formatCsv(table) {
  return `${[table.headers, ...table.rows].map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function escapeMarkdownCell(value) {
  return String(value).replace(/\|/g, "\\|");
}

function csvCell(value) {
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

async function main() {
  loadDotEnv();
  const args = parseArgs(process.argv);

  if (args.help || !args.report) {
    printHelp();
    return;
  }

  if (args.report === "auth") {
    await createOAuthToken(args);
    return;
  }

  const report = REPORTS[args.report];
  if (!report) {
    throw new Error(`Unknown report "${args.report}". Use --help to list reports.`);
  }

  if (!["md", "json", "csv"].includes(args.format)) {
    throw new Error("--format must be one of: md, json, csv.");
  }

  if (!Number.isInteger(args.limit) || args.limit < 1 || args.limit > 250000) {
    throw new Error("--limit must be an integer between 1 and 250000.");
  }

  const propertyId = process.env.GA_PROPERTY_ID;
  if (!propertyId) {
    throw new Error("Set GA_PROPERTY_ID in .env or the shell environment.");
  }

  const dateRange = resolveDateRange(args);
  const accessToken = await resolveAccessToken(args);
  const response = await runReport({ accessToken, propertyId, report, dateRange, limit: args.limit });
  const table = tableFromResponse(response);

  if (args.format === "json") {
    console.log(
      JSON.stringify(
        {
          report: args.report,
          title: report.title,
          propertyId,
          dateRange,
          rowCount: response.rowCount ?? table.rows.length,
          headers: table.headers,
          rows: table.rows
        },
        null,
        2
      )
    );
  } else if (args.format === "csv") {
    process.stdout.write(formatCsv(table));
  } else {
    process.stdout.write(formatMarkdown({ title: report.title, dateRange, table }));
  }
}

main().catch((error) => {
  console.error(`[ga4-report] ${error.message}`);
  process.exit(1);
});
