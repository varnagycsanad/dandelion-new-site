import { createSign } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const BIGQUERY_API_BASE = "https://bigquery.googleapis.com/bigquery/v2";
const BIGQUERY_SCOPE = "https://www.googleapis.com/auth/bigquery";
const DEFAULT_DATASET_LOCATION = "EU";
const DEFAULT_DATASET_ID = "dandelion_google_stack";
const DEFAULT_TABLE_PREFIX = "google_stack";

loadDotEnv();

const args = parseArgs(process.argv);

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "setup") {
    const accessToken = await getAccessToken(loadServiceAccount());
    const summary = await ensureInfrastructure({ accessToken, args });
    printPayload(summary, args.format, renderSetupMarkdown(summary));
  } else if (args.command === "export") {
    const accessToken = await getAccessToken(loadServiceAccount());
    const summary = await exportGoogleStack({ accessToken, args });
    printPayload(summary, args.format, renderExportMarkdown(summary));
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Google Stack BigQuery helper

Usage:
  node scripts/google-stack-bigquery.mjs setup [--format md|json]
  node scripts/google-stack-bigquery.mjs export [--format md|json] [--skip-weekly-report] [--skip-snapshots]

What it does:
  - setup: creates the dataset and required BigQuery tables if they do not exist
  - export: builds the existing weekly report and snapshot payloads, then uploads them to BigQuery

Required env:
  GOOGLE_APPLICATION_CREDENTIALS or BIGQUERY_SERVICE_ACCOUNT_JSON
  BIGQUERY_PROJECT_ID or GOOGLE_CLOUD_PROJECT

Optional env:
  BIGQUERY_DATASET_ID=${DEFAULT_DATASET_ID}
  BIGQUERY_DATASET_LOCATION=${DEFAULT_DATASET_LOCATION}
  BIGQUERY_TABLE_PREFIX=${DEFAULT_TABLE_PREFIX}
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
  const command = argv[2];
  const firstOption = argv[3];
  if (command === "--help" || command === "-h" || !command || firstOption === "--help" || firstOption === "-h") {
    return {
      command: undefined,
      help: true,
      format: "md"
    };
  }

  const parsed = {
    command,
    format: "md",
    projectId: process.env.BIGQUERY_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT,
    datasetId: process.env.BIGQUERY_DATASET_ID || DEFAULT_DATASET_ID,
    datasetLocation: process.env.BIGQUERY_DATASET_LOCATION || DEFAULT_DATASET_LOCATION,
    tablePrefix: process.env.BIGQUERY_TABLE_PREFIX || DEFAULT_TABLE_PREFIX,
    includeWeeklyReport: true,
    includeSnapshots: true
  };

  for (let index = 3; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--format") {
      parsed.format = next;
      index += 1;
    } else if (arg === "--project") {
      parsed.projectId = next;
      index += 1;
    } else if (arg === "--dataset") {
      parsed.datasetId = next;
      index += 1;
    } else if (arg === "--location") {
      parsed.datasetLocation = next;
      index += 1;
    } else if (arg === "--table-prefix") {
      parsed.tablePrefix = next;
      index += 1;
    } else if (arg === "--skip-weekly-report") {
      parsed.includeWeeklyReport = false;
    } else if (arg === "--skip-snapshots") {
      parsed.includeSnapshots = false;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  if (!parsed.projectId) {
    throw new Error("Missing BigQuery project ID. Set BIGQUERY_PROJECT_ID or GOOGLE_CLOUD_PROJECT.");
  }

  if (!parsed.datasetId) {
    throw new Error("Missing BigQuery dataset ID.");
  }

  if (!parsed.tablePrefix) {
    throw new Error("Missing BigQuery table prefix.");
  }

  return parsed;
}

function loadServiceAccount() {
  const credentialPath = process.env.BIGQUERY_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialPath) {
    throw new Error("Set BIGQUERY_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS to a service account JSON file.");
  }

  const resolvedPath = path.resolve(credentialPath);
  const credentials = JSON.parse(readFileSync(resolvedPath, "utf8"));

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error("Service account JSON must include client_email and private_key.");
  }

  return credentials;
}

function base64Url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: credentials.client_email,
      scope: BIGQUERY_SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now
    })
  );
  const unsignedJwt = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedJwt);
  signer.end();
  const signature = signer.sign(credentials.private_key, "base64url");
  const jwt = `${unsignedJwt}.${signature}`;

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`OAuth token request failed: ${JSON.stringify(payload)}`);
  }

  return payload.access_token;
}

