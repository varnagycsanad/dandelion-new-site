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
  } else if (args.command === "permissions") {
    await listPermissions(args);
  } else if (args.command === "accounts") {
    await listAccounts(args);
  } else if (args.command === "campaigns") {
    await listCampaigns(args);
  } else if (args.command === "adsets") {
    await listAdSets(args);
  } else if (args.command === "ads") {
    await listAds(args);
  } else if (args.command === "creatives") {
    await listCreatives(args);
  } else if (args.command === "insights") {
    await getInsights(args);
  } else if (args.command === "create-campaign") {
    await createCampaign(args);
  } else if (args.command === "create-creative") {
    await createCreative(args);
  } else if (args.command === "create-adset") {
    await createAdSet(args);
  } else if (args.command === "create-ad") {
    await createAd(args);
  } else if (args.command === "pause-campaigns") {
    await updateCampaignStatus(args, "PAUSED");
  } else if (args.command === "enable-campaigns") {
    await updateCampaignStatus(args, "ACTIVE");
  } else if (args.command === "pause-adsets") {
    await updateAdSetStatus(args, "PAUSED");
  } else if (args.command === "enable-adsets") {
    await updateAdSetStatus(args, "ACTIVE");
  } else if (args.command === "pause-ads") {
    await updateAdStatus(args, "PAUSED");
  } else if (args.command === "enable-ads") {
    await updateAdStatus(args, "ACTIVE");
  } else if (args.command === "update-budgets") {
    await updateAdSetBudgets(args);
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
  node scripts/meta/meta-ads.mjs permissions [--format md|json|csv]
  node scripts/meta/meta-ads.mjs accounts [--format md|json]
  node scripts/meta/meta-ads.mjs campaigns [--campaign-id 123] [--campaign "Campaign name"] [--limit 50] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs adsets [--campaign-id 123] [--campaign "Campaign name"] [--limit 50] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs ads [--campaign-id 123] [--adset-id 456] [--limit 50] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs creatives [--limit 50] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs insights [--days 30] [--level campaign|adset|ad] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs create-campaign --name "Campaign name" --objective OUTCOME_LEADS [--execute]
  node scripts/meta/meta-ads.mjs create-creative --name "Creative name" [--from-creative-id 789] [--page-id 123] [--instagram-user-id 456] [--link https://example.com] [--message "Primary text"] [--headline "Title"] [--description "Desc"] [--image-hash HASH] [--call-to-action LEARN_MORE] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs create-adset --campaign-id 123 --name "Ad set name" [--from-adset-id 456] [--daily-budget 5000] [--lifetime-budget 10000] [--status PAUSED] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs create-ad --adset-id 456 --name "Ad name" [--creative-id 789] [--from-ad-id 987] [--status PAUSED] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs pause-campaigns --campaign-id 123 [--campaign "Campaign name"] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs enable-campaigns --campaign-id 123 [--campaign "Campaign name"] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs pause-adsets --adset-id 456 [--campaign-id 123] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs enable-adsets --adset-id 456 [--campaign-id 123] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs pause-ads --ad-id 789 [--adset-id 456] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs enable-ads --ad-id 789 [--adset-id 456] [--execute] [--format md|json|csv]
  node scripts/meta/meta-ads.mjs update-budgets --adset-id 456 [--daily-budget 5000] [--lifetime-budget 10000] [--execute] [--format md|json|csv]

Required env:
  META_ACCESS_TOKEN
  META_AD_ACCOUNT_ID for campaign and insight commands

Optional env:
  META_GRAPH_VERSION=v25.0
  META_SPECIAL_AD_CATEGORIES=[]  JSON array sent during campaign creation

Notes:
  create-campaign is a dry run unless --execute is present.
  New campaigns are created PAUSED by default.
  create-creative is dry run unless --execute is present and can clone a template creative with selective overrides.
  create-adset is dry run unless --execute is present and supports cloning from an existing ad set.
  create-ad is dry run unless --execute is present and supports cloning the creative from an existing ad.
  pause-campaigns, enable-campaigns, pause-adsets, enable-adsets, pause-ads and enable-ads are also dry-run unless --execute is present.
  update-budgets updates ad set budgets and is dry-run unless --execute is present.
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
    execute: false,
    campaigns: [],
    campaignIds: [],
    adsetIds: [],
    adIds: []
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
    } else if (arg === "--campaign") {
      parsed.campaigns.push(next);
      index += 1;
    } else if (arg === "--campaign-id") {
      parsed.campaignIds.push(next);
      index += 1;
    } else if (arg === "--adset-id") {
      parsed.adsetIds.push(next);
      index += 1;
    } else if (arg === "--ad-id") {
      parsed.adIds.push(next);
      index += 1;
    } else if (arg === "--name") {
      parsed.name = next;
      index += 1;
    } else if (arg === "--from-adset-id") {
      parsed.fromAdsetId = next;
      index += 1;
    } else if (arg === "--daily-budget") {
      parsed.dailyBudget = next;
      index += 1;
    } else if (arg === "--lifetime-budget") {
      parsed.lifetimeBudget = next;
      index += 1;
    } else if (arg === "--status") {
      parsed.status = next;
      index += 1;
    } else if (arg === "--creative-id") {
      parsed.creativeId = next;
      index += 1;
    } else if (arg === "--from-ad-id") {
      parsed.fromAdId = next;
      index += 1;
    } else if (arg === "--from-creative-id") {
      parsed.fromCreativeId = next;
      index += 1;
    } else if (arg === "--page-id") {
      parsed.pageId = next;
      index += 1;
    } else if (arg === "--instagram-user-id") {
      parsed.instagramUserId = next;
      index += 1;
    } else if (arg === "--link") {
      parsed.link = next;
      index += 1;
    } else if (arg === "--message") {
      parsed.message = next;
      index += 1;
    } else if (arg === "--headline") {
      parsed.headline = next;
      index += 1;
    } else if (arg === "--description") {
      parsed.description = next;
      index += 1;
    } else if (arg === "--image-hash") {
      parsed.imageHash = next;
      index += 1;
    } else if (arg === "--call-to-action") {
      parsed.callToAction = next;
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

async function listPermissions(args) {
  const result = await graphRequest("/me/permissions", {
    query: { limit: 500 }
  });

  const rows = (result.data || []).map((permission) => ({
    permission: permission.permission,
    status: permission.status
  }));

  printRows(rows, args.format, [
    ["permission", "Permission"],
    ["status", "Status"]
  ]);
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
      fields: "id,name,status,effective_status,objective,daily_budget,lifetime_budget,buying_type,created_time,updated_time,start_time,stop_time",
      limit: args.limit,
      filtering: buildCampaignFiltering(args)
    }
  });

  const rows = (result.data || []).map(mapCampaignRow);

  printRows(rows, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["status", "Status"],
    ["effective_status", "Effective"],
    ["objective", "Objective"],
    ["daily_budget", "Daily budget"],
    ["lifetime_budget", "Lifetime budget"],
    ["buying_type", "Buying type"],
    ["start_time", "Start"],
    ["stop_time", "Stop"],
    ["updated_time", "Updated"]
  ]);
}

