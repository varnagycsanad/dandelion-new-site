import { koveskalEnglishPageData } from "./koveskal.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

export const koveskalCzechPageData = createCzechAccommodationPage(koveskalEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Köveskál",
  route: "/cs/dandelion-koveskal/",
  location: "Köveskál / oblast Káli",
  region: "Káli-medence - Köveskál",
  guests: "anglicky rezervační systém",
  character: "KLIDNA VESNICKA ATMOSFERA V OBLASTI KALI",
  shortDescription: "Klidné ubytování v Köveskálu, vhodné pro pomalé dny, gastronomii a výlety v oblasti Káli.",
  lead: "Dandelion Köveskál je pro hosty, kteří hledají klidnější stranu Balatonské vrchoviny, vesnickou atmosféru a blízkost oblasti Káli.",
  longDescription: [
    "Köveskál má jinou náladu než domy u Szent György-hegy: více ticha, kamenné vesnice, gastronomie a pomalé procházky.",
    "Ubytování je vhodné jako základna pro oblast Káli, vinice, malé vesnice a výhledy, které nejsou tak rušné jako hlavní balatonské směřování.",
    "Pro Köveskál vede česká rezervační výzva do společného anglického SabeeApp rezervačního systému."
  ],
  facts: [["Poloha", "Köveskál / oblast Káli"], ["Charakter", "klidná vesnice"], ["Rezervace", "anglický SabeeApp"], ["Vhodné pro", "pomalé dny"]],
  experienceFacts: [["Káli-medence", "vesnice a krajina"], ["Gastronomie", "místní restaurace"], ["Víno", "vinařství v okolí"], ["Klid", "méně rušný pobyt"]],
  highlights: ["Oblast Káli", "Klidná vesnice", "Anglický booking", "Vylety", "Gastronomie", "Vinařská krajina"],
  reasons: [
    { iconKey: "leaf", title: "Ticho oblasti Káli", text: "pomalé tempo" },
    { iconKey: "route", title: "Vesnice a výlety", text: "Köveskál a okolí" },
    { iconKey: "grapes", title: "Víno a gastronomie", text: "lokální atmosféra" },
    { iconKey: "home", title: "Jednoduchá základna", text: "pro klidný pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "Koupelna", "Topení", "Parkování", "Klidná poloha", "Vylety v okolí", "Anglický booking"],
  mapBody: "Dandelion Köveskál leží v oblasti Káli, která je známá tichými vesnicemi, gastronomií, vinicemi a pomalejším rytmem.",
  mapBenefits: [{ label: "Oblast Káli", icon: "leaf" }, { label: "Gastronomie a víno", icon: "grapes" }, { label: "Klidná vesnice", icon: "home" }]
});
