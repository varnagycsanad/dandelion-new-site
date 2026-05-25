import { createGermanAccommodationPage } from "./german-page-factory";
import { szololigetEnglishPageData } from "./szololiget.en";

export const szololigetGermanPageData = createGermanAccommodationPage(szololigetEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szololiget",
  route: "/de/szololiget/",
  listingAnchor: "szololiget-vendeghaz",
  location: "Kisapati",
  region: "Balaton-Oberland - Weinberge",
  guests: "2-4 Gaeste",
  character: "Ruhiges Haus zwischen Weinbergen",
  shortDescription: "Ruhige Unterkunft fuer 2-4 Gaeste in Weinberglage nahe Szent Gyorgy-hegy.",
  lead:
    "Dandelion Szololiget ist ein ruhiger Rueckzugsort fuer Gaeste, die Aussicht, Weinberge und einen langsamen Tagesrhythmus suchen.",
  longDescription: [
    "Die Lage zwischen Weinbergen gibt dem Aufenthalt eine besonders ruhige Stimmung. Der Morgen beginnt langsam, der Blick und die Umgebung setzen den Ton.",
    "Das Haus eignet sich gut fuer Paare oder kleine Familien, die tagsueber wandern, an den Balaton fahren oder Weingueter besuchen moechten.",
    "Szololiget ist bewusst kein trubeliges Apartment, sondern eine einfache, angenehme Basis fuer naturnahe Tage im Balaton-Oberland."
  ],
  facts: [
    ["Gaeste", "2-4 Gaeste"],
    ["Charakter", "Weinberglage"],
    ["Aussenbereich", "Terrasse"],
    ["Stimmung", "ruhig und langsam"],
    ["Lage", "Kisapati"]
  ],
  experienceFacts: [
    ["Morgenlicht", "ruhiger Start mit Aussicht"],
    ["Weinberge", "direkt in der Umgebung"],
    ["Wandern", "Szent Gyorgy-hegy in Reichweite"],
    ["Balaton", "kurze Fahrt zu Strand und Orten"]
  ],
  highlights: ["Terrasse", "Weinberglage", "Kueche", "Klimaanlage", "Ruhige Umgebung"],
  reasons: [
    { iconKey: "grapes", title: "Weinberge", text: "Landschaft direkt vor der Tuer" },
    { iconKey: "terrace", title: "Terrasse", text: "langsamer Start in den Tag" },
    { iconKey: "trail", title: "Wandern", text: "Szent Gyorgy-hegy nah" },
    { iconKey: "home", title: "Kompakt", text: "angenehm fuer 2-4 Gaeste" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Terrasse", "Parken"],
  mapBody:
    "Szololiget liegt in Kisapati auf der Seite von Szent Gyorgy-hegy, gut fuer Wanderungen, Weinregion und Balaton-Tage.",
  mapBenefits: [
    { label: "Weinberge rundherum", icon: "grapes" },
    { label: "Wanderwege in der Naehe", icon: "trail" },
    { label: "Balaton erreichbar", icon: "route" }
  ],
  relatedSlot: "szololiget_card_image"
});
