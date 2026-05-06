import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const registryPath = path.join(projectRoot, "src", "data", "images", "accommodation-images.generated.json");
const outputDir = path.join(projectRoot, "project-docs", "gallery-order-tool");

function parseApartmentKey(argv) {
  const apartmentArg = argv.find((arg) => arg.startsWith("--apartment="));
  return apartmentArg ? apartmentArg.split("=", 2)[1].trim() : "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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

function buildExportArray(galleryItems) {
  return JSON.stringify(galleryItems.map((item) => getFilename(item.src)), null, 2);
}

function buildHtml({ apartmentKey, galleryItems }) {
  const exportJson = buildExportArray(galleryItems);
  const cardsHtml = galleryItems
    .map((item, index) => {
      const fileName = getFilename(item.src);
      const thumbUrl = relativePublicUrl(item.thumb || item.src);
      const fullUrl = relativePublicUrl(item.src);
      return `
        <article class="card" draggable="true" data-index="${index}" data-id="${escapeHtml(item.id ?? "")}" data-filename="${escapeHtml(fileName)}" data-sort-order="${escapeHtml(item.sortOrder ?? "")}">
          <div class="card__media">
            <img src="${escapeHtml(thumbUrl)}" alt="${escapeHtml(item.alt?.hu || fileName)}" loading="lazy" />
            <span class="card__order">${index + 1}</span>
          </div>
          <div class="card__meta">
            <div class="meta-row"><strong>id</strong><span>${escapeHtml(item.id ?? "n/a")}</span></div>
            <div class="meta-row"><strong>src</strong><span>${escapeHtml(fileName)}</span></div>
            <div class="meta-row"><strong>sortOrder</strong><span>${escapeHtml(item.sortOrder ?? "n/a")}</span></div>
            <div class="meta-row"><strong>preview</strong><a href="${escapeHtml(fullUrl)}" target="_blank" rel="noreferrer">open</a></div>
          </div>
        </article>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Gallery order tool - ${escapeHtml(apartmentKey)}</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4efe6;
      --panel: #fffaf2;
      --panel-2: #f0e7d8;
      --text: #2f2a23;
      --muted: #75695b;
      --accent: #87633e;
      --accent-strong: #664726;
      --border: rgba(95, 73, 47, 0.18);
      --shadow: 0 18px 40px rgba(56, 40, 18, 0.12);
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top, rgba(255,255,255,0.9), transparent 36%),
        linear-gradient(180deg, var(--bg), #eee4d1 70%);
      color: var(--text);
    }

    .shell {
      max-width: 1400px;
      margin: 0 auto;
      padding: 32px 20px 48px;
    }

    .topbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px 18px;
      align-items: end;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    h1 {
      margin: 0;
      font-size: clamp(1.8rem, 3vw, 2.6rem);
      line-height: 1.05;
    }

    .subtitle {
      margin: 8px 0 0;
      color: var(--muted);
      max-width: 68ch;
    }

    .pillrow {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 14px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: rgba(255,255,255,0.72);
      box-shadow: 0 8px 22px rgba(55, 42, 18, 0.08);
      font-size: 0.92rem;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin: 18px 0 20px;
    }

    button, textarea {
      font: inherit;
    }

    .button {
      appearance: none;
      border: 0;
      border-radius: 12px;
      padding: 12px 16px;
      background: var(--accent);
      color: #fff;
      box-shadow: var(--shadow);
      cursor: pointer;
    }

    .button:hover { background: var(--accent-strong); }

    .button.secondary {
      background: var(--panel);
      color: var(--accent-strong);
      border: 1px solid var(--border);
      box-shadow: none;
    }

    .status {
      color: var(--muted);
      font-size: 0.94rem;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
    }

    .card {
      display: flex;
      flex-direction: column;
      border-radius: 18px;
      overflow: hidden;
      background: var(--panel);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      cursor: grab;
      user-select: none;
    }

    .card:active {
      cursor: grabbing;
    }

    .card.is-dragging {
      opacity: 0.55;
      transform: scale(0.99);
    }

    .card__media {
      position: relative;
      aspect-ratio: 4 / 3;
      background: #ddd4c4;
    }

    .card__media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .card__order {
      position: absolute;
      top: 10px;
      left: 10px;
      min-width: 44px;
      padding: 8px 10px;
      border-radius: 999px;
      background: rgba(47, 42, 35, 0.8);
      color: #fff;
      font-weight: 700;
      text-align: center;
    }

    .card__meta {
      display: grid;
      gap: 8px;
      padding: 14px 14px 16px;
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: baseline;
      font-size: 0.86rem;
    }

    .meta-row strong {
      color: var(--accent-strong);
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 0.73rem;
      flex: 0 0 auto;
    }

    .meta-row span,
    .meta-row a {
      color: var(--text);
      overflow-wrap: anywhere;
      text-align: right;
    }

    .export {
      margin-top: 20px;
      display: grid;
      gap: 10px;
    }

    .export__label {
      font-weight: 700;
      color: var(--accent-strong);
    }

    textarea {
      width: 100%;
      min-height: 180px;
      border-radius: 16px;
      border: 1px solid var(--border);
      padding: 16px;
      background: #fffdf8;
      color: var(--text);
      resize: vertical;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
    }

    @media (max-width: 700px) {
      .shell {
        padding-inline: 14px;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .toolbar {
        align-items: stretch;
      }

      .button {
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <main class="shell">
    <header>
      <div class="topbar">
        <div>
          <h1>Gallery order tool</h1>
          <p class="subtitle">Helyi drag-and-drop galéria rendező a köveskálos dolgozáshoz. A lista sorrendje húzással változtatható, majd exportálható géppel feldolgozható JSON tömbként.</p>
        </div>
      </div>
      <div class="pillrow">
        <span class="pill"><strong>apartmentKey</strong> ${escapeHtml(apartmentKey)}</span>
        <span class="pill"><strong>képek</strong> ${galleryItems.length}</span>
        <span class="pill"><strong>forrás</strong> src/data/images/accommodation-images.generated.json</span>
      </div>
    </header>

    <div class="toolbar">
      <button id="copy-order" class="button" type="button">Sorrend másolása</button>
      <button id="reset-order" class="button secondary" type="button">Eredeti sorrend</button>
      <span id="status" class="status">Kész a rendezésre.</span>
    </div>

    <section id="grid" class="grid" aria-label="Galéria elemek">
      ${cardsHtml}
    </section>

    <section class="export">
      <div class="export__label">Export formátum</div>
      <textarea id="export-output" spellcheck="false" readonly>${escapeHtml(exportJson)}</textarea>
    </section>
  </main>

  <script>
    const grid = document.getElementById("grid");
    const exportOutput = document.getElementById("export-output");
    const status = document.getElementById("status");
    const copyButton = document.getElementById("copy-order");
    const resetButton = document.getElementById("reset-order");
    const originalHtml = grid.innerHTML;

    function updateOrderNumbers() {
      const cards = Array.from(grid.querySelectorAll(".card"));
      cards.forEach((card, index) => {
        card.dataset.index = String(index);
        const badge = card.querySelector(".card__order");
        if (badge) {
          badge.textContent = String(index + 1);
        }
      });
    }

    function readExportArray() {
      return Array.from(grid.querySelectorAll(".card")).map((card) => card.dataset.filename);
    }

    function syncExport() {
      const order = readExportArray();
      exportOutput.value = JSON.stringify(order, null, 2);
      updateOrderNumbers();
    }

    function moveCard(sourceCard, targetCard, pointerY) {
      if (!sourceCard || !targetCard || sourceCard === targetCard) {
        return;
      }

      const rect = targetCard.getBoundingClientRect();
      const before = (pointerY || 0) < rect.top + rect.height / 2;
      if (before) {
        grid.insertBefore(sourceCard, targetCard);
      } else {
        grid.insertBefore(sourceCard, targetCard.nextSibling);
      }
    }

    let draggedCard = null;

    grid.addEventListener("dragstart", (event) => {
      const card = event.target.closest(".card");
      if (!card) {
        return;
      }
      draggedCard = card;
      card.classList.add("is-dragging");
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", card.dataset.filename || "");
    });

    grid.addEventListener("dragend", () => {
      if (draggedCard) {
        draggedCard.classList.remove("is-dragging");
      }
      draggedCard = null;
      syncExport();
      status.textContent = "Sorrend frissítve.";
    });

    grid.addEventListener("dragover", (event) => {
      event.preventDefault();
      const targetCard = event.target.closest(".card");
      if (!draggedCard || !targetCard) {
        return;
      }
      moveCard(draggedCard, targetCard, event.clientY);
    });

    copyButton.addEventListener("click", async () => {
      syncExport();
      const text = exportOutput.value;
      try {
        await navigator.clipboard.writeText(text);
        status.textContent = "A sorrend a vágólapra másolva.";
      } catch {
        exportOutput.focus();
        exportOutput.select();
        document.execCommand("copy");
        status.textContent = "A sorrend kijelölve, másolható.";
      }
    });

    resetButton.addEventListener("click", () => {
      grid.innerHTML = originalHtml;
      syncExport();
      status.textContent = "Eredeti sorrend visszaállítva.";
    });

    syncExport();
  </script>
</body>
</html>`;
}

function main() {
  const apartmentKey = parseApartmentKey(process.argv.slice(2));
  if (!apartmentKey) {
    console.error("Usage: node scripts/generate-gallery-order-tool.mjs --apartment=d2");
    process.exit(1);
  }

  const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  const apartment = registry[apartmentKey];

  if (!apartment || !Array.isArray(apartment.gallery) || !apartment.gallery.length) {
    console.error(`No gallery data found for apartmentKey=${apartmentKey}`);
    process.exit(1);
  }

  const galleryItems = apartment.gallery.slice().sort((left, right) => (left.sortOrder || 0) - (right.sortOrder || 0));

  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `gallery-order-${apartmentKey}.html`);
  fs.writeFileSync(outputPath, buildHtml({ apartmentKey, galleryItems }), "utf8");

  console.log(`Generated ${outputPath}`);
  console.log(`Gallery items: ${galleryItems.length}`);
  console.log(`Registry source: ${registryPath}`);
}

main();
