import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const GTM_API_BASE = "https://tagmanager.googleapis.com/tagmanager/v2";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const DEFAULT_GTM_TOKEN_PATH = ".secrets/gtm-oauth-token.json";

const META_EVENT_CONFIG = [
  { repoEvent: "meta_view_content", metaEvent: "ViewContent", tagName: "Meta Pixel - Event - ViewContent" },
  { repoEvent: "meta_booking_click", metaEvent: "BookingClick", tagName: "Meta Pixel - Event - BookingClick", trackCustom: true },
  { repoEvent: "meta_initiate_checkout", metaEvent: "InitiateCheckout", tagName: "Meta Pixel - Event - InitiateCheckout" },
  { repoEvent: "meta_contact", metaEvent: "Contact", tagName: "Meta Pixel - Event - Contact" },
  { repoEvent: "meta_lead", metaEvent: "Lead", tagName: "Meta Pixel - Event - Lead" }
];

loadEnv();

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help) {
    printHelp();
  } else {
    await run(args);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Meta GTM event scaffolder

Usage:
  node scripts/meta/gtm-meta-events.mjs [--format md|json] [--execute]

Default behavior:
  - discovers GTM account/container/workspace
  - inspects existing custom-event triggers and Meta tags
  - prints which triggers/tags are missing for repo-emitted meta_* events

With --execute:
  - creates missing GTM custom-event triggers
  - creates missing GTM HTML event tags in the current workspace

Notes:
  - this does not publish the container
  - this only prepares the current GTM workspace
`);
}

function parseArgs(argv) {
  const parsed = {
    format: "md",
    execute: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--execute") {
      parsed.execute = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function loadEnv(filePath = ".env") {
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

function getOAuthClientPath() {
  return process.env.GTM_OAUTH_CLIENT_JSON || process.env.GEO_OAUTH_CLIENT_JSON || process.env.GOOGLE_OAUTH_CLIENT_JSON;
}

function getTokenPath() {
  return process.env.GTM_OAUTH_TOKEN_JSON || DEFAULT_GTM_TOKEN_PATH;
}

function loadOAuthClient() {
  const clientPath = getOAuthClientPath();
  if (!clientPath) {
    throw new Error("Set GTM_OAUTH_CLIENT_JSON or GEO_OAUTH_CLIENT_JSON in .env.");
  }
  const payload = JSON.parse(readFileSync(path.resolve(clientPath), "utf8"));
  const client = payload.installed || payload.web;
  if (!client?.client_id || !client?.client_secret) {
    throw new Error("OAuth client JSON missing client_id/client_secret.");
  }
  return client;
}

async function getAccessToken() {
  const tokenPath = path.resolve(getTokenPath());
  if (!existsSync(tokenPath)) {
    throw new Error(`GTM OAuth token not found at ${tokenPath}.`);
  }
  const token = JSON.parse(readFileSync(tokenPath, "utf8"));
  const client = loadOAuthClient();
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

async function gtmRequest(resourcePath, { method = "GET", body = undefined } = {}) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${GTM_API_BASE}/${resourcePath.replace(/^\/+/, "")}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(body !== undefined ? { "Content-Type": "application/json" } : {})
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });
  const data = await response.json();
  if (!response.ok || data.error) {
    throw new Error(`GTM API ${response.status}: ${data.error?.message || response.statusText}`);
  }
  return data;
}

async function discoverContext() {
  const accounts = (await gtmRequest("accounts")).account || [];
  const account = process.env.GTM_ACCOUNT_ID
    ? accounts.find((item) => String(item.accountId) === String(process.env.GTM_ACCOUNT_ID))
    : accounts[0];
  if (!account) {
    throw new Error("No visible GTM account.");
  }

  const containers = (await gtmRequest(`${account.path}/containers`)).container || [];
  const container = process.env.GTM_CONTAINER_ID
    ? containers.find((item) => String(item.containerId) === String(process.env.GTM_CONTAINER_ID))
    : containers[0];
  if (!container) {
    throw new Error("No visible GTM container.");
  }

  const workspaces = (await gtmRequest(`${container.path}/workspaces`)).workspace || [];
  const workspace = process.env.GTM_WORKSPACE_ID
    ? workspaces.find((item) => String(item.workspaceId) === String(process.env.GTM_WORKSPACE_ID))
    : workspaces[0];
  if (!workspace) {
    throw new Error("No visible GTM workspace.");
  }

  return {
    accountId: account.accountId,
    containerId: container.containerId,
    workspaceId: workspace.workspaceId,
    publicId: container.publicId,
    workspacePath: workspace.path
  };
}

async function run(args) {
  const context = await discoverContext();
  const tags = (await gtmRequest(`${context.workspacePath}/tags`)).tag || [];
  const triggers = (await gtmRequest(`${context.workspacePath}/triggers`)).trigger || [];

  const triggerByEvent = new Map();
  for (const trigger of triggers) {
    const eventName = extractEventName(trigger);
    if (eventName) {
      triggerByEvent.set(eventName, trigger);
    }
  }

  const tagCoverage = new Map();
  for (const tag of tags) {
    for (const triggerId of tag.firingTriggerId || []) {
      const trigger = triggers.find((item) => String(item.triggerId) === String(triggerId));
      const eventName = trigger ? extractEventName(trigger) : "";
      if (!eventName) {
        continue;
      }
      if (!tagCoverage.has(eventName)) {
        tagCoverage.set(eventName, []);
      }
      tagCoverage.get(eventName).push(tag);
    }
  }

  const plan = META_EVENT_CONFIG.map((item) => {
    const existingTrigger = triggerByEvent.get(item.repoEvent) || null;
    const existingMetaTag = (tagCoverage.get(item.repoEvent) || []).find((tag) => tag.name === item.tagName) || null;
    return {
      repo_event: item.repoEvent,
      meta_event: item.metaEvent,
      trigger_exists: existingTrigger ? "true" : "false",
      tag_exists: existingMetaTag ? "true" : "false",
      trigger_name: existingTrigger?.name || defaultTriggerName(item.repoEvent),
      tag_name: existingMetaTag?.name || item.tagName
    };
  });

  const created = [];

  if (args.execute) {
    for (const item of META_EVENT_CONFIG) {
      let trigger = triggerByEvent.get(item.repoEvent) || null;
      if (!trigger) {
        trigger = await gtmRequest(`${context.workspacePath}/triggers`, {
          method: "POST",
          body: buildTriggerBody(item.repoEvent)
        });
        triggerByEvent.set(item.repoEvent, trigger);
        created.push({ type: "trigger", name: trigger.name, repo_event: item.repoEvent });
      }

      const existingTags = tagCoverage.get(item.repoEvent) || [];
      const existingTag = existingTags.find((tag) => tag.name === item.tagName) || null;
      if (!existingTag) {
        const tag = await gtmRequest(`${context.workspacePath}/tags`, {
          method: "POST",
          body: buildHtmlTagBody(item, trigger.triggerId)
        });
        existingTags.push(tag);
        tagCoverage.set(item.repoEvent, existingTags);
        created.push({ type: "tag", name: tag.name, repo_event: item.repoEvent });
      }
    }
  }

  const result = {
    context,
    plan,
    created
  };

  printResult(result, args.format);
}

function extractEventName(trigger) {
  const filter = Array.isArray(trigger.customEventFilter) ? trigger.customEventFilter[0] : null;
  const params = Array.isArray(filter?.parameter) ? filter.parameter : [];
  return params.find((param) => param.key === "arg1")?.value || "";
}

function defaultTriggerName(repoEvent) {
  return `CE - ${repoEvent}`;
}

function buildTriggerBody(repoEvent) {
  return {
    name: defaultTriggerName(repoEvent),
    type: "customEvent",
    customEventFilter: [
      {
        type: "equals",
        parameter: [
          { type: "template", key: "arg0", value: "{{_event}}" },
          { type: "template", key: "arg1", value: repoEvent }
        ]
      }
    ]
  };
}

function buildHtmlTagBody(item, triggerId) {
  const trackLine = item.trackCustom
    ? `fbq('trackCustom', '${item.metaEvent}');`
    : `fbq('track', '${item.metaEvent}');`;

  return {
    name: item.tagName,
    type: "html",
    parameter: [
      {
        type: "template",
        key: "html",
        value: `<script>\nif (window.fbq) {\n  ${trackLine}\n}\n</script>`
      },
      {
        type: "boolean",
        key: "supportDocumentWrite",
        value: "false"
      }
    ],
    firingTriggerId: [String(triggerId)],
    tagFiringOption: "oncePerEvent"
  };
}

function printResult(result, format) {
  if (format === "json") {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (format !== "md") {
    throw new Error("--format must be md or json.");
  }

  console.log("## GTM Context");
  console.log(`| Key | Value |`);
  console.log(`| --- | --- |`);
  for (const [key, value] of Object.entries(result.context)) {
    console.log(`| ${escapeMd(key)} | ${escapeMd(value)} |`);
  }
  console.log("");

  console.log("## Event Plan");
  console.log(`| Repo event | Meta event | Trigger exists | Tag exists | Trigger name | Tag name |`);
  console.log(`| --- | --- | --- | --- | --- | --- |`);
  for (const row of result.plan) {
    console.log(
      `| ${escapeMd(row.repo_event)} | ${escapeMd(row.meta_event)} | ${escapeMd(row.trigger_exists)} | ${escapeMd(row.tag_exists)} | ${escapeMd(row.trigger_name)} | ${escapeMd(row.tag_name)} |`
    );
  }
  console.log("");

  console.log("## Created");
  if (!result.created.length) {
    console.log("No changes created.\n");
    return;
  }
  console.log(`| Type | Name | Repo event |`);
  console.log(`| --- | --- | --- |`);
  for (const row of result.created) {
    console.log(`| ${escapeMd(row.type)} | ${escapeMd(row.name)} | ${escapeMd(row.repo_event)} |`);
  }
  console.log("");
}

function escapeMd(value) {
  return String(value ?? "").replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}
