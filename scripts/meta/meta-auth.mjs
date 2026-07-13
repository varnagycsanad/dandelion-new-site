import { existsSync, readFileSync, writeFileSync } from "node:fs";

const DEFAULT_VERSION = "v25.0";
const OAUTH_DIALOG_URL = "https://www.facebook.com";
const GRAPH_HOST = "https://graph.facebook.com";
const DEFAULT_SCOPES = [
  "pages_show_list",
  "pages_read_engagement",
  "pages_manage_posts",
  "ads_management",
  "ads_read",
  "business_management",
  "public_profile"
];

await loadEnv();

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "auth-url") {
    printAuthUrl(args);
  } else if (args.command === "exchange-code") {
    await exchangeCode(args);
  } else if (args.command === "extend-token") {
    await extendToken(args);
  } else if (args.command === "inspect-token") {
    await inspectToken(args);
  } else if (args.command === "save-token") {
    saveTokenToEnv(args);
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Meta auth helper for Dandelion

Usage:
  node scripts/meta/meta-auth.mjs auth-url [--app-id 123] [--scope pages_manage_posts] [--response-type code|token] [--redirect-uri "https://..."] [--state "custom"] [--format md|json]
  node scripts/meta/meta-auth.mjs exchange-code --code "..." [--app-id 123] [--app-secret "..."] [--redirect-uri "https://..."] [--format md|json]
  node scripts/meta/meta-auth.mjs extend-token [--access-token "..."] [--app-id 123] [--app-secret "..."] [--format md|json]
  node scripts/meta/meta-auth.mjs inspect-token [--access-token "..."] [--app-id 123] [--app-secret "..."] [--format md|json]
  node scripts/meta/meta-auth.mjs save-token --access-token "..." [--env-file ".env"] [--page-id 1234567890]

Required env for auth-url:
  META_APP_ID
  META_REDIRECT_URI

Required env for exchange-code / extend-token / inspect-token:
  META_APP_ID
  META_APP_SECRET

Optional env:
  META_GRAPH_VERSION=v25.0
  META_ACCESS_TOKEN=...
  META_PAGE_ID=1234567890

Notes:
  auth-url defaults to a code flow because that is the cleanest path to exchanging and extending the token.
  The default scope set includes pages_manage_posts for Facebook Page posting.
`);
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

function parseArgs(argv) {
  const parsed = {
    command: argv[0],
    format: "md",
    scopes: []
  };

  if (parsed.command === "--help" || parsed.command === "-h") {
    parsed.help = true;
    parsed.command = undefined;
    return parsed;
  }

  for (let index = 1; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--scope") {
      parsed.scopes.push(next);
      index += 1;
    } else if (arg === "--response-type") {
      parsed.responseType = next;
      index += 1;
    } else if (arg === "--app-id") {
      parsed.appId = next;
      index += 1;
    } else if (arg === "--app-secret") {
      parsed.appSecret = next;
      index += 1;
    } else if (arg === "--redirect-uri") {
      parsed.redirectUri = next;
      index += 1;
    } else if (arg === "--state") {
      parsed.state = next;
      index += 1;
    } else if (arg === "--code") {
      parsed.code = next;
      index += 1;
    } else if (arg === "--access-token") {
      parsed.accessToken = next;
      index += 1;
    } else if (arg === "--env-file") {
      parsed.envFile = next;
      index += 1;
    } else if (arg === "--page-id") {
      parsed.pageId = next;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Set ${name} in .env.`);
  }
  return value;
}

function getVersion() {
  return process.env.META_GRAPH_VERSION || DEFAULT_VERSION;
}

function getAppId(args) {
  return args.appId || requireEnv("META_APP_ID");
}

function getAppSecret(args) {
  return args.appSecret || requireEnv("META_APP_SECRET");
}

function getRedirectUri(args) {
  return args.redirectUri || requireEnv("META_REDIRECT_URI");
}

function getAccessToken(args) {
  return args.accessToken || process.env.META_ACCESS_TOKEN || "";
}

