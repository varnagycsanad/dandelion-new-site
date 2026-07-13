import { existsSync, readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const ADS_API_BASE = "https://googleads.googleapis.com/v24";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const ADS_SCOPE = "https://www.googleapis.com/auth/adwords";
const OAUTH_REDIRECT_URI = "http://127.0.0.1:53683/oauth2callback";
const DEFAULT_OAUTH_TOKEN_PATH = ".secrets/google-ads-oauth-token.json";

loadDotEnv();

const args = parseArgs(process.argv);

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "auth") {
    await createOAuthToken(args);
  } else if (args.command === "check-auth") {
    await checkAuth(args);
  } else if (args.command === "customers") {
    await listCustomers(args);
  } else if (args.command === "campaigns") {
    await listCampaigns(args);
  } else if (args.command === "performance") {
    await listPerformance(args);
  } else if (args.command === "conversions") {
    await listConversions(args);
  } else if (args.command === "search-terms") {
    await listSearchTerms(args);
  } else if (args.command === "pause-campaigns") {
    await updateCampaignStatus(args, "PAUSED");
  } else if (args.command === "enable-campaigns") {
    await updateCampaignStatus(args, "ENABLED");
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Google Ads helper for Dandelion

Usage:
  node scripts/google-ads-report.mjs auth
  node scripts/google-ads-report.mjs check-auth
  node scripts/google-ads-report.mjs customers [--format md|json|csv]
  node scripts/google-ads-report.mjs campaigns --customer 1234567890 [--login 9988776655] [--limit 50] [--format md|json|csv]
  node scripts/google-ads-report.mjs performance --customer 1234567890 [--login 9988776655] [--days 30] [--limit 50] [--format md|json|csv]
  node scripts/google-ads-report.mjs performance --customer 1234567890 [--login 9988776655] --start 2026-07-10 --end 2026-07-10 [--limit 50] [--format md|json|csv]
  node scripts/google-ads-report.mjs conversions --customer 1234567890 [--login 9988776655] [--limit 100] [--format md|json|csv]
  node scripts/google-ads-report.mjs search-terms --customer 1234567890 [--login 9988776655] [--days 30] [--campaign "Campaign A"] [--campaign-id 123456789] [--limit 50] [--format md|json|csv]
  node scripts/google-ads-report.mjs pause-campaigns --customer 1234567890 --campaign-id 123456789 [--validate-only] [--format md|json|csv]
  node scripts/google-ads-report.mjs enable-campaigns --customer 1234567890 --campaign-id 123456789 [--validate-only] [--format md|json|csv]

Required env:
  GOOGLE_ADS_DEVELOPER_TOKEN
  GOOGLE_ADS_OAUTH_CLIENT_JSON
  plus a token file created with the auth command

Optional env:
  GOOGLE_ADS_CUSTOMER_ID
  GOOGLE_ADS_LOGIN_CUSTOMER_ID
  GOOGLE_ADS_OAUTH_TOKEN_JSON=.secrets/google-ads-oauth-token.json

Notes:
  - Use the 10-digit customer IDs without hyphens.
  - If you access a client account through a manager account, set --login or GOOGLE_ADS_LOGIN_CUSTOMER_ID.
  - auth uses OAuth user consent with the Google Ads scope.
  - pause-campaigns and enable-campaigns require at least one --campaign-id or --campaign filter.
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
    days: 30,
    limit: 50,
    format: "md",
    tokenPath: process.env.GOOGLE_ADS_OAUTH_TOKEN_JSON || DEFAULT_OAUTH_TOKEN_PATH,
    customerId: process.env.GOOGLE_ADS_CUSTOMER_ID,
    loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    campaigns: [],
    campaignIds: []
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
    } else if (arg === "--days") {
      parsed.days = Number(next);
      index += 1;
    } else if (arg === "--start" || arg === "--startDate") {
      parsed.startDate = next;
      index += 1;
    } else if (arg === "--end" || arg === "--endDate") {
      parsed.endDate = next;
      index += 1;
    } else if (arg === "--limit") {
      parsed.limit = Number(next);
      index += 1;
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--customer") {
      parsed.customerId = next;
      index += 1;
    } else if (arg === "--login") {
      parsed.loginCustomerId = next;
      index += 1;
    } else if (arg === "--campaign") {
      parsed.campaigns.push(next);
      index += 1;
    } else if (arg === "--campaign-id") {
      parsed.campaignIds.push(next);
      index += 1;
    } else if (arg === "--token") {
      parsed.tokenPath = next;
      index += 1;
    } else if (arg === "--validate-only") {
      parsed.validateOnly = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function loadOAuthClient() {
  const clientPath =
    process.env.GOOGLE_ADS_OAUTH_CLIENT_JSON ||
    process.env.GOOGLE_OAUTH_CLIENT_JSON ||
    process.env.GEO_OAUTH_CLIENT_JSON;

  if (!clientPath) {
    throw new Error("Set GOOGLE_ADS_OAUTH_CLIENT_JSON or GEO_OAUTH_CLIENT_JSON to an OAuth client JSON file.");
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
  authLink.searchParams.set("scope", ADS_SCOPE);
  authLink.searchParams.set("access_type", "offline");
  authLink.searchParams.set("prompt", "consent");

  console.log("Open this URL, sign in with the Google account that has Google Ads access, then approve:");
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

      response.end("Google Ads authorization complete. You can return to Codex.");
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
    throw new Error(`OAuth token not found at ${resolvedTokenPath}. Run: node scripts/google-ads-report.mjs auth`);
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

function getDeveloperToken() {
  const token = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
  if (!token) {
    throw new Error("Set GOOGLE_ADS_DEVELOPER_TOKEN in .env.");
  }
  return token;
}

function normalizeCustomerId(customerId, label = "customer ID") {
  if (!customerId) {
    throw new Error(`Missing ${label}.`);
  }

  const normalized = String(customerId).replace(/-/g, "").trim();
  if (!/^\d{10}$/.test(normalized)) {
    throw new Error(`${label} must be a 10-digit Google Ads customer ID without spaces.`);
  }

  return normalized;
}

function resolveTargetCustomerId(args) {
  return normalizeCustomerId(args.customerId, "Google Ads customer ID");
}

function resolveLoginCustomerId(args) {
  if (!args.loginCustomerId) {
    return undefined;
  }
  return normalizeCustomerId(args.loginCustomerId, "Google Ads login customer ID");
}

async function adsRequest(resourcePath, { method = "GET", query = undefined, args = undefined } = {}) {
  const accessToken = await getOAuthAccessToken(args);
  const developerToken = getDeveloperToken();
  const url = new URL(`${ADS_API_BASE}/${resourcePath.replace(/^\/+/, "")}`);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken
  };

  const loginCustomerId = args ? resolveLoginCustomerId(args) : undefined;
  if (loginCustomerId) {
    headers["login-customer-id"] = loginCustomerId;
  }

  const options = { method, headers };

  if (query !== undefined) {
    options.headers["content-type"] = "application/json";
    options.body = JSON.stringify(query);
  }

  const response = await fetch(url, options);
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const errorMessage =
      data?.error?.message ||
      data?.error?.details?.[0]?.errors?.[0]?.message ||
      response.statusText;
    throw new Error(`Google Ads API ${response.status}: ${errorMessage}`);
  }

  return data;
}

async function runSearch(args, gaql) {
  const customerId = resolveTargetCustomerId(args);
  const result = await adsRequest(`customers/${customerId}/googleAds:search`, {
    method: "POST",
    query: { query: gaql },
    args
  });

  return result.results || [];
}

async function mutate(resourcePath, operations, args) {
  const customerId = resolveTargetCustomerId(args);
  return adsRequest(`customers/${customerId}/${resourcePath}:mutate`, {
    method: "POST",
    query: {
      operations,
      partialFailure: false,
      validateOnly: Boolean(args.validateOnly)
    },
    args
  });
}

async function checkAuth(args) {
  const customers = await fetchAccessibleCustomers(args);
  console.log("Google Ads OAuth and developer token look usable.");
  console.log(`Accessible direct accounts: ${customers.length}`);
  for (const customer of customers) {
    console.log(`- ${customer.id}: ${customer.name || "(no name)"} [${customer.currency_code || "?"}, ${customer.time_zone || "?"}]`);
  }
}

async function listCustomers(args) {
  const customers = await fetchAccessibleCustomers(args);
  printRows(customers, args.format, [
    ["id", "Customer ID"],
    ["name", "Name"],
    ["currency_code", "Currency"],
    ["time_zone", "Time zone"],
    ["manager", "Manager"]
  ]);
}

async function fetchAccessibleCustomers(args) {
  const result = await adsRequest("customers:listAccessibleCustomers", { args });
  const resourceNames = result.resourceNames || [];
  const customers = [];

  for (const resourceName of resourceNames) {
    const customerId = resourceName.split("/").pop();
    if (!customerId) {
      continue;
    }

    try {
      const rows = await runSearch({ ...args, customerId }, `
        SELECT
          customer.id,
          customer.descriptive_name,
          customer.currency_code,
          customer.time_zone,
          customer.manager
        FROM customer
        LIMIT 1
      `);
      const row = rows[0]?.customer;
      if (row) {
        customers.push({
          id: row.id,
          name: row.descriptiveName,
          currency_code: row.currencyCode,
          time_zone: row.timeZone,
          manager: row.manager
        });
        continue;
      }
    } catch {
      // Fall back to bare resource name if descriptive lookup is unavailable.
    }

    customers.push({
      id: customerId,
      name: "",
      currency_code: "",
      time_zone: "",
      manager: ""
    });
  }

  return customers;
}

async function listCampaigns(args) {
  const rows = await runSearch(args, `
    SELECT
      campaign.id,
      campaign.name,
      campaign.status
    FROM campaign
    ORDER BY campaign.id
    LIMIT ${resolveLimit(args.limit)}
  `);

  const campaigns = rows.map((row) => ({
    id: row.campaign?.id,
    name: row.campaign?.name,
    status: row.campaign?.status
  }));

  printRows(campaigns, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["status", "Status"]
  ]);
}

