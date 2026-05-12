// Dandelion consent bridge for Google Consent Mode v2 + GTM dataLayer events.
(function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

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

  window.dndApplyConsentFromKlaro = function dndApplyConsentFromKlaro(consents) {
    const consentState = consents || {};
    const analyticsGranted = Boolean(consentState.googleAnalytics);
    const marketingGranted = Boolean(consentState.metaPixel);
    sendConsentState(analyticsGranted, marketingGranted);
  };

  // Defaults are sent inline in BaseLayout before GTM loads.
})();
