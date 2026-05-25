import { d2EnglishPageData } from "./d2.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const d2CzechPageData = createCzechAccommodationPage(d2EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D2",
  route: "/cs/dandelion-d2/",
  location: "Kisapáti / Szent György-hegy",
  region: "Balatonská vrchovina - Szent György-hegy",
  guests: "4-6 hostů",
  character: "RODINNE UBYTOVANI SE ZAHRADOU A TERASOU",
  shortDescription: "Světlý a klidný dům pro rodiny, s velkou zahradou, krytou terasou a dobrou polohou pro balatonské dny.",
  lead: "Dandelion D2 je klidná základna u Szent György-hegy. Hodi se pro rodiny, ktere chteji zahradu, terasu, jednoduché vareni a krátké výlety k Balatonu, do vinic nebo na vyhlidky.",
  longDescription: [
    "Otevreny obytny prostor, prakticka kuchyně a krytá terasa davaji domu pomaly rytmus. Rano muze zacit venku u stolu, den pokracuje v kopcich nebo u vody a večer se vraci do zahrady.",
    "Velka zahrada je prirozene misto pro deti, grilovani i odpocinek. Ubytování zustava jednoduché na pouzivani, ale pritom ma dost prostoru pro delsi pobyt.",
    "Panorama Pool je společný pro hosty D1, D2 a Fügeház od 1. června 2026. Neni to soukromy bazén pouze pro D2.",
    "Balaton, turisticke trasy Szent György-hegy a vinařstvi v okolí jsou dostupné krátkou jízdou."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Terasa", "krytá terasa a posezení v zahrade"], ["Zahrada", "velka a dobře vyuzitelna"], ["Kuchyně", "prakticky vybavena"]],
  experienceFacts: [["Panorama Pool", "společný pro D1, D2 a Fügeház od 1. června 2026"], ["Venkovní čas", "zahrada, terasa, gril"], ["Pro deti", "prostor a přírodní atmosfera"], ["V okolí", "Balaton, trasy, vinařství"]],
  highlights: ["Krytá terasa", "Velka zahrada", "Klimatizace", "Kuchyně", "Společný Panorama Pool", "Grilovani venku"],
  reasons: [
    { iconKey: "terrace", title: "Rana venku", text: "terasa a zahrada" },
    { iconKey: "users", title: "Pohodlne s detmi", text: "prostor a klid" },
    { iconKey: "balaton", title: "Balaton blízko", text: "voda, víno, výlety" },
    { iconKey: "home", title: "Klidná základna", text: "pro rodinný pobyt" }
  ],
  amenities: ["Wi-Fi", "Klimatizace", "Kuchyně", "Koupelna", "Topení", "Zahradni posezení", "Gril", "Parkování"],
  mapBody: "Dandelion D2 lezi v klidné časti u Szent György-hegy. Odtud se da dobře vyrazit k Balatonu, do Tapolcai-medence i mezi vinice.",
  mapBenefits: [{ label: "Turisticke trasy poblíž", icon: "trail" }, { label: "Vinařská oblast", icon: "grapes" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});
