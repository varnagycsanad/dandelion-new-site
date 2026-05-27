window.klaroConfig = {
  elementID: "dnd-klaro",
  storageMethod: "cookie",
  cookieName: "dnd-klaro-consent",
  cookieExpiresAfterDays: 365,
  mustConsent: true,
  testing: false,
  default: false,
  acceptAll: true,
  hideDeclineAll: false,
  lang: "hu",
  translations: {
    hu: {
      consentNotice: {
        title: "Kérem, válasszon az alábbi süti lehetőségek közül:",
        description:
          "A weboldal működéséhez szükséges sütiket mindig használjuk. Statisztikai és marketing sütiket csak akkor használunk, ha az összes elfogadását választja.",
        learnMore: "Bővebben",
        privacyPolicy: {
          name: "adatkezelési tájékoztatót"
        }
      },
      consentModal: {
        title: "Kérem, válasszon az alábbi süti lehetőségek közül:",
        description:
          "A weboldal működéséhez szükséges sütiket mindig használjuk. Statisztikai és marketing sütiket csak akkor használunk, ha az összes elfogadását választja.",
        privacyPolicy: {
          name: "adatkezelési tájékoztatót",
          text: "További részletekért olvassa el az {privacyPolicy}."
        }
      },
      privacyPolicy: {
        name: "adatkezelési tájékoztatót",
        text: "További részletekért olvassa el az {privacyPolicy}."
      },
      ok: "Összes elfogadása",
      decline: "Csak a szükségeseket engedélyezem",
      acceptAll: "Összes elfogadása",
      acceptSelected: "Mentés",
      save: "Mentés",
      close: "Bezárás",
      settings: "Beállítások",
      poweredBy: "",
      purposeItem: {
        service: "szolgáltatás",
        services: "szolgáltatás"
      },
      purposes: {
        necessary: {
          title: "Szükséges",
          description: "Az oldal működéséhez szükséges."
        },
        analytics: {
          title: "Statisztika",
          description: "Az oldal használatának méréséhez."
        },
        marketing: {
          title: "Marketing",
          description: "Hirdetések és kampányok méréséhez."
        }
      },
      service: {
        disableAll: {
          title: "Opcionális sütik kikapcsolása",
          description: "Kapcsolja ki a statisztikai és marketing sütiket."
        },
        required: {
          title: "(mindig szükséges)",
          description: "Ez az oldal működéséhez kell, ezért nem kapcsolható ki."
        },
        purpose: "Cél",
        purposes: "Célok"
      },
      necessary: {
        title: "Szükséges sütik",
        description: "Az oldal működéséhez és a süti beállítások mentéséhez kellenek."
      },
      googleAnalytics: {
        title: "Google Analytics",
        description: "Statisztikai mérés."
      },
      metaPixel: {
        title: "Meta Pixel",
        description: "Marketingkampányok mérése."
      }
    }
  },
  services: [
    {
      name: "necessary",
      title: "Szükséges sütik",
      purposes: ["necessary"],
      required: true,
      default: true
    },
    {
      name: "googleAnalytics",
      title: "Google Analytics",
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
