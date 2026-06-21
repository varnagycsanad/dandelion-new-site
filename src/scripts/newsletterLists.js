const NEWSLETTER_LISTS = [
  {
    key: "korabbi_vendegek",
    name: "Korábbi vendégek",
    description: "A korábban nálatok megszállt vendégek tisztított listája.",
  },
  {
    key: "hirlevel_feliratkozok",
    name: "Hírlevél feliratkozók",
    description: "Azok a címzettek, akik a weboldalon iratkoznak fel.",
  },
];

const NEWSLETTER_DEFAULT_LIST_KEY = "hirlevel_feliratkozok";

const NEWSLETTER_LIST_BY_KEY = new Map(NEWSLETTER_LISTS.map((item) => [item.key, item]));

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function normalizeNewsletterListKey(value) {
  const input = normalizeText(value);
  if (!input) {
    return NEWSLETTER_DEFAULT_LIST_KEY;
  }

  const byKey = NEWSLETTER_LIST_BY_KEY.get(input);
  if (byKey) {
    return byKey.key;
  }

  const byName = NEWSLETTER_LISTS.find((item) => normalizeText(item.name) === input);
  if (byName) {
    return byName.key;
  }

  return NEWSLETTER_DEFAULT_LIST_KEY;
}

function getNewsletterList(listKey) {
  const normalizedKey = normalizeNewsletterListKey(listKey);
  return NEWSLETTER_LIST_BY_KEY.get(normalizedKey) ?? NEWSLETTER_LIST_BY_KEY.get(NEWSLETTER_DEFAULT_LIST_KEY);
}

function getNewsletterListName(listKey) {
  return getNewsletterList(listKey)?.name ?? "Hírlevél feliratkozók";
}

function guessNewsletterListKeyFromSource(source) {
  const normalizedSource = normalizeText(source);
  if (normalizedSource === "newsletter-signup") {
    return "hirlevel_feliratkozok";
  }

  if (normalizedSource === "hirlevel-feliratkozas" || normalizedSource === "hírlevél feliratkozás") {
    return "hirlevel_feliratkozok";
  }

  return "korabbi_vendegek";
}

function getNewsletterListOptions() {
  return NEWSLETTER_LISTS.slice();
}

export {
  NEWSLETTER_DEFAULT_LIST_KEY,
  NEWSLETTER_LISTS,
  getNewsletterList,
  getNewsletterListName,
  getNewsletterListOptions,
  guessNewsletterListKeyFromSource,
  normalizeNewsletterListKey,
};
