import type { AutumnCampaignLang } from "./autumn-2026-localized";
import { autumnMultiHouseByAudience, type AutumnMultiHouseKey } from "./autumn-multihouse";

export type AutumnMultiHouseFamilyGuidePart = {
  text: string;
  houseKey?: AutumnMultiHouseKey;
};

export type AutumnMultiHouseFamilyCopy = {
  heroLead: string[];
  heroValueAria: string;
  heroValueLabel: string;
  heroValueAction: string;
  bookingBadge: string;
  benefitsAria: string;
  benefitsKicker: string;
  benefitsTitle: string;
  benefitsLead: string;
  benefits: string[];
  priceDialogKicker: string;
  priceDialogClose: string;
  priceDialogTitle: string;
  priceDialogIntro: string;
  priceDialogStat: string;
  priceDialogBenefits: string[];
  priceDialogCta: string;
  moodKicker: string;
  moodTitle: string;
  moodIntro: string;
  selectionAria: string;
  selectionKicker: string;
  selectionBullets: string[];
  moodCards: Array<{ label: string; title: string[]; copy: string }>;
  familyGuide: {
    eyebrow: string;
    title: string;
    lead: string;
    cards: Array<{ title: string; parts: AutumnMultiHouseFamilyGuidePart[] }>;
    babyLabel: string;
    babyText: string;
    programsLabel: string;
    programs: string[];
  };
  pickerTitle: string;
  pickerLead: string;
  houseLabel: string;
  houseWhy: string;
  houseView: string;
  recommendations: Record<AutumnMultiHouseKey, string>;
  houseBullets: Partial<Record<AutumnMultiHouseKey, string[]>>;
  directDiscountLabel: string;
  directBenefits: string[];
  bookingCta: string;
  contactCta: string;
  whatsappCta: string;
};

