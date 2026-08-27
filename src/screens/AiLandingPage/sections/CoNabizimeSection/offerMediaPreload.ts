import type { Slide } from "./offerSlideTypes";
import { webpDefaultSrc } from "../../../../utils/responsiveWebp";
import {
  getHeroCompositePreloadUrls,
  preloadHeroCompositeAssets,
} from "../MainHeroSection/heroCompositePreload";
import { offerSlideBasePath } from "./offerPreviewAssets";

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const img = new Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.decoding = "async";
    img.src = src;
    if (typeof img.decode === "function") {
      void img.decode().then(done).catch(done);
    }
  });

const preloadCache = new Map<string, Promise<void>>();

export const getOfferPreloadUrls = (slide: Slide, isMobile: boolean): string[] => {
  switch (slide.id) {
    case "tvorba-webu":
      return getHeroCompositePreloadUrls();
    case "upgrade-webu":
      return [
        webpDefaultSrc(offerSlideBasePath("modernizace-before"), isMobile ? 720 : 960),
        webpDefaultSrc(offerSlideBasePath("modernizace-after"), isMobile ? 720 : 960),
      ];
    case "webove-aplikace":
      return [webpDefaultSrc(offerSlideBasePath("web-app"), isMobile ? 720 : 960)];
    case "automatizace-ai":
      return [webpDefaultSrc(offerSlideBasePath("ai-bot"), isMobile ? 720 : 960)];
    default:
      return [];
  }
};

/** Preload only assets for the active slide; cached per slide + viewport. */
export const preloadOfferSlideMedia = (
  slide: Slide,
  isMobile: boolean,
): Promise<void> => {
  const cacheKey = `${slide.id}:${isMobile ? "m" : "d"}`;
  const cached = preloadCache.get(cacheKey);
  if (cached) return cached;

  // Reuse shared hero composite preload for the first offer card.
  if (slide.id === "tvorba-webu") {
    const task = preloadHeroCompositeAssets(3600);
    preloadCache.set(cacheKey, task);
    return task;
  }

  const urls = getOfferPreloadUrls(slide, isMobile);
  const task = Promise.race([
    Promise.all(urls.map(preloadImage)).then(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, 3600);
    }),
  ]);

  preloadCache.set(cacheKey, task);
  return task;
};