async function listAdSets(args) {
  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/adsets`, {
    query: {
      fields:
        "id,name,status,effective_status,campaign_id,daily_budget,lifetime_budget,billing_event,optimization_goal,start_time,end_time,updated_time",
      limit: args.limit,
      filtering: buildCampaignFiltering(args, "campaign.id")
    }
  });

  const rows = (result.data || []).map((adset) => ({
    id: adset.id,
    name: adset.name,
    status: adset.status,
    effective_status: adset.effective_status,
    campaign_id: adset.campaign_id,
    daily_budget: formatMinorCurrency(adset.daily_budget),
    lifetime_budget: formatMinorCurrency(adset.lifetime_budget),
    billing_event: adset.billing_event,
    optimization_goal: adset.optimization_goal,
    start_time: adset.start_time,
    end_time: adset.end_time,
    updated_time: adset.updated_time
  }));

  printRows(rows, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["campaign_id", "Campaign ID"],
    ["status", "Status"],
    ["effective_status", "Effective"],
    ["daily_budget", "Daily budget"],
    ["lifetime_budget", "Lifetime budget"],
    ["billing_event", "Billing"],
    ["optimization_goal", "Optimization"],
    ["updated_time", "Updated"]
  ]);
}

async function listAds(args) {
  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/ads`, {
    query: {
      fields: "id,name,status,effective_status,campaign_id,adset_id,creative",
      limit: args.limit,
      filtering: buildAdsFiltering(args)
    }
  });

  const rows = (result.data || []).map((ad) => ({
    id: ad.id,
    name: ad.name,
    status: ad.status,
    effective_status: ad.effective_status,
    campaign_id: ad.campaign_id,
    adset_id: ad.adset_id,
    creative_id: ad.creative?.id || ""
  }));

  printRows(rows, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["campaign_id", "Campaign ID"],
    ["adset_id", "Ad set ID"],
    ["status", "Status"],
    ["effective_status", "Effective"],
    ["creative_id", "Creative ID"]
  ]);
}

