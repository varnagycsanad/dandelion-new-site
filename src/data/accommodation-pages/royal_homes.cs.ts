import { royalHomesEnglishPageData } from "./royal_homes.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const royalHomesCzechPageData = createCzechAccommodationPage(royalHomesEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Royal Homes",
  route: "/cs/royal/",
  location: "Keszthely / Balaton",
  region: "Keszthely - Balaton",
  guests: "4-6 hostu",
  character: "APARTMAN BLIZKO BALATONU",
  shortDescription: "Pohodlny apartman v Keszthelyi, vhodny pro balatonske dny, prochazky a jednodussi mestsky rytmus.",
  lead: "Royal Homes je dobra volba pro hosty, kteri chteji byt blizko Balatonu, Keszthelye a programu u vody, ale zustat v klidnem zazemi.",
  longDescription: [
    "Apartman spojuje pohodlne ubytovani s balatonskou polohou. Hodi se pro rodinu nebo par, ktery chce travit cas u vody a mit vse prakticky blizko.",
    "Keszthely nabizi prochazky, plaze, restaurace i vyletni smer k Hevizu nebo severnimu brehu Balatonu.",
    "Pobyt je vice balatonsky a mestsky nez domy u Szent Gyorgy-hegy, ale porad zustava v klidnem stylu Dandelion."
  ],
  facts: [["Hoste", "4-6 hostu"], ["Poloha", "Keszthely / Balaton"], ["Typ", "apartman"], ["Vhodne pro", "balatonske dny"]],
  experienceFacts: [["Balaton", "voda a prochazky"], ["Keszthely", "mesto a programy"], ["Heviz", "vyletni smer"], ["Rodiny", "prakticka poloha"]],
  highlights: ["Apartman", "Terasa", "Kuchyne", "Klimatizace", "Balaton pobliz", "Parkovani"],
  reasons: [
    { iconKey: "balaton", title: "Balaton", text: "blizko vody" },
    { iconKey: "home", title: "Apartman", text: "pohodlne zazemi" },
    { iconKey: "route", title: "Keszthely", text: "programy pobliz" },
    { iconKey: "users", title: "Rodinna volba", text: "prakticky pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyne", "Klimatizace", "Terasa", "Koupelna", "Topeni", "Parkovani", "Balaton pobliz"],
  mapBody: "Royal Homes lezi v Keszthelyi, v dobre poloze pro balatonske plaze, promenady, restaurace a vylety v zapadni casti jezera.",
  mapBenefits: [{ label: "Balaton pobliz", icon: "balaton" }, { label: "Keszthely programy", icon: "route" }, { label: "Pohodlny apartman", icon: "home" }]
});
