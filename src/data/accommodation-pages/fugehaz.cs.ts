import { fugehazEnglishPageData } from "./fugehaz.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const fugehazCzechPageData = createCzechAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fügeház",
  route: "/cs/dandelion-fugehaz/",
  location: "Szent György-hegy / Kisapáti",
  region: "Szent György-hegy - Balatonská vrchovina",
  guests: "4-6 hostů",
  character: "PANORAMATICKÝ DŮM PRO KLIDNÝ RODINNÝ POBYT",
  shortDescription: "Panoramatický dům s terasami, přírodní atmosférou a dobrou polohou pro pomalé dny u Szent György-hegy.",
  lead: "Fügeház je pro hosty, kteří chtějí výhledy, terasy, klid a cítit krajinu kolem sebe. Dobře funguje pro rodinu i menší skupinu.",
  longDescription: [
    "Dům ma nekolik venkovních mist, kde se da snidat, odpocivat nebo večer sedet s výhledem. Atmosfera je přírodní a neformalni.",
    "Poloha u Szent György-hegy dává snadný přístup k výletům, vinařstvím a balatonským programům.",
    "Hosté Fügeház mohou od 15. června 2026 vyuzivat společný Panorama Pool pro D1, D2 a Fügeház."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Charakter", "terasový panoramatický dům"], ["Exteriér", "venkovní posezení"], ["Poloha", "u Szent György-hegy"]],
  experienceFacts: [["Panorama Pool", "společný bazén od 15. června 2026"], ["Výhledy", "kopce a krajina"], ["Vinařství", "krátké výlety do okolí"], ["Balaton", "dostupný autem"]],
  highlights: ["Panoramatické terasy", "Klidná poloha", "Kuchyně", "Zahradní posezení", "Společný Panorama Pool", "Přírodní atmosféra"],
  reasons: [
    { iconKey: "terrace", title: "Panoramatické terasy", text: "Kopce, večery" },
    { iconKey: "leaf", title: "Dobré pro páry", text: "Klid, výhledy" },
    { iconKey: "family", title: "Menší rodiny", text: "4 hosté, přistýlka" },
    { iconKey: "pool", title: "Léto s bazénem", text: "Panorama Pool" }
  ],
  geoDecision: {
    kicker: "Fügeház rychlé odpovědi",
    title: "Dandelion Fügeház se hodí, pokud hledáte klidný panoramatický dům s terasami u Szent György-hegy",
    lead: "Fügeház je pohodlný pro 4 hosty a s přistýlkou až pro 6 hostů. Je to dvoupatrový dům s panoramatickými terasami, možností grilování a společným přístupem k Panorama Pool od 15. června 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Má Fügeház přístup k bazénu?",
        answer: "Ano. Od 15. června 2026 mohou hosté Fügeház využívat společný Panorama Pool spolu s hosty D1 a D2."
      },
      {
        iconKey: "family",
        question: "Pro koho je Dandelion Fügeház dobrá volba?",
        answer: "Fügeház se hodí hlavně pro páry, menší rodiny a hosty, kteří hledají klidnější pobyt v Balatonské vrchovině."
      },
      {
        iconKey: "guests",
        question: "Pro kolik hostů je Fügeház pohodlný?",
        answer: "Fügeház je pohodlný pro 4 hosty a s přistýlkou až pro 6 hostů."
      },
      {
        iconKey: "home",
        question: "V čem je Fügeház jiný než D1 nebo D2?",
        answer: "Fügeház působí intimněji, panoramatičtěji a více se soustředí na terasy. Pokud hledáte větší společné prostory, lepší směr je D1; pokud zahradní rodinný dům, silnější je D2."
      },
      {
        iconKey: "kitchen",
        question: "Jaké vybavení je ve Fügeház?",
        answer: "Fügeház má panoramatické terasy, dobře vybavenou kuchyni, možnost grilování, zahradní jídelní místo, koupelnu se sprchou, dvě podlaží a společný přístup k Panorama Pool."
      },
      {
        iconKey: "mountain",
        question: "Pro jaké výlety je Fügeház dobrá základna?",
        answer: "Fügeház je dobrá základna pro Szent György-hegy, Badacsony, Csobánc, Tóti-hegy, Gulács, místní vinařství a pláže u Balatonu."
      }
    ],
    amenitiesTitle: "Co je ve Fügeház důležité"
  },
  amenities: ["Wi-Fi", "Kuchyně", "Terasy", "Topení", "Parkování", "Venkovní posezení", "Hot tub", "Koupelna", "Společný Panorama Pool"],
  mapBody: "Fügeház je dobrý výchozí bod pro Szent György-hegy, Badacsony, vinice a pomalé balatonské dny.",
  mapBenefits: [{ label: "Panoramatická poloha", icon: "trail" }, { label: "Vinařství v okolí", icon: "grapes" }, { label: "Balaton na dosah", icon: "route" }]
});
