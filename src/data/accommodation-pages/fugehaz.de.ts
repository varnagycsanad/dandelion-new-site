import { createGermanAccommodationPage } from "./german-page-factory";
import { fugehazEnglishPageData } from "./fugehaz.en";

// [CHANGE 2026-06-15 00:00] Fügeház német tartalom magyar szolgáltatáslistához igazítva, téves wellness állítás eltávolítva.
export const fugehazGermanPageData = createGermanAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fügeház",
  route: "/de/dandelion-fugehaz/",
  listingAnchor: "fugehaz",
  location: "Szent György-hegy",
  region: "Balaton-Oberland - Panorama",
  guests: "4-6 Gäste",
  character: "Panoramahaus mit Terrassen und ruhiger Lage",
  shortDescription: "Ruhiges Panoramahaus für 4-6 Gäste bei Szent György-hegy, mit Terrassen und Zugang zum Panorama Pool.",
  lead:
    "Dandelion Fügeház ist für Gäste gemacht, die Aussicht, Terrassenzeit und einen ruhigen Rückzugsort im Balaton-Oberland suchen.",
  longDescription: [
    "Das Haus hat eine klare, entspannte Aufteilung und eignet sich gut für Familien, Paare oder Freunde, die ein paar ruhige Tage zusammen verbringen möchten.",
    "Die Terrasse und die Aussicht prägen den Aufenthalt: morgens langsam starten, tagsüber die Umgebung erkunden und abends draußen sitzen.",
    "Fügeház gehört zu den Unterkünften mit Zugang zum Panorama-Poolbereich ab 15. Juni 2026."
  ],
  facts: [
    ["Gäste", "4-6 Gäste"],
    ["Charakter", "Panorama und Terrassen"],
    ["Außenbereich", "Panoramaterrassen und Garten-Essplatz"],
    ["Lage", "nahe Szent György-hegy"],
    ["Pool", "Panorama-Poolbereich"]
  ],
  experienceFacts: [
    ["Panorama", "Blick in die Hügellandschaft"],
    ["Terrassenzeit", "entspannte Abende draußen"],
    ["Panorama Pool", "ab 15. Juni 2026"],
    ["Umgebung", "Wein, Wandern und Balaton"]
  ],
  highlights: ["Panorama", "Terrassen", "Grillmöglichkeit", "Panorama Pool", "Ruhige Lage"],
  reasons: [
    { iconKey: "terrace", title: "Panorama-Terrassen", text: "Hügel, Abende" },
    { iconKey: "leaf", title: "Gut für Paare", text: "Ruhe, Aussicht" },
    { iconKey: "family", title: "Kleinere Familien", text: "4 Gäste, Extrabett" },
    { iconKey: "pool", title: "Sommer mit Pool", text: "Panorama Pool" }
  ],
  geoDecision: {
    kicker: "Fügeház schnelle Antworten",
    title: "Dandelion Fügeház ist eine gute Wahl, wenn Sie ein ruhiges, terrassenbetontes Panoramahaus nahe Szent György-hegy suchen",
    lead: "Fügeház ist bequem für 4 Gäste und mit Extrabett bis 6 Gäste erweiterbar. Es ist ein zweistöckiges Haus mit Panoramaterrassen, Grillmöglichkeit und Zugang zum Panorama Pool ab 15. Juni 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Hat Fügeház Zugang zum Pool?",
        answer: "Ja. Ab 15. Juni 2026 können Fügeház-Gäste den Panorama Pool zusammen mit den Gästen von D1 und D2 nutzen."
      },
      {
        iconKey: "family",
        question: "Für wen ist Dandelion Fügeház eine gute Wahl?",
        answer: "Fügeház eignet sich vor allem für Paare, kleinere Familien und Gäste, die einen ruhigeren Aufenthalt im Balaton-Oberland suchen."
      },
      {
        iconKey: "guests",
        question: "Für wie viele Gäste ist Fügeház bequem?",
        answer: "Fügeház ist bequem für 4 Gäste und mit Extrabett bis 6 Gäste erweiterbar."
      },
      {
        iconKey: "home",
        question: "Worin unterscheidet sich Fügeház von D1 oder D2?",
        answer: "Fügeház wirkt intimer, panoramischer und stärker auf Terrassenzeit ausgerichtet. Für größere Gemeinschaftsbereiche ist D1 die bessere Wahl; für ein gartennahes Familienhaus ist D2 stärker."
      },
      {
        iconKey: "kitchen",
        question: "Welche Ausstattung gibt es in Fügeház?",
        answer: "Fügeház hat Panoramaterrassen, eine gut ausgestattete Küche, Grillmöglichkeit, Essplatz im Garten, Duschbad, zwei Ebenen und Zugang zum Panorama Pool."
      },
      {
        iconKey: "mountain",
        question: "Für welche Ausflüge ist Fügeház ein guter Ausgangspunkt?",
        answer: "Fügeház ist ein guter Ausgangspunkt für den Szent György-hegy, Badacsony, Csobánc, Tóti-hegy, Gulács, lokale Weingüter und Balaton-Strände."
      }
    ],
    amenitiesTitle: "Was in Fügeház wichtig ist"
  },
  amenities: ["WLAN", "Küche", "Klimaanlage", "Heizung", "Terrassen", "Grillmöglichkeit", "Parken", "Panorama Pool"],
  mapBody:
    "Fügeház liegt im Balaton-Oberland nahe Szent György-hegy, Badacsony, Tapolca und mehreren Aussichtspunkten.",
  mapBenefits: [
    { label: "Panorama und Hügel", icon: "trail" },
    { label: "Weingüter in Reichweite", icon: "grapes" },
    { label: "Balaton-Ausflüge", icon: "route" }
  ],
  relatedSlot: "fugehaz_card_image"
});