const familyCopyByLang: Record<AutumnCampaignLang, AutumnMultiHouseFamilyCopy> = {
  hu: {
    heroLead: [
      "Vendégeskedjetek családotokkal a Balaton-felvidéki Dandelion-házakban,",
      "és legyen örök élmény a közös pihenés!"
    ],
    heroValueAria: "Mutasd meg, mit jelent a 8% ár-előny",
    heroValueLabel: "ár-előny · részletek",
    heroValueAction: "IDE KATTINTS",
    bookingBadge: "Megéri itt foglalni!",
    benefitsAria: "Közvetlen foglalás előnyei",
    benefitsKicker: "KÖZVETLEN FOGLALÁS",
    benefitsTitle: "Közvetlenül éri meg",
    benefitsLead: "A közvetlen foglalás előnyei:",
    benefits: [
      "8% ár-előny a portálokhoz képest",
      "Azonnali bankkártyás fizetés",
      "Gyors, átlátható foglalási folyamat",
      "Közvetlen kapcsolat a szállásadóval"
    ],
    priceDialogKicker: "KÖZVETLEN FOGLALÁS",
    priceDialogClose: "Bezárás",
    priceDialogTitle: "Közvetlenül éri meg",
    priceDialogIntro: "A szabad időpontokat és az árakat közvetlenül a saját foglalási felületünkön nézhetitek meg.",
    priceDialogStat: "ár-előny a portálokhoz képest",
    priceDialogBenefits: ["Közvetlen kapcsolat a szállásadóval", "Gyors visszaigazolás", "Rugalmas ügyintézés"],
    priceDialogCta: "Árak és szabad időpontok",
    moodKicker: "MIÉRT DANDELION ŐSSZEL?",
    moodTitle: "Ősszel a családdal együtt lenni a legjobb!",
    moodIntro: "Közös reggelik, nagy séták, játékos délutánok és meghitt esték – együtt minden nap emlékezetesebb.",
    selectionAria: "Választást segítő tippek",
    selectionKicker: "CSALÁDI ŐSZI ÖTLETEK",
    selectionBullets: [
      "Nagyobb közös térhez elsőként a Dandelion D2 és a Dandelion Szépvölgyi kártyáit érdemes megnézni.",
      "A közös beltéri programok ugyanúgy működhetnek, mint a kerti napok — a rossz idő sem állítja meg a pihenést.",
      "A Köveskál, a Vintage vagy a Szőlőliget jó kiindulópont lehet kirándulásokhoz és csendes családi pihenéshez."
    ],
    moodCards: [
      { label: "KÖZÖS RITMUS", title: ["Közös terek,", "közös ritmus."], copy: "Együtt lehet lenni úgy, hogy mindenkinek jut saját helye." },
      { label: "ESŐS NAPOK", title: ["A rossz idő", "nem programvége."], copy: "Kandalló, beltéri terek és közös vacsorák." },
      { label: "KINT", title: ["Kert, grillezés,", "tűzrakás."], copy: "A gyerekeknek mozgás, a felnőtteknek nyugodt este." }
    ],
    familyGuide: {
      eyebrow: "CSALÁDI SZÁLLÁSÖTLETEK",
      title: "Milyen házakat ajánlunk a családoknak?",
      lead: "A család életkorához és a közös pihenés ritmusához igazítva könnyebb megtalálni a hozzátok illő Dandelion-házat.",
      cards: [
        { title: "Babával érkezőknek", parts: [{ text: "Dandelion D2", houseKey: "d2" }, { text: ", " }, { text: "Dandelion Fügeház", houseKey: "fugehaz" }, { text: " és " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " – ezekben ingyenesen elérhetők a babafelszerelések." }] },
        { title: "Nagyobb családoknak", parts: [{ text: "A " }, { text: "Dandelion Szépvölgyi", houseKey: "szepvolgyi" }, { text: " tágas, négy hálószobás háza mellett a " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " két hálószobával és jacuzzival is jó választás – a nagyobb gyerekeknek különösen tetszeni fog." }] },
        { title: "Kamaszokkal nyaralóknak", parts: [{ text: "A " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", a " }, { text: "Dandelion Vintage", houseKey: "vintage" }, { text: " és a " }, { text: "Dandelion Zsálya", houseKey: "zsalya" }, { text: " szeparált szobái lehetőséget adnak a kamaszoknak egy kis önállóságra, miközben a család együtt marad." }] }
      ],
      babyLabel: "BABABARÁT KIEGÉSZÍTŐK",
      babyText: "A picik kényelmét szolgáló kiságy, babakád és fellépő térítésmentesen kérhető. Ezek nem minden házban érhetők el, ezért kérjük, előre jelezzétek az igényt.",
      programsLabel: "CSALÁDI PROGRAMOK",
      programs: ["Könnyebb és nehezebb túrák a tanúhegyeken.", "Nagyszerű játszótér a faluban.", "Gyönyörű túraútvonalak és aktív pihenés.", "Biciklibérlési lehetőség – érdeklődjetek nálunk.", "Barlangtúra a Tapolcai-tavasbarlangban.", "Családi nap a keszthelyi Festetics-kastélyban."]
    },
    pickerTitle: "Melyik ház illik a családotokhoz?",
    pickerLead: "Ezeket a házakat különböző őszi pihenésekhez ajánljuk, de természetesen azt válasszátok, amelyik igazán megtetszik nektek.",
    houseLabel: "Akkor válasszátok, ha…",
    houseWhy: "Miért ajánljuk?",
    houseView: "Megnézem a házat",
    recommendations: {
      d2: "családbarát választás", fugehaz: "kisebb családnak", zsalya: "kisebb családi pihenés", szololiget: "kisebb társaságnak", vintage: "saját udvarral", koveskal: "csendes kirándulós bázis", royal_homes: "Balaton-közeli élmény", szepvolgyi: "nagyobb családoknak"
    },
    houseBullets: {
      d2: ["Őszi estéken a kandalló mellett boroznátok.", "Kényelmes, felszerelt konyhában készítenétek vacsorát.", "Csendet szeretnétek.", "Fontos számotokra a gyors Wi-Fi.", "Szeptember végéig használható a medence."],
      fugehaz: ["Szeretnétek a Tanúhegyeket nézve kávézni, és a napfelkeltében gyönyörködni.", "Fontos számotokra a gyors Wi-Fi.", "A kert végéből túra indul a bazaltorgonákhoz.", "Saját, ingyenes parkoló áll rendelkezésre.", "A kandalló melege vár esténként.", "Szeptember végéig használható a medence."]
    },
    directDiscountLabel: "ár-előny a portálokhoz képest",
    directBenefits: ["Közvetlen kapcsolat a szállásadóval", "Gyors visszaigazolás", "Rugalmas ügyintézés"],
    bookingCta: "Árak és szabad időpontok",
    contactCta: "Írásban érdeklődöm",
    whatsappCta: "WhatsApp"
  },
  en: {
    heroLead: ["Spend time together in a Dandelion house in the Balaton Uplands,", "and turn your family break into a lasting memory."],
    heroValueAria: "Show what the 8% price advantage means",
    heroValueLabel: "price advantage · details",
    heroValueAction: "SEE DETAILS",
    bookingBadge: "Book direct and save!",
    benefitsAria: "Direct booking benefits",
    benefitsKicker: "DIRECT BOOKING",
    benefitsTitle: "Booking direct pays off",
    benefitsLead: "The benefits of booking direct:",
    benefits: ["8% price advantage compared with portals", "Instant card payment", "Fast, transparent booking process", "Direct contact with your host"],
    priceDialogKicker: "DIRECT BOOKING",
    priceDialogClose: "Close",
    priceDialogTitle: "Booking direct pays off",
    priceDialogIntro: "Check availability and prices directly on our own booking page.",
    priceDialogStat: "price advantage vs booking portals",
    priceDialogBenefits: ["Direct contact with your host", "Fast confirmation", "Flexible assistance"],
    priceDialogCta: "Prices & availability",
    moodKicker: "WHY DANDELION IN AUTUMN?",
    moodTitle: "Autumn is better together.",
    moodIntro: "Shared breakfasts, long walks, playful afternoons and cosy evenings make every day more memorable.",
    selectionAria: "Tips to help you choose",
    selectionKicker: "FAMILY AUTUMN IDEAS",
    selectionBullets: ["For more shared space, start with the Dandelion D2 and Dandelion Szépvölgyi cards.", "Indoor time works just as well as garden days — a rainy spell does not have to stop the break.", "Köveskál, Vintage and Szőlőliget make calm bases for walks and family days out."],
    moodCards: [
      { label: "SHARED RHYTHM", title: ["Shared spaces,", "shared rhythm."], copy: "Be together while everyone still has room to settle in." },
      { label: "RAINY DAYS", title: ["Bad weather", "is not the end."], copy: "A fireplace, indoor spaces and shared dinners." },
      { label: "OUTSIDE", title: ["Garden, grilling,", "firelight."], copy: "Space for the children, a slower evening for the grown-ups." }
    ],
    familyGuide: {
      eyebrow: "FAMILY STAY IDEAS", title: "Which houses work well for families?", lead: "It is easier to find the right Dandelion house when you match the ages of your children with the rhythm of your time together.",
      cards: [
        { title: "Families with a baby", parts: [{ text: "Dandelion D2", houseKey: "d2" }, { text: ", " }, { text: "Dandelion Fügeház", houseKey: "fugehaz" }, { text: " and " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " offer baby equipment free of charge." }] },
        { title: "Larger families", parts: [{ text: "The spacious four-bedroom " }, { text: "Dandelion Szépvölgyi", houseKey: "szepvolgyi" }, { text: " and the two-bedroom " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " with its jacuzzi are both strong choices." }] },
        { title: "Families with teenagers", parts: [{ text: "Separate rooms at " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", " }, { text: "Dandelion Vintage", houseKey: "vintage" }, { text: " and " }, { text: "Dandelion Zsálya", houseKey: "zsalya" }, { text: " give teenagers a little independence while everyone stays together." }] }
      ],
      babyLabel: "BABY-FRIENDLY EXTRAS", babyText: "A cot, baby bath and step stool are available free of charge on request. They are not available in every house, so please let us know in advance.", programsLabel: "FAMILY PROGRAMMES", programs: ["Short and longer walks in the witness hills.", "A great playground in the village.", "Beautiful hiking routes and active time outdoors.", "Bicycle rental — ask us for details.", "A cave tour at Tapolca Lake Cave.", "A family day at Festetics Palace in Keszthely."]
    },
    pickerTitle: "Which house fits your family?", pickerLead: "These houses suit different kinds of autumn breaks — choose the one that feels right for you.", houseLabel: "Choose this house if…", houseWhy: "Why we recommend it", houseView: "View the house",
    recommendations: { d2: "family-friendly choice", fugehaz: "for a smaller family", zsalya: "a cosy family break", szololiget: "for a smaller group", vintage: "with a private garden", koveskal: "a quiet base for exploring", royal_homes: "close to Lake Balaton", szepvolgyi: "for larger families" },
    houseBullets: { d2: ["You would like an autumn evening by the fireplace.", "You want to cook together in a comfortable, well-equipped kitchen.", "Peace and quiet matter to you.", "Fast Wi-Fi is important.", "The pool can be used until the end of September."], fugehaz: ["You would like coffee with a view of the witness hills and sunrise.", "Fast Wi-Fi is important.", "A hiking trail to the basalt organs starts at the end of the garden.", "There is private free parking.", "The fireplace keeps evenings warm.", "The pool can be used until the end of September."] },
    directDiscountLabel: "price advantage vs booking portals", directBenefits: ["Direct contact with your host", "Fast confirmation", "Flexible assistance"], bookingCta: "Prices & availability", contactCta: "Enquire in writing", whatsappCta: "WhatsApp"
  },
  de: {
    heroLead: ["Verbringen Sie gemeinsame Zeit in einem Dandelion-Haus im Balaton-Oberland,", "und machen Sie daraus bleibende Familienmomente."], heroValueAria: "Zeigen Sie, was der Preisvorteil von 8 % bedeutet", heroValueLabel: "Preisvorteil · Details", heroValueAction: "DETAILS ANSEHEN", bookingBadge: "Direkt buchen und sparen!",
    benefitsAria: "Vorteile der Direktbuchung", benefitsKicker: "DIREKTBUCHUNG", benefitsTitle: "Direkt buchen lohnt sich", benefitsLead: "Die Vorteile der Direktbuchung:", benefits: ["8 % Preisvorteil gegenüber Portalen", "Sofortige Kartenzahlung", "Schneller, transparenter Buchungsablauf", "Direkter Kontakt zum Gastgeber"], priceDialogKicker: "DIREKTBUCHUNG", priceDialogClose: "Schließen", priceDialogTitle: "Direkt buchen lohnt sich", priceDialogIntro: "Verfügbarkeit und Preise sehen Sie direkt auf unserer eigenen Buchungsseite.", priceDialogStat: "Preisvorteil gegenüber Buchungsportalen", priceDialogBenefits: ["Direkter Kontakt zum Gastgeber", "Schnelle Bestätigung", "Flexible Abwicklung"], priceDialogCta: "Preise & Verfügbarkeit",
    moodKicker: "WARUM DANDELION IM HERBST?", moodTitle: "Gemeinsam ist der Herbst am schönsten.", moodIntro: "Gemeinsame Frühstücke, lange Spaziergänge, spielerische Nachmittage und gemütliche Abende machen jeden Tag besonders.", selectionAria: "Tipps für die Auswahl", selectionKicker: "FAMILIENIDEEN FÜR DEN HERBST", selectionBullets: ["Für mehr gemeinsamen Raum empfehlen wir zuerst die Karten von Dandelion D2 und Dandelion Szépvölgyi.", "Gemeinsame Zeit drinnen funktioniert genauso gut wie Gartentage — Regen muss die Auszeit nicht beenden.", "Köveskál, Vintage und Szőlőliget sind ruhige Ausgangspunkte für Ausflüge mit der Familie."], moodCards: [{ label: "GEMEINSAMER RHYTHMUS", title: ["Gemeinsame Räume,", "gemeinsamer Rhythmus."], copy: "Zusammen sein, ohne dass jemand auf seinen eigenen Platz verzichten muss." }, { label: "REGENTAGE", title: ["Schlechtes Wetter", "ist kein Programmende."], copy: "Kamin, Innenräume und gemeinsame Abendessen." }, { label: "DRAUSSEN", title: ["Garten, Grillen,", "Feuerschein."], copy: "Platz für die Kinder und ein ruhiger Abend für die Erwachsenen." }],
    familyGuide: { eyebrow: "IDEEN FÜR FAMILIEN", title: "Welche Häuser empfehlen wir Familien?", lead: "Wenn Sie das Alter Ihrer Kinder und den gemeinsamen Rhythmus berücksichtigen, finden Sie leichter das passende Dandelion-Haus.", cards: [{ title: "Familien mit Baby", parts: [{ text: "Im " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", im " }, { text: "Dandelion Fügeház", houseKey: "fugehaz" }, { text: " und in den " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " steht Babyausstattung kostenlos zur Verfügung." }] }, { title: "Größere Familien", parts: [{ text: "Das geräumige " }, { text: "Dandelion Szépvölgyi", houseKey: "szepvolgyi" }, { text: " mit vier Schlafzimmern und die " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " mit zwei Schlafzimmern und Jacuzzi sind gute Möglichkeiten." }] }, { title: "Familien mit Teenagern", parts: [{ text: "Separate Zimmer im " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", im " }, { text: "Dandelion Vintage", houseKey: "vintage" }, { text: " und in der " }, { text: "Dandelion Zsálya", houseKey: "zsalya" }, { text: " geben Teenagern etwas Eigenständigkeit." }] }], babyLabel: "BABYFREUNDLICHE EXTRAS", babyText: "Kinderbett, Babybadewanne und Tritt sind auf Anfrage kostenlos erhältlich. Da sie nicht in jedem Haus vorhanden sind, teilen Sie uns Ihren Wunsch bitte vorher mit.", programsLabel: "FAMILIENPROGRAMME", programs: ["Leichte und anspruchsvollere Wanderungen in den Zeugenbergen.", "Ein toller Spielplatz im Dorf.", "Schöne Wanderwege und aktive Erholung.", "Fahrradverleih — fragen Sie uns gerne.", "Höhlentour in der Seehöhle von Tapolca.", "Familientag im Festetics-Schloss in Keszthely."] },
    pickerTitle: "Welches Haus passt zu Ihrer Familie?", pickerLead: "Diese Häuser eignen sich für unterschiedliche Herbstauszeiten — wählen Sie einfach das, das Ihnen am besten gefällt.", houseLabel: "Dieses Haus passt, wenn…", houseWhy: "Warum wir es empfehlen", houseView: "Haus ansehen", recommendations: { d2: "familienfreundliche Wahl", fugehaz: "für kleinere Familien", zsalya: "gemütliche Familienauszeit", szololiget: "für kleinere Gruppen", vintage: "mit eigenem Garten", koveskal: "ruhiger Ausgangspunkt", royal_homes: "nah am Balaton", szepvolgyi: "für größere Familien" }, houseBullets: { d2: ["Sie Herbstabende am Kamin verbringen möchten.", "Sie gemeinsam in einer gut ausgestatteten Küche kochen möchten.", "Ruhe und Stille wichtig sind.", "Schnelles WLAN wichtig ist.", "Der Pool bis Ende September genutzt werden kann."], fugehaz: ["Sie mit Blick auf die Zeugenberge Kaffee trinken und den Sonnenaufgang genießen möchten.", "Schnelles WLAN wichtig ist.", "Am Ende des Gartens ein Wanderweg zu den Basaltorgeln beginnt.", "Ein eigener kostenloser Parkplatz vorhanden ist.", "Der Kamin die Abende wärmt.", "Der Pool bis Ende September genutzt werden kann."] }, directDiscountLabel: "Preisvorteil gegenüber Buchungsportalen", directBenefits: ["Direkter Kontakt zum Gastgeber", "Schnelle Bestätigung", "Flexible Abwicklung"], bookingCta: "Preise & Verfügbarkeit", contactCta: "Schriftlich anfragen", whatsappCta: "WhatsApp"
  },
  cs: {
    heroLead: ["Užijte si společný čas v domě Dandelion v Balatonské vrchovině,", "a proměňte rodinný pobyt v krásnou vzpomínku."], heroValueAria: "Zjistit, co znamená 8% cenová výhoda", heroValueLabel: "cenová výhoda · podrobnosti", heroValueAction: "ZJISTIT VÍCE", bookingBadge: "Rezervujte přímo a ušetřete!", benefitsAria: "Výhody přímé rezervace", benefitsKicker: "PŘÍMÁ REZERVACE", benefitsTitle: "Přímá rezervace se vyplatí", benefitsLead: "Výhody přímé rezervace:", benefits: ["8% cenová výhoda oproti portálům", "Okamžitá platba kartou", "Rychlý a přehledný rezervační proces", "Přímý kontakt s hostitelem"], priceDialogKicker: "PŘÍMÁ REZERVACE", priceDialogClose: "Zavřít", priceDialogTitle: "Přímá rezervace se vyplatí", priceDialogIntro: "Volné termíny a ceny si prohlédnete přímo v našem rezervačním systému.", priceDialogStat: "cenová výhoda oproti portálům", priceDialogBenefits: ["Přímý kontakt s hostitelem", "Rychlé potvrzení", "Flexibilní komunikace"], priceDialogCta: "Ceny a volné termíny",
    moodKicker: "PROČ DANDELION NA PODZIM?", moodTitle: "Podzim je nejlepší společně.", moodIntro: "Společné snídaně, dlouhé procházky, hravá odpoledne a útulné večery udělají každý den nezapomenutelným.", selectionAria: "Tipy pro výběr", selectionKicker: "RODINNÉ PODZIMNÍ TIPY", selectionBullets: ["Pro více společného prostoru si nejdříve prohlédněte Dandelion D2 a Dandelion Szépvölgyi.", "Společný čas uvnitř funguje stejně dobře jako dny na zahradě — déšť nemusí pobyt zastavit.", "Köveskál, Vintage a Szőlőliget jsou klidnou základnou pro výlety s rodinou."], moodCards: [{ label: "SPOLEČNÝ RYTMUS", title: ["Společné prostory,", "společný rytmus."], copy: "Buďte spolu a přitom má každý své místo." }, { label: "DEŠTIVÉ DNY", title: ["Špatné počasí", "není konec programu."], copy: "Krb, vnitřní prostory a společné večeře." }, { label: "VENKU", title: ["Zahrada, gril,", "oheň."], copy: "Prostor pro děti a klidnější večer pro dospělé." }],
    familyGuide: { eyebrow: "TIPY NA RODINNÉ UBYTOVÁNÍ", title: "Které domy doporučujeme rodinám?", lead: "Snáze najdete správný dům Dandelion, když zohledníte věk dětí a rytmus společného odpočinku.", cards: [{ title: "Rodiny s miminkem", parts: [{ text: "V domech " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", " }, { text: "Dandelion Fügeház", houseKey: "fugehaz" }, { text: " a " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " je dětské vybavení k dispozici zdarma." }] }, { title: "Větší rodiny", parts: [{ text: "Prostorný " }, { text: "Dandelion Szépvölgyi", houseKey: "szepvolgyi" }, { text: " se čtyřmi ložnicemi a " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " se dvěma ložnicemi a vířivkou jsou skvělou volbou." }] }, { title: "Rodiny s teenagery", parts: [{ text: "Oddělené pokoje v domech " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", " }, { text: "Dandelion Vintage", houseKey: "vintage" }, { text: " a " }, { text: "Dandelion Zsálya", houseKey: "zsalya" }, { text: " dopřejí teenagerům trochu samostatnosti." }] }], babyLabel: "DOPLŇKY PRO MIMINKA", babyText: "Dětská postýlka, vanička a stolička jsou na vyžádání zdarma. Nejsou dostupné v každém domě, proto nám prosím dejte vědět předem.", programsLabel: "RODINNÉ PROGRAMY", programs: ["Nenáročné i delší túry ve svědeckých horách.", "Skvělé hřiště ve vesnici.", "Krásné turistické trasy a aktivní odpočinek.", "Půjčení kol — rádi poradíme.", "Prohlídka jeskyně u Tapolce.", "Rodinný den na zámku Festetics v Keszthely." ] },
    pickerTitle: "Který dům se hodí pro vaši rodinu?", pickerLead: "Tyto domy se hodí pro různé podzimní pobyty — vyberte si ten, který vás nejvíce osloví.", houseLabel: "Vyberte tento dům, pokud…", houseWhy: "Proč ho doporučujeme", houseView: "Prohlédnout dům", recommendations: { d2: "rodinná volba", fugehaz: "pro menší rodinu", zsalya: "útulný rodinný pobyt", szololiget: "pro menší skupinu", vintage: "s vlastní zahradou", koveskal: "klidná základna pro výlety", royal_homes: "blízko Balatonu", szepvolgyi: "pro větší rodiny" }, houseBullets: { d2: ["Chcete podzimní večer u krbu.", "Chcete společně vařit v pohodlné vybavené kuchyni.", "Je pro vás důležitý klid.", "Potřebujete rychlé Wi-Fi.", "Bazén lze využívat do konce září."], fugehaz: ["Chcete snídat s výhledem na svědecké hory a pozorovat východ slunce.", "Potřebujete rychlé Wi-Fi.", "Na konci zahrady začíná stezka k čedičovým varhanám.", "K dispozici je vlastní bezplatné parkování.", "Krb zpříjemní večery.", "Bazén lze využívat do konce září."] }, directDiscountLabel: "cenová výhoda oproti rezervačním portálům", directBenefits: ["Přímý kontakt s hostitelem", "Rychlé potvrzení", "Flexibilní komunikace"], bookingCta: "Ceny a volné termíny", contactCta: "Napsat dotaz", whatsappCta: "WhatsApp"
  },
  sk: {
    heroLead: ["Užite si spoločný čas v dome Dandelion v Balatonskej vrchovine,", "a premeňte rodinný pobyt na krásnu spomienku."], heroValueAria: "Zistiť, čo znamená 8 % cenová výhoda", heroValueLabel: "cenová výhoda · podrobnosti", heroValueAction: "ZISTIŤ VIAC", bookingBadge: "Rezervujte priamo a ušetrite!", benefitsAria: "Výhody priamej rezervácie", benefitsKicker: "PRIAMA REZERVÁCIA", benefitsTitle: "Priama rezervácia sa oplatí", benefitsLead: "Výhody priamej rezervácie:", benefits: ["8 % cenová výhoda oproti portálom", "Okamžitá platba kartou", "Rýchly a prehľadný rezervačný proces", "Priamy kontakt s hostiteľom"], priceDialogKicker: "PRIAMA REZERVÁCIA", priceDialogClose: "Zavrieť", priceDialogTitle: "Priama rezervácia sa oplatí", priceDialogIntro: "Voľné termíny a ceny si pozriete priamo v našom rezervačnom systéme.", priceDialogStat: "cenová výhoda oproti portálom", priceDialogBenefits: ["Priamy kontakt s hostiteľom", "Rýchle potvrdenie", "Flexibilná komunikácia"], priceDialogCta: "Ceny a voľné termíny",
    moodKicker: "PREČO DANDELION NA JESEŇ?", moodTitle: "Jeseň je najkrajšia spolu.", moodIntro: "Spoločné raňajky, dlhé prechádzky, hravé popoludnia a útulné večery urobia každý deň nezabudnuteľným.", selectionAria: "Tipy na výber", selectionKicker: "RODINNÉ JESENNÉ TIPY", selectionBullets: ["Ak hľadáte viac spoločného priestoru, začnite kartami Dandelion D2 a Dandelion Szépvölgyi.", "Spoločný čas v interiéri funguje rovnako dobre ako dni v záhrade — dážď nemusí pobyt zastaviť.", "Köveskál, Vintage a Szőlőliget sú pokojnou základňou na rodinné výlety."], moodCards: [{ label: "SPOLOČNÝ RYTMUS", title: ["Spoločné priestory,", "spoločný rytmus."], copy: "Buďte spolu a pritom má každý svoje miesto." }, { label: "DAŽDIVÉ DNI", title: ["Zlé počasie", "nie je koniec programu."], copy: "Krb, vnútorné priestory a spoločné večere." }, { label: "VONKU", title: ["Záhrada, gril,", "oheň."], copy: "Priestor pre deti a pokojnejší večer pre dospelých." }],
    familyGuide: { eyebrow: "TIPY NA RODINNÉ UBYTOVANIE", title: "Ktoré domy odporúčame rodinám?", lead: "Správny dom Dandelion nájdete ľahšie, keď zohľadníte vek detí a rytmus spoločného oddychu.", cards: [{ title: "Rodiny s bábätkom", parts: [{ text: "V domoch " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", " }, { text: "Dandelion Fügeház", houseKey: "fugehaz" }, { text: " a " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " je detská výbava k dispozícii zadarmo." }] }, { title: "Väčšie rodiny", parts: [{ text: "Priestranný " }, { text: "Dandelion Szépvölgyi", houseKey: "szepvolgyi" }, { text: " so štyrmi spálňami a " }, { text: "Dandelion Royal Homes", houseKey: "royal_homes" }, { text: " s dvoma spálňami a vírivkou sú výbornou voľbou." }] }, { title: "Rodiny s tínedžermi", parts: [{ text: "Oddelené izby v domoch " }, { text: "Dandelion D2", houseKey: "d2" }, { text: ", " }, { text: "Dandelion Vintage", houseKey: "vintage" }, { text: " a " }, { text: "Dandelion Zsálya", houseKey: "zsalya" }, { text: " doprajú tínedžerom trochu samostatnosti." }] }], babyLabel: "DOPLNKY PRE BÁBÄTKÁ", babyText: "Detská postieľka, vanička a stupienok sú na požiadanie k dispozícii zadarmo. Nie sú dostupné v každom dome, preto nám dajte vedieť vopred.", programsLabel: "RODINNÉ PROGRAMY", programs: ["Nenáročné aj dlhšie túry vo svedeckých vrchoch.", "Skvelé ihrisko v dedine.", "Krásne turistické trasy a aktívny oddych.", "Požičanie bicyklov — radi poradíme.", "Prehliadka jaskyne pri Tapolci.", "Rodinný deň na Festeticsovom zámku v Keszthely." ] },
    pickerTitle: "Ktorý dom sa hodí pre vašu rodinu?", pickerLead: "Tieto domy sa hodia na rôzne jesenné pobyty — vyberte si ten, ktorý vás najviac osloví.", houseLabel: "Vyberte si tento dom, ak…", houseWhy: "Prečo ho odporúčame", houseView: "Pozrieť si dom", recommendations: { d2: "rodinná voľba", fugehaz: "pre menšiu rodinu", zsalya: "útulný rodinný pobyt", szololiget: "pre menšiu skupinu", vintage: "s vlastnou záhradou", koveskal: "pokojná základňa na výlety", royal_homes: "blízko Balatonu", szepvolgyi: "pre väčšie rodiny" }, houseBullets: { d2: ["Chcete jesenný večer pri krbe.", "Chcete spoločne variť v pohodlnej vybavenej kuchyni.", "Je pre vás dôležitý pokoj.", "Potrebujete rýchle Wi-Fi.", "Bazén sa dá využívať do konca septembra."], fugehaz: ["Chcete raňajkovať s výhľadom na svedecké vrchy a obdivovať východ slnka.", "Potrebujete rýchle Wi-Fi.", "Na konci záhrady začína chodník k čadičovým orgánom.", "K dispozícii je vlastné bezplatné parkovanie.", "Krb spríjemní večery.", "Bazén sa dá využívať do konca septembra."] }, directDiscountLabel: "cenová výhoda oproti rezervačným portálom", directBenefits: ["Priamy kontakt s hostiteľom", "Rýchle potvrdenie", "Flexibilná komunikácia"], bookingCta: "Ceny a voľné termíny", contactCta: "Napísať otázku", whatsappCta: "WhatsApp"
  }
};

