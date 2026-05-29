// [CHANGE 2026-05-29 00:00] Shared VideoObject helper for Google video indexing thumbnails.
import { toAbsoluteUrl } from "./site-seo";

interface VideoSeoInput {
  id: string;
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  inLanguage?: string;
}

export function buildVideoObject({
  id,
  name,
  description,
  contentUrl,
  thumbnailUrl,
  uploadDate,
  inLanguage
}: VideoSeoInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": toAbsoluteUrl(id),
    name,
    description,
    thumbnailUrl: toAbsoluteUrl(thumbnailUrl),
    uploadDate,
    contentUrl: toAbsoluteUrl(contentUrl),
    ...(inLanguage ? { inLanguage } : {})
  };
}
