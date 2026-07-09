import { fugehazEnglishPageData } from "./fugehaz.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

// [CHANGE 2026-06-15 00:00] Fügeház szlovák felszereltség magyar oldalhoz igazítva, téves Hot tub eltávolítva.
export const fugehazSlovakPageData = createSlovakAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fügeház",
  route: "/sk/dandelion-fugehaz/",
  location: "Szent György-hegy / Kisapáti",
  region: "Szent György-hegy - Balatonská vrchovina",
  guests: "4-6 hostí",
  character: "PANORAMATICKÝ DOM NA POKOJNÝ RODINNÝ POBYT",
  shortDescription: "Panoramatický dom s terasami a pokojnou polohou pri Szent György-hegy.",
  lead: "Fügeház je pre hostí, ktorí chcú výhľady, terasy, pokoj a cítiť krajinu okolo seba. Dobre funguje pre rodinu aj menšiu skupinu.",
  longDescription: [
    "Dom má niekoľko vonkajších miest, kde sa dá raňajkovať, oddychovať alebo večer sedieť s výhľadom. Atmosféra je prírodná a neformálna.",
    "Poloha pri Szent György-hegy dáva ľahký prístup k výletom, vinárstvam a balatonským programom.",
    "Hostia Fügeház môžu využívať Panorama Pool pre D1, D2 a Fügeház."
  ],
  facts: [["Hostia", "4-6 hostí"], ["Charakter", "terasový panoramatický dom"], ["Exteriér", "vonkajšie posedenie"], ["Poloha", "pri Szent György-hegy"]],
  experienceFacts: [["Panorama Pool", "Panorama Pool v letnej sezóne"], ["Výhľady", "kopce a krajina"], ["Vinárstva", "krátke výlety do okolia"], ["Balaton", "dostupný autom"]],
  highlights: ["Panoramatické terasy", "Pokojná poloha", "Kuchyňa", "Záhradné posedenie", "Panorama Pool", "Prírodná atmosféra"],
  reasons: [
    { iconKey: "terrace", title: "Panoramatické terasy", text: "kopce, večery" },
    { iconKey: "leaf", title: "Dobré pre páry", text: "pokoj, výhľady" },
    { iconKey: "family", title: "Menšie rodiny", text: "4 hostia, prístelka" },
    { iconKey: "pool", title: "Leto s bazénom", text: "Panorama Pool" }
  ],
  geoDecision: {
    kicker: "Fügeház rýchle odpovede",
    title: "Dandelion Fügeház sa hodí, ak hľadáte pokojný panoramatický dom s terasami pri Szent György-hegy",
    lead: "Fügeház je pohodlný pre 4 hostí a s prístelkou až pre 6 hostí. Je to dvojpodlažný dom s panoramatickými terasami, možnosťou grilovania a prístupom k Panorama Pool v letnej sezóne.",
    questions: [
      { iconKey: "pool", question: "Má Fügeház prístup k bazénu?", answer: "Áno. Hostia Fügeház môžu využívať Panorama Pool spolu s hosťami D1 a D2." },
      { iconKey: "family", question: "Pre koho je Dandelion Fügeház dobrá voľba?", answer: "Fügeház sa hodí najmä pre páry, menšie rodiny a hostí, ktorí hľadajú pokojnejší pobyt v Balatonskej vrchovine." },
      { iconKey: "guests", question: "Pre koľko hostí je Fügeház pohodlný?", answer: "Fügeház je pohodlný pre 4 hostí a s prístelkou až pre 6 hostí." },
      { iconKey: "home", question: "V čom je Fügeház iný ako D1 alebo D2?", answer: "Fügeház pôsobí intímnejšie, panoramatickejšie a viac sa sústreďuje na terasy. Ak hľadáte väčšie spoločné priestory, lepší smer je D1; ak záhradný rodinný dom, silnejší je D2." },
      { iconKey: "kitchen", question: "Aké vybavenie je vo Fügeház?", answer: "Fügeház má panoramatické terasy, dobre vybavenú kuchyňu, možnosť grilovania, záhradné jedálenské miesto, kúpeľňu so sprchou, dve podlažia a prístup k Panorama Pool." },
      { iconKey: "mountain", question: "Na aké výlety je Fügeház dobrá základňa?", answer: "Fügeház je dobrá základňa pre Szent György-hegy, Badacsony, Csobánc, Tóti-hegy, Gulács, miestne vinárstva a pláže pri Balatone." }
    ],
    amenitiesTitle: "Čo je vo Fügeház dôležité"
  },
  amenities: ["Wi-Fi", "Kuchyňa", "Terasy", "Kúrenie", "Parkovanie", "Vonkajšie posedenie", "Grilovanie", "Kúpeľňa", "Panorama Pool"],
  mapBody: "Fügeház je dobrý východiskový bod pre Szent György-hegy, Badacsony, vinice a pomalé balatonské dni.",
  mapBenefits: [{ label: "Panoramatická poloha", icon: "trail" }, { label: "Vinárstva v okolí", icon: "grapes" }, { label: "Balaton na dosah", icon: "route" }]
});