async function listCreatives(args) {
  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/adcreatives`, {
    query: {
      fields: "id,name,title,body",
      limit: args.limit
    }
  });

  const rows = (result.data || []).map((creative) => ({
    id: creative.id,
    name: creative.name,
    title: creative.title || "",
    body_preview: truncateText(creative.body || "", 80)
  }));

  printRows(rows, args.format, [
    ["id", "ID"],
    ["name", "Name"],
    ["title", "Title"],
    ["body_preview", "Body preview"]
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

async function createCreative(args) {
  if (!args.name) {
    throw new Error("Missing --name.");
  }

  const template = args.fromCreativeId ? await fetchCreativeTemplate(args.fromCreativeId) : null;
  const payload = buildCreativePayload(args, template);

  if (!args.execute) {
    console.log("Dry run. Add --execute to create this creative in Meta Ads.");
    printRows(
      [
        {
          creative_name: args.name,
          template_creative_id: args.fromCreativeId || "",
          page_id: extractCreativePageId(payload),
          instagram_user_id: extractCreativeInstagramUserId(payload),
          link: extractCreativeLink(payload),
          headline: extractCreativeHeadline(payload),
          has_body: extractCreativeMessage(payload) ? "true" : "false",
          has_image_hash: extractCreativeImageHash(payload) ? "true" : "false",
          call_to_action: extractCreativeCallToAction(payload)
        }
      ],
      args.format,
      [
        ["creative_name", "Creative"],
        ["template_creative_id", "Template creative ID"],
        ["page_id", "Page ID"],
        ["instagram_user_id", "Instagram user ID"],
        ["link", "Link"],
        ["headline", "Headline"],
        ["has_body", "Has body"],
        ["has_image_hash", "Has image hash"],
        ["call_to_action", "CTA"]
      ]
    );
    return;
  }

  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/adcreatives`, {
    method: "POST",
    body: payload
  });

  console.log("Creative created in Meta Ads.");
  console.log(JSON.stringify(result, null, 2));
}

