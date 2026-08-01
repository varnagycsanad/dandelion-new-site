// [CHANGE 2026-07-25 22:45] Shared DWA preflight evaluation logic and report rendering.
import path from "node:path";

export const DWA_PREFLIGHT_SCHEMA_VERSION = "dwa-preflight/v1";
export const DWA_PREFLIGHT_STATUSES = Object.freeze([
  "READY",
  "READY_WITH_WARNINGS",
  "HOLD_REVALIDATION_REQUIRED",
  "BLOCKED_NO_DEFENSIBLE_RELEASE"
]);

export const DWA_SOURCE_TYPES = Object.freeze([
  "DWA_VERIFIED_REPO",
  "DWA_BUILD_VERIFIED",
  "DWA_DOCUMENTED_CONTRACT",
  "DWA_NEEDS_SPECIALIST_VERIFICATION",
  "DWA_BLOCKED_BY_SCOPE"
]);

const BLOCKED_STATUS = "BLOCKED_NO_DEFENSIBLE_RELEASE";
const HOLD_STATUS = "HOLD_REVALIDATION_REQUIRED";
const WARNING_STATUS = "READY_WITH_WARNINGS";
const READY_STATUS = "READY";

const SECRET_PATH_PATTERNS = [
  /^\.env(?:\.|$)/i,
  /^\.secrets(?:\/|$)/i,
  /(^|\/)(?:.*token.*|.*credential.*|.*private[-_ ]?key.*|client_secret.*|secret.*)\.(?:json|txt|pem|key|env|local)$/i,
  /(^|\/)(?:ga4|google|meta|ads|oauth)[^/]*token[^/]*\.(?:json|txt)$/i
];

const DIST_PATH_PATTERNS = [
  /^dist(?:\/|$)/i,
  /^\.astro(?:\/|$)/i
];

const PLATFORM_ADMIN_PATH_PATTERNS = [
  /^scripts\/google-ads/i,
  /^scripts\/google-tag-manager/i,
  /^scripts\/google-analytics-admin/i,
  /^scripts\/ga4-report/i,
  /^scripts\/google-stack-/i,
  /^scripts\/meta\//i,
  /^scripts\/meta-/i
];

const BUILD_REQUIRED_PATTERNS = [
  /^src\//i,
  /^public\//i,
  /^astro\.config\.mjs$/i,
  /^package\.json$/i,
  /^scripts\/clean-build-output\.mjs$/i,
  /^scripts\/postbuild-copy-static-files\.mjs$/i,
  /^scripts\/dwa-build-receipt\.mjs$/i
];

const CHECK_REQUIRED_PATTERNS = [
  /^scripts\/check-ujsite-deploy\.mjs$/i,
  /^public\/\.htaccess$/i,
  /^\.github\/workflows\//i
];

const TEXT_EXTENSIONS = new Set([
  ".astro",
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml"
]);

const SITE_RUNTIME_PREFIXES = [
  "src/",
  "public/"
];

const DSA_MARKERS = [
  /sabee/i,
  /ibe\.sabeeapp\.com/i,
  /openbe/i,
  /selectedRooms/i,
  /\broomId\b/i,
  /rate[\s_-]?plan/i,
  /\bcoupon\b/i,
  /\bpackage\b/i,
  /\bavailability\b/i,
  /\bpricing\b/i,
  /\bbooking(?:\s|_|-)?cta\b/i
];

const DMA_MARKERS = [
  /utm_(?:source|medium|campaign|content|term)/i,
  /\bgclid\b/i,
  /\bdnd_(?:lp_cta_click|booking_click)\b/i,
  /google ads/i,
  /meta ads/i,
  /\bgtm\b/i,
  /\bga4\b/i,
  /\bgsc\b/i,
  /\bpixel\b/i,
  /\bcampaign\b/i,
  /\bremarketing\b/i
];

