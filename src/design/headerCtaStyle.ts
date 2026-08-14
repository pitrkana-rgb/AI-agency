import type { CSSProperties } from "react";
import { pk } from "./pkLandingColors";

/**
 * Canonical primary CTA type + padding.
 * Matches header nav CTA: 13px / 700 / uppercase / 0.06em tracking.
 * Height is +20% vs prior 31px content box → min-height 37px.
 */
export const HEADER_CTA_PAD_Y = Math.round(11 * 0.8 * 1.2); // 11
export const HEADER_CTA_PAD_X = Math.round(28 * 0.8); // 22
/** Shared CTA height (previous ~31px + 20%). */
export const HEADER_CTA_MIN_HEIGHT = 37;

export const headerPrimaryCtaStyle: CSSProperties = {
  backgroundImage: pk.gradientPopular,
  backgroundColor: "transparent",
  color: pk.ink,
  borderRadius: "12px",
  padding: `${HEADER_CTA_PAD_Y}px ${HEADER_CTA_PAD_X}px`,
  minHeight: HEADER_CTA_MIN_HEIGHT,
  boxSizing: "border-box",
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 700,
  fontSize: "13px",
  lineHeight: 1,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  border: "none",
  cursor: "pointer",
  transition: "transform 0.25s ease, filter 0.25s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
};

/** @deprecated Alias — same as headerPrimaryCtaStyle (nav-matched type is now global). */
export const headerNavMatchedCtaStyle: CSSProperties = headerPrimaryCtaStyle;

export const headerPrimaryCtaClassName =
  "animate-pulse-glow hero-primary-btn landing-primary-cta hover:brightness-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--pk-accent)] focus-visible:outline-offset-2";

export const headerNavMatchedCtaClassName = `${headerPrimaryCtaClassName} header-nav-matched-cta`;