async function createAdSet(args) {
  if (!args.name) {
    throw new Error("Missing --name.");
  }
  if (!args.campaignIds.length) {
    throw new Error("Provide --campaign-id for create-adset.");
  }
  if (args.campaignIds.length > 1) {
    throw new Error("create-adset requires a single --campaign-id.");
  }

  const campaignId = normalizeDigits(args.campaignIds[0], "campaign ID");
  const template = args.fromAdsetId ? await fetchAdSetTemplate(args.fromAdsetId) : null;
  const status = normalizeMetaStatus(args.status || "PAUSED");
  const budgetPayload = resolveAdSetBudgetPayload(args, template);
  const payload = {
    campaign_id: campaignId,
    name: args.name,
    status,
    ...budgetPayload
  };

  if (template?.billing_event) {
    payload.billing_event = template.billing_event;
  }
  if (template?.optimization_goal) {
    payload.optimization_goal = template.optimization_goal;
  }
  if (template?.bid_strategy) {
    payload.bid_strategy = template.bid_strategy;
  }
  if (template?.targeting) {
    payload.targeting = template.targeting;
  }
  if (template?.promoted_object) {
    payload.promoted_object = template.promoted_object;
  }
  if (template?.attribution_spec) {
    payload.attribution_spec = template.attribution_spec;
  }

  if (!payload.billing_event || !payload.optimization_goal) {
    throw new Error(
      "create-adset currently requires --from-adset-id with a reusable template that provides billing_event and optimization_goal."
    );
  }

  if (!args.execute) {
    console.log("Dry run. Add --execute to create this PAUSED ad set in Meta Ads.");
    printRows(
      [
        {
          campaign_id: payload.campaign_id,
          adset_name: payload.name,
          status: payload.status,
          daily_budget: formatMinorCurrency(payload.daily_budget),
          lifetime_budget: formatMinorCurrency(payload.lifetime_budget),
          billing_event: payload.billing_event,
          optimization_goal: payload.optimization_goal,
          template_adset_id: args.fromAdsetId || "",
          has_targeting: payload.targeting ? "true" : "false",
          has_promoted_object: payload.promoted_object ? "true" : "false"
        }
      ],
      args.format,
      [
        ["campaign_id", "Campaign ID"],
        ["adset_name", "Ad set"],
        ["status", "Status"],
        ["daily_budget", "Daily budget"],
        ["lifetime_budget", "Lifetime budget"],
        ["billing_event", "Billing"],
        ["optimization_goal", "Optimization"],
        ["template_adset_id", "Template ad set"],
        ["has_targeting", "Has targeting"],
        ["has_promoted_object", "Has promoted object"]
      ]
    );
    return;
  }

  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/adsets`, {
    method: "POST",
    body: payload
  });

  console.log("Ad set created in Meta Ads.");
  console.log(JSON.stringify(result, null, 2));
}

async function createAd(args) {
  if (!args.name) {
    throw new Error("Missing --name.");
  }
  if (!args.adsetIds.length) {
    throw new Error("Provide --adset-id for create-ad.");
  }
  if (args.adsetIds.length > 1) {
    throw new Error("create-ad requires a single --adset-id.");
  }

  const adsetId = normalizeDigits(args.adsetIds[0], "ad set ID");
  let creativeId = args.creativeId ? normalizeDigits(args.creativeId, "creative ID") : "";
  const templateAd = args.fromAdId ? await fetchAdTemplate(args.fromAdId) : null;

  if (!creativeId && templateAd?.creative?.id) {
    creativeId = normalizeDigits(templateAd.creative.id, "creative ID");
  }

  if (!creativeId) {
    throw new Error("Provide --creative-id or --from-ad-id for create-ad.");
  }

  const status = normalizeMetaStatus(args.status || "PAUSED");
  const payload = {
    name: args.name,
    adset_id: adsetId,
    status,
    creative: {
      creative_id: creativeId
    }
  };

  if (!args.execute) {
    console.log("Dry run. Add --execute to create this PAUSED ad in Meta Ads.");
    printRows(
      [
        {
          ad_name: payload.name,
          adset_id: payload.adset_id,
          status: payload.status,
          creative_id: creativeId,
          template_ad_id: args.fromAdId || "",
          template_ad_name: templateAd?.name || ""
        }
      ],
      args.format,
      [
        ["ad_name", "Ad"],
        ["adset_id", "Ad set ID"],
        ["status", "Status"],
        ["creative_id", "Creative ID"],
        ["template_ad_id", "Template ad ID"],
        ["template_ad_name", "Template ad name"]
      ]
    );
    return;
  }

  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/ads`, {
    method: "POST",
    body: payload
  });

  console.log("Ad created in Meta Ads.");
  console.log(JSON.stringify(result, null, 2));
}

async function updateCampaignStatus(args, targetStatus) {
  const campaigns = await resolveCampaignTargets(args);
  const payload = campaigns.map((campaign) => ({
    campaign_id: campaign.id,
    campaign_name: campaign.name,
    previous_status: campaign.status,
    previous_effective_status: campaign.effective_status,
    requested_status: targetStatus
  }));

  if (!args.execute) {
    console.log(`Dry run. Add --execute to update ${campaigns.length} campaign(s) to ${targetStatus}.`);
    printRows(payload, args.format, [
      ["campaign_id", "Campaign ID"],
      ["campaign_name", "Campaign"],
      ["previous_status", "Previous status"],
      ["previous_effective_status", "Previous effective"],
      ["requested_status", "Requested status"]
    ]);
    return;
  }

  const rows = [];
  for (const campaign of campaigns) {
    const result = await graphRequest(`/${campaign.id}`, {
      method: "POST",
      body: {
        status: targetStatus
      }
    });

    rows.push({
      campaign_id: campaign.id,
      campaign_name: campaign.name,
      previous_status: campaign.status,
      previous_effective_status: campaign.effective_status,
      requested_status: targetStatus,
      success: result.success === true ? "true" : String(result.success ?? "")
    });
  }

  printRows(rows, args.format, [
    ["campaign_id", "Campaign ID"],
    ["campaign_name", "Campaign"],
    ["previous_status", "Previous status"],
    ["previous_effective_status", "Previous effective"],
    ["requested_status", "Requested status"],
    ["success", "Success"]
  ]);
}

