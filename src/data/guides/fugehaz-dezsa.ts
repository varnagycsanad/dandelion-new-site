import type { GuideContent } from "./types";

export const fugehazDezsaGuide = {
  slug: "dezsa",
  houseSlug: "fugehaz",
  houseName: "Fügeház",
  path: "/guide/fugehaz/dezsa/",
  qrTarget: "https://dandelionhouse.hu/guide/fugehaz/dezsa/",
  dePreparedTitle: "Anleitung für den holzbefeuerten Badezuber",
  content: {
    hu: {
      title: "Dézsafürdő használati útmutató",
      subtitle: "Dézsafürdő használati és begyújtási útmutató - Fügeház",
      intro:
        "Rövid, mobilon is könnyen követhető útmutató a Fügeház dézsafürdő biztonságos begyújtásához, felfűtéséhez és használatához.",
      keyPoints: [
        "A tüzet fokozatosan, papírral és aprófával indítsátok.",
        "Felfűtés közben a kazán levegőző nyílása maradjon szabadon.",
        "A vízforgató felfűtés közben menjen, este kihúzható, reggel vissza kell dugni.",
        "A kellemes vízhőfok általában 38 °C körül van."
      ],
      backLabel: "Vissza a Fügeház útmutatóhoz",
      sections: [
        {
          id: "begyujtas",
          title: "1. A dézsa begyújtása",
          paragraphs: [
            "A dézsát fokozatosan kell begyújtani. Nem szabad azonnal nagy fákkal megrakni, mert akkor könnyen elfojthatja a tüzet.",
            "A begyújtáshoz szükséges fa a bejárati ajtótól balra található kis fatárolóban van. Ott vannak az apróbb, száraz fadarabok is."
          ],
          steps: [
            "A kazán tűzterébe alulra tegyetek jó sok papírt.",
            "A papírra kerüljenek vékony, aprófának való fadarabok.",
            "A begyújtókockát ne dobjátok be a tűztérbe.",
            "A kazán közelében találtok egy fém kaparót. A begyújtókockát erre kell rátenni.",
            "A begyújtókockát a fém kaparón gyújtsátok meg öngyújtóval.",
            "Ezután a fém kaparó segítségével óvatosan engedjétek le a begyújtókockát a papírhoz és az aprófához.",
            "Várjatok egy kicsit, amíg a papír és az aprófa rendesen lángra kap.",
            "Amikor az aprófa már szépen ég, akkor lehet mellé tenni vékonyabb fadarabokat.",
            "Csak akkor rakjatok rá nagyobb fákat, amikor már stabilan lobog a tűz."
          ],
          important:
            "Nem kell sietni. A tűz akkor lesz jó, ha először az aprófa, majd a kisebb fák rendesen átégnek. Ha túl hamar kerül rá nagy fa, könnyen elfojthatja a tüzet."
        },
        {
          id: "kazanteto",
          title: "2. A kazántető használata",
          paragraphs: [
            "A kazánon van egy kb. 5 cm-es levegőző nyílás. Ezen keresztül kap levegőt a tűz.",
            "Begyújtáskor és felfűtés közben ezt a nyílást nem szabad letakarni, mert a tűz nem kap elég levegőt, és nem fog rendesen égni.",
            "A kazántetőt úgy kell ráhelyezni, hogy ez a kb. 5 cm-es levegőző rész szabadon maradjon.",
            "A tetőt csak akkor érdemes jobban visszazárni, ha már fürödtök, és a víz túl meleg, vagy nem szeretnétek, hogy a tűz olyan erősen égjen. Ilyenkor kevesebb levegőt kap a tűz, és lassabban, nyugodtabban ég tovább.",
            "Felfűtéskor viszont az a cél, hogy a tűz nagy lánggal égjen."
          ]
        },
        {
          id: "fa-rakasa",
          title: "3. Fa rakása a kazánba",
          paragraphs: [
            "A fákat nem szabad bedobni a kazánba, mert megsérülhet a kazán alja. Mindig óvatosan be kell helyezni őket.",
            "Egy megrakás általában kb. 6-7 darab fa.",
            "Ez nagyjából 30-45 perc alatt ég le. Ha ezután újra ráraktok 6-7 darab fát, akkor a víz gyorsan melegszik tovább.",
            "30 °C fölött egy jól megrakott tűz akár kb. 3 °C-kal is emelheti a víz hőmérsékletét."
          ]
        },
        {
          id: "vizhofok",
          title: "4. Ajánlott vízhőmérséklet",
          paragraphs: [
            "A legkellemesebb vízhőmérséklet általában 38 °C körül van.",
            "Nyáron, melegebb időben már a 36 °C-os víz is kellemes lehet.",
            "Hidegebb időben, főleg télen, előfordulhat, hogy 39-40 °C körüli víz esik jól. Ennél melegebbre már nem érdemes fűteni, mert kellemetlen lehet.",
            "Ha a víz túlságosan felmelegedett, a dézsa mellett található vízcsappal és slaggal lehet hideg vizet pótolni."
          ]
        },
        {
          id: "homero",
          title: "5. Hőmérő",
          paragraphs: [
            "A vízhőmérsékletet a skimmerben lévő hőmérőn tudjátok ellenőrizni.",
            "A skimmer az a rész, ahol a vízforgató a vízfelszínről elszívja a vizet. Ebben található a hőmérő, ez alapján tudjátok megnézni, mennyire meleg a dézsa vize."
          ]
        },
        {
          id: "vizforgato",
          title: "6. A vízforgató használata",
          paragraphs: [
            "Felfűtés közben a vízforgató menjen, mert összekeveri a melegebb és hidegebb vizet, így egyenletesebben melegszik fel a dézsa.",
            "A víz tisztasága miatt is fontos, hogy a vízforgató működjön.",
            "Este, amikor fürödtök, a vízforgatót ki lehet húzni a falnál lévő konnektorból, hogy ne zúgjon éjszaka."
          ],
          important:
            "Másnap reggel dugjátok vissza, hogy tovább tisztítsa és forgassa a vizet."
        },
        {
          id: "vizkezeles",
          title: "7. Vízkezelés",
          paragraphs: [
            "A dézsa vize klórozott, így van tisztán tartva.",
            "Kérjük, más vegyszert vagy adalékot ne tegyetek a vízbe."
          ]
        },
        {
          id: "hangulat",
          title: "8. Napernyő és esti hangulat",
          paragraphs: [
            "A dézsa mellett található egy napernyő. Ha erősen süt a nap, de mégis szeretnétek bemenni a vízbe, nyugodtan nyissátok ki, árnyékot ad.",
            "Este érdemes lekapcsolni a kültéri lámpákat. Kevés a fényzavarás, ezért tiszta időben gyönyörűen látszanak a csillagok."
          ]
        }
      ]
    },
    en: {
      title: "Wood-Fired Hot Tub User Guide",
      subtitle: "Wood-Fired Hot Tub Instructions - Fugehaz",
      intro:
        "A short mobile-friendly guide for lighting, heating and using the wood-fired hot tub at Fugehaz.",
      keyPoints: [
        "Start the fire gradually with paper and kindling.",
        "Keep the stove air opening free while heating.",
        "Run the circulation system while heating; you may unplug it at night, then plug it back in the morning.",
        "The most pleasant water temperature is usually around 38 °C."
      ],
      backLabel: "Back to the Fugehaz guide",
      sections: [
        {
          id: "lighting",
          title: "1. Lighting the fire",
          paragraphs: [
            "The hot tub should be heated gradually. Do not start by filling the stove with large logs, because this can easily smother the fire.",
            "The firewood is stored in the small wood storage area to the left of the entrance door. You will also find smaller, dry pieces of wood there."
          ],
          steps: [
            "Place plenty of paper at the bottom of the stove firebox.",
            "Add thin, small pieces of dry wood on top of the paper.",
            "Do not throw the firelighter cube into the firebox.",
            "Near the stove, you will find a metal scraper/tool. Place the firelighter cube on this tool.",
            "Light the firelighter cube on the metal scraper using a lighter.",
            "Then carefully lower the lit firelighter into the firebox, onto the paper and kindling.",
            "Wait a little until the paper and small wood catch fire properly.",
            "Once the kindling is burning well, add some thinner pieces of wood.",
            "Only add larger logs once the fire is burning strongly and steadily."
          ],
          important:
            "Take your time. The fire works best if the paper, kindling and smaller pieces of wood are allowed to burn properly first. If large logs are added too early, they can put the fire out."
        },
        {
          id: "stove-lid",
          title: "2. Using the stove lid",
          paragraphs: [
            "There is an approximately 5 cm air opening on the stove. This is where the fire gets air.",
            "During lighting and heating, this opening must not be covered, otherwise the fire will not get enough air and will not burn properly.",
            "Place the stove lid in a way that keeps this 5 cm air opening free.",
            "The lid should only be closed more if you are already bathing and the water has become too hot, or if you do not want the fire to burn so strongly. With less air, the fire will burn more slowly and calmly.",
            "During heating, however, the goal is for the fire to burn with a strong flame."
          ]
        },
        {
          id: "adding-wood",
          title: "3. Adding wood to the stove",
          paragraphs: [
            "Do not throw logs into the stove, because this can damage the bottom of the stove. Always place the wood in carefully.",
            "One full load is usually about 6-7 pieces of wood.",
            "This normally burns down in about 30-45 minutes. If you then add another 6-7 pieces of wood, the water will heat up quite quickly.",
            "Above 30 °C, one good load of wood can raise the water temperature by around 3 °C."
          ]
        },
        {
          id: "temperature",
          title: "4. Recommended water temperature",
          paragraphs: [
            "The most pleasant water temperature is usually around 38 °C.",
            "In summer, when the weather is warmer, 36 °C can already feel comfortable.",
            "In colder weather, especially in winter, 39-40 °C may feel better. Heating the water above this is not recommended, as it can become uncomfortable.",
            "If the water becomes too hot, you can add cold water using the tap and hose next to the hot tub."
          ]
        },
        {
          id: "thermometer",
          title: "5. Thermometer",
          paragraphs: [
            "You can check the water temperature on the thermometer inside the skimmer.",
            "The skimmer is the part where the filtration system draws water from the surface. The thermometer is located there, and this is the best way to check the current water temperature."
          ]
        },
        {
          id: "circulation",
          title: "6. Using the water circulation system",
          paragraphs: [
            "The water circulation system should run while heating the hot tub. It mixes the warmer and colder water, so the whole tub heats more evenly.",
            "It is also important for keeping the water clean.",
            "In the evening, when you are bathing, you can unplug the circulation system from the wall socket so it does not make noise during the night."
          ],
          important:
            "Please plug it back in the next morning so it can continue circulating and cleaning the water."
        },
        {
          id: "water-treatment",
          title: "7. Water treatment",
          paragraphs: [
            "The water is kept clean with chlorine.",
            "Please do not add any other chemicals or additives to the water."
          ]
        },
        {
          id: "evening",
          title: "8. Parasol and evening atmosphere",
          paragraphs: [
            "There is a parasol next to the hot tub. If the sun is very strong but you would still like to use the hot tub, feel free to open it for shade.",
            "In the evening, it is worth turning off the outdoor lights. There is very little light pollution here, so on clear nights the stars are beautiful."
          ]
        }
      ]
    }
  }
} satisfies GuideContent;
