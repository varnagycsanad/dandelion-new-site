import { createGermanAccommodationPage } from "./german-page-factory";
import { szololigetEnglishPageData } from "./szololiget.en";

export const szololigetGermanPageData = createGermanAccommodationPage(szololigetEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szőlőliget",
  route: "/de/szololiget/",
  listingAnchor: "szololiget-vendeghaz",
  location: "Kisapati",
  region: "Balaton-Oberland - Weinberge",
  guests: "2-4 Gäste",
  character: "Ruhiges Haus zwischen Weinbergen",
  shortDescription: "Ruhige Unterkunft für 2-4 Gäste in Weinberglage nahe Szent György-hegy.",
  lead:
    "Dandelion Szőlőliget ist ein ruhiger Rückzugsort für Gäste, die Aussicht, Weinberge und einen langsamen Tagesrhythmus suchen.",
  longDescription: [
    "Die Lage zwischen Weinbergen gibt dem Aufenthalt eine besonders ruhige Stimmung. Der Morgen beginnt langsam, der Blick und die Umgebung setzen den Ton.",
    "Das Haus eignet sich gut für Paare oder kleine Familien, die tagsüber wandern, an den Balaton fahren oder Weingüter besuchen möchten.",
    "Szőlőliget ist bewusst kein trubeliges Apartment, sondern eine einfache, angenehme Basis für naturnahe Tage im Balaton-Oberland."
  ],
  facts: [
    ["Gäste", "2-4 Gäste"],
    ["Charakter", "Weinberglage"],
    ["Außenbereich", "Terrasse"],
    ["Stimmung", "ruhig und langsam"],
    ["Lage", "Kisapati"]
  ],
  experienceFacts: [
    ["Morgenlicht", "ruhiger Start mit Aussicht"],
    ["Weinberge", "direkt in der Umgebung"],
    ["Wandern", "Szent György-hegy in Reichweite"],
    ["Balaton", "kurze Fahrt zu Strand und Orten"]
  ],
  highlights: ["Terrasse", "Weinberglage", "Küche", "Klimaanlage", "Ruhige Umgebung"],
  reasons: [
    { iconKey: "grapes", title: "Weinberge", text: "Landschaft direkt vor der Tür" },
    { iconKey: "terrace", title: "Terrasse", text: "langsamer Start in den Tag" },
    { iconKey: "trail", title: "Wandern", text: "Szent György-hegy nah" },
    { iconKey: "home", title: "Kompakt", text: "angenehm für 2-4 Gäste" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrasse", "Parken"],
  mapBody:
    "Szőlőliget liegt in Kisapati auf der Seite von Szent György-hegy, gut für Wanderungen, Weinregion und Balaton-Tage.",
  mapBenefits: [
    { label: "Weinberge rundherum", icon: "grapes" },
    { label: "Wanderwege in der Nähe", icon: "trail" },
    { label: "Balaton erreichbar", icon: "route" }
  ],
  relatedSlot: "szololiget_card_image"
});
