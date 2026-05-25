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
  "Naturverbundene Gastehauser im Balaton-Oberland, nahe Szent Gyorgy-hegy, Badacsony, Balaton und Kali-Becken.";
export const SITE_DEFAULT_OG_IMAGE = d2DefaultOgImage.src;

// [CHANGE 2026-05-19 00:00] First HU-EN SEO route pairs added for sitemap and hreflang alternates.
type LocalizedRoutePair = {
  hu: string;
  en?: string;
  de?: string;
};

export const LOCALIZED_ROUTE_PAIRS: readonly LocalizedRoutePair[] = [
  { hu: "/", en: "/en/", de: "/de/" },
  { hu: "/kapcsolat/", en: "/en/contact/", de: "/de/kontakt/" },
  { hu: "/szallasok/", en: "/en/szallasok/", de: "/de/unterkuenfte/" },
  { hu: "/elmenyek/", en: "/en/experiences/" },
  { hu: "/elmenyek/kerekpar/", en: "/en/bike-rental/" },
  { hu: "/elmenyek/bor-es-panorama/", en: "/en/wineries/" },
  { hu: "/elmenyek/balaton/", en: "/en/lake-balaton/" },
  { hu: "/elmenyek/tanuhegyek/", en: "/en/witness-hills/" },
  { hu: "/panorama-pool/", en: "/en/panorama-pool/" },
  { hu: "/dandelion-d2/", en: "/en/dandelion-d2/" },
  { hu: "/fuge/", en: "/en/dandelion-fugehaz/" },
  { hu: "/dandelion-d1/", en: "/en/dandelion-d1/" },
  { hu: "/dandelion-zsalya/", en: "/en/dandelion-zsalya/" },
  { hu: "/szololiget/", en: "/en/szololiget/" },
  { hu: "/szepvolgyi/", en: "/en/szepvolgyi/" },
  { hu: "/royal/", en: "/en/royal/" },
  { hu: "/dandelion-vintage/", en: "/en/dandelion-vintage/" },
  { hu: "/dandelion-koveskal/", en: "/en/dandelion-koveskal/" },
  { hu: "/aszf/", en: "/en/terms-and-conditions/" },
  { hu: "/adatkezelesi-tajekoztato/", en: "/en/privacy-policy/" },
  { hu: "/impresszum/", en: "/en/imprint/" }
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
  "/de/kontakt/",
  "/elmenyek/",
  "/elmenyek/balaton/",
  "/elmenyek/bor-es-panorama/",
  "/elmenyek/kerekpar/",
  "/elmenyek/tanuhegyek/",
  "/aszf/",
  "/adatkezelesi-tajekoztato/",
  "/impresszum/",
  "/szallasok/",
  "/de/",
  "/de/unterkuenfte/",
  "/panorama-pool/",
  "/en/panorama-pool/",
  "/fuge/",
  "/dandelion-d1/",
  "/dandelion-d2/",
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
  const routePair = LOCALIZED_ROUTE_PAIRS.find((pair) =>
    [pair.hu, pair.en, pair.de].includes(normalizedPath)
  );

  if (!routePair) {
    return [];
  }

  return [
    { hreflang: "hu", path: routePair.hu },
    routePair.en ? { hreflang: "en", path: routePair.en } : null,
    routePair.de ? { hreflang: "de", path: routePair.de } : null,
    { hreflang: "x-default", path: routePair.hu }
  ].filter((alternate): alternate is { hreflang: string; path: string } => Boolean(alternate));
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
