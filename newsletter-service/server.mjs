import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return;
  }

  const raw = readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, equalsIndex).trim();
    if (!key || process.env[key] !== undefined) {
      continue;
    }

    let value = trimmed.slice(equalsIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

loadEnvFile(join(process.cwd(), ".env"));
loadEnvFile(join(process.cwd(), ".env.local"));

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
const ADMIN_PASSWORD_HASH =
  process.env.NEWSLETTER_ADMIN_PASSWORD_HASH ?? "9ff69e683a9cc5424f7246fa514a1bd488b5b51ab40fd1c9321cb1634b09ea1a";
const ADMIN_RP_NAME = "Dandelion admin";
const ADMIN_USER_ID = fromUtf8("dandelion-admin");
const ADMIN_USER_NAME = "dandelion-admin";
const ADMIN_USER_DISPLAY_NAME = "Dandelion admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const CHALLENGE_TTL_MS = 1000 * 5 * 60;

const DEFAULT_STATE = {
  subscribers: [],
  campaigns: [],
  deliveries: [],
  auth: {
    credentials: [],
    sessions: [],
    challenges: [],
  },
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
    const auth = normalizeAuthState(parsed.auth);
    return {
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
      campaigns: Array.isArray(parsed.campaigns) ? parsed.campaigns : [],
      deliveries: Array.isArray(parsed.deliveries) ? parsed.deliveries : [],
      auth,
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
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Newsletter-Admin-Password, X-Newsletter-Admin-Session",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  });
  res.end(payload);
}

function textResponse(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Newsletter-Admin-Password, X-Newsletter-Admin-Session",
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
  const firstLine = input.split("\n", 1)[0] ?? "";
  const delimiter = (firstLine.match(/\t/g) || []).length > (firstLine.match(/,/g) || []).length ? "\t" : ",";
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

    if (char === delimiter && !inQuotes) {
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
      const email = validateEmail(
        row.email ??
          row.e_mail ??
          row["e-mail"] ??
          row["email address"] ??
          row["E-mail"] ??
          row["E-Mail"]
      );
      const name = String(
        row.name ?? row.nev ?? row["név"] ?? row.fullName ?? row["full name"] ?? row["Név"] ?? ""
      )
        .trim()
        .slice(0, 120);
      const lang = String(row.lang ?? row.language ?? row.nyelv ?? row["nyelv"] ?? "hu").trim().slice(0, 12) || "hu";
      const source = String(
        row.source ?? row.forras ?? row["forrás"] ?? row.haz ?? row["ház"] ?? row.house ?? "csv-import"
      )
        .trim()
        .slice(0, 120) || "csv-import";
      const statusRaw = String(row.status ?? row.stausz ?? row["státusz"] ?? row.allapot ?? row["állapot"] ?? "active")
        .trim()
        .toLowerCase();
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

function nowMs() {
  return Date.now();
}

function fromUtf8(value) {
  return Buffer.from(String(value), "utf8").toString("base64url");
}

function toUtf8(base64urlValue) {
  return Buffer.from(String(base64urlValue ?? ""), "base64url").toString("utf8");
}

function toBase64Url(buffer) {
  if (buffer instanceof Uint8Array) {
    return Buffer.from(buffer).toString("base64url");
  }

  if (Array.isArray(buffer)) {
    return Buffer.from(buffer).toString("base64url");
  }

  return Buffer.from(buffer ?? []).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(String(value ?? ""), "base64url");
}

function normalizeAuthState(auth) {
  const source = auth && typeof auth === "object" ? auth : {};
  const credentials = Array.isArray(source.credentials) ? source.credentials : [];
  const sessions = Array.isArray(source.sessions) ? source.sessions : [];
  const challenges = Array.isArray(source.challenges) ? source.challenges : [];
  const timestamp = nowMs();

  return {
    credentials: credentials
      .map((credential) => {
        if (!credential || typeof credential !== "object") {
          return null;
        }

        const id = String(credential.id ?? "").trim();
        const publicKey = String(credential.publicKey ?? "").trim();
        if (!id || !publicKey) {
          return null;
        }

        return {
          id,
          publicKey,
          counter: Number.isFinite(Number(credential.counter)) ? Number(credential.counter) : 0,
          transports: Array.isArray(credential.transports) ? credential.transports : [],
          createdAt: String(credential.createdAt ?? nowIso()),
          lastUsedAt: String(credential.lastUsedAt ?? credential.createdAt ?? nowIso()),
        };
      })
      .filter(Boolean),
    sessions: sessions
      .map((session) => {
        if (!session || typeof session !== "object") {
          return null;
        }

        const token = String(session.token ?? "").trim();
        const expiresAt = Number(session.expiresAt ?? 0);
        if (!token || !Number.isFinite(expiresAt) || expiresAt <= timestamp) {
          return null;
        }

        return {
          token,
          createdAt: String(session.createdAt ?? nowIso()),
          expiresAt,
          lastUsedAt: String(session.lastUsedAt ?? session.createdAt ?? nowIso()),
          method: String(session.method ?? "password"),
          credentialId: String(session.credentialId ?? ""),
        };
      })
      .filter(Boolean),
    challenges: challenges
      .map((challenge) => {
        if (!challenge || typeof challenge !== "object") {
          return null;
        }

        const id = String(challenge.id ?? "").trim();
        const challengeValue = String(challenge.challenge ?? "").trim();
        const type = String(challenge.type ?? "").trim();
        const origin = String(challenge.origin ?? "").trim();
        const rpID = String(challenge.rpID ?? "").trim();
        const expiresAt = Number(challenge.expiresAt ?? 0);
        if (!id || !challengeValue || !type || !origin || !rpID || !Number.isFinite(expiresAt) || expiresAt <= timestamp) {
          return null;
        }

        return {
          id,
          type,
          challenge: challengeValue,
          origin,
          rpID,
          expiresAt,
          createdAt: String(challenge.createdAt ?? nowIso()),
        };
      })
      .filter(Boolean),
  };
}

function getRequestOrigin(req) {
  const origin = String(req.headers.origin ?? "").trim();
  if (origin) {
    return origin.replace(/\/$/, "");
  }

  const host = String(req.headers.host ?? "").trim();
  if (!host) {
    return "";
  }

  return `http://${host}`.replace(/\/$/, "");
}

function getRequestRpId(req) {
  const origin = getRequestOrigin(req);
  if (!origin) {
    return "localhost";
  }

  try {
    return new URL(origin).hostname;
  } catch {
    return "localhost";
  }
}

function pruneExpiredAuthState(state) {
  const auth = normalizeAuthState(state.auth);
  state.auth = auth;
  return state;
}

function hasAuthSessions(state) {
  return Array.isArray(state.auth?.sessions) && state.auth.sessions.length > 0;
}

function issueAdminSession(state, method, credentialId = "") {
  state.auth.sessions = state.auth.sessions.filter((entry) => Number(entry.expiresAt ?? 0) > nowMs()).slice(-9);
  const token = randomUUID();
  const timestamp = nowMs();
  const session = {
    token,
    createdAt: nowIso(),
    lastUsedAt: nowIso(),
    expiresAt: timestamp + SESSION_TTL_MS,
    method,
    credentialId,
  };

  state.auth.sessions.push(session);
  return session;
}

function consumeChallenge(state, requestId, type) {
  const index = state.auth.challenges.findIndex((item) => item.id === requestId && item.type === type);
  if (index < 0) {
    return null;
  }

  const [challenge] = state.auth.challenges.splice(index, 1);
  return challenge;
}

function getChallengeResponseOrigin(req, challenge) {
  const origin = getRequestOrigin(req);
  if (origin) {
    return origin;
  }

  return challenge?.origin ?? "";
}

function getAuthCredentialById(state, credentialId) {
  return state.auth.credentials.find((credential) => credential.id === credentialId);
}

function storeAdminCredential(state, credentialRecord) {
  const existingIndex = state.auth.credentials.findIndex((credential) => credential.id === credentialRecord.id);
  if (existingIndex >= 0) {
    state.auth.credentials[existingIndex] = credentialRecord;
    return;
  }

  state.auth.credentials.push(credentialRecord);
}

function hasRegisteredPasskey(state) {
  return Array.isArray(state.auth?.credentials) && state.auth.credentials.length > 0;
}

function createAdminChallenge(state, type, origin, rpID) {
  const requestId = randomUUID();
  const challenge = randomUUID().replaceAll("-", "");
  const record = {
    id: requestId,
    type,
    challenge,
    origin,
    rpID,
    createdAt: nowIso(),
    expiresAt: nowMs() + CHALLENGE_TTL_MS,
  };

  state.auth.challenges.push(record);
  return record;
}

function serializeCredential(credential) {
  return {
    id: credential.id,
    publicKey: toBase64Url(credential.publicKey),
    counter: Number(credential.counter ?? 0),
    transports: Array.isArray(credential.transports) ? credential.transports : [],
    createdAt: credential.createdAt ?? nowIso(),
    lastUsedAt: credential.lastUsedAt ?? credential.createdAt ?? nowIso(),
  };
}

function buildVerifiedSessionResponse(session, extra = {}) {
  return {
    ok: true,
    sessionToken: session.token,
    expiresAt: session.expiresAt,
    ...extra,
  };
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

function sha256Hex(value) {
  return createHash("sha256").update(String(value ?? ""), "utf8").digest("hex");
}

function hasAdminCredentials() {
  return Boolean(ADMIN_PASSWORD || ADMIN_PASSWORD_HASH);
}

function getAdminSessionToken(req) {
  return String(req.headers["x-newsletter-admin-session"] ?? "").trim();
}

function isSessionAuthorized(state, req) {
  const token = getAdminSessionToken(req);
  if (!token || !Array.isArray(state.auth?.sessions)) {
    return false;
  }

  const session = state.auth.sessions.find((entry) => entry.token === token);
  if (!session) {
    return false;
  }

  if (Number(session.expiresAt ?? 0) <= nowMs()) {
    return false;
  }

  session.lastUsedAt = nowIso();
  return true;
}

function isAdminAuthorized(state, req) {
  if (!hasAdminCredentials()) {
    return isSessionAuthorized(state, req);
  }

  const providedPassword = String(req.headers["x-newsletter-admin-password"] ?? "");
  const passwordAuthorized = ADMIN_PASSWORD
    ? providedPassword === ADMIN_PASSWORD
    : sha256Hex(providedPassword) === ADMIN_PASSWORD_HASH;
  return passwordAuthorized || isSessionAuthorized(state, req);
}

function requireAdminAuth(state, req, res) {
  if (isAdminAuthorized(state, req)) {
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
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Newsletter-Admin-Password, X-Newsletter-Admin-Session",
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
    if (!requireAdminAuth(state, req, res)) {
      return;
    }
    jsonResponse(res, 200, { ok: true, subscribers: state.subscribers });
    return;
  }

  if (req.method === "POST" && url.pathname === "/subscribers/import") {
    if (!requireAdminAuth(state, req, res)) {
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
    if (!requireAdminAuth(state, req, res)) {
      return;
    }
    jsonResponse(res, 200, { ok: true, campaigns: state.campaigns });
    return;
  }

  if (req.method === "POST" && url.pathname === "/admin/auth") {
    if (isAdminAuthorized(state, req)) {
      const session = issueAdminSession(state, "password");
      await writeState(state);
      jsonResponse(res, 200, {
        ok: true,
        message: "Admin authorized.",
        protected: hasAdminCredentials(),
        sessionToken: session.token,
        expiresAt: session.expiresAt,
      });
    } else {
      jsonResponse(res, 401, { ok: false, message: "Invalid admin password." });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/admin/passkey/register/options") {
    if (!requireAdminAuth(state, req, res)) {
      return;
    }

    const origin = getRequestOrigin(req);
    if (!origin) {
      jsonResponse(res, 400, { ok: false, message: "A böngésző origin fejlécét nem kaptam meg." });
      return;
    }

    const rpID = getRequestRpId(req);
    const challenge = createAdminChallenge(state, "register", origin, rpID);
    const options = await generateRegistrationOptions({
      rpName: ADMIN_RP_NAME,
      rpID,
      userName: ADMIN_USER_NAME,
      userDisplayName: ADMIN_USER_DISPLAY_NAME,
      userID: fromBase64Url(ADMIN_USER_ID),
      challenge: challenge.challenge,
      timeout: 60000,
      attestationType: "none",
      excludeCredentials: state.auth.credentials.map((credential) => ({
        id: credential.id,
        transports: Array.isArray(credential.transports) ? credential.transports : undefined,
      })),
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "required",
      },
      preferredAuthenticatorType: "remoteDevice",
    });

    challenge.challenge = options.challenge;
    await writeState(state);

    jsonResponse(res, 200, {
      ok: true,
      requestId: challenge.id,
      options,
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/admin/passkey/register/verify") {
    if (!requireAdminAuth(state, req, res)) {
      return;
    }

    try {
      const body = await readJsonBody(req);
      const requestId = String(body.requestId ?? "").trim();
      const response = body.response;
      const challenge = consumeChallenge(state, requestId, "register");

      if (!challenge) {
        jsonResponse(res, 400, { ok: false, message: "A Face ID kérés lejárt." });
        return;
      }

      const verification = await verifyRegistrationResponse({
        response,
        expectedChallenge: challenge.challenge,
        expectedOrigin: challenge.origin,
        expectedRPID: challenge.rpID,
      });

      if (!verification.verified || !verification.registrationInfo) {
        jsonResponse(res, 400, { ok: false, message: "A Face ID regisztráció nem sikerült." });
        return;
      }

      const credential = verification.registrationInfo.credential;
      const record = {
        id: credential.id,
        publicKey: toBase64Url(credential.publicKey),
        counter: credential.counter,
        transports: Array.isArray(response?.response?.transports)
          ? response.response.transports
          : Array.isArray(credential.transports)
            ? credential.transports
            : [],
        createdAt: nowIso(),
        lastUsedAt: nowIso(),
      };

      storeAdminCredential(state, record);
      const session = issueAdminSession(state, "passkey", record.id);
      await writeState(state);

      jsonResponse(res, 200, {
        ...buildVerifiedSessionResponse(session, {
          message: "Passkey registered.",
          credentialId: record.id,
        }),
      });
    } catch (error) {
      jsonResponse(res, 400, { ok: false, message: error instanceof Error ? error.message : "Passkey registration failed." });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/admin/passkey/auth/options") {
    const origin = getRequestOrigin(req);
    if (!origin) {
      jsonResponse(res, 400, { ok: false, message: "A böngésző origin fejlécét nem kaptam meg." });
      return;
    }

    if (!hasRegisteredPasskey(state)) {
      jsonResponse(res, 400, { ok: false, message: "Még nincs regisztrált Face ID / passkey." });
      return;
    }

    const rpID = getRequestRpId(req);
    const challenge = createAdminChallenge(state, "auth", origin, rpID);
    const options = await generateAuthenticationOptions({
      rpID,
      allowCredentials: state.auth.credentials.map((credential) => ({
        id: credential.id,
        transports: Array.isArray(credential.transports) ? credential.transports : undefined,
      })),
      challenge: challenge.challenge,
      timeout: 60000,
      userVerification: "required",
    });

    challenge.challenge = options.challenge;
    await writeState(state);

    jsonResponse(res, 200, {
      ok: true,
      requestId: challenge.id,
      options,
    });
    return;
  }

  if (req.method === "POST" && url.pathname === "/admin/passkey/auth/verify") {
    try {
      const body = await readJsonBody(req);
      const requestId = String(body.requestId ?? "").trim();
      const response = body.response;
      const challenge = consumeChallenge(state, requestId, "auth");

      if (!challenge) {
        jsonResponse(res, 400, { ok: false, message: "A Face ID kérés lejárt." });
        return;
      }

      const credential = getAuthCredentialById(state, String(response?.id ?? "").trim());
      if (!credential) {
        jsonResponse(res, 400, { ok: false, message: "Ismeretlen passkey." });
        return;
      }

      const verification = await verifyAuthenticationResponse({
        response,
        expectedChallenge: challenge.challenge,
        expectedOrigin: challenge.origin,
        expectedRPID: challenge.rpID,
        credential: {
          id: credential.id,
          publicKey: fromBase64Url(credential.publicKey),
          counter: Number(credential.counter ?? 0),
          transports: Array.isArray(credential.transports) ? credential.transports : [],
        },
      });

      if (!verification.verified) {
        jsonResponse(res, 401, { ok: false, message: "A Face ID azonosítás nem sikerült." });
        return;
      }

      credential.counter = verification.authenticationInfo.newCounter;
      credential.lastUsedAt = nowIso();
      const session = issueAdminSession(state, "passkey", credential.id);
      await writeState(state);

      jsonResponse(res, 200, {
        ...buildVerifiedSessionResponse(session, {
          message: "Passkey authorized.",
          credentialId: credential.id,
        }),
      });
    } catch (error) {
      jsonResponse(res, 400, { ok: false, message: error instanceof Error ? error.message : "Passkey authorization failed." });
    }
    return;
  }

  if (req.method === "GET" && url.pathname === "/smtp/status") {
    if (!requireAdminAuth(state, req, res)) {
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
    if (!requireAdminAuth(state, req, res)) {
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
    if (!requireAdminAuth(state, req, res)) {
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
    if (!requireAdminAuth(state, req, res)) {
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
    if (!requireAdminAuth(state, req, res)) {
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
