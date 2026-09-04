import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../../i18n/LanguageContext";
import {
  HeroCompositeFrame,
  HeroFrameDots,
  useHeroPreviewCarousel,
} from "./HeroCompositeFrame";
import { preloadHeroCompositeAssets } from "./heroCompositePreload";
import { pk } from "../../../../design/pkLandingColors";
import {
  hasBeenRevealed,
  markRevealedById,
} from "../../../../hooks/useInViewOnce";

const HERO_ENTRANCE_ID = "hero-entrance";

const HERO_TYPING = { typeMs: 1000, holdMs: 2000, deleteMs: 1000, startDelayMs: 1000 } as const;

/** Align hero primary CTA height with header CTA. */
const HERO_CTA_PAD_Y = Math.round(11 * 0.8 * 1.2);
const HERO_CTA_PAD_X = Math.round(28 * 0.8);

const HERO_TYPING_MESSAGES_CS = [
  "NÁVRH WEBU ZDARMA DO 3 DNŮ",
  "DODÁVÁM RYCHLE A NA MÍRU",
  "SEO OPTIMALIZACE",
  "ZVYŠUJI POČTY ZÁKAZNÍKŮ",
  "PRO KAŽDÝ TYP BUSINESSU",
  "RESPONZIVNÍ DESIGN PRO MOBILY",
] as const;

const HERO_TYPING_MESSAGES_EN = [
  "FREE WEBSITE DESIGN IN 3 DAYS",
  "I DELIVER FAST AND TAILORED",
  "SEO OPTIMIZATION",
  "I GROW YOUR CUSTOMER BASE",
  "FOR EVERY TYPE OF BUSINESS",
  "RESPONSIVE DESIGN FOR MOBILES",
] as const;

