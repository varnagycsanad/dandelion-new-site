// [CHANGE 2026-05-26 00:00] Google Ads / GA4-ready CTA dataLayer events without network requests.
// [CHANGE 2026-06-13 00:00] Meta Pixel-ready dataLayer events for GTM mapping.
(function () {
  window.dataLayer = window.dataLayer || [];

  const bookingWords = [
    "booking",
    "book now",
    "check availability",
    "foglal",
    "arak",
    "buchung",
    "buchen",
    "verfugbarkeit",
    "rezervace",
    "rezervacia",
    "dostupnost"
  ];
  const contactWords = [
    "contact",
    "kapcsolat",
    "ajanlat",
    "irj nekunk",
    "uzenet",
    "kontakt",
    "anfrage",
    "napis"
  ];
  const poolWords = ["panorama pool", "panorama medence", "panoramas medence", "medence"];
  const propertyAliases = [
    ["dandelion-d1", ["dandelion-d1", "selectedrooms=2be20f0b68a1114a"]],
    ["dandelion-d2", ["dandelion-d2", "selectedrooms=c64244f6153c3ca1"]],
    ["fugehaz", ["fugehaz", "fuge", "dandelion-fugehaz", "selectedrooms=af2fdb8ed2ebb145"]],
    ["zsalya", ["zsalya", "dandelion-zsalya", "selectedrooms=cf20da88f046211e"]],
    ["szololiget", ["szololiget", "selectedrooms=e30c4b62d7324b3f"]],
    ["szepvolgyi", ["szepvolgyi", "selectedrooms=7d46f283f2f5792f"]],
    ["royal-homes", ["royal-homes", "royal", "selectedrooms=c4b8753ec9ad4dc9"]],
    ["vintage", ["vintage", "selectedrooms=0c9e5eaae0545ee3"]],
    ["koveskal", ["koveskal"]]
  ];

  const isDebug =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.search.includes("dndAdsDebug=1");

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function getActionElement(target) {
    if (!(target instanceof Element)) {
      return null;
    }

    return target.closest("a, button, [role='button']");
  }

  function getClosestLink(element) {
    return element instanceof Element ? element.closest("a[href]") : null;
  }

  function getLinkUrl(element) {
    const link = getClosestLink(element);

    if (link instanceof HTMLAnchorElement) {
      const rawHref = link.href || link.getAttribute("href") || null;
      if (
        rawHref &&
        typeof window.dndResolveBookingUrl === "function" &&
        isSabeeUrl(rawHref)
      ) {
        return window.dndResolveBookingUrl(rawHref);
      }

      return rawHref;
    }

    return null;
  }

  function getEffectiveHref(element) {
    const link = getClosestLink(element);

    if (link instanceof HTMLAnchorElement) {
      const rawHref = link.getAttribute("href") || link.href || "";
      if (
        rawHref &&
        typeof window.dndResolveBookingUrl === "function" &&
        isSabeeUrl(rawHref)
      ) {
        return window.dndResolveBookingUrl(rawHref);
      }

      return rawHref;
    }

    return "";
  }

  function getMailtoUrl(element) {
    const link = getClosestLink(element);

    if (!(link instanceof HTMLAnchorElement)) {
      return null;
    }

    const href = link.getAttribute("href") || "";

    if (href.toLowerCase().startsWith("mailto:")) {
      return href;
    }

    if (link.dataset.mailtoLocal && link.dataset.mailtoDomain) {
      return "mailto:" + link.dataset.mailtoLocal + "@" + link.dataset.mailtoDomain;
    }

    return null;
  }

  function getText(element) {
    const ariaLabel = element.getAttribute("aria-label") || "";
    const text = element.textContent || "";
    return (text.trim() || ariaLabel.trim()).replace(/\s+/g, " ").slice(0, 160);
  }

  function readTrackingContext(element) {
    if (!(element instanceof Element)) {
      return {};
    }

    const source =
      element.closest(
        "[data-dnd-property], [data-dnd-campaign], [data-dnd-placement], [data-dnd-check-in], [data-dnd-check-out]"
      ) || element;

    const propertyValue = source.getAttribute("data-dnd-property");
    const campaignValue = source.getAttribute("data-dnd-campaign");
    const placementValue = source.getAttribute("data-dnd-placement");
    const checkInValue = source.getAttribute("data-dnd-check-in");
    const checkOutValue = source.getAttribute("data-dnd-check-out");

    return {
      property: propertyValue || undefined,
      campaign: campaignValue || undefined,
      placement: placementValue || undefined,
      check_in: checkInValue || undefined,
      check_out: checkOutValue || undefined
    };
  }

  function hasWord(source, words) {
    const normalizedSource = normalize(source);
    return words.some((word) => normalizedSource.includes(normalize(word)));
  }

  function inferPropertySlug(linkUrl) {
    const source = normalize([window.location.pathname, linkUrl || ""].join(" "));
    const match = propertyAliases.find(([, aliases]) => aliases.some((alias) => source.includes(normalize(alias))));
    return match ? match[0] : null;
  }

  function isSabeeUrl(value) {
    return normalize(value).includes("ibe.sabeeapp.com");
  }

  function isSamePageHashHref(value) {
    return typeof value === "string" && value.trim().startsWith("#");
  }

  function isWhatsAppUrl(value) {
    const normalizedValue = normalize(value);
    return normalizedValue.includes("wa.me/") || normalizedValue.includes("whatsapp");
  }

  function isBookingClick(element, linkUrl, href, text) {
    const inlineClick = element.getAttribute("onclick") || "";
    const className = element.getAttribute("class") || "";
    const source = [href, linkUrl, text, inlineClick, className].join(" ");

    if (isSabeeUrl(source) || inlineClick.includes("OpenBE(")) {
      return true;
    }

    // [CHANGE 2026-07-25 00:00] In-page landing anchors must not pollute booking micro-conversions.
    if (isSamePageHashHref(href)) {
      return false;
    }

    return hasWord(source, bookingWords) && hasWord(source, ["booking", "book", "foglal", "arak", "rezerv"]);
  }

  function isPoolClick(text, href, linkUrl) {
    const path = normalize(window.location.pathname);
    const source = [text, href, linkUrl || ""].join(" ");

    return path.includes("/panorama-pool/") || normalize(source).includes("panorama-pool") || hasWord(source, poolWords);
  }

  function isContactClick(text, href, linkUrl) {
    const source = [text, href, linkUrl || ""].join(" ");
    return hasWord(source, contactWords) || normalize(source).includes("/contact/") || normalize(source).includes("/kapcsolat/");
  }

  function pushEvent(eventName, payload) {
    const eventPayload = Object.assign({ event: eventName }, payload);
    window.dataLayer.push(eventPayload);

    if (isDebug && window.console && typeof window.console.debug === "function") {
      window.console.debug("[DND ads events]", eventPayload);
    }
  }

  function pushMetaEvent(eventName, metaEventName, payload) {
    pushEvent(
      eventName,
      Object.assign(
        {
          meta_event_name: metaEventName,
          page_path: window.location.pathname,
          page_url: window.location.href
        },
        payload || {}
      )
    );
  }

  function isAccommodationPage() {
    const path = normalize(window.location.pathname);

    if (path.includes("/guide/") || path.includes("/szallasok/") || path.includes("/unterkuenfte/") || path.includes("/ubytovani/") || path.includes("/ubytovanie/")) {
      return false;
    }

    return Boolean(inferPropertySlug(null));
  }

  function pushAccommodationViewContent() {
    if (!isAccommodationPage()) {
      return;
    }

    const propertySlug = inferPropertySlug(null);

    pushMetaEvent("meta_view_content", "ViewContent", {
      content_type: "accommodation",
      content_name: document.title,
      content_ids: propertySlug ? [propertySlug] : undefined,
      property_slug: propertySlug
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", pushAccommodationViewContent, { once: true });
  } else {
    pushAccommodationViewContent();
  }

  document.addEventListener(
    "click",
    function (event) {
      const element = getActionElement(event.target);

      if (!element) {
        return;
      }

      const linkUrl = getLinkUrl(element);
      const href = getEffectiveHref(element);
      const mailtoUrl = getMailtoUrl(element);
      const text = getText(element);
      const label = text || element.getAttribute("aria-label") || href || null;
      const trackingContext = readTrackingContext(element);

      if (isBookingClick(element, linkUrl, href, text)) {
        const bookingPayload = {
          event_category: "booking",
          event_action: "click",
          event_label: label,
          page_path: window.location.pathname,
          page_url: window.location.href,
          link_url: linkUrl,
          cta_text: text,
          property_slug: inferPropertySlug(linkUrl),
          property: trackingContext.property,
          campaign: trackingContext.campaign,
          placement: trackingContext.placement,
          check_in: trackingContext.check_in,
          check_out: trackingContext.check_out
        };

        pushEvent("dnd_booking_click", {
          event_category: bookingPayload.event_category,
          event_action: bookingPayload.event_action,
          event_label: bookingPayload.event_label,
          page_path: bookingPayload.page_path,
          page_url: bookingPayload.page_url,
          link_url: bookingPayload.link_url,
          cta_text: bookingPayload.cta_text,
          property_slug: bookingPayload.property_slug,
          property: bookingPayload.property,
          campaign: bookingPayload.campaign,
          placement: bookingPayload.placement,
          check_in: bookingPayload.check_in,
          check_out: bookingPayload.check_out
        });
        pushMetaEvent("meta_booking_click", "BookingClick", {
          event_category: bookingPayload.event_category,
          event_action: bookingPayload.event_action,
          event_label: bookingPayload.event_label,
          link_url: bookingPayload.link_url,
          cta_text: bookingPayload.cta_text,
          property_slug: bookingPayload.property_slug,
          property: bookingPayload.property,
          campaign: bookingPayload.campaign,
          placement: bookingPayload.placement
        });
        pushMetaEvent("meta_initiate_checkout", "InitiateCheckout", {
          content_type: "accommodation",
          content_name: bookingPayload.event_label,
          content_ids: bookingPayload.property_slug ? [bookingPayload.property_slug] : undefined,
          link_url: bookingPayload.link_url,
          cta_text: bookingPayload.cta_text,
          property_slug: bookingPayload.property_slug,
          property: bookingPayload.property,
          campaign: bookingPayload.campaign,
          placement: bookingPayload.placement
        });
        return;
      }

      if (normalize(href).startsWith("tel:") || normalize(linkUrl).startsWith("tel:")) {
        pushEvent("dnd_phone_click", {
          event_category: "contact",
          event_action: "phone_click",
          event_label: label,
          page_path: window.location.pathname,
          link_url: linkUrl || href
        });
        pushMetaEvent("meta_contact", "Contact", {
          contact_method: "phone",
          event_label: label,
          link_url: linkUrl || href
        });
        return;
      }

      if (mailtoUrl) {
        pushEvent("dnd_email_click", {
          event_category: "contact",
          event_action: "email_click",
          event_label: label,
          page_path: window.location.pathname,
          link_url: mailtoUrl
        });
        pushMetaEvent("meta_contact", "Contact", {
          contact_method: "email",
          event_label: label,
          link_url: mailtoUrl
        });
        return;
      }

      if (isWhatsAppUrl(href) || isWhatsAppUrl(linkUrl) || isWhatsAppUrl(text)) {
        pushEvent("dnd_whatsapp_click", {
          event_category: "contact",
          event_action: "whatsapp_click",
          event_label: label,
          page_path: window.location.pathname,
          link_url: linkUrl || href
        });
        pushMetaEvent("meta_contact", "Contact", {
          contact_method: "whatsapp",
          event_label: label,
          link_url: linkUrl || href
        });
        return;
      }

      if (isPoolClick(text, href, linkUrl)) {
        pushEvent("dnd_pool_cta_click", {
          event_category: "pool",
          event_action: "pool_cta_click",
          event_label: label,
          page_path: window.location.pathname,
          link_url: linkUrl,
          cta_text: text
        });
        return;
      }

      if (isContactClick(text, href, linkUrl)) {
        pushEvent("dnd_contact_click", {
          event_category: "contact",
          event_action: "contact_cta_click",
          event_label: label,
          page_path: window.location.pathname,
          link_url: linkUrl,
          cta_text: text
        });
        pushMetaEvent("meta_lead", "Lead", {
          lead_type: "contact_or_quote_request",
          event_label: label,
          link_url: linkUrl,
          cta_text: text
        });
      }
    },
    false
  );
})();
