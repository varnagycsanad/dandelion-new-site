import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

const PORT = Number.parseInt(process.env.NEWSLETTER_PORT ?? "3876", 10);
const HOST = process.env.NEWSLETTER_HOST ?? "127.0.0.1";
const STORAGE_PATH = process.env.NEWSLETTER_STORAGE_PATH ?? join("data", "newsletter-db.json");
const PUBLIC_BASE_URL = process.env.NEWSLETTER_PUBLIC_BASE_URL ?? "http://localhost:3876";

const DEFAULT_STATE = {
  subscribers: [],
  campaigns: [],
  deliveries: [],
};

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
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  });
  res.end(payload);
}

function textResponse(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
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

function normalizeEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

function nowIso() {
  return new Date().toISOString();
}

function publicCampaignUrl(id) {
  return `${PUBLIC_BASE_URL.replace(/\/$/, "")}/campaigns/${id}`;
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

async function handleRequest(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
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
      counts: {
        subscribers: state.subscribers.length,
        campaigns: state.campaigns.length,
        deliveries: state.deliveries.length,
      },
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/subscribers") {
    jsonResponse(res, 200, { ok: true, subscribers: state.subscribers });
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
    jsonResponse(res, 200, { ok: true, campaigns: state.campaigns });
    return;
  }

  if (req.method === "GET" && url.pathname.match(/^\/campaigns\/[^/]+$/)) {
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
    const campaignId = url.pathname.split("/")[2];
    const campaign = state.campaigns.find((entry) => entry.id === campaignId);

    if (!campaign) {
      jsonResponse(res, 404, { ok: false, message: "Campaign not found." });
      return;
    }

    const activeSubscribers = state.subscribers.filter((subscriber) => subscriber.status === "active");
    const timestamp = nowIso();

    for (const subscriber of activeSubscribers) {
      state.deliveries.push({
        id: randomUUID(),
        campaignId: campaign.id,
        subscriberId: subscriber.id,
        email: subscriber.email,
        deliveryMode: "mock",
        status: "queued",
        createdAt: timestamp,
      });
    }

    campaign.status = "sent";
    campaign.sentAt = timestamp;
    campaign.updatedAt = timestamp;

    await writeState(state);

    jsonResponse(res, 200, {
      ok: true,
      message: "Campaign queued.",
      campaign,
      recipientCount: activeSubscribers.length,
      deliveryMode: "mock",
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
