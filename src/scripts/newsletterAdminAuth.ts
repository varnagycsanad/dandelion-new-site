import { startAuthentication, startRegistration } from "@simplewebauthn/browser";

export const ADMIN_SESSION_STORAGE_KEY = "dandelion-newsletter-admin-session";

export function getStoredAdminSessionToken() {
  if (typeof sessionStorage === "undefined") {
    return "";
  }

  return sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) ?? "";
}

export function setStoredAdminSessionToken(token) {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  if (token) {
    sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, token);
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
  }
}

export function clearStoredAdminAuth() {
  if (typeof sessionStorage === "undefined") {
    return;
  }

  sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
}

export function isWebAuthnAvailable() {
  return typeof window !== "undefined" && typeof window.PublicKeyCredential !== "undefined";
}

export function getApiBase(apiBase) {
  return String(apiBase ?? "").trim().replace(/\/$/, "");
}

export function buildAdminHeaders(extra = {}) {
  const headers = { ...extra };
  const sessionToken = getStoredAdminSessionToken();

  if (sessionToken) {
    headers["X-Newsletter-Admin-Session"] = sessionToken;
  }

  return headers;
}

export function buildAdminFetch(apiBase, path, options = {}) {
  const base = getApiBase(apiBase);
  const normalizedPath = String(path ?? "").startsWith("/") ? String(path) : `/${path}`;

  return fetch(`${base}${normalizedPath}`, {
    ...options,
    headers: buildAdminHeaders(options.headers || {}),
  });
}

async function parseJsonResponse(response) {
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result?.ok) {
    throw new Error(result?.message || "request_failed");
  }
  return result;
}

function isUnauthorizedResponse(response) {
  return Number(response?.status ?? 0) === 401;
}

export async function loginWithAdminPassword(apiBase, password) {
  const base = getApiBase(apiBase);
  const cleanPassword = String(password ?? "").trim();

  if (!cleanPassword) {
    throw new Error("password_required");
  }

  if (!base) {
    throw new Error("api_unavailable");
  }

  const response = await fetch(`${base}/admin/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Newsletter-Admin-Password": cleanPassword,
    },
    body: "{}",
  });

  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result?.message || "request_failed");
  }

  const result = await parseJsonResponse(response);
  if (typeof result.sessionToken !== "string" || !result.sessionToken) {
    throw new Error("session_missing");
  }

  setStoredAdminSessionToken(result.sessionToken);
  return result;
}

export async function refreshAdminSession(apiBase) {
  const base = getApiBase(apiBase);
  if (!base) {
    throw new Error("api_unavailable");
  }

  const response = await buildAdminFetch(base, "/admin/auth", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: "{}",
  });
  const result = await parseJsonResponse(response);

  if (typeof result.sessionToken === "string" && result.sessionToken) {
    setStoredAdminSessionToken(result.sessionToken);
  }

  return result;
}

export async function registerPasskey(apiBase) {
  const base = getApiBase(apiBase);
  if (!base) {
    throw new Error("api_unavailable");
  }

  if (!isWebAuthnAvailable()) {
    throw new Error("webauthn_unavailable");
  }

  const optionsResponse = await buildAdminFetch(base, "/admin/passkey/register/options", {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  let optionsResult;

  try {
    optionsResult = await parseJsonResponse(optionsResponse);
  } catch (error) {
    if (isUnauthorizedResponse(optionsResponse)) {
      clearStoredAdminAuth();
    }
    throw error;
  }
  const registrationResponse = await startRegistration({ optionsJSON: optionsResult.options });

  const verifyResponse = await buildAdminFetch(base, "/admin/passkey/register/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      requestId: optionsResult.requestId,
      response: registrationResponse,
    }),
  });
  const verifyResult = await parseJsonResponse(verifyResponse);

  if (typeof verifyResult.sessionToken === "string" && verifyResult.sessionToken) {
    setStoredAdminSessionToken(verifyResult.sessionToken);
  }

  return verifyResult;
}

export async function loginWithPasskey(apiBase) {
  const base = getApiBase(apiBase);
  if (!base) {
    throw new Error("api_unavailable");
  }

  if (!isWebAuthnAvailable()) {
    throw new Error("webauthn_unavailable");
  }

  const optionsResponse = await buildAdminFetch(base, "/admin/passkey/auth/options", {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  let optionsResult;

  try {
    optionsResult = await parseJsonResponse(optionsResponse);
  } catch (error) {
    if (isUnauthorizedResponse(optionsResponse)) {
      clearStoredAdminAuth();
    }
    throw error;
  }
  const authenticationResponse = await startAuthentication({ optionsJSON: optionsResult.options });

  const verifyResponse = await buildAdminFetch(base, "/admin/passkey/auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      requestId: optionsResult.requestId,
      response: authenticationResponse,
    }),
  });
  const verifyResult = await parseJsonResponse(verifyResponse);

  if (typeof verifyResult.sessionToken === "string" && verifyResult.sessionToken) {
    setStoredAdminSessionToken(verifyResult.sessionToken);
  }

  return verifyResult;
}