const REMOTE_WRITE_MARKERS = [
  /\bpublish\b/i,
  /\bcreate[-_ ](?:version|campaign|adset|ad|keyword|budget)\b/i,
  /\bupdate[-_ ](?:campaign|campaigns|adset|adsets|ads|budget|budgets|keywords?)\b/i,
  /\b(?:enable|pause|remove|add)[-_ ](?:campaign|campaigns|adset|adsets|ads|location|language|keyword|keywords?)\b/i,
  /\bkey[-_ ]event\b/i
];

function toPosixPath(filePath) {
  return filePath.replace(/\\/g, "/").replace(/^\.\//, "");
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((left, right) =>
    left.localeCompare(right, "en")
  );
}

function matchesAny(patterns, value) {
  return patterns.some((pattern) => pattern.test(value));
}

function isTextLikeFile(relativePath) {
  return TEXT_EXTENSIONS.has(path.extname(relativePath).toLowerCase());
}

function isSiteRuntimePath(relativePath) {
  return SITE_RUNTIME_PREFIXES.some((prefix) => relativePath.startsWith(prefix));
}

function routeFromPagesPath(relativePath) {
  const normalized = toPosixPath(relativePath);

  if (!normalized.startsWith("src/pages/")) {
    return null;
  }

  let route = normalized
    .replace(/^src\/pages/, "")
    .replace(/\.(astro|md|mdx|js|ts)$/i, "")
    .replace(/\/index$/i, "/");

  if (!route.startsWith("/")) {
    route = `/${route}`;
  }

  route = route.replace(/\[(.+?)\]/g, ":$1");

  if (route !== "/" && route.endsWith("/")) {
    route = route.slice(0, -1);
  }

  return route || "/";
}

export function classifyPath(relativePath) {
  const normalized = toPosixPath(relativePath);

  if (matchesAny(SECRET_PATH_PATTERNS, normalized)) {
    return {
      normalized,
      category: "secret",
      scope: "forbidden",
      reason: "Secret, env, token vagy credential path."
    };
  }

  if (matchesAny(DIST_PATH_PATTERNS, normalized)) {
    return {
      normalized,
      category: "build_output",
      scope: "forbidden",
      reason: "Build output path, nem source of truth."
    };
  }

  if (matchesAny(PLATFORM_ADMIN_PATH_PATTERNS, normalized)) {
    return {
      normalized,
      category: "platform_admin",
      scope: "forbidden",
      reason: "Remote platform admin script, nem DWA-only scope."
    };
  }

  if (
    normalized.startsWith("src/") ||
    normalized.startsWith("public/") ||
    normalized.startsWith("scripts/") ||
    normalized.startsWith("project-docs/") ||
    normalized.startsWith(".agents/") ||
    normalized === "package.json" ||
    normalized === ".gitignore" ||
    normalized === "astro.config.mjs" ||
    normalized === "AGENT.md" ||
    normalized === "DANDELION_RULES.md" ||
    normalized === "DANDELION_CHATGPT_RULES.md" ||
    normalized === "README.md"
  ) {
    return {
      normalized,
      category: "dwa_source",
      scope: "safe",
      reason: "Repo source vagy dokumentacios DWA scope."
    };
  }

  return {
    normalized,
    category: "unknown",
    scope: "warning",
    reason: "Nem katalogizalt path, kezi review javasolt."
  };
}

export function deriveAffectedRoutes(changedFiles) {
  const routes = new Set();

  for (const file of changedFiles) {
    const normalized = toPosixPath(file.path);
    const directRoute = routeFromPagesPath(normalized);

    if (directRoute) {
      routes.add(directRoute);
      continue;
    }

    if (
      normalized.startsWith("src/components/") ||
      normalized.startsWith("src/layouts/") ||
      normalized.startsWith("public/scripts/") ||
      normalized === "src/data/site-seo.ts"
    ) {
      routes.add("site-wide");
      continue;
    }

    if (
      normalized.startsWith("src/templates/AccommodationPage") ||
      normalized.startsWith("src/data/accommodation-pages/") ||
      normalized === "src/data/accommodations.ts"
    ) {
      routes.add("accommodation-routes");
      continue;
    }

    if (normalized.startsWith("src/pages/guide/") || normalized.startsWith("src/data/guides/")) {
      routes.add("/guide/*");
    }
  }

  return uniqueSorted([...routes]);
}

function makeFinding({
  path: filePath,
  severity,
  rule,
  message,
  owner = "DWA",
  sourceType
}) {
  return {
    path: filePath,
    severity,
    rule,
    owner,
    message,
    source_type: sourceType
  };
}

function buildEvidence(note, sourceType) {
  return {
    source_type: sourceType,
    note
  };
}

function analyzeRuntimeMarkers(file) {
  const normalized = toPosixPath(file.path);

  if (!isSiteRuntimePath(normalized) || typeof file.content !== "string") {
    return {
      requiresDma: false,
      requiresDsa: false,
      remoteWriteRisk: false
    };
  }

  const requiresDsa = DSA_MARKERS.some((pattern) => pattern.test(file.content));
  const requiresDma = DMA_MARKERS.some((pattern) => pattern.test(file.content));
  const remoteWriteRisk = REMOTE_WRITE_MARKERS.some((pattern) => pattern.test(file.content));

  return {
    requiresDma,
    requiresDsa,
    remoteWriteRisk
  };
}

function computeBuildRequired(changedFiles) {
  return changedFiles.some((file) => matchesAny(BUILD_REQUIRED_PATTERNS, toPosixPath(file.path)));
}

function computeCheckRequired(changedFiles) {
  return changedFiles.some((file) => matchesAny(CHECK_REQUIRED_PATTERNS, toPosixPath(file.path)));
}

function summarizeWorkingTree(changedFiles, rawStatus = "") {
  const entries = changedFiles.map((file) => ({
    path: toPosixPath(file.path),
    status: file.status
  }));

  return {
    is_clean: entries.length === 0,
    changed_count: entries.length,
    entries,
    raw: rawStatus
  };
}

function deriveBuildStatus({
  buildRequired,
  buildReceipt,
  buildExecution,
  latestSafeSourceMtime,
  distLatestMtime
}) {
  if (!buildRequired) {
    return {
      value: "NOT_REQUIRED",
      notes: []
    };
  }

  if (buildExecution?.attempted && !buildExecution.success) {
    return {
      value: "FAILED",
      notes: ["A preflight build futtatasa hibaval allt meg."]
    };
  }

  if (!buildReceipt) {
    return {
      value: "REQUIRED_NOT_RUN",
      notes: ["Publikus vagy build-hook erintett valtozas build receipt nelkul."]
    };
  }

  const receiptTime = Date.parse(buildReceipt.generated_at);
  const staleAfterSourceChange =
    Number.isFinite(receiptTime) &&
    Number.isFinite(latestSafeSourceMtime) &&
    latestSafeSourceMtime > receiptTime;

  if (staleAfterSourceChange) {
    return {
      value: "STALE_AFTER_CHANGES",
      notes: ["A forrasfajl valtozasa ujabb, mint az utolso build receipt."]
    };
  }

  const distEditedAfterReceipt =
    Number.isFinite(receiptTime) &&
    Number.isFinite(distLatestMtime) &&
    distLatestMtime > receiptTime + 2000;

  if (distEditedAfterReceipt) {
    return {
      value: "DIST_CHANGED_AFTER_BUILD",
      notes: ["A dist tartalma az utolso build receipt utan valtozott."]
    };
  }

  return {
    value: "PASSED",
    notes: []
  };
}

function deriveCheckStatus({ checkRequired, checkExecution }) {
  if (!checkRequired && !checkExecution?.attempted) {
    return "NOT_REQUIRED";
  }

  if (checkExecution?.attempted && checkExecution.success) {
    return "PASSED";
  }

  if (checkExecution?.attempted && !checkExecution.success) {
    return "FAILED";
  }

  return checkRequired ? "REQUIRED_NOT_RUN" : "NOT_RUN_OPTIONAL";
}

function computeStatus({
  blockedFindings,
  warnings,
  buildStatus,
  checkStatus,
  dmaValidationRequired,
  dsaValidationRequired
}) {
  if (blockedFindings.length > 0) {
    return BLOCKED_STATUS;
  }

  if (buildStatus === "FAILED" || buildStatus === "DIST_CHANGED_AFTER_BUILD") {
    return BLOCKED_STATUS;
  }

  if (
    buildStatus === "REQUIRED_NOT_RUN" ||
    buildStatus === "STALE_AFTER_CHANGES" ||
    checkStatus === "REQUIRED_NOT_RUN" ||
    (checkStatus === "FAILED" && checkStatus !== "NOT_REQUIRED") ||
    dmaValidationRequired ||
    dsaValidationRequired
  ) {
    return HOLD_STATUS;
  }

  if (warnings.length > 0) {
    return WARNING_STATUS;
  }

  return READY_STATUS;
}

function computeDcaApprovalRequired({ changedFiles, warnings, status }) {
  const hasNonDocsChange = changedFiles.some((file) => {
    const normalized = toPosixPath(file.path);
    return !normalized.startsWith("project-docs/") && !normalized.startsWith(".agents/");
  });

  return hasNonDocsChange || warnings.length > 0 || status !== READY_STATUS;
}

function defaultOperatorSteps({ status, buildRequired, checkRequired, dmaValidationRequired, dsaValidationRequired }) {
  const nextSteps = [];

  if (buildRequired) {
    nextSteps.push("Futtasd a `npm run build` parancsot, ha a build statusz nem `PASSED`.");
  }

  if (checkRequired) {
    nextSteps.push("Futtasd a `npm run check` parancsot a deploy/check reteget erinto valtozasnal.");
  }

  if (dmaValidationRequired) {
    nextSteps.push("Kerj DMA validaciot minden UTM, kampanymeres vagy marketing ownership pont elott.");
  }

  if (dsaValidationRequired) {
    nextSteps.push("Kerj DSA validaciot minden booking CTA, Sabee link vagy foglalasi allitas elott.");
  }

  if (status === BLOCKED_STATUS) {
    nextSteps.push("A blokkolt scope-ot el kell tavolitani vagy kulso ownerhez kell routolni a tovabblepeshez.");
  }

  if (status === HOLD_STATUS) {
    nextSteps.push("A hold statusz feloldasahoz ujraellenorzes vagy specialist handoff kell.");
  }

  if (nextSteps.length === 0) {
    nextSteps.push("A riport DCA-nak atadhato tovabbi blocker nelkul.");
  }

  return nextSteps;
}

export function evaluateDwaPreflight(input) {
  const changedFiles = (input.changedFiles ?? []).map((file) => {
    const classification = classifyPath(file.path);

    return {
      path: toPosixPath(file.path),
      status: file.status ?? "M",
      content: file.content,
      classification
    };
  });

  const warnings = [];
  const forbiddenScopeFindings = [];
  const evidence = [
    buildEvidence(
      "A changed file lista es a route-impact git es repo path alapjan lett levezetve.",
      "DWA_VERIFIED_REPO"
    ),
    buildEvidence(
      "Az ownership, statusz es escalation szabalyok a DWA-003.2 es DWA-003.3 contractokkal kompatibilisek.",
      "DWA_DOCUMENTED_CONTRACT"
    )
  ];

  let dmaValidationRequired = false;
  let dsaValidationRequired = false;

  for (const file of changedFiles) {
    const { classification } = file;

    if (classification.category === "secret") {
      forbiddenScopeFindings.push(
        makeFinding({
          path: file.path,
          severity: "BLOCKED",
          rule: "secret_or_env_touched",
          message: "Secret, env vagy credential path erintett, ez DWA-ban nem vedheto.",
          owner: "DCA",
          sourceType: "DWA_BLOCKED_BY_SCOPE"
        })
      );
      continue;
    }

    if (classification.category === "build_output") {
      forbiddenScopeFindings.push(
        makeFinding({
          path: file.path,
          severity: "BLOCKED",
          rule: "dist_or_build_output_touched",
          message: "A dist vagy mas build output erintett, ez source-of-truth sertest jelent.",
          owner: "DCA",
          sourceType: "DWA_BLOCKED_BY_SCOPE"
        })
      );
      continue;
    }

    if (classification.category === "platform_admin") {
      forbiddenScopeFindings.push(
        makeFinding({
          path: file.path,
          severity: "BLOCKED",
          rule: "remote_platform_admin_scope",
          message: "Ads/Meta/GA4/GTM/GSC admin script erintett, ez nem DWA-only terulet.",
          owner: "DMA",
          sourceType: "DWA_BLOCKED_BY_SCOPE"
        })
      );
      continue;
    }

    if (classification.category === "unknown") {
      warnings.push(
        `Nem katalogizalt path erintett: ${file.path}. Kezi scope-review javasolt.`
      );
    }

    const runtimeMarkers = analyzeRuntimeMarkers(file);

    if (runtimeMarkers.remoteWriteRisk) {
      forbiddenScopeFindings.push(
        makeFinding({
          path: file.path,
          severity: "BLOCKED",
          rule: "remote_platform_write_risk",
          message: "A valtozas remote platform write jellegu muveletet vagy publish kockazatot jelez.",
          owner: "DMA",
          sourceType: "DWA_BLOCKED_BY_SCOPE"
        })
      );
    }

    if (runtimeMarkers.requiresDsa) {
      dsaValidationRequired = true;
      warnings.push(
        `DSA review szukseges a booking vagy Sabee scope miatt: ${file.path}.`
      );
    }

    if (runtimeMarkers.requiresDma) {
      dmaValidationRequired = true;
      warnings.push(
        `DMA review szukseges a kampanymeres vagy UTM scope miatt: ${file.path}.`
      );
    }
  }

  const latestSafeSourceMtime = Number.isFinite(input.latestSafeSourceMtime)
    ? input.latestSafeSourceMtime
    : NaN;
  const distLatestMtime = Number.isFinite(input.distLatestMtime) ? input.distLatestMtime : NaN;

  const buildRequired = computeBuildRequired(changedFiles);
  const checkRequired = computeCheckRequired(changedFiles);

  const buildAssessment = deriveBuildStatus({
    buildRequired,
    buildReceipt: input.buildReceipt ?? null,
    buildExecution: input.buildExecution ?? null,
    latestSafeSourceMtime,
    distLatestMtime
  });

  for (const note of buildAssessment.notes) {
    warnings.push(note);
  }

  if (buildAssessment.value === "PASSED") {
    evidence.push(
      buildEvidence(
        "A jelenlegi working treehez helyi build receipt tartozik.",
        "DWA_BUILD_VERIFIED"
      )
    );
  }

  const checkStatus = deriveCheckStatus({
    checkRequired,
    checkExecution: input.checkExecution ?? null
  });

  if (checkStatus === "FAILED") {
    warnings.push("A check parancs sikertelen volt, ujraellenorzes javasolt.");
  }

  const status = computeStatus({
    blockedFindings: forbiddenScopeFindings,
    warnings,
    buildStatus: buildAssessment.value,
    checkStatus,
    dmaValidationRequired,
    dsaValidationRequired
  });

  if (dmaValidationRequired || dsaValidationRequired) {
    evidence.push(
      buildEvidence(
        "A valtozas tovabbi specialist validaciot igenyel a vegleges release-allitashoz.",
        "DWA_NEEDS_SPECIALIST_VERIFICATION"
      )
    );
  }

  if (forbiddenScopeFindings.length > 0) {
    evidence.push(
      buildEvidence(
        "A riport tiltott vagy ownership-serto scope findingot eszlelt.",
        "DWA_BLOCKED_BY_SCOPE"
      )
    );
  }

  const dcaApprovalRequired = computeDcaApprovalRequired({
    changedFiles,
    warnings,
    status
  });

  const affectedRoutes = deriveAffectedRoutes(changedFiles);
  const workingTreeStatus = summarizeWorkingTree(changedFiles, input.workingTreeRawStatus ?? "");
  const handoffNotes = [];

  handoffNotes.push(...evidence);

  if (dmaValidationRequired) {
    handoffNotes.push(
      buildEvidence(
        "Kampanymeres, UTM vagy marketing ownership erintett, DMA handoff kell.",
        "DWA_NEEDS_SPECIALIST_VERIFICATION"
      )
    );
  }

  if (dsaValidationRequired) {
    handoffNotes.push(
      buildEvidence(
        "Booking vagy Sabee scope erintett, DSA handoff kell.",
        "DWA_NEEDS_SPECIALIST_VERIFICATION"
      )
    );
  }

  const report = {
    schema_version: DWA_PREFLIGHT_SCHEMA_VERSION,
    generated_at: input.generatedAt ?? new Date().toISOString(),
    repo_path: input.repoPath,
    git_branch: input.gitBranch ?? "UNKNOWN",
    git_commit: input.gitCommit ?? "UNKNOWN",
    working_tree_status: workingTreeStatus,
    status,
    affected_files: changedFiles.map((file) => ({
      path: file.path,
      git_status: file.status,
      scope: file.classification.scope,
      category: file.classification.category
    })),
    affected_routes: affectedRoutes,
    forbidden_scope_findings: forbiddenScopeFindings,
    warnings: uniqueSorted(warnings),
    build_required: buildRequired,
    build_command: "npm run build",
    build_status: buildAssessment.value,
    check_required: checkRequired,
    check_command: "npm run check",
    check_status: checkStatus,
    dma_validation_required: dmaValidationRequired,
    dsa_validation_required: dsaValidationRequired,
    dca_approval_required: dcaApprovalRequired,
    handoff_notes: handoffNotes,
    operator_next_steps: defaultOperatorSteps({
      status,
      buildRequired,
      checkRequired,
      dmaValidationRequired,
      dsaValidationRequired
    })
  };

  return report;
}

function renderMarkdownList(values) {
  if (values.length === 0) {
    return "- none";
  }

  return values.map((value) => `- ${value}`).join("\n");
}

function renderObjectList(items, formatter) {
  if (items.length === 0) {
    return "- none";
  }

  return items.map(formatter).join("\n");
}

export function renderDwaPreflightMarkdown(report) {
  return [
    `# DWA Preflight Report`,
    ``,
    `- Status: \`${report.status}\``,
    `- Generated at: \`${report.generated_at}\``,
    `- Repo: \`${report.repo_path}\``,
    `- Git branch: \`${report.git_branch}\``,
    `- Git commit: \`${report.git_commit}\``,
    `- Build required: \`${String(report.build_required)}\``,
    `- Build status: \`${report.build_status}\``,
    `- Check required: \`${String(report.check_required)}\``,
    `- Check status: \`${report.check_status}\``,
    `- DMA validation required: \`${String(report.dma_validation_required)}\``,
    `- DSA validation required: \`${String(report.dsa_validation_required)}\``,
    `- DCA approval required: \`${String(report.dca_approval_required)}\``,
    ``,
    `## Affected Files`,
    renderObjectList(report.affected_files, (file) =>
      `- \`${file.git_status}\` \`${file.path}\` (${file.category})`
    ),
    ``,
    `## Affected Routes`,
    renderMarkdownList(report.affected_routes.map((route) => `\`${route}\``)),
    ``,
    `## Forbidden Scope Findings`,
    renderObjectList(report.forbidden_scope_findings, (finding) =>
      `- [${finding.severity}] \`${finding.path}\` - ${finding.message}`
    ),
    ``,
    `## Warnings`,
    renderMarkdownList(report.warnings),
    ``,
    `## Handoff Notes`,
    renderObjectList(report.handoff_notes, (note) =>
      `- \`${note.source_type}\`: ${note.note}`
    ),
    ``,
    `## Operator Next Steps`,
    renderMarkdownList(report.operator_next_steps)
  ].join("\n");
}