function getNormalizedScopes(args) {
  const source = args.scopes.length ? args.scopes : DEFAULT_SCOPES;
  const normalized = [];

  for (const rawScope of source) {
    const parts = String(rawScope || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    for (const part of parts) {
      if (!normalized.includes(part)) {
        normalized.push(part);
      }
    }
  }

  return normalized;
}

function printAuthUrl(args) {
  const responseType = args.responseType || "code";
  if (!["code", "token"].includes(responseType)) {
    throw new Error("--response-type must be code or token.");
  }

  const scopes = getNormalizedScopes(args);
  const url = new URL(`${OAUTH_DIALOG_URL}/${getVersion()}/dialog/oauth`);
  url.searchParams.set("client_id", getAppId(args));
  url.searchParams.set("redirect_uri", getRedirectUri(args));
  url.searchParams.set("response_type", responseType);
  url.searchParams.set("scope", scopes.join(","));

  if (args.state) {
    url.searchParams.set("state", args.state);
  }

  printRows(
    [
      {
        response_type: responseType,
        redirect_uri: getRedirectUri(args),
        scopes: scopes.join(", "),
        auth_url: url.toString()
      }
    ],
    args.format,
    [
      ["response_type", "Response type"],
      ["redirect_uri", "Redirect URI"],
      ["scopes", "Scopes"],
      ["auth_url", "Auth URL"]
    ]
  );
}

async function exchangeCode(args) {
  if (!args.code) {
    throw new Error("Missing --code.");
  }

  const url = new URL(`${GRAPH_HOST}/${getVersion()}/oauth/access_token`);
  url.searchParams.set("client_id", getAppId(args));
  url.searchParams.set("client_secret", getAppSecret(args));
  url.searchParams.set("redirect_uri", getRedirectUri(args));
  url.searchParams.set("code", args.code);

  const payload = await fetchJson(url);
  printTokenRows(payload, args.format, "short_lived_user_token");
}

async function extendToken(args) {
  const accessToken = getAccessToken(args);
  if (!accessToken) {
    throw new Error("Missing --access-token and META_ACCESS_TOKEN is not set.");
  }

  const url = new URL(`${GRAPH_HOST}/${getVersion()}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", getAppId(args));
  url.searchParams.set("client_secret", getAppSecret(args));
  url.searchParams.set("fb_exchange_token", accessToken);

  const payload = await fetchJson(url);
  printTokenRows(payload, args.format, "long_lived_user_token");
}

async function inspectToken(args) {
  const accessToken = getAccessToken(args);
  if (!accessToken) {
    throw new Error("Missing --access-token and META_ACCESS_TOKEN is not set.");
  }

  const debugUrl = new URL(`${GRAPH_HOST}/${getVersion()}/debug_token`);
  debugUrl.searchParams.set("input_token", accessToken);
  debugUrl.searchParams.set("access_token", `${getAppId(args)}|${getAppSecret(args)}`);

  const debugPayload = await fetchJson(debugUrl);
  const permissionUrl = new URL(`${GRAPH_HOST}/${getVersion()}/me/permissions`);
  permissionUrl.searchParams.set("limit", "500");
  permissionUrl.searchParams.set("access_token", accessToken);

  const profileUrl = new URL(`${GRAPH_HOST}/${getVersion()}/me`);
  profileUrl.searchParams.set("fields", "id,name");
  profileUrl.searchParams.set("access_token", accessToken);

  const [permissionsPayload, profilePayload] = await Promise.all([
    fetchJson(permissionUrl),
    fetchJson(profileUrl)
  ]);

  const grantedPermissions = (permissionsPayload.data || [])
    .filter((item) => item.status === "granted")
    .map((item) => item.permission)
    .sort();

  const scopes = Array.isArray(debugPayload.data?.scopes) ? debugPayload.data.scopes.slice().sort() : [];

  printRows(
    [
      {
        app_id: String(debugPayload.data?.app_id || ""),
        user_id: String(debugPayload.data?.user_id || profilePayload.id || ""),
        user_name: profilePayload.name || "",
        expires_at: formatUnixTimestamp(debugPayload.data?.expires_at),
        data_access_expires_at: formatUnixTimestamp(debugPayload.data?.data_access_expires_at),
        is_valid: String(Boolean(debugPayload.data?.is_valid)),
        granted_permissions: grantedPermissions.join(", "),
        debug_scopes: scopes.join(", ")
      }
    ],
    args.format,
    [
      ["app_id", "App ID"],
      ["user_id", "User ID"],
      ["user_name", "User name"],
      ["expires_at", "Expires at"],
      ["data_access_expires_at", "Data access expires"],
      ["is_valid", "Is valid"],
      ["granted_permissions", "Granted permissions"],
      ["debug_scopes", "Debug scopes"]
    ]
  );
}

function saveTokenToEnv(args) {
  const accessToken = getAccessToken(args);
  if (!accessToken) {
    throw new Error("Missing --access-token and META_ACCESS_TOKEN is not set.");
  }

  const envFile = args.envFile || ".env";
  const pageId = args.pageId ? normalizeDigits(args.pageId, "page ID") : "";
  const existing = existsSync(envFile) ? readFileSync(envFile, "utf8") : "";
  let next = upsertEnvValue(existing, "META_ACCESS_TOKEN", accessToken);

  if (pageId) {
    next = upsertEnvValue(next, "META_PAGE_ID", pageId);
  }

  if (!next.endsWith("\n")) {
    next += "\n";
  }

  writeFileSync(envFile, next, "utf8");

  printRows(
    [
      {
        env_file: envFile,
        meta_access_token: "updated",
        meta_page_id: pageId ? "updated" : "unchanged"
      }
    ],
    args.format,
    [
      ["env_file", "Env file"],
      ["meta_access_token", "META_ACCESS_TOKEN"],
      ["meta_page_id", "META_PAGE_ID"]
    ]
  );
}

function upsertEnvValue(content, key, value) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`^${escapedKey}=.*$`, "m");
  const line = `${key}=${value}`;

  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }

  if (!content) {
    return line;
  }

  if (content.endsWith("\n")) {
    return `${content}${line}`;
  }

  return `${content}\n${line}`;
}

async function fetchJson(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    const detail = data.error?.message || response.statusText;
    throw new Error(`Meta API ${response.status}: ${detail}`);
  }

  return data;
}

function printTokenRows(payload, format, tokenType) {
  printRows(
    [
      {
        token_type: tokenType,
        access_token: payload.access_token || "",
        token_preview: maskToken(payload.access_token || ""),
        expires_in: String(payload.expires_in ?? ""),
        machine_id: payload.machine_id || ""
      }
    ],
    format,
    [
      ["token_type", "Token type"],
      ["token_preview", "Token preview"],
      ["expires_in", "Expires in (s)"],
      ["machine_id", "Machine ID"],
      ["access_token", "Access token"]
    ]
  );
}

function formatUnixTimestamp(value) {
  if (!value || !Number.isFinite(Number(value)) || Number(value) <= 0) {
    return "";
  }

  return new Date(Number(value) * 1000).toISOString();
}

function normalizeDigits(value, label) {
  const normalized = String(value || "").trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be numeric.`);
  }
  return normalized;
}

function maskToken(token) {
  const raw = String(token || "");
  if (!raw) {
    return "";
  }
  if (raw.length <= 12) {
    return `${raw.slice(0, 4)}...${raw.slice(-2)}`;
  }
  return `${raw.slice(0, 8)}...${raw.slice(-6)}`;
}

function escapeCell(value) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }
  return text;
}

function printRows(rows, format, columns) {
  if (format === "json") {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  if (!rows.length) {
    console.log("No rows.");
    return;
  }

  const header = `| ${columns.map(([, label]) => label).join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  console.log(header);
  console.log(divider);
  for (const row of rows) {
    console.log(`| ${columns.map(([key]) => String(row[key] ?? "")).join(" | ")} |`);
  }
}
