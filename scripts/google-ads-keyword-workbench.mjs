import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const ADS_API_BASE = "https://googleads.googleapis.com/v24";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DEFAULT_OAUTH_TOKEN_PATH = ".secrets/google-ads-oauth-token.json";

loadDotEnv();

const args = parseArgs(process.argv);

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "audit") {
    await runAudit(args);
  } else if (args.command === "query") {
    await runCustomQuery(args);
  } else if (args.command === "apply-plan") {
    await applyPlan(args);
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Google Ads keyword workbench

Usage:
  node scripts/google-ads-keyword-workbench.mjs audit --customer 1234567890 --campaign "Campaign A" --campaign "Campaign B" [--days 90] [--format json]
  node scripts/google-ads-keyword-workbench.mjs query --customer 1234567890 --query-file ./tmp/query.sql [--format json]
  node scripts/google-ads-keyword-workbench.mjs apply-plan --plan ./tmp/google-ads-keyword-plan.json [--format json]

Required env:
  GOOGLE_ADS_DEVELOPER_TOKEN
  GOOGLE_ADS_OAUTH_CLIENT_JSON
  plus a token file created with scripts/google-ads-report.mjs auth
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
    days: 90,
    format: "json",
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
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--start" || arg === "--startDate") {
      parsed.startDate = next;
      index += 1;
    } else if (arg === "--end" || arg === "--endDate") {
      parsed.endDate = next;
      index += 1;
    } else if (arg === "--customer") {
      parsed.customerId = next;
      index += 1;
    } else if (arg === "--login") {
      parsed.loginCustomerId = next;
      index += 1;
    } else if (arg === "--token") {
      parsed.tokenPath = next;
      index += 1;
    } else if (arg === "--campaign") {
      parsed.campaigns.push(next);
      index += 1;
    } else if (arg === "--campaign-id") {
      parsed.campaignIds.push(next);
      index += 1;
    } else if (arg === "--plan") {
      parsed.planPath = next;
      index += 1;
    } else if (arg === "--query-file") {
      parsed.queryFile = next;
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

async function getOAuthAccessToken({ tokenPath }) {
  const client = loadOAuthClient();
  const resolvedTokenPath = path.resolve(tokenPath);
  if (!existsSync(resolvedTokenPath)) {
    throw new Error(`OAuth token not found at ${resolvedTokenPath}.`);
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

async function runAudit(args) {
  if (!args.campaigns.length && !args.campaignIds.length) {
    throw new Error("Provide at least one --campaign or --campaign-id.");
  }

  const campaignFilter = buildCampaignFilter(args);
  const dateClause = resolveDateClause(args);

  const [campaigns, adGroups, keywords, searchTerms, campaignNegatives] = await Promise.all([
    runSearch(
      args,
      `
        SELECT
          campaign.id,
          campaign.name,
          campaign.status
        FROM campaign
        WHERE ${campaignFilter}
        ORDER BY campaign.name
      `
    ),
    runSearch(
      args,
      `
        SELECT
          campaign.id,
          campaign.name,
          ad_group.id,
          ad_group.name,
          ad_group.status
        FROM ad_group
        WHERE ${campaignFilter}
        ORDER BY campaign.name, ad_group.name
      `
    ),
    runSearch(
      args,
      `
        SELECT
          campaign.id,
          campaign.name,
          ad_group.id,
          ad_group.name,
          ad_group_criterion.criterion_id,
          ad_group_criterion.status,
          ad_group_criterion.negative,
          ad_group_criterion.keyword.text,
          ad_group_criterion.keyword.match_type,
          metrics.impressions,
          metrics.clicks,
          metrics.ctr,
          metrics.average_cpc,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value
        FROM keyword_view
        WHERE ${campaignFilter}
          AND ad_group_criterion.status != 'REMOVED'
          AND ${dateClause}
        ORDER BY campaign.name, metrics.clicks DESC, ad_group_criterion.keyword.text
      `
    ),
    runSearch(
      args,
      `
        SELECT
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
        WHERE ${campaignFilter}
          AND ${dateClause}
        ORDER BY campaign.name, metrics.clicks DESC, search_term_view.search_term
      `
    ),
    runSearch(
      args,
      `
        SELECT
          campaign.id,
          campaign.name,
          campaign_criterion.criterion_id,
          campaign_criterion.negative,
          campaign_criterion.keyword.text,
          campaign_criterion.keyword.match_type
        FROM campaign_criterion
        WHERE ${campaignFilter}
          AND campaign_criterion.type = 'KEYWORD'
          AND campaign_criterion.negative = true
          AND campaign_criterion.status != 'REMOVED'
        ORDER BY campaign.name, campaign_criterion.keyword.text
      `
    )
  ]);

  const payload = {
    requested_campaigns: args.campaigns,
    requested_campaign_ids: args.campaignIds,
    period: {
      range: args.startDate || args.endDate ? `${normalizeIsoDate(args.startDate, "--start")}..${normalizeIsoDate(args.endDate, "--end")}` : `LAST_${resolveDays(args.days)}_DAYS`
    },
    campaigns: campaigns.map((row) => ({
      id: row.campaign?.id,
      name: row.campaign?.name,
      status: row.campaign?.status
    })),
    ad_groups: adGroups.map((row) => ({
      campaign_id: row.campaign?.id,
      campaign_name: row.campaign?.name,
      ad_group_id: row.adGroup?.id,
      ad_group_name: row.adGroup?.name,
      status: row.adGroup?.status
    })),
    keywords: keywords.map((row) => ({
      campaign_id: row.campaign?.id,
      campaign_name: row.campaign?.name,
      ad_group_id: row.adGroup?.id,
      ad_group_name: row.adGroup?.name,
      criterion_id: row.adGroupCriterion?.criterionId,
      status: row.adGroupCriterion?.status,
      negative: row.adGroupCriterion?.negative,
      keyword: row.adGroupCriterion?.keyword?.text,
      match_type: row.adGroupCriterion?.keyword?.matchType,
      impressions: toNumber(row.metrics?.impressions),
      clicks: toNumber(row.metrics?.clicks),
      ctr: toPercent(row.metrics?.ctr),
      average_cpc: microsToCurrency(row.metrics?.averageCpc),
      cost: microsToCurrency(row.metrics?.costMicros),
      conversions: toNumber(row.metrics?.conversions),
      conversion_value: toNumber(row.metrics?.conversionsValue)
    })),
    search_terms: searchTerms.map((row) => ({
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
    })),
    campaign_negative_keywords: campaignNegatives.map((row) => ({
      campaign_id: row.campaign?.id,
      campaign_name: row.campaign?.name,
      criterion_id: row.campaignCriterion?.criterionId,
      negative: row.campaignCriterion?.negative,
      keyword: row.campaignCriterion?.keyword?.text,
      match_type: row.campaignCriterion?.keyword?.matchType
    }))
  };

  printOutput(payload, args.format);
}

async function applyPlan(args) {
  if (!args.planPath) {
    throw new Error("Provide --plan with a JSON file.");
  }

  const plan = JSON.parse(readFileSync(path.resolve(args.planPath), "utf8"));
  const planArgs = {
    ...args,
    customerId: plan.customerId || args.customerId,
    loginCustomerId: plan.loginCustomerId || args.loginCustomerId
  };

  resolveTargetCustomerId(planArgs);

  const adGroupOperations = [];
  for (const item of plan.pauseKeywords || []) {
    adGroupOperations.push({
      update: {
        resourceName: buildAdGroupCriterionResourceName(planArgs, item.adGroupId, item.criterionId),
        status: "PAUSED"
      },
      updateMask: "status"
    });
  }

  for (const item of plan.addKeywords || []) {
    adGroupOperations.push({
      create: {
        adGroup: buildAdGroupResourceName(planArgs, item.adGroupId),
        status: item.status || "ENABLED",
        keyword: {
          text: item.keyword,
          matchType: item.matchType
        }
      }
    });
  }

  for (const item of plan.updateKeywordBids || []) {
    const cpcBidMicros = resolveBidMicros(item);
    adGroupOperations.push({
      update: {
        resourceName: buildAdGroupCriterionResourceName(planArgs, item.adGroupId, item.criterionId),
        cpcBidMicros: String(cpcBidMicros)
      },
      updateMask: "cpc_bid_micros"
    });
  }

  const campaignOperations = [];
  for (const item of plan.removeCampaignNegativeKeywords || []) {
    campaignOperations.push({
      remove: buildCampaignCriterionResourceName(planArgs, item.campaignId, item.criterionId)
    });
  }

  for (const item of plan.addCampaignNegativeKeywords || []) {
    campaignOperations.push({
      create: {
        campaign: buildCampaignResourceName(planArgs, item.campaignId),
        negative: true,
        keyword: {
          text: item.keyword,
          matchType: item.matchType || "BROAD"
        }
      }
    });
  }

  const campaignBudgetOperations = [];
  for (const item of plan.updateCampaignBudgets || []) {
    campaignBudgetOperations.push({
      update: {
        resourceName: buildCampaignBudgetResourceName(planArgs, item.campaignBudgetId),
        amountMicros: String(resolveBudgetMicros(item))
      },
      updateMask: "amount_micros"
    });
  }

  const results = {};
  if (adGroupOperations.length) {
    results.adGroupCriteria = await mutate("adGroupCriteria", adGroupOperations, planArgs);
  }
  if (campaignOperations.length) {
    results.campaignCriteria = await mutate("campaignCriteria", campaignOperations, planArgs);
  }
  if (campaignBudgetOperations.length) {
    results.campaignBudgets = await mutate("campaignBudgets", campaignBudgetOperations, planArgs);
  }

  printOutput(
    {
      applied: {
        pauseKeywords: (plan.pauseKeywords || []).length,
        addKeywords: (plan.addKeywords || []).length,
        updateKeywordBids: (plan.updateKeywordBids || []).length,
        removeCampaignNegativeKeywords: (plan.removeCampaignNegativeKeywords || []).length,
        addCampaignNegativeKeywords: (plan.addCampaignNegativeKeywords || []).length,
        updateCampaignBudgets: (plan.updateCampaignBudgets || []).length
      },
      results
    },
    args.format
  );
}

async function runCustomQuery(args) {
  if (!args.queryFile) {
    throw new Error("Provide --query-file with a GAQL file.");
  }

  const gaql = readFileSync(path.resolve(args.queryFile), "utf8");
  const rows = await runSearch(args, gaql);
  printOutput(rows, args.format);
}

function resolveDays(days) {
  const value = Number(days);
  if (!Number.isInteger(value) || value < 1 || value > 365) {
    throw new Error("--days must be an integer between 1 and 365.");
  }
  return value;
}

function resolveDateClause(args) {
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

  if (args.campaigns.length) {
    parts.push(`campaign.name IN (${args.campaigns.map((name) => `'${escapeGaqlString(name)}'`).join(", ")})`);
  }

  if (args.campaignIds.length) {
    parts.push(`campaign.id IN (${args.campaignIds.map((id) => normalizeDigits(id, "campaignId")).join(", ")})`);
  }

  if (!parts.length) {
    throw new Error("Missing campaign filter.");
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return `(${parts.join(" OR ")})`;
}

function escapeGaqlString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function buildCampaignResourceName(args, campaignId) {
  return `customers/${resolveTargetCustomerId(args)}/campaigns/${normalizeDigits(campaignId, "campaignId")}`;
}

function buildAdGroupResourceName(args, adGroupId) {
  return `customers/${resolveTargetCustomerId(args)}/adGroups/${normalizeDigits(adGroupId, "adGroupId")}`;
}

function buildAdGroupCriterionResourceName(args, adGroupId, criterionId) {
  return `customers/${resolveTargetCustomerId(args)}/adGroupCriteria/${normalizeDigits(adGroupId, "adGroupId")}~${normalizeDigits(criterionId, "criterionId")}`;
}

function buildCampaignCriterionResourceName(args, campaignId, criterionId) {
  return `customers/${resolveTargetCustomerId(args)}/campaignCriteria/${normalizeDigits(campaignId, "campaignId")}~${normalizeDigits(criterionId, "criterionId")}`;
}

function buildCampaignBudgetResourceName(args, campaignBudgetId) {
  return `customers/${resolveTargetCustomerId(args)}/campaignBudgets/${normalizeDigits(campaignBudgetId, "campaignBudgetId")}`;
}

function normalizeDigits(value, label) {
  const normalized = String(value || "").trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be numeric.`);
  }
  return normalized;
}

function resolveBidMicros(item) {
  if (item.cpcBidMicros !== undefined && item.cpcBidMicros !== null && item.cpcBidMicros !== "") {
    return normalizePositiveInteger(item.cpcBidMicros, "cpcBidMicros");
  }

  if (item.maxCpc !== undefined && item.maxCpc !== null && item.maxCpc !== "") {
    const numeric = Number(item.maxCpc);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      throw new Error("maxCpc must be a positive number.");
    }
    return Math.round(numeric * 1_000_000);
  }

  throw new Error("Each updateKeywordBids item must provide cpcBidMicros or maxCpc.");
}

function normalizePositiveInteger(value, label) {
  const numeric = Number(value);
  if (!Number.isInteger(numeric) || numeric <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return numeric;
}

function resolveBudgetMicros(item) {
  if (item.amountMicros !== undefined && item.amountMicros !== null && item.amountMicros !== "") {
    return normalizePositiveInteger(item.amountMicros, "amountMicros");
  }

  if (item.amount !== undefined && item.amount !== null && item.amount !== "") {
    const numeric = Number(item.amount);
    if (!Number.isFinite(numeric) || numeric <= 0) {
      throw new Error("amount must be a positive number.");
    }
    return Math.round(numeric * 1_000_000);
  }

  throw new Error("Each updateCampaignBudgets item must provide amountMicros or amount.");
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
  return Number((numeric / 1_000_000).toFixed(2));
}

function printOutput(payload, format) {
  if (format === "json") {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(JSON.stringify(payload, null, 2));
}
