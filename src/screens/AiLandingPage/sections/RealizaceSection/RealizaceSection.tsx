import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Monitor, Smartphone } from "lucide-react";
import {
  hasBeenRevealed,
  markRevealedById,
  useInViewOnce,
} from "../../../../hooks/useInViewOnce";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { pk } from "../../../../design/pkLandingColors";
import {
  headerPrimaryCtaClassName,
  headerPrimaryCtaStyle,
} from "../../../../design/headerCtaStyle";
import { MobilePreviewClickHint } from "../../../../components/MobilePreviewClickHint";
import { RealizacePreviewImage } from "./RealizacePreviewImage";

const REALIZACE_ENTRANCE_ID = "realizace-entrance";
const REALIZACE_CARD_STAGGER_MS = 250;
const realizaceEntranceTotalMs = (cardCount: number) =>
  REALIZACE_CARD_STAGGER_MS * Math.max(0, cardCount - 1);
const PREVIEW_MOBILE_FRAME_WIDTH_PX = 430;
type PreviewViewport = "desktop" | "mobile";
/** Light chrome on dark preview headers; dark chrome on light preview headers. */
type PreviewChrome = "on-dark" | "on-light";

const PREVIEW_CHROME_FALLBACK: Record<string, PreviewChrome> = {
  profitherm: "on-dark",
  "black-beard": "on-dark",
  "bazar-sport-motokros": "on-light",
};

/** Per-prototype chrome pinned over thumbnail luminance detection. */
const PREVIEW_CHROME_OVERRIDE: Partial<Record<string, PreviewChrome>> = {
  "bazar-sport-motokros": "on-light",
  "black-beard": "on-dark",
};

const detectPreviewChromeFromImage = (imageId: string): Promise<PreviewChrome> =>
  new Promise((resolve) => {
    const fallback = PREVIEW_CHROME_FALLBACK[imageId] ?? "on-dark";
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const sampleWidth = Math.min(360, img.naturalWidth || 360);
        const sourceHeight = Math.max(1, Math.floor((img.naturalHeight || 720) * 0.24));
        canvas.width = sampleWidth;
        canvas.height = sourceHeight;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          resolve(fallback);
          return;
        }
        ctx.drawImage(img, 0, 0, img.naturalWidth, sourceHeight, 0, 0, sampleWidth, sourceHeight);
        const { data } = ctx.getImageData(0, 0, sampleWidth, sourceHeight);
        let luminanceSum = 0;
        const pixels = data.length / 4;
        for (let i = 0; i < data.length; i += 4) {
          luminanceSum +=
            0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        }
        resolve(luminanceSum / pixels < 132 ? "on-dark" : "on-light");
      } catch {
        resolve(fallback);
      }
    };
    img.onerror = () => resolve(fallback);
    img.src = `/prototype-previews/${imageId}/preview-480.webp`;
  });

type PrototypeCard = {
  title: string;
  description: string;
  imageId: string;
  previewUrl: string;
};

const PREVIEW_MOBILE_BREAKPOINT_PX = 900;

const isPreviewMobileScreen = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia(`(max-width: ${PREVIEW_MOBILE_BREAKPOINT_PX}px)`).matches;

const cards: PrototypeCard[] = [
  {
    title: "Profitherm Solution",
    description:
      "Web zaměřený na dotační programy a rekonstrukce domů na klíč. Jasně vysvětluje služby, buduje důvěru a pomáhá přivádět kvalitní poptávky od majitelů nemovitostí.",
    imageId: "profitherm",
    previewUrl: "https://profithermsolution.cz/",
  },
  {
    title: "Trifer",
    description:
      "Firemní web zaměřený na výrobu a montáž ocelových konstrukcí pro firmy i soukromé zákazníky. Moderní prezentace služeb s důrazem na získávání nových poptávek.",
    imageId: "black-beard",
    previewUrl: "https://laser-steel-structures.vercel.app/",
  },
  {
    title: "Bazar-Sport-Motokros",
    description:
      "Web pro sportovní bazar se zaměřením na lyže a zimní výbavu, v létě doplněný o kola a cyklistiku. Přehledná nabídka služeb s možností snadno publikovat novinky.",
    imageId: "bazar-sport-motokros",
    previewUrl: "https://ski-spot-landing.vercel.app/",
  },
];

const cardsEn: PrototypeCard[] = [
  {
    title: "Profitherm Solution",
    description:
      "A website focused on grant programs and turnkey home renovations. It explains services clearly, builds trust, and brings quality inquiries from property owners.",
    imageId: "profitherm",
    previewUrl: "https://profithermsolution.cz/",
  },
  {
    title: "Trifer",
    description:
      "A company website focused on the manufacture and assembly of steel structures for businesses and private clients. A modern presentation of services focused on generating new inquiries.",
    imageId: "black-beard",
    previewUrl: "https://laser-steel-structures.vercel.app/",
  },
  {
    title: "Bazar-Sport-Motokros",
    description:
      "A sports shop site focused on skis and winter gear, with bikes and cycling equipment in summer. A clear offer of services with an easy way to publish news.",
    imageId: "bazar-sport-motokros",
    previewUrl: "https://ski-spot-landing.vercel.app/",
  },
];

