import { koveskalEnglishPageData } from "./koveskal.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const koveskalCzechPageData = createCzechAccommodationPage(koveskalEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Köveskál",
  route: "/cs/dandelion-koveskal/",
  location: "Köveskál / oblast Káli",
  region: "Káli-medence - Köveskál",
  guests: "kontaktni dotaz",
  character: "KLIDNA VESNICKA ATMOSFERA V OBLASTI KALI",
  shortDescription: "Klidné ubytování v Köveskálu, vhodne pro pomalé dny, gastronomii a výlety v oblasti Káli.",
  lead: "Dandelion Köveskál je pro hosty, kteri hledaji klidnéjsi stranu Balatonské vrchoviny, vesnickou atmosferu a blízkost oblasti Káli.",
  longDescription: [
    "Köveskál ma jinou naladu nez domy u Szent György-hegy: více ticha, kamenne vesnice, gastronomie a pomalé prochazky.",
    "Ubytování je vhodne jako základna pro oblast Káli, vinice, male vesnice a výhledy, ktere nejsou tak rusne jako hlavni balatonské smerovani.",
    "Pro Köveskál neni v projektu potvrzeny primy SabeeApp booking link, proto ceska cesta vede přes kontakt."
  ],
  facts: [["Poloha", "Köveskál / oblast Káli"], ["Charakter", "klidná vesnice"], ["Rezervace", "přes kontakt"], ["Vhodne pro", "pomalé dny"]],
  experienceFacts: [["Káli-medence", "vesnice a krajina"], ["Gastronomie", "mistni restaurace"], ["Víno", "vinařství v okolí"], ["Klid", "méně rusny pobyt"]],
  highlights: ["Oblast Káli", "Klidná vesnice", "Kontaktni rezervace", "Vylety", "Gastronomie", "Vinařská krajina"],
  reasons: [
    { iconKey: "leaf", title: "Ticho oblasti Káli", text: "pomalé tempo" },
    { iconKey: "route", title: "Vesnice a výlety", text: "Köveskál a okolí" },
    { iconKey: "grapes", title: "Víno a gastronomie", text: "lokalni atmosfera" },
    { iconKey: "home", title: "Jednoducha základna", text: "pro klidný pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Koupelna", "Topení", "Parkování", "Klidná poloha", "Vylety v okolí", "Kontaktni rezervace"],
  mapBody: "Dandelion Köveskál lezi v oblasti Káli, ktera je znama tichymi vesnicemi, gastronomii, vinicemi a pomaléjsim rytmem.",
  mapBenefits: [{ label: "Oblast Káli", icon: "leaf" }, { label: "Gastronomie a víno", icon: "grapes" }, { label: "Klidná vesnice", icon: "home" }]
});
