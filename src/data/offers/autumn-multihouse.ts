import { accommodationImages } from "../images/accommodation-images";
import type { ImageAsset } from "../images/image-types";

export type AutumnMultiHouseKey =
  | "d2"
  | "fugehaz"
  | "zsalya"
  | "szololiget"
  | "vintage"
  | "royal_homes"
  | "szepvolgyi"
  | "koveskal";

export type AutumnMultiHouse = {
  key: AutumnMultiHouseKey;
  name: string;
  href: string;
  recommendation: string;
  image: ImageAsset;
};

function imageFor(key: AutumnMultiHouseKey): ImageAsset {
  const imageSet = accommodationImages[key];
  const image = imageSet?.card ?? imageSet?.thumbnail ?? imageSet?.hero.desktop;

  if (!image) {
    throw new Error(`Missing project-owned accommodation image for autumn house: ${key}`);
  }

  return image;
}

function house(
  key: AutumnMultiHouseKey,
  name: string,
  href: string,
  recommendation: string
): AutumnMultiHouse {
  return { key, name, href, recommendation, image: imageFor(key) };
}

export const autumnMultiHouseByAudience = {
  couple: [
    house("d2", "Dandelion D2", "/dandelion-d2/", "kényelmesebb, kandallós tér"),
    house("fugehaz", "Fügeház", "/fuge/", "panorámás páros pihenés"),
    house("zsalya", "Dandelion Zsálya", "/dandelion-zsalya/", "intimebb elvonulás"),
    house("szololiget", "Szőlőliget", "/szololiget/", "kisebb, csendesebb ház"),
    house("vintage", "Dandelion Vintage", "/dandelion-vintage/", "nyugodt balatoni esték"),
    house("koveskal", "Dandelion Köveskál", "/dandelion-koveskal/", "falusi, borvidéki csend"),
    house("royal_homes", "Dandelion Royal Homes", "/royal/", "Balaton és jakuzzi"),
    house("szepvolgyi", "Dandelion Szépvölgyi", "/szepvolgyi/", "nagy balatoni panoráma")
  ],
  family: [
    house("d2", "Dandelion D2", "/dandelion-d2/", "családbarát választás"),
    house("fugehaz", "Fügeház", "/fuge/", "kisebb családnak"),
    house("zsalya", "Dandelion Zsálya", "/dandelion-zsalya/", "kisebb családi pihenés"),
    house("szololiget", "Szőlőliget", "/szololiget/", "kisebb társaságnak"),
    house("vintage", "Dandelion Vintage", "/dandelion-vintage/", "saját udvarral"),
    house("koveskal", "Dandelion Köveskál", "/dandelion-koveskal/", "csendes kirándulós bázis"),
    house("royal_homes", "Dandelion Royal Homes", "/royal/", "Balaton-közeli élmény"),
    house("szepvolgyi", "Dandelion Szépvölgyi", "/szepvolgyi/", "nagyobb családoknak")
  ]
} as const satisfies Record<"couple" | "family", AutumnMultiHouse[]>;
