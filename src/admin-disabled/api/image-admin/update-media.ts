import type { APIRoute } from "astro";

export const prerender = false;

interface UpdateMediaPayload {
  id: number;
  altText: string;
  title: string;
  description: string;
}

function stripHtml(value: string | undefined): string {
  return (value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getRenderedOrRawText(
  value:
    | {
        raw?: string;
        rendered?: string;
      }
    | undefined
): string {
  return stripHtml(value?.raw || value?.rendered);
}

function getWordPressAuthToken(): { baseUrl: string; token: string } {
  const baseUrl = import.meta.env.WP_API_BASE;
  const user = import.meta.env.WP_API_USER;
  const password = import.meta.env.WP_API_APP_PASSWORD;

  if (!baseUrl || !user || !password) {
    throw new Error("Hiányzik a WordPress API kapcsolat egyik env változója.");
  }

  return {
    baseUrl,
    token: Buffer.from(`${user}:${password}`).toString("base64")
  };
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = (await request.json()) as Partial<UpdateMediaPayload>;

    if (typeof payload.id !== "number") {
      throw new Error("Hiányzó vagy hibás média azonosító.");
    }

    const { baseUrl, token } = getWordPressAuthToken();
    const nextAltText = typeof payload.altText === "string" ? payload.altText.trim() : "";
    const nextTitle = typeof payload.title === "string" ? payload.title.trim() : "";
    const nextDescription =
      typeof payload.description === "string" ? payload.description.trim() : "";
    const requestBody = new URLSearchParams();

    requestBody.set("alt_text", nextAltText);
    requestBody.set("title", nextTitle);
    requestBody.set("description", nextDescription);

    const response = await fetch(`${baseUrl}/wp-json/wp/v2/media/${payload.id}?context=edit`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: requestBody.toString()
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      throw new Error(
        errorPayload?.message || "A WordPress meta mentése nem sikerült."
      );
    }

    const updated = await response.json();
    const media = {
      id: updated.id,
      filename:
        updated?.source_url?.split("/").pop() || updated?.slug || "ismeretlen-fajl",
      title: getRenderedOrRawText(updated?.title),
      altText: updated?.alt_text || "",
      description: getRenderedOrRawText(updated?.description)
    };

    if (media.altText.trim() !== nextAltText) {
      throw new Error("A WordPress nem erősítette meg az alt szöveg mentését.");
    }

    if (media.title.trim() !== nextTitle) {
      throw new Error("A WordPress nem erősítette meg a cím mentését.");
    }

    if (media.description.trim() !== nextDescription) {
      throw new Error("A WordPress nem erősítette meg a leírás mentését.");
    }

    return new Response(
      JSON.stringify({
        ok: true,
        media
      }),
      {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        ok: false,
        message: error instanceof Error ? error.message : "A meta mentése nem sikerült."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