const housePathByLang: Record<AutumnCampaignLang, Record<AutumnMultiHouseKey, string>> = {
  hu: { d2: "/dandelion-d2/", fugehaz: "/fuge/", zsalya: "/dandelion-zsalya/", szololiget: "/szololiget/", vintage: "/dandelion-vintage/", royal_homes: "/royal/", szepvolgyi: "/szepvolgyi/", koveskal: "/dandelion-koveskal/" },
  en: { d2: "/en/dandelion-d2/", fugehaz: "/en/dandelion-fugehaz/", zsalya: "/en/dandelion-zsalya/", szololiget: "/en/szololiget/", vintage: "/en/dandelion-vintage/", royal_homes: "/en/royal/", szepvolgyi: "/en/szepvolgyi/", koveskal: "/en/dandelion-koveskal/" },
  de: { d2: "/de/dandelion-d2/", fugehaz: "/de/dandelion-fugehaz/", zsalya: "/de/dandelion-zsalya/", szololiget: "/de/szololiget/", vintage: "/de/dandelion-vintage/", royal_homes: "/de/royal/", szepvolgyi: "/de/szepvolgyi/", koveskal: "/de/dandelion-koveskal/" },
  cs: { d2: "/cs/dandelion-d2/", fugehaz: "/cs/dandelion-fugehaz/", zsalya: "/cs/dandelion-zsalya/", szololiget: "/cs/szololiget/", vintage: "/cs/dandelion-vintage/", royal_homes: "/cs/royal/", szepvolgyi: "/cs/szepvolgyi/", koveskal: "/cs/dandelion-koveskal/" },
  sk: { d2: "/sk/dandelion-d2/", fugehaz: "/sk/dandelion-fugehaz/", zsalya: "/sk/dandelion-zsalya/", szololiget: "/sk/szololiget/", vintage: "/sk/dandelion-vintage/", royal_homes: "/sk/royal/", szepvolgyi: "/sk/szepvolgyi/", koveskal: "/sk/dandelion-koveskal/" }
};

export function getAutumnMultiHouseFamilyCopy(lang: AutumnCampaignLang) {
  return familyCopyByLang[lang];
}

export function getLocalizedAutumnMultiHouses(lang: AutumnCampaignLang) {
  const copy = familyCopyByLang[lang];
  return autumnMultiHouseByAudience.family.map((house) => ({
    ...house,
    href: housePathByLang[lang][house.key],
    recommendation: copy.recommendations[house.key]
  }));
}

export function getAutumnMultiHousePath(lang: AutumnCampaignLang, houseKey: AutumnMultiHouseKey) {
  return housePathByLang[lang][houseKey];
}
