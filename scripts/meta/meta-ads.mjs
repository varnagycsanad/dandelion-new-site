import { existsSync, readFileSync } from "node:fs";

const DEFAULT_VERSION = "v25.0";
const GRAPH_HOST = "https://graph.facebook.com";

await loadEnv();

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "check-auth") {
    await checkAuth();
  } else if (args.command === "accounts") {
    await listAccounts(args);
  } else if (args.command === "campaigns") {
    await listCampaigns(args);
  } else if (args.command === "insights") {
    await getInsights(args);
  } else if (args.command === "create-campaign") {
    await createCampaign(args);
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Meta Ads helper for Dandelion

Usage:
  node scripts/meta/meta-ads.mjs check-auth
  node scripts/meta/meta-ads.mjs accounts [--format md|json]
  node scripts/meta/meta-ads.mjs campaigns [--limit 50] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs insights [--days 30] [--level campaign|adset|ad] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs create-campaign --name "Campaign name" --objective OUTCOME_LEADS [--execute]

Required env:
  META_ACCESS_TOKEN
  META_AD_ACCOUNT_ID for campaign and insight commands

Optional env:
  META_GRAPH_VERSION=v25.0
  META_SPECIAL_AD_CATEGORIES=[]  JSON array sent during campaign creation

Notes:
  create-campaign is a dry run unless --execute is present.
  New campaigns are created PAUSED by default.
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
    limit: 50,
    days: 30,
    level: "campaign",
    format: "md",
    execute: false
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
    } else if (arg === "--limit") {
      parsed.limit = Number(next);
      index += 1;
    } else if (arg === "--days") {
      parsed.days = Number(next);
      index += 1;
    } else if (arg === "--level") {
      parsed.level = next;
      index += 1;
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--start") {
      parsed.startDate = next;
      index += 1;
    } else if (arg === "--end") {
      parsed.endDate = next;
      index += 1;
    } else if (arg === "--name") {
      parsed.name = next;
      index += 1;
    } else if (arg === "--objective") {
      parsed.objective = next;
      index += 1;
    } else if (arg === "--execute") {
      parsed.execute = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function getVersion() {
  return process.env.META_GRAPH_VERSION || DEFAULT_VERSION;
}

function getAccessToken() {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Set META_ACCESS_TOKEN in .env.");
  }
  return token;
}

function getAdAccountId() {
  const accountId = process.env.META_AD_ACCOUNT_ID;
  if (!accountId) {
    throw new Error("Set META_AD_ACCOUNT_ID in .env. Use either 1234567890 or act_1234567890.");
  }
  return accountId.startsWith("act_") ? accountId : `act_${accountId}`;
}

async function graphRequest(pathname, { method = "GET", query = {}, body = undefined } = {}) {
  const url = new URL(`${GRAPH_HOST}/${getVersion()}/${pathname.replace(/^\/+/, "")}`);
  const token = getAccessToken();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const options = { method };

  if (method === "GET") {
    url.searchParams.set("access_token", token);
  } else {
    const params = new URLSearchParams();
    params.set("access_token", token);
    for (const [key, value] of Object.entries(body || {})) {
      if (value !== undefined && value !== null) {
        params.set(key, typeof value === "string" ? value : JSON.stringify(value));
      }
    }
    options.body = params;
    options.headers = { "content-type": "application/x-www-form-urlencoded" };
  }

  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok || data.error) {
    const metaError = data.error;
    const detail = metaError?.message || response.statusText;
    throw new Error(`Meta API ${response.status}: ${detail}`);
  }
  return data;
}

async function checkAuth() {
  const profile = await graphRequest("/me", {
    query: { fields: "id,name" }
  });

  console.log("Meta access token works.");
  console.log(`User: ${profile.name || "(no name)"} (${profile.id})`);

  const accounts = await graphRequest("/me/adaccounts", {
    query: { fields: "id,name,account_status,currency,timezone_name", limit: 10 }
  });

  console.log(`Visible ad accounts: ${accounts.data?.length || 0}`);
  for (const account of accounts.data || []) {
    console.log(`- ${account.name || "(no name)"}: ${account.id}, ${account.currency || "no currency"}, status ${account.account_status}`);
  }
}

async function listAccounts(args) {
  const result = await graphRequest("/me/adaccounts", {
    query: {
      fields: "id,name,account_status,currency,timezone_name,business",
      limit: args.limit
    }
  });

  printRows(result.data || [], args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["account_status", "Status"],
    ["currency", "Currency"],
    ["timezone_name", "Timezone"]
  ]);
}

