import { zsalyaEnglishPageData } from "./zsalya.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const zsalyaCzechPageData = createCzechAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsalya",
  route: "/cs/dandelion-zsalya/",
  location: "Kisapati / Szent Gyorgy-hegy",
  region: "Szent Gyorgy-hegy - Kisapati",
  guests: "2-4 hoste",
  character: "KLIDNY SAMOSTATNY PENZION S TERASOU",
  shortDescription: "Mensi samostatny dum pro pary, rodinu nebo pratele, s krytou terasou a klidnou polohou u Szent Gyorgy-hegy.",
  lead: "Zsalya je prirozene klidna volba pro hosty, kteri chteji soukromi, pomaly rytmus a blizkost kopcu i Balatonu.",
  longDescription: [
    "Dum pusobi soukrome a jednoduse. Kryta terasa prodluzuje obytny prostor ven a dobre funguje pro snidane i vecerni posezeni.",
    "Poloha je vhodna pro kratke vylety, vino, turistiku a odpocinek mimo rusne balatonske centrum.",
    "Zsalya je dobra volba pro pary, mensi rodiny nebo pratele, kteri nechteji velky dum."
  ],
  facts: [["Hoste", "2-4 hoste"], ["Loznice", "2 loznice"], ["Terasa", "kryta terasa"], ["Atmosfera", "klid a soukromi"]],
  experienceFacts: [["Szent Gyorgy-hegy", "trasy a vyhledy pobliz"], ["Balaton", "kratka jizda autem"], ["Vino", "vinarstvi v regionu"], ["Tempo", "pomale dny"]],
  highlights: ["Kryta terasa", "Klimatizace", "Kuchyne", "Soukromi", "Parkovani", "Klidna poloha"],
  reasons: [
    { iconKey: "terrace", title: "Kryta terasa", text: "venku i pri zmene pocasi" },
    { iconKey: "leaf", title: "Klid", text: "mimo rusne centrum" },
    { iconKey: "users", title: "Mensi pobyt", text: "pary a mala rodina" },
    { iconKey: "route", title: "Dobra dostupnost", text: "kopce i Balaton" }
  ],
  amenities: ["Wi-Fi", "Klimatizace", "Kuchyne", "Terasa", "Topeni", "Parkovani", "Koupelna", "Venkovni posezeni"],
  mapBody: "Zsalya lezi na vychodni strane Szent Gyorgy-hegy, odkud se da snadno vyrazit na vyhlidky, k Balatonu i do vinic.",
  mapBenefits: [{ label: "Klidna poloha", icon: "leaf" }, { label: "Kopce pobliz", icon: "trail" }, { label: "Balaton kratkou jizdou", icon: "route" }]
});