function getTableSpecs(args) {
  return [
    {
      tableId: `${args.tablePrefix}_export_runs`,
      schema: [
        { name: "run_id", type: "STRING", mode: "REQUIRED" },
        { name: "exported_at", type: "TIMESTAMP", mode: "REQUIRED" },
        { name: "dataset_id", type: "STRING" },
        { name: "table_prefix", type: "STRING" },
        { name: "weekly_report_exported", type: "BOOL" },
        { name: "snapshot_exported", type: "BOOL" },
        { name: "snapshot_item_count", type: "INT64" },
        { name: "status", type: "STRING" }
      ]
    },
    {
      tableId: `${args.tablePrefix}_weekly_reports`,
      schema: [
        { name: "run_id", type: "STRING", mode: "REQUIRED" },
        { name: "generated_at", type: "TIMESTAMP", mode: "REQUIRED" },
        { name: "booking_chain_status", type: "STRING" },
        { name: "enabled_campaign_count", type: "INT64" },
        { name: "top_campaign_count", type: "INT64" },
        { name: "enabled_campaigns_json", type: "STRING" },
        { name: "top_campaigns_json", type: "STRING" },
        { name: "conversions_json", type: "STRING" },
        { name: "gtm_json", type: "STRING" },
        { name: "payload_json", type: "STRING" }
      ]
    },
    {
      tableId: `${args.tablePrefix}_snapshot_items`,
      schema: [
        { name: "run_id", type: "STRING", mode: "REQUIRED" },
        { name: "generated_at", type: "TIMESTAMP", mode: "REQUIRED" },
        { name: "snapshot_name", type: "STRING", mode: "REQUIRED" },
        { name: "record_count", type: "INT64" },
        { name: "payload_json", type: "STRING", mode: "REQUIRED" }
      ]
    }
  ];
}

async function ensureInfrastructure({ accessToken, args }) {
  await ensureDataset({ accessToken, args });
  const ensuredTables = [];
  for (const spec of getTableSpecs(args)) {
    await ensureTable({ accessToken, args, spec });
    ensuredTables.push(spec.tableId);
  }

  return {
    ok: true,
    project_id: args.projectId,
    dataset_id: args.datasetId,
    location: args.datasetLocation,
    tables: ensuredTables
  };
}

async function ensureDataset({ accessToken, args }) {
  const existing = await bigQueryRequest({
    accessToken,
    args,
    method: "GET",
    path: `/projects/${encodeURIComponent(args.projectId)}/datasets/${encodeURIComponent(args.datasetId)}`,
    allowNotFound: true
  });

  if (existing.status === 404) {
    await bigQueryRequest({
      accessToken,
      args,
      method: "POST",
      path: `/projects/${encodeURIComponent(args.projectId)}/datasets`,
      body: {
        datasetReference: {
          projectId: args.projectId,
          datasetId: args.datasetId
        },
        location: args.datasetLocation
      }
    });
  }
}

async function ensureTable({ accessToken, args, spec }) {
  const existing = await bigQueryRequest({
    accessToken,
    args,
    method: "GET",
    path: `/projects/${encodeURIComponent(args.projectId)}/datasets/${encodeURIComponent(args.datasetId)}/tables/${encodeURIComponent(spec.tableId)}`,
    allowNotFound: true
  });

  if (existing.status === 404) {
    await bigQueryRequest({
      accessToken,
      args,
      method: "POST",
      path: `/projects/${encodeURIComponent(args.projectId)}/datasets/${encodeURIComponent(args.datasetId)}/tables`,
      body: {
        tableReference: {
          projectId: args.projectId,
          datasetId: args.datasetId,
          tableId: spec.tableId
        },
        schema: {
          fields: spec.schema
        }
      }
    });
  }
}

