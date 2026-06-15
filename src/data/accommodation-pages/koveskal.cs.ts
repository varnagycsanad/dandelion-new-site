import { koveskalEnglishPageData } from "./koveskal.en";
import { createCzechAccommodationPage } from "./czech-page-factory";

// [CHANGE 2026-06-15 00:00] Köveskál cseh férőhely és szolgáltatás-meta magyar oldalhoz igazítva.
export const koveskalCzechPageData = createCzechAccommodationPage(koveskalEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Köveskál",
  route: "/cs/dandelion-koveskal/",
  location: "Köveskál / oblast Káli",
  region: "Káli-medence - Köveskál",
  guests: "až 6 hostů",
  character: "KLIDNA VESNICKA ATMOSFERA V OBLASTI KALI",
  shortDescription: "Klidné ubytování v Köveskálu, vhodné pro pomalé dny, gastronomii a výlety v oblasti Káli.",
  lead: "Dandelion Köveskál je pro hosty, kteří hledají klidnější stranu Balatonské vrchoviny, vesnickou atmosféru a blízkost oblasti Káli.",
  longDescription: [
    "Köveskál má jinou náladu než domy u Szent György-hegy: více ticha, kamenné vesnice, gastronomie a pomalé procházky.",
    "Ubytování je vhodné jako základna pro oblast Káli, vinice, malé vesnice a výhledy, které nejsou tak rušné jako hlavní balatonské směřování.",
    "U Köveskálu je rezervaci vhodné řešit samostatným dotazem, protože online rezervační stav vyžaduje zvláštní potvrzení."
  ],
  facts: [["Hosté", "až 6 hostů"], ["Poloha", "Köveskál / oblast Káli"], ["Charakter", "klidná vesnice"], ["Vhodné pro", "pomalé dny"]],
  experienceFacts: [["Káli-medence", "vesnice a krajina"], ["Gastronomie", "místní restaurace"], ["Víno", "vinařství v okolí"], ["Klid", "méně rušný pobyt"]],
  highlights: ["Oblast Káli", "Klidná vesnice", "Velká zahrada", "Výlety", "Gastronomie", "Vinařská krajina"],
  reasons: [
    { iconKey: "leaf", title: "Ticho oblasti Káli", text: "pomalé tempo" },
    { iconKey: "route", title: "Vesnice a výlety", text: "Köveskál a okolí" },
    { iconKey: "grapes", title: "Víno a gastronomie", text: "lokální atmosféra" },
    { iconKey: "home", title: "Jednoduchá základna", text: "pro klidný pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyně", "2 koupelny", "Topení", "Parkování", "Velká zahrada", "Výlety v okolí", "Klidná poloha"],
  geoDecision: {
    kicker: "Köveskál rychlé odpovědi",
    title: "Dandelion Köveskál je dobrá volba, pokud hledáte klidný penzion s vesnickou atmosférou v oblasti Káli, pro pomalejší dny a výlety",
    lead:
      "Penzion Köveskál nabízí klidnou základnu v oblasti Káli až pro 6 hostů, s velkou zahradou, velkou terasou, 2 koupelnami, vesnickým rytmem a vinařskými i gastronomickými programy v okolí.",
    questions: [
      {
        question: "Pro koho je Dandelion Köveskál vhodný?",
        answer:
          "Pro větší rodiny a skupiny přátel, které nehledají rušné ubytování přímo u Balatonu, ale klidnější vesnickou atmosféru oblasti Káli v Köveskálu."
      },
      {
        question: "Pro kolik hostů je Köveskál pohodlný?",
        answer:
          "Dům je pohodlný až pro 6 hostů. Uspořádání nabízí 2 manželské postele a 2 samostatná lůžka; 2 koupelny zpříjemňují delší pobyt."
      },
      {
        question: "Jaká je zahrada a terasa?",
        answer:
          "Velká zahrada a velká terasa se hodí pro pomalejší dny: snídani venku, večerní rozhovory, čtení a klidný společný čas."
      },
      {
        question: "Na jaké programy je Köveskál dobrým výchozím bodem?",
        answer:
          "Je dobrou základnou pro vesnice oblasti Káli, procházky, vinařské a gastronomické zastávky, Hegyestű, Salföld, Badacsony i výlety k Balatonu."
      },
      {
        question: "Čím se Köveskál liší od ubytování přímo u Balatonu?",
        answer:
          "Köveskál není ubytování přímo u vody, ale klidnější, více vesnická volba v oblasti Káli. Hodí se, když jsou krajina, vesnice, víno a pomalejší tempo důležitější než přímý přístup na pláž."
      },
      {
        question: "Jaký je dvůr u penzionu Köveskál?",
        answer:
          "K domu patří pěkný uzavřený dvůr, který se hodí na snídani venku, klidné večery, čtení i pomalejší rodinný odpočinek."
      }
    ],
    amenitiesTitle: "Co je v Köveskálu důležité"
  },
  mapBody: "Dandelion Köveskál leží v oblasti Káli, která je známá tichými vesnicemi, gastronomií, vinicemi a pomalejším rytmem.",
  mapBenefits: [{ label: "Oblast Káli", icon: "leaf" }, { label: "Gastronomie a víno", icon: "grapes" }, { label: "Klidná vesnice", icon: "home" }]
});
