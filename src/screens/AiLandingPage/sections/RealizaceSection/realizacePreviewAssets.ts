/** Base path for `public/prototype-previews/{id}/` (run `npm run prototype-previews`). */
export const REALIZACE_PREVIEW_WIDTHS = [480, 720, 960, 1280, 1600] as const;

/** Matches header rail: 1400px max, 24px side padding, 28px gaps between 3 cards. */
export const REALIZACE_PREVIEW_SIZES =
  "(min-width: 901px) calc((min(100vw, 1400px) - 48px - 56px) / 3), (min-width: 640px) 88vw, 92vw";

export const realizacePreviewBasePath = (imageId: string) =>
  `/prototype-previews/${imageId}`;

/** Intrinsic 16:9 dimensions for layout stability (largest variant). */
export const REALIZACE_PREVIEW_INTRINSIC = { width: 1280, height: 720 } as const;
