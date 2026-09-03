/**
 * Hold React mount until critical Montserrat faces are ready (or a short cap).
 * Prevents FOUT on first paint without a long blank loading screen.
 */
import { restoreConsentFromStorage } from "./utils/gtmDataLayer";

const FONT_READY_CAP_MS = 240;

const loadFace = (spec: string): Promise<FontFace[]> => {
  if (!document.fonts?.load) return Promise.resolve([]);
  return document.fonts.load(spec).catch(() => []);
};

export async function prepareFirstPaint(): Promise<void> {
  // Restore consent for returning visitors before any GTM tags evaluate.
  restoreConsentFromStorage();

  document.documentElement.classList.add("pk-bootstrapping");

  try {
    if (document.fonts) {
      await Promise.race([
        Promise.all([
          loadFace("400 16px Montserrat"),
          loadFace("600 16px Montserrat"),
          loadFace("700 13px Montserrat"),
          loadFace("800 32px Montserrat"),
        ]).then(async () => {
          if (document.fonts.ready) await document.fonts.ready;
        }),
        new Promise<void>((resolve) => {
          window.setTimeout(resolve, FONT_READY_CAP_MS);
        }),
      ]);
    }
  } finally {
    document.documentElement.classList.remove("pk-bootstrapping");
    document.documentElement.classList.add("pk-fonts-ready");
  }
}
