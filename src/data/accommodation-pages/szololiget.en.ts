import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-20 00:00] English Szololiget content added for the shared accommodation template.
export const szololigetEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Szőlőliget Vendégház near Szent György Hill | Vineyard-area countryside stay",
    description:
      "Szőlőliget Vendégház is a peaceful countryside guesthouse in the Balaton Uplands, with a vineyard atmosphere, quiet surroundings and easy access to Szent György Hill."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=e30c4b62d7324b3f&lang=En",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "szololiget",
      "gallery",
      "dandelion-szololiget-source-001.webp",
      "Szololiget English mobile hero"
    ),
    fallbackAlt: "Szőlőliget Vendégház countryside guesthouse near Szent György Hill",
    kicker: "Kisapáti · Szent György Hill",
    title: "Szőlőliget",
    titleAccent: "Vendégház",
    subtitle: "VINEYARD-AREA COUNTRYSIDE STAY WITH A LARGE TERRACE",
    lead: "A separate two-floor house on the eastern side of Szent György Hill, with a large wraparound terrace, quiet vineyard-area atmosphere and wide witness-hill views.",
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "View photos"
  },
  reviews: {
    kicker: "Guest reviews",
    title: "What guests say",
    intro: "A peaceful hillside stay with a large terrace, vineyard-area quiet and witness-hill views.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "An exceptionally quiet place with beautiful views and mornings that are easy to take slowly.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The terrace and the surrounding hills make the stay memorable, calm and easy to love.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A good choice for stepping away from noise while staying close to Balaton Uplands programmes.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "A comfortable separate house with a good location for hikes, wineries and Lake Balaton days.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "The quiet, the terrace and the sunrise create a strong atmosphere for a slower break.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Sunrise · panorama · quiet",
    title: "A hillside retreat away from the noise",
    lead: "Szőlőliget Vendégház is for guests who want more than a place to sleep: a quiet, nature-close base with a terrace that makes the landscape part of the day."
  },
  details: {
    kicker: "Szőlőliget Vendégház",
    title: "A two-floor small house with a large terrace and 180-degree views",
    shortDescription:
      "A two-floor house for 4 guests plus an extra bed, refreshed in 2022 with new furniture, a large wraparound terrace and wide witness-hill panorama.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "One of the strongest moments at Szőlőliget Vendégház is the morning: sunrise can be seen from the bed, and the quiet around the house quickly slows down the day.",
      "The house was refreshed in 2022 and furnished with new furniture. The two levels are each about 20 square metres, comfortable for 4 guests and extendable with an extra bed.",
      "A large wraparound terrace belongs to the lower level. From here, the view opens across the surrounding witness hills, including Csobánc, Tóti Hill and Gulács.",
      "The value of Szőlőliget is the quiet and the space around it. There is no busy resort feeling here: just the hillside, vineyards, the large terrace and the panorama.",
      "Hiking routes around Szent György Hill are easy to reach from the house. The basalt columns can be approached with about a half-hour hike, and wineries, Badacsony, Szigliget and Lake Balaton programmes are all within a short drive."
    ],
    moreLabel: "More about Szőlőliget Vendégház",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Guests", "4 guests + 1 extra bed"],
          ["Layout", "separate two-floor house"],
          ["Refreshed", "updated in 2022 with new furniture"],
          ["Location", "eastern side of Szent György Hill"]
        ]
      },
      {
        title: "Highlights",
        items: [
          ["Panorama", "180-degree witness-hill views"],
          ["Terrace", "large wraparound terrace"],
          ["Morning", "sunrise from the bed"],
          ["Nearby", "basalt columns, wineries and Lake Balaton by short drive"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Separate guesthouse", icon: "home" },
      { label: "4 guests + extra bed", icon: "users" },
      { label: "180-degree witness-hill panorama", icon: "mountain" },
      { label: "Large wraparound terrace", icon: "leaf" },
      { label: "Sunrise from the bed", icon: "sun" },
      { label: "Good base for hikes and wineries", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "guests", title: "4 guests + 1 extra bed", text: "Capacity" },
      { iconKey: "home", title: "Two-floor house", text: "Layout" },
      { iconKey: "sun", title: "Refreshed in 2022", text: "Condition" },
      { iconKey: "terrace", title: "Wraparound terrace", text: "Outdoor space" },
      { iconKey: "mountain", title: "180-degree panorama", text: "View" },
      { iconKey: "balaton", title: "Eastern side of Szent György Hill", text: "Location" }
    ],
    reasonsTitle: "Why you will love it",
    reasons: [
      { iconKey: "leaf", title: "Quiet hillside retreat", text: "A calm vineyard-area setting" },
      { iconKey: "sun", title: "Memorable mornings", text: "Sunrise from the bed" },
      { iconKey: "terrace", title: "Terrace days", text: "Panorama and open air" },
      { iconKey: "trail", title: "Good base for local trips", text: "Wine, hikes and Lake Balaton" }
    ]
  },
  amenities: [
    { iconKey: "terrace", title: "Wraparound terrace" },
    { iconKey: "mountain", title: "180-degree panorama" },
    { iconKey: "sun", title: "House refreshed in 2022" },
    { iconKey: "home", title: "Two-floor layout" },
    { iconKey: "home", title: "New furniture" },
    { iconKey: "home", title: "Separate house" },
    { iconKey: "guests", title: "Extra bed option" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Look around Szőlőliget Vendégház",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Szőlőliget Vendégház gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "SZENT GYÖRGY HILL · KISAPÁTI AREA",
    title: "Around Szőlőliget Vendégház",
    body: "Szőlőliget Vendégház is on the eastern side of Szent György Hill, with easy access to hiking routes, the basalt columns, local wineries and some of the best-known places of the Balaton Uplands.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Basalt columns by about a half-hour hike", icon: "trail" },
      { label: "Wineries and witness hills nearby", icon: "grapes" },
      { label: "Lake Balaton within a short drive", icon: "route" }
    ],
    embedSrc: "https://www.google.com/maps?q=Kisap%C3%A1ti&z=13&output=embed",
    embedTitle: "Map of the area around Szőlőliget Vendégház"
  },
  lightbox: {
    galleryAriaLabel: "Szőlőliget Vendégház gallery",
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
        name: "Zsálya Vendégház",
        meta: "quiet countryside rest · partly covered terrace",
        href: "/en/dandelion-zsalya/",
        image: {
          type: "mapping",
          slot: "zsalya_card_image",
          alt: "Zsálya Vendégház countryside accommodation near Szent György Hill"
        }
      },
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
        name: "Fügeház",
        meta: "4-6 guests · terraces · countryside views",
        href: "/en/dandelion-fugehaz/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fügeház countryside guesthouse with terrace near Szent György Hill"
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
        name: "Dandelion Royal Homes",
        meta: "comfortable days near Lake Balaton",
        href: "/en/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "Szololiget English related Royal Homes"
          ),
          alt: "Exterior view of Dandelion Royal Homes"
        }
      }
    ]
  }
};
