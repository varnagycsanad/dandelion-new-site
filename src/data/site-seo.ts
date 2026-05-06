// [CHANGE 2026-05-06 17:40] Root production SEO baseline helper added for canonical, sitemap and schema defaults.
export const SITE_URL = "https://dandelionhouse.hu";
export const SITE_NAME = "Dandelion Vendégházak";
export const SITE_DEFAULT_TITLE = "Dandelion Vendégházak | Természetközeli szállások a Balaton-felvidéken";
export const SITE_DEFAULT_DESCRIPTION =
  "Természetközeli vendégházak a Balaton-felvidéken és a Balaton mellett, közvetlen foglalással, inspiráló környezettel és nyugodt pihenéssel.";
export const SITE_DEFAULT_OG_IMAGE = "/images/accommodations/d2/card/dandelion-d2-kisapati-card-01.webp";

const canonicalAliasMap: Record<string, string> = {
  "/dandelion-royal-homes/": "/royal/",
  "/dandelion-szololiget/": "/szololiget/",
  "/dandelion-szepvolgyi-vendeghaz/": "/szepvolgyi/"
};

export const SITEMAP_PATHS = [
  "/",
  "/szallasok/",
  "/fuge/",
  "/dandelion-d2/",
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