async function updateAdSetBudgets(args) {
  const adsets = await resolveAdSetTargets(args);
  const requestedBudget = resolveAdSetBudgetPayload(args, null, { requireBudget: true });

  const payload = adsets.map((adset) => ({
    adset_id: adset.id,
    adset_name: adset.name,
    previous_daily_budget: adset.daily_budget,
    previous_lifetime_budget: adset.lifetime_budget,
    requested_daily_budget: formatMinorCurrency(requestedBudget.daily_budget),
    requested_lifetime_budget: formatMinorCurrency(requestedBudget.lifetime_budget)
  }));

  if (!args.execute) {
    console.log(`Dry run. Add --execute to update ${adsets.length} ad set budget(s).`);
    printRows(payload, args.format, [
      ["adset_id", "Ad set ID"],
      ["adset_name", "Ad set"],
      ["previous_daily_budget", "Previous daily"],
      ["previous_lifetime_budget", "Previous lifetime"],
      ["requested_daily_budget", "Requested daily"],
      ["requested_lifetime_budget", "Requested lifetime"]
    ]);
    return;
  }

  const rows = [];
  for (const adset of adsets) {
    const body = {};
    if (requestedBudget.daily_budget) {
      body.daily_budget = requestedBudget.daily_budget;
    }
    if (requestedBudget.lifetime_budget) {
      body.lifetime_budget = requestedBudget.lifetime_budget;
    }

    const result = await graphRequest(`/${adset.id}`, {
      method: "POST",
      body
    });

    rows.push({
      adset_id: adset.id,
      adset_name: adset.name,
      previous_daily_budget: adset.daily_budget,
      previous_lifetime_budget: adset.lifetime_budget,
      requested_daily_budget: formatMinorCurrency(requestedBudget.daily_budget),
      requested_lifetime_budget: formatMinorCurrency(requestedBudget.lifetime_budget),
      success: result.success === true ? "true" : String(result.success ?? "")
    });
  }

  printRows(rows, args.format, [
    ["adset_id", "Ad set ID"],
    ["adset_name", "Ad set"],
    ["previous_daily_budget", "Previous daily"],
    ["previous_lifetime_budget", "Previous lifetime"],
    ["requested_daily_budget", "Requested daily"],
    ["requested_lifetime_budget", "Requested lifetime"],
    ["success", "Success"]
  ]);
}

async function updateAdSetStatus(args, targetStatus) {
  const adsets = await resolveAdSetTargets(args);
  const payload = adsets.map((adset) => ({
    adset_id: adset.id,
    adset_name: adset.name,
    previous_status: adset.status,
    previous_effective_status: adset.effective_status,
    requested_status: targetStatus
  }));

  if (!args.execute) {
    console.log(`Dry run. Add --execute to update ${adsets.length} ad set(s) to ${targetStatus}.`);
    printRows(payload, args.format, [
      ["adset_id", "Ad set ID"],
      ["adset_name", "Ad set"],
      ["previous_status", "Previous status"],
      ["previous_effective_status", "Previous effective"],
      ["requested_status", "Requested status"]
    ]);
    return;
  }

  const rows = [];
  for (const adset of adsets) {
    const result = await graphRequest(`/${adset.id}`, {
      method: "POST",
      body: { status: targetStatus }
    });

    rows.push({
      adset_id: adset.id,
      adset_name: adset.name,
      previous_status: adset.status,
      previous_effective_status: adset.effective_status,
      requested_status: targetStatus,
      success: result.success === true ? "true" : String(result.success ?? "")
    });
  }

  printRows(rows, args.format, [
    ["adset_id", "Ad set ID"],
    ["adset_name", "Ad set"],
    ["previous_status", "Previous status"],
    ["previous_effective_status", "Previous effective"],
    ["requested_status", "Requested status"],
    ["success", "Success"]
  ]);
}

