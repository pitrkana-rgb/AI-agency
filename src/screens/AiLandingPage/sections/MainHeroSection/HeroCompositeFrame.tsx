import { useCallback, useEffect, useRef, useState, type CSSProperties, memo } from "react";
import { ResponsiveWebpImage } from "../../../../components/ResponsiveWebpImage";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import heroFrameV3Url from "../../../../../Images/Hero_PC_frame_V3.png";
import {
  HERO_DESKTOP_INTRINSIC,
  HERO_DESKTOP_SIZES,
  HERO_DESKTOP_WIDTHS,
  HERO_MOBILE_INTRINSIC,
  HERO_MOBILE_SIZES,
  HERO_MOBILE_WIDTHS,
  HERO_PROJECT_IDS,
  heroDesktopBasePath,
  heroMobileBasePath,
} from "./heroPreviewAssets";

/** Natural pixel size of Hero_PC_frame_V3.png */
const FRAME_NATURAL = { w: 1536, h: 1024 } as const;

const ROTATE_MS = 3000;
const FADE_MS = 850;
/** Pause autoplay after manual selection so the choice is readable. */
const MANUAL_PAUSE_MS = 8000;

/** Screen cutouts in original image coordinates (scale with frame). */
const DESKTOP_SCREEN = { x: 65, y: 68, w: 1108, h: 600 } as const;
const MOBILE_SCREEN = { x: 1180, y: 268, w: 327, h: 750, borderRadiusPx: 36 } as const;

const pctX = (n: number): string => `${(n / FRAME_NATURAL.w) * 100}%`;
const pctY = (n: number): string => `${(n / FRAME_NATURAL.h) * 100}%`;

const shotLayerStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  maxWidth: "none",
  pointerEvents: "none",
  transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  willChange: "opacity",
  imageRendering: "auto",
};

/** Fit mobile shot to slot width; keep aspect ratio; pin to existing bottom edge. */
const mobileShotLayerStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  bottom: 0,
  top: "auto",
  width: "100%",
  height: "auto",
  maxWidth: "none",
  pointerEvents: "none",
  transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  willChange: "opacity",
  /* Avoid GPU layer + fractional parent scales that soften phone-slot previews */
  transform: "none",
  backfaceVisibility: "visible",
  imageRendering: "auto",
  clipPath: "inset(0 0 10px 0)",
};

type HeroScreenCarouselProps = {
  projectIds: readonly string[];
  variant: "desktop" | "mobile";
  activeIdx: number;
  className?: string;
};

/** Crossfades screenshots inside one frame cutout (index controlled by parent for sync). */
const HeroScreenCarousel = ({
  projectIds,
  variant,
  activeIdx,
  className,
}: HeroScreenCarouselProps): JSX.Element | null => {
  if (projectIds.length === 0) return null;

  const isDesktop = variant === "desktop";
  const basePathFn = isDesktop ? heroDesktopBasePath : heroMobileBasePath;
  const widths = isDesktop ? HERO_DESKTOP_WIDTHS : HERO_MOBILE_WIDTHS;
  const sizes = isDesktop ? HERO_DESKTOP_SIZES : HERO_MOBILE_SIZES;
  const intrinsic = isDesktop ? HERO_DESKTOP_INTRINSIC : HERO_MOBILE_INTRINSIC;
  const layerStyle = isDesktop ? shotLayerStyle : mobileShotLayerStyle;

  return (
    <>
      {projectIds.map((projectId, i) => (
        <ResponsiveWebpImage
          key={projectId}
          basePath={basePathFn(projectId)}
          widths={widths}
          sizes={sizes}
          width={intrinsic.width}
          height={intrinsic.height}
          className={className}
          style={{
            ...layerStyle,
            ...(isDesktop ? { objectFit: "cover", objectPosition: "top center" } : null),
            opacity: i === activeIdx ? 1 : 0,
            zIndex: i === activeIdx ? 2 : 1,
          }}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === activeIdx && i === 0 ? "high" : "auto"}
        />
      ))}
    </>
  );
};