async function listPerformance(args) {
  const dateClause = resolvePerformanceDateClause(args);
  const rows = await runSearch(args, `
    SELECT
      segments.date,
      campaign.id,
      campaign.name,
      campaign.status,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM campaign
    WHERE ${dateClause}
    ORDER BY segments.date DESC, metrics.cost_micros DESC
    LIMIT ${resolveLimit(args.limit)}
  `);

  const performance = rows.map((row) => ({
    date: row.segments?.date,
    id: row.campaign?.id,
    name: row.campaign?.name,
    status: row.campaign?.status,
    impressions: toNumber(row.metrics?.impressions),
    clicks: toNumber(row.metrics?.clicks),
    ctr: toPercent(row.metrics?.ctr),
    average_cpc: microsToCurrency(row.metrics?.averageCpc),
    cost: microsToCurrency(row.metrics?.costMicros),
    conversions: toNumber(row.metrics?.conversions),
    conversion_value: toNumber(row.metrics?.conversionsValue)
  }));

  printRows(performance, args.format, [
    ["date", "Date"],
    ["id", "ID"],
    ["name", "Name"],
    ["status", "Status"],
    ["cost", "Cost"],
    ["impressions", "Impr."],
    ["clicks", "Clicks"],
    ["ctr", "CTR"],
    ["average_cpc", "Avg CPC"],
    ["conversions", "Conversions"],
    ["conversion_value", "Conv. value"]
  ]);
}

