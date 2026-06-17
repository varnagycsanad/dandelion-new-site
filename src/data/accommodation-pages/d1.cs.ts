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
  shortDescription: "D1 je nejprostornější klimatizovaný dům mezi ubytováními Dandelion, až pro 8 hostů. Má 3 ložnice, obývací pokoj, pohodlnou terasu, možnost grilování a krásný výhled směrem na Csobánc, Tóti-hegy, Gulács a Badacsony.\n\nPanorama Pool, který je vidět na hlavní fotografii, mohou využívat hosté Dandelion D1, D2 a Fügeház.",
  lead: "Dandelion D1 je dobrý pro společný pobyt, kdy je důležitý prostor, zahrada a jednoduché zázemí pro výlety po Balatonské vrchovině.",
  longDescription: [
    "D1 je nejprostornější klimatizovaný dům mezi ubytováními Dandelion a pohodlná volba pro větší rodiny nebo skupiny přátel. V domě jsou 3 ložnice a obývací pokoj, takže dobře funguje i při pobytu více hostů.",
    "Obývací pokoj je hlavní částí domu a navazuje na velkou, plně vybavenou kuchyni a jídelnu. Odtud se vychází na terasu, kde má ranní káva, společná večeře nebo večerní rozhovor za dobrého počasí vlastní atmosféru. Z terasy se otevírá výhled na Csobánc, Tóti-hegy, Gulács a Badacsony. K dispozici je venkovní jídelní set a možnost grilování.",
    "Prostorné rozvržení domu, 3 oddělené ložnice, obývací pokoj, dvě sprchové koupelnové části a samostatné WC zajišťují pohodlí i pro skupiny.",
    "D1 je dobrá volba pro ty, kdo hledají prostorný a pohodlný dům pro objevování Balatonské vrchoviny a chtějí si zároveň odpočinout od všedních dnů. Balaton, Szent György-hegy, Badacsony, Szigliget, Csobánc a vinařství v okolí jsou dostupné krátkou jízdou autem. Hosté D1 mohou využívat také Panorama Pool, který je k dispozici hostům D1, D2 a Fügeház."
  ],
  facts: [["Hosté", "6-8 hostů"], ["Ložnice", "3 ložnice"], ["Koupelny", "2 koupelny"], ["Exteriér", "zahrada a terasa"]],
  experienceFacts: [["Panorama Pool", "Panorama Pool od 15. června 2026"], ["Pro skupiny", "více prostoru pro čas spolu"], ["Výlety", "Szent György-hegy a Balaton"], ["Rytmus", "klidné dny v přírodě"]],
  highlights: ["Velká zahrada", "Terasa", "3 ložnice", "2 koupelny", "Panorama Pool", "Parkování"],
  reasons: [
    { iconKey: "guests", title: "Prostorný rodinný dům", text: "8 hostů, oddělené pokoje" },
    { iconKey: "garden", title: "Zahrada a terasa", text: "jídlo venku" },
    { iconKey: "pool", title: "Letní pobyt", text: "Panorama Pool" },
    { iconKey: "trail", title: "Základna u kopců", text: "výlety a vinařství" }
  ],
  amenities: ["3 ložnice", "Pohodlný obývací pokoj", "Dobře vybavená kuchyně", "Panoramatická terasa", "Možnost grilování", "Klimatizace", "Pračka", "Myčka nádobí", "Gigabitový internet"],
  geoDecision: {
    kicker: "D1 rychlé odpovědi",
    title: "Dandelion D1 je dobrá volba, pokud hledáte prostorný dům v Kisapáti s přístupem k Panorama Pool",
    lead: "D1 je připravený pro větší rodiny a skupiny přátel: až 8 hostů, panoramatická terasa, prostorné části a Panorama Pool od 15. června 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Má Dandelion D1 přístup k bazénu?",
        answer: "Ano. Od 15. června 2026 mohou hosté D1 využívat Panorama Pool."
      },
      {
        iconKey: "pool",
        question: "Je bazén soukromý jen pro D1?",
        answer: "Ne. Není to soukromý bazén pouze pro D1; Panorama Pool je v sezóně k dispozici hostům D1, D2 a Fügeház."
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
