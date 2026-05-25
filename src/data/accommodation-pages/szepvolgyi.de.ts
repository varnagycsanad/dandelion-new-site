import { createGermanAccommodationPage } from "./german-page-factory";
import { szepvolgyiEnglishPageData } from "./szepvolgyi.en";

export const szepvolgyiGermanPageData = createGermanAccommodationPage(szepvolgyiEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szepvolgyi",
  route: "/de/szepvolgyi/",
  listingAnchor: "szepvolgyi-vendeghaz",
  location: "Badacsonyors",
  region: "Balaton - Badacsonyors",
  guests: "bis 8 Gaeste",
  character: "Grosses Ferienhaus mit Balaton-Panorama",
  shortDescription: "Grosses Ferienhaus in Badacsonyors mit Balaton-Panorama und viel Platz.",
  lead:
    "Dandelion Szepvolgyi ist fuer groessere Familien und Freundesgruppen gedacht, die nahe am Balaton wohnen und trotzdem ein eigenes Haus mit Ausblick haben moechten.",
  longDescription: [
    "Das Haus gibt mehreren Gaesten genug Raum fuer gemeinsame Tage, Mahlzeiten und ruhige Pausen. Die Terrasse und der Blick zum Balaton sind zentrale Teile des Aufenthalts.",
    "Badacsonyors ist gut fuer Strandtage, Radwege, Ausfluege nach Badacsony und ruhige Abende abseits der dichtesten Sommerorte.",
    "Szepvolgyi eignet sich besonders, wenn viel Platz, mehrere Schlafzimmer und gute Erreichbarkeit des Balaton wichtiger sind als ein kleines Dorfhaus."
  ],
  facts: [
    ["Gaeste", "bis 8 Gaeste"],
    ["Schlafzimmer", "4 Schlafzimmer"],
    ["Badezimmer", "2 Badezimmer"],
    ["Ausblick", "Balaton-Panorama"],
    ["Lage", "Badacsonyors"]
  ],
  experienceFacts: [
    ["Balaton", "Strand und Ufer in Reichweite"],
    ["Badacsony", "Wein, Ausfluege und Aussicht"],
    ["Gruppen", "viel Platz fuer gemeinsame Tage"],
    ["Panorama", "Terrasse mit Blick"]
  ],
  highlights: ["Balaton-Panorama", "4 Schlafzimmer", "2 Badezimmer", "Terrasse", "Gute Lage fuer Strandtage"],
  reasons: [
    { iconKey: "balaton", title: "Balaton nah", text: "praktisch fuer Sommertage" },
    { iconKey: "users", title: "Viel Platz", text: "bis 8 Gaeste" },
    { iconKey: "terrace", title: "Panorama", text: "Ausblick von der Terrasse" },
    { iconKey: "grapes", title: "Badacsony", text: "Weinregion in der Naehe" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Terrasse", "Parken"],
  mapBody:
    "Szepvolgyi liegt in Badacsonyors, mit Zugang zu Balaton-Ufer, Badacsony, Radwegen und regionalen Ausflugszielen.",
  mapBenefits: [
    { label: "Balaton-Panorama", icon: "balaton" },
    { label: "Badacsony und Wein", icon: "grapes" },
    { label: "Strandtage und Radwege", icon: "route" }
  ],
  relatedSlot: "szepvolgyi_card_image"
});
