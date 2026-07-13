import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();

loadDotEnv();

const args = parseArgs(process.argv);

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "weekly-report") {
    const payload = buildWeeklyPayload();
    printPayload(payload, args.format, renderWeeklyMarkdown(payload));
  } else if (args.command === "snapshot") {
    const payload = buildSnapshotPayload();
    const outputDir = path.resolve(args.outputDir || "tmp/google-stack-snapshots");
    mkdirSync(outputDir, { recursive: true });
    for (const [fileName, value] of Object.entries(payload.files)) {
      writeFileSync(path.join(outputDir, fileName), `${JSON.stringify(value, null, 2)}\n`);
    }
    const summary = {
      generated_at: payload.generated_at,
      output_dir: outputDir,
      files: Object.keys(payload.files)
    };
    printPayload(summary, args.format, renderSnapshotMarkdown(summary));
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Google stack operations helper

Usage:
  node scripts/google-stack-ops-report.mjs weekly-report [--format md|json]
  node scripts/google-stack-ops-report.mjs snapshot [--output-dir tmp/google-stack-snapshots] [--format md|json]

What it does:
  - weekly-report: compact Ads + GTM + GA4 operations summary
  - snapshot: writes standard JSON snapshots for critical Google stack surfaces
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
    format: "md"
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
    } else if (arg === "--output-dir") {
      parsed.outputDir = next;
      index += 1;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
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

function printPayload(payload, format, markdown) {
  if (format === "json") {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(markdown);
}

function renderWeeklyMarkdown(payload) {
  const lines = [];
  lines.push("# Google Stack Weekly Operations Report");
  lines.push("");
  lines.push(`Generated: ${payload.generated_at}`);
  lines.push(`Booking chain: ${payload.booking_chain_status}`);
  lines.push(`Enabled campaigns: ${payload.enabled_campaigns.length}`);
  lines.push("");
  lines.push("## Top campaigns by cost (last 30 days)");
  for (const row of payload.top_campaigns) {
    lines.push(`- ${row.campaign_name}: cost ${row.cost}, clicks ${row.clicks}, conversions ${row.conversions}`);
  }
  lines.push("");
  lines.push("## Conversions");
  lines.push(`- Enabled conversions: ${payload.conversions.enabled.join(", ") || "-"}`);
  lines.push(`- GA4 imports: ${payload.conversions.ga4_imports.map((row) => row.name).join(", ") || "-"}`);
  lines.push("");
  lines.push("## GTM");
  lines.push(`- Container: ${payload.gtm.container_public_id || "-"}`);
  lines.push(`- Workspace: ${payload.gtm.workspace || "-"}`);
  lines.push(`- Latest version: ${payload.gtm.latest_version || "-"}`);
  return lines.join("\n");
}

function renderSnapshotMarkdown(summary) {
  const lines = [];
  lines.push("# Google Stack Snapshot");
  lines.push("");
  lines.push(`Generated: ${summary.generated_at}`);
  lines.push(`Output dir: ${summary.output_dir}`);
  lines.push("");
  for (const fileName of summary.files) {
    lines.push(`- ${fileName}`);
  }
  return lines.join("\n");
}
