import type { GuideContent, GuideLocaleContent, GuideSection } from "./types";

export const d2AszfSections = [
  {
    number: "1",
    title: "Foglalás módja",
    paragraphs: [
      "Foglalás lehetséges honlapunkon az online foglalómotoron keresztül, e-mailben, telefonon, illetve értékesítési csatornákon (OTA) keresztül.",
      "OTA foglalás esetén az adott csatorna saját fizetési és lemondási feltételei az irányadók."
    ]
  },
  {
    number: "2",
    title: "Árak, kötelező tételek",
    paragraphs: ["A legkedvezőbb szállásdíjak jellemzően a honlapunkon érhetők el."],
    bullets: [
      "Idegenforgalmi adó (IFA): a mindenkori helyi rendelet szerint fizetendő. Az IFA önkormányzatonként eltér, ezért szálláshelyenként és házanként változhat; a foglalás során feltüntetett összeg az irányadó. Tájékoztató jelleggel több szálláshelyünkön 750 Ft / fő / éj.",
      "Végtakarítás: a foglalás során feltüntetett összeg, amely szállásonként eltérhet; jellemzően 20.000 Ft vagy 30.000 Ft / foglalás."
    ]
  },
  {
    number: "3",
    title: "Székely Dézsa használat, ahol elérhető",
    paragraphs: [
      "A Székely Dézsa használata külön díjas, és csak azoknál a szálláshelyeknél érhető el, ahol a dézsa rendelkezésre áll.",
      "A dézsát jellemzően nem érdemes egy napra felfűteni, mert a felfűtés idő- és energiaigényes, ezért a minimális használati idő 2 nap.",
      "A dézsa szolgáltatás igényét kérjük előre jelezni a foglaláskor vagy érkezés előtt, hogy biztosan elő tudjuk készíteni."
    ],
    bullets: [
      "Felfűtési díj (egyszeri): 15.000 Ft",
      "Napi használati díj: 7.500 Ft / nap",
      "Példa 2 éj esetén: 15.000 Ft + 2 x 7.500 Ft = 30.000 Ft",
      "Hosszabb dézsa használat esetén az árak egyedi egyeztetés alapján alakulhatnak."
    ]
  },
  {
    number: "4",
    title: "Panorama Pool használatára vonatkozó szabály",
    paragraphs: [
      "Azon szálláshelyek esetében, amelyeknél a Panorama Pool használata elérhető, a vendég a medence használatával elfogadja a mindenkor érvényes Medencehasználati szabályzatot.",
      "A Medencehasználati szabályzat az érintett szálláshelyek online vendégútmutatójában érhető el. A szabályzat pontos online elérési helyét a szálláshelyhez tartozó vendégtájékoztató / lakás guide tartalmazza.",
      "A vendég köteles a medence használata előtt a Medencehasználati szabályzatot megismerni, és a medence használata során az abban foglaltakat betartani.",
      "Az üzemeltető jogosult a medence használatát időjárási okból, karbantartás, vízkezelés, műszaki hiba, biztonsági ok vagy a Medencehasználati szabályzat megsértése esetén korlátozni vagy ideiglenesen szüneteltetni.",
      "A Panorama Pool vendégek által használt területe kamerás megfigyeléssel érintett terület lehet. A kamerás megfigyelés vagyonvédelmi, baleset-megelőzési, biztonsági és szabálybetartási célokat szolgál, de nem helyettesíti az úszómestert, a személyes felügyeletet vagy a gyermekek felnőtt felügyeletét.",
      "A medence használata saját felelősségre történik. Gyermekek kizárólag felnőtt felügyeletével használhatják a medencét. A gyermekek biztonságáért minden esetben a velük érkező felnőtt felel.",
      "A Medencehasználati szabályzat megszegéséből eredő balesetért, sérülésért, kárért vagy többletköltségért az üzemeltető felelősséget nem vállal. Szándékos vagy gondatlan károkozás esetén a helyreállítás költsége a vendéget terheli."
    ],
    bullets: [
      "Dandelion D2 medencehasználati szabályzat: /guide/d2/medence/"
    ]
  },
  {
    number: "4/A",
    title: "Kamerás megfigyelés",
    paragraphs: [
      "A Dandelion Vendégházak kizárólag egyes vendégek által használt területein működhet kamerás megfigyelőrendszer. Ilyen terület lehet különösen a bejárat, az udvar, a parkoló, a közlekedési útvonal, illetve az érintett házaknál a Panorama Pool területe.",
      "A kamerás megfigyelés célja a vendégek és a szálláshely biztonságának védelme, a vagyonvédelem, a károkozások és szabályszegések megelőzése, illetve szükség esetén a panaszok, balesetek vagy káresemények tisztázása.",
      "A kamerák nem irányulnak a vendégek magánszféráját érintő belső lakóterekre, hálószobákra, fürdőszobákra vagy illemhelyekre.",
      "A kamerás megfigyeléssel érintett területeken figyelemfelhívó tájékoztatás kerül elhelyezésre. A kamerás adatkezelés részletes szabályait az Adatkezelési tájékoztató tartalmazza."
    ]
  },
  {
    number: "5",
    title: "Fizetési feltételek",
    paragraphs: [
      "A foglalás véglegesítéséhez a szállásdíj 30%-át kérjük banki átutalással megfizetni a foglalást követő 5 munkanapon belül. A foglalás az előleg beérkezésével válik garantálttá.",
      "A fennmaradó szállásdíj beköltözéskor fizetendő készpénzben vagy banki átutalással.",
      "A közleményben kérjük feltüntetni a foglaló nevét és az érkezés dátumát. Ha a foglaló nem az érkező vendég, akkor az érkező vendég neve is szerepeljen."
    ]
  },
  {
    number: "6",
    title: "Utalási adatok",
    paragraphs: [
      "Az előleg utalásához kérjük a foglalt szálláshelyhez tartozó számlaadatokat használd. Magyarországi foglalás esetén javasolt HUF-ban utalni, külföldről történő utalásnál EUR utalás is lehetséges. A pontos fizetendő összeg és a választott pénznem minden esetben a foglalás visszaigazolásában szerepel."
    ],
    bullets: [
      "Dandelion D1 / D2 / Fügeház - Kedvezményezett: Várnagy Ilona",
      "Revolut",
      "OTP HUF - Számlaszám / IBAN",
      "OTP EUR - Számlaszám / IBAN",
      "BIC / SWIFT",
      "Tipp: mobilon a mezők hosszan érintve egyszerűen másolhatók."
    ]
  },
  {
    number: "7",
    title: "Lemondási feltételek",
    paragraphs: [
      "A lemondás akkor érvényes, ha azt a vendég írásban, e-mailben megküldi, vagy a foglalási rendszeren, illetve az értékesítési csatornán keresztül hivatalosan lemondja. A lemondás időpontjának a beérkezés időpontja számít.",
      "Ha a lemondás alapján az előleg visszajár, azt legkésőbb 5 munkanapon belül visszautaljuk arra a bankszámlára, ahonnan az előleg érkezett, vagy amelyet a vendég írásban megad."
    ],
    bullets: [
      "Díjmentes lemondás: érkezés előtt 30 nappal vagy korábban lemondva az előleg visszajár.",
      "30 napon belüli lemondás: az előleg nem visszatérítendő, a lemondási díj a foglalás 30%-a.",
      "No-show vagy érkezés napján történő lemondás esetén a szállásdíj 100%-a fizetendő."
    ]
  },
  {
    number: "8",
    title: "Be- és kijelentkezés / self check-in",
    paragraphs: [
      "A beköltözés jellemzően self check-in rendszerben történik, kulcsdoboz használatával. A részletes érkezési információkat e-mailben küldjük.",
      "A szállás elfoglalásának feltétele az online bejelentkezés elvégzése, a vendégadatok és okmányok rögzítésével. Enélkül a rendszer nem küldi ki a belépési vagy kulcsdobozkódot."
    ]
  },
  {
    number: "9",
    title: "Érkezés-távozás",
    paragraphs: [],
    bullets: [
      "Check-in: 15:00-19:00",
      "Check-out: 10:00-ig",
      "Késői érkezés lehetséges, de előzetes jelzés szükséges.",
      "Korai check-in vagy késői check-out kapacitástól függően, maximum +/-2 órában kérhető, díja 4.000 Ft / alkalom."
    ]
  },
  {
    number: "10",
    title: "Kaució",
    paragraphs: [
      "Kauciót alapesetben nem kérünk. Kivételes esetekben azonban kaució kérhető, erről a vendéget minden esetben előre tájékoztatjuk.",
      "Károkozás hiányában a kauciót a távozás utáni ellenőrzést követően visszafizetjük. Károkozás esetén a kár értéke levonható."
    ]
  },
  {
    number: "11",
    title: "Házirend, dohányzás, kisállatok",
    paragraphs: [],
    bullets: [
      "A berendezést rendeltetésszerűen kell használni, a tűz- és balesetvédelmi szabályok betartása kötelező.",
      "Dohányzás: minden szálláshely nemdohányzó. Beltéri dohányzás esetén 30.000 Ft extra takarítási díjat számítunk fel.",
      "Kisállatot nem tudunk fogadni."
    ]
  },
  {
    number: "12",
    title: "Vendégek száma",
    paragraphs: ["Csak az előzetesen bejelentett vendégek tartózkodhatnak a szálláshelyen."]
  },
  {
    number: "13",
    title: "Takarítás",
    paragraphs: [
      "A foglalás végösszegében külön végtakarítási díj szerepelhet, amelyet a foglalási folyamat minden esetben külön feltüntet.",
      "Rendkívüli szennyeződés vagy a házirend megsértése esetén extra takarítási díj számítható fel."
    ]
  },
  {
    number: "14",
    title: "Károkozás / felelősség",
    paragraphs: [
      "Károkozás esetén a vendég köteles a keletkezett kárt megtéríteni.",
      "A szálláshely berendezéseit, eszközeit és felszereléseit kérjük rendeltetésszerűen használni. Szükség esetén a kár összege a kaucióból levonható, vagy külön kerül rendezésre."
    ]
  },
  {
    number: "15",
    title: "Kapcsolat",
    paragraphs: ["Kérdés esetén örömmel segítünk a foglalással, fizetéssel, érkezéssel vagy a szálláshelyekkel kapcsolatban."],
    bullets: [
      "E-mail: hello@dandelionhouse.hu",
      "Telefon: +36 20 773 0807"
    ]
  }
];

