import panoramaHeroDesktop from "../../assets/campaign/autumn-2026/panorama-hero-desktop.mp4";
import panoramaHeroMobile from "../../assets/campaign/autumn-2026/panorama-hero-mobile.mp4";
import panoramaHeroPoster from "../../assets/campaign/autumn-2026/panorama-hero-poster.webp";
import panoramaHeroPosterMobile from "../../assets/campaign/autumn-2026/panorama-hero-poster-mobile.webp";
import type { AutumnCampaignHeroVideo } from "../offers/types";

import fugehazHeroDesktop from "../../assets/campaign/autumn-2026/fugehaz-hero-desktop.mp4";
import fugehazHeroMobile from "../../assets/campaign/autumn-2026/fugehaz-hero-mobile.mp4";
import fugehazHeroPoster from "../../assets/campaign/autumn-2026/fugehaz-hero-poster.webp";
import fugehazHeroPosterMobile from "../../assets/campaign/autumn-2026/fugehaz-hero-poster-mobile.webp";
import d2FamilyHeroDesktop from "../../assets/campaign/autumn-2026/d2-family-hero-desktop.mp4";
import d2FamilyHeroMobile from "../../assets/campaign/autumn-2026/d2-family-hero-mobile.mp4";
import d2FamilyHeroPoster from "../../assets/campaign/autumn-2026/d2-family-hero-poster.webp";
import d2FamilyHeroPosterMobile from "../../assets/campaign/autumn-2026/d2-family-hero-poster-mobile.webp";

export const fugehazAutumnHeroVideo: AutumnCampaignHeroVideo = {
  kind: "video",
  desktop: {
    src: fugehazHeroDesktop,
    type: "video/mp4",
    width: 1920,
    height: 1080
  },
  mobile: {
    src: fugehazHeroMobile,
    type: "video/mp4",
    width: 720,
    height: 1280
  },
  poster: {
    src: fugehazHeroPoster.src,
    alt: "Naplemente a Balaton-felvidék felett",
    width: fugehazHeroPoster.width,
    height: fugehazHeroPoster.height
  },
  posterMobile: {
    src: fugehazHeroPosterMobile.src,
    alt: "Naplemente a Balaton-felvidék felett mobilnézetben",
    width: fugehazHeroPosterMobile.width,
    height: fugehazHeroPosterMobile.height
  }
};

export const d2FamilyAutumnHeroVideo: AutumnCampaignHeroVideo = {
  kind: "video",
  desktop: {
    src: d2FamilyHeroDesktop,
    type: "video/mp4",
    width: 1920,
    height: 1080
  },
  mobile: {
    src: d2FamilyHeroMobile,
    type: "video/mp4",
    width: 720,
    height: 1280
  },
  poster: {
    src: d2FamilyHeroPoster.src,
    alt: "Naplemente és balatoni-felvidéki táj a Szent György-hegy felett",
    width: d2FamilyHeroPoster.width,
    height: d2FamilyHeroPoster.height
  },
  posterMobile: {
    src: d2FamilyHeroPosterMobile.src,
    alt: "Naplemente és balatoni-felvidéki táj mobilnézetben",
    width: d2FamilyHeroPosterMobile.width,
    height: d2FamilyHeroPosterMobile.height
  }
};

export const autumnPanoramaHeroVideo: AutumnCampaignHeroVideo = {
  kind: "video",
  desktop: {
    src: panoramaHeroDesktop,
    type: "video/mp4",
    width: 1920,
    height: 1080
  },
  mobile: {
    src: panoramaHeroMobile,
    type: "video/mp4",
    width: 720,
    height: 1280
  },
  poster: {
    src: panoramaHeroPoster.src,
    alt: "Panoráma a Balaton-felvidék őszi tájával",
    width: panoramaHeroPoster.width,
    height: panoramaHeroPoster.height
  },
  posterMobile: {
    src: panoramaHeroPosterMobile.src,
    alt: "Panoráma a Balaton-felvidék őszi tájával mobilnézetben",
    width: panoramaHeroPosterMobile.width,
    height: panoramaHeroPosterMobile.height
  }
};
