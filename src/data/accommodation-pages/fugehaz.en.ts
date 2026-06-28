import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

// [CHANGE 2026-05-20 00:00] English Fugehaz content added for the shared accommodation template.
const fugehazPanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const fugehazEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Fügeház near Szent György Hill | Countryside guesthouse with Panorama Pool",
    description:
      "Fügeház is a terraced guesthouse near Szent György Hill and the Balaton Uplands, with garden seating and seasonal access to the Panorama Pool."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=af2fdb8ed2ebb145&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "fugehaz",
      "gallery",
      "dandelion-fugehaz-source-001.webp",
      "Fügeház English mobile hero"
    ),
    fallbackAlt: "Fügeház countryside guesthouse terrace in the Balaton Uplands",
    kicker: "Balaton Uplands · near Szent György Hill",
    title: "Dandelion",
    titleAccent: "Fügeház",
    subtitle: "COUNTRYSIDE GUESTHOUSE WITH TERRACES AND WITNESS-HILL VIEWS",
    lead: "A terraced guesthouse near Szent György Hill, made for outdoor breakfasts, hillside views and easy Balaton Uplands days.",
    poolHighlight: {
      enabled: true,
      label: "Panorama Pool near Fügeház",
      text: "Panorama Pool is available in season for guests of D1, D2 and Fügeház.",
      href: "/panorama-pool/",
      ctaLabel: "Open pool page",
      variant: "strong"
    },
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "View photos"
  },
  reviews: {
    kicker: "Guest reviews",
    title: "What guests say",
    intro: "Guest notes about the terraces, views and location near Szent György Hill.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "A thoughtful place for guests who want wide countryside views and time on the terraces.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The terraces and the Balaton Uplands setting make the stay feel easy.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A good choice for a nature-close break without a busy holiday-resort feeling.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "A pleasant, quiet guesthouse for exploring the area and resting in the evening.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "Friendly countryside atmosphere, comfortable days and good access to the Balaton Uplands.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Terraces · panorama · witness hills",
    title: "A guesthouse for terrace time near the witness hills",
    lead: "Fügeház suits guests who want outdoor space, family-friendly rooms and views toward the surrounding hills."
  },
  details: {
    kicker: "Fügeház",
    title: "Terraces, countryside views and a Panorama Pool",
    shortDescription:
      "A comfortable guesthouse for 4 guests, extendable with an extra bed for up to 6 guests, with terraces, outdoor dining and access to the Panorama Pool from June 15, 2026.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "Fügeház is memorable for its terraces. Mornings can start with the surrounding hills, while evenings are easy to spend outside with longer conversations and countryside air.",
      "The house is comfortable for 4 guests and can host up to 6 guests with an extra bed. From the dining room terrace, guests can enjoy views toward Csobánc, Tóti Hill, Gulács and Badacsony; on the other side of the house, garden seating offers a quieter corner facing Szent György Hill.",
      "Panorama Pool is available in season for guests of D1, D2 and Fügeház. It is not a private pool attached to Fügeház, but part of the nearby D1-D2-Fügeház pool area from June 15, 2026.",
      "Outdoor time is supported by terraces, garden furniture and a grill option. The hill beside the house opens toward the surrounding witness hills, so sunsets and clear evenings are a real part of the stay.",
      "The house has two levels. Downstairs there is a well-equipped kitchen, a bathroom with shower, a living-sleeping area and a dining space. Upstairs, an open sleeping area gives the house its quiet, tucked-away feeling."
    ],
    moreLabel: "More about Fügeház",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Guests", "4 guests, up to 6 with an extra bed"],
          ["Location", "near Szent György Hill"],
          ["Atmosphere", "peaceful, panoramic, family-friendly"],
          ["Highlight", "Panorama Pool from June 15, 2026"]
        ]
      },
      {
        title: "Outdoor time",
        items: [
          ["Pool", "Panorama Pool for D1, D2 and Fügeház guests"],
          ["Terraces", "outdoor seating and garden dining"],
          ["Views", "Csobánc, Tóti Hill, Gulács and Badacsony"],
          ["For families", "relaxed summer days and a calm countryside setting"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Panorama Pool access", icon: "pool" },
      { label: "Family-friendly layout", icon: "users" },
      { label: "Panoramic terraces", icon: "mountain" },
      { label: "Outdoor grilling option", icon: "leaf" },
      { label: "Good starting point for witness-hill walks", icon: "trail" },
      { label: "Balaton Uplands location", icon: "route" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "guests", title: "4 guests, up to 6 with an extra bed", text: "Capacity" },
      { iconKey: "mountain", title: "Near Szent György Hill", text: "Location" },
      { iconKey: "mountain", title: "Panoramic terraces", text: "Atmosphere" },
      { iconKey: "terrace", title: "Terrace time", text: "Outdoor space" },
      { iconKey: "grill", title: "Grill option", text: "Outdoor dining" },
      { iconKey: "family", title: "Family-friendly house", text: "Stay style" }
    ],
    featuredExperience: {
      label: "Featured experience",
      title: "Panorama Pool",
      text: "Book Fügeház, and from summer the panoramic pool access is included in the price.",
      note: "from June 15, 2026",
      iconKey: "pool",
      image: fugehazPanoramaPoolHeroImage
        ? {
            src: fugehazPanoramaPoolHeroImage.src,
            mobileSrc: fugehazPanoramaPoolHeroImage.mobileSrc,
            alt: fugehazPanoramaPoolHeroImage.altEn,
            width: 1800,
            height: 1350
          }
        : undefined
    },
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "terrace",
        title: "Panoramic terraces",
        text: "Hills, evenings"
      },
      {
        iconKey: "leaf",
        title: "Good for couples",
        text: "Calm, views"
      },
      {
        iconKey: "family",
        title: "Smaller families",
        text: "4 guests, extra bed"
      },
      {
        iconKey: "pool",
        title: "Pool summer",
        text: "Panorama Pool"
      }
    ]
  },
  geoDecision: {
    kicker: "Fügeház quick answers",
    title: "Dandelion Fügeház is a good choice if you want a panoramic, terrace-focused guesthouse near Szent György Hill",
    lead: "Fügeház is comfortable for 4 guests and can be extended up to 6 guests with an extra bed. It is a two-level house with panoramic terraces, a grill option and Panorama Pool access from June 15, 2026.",
    questions: [
      {
        iconKey: "pool",
        question: "Does Fügeház have pool access?",
        answer: "Yes. From June 15, 2026, Fügeház guests can use the Panorama Pool together with guests of D1 and D2."
      },
      {
        iconKey: "family",
        question: "Who is Dandelion Fügeház best for?",
        answer: "Fügeház mainly suits couples, smaller families and guests looking for terraces, views and a Balaton Uplands setting."
      },
      {
        iconKey: "guests",
        question: "How many guests is Fügeház comfortable for?",
        answer: "Fügeház is comfortable for 4 guests and can be extended up to 6 guests with an extra bed."
      },
      {
        iconKey: "home",
        question: "How is Fügeház different from D1 or D2?",
        answer: "Fügeház feels more intimate, panoramic and terrace-focused. If you need larger shared spaces, D1 is the better direction; if you want a garden-based family house, D2 is stronger."
      },
      {
        iconKey: "kitchen",
        question: "What amenities are available in Fügeház?",
        answer: "Fügeház has panoramic terraces, a well-equipped kitchen, a grill option, garden dining, a bathroom with shower, two levels and Panorama Pool access."
      },
      {
        iconKey: "mountain",
        question: "What trips is Fügeház a good starting point for?",
        answer: "Fügeház is a good starting point for Szent György Hill, Badacsony, Csobánc, Tóti Hill, Gulács, local wineries and Lake Balaton beaches."
      }
    ],
    amenitiesTitle: "What matters in Fügeház"
  },
  amenities: [
    { iconKey: "terrace", title: "Panoramic terraces" },
    { iconKey: "grill", title: "Grill option" },
    { iconKey: "utensils", title: "Well-equipped kitchen" },
    { iconKey: "garden", title: "Garden dining area" },
    { iconKey: "garden", title: "Outdoor resting corner" },
    { iconKey: "home", title: "Two levels" },
    { iconKey: "bathroom", title: "Bathroom with shower" },
    { iconKey: "pool", title: "Panorama Pool" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Look around Fügeház",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Fügeház gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "BALATON UPLANDS · NEAR SZENT GYÖRGY HILL",
    title: "Around Fügeház",
    body: "Fügeház sits on the nature-close side of the Balaton Uplands. The area works well for walks, winery visits and scenic trips around the witness hills.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Panoramic countryside setting", icon: "mountain" },
      { label: "Hiking routes nearby", icon: "trail" },
      { label: "Balaton Uplands setting", icon: "leaf" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Map of the area around Fügeház"
  },
  lightbox: {
    galleryAriaLabel: "Fügeház gallery",
    closeAriaLabel: "Close gallery",
    previousAriaLabel: "Previous image",
    nextAriaLabel: "Next image"
  },
  labels: {
    googleLogoAlt: "Google review",
    bookingLogoAlt: "Booking.com review",
    galleryOpenAriaLabel: "Open gallery image",
    galleryHoverLabel: "View photo"
  },
  relatedStays: {
    kicker: "More stays",
    title: "More Dandelion stays",
    intro: "If you like the Dandelion atmosphere, you can choose another house or another part of the region from here.",
    items: [
      {
        name: "Dandelion D2",
        meta: "4-6 guests · garden · family-friendly",
        href: "/en/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image",
          alt: "Dandelion D2 countryside accommodation near Szent György Hill"
        }
      },
      {
        name: "Dandelion D1",
        meta: "6-8 guests · spacious family stay",
        href: "/en/dandelion-d1/",
        image: {
          type: "mapping",
          slot: "d1_card_image",
          alt: "Dandelion D1 spacious countryside guesthouse in Kisapáti"
        }
      },
      {
        name: "Zsálya Vendégház",
        meta: "quiet, nature-close countryside rest",
        href: "/en/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image",
          alt: "Zsálya Vendégház countryside accommodation near Szent György Hill"
        }
      },
      {
        name: "Szőlőliget Vendégház",
        meta: "a slower stay among the vineyards",
        href: "/en/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image",
          alt: "Szőlőliget Vendégház countryside stay among vineyards"
        }
      },
      {
        name: "Dandelion Royal Homes",
        meta: "comfortable days near Lake Balaton",
        href: "/en/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "Fügeház English related Royal Homes"
          ),
          alt: "Exterior view of Dandelion Royal Homes"
        }
      }
    ]
  }
};
