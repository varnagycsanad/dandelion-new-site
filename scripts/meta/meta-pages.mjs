import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

const DEFAULT_VERSION = "v25.0";
const GRAPH_HOST = "https://graph.facebook.com";
const DEFAULT_META_CHANGE_LOG_PATH = ".secrets/meta-change-log.jsonl";

await loadEnv();

const args = parseArgs(process.argv.slice(2));

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "check-auth") {
    await checkAuth();
  } else if (args.command === "permissions") {
    await listPermissions(args);
  } else if (args.command === "pages") {
    await listPages(args);
  } else if (args.command === "create-post") {
    await createPagePost(args);
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Meta Pages helper for Dandelion

Usage:
  node scripts/meta/meta-pages.mjs check-auth
  node scripts/meta/meta-pages.mjs permissions [--format md|json|csv]
  node scripts/meta/meta-pages.mjs pages [--format md|json|csv]
  node scripts/meta/meta-pages.mjs create-post --message "Post text" [--page-id 123] [--photo "C:\\path\\to\\image.jpg"] [--photo "..."] [--published false] [--execute] [--format md|json|csv]

Required env:
  META_ACCESS_TOKEN

Optional env:
  META_GRAPH_VERSION=v25.0
  META_PAGE_ID=1234567890

Notes:
  create-post is a dry run unless --execute is present.
  Multi-photo posts are created by first uploading unpublished page photos, then attaching them to a feed post.
  The token needs page-level posting rights, typically pages_manage_posts.
`);
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

function parseArgs(argv) {
  const parsed = {
    command: argv[0],
    format: "md",
    execute: false,
    published: true,
    photos: []
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
    } else if (arg === "--page-id") {
      parsed.pageId = next;
      index += 1;
    } else if (arg === "--message") {
      parsed.message = next;
      index += 1;
    } else if (arg === "--photo") {
      parsed.photos.push(next);
      index += 1;
    } else if (arg === "--published") {
      parsed.published = parseBooleanFlag(next, "--published");
      index += 1;
    } else if (arg === "--execute") {
      parsed.execute = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

function parseBooleanFlag(value, label) {
  const normalized = String(value || "").trim().toLowerCase();
  if (["true", "1", "yes"].includes(normalized)) {
    return true;
  }
  if (["false", "0", "no"].includes(normalized)) {
    return false;
  }
  throw new Error(`${label} must be true or false.`);
}

function getVersion() {
  return process.env.META_GRAPH_VERSION || DEFAULT_VERSION;
}

function getUserAccessToken() {
  const token = process.env.META_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Set META_ACCESS_TOKEN in .env.");
  }
  return token;
}

function getConfiguredPageId(args) {
  const raw = args.pageId || process.env.META_PAGE_ID;
  if (!raw) {
    return "";
  }
  return normalizeDigits(raw, "page ID");
}

function appendMetaChangeLog(entry) {
  const resolvedPath = resolve(process.env.META_CHANGE_LOG_PATH || DEFAULT_META_CHANGE_LOG_PATH);
  mkdirSync(dirname(resolvedPath), { recursive: true });
  appendFileSync(resolvedPath, `${JSON.stringify({ logged_at: new Date().toISOString(), ...entry })}\n`, "utf8");
}

async function graphRequest(pathname, { method = "GET", query = {}, body = undefined, accessToken } = {}) {
  const url = new URL(`${GRAPH_HOST}/${getVersion()}/${pathname.replace(/^\/+/, "")}`);
  const token = accessToken || getUserAccessToken();

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

async function graphUpload(pathname, { fields = {}, filePath, accessToken } = {}) {
  const url = new URL(`${GRAPH_HOST}/${getVersion()}/${pathname.replace(/^\/+/, "")}`);
  const token = accessToken || getUserAccessToken();
  const form = new FormData();
  form.set("access_token", token);

  for (const [key, value] of Object.entries(fields || {})) {
    if (value !== undefined && value !== null) {
      form.set(key, typeof value === "string" ? value : JSON.stringify(value));
    }
  }

  if (filePath) {
    const resolvedPath = resolve(filePath);
    if (!existsSync(resolvedPath)) {
      throw new Error(`Photo file not found: ${resolvedPath}`);
    }
    form.set("source", new Blob([readFileSync(resolvedPath)]), basename(resolvedPath));
  }

  const response = await fetch(url, {
    method: "POST",
    body: form
  });

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

  console.log("Meta access token works for Pages API.");
  console.log(`User: ${profile.name || "(no name)"} (${profile.id})`);

  const pages = await fetchAvailablePages();
  console.log(`Visible pages: ${pages.length}`);
  for (const page of pages) {
    console.log(`- ${page.name || "(no name)"}: ${page.id}`);
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

async function listPages(args) {
  const pages = await fetchAvailablePages();
  const configuredPageId = getConfiguredPageId(args);

  const rows = pages.map((page) => ({
    id: page.id,
    name: page.name,
    category: page.category || "",
    tasks: Array.isArray(page.tasks) ? page.tasks.join(", ") : "",
    has_page_token: page.access_token ? "true" : "false",
    selected: configuredPageId && page.id === configuredPageId ? "true" : "false"
  }));

  printRows(rows, args.format, [
    ["id", "Page ID"],
    ["name", "Name"],
    ["category", "Category"],
    ["tasks", "Tasks"],
    ["has_page_token", "Has page token"],
    ["selected", "Selected"]
  ]);
}

async function fetchAvailablePages() {
  const result = await graphRequest("/me/accounts", {
    query: {
      fields: "id,name,category,tasks,access_token",
      limit: 200
    }
  });

  return result.data || [];
}

async function resolvePageContext(args) {
  const configuredPageId = getConfiguredPageId(args);
  const pages = await fetchAvailablePages();

  if (!pages.length) {
    throw new Error("No visible Facebook Pages were returned by /me/accounts.");
  }

  let page = null;
  if (configuredPageId) {
    page = pages.find((item) => item.id === configuredPageId) || null;
    if (!page) {
      throw new Error(`Configured page ID ${configuredPageId} is not visible for the current token.`);
    }
  } else if (pages.length === 1) {
    page = pages[0];
  } else {
    throw new Error("Multiple pages are visible. Set META_PAGE_ID in .env or pass --page-id.");
  }

  if (!page.access_token) {
    throw new Error(`No page access token was returned for page ${page.name || page.id}.`);
  }

  return {
    pageId: page.id,
    pageName: page.name || page.id,
    pageToken: page.access_token,
    pageTasks: Array.isArray(page.tasks) ? page.tasks : []
  };
}

async function createPagePost(args) {
  if (!args.message) {
    throw new Error("Missing --message.");
  }

  const context = await resolvePageContext(args);
  const normalizedPhotos = normalizePhotoPaths(args.photos || []);

  if (!args.execute) {
    printRows(
      [
        {
          page_id: context.pageId,
          page_name: context.pageName,
          published: args.published ? "true" : "false",
          photo_count: String(normalizedPhotos.length),
          tasks: context.pageTasks.join(", "),
          message_preview: truncateText(args.message, 100)
        }
      ],
      args.format,
      [
        ["page_id", "Page ID"],
        ["page_name", "Page"],
        ["published", "Published"],
        ["photo_count", "Photo count"],
        ["tasks", "Tasks"],
        ["message_preview", "Message preview"]
      ]
    );
    return;
  }

  const mediaIds = [];
  for (const photoPath of normalizedPhotos) {
    const upload = await graphUpload(`/${context.pageId}/photos`, {
      accessToken: context.pageToken,
      filePath: photoPath,
      fields: {
        published: false
      }
    });

    if (!upload.id) {
      throw new Error(`Meta did not return a photo ID for ${photoPath}.`);
    }
    mediaIds.push(upload.id);
  }

  let result;
  if (!mediaIds.length) {
    result = await graphRequest(`/${context.pageId}/feed`, {
      method: "POST",
      accessToken: context.pageToken,
      body: {
        message: args.message,
        published: args.published
      }
    });
  } else if (mediaIds.length === 1) {
    result = await graphUpload(`/${context.pageId}/photos`, {
      accessToken: context.pageToken,
      filePath: normalizedPhotos[0],
      fields: {
        message: args.message,
        published: args.published
      }
    });
  } else {
    result = await graphRequest(`/${context.pageId}/feed`, {
      method: "POST",
      accessToken: context.pageToken,
      body: {
        message: args.message,
        published: args.published,
        attached_media: mediaIds.map((mediaId) => ({ media_fbid: mediaId }))
      }
    });
  }

  const rows = [
    {
      page_id: context.pageId,
      page_name: context.pageName,
      post_id: result.post_id || result.id || "",
      photo_count: String(normalizedPhotos.length),
      published: args.published ? "true" : "false"
    }
  ];

  appendMetaChangeLog({
    operation: "create_page_post",
    entity_type: "page_post",
    entity_id: result.post_id || result.id || "",
    entity_name: context.pageName,
    request: {
      page_id: context.pageId,
      published: args.published,
      photo_count: normalizedPhotos.length,
      message_preview: truncateText(args.message, 140)
    },
    response: result
  });

  printRows(rows, args.format, [
    ["page_id", "Page ID"],
    ["page_name", "Page"],
    ["post_id", "Post ID"],
    ["photo_count", "Photo count"],
    ["published", "Published"]
  ]);
}

function normalizePhotoPaths(paths) {
  const normalized = [];
  for (const photoPath of paths) {
    const resolvedPath = resolve(photoPath);
    if (!existsSync(resolvedPath)) {
      throw new Error(`Photo file not found: ${resolvedPath}`);
    }
    normalized.push(resolvedPath);
  }
  return normalized;
}

function normalizeDigits(value, label) {
  const normalized = String(value || "").trim();
  if (!/^\d+$/.test(normalized)) {
    throw new Error(`${label} must be numeric.`);
  }
  return normalized;
}

function truncateText(value, maxLength) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, Math.max(0, maxLength - 1))}…`;
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

  if (format === "csv") {
    console.log(columns.map(([key]) => escapeCell(key)).join(","));
    for (const row of rows) {
      console.log(columns.map(([key]) => escapeCell(row[key] ?? "")).join(","));
    }
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
