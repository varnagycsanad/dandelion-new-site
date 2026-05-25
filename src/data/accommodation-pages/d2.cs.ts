import { d2EnglishPageData } from "./d2.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const d2CzechPageData = createCzechAccommodationPage(d2EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D2",
  route: "/cs/dandelion-d2/",
  location: "Kisapati / Szent Gyorgy-hegy",
  region: "Balatonska vrchovina - Szent Gyorgy-hegy",
  guests: "4-6 hostu",
  character: "RODINNE UBYTOVANI SE ZAHRADOU A TERASOU",
  shortDescription: "Svetly a klidny dum pro rodiny, s velkou zahradou, krytou terasou a dobrou polohou pro balatonske dny.",
  lead: "Dandelion D2 je klidna zakladna u Szent Gyorgy-hegy. Hodi se pro rodiny, ktere chteji zahradu, terasu, jednoduche vareni a kratke vylety k Balatonu, do vinic nebo na vyhlidky.",
  longDescription: [
    "Otevreny obytny prostor, prakticka kuchyne a kryta terasa davaji domu pomaly rytmus. Rano muze zacit venku u stolu, den pokracuje v kopcich nebo u vody a vecer se vraci do zahrady.",
    "Velka zahrada je prirozene misto pro deti, grilovani i odpocinek. Ubytovani zustava jednoduche na pouzivani, ale pritom ma dost prostoru pro delsi pobyt.",
    "Panorama Pool je spolecny pro hosty D1, D2 a Fugehaz od 1. cervna 2026. Neni to soukromy bazen pouze pro D2.",
    "Balaton, turisticke trasy Szent Gyorgy-hegy a vinařstvi v okoli jsou dostupne kratkou jizdou."
  ],
  facts: [["Hoste", "4-6 hostu"], ["Terasa", "kryta terasa a posezeni v zahrade"], ["Zahrada", "velka a dobre vyuzitelna"], ["Kuchyne", "prakticky vybavena"]],
  experienceFacts: [["Panorama Pool", "spolecny pro D1, D2 a Fugehaz od 1. cervna 2026"], ["Venkovni cas", "zahrada, terasa, gril"], ["Pro deti", "prostor a prirodni atmosfera"], ["V okoli", "Balaton, trasy, vinarstvi"]],
  highlights: ["Kryta terasa", "Velka zahrada", "Klimatizace", "Kuchyne", "Spolecny Panorama Pool", "Grilovani venku"],
  reasons: [
    { iconKey: "terrace", title: "Rana venku", text: "terasa a zahrada" },
    { iconKey: "users", title: "Pohodlne s detmi", text: "prostor a klid" },
    { iconKey: "balaton", title: "Balaton blizko", text: "voda, vino, vylety" },
    { iconKey: "home", title: "Klidna zakladna", text: "pro rodinny pobyt" }
  ],
  amenities: ["Wi-Fi", "Klimatizace", "Kuchyne", "Koupelna", "Topeni", "Zahradni posezeni", "Gril", "Parkovani"],
  mapBody: "Dandelion D2 lezi v klidne casti u Szent Gyorgy-hegy. Odtud se da dobre vyrazit k Balatonu, do Tapolcai-medence i mezi vinice.",
  mapBenefits: [{ label: "Turisticke trasy pobliz", icon: "trail" }, { label: "Vinarska oblast", icon: "grapes" }, { label: "Balaton kratkou jizdou", icon: "route" }]
});
