import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const isHttps = context.request.headers.get("x-forwarded-proto") === "https";
  const isLocal = context.url.hostname === "localhost";

  // Redirect to HTTPS if not local and not already on HTTPS
  if (!isHttps && !isLocal) {
    return context.redirect(
      `https://${context.url.hostname}${context.url.pathname}${context.url.search}`,
      301
    );
  }

  return next();
});
