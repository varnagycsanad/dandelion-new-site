// [CHANGE 2026-05-06 17:40] Static sitemap endpoint added for root production SEO baseline.
import type { APIRoute } from "astro";
import { SITEMAP_PATHS, toAbsoluteUrl } from "../data/site-seo";

export const GET: APIRoute = () => {
  const urlset = SITEMAP_PATHS.map((path) => {
    const loc = toAbsoluteUrl(path);
    return `  <url><loc>${loc}</loc></url>`;
  }).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
};
