import type { ImageMetadata } from "astro";
import { accommodations, type Accommodation } from "../accommodations";
import { d2PageData } from "../accommodation-pages/d2";
import { fugehazPageData } from "../accommodation-pages/fugehaz";
import type { AccommodationPageData } from "../accommodation-pages/types";
import { accommodationImages } from "../images/accommodation-images";
import type { AccommodationImageSet, ImageAsset } from "../images/image-types";
import type {
  AutumnCampaignOffer,
  AutumnCampaignOfferClaim,
  AutumnCampaignOfferId,
  AutumnCampaignPropertyKey,
  AutumnCampaignRenderableMedia,
  AutumnCampaignResponsiveMedia,
  AutumnCampaignTheme
} from "./types";
import { autumnPanoramaHeroVideo, d2FamilyAutumnHeroVideo, fugehazAutumnHeroVideo } from "../videos/autumn-campaign";

import wineExperienceImage from "../../assets/home/experiences/dandelion-home-experience-wine-gastro-01-optimized.webp";
import balatonExperienceImage from "../../assets/home/experiences/dandelion-home-experience-balaton-01.webp";
import hillsExperienceImage from "../../assets/home/experiences/dandelion-home-experience-tanuhegyek-01.webp";
import balatonStoryImage from "../../assets/home/region-stories/dandelion-home-balaton-story-02.webp";
import hillsStoryImage from "../../assets/home/region-stories/dandelion-home-tanuhegyek-story-01.webp";
import sunriseStoryImage from "../../assets/home/region-stories/szent-gyorgy-hegy-sunrise-sticky-bg-optimized.webp";
import vineyardImage from "../../assets/experiences/szent-gyorgy-hegy-szolo.jpg";
import mountainsDroneImage from "../../assets/experiences/tanuhegyek-drone-dji-20260512.jpg";
import fugehazExteriorImage from "../../assets/accommodations/fugehaz/gallery/dandelion-fugehaz-source-001.webp";
import fugehazWarmInteriorImage from "../../assets/accommodations/fugehaz/gallery/dandelion-fugehaz-source-006.webp";
import fugehazPanoramaImage from "../../assets/accommodations/fugehaz/gallery/dandelion-fugehaz-source-012.webp";
import d2ExteriorImage from "../../assets/accommodations/d2/gallery/dandelion-d2-source-001.webp";
import d2FamilyImage from "../../assets/accommodations/d2/gallery/dandelion-d2-source-005.webp";
import d2FireplaceImage from "../../assets/accommodations/d2/gallery/dandelion-d2-source-010.webp";
import d2BedroomImage from "../../assets/accommodations/d2/gallery/dandelion-d2-source-015.webp";

interface OfferSourceDefinition {
  propertyKey: AutumnCampaignPropertyKey;
  accommodationSlug: string;
  pageData: AccommodationPageData;
}

const offerSourceDefinitions: Record<AutumnCampaignPropertyKey, OfferSourceDefinition> = {
  d2: {
    propertyKey: "d2",
    accommodationSlug: "dandelion-d2",
    pageData: d2PageData
  },
  fugehaz: {
    propertyKey: "fugehaz",
    accommodationSlug: "fugehaz",
    pageData: fugehazPageData
  }
};

const pairTheme: AutumnCampaignTheme = {
  accent: "#D99E2B",
  accentSoft: "rgba(217, 158, 43, 0.14)",
  accentStrong: "#8F6215",
  badgeBackground: "#3E3A34",
  badgeText: "#FFF8EE",
  cardTint: "#FBF3E6",
  directSurface: "#1C1712"
};

const familyTheme: AutumnCampaignTheme = {
  accent: "#6F7E4B",
  accentSoft: "rgba(111, 126, 75, 0.14)",
  accentStrong: "#44502A",
  badgeBackground: "#3B4633",
  badgeText: "#F6F7F2",
  cardTint: "#F4F4EE",
  directSurface: "#1D2219"
};

