export type HomepageImageSlotKey =
  | "homepage_hero_desktop"
  | "homepage_hero_mobile"
  | "d1_card_image"
  | "d2_card_image"
  | "fugehaz_card_image"
  | "zsalya_card_image"
  | "szololiget_card_image"
  | "szepvolgyi_card_image"
  | "royal_homes_card_image"
  | "vintage_card_image";

export interface HomepageImageSlotDefinition {
  key: HomepageImageSlotKey;
  label: string;
  description: string;
}

export const homepageImageSlots: HomepageImageSlotDefinition[] = [
  {
    key: "homepage_hero_desktop",
    label: "Hero desktop",
    description: "A főoldali hero nagy asztali vizuálja."
  },
  {
    key: "homepage_hero_mobile",
    label: "Hero mobile",
    description: "A főoldali hero mobilra optimalizált képe."
  },
  {
    key: "d1_card_image",
    label: "Dandelion D1 kártya",
    description: "A Dandelion D1 főoldali kártyakép."
  },
  {
    key: "d2_card_image",
    label: "Dandelion D2 kártya",
    description: "A Dandelion D2 főoldali kártyakép."
  },
  {
    key: "fugehaz_card_image",
    label: "Fügeház kártya",
    description: "A Dandelion Fügeház főoldali kártyaképe."
  },
  {
    key: "zsalya_card_image",
    label: "Zsálya kártya",
    description: "A Dandelion Zsálya Vendégház főoldali kártyaképe."
  },
  {
    key: "szololiget_card_image",
    label: "Szőlőliget kártya",
    description: "A Dandelion Szőlőliget Vendégház főoldali kártyaképe."
  },
  {
    key: "szepvolgyi_card_image",
    label: "Szépvölgyi kártya",
    description: "A Dandelion Szépvölgyi Vendégház főoldali kártyaképe."
  },
  {
    key: "royal_homes_card_image",
    label: "Royal Homes kártya",
    description: "A Dandelion Royal Homes főoldali kártyaképe."
  },
  {
    key: "vintage_card_image",
    label: "Vintage kártya",
    description: "A Dandelion Vintage Vendégház főoldali kártyaképe."
  }
];
