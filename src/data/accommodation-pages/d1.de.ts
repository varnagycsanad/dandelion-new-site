import { createGermanAccommodationPage } from "./german-page-factory";
import { d1EnglishPageData } from "./d1.en";

export const d1GermanPageData = createGermanAccommodationPage(d1EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D1",
  route: "/de/dandelion-d1/",
  listingAnchor: "dandelion-d1",
  location: "Kisapati",
  region: "Balaton-Oberland - Szent Gyorgy-hegy",
  guests: "6-8 Gaeste",
  character: "Grosses Ferienhaus mit Garten und Terrasse",
  shortDescription: "Grosszuegiges Ferienhaus fuer Familien und Freundesgruppen nahe Szent Gyorgy-hegy.",
  lead:
    "Dandelion D1 bietet viel Platz, drei Schlafzimmer, einen grossen Garten und eine entspannte Lage fuer Tage zwischen Balaton, Weinbergen und ruhigen Abenden auf der Terrasse.",
  longDescription: [
    "Das Haus eignet sich fuer Gaeste, die zusammen reisen, aber trotzdem genug Raum im Alltag brauchen. Wohnbereich, Kueche und Terrasse verbinden sich zu einem unkomplizierten Ferienrhythmus.",
    "Der Garten und die Aussenbereiche machen D1 besonders angenehm fuer Familien. Tagsueber sind Ausfluege an den Balaton, Wanderungen am Szent Gyorgy-hegy und Besuche bei Weinguetern gut erreichbar.",
    "Der gemeinsame Panorama Pool gehoert zum nahe gelegenen D1-D2-Fugehaz Bereich und ist ab 1. Juni 2026 fuer die passenden Unterkuenfte vorgesehen."
  ],
  facts: [
    ["Gaeste", "6-8 Gaeste"],
    ["Schlafzimmer", "3 Schlafzimmer"],
    ["Badezimmer", "2 Badezimmer"],
    ["Aussenbereich", "Terrasse und grosser Garten"],
    ["Lage", "Kisapati, nahe Szent Gyorgy-hegy"]
  ],
  experienceFacts: [
    ["Gemeinsamer Panorama Pool", "fuer D1, D2 und Fugehaz Gaeste ab 1. Juni 2026"],
    ["Familienzeit", "viel Platz im Haus und draussen"],
    ["Ausfluege", "Balaton, Wanderwege und Weingueter"],
    ["Direktanfrage", "deutsche Anfrage ueber Kontaktseite"]
  ],
  highlights: ["Grosser Garten", "Terrasse", "Familienfreundliche Aufteilung", "Gut ausgestattete Kueche", "Gemeinsamer Panorama Pool"],
  reasons: [
    { iconKey: "users", title: "Viel Platz", text: "gut fuer Familien und Freunde" },
    { iconKey: "terrace", title: "Terrassenzeit", text: "ruhige Abende draussen" },
    { iconKey: "pool", title: "Panorama Pool", text: "gemeinsamer Poolbereich" },
    { iconKey: "trail", title: "Aktive Tage", text: "Szent Gyorgy-hegy und Balaton" }
  ],
  amenities: ["WLAN", "Kueche", "Klimaanlage", "Heizung", "Terrasse", "Garten", "Parken"],
  mapBody:
    "Dandelion D1 liegt in Kisapati, mit guter Erreichbarkeit von Szent Gyorgy-hegy, Tapolca, Badacsony und den Balaton-Stranden.",
  mapBenefits: [
    { label: "Wanderwege in der Naehe", icon: "trail" },
    { label: "Balaton mit kurzer Fahrt erreichbar", icon: "route" },
    { label: "Weingueter und Aussichtspunkte", icon: "grapes" }
  ],
  relatedSlot: "d1_card_image"
});