async function exportGoogleStack({ accessToken, args }) {
  await ensureInfrastructure({ accessToken, args });

  const runId = `google-stack-${Date.now()}`;
  const exportedAt = new Date().toISOString();
  const tables = {
    exportRuns: `${args.tablePrefix}_export_runs`,
    weeklyReports: `${args.tablePrefix}_weekly_reports`,
    snapshotItems: `${args.tablePrefix}_snapshot_items`
  };

  let weeklyPayload = null;
  let snapshotPayload = null;
  const snapshotRows = [];

  if (args.includeWeeklyReport) {
    weeklyPayload = buildWeeklyPayload();
    await insertRows({
      accessToken,
      args,
      tableId: tables.weeklyReports,
      rows: [
        {
          insertId: `${runId}-weekly-report`,
          json: {
            run_id: runId,
            generated_at: weeklyPayload.generated_at,
            booking_chain_status: weeklyPayload.booking_chain_status || "",
            enabled_campaign_count: toBigQueryInt(weeklyPayload.enabled_campaigns?.length || 0),
            top_campaign_count: toBigQueryInt(weeklyPayload.top_campaigns?.length || 0),
            enabled_campaigns_json: JSON.stringify(weeklyPayload.enabled_campaigns || []),
            top_campaigns_json: JSON.stringify(weeklyPayload.top_campaigns || []),
            conversions_json: JSON.stringify(weeklyPayload.conversions || {}),
            gtm_json: JSON.stringify(weeklyPayload.gtm || {}),
            payload_json: JSON.stringify(weeklyPayload)
          }
        }
      ]
    });
  }

  if (args.includeSnapshots) {
    snapshotPayload = buildSnapshotPayload();
    for (const [snapshotName, payload] of Object.entries(snapshotPayload.files)) {
      snapshotRows.push({
        insertId: `${runId}-${snapshotName}`,
        json: {
          run_id: runId,
          generated_at: snapshotPayload.generated_at,
          snapshot_name: snapshotName,
          record_count: toBigQueryInt(inferRecordCount(payload)),
          payload_json: JSON.stringify(payload)
        }
      });
    }

    if (snapshotRows.length > 0) {
      await insertRows({
        accessToken,
        args,
        tableId: tables.snapshotItems,
        rows: snapshotRows
      });
    }
  }

  await insertRows({
    accessToken,
    args,
    tableId: tables.exportRuns,
    rows: [
      {
        insertId: `${runId}-export-run`,
        json: {
          run_id: runId,
          exported_at: exportedAt,
          dataset_id: args.datasetId,
          table_prefix: args.tablePrefix,
          weekly_report_exported: Boolean(weeklyPayload),
          snapshot_exported: Boolean(snapshotPayload),
          snapshot_item_count: toBigQueryInt(snapshotRows.length),
          status: "ok"
        }
      }
    ]
  });

  return {
    ok: true,
    run_id: runId,
    exported_at: exportedAt,
    project_id: args.projectId,
    dataset_id: args.datasetId,
    location: args.datasetLocation,
    tables,
    exported: {
      weekly_report: Boolean(weeklyPayload),
      snapshot_items: snapshotRows.length
    }
  };
}

function buildWeeklyPayload() {
  const healthcheck = runNodeJson("scripts/google-stack-healthcheck.mjs", ["run", "--format", "json"]);
  const campaigns = runNodeJson("scripts/google-ads-report.mjs", ["campaigns", "--format", "json"]);
  const performance = runNodeJson("scripts/google-ads-report.mjs", ["performance", "--days", "30", "--format", "json"]);
  const conversions = runNodeJson("scripts/google-ads-report.mjs", ["conversions", "--format", "json"]);

  if (!healthcheck.ok) {
    throw new Error(`Healthcheck failed: ${healthcheck.error}`);
  }
  if (!campaigns.ok) {
    throw new Error(`Campaign read failed: ${campaigns.error}`);
  }
  if (!performance.ok) {
    throw new Error(`Performance read failed: ${performance.error}`);
  }
  if (!conversions.ok) {
    throw new Error(`Conversion read failed: ${conversions.error}`);
  }

  const performanceRows = performance.data || [];
  const aggregatedByCampaign = new Map();
  for (const row of performanceRows) {
    const key = String(row.id || row.name || "");
    const current = aggregatedByCampaign.get(key) || {
      campaign_id: row.id,
      campaign_name: row.name,
      cost: 0,
      clicks: 0,
      conversions: 0
    };
    current.cost += Number(row.cost || 0);
    current.clicks += Number(row.clicks || 0);
    current.conversions += Number(row.conversions || 0);
    aggregatedByCampaign.set(key, current);
  }

  const topCampaigns = [...aggregatedByCampaign.values()]
    .sort((left, right) => right.cost - left.cost)
    .slice(0, 5)
    .map((row) => ({
      ...row,
      cost: row.cost.toFixed(2)
    }));

  return {
    generated_at: new Date().toISOString(),
    booking_chain_status: healthcheck.data.booking_chain.overall_status,
    enabled_campaigns: (campaigns.data || []).filter((row) => row.status === "ENABLED").map((row) => row.name),
    top_campaigns: topCampaigns,
    conversions: {
      enabled: (conversions.data || []).filter((row) => row.status === "ENABLED").map((row) => row.name),
      ga4_imports: (conversions.data || []).filter((row) => String(row.type || "").startsWith("GOOGLE_ANALYTICS_4"))
    },
    gtm: {
      container_public_id: healthcheck.data.gtm.containers.public_ids?.[0] || "",
      workspace: healthcheck.data.gtm.workspaces.names?.[0] || "",
      latest_version: healthcheck.data.gtm.latest_version.names?.[0] || ""
    }
  };
}

