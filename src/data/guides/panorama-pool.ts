import type { GuideContent } from "./types";

type PoolGuideHouse = {
  houseSlug: string;
  houseName: string;
};

const issueBulletsHu = [
  "üveg törik a medence körül",
  "szennyeződés kerül a vízbe",
  "a medencefedés megsérül vagy nem mozgatható",
  "a víz színe, szaga vagy állapota szokatlan",
  "valaki rosszul lesz vagy megsérül"
];

const issueBulletsEn = [
  "glass breaks around the pool",
  "contamination gets into the water",
  "the pool cover is damaged or cannot be moved",
  "the colour, smell or condition of the water seems unusual",
  "someone feels unwell or gets injured"
];

const forbiddenBulletsHu = [
  "fejest ugrani",
  "a vízbe ugrálni",
  "futkározni",
  "lökdösődni",
  "másokat fröcsköléssel vagy hangoskodással zavarni",
  "a medence szélén veszélyesen közlekedni",
  "a medencefedésre ráállni, ráülni vagy ráugrani",
  "elektromos eszközt a víz közvetlen közelében használni",
  "szemetelni vagy a vizet szennyezni"
];

const forbiddenBulletsEn = [
  "diving head first",
  "jumping into the water",
  "running around the pool",
  "pushing others",
  "disturbing others by splashing or shouting",
  "moving dangerously around the pool edge",
  "standing, sitting or jumping on the pool cover",
  "using electrical devices directly near the water",
  "littering or contaminating the water"
];

