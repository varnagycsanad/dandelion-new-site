export interface WpMediaItem {
  id: number;
  filename: string;
  title: string;
  altText: string;
  caption: string;
  description: string;
  sourceUrl: string;
  thumbnailUrl: string;
  mimeType: string;
  sizes: WpMediaSize[];
}

export interface WpMediaSize {
  name: string;
  url: string;
  width: number | null;
  height: number | null;
  mimeType: string;
}

export interface WpMediaFetchResult {
  items: WpMediaItem[];
  warning: string;
  error: string;
}

interface RawWpMediaItem {
  id: number;
  source_url?: string;
  mime_type?: string;
  alt_text?: string;
  slug?: string;
  title?: {
    rendered?: string;
  };
  caption?: {
    rendered?: string;
  };
  description?: {
    rendered?: string;
  };
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<
      string,
      {
        source_url?: string;
        width?: number;
        height?: number;
        mime_type?: string;
      }
    >;
  };
}

function stripHtml(value: string | undefined): string {
  return (value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getFilename(item: RawWpMediaItem): string {
  if (item.source_url) {
    const parts = item.source_url.split("/");
    return parts[parts.length - 1] || item.slug || "ismeretlen-fajl";
  }

  return item.slug || "ismeretlen-fajl";
}

function getThumbnailUrl(item: RawWpMediaItem): string {
  const sizes = item.media_details?.sizes;

  return (
    sizes?.medium?.source_url ||
    sizes?.thumbnail?.source_url ||
    sizes?.medium_large?.source_url ||
    item.source_url ||
    ""
  );
}

function getMediaSizes(item: RawWpMediaItem): WpMediaSize[] {
  const sizes = item.media_details?.sizes || {};
  const entries = Object.entries(sizes)
    .filter(([, value]) => value?.source_url)
    .map(([name, value]) => ({
      name,
      url: value.source_url || "",
      width: typeof value.width === "number" ? value.width : null,
      height: typeof value.height === "number" ? value.height : null,
      mimeType: value.mime_type || item.mime_type || ""
    }));

  if (item.source_url) {
    entries.unshift({
      name: "full",
      url: item.source_url,
      width: typeof item.media_details?.width === "number" ? item.media_details.width : null,
      height: typeof item.media_details?.height === "number" ? item.media_details.height : null,
      mimeType: item.mime_type || ""
    });
  }

  return entries;
}

export async function fetchWordPressMedia(): Promise<WpMediaFetchResult> {
  const WP_API_BASE = import.meta.env.WP_API_BASE;
  const WP_API_USER = import.meta.env.WP_API_USER;
  const WP_API_APP_PASSWORD = import.meta.env.WP_API_APP_PASSWORD;

  if (!WP_API_BASE || !WP_API_USER || !WP_API_APP_PASSWORD) {
    throw new Error("Hiányzik a WordPress API kapcsolat egyik env változója.");
  }

  const token = Buffer.from(`${WP_API_USER}:${WP_API_APP_PASSWORD}`).toString("base64");
  const totalPagesToLoad = 3;
  const perPage = 100;
  const pages: RawWpMediaItem[][] = [];
  let warning = "";
  let error = "";

  for (let page = 1; page <= totalPagesToLoad; page += 1) {
    try {
      const response = await fetch(
        `${WP_API_BASE}/wp-json/wp/v2/media?per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization: `Basic ${token}`,
            Accept: "application/json"
          }
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          if (pages.length > 0) {
            warning = `A WordPress média lista csak részben töltődött be. A ${page}. oldalon 403-as limit vagy jogosultsági hiba érkezett.`;
          } else {
            error = "A WordPress média lista nem tölthető be, mert már az első oldalon 403-as jogosultsági vagy limit hiba érkezett.";
          }
          break;
        }

        if (pages.length > 0) {
          warning = `A WordPress média lista csak részben töltődött be. A ${page}. oldal HTTP ${response.status} hibával leállt.`;
        } else {
          error = `A WordPress média lista nem tölthető be. A WordPress API HTTP ${response.status} hibát adott vissza.`;
        }
        break;
      }

      const result = (await response.json()) as RawWpMediaItem[];

      if (!Array.isArray(result) || result.length === 0) {
        break;
      }

      pages.push(result);
    } catch (fetchError) {
      const message =
        fetchError instanceof Error ? fetchError.message : "Ismeretlen hálózati hiba történt.";

      if (pages.length > 0) {
        warning = `A WordPress média lista csak részben töltődött be. A ${page}. oldal lekérése megszakadt: ${message}`;
      } else {
        error = `A WordPress média lista nem tölthető be. Az első oldal lekérése megszakadt: ${message}`;
      }
      break;
    }
  }

  const items = pages
    .flat()
    .filter((item) => item.mime_type?.startsWith("image/") && item.source_url)
    .map((item) => ({
      id: item.id,
      filename: getFilename(item),
      title: item.title?.rendered?.trim() || "Névtelen kép",
      altText: item.alt_text?.trim() || "",
      caption: stripHtml(item.caption?.rendered),
      description: stripHtml(item.description?.rendered),
      sourceUrl: item.source_url || "",
      thumbnailUrl: getThumbnailUrl(item),
      mimeType: item.mime_type || "",
      sizes: getMediaSizes(item)
    }));

  if (!items.length && !error && warning) {
    error = warning;
    warning = "";
  }

  return {
    items,
    warning,
    error
  };
}
