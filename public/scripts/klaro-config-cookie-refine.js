const dndKlaroLanguage = (document.documentElement.lang || "hu").slice(0, 2).toLowerCase();
const dndKlaroSupportedLanguages = new Set(["hu", "en", "de", "cs", "sk"]);
const dndKlaroLang = dndKlaroSupportedLanguages.has(dndKlaroLanguage) ? dndKlaroLanguage : "hu";
const dndKlaroServiceCopy = {
  hu: {
    necessaryTitle: "Szükséges sütik",
    necessaryDescription: "Az oldal működéséhez és a süti beállítások mentéséhez kellenek.",
    analyticsTitle: "Google Analytics",
    analyticsDescription: "Statisztikai mérés.",
    marketingTitle: "Meta Pixel",
    marketingDescription: "Marketingkampányok mérése."
  },
  en: {
    necessaryTitle: "Necessary cookies",
    necessaryDescription: "Needed for the website to work and to store your cookie choices.",
    analyticsTitle: "Google Analytics",
    analyticsDescription: "Anonymous usage statistics.",
    marketingTitle: "Meta Pixel",
    marketingDescription: "Marketing campaign measurement."
  },
  de: {
    necessaryTitle: "Notwendige Cookies",
    necessaryDescription: "Erforderlich für die Funktion der Website und das Speichern Ihrer Cookie-Auswahl.",
    analyticsTitle: "Google Analytics",
    analyticsDescription: "Anonyme Nutzungsstatistik.",
    marketingTitle: "Meta Pixel",
    marketingDescription: "Messung von Marketingkampagnen."
  },
  cs: {
    necessaryTitle: "Nezbytné cookies",
    necessaryDescription: "Nutné pro fungování webu a uložení vašeho nastavení cookies.",
    analyticsTitle: "Google Analytics",
    analyticsDescription: "Anonymní statistika používání.",
    marketingTitle: "Meta Pixel",
    marketingDescription: "Měření marketingových kampaní."
  },
  sk: {
    necessaryTitle: "Nevyhnutné cookies",
    necessaryDescription: "Potrebné na fungovanie webu a uloženie vášho nastavenia cookies.",
    analyticsTitle: "Google Analytics",
    analyticsDescription: "Anonymná štatistika používania.",
    marketingTitle: "Meta Pixel",
    marketingDescription: "Meranie marketingových kampaní."
  }
};

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
  lang: dndKlaroLang,
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
    },
    en: {
      consentNotice: {
        title: "Please choose from the cookie options below:",
        description:
          "We always use the cookies required for the website to work. Statistics and marketing cookies are used only if you choose to accept all.",
        learnMore: "Learn more",
        privacyPolicy: {
          name: "privacy policy"
        }
      },
      consentModal: {
        title: "Please choose from the cookie options below:",
        description:
          "We always use the cookies required for the website to work. Statistics and marketing cookies are used only if you choose to accept all.",
        privacyPolicy: {
          name: "privacy policy",
          text: "For more details, please read our {privacyPolicy}."
        }
      },
      privacyPolicy: {
        name: "privacy policy",
        text: "For more details, please read our {privacyPolicy}."
      },
      ok: "Accept all",
      decline: "Only allow necessary cookies",
      acceptAll: "Accept all",
      acceptSelected: "Save",
      save: "Save",
      close: "Close",
      settings: "Settings",
      poweredBy: "",
      purposeItem: {
        service: "service",
        services: "services"
      },
      purposes: {
        necessary: {
          title: "Necessary",
          description: "Required for the website to work."
        },
        analytics: {
          title: "Analytics",
          description: "Used to measure website usage."
        },
        marketing: {
          title: "Marketing",
          description: "Used to measure ads and campaigns."
        }
      },
      service: {
        disableAll: {
          title: "Disable optional cookies",
          description: "Turn off analytics and marketing cookies."
        },
        required: {
          title: "(always required)",
          description: "This is needed for the website to work and cannot be switched off."
        },
        purpose: "Purpose",
        purposes: "Purposes"
      },
      necessary: {
        title: "Necessary cookies",
        description: "Needed for the website to work and to store your cookie choices."
      },
      googleAnalytics: {
        title: "Google Analytics",
        description: "Anonymous usage statistics."
      },
      metaPixel: {
        title: "Meta Pixel",
        description: "Marketing campaign measurement."
      }
    },
    de: {
      consentNotice: {
        title: "Bitte wählen Sie eine der folgenden Cookie-Optionen:",
        description:
          "Die für den Betrieb der Website erforderlichen Cookies verwenden wir immer. Statistik- und Marketing-Cookies verwenden wir nur, wenn Sie alle akzeptieren.",
        learnMore: "Mehr erfahren",
        privacyPolicy: {
          name: "Datenschutzerklärung"
        }
      },
      consentModal: {
        title: "Bitte wählen Sie eine der folgenden Cookie-Optionen:",
        description:
          "Die für den Betrieb der Website erforderlichen Cookies verwenden wir immer. Statistik- und Marketing-Cookies verwenden wir nur, wenn Sie alle akzeptieren.",
        privacyPolicy: {
          name: "Datenschutzerklärung",
          text: "Weitere Details finden Sie in unserer {privacyPolicy}."
        }
      },
      privacyPolicy: {
        name: "Datenschutzerklärung",
        text: "Weitere Details finden Sie in unserer {privacyPolicy}."
      },
      ok: "Alle akzeptieren",
      decline: "Nur notwendige zulassen",
      acceptAll: "Alle akzeptieren",
      acceptSelected: "Speichern",
      save: "Speichern",
      close: "Schließen",
      settings: "Einstellungen",
      poweredBy: "",
      purposeItem: {
        service: "Dienst",
        services: "Dienste"
      },
      purposes: {
        necessary: {
          title: "Notwendig",
          description: "Erforderlich für die Funktion der Website."
        },
        analytics: {
          title: "Statistik",
          description: "Zur Messung der Websitenutzung."
        },
        marketing: {
          title: "Marketing",
          description: "Zur Messung von Anzeigen und Kampagnen."
        }
      },
      service: {
        disableAll: {
          title: "Optionale Cookies deaktivieren",
          description: "Schalten Sie Statistik- und Marketing-Cookies aus."
        },
        required: {
          title: "(immer erforderlich)",
          description: "Dies ist für die Funktion der Website notwendig und kann nicht deaktiviert werden."
        },
        purpose: "Zweck",
        purposes: "Zwecke"
      },
      necessary: {
        title: "Notwendige Cookies",
        description: "Erforderlich für die Funktion der Website und das Speichern Ihrer Cookie-Auswahl."
      },
      googleAnalytics: {
        title: "Google Analytics",
        description: "Anonyme Nutzungsstatistik."
      },
      metaPixel: {
        title: "Meta Pixel",
        description: "Messung von Marketingkampagnen."
      }
    },
    cs: {
      consentNotice: {
        title: "Vyberte si prosím z následujících možností cookies:",
        description:
          "Cookies potřebné pro fungování webu používáme vždy. Statistické a marketingové cookies používáme jen tehdy, pokud zvolíte přijmout vše.",
        learnMore: "Zjistit více",
        privacyPolicy: {
          name: "zásady ochrany osobních údajů"
        }
      },
      consentModal: {
        title: "Vyberte si prosím z následujících možností cookies:",
        description:
          "Cookies potřebné pro fungování webu používáme vždy. Statistické a marketingové cookies používáme jen tehdy, pokud zvolíte přijmout vše.",
        privacyPolicy: {
          name: "zásady ochrany osobních údajů",
          text: "Další podrobnosti najdete v dokumentu {privacyPolicy}."
        }
      },
      privacyPolicy: {
        name: "zásady ochrany osobních údajů",
        text: "Další podrobnosti najdete v dokumentu {privacyPolicy}."
      },
      ok: "Přijmout vše",
      decline: "Povolit jen nezbytné",
      acceptAll: "Přijmout vše",
      acceptSelected: "Uložit",
      save: "Uložit",
      close: "Zavřít",
      settings: "Nastavení",
      poweredBy: "",
      purposeItem: {
        service: "služba",
        services: "služby"
      },
      purposes: {
        necessary: {
          title: "Nezbytné",
          description: "Potřebné pro fungování webu."
        },
        analytics: {
          title: "Statistika",
          description: "Pro měření používání webu."
        },
        marketing: {
          title: "Marketing",
          description: "Pro měření reklam a kampaní."
        }
      },
      service: {
        disableAll: {
          title: "Vypnout volitelné cookies",
          description: "Vypne statistické a marketingové cookies."
        },
        required: {
          title: "(vždy nutné)",
          description: "To je nutné pro fungování webu a nelze to vypnout."
        },
        purpose: "Účel",
        purposes: "Účely"
      },
      necessary: {
        title: "Nezbytné cookies",
        description: "Nutné pro fungování webu a uložení vašeho nastavení cookies."
      },
      googleAnalytics: {
        title: "Google Analytics",
        description: "Anonymní statistika používání."
      },
      metaPixel: {
        title: "Meta Pixel",
        description: "Měření marketingových kampaní."
      }
    },
    sk: {
      consentNotice: {
        title: "Vyberte si prosím z nasledujúcich možností cookies:",
        description:
          "Cookies potrebné na fungovanie webu používame vždy. Štatistické a marketingové cookies používame len vtedy, ak zvolíte prijať všetko.",
        learnMore: "Zistiť viac",
        privacyPolicy: {
          name: "zásady ochrany osobných údajov"
        }
      },
      consentModal: {
        title: "Vyberte si prosím z nasledujúcich možností cookies:",
        description:
          "Cookies potrebné na fungovanie webu používame vždy. Štatistické a marketingové cookies používame len vtedy, ak zvolíte prijať všetko.",
        privacyPolicy: {
          name: "zásady ochrany osobných údajov",
          text: "Ďalšie podrobnosti nájdete v dokumente {privacyPolicy}."
        }
      },
      privacyPolicy: {
        name: "zásady ochrany osobných údajov",
        text: "Ďalšie podrobnosti nájdete v dokumente {privacyPolicy}."
      },
      ok: "Prijať všetko",
      decline: "Povoliť len nevyhnutné",
      acceptAll: "Prijať všetko",
      acceptSelected: "Uložiť",
      save: "Uložiť",
      close: "Zavrieť",
      settings: "Nastavenia",
      poweredBy: "",
      purposeItem: {
        service: "služba",
        services: "služby"
      },
      purposes: {
        necessary: {
          title: "Nevyhnutné",
          description: "Potrebné na fungovanie webu."
        },
        analytics: {
          title: "Štatistika",
          description: "Na meranie používania webu."
        },
        marketing: {
          title: "Marketing",
          description: "Na meranie reklám a kampaní."
        }
      },
      service: {
        disableAll: {
          title: "Vypnúť voliteľné cookies",
          description: "Vypne štatistické a marketingové cookies."
        },
        required: {
          title: "(vždy potrebné)",
          description: "To je potrebné na fungovanie webu a nedá sa to vypnúť."
        },
        purpose: "Účel",
        purposes: "Účely"
      },
      necessary: {
        title: "Nevyhnutné cookies",
        description: "Potrebné na fungovanie webu a uloženie vášho nastavenia cookies."
      },
      googleAnalytics: {
        title: "Google Analytics",
        description: "Anonymná štatistika používania."
      },
      metaPixel: {
        title: "Meta Pixel",
        description: "Meranie marketingových kampaní."
      }
    }
  },
  services: [
    {
      name: "necessary",
      title: dndKlaroServiceCopy[dndKlaroLang].necessaryTitle,
      purposes: ["necessary"],
      required: true,
      default: true
    },
    {
      name: "googleAnalytics",
      title: dndKlaroServiceCopy[dndKlaroLang].analyticsTitle,
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
      title: dndKlaroServiceCopy[dndKlaroLang].marketingTitle,
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
