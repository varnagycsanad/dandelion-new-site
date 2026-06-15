import { koveskalEnglishPageData } from "./koveskal.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

// [CHANGE 2026-06-15 00:00] Köveskál szlovák férőhely és szolgáltatás-meta magyar oldalhoz igazítva.
export const koveskalSlovakPageData = createSlovakAccommodationPage(koveskalEnglishPageData, {
  title: "Dandelion",
  titleAccent: "Köveskál",
  route: "/sk/dandelion-koveskal/",
  location: "Köveskál / oblasť Káli",
  region: "Káli-medence - Köveskál",
  guests: "až 6 hostí",
  character: "POKOJNÁ DEDINSKÁ ATMOSFÉRA V OBLASTI KÁLI",
  shortDescription: "Pokojné ubytovanie v Köveskáli, vhodné na pomalé dni, gastronómiu a výlety v oblasti Káli.",
  lead: "Dandelion Köveskál je pre hostí, ktorí hľadajú pokojnejšiu stranu Balatonskej vrchoviny, dedinskú atmosféru a blízkosť oblasti Káli.",
  longDescription: [
    "Köveskál má inú náladu než domy pri Szent György-hegy: viac ticha, kamenné dediny, gastronómiu a pomalé prechádzky.",
    "Ubytovanie je vhodné ako základňa pre oblasť Káli, vinice, malé dediny a výhľady, ktoré nie sú také rušné ako hlavné balatonské smery.",
    "Pri Köveskáli je vhodné riešiť rezerváciu samostatným dopytom, pretože online rezervačný stav vyžaduje osobitné potvrdenie."
  ],
  facts: [["Hostia", "až 6 hostí"], ["Poloha", "Köveskál / oblasť Káli"], ["Charakter", "pokojná dedina"], ["Vhodné na", "pomalé dni"]],
  experienceFacts: [["Káli-medence", "dediny a krajina"], ["Gastronómia", "miestne reštaurácie"], ["Víno", "vinárstva v okolí"], ["Pokoj", "menej rušný pobyt"]],
  highlights: ["Oblasť Káli", "Pokojná dedina", "Veľká záhrada", "Výlety", "Gastronómia", "Vinárska krajina"],
  reasons: [
    { iconKey: "leaf", title: "Ticho oblasti Káli", text: "pomalé tempo" },
    { iconKey: "route", title: "Dediny a výlety", text: "Köveskál a okolie" },
    { iconKey: "grapes", title: "Víno a gastronómia", text: "lokálna atmosféra" },
    { iconKey: "home", title: "Jednoduchá základňa", text: "na pokojný pobyt" }
  ],
  amenities: ["Wi-Fi", "Kuchyňa", "2 kúpeľne", "Kúrenie", "Parkovanie", "Veľká záhrada", "Výlety v okolí", "Pokojná poloha"],
  geoDecision: {
    kicker: "Köveskál rýchle odpovede",
    title: "Dandelion Köveskál je dobrá voľba, ak hľadáte pokojný penzión s dedinskou atmosférou v oblasti Káli, na pomalšie dni a výlety",
    lead: "Penzión Köveskál ponúka pokojnú základňu v oblasti Káli až pre 6 hostí, s veľkou záhradou, veľkou terasou, 2 kúpeľňami, dedinským rytmom a vinárskymi aj gastronomickými programami v okolí.",
    questions: [
      { question: "Pre koho je Dandelion Köveskál vhodný?", answer: "Pre väčšie rodiny a skupiny priateľov, ktoré nehľadajú rušné ubytovanie priamo pri Balatone, ale pokojnejšiu dedinskú atmosféru oblasti Káli v Köveskáli." },
      { question: "Pre koľko hostí je Köveskál pohodlný?", answer: "Dom je pohodlný až pre 6 hostí. Usporiadanie ponúka 2 manželské postele a 2 samostatné lôžka; 2 kúpeľne spríjemňujú dlhší pobyt." },
      { question: "Aká je záhrada a terasa?", answer: "Veľká záhrada a veľká terasa sa hodia na pomalšie dni: raňajky vonku, večerné rozhovory, čítanie a pokojný spoločný čas." },
      { question: "Na aké programy je Köveskál dobrým východiskovým bodom?", answer: "Je dobrou základňou pre dediny oblasti Káli, prechádzky, vinárske a gastronomické zastávky, Hegyestű, Salföld, Badacsony aj výlety k Balatonu." },
      { question: "Čím sa Köveskál líši od ubytovania priamo pri Balatone?", answer: "Köveskál nie je ubytovanie priamo pri vode, ale pokojnejšia, viac dedinská voľba v oblasti Káli. Hodí sa, keď sú krajina, dediny, víno a pomalšie tempo dôležitejšie než priamy prístup na pláž." },
      { question: "Aký je dvor pri penzióne Köveskál?", answer: "K domu patrí pekný uzavretý dvor, ktorý sa hodí na raňajky vonku, pokojné večery, čítanie aj pomalší rodinný oddych." }
    ],
    amenitiesTitle: "Čo je v Köveskáli dôležité"
  },
  mapBody: "Dandelion Köveskál leží v oblasti Káli, ktorá je známa tichými dedinami, gastronómiou, vinicami a pomalším rytmom.",
  mapBenefits: [{ label: "Oblasť Káli", icon: "leaf" }, { label: "Gastronómia a víno", icon: "grapes" }, { label: "Pokojná dedina", icon: "home" }]
});
