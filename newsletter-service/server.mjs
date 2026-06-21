import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";

const PORT = Number.parseInt(process.env.NEWSLETTER_PORT ?? "3876", 10);
const HOST = process.env.NEWSLETTER_HOST ?? "127.0.0.1";
const STORAGE_PATH = process.env.NEWSLETTER_STORAGE_PATH ?? join("data", "newsletter-db.json");
const PUBLIC_BASE_URL = process.env.NEWSLETTER_PUBLIC_BASE_URL ?? "http://localhost:3876";
const SMTP_HOST = process.env.NEWSLETTER_SMTP_HOST ?? "mail.dandelionhouse.hu";
const SMTP_PORT = Number.parseInt(process.env.NEWSLETTER_SMTP_PORT ?? "587", 10);
const SMTP_SECURE = String(process.env.NEWSLETTER_SMTP_SECURE ?? "false").toLowerCase() === "true";
const SMTP_USER = process.env.NEWSLETTER_SMTP_USER ?? "newsletter@dandelionhouse.hu";
const SMTP_PASSWORD = process.env.NEWSLETTER_SMTP_PASSWORD ?? "";
const SMTP_FROM = process.env.NEWSLETTER_SMTP_FROM ?? "\"Dandelion hírlevél\" <newsletter@dandelionhouse.hu>";
const SMTP_REPLY_TO = process.env.NEWSLETTER_SMTP_REPLY_TO ?? "hello@dandelionhouse.hu";
const ADMIN_PASSWORD = process.env.NEWSLETTER_ADMIN_PASSWORD ?? "";

const DEFAULT_STATE = {
  subscribers: [],
  campaigns: [],
  deliveries: [],
};

const smtpTransport = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

