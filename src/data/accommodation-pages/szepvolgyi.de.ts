import { createGermanAccommodationPage } from "./german-page-factory";
import { szepvolgyiEnglishPageData } from "./szepvolgyi.en";

export const szepvolgyiGermanPageData = createGermanAccommodationPage(szepvolgyiEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szépvölgyi",
  route: "/de/szepvolgyi/",
  listingAnchor: "szepvolgyi-vendeghaz",
  location: "Badacsonyörs",
  region: "Balaton - Badacsonyörs",
  guests: "bis 8 Gäste",
  character: "Großes Ferienhaus mit Balaton-Panorama",
  shortDescription: "Großes Ferienhaus in Badacsonyörs mit Balaton-Panorama und viel Platz.",
  lead:
    "Dandelion Szépvölgyi ist für größere Familien und Freundesgruppen gedacht, die nahe am Balaton wohnen und trotzdem ein eigenes Haus mit Ausblick haben möchten.",
  longDescription: [
    "Das Haus gibt mehreren Gästen genug Raum für gemeinsame Tage, Mahlzeiten und ruhige Pausen. Die Terrasse und der Blick zum Balaton sind zentrale Teile des Aufenthalts.",
    "Badacsonyörs ist gut für Strandtage, Radwege, Ausflüge nach Badacsony und ruhige Abende abseits der dichtesten Sommerorte.",
    "Szépvölgyi eignet sich besonders, wenn viel Platz, mehrere Schlafzimmer und gute Erreichbarkeit des Balaton wichtiger sind als ein kleines Dorfhaus."
  ],
  facts: [
    ["Gäste", "bis 8 Gäste"],
    ["Schlafzimmer", "4 Schlafzimmer"],
    ["Badezimmer", "2 Badezimmer"],
    ["Ausblick", "Balaton-Panorama"],
    ["Lage", "Badacsonyörs"]
  ],
  experienceFacts: [
    ["Balaton", "Strand und Ufer in Reichweite"],
    ["Badacsony", "Wein, Ausflüge und Aussicht"],
    ["Gruppen", "viel Platz für gemeinsame Tage"],
    ["Panorama", "Terrasse mit Blick"]
  ],
  highlights: ["Balaton-Panorama", "4 Schlafzimmer", "2 Badezimmer", "Terrasse", "Gute Lage für Strandtage"],
  reasons: [
    { iconKey: "balaton", title: "Balaton nah", text: "praktisch für Sommertage" },
    { iconKey: "users", title: "Viel Platz", text: "bis 8 Gäste" },
    { iconKey: "terrace", title: "Panorama", text: "Ausblick von der Terrasse" },
    { iconKey: "grapes", title: "Badacsony", text: "Weinregion in der Nähe" }
  ],
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrasse", "Parken"],
  mapBody:
    "Szépvölgyi liegt in Badacsonyörs, mit Zugang zu Balaton-Ufer, Badacsony, Radwegen und regionalen Ausflugszielen.",
  mapBenefits: [
    { label: "Balaton-Panorama", icon: "balaton" },
    { label: "Badacsony und Wein", icon: "grapes" },
    { label: "Strandtage und Radwege", icon: "route" }
  ],
  relatedSlot: "szepvolgyi_card_image"
});
