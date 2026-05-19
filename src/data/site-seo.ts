// [CHANGE 2026-05-06 17:40] Root production SEO baseline helper added for canonical, sitemap and schema defaults.
import d2DefaultOgImage from "../assets/accommodations/d2/card/dandelion-d2-kisapati-card-01.webp";
export const SITE_URL = "https://dandelionhouse.hu";
export const SITE_NAME = "Dandelion Vendégházak";
export const SITE_DEFAULT_TITLE = "Dandelion Vendégházak | Természetközeli szállások a Balaton-felvidéken";
export const SITE_DEFAULT_DESCRIPTION =
  "Természetközeli vendégházak a Balaton-felvidéken és a Balaton mellett, közvetlen foglalással, inspiráló környezettel és nyugodt pihenéssel.";
export const SITE_DEFAULT_OG_IMAGE = d2DefaultOgImage.src;

// [CHANGE 2026-05-19 00:00] First HU-EN SEO route pairs added for sitemap and hreflang alternates.
export const LOCALIZED_ROUTE_PAIRS = [
  { hu: "/", en: "/en/" },
  { hu: "/szallasok/", en: "/en/szallasok/" },
  { hu: "/dandelion-d2/", en: "/en/dandelion-d2/" },
  { hu: "/fuge/", en: "/en/dandelion-fugehaz/" },
  { hu: "/dandelion-d1/", en: "/en/dandelion-d1/" }
] as const;

const canonicalAliasMap: Record<string, string> = {
  "/dandelion-royal-homes/": "/royal/",
  "/dandelion-szololiget/": "/szololiget/",
  "/dandelion-szepvolgyi-vendeghaz/": "/szepvolgyi/"
};

export const SITEMAP_PATHS = [
  "/",
  "/kapcsolat/",
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
  "/fuge/",
  "/dandelion-d1/",
  "/dandelion-d2/",
  "/en/",
  "/en/szallasok/",
  "/en/dandelion-d2/",
  "/en/dandelion-fugehaz/",
  "/en/dandelion-d1/",
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
  return stripped.startsWith("/") ? `${stripped}/` : `/${stripped}/`;
}

export function getCanonicalPath(pathname: string): string {
  const normalizedPath = normalizePathname(pathname);
  return canonicalAliasMap[normalizedPath] ?? normalizedPath;
}

export function getLocalizedRouteAlternates(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  const routePair = LOCALIZED_ROUTE_PAIRS.find((pair) => pair.hu === normalizedPath || pair.en === normalizedPath);

  if (!routePair) {
    return [];
  }

  return [
    { hreflang: "hu", path: routePair.hu },
    { hreflang: "en", path: routePair.en },
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