const RealizaceMobileCard = ({
  card,
  onPreview,
  previewHintLabel,
  priority = false,
}: {
  card: PrototypeCard;
  onPreview: (card: PrototypeCard) => void;
  previewHintLabel: string;
  priority?: boolean;
}): JSX.Element => {
  const handleActivate = () => onPreview(card);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <article
      className="prototype-mobile-card"
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={card.title}
    >
      <div className="prototype-mobile-preview">
        <RealizacePreviewImage
          imageId={card.imageId}
          className="prototype-mobile-preview-image"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        <MobilePreviewClickHint label={previewHintLabel} />
      </div>
      <div className="prototype-mobile-heading">
        <h3 className="prototype-mobile-title">{card.title}</h3>
      </div>
      <p className="prototype-mobile-body">{card.description}</p>
    </article>
  );
};

const RealizaceItem = ({
  card,
  onPreview,
  revealed,
  previewHintLabel,
  priority = false,
}: {
  card: PrototypeCard;
  onPreview: (card: PrototypeCard) => void;
  revealed: boolean;
  previewHintLabel: string;
  priority?: boolean;
}): JSX.Element => {
  const handleActivate = () => onPreview(card);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <article
      className={`prototype-item${revealed ? " prototype-item--revealed" : ""}`}
      role="button"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={card.title}
    >
      <div className="prototype-preview">
        <RealizacePreviewImage
          imageId={card.imageId}
          className="prototype-preview-image"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
        <MobilePreviewClickHint label={previewHintLabel} />
      </div>
      <div className="prototype-item-heading">
        <h3 className="prototype-item-title">{card.title}</h3>
      </div>
      <p className="prototype-item-desc">{card.description}</p>
    </article>
  );
};

