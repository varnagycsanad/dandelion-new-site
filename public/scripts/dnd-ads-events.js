// [CHANGE 2026-05-26 00:00] Google Ads / GA4-ready CTA dataLayer events without network requests.
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
      return link.href || link.getAttribute("href") || null;
    }

    return null;
  }

  function getEffectiveHref(element) {
    const link = getClosestLink(element);

    if (link instanceof HTMLAnchorElement) {
      return link.getAttribute("href") || link.href || "";
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

  function isBookingClick(element, linkUrl, href, text) {
    const inlineClick = element.getAttribute("onclick") || "";
    const className = element.getAttribute("class") || "";
    const source = [href, linkUrl, text, inlineClick, className].join(" ");

    if (isSabeeUrl(source) || inlineClick.includes("OpenBE(")) {
      return true;
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

      if (isBookingClick(element, linkUrl, href, text)) {
        pushEvent("dnd_booking_click", {
          event_category: "booking",
          event_action: "click",
          event_label: label,
          page_path: window.location.pathname,
          page_url: window.location.href,
          link_url: linkUrl,
          cta_text: text,
          property_slug: inferPropertySlug(linkUrl)
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
      }
    },
    false
  );
})();
