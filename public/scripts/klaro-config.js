window.klaroConfig = {
  elementID: "dnd-klaro",
  storageMethod: "cookie",
  cookieName: "dnd-klaro-consent",
  cookieExpiresAfterDays: 365,
  mustConsent: true,
  default: false,
  acceptAll: true,
  hideDeclineAll: false,
  lang: "hu",
  translations: {
    hu: {
      consentNotice: {
        title: "Süti beállítások",
        description:
          "A weboldal működéséhez szükséges sütik mellett analitikai és marketing célú sütiket is használhatunk. A beállításokat bármikor módosíthatod."
      },
      consentModal: {
        title: "Adatkezelési és süti beállítások",
        description: "Válaszd ki, mely célokhoz adsz hozzájárulást."
      },
      ok: "Elfogadom",
      decline: "Elutasítom",
      acceptAll: "Elfogadom",
      acceptSelected: "Kiválasztottak elfogadása",
      save: "Mentés",
      close: "Mentés",
      settings: "Beállítások",
      purposes: {
        necessary: "Szükséges",
        analytics: "Analitika",
        marketing: "Marketing"
      },
      service: {
        disableAll: {
          title: "Összes letiltása",
          description: "Kapcsold ki az összes opcionális szolgáltatást."
        }
      },
      googleAnalytics: {
        title: "Google Analytics (GA4)"
      },
      metaPixel: {
        title: "Meta Pixel"
      }
    }
  },
  services: [
    {
      name: "necessary",
      title: "Szükséges",
      purposes: ["necessary"],
      required: true,
      default: true
    },
    {
      name: "googleAnalytics",
      title: "Google Analytics (GA4)",
      purposes: ["analytics"],
      required: false,
      default: false,
      onlyOnce: true,
      callback: function (_consent, _service) {
        if (typeof window.dndApplyConsentFromKlaro === "function" && window.klaro?.getManager) {
          window.dndApplyConsentFromKlaro(window.klaro.getManager().consents);
        }
      }
    },
    {
      name: "metaPixel",
      title: "Meta Pixel",
      purposes: ["marketing"],
      required: false,
      default: false,
      onlyOnce: true,
      callback: function (_consent, _service) {
        if (typeof window.dndApplyConsentFromKlaro === "function" && window.klaro?.getManager) {
          window.dndApplyConsentFromKlaro(window.klaro.getManager().consents);
        }
      }
    }
  ],
  callback: function (_consent, _service) {
    if (typeof window.dndApplyConsentFromKlaro === "function" && window.klaro?.getManager) {
      window.dndApplyConsentFromKlaro(window.klaro.getManager().consents);
    }
  }
};
