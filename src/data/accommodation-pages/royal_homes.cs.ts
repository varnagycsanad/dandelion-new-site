import { royalHomesEnglishPageData } from "./royal_homes.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const royalHomesCzechPageData = createCzechAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/cs/royal/",
  location: "Keszthely / Balaton",
  region: "Keszthely - Balaton",
  guests: "4-6 hostů",
  character: "APARTMAN BLIZKO BALATONU",
  shortDescription: "Pohodlný apartman v Keszthelyi, vhodny pro balatonské dny, prochazky a jednodušší mestsky rytmus.",
  lead: "Royal Homes je dobra volba pro hosty, kteri chteji byt blízko Balatonu, Keszthelye a programu u vody, ale zustat v klidném zazemi.",
  longDescription: [
    "Apartman spojuje pohodlne ubytování s balatonskou polohou. Hodi se pro rodinu nebo par, ktery chce travit čas u vody a mit vse prakticky blízko.",
    "Keszthely nabizi prochazky, plaze, restaurace i výletni smer k Hevizu nebo severnimu brehu Balatonu.",
    "Pobyt je více balatonsky a mestsky nez domy u Szent György-hegy, ale porad zustava v klidném stylu Dandelion."
  ],
  facts: [["Hosté", "4-6 hostů"], ["Poloha", "Keszthely / Balaton"], ["Typ", "apartman"], ["Vhodne pro", "balatonské dny"]],
  experienceFacts: [["Balaton", "voda a prochazky"], ["Keszthely", "mesto a programy"], ["Heviz", "výletni smer"], ["Rodiny", "prakticka poloha"]],
  highlights: ["Apartman", "Terasa", "Kuchyně", "Klimatizace", "Balaton poblíž", "Parkování"],
  reasons: [
    { iconKey: "balaton", title: "Balaton", text: "blízko vody" },
    { iconKey: "home", title: "Apartman", text: "pohodlne zazemi" },
    { iconKey: "route", title: "Keszthely", text: "programy poblíž" },
    { iconKey: "users", title: "Rodinna volba", text: "prakticky pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Klimatizace", "Terasa", "Koupelna", "Topení", "Parkování", "Balaton poblíž"],
  mapBody: "Royal Homes lezi v Keszthelyi, v dobře poloze pro balatonské plaze, promenady, restaurace a výlety v zapadni časti jezera.",
  mapBenefits: [{ label: "Balaton poblíž", icon: "balaton" }, { label: "Keszthely programy", icon: "route" }, { label: "Pohodlný apartman", icon: "home" }]
});