function buildSnapshotPayload() {
  const healthcheck = runNodeJson("scripts/google-stack-healthcheck.mjs", ["run", "--format", "json"]);
  const bookingChain = runNodeJson("scripts/google-stack-healthcheck.mjs", ["booking-chain", "--format", "json"]);
  const campaigns = runNodeJson("scripts/google-ads-report.mjs", ["campaigns", "--format", "json"]);
  const performance = runNodeJson("scripts/google-ads-report.mjs", ["performance", "--days", "30", "--format", "json"]);
  const conversions = runNodeJson("scripts/google-ads-report.mjs", ["conversions", "--format", "json"]);

  const results = { healthcheck, bookingChain, campaigns, performance, conversions };
  for (const [name, result] of Object.entries(results)) {
    if (!result.ok) {
      throw new Error(`${name} snapshot failed: ${result.error}`);
    }
  }

  return {
    generated_at: new Date().toISOString(),
    files: {
      "healthcheck.json": healthcheck.data,
      "booking-chain.json": bookingChain.data,
      "ads-campaigns.json": campaigns.data,
      "ads-performance-30d.json": performance.data,
      "ads-conversions.json": conversions.data
    }
  };
}

function inferRecordCount(payload) {
  if (Array.isArray(payload)) {
    return payload.length;
  }

  if (payload && typeof payload === "object") {
    if (Array.isArray(payload.rows)) {
      return payload.rows.length;
    }

    return Object.keys(payload).length;
  }

  return 0;
}

function runNodeJson(scriptPath, scriptArgs) {
  const result = spawnSync(process.execPath, [path.resolve(ROOT, scriptPath), ...scriptArgs], {
    cwd: ROOT,
    env: process.env,
    encoding: "utf8"
  });

  const stdout = (result.stdout || "").trim();
  const stderr = (result.stderr || "").trim();

  if (result.error) {
    return { ok: false, error: result.error.message };
  }

  if (result.status !== 0) {
    return { ok: false, error: stderr || stdout || `Command exited with status ${result.status}.` };
  }

  try {
    return {
      ok: true,
      data: stdout ? JSON.parse(stdout) : []
    };
  } catch (error) {
    return { ok: false, error: `JSON parse failed for ${scriptPath}: ${error.message}` };
  }
}

async function insertRows({ accessToken, args, tableId, rows }) {
  const payload = await bigQueryRequest({
    accessToken,
    args,
    method: "POST",
    path: `/projects/${encodeURIComponent(args.projectId)}/datasets/${encodeURIComponent(args.datasetId)}/tables/${encodeURIComponent(tableId)}/insertAll`,
    body: {
      rows,
      skipInvalidRows: false,
      ignoreUnknownValues: false
    }
  });

  if (payload.insertErrors?.length) {
    throw new Error(`BigQuery insert failed for ${tableId}: ${JSON.stringify(payload.insertErrors)}`);
  }
}

async function bigQueryRequest({ accessToken, method, path: requestPath, body, allowNotFound = false }) {
  const response = await fetch(`${BIGQUERY_API_BASE}${requestPath}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (allowNotFound && response.status === 404) {
    return { status: 404 };
  }

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`BigQuery API request failed (${response.status}): ${JSON.stringify(payload)}`);
  }

  return payload;
}

function toBigQueryInt(value) {
  return String(Number.isFinite(Number(value)) ? Math.trunc(Number(value)) : 0);
}

function printPayload(payload, format, markdown) {
  if (format === "json") {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(markdown);
}

function renderSetupMarkdown(summary) {
  const lines = [];
  lines.push("# Google Stack BigQuery Setup");
  lines.push("");
  lines.push(`Project: ${summary.project_id}`);
  lines.push(`Dataset: ${summary.dataset_id}`);
  lines.push(`Location: ${summary.location}`);
  lines.push("");
  lines.push("Tables:");
  for (const table of summary.tables) {
    lines.push(`- ${table}`);
  }
  return lines.join("\n");
}

function renderExportMarkdown(summary) {
  const lines = [];
  lines.push("# Google Stack BigQuery Export");
  lines.push("");
  lines.push(`Run ID: ${summary.run_id}`);
  lines.push(`Exported at: ${summary.exported_at}`);
  lines.push(`Project: ${summary.project_id}`);
  lines.push(`Dataset: ${summary.dataset_id}`);
  lines.push("");
  lines.push(`Weekly report exported: ${summary.exported.weekly_report ? "yes" : "no"}`);
  lines.push(`Snapshot items exported: ${summary.exported.snapshot_items}`);
  lines.push("");
  lines.push("Tables:");
  lines.push(`- export runs: ${summary.tables.exportRuns}`);
  lines.push(`- weekly reports: ${summary.tables.weeklyReports}`);
  lines.push(`- snapshot items: ${summary.tables.snapshotItems}`);
  return lines.join("\n");
}