async function listConversions(args) {
  const rows = await runSearch(args, `
    SELECT
      conversion_action.id,
      conversion_action.name,
      conversion_action.status,
      conversion_action.type,
      conversion_action.category,
      conversion_action.primary_for_goal,
      conversion_action.include_in_conversions_metric
    FROM conversion_action
    ORDER BY conversion_action.id
    LIMIT ${resolveLimit(args.limit, 1000)}
  `);

  const conversions = rows.map((row) => ({
    id: row.conversionAction?.id,
    name: row.conversionAction?.name,
    status: row.conversionAction?.status,
    type: row.conversionAction?.type,
    category: row.conversionAction?.category,
    primary_for_goal: row.conversionAction?.primaryForGoal,
    include_in_conversions: row.conversionAction?.includeInConversionsMetric
  }));

  printRows(conversions, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["status", "Status"],
    ["type", "Type"],
    ["category", "Category"],
    ["primary_for_goal", "Primary"],
    ["include_in_conversions", "In conversions"]
  ]);
}

async function listSearchTerms(args) {
  const dateClause = resolvePerformanceDateClause(args);
  const campaignFilter = buildCampaignFilter(args);
  const whereParts = [dateClause];
  if (campaignFilter) {
    whereParts.push(campaignFilter);
  }

  const rows = await runSearch(args, `
    SELECT
      segments.date,
      campaign.id,
      campaign.name,
      ad_group.id,
      ad_group.name,
      search_term_view.search_term,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value
    FROM search_term_view
    WHERE ${whereParts.join("\n      AND ")}
    ORDER BY metrics.clicks DESC, metrics.cost_micros DESC, search_term_view.search_term
    LIMIT ${resolveLimit(args.limit, 100)}
  `);

  const searchTerms = rows.map((row) => ({
    date: row.segments?.date,
    campaign_id: row.campaign?.id,
    campaign_name: row.campaign?.name,
    ad_group_id: row.adGroup?.id,
    ad_group_name: row.adGroup?.name,
    search_term: row.searchTermView?.searchTerm,
    impressions: toNumber(row.metrics?.impressions),
    clicks: toNumber(row.metrics?.clicks),
    ctr: toPercent(row.metrics?.ctr),
    average_cpc: microsToCurrency(row.metrics?.averageCpc),
    cost: microsToCurrency(row.metrics?.costMicros),
    conversions: toNumber(row.metrics?.conversions),
    conversion_value: toNumber(row.metrics?.conversionsValue)
  }));

  printRows(searchTerms, args.format, [
    ["date", "Date"],
    ["campaign_name", "Campaign"],
    ["ad_group_name", "Ad group"],
    ["search_term", "Search term"],
    ["cost", "Cost"],
    ["impressions", "Impr."],
    ["clicks", "Clicks"],
    ["ctr", "CTR"],
    ["average_cpc", "Avg CPC"],
    ["conversions", "Conversions"],
    ["conversion_value", "Conv. value"]
  ]);
}

