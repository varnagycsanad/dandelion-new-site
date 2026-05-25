// [CHANGE 2026-05-06 17:40] Root production SEO baseline helper added for canonical, sitemap and schema defaults.
import d2DefaultOgImage from "../assets/accommodations/d2/card/dandelion-d2-kisapati-card-01.webp";
export const SITE_URL = "https://dandelionhouse.hu";
export const SITE_NAME = "Dandelion Vendégházak";
export const SITE_DEFAULT_TITLE = "Dandelion Vendégházak | Természetközeli szállások a Balaton-felvidéken";
export const SITE_DEFAULT_DESCRIPTION =
  "Természetközeli vendégházak a Balaton-felvidéken és a Balaton mellett, közvetlen foglalással, inspiráló környezettel és nyugodt pihenéssel.";
export const SITE_DEFAULT_DESCRIPTION_EN =
  "Nature-focused guesthouses in the Balaton Uplands, close to Szent György Hill, Badacsony, Lake Balaton and the Káli Basin.";
export const SITE_DEFAULT_DESCRIPTION_DE =
  "Naturverbundene Gästehäuser im Balaton-Oberland, nahe Szent György-hegy, Badacsony, Balaton und Káli-Becken.";
export const SITE_DEFAULT_DESCRIPTION_CS =
  "Klidné penziony a apartmány v okolí Balatonu, u Szent György-hegy, Badacsonye, Keszthelye a v oblasti Káli.";
export const SITE_DEFAULT_OG_IMAGE = d2DefaultOgImage.src;

// [CHANGE 2026-05-19 00:00] First HU-EN SEO route pairs added for sitemap and hreflang alternates.
export const LOCALIZED_ROUTE_PAIRS = [
  { hu: "/", en: "/en/", de: "/de/", cs: "/cs/" },
  { hu: "/kapcsolat/", en: "/en/contact/", de: "/de/kontakt/", cs: "/cs/kontakt/" },
  { hu: "/szallasok/", en: "/en/szallasok/", de: "/de/unterkuenfte/", cs: "/cs/ubytovani/" },
  { hu: "/elmenyek/", en: "/en/experiences/", de: "/de/erlebnisse/", cs: "/cs/zazitky/" },
  { hu: "/elmenyek/kerekpar/", en: "/en/bike-rental/", de: "/de/fahrradverleih/", cs: "/cs/pujcovna-kol/" },
  { hu: "/elmenyek/bor-es-panorama/", en: "/en/wineries/", de: "/de/weingueter/", cs: "/cs/vinarstvi/" },
  { hu: "/elmenyek/balaton/", en: "/en/lake-balaton/", de: "/de/balaton/", cs: "/cs/balaton/" },
  { hu: "/elmenyek/tanuhegyek/", en: "/en/witness-hills/", de: "/de/zeugenberge/", cs: "/cs/svedecne-hory/" },
  { hu: "/panorama-pool/", en: "/en/panorama-pool/", de: "/de/panorama-pool/" },
  { hu: "/dandelion-d2/", en: "/en/dandelion-d2/", de: "/de/dandelion-d2/", cs: "/cs/dandelion-d2/" },
  { hu: "/fuge/", en: "/en/dandelion-fugehaz/", de: "/de/dandelion-fugehaz/", cs: "/cs/dandelion-fugehaz/" },
  { hu: "/dandelion-d1/", en: "/en/dandelion-d1/", de: "/de/dandelion-d1/", cs: "/cs/dandelion-d1/" },
  { hu: "/dandelion-zsalya/", en: "/en/dandelion-zsalya/", de: "/de/dandelion-zsalya/", cs: "/cs/dandelion-zsalya/" },
  { hu: "/szololiget/", en: "/en/szololiget/", de: "/de/szololiget/", cs: "/cs/szololiget/" },
  { hu: "/szepvolgyi/", en: "/en/szepvolgyi/", de: "/de/szepvolgyi/", cs: "/cs/szepvolgyi/" },
  { hu: "/royal/", en: "/en/royal/", de: "/de/royal/", cs: "/cs/royal/" },
  { hu: "/dandelion-vintage/", en: "/en/dandelion-vintage/", de: "/de/dandelion-vintage/", cs: "/cs/dandelion-vintage/" },
  { hu: "/dandelion-koveskal/", en: "/en/dandelion-koveskal/", de: "/de/dandelion-koveskal/", cs: "/cs/dandelion-koveskal/" },
  { hu: "/aszf/", en: "/en/terms-and-conditions/", de: "/de/agb/" },
  { hu: "/adatkezelesi-tajekoztato/", en: "/en/privacy-policy/", de: "/de/datenschutz/" },
  { hu: "/impresszum/", en: "/en/imprint/", de: "/de/impressum/" }
] as const;