async function updateAdStatus(args, targetStatus) {
  const ads = await resolveAdTargets(args);
  const payload = ads.map((ad) => ({
    ad_id: ad.id,
    ad_name: ad.name,
    previous_status: ad.status,
    previous_effective_status: ad.effective_status,
    requested_status: targetStatus
  }));

  if (!args.execute) {
    console.log(`Dry run. Add --execute to update ${ads.length} ad(s) to ${targetStatus}.`);
    printRows(payload, args.format, [
      ["ad_id", "Ad ID"],
      ["ad_name", "Ad"],
      ["previous_status", "Previous status"],
      ["previous_effective_status", "Previous effective"],
      ["requested_status", "Requested status"]
    ]);
    return;
  }

  const rows = [];
  for (const ad of ads) {
    const result = await graphRequest(`/${ad.id}`, {
      method: "POST",
      body: { status: targetStatus }
    });

    rows.push({
      ad_id: ad.id,
      ad_name: ad.name,
      previous_status: ad.status,
      previous_effective_status: ad.effective_status,
      requested_status: targetStatus,
      success: result.success === true ? "true" : String(result.success ?? "")
    });
  }

  printRows(rows, args.format, [
    ["ad_id", "Ad ID"],
    ["ad_name", "Ad"],
    ["previous_status", "Previous status"],
    ["previous_effective_status", "Previous effective"],
    ["requested_status", "Requested status"],
    ["success", "Success"]
  ]);
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

async function resolveCampaignTargets(args) {
  if (!args.campaignIds.length && !args.campaigns.length) {
    throw new Error("Provide at least one --campaign-id or --campaign for campaign status updates.");
  }

  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/campaigns`, {
    query: {
      fields: "id,name,status,effective_status,objective,updated_time",
      limit: Math.max(args.limit, 200),
      filtering: buildCampaignFiltering(args)
    }
  });

  const rows = (result.data || []).map(mapCampaignRow);
  if (!rows.length) {
    throw new Error("No campaigns matched the requested filter.");
  }

  return rows;
}

async function resolveAdSetTargets(args) {
  if (!args.adsetIds.length && !args.campaignIds.length && !args.campaigns.length) {
    throw new Error("Provide at least one --adset-id, --campaign-id or --campaign for ad set budget updates.");
  }

  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/adsets`, {
    query: {
      fields:
        "id,name,status,effective_status,campaign_id,daily_budget,lifetime_budget,billing_event,optimization_goal,start_time,end_time,updated_time",
      limit: Math.max(args.limit, 200),
      filtering: buildAdSetFiltering(args)
    }
  });

  const rows = (result.data || []).map(mapAdSetRow);
  if (!rows.length) {
    throw new Error("No ad sets matched the requested filter.");
  }
  return rows;
}

async function resolveAdTargets(args) {
  if (!args.adIds.length && !args.adsetIds.length && !args.campaignIds.length) {
    throw new Error("Provide at least one --ad-id, --adset-id or --campaign-id for ad status updates.");
  }

  const accountId = getAdAccountId();
  const result = await graphRequest(`/${accountId}/ads`, {
    query: {
      fields: "id,name,status,effective_status,campaign_id,adset_id,creative",
      limit: Math.max(args.limit, 200),
      filtering: buildAdsFiltering(args)
    }
  });

  const rows = (result.data || []).map((ad) => ({
    id: ad.id,
    name: ad.name,
    status: ad.status,
    effective_status: ad.effective_status,
    campaign_id: ad.campaign_id,
    adset_id: ad.adset_id,
    creative_id: ad.creative?.id || ""
  }));

  if (!rows.length) {
    throw new Error("No ads matched the requested filter.");
  }

  return rows;
}

async function fetchAdSetTemplate(adsetId) {
  const normalizedId = normalizeDigits(adsetId, "ad set ID");
  const result = await graphRequest(`/${normalizedId}`, {
    query: {
      fields:
        "id,name,status,campaign_id,daily_budget,lifetime_budget,billing_event,optimization_goal,bid_strategy,targeting,promoted_object,attribution_spec"
    }
  });

  return result;
}

async function fetchAdTemplate(adId) {
  const normalizedId = normalizeDigits(adId, "ad ID");
  return graphRequest(`/${normalizedId}`, {
    query: {
      fields: "id,name,status,effective_status,creative,tracking_specs"
    }
  });
}

async function fetchCreativeTemplate(creativeId) {
  const normalizedId = normalizeDigits(creativeId, "creative ID");
  return graphRequest(`/${normalizedId}`, {
    query: {
      fields: "id,name,title,body,object_story_spec,asset_feed_spec,url_tags"
    }
  });
}

