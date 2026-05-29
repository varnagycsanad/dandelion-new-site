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
  lead: "Dandelion D2 je klidná základna u Szent György-hegy. Hodí se pro rodiny, které chtějí zahradu, terasu, jednoduché vaření a krátké výlety k Balatonu, do vinic nebo na vyhlídky.",
  longDescription: [
    "Otevřený obytný prostor, praktická kuchyně a krytá terasa dávají domu pomalý rytmus. Ráno může začít venku u stolu, den pokračuje v kopcích nebo u vody a večer se vrací do zahrady.",
    "Velká zahrada je přirozené místo pro děti, grilování i odpočinek. Ubytování zůstává jednoduché na používání, ale přitom má dost prostoru pro delší pobyt.",
    "Panorama Pool je společný pro hosty D1, D2 a Fügeház od 15. června 2026. Neni to soukromy bazén pouze pro D2.",
    "Balaton, turistické trasy Szent György-hegy a vinařství v okolí jsou dostupné krátkou jízdou."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Terasa", "krytá terasa a posezení v zahradě"], ["Zahrada", "velká a dobře využitelná"], ["Kuchyně", "prakticky vybavená"]],
  experienceFacts: [["Panorama Pool", "společný pro D1, D2 a Fügeház od 15. června 2026"], ["Venkovní čas", "zahrada, terasa, gril"], ["Pro děti", "prostor a přírodní atmosféra"], ["V okolí", "Balaton, trasy, vinařství"]],
  highlights: ["Krytá terasa", "Velka zahrada", "Klimatizace", "Kuchyně", "Společný Panorama Pool", "Grilovani venku"],
  reasons: [
    { iconKey: "terrace", title: "Rana venku", text: "terasa a zahrada" },
    { iconKey: "users", title: "Pohodlne s detmi", text: "prostor a klid" },
    { iconKey: "balaton", title: "Balaton blízko", text: "voda, víno, výlety" },
    { iconKey: "home", title: "Klidná základna", text: "pro rodinný pobyt" }
  ],
  amenities: ["Wi-Fi", "Klimatizace", "Kuchyně", "Koupelna", "Topení", "Zahradni posezení", "Gril", "Parkování"],
  mapBody: "Dandelion D2 leží v klidné části u Szent György-hegy. Odtud se dá dobře vyrazit k Balatonu, do Tapolcai-medence i mezi vinice.",
  mapBenefits: [{ label: "Turisticke trasy poblíž", icon: "trail" }, { label: "Vinařská oblast", icon: "grapes" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});
