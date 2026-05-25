import { zsalyaEnglishPageData } from "./zsalya.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const zsalyaCzechPageData = createCzechAccommodationPage(zsalyaEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Zsálya",
  route: "/cs/dandelion-zsalya/",
  location: "Kisapáti / Szent György-hegy",
  region: "Szent György-hegy - Kisapáti",
  guests: "2-4 hosté",
  character: "KLIDNY SAMOSTATNY PENZION S TERASOU",
  shortDescription: "Mensi samostatny dům pro pary, rodinu nebo přátele, s krytou terasou a klidnou polohou u Szent György-hegy.",
  lead: "Zsálya je prirozene klidná volba pro hosty, kteri chteji soukromi, pomaly rytmus a blízkost kopcu i Balatonu.",
  longDescription: [
    "Dům pusobi soukrome a jednoduse. Krytá terasa prodluzuje obytny prostor ven a dobře funguje pro snidane i večerni posezení.",
    "Poloha je vhodna pro krátké výlety, víno, turistiku a odpocinek mimo rusne balatonské centrum.",
    "Zsálya je dobra volba pro pary, menší rodiny nebo přátele, kteri nechteji velky dům."
  ],
  facts: [["Hosté", "2-4 hosté"], ["Ložnice", "2 ložnice"], ["Terasa", "krytá terasa"], ["Atmosfera", "klid a soukromi"]],
  experienceFacts: [["Szent György-hegy", "trasy a výhledy poblíž"], ["Balaton", "krátká jízda autem"], ["Víno", "vinařství v regionu"], ["Tempo", "pomalé dny"]],
  highlights: ["Krytá terasa", "Klimatizace", "Kuchyně", "Soukromi", "Parkování", "Klidná poloha"],
  reasons: [
    { iconKey: "terrace", title: "Krytá terasa", text: "venku i pri zméně počasi" },
    { iconKey: "leaf", title: "Klid", text: "mimo rusne centrum" },
    { iconKey: "users", title: "Mensi pobyt", text: "pary a mala rodina" },
    { iconKey: "route", title: "Dobra dostupnost", text: "kopce i Balaton" }
  ],
  amenities: ["Wi-Fi", "Klimatizace", "Kuchyně", "Terasa", "Topení", "Parkování", "Koupelna", "Venkovní posezení"],
  mapBody: "Zsálya lezi na vychodni strane Szent György-hegy, odkud se da snadno vyrazit na vyhlidky, k Balatonu i do vinic.",
  mapBenefits: [{ label: "Klidná poloha", icon: "leaf" }, { label: "Kopce poblíž", icon: "trail" }, { label: "Balaton krátkou jízdou", icon: "route" }]
});
