import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const META_GRAPH_HOST = "https://graph.facebook.com";
const META_DEFAULT_VERSION = "v25.0";
const GTM_API_BASE = "https://tagmanager.googleapis.com/tagmanager/v2";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DEFAULT_GTM_TOKEN_PATH = ".secrets/gtm-oauth-token.json";
const REQUIRED_META_EVENTS = [
  "meta_view_content",
  "meta_booking_click",
  "meta_initiate_checkout",
  "meta_contact",
  "meta_lead"
];

await loadEnv();

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help) {
    printHelp();
  } else {
    const report = await buildReport(args);
    printReport(report, args.format);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Meta Pixel validation helper

Usage:
  node scripts/meta/meta-validate-pixel.mjs [--format md|json]

Checks:
  - Meta business pixels visible to the current token
  - GTM account/container/workspace discovery
  - GTM Meta Pixel base tag presence and pixel ID extraction
  - consent trigger wiring for the Meta base tag
  - repo-emitted meta_* dataLayer events
  - whether GTM contains event-level Meta tags for those repo events
`);
}

function parseArgs(argv) {
  const parsed = {
    format: "md"
  };

  for (let index = 0; index < argv.length; index += 1) {
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

function getMetaVersion() {
  return process.env.META_GRAPH_VERSION || META_DEFAULT_VERSION;
}

function getMetaAccessToken() {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Set META_ACCESS_TOKEN in .env.");
  }
  return token;
}

async function metaRequest(pathname, query = {}) {
  const url = new URL(`${META_GRAPH_HOST}/${getMetaVersion()}/${pathname.replace(/^\/+/, "")}`);
  url.searchParams.set("access_token", getMetaAccessToken());

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

function getGtmOAuthClientPath() {
  return process.env.GTM_OAUTH_CLIENT_JSON || process.env.GEO_OAUTH_CLIENT_JSON || process.env.GOOGLE_OAUTH_CLIENT_JSON;
}

function getGtmTokenPath() {
  return process.env.GTM_OAUTH_TOKEN_JSON || DEFAULT_GTM_TOKEN_PATH;
}

function loadGtmOAuthClient() {
  const clientPath = getGtmOAuthClientPath();
  if (!clientPath) {
    throw new Error("Set GTM_OAUTH_CLIENT_JSON or GEO_OAUTH_CLIENT_JSON in .env.");
  }

  const payload = JSON.parse(readFileSync(path.resolve(clientPath), "utf8"));
  const client = payload.installed || payload.web;
  if (!client?.client_id || !client?.client_secret) {
    throw new Error("GTM OAuth client JSON is missing client_id/client_secret.");
  }
  return client;
}

async function getGtmAccessToken() {
  const tokenPath = path.resolve(getGtmTokenPath());
  if (!existsSync(tokenPath)) {
    throw new Error(`GTM OAuth token not found at ${tokenPath}.`);
  }

  const client = loadGtmOAuthClient();
  const token = JSON.parse(readFileSync(tokenPath, "utf8"));
  if (!token.refresh_token) {
    throw new Error("GTM OAuth token file is missing refresh_token.");
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

  const refreshed = await response.json();
  if (!response.ok) {
    throw new Error(`GTM OAuth refresh failed: ${JSON.stringify(refreshed)}`);
  }

  return refreshed.access_token;
}

async function gtmRequest(resourcePath) {
  const accessToken = await getGtmAccessToken();
  const url = new URL(`${GTM_API_BASE}/${resourcePath.replace(/^\/+/, "")}`);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(`GTM API ${response.status}: ${data.error?.message || response.statusText}`);
  }
  return data;
}

async function buildReport(_args) {
  const user = await metaRequest("/me", { fields: "id,name" });
  const businessesResult = await metaRequest("/me/businesses", { fields: "id,name", limit: 20 });
  const businesses = businessesResult.data || [];

  const ownedPixels = [];
  for (const business of businesses) {
    const pixels = await metaRequest(`/${business.id}/owned_pixels`, {
      fields: "id,name,last_fired_time,creation_time",
      limit: 50
    });
    for (const pixel of pixels.data || []) {
      ownedPixels.push({
        business_id: business.id,
        business_name: business.name,
        pixel_id: pixel.id,
        pixel_name: pixel.name,
        last_fired_time: pixel.last_fired_time || "",
        creation_time: pixel.creation_time || ""
      });
    }
  }

  const gtmContext = await discoverGtmContext();
  const tagsResult = await gtmRequest(`${gtmContext.workspacePath}/tags`);
  const triggersResult = await gtmRequest(`${gtmContext.workspacePath}/triggers`);
  const tags = tagsResult.tag || [];
  const triggers = triggersResult.trigger || [];

  const triggerEventById = new Map();
  for (const trigger of triggers) {
    triggerEventById.set(String(trigger.triggerId), extractTriggerEventName(trigger));
  }

  const metaBaseTag =
    tags.find((tag) => getTagHtml(tag).includes("fbq('init'")) ||
    tags.find((tag) => tag.name?.toLowerCase().includes("meta pixel - base")) ||
    null;

  const gtmPixelId = metaBaseTag ? extractPixelIdFromHtml(getTagHtml(metaBaseTag)) : "";
  const marketingGrantedTriggerId = metaBaseTag?.firingTriggerId?.[0] || "";
  const marketingGrantedEvent = marketingGrantedTriggerId ? triggerEventById.get(String(marketingGrantedTriggerId)) || "" : "";

  const repoMetaEvents = extractRepoMetaEvents();
  const metaRelatedTags = tags.filter((tag) => isMetaRelatedTag(tag));
  const tagEventPairs = metaRelatedTags.flatMap((tag) =>
    (tag.firingTriggerId || []).map((triggerId) => ({
      tag_name: tag.name,
      trigger_id: String(triggerId),
      event_name: triggerEventById.get(String(triggerId)) || ""
    }))
  );

  const matchedEventTags = new Map();
  for (const pair of tagEventPairs) {
    if (!pair.event_name) {
      continue;
    }
    if (!matchedEventTags.has(pair.event_name)) {
      matchedEventTags.set(pair.event_name, []);
    }
    matchedEventTags.get(pair.event_name).push(pair.tag_name);
  }

  const repoEventCoverage = repoMetaEvents.map((eventName) => ({
    event_name: eventName,
    has_gtm_triggered_meta_tag: matchedEventTags.has(eventName) ? "true" : "false",
    matching_tags: matchedEventTags.has(eventName) ? matchedEventTags.get(eventName).join(", ") : ""
  }));

  const matchingPixel = gtmPixelId ? ownedPixels.find((pixel) => pixel.pixel_id === gtmPixelId) || null : null;

  return {
    summary: {
      meta_user: user.name,
      business_count: businesses.length,
      owned_pixel_count: ownedPixels.length,
      gtm_account_id: gtmContext.accountId,
      gtm_container_id: gtmContext.containerId,
      gtm_workspace_id: gtmContext.workspaceId,
      gtm_public_id: gtmContext.publicId,
      gtm_meta_base_tag_present: metaBaseTag ? "true" : "false",
      gtm_meta_base_pixel_id: gtmPixelId,
      gtm_meta_base_trigger_event: marketingGrantedEvent,
      pixel_found_in_business_assets: matchingPixel ? "true" : "false",
      pixel_last_fired_time: matchingPixel?.last_fired_time || "",
      repo_meta_event_count: repoMetaEvents.length,
      repo_meta_event_tags_covered: repoEventCoverage.filter((row) => row.has_gtm_triggered_meta_tag === "true").length
    },
    owned_pixels: ownedPixels,
    repo_event_coverage: repoEventCoverage,
    findings: buildFindings({
      metaBaseTag,
      gtmPixelId,
      marketingGrantedEvent,
      matchingPixel,
      repoEventCoverage
    })
  };
}

async function discoverGtmContext() {
  const accounts = (await gtmRequest("accounts")).account || [];
  if (!accounts.length) {
    throw new Error("No GTM accounts visible.");
  }

  const account = process.env.GTM_ACCOUNT_ID
    ? accounts.find((item) => String(item.accountId) === String(process.env.GTM_ACCOUNT_ID))
    : accounts[0];
  if (!account) {
    throw new Error("Configured GTM_ACCOUNT_ID is not visible.");
  }

  const containers = (await gtmRequest(`${account.path}/containers`)).container || [];
  if (!containers.length) {
    throw new Error("No GTM containers visible.");
  }

  const container = process.env.GTM_CONTAINER_ID
    ? containers.find((item) => String(item.containerId) === String(process.env.GTM_CONTAINER_ID))
    : containers[0];
  if (!container) {
    throw new Error("Configured GTM_CONTAINER_ID is not visible.");
  }

  const workspaces = (await gtmRequest(`${container.path}/workspaces`)).workspace || [];
  if (!workspaces.length) {
    throw new Error("No GTM workspaces visible.");
  }

  const workspace = process.env.GTM_WORKSPACE_ID
    ? workspaces.find((item) => String(item.workspaceId) === String(process.env.GTM_WORKSPACE_ID))
    : workspaces.find((item) => item.name === "Default Workspace") || workspaces[0];
  if (!workspace) {
    throw new Error("Configured GTM_WORKSPACE_ID is not visible.");
  }

  return {
    accountId: account.accountId,
    containerId: container.containerId,
    workspaceId: workspace.workspaceId,
    publicId: container.publicId,
    workspacePath: workspace.path
  };
}

function getTagHtml(tag) {
  const htmlParameter = Array.isArray(tag.parameter) ? tag.parameter.find((parameter) => parameter.key === "html") : null;
  return htmlParameter?.value || "";
}

function extractPixelIdFromHtml(html) {
  const match = html.match(/fbq\('init',\s*'(\d+)'\)/) || html.match(/tr\?id=(\d+)/);
  return match?.[1] || "";
}

function extractTriggerEventName(trigger) {
  const filter = Array.isArray(trigger.customEventFilter) ? trigger.customEventFilter[0] : null;
  const parameters = Array.isArray(filter?.parameter) ? filter.parameter : [];
  const eventParameter = parameters.find((parameter) => parameter.key === "arg1");
  return eventParameter?.value || "";
}

function extractRepoMetaEvents() {
  const sourcePath = path.resolve("public/scripts/dnd-ads-events.js");
  if (!existsSync(sourcePath)) {
    return REQUIRED_META_EVENTS.slice();
  }

  const source = readFileSync(sourcePath, "utf8");
  const matches = new Set();
  const pattern = /pushMetaEvent\(\s*"([^"]+)"/g;
  let match;
  while ((match = pattern.exec(source))) {
    matches.add(match[1]);
  }

  return Array.from(matches);
}

function isMetaRelatedTag(tag) {
  const html = getTagHtml(tag);
  return tag.name?.toLowerCase().includes("meta") || html.includes("fbq(");
}

function buildFindings({ metaBaseTag, gtmPixelId, marketingGrantedEvent, matchingPixel, repoEventCoverage }) {
  const findings = [];

  findings.push({
    severity: metaBaseTag ? "info" : "high",
    area: "gtm_base_tag",
    message: metaBaseTag
      ? `Meta base tag present in GTM${gtmPixelId ? ` with pixel ${gtmPixelId}` : ""}.`
      : "Meta Pixel base tag is missing from GTM."
  });

  findings.push({
    severity: marketingGrantedEvent === "dnd_marketing_granted" ? "info" : "medium",
    area: "consent_trigger",
    message:
      marketingGrantedEvent === "dnd_marketing_granted"
        ? "Meta base tag is gated by the marketing-consent event."
        : "Meta base tag is not clearly gated by the expected dnd_marketing_granted event."
  });

  findings.push({
    severity: matchingPixel ? "info" : "medium",
    area: "pixel_match",
    message: matchingPixel
      ? `The GTM pixel ID matches a Meta Business pixel last fired at ${matchingPixel.last_fired_time || "unknown time"}.`
      : "The GTM pixel ID could not be matched to a visible owned Meta Business pixel."
  });

  const missingEvents = repoEventCoverage.filter((row) => row.has_gtm_triggered_meta_tag !== "true").map((row) => row.event_name);
  findings.push({
    severity: missingEvents.length ? "high" : "info",
    area: "event_coverage",
    message: missingEvents.length
      ? `Repo emits ${missingEvents.join(", ")} but GTM has no matching Meta event tag wired to those events.`
      : "Repo-emitted meta_* events appear to have matching GTM Meta tags."
  });

  return findings;
}

function printReport(report, format) {
  if (format === "json") {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (format !== "md") {
    throw new Error("--format must be md or json.");
  }

  const summaryRows = Object.entries(report.summary).map(([key, value]) => ({
    key,
    value: value ?? ""
  }));

  printMarkdownTable("Summary", summaryRows, [
    ["key", "Key"],
    ["value", "Value"]
  ]);

  printMarkdownTable("Owned Pixels", report.owned_pixels, [
    ["business_name", "Business"],
    ["pixel_id", "Pixel ID"],
    ["pixel_name", "Pixel"],
    ["last_fired_time", "Last fired"],
    ["creation_time", "Created"]
  ]);

  printMarkdownTable("Repo Event Coverage", report.repo_event_coverage, [
    ["event_name", "Repo event"],
    ["has_gtm_triggered_meta_tag", "Has GTM Meta tag"],
    ["matching_tags", "Matching tags"]
  ]);

  printMarkdownTable("Findings", report.findings, [
    ["severity", "Severity"],
    ["area", "Area"],
    ["message", "Message"]
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

function escapeMarkdown(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}
