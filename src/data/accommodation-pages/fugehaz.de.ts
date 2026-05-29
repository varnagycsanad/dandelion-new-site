import { createGermanAccommodationPage } from "./german-page-factory";
import { fugehazEnglishPageData } from "./fugehaz.en";

export const fugehazGermanPageData = createGermanAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fügeház",
  route: "/de/dandelion-fugehaz/",
  listingAnchor: "fugehaz",
  location: "Szent György-hegy",
  region: "Balaton-Oberland - Panorama",
  guests: "4-6 Gäste",
  character: "Panoramahaus mit Terrasse und Hot Tub",
  shortDescription: "Ruhiges Panoramahaus für 4-6 Gäste nahe Szent György-hegy.",
  lead:
    "Dandelion Fügeház ist für Gäste gemacht, die Aussicht, Terrassenzeit und eine ruhige Basis im Balaton-Oberland suchen.",
  longDescription: [
    "Das Haus hat eine klare, entspannte Aufteilung und eignet sich gut für Familien, Paare oder Freunde, die ein paar ruhige Tage zusammen verbringen möchten.",
    "Die Terrasse und die Aussicht prägen den Aufenthalt: morgens langsam starten, tagsüber die Umgebung erkunden und abends draußen sitzen.",
    "Fügeház gehört zu den Unterkünften mit Zugang zum gemeinsamen Panorama Poolbereich ab 15. Juni 2026."
  ],
  facts: [
    ["Gäste", "4-6 Gäste"],
    ["Charakter", "Panorama und Terrassen"],
    ["Außenbereich", "Terrasse und Hot Tub"],
    ["Lage", "nahe Szent György-hegy"],
    ["Pool", "gemeinsamer Panorama Poolbereich"]
  ],
  experienceFacts: [
    ["Panorama", "Blick in die Hügellandschaft"],
    ["Hot Tub", "entspannte Abende draußen"],
    ["Gemeinsamer Pool", "ab 15. Juni 2026"],
    ["Umgebung", "Wein, Wandern und Balaton"]
  ],
  highlights: ["Panorama", "Terrasse", "Hot Tub", "Gemeinsamer Panorama Pool", "Ruhige Lage"],
  reasons: [
    { iconKey: "terrace", title: "Aussicht", text: "Terrasse mit weitem Gefühl" },
    { iconKey: "pool", title: "Poolbereich", text: "gemeinsam mit D1 und D2" },
    { iconKey: "grapes", title: "Weinregion", text: "kurze Wege zu Weingütern" },
    { iconKey: "home", title: "Ruhige Basis", text: "komfortabel und unkompliziert" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrasse", "Hot Tub", "Parken"],
  mapBody:
    "Fügeház liegt im Balaton-Oberland nahe Szent György-hegy, Badacsony, Tapolca und mehreren Aussichtspunkten.",
  mapBenefits: [
    { label: "Panorama und Hügel", icon: "trail" },
    { label: "Weingüter in Reichweite", icon: "grapes" },
    { label: "Balaton-Ausflüge", icon: "route" }
  ],
  relatedSlot: "fugehaz_card_image"
});
