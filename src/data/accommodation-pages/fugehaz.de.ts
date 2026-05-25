import { createGermanAccommodationPage } from "./german-page-factory";
import { fugehazEnglishPageData } from "./fugehaz.en";

export const fugehazGermanPageData = createGermanAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fugehaz",
  route: "/de/dandelion-fugehaz/",
  listingAnchor: "fugehaz",
  location: "Szent Gyorgy-hegy",
  region: "Balaton-Oberland - Panorama",
  guests: "4-6 Gaeste",
  character: "Panoramahaus mit Terrasse und Hot Tub",
  shortDescription: "Ruhiges Panoramahaus fuer 4-6 Gaeste nahe Szent Gyorgy-hegy.",
  lead:
    "Dandelion Fugehaz ist fuer Gaeste gemacht, die Aussicht, Terrassenzeit und eine ruhige Basis im Balaton-Oberland suchen.",
  longDescription: [
    "Das Haus hat eine klare, entspannte Aufteilung und eignet sich gut fuer Familien, Paare oder Freunde, die ein paar ruhige Tage zusammen verbringen moechten.",
    "Die Terrasse und die Aussicht praegen den Aufenthalt: morgens langsam starten, tagsueber die Umgebung erkunden und abends draussen sitzen.",
    "Fugehaz gehoert zu den Unterkuenften mit Zugang zum gemeinsamen Panorama Poolbereich ab 1. Juni 2026."
  ],
  facts: [
    ["Gaeste", "4-6 Gaeste"],
    ["Charakter", "Panorama und Terrassen"],
    ["Aussenbereich", "Terrasse und Hot Tub"],
    ["Lage", "nahe Szent Gyorgy-hegy"],
    ["Pool", "gemeinsamer Panorama Poolbereich"]
  ],
  experienceFacts: [
    ["Panorama", "Blick in die Huegellandschaft"],
    ["Hot Tub", "entspannte Abende draussen"],
    ["Gemeinsamer Pool", "ab 1. Juni 2026"],
    ["Umgebung", "Wein, Wandern und Balaton"]
  ],
  highlights: ["Panorama", "Terrasse", "Hot Tub", "Gemeinsamer Panorama Pool", "Ruhige Lage"],
  reasons: [
    { iconKey: "terrace", title: "Aussicht", text: "Terrasse mit weitem Gefuehl" },
    { iconKey: "pool", title: "Poolbereich", text: "gemeinsam mit D1 und D2" },
    { iconKey: "grapes", title: "Weinregion", text: "kurze Wege zu Weinguetern" },
    { iconKey: "home", title: "Ruhige Basis", text: "komfortabel und unkompliziert" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Terrasse", "Hot Tub", "Parken"],
  mapBody:
    "Fugehaz liegt im Balaton-Oberland nahe Szent Gyorgy-hegy, Badacsony, Tapolca und mehreren Aussichtspunkten.",
  mapBenefits: [
    { label: "Panorama und Huegel", icon: "trail" },
    { label: "Weingueter in Reichweite", icon: "grapes" },
    { label: "Balaton-Ausfluege", icon: "route" }
  ],
  relatedSlot: "fugehaz_card_image"
});