const mediaReplacementLabel = "CSERÉLNI";

function requireAccommodation(slug: string): Accommodation {
  const match = accommodations.find((accommodation) => accommodation.slug === slug);

  if (!match) {
    throw new Error(`Missing accommodation entry for slug: ${slug}`);
  }

  return match;
}

function requireImageSet(propertyKey: AutumnCampaignPropertyKey): AccommodationImageSet {
  const imageSet = accommodationImages[propertyKey];

  if (!imageSet) {
    throw new Error(`Missing accommodation image set for key: ${propertyKey}`);
  }

  return imageSet;
}

function buildOfferSource(propertyKey: AutumnCampaignPropertyKey) {
  const definition = offerSourceDefinitions[propertyKey];

  return {
    accommodation: requireAccommodation(definition.accommodationSlug),
    pageData: definition.pageData,
    imageSet: requireImageSet(propertyKey)
  };
}

function fromImageAsset(asset: ImageAsset, alt?: string): AutumnCampaignRenderableMedia {
  return {
    src: asset.astroSrc?.src ?? asset.src,
    alt: alt ?? asset.alt.hu,
    width: asset.astroSrc?.width ?? asset.width,
    height: asset.astroSrc?.height ?? asset.height
  };
}

function fromMetadata(asset: ImageMetadata, alt: string): AutumnCampaignRenderableMedia {
  return {
    src: asset.src,
    alt,
    width: asset.width,
    height: asset.height
  };
}

function fromPublicPath(src: string, alt: string): AutumnCampaignRenderableMedia {
  return {
    src,
    alt
  };
}

function buildHeroMedia(
  desktop: ImageAsset | null,
  mobile: ImageAsset | null,
  fallback: AutumnCampaignRenderableMedia
): AutumnCampaignResponsiveMedia {
  return {
    desktop: desktop ? fromImageAsset(desktop) : fallback,
    mobile: mobile ? fromImageAsset(mobile) : undefined
  };
}

function buildDirectBookingClaims(propertyName: string): AutumnCampaignOfferClaim[] {
  return [
    {
      text: "A Booking.com és Airbnb felé továbbított szállásár 5%-kal magasabb a közvetlen SabeeApp-árnál.",
      status: "approved_business_decision"
    },
    {
      text: "A takarítási díj és az idegenforgalmi adó minden csatornán azonos logika szerint működik.",
      status: "approved_business_decision"
    },
    {
      text: "Jelenleg nincs külön promóció sem a Booking.comon, sem az Airbnb-n, sem a közvetlen csatornán.",
      status: "approved_business_decision"
    },
    {
      text: `${propertyName} esetén a Panorama Pool csak olyan időszakban kommunikálható, amikor ténylegesen nyitva van.`,
      status: "seasonal"
    }
  ];
}

const fugehazSource = buildOfferSource("fugehaz");
const d2Source = buildOfferSource("d2");

const fugehazHeroFallback = fromMetadata(
  fugehazExteriorImage,
  "Fügeház fügefaággal az előtérben és világos homlokzattal"
);
const d2HeroFallback = fromMetadata(
  d2ExteriorImage,
  "Dandelion D2 terasszal, sárga székekkel és grillezővel"
);
const sharedPoolDesktop = fromPublicPath(
  "/images/panorama-pool/hero/dandelion-panorama-pool-hero-desktop-20260628.webp",
  "Panorama Pool a tanúhegyek látványával"
);
const sharedPoolMobile = fromPublicPath(
  "/images/panorama-pool/hero/dandelion-panorama-pool-hero-mobile-20260628.webp",
  "Panorama Pool mobilnézetben, háttérben a tanúhegyekkel"
);