export function useHeroPreviewCarousel(enabled = true, initialIdx = 0) {
  const count = HERO_PROJECT_IDS.length;
  const safeInitial = count > 0 ? ((initialIdx % count) + count) % count : 0;
  const [activeIdx, setActiveIdx] = useState(safeInitial);
  const pauseUntilRef = useRef(0);

  useEffect(() => {
    if (!enabled || count <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveIdx((i) => (i + 1) % count);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [count, enabled]);

  const selectIdx = useCallback(
    (idx: number) => {
      setActiveIdx(idx % count);
      pauseUntilRef.current = Date.now() + MANUAL_PAUSE_MS;
    },
    [count],
  );

  return {
    activeIdx: count > 0 ? activeIdx % count : 0,
    selectIdx,
    projectIds: HERO_PROJECT_IDS,
  };
}

export const HeroFrameDots = memo(function HeroFrameDots({
  activeIdx,
  onSelect,
  className,
}: {
  activeIdx: number;
  onSelect: (idx: number) => void;
  className?: string;
}): JSX.Element | null {
  const { language } = useLanguage();
  const isEn = language === "en";
  const count = HERO_PROJECT_IDS.length;
  if (count <= 1) return null;

  return (
    <div
      className={["hero-frame-dots", className].filter(Boolean).join(" ")}
      role="tablist"
      aria-label={isEn ? "Website preview gallery" : "Galerie náhledů webů"}
    >
      {HERO_PROJECT_IDS.map((projectId, i) => (
        <button
          key={projectId}
          type="button"
          role="tab"
          aria-selected={i === activeIdx}
          aria-label={
            isEn ? `Show website preview ${i + 1}` : `Zobrazit náhled webu ${i + 1}`
          }
          className="hero-frame-dot"
          data-active={i === activeIdx ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onSelect(i);
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
        />
      ))}
      <style>{`
        .hero-frame-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 28px;
          pointer-events: auto;
          position: relative;
          z-index: 30;
        }
        .hero-frame-dot {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: none;
          padding: 0;
          margin: 0;
          background: rgb(255 255 255 / 0.32);
          cursor: pointer;
          pointer-events: auto;
          transition: width 0.25s ease, background 0.25s ease;
        }
        .hero-frame-dot::before {
          content: "";
          position: absolute;
          inset: -14px -12px;
        }
        .hero-frame-dot[data-active="true"] {
          width: 36px;
          background: var(--pk-on-dark);
        }
        .hero-frame-dot:focus-visible {
          outline: 2px solid ${pk.accent};
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-frame-dot {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
});

type HeroCompositeFrameProps = {
  imgClassName?: string;
  wrapperClassName?: string;
  /** When false, skips hero entrance fade class (e.g. embedded in offer card). */
  animateEntrance?: boolean;
  /** Controlled carousel index (desktop + phone stay in sync). */
  activeIdx?: number;
};

export const HeroCompositeFrame = memo(function HeroCompositeFrame({
  imgClassName,
  wrapperClassName,
  animateEntrance = true,
  activeIdx: controlledIdx,
}: HeroCompositeFrameProps) {
  const internal = useHeroPreviewCarousel(controlledIdx === undefined);
  const safeIdx = controlledIdx !== undefined ? controlledIdx : internal.activeIdx;
  const count = HERO_PROJECT_IDS.length;
  const idx = count > 0 ? safeIdx % count : 0;

  const desktopSlot = {
    position: "absolute" as const,
    left: pctX(DESKTOP_SCREEN.x),
    top: pctY(DESKTOP_SCREEN.y),
    width: pctX(DESKTOP_SCREEN.w),
    height: pctY(DESKTOP_SCREEN.h),
    overflow: "hidden" as const,
    borderRadius: 0,
    zIndex: 0,
    isolation: "isolate" as const,
    background: "rgb(15 23 42 / 0.06)",
  };

  const mobileCornerPct = `${(MOBILE_SCREEN.borderRadiusPx / MOBILE_SCREEN.w) * 100}%`;

  const mobileSlot = {
    position: "absolute" as const,
    left: pctX(MOBILE_SCREEN.x),
    top: pctY(MOBILE_SCREEN.y),
    width: pctX(MOBILE_SCREEN.w),
    height: pctY(MOBILE_SCREEN.h),
    overflow: "hidden" as const,
    borderRadius: mobileCornerPct,
    zIndex: 0,
    isolation: "isolate" as const,
    background: "rgb(15 23 42 / 0.06)",
  };

  return (
    <div
      className={[animateEntrance ? "hero-composite-anim" : "", wrapperClassName]
        .filter(Boolean)
        .join(" ")}
      style={{
        position: "relative",
        width: "100%",
        lineHeight: 0,
        aspectRatio: `${FRAME_NATURAL.w} / ${FRAME_NATURAL.h}`,
      }}
    >
      <div aria-hidden="true" className="hero-slot-desktop hero-slot" style={desktopSlot}>
        <HeroScreenCarousel
          projectIds={HERO_PROJECT_IDS}
          variant="desktop"
          activeIdx={idx}
          className="hero-project-shot"
        />
      </div>
      <div aria-hidden="true" className="hero-slot-mobile hero-slot" style={mobileSlot}>
        <HeroScreenCarousel
          projectIds={HERO_PROJECT_IDS}
          variant="mobile"
          activeIdx={idx}
          className="hero-project-shot hero-project-shot--phone"
        />
      </div>
      <img
        src={heroFrameV3Url}
        alt=""
        draggable={false}
        className={imgClassName}
        width={FRAME_NATURAL.w}
        height={FRAME_NATURAL.h}
        decoding="async"
        fetchPriority="high"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          position: "relative",
          zIndex: 1,
        }}
      />
      <style>{`
        .hero-slot {
          pointer-events: none;
        }
        .hero-project-shot {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .hero-project-shot--phone {
          -webkit-backface-visibility: visible;
          backface-visibility: visible;
          transform: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-project-shot {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
});
