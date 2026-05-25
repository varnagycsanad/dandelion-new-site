import { d1EnglishPageData } from "./d1.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const d1CzechPageData = createCzechAccommodationPage(d1EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D1",
  route: "/cs/dandelion-d1/",
  location: "Kisapáti / Szent György-hegy",
  region: "Balatonská vrchovina - Tapolcai-medence",
  guests: "6-8 hostů",
  character: "PROSTORNÝ DŮM PRO RODINY A PŘÁTELE",
  shortDescription: "Prostorný dům pro větší rodinu nebo partu přátel, se zahradou, terasou a klidnou polohou u Szent György-hegy.",
  lead: "Dandelion D1 je dobrý pro společný pobyt, kdy je důležitý prostor, zahrada a jednoduché zázemí pro výlety po Balatonské vrchovině.",
  longDescription: [
    "Dům má velkorysejší rozvržení a dobře funguje pro rodiny nebo skupinu přátel. Hodí se pro společné snídaně, pomalé večery a dny, kdy někdo zůstane v zahradě a někdo vyrazí na výlet.",
    "Okolí Kisapáti a Szent György-hegy přináší tiché cesty, vinice, vyhlídky a krátké přesuny k Balatonu.",
    "Společný Panorama Pool patří k pobytům D1, D2 a Fügeház od 1. června 2026."
  ],
  facts: [["Hosté", "6-8 hostů"], ["Ložnice", "3 ložnice"], ["Koupelny", "2 koupelny"], ["Exteriér", "zahrada a terasa"]],
  experienceFacts: [["Panorama Pool", "společný bazén od 1. června 2026"], ["Pro skupiny", "více prostoru pro společný čas"], ["Vylety", "Szent György-hegy a Balaton"], ["Rytmus", "klidné dny v přírodě"]],
  highlights: ["Velka zahrada", "Terasa", "3 ložnice", "2 koupelny", "Společný Panorama Pool", "Parkování"],
  reasons: [
    { iconKey: "guests", title: "Vice prostoru", text: "pro rodinu nebo přátele" },
    { iconKey: "garden", title: "Zahrada", text: "venkovní čas" },
    { iconKey: "pool", title: "Panorama Pool", text: "společný bazén" },
    { iconKey: "trail", title: "Dobra poloha", text: "kopce a Balaton" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Zahrada", "Terasa", "Topení", "Parkování", "Koupelny", "Venkovní posezení"],
  mapBody: "Dandelion D1 leží v Kisapáti, v dosahu Szent György-hegy, Tapolcai-medence, vinic a Balatonu.",
  mapBenefits: [{ label: "Szent György-hegy poblíž", icon: "trail" }, { label: "Pro větší skupinu", icon: "users" }, { label: "Balaton dostupný autem", icon: "route" }]
});
