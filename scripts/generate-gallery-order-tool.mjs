import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const registryPath = path.join(projectRoot, "src", "admin-disabled", "data", "images", "accommodation-images.generated.json");
const seoPreviewPath = path.join(projectRoot, "src", "admin-disabled", "data", "images", "accommodation-images.seo-test.json");
const accommodationsPath = path.join(projectRoot, "src", "data", "accommodations.ts");
const outputDir = path.join(projectRoot, "project-docs", "gallery-order-tool");

const DISPLAY_NAME_FALLBACKS = {
  d1: "Dandelion D1",
  d2: "Dandelion D2",
  fugehaz: "Dandelion Fügeház",
  zsalya: "Dandelion Zsálya",
  szololiget: "Dandelion Szőlőliget",
  szepvolgyi: "Dandelion Szépvölgyi",
  vintage: "Dandelion Vintage",
  royal_homes: "Dandelion Royal Homes",
  koveskal: "Dandelion Köveskál"
};

function parseArgs(argv) {
  const apartmentArg = argv.find((arg) => arg.startsWith("--apartment="));
  return {
    all: argv.includes("--all"),
    apartmentKey: apartmentArg ? apartmentArg.split("=", 2)[1].trim() : ""
  };
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function serializeForScript(value) {
  return JSON.stringify(value).replaceAll("<", "\\u003c");
}

function toPosixPath(filePath) {
  return filePath.split(path.sep).join("/");
}

function relativePublicUrl(assetUrl) {
  if (!assetUrl) {
    return "";
  }

  if (/^(?:https?:)?\/\//.test(assetUrl)) {
    return assetUrl;
  }

  if (!assetUrl.startsWith("/")) {
    return assetUrl;
  }

  const publicRoot = path.join(projectRoot, "public");
  const relativePrefix = toPosixPath(path.relative(outputDir, publicRoot));
  return `${relativePrefix}/${assetUrl.replace(/^\/+/, "")}`;
}

function getFilename(assetUrl) {
  return path.posix.basename(assetUrl || "");
}

function readAccommodationNames() {
  const raw = fs.readFileSync(accommodationsPath, "utf8");
  const map = new Map();
  const pattern = /name:\s*"([^"]+)"[\s\S]*?imageSlot:\s*"([^"]+)"/g;

  for (const match of raw.matchAll(pattern)) {
    const name = match[1].trim();
    const imageSlot = match[2].trim();
    const apartmentKey = imageSlot.replace(/_card_image$/, "");
    if (!map.has(apartmentKey)) {
      map.set(apartmentKey, name);
    }
  }

  return map;
}

function loadSeoPreview() {
  if (!fs.existsSync(seoPreviewPath)) {
    return {};
  }

  return readJson(seoPreviewPath);
}

function mergeSeoDraft(baseDraft, previewDraft) {
  const baseHasValues =
    baseDraft &&
    Object.entries(baseDraft).some(([key, value]) => key !== "approved" && String(value ?? "").trim() !== "");
  const previewHasValues =
    previewDraft &&
    Object.entries(previewDraft).some(([key, value]) => key !== "approved" && String(value ?? "").trim() !== "");

  if (baseDraft?.approved === true) {
    return baseDraft;
  }

  if (!baseHasValues && previewHasValues) {
    return previewDraft;
  }

  if (baseHasValues && previewHasValues) {
    return {
      ...previewDraft,
      ...baseDraft,
      approved: baseDraft?.approved ?? previewDraft?.approved ?? false
    };
  }

  return baseDraft || previewDraft || null;
}

function getGalleryEntries(registryEntry, apartmentKey, seoPreviewEntry) {
  const previewByFilename = new Map();

  for (const item of seoPreviewEntry?.gallery || []) {
    previewByFilename.set(getFilename(item.src), item.seoDraft || null);
  }

    return (registryEntry.gallery || []).map((item) => {
      const filename = getFilename(item.src);
      const previewSeoDraft = previewByFilename.get(filename);
      const mergedSeoDraft = mergeSeoDraft(item.seoDraft || null, previewSeoDraft);

      return {
        id: item.id || "",
        apartmentKey,
        src: item.src || "",
        thumb: item.thumb || "",
        localSrc: relativePublicUrl(item.src || ""),
        localThumb: relativePublicUrl(item.thumb || item.src || ""),
        sortOrder: item.sortOrder ?? null,
        filename,
        seoDraft: mergedSeoDraft
      };
    });
}

function buildExportJson(items) {
  return JSON.stringify(items.map((item) => item.filename), null, 2);
}

function buildCodexBlock(apartmentKey, items, notes = {}) {
  const lines = ["APARTMENT_KEY: " + apartmentKey, "NEW_ORDER:", "["];
  for (let index = 0; index < items.length; index += 1) {
    const filename = items[index].filename;
    const note = String(notes[filename] || "").trim();
    lines.push(`  "${filename}"${note ? `, // note: ${note}` : ""}`);
  }
  lines.push("]");

  const noteEntries = Object.entries(notes)
    .map(([filename, note]) => ({ filename, note: String(note).trim() }))
    .filter((entry) => entry.note);

  if (noteEntries.length) {
    lines.push("NOTES:");
    lines.push(JSON.stringify(noteEntries, null, 2));
  }

  return lines.join("\n");
}

function buildSimpleList(items) {
  return items.map((item) => item.filename).join("\n");
}

function renderSeoDraftMarkup(seoDraft) {
  if (!seoDraft) {
    return "<div class='seo__item'>Nincs SEO draft adat.</div>";
  }

  return [
    '<div class="seo__item"><strong>approved:</strong> ' + escapeHtml(String(Boolean(seoDraft.approved))) + '</div>',
    '<div class="seo__item"><strong>altHu:</strong> ' + escapeHtml(seoDraft.altHu || "—") + '</div>',
    '<div class="seo__item"><strong>titleHu:</strong> ' + escapeHtml(seoDraft.titleHu || "—") + '</div>',
    '<div class="seo__item"><strong>captionHu:</strong> ' + escapeHtml(seoDraft.captionHu || "—") + '</div>',
    '<div class="seo__item"><strong>altEn:</strong> ' + escapeHtml(seoDraft.altEn || "—") + '</div>',
    '<div class="seo__item"><strong>titleEn:</strong> ' + escapeHtml(seoDraft.titleEn || "—") + '</div>',
    '<div class="seo__item"><strong>captionEn:</strong> ' + escapeHtml(seoDraft.captionEn || "—") + '</div>'
  ].join("");
}

function buildMetricsData(items) {
  const filenames = items.map((item) => item.filename);
  const duplicateCount = filenames.length - new Set(filenames).size;
  const emptySrcCount = items.filter((item) => !String(item.src || "").trim()).length;
  const sortOrderCount = items.filter((item) => typeof item.sortOrder === "number").length;

  return [
    { label: "Képek száma", value: String(items.length) },
    { label: "Duplikált filename", value: String(duplicateCount) },
    { label: "Üres src", value: String(emptySrcCount) },
    { label: "Minden kép betöltött", value: "nem ellenőrzött" },
    { label: "sortOrder mezők", value: String(sortOrderCount) + "/" + String(items.length) },
    { label: "Első 12 kép", value: String(Math.min(12, items.length)) },
    { label: "Törött képek", value: "0" },
    { label: "Betöltött képek", value: "nem ellenőrzött" }
  ];
}

function buildMetricsHtml(items) {
  return buildMetricsData(items)
    .map(
      (metric) =>
        '<div class="metric"><span class="metric__label">' +
        escapeHtml(metric.label) +
        '</span><span class="metric__value">' +
        escapeHtml(metric.value) +
        '</span></div>'
    )
    .join("");
}

function buildCardHtml(item, index) {
  const filename = item.filename || getFilename(item.src);
  const seoDraft = item.seoDraft || null;
  const thumbUrl = item.localThumb || relativePublicUrl(item.thumb || item.src);
  const fullUrl = item.localSrc || relativePublicUrl(item.src);

  return (
    '<article class="card" data-index="' +
    index +
    '" data-filename="' +
    escapeHtml(filename) +
    '">' +
    '<div class="card__media" data-drag-handle="true">' +
    '<img src="' +
    escapeHtml(thumbUrl) +
    '" draggable="false" ondragstart="return false" alt="' +
    escapeHtml(seoDraft && seoDraft.altHu ? seoDraft.altHu : filename) +
    '" loading="lazy" data-full="' +
    escapeHtml(fullUrl) +
    '" />' +
    '<span class="badge">#' +
    (index + 1) +
    '</span>' +
    '<span class="badge secondary">' +
    escapeHtml(String(item.sortOrder ?? "n/a")) +
    '</span>' +
    '<span class="drag-hint">Huzd a kepet a sorrend modositasahoz</span>' +
    '</div>' +
    '<div class="card__body">' +
    '<div class="headline">' +
    '<strong>' +
    escapeHtml(filename) +
    '</strong>' +
    '<span>' +
    escapeHtml(item.id || "n/a") +
    '</span>' +
    '</div>' +
    '<div class="meta">' +
    '<div class="meta-row"><strong>src</strong><span>' +
    escapeHtml(filename) +
    '</span></div>' +
    '<div class="meta-row"><strong>sortOrder</strong><span>' +
    escapeHtml(String(item.sortOrder ?? "n/a")) +
    '</span></div>' +
    '</div>' +
    '<div class="statusline">' +
    '<span class="status" data-state="info">betöltés…</span>' +
    '<span class="status" data-state="info">ismeretlen</span>' +
    '</div>' +
    '<details class="seo">' +
    '<summary>SEO draft</summary>' +
    '<div class="seo__grid">' +
    renderSeoDraftMarkup(seoDraft) +
    '</div>' +
    '</details>' +
    '<div class="note">' +
    '<label for="note-' +
    index +
    '">Megjegyzés</label>' +
    '<textarea id="note-' +
    index +
    '" data-note-index="' +
    index +
    '" placeholder="Csak helyi exporthoz..."></textarea>' +
    '</div>' +
    '</div>' +
    '</article>'
  );
}

function buildGalleryMarkup(items) {
  const first = items.slice(0, 12);
  const rest = items.slice(12);
  const firstCards = first.map((item, index) => buildCardHtml(item, index)).join("");
  const restCards = rest.map((item, index) => buildCardHtml(item, index + 12)).join("");

  return (
    '<div class="section__title">Első 12 kép – kiemelt galéria<small>' +
    escapeHtml(String(first.length)) +
    ' kép látható ebben a blokkban.</small></div>' +
    '<div class="grid" id="gallery-grid" data-group="primary">' +
    firstCards +
    '</div>' +
    (rest.length
      ? '<div class="section__title" style="margin-top:18px;">További galériaképek<small>' +
        escapeHtml(String(rest.length)) +
        ' kép maradt a kiemelt blokk után.</small></div><div class="grid" data-group="secondary">' +
        restCards +
        '</div>'
      : "")
  );
}

function buildPageHtml({ apartmentKey, apartmentName, items, seoPreviewSource }) {
  const pageData = {
    apartmentKey,
    apartmentName,
    sourceRegistry: "src/admin-disabled/data/images/accommodation-images.generated.json",
    seoPreviewSource: seoPreviewSource ? "src/admin-disabled/data/images/accommodation-images.seo-test.json" : "",
    items
  };

  return `<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dandelion galéria rendező - ${escapeHtml(apartmentName)}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4efe6;
      --panel: #fffaf2;
      --panel-soft: #f8f1e6;
      --text: #2f2a23;
      --muted: #716657;
      --border: rgba(95, 73, 47, 0.18);
      --accent: #86643d;
      --accent-strong: #694929;
      --accent-soft: #e9dcc8;
      --shadow: 0 18px 40px rgba(56, 40, 18, 0.12);
      --ok: #2f6b3a;
      --warn: #a84f2e;
      --info: #5b5d98;
    }

    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top, rgba(255,255,255,0.9), transparent 36%),
        linear-gradient(180deg, var(--bg), #eee4d1 70%);
    }

    .shell {
      max-width: 1540px;
      margin: 0 auto;
      padding: 28px 18px 48px;
    }

    .topbar {
      display: grid;
      grid-template-columns: minmax(0, 1.4fr) minmax(320px, 0.9fr);
      gap: 20px;
      align-items: start;
      margin-bottom: 18px;
    }

    .hero, .panel {
      background: rgba(255, 250, 242, 0.9);
      border: 1px solid var(--border);
      border-radius: 20px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(8px);
    }

    .hero {
      padding: 22px 22px 18px;
    }

    .panel {
      padding: 18px;
    }

    h1 {
      margin: 0;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.05;
      letter-spacing: 0;
    }

    .subtitle {
      margin: 10px 0 0;
      color: var(--muted);
      max-width: 70ch;
      line-height: 1.55;
    }

    .pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.78);
      font-size: 0.92rem;
      color: var(--text);
    }

    .pill strong {
      color: var(--accent-strong);
      font-weight: 700;
    }

    .toolbar {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }

    .toolbar textarea {
      width: 100%;
      min-height: 160px;
      resize: vertical;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: #fff;
      padding: 12px;
      font: 0.88rem/1.45 Consolas, "Liberation Mono", monospace;
      color: #2d271f;
    }

    .copybar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }

    .button {
      appearance: none;
      border: 0;
      border-radius: 12px;
      padding: 11px 14px;
      background: var(--accent);
      color: #fff;
      cursor: pointer;
      font: inherit;
      box-shadow: var(--shadow);
    }

    .button:hover { background: var(--accent-strong); }

    .button.secondary {
      background: var(--panel-soft);
      color: var(--accent-strong);
      border: 1px solid var(--border);
      box-shadow: none;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-top: 14px;
    }

    .metric {
      padding: 12px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.8);
    }

    .metric__label {
      display: block;
      color: var(--muted);
      font-size: 0.82rem;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .metric__value {
      font-weight: 700;
      font-size: 1rem;
    }

    .section {
      margin-top: 22px;
      padding: 18px;
      border-radius: 20px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.45);
    }

    .section__title {
      margin: 0 0 14px;
      font-size: 1.15rem;
      line-height: 1.2;
      font-weight: 800;
    }

    .section__title small {
      display: block;
      margin-top: 4px;
      color: var(--muted);
      font-weight: 500;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 14px;
    }

    .card {
      display: flex;
      flex-direction: column;
      border-radius: 18px;
      overflow: hidden;
      background: var(--panel);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      user-select: none;
      transition: box-shadow 120ms ease, transform 120ms ease, opacity 120ms ease;
    }

    .card.is-pointer-dragging {
      opacity: 0.96;
      z-index: 30;
      pointer-events: none;
      box-shadow: 0 24px 48px rgba(56, 40, 18, 0.24);
      transform: translate3d(var(--drag-x, 0px), var(--drag-y, 0px), 0) scale(1.02) rotate(0.4deg);
    }

    .card.is-drop-target-before {
      box-shadow: inset 0 4px 0 var(--accent), var(--shadow);
    }

    .card.is-drop-target-after {
      box-shadow: inset 0 -4px 0 var(--accent), var(--shadow);
    }

    .card__media {
      position: relative;
      aspect-ratio: 4 / 3;
      background: #ded5c6;
      cursor: grab;
      touch-action: none;
    }

    .card__media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
    }

    .card.is-pointer-dragging .card__media {
      cursor: grabbing;
    }

    .drag-hint {
      position: absolute;
      right: 10px;
      bottom: 10px;
      max-width: calc(100% - 20px);
      display: inline-flex;
      align-items: center;
      min-height: 28px;
      padding: 6px 9px;
      border-radius: 999px;
      background: rgba(47, 42, 35, 0.72);
      color: #fff;
      font-size: 0.74rem;
      font-weight: 600;
      text-align: right;
      pointer-events: none;
    }

    .badge {
      position: absolute;
      top: 10px;
      left: 10px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      min-height: 32px;
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(47, 42, 35, 0.82);
      color: #fff;
      font-size: 0.78rem;
      font-weight: 700;
    }

    .badge.secondary {
      top: auto;
      bottom: 10px;
      left: 10px;
      background: rgba(255, 250, 242, 0.95);
      color: var(--accent-strong);
      border: 1px solid var(--border);
    }

    .card__body {
      padding: 12px 12px 14px;
      display: grid;
      gap: 10px;
    }

    .headline {
      display: grid;
      gap: 4px;
    }

    .headline strong {
      font-size: 1rem;
      line-height: 1.2;
    }

    .headline span {
      color: var(--muted);
      font-size: 0.88rem;
    }

    .meta {
      display: grid;
      gap: 6px;
      font-size: 0.86rem;
      color: var(--text);
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 7px 10px;
      border-radius: 10px;
      background: rgba(243, 235, 223, 0.8);
    }

    .meta-row strong {
      color: var(--muted);
      font-weight: 600;
    }

    .statusline {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 9px;
      border-radius: 999px;
      font-size: 0.8rem;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.9);
    }

    .status[data-state="ok"] { color: var(--ok); }
    .status[data-state="warn"] { color: var(--warn); }
    .status[data-state="info"] { color: var(--info); }

    .seo {
      border: 1px dashed var(--border);
      border-radius: 12px;
      background: rgba(255,255,255,0.66);
      padding: 8px 10px;
    }

    .seo summary {
      cursor: pointer;
      font-weight: 700;
      color: var(--accent-strong);
    }

    .seo__grid {
      display: grid;
      gap: 8px;
      margin-top: 10px;
      font-size: 0.84rem;
    }

    .seo__item {
      padding: 8px 10px;
      border-radius: 10px;
      background: rgba(243, 235, 223, 0.75);
      white-space: pre-wrap;
      word-break: break-word;
    }

    .note {
      display: grid;
      gap: 6px;
    }

    .note label {
      font-size: 0.84rem;
      color: var(--muted);
      font-weight: 600;
    }

    .note textarea {
      width: 100%;
      min-height: 68px;
      resize: vertical;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: #fff;
      padding: 10px;
      font: 0.88rem/1.4 system-ui, sans-serif;
    }

    .footer {
      margin-top: 24px;
      color: var(--muted);
      font-size: 0.93rem;
      line-height: 1.5;
    }

    @media (max-width: 1100px) {
      .topbar { grid-template-columns: 1fr; }
      .toolbar { grid-template-columns: 1fr; }
      .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }

    @media (max-width: 640px) {
      .shell { padding: 18px 12px 36px; }
      .panel, .hero, .section { border-radius: 16px; }
      .metrics { grid-template-columns: 1fr; }
      .grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <div class="topbar">
      <section class="hero">
        <h1>${escapeHtml(apartmentName)}</h1>
        <p class="subtitle">
          Lokális galéria-rendező a képek sorrendjének kényelmes áthúzásához. Az exportok másolhatók, de a
          registryt ez az eszköz nem írja vissza automatikusan.
        </p>
        <div class="pills">
          <span class="pill"><strong>ApartmentKey</strong> ${escapeHtml(apartmentKey)}</span>
          <span class="pill"><strong>Forrás</strong> ${escapeHtml("src/admin-disabled/data/images/accommodation-images.generated.json")}</span>
          <span class="pill"><strong>SEO preview</strong> ${
            seoPreviewSource ? escapeHtml("src/admin-disabled/data/images/accommodation-images.seo-test.json") : "nincs"
          }</span>
          <span class="pill"><strong>Megnyitás</strong> dupla kattintással a .bat fájlról</span>
        </div>
        <div class="metrics" id="metrics">${buildMetricsHtml(items)}</div>
      </section>

      <aside class="panel">
        <div class="copybar">
          <button class="button" id="copy-json" type="button">JSON sorrend másolása</button>
          <button class="button secondary" id="copy-codex" type="button">Codex-ready blokk másolása</button>
          <button class="button secondary" id="copy-list" type="button">Sima lista másolása</button>
        </div>
        <div class="toolbar" aria-label="Export mezők">
          <div>
            <textarea id="export-json" readonly>${escapeHtml(buildExportJson(items))}</textarea>
          </div>
          <div>
            <textarea id="export-codex" readonly>${escapeHtml(buildCodexBlock(apartmentKey, items))}</textarea>
          </div>
          <div>
            <textarea id="export-list" readonly>${escapeHtml(buildSimpleList(items))}</textarea>
          </div>
        </div>
      </aside>
    </div>

    <section class="section">
      <h2 class="section__title">
        Első 12 kép – kiemelt galéria
        <small>Az első tizenkettő külön vizuális blokkban jelenik meg, hogy az exportnál azonnal látszódjon a fókusz.</small>
      </h2>
      <div id="gallery-root">${buildGalleryMarkup(items)}</div>
    </section>

    <p class="footer">
      A rendezés után a JSON, a Codex-ready blokk és a sima lista automatikusan újragenerálódik. A megjegyzések
      csak helyi használatra vannak, és nem kerülnek vissza az image registrybe.
    </p>
  </div>

  <script id="tool-data" type="application/json">${serializeForScript(pageData)}</script>
  <script>
    const initialData = JSON.parse(document.getElementById("tool-data").textContent);
    const galleryRoot = document.getElementById("gallery-root");
    const metricsRoot = document.getElementById("metrics");
    const jsonOutput = document.getElementById("export-json");
    const codexOutput = document.getElementById("export-codex");
    const listOutput = document.getElementById("export-list");
    const copyJsonButton = document.getElementById("copy-json");
    const copyCodexButton = document.getElementById("copy-codex");
    const copyListButton = document.getElementById("copy-list");
    const state = {
      order: initialData.items.map((item) => ({ ...item })),
      notes: Object.create(null),
      imageState: Object.create(null),
      drag: {
        active: false,
        pointerId: null,
        draggedIndex: -1,
        targetIndex: -1,
        dropBefore: true,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        moved: false
      },
      dragCard: null
    };

    function escapeText(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
    }

    function filenameOf(item) {
      return item.filename || item.src.split("/").pop() || "";
    }

    function buildJsonExport() {
      return JSON.stringify(state.order.map((item) => filenameOf(item)), null, 2);
    }

    function buildCodexExport() {
      const lines = ["APARTMENT_KEY: " + initialData.apartmentKey, "NEW_ORDER:", "["];
      for (const item of state.order) {
        const filename = filenameOf(item);
        const note = String(state.notes[filename] || "").trim();
        lines.push(note ? '  "' + filename + '", // note: ' + note : '  "' + filename + '"');
      }
      lines.push("]");

      const noteEntries = Object.entries(state.notes)
        .map(([filename, note]) => ({ filename, note: String(note).trim() }))
        .filter((entry) => entry.note);

      if (noteEntries.length) {
        lines.push("NOTES:");
        lines.push(JSON.stringify(noteEntries, null, 2));
      }

      return lines.join("\\n");
    }

    function buildSimpleList() {
      return state.order.map((item) => filenameOf(item)).join("\\n");
    }

    function getMetrics() {
      const filenames = state.order.map((item) => filenameOf(item));
      const duplicateCount = filenames.length - new Set(filenames).size;
      const emptySrcCount = state.order.filter((item) => !String(item.src || "").trim()).length;
      const sortOrderCount = state.order.filter((item) => typeof item.sortOrder === "number").length;
      const loadedCount = Object.values(state.imageState).filter((entry) => entry.state === "loaded").length;
      const brokenCount = Object.values(state.imageState).filter((entry) => entry.state === "broken").length;
      const allLoaded = loadedCount + brokenCount === state.order.length && brokenCount === 0;

      return [
        { label: "Képek száma", value: String(state.order.length) },
        { label: "Duplikált filename", value: String(duplicateCount) },
        { label: "Üres src", value: String(emptySrcCount) },
        { label: "Minden kép betöltött", value: allLoaded ? "igen" : "nem" },
        { label: "sortOrder mezők", value: String(sortOrderCount) + "/" + String(state.order.length) },
        { label: "Első 12 kép", value: String(Math.min(12, state.order.length)) },
        { label: "Törött képek", value: String(brokenCount) },
        { label: "Betöltött képek", value: String(loadedCount) + "/" + String(state.order.length) }
      ];
    }

    function renderMetrics() {
      metricsRoot.innerHTML = getMetrics()
        .map(function (metric) {
          return (
            '<div class="metric">' +
            '<span class="metric__label">' + escapeText(metric.label) + '</span>' +
            '<span class="metric__value">' + escapeText(metric.value) + '</span>' +
            '</div>'
          );
        })
        .join("");
    }

    function renderSeoDraft(seoDraft) {
      if (!seoDraft) {
        return "<div class='seo__item'>Nincs SEO draft adat.</div>";
      }

      return [
        '<div class="seo__item"><strong>approved:</strong> ' + escapeText(String(Boolean(seoDraft.approved))) + '</div>',
        '<div class="seo__item"><strong>altHu:</strong> ' + escapeText(seoDraft.altHu || '—') + '</div>',
        '<div class="seo__item"><strong>titleHu:</strong> ' + escapeText(seoDraft.titleHu || '—') + '</div>',
        '<div class="seo__item"><strong>captionHu:</strong> ' + escapeText(seoDraft.captionHu || '—') + '</div>',
        '<div class="seo__item"><strong>altEn:</strong> ' + escapeText(seoDraft.altEn || '—') + '</div>',
        '<div class="seo__item"><strong>titleEn:</strong> ' + escapeText(seoDraft.titleEn || '—') + '</div>',
        '<div class="seo__item"><strong>captionEn:</strong> ' + escapeText(seoDraft.captionEn || '—') + '</div>'
      ].join('');
    }

    function renderImageStatus(item, index) {
      const entry = state.imageState[index] || { state: "loading", orientation: "" };
      const statusLabel = entry.state === "loaded" ? "betöltve" : entry.state === "broken" ? "hiba" : "betöltés…";
      const statusClass = entry.state === "loaded" ? "ok" : entry.state === "broken" ? "warn" : "info";
      const orientationLabel = entry.orientation || "ismeretlen";

      return (
        '<div class="statusline">' +
          '<span class="status" data-state="' + statusClass + '">' + escapeText(statusLabel) + '</span>' +
          '<span class="status" data-state="info">' + escapeText(orientationLabel) + '</span>' +
        '</div>'
      );
    }

    function syncDropIndicators() {
      const cards = galleryRoot.querySelectorAll(".card");
      cards.forEach((card) => {
        const index = Number(card.dataset.index);
        card.classList.toggle("is-drop-target-before", index === state.drag.targetIndex && state.drag.dropBefore);
        card.classList.toggle("is-drop-target-after", index === state.drag.targetIndex && !state.drag.dropBefore);
      });
    }

    function cardHtml(item, index) {
      const fullUrl = item.localSrc || item.src || "";
      const thumbUrl = item.localThumb || item.thumb || item.src || "";
      const seoDraft = item.seoDraft || null;
      return (
        '<article class="card" data-index="' + index + '" data-filename="' + escapeText(filenameOf(item)) + '">' +
          '<div class="card__media" data-drag-handle="true">' +
            '<img' +
              ' src="' + escapeText(thumbUrl) + '"' +
              ' draggable="false"' +
              ' ondragstart="return false"' +
              ' alt="' + escapeText(seoDraft && seoDraft.altHu ? seoDraft.altHu : filenameOf(item)) + '"' +
              ' loading="lazy"' +
              ' data-full="' + escapeText(fullUrl) + '"' +
            ' />' +
            '<span class="badge">#' + (index + 1) + '</span>' +
            '<span class="badge secondary">' + escapeText(String(item.sortOrder ?? 'n/a')) + '</span>' +
            '<span class="drag-hint">Huzd a kepet a sorrend modositasahoz</span>' +
          '</div>' +
          '<div class="card__body">' +
            '<div class="headline">' +
              '<strong>' + escapeText(filenameOf(item)) + '</strong>' +
              '<span>' + escapeText(item.id || 'n/a') + '</span>' +
            '</div>' +
            '<div class="meta">' +
              '<div class="meta-row"><strong>src</strong><span>' + escapeText(filenameOf(item)) + '</span></div>' +
              '<div class="meta-row"><strong>sortOrder</strong><span>' + escapeText(String(item.sortOrder ?? 'n/a')) + '</span></div>' +
            '</div>' +
            renderImageStatus(item, index) +
            '<details class="seo">' +
              '<summary>SEO draft</summary>' +
              '<div class="seo__grid">' + renderSeoDraft(seoDraft) + '</div>' +
            '</details>' +
            '<div class="note">' +
              '<label for="note-' + index + '">Megjegyzés</label>' +
              '<textarea id="note-' + index + '" data-note-index="' + index + '" placeholder="Csak helyi exporthoz...">' + escapeText(state.notes[filenameOf(item)] || "") + '</textarea>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    function renderGallery() {
      const first = state.order.slice(0, 12);
      const rest = state.order.slice(12);
      const html = [];

      html.push('<div class="section__title">Első 12 kép – kiemelt galéria<small>' + escapeText(String(first.length)) + ' kép látható ebben a blokkban.</small></div>');
      html.push('<div class="grid" id="gallery-grid" data-group="primary">');
      first.forEach((item, index) => {
        html.push(cardHtml(item, index));
      });
      html.push("</div>");

      if (rest.length) {
        html.push('<div class="section__title" style="margin-top:18px;">További galériaképek<small>' + escapeText(String(rest.length)) + ' kép maradt a kiemelt blokk után.</small></div>');
        html.push('<div class="grid" data-group="secondary">');
        rest.forEach((item, offset) => {
          const index = offset + 12;
          html.push(cardHtml(item, index));
        });
        html.push("</div>");
      }

      galleryRoot.innerHTML = html.join("");
    }

    function updateExports() {
      const jsonValue = buildJsonExport();
      const codexValue = buildCodexExport();
      const listValue = buildSimpleList();
      jsonOutput.value = jsonValue;
      codexOutput.value = codexValue;
      listOutput.value = listValue;
    }

    function refreshStatusBadges() {
      const cards = galleryRoot.querySelectorAll(".card");
      cards.forEach((card) => {
        const index = Number(card.dataset.index);
        const current = state.imageState[index] || { state: "loading", orientation: "" };
        const statusNodes = card.querySelectorAll(".statusline .status");
        if (statusNodes[0]) {
          statusNodes[0].textContent = current.state === "loaded" ? "betöltve" : current.state === "broken" ? "hiba" : "betöltés…";
          statusNodes[0].dataset.state = current.state === "loaded" ? "ok" : current.state === "broken" ? "warn" : "info";
        }
        if (statusNodes[1]) {
          statusNodes[1].textContent = current.orientation || "ismeretlen";
        }
      });
    }

    function renderAll() {
      renderMetrics();
      renderGallery();
      updateExports();
      bindCardEvents();
      refreshStatusBadges();
      syncDropIndicators();
    }

    function setImageState(index, patch) {
      const existing = state.imageState[index] || { state: "loading", orientation: "" };
      state.imageState[index] = { ...existing, ...patch };
      renderMetrics();
      refreshStatusBadges();
    }

    function bindCardEvents() {
      const cards = galleryRoot.querySelectorAll(".card");
      cards.forEach((card) => {
        const handle = card.querySelector("[data-drag-handle='true']");
        if (handle) {
          handle.addEventListener("pointerdown", onPointerDownCard);
        }
      });

      const notes = galleryRoot.querySelectorAll("textarea[data-note-index]");
      notes.forEach((textarea) => {
        textarea.addEventListener("input", (event) => {
          const index = Number(event.currentTarget.dataset.noteIndex);
          const item = state.order[index];
          if (!item) return;
          state.notes[filenameOf(item)] = event.currentTarget.value;
          updateExports();
        });
      });

      cards.forEach((card) => {
        const index = Number(card.dataset.index);
        const img = card.querySelector("img");
        if (!img) return;

        if (!state.imageState[index]) {
          state.imageState[index] = { state: "loading", orientation: "" };
        }

        img.onload = () => {
          const width = img.naturalWidth || 0;
          const height = img.naturalHeight || 0;
          const orientation = width > height ? "fekvő" : width < height ? "álló" : "négyzetes";
          setImageState(index, { state: "loaded", orientation, width, height });
        };

        img.onerror = () => {
          setImageState(index, { state: "broken", orientation: "ismeretlen" });
        };

        if (img.complete && img.naturalWidth > 0 && state.imageState[index].state !== "loaded") {
          const width = img.naturalWidth || 0;
          const height = img.naturalHeight || 0;
          const orientation = width > height ? "fekvő" : width < height ? "álló" : "négyzetes";
          state.imageState[index] = { state: "loaded", orientation, width, height };
        }
      });
    }

    function moveItem(fromIndex, toIndex) {
      if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;
      const item = state.order.splice(fromIndex, 1)[0];
      const adjustedIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
      state.order.splice(adjustedIndex, 0, item);
      state.imageState = Object.create(null);
      renderAll();
    }

    function clearPointerDragVisuals() {
      if (!state.dragCard) {
        return;
      }

      state.dragCard.classList.remove("is-pointer-dragging");
      state.dragCard.style.removeProperty("--drag-x");
      state.dragCard.style.removeProperty("--drag-y");
    }

    function resetPointerState() {
      clearPointerDragVisuals();
      state.drag.active = false;
      state.drag.pointerId = null;
      state.drag.draggedIndex = -1;
      state.drag.targetIndex = -1;
      state.drag.dropBefore = true;
      state.drag.startX = 0;
      state.drag.startY = 0;
      state.drag.currentX = 0;
      state.drag.currentY = 0;
      state.drag.moved = false;
      state.dragCard = null;
      syncDropIndicators();
    }

    function updateDraggedCardPosition() {
      if (!state.dragCard) {
        return;
      }

      const deltaX = state.drag.currentX - state.drag.startX;
      const deltaY = state.drag.currentY - state.drag.startY;
      state.dragCard.style.setProperty("--drag-x", deltaX + "px");
      state.dragCard.style.setProperty("--drag-y", deltaY + "px");
    }

    function updatePointerTarget(clientX, clientY) {
      const cards = Array.from(galleryRoot.querySelectorAll(".card")).filter((card) => {
        const index = Number(card.dataset.index);
        return !Number.isNaN(index) && index !== state.drag.draggedIndex;
      });
      const card =
        cards.find((candidate) => {
          const rect = candidate.getBoundingClientRect();
          return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
        }) ||
        cards.reduce((best, candidate) => {
          const rect = candidate.getBoundingClientRect();
          const dx = clientX < rect.left ? rect.left - clientX : clientX > rect.right ? clientX - rect.right : 0;
          const dy = clientY < rect.top ? rect.top - clientY : clientY > rect.bottom ? clientY - rect.bottom : 0;
          const distance = dx * dx + dy * dy;
          if (!best || distance < best.distance) {
            return { card: candidate, distance };
          }

          return best;
        }, null)?.card || null;
      if (!card) {
        state.drag.targetIndex = -1;
        state.drag.dropBefore = true;
        syncDropIndicators();
        return;
      }

      const index = Number(card.dataset.index);
      if (Number.isNaN(index) || index === state.drag.draggedIndex) {
        state.drag.targetIndex = -1;
        state.drag.dropBefore = true;
        syncDropIndicators();
        return;
      }

      const rect = card.getBoundingClientRect();
      state.drag.targetIndex = index;
      state.drag.dropBefore = clientY < rect.top + rect.height / 2;
      syncDropIndicators();
    }

    function onPointerDownCard(event) {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      const handle = event.currentTarget;
      const card = handle.closest(".card");
      const index = Number(card && card.dataset.index);
      if (!card || Number.isNaN(index)) {
        return;
      }

      state.drag.active = true;
      state.drag.pointerId = event.pointerId;
      state.drag.draggedIndex = index;
      state.drag.targetIndex = -1;
      state.drag.dropBefore = true;
      state.drag.startX = event.clientX;
      state.drag.startY = event.clientY;
      state.drag.currentX = event.clientX;
      state.drag.currentY = event.clientY;
      state.drag.moved = false;
      state.dragCard = card;

      card.classList.add("is-pointer-dragging");
      card.style.setProperty("--drag-x", "0px");
      card.style.setProperty("--drag-y", "0px");

      if (handle.setPointerCapture) {
        handle.setPointerCapture(event.pointerId);
      }

      window.addEventListener("pointermove", onPointerMoveCard);
      window.addEventListener("pointerup", onPointerUpCard);
      window.addEventListener("pointercancel", onPointerUpCard);
    }

    function onPointerMoveCard(event) {
      if (!state.drag.active || event.pointerId !== state.drag.pointerId) {
        return;
      }

      state.drag.currentX = event.clientX;
      state.drag.currentY = event.clientY;
      const deltaX = state.drag.currentX - state.drag.startX;
      const deltaY = state.drag.currentY - state.drag.startY;
      if (!state.drag.moved && Math.abs(deltaX) + Math.abs(deltaY) > 6) {
        state.drag.moved = true;
      }

      updateDraggedCardPosition();
      updatePointerTarget(event.clientX, event.clientY);
      event.preventDefault();
    }

    function onPointerUpCard(event) {
      if (!state.drag.active || event.pointerId !== state.drag.pointerId) {
        return;
      }

      window.removeEventListener("pointermove", onPointerMoveCard);
      window.removeEventListener("pointerup", onPointerUpCard);
      window.removeEventListener("pointercancel", onPointerUpCard);

      const fromIndex = state.drag.draggedIndex;
      const targetIndex = state.drag.targetIndex;
      const shouldMove =
        state.drag.moved &&
        fromIndex >= 0 &&
        targetIndex >= 0 &&
        targetIndex !== fromIndex;
      const insertIndex = shouldMove
        ? state.drag.dropBefore
          ? targetIndex
          : targetIndex + 1
        : -1;

      resetPointerState();

      if (shouldMove) {
        moveItem(fromIndex, insertIndex);
      }
    }

    async function copyText(text) {
      await navigator.clipboard.writeText(text);
    }

    copyJsonButton.addEventListener("click", () => copyText(jsonOutput.value));
    copyCodexButton.addEventListener("click", () => copyText(codexOutput.value));
    copyListButton.addEventListener("click", () => copyText(listOutput.value));

    renderAll();
  </script>
</body>
</html>`;
}

function buildIndexHtml({ entries }) {
  const rows = entries
    .map((entry) => {
      const fileName = `gallery-order-${entry.apartmentKey}.html`;
      const filePath = path.join(outputDir, fileName);
      const generated = fs.existsSync(filePath);
      const hasGallery = entry.count > 0;
      return `
        <tr>
          <td>${escapeHtml(entry.name)}</td>
          <td><code>${escapeHtml(entry.apartmentKey)}</code></td>
          <td>${escapeHtml(String(entry.count))}</td>
          <td>${hasGallery && generated ? `<a href="${escapeHtml(fileName)}">${escapeHtml(fileName)}</a>` : "<span class=\"muted\">nincs rendező HTML</span>"}</td>
          <td>${hasGallery ? (generated ? "<span class=\"ok\">készen van</span>" : "<span class=\"warn\">hiányzik</span>") : "<span class=\"warn\">Nincs gallery adat a registryben</span>"}</td>
        </tr>`;
    })
    .join("");

  const total = entries.length;
  const generatedCount = entries.filter((entry) => entry.count > 0 && fs.existsSync(path.join(outputDir, `gallery-order-${entry.apartmentKey}.html`))).length;

  return `<!doctype html>
<html lang="hu">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dandelion galéria rendező</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4efe6;
      --panel: #fffaf2;
      --text: #2f2a23;
      --muted: #716657;
      --border: rgba(95, 73, 47, 0.18);
      --accent: #86643d;
      --shadow: 0 18px 40px rgba(56, 40, 18, 0.12);
      --ok: #2f6b3a;
      --warn: #a84f2e;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top, rgba(255,255,255,0.9), transparent 36%),
        linear-gradient(180deg, var(--bg), #eee4d1 70%);
    }
    .shell { max-width: 1200px; margin: 0 auto; padding: 32px 20px 44px; }
    .hero {
      background: rgba(255, 250, 242, 0.92);
      border: 1px solid var(--border);
      border-radius: 20px;
      box-shadow: var(--shadow);
      padding: 24px;
    }
    h1 { margin: 0; font-size: clamp(2rem, 4vw, 3rem); line-height: 1.05; }
    .subtitle { margin: 10px 0 0; color: var(--muted); max-width: 78ch; line-height: 1.55; }
    .pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
    .pill {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 12px; border-radius: 999px;
      border: 1px solid var(--border); background: rgba(255,255,255,0.82);
    }
    .pill strong { color: var(--accent); }
    .tablewrap {
      margin-top: 20px;
      overflow: auto;
      background: rgba(255,255,255,0.8);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow);
    }
    table { width: 100%; border-collapse: collapse; min-width: 780px; }
    th, td { padding: 14px 16px; text-align: left; border-bottom: 1px solid rgba(95,73,47,0.12); vertical-align: middle; }
    th { color: var(--muted); font-size: 0.82rem; text-transform: uppercase; letter-spacing: 0.04em; background: rgba(255,250,242,0.92); }
    tr:last-child td { border-bottom: 0; }
    code {
      font-family: Consolas, "Liberation Mono", monospace;
      font-size: 0.9rem;
      padding: 3px 6px;
      border-radius: 8px;
      background: rgba(243, 235, 223, 0.9);
    }
    .muted { color: var(--muted); }
    .ok { color: var(--ok); font-weight: 700; }
    .warn { color: var(--warn); font-weight: 700; }
    .footer { margin-top: 18px; color: var(--muted); line-height: 1.5; }
    @media (max-width: 720px) {
      .shell { padding: 18px 12px 32px; }
      .hero { border-radius: 16px; padding: 18px; }
      .tablewrap { border-radius: 16px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <section class="hero">
      <h1>Dandelion galéria rendező</h1>
      <p class="subtitle">
        Helyi, újrafuttatható galéria-rendező központ. Innen lehet egy szállást külön megnyitni vagy az összes
        gallery-s apartman HTML-jét egyszerre előállítani. Az eszköz csak exportálja az új sorrendet, nem írja vissza
        automatikusan a registryt.
      </p>
      <div class="pills">
        <span class="pill"><strong>Összes szállás</strong> ${escapeHtml(String(total))}</span>
        <span class="pill"><strong>Rendező HTML-ek</strong> ${escapeHtml(String(generatedCount))}</span>
        <span class="pill"><strong>Forrás</strong> src/admin-disabled/data/images/accommodation-images.generated.json</span>
      </div>
      <p class="footer">A megnyitáshoz használd az <code>open-gallery-order-tool.bat</code> fájlt.</p>
    </section>

    <div class="tablewrap">
      <table>
        <thead>
          <tr>
            <th>Szállás neve</th>
            <th>apartmentKey</th>
            <th>Képek száma</th>
            <th>Rendező HTML</th>
            <th>Állapot</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  </div>
</body>
</html>`;
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const registry = readJson(registryPath);
  const seoPreview = loadSeoPreview();
  const nameMap = readAccommodationNames();

  const accommodations = [
    ...nameMap.keys(),
    ...Object.keys(registry).filter((key) => !nameMap.has(key))
  ];
  const galleryKeys = accommodations.filter(
    (key) => registry[key] && Array.isArray(registry[key].gallery) && registry[key].gallery.length > 0
  );

  const selectedKeys = args.all
    ? galleryKeys
    : args.apartmentKey && registry[args.apartmentKey] && Array.isArray(registry[args.apartmentKey].gallery) && registry[args.apartmentKey].gallery.length > 0
      ? [args.apartmentKey]
      : [];

  const skippedKeys = [];
  if (!args.all && args.apartmentKey && !selectedKeys.length) {
    skippedKeys.push(args.apartmentKey);
  }

  const generatedKeys = new Set();
  const indexEntries = [];

  for (const key of accommodations) {
    const entry = registry[key];
    const apartmentName = nameMap.get(key) || DISPLAY_NAME_FALLBACKS[key] || key;
    indexEntries.push({
      apartmentKey: key,
      name: apartmentName,
      count: entry && Array.isArray(entry.gallery) ? entry.gallery.length : 0
    });
  }

  for (const key of selectedKeys) {
    const entry = registry[key];
    const seoPreviewEntry = seoPreview[key];
    const apartmentName = nameMap.get(key) || DISPLAY_NAME_FALLBACKS[key] || key;
    const items = getGalleryEntries(entry, key, seoPreviewEntry);
    const filePath = path.join(outputDir, `gallery-order-${key}.html`);
    writeFile(
      filePath,
      buildPageHtml({
        apartmentKey: key,
        apartmentName,
        items,
        seoPreviewSource: Boolean(seoPreviewEntry)
      })
    );
    generatedKeys.add(key);
  }

  writeFile(
    path.join(outputDir, "index.html"),
    buildIndexHtml({ entries: indexEntries })
  );

  console.log(`Generated gallery tool pages: ${[...generatedKeys].join(", ") || "none"}`);
  console.log(`Index written: ${path.join(outputDir, "index.html")}`);
  if (skippedKeys.length) {
    console.log(`Skipped apartmentKeys: ${skippedKeys.join(", ")}`);
  }
}

main();