const contentHu = {
  title: "Dandelion D2 - ÁSZF és használati szabályok",
  subtitle: "Dandelion D2 ÁSZF és használati szabályok",
  intro:
    "A Dandelion D2 foglalási, tartózkodási és helyszíni használati feltételei. Érvényes: 2026. február 01-től. Módosítva: 2026. május 25.",
  keyPoints: [
    "A foglalás elküldésével és visszaigazolásával a vendég elfogadja a feltételeket.",
    "A Panorama Pool használatával a vendég elfogadja a medencehasználati szabályzatot.",
    "A medence használata saját felelősségre történik, gyermekek csak felnőtt felügyeletével használhatják.",
    "A szállás elfoglalásának feltétele lehet az online bejelentkezés elvégzése."
  ],
  backLabel: "Vissza a Dandelion D2 útmutatóhoz",
  sections: d2AszfSections.map((section) => ({
    id: `aszf-${section.number.toLowerCase().replace("/", "-")}`,
    title: `${section.number}. ${section.title}`,
    paragraphs: section.paragraphs,
    bullets: section.bullets
  }))
};

const d2AszfSectionsEn: GuideSection[] = [
  {
    id: "aszf-1",
    title: "1. How to book",
    paragraphs: [
      "Bookings can be made through the online booking engine on our website, by e-mail, by phone, or through external sales channels (OTAs).",
      "For OTA bookings, the payment and cancellation terms of the relevant channel apply."
    ]
  },
  {
    id: "aszf-2",
    title: "2. Prices and mandatory charges",
    paragraphs: ["The best accommodation rates are usually available on our own website."],
    bullets: [
      "Tourist tax: payable according to the applicable local municipal regulation. The tourist tax may differ by municipality, accommodation and house; the amount shown during booking is the relevant amount. For information only, at several of our accommodations it is HUF 750 per person per night.",
      "Final cleaning: the amount shown during booking. It may vary by accommodation and is typically HUF 20,000 or HUF 30,000 per booking."
    ]
  },
  {
    id: "aszf-3",
    title: "3. Use of the Szekely hot tub, where available",
    paragraphs: [
      "Use of the Szekely hot tub is subject to a separate fee and is available only at accommodations where the hot tub is provided.",
      "It is usually not practical to heat the hot tub for one day only, because heating requires time and energy; therefore the minimum use period is 2 days.",
      "Please request hot tub use in advance when booking or before arrival, so that we can prepare it properly."
    ],
    bullets: [
      "Heating fee, one-time: HUF 15,000",
      "Daily use fee: HUF 7,500 per day",
      "Example for 2 nights: HUF 15,000 + 2 x HUF 7,500 = HUF 30,000",
      "For longer hot tub use, prices may be agreed individually."
    ]
  },
  {
    id: "aszf-4",
    title: "4. Rules for using Panorama Pool",
    paragraphs: [
      "For accommodations where Panorama Pool use is available, the guest accepts the currently valid Pool Rules by using the pool.",
      "The Pool Rules are available in the online guest guide of the relevant accommodations. The exact online location of the rules is included in the guest information / apartment guide for the accommodation.",
      "Before using the pool, the guest must read the Pool Rules and must comply with them during pool use.",
      "The operator may restrict or temporarily suspend pool use due to weather, maintenance, water treatment, technical fault, safety reasons, or breach of the Pool Rules.",
      "The Panorama Pool area may be covered by camera surveillance. Camera surveillance serves property protection, accident prevention, safety and rule compliance purposes, but it does not replace a lifeguard, personal supervision or adult supervision of children.",
      "Guests use the pool at their own risk. Children may use the pool only under adult supervision. The accompanying adult is always responsible for the safety of children.",
      "The operator accepts no liability for accidents, injuries, damage or additional costs resulting from breach of the Pool Rules. In case of intentional or negligent damage, the guest is responsible for the cost of restoration."
    ],
    bullets: ["Dandelion D2 Pool Rules: /guide/d2/medence/"]
  },
  {
    id: "aszf-4-a",
    title: "4/A. Camera surveillance",
    paragraphs: [
      "Camera surveillance may operate only in certain shared-use areas of Dandelion Guesthouses. Such monitored areas may include, in particular, entrances, yards, parking areas, access routes and, at the affected houses, the Panorama Pool area.",
      "The purpose of camera surveillance is to protect guests and the accommodation, protect property, prevent damage and breaches of rules, and, where necessary, clarify complaints, accidents or damage events.",
      "Cameras are not directed at indoor living areas, bedrooms, bathrooms, toilets or other areas affecting guests' private sphere.",
      "Warning notices are displayed in areas covered by camera surveillance. Detailed rules on camera-related data processing are set out in the Privacy Policy."
    ]
  },
  {
    id: "aszf-5",
    title: "5. Payment terms",
    paragraphs: [
      "To finalize the booking, 30% of the accommodation fee must be paid by bank transfer within 5 working days after booking. The booking becomes guaranteed when the deposit is received.",
      "The remaining accommodation fee is payable on arrival in cash or by bank transfer.",
      "Please include the name of the person making the booking and the arrival date in the transfer reference. If this person is not the arriving guest, please also include the arriving guest's name."
    ]
  },
  {
    id: "aszf-6",
    title: "6. Bank transfer details",
    paragraphs: [
      "Please use the bank details belonging to the booked accommodation. For Hungarian bookings, HUF transfer is recommended; EUR transfer is also possible from abroad. The exact payable amount and selected currency are always stated in the booking confirmation."
    ],
    bullets: [
      "Dandelion D1 / D2 / Fügeház - Beneficiary: Ilona Varnagy",
      "Revolut",
      "OTP HUF - Account number / IBAN",
      "OTP EUR - Account number / IBAN",
      "BIC / SWIFT",
      "Tip: on mobile, the fields can be copied easily by long pressing them."
    ]
  },
  {
    id: "aszf-7",
    title: "7. Cancellation terms",
    paragraphs: [
      "Cancellation is valid when sent by the guest in writing by e-mail, or officially cancelled through the booking system or the sales channel. The time of cancellation is the time when it is received.",
      "If the deposit is refundable based on the cancellation, we will transfer it back within 5 working days to the bank account from which the deposit was received, or to another account provided by the guest in writing."
    ],
    bullets: [
      "Free cancellation: if cancelled 30 days or more before arrival, the deposit is refunded.",
      "Cancellation within 30 days: the deposit is non-refundable; the cancellation fee is 30% of the booking.",
      "In case of no-show or cancellation on the day of arrival, 100% of the accommodation fee is payable."
    ]
  },
  {
    id: "aszf-8",
    title: "8. Check-in / check-out / self check-in",
    paragraphs: [
      "Arrival is usually handled through a self check-in system using a key box. Detailed arrival information is sent by e-mail.",
      "Online check-in is a condition of occupying the accommodation; guest data and documents must be recorded. Without this, the entry code or key box code cannot be sent by the system."
    ]
  },
  {
    id: "aszf-9",
    title: "9. Arrival and departure",
    paragraphs: [],
    bullets: [
      "Check-in: 15:00-19:00",
      "Check-out: by 10:00",
      "Late arrival is possible, but advance notice is required.",
      "Early check-in or late check-out may be requested depending on capacity, for a maximum of +/-2 hours. Fee: HUF 4,000 per occasion."
    ]
  },
  {
    id: "aszf-10",
    title: "10. Deposit",
    paragraphs: [
      "As a general rule, we do not request a security deposit. In exceptional cases, a deposit may be requested; the guest will always be informed in advance.",
      "If no damage occurs, the deposit is refunded after the post-departure inspection. In case of damage, the value of the damage may be deducted."
    ]
  },
  {
    id: "aszf-11",
    title: "11. House rules, smoking and pets",
    paragraphs: [],
    bullets: [
      "Furniture, equipment and fittings must be used properly, and fire safety and accident prevention rules must be followed.",
      "Smoking: all accommodations are non-smoking. Indoor smoking results in an extra cleaning fee of HUF 30,000.",
      "We cannot accept pets."
    ]
  },
  {
    id: "aszf-12",
    title: "12. Number of guests",
    paragraphs: ["Only guests declared in advance may stay at the accommodation."]
  },
  {
    id: "aszf-13",
    title: "13. Cleaning",
    paragraphs: [
      "A separate final cleaning fee may be included in the total booking amount and is always shown separately during the booking process.",
      "Extra cleaning fees may be charged in case of unusual soiling or breach of the house rules."
    ]
  },
  {
    id: "aszf-14",
    title: "14. Damage and liability",
    paragraphs: [
      "In case of damage, the guest must compensate the damage caused.",
      "Please use the accommodation's furniture, equipment and fittings only as intended. If necessary, the damage amount may be deducted from the deposit or settled separately."
    ]
  },
  {
    id: "aszf-15",
    title: "15. Contact",
    paragraphs: ["If you have any questions, we are happy to help with bookings, payment, arrival or the accommodations."],
    bullets: ["E-mail: hello@dandelionhouse.hu", "Phone: +36 20 773 0807"]
  }
];

