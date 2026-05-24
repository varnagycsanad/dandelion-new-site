import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

// [CHANGE 2026-05-20 00:00] English Fugehaz content added for the shared accommodation template.
const fugehazPanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const fugehazEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Fügeház near Szent György Hill | Countryside guesthouse with shared panoramic pool",
    description:
      "Fügeház is a peaceful countryside guesthouse near Szent György Hill and the Balaton Uplands, with garden, terrace and access to the shared panoramic pool."
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
    lead: "A peaceful countryside guesthouse near Szent György Hill, made for terrace mornings, slow evenings and easy Balaton Uplands days.",
    poolHighlight: {
      enabled: true,
      label: "Shared panoramic pool near Fügeház",
      text: "The panoramic pool is shared by guests of D1, D2 and Fügeház.",
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
    intro: "A calm guesthouse for terrace mornings, quiet evenings and easy Balaton Uplands days.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "A calm, thoughtful place for guests who want slower days and wide countryside views.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The terrace, the quiet rhythm and the Balaton Uplands setting make the stay feel easy.",
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
        quote: "Friendly countryside atmosphere, comfortable days and a relaxed Balaton Uplands pace.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Terraces · panorama · countryside calm",
    title: "A peaceful guesthouse for terrace time near the witness hills",
    lead: "Fügeház suits guests who want a calm, family-friendly base where the outdoor spaces, terraces and surrounding hills are part of the stay."
  },
  details: {
    kicker: "Fügeház",
    title: "Terraces, countryside views and a shared panoramic pool",
    shortDescription:
      "A comfortable guesthouse for 4 guests, extendable with an extra bed for up to 6 guests, with terraces, outdoor dining and access to the shared panoramic pool from June 1, 2026.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "Fügeház is memorable for its terraces and outdoor rhythm. Mornings can start with the surrounding hills, while evenings naturally slow down into longer conversations and quiet countryside air.",
      "The house is comfortable for 4 guests and can host up to 6 guests with an extra bed. From the dining room terrace, guests can enjoy views toward Csobánc, Tóti Hill, Gulács and Badacsony; on the other side of the house, garden seating offers a quieter corner facing Szent György Hill.",
      "The panoramic pool is shared by guests of D1, D2 and Fügeház. It is not a private pool for Fügeház, but part of the nearby D1-D2-Fügeház pool area from June 1, 2026.",
      "Outdoor time is supported by terraces, garden furniture and a grill option. The hill beside the house opens toward the surrounding witness hills, so sunsets and clear evenings can become part of the experience.",
      "The house has two levels. Downstairs there is a well-equipped kitchen, a bathroom with shower, a living-sleeping area and a dining space. Upstairs, an open sleeping area offers a double bed and a sofa bed."
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
          ["Highlight", "shared panoramic pool from June 1, 2026"]
        ]
      },
      {
        title: "Outdoor time",
        items: [
          ["Pool", "shared pool used by D1, D2 and Fügeház guests"],
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
      { label: "Shared panoramic pool access", icon: "pool" },
      { label: "Family-friendly layout", icon: "users" },
      { label: "Panoramic terraces", icon: "mountain" },
      { label: "Outdoor grilling option", icon: "leaf" },
      { label: "Good base for witness-hill walks", icon: "trail" },
      { label: "Quiet Balaton Uplands rhythm", icon: "route" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "guests", title: "4 guests, up to 6 with an extra bed", text: "Capacity" },
      { iconKey: "mountain", title: "Near Szent György Hill", text: "Location" },
      { iconKey: "mountain", title: "Peaceful and panoramic", text: "Atmosphere" },
      { iconKey: "terrace", title: "Terrace time", text: "Outdoor space" },
      { iconKey: "grill", title: "Grill option", text: "Outdoor dining" },
      { iconKey: "family", title: "Family-friendly house", text: "Stay style" }
    ],
    featuredExperience: {
      label: "Featured experience",
      title: "Panorama Pool",
      text: "Book Fügeház, and from summer the panoramic pool access is included in the price.",
      note: "from June 1, 2026",
      iconKey: "pool",
      image: fugehazPanoramaPoolHeroImage
        ? {
            src: fugehazPanoramaPoolHeroImage.src,
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
        title: "Terrace mornings",
        text: "Outdoor space and hill views"
      },
      {
        iconKey: "family",
        title: "Easy with family",
        text: "Comfortable, calm layout"
      },
      {
        iconKey: "leaf",
        title: "Quiet countryside rhythm",
        text: "Slow days outside"
      },
      {
        iconKey: "balaton",
        title: "Witness hills nearby",
        text: "Hikes, wine, lake days"
      }
    ]
  },
  amenities: [
    { iconKey: "terrace", title: "Panoramic terraces" },
    { iconKey: "grill", title: "Grill option" },
    { iconKey: "utensils", title: "Well-equipped kitchen" },
    { iconKey: "garden", title: "Garden dining area" },
    { iconKey: "garden", title: "Outdoor resting corner" },
    { iconKey: "home", title: "Two levels" },
    { iconKey: "bathroom", title: "Bathroom with shower" },
    { iconKey: "home", title: "Sofa bed" }
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
    body: "Fügeház connects to the quieter, nature-close side of the Balaton Uplands. The area works well for slow rest, walks and scenic trips around the witness hills.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Panoramic countryside setting", icon: "mountain" },
      { label: "Hiking routes nearby", icon: "trail" },
      { label: "Quiet Balaton Uplands rhythm", icon: "leaf" }
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
