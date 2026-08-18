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
  } else if (args.command === "budgets") {
    await listBudgets(args);
  } else if (args.command === "ad-groups") {
    await listAdGroups(args);
  } else if (args.command === "create-ad-group") {
    await createAdGroup(args);
  } else if (args.command === "update-ad-groups") {
    await updateAdGroups(args);
  } else if (args.command === "rsa-ads") {
    await listResponsiveSearchAds(args);
  } else if (args.command === "create-rsa-ad") {
    await createResponsiveSearchAd(args);
  } else if (args.command === "update-rsa-ads") {
    await updateResponsiveSearchAds(args);
  } else if (args.command === "targets") {
    await listCampaignTargets(args);
  } else if (args.command === "lookup-locations") {
    await lookupLocations(args);
  } else if (args.command === "lookup-languages") {
    await lookupLanguages(args);
  } else if (args.command === "add-location-targets") {
    await addLocationTargets(args);
  } else if (args.command === "remove-location-targets") {
    await removeLocationTargets(args);
  } else if (args.command === "add-language-targets") {
    await addLanguageTargets(args);
  } else if (args.command === "remove-language-targets") {
    await removeLanguageTargets(args);
  } else if (args.command === "update-geo-target-type") {
    await updateGeoTargetType(args);
  } else if (args.command === "export-campaign-state") {
    await exportCampaignState(args);
  } else if (args.command === "apply-campaign-change-set") {
    await applyCampaignChangeSet(args);
  } else if (args.command === "pause-campaigns") {
    await updateCampaignStatus(args, "PAUSED");
  } else if (args.command === "enable-campaigns") {
    await updateCampaignStatus(args, "ENABLED");
  } else if (args.command === "update-budgets") {
    await updateCampaignBudgets(args);
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
  node scripts/remote-platform/google/google-ads-report.mjs auth
  node scripts/remote-platform/google/google-ads-report.mjs check-auth
  node scripts/remote-platform/google/google-ads-report.mjs customers [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs campaigns --customer 1234567890 [--login 9988776655] [--limit 50] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs performance --customer 1234567890 [--login 9988776655] [--days 30] [--limit 50] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs performance --customer 1234567890 [--login 9988776655] --start 2026-07-10 --end 2026-07-10 [--limit 50] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs conversions --customer 1234567890 [--login 9988776655] [--limit 100] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs search-terms --customer 1234567890 [--login 9988776655] [--days 30] [--campaign "Campaign A"] [--campaign-id 123456789] [--limit 50] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs budgets --customer 1234567890 [--campaign-id 123456789] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs ad-groups --customer 1234567890 [--campaign-id 123456789] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs create-ad-group --customer 1234567890 --campaign-id 123456789 --ad-group-name "New ad group" [--status ENABLED] [--cpc-bid 120] [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs update-ad-groups --customer 1234567890 --ad-group-id 123456789 [--new-name "Updated name"] [--status PAUSED] [--cpc-bid 140] [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs rsa-ads --customer 1234567890 [--campaign-id 123456789] [--ad-group-id 987654321] [--format md|json]
  node scripts/remote-platform/google/google-ads-report.mjs create-rsa-ad --customer 1234567890 --ad-group-id 987654321 --final-url https://example.com --headline "Headline 1" --headline "Headline 2" --headline "Headline 3" --description "Description 1" --description "Description 2" [--path1 pool] [--path2 balaton] [--validate-only] [--format md|json]
  node scripts/remote-platform/google/google-ads-report.mjs update-rsa-ads --customer 1234567890 --ad-group-id 987654321 --ad-id 111222333 --headline "Headline 1" --headline "Headline 2" --headline "Headline 3" --description "Description 1" --description "Description 2" [--final-url https://example.com] [--status PAUSED] [--validate-only] [--format md|json]
  node scripts/remote-platform/google/google-ads-report.mjs targets --customer 1234567890 --campaign-id 123456789 [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs lookup-locations --customer 1234567890 --location-name "Hungary" [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs lookup-languages --customer 1234567890 --language-name "Hungarian" [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs add-location-targets --customer 1234567890 --campaign-id 123456789 --location-resource geoTargetConstants/2384 [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs remove-location-targets --customer 1234567890 --campaign-id 123456789 --location-resource geoTargetConstants/2384 [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs add-language-targets --customer 1234567890 --campaign-id 123456789 --language-resource languageConstants/1024 [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs remove-language-targets --customer 1234567890 --campaign-id 123456789 --language-resource languageConstants/1024 [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs update-geo-target-type --customer 1234567890 --campaign-id 123456789 --positive-geo-target-type PRESENCE_OR_INTEREST [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs export-campaign-state --customer 1234567890 --campaign-id 123456789 [--output tmp/campaign-state.json]
  node scripts/remote-platform/google/google-ads-report.mjs apply-campaign-change-set --customer 1234567890 --input tmp/campaign-changes.json [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs pause-campaigns --customer 1234567890 --campaign-id 123456789 [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs enable-campaigns --customer 1234567890 --campaign-id 123456789 [--validate-only] [--format md|json|csv]
  node scripts/remote-platform/google/google-ads-report.mjs update-budgets --customer 1234567890 --campaign-budget-id 123456789 --amount 3500 [--validate-only] [--format md|json|csv]

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
  - create-ad-group requires --campaign-id or a uniquely matching --campaign plus --ad-group-name.
  - update-ad-groups requires at least one --ad-group-id or ad group filter plus at least one update field.
  - create-rsa-ad requires one unique ad group target, one final URL, at least 3 headlines and at least 2 descriptions.
  - update-rsa-ads requires one unique ad target for text changes and supports status-only updates on filtered ads.
  - targets lists geo target settings plus location/language criteria for the selected campaigns.
  - add/remove target commands require a unique target campaign plus one or more explicit resource names.
  - update-geo-target-type updates the campaign-level geo target behavior.
  - export-campaign-state creates a structured JSON snapshot for campaign-level operations.
  - apply-campaign-change-set applies a JSON change set with status, budget and targeting changes.
  - pause-campaigns and enable-campaigns require at least one --campaign-id or --campaign filter.
  - update-budgets requires at least one --campaign-budget-id or one uniquely matching campaign filter plus --amount or --amount-micros.
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
    campaignIds: [],
    campaignBudgetIds: [],
    adGroupIds: [],
    adIds: [],
    locationNames: [],
    locationResources: [],
    languageNames: [],
    languageCodes: [],
    languageResources: [],
    headlines: [],
    descriptions: []
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
    } else if (arg === "--campaign-budget-id") {
      parsed.campaignBudgetIds.push(next);
      index += 1;
    } else if (arg === "--ad-group-id") {
      parsed.adGroupIds.push(next);
      index += 1;
    } else if (arg === "--ad-id") {
      parsed.adIds.push(next);
      index += 1;
    } else if (arg === "--location-name") {
      parsed.locationNames.push(next);
      index += 1;
    } else if (arg === "--location-resource") {
      parsed.locationResources.push(next);
      index += 1;
    } else if (arg === "--language-name") {
      parsed.languageNames.push(next);
      index += 1;
    } else if (arg === "--language-code") {
      parsed.languageCodes.push(next);
      index += 1;
    } else if (arg === "--language-resource") {
      parsed.languageResources.push(next);
      index += 1;
    } else if (arg === "--ad-group-name") {
      parsed.adGroupName = next;
      index += 1;
    } else if (arg === "--new-name") {
      parsed.newName = next;
      index += 1;
    } else if (arg === "--status") {
      parsed.newStatus = next;
      index += 1;
    } else if (arg === "--type") {
      parsed.adGroupType = next;
      index += 1;
    } else if (arg === "--cpc-bid") {
      parsed.cpcBid = next;
      index += 1;
    } else if (arg === "--cpc-bid-micros") {
      parsed.cpcBidMicros = next;
      index += 1;
    } else if (arg === "--headline") {
      parsed.headlines.push(next);
      index += 1;
    } else if (arg === "--description") {
      parsed.descriptions.push(next);
      index += 1;
    } else if (arg === "--final-url") {
      parsed.finalUrl = next;
      index += 1;
    } else if (arg === "--path1") {
      parsed.path1 = next;
      index += 1;
    } else if (arg === "--path2") {
      parsed.path2 = next;
      index += 1;
    } else if (arg === "--amount") {
      parsed.amount = next;
      index += 1;
    } else if (arg === "--amount-micros") {
      parsed.amountMicros = next;
      index += 1;
    } else if (arg === "--positive-geo-target-type") {
      parsed.positiveGeoTargetType = next;
      index += 1;
    } else if (arg === "--negative-geo-target-type") {
      parsed.negativeGeoTargetType = next;
      index += 1;
    } else if (arg === "--input") {
      parsed.inputPath = next;
      index += 1;
    } else if (arg === "--output") {
      parsed.outputPath = next;
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
    throw new Error(`OAuth token not found at ${resolvedTokenPath}. Run: node scripts/remote-platform/google/google-ads-report.mjs auth`);
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

async function listBudgets(args) {
  const whereParts = [];
  const campaignFilter = buildCampaignFilter(args);
  const budgetFilter = buildCampaignBudgetFilter(args);

  if (campaignFilter) {
    whereParts.push(campaignFilter);
  }
  if (budgetFilter) {
    whereParts.push(budgetFilter);
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign_budget.id,
        campaign_budget.name,
        campaign_budget.amount_micros
      FROM campaign
      ${whereParts.length ? `WHERE ${whereParts.join("\n      AND ")}` : ""}
      ORDER BY campaign.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const budgets = rows.map((row) => ({
    campaign_id: row.campaign?.id,
    campaign_name: row.campaign?.name,
    campaign_status: row.campaign?.status,
    campaign_budget_id: row.campaignBudget?.id,
    campaign_budget_name: row.campaignBudget?.name,
    amount_micros: toNumber(row.campaignBudget?.amountMicros),
    amount: microsToCurrency(row.campaignBudget?.amountMicros)
  }));

  printRows(budgets, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["campaign_status", "Status"],
    ["campaign_budget_id", "Budget ID"],
    ["campaign_budget_name", "Budget name"],
    ["amount", "Amount"],
    ["amount_micros", "Amount micros"]
  ]);
}

async function listAdGroups(args) {
  const whereParts = [];
  const campaignFilter = buildCampaignFilter(args);
  const adGroupFilter = buildAdGroupFilter(args);

  if (campaignFilter) {
    whereParts.push(campaignFilter);
  }
  if (adGroupFilter) {
    whereParts.push(adGroupFilter);
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        ad_group.type,
        ad_group.cpc_bid_micros
      FROM ad_group
      ${whereParts.length ? `WHERE ${whereParts.join("\n      AND ")}` : ""}
      ORDER BY campaign.id, ad_group.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const adGroups = rows.map(mapAdGroupRow);
  printRows(adGroups, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["ad_group_id", "Ad group ID"],
    ["ad_group_name", "Ad group"],
    ["status", "Status"],
    ["type", "Type"],
    ["cpc_bid", "CPC bid"],
    ["cpc_bid_micros", "CPC bid micros"]
  ]);
}

async function createAdGroup(args) {
  const campaign = await resolveSingleCampaignForCreate(args);
  const adGroupName = String(args.adGroupName || "").trim();
  if (!adGroupName) {
    throw new Error("Provide --ad-group-name for create-ad-group.");
  }

  const createPayload = {
    campaign: buildCampaignResourceName(args, campaign.id),
    name: adGroupName,
    status: normalizeAdGroupStatus(args.newStatus || "ENABLED"),
    type: normalizeAdGroupType(args.adGroupType || "SEARCH_STANDARD")
  };

  const cpcBidMicros = resolveOptionalBidMicros(args);
  if (cpcBidMicros !== null) {
    createPayload.cpcBidMicros = String(cpcBidMicros);
  }

  const result = await mutate("adGroups", [{ create: createPayload }], args);
  const payload = [
    {
      campaign_id: campaign.id,
      campaign_name: campaign.name,
      ad_group_name: adGroupName,
      requested_status: createPayload.status,
      requested_type: createPayload.type,
      requested_cpc_bid: cpcBidMicros === null ? "" : microsToCurrency(cpcBidMicros),
      validate_only: Boolean(args.validateOnly),
      result_resource_name: result.results?.[0]?.resourceName || "(validate only or no resource returned)"
    }
  ];

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["ad_group_name", "Ad group"],
    ["requested_status", "Requested status"],
    ["requested_type", "Requested type"],
    ["requested_cpc_bid", "Requested CPC bid"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function updateAdGroups(args) {
  const targets = await resolveAdGroupTargets(args);
  const operations = [];
  const requestedStatus = args.newStatus ? normalizeAdGroupStatus(args.newStatus) : null;
  const requestedCpcBidMicros = resolveOptionalBidMicros(args);
  const requestedName = args.newName ? String(args.newName).trim() : "";

  if (!requestedStatus && requestedCpcBidMicros === null && !requestedName) {
    throw new Error("Provide at least one update field: --new-name, --status, --cpc-bid or --cpc-bid-micros.");
  }

  if (requestedName && targets.length > 1) {
    throw new Error("Updating the name requires a unique target ad group. Narrow the filter to a single --ad-group-id or exact ad group filter.");
  }

  for (const target of targets) {
    const update = {
      resourceName: buildAdGroupResourceName(args, target.ad_group_id)
    };
    const masks = [];

    if (requestedName) {
      update.name = requestedName;
      masks.push("name");
    }
    if (requestedStatus) {
      update.status = requestedStatus;
      masks.push("status");
    }
    if (requestedCpcBidMicros !== null) {
      update.cpcBidMicros = String(requestedCpcBidMicros);
      masks.push("cpc_bid_micros");
    }

    operations.push({
      update,
      updateMask: masks.join(",")
    });
  }

  const result = await mutate("adGroups", operations, args);
  const payload = targets.map((target, index) => ({
    campaign_id: target.campaign_id,
    campaign_name: target.campaign_name,
    ad_group_id: target.ad_group_id,
    ad_group_name: target.ad_group_name,
    previous_status: target.status,
    previous_cpc_bid: target.cpc_bid,
    requested_name: requestedName || target.ad_group_name,
    requested_status: requestedStatus || target.status,
    requested_cpc_bid: requestedCpcBidMicros === null ? target.cpc_bid : microsToCurrency(requestedCpcBidMicros),
    validate_only: Boolean(args.validateOnly),
    result_resource_name:
      result.results?.[index]?.resourceName || buildAdGroupResourceName(args, target.ad_group_id)
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["ad_group_id", "Ad group ID"],
    ["ad_group_name", "Ad group"],
    ["previous_status", "Previous status"],
    ["requested_status", "Requested status"],
    ["previous_cpc_bid", "Previous CPC bid"],
    ["requested_cpc_bid", "Requested CPC bid"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function listResponsiveSearchAds(args) {
  const whereParts = ["ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'"];
  const campaignFilter = buildCampaignFilter(args);
  const adGroupFilter = buildAdGroupFilter(args);
  const adFilter = buildAdFilter(args);

  if (campaignFilter) {
    whereParts.push(campaignFilter);
  }
  if (adGroupFilter) {
    whereParts.push(adGroupFilter);
  }
  if (adFilter) {
    whereParts.push(adFilter);
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group_ad.ad.id,
        ad_group_ad.status,
        ad_group_ad.ad.final_urls,
        ad_group_ad.ad.responsive_search_ad.path1,
        ad_group_ad.ad.responsive_search_ad.path2,
        ad_group_ad.ad.responsive_search_ad.headlines,
        ad_group_ad.ad.responsive_search_ad.descriptions
      FROM ad_group_ad
      WHERE ${whereParts.join("\n      AND ")}
      ORDER BY campaign.id, ad_group.id, ad_group_ad.ad.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const ads = rows.map(mapResponsiveSearchAdRow);
  printRows(ads, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["ad_group_id", "Ad group ID"],
    ["ad_group_name", "Ad group"],
    ["ad_id", "Ad ID"],
    ["status", "Status"],
    ["final_url", "Final URL"],
    ["headline_count", "Headlines"],
    ["description_count", "Descriptions"]
  ]);
}

async function createResponsiveSearchAd(args) {
  const adGroup = await resolveSingleAdGroupForCreate(args);
  const finalUrl = requireUrl(args.finalUrl, "--final-url");
  const responsiveSearchAd = buildResponsiveSearchAdPayload(args);

  const createPayload = {
    adGroup: buildAdGroupResourceName(args, adGroup.ad_group_id),
    status: normalizeAdStatus(args.newStatus || "PAUSED"),
    ad: {
      finalUrls: [finalUrl],
      responsiveSearchAd
    }
  };

  const result = await mutate("adGroupAds", [{ create: createPayload }], args);
  const payload = [
    {
      campaign_id: adGroup.campaign_id,
      campaign_name: adGroup.campaign_name,
      ad_group_id: adGroup.ad_group_id,
      ad_group_name: adGroup.ad_group_name,
      requested_status: createPayload.status,
      final_url: finalUrl,
      headline_count: responsiveSearchAd.headlines.length,
      description_count: responsiveSearchAd.descriptions.length,
      validate_only: Boolean(args.validateOnly),
      result_resource_name: result.results?.[0]?.resourceName || "(validate only or no resource returned)"
    }
  ];

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["ad_group_id", "Ad group ID"],
    ["ad_group_name", "Ad group"],
    ["requested_status", "Requested status"],
    ["final_url", "Final URL"],
    ["headline_count", "Headlines"],
    ["description_count", "Descriptions"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function updateResponsiveSearchAds(args) {
  const targets = await resolveResponsiveSearchAdTargets(args);
  const requestedStatus = args.newStatus ? normalizeAdStatus(args.newStatus) : null;
  const hasTextUpdate =
    Boolean(args.finalUrl) ||
    Boolean(args.path1) ||
    Boolean(args.path2) ||
    args.headlines.length > 0 ||
    args.descriptions.length > 0;

  if (!requestedStatus && !hasTextUpdate) {
    throw new Error("Provide at least one update field: --status, --final-url, --path1, --path2, --headline or --description.");
  }

  if (hasTextUpdate && targets.length > 1) {
    throw new Error("Text or URL updates require a unique target ad. Narrow the filter to one --ad-id.");
  }

  if (requestedStatus) {
    const statusOperations = targets.map((target) => ({
      update: {
        resourceName: buildAdGroupAdResourceName(args, target.ad_group_id, target.ad_id),
        status: requestedStatus
      },
      updateMask: "status"
    }));

    await mutate("adGroupAds", statusOperations, args);
  }

  if (hasTextUpdate) {
    const textOperations = targets.map((target) => ({
      update: {
        resourceName: buildAdResourceName(args, target.ad_id),
        finalUrls: [args.finalUrl ? requireUrl(args.finalUrl, "--final-url") : target.final_url],
        responsiveSearchAd: {
          path1: normalizeOptionalPath(args.path1, target.path1),
          path2: normalizeOptionalPath(args.path2, target.path2),
          headlines: buildAssetArray(args.headlines, target.headlines, 3, 15, "headline"),
          descriptions: buildAssetArray(args.descriptions, target.descriptions, 2, 4, "description")
        }
      },
      updateMask: "final_urls,responsive_search_ad.headlines,responsive_search_ad.descriptions,responsive_search_ad.path1,responsive_search_ad.path2"
    }));

    await mutate("ads", textOperations, args);
  }

  const payload = targets.map((target, index) => ({
    campaign_id: target.campaign_id,
    campaign_name: target.campaign_name,
    ad_group_id: target.ad_group_id,
    ad_group_name: target.ad_group_name,
    ad_id: target.ad_id,
    previous_status: target.status,
    requested_status: requestedStatus || target.status,
    previous_final_url: target.final_url,
    requested_final_url: args.finalUrl || target.final_url,
    previous_headlines: target.headline_count,
    requested_headlines: args.headlines.length || target.headline_count,
    previous_descriptions: target.description_count,
    requested_descriptions: args.descriptions.length || target.description_count,
    validate_only: Boolean(args.validateOnly),
    result_resource_name: buildAdGroupAdResourceName(args, target.ad_group_id, target.ad_id)
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["ad_group_id", "Ad group ID"],
    ["ad_group_name", "Ad group"],
    ["ad_id", "Ad ID"],
    ["previous_status", "Previous status"],
    ["requested_status", "Requested status"],
    ["previous_final_url", "Previous URL"],
    ["requested_final_url", "Requested URL"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function updateCampaignBudgets(args) {
  const targetRows = await resolveBudgetTargets(args);
  const amountMicros = resolveBudgetMicros(args);

  const operations = targetRows.map((row) => ({
    update: {
      resourceName: buildCampaignBudgetResourceName(args, row.campaign_budget_id),
      amountMicros: String(amountMicros)
    },
    updateMask: "amount_micros"
  }));

  const result = await mutate("campaignBudgets", operations, args);
  const payload = targetRows.map((row, index) => ({
    campaign_id: row.campaign_id,
    campaign_name: row.campaign_name,
    campaign_budget_id: row.campaign_budget_id,
    previous_amount: row.amount,
    previous_amount_micros: row.amount_micros,
    requested_amount: microsToCurrency(amountMicros),
    requested_amount_micros: amountMicros,
    validate_only: Boolean(args.validateOnly),
    result_resource_name:
      result.results?.[index]?.resourceName || buildCampaignBudgetResourceName(args, row.campaign_budget_id)
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["campaign_budget_id", "Budget ID"],
    ["previous_amount", "Previous amount"],
    ["requested_amount", "Requested amount"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function listCampaignTargets(args) {
  const campaignTargets = await resolveCampaignTargets(args);
  const campaignIds = campaignTargets.map((campaign) => campaign.id);
  const criteriaRows = await loadCampaignCriteriaByCampaignIds(args, campaignIds);
  const criteriaByCampaignId = groupRowsBy(criteriaRows, "campaign_id");

  const rows = campaignTargets.flatMap((campaign) => {
    const criteria = criteriaByCampaignId.get(String(campaign.id)) || [];
    if (!criteria.length) {
      return [
        {
          campaign_id: campaign.id,
          campaign_name: campaign.name,
          positive_geo_target_type: campaign.positive_geo_target_type,
          negative_geo_target_type: campaign.negative_geo_target_type,
          criterion_type: "",
          criterion_id: "",
          target_name: "",
          target_resource: "",
          negative: ""
        }
      ];
    }

    return criteria.map((criterion) => ({
      campaign_id: campaign.id,
      campaign_name: campaign.name,
      positive_geo_target_type: campaign.positive_geo_target_type,
      negative_geo_target_type: campaign.negative_geo_target_type,
      criterion_type: criterion.criterion_type,
      criterion_id: criterion.criterion_id,
      target_name: criterion.target_name,
      target_resource: criterion.target_resource,
      negative: criterion.negative
    }));
  });

  printRows(rows, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["positive_geo_target_type", "Positive geo type"],
    ["negative_geo_target_type", "Negative geo type"],
    ["criterion_type", "Criterion type"],
    ["criterion_id", "Criterion ID"],
    ["target_name", "Target"],
    ["target_resource", "Resource"],
    ["negative", "Negative"]
  ]);
}

async function lookupLocations(args) {
  if (!args.locationNames.length && !args.locationResources.length) {
    throw new Error("Provide at least one --location-name or --location-resource for lookup-locations.");
  }

  const filters = [];
  if (args.locationNames.length) {
    filters.push(`geo_target_constant.name IN (${args.locationNames.map((name) => `'${escapeGaqlString(name)}'`).join(", ")})`);
  }
  if (args.locationResources.length) {
    filters.push(
      `geo_target_constant.resource_name IN (${args.locationResources.map((resource) => `'${escapeGaqlString(normalizeResourceName(resource, "geoTargetConstants"))}'`).join(", ")})`
    );
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        geo_target_constant.resource_name,
        geo_target_constant.id,
        geo_target_constant.name,
        geo_target_constant.canonical_name,
        geo_target_constant.country_code,
        geo_target_constant.target_type,
        geo_target_constant.status
      FROM geo_target_constant
      WHERE ${filters.join("\n        OR ")}
      ORDER BY geo_target_constant.name
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const payload = rows.map((row) => ({
    resource_name: row.geoTargetConstant?.resourceName,
    id: row.geoTargetConstant?.id,
    name: row.geoTargetConstant?.name,
    canonical_name: row.geoTargetConstant?.canonicalName,
    country_code: row.geoTargetConstant?.countryCode,
    target_type: row.geoTargetConstant?.targetType,
    status: row.geoTargetConstant?.status
  }));

  printRows(payload, args.format, [
    ["resource_name", "Resource"],
    ["id", "ID"],
    ["name", "Name"],
    ["canonical_name", "Canonical name"],
    ["country_code", "Country"],
    ["target_type", "Target type"],
    ["status", "Status"]
  ]);
}

async function lookupLanguages(args) {
  if (!args.languageNames.length && !args.languageCodes.length && !args.languageResources.length) {
    throw new Error("Provide at least one --language-name, --language-code or --language-resource for lookup-languages.");
  }

  const filters = [];
  if (args.languageNames.length) {
    filters.push(`language_constant.name IN (${args.languageNames.map((name) => `'${escapeGaqlString(name)}'`).join(", ")})`);
  }
  if (args.languageCodes.length) {
    filters.push(`language_constant.code IN (${args.languageCodes.map((code) => `'${escapeGaqlString(code)}'`).join(", ")})`);
  }
  if (args.languageResources.length) {
    filters.push(
      `language_constant.resource_name IN (${args.languageResources.map((resource) => `'${escapeGaqlString(normalizeResourceName(resource, "languageConstants"))}'`).join(", ")})`
    );
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        language_constant.resource_name,
        language_constant.id,
        language_constant.name,
        language_constant.code
      FROM language_constant
      WHERE ${filters.join("\n        OR ")}
      ORDER BY language_constant.name
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const payload = rows.map((row) => ({
    resource_name: row.languageConstant?.resourceName,
    id: row.languageConstant?.id,
    name: row.languageConstant?.name,
    code: row.languageConstant?.code
  }));

  printRows(payload, args.format, [
    ["resource_name", "Resource"],
    ["id", "ID"],
    ["name", "Name"],
    ["code", "Code"]
  ]);
}

async function addLocationTargets(args) {
  const campaign = await resolveSingleCampaignForCreate(args);
  const locationResources = ensureNormalizedResources(args.locationResources, "geoTargetConstants", "--location-resource");
  const existingCriteria = await loadCampaignCriteriaByCampaignIds(args, [campaign.id]);
  const existingResources = new Set(
    existingCriteria
      .filter((row) => row.criterion_type === "LOCATION")
      .map((row) => normalizeResourceName(row.target_resource, "geoTargetConstants"))
  );

  const resourcesToCreate = locationResources.filter((resource) => !existingResources.has(resource));
  if (!resourcesToCreate.length) {
    throw new Error("All requested location targets already exist on the selected campaign.");
  }

  const operations = resourcesToCreate.map((resource) => ({
    create: {
      campaign: buildCampaignResourceName(args, campaign.id),
      location: {
        geoTargetConstant: resource
      }
    }
  }));

  const result = await mutate("campaignCriteria", operations, args);
  const payload = resourcesToCreate.map((resource, index) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    action: "add_location_target",
    target_resource: resource,
    validate_only: Boolean(args.validateOnly),
    result_resource_name: result.results?.[index]?.resourceName || "(validate only or no resource returned)"
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["action", "Action"],
    ["target_resource", "Target resource"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function removeLocationTargets(args) {
  const campaign = await resolveSingleCampaignForCreate(args);
  const requestedResources = new Set(ensureNormalizedResources(args.locationResources, "geoTargetConstants", "--location-resource"));
  const existingCriteria = await loadCampaignCriteriaByCampaignIds(args, [campaign.id]);
  const targetCriteria = existingCriteria.filter(
    (row) => row.criterion_type === "LOCATION" && requestedResources.has(normalizeResourceName(row.target_resource, "geoTargetConstants"))
  );

  if (!targetCriteria.length) {
    throw new Error("No matching location target criteria found on the selected campaign.");
  }

  const operations = targetCriteria.map((criterion) => ({
    remove: buildCampaignCriterionResourceName(args, campaign.id, criterion.criterion_id)
  }));

  const result = await mutate("campaignCriteria", operations, args);
  const payload = targetCriteria.map((criterion, index) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    action: "remove_location_target",
    criterion_id: criterion.criterion_id,
    target_resource: criterion.target_resource,
    validate_only: Boolean(args.validateOnly),
    result_resource_name:
      result.results?.[index]?.resourceName || buildCampaignCriterionResourceName(args, campaign.id, criterion.criterion_id)
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["action", "Action"],
    ["criterion_id", "Criterion ID"],
    ["target_resource", "Target resource"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function addLanguageTargets(args) {
  const campaign = await resolveSingleCampaignForCreate(args);
  const languageResources = ensureNormalizedResources(args.languageResources, "languageConstants", "--language-resource");
  const existingCriteria = await loadCampaignCriteriaByCampaignIds(args, [campaign.id]);
  const existingResources = new Set(
    existingCriteria
      .filter((row) => row.criterion_type === "LANGUAGE")
      .map((row) => normalizeResourceName(row.target_resource, "languageConstants"))
  );

  const resourcesToCreate = languageResources.filter((resource) => !existingResources.has(resource));
  if (!resourcesToCreate.length) {
    throw new Error("All requested language targets already exist on the selected campaign.");
  }

  const operations = resourcesToCreate.map((resource) => ({
    create: {
      campaign: buildCampaignResourceName(args, campaign.id),
      language: {
        languageConstant: resource
      }
    }
  }));

  const result = await mutate("campaignCriteria", operations, args);
  const payload = resourcesToCreate.map((resource, index) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    action: "add_language_target",
    target_resource: resource,
    validate_only: Boolean(args.validateOnly),
    result_resource_name: result.results?.[index]?.resourceName || "(validate only or no resource returned)"
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["action", "Action"],
    ["target_resource", "Target resource"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function removeLanguageTargets(args) {
  const campaign = await resolveSingleCampaignForCreate(args);
  const requestedResources = new Set(ensureNormalizedResources(args.languageResources, "languageConstants", "--language-resource"));
  const existingCriteria = await loadCampaignCriteriaByCampaignIds(args, [campaign.id]);
  const targetCriteria = existingCriteria.filter(
    (row) => row.criterion_type === "LANGUAGE" && requestedResources.has(normalizeResourceName(row.target_resource, "languageConstants"))
  );

  if (!targetCriteria.length) {
    throw new Error("No matching language target criteria found on the selected campaign.");
  }

  const operations = targetCriteria.map((criterion) => ({
    remove: buildCampaignCriterionResourceName(args, campaign.id, criterion.criterion_id)
  }));

  const result = await mutate("campaignCriteria", operations, args);
  const payload = targetCriteria.map((criterion, index) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    action: "remove_language_target",
    criterion_id: criterion.criterion_id,
    target_resource: criterion.target_resource,
    validate_only: Boolean(args.validateOnly),
    result_resource_name:
      result.results?.[index]?.resourceName || buildCampaignCriterionResourceName(args, campaign.id, criterion.criterion_id)
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["action", "Action"],
    ["criterion_id", "Criterion ID"],
    ["target_resource", "Target resource"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function updateGeoTargetType(args) {
  const campaigns = await resolveCampaignTargets(args);
  const positive = args.positiveGeoTargetType ? normalizeGeoTargetType(args.positiveGeoTargetType, "positive") : null;
  const negative = args.negativeGeoTargetType ? normalizeGeoTargetType(args.negativeGeoTargetType, "negative") : null;

  if (!positive && !negative) {
    throw new Error("Provide --positive-geo-target-type or --negative-geo-target-type for update-geo-target-type.");
  }

  const operations = campaigns.map((campaign) => ({
    update: {
      resourceName: buildCampaignResourceName(args, campaign.id),
      geoTargetTypeSetting: {
        positiveGeoTargetType: positive || campaign.positive_geo_target_type,
        negativeGeoTargetType: negative || campaign.negative_geo_target_type
      }
    },
    updateMask: "geo_target_type_setting.positive_geo_target_type,geo_target_type_setting.negative_geo_target_type"
  }));

  const result = await mutate("campaigns", operations, args);
  const payload = campaigns.map((campaign, index) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    previous_positive_geo_target_type: campaign.positive_geo_target_type,
    previous_negative_geo_target_type: campaign.negative_geo_target_type,
    requested_positive_geo_target_type: positive || campaign.positive_geo_target_type,
    requested_negative_geo_target_type: negative || campaign.negative_geo_target_type,
    validate_only: Boolean(args.validateOnly),
    result_resource_name: result.results?.[index]?.resourceName || buildCampaignResourceName(args, campaign.id)
  }));

  printRows(payload, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["previous_positive_geo_target_type", "Previous positive"],
    ["requested_positive_geo_target_type", "Requested positive"],
    ["previous_negative_geo_target_type", "Previous negative"],
    ["requested_negative_geo_target_type", "Requested negative"],
    ["validate_only", "Validate only"],
    ["result_resource_name", "Resource"]
  ]);
}

async function exportCampaignState(args) {
  const campaigns = await resolveCampaignTargets(args);
  const campaignIds = campaigns.map((campaign) => campaign.id);
  const budgets = await loadBudgetRowsByCampaignIds(args, campaignIds);
  const criteria = await loadCampaignCriteriaByCampaignIds(args, campaignIds);
  const adGroups = await loadAdGroupsByCampaignIds(args, campaignIds);
  const rsaAds = await loadResponsiveSearchAdsByCampaignIds(args, campaignIds);

  const budgetsByCampaignId = groupRowsBy(budgets, "campaign_id");
  const criteriaByCampaignId = groupRowsBy(criteria, "campaign_id");
  const adGroupsByCampaignId = groupRowsBy(adGroups, "campaign_id");
  const rsaAdsByCampaignId = groupRowsBy(rsaAds, "campaign_id");

  const payload = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    customer_id: resolveTargetCustomerId(args),
    campaigns: campaigns.map((campaign) => ({
      campaign_id: String(campaign.id),
      campaign_name: campaign.name,
      status: campaign.status,
      geo_target_type_setting: {
        positive: campaign.positive_geo_target_type,
        negative: campaign.negative_geo_target_type
      },
      budgets: budgetsByCampaignId.get(String(campaign.id)) || [],
      criteria: criteriaByCampaignId.get(String(campaign.id)) || [],
      ad_groups: adGroupsByCampaignId.get(String(campaign.id)) || [],
      responsive_search_ads: rsaAdsByCampaignId.get(String(campaign.id)) || []
    }))
  };

  writeJsonPayload(payload, args.outputPath);
  if (!args.outputPath) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(`Saved campaign state export to ${path.resolve(args.outputPath)}`);
}

async function applyCampaignChangeSet(args) {
  if (!args.inputPath) {
    throw new Error("Provide --input for apply-campaign-change-set.");
  }

  const resolvedInputPath = path.resolve(args.inputPath);
  if (!existsSync(resolvedInputPath)) {
    throw new Error(`Change set file not found at ${resolvedInputPath}.`);
  }

  const changeSet = JSON.parse(readFileSync(resolvedInputPath, "utf8"));
  const operations = Array.isArray(changeSet.operations) ? changeSet.operations : [];
  if (!operations.length) {
    throw new Error("Change set file must contain a non-empty operations array.");
  }

  const results = [];
  for (const operation of operations) {
    const normalizedOperation = normalizeChangeSetOperation(operation);
    const operationArgs = {
      ...args,
      campaigns: [],
      campaignIds: [normalizedOperation.campaign_id],
      campaignBudgetIds: [],
      adGroupIds: [],
      adIds: [],
      locationResources: normalizedOperation.location_resources || [],
      languageResources: normalizedOperation.language_resources || [],
      amount: normalizedOperation.amount,
      amountMicros: normalizedOperation.amount_micros,
      newStatus: normalizedOperation.status,
      positiveGeoTargetType: normalizedOperation.positive_geo_target_type,
      negativeGeoTargetType: normalizedOperation.negative_geo_target_type,
      validateOnly: args.validateOnly
    };

    if (normalizedOperation.type === "pause_campaign") {
      await updateCampaignStatus(operationArgs, "PAUSED");
    } else if (normalizedOperation.type === "enable_campaign") {
      await updateCampaignStatus(operationArgs, "ENABLED");
    } else if (normalizedOperation.type === "update_budget") {
      await updateCampaignBudgets(operationArgs);
    } else if (normalizedOperation.type === "add_location_targets") {
      await addLocationTargets(operationArgs);
    } else if (normalizedOperation.type === "remove_location_targets") {
      await removeLocationTargets(operationArgs);
    } else if (normalizedOperation.type === "add_language_targets") {
      await addLanguageTargets(operationArgs);
    } else if (normalizedOperation.type === "remove_language_targets") {
      await removeLanguageTargets(operationArgs);
    } else if (normalizedOperation.type === "update_geo_target_type") {
      await updateGeoTargetType(operationArgs);
    } else {
      throw new Error(`Unsupported change set operation type: ${normalizedOperation.type}`);
    }

    results.push({
      type: normalizedOperation.type,
      campaign_id: normalizedOperation.campaign_id,
      validate_only: Boolean(args.validateOnly),
      status: "applied"
    });
  }

  printRows(results, args.format, [
    ["type", "Operation"],
    ["campaign_id", "Campaign ID"],
    ["validate_only", "Validate only"],
    ["status", "Status"]
  ]);
}

async function resolveBudgetTargets(args) {
  if (args.campaignBudgetIds.length) {
    const rows = await runSearch(
      args,
      `
        SELECT
          campaign.id,
          campaign.name,
          campaign_budget.id,
          campaign_budget.name,
          campaign_budget.amount_micros
        FROM campaign
        WHERE ${buildCampaignBudgetFilter(args)}
        ORDER BY campaign.id
        LIMIT ${resolveLimit(args.limit, 200)}
      `
    );

    const budgets = rows.map(mapBudgetRow);
    if (!budgets.length) {
      throw new Error("No campaign budgets matched the requested --campaign-budget-id filter.");
    }
    return budgets;
  }

  if (!args.campaignIds.length && !args.campaigns.length) {
    throw new Error("Provide at least one --campaign-budget-id or --campaign-id or --campaign for update-budgets.");
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        campaign_budget.id,
        campaign_budget.name,
        campaign_budget.amount_micros
      FROM campaign
      WHERE ${buildCampaignFilter(args)}
      ORDER BY campaign.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const budgets = rows.map(mapBudgetRow);
  if (!budgets.length) {
    throw new Error("No campaign budgets matched the requested campaign filter.");
  }
  return budgets;
}

async function resolveCampaignTargets(args) {
  if (!args.campaignIds.length && !args.campaigns.length) {
    throw new Error("Provide --campaign-id or --campaign.");
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        campaign.geo_target_type_setting.positive_geo_target_type,
        campaign.geo_target_type_setting.negative_geo_target_type
      FROM campaign
      WHERE ${buildCampaignFilter(args)}
      ORDER BY campaign.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const campaigns = rows.map((row) => ({
    id: row.campaign?.id,
    name: row.campaign?.name,
    status: row.campaign?.status,
    positive_geo_target_type: row.campaign?.geoTargetTypeSetting?.positiveGeoTargetType || "",
    negative_geo_target_type: row.campaign?.geoTargetTypeSetting?.negativeGeoTargetType || ""
  }));

  if (!campaigns.length) {
    throw new Error("No campaign matched the requested filter.");
  }

  return campaigns;
}

function mapBudgetRow(row) {
  return {
    campaign_id: row.campaign?.id,
    campaign_name: row.campaign?.name,
    campaign_budget_id: row.campaignBudget?.id,
    campaign_budget_name: row.campaignBudget?.name,
    amount_micros: toNumber(row.campaignBudget?.amountMicros),
    amount: microsToCurrency(row.campaignBudget?.amountMicros)
  };
}

async function resolveSingleCampaignForCreate(args) {
  const campaigns = await resolveCampaignTargets(args);
  if (campaigns.length > 1) {
    throw new Error("This operation requires a unique target campaign. Narrow the filter to a single campaign.");
  }

  return campaigns[0];
}

async function resolveAdGroupTargets(args) {
  if (!args.adGroupIds.length && !args.campaignIds.length && !args.campaigns.length) {
    throw new Error("Provide --ad-group-id or a campaign filter for update-ad-groups.");
  }

  const whereParts = [];
  const campaignFilter = buildCampaignFilter(args);
  const adGroupFilter = buildAdGroupFilter(args);

  if (campaignFilter) {
    whereParts.push(campaignFilter);
  }
  if (adGroupFilter) {
    whereParts.push(adGroupFilter);
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        ad_group.type,
        ad_group.cpc_bid_micros
      FROM ad_group
      WHERE ${whereParts.join("\n      AND ")}
      ORDER BY campaign.id, ad_group.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const adGroups = rows.map(mapAdGroupRow);
  if (!adGroups.length) {
    throw new Error("No ad groups matched the requested filter.");
  }
  return adGroups;
}

async function resolveSingleAdGroupForCreate(args) {
  const targets = await resolveAdGroupTargets(args);
  if (targets.length > 1) {
    throw new Error("create-rsa-ad requires a unique target ad group. Narrow the filter to one --ad-group-id.");
  }
  return targets[0];
}

async function resolveResponsiveSearchAdTargets(args) {
  if (!args.adIds.length && !args.adGroupIds.length && !args.campaignIds.length && !args.campaigns.length) {
    throw new Error("Provide --ad-id, --ad-group-id or a campaign filter for rsa-ads/update-rsa-ads.");
  }

  const whereParts = ["ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'"];
  const campaignFilter = buildCampaignFilter(args);
  const adGroupFilter = buildAdGroupFilter(args);
  const adFilter = buildAdFilter(args);

  if (campaignFilter) {
    whereParts.push(campaignFilter);
  }
  if (adGroupFilter) {
    whereParts.push(adGroupFilter);
  }
  if (adFilter) {
    whereParts.push(adFilter);
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group_ad.ad.id,
        ad_group_ad.status,
        ad_group_ad.ad.final_urls,
        ad_group_ad.ad.responsive_search_ad.path1,
        ad_group_ad.ad.responsive_search_ad.path2,
        ad_group_ad.ad.responsive_search_ad.headlines,
        ad_group_ad.ad.responsive_search_ad.descriptions
      FROM ad_group_ad
      WHERE ${whereParts.join("\n      AND ")}
      ORDER BY campaign.id, ad_group.id, ad_group_ad.ad.id
      LIMIT ${resolveLimit(args.limit, 200)}
    `
  );

  const ads = rows.map(mapResponsiveSearchAdRow);
  if (!ads.length) {
    throw new Error("No responsive search ads matched the requested filter.");
  }
  return ads;
}

function mapAdGroupRow(row) {
  return {
    campaign_id: row.campaign?.id,
    campaign_name: row.campaign?.name,
    ad_group_id: row.adGroup?.id,
    ad_group_name: row.adGroup?.name,
    status: row.adGroup?.status,
    type: row.adGroup?.type,
    cpc_bid_micros: toNumber(row.adGroup?.cpcBidMicros),
    cpc_bid: microsToCurrency(row.adGroup?.cpcBidMicros)
  };
}

function mapResponsiveSearchAdRow(row) {
  const ad = row.adGroupAd?.ad || {};
  const rsa = ad.responsiveSearchAd || {};
  const headlines = (rsa.headlines || []).map((item) => item.text).filter(Boolean);
  const descriptions = (rsa.descriptions || []).map((item) => item.text).filter(Boolean);
  const finalUrls = ad.finalUrls || [];

  return {
    campaign_id: row.campaign?.id,
    campaign_name: row.campaign?.name,
    ad_group_id: row.adGroup?.id,
    ad_group_name: row.adGroup?.name,
    ad_id: ad.id,
    status: row.adGroupAd?.status,
    final_url: finalUrls[0] || "",
    final_urls: finalUrls,
    path1: rsa.path1 || "",
    path2: rsa.path2 || "",
    headlines,
    descriptions,
    headline_count: headlines.length,
    description_count: descriptions.length
  };
}

async function loadCampaignCriteriaByCampaignIds(args, campaignIds) {
  if (!campaignIds.length) {
    return [];
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        campaign_criterion.criterion_id,
        campaign_criterion.type,
        campaign_criterion.location.geo_target_constant,
        campaign_criterion.language.language_constant,
        campaign_criterion.negative
      FROM campaign_criterion
      WHERE campaign.id IN (${campaignIds.map((id) => normalizeDigits(id, "campaignId")).join(", ")})
        AND campaign_criterion.status != 'REMOVED'
        AND campaign_criterion.type IN ('LOCATION', 'LANGUAGE')
      ORDER BY campaign.id, campaign_criterion.type, campaign_criterion.criterion_id
      LIMIT ${resolveLimit(args.limit, 500)}
    `
  );

  const locationResources = [...new Set(rows.map((row) => row.campaignCriterion?.location?.geoTargetConstant).filter(Boolean))];
  const languageResources = [...new Set(rows.map((row) => row.campaignCriterion?.language?.languageConstant).filter(Boolean))];
  const locationLookup = await loadLocationConstantMap(args, locationResources);
  const languageLookup = await loadLanguageConstantMap(args, languageResources);

  return rows.map((row) => {
    const type = row.campaignCriterion?.type;
    const locationResource = row.campaignCriterion?.location?.geoTargetConstant || "";
    const languageResource = row.campaignCriterion?.language?.languageConstant || "";
    const targetResource = type === "LOCATION" ? locationResource : languageResource;
    const location = locationLookup.get(locationResource);
    const language = languageLookup.get(languageResource);

    return {
      campaign_id: row.campaign?.id,
      campaign_name: row.campaign?.name,
      criterion_id: row.campaignCriterion?.criterionId,
      criterion_type: type,
      negative: row.campaignCriterion?.negative,
      target_resource: targetResource,
      target_name:
        type === "LOCATION"
          ? location?.canonical_name || location?.name || targetResource
          : language?.name || targetResource,
      target_code: type === "LANGUAGE" ? language?.code || "" : location?.country_code || ""
    };
  });
}

async function loadBudgetRowsByCampaignIds(args, campaignIds) {
  if (!campaignIds.length) {
    return [];
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        campaign_budget.id,
        campaign_budget.name,
        campaign_budget.amount_micros
      FROM campaign
      WHERE campaign.id IN (${campaignIds.map((id) => normalizeDigits(id, "campaignId")).join(", ")})
      ORDER BY campaign.id
      LIMIT ${resolveLimit(args.limit, 500)}
    `
  );

  return rows.map(mapBudgetRow);
}

async function loadAdGroupsByCampaignIds(args, campaignIds) {
  if (!campaignIds.length) {
    return [];
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        ad_group.type,
        ad_group.cpc_bid_micros
      FROM ad_group
      WHERE campaign.id IN (${campaignIds.map((id) => normalizeDigits(id, "campaignId")).join(", ")})
      ORDER BY campaign.id, ad_group.id
      LIMIT ${resolveLimit(args.limit, 500)}
    `
  );

  return rows.map(mapAdGroupRow);
}

async function loadResponsiveSearchAdsByCampaignIds(args, campaignIds) {
  if (!campaignIds.length) {
    return [];
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        campaign.id,
        campaign.name,
        ad_group.id,
        ad_group.name,
        ad_group_ad.ad.id,
        ad_group_ad.status,
        ad_group_ad.ad.final_urls,
        ad_group_ad.ad.responsive_search_ad.path1,
        ad_group_ad.ad.responsive_search_ad.path2,
        ad_group_ad.ad.responsive_search_ad.headlines,
        ad_group_ad.ad.responsive_search_ad.descriptions
      FROM ad_group_ad
      WHERE campaign.id IN (${campaignIds.map((id) => normalizeDigits(id, "campaignId")).join(", ")})
        AND ad_group_ad.ad.type = 'RESPONSIVE_SEARCH_AD'
      ORDER BY campaign.id, ad_group.id, ad_group_ad.ad.id
      LIMIT ${resolveLimit(args.limit, 500)}
    `
  );

  return rows.map(mapResponsiveSearchAdRow);
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

function buildCampaignBudgetResourceName(args, campaignBudgetId) {
  return `customers/${resolveTargetCustomerId(args)}/campaignBudgets/${normalizeDigits(campaignBudgetId, "campaignBudgetId")}`;
}

function buildCampaignCriterionResourceName(args, campaignId, criterionId) {
  return `customers/${resolveTargetCustomerId(args)}/campaignCriteria/${normalizeDigits(campaignId, "campaignId")}~${normalizeDigits(criterionId, "criterionId")}`;
}

function buildCampaignBudgetFilter(args) {
  if (!args.campaignBudgetIds?.length) {
    return "";
  }

  return `campaign_budget.id IN (${args.campaignBudgetIds.map((id) => normalizeDigits(id, "campaignBudgetId")).join(", ")})`;
}

function buildAdGroupResourceName(args, adGroupId) {
  return `customers/${resolveTargetCustomerId(args)}/adGroups/${normalizeDigits(adGroupId, "adGroupId")}`;
}

function buildAdGroupAdResourceName(args, adGroupId, adId) {
  return `customers/${resolveTargetCustomerId(args)}/adGroupAds/${normalizeDigits(adGroupId, "adGroupId")}~${normalizeDigits(adId, "adId")}`;
}

function buildAdResourceName(args, adId) {
  return `customers/${resolveTargetCustomerId(args)}/ads/${normalizeDigits(adId, "adId")}`;
}

function buildAdGroupFilter(args) {
  const parts = [];

  if (args.adGroupIds?.length) {
    parts.push(`ad_group.id IN (${args.adGroupIds.map((id) => normalizeDigits(id, "adGroupId")).join(", ")})`);
  }

  if (args.adGroupName) {
    parts.push(`ad_group.name = '${escapeGaqlString(args.adGroupName)}'`);
  }

  if (!parts.length) {
    return "";
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `(${parts.join(" OR ")})`;
}

function buildAdFilter(args) {
  if (!args.adIds?.length) {
    return "";
  }

  return `ad_group_ad.ad.id IN (${args.adIds.map((id) => normalizeDigits(id, "adId")).join(", ")})`;
}

function normalizeResourceName(value, collection) {
  const text = String(value || "").trim();
  if (!text) {
    throw new Error(`Resource name for ${collection} cannot be empty.`);
  }

  if (text.includes("/")) {
    const tail = text.split("/").pop();
    return `${collection}/${tail}`;
  }

  return `${collection}/${text}`;
}

function ensureNormalizedResources(values, collection, flagLabel) {
  if (!values.length) {
    throw new Error(`Provide at least one ${flagLabel}.`);
  }
  return values.map((value) => normalizeResourceName(value, collection));
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

function resolveBudgetMicros(source) {
  if (source.amountMicros !== undefined && source.amountMicros !== null && source.amountMicros !== "") {
    return normalizePositiveInteger(source.amountMicros, "amountMicros");
  }

  if (source.amount !== undefined && source.amount !== null && source.amount !== "") {
    const numeric = Number(source.amount);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      throw new Error("amount must be a positive number.");
    }
    return Math.round(numeric * 1_000_000);
  }

  throw new Error("Provide --amount or --amount-micros for update-budgets.");
}

function resolveOptionalBidMicros(source) {
  if (source.cpcBidMicros !== undefined && source.cpcBidMicros !== null && source.cpcBidMicros !== "") {
    return normalizePositiveInteger(source.cpcBidMicros, "cpcBidMicros");
  }

  if (source.cpcBid !== undefined && source.cpcBid !== null && source.cpcBid !== "") {
    const numeric = Number(source.cpcBid);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      throw new Error("cpcBid must be a positive number.");
    }
    return Math.round(numeric * 1_000_000);
  }

  return null;
}

function buildResponsiveSearchAdPayload(args) {
  const finalHeadlines = buildAssetArray(args.headlines, [], 3, 15, "headline");
  const finalDescriptions = buildAssetArray(args.descriptions, [], 2, 4, "description");

  return {
    path1: normalizeOptionalPath(args.path1, ""),
    path2: normalizeOptionalPath(args.path2, ""),
    headlines: finalHeadlines,
    descriptions: finalDescriptions
  };
}

function buildAssetArray(requested, fallback, minItems, maxItems, label) {
  const values = (requested.length ? requested : fallback)
    .map((item) => normalizeAssetText(item, label))
    .filter(Boolean);

  if (values.length < minItems) {
    throw new Error(`${label} requires at least ${minItems} items.`);
  }
  if (values.length > maxItems) {
    throw new Error(`${label} supports at most ${maxItems} items.`);
  }

  return values.map((text) => ({ text }));
}

function normalizeAssetText(value, label) {
  const text = String(value || "").trim();
  if (!text) {
    throw new Error(`${label} text cannot be empty.`);
  }

  const limit = label === "headline" ? 30 : 90;
  if (text.length > limit) {
    throw new Error(`${label} text exceeds ${limit} characters.`);
  }

  return text;
}

function normalizeOptionalPath(requestedValue, fallbackValue) {
  const raw = requestedValue !== undefined && requestedValue !== null && requestedValue !== "" ? requestedValue : fallbackValue;
  const text = String(raw || "").trim();
  if (!text) {
    return "";
  }
  if (text.length > 15) {
    throw new Error("path values must be 15 characters or fewer.");
  }
  return text;
}

function requireUrl(value, label) {
  const text = String(value || "").trim();
  if (!text) {
    throw new Error(`${label} is required.`);
  }

  try {
    const parsed = new URL(text);
    if (!/^https?:$/.test(parsed.protocol)) {
      throw new Error("URL protocol must be http or https.");
    }
    return parsed.toString();
  } catch (error) {
    throw new Error(`${label} must be a valid http/https URL. ${error.message}`);
  }
}

function normalizeAdStatus(value) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase();

  if (["ENABLED", "PAUSED", "REMOVED"].includes(normalized)) {
    return normalized;
  }

  throw new Error("ad status must be ENABLED, PAUSED or REMOVED.");
}

function normalizeAdGroupStatus(value) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase();

  if (["ENABLED", "PAUSED", "REMOVED"].includes(normalized)) {
    return normalized;
  }

  throw new Error("status must be ENABLED, PAUSED or REMOVED.");
}

function normalizeAdGroupType(value) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase();

  if (normalized === "SEARCH_STANDARD") {
    return normalized;
  }

  throw new Error("type must be SEARCH_STANDARD.");
}

function normalizePositiveInteger(value, label) {
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return numeric;
}

function normalizeGeoTargetType(value, label) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase();

  if (["PRESENCE", "PRESENCE_OR_INTEREST", "SEARCH_INTEREST"].includes(normalized)) {
    return normalized;
  }

  throw new Error(`${label} geo target type must be PRESENCE, PRESENCE_OR_INTEREST or SEARCH_INTEREST.`);
}

function normalizeChangeSetOperation(operation) {
  if (!operation || typeof operation !== "object") {
    throw new Error("Each change set operation must be an object.");
  }

  const type = String(operation.type || "").trim();
  const campaignId = normalizeDigits(operation.campaign_id, "campaign_id");
  return {
    type,
    campaign_id: campaignId,
    amount: operation.amount,
    amount_micros: operation.amount_micros,
    status: operation.status,
    positive_geo_target_type: operation.positive_geo_target_type,
    negative_geo_target_type: operation.negative_geo_target_type,
    location_resources: Array.isArray(operation.location_resources) ? operation.location_resources : [],
    language_resources: Array.isArray(operation.language_resources) ? operation.language_resources : []
  };
}

async function loadLocationConstantMap(args, resourceNames) {
  const uniqueResources = [...new Set(resourceNames.map((resource) => normalizeResourceName(resource, "geoTargetConstants")))];
  if (!uniqueResources.length) {
    return new Map();
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        geo_target_constant.resource_name,
        geo_target_constant.name,
        geo_target_constant.canonical_name,
        geo_target_constant.country_code,
        geo_target_constant.target_type,
        geo_target_constant.status
      FROM geo_target_constant
      WHERE geo_target_constant.resource_name IN (${uniqueResources.map((resource) => `'${escapeGaqlString(resource)}'`).join(", ")})
      LIMIT ${resolveLimit(uniqueResources.length, uniqueResources.length)}
    `
  );

  return new Map(
    rows.map((row) => [
      row.geoTargetConstant?.resourceName,
      {
        name: row.geoTargetConstant?.name,
        canonical_name: row.geoTargetConstant?.canonicalName,
        country_code: row.geoTargetConstant?.countryCode,
        target_type: row.geoTargetConstant?.targetType,
        status: row.geoTargetConstant?.status
      }
    ])
  );
}

async function loadLanguageConstantMap(args, resourceNames) {
  const uniqueResources = [...new Set(resourceNames.map((resource) => normalizeResourceName(resource, "languageConstants")))];
  if (!uniqueResources.length) {
    return new Map();
  }

  const rows = await runSearch(
    args,
    `
      SELECT
        language_constant.resource_name,
        language_constant.id,
        language_constant.name,
        language_constant.code
      FROM language_constant
      WHERE language_constant.resource_name IN (${uniqueResources.map((resource) => `'${escapeGaqlString(resource)}'`).join(", ")})
      LIMIT ${resolveLimit(uniqueResources.length, uniqueResources.length)}
    `
  );

  return new Map(
    rows.map((row) => [
      row.languageConstant?.resourceName,
      {
        id: row.languageConstant?.id,
        name: row.languageConstant?.name,
        code: row.languageConstant?.code
      }
    ])
  );
}

function groupRowsBy(rows, key) {
  const grouped = new Map();
  for (const row of rows) {
    const mapKey = String(row[key]);
    const bucket = grouped.get(mapKey) || [];
    bucket.push(row);
    grouped.set(mapKey, bucket);
  }
  return grouped;
}

function writeJsonPayload(payload, outputPath) {
  if (!outputPath) {
    return;
  }

  const resolvedOutputPath = path.resolve(outputPath);
  writeFileSync(resolvedOutputPath, `${JSON.stringify(payload, null, 2)}\n`);
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