export const RealizaceSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEn = language === "en";
  const t = isEn
    ? {
        heading: "I create websites that deliver results",
        subheading:
          "Fast, tailored, and focused on results. I build modern websites that look great, rank on Google, and help win new customers.",
        previewBack: "Back to showcase",
        previewBackShort: "Back",
        viewportDesktop: "Desktop layout",
        viewportMobile: "Mobile layout",
        viewportMode: "Display mode",
        previewHint: "Click for preview",
        similarCta: "I want a similar website",
        previewPrev: "Previous project",
        previewNext: "Next project",
      }
    : {
        heading: "Tvořím webové stránky, které přinášejí výsledky",
        subheading:
          "Rychle, na míru a s důrazem na výsledky. Tvořím moderní webové stránky, které skvěle vypadají, jsou vidět na Googlu a pomáhají získávat nové zákazníky.",
        previewBack: "Zpět na ukázky",
        previewBackShort: "Zpět",
        viewportDesktop: "Rozložení pro počítač",
        viewportMobile: "Rozložení pro mobil",
        viewportMode: "Režim zobrazení",
        previewHint: "Klikněte pro náhled",
        similarCta: "Chci podobný web",
        previewPrev: "Předchozí projekt",
        previewNext: "Další projekt",
      };

  const activeCards = isEn ? cardsEn : cards;
  const [activePreview, setActivePreview] = useState<PrototypeCard | null>(null);
  const [previewViewport, setPreviewViewport] = useState<PreviewViewport>("desktop");
  const [previewChrome, setPreviewChrome] = useState<PreviewChrome>("on-dark");
  const [previewMobileScreen, setPreviewMobileScreen] = useState(isPreviewMobileScreen);
  const [previewFrameVisible, setPreviewFrameVisible] = useState(true);
  const previewSwitchTimerRef = useRef<number | null>(null);
  const [sectionRef, cardsVisible] = useInViewOnce({
    id: "realizace",
    threshold: 0.38,
    rootMargin: "0px 0px -12% 0px",
  });
  const entranceDone = hasBeenRevealed(REALIZACE_ENTRANCE_ID);
  const [revealedCount, setRevealedCount] = useState(
    entranceDone ? activeCards.length : 0,
  );

  useEffect(() => {
    if (!cardsVisible) return;
    if (entranceDone) {
      setRevealedCount(activeCards.length);
      return;
    }

    setRevealedCount(0);
    let timers: number[] = [];
    let doneTimer = 0;
    let cancelled = false;

    const startStagger = () => {
      if (cancelled) return;
      timers = activeCards.map((_, index) =>
        window.setTimeout(
          () => {
            if (!cancelled) setRevealedCount(index + 1);
          },
          index * REALIZACE_CARD_STAGGER_MS,
        ),
      );
      doneTimer = window.setTimeout(() => {
        if (!cancelled) markRevealedById(REALIZACE_ENTRANCE_ID);
      }, realizaceEntranceTotalMs(activeCards.length));
    };

    const raf = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(startStagger);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(doneTimer);
    };
  }, [cardsVisible, entranceDone, activeCards.length]);
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef<number>(0);
  const suppressCardClickRef = useRef(false);
  const SWIPE_THRESHOLD = 50;

  const goTo = (idx: number) => setMobileIdx(Math.max(0, Math.min(activeCards.length - 1, idx)));
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    suppressCardClickRef.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (Math.abs(e.touches[0].clientX - touchStartX.current) > SWIPE_THRESHOLD) {
      suppressCardClickRef.current = true;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      suppressCardClickRef.current = true;
      if (delta > 0) goTo(mobileIdx + 1);
      else goTo(mobileIdx - 1);
    }
  };
  const handlePreview = (card: PrototypeCard) => {
    if (suppressCardClickRef.current) {
      suppressCardClickRef.current = false;
      return;
    }
    setPreviewFrameVisible(true);
    setPreviewViewport(isPreviewMobileScreen() ? "mobile" : "desktop");
    setActivePreview(card);
  };

  const closePreview = () => {
    if (previewSwitchTimerRef.current != null) {
      window.clearTimeout(previewSwitchTimerRef.current);
      previewSwitchTimerRef.current = null;
    }
    setActivePreview(null);
    setPreviewViewport("desktop");
    setPreviewChrome("on-dark");
    setPreviewFrameVisible(true);
  };

  const switchPreviewByOffset = (offset: number) => {
    if (!activePreview || activeCards.length < 2) return;
    const currentIndex = activeCards.findIndex(
      (card) => card.previewUrl === activePreview.previewUrl,
    );
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + offset + activeCards.length) % activeCards.length;
    const nextCard = activeCards[nextIndex];
    if (!nextCard || nextCard.previewUrl === activePreview.previewUrl) return;

    if (previewSwitchTimerRef.current != null) {
      window.clearTimeout(previewSwitchTimerRef.current);
    }
    setPreviewFrameVisible(false);
    previewSwitchTimerRef.current = window.setTimeout(() => {
      setActivePreview(nextCard);
      setPreviewFrameVisible(true);
      previewSwitchTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    if (!activePreview) return;
    const forced = PREVIEW_CHROME_OVERRIDE[activePreview.imageId];
    if (forced) {
      setPreviewChrome(forced);
      return;
    }
    let cancelled = false;
    setPreviewChrome(PREVIEW_CHROME_FALLBACK[activePreview.imageId] ?? "on-dark");
    void detectPreviewChromeFromImage(activePreview.imageId).then((chrome) => {
      if (!cancelled) setPreviewChrome(chrome);
    });
    return () => {
      cancelled = true;
    };
  }, [activePreview?.imageId]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${PREVIEW_MOBILE_BREAKPOINT_PX}px)`);
    const syncPreviewLayout = () => {
      const mobile = mediaQuery.matches;
      setPreviewMobileScreen(mobile);
      if (mobile) setPreviewViewport("mobile");
    };
    syncPreviewLayout();
    mediaQuery.addEventListener("change", syncPreviewLayout);
    return () => mediaQuery.removeEventListener("change", syncPreviewLayout);
  }, []);

  useEffect(() => {
    if (!activePreview) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
        return;
      }
      if (previewMobileScreen) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        switchPreviewByOffset(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        switchPreviewByOffset(1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePreview, previewMobileScreen, activeCards]);

  const showDesktopMobileFrame =
    !previewMobileScreen && previewViewport === "mobile";

  return (
    <section
      ref={sectionRef}
      className="realizace-section"
      style={{
        width: "100%",
        backgroundColor: pk.page,
        padding: "40px 0 84px",
        marginTop: "-30px",
      }}
    >
      <div className="realizace-inner" style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "42px" }}>
          <h2
            className="pk-section-heading"
            style={{
              margin: "0 auto 18px",
              maxWidth: "860px",
            }}
          >
            {t.heading}
          </h2>
          <p
            className="section-sub realizace-section-sub"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.6,
              margin: "0 auto",
            }}
          >
            {t.subheading}
          </p>
        </div>

        <div className="prototype-grid prototype-grid-desktop">
          {activeCards.map((card, index) => (
            <RealizaceItem
              key={card.previewUrl}
              card={card}
              onPreview={handlePreview}
              revealed={entranceDone || revealedCount > index}
              previewHintLabel={t.previewHint}
              priority={index < 3}
            />
          ))}
        </div>

        {/* Mobile carousel (one card) */}
        <div className="prototype-mobile-carousel">
          <div className="prototype-mobile-carousel-shadow-room">
          <div
            className="prototype-mobile-track-wrap"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="prototype-carousel-track"
              style={{
                width: `${activeCards.length * 100}%`,
                transform: `translateX(${-mobileIdx * (100 / activeCards.length)}%)`,
              }}
            >
              {activeCards.map((card, index) => (
                <div
                  key={card.previewUrl}
                  className="prototype-mobile-slide"
                  style={{ flex: `0 0 ${100 / activeCards.length}%` }}
                >
                  <RealizaceMobileCard
                    card={card}
                    onPreview={handlePreview}
                    previewHintLabel={t.previewHint}
                    priority={index === mobileIdx}
                  />
                </div>
              ))}
            </div>
          </div>
          </div>

          <div className="prototype-mobile-dots" role="tablist" aria-label={isEn ? "Website showcases" : "Ukázky webů"}>
            {activeCards.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === mobileIdx}
                aria-label={isEn ? `Go to card ${i + 1}` : `Přejít na kartu ${i + 1}`}
                className="prototype-mobile-dot"
                data-active={i === mobileIdx ? "true" : "false"}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {activePreview
        ? createPortal(
          <div
            className={`prototype-preview-overlay${
              previewMobileScreen
                ? " prototype-preview-overlay--native-mobile"
                : " prototype-preview-overlay--studio"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={activePreview.title}
          >
            {!previewMobileScreen ? (
              <div className="prototype-preview-veil" aria-hidden="true" />
            ) : null}

            <div
              className={`prototype-preview-controls prototype-preview-controls--${
                previewMobileScreen ? previewChrome : "studio"
              }`}
              role="toolbar"
              aria-label={isEn ? "Prototype preview controls" : "Ovládání náhledu prototypu"}
            >
              {previewMobileScreen ? (
                <div className="prototype-preview-controls-group">
                  <button
                    type="button"
                    className="prototype-preview-back"
                    onClick={closePreview}
                  >
                    <span className="prototype-preview-back-label prototype-preview-back-label--full">
                      {t.previewBack}
                    </span>
                    <span className="prototype-preview-back-label prototype-preview-back-label--short">
                      {t.previewBackShort}
                    </span>
                  </button>
                </div>
              ) : (
                <>
                  <div className="prototype-preview-controls-side prototype-preview-controls-side--left" />
                  <div className="prototype-preview-controls-center">
                    <div
                      className="prototype-preview-viewport"
                      role="group"
                      aria-label={t.viewportMode}
                    >
                      <span className="prototype-preview-viewport-label">{t.viewportMode}</span>
                      <button
                        type="button"
                        className="prototype-preview-viewport-btn"
                        aria-pressed={previewViewport === "desktop"}
                        aria-label={t.viewportDesktop}
                        onClick={() => setPreviewViewport("desktop")}
                      >
                        <Monitor size={18} strokeWidth={2} aria-hidden />
                      </button>
                      <button
                        type="button"
                        className="prototype-preview-viewport-btn"
                        aria-pressed={previewViewport === "mobile"}
                        aria-label={t.viewportMobile}
                        onClick={() => setPreviewViewport("mobile")}
                      >
                        <Smartphone size={18} strokeWidth={2} aria-hidden />
                      </button>
                    </div>
                  </div>
                  <div className="prototype-preview-controls-side prototype-preview-controls-side--right">
                    <button
                      type="button"
                      className={`${headerPrimaryCtaClassName} prototype-preview-similar-cta`}
                      style={headerPrimaryCtaStyle}
                      onClick={() => {
                        closePreview();
                        navigate("/napiste-nam");
                      }}
                    >
                      {t.similarCta}
                    </button>
                    <button
                      type="button"
                      className="prototype-preview-back"
                      onClick={closePreview}
                    >
                      <span className="prototype-preview-back-label prototype-preview-back-label--full">
                        {t.previewBack}
                      </span>
                      <span className="prototype-preview-back-label prototype-preview-back-label--short">
                        {t.previewBackShort}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {!previewMobileScreen ? (
              <>
                <button
                  type="button"
                  className="prototype-preview-nav prototype-preview-nav--prev"
                  aria-label={t.previewPrev}
                  onClick={() => switchPreviewByOffset(-1)}
                >
                  <ChevronLeft size={22} strokeWidth={2} aria-hidden />
                </button>
                <button
                  type="button"
                  className="prototype-preview-nav prototype-preview-nav--next"
                  aria-label={t.previewNext}
                  onClick={() => switchPreviewByOffset(1)}
                >
                  <ChevronRight size={22} strokeWidth={2} aria-hidden />
                </button>
              </>
            ) : null}

            <div
              className={`prototype-preview-scroll${showDesktopMobileFrame ? " prototype-preview-scroll--device-mobile" : ""}${
                previewFrameVisible ? " is-visible" : " is-fading"
              }`}
            >
              <div
                className={`prototype-preview-stage${showDesktopMobileFrame ? " prototype-preview-stage--device-mobile" : ""}`}
              >
                <iframe
                  key={activePreview.previewUrl}
                  src={activePreview.previewUrl}
                  title={activePreview.title}
                  className="prototype-preview-frame"
                />
              </div>
            </div>
          </div>,
          document.body,
        )
        : null}

      <style>{`
        @media (min-width: 901px) {
          .realizace-section {
            padding-top: 30px !important;
          }
          .realizace-section-sub{
            max-width: 820px;
          }
          .prototype-grid{
            gap: 28px;
            max-width: none;
            margin: 0;
            width: 100%;
          }
        }
        .prototype-grid{
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          align-items: start;
        }
        .prototype-mobile-carousel{ display:none; }
        .prototype-item{
          background: transparent;
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 0;
          margin: 0;
          display:flex;
          flex-direction:column;
          gap: 16px;
          width: 100%;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          text-align: center;
        }
        @media (min-width: 901px) {
          .prototype-grid-desktop .prototype-item{
            opacity: 0;
            transform: translate3d(0, 16px, 0);
            pointer-events: none;
            will-change: opacity, transform;
            transition:
              opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .prototype-grid-desktop .prototype-item.prototype-item--revealed{
            opacity: 1;
            transform: translate3d(0, 0, 0);
            pointer-events: auto;
          }
          .prototype-grid-desktop .prototype-item.prototype-item--revealed:hover,
          .prototype-grid-desktop .prototype-item.prototype-item--revealed:focus-visible{
            transform: translate3d(0, -6px, 0);
          }
        }
        @media (max-width: 900px) {
          .prototype-item:hover,
          .prototype-item:focus-visible{
            transform: translateY(-6px);
          }
        }
        .prototype-item:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 4px;
        }
        .prototype-preview{
          position: relative;
          isolation: isolate;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          width: 100%;
          max-height: none;
          background: rgb(15 23 42 / 0.04);
          box-shadow:
            1px 1px 2px rgb(2 6 23 / 0.1),
            4px 4px 10px -2px rgb(2 6 23 / 0.18),
            8px 10px 18px -8px rgb(2 6 23 / 0.22);
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .prototype-item:hover .prototype-preview,
        .prototype-item:focus-visible .prototype-preview{
          transform: translateZ(0) scale(1.012);
          box-shadow:
            2px 2px 4px rgb(2 6 23 / 0.14),
            6px 8px 16px -2px rgb(2 6 23 / 0.24),
            12px 16px 28px -8px rgb(2 6 23 / 0.3);
        }
        .prototype-preview-image{
          display: block;
          width: 100%;
          height: 100%;
          max-width: none;
          object-fit: cover;
          object-position: top center;
          image-rendering: auto;
          -webkit-font-smoothing: antialiased;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .prototype-item-heading{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
        }
        .prototype-item-title{
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 24px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--pk-ink);
          text-align: center;
          flex: 1 1 auto;
          min-width: 0;
        }
        .prototype-item-desc{
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 1.65;
          color: var(--pk-ink);
          text-align: center;
        }
        .prototype-preview-overlay{
          position: fixed;
          inset: 0;
          z-index: 12000;
          width: 100vw;
          max-width: 100vw;
          height: 100vh;
          height: 100dvh;
          margin: 0;
          padding: 0;
          border: none;
          border-radius: 0;
          box-shadow: none;
          background: var(--pk-page);
          overflow: hidden;
        }
        .prototype-preview-veil{
          display: none;
        }
        .prototype-preview-overlay--studio{
          background: transparent;
        }
        .prototype-preview-overlay--studio .prototype-preview-veil{
          display: block;
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(
              180deg,
              rgb(255 255 255 / 0.78) 0%,
              rgb(255 255 255 / 0.7) 45%,
              rgb(255 255 255 / 0.74) 100%
            );
          backdrop-filter: blur(18px) saturate(1.08);
          -webkit-backdrop-filter: blur(18px) saturate(1.08);
        }
        .prototype-preview-scroll{
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
          background: var(--pk-page);
          z-index: 1;
        }
        .prototype-preview-overlay--studio .prototype-preview-scroll{
          top: auto;
          left: 50%;
          right: auto;
          bottom: 2.2vh;
          transform: translateX(-50%);
          width: min(95vw, 1840px);
          height: calc(100dvh - 12.5vh);
          max-height: calc(100dvh - 12.5vh);
          overflow: hidden;
          background: transparent;
          border-radius: 18px;
          opacity: 1;
          transition:
            width 420ms cubic-bezier(0.22, 1, 0.36, 1),
            height 420ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 180ms ease;
        }
        .prototype-preview-overlay--studio .prototype-preview-scroll.is-fading{
          opacity: 0;
        }
        .prototype-preview-overlay--studio .prototype-preview-nav{
          position: absolute;
          top: calc(12.5vh + (100dvh - 14.7vh) / 2);
          transform: translateY(-50%);
          z-index: 6;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid rgb(15 23 42 / 0.08);
          background: rgb(255 255 255 / 0.78);
          backdrop-filter: blur(14px) saturate(1.1);
          -webkit-backdrop-filter: blur(14px) saturate(1.1);
          color: var(--pk-ink);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow:
            0 1px 2px rgb(15 23 42 / 0.04),
            0 10px 28px rgb(15 23 42 / 0.1);
          transition:
            background 220ms ease,
            transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 220ms ease,
            border-color 220ms ease;
        }
        .prototype-preview-overlay--studio .prototype-preview-nav--prev{
          left: max(10px, calc((100vw - min(95vw, 1840px)) / 2 - 8px));
        }
        .prototype-preview-overlay--studio .prototype-preview-nav--next{
          right: max(10px, calc((100vw - min(95vw, 1840px)) / 2 - 8px));
        }
        .prototype-preview-overlay--studio:has(.prototype-preview-scroll--device-mobile) .prototype-preview-nav--prev{
          left: max(10px, calc(50% - ${PREVIEW_MOBILE_FRAME_WIDTH_PX / 2}px - 58px));
        }
        .prototype-preview-overlay--studio:has(.prototype-preview-scroll--device-mobile) .prototype-preview-nav--next{
          right: max(10px, calc(50% - ${PREVIEW_MOBILE_FRAME_WIDTH_PX / 2}px - 58px));
        }
        .prototype-preview-overlay--studio .prototype-preview-nav:hover{
          background: rgb(255 255 255 / 0.94);
          transform: translateY(-50%) scale(1.04);
          box-shadow:
            0 2px 8px rgb(15 23 42 / 0.06),
            0 14px 34px rgb(15 23 42 / 0.14);
        }
        .prototype-preview-overlay--studio .prototype-preview-nav:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 3px;
        }
        .prototype-preview-overlay--studio .prototype-preview-scroll:not(.prototype-preview-scroll--device-mobile){
          background: var(--pk-page);
          box-shadow:
            0 0 0 1px rgb(15 23 42 / 0.06),
            0 28px 80px rgb(15 23 42 / 0.16),
            0 8px 24px rgb(15 23 42 / 0.08);
        }
        .prototype-preview-scroll--device-mobile{
          background: var(--pk-slate-tint-08);
        }
        .prototype-preview-overlay--studio .prototype-preview-scroll--device-mobile{
          background: transparent;
          box-shadow: none;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
        .prototype-preview-stage{
          width: 100%;
          min-height: 100%;
          height: 100%;
          transition:
            width 420ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .prototype-preview-stage--device-mobile{
          width: min(${PREVIEW_MOBILE_FRAME_WIDTH_PX}px, 100%);
          margin: 0 auto;
          min-height: 100%;
          background: var(--pk-page);
          box-shadow:
            0 0 0 1px var(--pk-slate-tint-10),
            0 18px 48px rgb(2 6 23 / 0.08);
        }
        .prototype-preview-overlay--studio .prototype-preview-stage--device-mobile{
          width: ${PREVIEW_MOBILE_FRAME_WIDTH_PX}px;
          max-width: min(${PREVIEW_MOBILE_FRAME_WIDTH_PX}px, 100%);
          flex: 0 0 auto;
          border-radius: 18px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgb(15 23 42 / 0.08),
            0 28px 80px rgb(15 23 42 / 0.18),
            0 8px 24px rgb(15 23 42 / 0.1);
        }
        .prototype-preview-overlay--studio .prototype-preview-stage--device-mobile .prototype-preview-frame{
          width: ${PREVIEW_MOBILE_FRAME_WIDTH_PX}px;
          min-width: ${PREVIEW_MOBILE_FRAME_WIDTH_PX}px;
          max-width: ${PREVIEW_MOBILE_FRAME_WIDTH_PX}px;
        }
        .prototype-preview-overlay--studio .prototype-preview-stage:not(.prototype-preview-stage--device-mobile){
          border-radius: 18px;
          overflow: hidden;
        }
        .prototype-preview-frame{
          display: block;
          width: 100%;
          height: 100%;
          min-height: 100%;
          border: none;
          margin: 0;
          padding: 0;
          background: var(--pk-page);
        }
        .prototype-preview-overlay--native-mobile .prototype-preview-scroll,
        .prototype-preview-overlay--native-mobile .prototype-preview-stage,
        .prototype-preview-overlay--native-mobile .prototype-preview-frame{
          width: 100%;
          height: 100%;
          min-height: 100%;
          max-width: none;
          margin: 0;
          box-shadow: none;
          background: var(--pk-page);
          border-radius: 0;
          transform: none;
          top: 0;
          left: 0;
          bottom: 0;
        }
        @media (max-width: ${PREVIEW_MOBILE_BREAKPOINT_PX}px){
          .prototype-preview-viewport{
            display: none !important;
          }
          .prototype-preview-scroll,
          .prototype-preview-stage{
            width: 100%;
            height: 100%;
            min-height: 100%;
          }
          .prototype-preview-stage--device-mobile{
            width: min(${PREVIEW_MOBILE_FRAME_WIDTH_PX}px, 100%);
          }
        }
        .prototype-preview-controls{
          position: fixed;
          top: max(10px, env(safe-area-inset-top, 0px));
          left: 12px;
          right: 12px;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          pointer-events: none;
        }
        .prototype-preview-controls-group{
          display: inline-flex;
          align-items: center;
          gap: 10px;
          pointer-events: auto;
        }
        .prototype-preview-controls-center,
        .prototype-preview-controls-side{
          display: none;
        }
        .prototype-preview-overlay--studio .prototype-preview-controls{
          top: 0;
          left: 0;
          right: 0;
          height: 10.5vh;
          min-height: 76px;
          max-height: 104px;
          padding: 0 clamp(20px, 3vw, 40px);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 16px;
          box-sizing: border-box;
          pointer-events: none;
        }
        .prototype-preview-overlay--studio .prototype-preview-controls-center,
        .prototype-preview-overlay--studio .prototype-preview-controls-side{
          display: flex;
          align-items: center;
          pointer-events: auto;
          min-width: 0;
        }
        .prototype-preview-overlay--studio .prototype-preview-controls-center{
          justify-content: center;
        }
        .prototype-preview-overlay--studio .prototype-preview-controls-side--left{
          justify-content: flex-start;
        }
        .prototype-preview-overlay--studio .prototype-preview-controls-side--right{
          justify-content: flex-end;
          gap: 12px;
        }
        .prototype-preview-similar-cta{
          flex-shrink: 0;
          white-space: nowrap;
        }
        @media (min-width: 901px){
          .prototype-preview-overlay:not(.prototype-preview-overlay--studio) .prototype-preview-controls{
            left: auto;
            right: 0;
            padding-right: 30px;
          }
        }
        .prototype-preview-back,
        .prototype-preview-viewport{
          display: inline-flex;
          align-items: center;
          box-sizing: border-box;
          border-radius: 12px;
          height: 44px;
          padding: 0 14px;
          flex-shrink: 0;
          backdrop-filter: blur(14px) saturate(1.15);
          -webkit-backdrop-filter: blur(14px) saturate(1.15);
          transition:
            background 220ms ease,
            border-color 220ms ease,
            color 220ms ease,
            box-shadow 220ms ease,
            transform 200ms ease;
        }
        .prototype-preview-controls--on-dark .prototype-preview-back,
        .prototype-preview-controls--on-dark .prototype-preview-viewport,
        .prototype-preview-controls--studio .prototype-preview-back,
        .prototype-preview-controls--studio .prototype-preview-viewport{
          background: rgb(255 255 255 / 0.9);
          border: 1px solid rgb(255 255 255 / 0.34);
          box-shadow:
            0 2px 8px rgb(2 6 23 / 0.06),
            0 10px 32px rgb(2 6 23 / 0.12);
        }
        .prototype-preview-controls--on-light .prototype-preview-back,
        .prototype-preview-controls--on-light .prototype-preview-viewport{
          background: rgb(15 23 42 / 0.88);
          border: 1px solid rgb(255 255 255 / 0.12);
          box-shadow:
            0 2px 8px rgb(2 6 23 / 0.18),
            0 10px 32px rgb(2 6 23 / 0.22);
        }
        .prototype-preview-controls--studio .prototype-preview-back,
        .prototype-preview-controls--studio .prototype-preview-viewport{
          background: rgb(255 255 255 / 0.82);
          border: 1px solid rgb(15 23 42 / 0.08);
          box-shadow:
            0 1px 2px rgb(15 23 42 / 0.04),
            0 8px 24px rgb(15 23 42 / 0.08);
        }
        .prototype-preview-back{
          justify-content: center;
          cursor: pointer;
          white-space: nowrap;
          border: none;
        }
        .prototype-preview-viewport-label,
        .prototype-preview-back{
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 15px;
          line-height: 1.2;
          letter-spacing: 0.01em;
        }
        .prototype-preview-viewport-label{
          white-space: nowrap;
          user-select: none;
        }
        .prototype-preview-controls--on-dark .prototype-preview-back,
        .prototype-preview-controls--studio .prototype-preview-back{
          color: var(--pk-ink);
        }
        .prototype-preview-controls--on-light .prototype-preview-back{
          color: #fff;
        }
        .prototype-preview-controls--on-dark .prototype-preview-back:hover,
        .prototype-preview-controls--on-dark .prototype-preview-viewport:hover,
        .prototype-preview-controls--studio .prototype-preview-back:hover,
        .prototype-preview-controls--studio .prototype-preview-viewport:hover{
          background: rgb(255 255 255 / 0.96);
          transform: translateY(-1px);
          box-shadow:
            0 4px 12px rgb(2 6 23 / 0.08),
            0 14px 36px rgb(2 6 23 / 0.14);
        }
        .prototype-preview-controls--on-light .prototype-preview-back:hover,
        .prototype-preview-controls--on-light .prototype-preview-viewport:hover{
          background: rgb(15 23 42 / 0.94);
          transform: translateY(-1px);
          box-shadow:
            0 4px 12px rgb(2 6 23 / 0.22),
            0 14px 36px rgb(2 6 23 / 0.28);
        }
        .prototype-preview-back:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 2px;
        }
        .prototype-preview-back-label--short{
          display: none;
        }
        .prototype-preview-viewport{
          gap: 10px;
        }
        .prototype-preview-controls--on-dark .prototype-preview-viewport-label,
        .prototype-preview-controls--studio .prototype-preview-viewport-label{
          color: var(--pk-ink);
        }
        .prototype-preview-controls--on-light .prototype-preview-viewport-label{
          color: rgb(255 255 255 / 0.92);
        }
        .prototype-preview-viewport-btn{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 28px;
          border: none;
          border-radius: 8px;
          padding: 0;
          background: transparent;
          cursor: pointer;
          flex-shrink: 0;
          transition: background 180ms ease, color 180ms ease, box-shadow 180ms ease;
        }
        .prototype-preview-controls--on-dark .prototype-preview-viewport-btn,
        .prototype-preview-controls--studio .prototype-preview-viewport-btn{
          color: var(--pk-ink);
        }
        .prototype-preview-controls--on-light .prototype-preview-viewport-btn{
          color: rgb(255 255 255 / 0.88);
        }
        .prototype-preview-controls--on-dark .prototype-preview-viewport-btn:hover,
        .prototype-preview-controls--studio .prototype-preview-viewport-btn:hover{
          color: var(--pk-brand-4);
        }
        .prototype-preview-controls--on-light .prototype-preview-viewport-btn:hover{
          color: #fff;
        }
        .prototype-preview-controls--on-dark .prototype-preview-viewport-btn[aria-pressed="true"],
        .prototype-preview-controls--studio .prototype-preview-viewport-btn[aria-pressed="true"]{
          background: rgb(255 255 255 / 0.95);
          color: var(--pk-brand-4);
          box-shadow: 0 2px 10px rgb(2 6 23 / 0.08);
        }
        .prototype-preview-controls--on-light .prototype-preview-viewport-btn[aria-pressed="true"]{
          background: rgb(255 255 255 / 0.14);
          color: #fff;
          box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.12);
        }
        .prototype-preview-viewport-btn:focus-visible{
          outline: 2px solid var(--pk-accent);
          outline-offset: 2px;
        }
        .pk-mobile-preview-click-hint{
          display: inline-flex;
          align-items: center;
          gap: 8px;
          position: absolute;
          right: 11px;
          bottom: 11px;
          z-index: 2;
          max-width: calc(100% - 22px);
          padding: 8px 12px 8px 10px;
          border-radius: 11px;
          background: rgb(0 0 0 / 0.47);
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 15.18px;
          line-height: 1.2;
          letter-spacing: 0.01em;
          pointer-events: none;
          user-select: none;
          text-shadow:
            0 1px 3px rgb(0 0 0 / 0.55),
            0 0 14px rgb(0 0 0 / 0.4);
          filter: drop-shadow(0 2px 10px rgb(0 0 0 / 0.3));
          animation: pkMobilePreviewHintPulse 3.2s ease-in-out infinite;
        }
        .pk-mobile-preview-click-hint__icon{
          flex-shrink: 0;
          width: 24px;
          height: 24px;
        }
        .pk-mobile-preview-click-hint__label{
          white-space: nowrap;
        }
        @keyframes pkMobilePreviewHintPulse{
          0%, 100%{
            opacity: 0.78;
            transform: scale(0.98);
          }
          50%{
            opacity: 1;
            transform: scale(1.03);
          }
        }
        @media (prefers-reduced-motion: reduce){
          .pk-mobile-preview-click-hint{
            animation: none;
            opacity: 0.9;
          }
        }
        @media (max-width: 1024px){
          .realizace-section{
            overflow: visible;
          }
          .realizace-inner{
            overflow: visible;
          }
          .prototype-grid-desktop{ display:none !important; }
          .prototype-mobile-carousel{
            display:block !important;
            width: 100%;
            max-width: min(520px, 100%);
            margin: 0 auto;
            padding: 0;
            overflow: visible;
          }
          .prototype-mobile-carousel-shadow-room{
            width: 100%;
            overflow: hidden;
          }
          .prototype-mobile-track-wrap{
            overflow: hidden;
            width: 100%;
            padding: 16px 0 20px;
            box-sizing: border-box;
          }
          .prototype-carousel-track{
            display: flex;
            align-items: stretch;
            transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }
          .prototype-mobile-slide{
            box-sizing: border-box;
            min-width: 0;
            padding: 0 14px;
          }
          .prototype-mobile-card{
            display: flex;
            flex-direction: column;
            width: 100%;
            margin: 0;
            padding: 14px;
            box-sizing: border-box;
            background: var(--pk-page);
            border: 1px solid rgb(15 23 42 / 0.07);
            border-radius: 16px;
            box-shadow:
              0 1px 2px rgb(15 23 42 / 0.05),
              0 4px 12px rgb(15 23 42 / 0.07);
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            text-align: center;
          }
          .prototype-mobile-card:focus-visible{
            outline: 2px solid var(--pk-accent);
            outline-offset: 3px;
          }
          .prototype-mobile-preview{
            position: relative;
            isolation: isolate;
            width: 100%;
            border-radius: 12px;
            overflow: hidden;
            aspect-ratio: 16 / 9;
            margin: 0 0 12px;
            background: rgb(15 23 42 / 0.04);
            box-shadow:
              0 1px 0 rgb(255 255 255 / 0.6) inset,
              inset 0 0 0 1px rgb(15 23 42 / 0.05);
          }
          .prototype-mobile-preview-image{
            display: block;
            width: 100%;
            height: 100%;
            max-width: none;
            object-fit: cover;
            object-position: top center;
            image-rendering: auto;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
          .prototype-mobile-heading{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin: 0 0 8px;
          }
          .prototype-mobile-title{
            margin: 0;
            font-family: "Montserrat", sans-serif;
            font-weight: 800;
            font-size: 20.4px;
            line-height: 1.25;
            letter-spacing: -0.02em;
            color: var(--pk-ink);
            flex: 1 1 auto;
            min-width: 0;
            text-align: center;
          }
          .prototype-mobile-body{
            margin: 0;
            font-family: "Montserrat", sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.55;
            color: var(--pk-ink);
            text-align: center;
          }
          .prototype-mobile-dots{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 12px;
            padding: 0 8px;
          }
          .prototype-mobile-dot{
            width: 10px;
            height: 10px;
            border-radius: 999px;
            border: none;
            padding: 0;
            cursor: pointer;
            background: var(--pk-slate-tint-16);
            transition: width 250ms ease, background 250ms ease;
          }
          .prototype-mobile-dot[data-active="true"]{
            width: 36px;
            background: var(--pk-ink);
          }
        }
        @media (max-width: 768px){
          .prototype-preview{ border-radius: 14px; }
          .prototype-item{ gap: 14px; }
          .prototype-item-title{ font-size: 21.6px; }
          .prototype-mobile-card{
            padding: 12px;
            border-radius: 14px;
          }
          .realizace-inner{
            padding-left: 18px;
            padding-right: 18px;
          }
          .prototype-mobile-track-wrap{
            padding: 14px 0 18px;
          }
          .prototype-mobile-slide{
            padding: 0 12px;
          }
          .prototype-mobile-title{ font-size: 19.2px; }
          .prototype-mobile-body{ font-size: 13px; line-height: 1.5; }
          .prototype-preview-controls{
            left: auto;
            right: 0;
            padding-right: 16px;
            gap: 8px;
          }
          .prototype-preview-back-label--full{
            display: none;
          }
          .prototype-preview-back-label--short{
            display: inline;
          }
          .prototype-preview-back,
          .prototype-preview-viewport{
            height: 40px;
            padding: 0 12px;
          }
          .prototype-preview-back,
          .prototype-preview-viewport-label{
            font-size: 14px;
          }
          .prototype-preview-viewport-btn{
            width: 30px;
            height: 26px;
          }
        }
        @media (prefers-reduced-motion: reduce){
          .prototype-grid-desktop .prototype-item{
            opacity: 1 !important;
            pointer-events: auto !important;
          }
          .prototype-item,
          .prototype-preview{
            transition: none !important;
            transform: none !important;
          }
          .prototype-preview-image{
            transform: none !important;
          }
          .prototype-item:hover,
          .prototype-item:focus-visible{
            transform: none !important;
          }
          .prototype-item:hover .prototype-preview,
          .prototype-item:focus-visible .prototype-preview{
            box-shadow:
              1px 1px 2px rgb(2 6 23 / 0.1),
              4px 4px 10px -2px rgb(2 6 23 / 0.18),
              8px 10px 18px -8px rgb(2 6 23 / 0.22);
          }
        }
      `}</style>
    </section>
  );
};
