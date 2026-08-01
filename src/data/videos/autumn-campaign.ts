import panoramaHeroDesktop from "../../assets/campaign/autumn-2026/panorama-hero-desktop.mp4";
import panoramaHeroMobile from "../../assets/campaign/autumn-2026/panorama-hero-mobile.mp4";
import panoramaHeroPoster from "../../assets/campaign/autumn-2026/panorama-hero-poster.webp";
import panoramaHeroPosterMobile from "../../assets/campaign/autumn-2026/panorama-hero-poster-mobile.webp";
import type { AutumnCampaignHeroVideo } from "../offers/types";

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