const d2AszfSectionsCs: GuideSection[] = [
  {
    id: "aszf-1",
    title: "1. Způsob rezervace",
    paragraphs: [
      "Rezervaci lze provést přes online rezervační systém na našem webu, e-mailem, telefonicky nebo přes externí prodejní kanály (OTA).",
      "U rezervací přes OTA platí platební a storno podmínky daného kanálu."
    ]
  },
  {
    id: "aszf-2",
    title: "2. Ceny a povinné poplatky",
    paragraphs: ["Nejvýhodnější ceny ubytování jsou obvykle dostupné na našem webu."],
    bullets: [
      "Místní turistická daň: hradí se podle aktuální vyhlášky příslušné obce. Výše daně se může lišit podle obce, ubytování a domu; rozhodující je částka uvedená během rezervace. Orientačně je u několika našich ubytování 750 HUF / osoba / noc.",
      "Závěrečný úklid: částka uvedená během rezervace. Může se lišit podle ubytování; obvykle 20 000 HUF nebo 30 000 HUF / rezervace."
    ]
  },
  {
    id: "aszf-3",
    title: "3. Používání kádě Szekely, pokud je k dispozici",
    paragraphs: [
      "Používání kádě Szekely je zpoplatněno samostatně a je možné pouze u ubytování, kde je káď k dispozici.",
      "Obvykle se nevyplatí káď nahřívat jen na jeden den, protože nahřátí je časově i energeticky náročné; minimální doba používání je proto 2 dny.",
      "O využití kádě prosíme požádat předem při rezervaci nebo před příjezdem, abychom ji mohli řádně připravit."
    ],
    bullets: [
      "Jednorázový poplatek za nahřátí: 15 000 HUF",
      "Denní poplatek za používání: 7 500 HUF / den",
      "Příklad pro 2 noci: 15 000 HUF + 2 x 7 500 HUF = 30 000 HUF",
      "Při delším používání kádě mohou být ceny stanoveny individuální dohodou."
    ]
  },
  {
    id: "aszf-4",
    title: "4. Pravidla používání Panorama Pool",
    paragraphs: [
      "U ubytování, kde je Panorama Pool dostupný, host používáním bazénu přijímá aktuálně platná pravidla bazénu.",
      "Pravidla bazénu jsou dostupná v online průvodci pro hosty příslušných ubytování. Přesné online umístění pravidel obsahuje hostovská informace / guide daného ubytování.",
      "Host je povinen se před použitím bazénu s pravidly seznámit a během používání bazénu je dodržovat.",
      "Provozovatel je oprávněn používání bazénu omezit nebo dočasně pozastavit kvůli počasí, údržbě, úpravě vody, technické závadě, bezpečnostním důvodům nebo porušení pravidel bazénu.",
      "Prostor Panorama Pool používaný hosty může být monitorován kamerovým systémem. Kamerový dohled slouží k ochraně majetku, prevenci úrazů, bezpečnosti a dodržování pravidel, nenahrazuje však plavčíka, osobní dohled ani dohled dospělých nad dětmi.",
      "Hosté používají bazén na vlastní odpovědnost. Děti mohou bazén používat pouze pod dohledem dospělé osoby. Za bezpečnost dětí vždy odpovídá dospělá osoba, která je doprovází.",
      "Provozovatel neodpovídá za úrazy, zranění, škody ani dodatečné náklady vzniklé porušením pravidel bazénu. V případě úmyslné nebo nedbalostní škody hradí náklady na uvedení do původního stavu host."
    ],
    bullets: ["Pravidla bazénu Dandelion D2: /guide/d2/medence/"]
  },
  {
    id: "aszf-4-a",
    title: "4/A. Kamerový dohled",
    paragraphs: [
      "Kamerový systém může fungovat pouze v některých prostorech Dandelion ubytování používaných hosty. Takovým prostorem může být zejména vstup, dvůr, parkoviště, přístupová cesta a u dotčených domů prostor Panorama Pool.",
      "Účelem kamerového dohledu je ochrana hostů a ubytování, ochrana majetku, prevence škod a porušení pravidel a v případě potřeby objasnění stížností, nehod nebo škodních událostí.",
      "Kamery nejsou namířeny do vnitřních obytných prostor, ložnic, koupelen, toalet ani jiných prostor zasahujících do soukromí hostů.",
      "V prostorech s kamerovým dohledem jsou umístěna upozornění. Podrobná pravidla zpracování kamerových záznamů obsahují zásady ochrany osobních údajů."
    ]
  },
  {
    id: "aszf-5",
    title: "5. Platební podmínky",
    paragraphs: [
      "Pro dokončení rezervace prosíme uhradit 30 % ceny ubytování bankovním převodem do 5 pracovních dnů od rezervace. Rezervace je garantována po přijetí zálohy.",
      "Doplatek ceny ubytování je splatný při příjezdu v hotovosti nebo bankovním převodem.",
      "Do zprávy pro příjemce prosíme uvést jméno osoby, která rezervaci provedla, a datum příjezdu. Pokud rezervující osoba není přijíždějící host, uveďte také jméno přijíždějícího hosta."
    ]
  },
  {
    id: "aszf-6",
    title: "6. Údaje pro bankovní převod",
    paragraphs: [
      "Pro úhradu zálohy použijte bankovní údaje náležející k rezervovanému ubytování. U rezervací z Maďarska doporučujeme převod v HUF; ze zahraničí je možný také převod v EUR. Přesná částka k úhradě a zvolená měna jsou vždy uvedeny v potvrzení rezervace."
    ],
    bullets: [
      "Dandelion D1 / D2 / Fügeház - Příjemce: Ilona Varnagy",
      "Revolut",
      "OTP HUF - Číslo účtu / IBAN",
      "OTP EUR - Číslo účtu / IBAN",
      "BIC / SWIFT",
      "Tip: na mobilu lze pole snadno zkopírovat dlouhým podržením."
    ]
  },
  {
    id: "aszf-7",
    title: "7. Storno podmínky",
    paragraphs: [
      "Storno je platné, pokud jej host zašle písemně e-mailem nebo jej oficiálně zruší přes rezervační systém či prodejní kanál. Za čas storna se považuje okamžik doručení.",
      "Pokud je podle storna záloha vratná, vrátíme ji nejpozději do 5 pracovních dnů na bankovní účet, ze kterého přišla, nebo na jiný účet písemně uvedený hostem."
    ],
    bullets: [
      "Bezplatné storno: při zrušení 30 dní nebo dříve před příjezdem se záloha vrací.",
      "Storno do 30 dní před příjezdem: záloha je nevratná, storno poplatek činí 30 % rezervace.",
      "V případě nedojezdu nebo zrušení v den příjezdu je splatných 100 % ceny ubytování."
    ]
  },
  {
    id: "aszf-8",
    title: "8. Check-in / check-out / self check-in",
    paragraphs: [
      "Příjezd obvykle probíhá formou self check-inu pomocí schránky na klíče. Podrobné informace k příjezdu zasíláme e-mailem.",
      "Podmínkou obsazení ubytování je dokončení online check-inu včetně zadání údajů hostů a dokladů. Bez toho systém neodešle vstupní kód ani kód ke schránce na klíče."
    ]
  },
  {
    id: "aszf-9",
    title: "9. Příjezd a odjezd",
    paragraphs: [],
    bullets: [
      "Check-in: 15:00-19:00",
      "Check-out: do 10:00",
      "Pozdější příjezd je možný, ale je nutné jej předem nahlásit.",
      "Dřívější check-in nebo pozdější check-out lze požádat podle kapacity, maximálně o +/-2 hodiny. Poplatek: 4 000 HUF / případ."
    ]
  },
  {
    id: "aszf-10",
    title: "10. Kauce",
    paragraphs: [
      "Kauci standardně nepožadujeme. Ve výjimečných případech však může být kauce vyžádána; hosta o tom vždy předem informujeme.",
      "Pokud nevznikne škoda, kauci po kontrole po odjezdu vrátíme. V případě škody může být hodnota škody odečtena."
    ]
  },
  {
    id: "aszf-11",
    title: "11. Domovní pravidla, kouření a domácí mazlíčci",
    paragraphs: [],
    bullets: [
      "Vybavení je nutné používat řádně; dodržování požárních a bezpečnostních pravidel je povinné.",
      "Kouření: všechna ubytování jsou nekuřácká. Při kouření uvnitř účtujeme mimořádný poplatek za úklid 30 000 HUF.",
      "Domácí mazlíčky nemůžeme přijmout."
    ]
  },
  {
    id: "aszf-12",
    title: "12. Počet hostů",
    paragraphs: ["V ubytování se mohou zdržovat pouze hosté nahlášení předem."]
  },
  {
    id: "aszf-13",
    title: "13. Úklid",
    paragraphs: [
      "V celkové částce rezervace může být uveden samostatný poplatek za závěrečný úklid, který je v rezervačním procesu vždy zobrazen zvlášť.",
      "V případě mimořádného znečištění nebo porušení domovních pravidel může být účtován dodatečný poplatek za úklid."
    ]
  },
  {
    id: "aszf-14",
    title: "14. Škoda / odpovědnost",
    paragraphs: [
      "V případě škody je host povinen vzniklou škodu uhradit.",
      "Prosíme, používejte zařízení, vybavení a příslušenství ubytování pouze k určenému účelu. V případě potřeby může být částka škody odečtena z kauce nebo vyrovnána samostatně."
    ]
  },
  {
    id: "aszf-15",
    title: "15. Kontakt",
    paragraphs: ["V případě dotazů rádi pomůžeme s rezervací, platbou, příjezdem nebo ubytováním."],
    bullets: ["E-mail: hello@dandelionhouse.hu", "Telefon: +36 20 773 0807"]
  }
];

