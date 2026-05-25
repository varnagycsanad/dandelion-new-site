import { fugehazEnglishPageData } from "./fugehaz.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const fugehazCzechPageData = createCzechAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fügeház",
  route: "/cs/dandelion-fugehaz/",
  location: "Szent György-hegy / Kisapáti",
  region: "Szent György-hegy - Balatonská vrchovina",
  guests: "4-6 hostů",
  character: "PANORAMATICKY DUM PRO KLIDNY RODINNY POBYT",
  shortDescription: "Panoramatický dům s terasami, přírodní atmosferou a dobrou polohou pro pomalé dny u Szent György-hegy.",
  lead: "Fügeház je pro hosty, kteri chteji výhledy, terasy, klid a citit krajinu kolem sebe. Dobře funguje pro rodinu i menší skupinu.",
  longDescription: [
    "Dům ma nekolik venkovních mist, kde se da snidat, odpocivat nebo večer sedet s výhledem. Atmosfera je přírodní a neformalni.",
    "Poloha u Szent György-hegy dava snadny pristup k výletum, vinařstvím a balatonskym programum.",
    "Hosté Fügeház mohou od 1. června 2026 vyuzivat společný Panorama Pool pro D1, D2 a Fügeház."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Charakter", "terasovy panoramaticky dům"], ["Exterier", "venkovní posezení"], ["Poloha", "u Szent György-hegy"]],
  experienceFacts: [["Panorama Pool", "společný bazén od 1. června 2026"], ["Výhledy", "kopce a krajina"], ["Vinařství", "krátké výlety do okolí"], ["Balaton", "dostupný autem"]],
  highlights: ["Panoramatické terasy", "Klidná poloha", "Kuchyně", "Zahradni posezení", "Společný Panorama Pool", "Přírodní atmosfera"],
  reasons: [
    { iconKey: "terrace", title: "Terasy", text: "pro pomalé ráno" },
    { iconKey: "trail", title: "Kopce poblíž", text: "výlety a výhledy" },
    { iconKey: "pool", title: "Panorama Pool", text: "společný bazén" },
    { iconKey: "leaf", title: "Klid", text: "přírodní rytmus" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Terasy", "Topení", "Parkování", "Venkovní posezení", "Hot tub", "Koupelna"],
  mapBody: "Fügeház je dobrý vychozi bod pro Szent György-hegy, Badacsony, vinice a pomalé balatonské dny.",
  mapBenefits: [{ label: "Panoramaticka poloha", icon: "trail" }, { label: "Vinařství v okolí", icon: "grapes" }, { label: "Balaton na dosah", icon: "route" }]
});