async function readState() {
  try {
    const raw = await readFile(STORAGE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return {
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
      campaigns: Array.isArray(parsed.campaigns) ? parsed.campaigns : [],
      deliveries: Array.isArray(parsed.deliveries) ? parsed.deliveries : [],
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

async function writeState(state) {
  await mkdir(dirname(STORAGE_PATH), { recursive: true });
  await writeFile(STORAGE_PATH, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

function jsonResponse(res, statusCode, body) {
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Newsletter-Admin-Password",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  });
  res.end(payload);
}

function textResponse(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Newsletter-Admin-Password",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  });
  res.end(body);
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}

function parseCsv(text) {
  const rows = [];
  const input = String(text ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if (char === "\n" && !inQuotes) {
      row.push(current);
      if (row.some((cell) => String(cell).trim() !== "")) {
        rows.push(row);
      }
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  row.push(current);
  if (row.some((cell) => String(cell).trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

function parseSubscriberImportRows(rows) {
  if (!Array.isArray(rows) || !rows.length) {
    throw new Error("CSV rows are required.");
  }

  const normalizedRows = [];

  for (const row of rows) {
    if (!row || typeof row !== "object") {
      continue;
    }

    try {
      const email = validateEmail(row.email ?? row.e_mail ?? row["e-mail"] ?? row["email address"]);
      const name = String(row.name ?? row.nev ?? row["név"] ?? row.fullName ?? "").trim().slice(0, 120);
      const lang = String(row.lang ?? row.language ?? row.nyelv ?? "hu").trim().slice(0, 12) || "hu";
      const source = String(row.source ?? row.forras ?? row["forrás"] ?? "csv-import").trim().slice(0, 120) || "csv-import";
      const statusRaw = String(row.status ?? row.stausz ?? row["státusz"] ?? "active").trim().toLowerCase();
      const status = ["active", "pending", "unsubscribed"].includes(statusRaw) ? statusRaw : "active";
      normalizedRows.push({ email, name, lang, source, status });
    } catch {
      // Skip malformed rows so one bad record does not abort the whole import.
    }
  }

  return normalizedRows;
}

function upsertImportedSubscriber(state, row) {
  const existing = findSubscriber(state, row.email);
  const timestamp = nowIso();

  if (existing) {
    existing.name = row.name || existing.name;
    existing.lang = row.lang || existing.lang || "hu";
    existing.source = row.source || existing.source || "csv-import";
    existing.status = row.status || existing.status || "active";
    existing.updatedAt = timestamp;
    existing.consentUpdatedAt = existing.consentUpdatedAt || timestamp;
    existing.consentAccepted = true;
    existing.unsubscribeToken = existing.unsubscribeToken || randomUUID();
    return { mode: "updated", subscriber: existing };
  }

  const subscriber = {
    id: randomUUID(),
    email: row.email,
    name: row.name,
    lang: row.lang || "hu",
    source: row.source || "csv-import",
    status: row.status || "active",
    consentAccepted: true,
    consentCreatedAt: timestamp,
    consentUpdatedAt: timestamp,
    createdAt: timestamp,
    updatedAt: timestamp,
    unsubscribeToken: randomUUID(),
  };

  state.subscribers.push(subscriber);
  return { mode: "created", subscriber };
}

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

function nowIso() {
  return new Date().toISOString();
}

function publicCampaignUrl(id) {
  return `${PUBLIC_BASE_URL.replace(/\/$/, "")}/campaigns/${id}`;
}

function publicUnsubscribeUrl(token) {
  return `${PUBLIC_BASE_URL.replace(/\/$/, "")}/unsubscribe/${token}`;
}

function findSubscriber(state, email) {
  const normalized = normalizeEmail(email);
  return state.subscribers.find((subscriber) => subscriber.email === normalized);
}

function ensureString(value, label, minLength = 1, maxLength = 200) {
  const normalized = String(value ?? "").trim();
  if (normalized.length < minLength) {
    throw new Error(`${label} is required.`);
  }

  if (normalized.length > maxLength) {
    throw new Error(`${label} is too long.`);
  }

  return normalized;
}

function validateEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new Error("A valid e-mail address is required.");
  }
  return normalized;
}

function hasSmtpCredentials() {
  return Boolean(SMTP_HOST && SMTP_USER && SMTP_PASSWORD);
}

function hasAdminCredentials() {
  return Boolean(ADMIN_PASSWORD);
}

function isAdminAuthorized(req) {
  if (!hasAdminCredentials()) {
    return true;
  }

  return String(req.headers["x-newsletter-admin-password"] ?? "") === ADMIN_PASSWORD;
}

function requireAdminAuth(req, res) {
  if (isAdminAuthorized(req)) {
    return true;
  }

  jsonResponse(res, 401, { ok: false, message: "Admin authorization required." });
  return false;
}

function buildHtmlEmail(campaign, subscriber) {
  const unsubscribeUrl = publicUnsubscribeUrl(subscriber.unsubscribeToken);
  return `<!doctype html>
<html lang=\"hu\">
  <body style=\"font-family:Arial,sans-serif;line-height:1.5;color:#2b241c;\">
    <h1 style=\"font-size:22px;\">${escapeHtml(campaign.subject)}</h1>
    <div>${campaign.html}</div>
    <hr />
    <p style=\"font-size:12px;color:#6b6258;\">Ha nem szeretnél több levelet kapni, itt tudsz leiratkozni: <a href=\"${unsubscribeUrl}\">${unsubscribeUrl}</a></p>
  </body>
</html>`;
}

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendCampaignEmail(campaign, subscriber) {
  if (!hasSmtpCredentials()) {
    throw new Error("SMTP configuration is missing.");
  }

  const message = await smtpTransport.sendMail({
    from: SMTP_FROM,
    to: subscriber.email,
    replyTo: SMTP_REPLY_TO,
    subject: campaign.subject,
    text: campaign.text || stripHtml(campaign.html),
    html: buildHtmlEmail(campaign, subscriber),
  });

  return message;
}

function stripHtml(html) {
  return String(html)
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function handleRequest(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Newsletter-Admin-Password",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    });
    res.end();
    return;
  }

  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const state = await readState();

  if (req.method === "GET" && url.pathname === "/health") {
    jsonResponse(res, 200, {
      ok: true,
      service: "dandelion-newsletter-service",
      storagePath: STORAGE_PATH,
      publicBaseUrl: PUBLIC_BASE_URL,
      smtp: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        user: SMTP_USER,
        configured: hasSmtpCredentials(),
      },
      counts: {
        subscribers: state.subscribers.length,
        campaigns: state.campaigns.length,
        deliveries: state.deliveries.length,
      },
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/subscribers") {
    if (!requireAdminAuth(req, res)) {
      return;
    }
    jsonResponse(res, 200, { ok: true, subscribers: state.subscribers });
    return;
  }

  if (req.method === "POST" && url.pathname === "/subscribers/import") {
    if (!requireAdminAuth(req, res)) {
      return;
    }

    try {
      const body = await readJsonBody(req);
      const rows = Array.isArray(body.rows) ? body.rows : [];
      const parsedRows = parseSubscriberImportRows(rows);

      if (!parsedRows.length) {
        jsonResponse(res, 400, { ok: false, message: "CSV import requires at least one valid row." });
        return;
      }

      const result = {
        totalRows: rows.length,
        created: 0,
        updated: 0,
        skipped: rows.length - parsedRows.length,
      };

      for (const row of parsedRows) {
        try {
          const outcome = upsertImportedSubscriber(state, row);
          result[outcome.mode] += 1;
        } catch {
          result.skipped += 1;
        }
      }

      await writeState(state);

      jsonResponse(res, 200, {
        ok: true,
        message: `CSV import kész: ${result.created} új, ${result.updated} frissített, ${result.skipped} kihagyott.`,
        result,
      });
    } catch (error) {
      jsonResponse(res, 400, { ok: false, message: error instanceof Error ? error.message : "CSV import failed." });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/subscribers") {
    try {
      const body = await readJsonBody(req);
      const email = validateEmail(body.email);
      const name = String(body.name ?? "").trim().slice(0, 120);
      const lang = String(body.lang ?? "hu").trim().slice(0, 12) || "hu";
      const source = String(body.source ?? "newsletter-signup").trim().slice(0, 120) || "newsletter-signup";
      const consent = body.consent === true || body.consent === "true" || body.consent === "on";

      if (!consent) {
        jsonResponse(res, 400, { ok: false, message: "Consent is required." });
        return;
      }

      const existing = findSubscriber(state, email);
      const timestamp = nowIso();

      if (existing) {
        existing.name = name || existing.name;
        existing.lang = lang;
        existing.source = source;
        existing.status = "active";
        existing.updatedAt = timestamp;
        existing.consentUpdatedAt = timestamp;
        existing.unsubscribeToken = existing.unsubscribeToken || randomUUID();
        await writeState(state);

        jsonResponse(res, 200, {
          ok: true,
          message: "Feliratkozas frissitve.",
          subscriber: existing,
          unsubscribeUrl: `${PUBLIC_BASE_URL.replace(/\/$/, "")}/unsubscribe/${existing.unsubscribeToken}`,
        });
        return;
      }

      const subscriber = {
        id: randomUUID(),
        email,
        name,
        lang,
        source,
        status: "active",
        consentAccepted: true,
        consentCreatedAt: timestamp,
        consentUpdatedAt: timestamp,
        createdAt: timestamp,
        updatedAt: timestamp,
        unsubscribeToken: randomUUID(),
      };

      state.subscribers.push(subscriber);
      await writeState(state);

      jsonResponse(res, 201, {
        ok: true,
        message: "Feliratkozas mentve.",
        subscriber,
        unsubscribeUrl: `${PUBLIC_BASE_URL.replace(/\/$/, "")}/unsubscribe/${subscriber.unsubscribeToken}`,
      });
    } catch (error) {
      jsonResponse(res, 400, { ok: false, message: error instanceof Error ? error.message : "Invalid request." });
    }
    return;
  }

  if ((req.method === "POST" || req.method === "GET") && url.pathname.startsWith("/unsubscribe/")) {
    const token = url.pathname.split("/").pop() ?? "";
    const subscriber = state.subscribers.find((entry) => entry.unsubscribeToken === token);

    if (!subscriber) {
      if (req.method === "GET") {
        textResponse(res, 404, "Unsubscribe token not found.");
      } else {
        jsonResponse(res, 404, { ok: false, message: "Unsubscribe token not found." });
      }
      return;
    }

    subscriber.status = "unsubscribed";
    subscriber.updatedAt = nowIso();
    await writeState(state);

    if (req.method === "GET") {
      textResponse(
        res,
        200,
        "Leiratkozas sikeres. You have been unsubscribed from the Dandelion newsletter."
      );
      return;
    }

    jsonResponse(res, 200, { ok: true, message: "Leiratkozas sikeres.", subscriber });
    return;
  }

  if (req.method === "GET" && url.pathname === "/campaigns") {
    if (!requireAdminAuth(req, res)) {
      return;
    }
    jsonResponse(res, 200, { ok: true, campaigns: state.campaigns });
    return;
  }

  if (req.method === "POST" && url.pathname === "/admin/auth") {
    if (!hasAdminCredentials() || isAdminAuthorized(req)) {
      jsonResponse(res, 200, { ok: true, message: "Admin authorized.", protected: hasAdminCredentials() });
    } else {
      jsonResponse(res, 401, { ok: false, message: "Invalid admin password." });
    }
    return;
  }

  if (req.method === "GET" && url.pathname === "/smtp/status") {
    if (!requireAdminAuth(req, res)) {
      return;
    }
    jsonResponse(res, 200, {
      ok: true,
      smtp: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_SECURE,
        user: SMTP_USER,
        configured: hasSmtpCredentials(),
      },
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/smtp/test") {
    if (!requireAdminAuth(req, res)) {
      return;
    }
    try {
      const body = await readJsonBody(req);
      const to = validateEmail(body.to ?? SMTP_USER);
      const subject = ensureString(body.subject ?? "Dandelion SMTP teszt", "subject", 3, 160);
      const text = String(body.text ?? "Ez egy SMTP teszt a Dandelion newsletter service-bol.").trim();

      if (!hasSmtpCredentials()) {
        jsonResponse(res, 400, { ok: false, message: "SMTP configuration is missing." });
        return;
      }

      const info = await smtpTransport.sendMail({
        from: SMTP_FROM,
        to,
        replyTo: SMTP_REPLY_TO,
        subject,
        text,
        html: `<p>${escapeHtml(text)}</p>`,
      });

      jsonResponse(res, 200, { ok: true, message: "SMTP test sent.", messageId: info.messageId });
    } catch (error) {
      jsonResponse(res, 400, { ok: false, message: error instanceof Error ? error.message : "SMTP test failed." });
    }
    return;
  }

  if (req.method === "GET" && url.pathname.match(/^\/campaigns\/[^/]+$/)) {
    if (!requireAdminAuth(req, res)) {
      return;
    }
    const campaignId = url.pathname.split("/")[2];
    const campaign = state.campaigns.find((entry) => entry.id === campaignId);

    if (!campaign) {
      jsonResponse(res, 404, { ok: false, message: "Campaign not found." });
      return;
    }

    jsonResponse(res, 200, { ok: true, campaign });
    return;
  }

  if (req.method === "POST" && url.pathname === "/campaigns") {
    if (!requireAdminAuth(req, res)) {
      return;
    }
    try {
      const body = await readJsonBody(req);
      const subject = ensureString(body.subject, "subject", 3, 160);
      const html = ensureString(body.html, "html", 1, 200000);
      const text = String(body.text ?? "").trim().slice(0, 200000);
      const audience = Array.isArray(body.audience) ? body.audience.map((item) => String(item).trim()).filter(Boolean) : [];
      const campaign = {
        id: randomUUID(),
        subject,
        html,
        text,
        audience,
        status: "draft",
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };

      state.campaigns.push(campaign);
      await writeState(state);

      jsonResponse(res, 201, { ok: true, campaign, url: publicCampaignUrl(campaign.id) });
    } catch (error) {
      jsonResponse(res, 400, { ok: false, message: error instanceof Error ? error.message : "Invalid campaign." });
    }
    return;
  }

  if (req.method === "POST" && url.pathname.match(/^\/campaigns\/[^/]+\/send$/)) {
    if (!requireAdminAuth(req, res)) {
      return;
    }
    const campaignId = url.pathname.split("/")[2];
    const campaign = state.campaigns.find((entry) => entry.id === campaignId);

    if (!campaign) {
      jsonResponse(res, 404, { ok: false, message: "Campaign not found." });
      return;
    }

    if (!hasSmtpCredentials()) {
      jsonResponse(res, 400, { ok: false, message: "SMTP configuration is missing." });
      return;
    }

    const activeSubscribers = state.subscribers.filter((subscriber) => subscriber.status === "active");
    const timestamp = nowIso();
    const deliveries = [];

    for (const subscriber of activeSubscribers) {
      try {
        const info = await sendCampaignEmail(campaign, subscriber);
        deliveries.push({
          id: randomUUID(),
          campaignId: campaign.id,
          subscriberId: subscriber.id,
          email: subscriber.email,
          deliveryMode: "smtp",
          status: "sent",
          messageId: info.messageId ?? null,
          createdAt: timestamp,
          sentAt: nowIso(),
        });
      } catch (error) {
        deliveries.push({
          id: randomUUID(),
          campaignId: campaign.id,
          subscriberId: subscriber.id,
          email: subscriber.email,
          deliveryMode: "smtp",
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown SMTP error",
          createdAt: timestamp,
          sentAt: nowIso(),
        });
      }
    }

    state.deliveries.push(...deliveries);

    campaign.status = "sent";
    campaign.sentAt = timestamp;
    campaign.updatedAt = timestamp;

    await writeState(state);

    jsonResponse(res, 200, {
      ok: true,
      message: "Campaign processed via SMTP.",
      campaign,
      recipientCount: activeSubscribers.length,
      deliveryMode: "smtp",
      sentCount: deliveries.filter((delivery) => delivery.status === "sent").length,
      failedCount: deliveries.filter((delivery) => delivery.status === "failed").length,
    });
    return;
  }

  textResponse(res, 404, "Not found");
}

const server = createServer((req, res) => {
  handleRequest(req, res).catch((error) => {
    console.error("[newsletter-service]", error);
    jsonResponse(res, 500, { ok: false, message: "Internal server error." });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Newsletter service listening on http://${HOST}:${PORT}`);
});
