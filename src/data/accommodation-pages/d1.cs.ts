import { d1EnglishPageData } from "./d1.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const d1CzechPageData = createCzechAccommodationPage(d1EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D1",
  route: "/cs/dandelion-d1/",
  location: "Kisapati / Szent Gyorgy-hegy",
  region: "Balatonska vrchovina - Tapolcai-medence",
  guests: "6-8 hostu",
  character: "PROSTORNY DUM PRO RODINY A PRATELE",
  shortDescription: "Prostorny dum pro vetsi rodinu nebo partu pratel, se zahradou, terasou a klidnou polohou u Szent Gyorgy-hegy.",
  lead: "Dandelion D1 je dobry pro spolecny pobyt, kdy je dulezity prostor, zahrada a jednoduche zazemi pro vylety po Balatonske vrchovine.",
  longDescription: [
    "Dum ma velkorysejsi rozvrzeni a dobre funguje pro rodiny nebo skupinu pratel. Hodi se pro spolecne snidane, pomale vecery a dny, kdy nekdo zustane v zahrade a nekdo vyrazi na vylet.",
    "Okoli Kisapati a Szent Gyorgy-hegy prinasi tiche cesty, vinice, vyhlidky a kratke presuny k Balatonu.",
    "Spolecny Panorama Pool patri k pobytum D1, D2 a Fugehaz od 1. cervna 2026."
  ],
  facts: [["Hoste", "6-8 hostu"], ["Loznice", "3 loznice"], ["Koupelny", "2 koupelny"], ["Exterier", "zahrada a terasa"]],
  experienceFacts: [["Panorama Pool", "spolecny bazen od 1. cervna 2026"], ["Pro skupiny", "vice prostoru pro spolecny cas"], ["Vylety", "Szent Gyorgy-hegy a Balaton"], ["Rytmus", "klidne dny v prirode"]],
  highlights: ["Velka zahrada", "Terasa", "3 loznice", "2 koupelny", "Spolecny Panorama Pool", "Parkovani"],
  reasons: [
    { iconKey: "guests", title: "Vice prostoru", text: "pro rodinu nebo pratele" },
    { iconKey: "garden", title: "Zahrada", text: "venkovni cas" },
    { iconKey: "pool", title: "Panorama Pool", text: "spolecny bazen" },
    { iconKey: "trail", title: "Dobra poloha", text: "kopce a Balaton" }
  ],
  amenities: ["Wi-Fi", "Kuchyne", "Zahrada", "Terasa", "Topeni", "Parkovani", "Koupelny", "Venkovni posezeni"],
  mapBody: "Dandelion D1 lezi v Kisapati, v dosahu Szent Gyorgy-hegy, Tapolcai-medence, vinic a Balatonu.",
  mapBenefits: [{ label: "Szent Gyorgy-hegy pobliz", icon: "trail" }, { label: "Pro vetsi skupinu", icon: "users" }, { label: "Balaton dostupny autem", icon: "route" }]
});
