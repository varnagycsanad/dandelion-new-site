import { existsSync, readFileSync } from "node:fs";

const DEFAULT_VERSION = "v25.0";
const GRAPH_HOST = "https://graph.facebook.com";
const DEFAULT_EXPECTED_DOMAIN = "dandelionhouse.hu";

await loadEnv();

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "asset-check") {
    const report = await buildAssetCheckReport(args);
    printAssetCheckReport(report, args.format);
  } else if (args.command === "permissions-diagnostics") {
    const report = await buildPermissionsDiagnosticsReport(args);
    printPermissionsDiagnosticsReport(report, args.format);
  } else if (args.command === "smoke-checklist") {
    const checklist = buildSmokeChecklist();
    printSmokeChecklist(checklist, args.format);
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Meta operations helper for Dandelion

Usage:
  node scripts/remote-platform/meta/meta-ops.mjs asset-check [--format md|json]
  node scripts/remote-platform/meta/meta-ops.mjs permissions-diagnostics [--format md|json]
  node scripts/remote-platform/meta/meta-ops.mjs smoke-checklist [--format md|json]

Checks:
  - business / ad account / page / pixel relationship visibility
  - page task and token availability for posting
  - permission and asset-level diagnostics for the current token
  - browser smoke checklist for landing -> booking verification
`);
}

function parseArgs(argv) {
  const parsed = {
    command: argv[0],
    format: "md"
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
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

async function loadEnv() {
  try {
    const dotenv = await import("dotenv");
    dotenv.config({ override: true });
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
    process.env[key] = rawValue.replace(/^["']|["']$/g, "");
  }
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

function getConfiguredPageId() {
  const pageId = process.env.META_PAGE_ID || "";
  return pageId ? normalizeDigits(pageId, "page ID") : "";
}

function getConfiguredAdAccountId() {
  const accountId = process.env.META_AD_ACCOUNT_ID || "";
  if (!accountId) {
    throw new Error("Set META_AD_ACCOUNT_ID in .env.");
  }
  return accountId.startsWith("act_") ? accountId : `act_${normalizeDigits(accountId, "ad account ID")}`;
}

function getExpectedDomain() {
  return String(process.env.META_EXPECTED_DOMAIN || DEFAULT_EXPECTED_DOMAIN).trim().toLowerCase();
}

async function graphRequest(pathname, query = {}) {
  const url = new URL(`${GRAPH_HOST}/${getVersion()}/${pathname.replace(/^\/+/, "")}`);
  url.searchParams.set("access_token", getAccessToken());

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(`Meta API ${response.status}: ${data.error?.message || response.statusText}`);
  }
  return data;
}

async function graphRequestSafe(pathname, query = {}) {
  try {
    return await graphRequest(pathname, query);
  } catch (error) {
    return {
      error: error.message
    };
  }
}

async function buildAssetCheckReport(_args) {
  const expectedDomain = getExpectedDomain();
  const user = await graphRequest("/me", { fields: "id,name" });
  const adAccountId = getConfiguredAdAccountId();
  const pageId = getConfiguredPageId();

  const adAccount = await graphRequest(`/${adAccountId}`, {
    fields: "id,name,account_status,business,currency,timezone_name"
  });
  const businessId = adAccount.business?.id || "";
  const businessName = adAccount.business?.name || "";

  const pageVisibility = await graphRequest("/me/accounts", {
    fields: "id,name,category,tasks,access_token",
    limit: 200
  });
  const visiblePages = pageVisibility.data || [];
  const selectedPage = visiblePages.find((page) => page.id === pageId) || null;

  const page = pageId
    ? await graphRequestSafe(`/${pageId}`, { fields: "id,name,link,website,category,connected_instagram_account,instagram_business_account" })
    : null;
  const businessPages = businessId
    ? await graphRequestSafe(`/${businessId}/owned_pages`, { fields: "id,name,link", limit: 50 })
    : { data: [] };
  const businessPixels = businessId
    ? await graphRequestSafe(`/${businessId}/owned_pixels`, { fields: "id,name,last_fired_time,creation_time", limit: 50 })
    : { data: [] };
  const businessInstagramAccounts = businessId
    ? await graphRequestSafe(`/${businessId}/owned_instagram_accounts`, { fields: "id,username", limit: 50 })
    : { data: [] };
  const businessAdAccounts = businessId
    ? await graphRequestSafe(`/${businessId}/owned_ad_accounts`, { fields: "id,name,account_status", limit: 50 })
    : { data: [] };

  const pageLink = page?.link || "";
  const pageWebsite = page?.website || "";
  const pageDomain = extractHostname(pageWebsite || pageLink);
  const domainMatches = pageDomain === expectedDomain || pageDomain === `www.${expectedDomain}`;
  const ownedPixels = Array.isArray(businessPixels.data) ? businessPixels.data : [];
  const inferredPixel = ownedPixels.length === 1 ? ownedPixels[0] : null;

  return {
    summary: {
      meta_user: user.name || "",
      business_id: businessId,
      business_name: businessName,
      ad_account_id: adAccount.id || adAccountId,
      ad_account_name: adAccount.name || "",
      page_id: pageId,
      page_name: page?.name || selectedPage?.name || "",
      page_link: pageLink,
      page_website: pageWebsite,
      page_domain: pageDomain,
      expected_domain: expectedDomain,
      domain_match: domainMatches ? "true" : "false",
      page_visible_to_token: selectedPage ? "true" : "false",
      page_has_page_token: selectedPage?.access_token ? "true" : "false",
      page_tasks: Array.isArray(selectedPage?.tasks) ? selectedPage.tasks.join(", ") : "",
      owned_pixel_count: ownedPixels.length,
      inferred_pixel_id: inferredPixel?.id || "",
      inferred_pixel_name: inferredPixel?.name || "",
      inferred_pixel_last_fired_time: inferredPixel?.last_fired_time || "",
      business_page_count: Array.isArray(businessPages.data) ? businessPages.data.length : 0,
      business_instagram_count: Array.isArray(businessInstagramAccounts.data) ? businessInstagramAccounts.data.length : 0,
      business_ad_account_count: Array.isArray(businessAdAccounts.data) ? businessAdAccounts.data.length : 0
    },
    business_pages: Array.isArray(businessPages.data) ? businessPages.data : [],
    business_pixels: ownedPixels,
    business_instagram_accounts: Array.isArray(businessInstagramAccounts.data) ? businessInstagramAccounts.data : [],
    findings: buildAssetCheckFindings({
      selectedPage,
      page,
      expectedDomain,
      domainMatches,
      businessPixels,
      businessInstagramAccounts,
      businessAdAccounts
    })
  };
}

function buildAssetCheckFindings(context) {
  const findings = [];
  findings.push({
    severity: context.selectedPage?.access_token ? "info" : "high",
    area: "page_token",
    message: context.selectedPage?.access_token
      ? "The configured page is visible to the token and exposes a page access token."
      : "The configured page is not returning a usable page access token from /me/accounts."
  });
  findings.push({
    severity: context.domainMatches ? "info" : "medium",
    area: "page_domain",
    message: context.domainMatches
      ? `The page/domain relation is aligned with ${context.expectedDomain}.`
      : `The page website/domain does not match the expected domain ${context.expectedDomain}.`
  });
  findings.push({
    severity: Array.isArray(context.businessPixels.data) && context.businessPixels.data.length ? "info" : "medium",
    area: "pixel_visibility",
    message: Array.isArray(context.businessPixels.data) && context.businessPixels.data.length
      ? "At least one business-owned pixel is visible to the current token."
      : "No business-owned pixels were visible to the current token."
  });
  findings.push({
    severity: Array.isArray(context.businessInstagramAccounts.data) && context.businessInstagramAccounts.data.length ? "info" : "low",
    area: "instagram_link",
    message: Array.isArray(context.businessInstagramAccounts.data) && context.businessInstagramAccounts.data.length
      ? "At least one business-owned Instagram account is visible."
      : "No business-owned Instagram account is visible. This may be fine if Instagram is not used."
  });
  findings.push({
    severity: Array.isArray(context.businessAdAccounts.data) && context.businessAdAccounts.data.length ? "info" : "high",
    area: "ad_account_link",
    message: Array.isArray(context.businessAdAccounts.data) && context.businessAdAccounts.data.length
      ? "The business exposes at least one owned ad account to the current token."
      : "No business-owned ad account is visible to the current token."
  });
  return findings;
}

async function buildPermissionsDiagnosticsReport(_args) {
  const user = await graphRequest("/me", { fields: "id,name" });
  const permissionsPayload = await graphRequest("/me/permissions", { limit: 500 });
  const adAccountsPayload = await graphRequest("/me/adaccounts", {
    fields: "id,name,account_status,currency,timezone_name",
    limit: 50
  });
  const pagesPayload = await graphRequest("/me/accounts", {
    fields: "id,name,category,tasks,access_token",
    limit: 50
  });
  const businessesPayload = await graphRequest("/me/businesses", {
    fields: "id,name",
    limit: 50
  });
  const campaignProbe = await graphRequestSafe(`/${getConfiguredAdAccountId()}/campaigns`, {
    fields: "id,name,status",
    limit: 1
  });

  const permissions = (permissionsPayload.data || []).map((permission) => ({
    permission: permission.permission,
    status: permission.status
  }));
  const grantedPermissions = permissions.filter((permission) => permission.status === "granted").map((permission) => permission.permission);
  const selectedPage = (pagesPayload.data || []).find((page) => page.id === getConfiguredPageId()) || null;

  return {
    summary: {
      meta_user: user.name || "",
      granted_permission_count: grantedPermissions.length,
      ads_management_granted: grantedPermissions.includes("ads_management") ? "true" : "false",
      ads_read_granted: grantedPermissions.includes("ads_read") ? "true" : "false",
      business_management_granted: grantedPermissions.includes("business_management") ? "true" : "false",
      pages_manage_posts_granted: grantedPermissions.includes("pages_manage_posts") ? "true" : "false",
      visible_ad_account_count: (adAccountsPayload.data || []).length,
      visible_page_count: (pagesPayload.data || []).length,
      visible_business_count: (businessesPayload.data || []).length,
      selected_page_has_page_token: selectedPage?.access_token ? "true" : "false",
      selected_page_tasks: Array.isArray(selectedPage?.tasks) ? selectedPage.tasks.join(", ") : "",
      campaign_read_probe: campaignProbe.error ? "false" : "true",
      campaign_read_probe_error: campaignProbe.error || ""
    },
    permissions,
    ad_accounts: adAccountsPayload.data || [],
    pages: (pagesPayload.data || []).map((page) => ({
      id: page.id,
      name: page.name,
      category: page.category || "",
      tasks: Array.isArray(page.tasks) ? page.tasks.join(", ") : "",
      has_page_token: page.access_token ? "true" : "false"
    })),
    businesses: businessesPayload.data || [],
    findings: buildPermissionsFindings({
      grantedPermissions,
      selectedPage,
      campaignProbe,
      adAccountsPayload,
      businessesPayload
    })
  };
}

function buildPermissionsFindings(context) {
  return [
    {
      severity: context.grantedPermissions.includes("ads_management") ? "info" : "high",
      area: "ads_management",
      message: context.grantedPermissions.includes("ads_management")
        ? "ads_management is granted."
        : "ads_management is missing from the current token."
    },
    {
      severity: context.grantedPermissions.includes("pages_manage_posts") ? "info" : "medium",
      area: "pages_manage_posts",
      message: context.grantedPermissions.includes("pages_manage_posts")
        ? "pages_manage_posts is granted."
        : "pages_manage_posts is missing from the current token."
    },
    {
      severity: context.selectedPage?.access_token ? "info" : "high",
      area: "page_token",
      message: context.selectedPage?.access_token
        ? "The selected page exposes a page token and page tasks."
        : "The selected page is missing a page token from /me/accounts."
    },
    {
      severity: context.campaignProbe.error ? "high" : "info",
      area: "campaign_read_probe",
      message: context.campaignProbe.error
        ? `Campaign read probe failed: ${context.campaignProbe.error}`
        : "Campaign read probe succeeded on the configured ad account."
    },
    {
      severity: (context.adAccountsPayload.data || []).length ? "info" : "high",
      area: "ad_account_visibility",
      message: (context.adAccountsPayload.data || []).length
        ? "At least one ad account is visible to the token."
        : "No ad accounts are visible to the token."
    },
    {
      severity: (context.businessesPayload.data || []).length ? "info" : "medium",
      area: "business_visibility",
      message: (context.businessesPayload.data || []).length
        ? "At least one business is visible to the token."
        : "No businesses are visible to the token."
    }
  ];
}

function buildSmokeChecklist() {
  return [
    {
      step: "1",
      area: "Consent",
      action: "Open the landing page in a fresh browser session and accept marketing consent.",
      success_signal: "The GTM Meta base tag fires on the consent-granted event."
    },
    {
      step: "2",
      area: "Landing",
      action: "Visit /kisapati-medences-szallas/ and verify ViewContent-related Meta/GTM activity.",
      success_signal: "A Meta/GTM ViewContent-style event appears after page load."
    },
    {
      step: "3",
      area: "CTA",
      action: "Click the booking CTA and verify BookingClick or equivalent event emission.",
      success_signal: "The booking click event appears in GTM/Pixel debugging."
    },
    {
      step: "4",
      area: "Checkout",
      action: "Proceed toward the booking flow and verify InitiateCheckout attribution.",
      success_signal: "InitiateCheckout or equivalent event is emitted after CTA-to-booking transition."
    },
    {
      step: "5",
      area: "Attribution",
      action: "Compare the browser-side events with Meta Pixel / Events Manager visibility.",
      success_signal: "The same pixel ID and recent activity are visible in Meta after the journey."
    }
  ];
}

function printAssetCheckReport(report, format) {
  if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  printMarkdownTable("Summary", [report.summary], [
    ["meta_user", "Meta user"],
    ["business_id", "Business ID"],
    ["business_name", "Business"],
    ["ad_account_id", "Ad account ID"],
    ["ad_account_name", "Ad account"],
    ["page_id", "Page ID"],
    ["page_name", "Page"],
    ["page_link", "Page link"],
    ["page_website", "Page website"],
    ["page_domain", "Page domain"],
    ["expected_domain", "Expected domain"],
    ["domain_match", "Domain match"],
    ["page_visible_to_token", "Page visible"],
    ["page_has_page_token", "Has page token"],
    ["page_tasks", "Page tasks"],
    ["owned_pixel_count", "Owned pixel count"],
    ["inferred_pixel_id", "Pixel ID"],
    ["inferred_pixel_last_fired_time", "Pixel last fired"]
  ]);
  printMarkdownTable("Business Pages", report.business_pages, [
    ["id", "Page ID"],
    ["name", "Page"],
    ["link", "Link"]
  ]);
  printMarkdownTable("Business Pixels", report.business_pixels, [
    ["id", "Pixel ID"],
    ["name", "Pixel"],
    ["last_fired_time", "Last fired"],
    ["creation_time", "Created"]
  ]);
  printMarkdownTable("Instagram Accounts", report.business_instagram_accounts, [
    ["id", "Instagram ID"],
    ["username", "Username"]
  ]);
  printMarkdownTable("Findings", report.findings, [
    ["severity", "Severity"],
    ["area", "Area"],
    ["message", "Message"]
  ]);
}

function printPermissionsDiagnosticsReport(report, format) {
  if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  printMarkdownTable("Summary", [report.summary], [
    ["meta_user", "Meta user"],
    ["granted_permission_count", "Granted permissions"],
    ["ads_management_granted", "ads_management"],
    ["ads_read_granted", "ads_read"],
    ["business_management_granted", "business_management"],
    ["pages_manage_posts_granted", "pages_manage_posts"],
    ["visible_ad_account_count", "Visible ad accounts"],
    ["visible_page_count", "Visible pages"],
    ["visible_business_count", "Visible businesses"],
    ["selected_page_has_page_token", "Selected page token"],
    ["selected_page_tasks", "Selected page tasks"],
    ["campaign_read_probe", "Campaign read probe"],
    ["campaign_read_probe_error", "Probe error"]
  ]);
  printMarkdownTable("Permissions", report.permissions, [
    ["permission", "Permission"],
    ["status", "Status"]
  ]);
  printMarkdownTable("Pages", report.pages, [
    ["id", "Page ID"],
    ["name", "Page"],
    ["category", "Category"],
    ["tasks", "Tasks"],
    ["has_page_token", "Has page token"]
  ]);
  printMarkdownTable("Findings", report.findings, [
    ["severity", "Severity"],
    ["area", "Area"],
    ["message", "Message"]
  ]);
}

function printSmokeChecklist(checklist, format) {
  if (format === "json") {
    console.log(JSON.stringify(checklist, null, 2));
    return;
  }

  printMarkdownTable("Smoke Checklist", checklist, [
    ["step", "Step"],
    ["area", "Area"],
    ["action", "Action"],
    ["success_signal", "Success signal"]
  ]);
}

function printMarkdownTable(title, rows, columns) {
  console.log(`## ${title}`);
  if (!rows.length) {
    console.log("No rows.\n");
    return;
  }

  console.log(`| ${columns.map(([, label]) => label).join(" | ")} |`);
  console.log(`| ${columns.map(() => "---").join(" | ")} |`);
  for (const row of rows) {
    console.log(`| ${columns.map(([key]) => escapeMarkdown(row[key] ?? "")).join(" | ")} |`);
  }
  console.log("");
}

function normalizeDigits(value, label) {
  const normalized = String(value || "").trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be numeric.`);
  }
  return normalized;
}

function extractHostname(urlString) {
  if (!urlString) {
    return "";
  }
  try {
    return new URL(urlString).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function escapeMarkdown(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}