const createPoolGuide = ({ houseSlug, houseName }: PoolGuideHouse): GuideContent => ({
  slug: "medence",
  houseSlug,
  houseName,
  path: `/guide/${houseSlug}/medence/`,
  qrTarget: `https://dandelionhouse.hu/guide/${houseSlug}/medence/`,
  dePreparedTitle: "Poolnutzungsordnung",
  content: {
    hu: {
      title: "Panorama Pool - Medencehasználati szabályzat",
      subtitle: `Panorama Pool medencehasználati szabályzat - ${houseName}`,
      intro:
        "Hatályos: 2026. május 24. A Panorama Pool a Dandelion vendégek részére, a fürdési szezonban használható.",
      keyPoints: [
        "Nyitvatartás a fürdési szezonban: naponta 10:00-21:00.",
        "A medence használata saját felelősségre történik, úszómester nincs.",
        "Gyermekek kizárólag felnőtt felügyeletével használhatják a medencét.",
        "A medencefedést az esti utolsó használat után vissza kell tolni a medence fölé."
      ],
      backLabel: `Vissza a ${houseName} útmutatóhoz`,
      sections: [
        {
          id: "elfogadas",
          title: "A szabályzat elfogadása",
          paragraphs: [
            "A Panorama Pool a Dandelion vendégek részére, a fürdési szezonban használható.",
            "A medence használatával a vendég elfogadja a jelen Medencehasználati szabályzatot, és vállalja, hogy a medencét kizárólag az itt leírt szabályok betartásával használja."
          ]
        },
        {
          id: "nyitvatartas",
          title: "1. Nyitvatartás",
          paragraphs: [
            "A Panorama Pool a fürdési szezonban naponta 10:00-21:00 között használható.",
            "A medence nyitvatartási időn kívül nem használható.",
            "Az üzemeltető időjárási okból, karbantartás, vízkezelés, műszaki hiba, biztonsági ok vagy a szabályok megszegése esetén a medence használatát ideiglenesen korlátozhatja vagy szüneteltetheti."
          ]
        },
        {
          id: "hasznalat",
          title: "2. A medence használata",
          paragraphs: [
            "A medence használata saját felelősségre történik.",
            "A medencénél úszómester nem tartózkodik.",
            "A medence vízmélysége körülbelül 1,30 m. A medence nem ugrómedence, ezért fejest ugrani, vízbe ugrani, lökdösődni, a medence széléről beugrálni, valamint a medence körül futkározni tilos.",
            "A medencét minden vendég csak a saját úszástudásának, egészségi állapotának és fizikai állapotának megfelelően használhatja.",
            "Úszni nem tudó vagy bizonytalanul úszó vendég kizárólag megfelelő óvatossággal, szükség esetén úszást segítő eszközzel használhatja a medencét."
          ]
        },
        {
          id: "gyermekek",
          title: "3. Gyermekekre vonatkozó szabályok",
          paragraphs: [
            "Gyermekek kizárólag felnőtt felügyeletével használhatják a medencét.",
            "A gyermekek biztonságáért minden esetben a velük érkező szülő, hozzátartozó vagy kísérő felnőtt felel.",
            "Gyermekeket a medencében vagy a medence környékén felügyelet nélkül hagyni tilos.",
            "Gyermekek a medencefedést nem mozgathatják, arra nem mászhatnak rá, és azon nem közlekedhetnek."
          ]
        },
        {
          id: "higienia",
          title: "4. Higiéniai szabályok",
          paragraphs: [
            "A medence használata előtt zuhanyzás kötelező.",
            "Naptej, testápoló, olaj vagy egyéb krém használata után kérjük, különösen figyeljetek a zuhanyzásra, mert ezek rontják a vízminőséget.",
            "A medencébe ételt, italt, sampont, tusfürdőt, habfürdőt, olajat vagy bármilyen idegen anyagot juttatni tilos.",
            "A medencében étkezni tilos.",
            "Kisgyermekek esetében kizárólag megfelelő fürdőpelenka használatával engedélyezett a medencehasználat.",
            "A medencét nem használhatja az, aki fertőző betegségben szenved, lázas, hasmenéses, hányásos tünetei vannak, illetve nyílt sebbel vagy bőrgyógyászati fertőzéssel rendelkezik."
          ]
        },
        {
          id: "tiltott",
          title: "5. Tiltott tárgyak és tevékenységek",
          paragraphs: [
            "A medencébe és közvetlen környezetébe üveget, üvegpoharat, törékeny tárgyat bevinni tilos.",
            "A medencében és a medence körül tilos:"
          ],
          bullets: forbiddenBulletsHu,
          important:
            "Háziállat a medencébe nem vihető. Ittas, bódult vagy tudatmódosító szer hatása alatt álló személy a medencét nem használhatja."
        },
        {
          id: "jatekok",
          title: "6. Felfújható eszközök, játékok",
          paragraphs: [
            "Felfújható játék, matrac, labda vagy egyéb vízi játék csak úgy használható, ha az más vendégeket nem zavar és nem veszélyeztet.",
            "Nagyméretű felfújható eszköz használatát az üzemeltető korlátozhatja vagy megtilthatja.",
            "A játékok és eszközök használatából eredő balesetekért a használó, gyermekek esetén a kísérő felnőtt felel."
          ]
        },
        {
          id: "medencefedes",
          title: "7. Medencefedés használata",
          paragraphs: [
            "A medence fedését a napi első használat előtt el kell húzni.",
            "Kérjük, hogy a medencefedést mindig óvatosan, lassan mozgassátok, hogy a fedés és a sín ne sérüljön.",
            "Az esti utolsó medencehasználat után a vendégek kötelesek a medencefedést visszatolni a medence fölé.",
            "A medencefedés visszatolása fontos a víz tisztasága, a hő megtartása és a biztonság miatt.",
            "A medencefedésre ráállni, ráülni, ráugrani vagy azon közlekedni tilos.",
            "Gyermekek a medencefedést nem mozgathatják.",
            "Ha a medencefedés akad, megszorul vagy rendellenesen működik, kérjük, ne erőltessétek, hanem azonnal jelezzétek az üzemeltetőnek."
          ]
        },
        {
          id: "idojaras",
          title: "8. Időjárás és rendkívüli helyzetek",
          paragraphs: [
            "Vihar, villámlás, erős szél vagy veszélyes időjárási körülmény esetén a medencét használni tilos.",
            "Villámlás esetén a medencét azonnal el kell hagyni.",
            "Karbantartás, vízkezelés, vegyszeres kezelés, műszaki hiba vagy rendellenes vízminőség esetén a medence ideiglenesen lezárható.",
            "A lezárt vagy használaton kívüli medencét használni tilos."
          ]
        },
        {
          id: "rend",
          title: "9. Rend, tisztaság, más vendégek nyugalma",
          paragraphs: [
            "Kérjük, a medence környékén ügyeljetek a rendre, a tisztaságra és a többi vendég pihenésére.",
            "A medence környezetében elhelyezett bútorokat, napozóágyakat és egyéb eszközöket rendeltetésszerűen kell használni.",
            "Használat után kérjük, a saját tárgyakat, törölközőket, játékokat és hulladékot vigyétek magatokkal.",
            "A medence környékén hangos zenehallgatás vagy másokat zavaró viselkedés nem megengedett."
          ]
        },
        {
          id: "bejelentes",
          title: "10. Baleset, hiba, szennyezés bejelentése",
          paragraphs: [
            "Baleset, sérülés, rosszullét, műszaki hiba, szennyezés vagy rendellenes vízminőség esetén kérjük, azonnal értesítsétek az üzemeltetőt.",
            "Különösen fontos azonnal jelezni, ha:"
          ],
          bullets: issueBulletsHu
        },
        {
          id: "felelosseg",
          title: "11. Felelősség",
          paragraphs: [
            "A medence használata saját felelősségre történik.",
            "A szabályok be nem tartásából eredő balesetért, sérülésért, kárért vagy többletköltségért az üzemeltető felelősséget nem vállal.",
            "Gyermekek esetében a medencehasználat teljes ideje alatt a szülő vagy kísérő felnőtt felel a gyermek biztonságáért.",
            "Szándékos vagy gondatlan károkozás esetén a helyreállítás, javítás vagy pótlás költsége a kárt okozó vendéget terheli."
          ],
          important:
            "A medence használatával a vendég tudomásul veszi és elfogadja a jelen Medencehasználati szabályzatot."
        }
      ]
    },
    en: {
      title: "Panorama Pool - Pool Rules",
      subtitle: `Panorama Pool rules - ${houseName}`,
      intro:
        "Effective date: 24 May 2026. Panorama Pool may be used by Dandelion guests during the bathing season.",
      keyPoints: [
        "Opening hours during the bathing season: daily from 10:00 to 21:00.",
        "Guests use the pool at their own responsibility. There is no lifeguard on duty.",
        "Children may use the pool only under adult supervision.",
        "After the last evening use, the pool cover must be pulled back over the pool."
      ],
      backLabel: `Back to the ${houseName} guide`,
      sections: [
        {
          id: "acceptance",
          title: "Acceptance of the rules",
          paragraphs: [
            "Panorama Pool may be used by Dandelion guests during the bathing season.",
            "By using the pool, the guest accepts these Pool Rules and agrees to use the pool only in accordance with the rules described here."
          ]
        },
        {
          id: "opening-hours",
          title: "1. Opening hours",
          paragraphs: [
            "During the bathing season, Panorama Pool may be used daily between 10:00 and 21:00.",
            "The pool may not be used outside opening hours.",
            "The operator may temporarily restrict or suspend pool use due to weather, maintenance, water treatment, technical issues, safety reasons or breach of the rules."
          ]
        },
        {
          id: "pool-use",
          title: "2. Use of the pool",
          paragraphs: [
            "Guests use the pool at their own responsibility.",
            "There is no lifeguard on duty at the pool.",
            "The water depth is approximately 1.30 m. The pool is not a diving pool, so diving head first, jumping into the water, pushing others, jumping in from the pool edge and running around the pool are prohibited.",
            "Each guest may use the pool only according to their own swimming ability, health condition and physical condition.",
            "Guests who cannot swim or who are uncertain swimmers may use the pool only with appropriate caution and, if necessary, with a swimming aid."
          ]
        },
        {
          id: "children",
          title: "3. Rules for children",
          paragraphs: [
            "Children may use the pool only under adult supervision.",
            "The parent, relative or accompanying adult is responsible for the safety of children in all cases.",
            "Children must not be left unattended in the pool or around the pool area.",
            "Children must not move the pool cover, climb onto it or walk on it."
          ]
        },
        {
          id: "hygiene",
          title: "4. Hygiene rules",
          paragraphs: [
            "Showering before using the pool is mandatory.",
            "After using sunscreen, body lotion, oil or any other cream, please pay particular attention to showering, as these products reduce water quality.",
            "Food, drinks, shampoo, shower gel, bath foam, oil or any foreign substance must not be introduced into the pool.",
            "Eating in the pool is prohibited.",
            "Small children may use the pool only with a suitable swim nappy.",
            "The pool must not be used by anyone with an infectious disease, fever, diarrhoea, vomiting symptoms, open wounds or dermatological infection."
          ]
        },
        {
          id: "forbidden",
          title: "5. Prohibited items and activities",
          paragraphs: [
            "Glass, glass cups and breakable objects must not be taken into the pool or its immediate surroundings.",
            "In and around the pool, the following are prohibited:"
          ],
          bullets: forbiddenBulletsEn,
          important:
            "Pets are not allowed in the pool. Persons who are intoxicated, under the influence of drugs or otherwise impaired may not use the pool."
        },
        {
          id: "toys",
          title: "6. Inflatable equipment and toys",
          paragraphs: [
            "Inflatable toys, mattresses, balls or other water toys may be used only if they do not disturb or endanger other guests.",
            "The operator may restrict or prohibit the use of large inflatable equipment.",
            "The user is responsible for accidents resulting from the use of toys and equipment; in the case of children, the accompanying adult is responsible."
          ]
        },
        {
          id: "pool-cover",
          title: "7. Use of the pool cover",
          paragraphs: [
            "The pool cover must be opened before the first use of the day.",
            "Please always move the pool cover carefully and slowly, so that the cover and rail are not damaged.",
            "After the last evening pool use, guests are required to pull the pool cover back over the pool.",
            "Closing the pool cover is important for water cleanliness, heat retention and safety.",
            "Standing, sitting, jumping or walking on the pool cover is prohibited.",
            "Children must not move the pool cover.",
            "If the pool cover gets stuck, jams or does not work normally, please do not force it and inform the operator immediately."
          ]
        },
        {
          id: "weather",
          title: "8. Weather and exceptional situations",
          paragraphs: [
            "The pool must not be used during storms, lightning, strong wind or dangerous weather conditions.",
            "In case of lightning, the pool must be left immediately.",
            "The pool may be temporarily closed due to maintenance, water treatment, chemical treatment, technical issues or abnormal water quality.",
            "A closed or out-of-use pool must not be used."
          ]
        },
        {
          id: "order",
          title: "9. Order, cleanliness and other guests' peace",
          paragraphs: [
            "Please keep the pool area tidy and clean, and respect other guests' rest.",
            "Furniture, sun loungers and other equipment placed around the pool must be used only for their intended purpose.",
            "After use, please take your own belongings, towels, toys and rubbish with you.",
            "Loud music or behaviour that disturbs others is not allowed around the pool."
          ]
        },
        {
          id: "reporting",
          title: "10. Reporting accidents, faults or contamination",
          paragraphs: [
            "In case of accident, injury, illness, technical fault, contamination or abnormal water quality, please notify the operator immediately.",
            "It is especially important to report immediately if:"
          ],
          bullets: issueBulletsEn
        },
        {
          id: "liability",
          title: "11. Liability",
          paragraphs: [
            "Guests use the pool at their own responsibility.",
            "The operator does not accept liability for accidents, injuries, damage or additional costs resulting from failure to follow the rules.",
            "In the case of children, the parent or accompanying adult is responsible for the child's safety throughout pool use.",
            "In case of intentional or negligent damage, the cost of repair, restoration or replacement shall be borne by the guest who caused the damage."
          ],
          important:
            "By using the pool, the guest acknowledges and accepts these Pool Rules."
        }
      ]
    }
  }
});

// [CHANGE 2026-05-24 20:20] Medencehasznalati guide szabalyzati szovegre frissitve HU/EN tartalommal es hatalyossagi datummal.
export const d1PoolGuide = createPoolGuide({
  houseSlug: "d1",
  houseName: "Dandelion D1"
});

export const d2PoolGuide = createPoolGuide({
  houseSlug: "d2",
  houseName: "Dandelion D2"
});

export const fugehazPoolGuide = createPoolGuide({
  houseSlug: "fugehaz",
  houseName: "Fügeház"
});
