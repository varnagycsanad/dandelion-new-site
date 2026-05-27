// Dandelion consent bridge for Google Consent Mode v2 + GTM dataLayer events.
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };
  const storageKey = "dnd-consent-settings";

  let defaultSent = false;

  function pushEvent(name, payload) {
    window.dataLayer.push(
      Object.assign(
        {
          event: name
        },
        payload || {}
      )
    );
  }

  function sendConsentState(analyticsGranted, marketingGranted) {
    const analyticsValue = analyticsGranted ? "granted" : "denied";
    const marketingValue = marketingGranted ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: analyticsValue,
      ad_storage: marketingValue,
      ad_user_data: marketingValue,
      ad_personalization: marketingValue
    });

    pushEvent("dnd_consent_update", {
      dnd_analytics_granted: analyticsGranted,
      dnd_marketing_granted: marketingGranted
    });

    if (analyticsGranted) {
      pushEvent("dnd_analytics_granted");
    }

    if (marketingGranted) {
      pushEvent("dnd_marketing_granted");
    }
  }

  window.dndSetConsentDefaults = function dndSetConsentDefaults() {
    if (defaultSent) {
      return;
    }

    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("set", "ads_data_redaction", true);

    defaultSent = true;
  };

  function normalizeConsentState(consents) {
    const consentState = consents || {};
    const analyticsGranted = Boolean(consentState.analytics || consentState.googleAnalytics);
    const marketingGranted = Boolean(consentState.marketing || consentState.metaPixel);
    return {
      analytics: analyticsGranted,
      marketing: marketingGranted
    };
  }

  window.dndGetStoredConsent = function dndGetStoredConsent() {
    try {
      const rawValue = window.localStorage.getItem(storageKey);

      if (!rawValue) {
        return null;
      }

      const parsed = JSON.parse(rawValue);
      const normalized = normalizeConsentState(parsed);

      return {
        analytics: normalized.analytics,
        marketing: normalized.marketing,
        savedAt: parsed.savedAt || null
      };
    } catch (_error) {
      return null;
    }
  };

  window.dndSaveConsent = function dndSaveConsent(consents) {
    const normalized = normalizeConsentState(consents);
    const payload = {
      analytics: normalized.analytics,
      marketing: normalized.marketing,
      savedAt: new Date().toISOString()
    };

    window.localStorage.setItem(storageKey, JSON.stringify(payload));
    return payload;
  };

  window.dndApplyConsent = function dndApplyConsent(consents) {
    const normalized = normalizeConsentState(consents);
    const analyticsGranted = normalized.analytics;
    const marketingGranted = normalized.marketing;
    sendConsentState(analyticsGranted, marketingGranted);
    return normalized;
  };

  window.dndApplyStoredConsent = function dndApplyStoredConsent() {
    const storedConsent = window.dndGetStoredConsent();

    if (!storedConsent) {
      return null;
    }

    return window.dndApplyConsent(storedConsent);
  };

  window.dndApplyConsentFromKlaro = function dndApplyConsentFromKlaro(consents) {
    return window.dndApplyConsent(consents);
  };

  function ensureCookieDetailsLink() {
    const modalHeader = document.querySelector("#dnd-klaro .cm-header");
    const modalDescription = modalHeader?.querySelector("p");

    if (!modalHeader || modalHeader.querySelector(".dnd-cookie-more-link")) {
      return;
    }

    const detailsLink = document.createElement("a");
    detailsLink.className = "dnd-cookie-more-link";
    detailsLink.href = "/docs/dandelion-suti-tajekoztato.pdf";
    detailsLink.download = "dandelion-suti-tajekoztato.pdf";
    detailsLink.textContent = "B\u0151vebben";

    if (modalDescription) {
      modalDescription.append(" ");
      modalDescription.appendChild(detailsLink);
    } else {
      modalHeader.appendChild(detailsLink);
    }
  }

  function watchCookieModal() {
    ensureCookieDetailsLink();

    if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(ensureCookieDetailsLink);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }

    const intervalID = window.setInterval(function addCookieDetailsLinkUntilReady() {
      ensureCookieDetailsLink();

      if (document.querySelector("#dnd-klaro .dnd-cookie-more-link")) {
        window.clearInterval(intervalID);
      }
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", watchCookieModal);
  } else {
    watchCookieModal();
  }

  // Defaults are sent inline in BaseLayout before GTM loads.
})();
