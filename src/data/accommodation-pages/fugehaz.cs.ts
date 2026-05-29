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
    { iconKey: "terrace", title: "Terasy", text: "pro pomalé ráno" },
    { iconKey: "trail", title: "Kopce poblíž", text: "výlety a výhledy" },
    { iconKey: "pool", title: "Panorama Pool", text: "společný bazén" },
    { iconKey: "leaf", title: "Klid", text: "přírodní rytmus" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Terasy", "Topení", "Parkování", "Venkovní posezení", "Hot tub", "Koupelna"],
  mapBody: "Fügeház je dobrý výchozí bod pro Szent György-hegy, Badacsony, vinice a pomalé balatonské dny.",
  mapBenefits: [{ label: "Panoramatická poloha", icon: "trail" }, { label: "Vinařství v okolí", icon: "grapes" }, { label: "Balaton na dosah", icon: "route" }]
});