const d2AszfSectionsDe: GuideSection[] = [
  {
    id: "aszf-1",
    title: "1. Buchungsart",
    paragraphs: [
      "Buchungen können über die Online-Buchungsmaschine auf unserer Website, per E-Mail, telefonisch oder über externe Vertriebskanäle (OTA) erfolgen.",
      "Bei OTA-Buchungen gelten die eigenen Zahlungs- und Stornierungsbedingungen des jeweiligen Kanals."
    ]
  },
  {
    id: "aszf-2",
    title: "2. Preise und verpflichtende Gebühren",
    paragraphs: ["Die günstigsten Unterkunftspreise sind in der Regel auf unserer Website verfügbar."],
    bullets: [
      "Kurtaxe: zahlbar gemäß der jeweils geltenden kommunalen Regelung. Die Kurtaxe kann je nach Gemeinde, Unterkunft und Haus unterschiedlich sein; maßgeblich ist der während der Buchung angezeigte Betrag. Zur Orientierung beträgt sie bei mehreren unserer Unterkünfte 750 HUF / Person / Nacht.",
      "Endreinigung: der während der Buchung angezeigte Betrag, der je nach Unterkunft variieren kann; typischerweise 20.000 HUF oder 30.000 HUF / Buchung."
    ]
  },
  {
    id: "aszf-3",
    title: "3. Nutzung des Szekely Hot Tubs, falls verfügbar",
    paragraphs: [
      "Die Nutzung des Szekely Hot Tubs ist kostenpflichtig und nur bei Unterkünften verfügbar, in denen der Hot Tub vorhanden ist.",
      "Es lohnt sich in der Regel nicht, den Hot Tub nur für einen Tag aufzuheizen, da das Aufheizen zeit- und energieintensiv ist; daher beträgt die Mindestnutzungsdauer 2 Tage.",
      "Bitte melden Sie den Wunsch zur Hot-Tub-Nutzung bei der Buchung oder vor der Anreise im Voraus an, damit wir ihn sicher vorbereiten können."
    ],
    bullets: [
      "Einmalige Heizgebühr: 15.000 HUF",
      "Tägliche Nutzungsgebühr: 7.500 HUF / Tag",
      "Beispiel für 2 Nächte: 15.000 HUF + 2 x 7.500 HUF = 30.000 HUF",
      "Bei längerer Hot-Tub-Nutzung können die Preise individuell vereinbart werden."
    ]
  },
  {
    id: "aszf-4",
    title: "4. Regeln für die Nutzung des Panorama Pools",
    paragraphs: [
      "Bei Unterkünften, bei denen die Nutzung des Panorama Pools verfügbar ist, akzeptiert der Gast durch die Nutzung des Pools die jeweils gültigen Pool-Regeln.",
      "Die Pool-Regeln sind im Online-Gästeguide der betroffenen Unterkünfte verfügbar. Die genaue Online-Adresse der Regeln enthält die Gästeinformation / der Apartment-Guide der jeweiligen Unterkunft.",
      "Der Gast ist verpflichtet, die Pool-Regeln vor der Nutzung des Pools zu lesen und sie während der Nutzung einzuhalten.",
      "Der Betreiber ist berechtigt, die Poolnutzung aus Wettergründen, wegen Wartung, Wasserbehandlung, technischer Störung, Sicherheitsgründen oder bei Verstoß gegen die Pool-Regeln einzuschränken oder vorübergehend auszusetzen.",
      "Der von Gästen genutzte Bereich des Panorama Pools kann kameraüberwacht sein. Die Kameraüberwachung dient dem Eigentumsschutz, der Unfallprävention, der Sicherheit und der Einhaltung der Regeln, ersetzt aber keinen Bademeister, keine persönliche Aufsicht und keine Aufsichtspflicht von Erwachsenen für Kinder.",
      "Die Nutzung des Pools erfolgt auf eigene Verantwortung. Kinder dürfen den Pool ausschließlich unter Aufsicht eines Erwachsenen nutzen. Für die Sicherheit der Kinder ist immer der begleitende Erwachsene verantwortlich.",
      "Der Betreiber übernimmt keine Haftung für Unfälle, Verletzungen, Schäden oder Mehrkosten, die aus einem Verstoß gegen die Pool-Regeln entstehen. Bei vorsätzlicher oder fahrlässiger Beschädigung trägt der Gast die Kosten der Wiederherstellung."
    ],
    bullets: ["Dandelion D2 Pool-Regeln: /guide/d2/medence/"]
  },
  {
    id: "aszf-4-a",
    title: "4/A. Kameraüberwachung",
    paragraphs: [
      "Ein Kameraüberwachungssystem kann ausschließlich in bestimmten, von Gästen genutzten Bereichen der Dandelion Unterkünfte betrieben werden. Dazu können insbesondere Eingang, Hof, Parkplatz, Zugangswege sowie bei den betroffenen Häusern der Bereich des Panorama Pools gehören.",
      "Zweck der Kameraüberwachung ist der Schutz der Gäste und der Unterkunft, der Eigentumsschutz, die Vorbeugung von Schäden und Regelverstößen sowie bei Bedarf die Klärung von Beschwerden, Unfällen oder Schadensfällen.",
      "Die Kameras sind nicht auf Innenräume, Schlafzimmer, Badezimmer, Toiletten oder andere Bereiche gerichtet, die die Privatsphäre der Gäste betreffen.",
      "In kameraüberwachten Bereichen werden entsprechende Hinweisschilder angebracht. Die detaillierten Regeln zur Datenverarbeitung durch Kameras enthält die Datenschutzerklärung."
    ]
  },
  {
    id: "aszf-5",
    title: "5. Zahlungsbedingungen",
    paragraphs: [
      "Zur Finalisierung der Buchung bitten wir um Überweisung von 30% des Unterkunftspreises innerhalb von 5 Werktagen nach der Buchung. Die Buchung wird mit Eingang der Anzahlung garantiert.",
      "Der verbleibende Unterkunftspreis ist beim Einzug in bar oder per Banküberweisung zu zahlen.",
      "Bitte geben Sie im Verwendungszweck den Namen der buchenden Person und das Anreisedatum an. Wenn die buchende Person nicht der anreisende Gast ist, geben Sie bitte auch den Namen des anreisenden Gastes an."
    ]
  },
  {
    id: "aszf-6",
    title: "6. Überweisungsdaten",
    paragraphs: [
      "Bitte verwenden Sie für die Anzahlung die Bankdaten der gebuchten Unterkunft. Bei Buchungen aus Ungarn empfehlen wir eine Überweisung in HUF; aus dem Ausland ist auch eine EUR-Überweisung möglich. Der genaue zu zahlende Betrag und die gewählte Währung stehen immer in der Buchungsbestätigung."
    ],
    bullets: [
      "Dandelion D1 / D2 / Fügeház - Begünstigte: Ilona Varnagy",
      "Revolut",
      "OTP HUF - Kontonummer / IBAN",
      "OTP EUR - Kontonummer / IBAN",
      "BIC / SWIFT",
      "Tipp: Auf dem Mobiltelefon können die Felder durch langes Berühren einfach kopiert werden."
    ]
  },
  {
    id: "aszf-7",
    title: "7. Stornierungsbedingungen",
    paragraphs: [
      "Eine Stornierung ist gültig, wenn der Gast sie schriftlich per E-Mail sendet oder offiziell über das Buchungssystem beziehungsweise den Vertriebskanal storniert. Als Zeitpunkt der Stornierung gilt der Zeitpunkt des Eingangs.",
      "Wenn die Anzahlung aufgrund der Stornierung zurückzuerstatten ist, überweisen wir sie spätestens innerhalb von 5 Werktagen auf das Bankkonto zurück, von dem die Anzahlung eingegangen ist, oder auf ein vom Gast schriftlich angegebenes Konto."
    ],
    bullets: [
      "Kostenfreie Stornierung: Bei Stornierung 30 Tage oder früher vor Anreise wird die Anzahlung erstattet.",
      "Stornierung innerhalb von 30 Tagen: Die Anzahlung ist nicht erstattbar; die Stornogebühr beträgt 30% der Buchung.",
      "Bei No-Show oder Stornierung am Anreisetag sind 100% des Unterkunftspreises zu zahlen."
    ]
  },
  {
    id: "aszf-8",
    title: "8. Check-in / Check-out / Self Check-in",
    paragraphs: [
      "Der Einzug erfolgt in der Regel per Self Check-in mit Schlüsselkasten. Detaillierte Anreiseinformationen senden wir per E-Mail.",
      "Voraussetzung für die Nutzung der Unterkunft ist der Abschluss des Online Check-ins mit Erfassung der Gästedaten und Dokumente. Ohne dies sendet das System keinen Zugangscode oder Schlüsselkasten-Code."
    ]
  },
  {
    id: "aszf-9",
    title: "9. Anreise und Abreise",
    paragraphs: [],
    bullets: [
      "Check-in: 15:00-19:00",
      "Check-out: bis 10:00",
      "Späte Anreise ist möglich, muss jedoch im Voraus mitgeteilt werden.",
      "Früher Check-in oder später Check-out kann je nach Kapazität für maximal +/-2 Stunden angefragt werden. Gebühr: 4.000 HUF / Anlass."
    ]
  },
  {
    id: "aszf-10",
    title: "10. Kaution",
    paragraphs: [
      "Grundsätzlich verlangen wir keine Kaution. In Ausnahmefällen kann jedoch eine Kaution verlangt werden; darüber informieren wir den Gast immer im Voraus.",
      "Wenn kein Schaden entsteht, erstatten wir die Kaution nach der Kontrolle nach der Abreise. Bei Schäden kann der Schadenswert abgezogen werden."
    ]
  },
  {
    id: "aszf-11",
    title: "11. Hausregeln, Rauchen und Haustiere",
    paragraphs: [],
    bullets: [
      "Die Einrichtung ist bestimmungsgemäß zu nutzen; die Einhaltung der Brandschutz- und Unfallverhütungsregeln ist verpflichtend.",
      "Rauchen: Alle Unterkünfte sind Nichtraucher-Unterkünfte. Bei Rauchen im Innenbereich berechnen wir eine zusätzliche Reinigungsgebühr von 30.000 HUF.",
      "Haustiere können wir nicht aufnehmen."
    ]
  },
  {
    id: "aszf-12",
    title: "12. Anzahl der Gäste",
    paragraphs: ["In der Unterkunft dürfen sich nur vorab angemeldete Gäste aufhalten."]
  },
  {
    id: "aszf-13",
    title: "13. Reinigung",
    paragraphs: [
      "Im Gesamtbetrag der Buchung kann eine separate Endreinigungsgebühr enthalten sein, die im Buchungsprozess immer gesondert angezeigt wird.",
      "Bei außergewöhnlicher Verschmutzung oder Verletzung der Hausregeln kann eine zusätzliche Reinigungsgebühr berechnet werden."
    ]
  },
  {
    id: "aszf-14",
    title: "14. Schäden / Haftung",
    paragraphs: [
      "Bei Schäden ist der Gast verpflichtet, den entstandenen Schaden zu ersetzen.",
      "Bitte nutzen Sie Möbel, Geräte und Ausstattung der Unterkunft bestimmungsgemäß. Falls erforderlich, kann der Schadensbetrag von der Kaution abgezogen oder separat beglichen werden."
    ]
  },
  {
    id: "aszf-15",
    title: "15. Kontakt",
    paragraphs: ["Bei Fragen helfen wir gerne zu Buchung, Zahlung, Anreise oder den Unterkünften."],
    bullets: ["E-Mail: hello@dandelionhouse.hu", "Telefon: +36 20 773 0807"]
  }
];