const HeroTypingLine = ({ messages }: { messages: readonly string[] }) => {
  const [text, setText] = useState("");
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setText(messagesRef.current[0] ?? "");
      return;
    }
    let cancelled = false;
    let msgIndex = 0;
    let phase: "type" | "hold" | "del" = "type";
    let phaseStart = performance.now();
    let raf = 0;
    let loopStarted = false;

    const tick = (now: number) => {
      if (cancelled) return;
      const list = messagesRef.current;
      const msg = list[msgIndex] ?? "";
      const elapsed = now - phaseStart;
      if (phase === "type") {
        const p = Math.min(1, elapsed / HERO_TYPING.typeMs);
        setText(msg.slice(0, Math.max(0, Math.ceil(p * msg.length))));
        if (p >= 1) {
          phase = "hold";
          phaseStart = now;
        }
      } else if (phase === "hold") {
        setText(msg);
        if (elapsed >= HERO_TYPING.holdMs) {
          phase = "del";
          phaseStart = now;
        }
      } else {
        const p = Math.min(1, elapsed / HERO_TYPING.deleteMs);
        setText(msg.slice(0, Math.max(0, Math.floor((1 - p) * msg.length))));
        if (p >= 1) {
          msgIndex = (msgIndex + 1) % list.length;
          phase = "type";
          phaseStart = now;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (cancelled || loopStarted) return;
      loopStarted = true;
      phaseStart = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const delayTimer = window.setTimeout(startLoop, HERO_TYPING.startDelayMs);
    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="hero-typing-line"
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "nowrap",
        gap: "10px",
        width: "100%",
        minHeight: "44px",
        margin: "0 0 28px 0",
        maxWidth: "640px",
        overflow: "hidden",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 600,
        fontSize: "clamp(22px, 3.2vw, 26px)",
        letterSpacing: "0.04em",
        lineHeight: 1.35,
        color: pk.onDark92,
      }}
    >
      <div className="hero-typing-inner">
        <span aria-hidden="true" style={{ flexShrink: 0, color: pk.onDark }}>
          ✓
        </span>
        <span
          className="hero-typing-text"
          style={{
            minWidth: 0,
            flex: "1 1 auto",
            textAlign: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {text}
          <span className="hero-typing-cursor" aria-hidden="true">
            |
          </span>
        </span>
      </div>
    </div>
  );
};

export const MainHeroSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = language === "en" ? {
    headlineLine1: "Tailored websites,",
    headlineLine2Accent: "that bring you customers",
    subheadingLine1: "Professional websites for companies and entrepreneurs",
    subheadingLine2: "focused on speed, SEO, and new customers.",
    ctaPrimary: "Request a quote",
    trustUnderCta: "Reply within 24h and a free consultation",
    scribble: "Free website proposal in 3 days",
  } : {
    headlineLine1: "Webové stránky na míru,",
    headlineLine2Accent: "které přivádějí zákazníky",
    subheadingLine1: "Profesionální webové stránky pro firmy a podnikatele",
    subheadingLine2: "se zaměřením na rychlost, SEO a nové zákazníky.",
    ctaPrimary: "Nezávazně poptat",
    trustUnderCta: "Odpověď do 24 h a konzultace zdarma",
    scribble: "Návrh webu zdarma do 3 dnů",
  };
  const typingMessages = language === "en" ? HERO_TYPING_MESSAGES_EN : HERO_TYPING_MESSAGES_CS;
  const { activeIdx: heroPreviewIdx, selectIdx: selectHeroPreview } = useHeroPreviewCarousel(true);
  /** Empty until preview assets decode — avoids frame/content pop before entrance. */
  const [entrancePhase, setEntrancePhase] = useState<"" | "play-entrance" | "hero-entrance-done">("");
  const [previewAssetsReady, setPreviewAssetsReady] = useState(false);
  const entranceStartedRef = useRef(false);
  const heroCopyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    void preloadHeroCompositeAssets().then(() => {
      if (!cancelled) setPreviewAssetsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /** Desktop: keep headline/subheading/typing on fixed line counts by fluidly fitting font size. */
  useLayoutEffect(() => {
    const root = heroCopyRef.current;
    if (!root) return;

    const desktopMq = window.matchMedia("(min-width: 769px)");

    const fitNowrapGroup = (
      el: HTMLElement | null,
      lineSelector: string,
      maxPx: number,
      minPx: number,
    ) => {
      if (!el) return;
      const available = el.clientWidth;
      if (available <= 1) return;
      el.style.setProperty("font-size", `${maxPx}px`, "important");
      const lines = lineSelector
        ? Array.from(el.querySelectorAll<HTMLElement>(lineSelector))
        : [el];
      const longest = Math.max(...lines.map((line) => line.scrollWidth), 1);
      const next = Math.min(maxPx, Math.max(minPx, maxPx * (available / longest)));
      el.style.setProperty("font-size", `${next.toFixed(2)}px`, "important");
    };

    const fitTypingToLongest = (el: HTMLElement | null, maxPx: number, minPx: number) => {
      if (!el) return;
      const available = el.clientWidth;
      if (available <= 1) return;

      const probe = document.createElement("span");
      probe.setAttribute("aria-hidden", "true");
      probe.style.cssText =
        "position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;" +
        "font-family:Montserrat,sans-serif;font-weight:600;letter-spacing:0.04em;";
      probe.style.fontSize = `${maxPx}px`;
      const longestMsg = typingMessages.reduce(
        (a, b) => (a.length >= b.length ? a : b),
        typingMessages[0] ?? "",
      );
      probe.textContent = `✓ ${longestMsg}|`;
      document.body.appendChild(probe);
      const longest = Math.max(probe.scrollWidth, 1);
      probe.remove();

      const next = Math.min(maxPx, Math.max(minPx, maxPx * (available / longest)));
      el.style.setProperty("font-size", `${next.toFixed(2)}px`, "important");
    };

    const fit = () => {
      if (!desktopMq.matches) {
        root.querySelectorAll<HTMLElement>(
          ".hero-headline, .hero-subheading, .hero-typing-line",
        ).forEach((el) => {
          el.style.removeProperty("font-size");
        });
        return;
      }
      fitNowrapGroup(
        root.querySelector<HTMLElement>(".hero-headline"),
        ".hero-headline-line1, .hero-headline-line2",
        41.6,
        15,
      );
      fitNowrapGroup(
        root.querySelector<HTMLElement>(".hero-subheading"),
        ".hero-subheading-line",
        22.1,
        13,
      );
      fitTypingToLongest(
        root.querySelector<HTMLElement>(".hero-typing-line"),
        26,
        13.5,
      );
    };

    fit();
    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(fit);
    });
    ro.observe(root);
    desktopMq.addEventListener("change", fit);
    window.addEventListener("resize", fit, { passive: true });

    // Refit after fonts settle (avoids 3-line flash from fallback metrics).
    let fontRefresh = 0;
    if (document.fonts?.ready) {
      void document.fonts.ready.then(() => {
        fontRefresh = window.requestAnimationFrame(fit);
      });
    }

    return () => {
      ro.disconnect();
      desktopMq.removeEventListener("change", fit);
      window.removeEventListener("resize", fit);
      if (fontRefresh) cancelAnimationFrame(fontRefresh);
    };
  }, [
    language,
    t.headlineLine1,
    t.headlineLine2Accent,
    t.subheadingLine1,
    t.subheadingLine2,
    typingMessages,
  ]);

  useEffect(() => {
    let cancelled = false;
    void preloadHeroCompositeAssets().then(() => {
      if (!cancelled) setPreviewAssetsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!previewAssetsReady || entranceStartedRef.current) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || hasBeenRevealed(HERO_ENTRANCE_ID)) {
      entranceStartedRef.current = true;
      markRevealedById(HERO_ENTRANCE_ID);
      let innerRaf = 0;
      const outerRaf = requestAnimationFrame(() => {
        innerRaf = requestAnimationFrame(() => setEntrancePhase("hero-entrance-done"));
      });
      return () => {
        cancelAnimationFrame(outerRaf);
        if (innerRaf) cancelAnimationFrame(innerRaf);
      };
    }

    entranceStartedRef.current = true;
    let innerRaf = 0;
    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => setEntrancePhase("play-entrance"));
    });
    return () => {
      cancelAnimationFrame(outerRaf);
      if (innerRaf) cancelAnimationFrame(innerRaf);
    };
  }, [previewAssetsReady]);

  useEffect(() => {
    if (entrancePhase !== "play-entrance") return;
    const timer = window.setTimeout(() => {
      markRevealedById(HERO_ENTRANCE_ID);
      setEntrancePhase("hero-entrance-done");
    }, 6300);
    return () => window.clearTimeout(timer);
  }, [entrancePhase]);

  return (
    <section
      className={`relative w-full flex items-center justify-center hero-section-mobile${entrancePhase ? ` ${entrancePhase}` : ""}`}
      style={{
        minHeight: "max(100vh, 920px)",
        paddingTop: "44px",
        paddingBottom: "0",
        marginTop: "-50px",
        marginBottom: "0px",
        backgroundColor: "transparent",
      }}
    >
      {/* Hero content — same horizontal alignment as other sections (max-width 1536px + 24px padding) */}
      <div
        className="hero-shell relative z-10"
        style={{
          width: "100%",
          maxWidth: "none",
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: 0,
          paddingRight: 0,
          boxSizing: "border-box",
        }}
      >
        <div className="hero-grid">
          <div className="hero-left-rail">
          <div className="hero-content-shift">
            <div
              ref={heroCopyRef}
              className="flex flex-col items-center md:items-start hero-content-wrap"
              style={{ width: "100%", maxWidth: "none", padding: 0 }}
            >

        <div className="hero-heading-block">
        {/* Headline */}
        <h1 className="hero-headline" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(13px, 3.6vw, 32px)",
          lineHeight: 1.12,
          color: pk.onDark,
          margin: "0 0 16px 0",
          letterSpacing: "-0.02em",
          maxWidth: "100%",
          width: "100%",
        }}>
          <span className="hero-headline-line1 hero-headline-part hero-headline-part-left">
            {t.headlineLine1}
          </span>
          <span
            className="hero-headline-line2 hero-headline-part hero-headline-part-right"
            style={{
              display: "block",
              marginTop: "0.12em",
              background: pk.gradientPopular,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: pk.heroHeadlineGlow,
            }}
          >
            {t.headlineLine2Accent}
          </span>
        </h1>

        {/* Paragraph */}
        <p className="hero-subheading" style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 400,
          fontSize: "clamp(14px, 2.0vw, 17px)",
          lineHeight: 1.55,
          color: pk.onDark,
          maxWidth: "640px",
          margin: "0 0 20px 0",
        }}>
          <span className="hero-subheading-part hero-subheading-part-left">
            <span className="hero-subheading-line">{t.subheadingLine1}</span>
            <span className="hero-subheading-line">{t.subheadingLine2}</span>
          </span>
        </p>
        </div>

        <HeroTypingLine messages={typingMessages} />

        {/* Mobile-only: show PC frame under subheading */}
        <div className="hero-mobile-frame" aria-hidden="true">
          <HeroCompositeFrame imgClassName="hero-mobile-frame-img" activeIdx={heroPreviewIdx} />
        </div>

        {/* CTAs */}
        <div className="hero-actions-wrap">
        <div className="hero-cta-row flex flex-wrap items-center justify-center md:justify-start" style={{ gap: "16px" }}>
          <button
            id="hero-primary-cta"
            type="button"
            className="animate-pulse-glow hero-primary-btn landing-primary-cta landing-primary-cta--on-dark"
            onClick={() => navigate("/napiste-nam")}
            style={{
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: `${HERO_CTA_PAD_Y}px ${HERO_CTA_PAD_X}px`,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              lineHeight: 1,
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              transition: "transform 0.25s ease, filter 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-3px)"; b.style.filter = "brightness(1.1)"; }}
            onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.filter = ""; }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)"; }}
          >
            {t.ctaPrimary}
          </button>
          <span className="hero-cta-scribble hero-cta-scribble--desktop" aria-hidden="true">
            {t.scribble}
          </span>
        </div>

        <div className="hero-trust-block">
          <p
            className="hero-trust-under-cta"
            style={{
              marginTop: "14px",
              marginBottom: 0,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(13px, 1.6vw, 15px)",
              lineHeight: 1.45,
              color: pk.onDark,
              textAlign: "center",
              maxWidth: "640px",
            }}
          >
            {t.trustUnderCta}
          </p>

          <div
            className="hero-google-overview"
            style={{
              marginTop: "22px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <div aria-hidden="true" style={{ width: 28, height: 28, flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                <path fill={pk.brandGoogleBlue} d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill={pk.brandGoogleGreen} d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill={pk.brandGoogleYellow} d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill={pk.brandGoogleRed} d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: 18, color: pk.onDark92, lineHeight: 1 }}>
                5.0
              </div>
              <div aria-label="5 out of 5" style={{ display: "inline-flex", gap: 3, color: pk.ratingStar }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        <span className="hero-cta-scribble hero-cta-scribble--mobile" aria-hidden="true">
          {t.scribble}
        </span>

        </div>
            </div>
          </div>
          </div>

          {/* Right media: PC frame (desktop only) */}
          <div className="hero-media" aria-hidden="true">
            <HeroCompositeFrame imgClassName="hero-pc-frame" activeIdx={heroPreviewIdx} />
          </div>
        </div>
      </div>

      {/* Desktop-only: constrain PC frame to page width rail */}
      <div
        className="hero-media-rail"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(100%, 1400px)",
          pointerEvents: "none",
          /* Above .hero-shell (z-10) so gallery dots receive clicks */
          zIndex: 20,
        }}
      >
        <div className="hero-media-rail-anchor">
          <div className="hero-media-rail-inner">
            <HeroCompositeFrame imgClassName="hero-pc-frame" activeIdx={heroPreviewIdx} />
          </div>
          <HeroFrameDots
            className="hero-media-rail-dots"
            activeIdx={heroPreviewIdx}
            onSelect={selectHeroPreview}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.3; }
        }
        @keyframes heroRevealLeft {
          from { opacity: 0; transform: translateX(-40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes heroRevealRight {
          from { opacity: 0; transform: translateX(40px); filter: blur(10px); }
          to { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-scroll-dot { animation: scroll-dot 1.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-scroll-dot { animation: none; } }
        @keyframes heroTypingCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .hero-typing-cursor {
          display: inline-block;
          margin-left: 1px;
          font-weight: 400;
          animation: heroTypingCursorBlink 1s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-typing-cursor { animation: none; opacity: 1; }
        }
        .hero-typing-inner {
          display: contents;
        }
        @media (min-width: 769px) {
          .hero-typing-line {
            justify-content: flex-start !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        #hero-primary-cta:focus-visible {
          outline: 2px solid var(--pk-accent); outline-offset: 3px;
        }
        .hero-cta-scribble {
          display: none;
        }
        .hero-cta-scribble--mobile {
          display: none !important;
        }
        @media (min-width: 901px) {
          .hero-cta-row {
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: flex-start;
            gap: 18px;
            width: auto;
            max-width: none;
          }
          .hero-cta-scribble--desktop {
            display: inline-block;
            flex-shrink: 0;
            font-family: "Caveat", cursive !important;
            font-weight: 600;
            font-style: normal;
            font-size: 34.65px;
            line-height: 1;
            white-space: nowrap;
            color: #fff;
            pointer-events: none;
            transform: translate(-90px, 130px) rotate(-6deg);
            clip-path: inset(0 100% 0 0);
            opacity: 0;
            transition:
              clip-path 2s linear,
              opacity 0.35s linear;
            will-change: clip-path, opacity;
          }
          .hero-section-mobile.play-entrance .hero-cta-scribble--desktop {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transition-delay: 2600ms;
          }
          .hero-section-mobile.hero-entrance-done .hero-cta-scribble--desktop {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transition: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cta-scribble--desktop,
          .hero-cta-scribble--mobile {
            opacity: 1 !important;
            clip-path: inset(0 0 0 0) !important;
            transition: none !important;
          }
        }
        .hero-headline-line1.hero-headline-part {
          display: block;
        }
        .hero-headline-line2.hero-headline-part {
          display: block !important;
        }
        .hero-headline-part,
        .hero-subheading-part,
        .hero-actions-wrap{
          display: inline-block;
          will-change: transform, opacity, filter;
          animation-fill-mode: forwards;
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-headline-part-left{
            opacity: 0;
            transform: translateX(-40px);
            filter: blur(10px);
          }
          .hero-headline-part-right{
            opacity: 0;
            transform: translateX(40px);
            filter: blur(10px);
          }
          .hero-subheading-part-left{
            opacity: 0;
            transform: translateX(-40px);
            filter: blur(10px);
          }
          .hero-actions-wrap{
            opacity: 0;
            transform: translateY(24px);
          }
          .hero-section-mobile.hero-entrance-done .hero-headline-part,
          .hero-section-mobile.hero-entrance-done .hero-subheading-part,
          .hero-section-mobile.hero-entrance-done .hero-actions-wrap{
            opacity: 1;
            transform: none;
            filter: none;
          }
          .hero-section-mobile.play-entrance .hero-headline-part-left{
            animation: heroRevealLeft 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          }
          .hero-section-mobile.play-entrance .hero-headline-part-right{
            animation: heroRevealRight 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
          }
          .hero-section-mobile.play-entrance .hero-subheading-part-left{
            animation: heroRevealLeft 900ms cubic-bezier(0.2,0.8,0.2,1) forwards;
            animation-delay: 1000ms;
          }
          .hero-section-mobile.play-entrance .hero-actions-wrap{
            animation: heroFadeUp 700ms cubic-bezier(0.2,0.8,0.2,1) forwards;
            animation-delay: 2000ms;
          }
        }
        .hero-subheading-part{
          display: block;
        }
        .hero-content-wrap {
          text-align: center;
        }
        .hero-grid{
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: center;
        }
        .hero-left-rail{
          width: 100%;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 24px;
          padding-right: 24px;
          box-sizing: border-box;
        }
        .hero-media{
          display: none;
        }
        .hero-mobile-frame{ display:none; }
        .hero-media-rail{ display:none; }
        .hero-media-rail-anchor{ display:none; }
        .hero-media-rail-inner{ display:none; }
        @media (min-width: 769px) {
          .hero-actions-wrap {
            margin-top: 20px;
          }
          .hero-content-shift{
            transform: translateY(-20px);
          }
          .hero-heading-block {
            transform: translateY(-30px);
          }
          .hero-trust-under-cta {
            text-align: left !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          .hero-google-overview {
            justify-content: flex-start !important;
          }
          /*
            Fluid desktop type: continuous vw/cqi scaling (no stepped breakpoints)
            so size eases as the viewport narrows beside the right-side frame.
          */
          .hero-content-wrap {
            container-type: inline-size;
            container-name: hero-copy;
          }
          .hero-headline {
            /* Fallback fluid size; JS fit overrides with exact px on desktop */
            font-size: clamp(15.5px, 7.2cqi + 0.35rem, 41.6px) !important;
            transition: font-size 160ms ease;
          }
          .hero-subheading {
            font-size: clamp(13.5px, 3.05cqi + 0.45rem, 22.1px) !important;
            line-height: 1.5 !important;
            transition: font-size 160ms ease;
          }
          .hero-typing-line {
            font-size: clamp(13.5px, 3.2cqi + 0.4rem, 26px) !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            justify-content: flex-start !important;
            transition: font-size 160ms ease;
          }
          /* Lock desktop line counts — shrink type instead of adding wraps */
          .hero-headline-line1,
          .hero-headline-line2 {
            white-space: nowrap;
          }
          .hero-subheading-part {
            display: block;
          }
          .hero-subheading-line {
            display: block;
            white-space: nowrap;
          }
          /* Left content aligns with header logo rail */
          .hero-left-rail{
            padding-right: 20px;
          }
          .hero-section-mobile{
            /* Keep hero tall enough to match the standard notebook/video visual height */
            min-height: 860px !important;
          }
          /* padding-top avoids margin-collapse (child margin-top was not visible). */
          .hero-left-rail > .hero-content-shift {
            padding-top: 60px !important;
            box-sizing: border-box;
          }
          .hero-content-wrap{
            max-width: 50%;
          }
          .hero-grid{
            display: block;
            position: relative;
          }
          /* Use page-width rail for right media alignment */
          .hero-media{ display:none !important; }
          .hero-media-rail{ display:block !important; }
          .hero-media-rail-anchor{
            display: flex !important;
            flex-direction: column;
            align-items: flex-end;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(calc(-50% + 50px));
            /* Layout width = former visual size after scale(0.78848) — avoids transform blur */
            width: min(44.15488vw, 725.4016px);
            max-width: 725.4016px;
            pointer-events: none;
          }
          .hero-media-rail-inner{
            display: block !important;
            width: 100%;
            pointer-events: none;
          }
          .hero-media-rail-inner .hero-composite-anim{
            pointer-events: none;
          }
          .hero-media-rail-dots{
            pointer-events: auto !important;
            z-index: 30;
            margin-top: 18px;
            width: 100%;
            align-self: flex-end;
            opacity: 0;
          }
          .hero-section-mobile.hero-entrance-done .hero-media-rail-dots {
            opacity: 1;
          }
          @media (prefers-reduced-motion: no-preference) {
            .hero-section-mobile.play-entrance .hero-media-rail-dots {
              animation: heroCompositeFadeIn 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
              animation-delay: 1000ms;
            }
          }
          .hero-media-rail-inner .hero-pc-frame{
            width: 100%;
            height: auto;
            display: block;
          }
          /* Whole composite (frame + screen clips) fades in in place — 1s */
          .hero-media-rail-inner .hero-composite-anim {
            opacity: 0;
            will-change: opacity;
          }
          .hero-section-mobile.hero-entrance-done .hero-media-rail-inner .hero-composite-anim {
            opacity: 1;
          }
          @media (prefers-reduced-motion: no-preference) {
            .hero-section-mobile.play-entrance .hero-media-rail-inner .hero-composite-anim {
              animation: heroCompositeFadeIn 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
              animation-delay: 1000ms;
            }
          }
          .hero-content-wrap {
            text-align: left;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
          }
          .hero-headline,
          .hero-subheading {
            box-sizing: border-box;
          }
          .hero-headline {
            width: auto !important;
            max-width: 100% !important;
            box-sizing: border-box;
          }
          .hero-subheading {
            width: auto !important;
            max-width: 100% !important;
          }
          .hero-typing-line {
            max-width: 100% !important;
            width: 100% !important;
          }
          .hero-headline {
            margin-left: 0;
            margin-right: 0;
          }
          .hero-subheading {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        @keyframes heroCompositeFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        /* ── Mobile hero adjustments ────────────── */
        @media (max-width: 768px) {
          .hero-section-mobile{
            min-height: auto !important;
            padding-top: 112px !important;
            padding-bottom: 36px !important;
            margin-top: 0 !important;
          }
          .hero-rating-pill { display: none !important; }
          .hero-subheading{ display:block !important; }
          .hero-mobile-frame{
            display:block !important;
            width: min(520px, 100%);
            margin: 2px auto 26px;
            opacity: 0.98;
            filter: drop-shadow(0 18px 40px var(--pk-slate-tint-16));
          }
          .hero-mobile-frame-img{
            opacity: 1;
            transform: none;
            will-change: auto;
          }
          .hero-mobile-frame .hero-composite-anim {
            opacity: 0;
            will-change: opacity;
          }
          .hero-section-mobile.hero-entrance-done .hero-mobile-frame .hero-composite-anim {
            opacity: 1;
          }
          @media (prefers-reduced-motion: no-preference) {
            .hero-section-mobile.play-entrance .hero-mobile-frame .hero-composite-anim {
              animation: heroCompositeFadeIn 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
              animation-delay: 1000ms;
            }
          }
          .hero-shell {
            /* Match section page shell (CoNabízíme 24px) */
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .hero-left-rail > .hero-content-shift {
            padding-top: 0 !important;
          }
          .hero-content-wrap {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin-top: 24px !important;
          }
          /* Override entrance inline-block so CTA can span the offer-width rail */
          .hero-actions-wrap {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            box-sizing: border-box;
            padding-left: 15px;
            padding-right: 15px;
          }
          .hero-headline {
            font-size: min(26.22px, 8.19vw) !important;
            line-height: 1.12 !important;
            max-width: 100% !important;
            margin-bottom: 10px !important;
          }
          .hero-headline-line1,
          .hero-headline-line2 {
            display: block !important;
            white-space: nowrap;
          }
          .hero-headline-line2 {
            margin-top: 0.1em !important;
          }
          .hero-subheading {
            max-width: 340px !important;
            font-size: 14px !important;
            line-height: 1.5 !important;
            margin-left: auto !important;
            margin-right: auto !important;
            margin-bottom: 22px !important;
          }
          .hero-subheading-line {
            white-space: normal;
          }
          .hero-trust-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            margin-top: 12px;
          }
          .hero-trust-under-cta {
            margin-top: 0 !important;
            margin-left: auto !important;
            margin-right: auto !important;
            font-size: 13px !important;
            line-height: 1.4 !important;
          }
          .hero-google-overview {
            margin-top: 0 !important;
            justify-content: center !important;
            gap: 10px !important;
          }
          .hero-typing-inner {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            max-width: 100%;
            flex-wrap: wrap;
          }
          .hero-typing-line {
            font-size: clamp(14px, 3.6vw, 20px) !important;
            min-height: 36px !important;
            justify-content: center !important;
            flex-wrap: wrap !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-typing-text {
            flex: 0 1 auto !important;
            text-align: center !important;
            white-space: normal !important;
            justify-content: center;
          }
          .hero-cta-row {
            display: flex !important;
            flex-wrap: nowrap !important;
            justify-content: stretch !important;
            gap: 0 !important;
            width: 100%;
            max-width: 100%;
          }
          .hero-cta-scribble--desktop {
            display: none !important;
          }
          .hero-cta-scribble--mobile {
            display: block !important;
            font-family: "Caveat", cursive !important;
            font-weight: 600;
            font-style: normal;
            font-size: 21px;
            line-height: 1;
            white-space: nowrap;
            color: #fff;
            pointer-events: none;
            transform: rotate(-4deg);
            margin: 14px auto 0;
            text-align: center;
            clip-path: inset(0 100% 0 0);
            opacity: 0;
            transition:
              clip-path 2s linear,
              opacity 0.35s linear;
            will-change: clip-path, opacity;
          }
          .hero-section-mobile.play-entrance .hero-cta-scribble--mobile {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transition-delay: 2600ms;
          }
          .hero-section-mobile.hero-entrance-done .hero-cta-scribble--mobile {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transition: none;
          }
          .hero-primary-btn {
            flex: 1 1 auto;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0;
            box-sizing: border-box;
            padding: 11px 22px !important;
            font-size: 13px !important;
            font-weight: 700 !important;
            letter-spacing: 0.06em !important;
            line-height: 1 !important;
            text-transform: uppercase !important;
            white-space: nowrap !important;
            min-height: 37px !important;
            justify-content: center;
          }
        }
        /* Very short phones: keep scribble from crowding the trust stack */
        @media (max-width: 768px) and (max-height: 700px) {
          .hero-cta-scribble--mobile {
            display: none !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-mobile-frame-img{
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
          .hero-media-rail-inner .hero-composite-anim,
          .hero-mobile-frame .hero-composite-anim,
          .hero-media-rail-dots {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};