function buildCreativePayload(args, template) {
  const payload = {
    name: args.name
  };

  if (template?.asset_feed_spec) {
    const spec = JSON.parse(JSON.stringify(template.asset_feed_spec));
    if (args.message && Array.isArray(spec.bodies) && spec.bodies[0]) {
      spec.bodies[0].text = args.message;
    }
    if (args.headline && Array.isArray(spec.titles) && spec.titles[0]) {
      spec.titles[0].text = args.headline;
    }
    if (args.description && Array.isArray(spec.descriptions) && spec.descriptions[0]) {
      spec.descriptions[0].text = args.description;
    }
    if (args.link && Array.isArray(spec.link_urls) && spec.link_urls[0]) {
      spec.link_urls[0].website_url = args.link;
    }
    if (args.callToAction && Array.isArray(spec.call_to_action_types) && spec.call_to_action_types.length) {
      spec.call_to_action_types = [String(args.callToAction).toUpperCase()];
    }
    payload.asset_feed_spec = spec;

    const storySpec = template.object_story_spec ? JSON.parse(JSON.stringify(template.object_story_spec)) : {};
    if (args.pageId) {
      storySpec.page_id = normalizeDigits(args.pageId, "page ID");
    }
    if (args.instagramUserId) {
      storySpec.instagram_user_id = normalizeDigits(args.instagramUserId, "instagram user ID");
    }
    if (Object.keys(storySpec).length) {
      payload.object_story_spec = storySpec;
    }
    return payload;
  }

  const storySpec = template?.object_story_spec
    ? JSON.parse(JSON.stringify(template.object_story_spec))
    : {};

  if (args.pageId) {
    storySpec.page_id = normalizeDigits(args.pageId, "page ID");
  }
  if (args.instagramUserId) {
    storySpec.instagram_user_id = normalizeDigits(args.instagramUserId, "instagram user ID");
  }

  const linkData = storySpec.link_data ? JSON.parse(JSON.stringify(storySpec.link_data)) : {};
  if (args.link) {
    linkData.link = args.link;
  }
  if (args.message) {
    linkData.message = args.message;
  }
  if (args.headline) {
    linkData.name = args.headline;
  }
  if (args.description) {
    linkData.description = args.description;
  }
  if (args.imageHash) {
    linkData.image_hash = args.imageHash;
  }
  if (args.callToAction) {
    linkData.call_to_action = {
      type: String(args.callToAction).toUpperCase(),
      value: {
        link: args.link || linkData.link || ""
      }
    };
  }

  if (!storySpec.page_id) {
    throw new Error("create-creative requires --from-creative-id or at least --page-id.");
  }
  if (!linkData.link) {
    throw new Error("create-creative requires a destination --link or a template creative with link_data.link.");
  }

  if (Object.keys(linkData).length) {
    storySpec.link_data = linkData;
  }

  payload.object_story_spec = storySpec;
  if (template?.url_tags) {
    payload.url_tags = template.url_tags;
  }
  return payload;
}

function extractCreativePageId(payload) {
  return payload.object_story_spec?.page_id || "";
}

function extractCreativeInstagramUserId(payload) {
  return payload.object_story_spec?.instagram_user_id || "";
}

function extractCreativeLink(payload) {
  return payload.object_story_spec?.link_data?.link || payload.asset_feed_spec?.link_urls?.[0]?.website_url || "";
}

function extractCreativeHeadline(payload) {
  return payload.object_story_spec?.link_data?.name || payload.asset_feed_spec?.titles?.[0]?.text || "";
}

function extractCreativeMessage(payload) {
  return payload.object_story_spec?.link_data?.message || payload.asset_feed_spec?.bodies?.[0]?.text || "";
}

function extractCreativeImageHash(payload) {
  return payload.object_story_spec?.link_data?.image_hash || payload.asset_feed_spec?.images?.[0]?.hash || "";
}

function extractCreativeCallToAction(payload) {
  return (
    payload.object_story_spec?.link_data?.call_to_action?.type ||
    payload.asset_feed_spec?.call_to_action_types?.[0] ||
    ""
  );
}

function buildCampaignFiltering(args, fieldName = "id") {
  const filters = [];

  for (const campaignId of args.campaignIds || []) {
    filters.push({
      field: fieldName,
      operator: "EQUAL",
      value: normalizeDigits(campaignId, "campaign ID")
    });
  }

  for (const campaignName of args.campaigns || []) {
    filters.push({
      field: "name",
      operator: "EQUAL",
      value: String(campaignName)
    });
  }

  if (!filters.length) {
    return undefined;
  }

  return JSON.stringify(filters);
}

