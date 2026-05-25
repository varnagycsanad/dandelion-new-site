import { koveskalEnglishPageData } from "./koveskal.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const koveskalCzechPageData = createCzechAccommodationPage(koveskalEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Koveskal",
  route: "/cs/dandelion-koveskal/",
  location: "Koveskal / oblast Kali",
  region: "Kali-medence - Koveskal",
  guests: "kontaktni dotaz",
  character: "KLIDNA VESNICKA ATMOSFERA V OBLASTI KALI",
  shortDescription: "Klidne ubytovani v Koveskalu, vhodne pro pomale dny, gastronomii a vylety v oblasti Kali.",
  lead: "Dandelion Koveskal je pro hosty, kteri hledaji klidnejsi stranu Balatonske vrchoviny, vesnickou atmosferu a blizkost oblasti Kali.",
  longDescription: [
    "Koveskal ma jinou naladu nez domy u Szent Gyorgy-hegy: vice ticha, kamenne vesnice, gastronomie a pomale prochazky.",
    "Ubytovani je vhodne jako zakladna pro oblast Kali, vinice, male vesnice a vyhledy, ktere nejsou tak rusne jako hlavni balatonske smerovani.",
    "Pro Koveskal neni v projektu potvrzeny primy SabeeApp booking link, proto ceska cesta vede pres kontakt."
  ],
  facts: [["Poloha", "Koveskal / oblast Kali"], ["Charakter", "klidna vesnice"], ["Rezervace", "pres kontakt"], ["Vhodne pro", "pomale dny"]],
  experienceFacts: [["Kali-medence", "vesnice a krajina"], ["Gastronomie", "mistni restaurace"], ["Vino", "vinarstvi v okoli"], ["Klid", "mene rusny pobyt"]],
  highlights: ["Oblast Kali", "Klidna vesnice", "Kontaktni rezervace", "Vylety", "Gastronomie", "Vinarska krajina"],
  reasons: [
    { iconKey: "leaf", title: "Ticho oblasti Kali", text: "pomale tempo" },
    { iconKey: "route", title: "Vesnice a vylety", text: "Koveskal a okoli" },
    { iconKey: "grapes", title: "Vino a gastronomie", text: "lokalni atmosfera" },
    { iconKey: "home", title: "Jednoducha zakladna", text: "pro klidny pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyne", "Koupelna", "Topeni", "Parkovani", "Klidna poloha", "Vylety v okoli", "Kontaktni rezervace"],
  mapBody: "Dandelion Koveskal lezi v oblasti Kali, ktera je znama tichymi vesnicemi, gastronomii, vinicemi a pomalejsim rytmem.",
  mapBenefits: [{ label: "Oblast Kali", icon: "leaf" }, { label: "Gastronomie a vino", icon: "grapes" }, { label: "Klidna vesnice", icon: "home" }]
});
