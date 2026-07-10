import { existsSync, readFileSync, writeFileSync } from "node:fs";
import http from "node:http";
import path from "node:path";

const GTM_API_BASE = "https://tagmanager.googleapis.com/tagmanager/v2";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GTM_SCOPES = [
  "https://www.googleapis.com/auth/tagmanager.edit.containers",
  "https://www.googleapis.com/auth/tagmanager.edit.containerversions",
  "https://www.googleapis.com/auth/tagmanager.publish"
];
const OAUTH_REDIRECT_URI = "http://127.0.0.1:53685/oauth2callback";
const DEFAULT_TOKEN_PATH = ".secrets/gtm-oauth-token.json";

loadDotEnv();

const args = parseArgs(process.argv);

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "auth") {
    await createOAuthToken(args);
  } else if (args.command === "accounts") {
    await listAccounts(args);
  } else if (args.command === "containers") {
    await listContainers(args);
  } else if (args.command === "workspaces") {
    await listWorkspaces(args);
  } else if (args.command === "tags") {
    await listTags(args);
  } else if (args.command === "tag") {
    await getTag(args);
  } else if (args.command === "triggers") {
    await listTriggers(args);
  } else if (args.command === "trigger") {
    await getTrigger(args);
  } else if (args.command === "variables") {
    await listVariables(args);
  } else if (args.command === "built-ins") {
    await listBuiltInVariables(args);
  } else if (args.command === "latest-version") {
    await getLatestVersion(args);
  } else if (args.command === "add-firing-trigger") {
    await addFiringTrigger(args);
  } else if (args.command === "create-version") {
    await createVersion(args);
  } else if (args.command === "publish-version") {
    await publishVersion(args);
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Google Tag Manager API helper

Usage:
  node scripts/google-tag-manager.mjs auth
  node scripts/google-tag-manager.mjs accounts [--format md|json|csv]
  node scripts/google-tag-manager.mjs containers --account 123456 [--format md|json|csv]
  node scripts/google-tag-manager.mjs workspaces --account 123456 --container 654321 [--format md|json|csv]
  node scripts/google-tag-manager.mjs tags --account 123456 --container 654321 --workspace 1 [--format md|json|csv]
  node scripts/google-tag-manager.mjs tag --account 123456 --container 654321 --workspace 1 --tag 9 [--format md|json|csv]
  node scripts/google-tag-manager.mjs triggers --account 123456 --container 654321 --workspace 1 [--format md|json|csv]
  node scripts/google-tag-manager.mjs trigger --account 123456 --container 654321 --workspace 1 --trigger 8 [--format md|json|csv]
  node scripts/google-tag-manager.mjs variables --account 123456 --container 654321 --workspace 1 [--format md|json|csv]
  node scripts/google-tag-manager.mjs built-ins --account 123456 --container 654321 --workspace 1 [--format md|json|csv]
  node scripts/google-tag-manager.mjs latest-version --account 123456 --container 654321 [--format md|json|csv]
  node scripts/google-tag-manager.mjs add-firing-trigger --account 123456 --container 654321 --workspace 1 --tag 21 --trigger 20 [--format md|json|csv]
  node scripts/google-tag-manager.mjs create-version --account 123456 --container 654321 --workspace 1 [--name "Version name"] [--notes "Notes"] [--format md|json|csv]
  node scripts/google-tag-manager.mjs publish-version --account 123456 --container 654321 --version 12 [--format md|json|csv]

Required env:
  GTM_OAUTH_CLIENT_JSON or GEO_OAUTH_CLIENT_JSON
  plus a token file created with the auth command

Optional env:
  GTM_OAUTH_TOKEN_JSON=.secrets/gtm-oauth-token.json
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
    format: "md",
    accountId: process.env.GTM_ACCOUNT_ID,
    containerId: process.env.GTM_CONTAINER_ID,
    workspaceId: process.env.GTM_WORKSPACE_ID,
    tagId: process.env.GTM_TAG_ID,
    triggerId: process.env.GTM_TRIGGER_ID,
    versionId: process.env.GTM_VERSION_ID,
    versionName: undefined,
    notes: undefined,
    tokenPath: process.env.GTM_OAUTH_TOKEN_JSON || DEFAULT_TOKEN_PATH
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
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--account") {
      parsed.accountId = next;
      index += 1;
    } else if (arg === "--container") {
      parsed.containerId = next;
      index += 1;
    } else if (arg === "--workspace") {
      parsed.workspaceId = next;
      index += 1;
    } else if (arg === "--tag") {
      parsed.tagId = next;
      index += 1;
    } else if (arg === "--trigger") {
      parsed.triggerId = next;
      index += 1;
    } else if (arg === "--version") {
      parsed.versionId = next;
      index += 1;
    } else if (arg === "--name") {
      parsed.versionName = next;
      index += 1;
    } else if (arg === "--notes") {
      parsed.notes = next;
      index += 1;
    } else if (arg === "--token") {
      parsed.tokenPath = next;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function loadOAuthClient() {
  const clientPath =
    process.env.GTM_OAUTH_CLIENT_JSON ||
    process.env.GEO_OAUTH_CLIENT_JSON ||
    process.env.GOOGLE_OAUTH_CLIENT_JSON;

  if (!clientPath) {
    throw new Error("Set GTM_OAUTH_CLIENT_JSON or GEO_OAUTH_CLIENT_JSON to an OAuth client JSON file.");
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
  authLink.searchParams.set("scope", GTM_SCOPES.join(" "));
  authLink.searchParams.set("access_type", "offline");
  authLink.searchParams.set("prompt", "consent");

  console.log("Open this URL, sign in with the Google account that has GTM access, then approve:");
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

      response.end("GTM authorization complete. You can return to Codex.");
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
    throw new Error(`OAuth token not found at ${resolvedTokenPath}. Run: node scripts/google-tag-manager.mjs auth`);
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

function requireArg(value, label) {
  if (!value) {
    throw new Error(`Missing ${label}.`);
  }
  return String(value).trim();
}

function resolveContainerParent(args) {
  return `accounts/${requireArg(args.accountId, "GTM account ID")}`;
}

function resolveWorkspaceParent(args) {
  return `${resolveContainerPath(args)}/workspaces/${requireArg(args.workspaceId, "GTM workspace ID")}`;
}

function resolveContainerPath(args) {
  return `${resolveContainerParent(args)}/containers/${requireArg(args.containerId, "GTM container ID")}`;
}

async function gtmRequest(resourcePath, args, options = {}) {
  const accessToken = await getOAuthAccessToken(args);
  const url = new URL(`${GTM_API_BASE}/${resourcePath.replace(/^\/+/, "")}`);
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  const requestOptions = {
    method: options.method || "GET",
    headers
  };

  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    requestOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, requestOptions);

  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";
  const data = text ? (contentType.includes("application/json") ? JSON.parse(text) : { rawText: text }) : null;

  if (!response.ok) {
    throw new Error(`GTM API ${response.status}: ${data?.error?.message || response.statusText}`);
  }

  return data;
}

async function listAccounts(args) {
  const result = await gtmRequest("accounts", args);
  const rows = (result.account || []).map((account) => ({
    accountId: account.accountId,
    name: account.name,
    path: account.path,
    shareData: account.shareData
  }));

  printRows(rows, args.format, [
    ["accountId", "Account ID"],
    ["name", "Name"],
    ["path", "Path"],
    ["shareData", "Share data"]
  ]);
}

async function listContainers(args) {
  const result = await gtmRequest(`${resolveContainerParent(args)}/containers`, args);
  const rows = (result.container || []).map((container) => ({
    containerId: container.containerId,
    name: container.name,
    usageContext: Array.isArray(container.usageContext) ? container.usageContext.join(",") : "",
    publicId: container.publicId,
    path: container.path
  }));

  printRows(rows, args.format, [
    ["containerId", "Container ID"],
    ["name", "Name"],
    ["usageContext", "Usage"],
    ["publicId", "Public ID"],
    ["path", "Path"]
  ]);
}

async function listWorkspaces(args) {
  const result = await gtmRequest(`${resolveContainerPath(args)}/workspaces`, args);
  const rows = (result.workspace || []).map((workspace) => ({
    workspaceId: workspace.workspaceId,
    name: workspace.name,
    description: workspace.description || "",
    path: workspace.path
  }));

  printRows(rows, args.format, [
    ["workspaceId", "Workspace ID"],
    ["name", "Name"],
    ["description", "Description"],
    ["path", "Path"]
  ]);
}

async function listTags(args) {
  const result = await gtmRequest(`${resolveWorkspaceParent(args)}/tags`, args);
  const rows = (result.tag || []).map((tag) => ({
    tagId: tag.tagId,
    name: tag.name,
    type: tag.type,
    firingTriggerId: Array.isArray(tag.firingTriggerId) ? tag.firingTriggerId.join(",") : "",
    path: tag.path
  }));

  printRows(rows, args.format, [
    ["tagId", "Tag ID"],
    ["name", "Name"],
    ["type", "Type"],
    ["firingTriggerId", "Firing triggers"],
    ["path", "Path"]
  ]);
}

async function getTag(args) {
  const tagId = requireArg(args.tagId, "GTM tag ID");
  const tag = await gtmRequest(`${resolveWorkspaceParent(args)}/tags/${tagId}`, args);
  printRows([flattenEntity(tag)], args.format, entityColumns());
}

async function listTriggers(args) {
  const result = await gtmRequest(`${resolveWorkspaceParent(args)}/triggers`, args);
  const rows = (result.trigger || []).map((trigger) => ({
    triggerId: trigger.triggerId,
    name: trigger.name,
    type: trigger.type,
    customEventFilter: Array.isArray(trigger.customEventFilter) ? trigger.customEventFilter.length : 0,
    path: trigger.path
  }));

  printRows(rows, args.format, [
    ["triggerId", "Trigger ID"],
    ["name", "Name"],
    ["type", "Type"],
    ["customEventFilter", "Event filters"],
    ["path", "Path"]
  ]);
}

async function getTrigger(args) {
  const triggerId = requireArg(args.triggerId, "GTM trigger ID");
  const trigger = await gtmRequest(`${resolveWorkspaceParent(args)}/triggers/${triggerId}`, args);
  printRows([flattenEntity(trigger)], args.format, entityColumns());
}

async function listVariables(args) {
  const result = await gtmRequest(`${resolveWorkspaceParent(args)}/variables`, args);
  const rows = (result.variable || []).map((variable) => ({
    variableId: variable.variableId,
    name: variable.name,
    type: variable.type,
    path: variable.path
  }));

  printRows(rows, args.format, [
    ["variableId", "Variable ID"],
    ["name", "Name"],
    ["type", "Type"],
    ["path", "Path"]
  ]);
}

async function listBuiltInVariables(args) {
  const result = await gtmRequest(`${resolveWorkspaceParent(args)}/built_in_variables`, args);
  const rows = (result.builtInVariable || []).map((variable) => ({
    type: variable.type,
    name: variable.name,
    path: variable.path
  }));

  printRows(rows, args.format, [
    ["type", "Type"],
    ["name", "Name"],
    ["path", "Path"]
  ]);
}

async function getLatestVersion(args) {
  const version = await gtmRequest(`${resolveContainerPath(args)}/versions:live`, args);
  const rows = [
    {
      containerVersionId: version.containerVersionId,
      name: version.name,
      numTags: version.numTags,
      numTriggers: version.numTriggers,
      numVariables: version.numVariables,
      deleted: version.deleted
    }
  ];

  printRows(rows, args.format, [
    ["containerVersionId", "Version ID"],
    ["name", "Name"],
    ["numTags", "Tags"],
    ["numTriggers", "Triggers"],
    ["numVariables", "Variables"],
    ["deleted", "Deleted"]
  ]);
}

async function addFiringTrigger(args) {
  const tagId = requireArg(args.tagId, "GTM tag ID");
  const triggerId = requireArg(args.triggerId, "GTM trigger ID");
  const tagPath = `${resolveWorkspaceParent(args)}/tags/${tagId}`;
  const tag = await gtmRequest(tagPath, args);
  const currentTriggers = Array.isArray(tag.firingTriggerId) ? tag.firingTriggerId.map(String) : [];
  const nextTriggers = Array.from(new Set([...currentTriggers, String(triggerId)]));
  tag.firingTriggerId = nextTriggers;

  const updated = await gtmRequest(tagPath, args, {
    method: "PUT",
    query: { fingerprint: tag.fingerprint },
    body: tag
  });

  printRows(
    [
      {
        tagId: updated.tagId,
        name: updated.name,
        firingTriggerId: Array.isArray(updated.firingTriggerId) ? updated.firingTriggerId.join(",") : ""
      }
    ],
    args.format,
    [
      ["tagId", "Tag ID"],
      ["name", "Name"],
      ["firingTriggerId", "Firing triggers"]
    ]
  );
}

async function createVersion(args) {
  const workspacePath = resolveWorkspaceParent(args);
  const payload = {};
  if (args.versionName) {
    payload.name = args.versionName;
  }
  if (args.notes) {
    payload.notes = args.notes;
  }

  const result = await gtmRequest(`${workspacePath}:create_version`, args, {
    method: "POST",
    body: payload
  });

  const containerVersion = result.containerVersion || {};
  printRows(
    [
      {
        containerVersionId: containerVersion.containerVersionId,
        name: containerVersion.name,
        path: containerVersion.path,
        fingerprint: containerVersion.fingerprint
      }
    ],
    args.format,
    [
      ["containerVersionId", "Version ID"],
      ["name", "Name"],
      ["path", "Path"],
      ["fingerprint", "Fingerprint"]
    ]
  );
}

async function publishVersion(args) {
  const versionId = requireArg(args.versionId, "GTM version ID");
  const versionPath = `${resolveContainerPath(args)}/versions/${versionId}`;
  const result = await gtmRequest(`${versionPath}:publish`, args, {
    method: "POST",
    body: {}
  });

  const version = result.containerVersion || {};
  printRows(
    [
      {
        containerVersionId: version.containerVersionId,
        name: version.name,
        path: version.path,
        fingerprint: version.fingerprint
      }
    ],
    args.format,
    [
      ["containerVersionId", "Version ID"],
      ["name", "Name"],
      ["path", "Path"],
      ["fingerprint", "Fingerprint"]
    ]
  );
}

function flattenEntity(entity) {
  return {
    id: entity.tagId || entity.triggerId || entity.variableId || "",
    name: entity.name || "",
    type: entity.type || "",
    path: entity.path || "",
    firingTriggerId: Array.isArray(entity.firingTriggerId) ? entity.firingTriggerId.join(",") : "",
    parameterJson: entity.parameter ? JSON.stringify(entity.parameter) : "",
    customEventFilterJson: entity.customEventFilter ? JSON.stringify(entity.customEventFilter) : "",
    filterJson: entity.filter ? JSON.stringify(entity.filter) : "",
    notes: entity.notes || "",
    rawJson: JSON.stringify(entity)
  };
}

function entityColumns() {
  return [
    ["id", "ID"],
    ["name", "Name"],
    ["type", "Type"],
    ["firingTriggerId", "Firing triggers"],
    ["parameterJson", "Parameters"],
    ["customEventFilterJson", "Custom event filter"],
    ["filterJson", "Filter"],
    ["notes", "Notes"],
    ["path", "Path"],
    ["rawJson", "Raw JSON"]
  ];
}

function printRows(rows, format, columns) {
  if (format === "json") {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }

  if (format === "csv") {
    const header = columns.map(([, label]) => escapeCsv(label)).join(",");
    const body = rows
      .map((row) => columns.map(([key]) => escapeCsv(row[key] ?? "")).join(","))
      .join("\n");
    console.log([header, body].filter(Boolean).join("\n"));
    return;
  }

  const labels = columns.map(([, label]) => label);
  const widths = columns.map(([key], index) =>
    Math.max(labels[index].length, ...rows.map((row) => String(row[key] ?? "").length))
  );

  const header = labels.map((label, index) => label.padEnd(widths[index])).join(" | ");
  const separator = widths.map((width) => "-".repeat(width)).join(" | ");
  const lines = rows.map((row) =>
    columns.map(([key], index) => String(row[key] ?? "").padEnd(widths[index])).join(" | ")
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