function buildAdSetFiltering(args) {
  const filters = [];

  for (const adsetId of args.adsetIds || []) {
    filters.push({
      field: "id",
      operator: "EQUAL",
      value: normalizeDigits(adsetId, "ad set ID")
    });
  }

  for (const campaignId of args.campaignIds || []) {
    filters.push({
      field: "campaign.id",
      operator: "EQUAL",
      value: normalizeDigits(campaignId, "campaign ID")
    });
  }

  for (const campaignName of args.campaigns || []) {
    filters.push({
      field: "campaign.name",
      operator: "EQUAL",
      value: String(campaignName)
    });
  }

  if (!filters.length) {
    return undefined;
  }

  return JSON.stringify(filters);
}

function buildAdsFiltering(args) {
  const filters = [];

  for (const adId of args.adIds || []) {
    filters.push({
      field: "id",
      operator: "EQUAL",
      value: normalizeDigits(adId, "ad ID")
    });
  }

  for (const adsetId of args.adsetIds || []) {
    filters.push({
      field: "adset.id",
      operator: "EQUAL",
      value: normalizeDigits(adsetId, "ad set ID")
    });
  }

  for (const campaignId of args.campaignIds || []) {
    filters.push({
      field: "campaign.id",
      operator: "EQUAL",
      value: normalizeDigits(campaignId, "campaign ID")
    });
  }

  if (!filters.length) {
    return undefined;
  }

  return JSON.stringify(filters);
}

function mapCampaignRow(campaign) {
  return {
    id: campaign.id,
    name: campaign.name,
    status: campaign.status,
    effective_status: campaign.effective_status,
    objective: campaign.objective,
    daily_budget: formatMinorCurrency(campaign.daily_budget),
    lifetime_budget: formatMinorCurrency(campaign.lifetime_budget),
    buying_type: campaign.buying_type,
    start_time: campaign.start_time,
    stop_time: campaign.stop_time,
    updated_time: campaign.updated_time
  };
}

function mapAdSetRow(adset) {
  return {
    id: adset.id,
    name: adset.name,
    status: adset.status,
    effective_status: adset.effective_status,
    campaign_id: adset.campaign_id,
    daily_budget: formatMinorCurrency(adset.daily_budget),
    lifetime_budget: formatMinorCurrency(adset.lifetime_budget),
    billing_event: adset.billing_event,
    optimization_goal: adset.optimization_goal,
    start_time: adset.start_time,
    end_time: adset.end_time,
    updated_time: adset.updated_time
  };
}

function resolveAdSetBudgetPayload(args, template, options = {}) {
  const requireBudget = Boolean(options.requireBudget);
  const dailyBudget = args.dailyBudget ? normalizeMinorCurrency(args.dailyBudget, "daily budget") : template?.daily_budget;
  const lifetimeBudget = args.lifetimeBudget
    ? normalizeMinorCurrency(args.lifetimeBudget, "lifetime budget")
    : template?.lifetime_budget;

  if (!dailyBudget && !lifetimeBudget && requireBudget) {
    throw new Error("Provide --daily-budget or --lifetime-budget.");
  }

  if (!dailyBudget && !lifetimeBudget) {
    return {};
  }

  const payload = {};
  if (dailyBudget && Number(dailyBudget) > 0) {
    payload.daily_budget = String(dailyBudget);
  }
  if (lifetimeBudget && Number(lifetimeBudget) > 0) {
    payload.lifetime_budget = String(lifetimeBudget);
  }
  return payload;
}

function normalizeDigits(value, label) {
  const normalized = String(value || "").trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be numeric.`);
  }
  return normalized;
}

function normalizeMinorCurrency(value, label) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    throw new Error(`${label} must be a positive number in account currency units.`);
  }

  return String(Math.round(numeric * 100));
}

function normalizeMetaStatus(value) {
  const normalized = String(value || "")
    .trim()
    .toUpperCase();

  if (["ACTIVE", "PAUSED"].includes(normalized)) {
    return normalized;
  }

  throw new Error("status must be ACTIVE or PAUSED.");
}

function truncateText(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
}

function formatMinorCurrency(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "";
  }
  return (numeric / 100).toFixed(2);
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
