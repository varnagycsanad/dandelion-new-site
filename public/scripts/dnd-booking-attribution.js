// [CHANGE 2026-07-10 00:00] Preserve ad attribution parameters on Sabee booking links and window opens.
// [CHANGE 2026-09-03 00:00] Drop known test attribution values before Sabee link decoration.
(function () {
  const STORAGE_KEY = "dnd_booking_attribution_v1";
  const STORAGE_TTL_MS = 90 * 24 * 60 * 60 * 1000;
  const ATTRIBUTION_PARAMS = [
    "gclid",
    "gbraid",
    "wbraid",
    "gad_source",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "msclkid",
    "fbclid"
  ];
  const TEST_ATTRIBUTION_VALUE_PATTERN = /(^|[-_])test([-_]|$)/i;

  function isTestAttributionValue(value) {
    return typeof value === "string" && TEST_ATTRIBUTION_VALUE_PATTERN.test(value);
  }

  function sanitizeAttributionParams(params) {
    const sanitizedParams = {};

    for (const key of ATTRIBUTION_PARAMS) {
      const value = params && params[key];

      if (typeof value !== "string" || !value || isTestAttributionValue(value)) {
        continue;
      }

      sanitizedParams[key] = value;
    }

    return sanitizedParams;
  }

  function canUseUrl(value) {
    try {
      new URL(value, window.location.origin);
      return true;
    } catch {
      return false;
    }
  }

  function isSabeeBookingUrl(value) {
    if (!value || !canUseUrl(value)) {
      return false;
    }

    try {
      const url = new URL(value, window.location.origin);
      return url.hostname === "ibe.sabeeapp.com";
    } catch {
      return false;
    }
  }

  function readStoredAttribution() {
    try {
      const rawValue = window.localStorage.getItem(STORAGE_KEY);

      if (!rawValue) {
        return {};
      }

      const parsedValue = JSON.parse(rawValue);

      if (!parsedValue || typeof parsedValue !== "object") {
        return {};
      }

      if (typeof parsedValue.savedAt !== "number" || Date.now() - parsedValue.savedAt > STORAGE_TTL_MS) {
        window.localStorage.removeItem(STORAGE_KEY);
        return {};
      }

      return parsedValue.params && typeof parsedValue.params === "object"
        ? sanitizeAttributionParams(parsedValue.params)
        : {};
    } catch {
      return {};
    }
  }

  function writeStoredAttribution(params) {
    try {
      const hasParams = Object.keys(params).length > 0;

      if (!hasParams) {
        return;
      }

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          savedAt: Date.now(),
          params
        })
      );
    } catch {
      // Ignore storage failures and keep the site functional.
    }
  }

  function getCurrentAttribution() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);

    for (const key of ATTRIBUTION_PARAMS) {
      const value = searchParams.get(key);

      if (value) {
        params[key] = value;
      }
    }

    return params;
  }

  function mergeAttributionParams() {
    const storedParams = readStoredAttribution();
    const currentParams = getCurrentAttribution();
    const mergedParams = Object.assign({}, storedParams, currentParams);

    const sanitizedParams = sanitizeAttributionParams(mergedParams);

    writeStoredAttribution(sanitizedParams);
    return sanitizedParams;
  }

  function decorateBookingUrl(rawUrl) {
    if (!rawUrl || !isSabeeBookingUrl(rawUrl)) {
      return rawUrl;
    }

    try {
      const url = new URL(rawUrl, window.location.origin);
      const attributionParams = mergeAttributionParams();

      for (const key of ATTRIBUTION_PARAMS) {
        if (url.searchParams.getAll(key).some(isTestAttributionValue)) {
          url.searchParams.delete(key);
        }

        if (!url.searchParams.has(key) && attributionParams[key]) {
          url.searchParams.set(key, attributionParams[key]);
        }
      }

      return url.toString();
    } catch {
      return rawUrl;
    }
  }

  function decorateBookingAnchors(root) {
    const scope = root && typeof root.querySelectorAll === "function" ? root : document;
    const links = scope.querySelectorAll("a[href]");

    for (const link of links) {
      const originalHref = link.getAttribute("href");

      if (!isSabeeBookingUrl(originalHref)) {
        continue;
      }

      const resolvedHref = decorateBookingUrl(originalHref);

      if (resolvedHref && resolvedHref !== originalHref) {
        link.setAttribute("href", resolvedHref);
      }
    }
  }

  function openBookingUrl(rawUrl, target, features) {
    const resolvedUrl = decorateBookingUrl(rawUrl);
    return window.open(resolvedUrl, target || "_blank", features || "noopener,noreferrer");
  }

  mergeAttributionParams();

  window.dndResolveBookingUrl = decorateBookingUrl;
  window.dndDecorateBookingAnchors = decorateBookingAnchors;
  window.dndOpenBookingUrl = openBookingUrl;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      decorateBookingAnchors(document);
    }, { once: true });
  } else {
    decorateBookingAnchors(document);
  }

  const observer = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) {
          continue;
        }

        if (node.matches("a[href]")) {
          decorateBookingAnchors(node.parentNode && typeof node.parentNode.querySelectorAll === "function" ? node.parentNode : document);
          continue;
        }

        decorateBookingAnchors(node);
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