const canonicalAliasMap: Record<string, string> = {
  "/dandelion-royal-homes/": "/royal/",
  "/dandelion-szololiget/": "/szololiget/",
  "/dandelion-szepvolgyi-vendeghaz/": "/szepvolgyi/"
};

export const SITEMAP_PATHS = [
  "/",
  "/kapcsolat/",
  "/en/contact/",
  "/de/",
  "/de/kontakt/",
  "/de/unterkuenfte/",
  "/de/erlebnisse/",
  "/de/fahrradverleih/",
  "/de/weingueter/",
  "/de/balaton/",
  "/de/zeugenberge/",
  "/de/panorama-pool/",
  "/de/agb/",
  "/de/datenschutz/",
  "/de/impressum/",
  "/cs/",
  "/cs/kontakt/",
  "/cs/ubytovani/",
  "/cs/zazitky/",
  "/cs/pujcovna-kol/",
  "/cs/vinarstvi/",
  "/cs/balaton/",
  "/cs/svedecne-hory/",
  "/elmenyek/",
  "/elmenyek/balaton/",
  "/elmenyek/bor-es-panorama/",
  "/elmenyek/kerekpar/",
  "/elmenyek/tanuhegyek/",
  "/aszf/",
  "/adatkezelesi-tajekoztato/",
  "/impresszum/",
  "/szallasok/",
  "/panorama-pool/",
  "/en/panorama-pool/",
  "/fuge/",
  "/dandelion-d1/",
  "/dandelion-d2/",
  "/de/dandelion-d1/",
  "/de/dandelion-d2/",
  "/de/dandelion-fugehaz/",
  "/de/dandelion-zsalya/",
  "/de/szololiget/",
  "/de/szepvolgyi/",
  "/de/royal/",
  "/de/dandelion-vintage/",
  "/de/dandelion-koveskal/",
  "/cs/dandelion-d1/",
  "/cs/dandelion-d2/",
  "/cs/dandelion-fugehaz/",
  "/cs/dandelion-zsalya/",
  "/cs/szololiget/",
  "/cs/szepvolgyi/",
  "/cs/royal/",
  "/cs/dandelion-vintage/",
  "/cs/dandelion-koveskal/",
  "/en/",
  "/en/szallasok/",
  "/en/experiences/",
  "/en/bike-rental/",
  "/en/wineries/",
  "/en/lake-balaton/",
  "/en/witness-hills/",
  "/en/dandelion-d2/",
  "/en/dandelion-fugehaz/",
  "/en/dandelion-d1/",
  "/en/dandelion-zsalya/",
  "/en/szololiget/",
  "/en/szepvolgyi/",
  "/en/royal/",
  "/en/dandelion-vintage/",
  "/en/dandelion-koveskal/",
  "/en/terms-and-conditions/",
  "/en/privacy-policy/",
  "/en/imprint/",
  "/dandelion-koveskal/",
  "/dandelion-zsalya/",
  "/dandelion-vintage/",
  "/royal/",
  "/szololiget/",
  "/szepvolgyi/"
] as const;

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  const stripped = pathname.replace(/\/+$/, "");
  if (/\.[a-z0-9]+$/i.test(stripped)) {
    return stripped.startsWith("/") ? stripped : `/${stripped}`;
  }

  return stripped.startsWith("/") ? `${stripped}/` : `/${stripped}/`;
}

export function getCanonicalPath(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);
  return canonicalAliasMap[normalizedPath] ?? normalizedPath;
}

export function getLocalizedRouteAlternates(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  const routePair = LOCALIZED_ROUTE_PAIRS.find(
    (pair) =>
      pair.hu === normalizedPath ||
      pair.en === normalizedPath ||
      pair.de === normalizedPath ||
      pair.cs === normalizedPath
  );

  if (!routePair) {
    return [];
  }

  return [
    { hreflang: "hu", path: routePair.hu },
    { hreflang: "en", path: routePair.en },
    ...(routePair.de ? [{ hreflang: "de", path: routePair.de }] : []),
    ...(routePair.cs ? [{ hreflang: "cs", path: routePair.cs }] : []),
    { hreflang: "x-default", path: routePair.hu }
  ];
}

export function isCanonicalAliasPath(pathname: string): boolean {
  const normalizedPath = normalizePathname(pathname);
  return canonicalAliasMap[normalizedPath] !== undefined;
}

export function toAbsoluteUrl(pathnameOrUrl: string): string {
  if (/^https?:\/\//.test(pathnameOrUrl)) {
    return pathnameOrUrl;
  }

  const normalizedPath = pathnameOrUrl.startsWith("/") ? pathnameOrUrl : `/${pathnameOrUrl}`;
  return new URL(normalizedPath, SITE_URL).toString();
}
