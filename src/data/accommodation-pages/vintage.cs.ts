import { vintageEnglishPageData } from "./vintage.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const vintageCzechPageData = createCzechAccommodationPage(vintageEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Vintage",
  route: "/cs/dandelion-vintage/",
  location: "Nemesgulacs / Balatonska vrchovina",
  region: "Nemesgulacs - Balatonska vrchovina",
  guests: "4 hoste",
  character: "UTULNY PENZION S VLASTNIM DVOREM",
  shortDescription: "Utulny dum v Nemesgulacsi s vlastnim dvorem, klidnou atmosferou a dobrou polohou pro vylety.",
  lead: "Dandelion Vintage je mensi, klidnejsi dum pro hosty, kteri chteji jednoduche zazemi, vlastni dvur a dobrou dostupnost Balatonu i kopcu.",
  longDescription: [
    "Vintage ma venkovsky charakter a komornejsi meritko. Vlastni dvur vytvari prijemny prostor pro rano, odpocinek i vecerni posezeni.",
    "Nemesgulacs je dobra zakladna pro Badacsony, Szent Gyorgy-hegy, Tapolcai-medence a balatonske programy.",
    "Dum je vhodny pro mensi rodinu, par nebo pratele, kteri hledaji klidnou, neprehnane hotelovou atmosferu."
  ],
  facts: [["Hoste", "az 4 hoste"], ["Loznice", "2 loznice"], ["Exterier", "vlastni dvur"], ["Poloha", "Nemesgulacs"]],
  experienceFacts: [["Badacsony", "vylety a vino"], ["Balaton", "kratka jizda"], ["Kopce", "Szent Gyorgy-hegy a okoli"], ["Klid", "mensi dum"]],
  highlights: ["Vlastni dvur", "2 loznice", "Kuchyne", "Klidna poloha", "Parkovani", "Venkovni posezeni"],
  reasons: [
    { iconKey: "leaf", title: "Vlastni dvur", text: "soukromy venkovni cas" },
    { iconKey: "home", title: "Utulny dum", text: "mensi meritko" },
    { iconKey: "route", title: "Dobra poloha", text: "Balaton a Badacsony" },
    { iconKey: "grapes", title: "Vinarsky region", text: "vylety do okoli" }
  ],
  amenities: ["Wi-Fi", "Kuchyne", "Vlastni dvur", "Topeni", "Parkovani", "Venkovni posezeni", "Koupelna", "Klidna poloha"],
  mapBody: "Dandelion Vintage lezi v Nemesgulacsi, prakticky mezi Balatonem, Badacsonyi a kopci Balatonske vrchoviny.",
  mapBenefits: [{ label: "Vlastni dvur", icon: "leaf" }, { label: "Badacsony pobliz", icon: "grapes" }, { label: "Balaton kratkou jizdou", icon: "route" }]
});
