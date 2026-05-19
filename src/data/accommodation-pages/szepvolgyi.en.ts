import type { AccommodationPageData } from "./types";
import { requireAccommodationLocalAssetPath } from "../images/astro-local-assets";

// [CHANGE 2026-05-20 00:00] English Szepvolgyi content added for the shared accommodation template.
export const szepvolgyiEnglishPageData: AccommodationPageData = {
  seo: {
    title: "Szépvölgyi Vendégház in Badacsonyörs | Peaceful stay near Lake Balaton",
    description:
      "Szépvölgyi Vendégház is a peaceful guesthouse in Badacsonyörs, close to Lake Balaton and the Badacsony area, ideal for a relaxed countryside stay."
  },
  bookingLink: "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=7d46f283f2f5792f",
  hero: {
    mobileImagePath: requireAccommodationLocalAssetPath(
      "szepvolgyi",
      "gallery",
      "dandelion-szepvolgyi-source-001.webp",
      "Szepvolgyi English mobile hero"
    ),
    fallbackAlt: "Szépvölgyi Vendégház in Badacsonyörs with a terrace and Lake Balaton view",
    kicker: "Badacsonyörs · Szépvölgyi út",
    title: "Szépvölgyi",
    titleAccent: "Vendégház",
    subtitle: "SPACIOUS FAMILY HOUSE WITH LAKE BALATON VIEWS",
    lead: "A spacious, peaceful guesthouse in Badacsonyörs, close to Lake Balaton, with a panoramic terrace, enclosed garden and room for relaxed family days.",
    primaryCtaLabel: "Book now",
    secondaryCtaLabel: "View photos"
  },
  reviews: {
    kicker: "Guest reviews",
    title: "What guests say",
    intro: "A short review-style overview for the shared Dandelion accommodation template.",
    mobileSummaryLabel: "More reviews",
    mobileHighlightedAriaLabel: "Highlighted Google review",
    mobileMoreGoogleAriaLabel: "More Google reviews",
    mobileBookingAriaLabel: "Booking.com reviews",
    items: [
      {
        source: "Google",
        quote: "A spacious, comfortable house with a beautiful Lake Balaton view and a calm setting.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "A good choice for a family holiday, especially because of the terrace and the enclosed garden.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Google",
        quote: "The beach, harbour and local programmes are easy to reach, while the house stays peaceful in the evening.",
        meta: "Guest · Google · 5/5"
      },
      {
        source: "Booking.com",
        quote: "Comfortable for a larger group, with useful spaces, a calm atmosphere and a nice panorama.",
        meta: "Guest · Booking.com · 9.0/10"
      },
      {
        source: "Booking.com",
        quote: "The enclosed garden, terrace and Lake Balaton setting made the stay especially easy to enjoy.",
        meta: "Guest · Booking.com · 9.0/10"
      }
    ]
  },
  intro: {
    kicker: "Panorama · space · Lake Balaton holiday",
    title: "A larger family house close to Lake Balaton",
    lead: "Szépvölgyi Vendégház works well when you want to stay near Lake Balaton with family or friends, but prefer the rhythm of a spacious house with its own garden instead of an apartment-style stay."
  },
  details: {
    kicker: "Szépvölgyi Vendégház",
    title: "A four-bedroom panoramic holiday house for up to 8 guests in Badacsonyörs",
    shortDescription:
      "A four-bedroom, two-bathroom guesthouse for up to 8 guests, with a panoramic terrace, enclosed garden, parking and outdoor grilling option.",
    supportingLink: {
      label: "Explore all English Dandelion accommodations.",
      href: "/en/szallasok/"
    },
    longDescription: [
      "The Lake Balaton view from the terrace is one of the strongest parts of Szépvölgyi Vendégház. It gives mornings a bright, calm start and makes shared evenings feel easy and memorable.",
      "The guesthouse has 4 bedrooms and 2 bathrooms, so it can comfortably host up to 8 guests. It is a good fit for families and groups of friends looking for a well-equipped house near Lake Balaton in a quieter Badacsonyörs setting.",
      "The house is set up for a comfortable Balaton holiday. The enclosed garden has parking for two cars, and outdoor time is supported by terrace furniture and a grill. Days can move between beach time, local trips and slow evenings on the terrace.",
      "From spring to autumn, the area offers plenty to do: the cycling route, harbour and beach are easy to reach, while Folly Arboretum, Szigliget Castle, Badacsony wine routes, gastro programmes and festivals all add good options nearby.",
      "Szépvölgyi Vendégház is ideal for guests who like being close to Lake Balaton, but would rather stay in a house with larger spaces, a private garden and a panoramic terrace."
    ],
    moreLabel: "More about Szépvölgyi Vendégház",
    ctaLabel: "Check availability"
  },
  facts: {
    groups: [
      {
        title: "Key details",
        items: [
          ["Location", "Badacsonyörs, Szépvölgyi út"],
          ["Guests", "up to 8 guests"],
          ["Layout", "4 bedrooms, 2 bathrooms"],
          ["Style", "spacious family holiday house with Lake Balaton views"]
        ]
      },
      {
        title: "Outdoor time",
        items: [
          ["Panorama", "Lake Balaton view from the terrace"],
          ["Garden", "enclosed garden with parking for two cars"],
          ["Outside", "terrace furniture and grill"],
          ["Nearby", "beach, harbour, cycling route and wine routes"]
        ]
      }
    ]
  },
  features: {
    title: "Amenities",
    highlights: [
      { label: "Badacsonyörs, Szépvölgyi út", icon: "route" },
      { label: "Terrace with Lake Balaton view", icon: "mountain" },
      { label: "4 bedrooms, 2 bathrooms", icon: "users" },
      { label: "Up to 8 guests", icon: "home" },
      { label: "Enclosed garden and grill", icon: "leaf" },
      { label: "Beach, harbour and cycling route nearby", icon: "trail" }
    ]
  },
  decisionPanel: {
    overviewTitle: "Quick overview",
    overviewFacts: [
      { iconKey: "guests", title: "Up to 8 guests", text: "Capacity" },
      { iconKey: "home", title: "4 bedrooms", text: "Layout" },
      { iconKey: "bathroom", title: "2 bathrooms", text: "Comfort" },
      { iconKey: "garden", title: "Enclosed garden", text: "Outdoor space" },
      { iconKey: "mountain", title: "Lake Balaton view", text: "Panorama" },
      { iconKey: "balaton", title: "Badacsonyörs", text: "Location" }
    ],
    reasonsTitle: "Why you will love it",
    reasons: [
      {
        iconKey: "family",
        title: "Comfortable for larger groups",
        text: "4 bedrooms and 2 bathrooms"
      },
      {
        iconKey: "terrace",
        title: "Terrace mornings",
        text: "Views toward Lake Balaton"
      },
      {
        iconKey: "grill",
        title: "Garden evenings",
        text: "Grill and outdoor rest"
      },
      {
        iconKey: "trail",
        title: "A Balaton-close base",
        text: "Beach, harbour and wine"
      }
    ]
  },
  amenities: [
    { iconKey: "home", title: "4 bedrooms" },
    { iconKey: "bathroom", title: "2 bathrooms" },
    { iconKey: "garden", title: "Enclosed garden" },
    { iconKey: "terrace", title: "Terrace furniture" },
    { iconKey: "grill", title: "Grill" },
    { iconKey: "parking", title: "Parking for two cars" }
  ],
  gallery: {
    kicker: "Gallery",
    title: "Look around Szépvölgyi Vendégház",
    moreHint: "Click a photo to see more",
    defaultHint: "Gallery photos can be opened",
    emptyMessage: "The Szépvölgyi Vendégház gallery currently has no available images.",
    previewCount: 8
  },
  map: {
    kicker: "BADACSONYÖRS · SZÉPVÖLGYI ÚT",
    title: "Around Szépvölgyi Vendégház",
    body: "Szépvölgyi Vendégház is in Badacsonyörs, with the beach, harbour, cycling route and many Lake Balaton programmes within easy reach. Folly Arboretum, Szigliget Castle, local wine routes, gastro programmes and festivals give the area a varied rhythm from spring to autumn.",
    benefitsAriaLabel: "Location benefits",
    benefits: [
      { label: "Beach, harbour and cycling route nearby", icon: "route" },
      { label: "Folly Arboretum and Szigliget Castle", icon: "trail" },
      { label: "Wine routes, gastro programmes and festivals", icon: "grapes" }
    ],
    embedSrc: "https://www.google.com/maps?q=Badacsony%C3%B6rs%20Sz%C3%A9pv%C3%B6lgyi%20%C3%BAt&z=14&output=embed",
    embedTitle: "Map of the area around Szépvölgyi Vendégház"
  },
  lightbox: {
    galleryAriaLabel: "Szépvölgyi Vendégház gallery",
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
        name: "Szőlőliget Vendégház",
        meta: "quiet stay · large terrace · panorama",
        href: "/en/szololiget/",
        image: {
          type: "mapping",
          slot: "szololiget_card_image",
          alt: "Szőlőliget Vendégház countryside stay among vineyards"
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
        name: "Fügeház",
        meta: "4-6 guests · terraces · countryside calm",
        href: "/en/dandelion-fugehaz/",
        image: {
          type: "mapping",
          slot: "fugehaz_card_image",
          alt: "Fügeház countryside guesthouse with terrace near Szent György Hill"
        }
      },
      {
        name: "Dandelion Royal Homes",
        meta: "Keszthely · comfortable apartment near Lake Balaton",
        href: "/en/royal/",
        image: {
          type: "direct",
          src: requireAccommodationLocalAssetPath(
            "royal_homes",
            "gallery",
            "dandelion-royal-homes-source-001.webp",
            "Szepvolgyi English related Royal Homes"
          ),
          alt: "Exterior view of Dandelion Royal Homes"
        }
      }
    ]
  }
};
