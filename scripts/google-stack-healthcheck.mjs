import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const DEFAULT_FRONTEND_EVENT_FILE = "public/scripts/dnd-ads-events.js";

loadDotEnv();

const args = parseArgs(process.argv);

try {
  if (args.help || !args.command) {
    printHelp();
  } else if (args.command === "run") {
    const report = await buildHealthcheckReport(args);
    printOutput(report, args.format, renderHealthcheckMarkdown(report));
  } else if (args.command === "booking-chain") {
    const report = await buildHealthcheckReport(args);
    const payload = report.booking_chain;
    printOutput(payload, args.format, renderBookingChainMarkdown(payload));
  } else {
    throw new Error(`Unknown command: ${args.command}`);
  }
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}

function printHelp() {
  console.log(`Google stack healthcheck for Dandelion

Usage:
  node scripts/google-stack-healthcheck.mjs run [--format md|json]
  node scripts/google-stack-healthcheck.mjs booking-chain [--format md|json]

What it checks:
  - local Google Ads env + API read access
  - GA4 Admin Google Ads links + key events
  - GTM account/container/workspace/tags/triggers visibility
  - booking measurement chain signals across frontend, GTM, GA4 and Ads
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
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return parsed;
}

async function buildHealthcheckReport(args) {
  const environment = inspectEnvironment();

  const adsCustomersResult = runNodeJson("scripts/google-ads-report.mjs", ["customers", "--format", "json"]);
  const adsCampaignsResult = runNodeJson("scripts/google-ads-report.mjs", ["campaigns", "--format", "json"]);
  const adsConversionsResult = runNodeJson("scripts/google-ads-report.mjs", ["conversions", "--format", "json"]);

  const ads = {
    customers: buildResultSummary(adsCustomersResult, (rows) => ({
      count: rows.length,
      names: rows.map((row) => row.name).filter(Boolean)
    })),
    campaigns: buildResultSummary(adsCampaignsResult, (rows) => ({
      count: rows.length,
      enabled_count: rows.filter((row) => row.status === "ENABLED").length,
      enabled_names: rows.filter((row) => row.status === "ENABLED").map((row) => row.name)
    })),
    conversions: buildResultSummary(adsConversionsResult, (rows) => ({
      count: rows.length,
      enabled_names: rows.filter((row) => row.status === "ENABLED").map((row) => row.name),
      ga4_conversion_names: rows
        .filter((row) => String(row.type || "").startsWith("GOOGLE_ANALYTICS_4"))
        .map((row) => row.name)
    }))
  };

  const ga4AdsLinksResult = runNodeJson("scripts/google-analytics-admin.mjs", ["google-ads-links", "--format", "json"]);
  const ga4KeyEventsResult = runNodeJson("scripts/google-analytics-admin.mjs", ["key-events", "--format", "json"]);

  const ga4_admin = {
    ads_links: buildResultSummary(ga4AdsLinksResult, (rows) => ({
      count: rows.length,
      customer_ids: rows.map((row) => row.customerId).filter(Boolean)
    })),
    key_events: buildResultSummary(ga4KeyEventsResult, (rows) => ({
      count: rows.length,
      event_names: rows.map((row) => row.eventName).filter(Boolean)
    }))
  };

  const gtmBase = resolveGtmBase();
  const gtm = await buildGtmSummary(gtmBase);
  const booking_chain = buildBookingChainSummary({
    frontendFilePath: path.resolve(ROOT, DEFAULT_FRONTEND_EVENT_FILE),
    adsConversions: adsConversionsResult.data || [],
    ga4AdsLinks: ga4AdsLinksResult.data || [],
    ga4KeyEvents: ga4KeyEventsResult.data || [],
    gtm
  });

  return {
    generated_at: new Date().toISOString(),
    environment,
    ads,
    ga4_admin,
    gtm,
    booking_chain
  };
}

function inspectEnvironment() {
  return {
    ads: inspectEnvBlock([
      "GOOGLE_ADS_DEVELOPER_TOKEN",
      "GOOGLE_ADS_CUSTOMER_ID",
      "GOOGLE_ADS_LOGIN_CUSTOMER_ID",
      "GOOGLE_ADS_OAUTH_CLIENT_JSON",
      "GOOGLE_ADS_OAUTH_TOKEN_JSON"
    ]),
    ga4_admin: inspectEnvBlock([
      "GA4_PROPERTY_ID",
      "GA_PROPERTY_ID",
      "GA_ADMIN_OAUTH_TOKEN_JSON",
      "GA_OAUTH_CLIENT_JSON"
    ]),
    gtm: inspectEnvBlock([
      "GTM_OAUTH_CLIENT_JSON",
      "GTM_OAUTH_TOKEN_JSON",
      "GTM_ACCOUNT_ID",
      "GTM_CONTAINER_ID",
      "GTM_WORKSPACE_ID"
    ])
  };
}

function inspectEnvBlock(keys) {
  return Object.fromEntries(
    keys.map((key) => {
      const value = process.env[key];
      const looksLikePath =
        typeof value === "string" &&
        (value.includes("/") || value.includes("\\") || value.endsWith(".json"));

      return [
        key,
        {
          present: Boolean(value),
          file_exists: looksLikePath ? existsSync(path.resolve(ROOT, value)) : undefined
        }
      ];
    })
  );
}

function resolveGtmBase() {
  let accountId = process.env.GTM_ACCOUNT_ID;
  let containerId = process.env.GTM_CONTAINER_ID;
  let workspaceId = process.env.GTM_WORKSPACE_ID;

  const accountsResult = runNodeJson("scripts/google-tag-manager.mjs", ["accounts", "--format", "json"]);
  const accounts = accountsResult.data || [];

  if (!accountId && accounts.length === 1) {
    accountId = accounts[0].accountId;
  }

  let containersResult = { ok: false, data: [], error: "Skipped because GTM account could not be resolved." };
  let containers = [];
  if (accountId) {
    containersResult = runNodeJson("scripts/google-tag-manager.mjs", ["containers", "--account", accountId, "--format", "json"]);
    containers = containersResult.data || [];
    if (!containerId && containers.length === 1) {
      containerId = containers[0].containerId;
    }
  }

  let workspacesResult = { ok: false, data: [], error: "Skipped because GTM container could not be resolved." };
  let workspaces = [];
  if (accountId && containerId) {
    workspacesResult = runNodeJson("scripts/google-tag-manager.mjs", [
      "workspaces",
      "--account",
      accountId,
      "--container",
      containerId,
      "--format",
      "json"
    ]);
    workspaces = workspacesResult.data || [];
    if (!workspaceId && workspaces.length === 1) {
      workspaceId = workspaces[0].workspaceId;
    }
  }

  return {
    accountId,
    containerId,
    workspaceId,
    accountsResult,
    containersResult,
    workspacesResult
  };
}

async function buildGtmSummary(gtmBase) {
  const latestVersionResult =
    gtmBase.accountId && gtmBase.containerId
      ? runNodeJson("scripts/google-tag-manager.mjs", [
          "latest-version",
          "--account",
          gtmBase.accountId,
          "--container",
          gtmBase.containerId,
          "--format",
          "json"
        ])
      : { ok: false, data: [], error: "Skipped because GTM account/container could not be resolved." };

  const tagsResult =
    gtmBase.accountId && gtmBase.containerId && gtmBase.workspaceId
      ? runNodeJson("scripts/google-tag-manager.mjs", [
          "tags",
          "--account",
          gtmBase.accountId,
          "--container",
          gtmBase.containerId,
          "--workspace",
          gtmBase.workspaceId,
          "--format",
          "json"
        ])
      : { ok: false, data: [], error: "Skipped because GTM workspace could not be resolved." };

  const triggersResult =
    gtmBase.accountId && gtmBase.containerId && gtmBase.workspaceId
      ? runNodeJson("scripts/google-tag-manager.mjs", [
          "triggers",
          "--account",
          gtmBase.accountId,
          "--container",
          gtmBase.containerId,
          "--workspace",
          gtmBase.workspaceId,
          "--format",
          "json"
        ])
      : { ok: false, data: [], error: "Skipped because GTM workspace could not be resolved." };

  const tags = tagsResult.data || [];
  const triggers = triggersResult.data || [];

  const tagDetails =
    gtmBase.accountId && gtmBase.containerId && gtmBase.workspaceId
      ? tags.map((tag) =>
          runNodeJson("scripts/google-tag-manager.mjs", [
            "tag",
            "--account",
            gtmBase.accountId,
            "--container",
            gtmBase.containerId,
            "--workspace",
            gtmBase.workspaceId,
            "--tag",
            tag.tagId,
            "--format",
            "json"
          ])
        )
      : [];

  const triggerDetails =
    gtmBase.accountId && gtmBase.containerId && gtmBase.workspaceId
      ? triggers.map((trigger) =>
          runNodeJson("scripts/google-tag-manager.mjs", [
            "trigger",
            "--account",
            gtmBase.accountId,
            "--container",
            gtmBase.containerId,
            "--workspace",
            gtmBase.workspaceId,
            "--trigger",
            trigger.triggerId,
            "--format",
            "json"
          ])
        )
      : [];

  const normalizedTagDetails = tagDetails.flatMap((result) => (result.ok ? result.data : []));
  const normalizedTriggerDetails = triggerDetails.flatMap((result) => (result.ok ? result.data : []));

  return {
    resolved: {
      account_id: gtmBase.accountId || "",
      container_id: gtmBase.containerId || "",
      workspace_id: gtmBase.workspaceId || ""
    },
    accounts: buildResultSummary(gtmBase.accountsResult, (rows) => ({
      count: rows.length,
      names: rows.map((row) => row.name).filter(Boolean)
    })),
    containers: buildResultSummary(gtmBase.containersResult, (rows) => ({
      count: rows.length,
      names: rows.map((row) => row.name).filter(Boolean),
      public_ids: rows.map((row) => row.publicId).filter(Boolean)
    })),
    workspaces: buildResultSummary(gtmBase.workspacesResult, (rows) => ({
      count: rows.length,
      names: rows.map((row) => row.name).filter(Boolean)
    })),
    latest_version: buildResultSummary(latestVersionResult, (rows) => ({
      count: rows.length,
      names: rows.map((row) => row.name).filter(Boolean)
    })),
    tags: buildResultSummary(tagsResult, (rows) => ({
      count: rows.length,
      names: rows.map((row) => row.name).filter(Boolean),
      types: Array.from(new Set(rows.map((row) => row.type).filter(Boolean)))
    })),
    triggers: buildResultSummary(triggersResult, (rows) => ({
      count: rows.length,
      names: rows.map((row) => row.name).filter(Boolean),
      types: Array.from(new Set(rows.map((row) => row.type).filter(Boolean)))
    })),
    tag_details: {
      ok: normalizedTagDetails.length === tags.length && tags.length > 0,
      count: normalizedTagDetails.length,
      rows: normalizedTagDetails
    },
    tag_rows: tags,
    trigger_details: {
      ok: normalizedTriggerDetails.length === triggers.length && triggers.length > 0,
      count: normalizedTriggerDetails.length,
      rows: normalizedTriggerDetails
    },
    trigger_rows: triggers
  };
}

function buildBookingChainSummary({ frontendFilePath, adsConversions, ga4AdsLinks, ga4KeyEvents, gtm }) {
  const frontendContent = existsSync(frontendFilePath) ? readFileSync(frontendFilePath, "utf8") : "";
  const tagRows = gtm.tag_rows || [];
  const triggerRows = gtm.trigger_rows || [];
  const tagDetails = gtm.tag_details.rows || [];
  const hasDirectAdsTag = tagDetails.some(isDirectGoogleAdsTag);
  const hasImportedGa4AdsConversionPath = hasWorkingGa4ImportChain({
    adsConversions,
    ga4AdsLinks,
    ga4KeyEvents,
    tagRows
  });

  const checks = [
    {
      key: "frontend_booking_click_event",
      label: "Frontend dnd_booking_click event",
      ok: frontendContent.includes('pushEvent("dnd_booking_click"'),
      evidence: existsSync(frontendFilePath) ? DEFAULT_FRONTEND_EVENT_FILE : "Frontend event file missing."
    },
    {
      key: "gtm_booking_click_tag",
      label: "GTM booking click tag",
      ok: tagRows.some((row) => includesNormalized(row.name, "dnd_booking_click")),
      evidence: findFirstEvidence(tagRows, "dnd_booking_click")
    },
    {
      key: "gtm_confirmation_tag",
      label: "GTM booking confirmation tag",
      ok: tagRows.some((row) => includesNormalized(row.name, "dnd_booking_confirmation")),
      evidence: findFirstEvidence(tagRows, "dnd_booking_confirmation")
    },
    {
      key: "gtm_confirmation_trigger",
      label: "GTM confirmation trigger",
      ok:
        triggerRows.some((row) => includesNormalized(row.name, "confirmation")) ||
        triggerRows.some((row) => includesNormalized(row.name, "purchase")),
      evidence:
        findFirstEvidence(triggerRows, "confirmation") ||
        findFirstEvidence(triggerRows, "purchase")
    },
    {
      key: "ga4_key_event_booking_click",
      label: "GA4 key event for dnd_booking_click",
      ok: ga4KeyEvents.some((row) => row.eventName === "dnd_booking_click"),
      evidence: "dnd_booking_click"
    },
    {
      key: "ga4_key_event_booking_confirmation",
      label: "GA4 key event for dnd_booking_confirmation",
      ok: ga4KeyEvents.some((row) => row.eventName === "dnd_booking_confirmation"),
      evidence: "dnd_booking_confirmation"
    },
    {
      key: "ga4_ads_link_present",
      label: "GA4 Google Ads link present",
      ok: ga4AdsLinks.length > 0,
      evidence: ga4AdsLinks.map((row) => row.customerId).filter(Boolean).join(", ")
    },
    {
      key: "ads_conversion_booking_click",
      label: "Ads conversion for dnd_booking_click",
      ok: adsConversions.some((row) => includesNormalized(row.name, "dnd_booking_click")),
      evidence: findFirstEvidence(adsConversions, "dnd_booking_click")
    },
    {
      key: "ads_conversion_booking_confirmation",
      label: "Ads conversion for dnd_booking_confirmation",
      ok:
        adsConversions.some((row) => includesNormalized(row.name, "dnd_booking_confirmation")) ||
        adsConversions.some((row) => row.name === "Dandelion - GA4 (web) purchase"),
      evidence:
        findFirstEvidence(adsConversions, "dnd_booking_confirmation") ||
        findFirstEvidence(adsConversions, "purchase")
    },
    {
      key: "gtm_direct_ads_conversion_tag",
      label: "Google Ads conversion path verified",
      ok: hasDirectAdsTag || hasImportedGa4AdsConversionPath,
      evidence:
        findDirectAdsTagEvidence(tagDetails) ||
        findGa4ImportEvidence({ adsConversions, ga4AdsLinks, ga4KeyEvents, tagRows }) ||
        "No explicit direct Ads tag or verified GA4 import chain detected."
    }
  ];

  const okCount = checks.filter((check) => check.ok).length;
  const warningCount = checks.length - okCount;

  return {
    overall_status: warningCount === 0 ? "ok" : warningCount <= 2 ? "warning" : "needs_attention",
    ok_count: okCount,
    warning_count: warningCount,
    checks
  };
}

function includesNormalized(source, needle) {
  return normalize(source).includes(normalize(needle));
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isDirectGoogleAdsTag(tagDetail) {
  const raw = String(tagDetail.rawJson || "");
  const type = String(tagDetail.type || "");
  const name = String(tagDetail.name || "");

  return (
    /"conversionid"|"conversionlabel"|"send_to"|"aw-/.test(raw.toLowerCase()) ||
    /^aw/.test(type.toLowerCase()) ||
    (name.toLowerCase().includes("google ads") && !name.toLowerCase().includes("ga4"))
  );
}

function findFirstEvidence(rows, needle) {
  const match = rows.find((row) => Object.values(row || {}).some((value) => includesNormalized(value, needle)));
  if (!match) {
    return "";
  }
  return match.name || match.eventName || match.search_term || match.id || needle;
}

function findDirectAdsTagEvidence(tagDetails) {
  const match = tagDetails.find(isDirectGoogleAdsTag);
  return match?.name || "";
}

function hasWorkingGa4ImportChain({ adsConversions, ga4AdsLinks, ga4KeyEvents, tagRows }) {
  const hasAdsLink = ga4AdsLinks.length > 0;
  const hasGa4BookingClickEvent = ga4KeyEvents.some((row) => row.eventName === "dnd_booking_click");
  const hasGa4BookingConfirmationEvent = ga4KeyEvents.some((row) => row.eventName === "dnd_booking_confirmation");
  const hasImportedBookingClickConversion = adsConversions.some(
    (row) => includesNormalized(row.name, "dnd_booking_click") && String(row.type || "").startsWith("GOOGLE_ANALYTICS_4")
  );
  const hasImportedBookingConfirmationConversion = adsConversions.some(
    (row) =>
      includesNormalized(row.name, "dnd_booking_confirmation") &&
      String(row.type || "").startsWith("GOOGLE_ANALYTICS_4")
  );
  const hasGtmBookingClickTag = tagRows.some((row) => includesNormalized(row.name, "dnd_booking_click"));
  const hasGtmBookingConfirmationTag = tagRows.some((row) => includesNormalized(row.name, "dnd_booking_confirmation"));

  return (
    hasAdsLink &&
    hasGa4BookingClickEvent &&
    hasGa4BookingConfirmationEvent &&
    hasImportedBookingClickConversion &&
    hasImportedBookingConfirmationConversion &&
    hasGtmBookingClickTag &&
    hasGtmBookingConfirmationTag
  );
}

function findGa4ImportEvidence({ adsConversions, ga4AdsLinks, ga4KeyEvents, tagRows }) {
  if (!hasWorkingGa4ImportChain({ adsConversions, ga4AdsLinks, ga4KeyEvents, tagRows })) {
    return "";
  }

  const linkedCustomerIds = ga4AdsLinks.map((row) => row.customerId).filter(Boolean).join(", ");
  const importedConversions = adsConversions
    .filter(
      (row) =>
        (includesNormalized(row.name, "dnd_booking_click") || includesNormalized(row.name, "dnd_booking_confirmation")) &&
        String(row.type || "").startsWith("GOOGLE_ANALYTICS_4")
    )
    .map((row) => row.name)
    .filter(Boolean)
    .join(" + ");

  return `GA4 import chain active (${linkedCustomerIds}; ${importedConversions})`;
}

function buildResultSummary(result, summarize) {
  if (!result.ok) {
    return {
      ok: false,
      error: result.error
    };
  }

  return {
    ok: true,
    ...summarize(result.data || [])
  };
}

function runNodeJson(scriptPath, scriptArgs) {
  const absolutePath = path.resolve(ROOT, scriptPath);
  let lastFailure = null;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const result = spawnSync(process.execPath, [absolutePath, ...scriptArgs], {
      cwd: ROOT,
      env: process.env,
      encoding: "utf8"
    });

    const stdout = (result.stdout || "").trim();
    const stderr = (result.stderr || "").trim();

    if (result.error) {
      lastFailure = {
        ok: false,
        error: result.error.message
      };
    } else if (result.status !== 0) {
      lastFailure = {
        ok: false,
        error: stderr || stdout || `Command exited with status ${result.status}.`
      };
    } else {
      try {
        return {
          ok: true,
          data: stdout ? JSON.parse(stdout) : []
        };
      } catch (error) {
        lastFailure = {
          ok: false,
          error: `JSON parse failed for ${scriptPath}: ${error.message}`
        };
      }
    }

    if (!shouldRetry(lastFailure?.error) || attempt === 2) {
      break;
    }
  }

  return lastFailure || {
    ok: false,
    error: `Unknown failure while running ${scriptPath}.`
  };
}

function shouldRetry(errorMessage) {
  const normalized = normalize(errorMessage);
  return (
    normalized.includes("resource has been exhausted") ||
    normalized.includes("rate limit") ||
    normalized.includes("429") ||
    normalized.includes("econnreset") ||
    normalized.includes("timeout")
  );
}

function printOutput(payload, format, markdown) {
  if (format === "json") {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log(markdown);
}

function renderHealthcheckMarkdown(report) {
  const lines = [];

  lines.push(`# Google Stack Healthcheck`);
  lines.push("");
  lines.push(`Generated: ${report.generated_at}`);
  lines.push("");
  lines.push(`## Ads`);
  lines.push(`- Customers: ${renderBool(report.ads.customers.ok)}${renderCount(report.ads.customers.count)}`);
  if (!report.ads.customers.ok) {
    lines.push(`- Ads customers error: ${report.ads.customers.error}`);
  }
  lines.push(`- Campaigns: ${renderBool(report.ads.campaigns.ok)}${renderCount(report.ads.campaigns.count)}`);
  lines.push(`- Enabled campaigns: ${report.ads.campaigns.enabled_count ?? 0}`);
  lines.push(`- Conversions: ${renderBool(report.ads.conversions.ok)}${renderCount(report.ads.conversions.count)}`);
  lines.push("");
  lines.push(`## GA4 Admin`);
  lines.push(`- Ads links: ${renderBool(report.ga4_admin.ads_links.ok)}${renderCount(report.ga4_admin.ads_links.count)}`);
  if (report.ga4_admin.ads_links.ok) {
    lines.push(`- Linked customer IDs: ${joinOrFallback(report.ga4_admin.ads_links.customer_ids)}`);
  }
  lines.push(`- Key events: ${renderBool(report.ga4_admin.key_events.ok)}${renderCount(report.ga4_admin.key_events.count)}`);
  if (report.ga4_admin.key_events.ok) {
    lines.push(`- Key event names: ${joinOrFallback(report.ga4_admin.key_events.event_names)}`);
  }
  lines.push("");
  lines.push(`## GTM`);
  lines.push(`- Accounts: ${renderBool(report.gtm.accounts.ok)}${renderCount(report.gtm.accounts.count)}`);
  lines.push(`- Containers: ${renderBool(report.gtm.containers.ok)}${renderCount(report.gtm.containers.count)}`);
  lines.push(`- Workspaces: ${renderBool(report.gtm.workspaces.ok)}${renderCount(report.gtm.workspaces.count)}`);
  lines.push(`- Live version: ${renderBool(report.gtm.latest_version.ok)}${renderCount(report.gtm.latest_version.count)}`);
  lines.push(`- Tags: ${renderBool(report.gtm.tags.ok)}${renderCount(report.gtm.tags.count)}`);
  lines.push(`- Triggers: ${renderBool(report.gtm.triggers.ok)}${renderCount(report.gtm.triggers.count)}`);
  lines.push(`- Resolved GTM IDs: account=${report.gtm.resolved.account_id || "-"}, container=${report.gtm.resolved.container_id || "-"}, workspace=${report.gtm.resolved.workspace_id || "-"}`);
  lines.push("");
  lines.push(`## Booking Chain`);
  lines.push(`- Overall status: ${report.booking_chain.overall_status}`);
  for (const check of report.booking_chain.checks) {
    lines.push(`- ${check.label}: ${renderBool(check.ok)}${check.evidence ? ` (${check.evidence})` : ""}`);
  }

  return lines.join("\n");
}

function renderBookingChainMarkdown(payload) {
  const lines = [];
  lines.push(`# Google Booking Chain Check`);
  lines.push("");
  lines.push(`Overall status: ${payload.overall_status}`);
  lines.push(`Checks OK: ${payload.ok_count}`);
  lines.push(`Checks with warning: ${payload.warning_count}`);
  lines.push("");

  for (const check of payload.checks) {
    lines.push(`- ${check.label}: ${renderBool(check.ok)}${check.evidence ? ` (${check.evidence})` : ""}`);
  }

  return lines.join("\n");
}

function renderBool(value) {
  return value ? "OK" : "HIBA";
}

function renderCount(value) {
  return Number.isFinite(value) ? ` [${value}]` : "";
}

function joinOrFallback(values) {
  return Array.isArray(values) && values.length ? values.join(", ") : "-";
}
