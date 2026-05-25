import { fugehazEnglishPageData } from "./fugehaz.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const fugehazCzechPageData = createCzechAccommodationPage(fugehazEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Fugehaz",
  route: "/cs/dandelion-fugehaz/",
  location: "Szent Gyorgy-hegy / Kisapati",
  region: "Szent Gyorgy-hegy - Balatonska vrchovina",
  guests: "4-6 hostu",
  character: "PANORAMATICKY DUM PRO KLIDNY RODINNY POBYT",
  shortDescription: "Panoramaticky dum s terasami, prirodni atmosferou a dobrou polohou pro pomale dny u Szent Gyorgy-hegy.",
  lead: "Fugehaz je pro hosty, kteri chteji vyhledy, terasy, klid a citit krajinu kolem sebe. Dobre funguje pro rodinu i mensi skupinu.",
  longDescription: [
    "Dum ma nekolik venkovnich mist, kde se da snidat, odpocivat nebo vecer sedet s vyhledem. Atmosfera je prirodni a neformalni.",
    "Poloha u Szent Gyorgy-hegy dava snadny pristup k vyletum, vinarstvim a balatonskym programum.",
    "Hoste Fugehaz mohou od 1. cervna 2026 vyuzivat spolecny Panorama Pool pro D1, D2 a Fugehaz."
  ],
  facts: [["Hoste", "4-6 hostu"], ["Charakter", "terasovy panoramaticky dum"], ["Exterier", "venkovni posezeni"], ["Poloha", "u Szent Gyorgy-hegy"]],
  experienceFacts: [["Panorama Pool", "spolecny bazen od 1. cervna 2026"], ["Vyhledy", "kopce a krajina"], ["Vinarstvi", "kratke vylety do okoli"], ["Balaton", "dostupny autem"]],
  highlights: ["Panoramaticke terasy", "Klidna poloha", "Kuchyne", "Zahradni posezeni", "Spolecny Panorama Pool", "Prirodni atmosfera"],
  reasons: [
    { iconKey: "terrace", title: "Terasy", text: "pro pomale rano" },
    { iconKey: "trail", title: "Kopce pobliz", text: "vylety a vyhledy" },
    { iconKey: "pool", title: "Panorama Pool", text: "spolecny bazen" },
    { iconKey: "leaf", title: "Klid", text: "prirodni rytmus" }
  ],
  amenities: ["Wi-Fi", "Kuchyne", "Terasy", "Topeni", "Parkovani", "Venkovni posezeni", "Hot tub", "Koupelna"],
  mapBody: "Fugehaz je dobry vychozi bod pro Szent Gyorgy-hegy, Badacsony, vinice a pomale balatonske dny.",
  mapBenefits: [{ label: "Panoramaticka poloha", icon: "trail" }, { label: "Vinarstvi v okoli", icon: "grapes" }, { label: "Balaton na dosah", icon: "route" }]
});
