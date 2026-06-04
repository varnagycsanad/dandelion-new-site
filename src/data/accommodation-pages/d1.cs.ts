import { d1EnglishPageData } from "./d1.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const d1CzechPageData = createCzechAccommodationPage(d1EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D1",
  route: "/cs/dandelion-d1/",
  location: "Kisapáti / Szent György-hegy",
  region: "Balatonská vrchovina - Tapolcai-medence",
  guests: "6-8 hostů",
  character: "PROSTORNÝ DŮM PRO RODINY A PŘÁTELE",
  shortDescription: "Prostorný dům pro větší rodinu nebo partu přátel, se zahradou, terasou a klidnou polohou u Szent György-hegy.",
  lead: "Dandelion D1 je dobrý pro společný pobyt, kdy je důležitý prostor, zahrada a jednoduché zázemí pro výlety po Balatonské vrchovině.",
  longDescription: [
    "Dům má velkorysejší rozvržení a dobře funguje pro rodiny nebo skupinu přátel. Hodí se pro společné snídaně, pomalé večery a dny, kdy někdo zůstane v zahradě a někdo vyrazí na výlet.",
    "Okolí Kisapáti a Szent György-hegy přináší tiché cesty, vinice, vyhlídky a krátké přesuny k Balatonu.",
    "Společný Panorama Pool patří k pobytům D1, D2 a Fügeház od 15. června 2026."
  ],
  facts: [["Hosté", "6-8 hostů"], ["Ložnice", "3 ložnice"], ["Koupelny", "2 koupelny"], ["Exteriér", "zahrada a terasa"]],
  experienceFacts: [["Panorama Pool", "společný bazén od 15. června 2026"], ["Pro skupiny", "více prostoru pro společný čas"], ["Výlety", "Szent György-hegy a Balaton"], ["Rytmus", "klidné dny v přírodě"]],
  highlights: ["Velká zahrada", "Terasa", "3 ložnice", "2 koupelny", "Společný Panorama Pool", "Parkování"],
  reasons: [
    { iconKey: "guests", title: "Prostorný rodinný dům", text: "8 hostů, oddělené pokoje" },
    { iconKey: "garden", title: "Zahrada a terasa", text: "jídlo venku" },
    { iconKey: "pool", title: "Letní pobyt", text: "společný bazén" },
    { iconKey: "trail", title: "Základna u kopců", text: "výlety a vinařství" }
  ],
  amenities: ["3 ložnice", "Pohodlný obývací pokoj", "Dobře vybavená kuchyně", "Panoramatická terasa", "Možnost grilování", "Klimatizace", "Pračka", "Myčka nádobí", "Gigabitový internet"],
  geoDecision: {
    kicker: "D1 rychlé odpovědi",
    title: "Dandelion D1 je dobrá volba, pokud hledáte prostorný dům v Kisapáti se společným bazénem",
    lead: "D1 je připravený pro větší rodiny a skupiny přátel: až 8 hostů, panoramatická terasa, prostorné společné části a společný Panorama Pool od 15. června 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Má Dandelion D1 přístup k bazénu?",
        answer: "Ano. Od 15. června 2026 mohou hosté D1 využívat společný Panorama Pool."
      },
      {
        iconKey: "pool",
        question: "Je bazén soukromý jen pro D1?",
        answer: "Ne. Panorama Pool je společný bazén pro hosty D1, D2 a Fügeház."
      },
      {
        iconKey: "guests",
        question: "Pro kolik hostů je Dandelion D1 pohodlný?",
        answer: "Dandelion D1 je pohodlný až pro 8 hostů, se 3 ložnicemi, obývacím pokojem a více koupelnami."
      },
      {
        iconKey: "mountain",
        question: "Pro jaké výlety je D1 dobrá základna?",
        answer: "Z Kisapáti jsou krátkou jízdou dostupné Szent György-hegy, Badacsony, Szigliget, Csobánc, Balaton i místní vinařství."
      },
      {
        iconKey: "kitchen",
        question: "Jaké vybavení má D1?",
        answer: "D1 má dobře vybavenou kuchyni, myčku nádobí, pračku, klimatizaci, pohodlný obývací pokoj, panoramatickou terasu a možnost grilování."
      },
      {
        iconKey: "wifi",
        question: "Má Dandelion D1 rychlý internet?",
        answer: "Ano. V Dandelion D1 je gigabitový internet, takže dům je praktický i pro delší pobyty a klidnější online práci."
      }
    ],
    amenitiesTitle: "Co je v domě důležité"
  },
  mapBody: "Dandelion D1 leží v Kisapáti, v dosahu Szent György-hegy, Tapolcai-medence, vinic a Balatonu.",
  mapBenefits: [{ label: "Szent György-hegy poblíž", icon: "trail" }, { label: "Pro větší skupinu", icon: "users" }, { label: "Balaton dostupný autem", icon: "route" }]
});
