import { szepvolgyiEnglishPageData } from "./szepvolgyi.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const szepvolgyiCzechPageData = createCzechAccommodationPage(szepvolgyiEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Szepvolgyi",
  route: "/cs/szepvolgyi/",
  location: "Badacsonyors / Balaton",
  region: "Badacsonyors - Balaton",
  guests: "az 8 hostu",
  character: "VELKY DUM S BALATONSKYM PANORAMATEM",
  shortDescription: "Prostorny dum u Badacsonyors az pro 8 hostu, s vyhledem na Balaton a dobrym zazemim pro rodiny.",
  lead: "Szepvolgyi je pro vetsi rodinu nebo skupinu, ktera chce byt blizko Balatonu, Badacsonye a mit dost prostoru pro spolecny pobyt.",
  longDescription: [
    "Dum nabizi vice loznic, zahradu a prakticke zazemi pro delsi pobyt. Vyhled na Balaton dava pobytu silny letni charakter.",
    "Poloha u Badacsonyors je dobra pro plaze, vecerni programy v Badacsonyi, Folly Arboretum i vylety smerem Szigliget.",
    "Szepvolgyi dobre funguje, kdyz chcete kombinovat vodu, vino, vyhled a spolecny cas ve vetsim dome."
  ],
  facts: [["Hoste", "az 8 hostu"], ["Loznice", "4 loznice"], ["Koupelny", "2 koupelny"], ["Poloha", "Badacsonyors / Balaton"]],
  experienceFacts: [["Balaton", "plaze a promenady pobliz"], ["Badacsony", "vino a vecere"], ["Vyhled", "balatonske panorama"], ["Rodiny", "vice prostoru"]],
  highlights: ["4 loznice", "2 koupelny", "Balatonske panorama", "Zahrada", "Kuchyne", "Parkovani"],
  reasons: [
    { iconKey: "guests", title: "Az 8 hostu", text: "pro vetsi skupinu" },
    { iconKey: "balaton", title: "Balaton", text: "voda a vyhled" },
    { iconKey: "home", title: "Prostor", text: "vice loznic" },
    { iconKey: "route", title: "Badacsony", text: "programy pobliz" }
  ],
  amenities: ["Wi-Fi", "Kuchyne", "Zahrada", "Terasa", "2 koupelny", "Parkovani", "Topeni", "Venkovni posezeni"],
  mapBody: "Szepvolgyi lezi v Badacsonyors, odkud je blizko k Balatonu, Badacsonyi, plazim, vinum i rodinnym programum.",
  mapBenefits: [{ label: "Balaton pobliz", icon: "balaton" }, { label: "Badacsony a vino", icon: "grapes" }, { label: "Pro vetsi rodiny", icon: "users" }]
});
