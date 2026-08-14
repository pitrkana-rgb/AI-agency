import type { CSSProperties } from "react";
import { pk } from "./pkLandingColors";

/**
 * Canonical primary CTA type + padding (Header + Získejte návrh zdarma).
 * Font color is surface-specific; prefer this for size/weight/family everywhere.
 */
export const HEADER_CTA_PAD_Y = Math.round(11 * 0.8);
export const HEADER_CTA_PAD_X = Math.round(28 * 0.8);

export const headerPrimaryCtaStyle: CSSProperties = {
  backgroundImage: pk.gradientPopular,
  backgroundColor: "transparent",
  color: pk.ink,
  borderRadius: "12px",
  padding: `${HEADER_CTA_PAD_Y}px ${HEADER_CTA_PAD_X}px`,
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: 1.2,
  textTransform: "none",
  letterSpacing: "0.01em",
  border: "none",
  cursor: "pointer",
  transition: "transform 0.25s ease, filter 0.25s ease",
};

export const headerPrimaryCtaClassName =
  "animate-pulse-glow hero-primary-btn landing-primary-cta hover:brightness-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--pk-accent)] focus-visible:outline-offset-2";