export const autumn2026Offers: AutumnCampaignOffer[] = [
  {
    id: "fugehaz_oszi_kettesben_2026",
    slug: "oszi-kettesben",
    propertyKey: "fugehaz",
    audience: "pair",
    status: "ready_for_template",
    routePath: "/ajanlatok/oszi-kettesben/",
    fallbackAccommodationPath: fugehazSource.accommodation.url,
    bookingUrl: fugehazSource.pageData.bookingLink,
    seo: {
      title: "Őszi kettesben a Fügeházban | Dandelion Vendégházak",
      description:
        "Romantikus őszi pihenés a Fügeházban kandallóval, borászatokkal, panorámával és közvetlen foglalási lehetőséggel."
    },
    sourceRefs: fugehazSource,
    media: {
      heroDesktop: fugehazSource.imageSet.hero.desktop,
      heroMobile: fugehazSource.imageSet.hero.mobile,
      card: fugehazSource.imageSet.card,
      galleryPreview: fugehazSource.imageSet.gallery.slice(0, 6)
    },
    theme: pairTheme,
    mediaReplacementLabel,
    hero: {
      eyebrow: "Fügeház · Őszi kettesben",
      title: "Őszi feltöltődés a Balaton-felvidéken",
      lead: "Lassítsatok le, kapcsoljatok ki, és élvezzétek az ősz minden pillanatát a Fügeházban."
    },
    campaignHero: {
      kicker: "ŐSZI KETTESBEN",
      titleLines: ["Őszi feltöltődés", "a Balaton-felvidéken"],
      descriptionLines: [
        "Lassítsatok le. Kapcsoljatok ki.",
        "Élvezzétek az ősz minden pillanatát a Fügeházban."
      ],
      ctaNote: "Közvetlen foglalás = 5% kedvezmény",
      video: fugehazAutumnHeroVideo,
      media: buildHeroMedia(
        fugehazSource.imageSet.hero.desktop,
        fugehazSource.imageSet.hero.mobile,
        fugehazHeroFallback
      )
    },
    positioning: {
      eyebrow: "Páros ajánlat",
      title: "Romantikus őszi kikapcsolódás",
      lead: "Borászatok, kandalló, panoráma és lassú, meghitt esték adják a Fügeház őszi kampányhangulatát."
    },
    services: {
      title: "Kampányban használható szolgáltatások",
      items: [
        "Panorama Pool (csak szezonban)",
        "2 db kerékpár ingyenesen",
        "Kandalló és grillező"
      ],
      note: "A Panorama Pool csak a tényleges szezonális nyitvatartás idején kommunikálható."
    },
    experienceItems: [
      {
        icon: "pool",
        title: "Panorama Pool",
        details: ["44 m3 fűtött medence", "lélegzetelállító kilátással"],
        note: "Csak szezonban"
      },
      {
        icon: "fireplace",
        title: "Kandalló",
        details: ["Meleg tűz,", "meghitt esték"]
      },
      {
        icon: "wine",
        title: "Borvidék",
        details: ["Kiváló borászatok", "néhány percen belül"]
      },
      {
        icon: "firepit",
        title: "Tűzrakóhely",
        details: ["Ingyenes tűzifa,", "csillagos ég"]
      },
      {
        icon: "bike",
        title: "Kerékpárok",
        details: ["2 db felnőtt kerékpár", "díjmentesen"]
      },
      {
        icon: "romance",
        title: "Romantika",
        details: ["Ideális hely", "kettesben"]
      }
    ],
    communication: {
      title: "Kommunikációs blokkok",
      items: [
        "romantikus őszi kikapcsolódás",
        "borászatok",
        "kerékpártúrák",
        "esti kandallózás",
        "grillezés",
        "csillagos ég",
        "nyugodt környezet"
      ]
    },
    babyAmenities: {
      title: "Babával érkezőknek igény esetén biztosítható",
      items: ["babaágy", "babakád", "etetőszék", "fellépő"]
    },
    storyTiles: [
      {
        titleLines: ["Hideg kint.", "Meleg bent."],
        media: {
          desktop: fromMetadata(
            fugehazWarmInteriorImage,
            "Világos fügeházas enteriőr étkezőasztallal és erkélykapcsolattal"
          )
        }
      },
      {
        titleLines: ["Itt másképp", "telik az idő."],
        media: {
          desktop: fromMetadata(
            fugehazPanoramaImage,
            "Kilátás a Fügeház teraszáról a környező tájra és a tanúhegyekre"
          )
        }
      },
      {
        titleLines: ["Egy pohár bor.", "Egy hosszú este."],
        media: {
          desktop: fromMetadata(
            wineExperienceImage,
            "Borospoharak a Balaton-felvidéki szőlősorok előtt"
          )
        }
      },
      {
        titleLines: ["Csillagos ég.", "Csend körülöttetek."],
        media: {
          desktop: fromMetadata(
            sunriseStoryImage,
            "Napfelkelte a Szent György-hegy környéki dombok felett"
          )
        }
      }
    ],
    programs: [
      {
        title: "Mindkét kampányban használható programok",
        items: [
          "Tapolcai-tavasbarlang",
          "Szent György-hegyi túrák",
          "balatoni strandok",
          "közeli borászatok"
        ]
      }
    ],
    programsSection: {
      eyebrow: "Környékbeli programok",
      title: "Fedezzétek fel a környéket",
      description:
        "Borászatok, balatoni kitérők és könnyű túrák karnyújtásnyira a páros kikapcsolódástól.",
      ctaLabel: "TOVÁBBI PROGRAMOK ÉS TIPPEK",
      ctaHref: "/elmenyek/",
      cards: [
        {
          title: "Szent György-hegy",
          href: "/elmenyek/tanuhegyek/",
          description: "Szőlősorok, panoráma és nyugodt séták a közelben.",
          media: {
            desktop: fromMetadata(vineyardImage, "Szőlősorok a Szent György-hegy lankáin")
          }
        },
        {
          title: "Közeli borászatok",
          href: "/elmenyek/bor-es-panorama/",
          description: "Kóstolók, teraszok és hosszú beszélgetések a közelben.",
          media: {
            desktop: fromMetadata(
              wineExperienceImage,
              "Borospoharak a Balaton-felvidéki táj előtt"
            )
          }
        },
        {
          title: "Tapolca",
          href: "/elmenyek/",
          description: "Kényelmes városi kitérő, ha fél napra kimozdulnátok.",
          media: {
            desktop: fromMetadata(
              hillsStoryImage,
              "Balaton-felvidéki táj tanúhegyekkel és települési részletekkel"
            )
          }
        },
        {
          title: "Balatoni strandok",
          href: "/elmenyek/balaton/",
          description: "A part jó időben ősszel is könnyű program marad.",
          media: {
            desktop: fromMetadata(
              balatonExperienceImage,
              "Balatoni partszakasz nyugodt víztükörrel és távoli dombokkal"
            )
          }
        },
        {
          title: "Túraútvonalak",
          href: "/elmenyek/tanuhegyek/",
          description: "Rövidebb és hosszabb ösvények kilátással és csenddel.",
          media: {
            desktop: fromMetadata(
              mountainsDroneImage,
              "Légi felvétel a Balaton-felvidéki tanúhegyekről"
            )
          }
        }
      ]
    },
    directBooking: {
      eyebrow: "Közvetlen foglalási előny",
      title: "Foglaljatok közvetlenül és élvezzétek az előnyöket!",
      titleLines: ["Foglaljatok közvetlenül", "és élvezzétek az előnyöket!"],
      primaryMessage:
        "A szabad időpontokat és az árakat közvetlenül a saját foglalási felületünkön nézhetitek meg.",
      claims: buildDirectBookingClaims(fugehazSource.accommodation.name),
      qaFollowUp:
        "Nyitott technikai QA marad: konkrét Fügeház-időpontok teljes végösszegének ellenőrzése SabeeApp, Booking.com és Airbnb csatornák között.",
      highlightValue: "5%",
      highlightLines: ["kedvezmény", "a szállás árából"],
      benefits: [
        "Közvetlen kapcsolat a szállásadóval",
        "Gyors visszaigazolás",
        "Rugalmas ügyintézés",
        "Foglaljon közvetlenül - nálunk olcsóbban."
      ],
      media: {
        desktop: fromMetadata(
          fugehazWarmInteriorImage,
          "Világos fügeházas enteriőr kandallós, meghitt őszi hangulattal"
        )
      }
    },
    practicalAmenities: {
      eyebrow: "Praktikus szolgáltatások",
      title: "Minden, ami egy kényelmes őszi kikapcsolódáshoz kell",
      items: [
        "Ingyenes Wi-Fi",
        "Ingyenes parkolás",
        "Légkondicionálás",
        "Nemdohányzó szállás",
        "Háziállat engedélyezett"
      ],
      supportLabel: "Babás felszerelés igény esetén",
      supportItems: ["babaágy", "babakád", "etetőszék", "fellépő"]
    },
    ctas: {
      primary: "ÁRAK ÉS SZABAD IDŐPONTOK",
      secondary: "Fügeház részletei",
      homeCard: "Bővebben"
    },
    homepageCard: {
      eyebrow: "",
      title: "Őszi feltöltődés a Balaton-felvidéken",
      text: "Kapcsolódjatok ki a Szent György-hegy lábánál. Borászatok, kandalló, panoráma és nyugodt esték várnak.",
      ctaLabel: "Bővebben"
    },
    tracking: {
      offerId: "fugehaz_oszi_kettesben_2026",
      property: "fugehaz",
      audience: "pair",
      campaign: "autumn_2026"
    }
  },
  {
    id: "d2_oszi_csaladi_pihenes_2026",
    slug: "oszi-csaladi-pihenes",
    propertyKey: "d2",
    audience: "family",
    status: "ready_for_template",
    routePath: "/ajanlatok/oszi-csaladi-pihenes/",
    fallbackAccommodationPath: d2Source.accommodation.url,
    bookingUrl: d2Source.pageData.bookingLink,
    seo: {
      title: "Őszi családi pihenés a D2-ben | Dandelion Vendégházak",
      description:
        "Családi őszi kikapcsolódás a Dandelion D2-ben Panorama Pool-lal, kandallóval, közös programokkal és közvetlen foglalási CTA-val."
    },
    sourceRefs: d2Source,
    media: {
      heroDesktop: d2Source.imageSet.hero.desktop,
      heroMobile: d2Source.imageSet.hero.mobile,
      card: d2Source.imageSet.card,
      galleryPreview: d2Source.imageSet.gallery.slice(0, 6)
    },
    theme: familyTheme,
    mediaReplacementLabel,
    hero: {
      eyebrow: "Dandelion D2 · Őszi családi pihenés",
      title: "Őszi családi kikapcsolódás",
      lead: "Minőségi idő, közös élmények és természetközeli napok várnak a Dandelion D2-ben."
    },
    campaignHero: {
      kicker: "ŐSZI CSALÁDI PIHENÉS",
      titleLines: ["Őszi családi", "kikapcsolódás"],
      supportLine: "a Balaton-felvidéken",
      descriptionLines: [
        "Minőségi idő. Közös élmények.",
        "A Dandelion D2-ben valóban együtt lehet a család."
      ],
      ctaNote: "Közvetlen foglalás = 5% kedvezmény",
      video: d2FamilyAutumnHeroVideo,
      media: buildHeroMedia(
        d2Source.imageSet.hero.desktop,
        d2Source.imageSet.hero.mobile,
        d2HeroFallback
      )
    },
    positioning: {
      eyebrow: "Családi ajánlat",
      title: "Természetközeli őszi pihenés",
      lead: "Családi programok, kandalló, kert és közös ritmus teszi a D2-t erős őszi bázissá."
    },
    services: {
      title: "Kampányban használható szolgáltatások",
      items: [
        "Panorama Pool (csak szezonban)",
        "Családbarát kialakítás",
        "Kandalló és grillező"
      ],
      note: "A D2 kampányban nem jelenhet meg dézsa vagy ingyenes kerékpár mint saját szolgáltatás."
    },
    experienceItems: [
      {
        icon: "pool",
        title: "Panorama Pool",
        details: ["44 m3 fűtött medence", "lélegzetelállító kilátással"],
        note: "Csak szezonban"
      },
      {
        icon: "family",
        title: "Családbarát",
        details: ["Gyerekbarát felszerelések,", "közös terek"]
      },
      {
        icon: "fireplace",
        title: "Kandalló",
        details: ["Meleg tűz,", "meghitt esték"]
      },
      {
        icon: "grill",
        title: "Grillező",
        details: ["Grillezési lehetőség", "a szabadban"]
      },
      {
        icon: "firepit",
        title: "Tűzrakóhely",
        details: ["Ingyenes tűzifa,", "közös esti program"]
      },
      {
        icon: "wifi",
        title: "Ingyenes Wi‑Fi",
        details: ["Stabil kapcsolat", "ha szükség van rá"]
      },
      {
        icon: "parking",
        title: "Ingyenes parkolás",
        details: ["Kényelmes érkezés", "közvetlenül a háznál"]
      }
    ],
    communication: {
      title: "Kommunikációs blokkok",
      items: [
        "családi kikapcsolódás",
        "külön hálószoba + nappali",
        "közös programok",
        "esti kandallózás",
        "grillezés"
      ]
    },
    babyAmenities: {
      title: "Babával érkezőknek igény esetén biztosítható",
      items: ["babaágy", "babakád", "etetőszék", "fellépő"]
    },
    storyTiles: [
      {
        titleLines: ["Medence.", "Játék. Nevetés."],
        media: {
          desktop: sharedPoolDesktop,
          mobile: sharedPoolMobile
        }
      },
      {
        titleLines: ["Esős napokra is", "van megoldás."],
        media: {
          desktop: fromMetadata(
            d2BedroomImage,
            "Világos hálószoba a D2-ben kényelmes franciaággyal"
          )
        }
      },
      {
        titleLines: ["Tűz, mese,", "közös pillanatok."],
        media: {
          desktop: fromMetadata(
            d2FireplaceImage,
            "D2 nappali kandallóval, étkezővel és világos beltérrel"
          )
        }
      },
      {
        titleLines: ["Közös vacsorák.", "Közös emlékek."],
        media: {
          desktop: fromMetadata(
            d2ExteriorImage,
            "D2 terasz étkezőasztallal, sárga székekkel és grillezővel"
          )
        }
      }
    ],
    programs: [
      {
        title: "Mindkét kampányban használható programok",
        items: [
          "Tapolcai-tavasbarlang",
          "Szent György-hegyi túrák",
          "balatoni strandok",
          "közeli borászatok"
        ]
      },
      {
        title: "Családi kampányban ezen felül",
        items: ["Kisapáti játszótér", "pingpongasztal", "kerékpáros ügyességi pálya"]
      }
    ],
    programsSection: {
      eyebrow: "Környékbeli programok",
      title: "Fedezzétek fel a környéket",
      description:
        "Közeli kirándulások, strandok és könnyen szervezhető családi megállók egészítik ki a pihenést.",
      ctaLabel: "TOVÁBBI PROGRAMOK ÉS TIPPEK",
      ctaHref: "/elmenyek/",
      cards: [
        {
          title: "Szent György-hegy",
          href: "/elmenyek/tanuhegyek/",
          description: "Könnyű sétákhoz és közös kilátós megállókhoz is jó célpont.",
          media: {
            desktop: fromMetadata(
              mountainsDroneImage,
              "Légi felvétel a Balaton-felvidéki tanúhegyekről"
            )
          }
        },
        {
          title: "Tapolcai-tavasbarlang",
          href: "/elmenyek/",
          description: "Időjárástól független közös program a közelben.",
          media: {
            desktop: fromMetadata(
              hillsStoryImage,
              "Balaton-felvidéki táj településsel és dombokkal"
            )
          }
        },
        {
          title: "Balatoni strandok",
          href: "/elmenyek/balaton/",
          description: "Jó időben egy spontán parti kitérő is belefér.",
          media: {
            desktop: fromMetadata(
              balatonStoryImage,
              "Balatoni panoráma nyugodt vízfelülettel"
            )
          }
        },
        {
          title: "Családi programok",
          href: "/elmenyek/",
          description: "Kisapáti és más közeli megállók a mozgékonyabb délutánokra.",
          media: {
            desktop: fromMetadata(
              d2FamilyImage,
              "Gyermek pokrócon ül a D2 kertjében, háttérben a tájjal"
            )
          }
        },
        {
          title: "Borászatok",
          href: "/elmenyek/bor-es-panorama/",
          description: "A felnőtteknek is jut nyugodt, panorámás kikapcsolódás.",
          media: {
            desktop: fromMetadata(
              wineExperienceImage,
              "Borospoharak a Balaton-felvidéki táj előtt"
            )
          }
        }
      ]
    },
    directBooking: {
      eyebrow: "Közvetlen foglalási előny",
      title: "Foglaljatok közvetlenül és élvezzétek az előnyöket!",
      titleLines: ["Foglaljatok közvetlenül", "és élvezzétek az előnyöket!"],
      primaryMessage:
        "Az árakat és a szabad időpontokat közvetlenül a saját foglalási felületünkön éritek el.",
      claims: buildDirectBookingClaims(d2Source.accommodation.name),
      qaFollowUp:
        "Nyitott technikai QA marad: konkrét D2-időpontok teljes végösszegének ellenőrzése SabeeApp, Booking.com és Airbnb csatornák között.",
      highlightValue: "5%",
      highlightLines: ["kedvezmény", "a szállás árából"],
      benefits: [
        "Közvetlen kapcsolat a szállásadóval",
        "Gyors visszaigazolás",
        "Rugalmas ügyintézés",
        "Foglaljon közvetlenül - nálunk olcsóbban."
      ],
      media: {
        desktop: fromMetadata(
          d2FamilyImage,
          "Gyermek pokrócon ül a D2 kertjében, háttérben a tájjal"
        )
      }
    },
    practicalAmenities: {
      eyebrow: "Praktikus szolgáltatások",
      title: "Kényelmes részletek a közös pihenéshez",
      items: [
        "Ingyenes Wi-Fi",
        "Ingyenes parkolás",
        "Légkondicionálás",
        "Családbarát",
        "Nemdohányzó szállás",
        "Háziállat nem hozható"
      ],
      supportLabel: "Babás felszerelés igény esetén",
      supportItems: ["babaágy", "babakád", "etetőszék", "fellépő"]
    },
    ctas: {
      primary: "ÁRAK ÉS SZABAD IDŐPONTOK",
      secondary: "D2 részletei",
      homeCard: "Bővebben"
    },
    homepageCard: {
      eyebrow: "",
      title: "Őszi családi kalandok",
      text: "Lassítsatok le együtt a természet közelében. Családi programok, kandalló és közös élmények várnak rátok.",
      ctaLabel: "Bővebben"
    },
    tracking: {
      offerId: "d2_oszi_csaladi_pihenes_2026",
      property: "d2",
      audience: "family",
      campaign: "autumn_2026"
    }
  }
];

export const autumn2026OffersV2: AutumnCampaignOffer[] = autumn2026Offers.map((offer) => ({
  ...offer,
  campaignHero: {
    ...offer.campaignHero,
    video: autumnPanoramaHeroVideo
  }
}));

export const autumn2026OfferMap: Record<AutumnCampaignOfferId, AutumnCampaignOffer> =
  autumn2026Offers.reduce(
    (offerMap, offer) => {
      offerMap[offer.id] = offer;
      return offerMap;
    },
    {} as Record<AutumnCampaignOfferId, AutumnCampaignOffer>
  );
