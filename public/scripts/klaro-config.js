window.klaroConfig = {
  elementID: "dnd-klaro",
  storageMethod: "cookie",
  cookieName: "dnd-klaro-consent",
  cookieExpiresAfterDays: 365,
  mustConsent: true,
  acceptAll: true,
  hideDeclineAll: false,
  default: false,
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
      close: "Mentés",
      save: "Mentés",
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
      contextualConsent: {
        acceptAlways: "Mindig engedélyezem"
      },
      settings: "Beállítások",
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
      onInit: "window.dndApplyConsentFromKlaro(opts.consents);",
      onAccept: "window.dndApplyConsentFromKlaro(opts.consents);",
      onDecline: "window.dndApplyConsentFromKlaro(opts.consents);"
    },
    {
      name: "metaPixel",
      title: "Meta Pixel",
      purposes: ["marketing"],
      required: false,
      default: false,
      onInit: "window.dndApplyConsentFromKlaro(opts.consents);",
      onAccept: "window.dndApplyConsentFromKlaro(opts.consents);",
      onDecline: "window.dndApplyConsentFromKlaro(opts.consents);"
    }
  ],
  callback: function (consent, service) {
    if (service) {
      window.dndApplyConsentFromKlaro(klaro.getManager().consents);
    }
  }
};
