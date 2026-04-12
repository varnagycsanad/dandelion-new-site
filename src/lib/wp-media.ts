export interface WpMediaItem {
  id: number;
  title: string;
  altText: string;
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

interface RawWpMediaItem {
  id: number;
  source_url?: string;
  mime_type?: string;
  alt_text?: string;
  title?: {
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

export async function fetchWordPressMedia(): Promise<WpMediaItem[]> {
  const WP_API_BASE = import.meta.env.WP_API_BASE;
  const WP_API_USER = import.meta.env.WP_API_USER;
  const WP_API_APP_PASSWORD = import.meta.env.WP_API_APP_PASSWORD;

  if (!WP_API_BASE || !WP_API_USER || !WP_API_APP_PASSWORD) {
    throw new Error("Hiányzik a WordPress API kapcsolat egyik env változója.");
  }

  const token = Buffer.from(`${WP_API_USER}:${WP_API_APP_PASSWORD}`).toString("base64");
  const totalPagesToLoad = 6;
  const perPage = 100;

  const requests = Array.from({ length: totalPagesToLoad }, (_, index) => {
    const page = index + 1;

    return fetch(`${WP_API_BASE}/wp-json/wp/v2/media?per_page=${perPage}&page=${page}`, {
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json"
      }
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} a(z) ${page}. médiaoldal lekérésekor.`);
      }

      return response.json() as Promise<RawWpMediaItem[]>;
    });
  });

  const pages = await Promise.all(requests);

  return pages
    .flat()
    .filter((item) => item.mime_type?.startsWith("image/") && item.source_url)
    .map((item) => ({
      id: item.id,
      title: item.title?.rendered?.trim() || "Névtelen kép",
      altText: item.alt_text?.trim() || "",
      sourceUrl: item.source_url || "",
      thumbnailUrl: getThumbnailUrl(item),
      mimeType: item.mime_type || "",
      sizes: getMediaSizes(item)
    }));
}