async function listCampaigns(args) {
  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/campaigns`, {
    query: {
      fields: "id,name,status,effective_status,objective,created_time,updated_time",
      limit: args.limit
    }
  });

  printRows(result.data || [], args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["status", "Status"],
    ["effective_status", "Effective"],
    ["objective", "Objective"],
    ["updated_time", "Updated"]
  ]);
}

async function getInsights(args) {
  if (!["campaign", "adset", "ad"].includes(args.level)) {
    throw new Error("--level must be campaign, adset, or ad.");
  }

  const accountId = getAdAccountId();
  const dateQuery = resolveDateQuery(args);
  const result = await graphRequest(`/${accountId}/insights`, {
    query: {
      level: args.level,
      fields: [
        `${args.level}_id`,
        `${args.level}_name`,
        "impressions",
        "reach",
        "frequency",
        "clicks",
        "inline_link_clicks",
        "spend",
        "cpm",
        "cpc",
        "ctr",
        "actions"
      ].join(","),
      limit: args.limit,
      ...dateQuery
    }
  });

  const idKey = `${args.level}_id`;
  const nameKey = `${args.level}_name`;
  const rows = (result.data || []).map((row) => ({
    id: row[idKey],
    name: row[nameKey],
    impressions: row.impressions,
    reach: row.reach,
    clicks: row.clicks,
    link_clicks: row.inline_link_clicks,
    spend: row.spend,
    cpc: row.cpc,
    ctr: row.ctr,
    leads: getActionValue(row.actions, ["lead", "onsite_conversion.lead_grouped", "offsite_conversion.fb_pixel_lead"])
  }));

  printRows(rows, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["spend", "Spend"],
    ["impressions", "Impr."],
    ["clicks", "Clicks"],
    ["link_clicks", "Link clicks"],
    ["ctr", "CTR"],
    ["cpc", "CPC"],
    ["leads", "Leads"]
  ]);
}

function resolveDateQuery(args) {
  if (args.startDate && args.endDate) {
    return {
      time_range: JSON.stringify({ since: args.startDate, until: args.endDate })
    };
  }

  if (!Number.isInteger(args.days) || args.days < 1) {
    throw new Error("--days must be a positive integer.");
  }

  if (args.days === 1) {
    return { date_preset: "yesterday" };
  }

  const supportedPresets = new Set([3, 7, 14, 28, 30, 90]);
  if (supportedPresets.has(args.days)) {
    return { date_preset: `last_${args.days}d` };
  }

  const until = new Date();
  until.setUTCDate(until.getUTCDate() - 1);
  const since = new Date(until);
  since.setUTCDate(since.getUTCDate() - args.days + 1);

  return {
    time_range: JSON.stringify({
      since: toIsoDate(since),
      until: toIsoDate(until)
    })
  };
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function getActionValue(actions, actionTypes) {
  if (!Array.isArray(actions)) {
    return "0";
  }

  let total = 0;
  for (const action of actions) {
    if (actionTypes.includes(action.action_type)) {
      total += Number(action.value || 0);
    }
  }
  return String(total);
}

async function createCampaign(args) {
  if (!args.name) {
    throw new Error("Missing --name.");
  }

  const payload = {
    name: args.name,
    objective: args.objective || "OUTCOME_LEADS",
    status: "PAUSED",
    special_ad_categories: getSpecialAdCategories()
  };

  if (!args.execute) {
    console.log("Dry run. Add --execute to create this PAUSED campaign in Meta Ads.");
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/campaigns`, {
    method: "POST",
    body: payload
  });

  console.log("Campaign created in PAUSED status.");
  console.log(JSON.stringify(result, null, 2));
}

function getSpecialAdCategories() {
  const raw = process.env.META_SPECIAL_AD_CATEGORIES || "[]";
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("not array");
    }
    return parsed;
  } catch {
    throw new Error("META_SPECIAL_AD_CATEGORIES must be a JSON array, for example [].");
  }
}

function printRows(rows, format, columns) {
  if (format === "json") {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  if (format === "csv") {
    console.log(columns.map(([, label]) => csvEscape(label)).join(","));
    for (const row of rows) {
      console.log(columns.map(([key]) => csvEscape(row[key] ?? "")).join(","));
    }
    return;
  }

  if (format !== "md") {
    throw new Error("--format must be md, json, or csv.");
  }

  if (rows.length === 0) {
    console.log("No rows.");
    return;
  }

  console.log(`| ${columns.map(([, label]) => label).join(" | ")} |`);
  console.log(`| ${columns.map(() => "---").join(" | ")} |`);
  for (const row of rows) {
    console.log(`| ${columns.map(([key]) => mdEscape(row[key] ?? "")).join(" | ")} |`);
  }
}

function csvEscape(value) {
  const stringValue = String(value);
  if (/[",\r\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

function mdEscape(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}
