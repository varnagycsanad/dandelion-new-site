import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";
import { panoramaPoolImages } from "../images/panorama-pool-images";

// [CHANGE 2026-05-20 00:00] English Dandelion D1 content added for the shared accommodation template.
const d1PanoramaPoolHeroImage = panoramaPoolImages.find((image) => image.usageHint === "hero");

export const d1EnglishPageData: AccommodationPageData = {
  seo: {
    title: "Dandelion D1 near Szent György Hill | Spacious countryside stay for families",
    description:
      "Dandelion D1 is a spacious countryside accommodation near Szent György Hill and Lake Balaton, ideal for families and groups, with access to the shared panoramic pool."
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
      label: "Shared panoramic pool near Dandelion D1",
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
    intro: "A spacious countryside stay that gives families and friends room to slow down together.",
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
        quote: "A good base for hikes, quiet days and larger family or friend gatherings.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "A practical, comfortable house with several bedrooms and shared spaces that work well for groups.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "A peaceful, nature-close setting with a spacious layout and a good location for Balaton Uplands programmes.",
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
    title: "Panoramic terrace, generous shared spaces and a shared pool",
    shortDescription:
      "A spacious three-bedroom house for up to 8 guests, with a panoramic terrace, generous shared spaces and access to the shared panoramic pool from June 15, 2026.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "One of D1's strongest features is its spacious layout: several bedrooms, usable shared areas and a terrace that gives the group a comfortable place to spend time together.",
      "From the living room terrace, guests can enjoy views toward Csobánc, Tóti Hill, Gulács and Badacsony. The outdoor dining set and grill option make shared meals outside simple and comfortable.",
      "The panoramic pool is shared by guests of D1, D2 and Fügeház. It is not a private pool for D1, but part of the nearby D1-D2-Fügeház pool area from June 15, 2026.",
      "On the lower level, the house has a well-equipped living-kitchen-dining area with refrigerator and freezer. The shared space includes a round dining table for six and a sofa bed where two guests can sleep comfortably. Two bedrooms and two bathrooms with showers are also on the lower level.",
      "Wooden stairs lead to the upper level, where two bedrooms, a shower cabin and a separate toilet are located. The larger bedroom faces Szent György Hill and has two 90 cm beds that can be used together or separately. The smaller bedroom has a balcony with views toward Gulács and Csobánc.",
      "Dandelion D1 is for guests looking for a spacious, comfortable, nature-close house where the group can stay together while everyone still has their own space. Lake Balaton, Szent György Hill, Badacsony, Szigliget, Csobánc and local wineries are all within a short drive."
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
          ["Pool", "shared panoramic pool from June 15, 2026"],
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
      { label: "Shared panoramic pool access", icon: "pool" },
      { label: "Panoramic terrace", icon: "mountain" },
      { label: "Outdoor grilling option", icon: "leaf" },
      { label: "Good base for local trips", icon: "trail" }
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
      note: "from June 15, 2026",
      iconKey: "pool",
      image: d1PanoramaPoolHeroImage
        ? {
            src: d1PanoramaPoolHeroImage.src,
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
        title: "Comfortable for larger families",
        text: "Bedrooms and shared spaces"
      },
      {
        iconKey: "garden",
        title: "Outdoor days",
        text: "Terrace, garden, rest"
      },
      {
        iconKey: "sun",
        title: "Good for summer stays",
        text: "Garden and terrace"
      },
      {
        iconKey: "balaton",
        title: "Szent György Hill base",
        text: "Hikes, beaches, wineries"
      }
    ]
  },
  amenities: [
    { iconKey: "home", title: "3 bedrooms" },
    { iconKey: "home", title: "Comfortable living room" },
    { iconKey: "utensils", title: "Well-equipped kitchen" },
    { iconKey: "terrace", title: "Panoramic terrace" },
    { iconKey: "grill", title: "Grill option" },
    { iconKey: "bathroom", title: "Multiple bathrooms" },
    { iconKey: "garden", title: "Garden seating" }
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
        meta: "4-6 guests · terraces · shared pool",
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
