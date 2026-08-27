import heroFrameV3Url from "../../../../../Images/Hero_PC_frame_V3.png";
import { webpDefaultSrc } from "../../../../utils/responsiveWebp";
import {
  HERO_PROJECT_IDS,
  heroDesktopBasePath,
  heroMobileBasePath,
} from "./heroPreviewAssets";

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

let sharedPreload: Promise<void> | null = null;

/** Frame chrome + first project screenshots used by the hero composite. */
export const getHeroCompositePreloadUrls = (): string[] => {
  const firstId = HERO_PROJECT_IDS[0];
  if (!firstId) return [heroFrameV3Url];
  return [
    heroFrameV3Url,
    webpDefaultSrc(heroDesktopBasePath(firstId), 1280),
    webpDefaultSrc(heroDesktopBasePath(firstId), 960),
    webpDefaultSrc(heroMobileBasePath(firstId), 640),
    webpDefaultSrc(heroMobileBasePath(firstId), 480),
  ];
};

/**
 * Decode hero composite assets before entrance animation.
 * Safety cap avoids blocking forever on broken networks.
 */
export const preloadHeroCompositeAssets = (capMs = 3200): Promise<void> => {
  if (sharedPreload) return sharedPreload;

  const urls = getHeroCompositePreloadUrls();
  sharedPreload = Promise.race([
    Promise.all(urls.map(preloadImage)).then(() => undefined),
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, capMs);
    }),
  ]);

  return sharedPreload;
};

export { heroFrameV3Url };
