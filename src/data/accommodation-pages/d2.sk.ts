import { d2EnglishPageData } from "./d2.en";
import { createSlovakAccommodationPage } from "./slovak-page-factory";

export const d2SlovakPageData = createSlovakAccommodationPage(d2EnglishPageData, {
  title: "Dandelion",
  titleAccent: "D2",
  route: "/sk/dandelion-d2/",
  location: "Kisapáti / Szent György-hegy",
  region: "Balatonská vrchovina - Szent György-hegy",
  guests: "4-6 hostí",
  character: "RODINNÉ UBYTOVANIE SO ZÁHRADOU A TERASOU",
  shortDescription: "Svetlý a pokojný dom pre rodiny, s veľkou záhradou, krytou terasou a dobrou polohou na balatonské dni.",
  lead: "Dandelion D2 je pokojná základňa pri Szent György-hegy. Hodí sa pre rodiny, ktoré chcú záhradu, terasu, jednoduché varenie a krátke výlety k Balatonu, do viníc alebo na vyhliadky.",
  longDescription: [
    "Otvorený obytný priestor, praktická kuchyňa a krytá terasa dávajú domu pomalý rytmus. Ráno sa môže začať vonku pri stole, deň pokračovať v kopcoch alebo pri vode a večer sa vracia do záhrady.",
    "Veľká záhrada je prirodzené miesto pre deti, grilovanie aj oddych. Ubytovanie sa používa jednoducho, no zároveň má dosť priestoru na dlhší pobyt.",
    "Panorama Pool je v sezóne k dispozícii hosťom D1, D2 a Fügeház od 15. júna 2026. Nie je to súkromný bazén iba pre D2.",
    "Balaton, turistické trasy Szent György-hegy a vinárstva v okolí sú dostupné krátkou jazdou."
  ],
  facts: [["Hostia", "4-6 hostí"], ["Terasa", "krytá terasa a posedenie v záhrade"], ["Záhrada", "veľká a dobre využiteľná"], ["Kuchyňa", "prakticky vybavená"]],
  experienceFacts: [["Panorama Pool", "pre hostí D1, D2 a Fügeház od 15. júna 2026"], ["Čas vonku", "záhrada, terasa, gril"], ["Pre deti", "priestor a prírodná atmosféra"], ["V okolí", "Balaton, trasy, vinárstva"]],
  highlights: ["Krytá terasa", "Veľká záhrada", "Klimatizácia", "Kuchyňa", "Panorama Pool", "Grilovanie vonku"],
  reasons: [
    { iconKey: "terrace", title: "Krytá terasa", text: "veľká záhrada" },
    { iconKey: "users", title: "Záhrada pre deti", text: "záhrada, zvieratá" },
    { iconKey: "balaton", title: "Balaton a kopce", text: "pláž, výlety" },
    { iconKey: "home", title: "Rodinná základňa", text: "priestranné izby" }
  ],
  geoDecision: {
    kicker: "D2 rýchle odpovede",
    title: "Dandelion D2 sa hodí, ak hľadáte rodinný dom so záhradou v Kisapáti",
    lead: "D2 je pohodlný pre 4-6 hostí, s veľkou záhradou, krytou terasou, renovovanou kuchyňou a prístupom k Panorama Pool od 15. júna 2026.",
    questions: [
      { iconKey: "pool", question: "Má Dandelion D2 prístup k bazénu?", answer: "Áno. Od 15. júna 2026 môžu hostia D2 využívať Panorama Pool spolu s hosťami D1 a Fügeház." },
      { iconKey: "family", question: "Pre koho je Dandelion D2 dobrá voľba?", answer: "D2 sa hodí najmä pre rodiny a menšie skupiny priateľov, ktoré hľadajú veľkú záhradu, krytú terasu a pokojnú základňu v Balatonskej vrchovine." },
      { iconKey: "guests", question: "Pre koľko hostí je Dandelion D2 pohodlný?", answer: "D2 je pohodlný pre 4-6 hostí, s galériovým obytným priestorom, manželskou posteľou, dvoma samostatnými lôžkami a rozkladacou pohovkou." },
      { iconKey: "garden", question: "Je D2 dobrá voľba s deťmi?", answer: "Áno. Veľká záhrada, vonkajšie posedenie a zvieratá okolo domu robia z D2 praktickú voľbu pre rodiny s deťmi." },
      { iconKey: "kitchen", question: "Aké vybavenie je v D2?", answer: "V D2 je renovovaná, dobre vybavená kuchyňa, umývačka riadu, klimatizácia, gigabitový internet, krb, vaňa, krytá terasa a posedenie v záhrade." },
      { iconKey: "mountain", question: "Na aké výlety je D2 dobrá základňa?", answer: "D2 je dobrá základňa pre Szent György-hegy, Balaton, svedecké vrchy, miestne vinárstva a Tapolcai-medence." }
    ],
    amenitiesTitle: "Čo je v D2 dôležité"
  },
  amenities: ["Wi-Fi", "Klimatizácia", "Kuchyňa", "Kúpeľňa", "Kúrenie", "Záhradné posedenie", "Gril", "Parkovanie"],
  mapBody: "Dandelion D2 leží v pokojnej časti pri Szent György-hegy. Odtiaľ sa dá dobre vyraziť k Balatonu, do Tapolcai-medence aj medzi vinice.",
  mapBenefits: [{ label: "Turistické trasy nablízku", icon: "trail" }, { label: "Vinárska oblasť", icon: "grapes" }, { label: "Balaton krátkou jazdou", icon: "route" }]
});