const buildContent = (
  title: string,
  subtitle: string,
  intro: string,
  keyPoints: string[],
  backLabel: string,
  sections: GuideSection[]
): GuideLocaleContent => ({
  title,
  subtitle,
  intro,
  keyPoints,
  backLabel,
  sections
});

const contentEn = buildContent(
  "Dandelion D2 - Terms and house rules",
  "Dandelion D2 terms and house rules",
  "Booking, stay and on-site use conditions for Dandelion D2. Valid from: 1 February 2026. Modified: 25 May 2026.",
  [
    "By submitting and confirming a booking, the guest accepts these terms.",
    "By using Panorama Pool, the guest accepts the Pool Rules.",
    "Pool use is at the guest's own risk, and children may use it only under adult supervision.",
    "Completing online check-in may be a condition of occupying the accommodation."
  ],
  "Back to the Dandelion D2 guide",
  d2AszfSectionsEn
);

const contentCs = buildContent(
  "Dandelion D2 - obchodní podmínky a pravidla",
  "Dandelion D2 obchodní podmínky a pravidla",
  "Podmínky rezervace, pobytu a používání ubytování Dandelion D2 na místě. Platné od: 1. února 2026. Aktualizováno: 25. května 2026.",
  [
    "Odesláním a potvrzením rezervace host tyto podmínky přijímá.",
    "Používáním Panorama Pool host přijímá pravidla bazénu.",
    "Bazén se používá na vlastní odpovědnost; děti jej mohou používat pouze pod dohledem dospělé osoby.",
    "Dokončení online check-inu může být podmínkou obsazení ubytování."
  ],
  "Zpět na průvodce Dandelion D2",
  d2AszfSectionsCs
);