async function updateCampaignStatus(args, status) {
  if (!args.campaignIds.length && !args.campaigns.length) {
    throw new Error(`Provide at least one --campaign-id or --campaign for ${args.command}.`);
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        campaign.status
      FROM campaign
      WHERE ${buildCampaignFilter(args)}
      ORDER BY campaign.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const campaigns = rows.map((row) => ({
    id: row.campaign?.id,
    name: row.campaign?.name,
    previous_status: row.campaign?.status
  }));

  if (!campaigns.length) {
    throw new Error("No campaigns matched the requested filter.");
  }

  const operations = campaigns.map((campaign) => ({
    update: {
      resourceName: buildCampaignResourceName(args, campaign.id),
      status
    },
    updateMask: "status"
  }));

  const result = await mutate("campaigns", operations, args);
  const payload = campaigns.map((campaign, index) => ({
    id: campaign.id,
    name: campaign.name,
    previous_status: campaign.previous_status,
    requested_status: status,
    validate_only: Boolean(args.validateOnly),
    result_resource_name: result.results?.[index]?.resourceName || buildCampaignResourceName(args, campaign.id)
  }));

  printRows(payload, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["previous_status", "Previous"],
    ["requested_status", "Requested"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

function resolveLimit(limit, fallback = 50) {
  const value = Number(limit);
  if (!Number.isInteger(value) || value < 1) {
    return fallback;
  }
  return value;
}

function resolveDays(days) {
  const value = Number(days);
  if (!Number.isInteger(value) || value < 1 || value > 365) {
    throw new Error("--days must be an integer between 1 and 365.");
  }
  return value;
}

function resolvePerformanceDateClause(args) {
  if (args.startDate || args.endDate) {
    if (!args.startDate || !args.endDate) {
      throw new Error("Use both --start and --end for exact date queries.");
    }

    const startDate = normalizeIsoDate(args.startDate, "--start");
    const endDate = normalizeIsoDate(args.endDate, "--end");
    if (startDate > endDate) {
      throw new Error("--start must be on or before --end.");
    }

    return `segments.date BETWEEN '${startDate}' AND '${endDate}'`;
  }

  const { startDate, endDate } = resolveRelativeDateRange(resolveDays(args.days));
  return `segments.date BETWEEN '${startDate}' AND '${endDate}'`;
}

function normalizeIsoDate(value, label) {
  const normalized = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    throw new Error(`${label} must be in YYYY-MM-DD format.`);
  }
  return normalized;
}

function resolveRelativeDateRange(days) {
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (days - 1));
  return {
    startDate: formatIsoDate(startDate),
    endDate: formatIsoDate(endDate)
  };
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildCampaignFilter(args) {
  const parts = [];

  if (args.campaigns?.length) {
    parts.push(`campaign.name IN (${args.campaigns.map((name) => `'${escapeGaqlString(name)}'`).join(", ")})`);
  }

  if (args.campaignIds?.length) {
    parts.push(`campaign.id IN (${args.campaignIds.map((id) => normalizeDigits(id, "campaignId")).join(", ")})`);
  }

  if (!parts.length) {
    return "";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `(${parts.join(" OR ")})`;
}

function buildCampaignResourceName(args, campaignId) {
  return `customers/${resolveTargetCustomerId(args)}/campaigns/${normalizeDigits(campaignId, "campaignId")}`;
}

function escapeGaqlString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function normalizeDigits(value, label) {
  const normalized = String(value || "").trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be numeric.`);
  }
  return normalized;
}

function toNumber(value) {
  if (value === undefined || value === null || value === "") {
    return "";
  }
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : value;
}

function toPercent(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  return `${(numeric * 100).toFixed(2)}%`;
}

function microsToCurrency(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  return (numeric / 1_000_000).toFixed(2);
}

function printRows(rows, format, columns) {
  if (format === "json") {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  if (format === "csv") {
    const header = columns.map(([, label]) => escapeCsv(label)).join(",");
    const body = rows
      .map((row) =>
        columns
          .map(([key]) => escapeCsv(row[key] ?? ""))
          .join(",")
      )
      .join("\n");
    console.log([header, body].filter(Boolean).join("\n"));
    return;
  }

  const labels = columns.map(([, label]) => label);
  const widths = columns.map(([key], index) =>
    Math.max(
      labels[index].length,
      ...rows.map((row) => String(row[key] ?? "").length)
    )
  );

  const header = labels
    .map((label, index) => label.padEnd(widths[index]))
    .join(" | ");
  const separator = widths.map((width) => "-".repeat(width)).join(" | ");
  const lines = rows.map((row) =>
    columns
      .map(([key], index) => String(row[key] ?? "").padEnd(widths[index]))
      .join(" | ")
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
