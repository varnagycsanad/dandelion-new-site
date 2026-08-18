import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

// [CHANGE 2026-05-20 00:00] English Dandelion D1 content added for the shared accommodation template.
const d1PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d1EnglishPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D1 Kisapáti | Family stay with Panorama Pool",
    description:
      "Dandelion D1 is a spacious Kisapáti house for families and groups, with a panoramic terrace and seasonal access to Panorama Pool."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=2be20f0b68a1114a&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "d1",
      "gallery",
      "dandelion-d1-source-001.webp",
      "Dandelion D1 English mobile hero"
    ),
    fallbackAlt: "Dandelion D1 spacious countryside guesthouse in Kisapáti",
    kicker: "Kisapáti · Szent György Hill",
    title: "Dandelion",
    titleAccent: "D1",
    subtitle: "SPACIOUS COUNTRYSIDE STAY FOR FAMILIES AND GROUPS",
    lead: "A spacious countryside guesthouse in Kisapáti for larger families and friends, with a panoramic terrace and easy access to the Balaton Uplands.",
    poolHighlight: {
      enabled: true,
      label: "Panorama Pool near Dandelion D1",
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
    intro: "A spacious house that gives families and friends room for shared meals, terrace time and local trips.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "A spacious, comfortable house where a larger family can rest together while still having room for everyone.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The terrace and the surrounding hills create a calm atmosphere for shared dinners outside.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A good starting point for hikes and a practical house for larger family or friend gatherings.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "A practical, comfortable house with several bedrooms and shared spaces that work well for groups.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "A nature-close setting with a spacious layout and a good location for Balaton Uplands programmes.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Space · panorama · family time",
    title: "One of the most spacious Dandelion guesthouses in Kisapáti",
    lead: "Dandelion D1 works especially well when you want to stay together, but still need proper bedrooms, comfortable shared areas and enough space for a larger group."
  },
  details: {
    kicker: "Dandelion D1",
    title: "Panoramic terrace, generous spaces and Panorama Pool access",
    shortDescription:
      "D1 is the most spacious, air-conditioned house among the Dandelion guesthouses, for up to 8 guests. It has 3 bedrooms, a living room, a comfortable terrace, grilling option and beautiful views toward Csobánc, Tóti Hill, Gulács and Badacsony.\n\nThe Panorama Pool shown in the main photo can be used by guests of Dandelion D1, D2 and Fügeház.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "D1 is the most spacious, air-conditioned house among the Dandelion guesthouses, a comfortable choice for larger families or groups of friends. The house has 3 bedrooms and a living room, so it also works well as a comfortable stay for larger groups.",
      "The living room is the central part of the house, connected to a large, fully equipped kitchen and dining area. From here you can step out onto the terrace, where morning coffee, shared dinners or evening conversations have their own atmosphere in good weather. From the terrace, you can see Csobánc, Tóti Hill, Gulács and Badacsony. Outdoor dining furniture and a grilling option are also available.",
      "The spacious layout, 3 separate bedrooms, living room, two shower bathroom areas and separate toilet make the stay comfortable for groups as well.",
      "D1 is a good choice for guests looking for a spacious, comfortable house for exploring the Balaton Uplands while also getting away from everyday life. Lake Balaton, Szent György Hill, Badacsony, Szigliget, Csobánc and local wineries are all within a short drive. Guests of D1 can also use the Panorama Pool, which is available for guests of D1, D2 and Fügeház."
    ],
    moreLabel: "More about Dandelion D1",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Guests", "up to 8 guests"],
          ["Layout", "3 bedrooms + living room"],
          ["Highlight", "panoramic terrace and generous shared spaces"],
          ["Location", "Kisapáti, near Szent György Hill"]
        ]
      },
      {
        title: "Outdoor time",
        items: [
          ["Pool", "Panorama Pool access"],
          ["Outdoor space", "outdoor dining and grill option"],
          ["Bathrooms", "multiple bathrooms with showers and a separate toilet"],
          ["Views", "Csobánc, Tóti Hill, Gulács and Badacsony"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Up to 8 guests", icon: "users" },
      { label: "3 double bedrooms", icon: "home" },
      { label: "Panorama Pool access", icon: "pool" },
      { label: "Panoramic terrace", icon: "mountain" },
      { label: "Outdoor grilling option", icon: "leaf" },
      { label: "Good starting point for local trips", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "guests", title: "Up to 8 guests", text: "Capacity" },
      { iconKey: "home", title: "3 bedrooms + living room", text: "Layout" },
      { iconKey: "family", title: "Good for larger families", text: "Space" },
      { iconKey: "terrace", title: "Garden and terrace", text: "Outdoor space" },
      { iconKey: "kitchen", title: "Well-equipped kitchen", text: "Kitchen" },
      { iconKey: "family", title: "Family-friendly", text: "Stay style" }
    ],
    featuredExperience: {
      label: "Featured experience",
      title: "Panorama Pool",
      text: "Book Dandelion D1, and from summer the panoramic pool access is included in the price.",
      note: "in summer season",
      iconKey: "pool",
      image: d1PanoramaPoolHeroImage
        ? {
            src: d1PanoramaPoolHeroImage.src,
            mobileSrc: d1PanoramaPoolHeroImage.mobileSrc,
            alt: d1PanoramaPoolHeroImage.altEn,
            width: 1800,
            height: 1350
          }
        : undefined
    },
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "family",
        title: "Spacious family house",
        text: "8 guests, separate bedrooms"
      },
      {
        iconKey: "garden",
        title: "Garden and terrace",
        text: "Outdoor meals"
      },
      {
        iconKey: "sun",
        title: "Summer-friendly stay",
        text: "Panorama Pool access"
      },
      {
        iconKey: "balaton",
        title: "Hill-country location",
        text: "Hikes and wineries"
      }
    ]
  },
  geoDecision: {
    kicker: "D1 quick answers",
    title: "Dandelion D1 is a good choice if you need a spacious Kisapáti house with Panorama Pool access",
    lead: "D1 is designed for larger families and groups of friends: up to 8 guests, a panoramic terrace, generous living spaces and Panorama Pool access.",
    questions: [
      {
        iconKey: "pool",
        question: "Does Dandelion D1 have pool access?",
        answer: "Yes. D1 guests can use the Panorama Pool."
      },
      {
        iconKey: "pool",
        question: "Is the pool private for D1?",
        answer: "No. It is not a private pool attached to the house; Panorama Pool is available in season for guests of D1, D2 and Fügeház."
      },
      {
        iconKey: "guests",
        question: "How many guests is Dandelion D1 comfortable for?",
        answer: "Dandelion D1 is comfortable for up to 8 guests, with 3 bedrooms, a living room and multiple bathrooms."
      },
      {
        iconKey: "mountain",
        question: "What local trips is D1 a good starting point for?",
        answer: "From Kisapáti, Szent György Hill, Badacsony, Szigliget, Csobánc, Lake Balaton and local wineries are all within a short drive."
      },
      {
        iconKey: "kitchen",
        question: "What amenities does D1 have?",
        answer: "D1 has a well-equipped kitchen, dishwasher, washing machine, air conditioning, a comfortable living room, panoramic terrace and grill option."
      },
      {
        iconKey: "wifi",
        question: "Does Dandelion D1 have fast internet?",
        answer: "Yes. Dandelion D1 has gigabit internet, so it is practical for longer stays and calm online work."
      }
    ],
    amenitiesTitle: "What matters in the house"
  },
  amenities: [
    { iconKey: "home", title: "3 bedrooms" },
    { iconKey: "home", title: "Comfortable living room" },
    { iconKey: "utensils", title: "Well-equipped kitchen" },
    { iconKey: "terrace", title: "Panoramic terrace" },
    { iconKey: "grill", title: "Grill option" },
    { iconKey: "sun", title: "Air conditioning" },
    { iconKey: "home", title: "Washing machine" },
    { iconKey: "utensils", title: "Dishwasher" },
    { iconKey: "wifi", title: "Gigabit internet" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Look around Dandelion D1",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Dandelion D1 gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "KISAPÁTI · TAPOLCA BASIN",
    title: "Around Dandelion D1",
    body: "Dandelion D1 is in Kisapáti, near Szent György Hill. Lake Balaton, Badacsony, Szigliget, Csobánc and the wineries and hiking routes of the Balaton Uplands are all within a short drive.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Witness-hill views", icon: "mountain" },
      { label: "Hikes and local trips nearby", icon: "trail" },
      { label: "Lake Balaton and wine region by short drive", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Map of the area around Dandelion D1"
  },
  lightbox: {
    galleryAriaLabel: "Dandelion D1 gallery",
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
        meta: "4-6 guests · family-friendly apartment · large garden",
        href: "/en/dandelion-d2/",
        image: {
          type: "mapping",
          slot: "d2_card_image",
          alt: "Dandelion D2 countryside accommodation near Szent György Hill"
        }
      },
      {
        name: "Fügeház",
        meta: "4-6 guests · terraces · Panorama Pool",
        href: "/en/dandelion-fugehaz/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fügeház countryside guesthouse with terrace near Szent György Hill"
        }
      },
      {
        name: "Dandelion Köveskál",
        meta: "Káli-medence · quiet village atmosphere",
        href: "/en/szallasok/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "koveskal",
            "gallery",
            "dandelion-koveskal-source-001.webp",
            "Dandelion D1 English related Köveskál"
          ),
          alt: "Exterior view of Dandelion Köveskál guesthouse"
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
            "Dandelion D1 English related Royal Homes"
          ),
          alt: "Exterior view of Dandelion Royal Homes"
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
      }
    ]
  }
};
