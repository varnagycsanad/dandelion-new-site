// [CHANGE 2026-07-19 22:18] Cover booking attribution, CTA events and consent without a ParentNode global.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const attributionSource = await readFile(
  new URL("../public/scripts/dnd-booking-attribution.js", import.meta.url),
  "utf8"
);
const adsEventsSource = await readFile(
  new URL("../public/scripts/dnd-ads-events.js", import.meta.url),
  "utf8"
);
const consentSource = await readFile(
  new URL("../public/scripts/consent-init.js", import.meta.url),
  "utf8"
);

const expectedAttribution = {
  gclid: "TEST-GCLID-2026",
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "matine_test",
  utm_content: "rsa_test",
  utm_term: "szent_gyorgy_hegy_szallas"
};

function createStorage() {
  const values = new Map();

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    }
  };
}

class FakeElement {
  constructor(attributes = {}, textContent = "") {
    this.attributes = new Map(Object.entries(attributes));
    this.textContent = textContent;
    this.dataset = {};
    this.parentNode = null;
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  matches(selector) {
    return selector === "a[href]" && this.getAttribute("href") !== null;
  }

  closest(selector) {
    if (selector === "a, button, [role='button']" || selector === "a[href]") {
      return this;
    }

    if (selector.includes("[data-dnd-")) {
      return this;
    }

    return null;
  }
}

class FakeAnchor extends FakeElement {
  constructor(href, textContent = "Foglalás") {
    super({ href }, textContent);
  }