const contentDe = buildContent(
  "Dandelion D2 - AGB und Nutzungsregeln",
  "Dandelion D2 AGB und Nutzungsregeln",
  "Buchungs-, Aufenthalts- und Nutzungsbedingungen vor Ort für Dandelion D2. Gültig ab: 1. Februar 2026. Geändert: 25. Mai 2026.",
  [
    "Mit Absenden und Bestätigung der Buchung akzeptiert der Gast diese Bedingungen.",
    "Durch die Nutzung des Panorama Pools akzeptiert der Gast die Pool-Regeln.",
    "Die Poolnutzung erfolgt auf eigene Verantwortung; Kinder dürfen den Pool nur unter Aufsicht eines Erwachsenen nutzen.",
    "Der Abschluss des Online Check-ins kann Voraussetzung für die Nutzung der Unterkunft sein."
  ],
  "Zurück zum Dandelion D2 Guide",
  d2AszfSectionsDe
);

export const d2AszfGuide: GuideContent = {
  slug: "aszf",
  houseSlug: "d2",
  houseName: "Dandelion D2",
  path: "/guide/d2/aszf/",
  qrTarget: "https://dandelionhouse.hu/guide/d2/aszf/",
  dePreparedTitle: "D2 ÁSZF",
  content: {
    hu: contentHu,
    en: contentEn,
    cs: contentCs,
    de: contentDe
  }
};