  get href() {
    return new URL(this.getAttribute("href"), "https://dandelionhouse.hu").toString();
  }
}

function createAttributionContext(anchors) {
  const listeners = new Map();
  const documentElement = new FakeElement();
  documentElement.querySelectorAll = () => anchors;

  const document = {
    documentElement,
    readyState: "complete",
    title: "Szent György-hegy MATINÉ szállás | Dandelion",
    querySelectorAll: () => anchors,
    addEventListener(type, listener) {
      listeners.set(type, listener);
    }
  };
  const openedUrls = [];
  const window = {
    dataLayer: [],
    localStorage: createStorage(),
    location: {
      hostname: "dandelionhouse.hu",
      origin: "https://dandelionhouse.hu",
      pathname: "/szent-gyorgy-hegy-matine-szallas/",
      search: `?${new URLSearchParams(expectedAttribution)}`,
      href: `https://dandelionhouse.hu/szent-gyorgy-hegy-matine-szallas/?${new URLSearchParams(expectedAttribution)}`
    },
    open(url) {
      openedUrls.push(url);
      return { url };
    }
  };
  const context = vm.createContext({
    console,
    Date,
    document,
    Element: FakeElement,
    HTMLAnchorElement: FakeAnchor,
    MutationObserver: class {
      observe() {}
    },
    URL,
    URLSearchParams,
    window
  });

  return { context, listeners, openedUrls, window };
}

function assertAttributionOnce(rawUrl) {
  const url = new URL(rawUrl);

  for (const [key, expectedValue] of Object.entries(expectedAttribution)) {
    assert.equal(url.searchParams.get(key), expectedValue, key);
    assert.equal(url.searchParams.getAll(key).length, 1, `${key} duplicated`);
  }
}

test("decorates Sabee links without ParentNode and preserves existing query parameters", () => {
  const general = new FakeAnchor(
    "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&lang=Hu"
  );
  const property = new FakeAnchor(
    "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=2be20f0b68a1114a&lang=Hu"
  );
  const existing = new FakeAnchor(
    "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=KEEP&selectedRooms=ROOM&lang=Hu&gclid=existing-gclid&utm_source=existing"
  );
  const { context, window } = createAttributionContext([general, property, existing]);

  assert.equal("ParentNode" in context, false);
  vm.runInContext(attributionSource, context);
  vm.runInContext(attributionSource, context);

  assertAttributionOnce(general.href);
  assertAttributionOnce(property.href);
  assert.equal(new URL(property.href).searchParams.get("selectedRooms"), "2be20f0b68a1114a");

  const existingUrl = new URL(existing.href);
  assert.equal(existingUrl.searchParams.get("p"), "KEEP");
  assert.equal(existingUrl.searchParams.get("selectedRooms"), "ROOM");
  assert.equal(existingUrl.searchParams.get("lang"), "Hu");
  assert.equal(existingUrl.searchParams.get("gclid"), "existing-gclid");
  assert.equal(existingUrl.searchParams.get("utm_source"), "existing");
  assert.equal(existingUrl.searchParams.getAll("gclid").length, 1);
  assert.equal(existingUrl.searchParams.getAll("utm_source").length, 1);
  assert.equal(typeof window.dndResolveBookingUrl, "function");
});

test("BaseLayout configures GA4 cross-domain linker for the SabeeApp boundary", async () => {
  const baseLayoutSource = await readFile(
    new URL("../src/layouts/BaseLayout.astro", import.meta.url),
    "utf8"
  );

  assert.match(baseLayoutSource, /gtag\("set", "linker"/);
  assert.match(baseLayoutSource, /"dandelionhouse\.hu", "ibe\.sabeeapp\.com"/);
});

test("booking, phone and email clicks still push their dataLayer events", () => {
  const booking = new FakeAnchor(
    "https://ibe.sabeeapp.com/v3/p/Dandelion-Vendeghazak?p=3970b30e1042d58f&selectedRooms=2be20f0b68a1114a&lang=Hu",
    "Elérhetőség és árak"
  );
  booking.setAttribute("data-dnd-property", "dandelion-d1");
  booking.setAttribute("data-dnd-campaign", "matine-2026");
  booking.setAttribute("data-dnd-placement", "stay-card");
  booking.setAttribute("data-dnd-check-in", "2026-09-04");
  booking.setAttribute("data-dnd-check-out", "2026-09-06");
  const phone = new FakeAnchor("tel:+36207730807", "+36 20 773 0807");
  const email = new FakeAnchor("mailto:hello@dandelionhouse.hu", "hello@dandelionhouse.hu");
  const { context, listeners, window } = createAttributionContext([booking]);

  vm.runInContext(attributionSource, context);
  vm.runInContext(adsEventsSource, context);
  const click = listeners.get("click");

  assert.equal(typeof click, "function");
  click({ target: booking });
  click({ target: phone });
  click({ target: email });

  const bookingEvent = window.dataLayer.find((item) => item.event === "dnd_booking_click");
  assert.ok(bookingEvent);
  assertAttributionOnce(bookingEvent.link_url);
  assert.equal(bookingEvent.property, "dandelion-d1");
  assert.equal(bookingEvent.check_in, "2026-09-04");
  assert.equal(bookingEvent.check_out, "2026-09-06");
  assert.ok(window.dataLayer.some((item) => item.event === "dnd_phone_click"));
  assert.ok(window.dataLayer.some((item) => item.event === "dnd_email_click"));
});

test("consent defaults and updates remain independent from booking attribution", () => {
  const window = {
    dataLayer: [],
    localStorage: createStorage(),
    setInterval() {
      return 1;
    },
    clearInterval() {}
  };
  const context = vm.createContext({
    document: {
      readyState: "loading",
      addEventListener() {}
    },
    MutationObserver: class {},
    window
  });

  vm.runInContext(consentSource, context);
  window.dndSetConsentDefaults();
  window.dndApplyConsent({ analytics: true, marketing: true });

  const defaultCommand = window.dataLayer.find(
    (item) => item[0] === "consent" && item[1] === "default"
  );
  const updateCommand = window.dataLayer.find(
    (item) => item[0] === "consent" && item[1] === "update"
  );
  const updateEvent = window.dataLayer.find((item) => item.event === "dnd_consent_update");

  assert.equal(defaultCommand[2].analytics_storage, "denied");
  assert.equal(defaultCommand[2].ad_storage, "denied");
  assert.equal(updateCommand[2].analytics_storage, "granted");
  assert.equal(updateCommand[2].ad_storage, "granted");
  assert.equal(updateEvent.dnd_analytics_granted, true);
  assert.equal(updateEvent.dnd_marketing_granted, true);
});
