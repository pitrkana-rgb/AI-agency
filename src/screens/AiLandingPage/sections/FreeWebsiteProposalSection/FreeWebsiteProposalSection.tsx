import { useEffect, useState } from "react";
import { CheckCircle2, ClipboardPen, Monitor } from "lucide-react";
import {
  hasBeenRevealed,
  markRevealedById,
  useInViewOnce,
} from "../../../../hooks/useInViewOnce";
import { useLanguage } from "../../../../i18n/LanguageContext";
import { scrollToSectionId } from "../../../../utils/scrollToSection";
import { pk } from "../../../../design/pkLandingColors";

const ENTRANCE_ID = "free-website-proposal-entrance";
const ICON_GRAD_ID = "freeProposalIconGrad";

type ProposalStep = {
  title: string;
  body: string;
  icon: "form" | "monitor" | "check";
};

const StepIcon = ({ type }: { type: ProposalStep["icon"] }): JSX.Element => {
  const props = {
    size: 42,
    strokeWidth: 1.75,
    color: `url(#${ICON_GRAD_ID})`,
    "aria-hidden": true as const,
  };
  if (type === "form") return <ClipboardPen {...props} />;
  if (type === "monitor") return <Monitor {...props} />;
  return <CheckCircle2 {...props} />;
};

export const FreeWebsiteProposalSection = (): JSX.Element => {
  const { language } = useLanguage();
  const isEn = language === "en";
  const [sectionRef, inView] = useInViewOnce({
    id: "free-website-proposal",
    threshold: 0.28,
    rootMargin: "0px 0px -8% 0px",
  });
  const alreadyPlayed = hasBeenRevealed(ENTRANCE_ID);
  const [revealed, setRevealed] = useState(alreadyPlayed);

  useEffect(() => {
    if (!inView || revealed) return;
    setRevealed(true);
    markRevealedById(ENTRANCE_ID);
  }, [inView, revealed]);

  const animClass = revealed ? " is-revealed" : "";

  const t = isEn
    ? {
        headingLinesDesktop: [
          { text: "Get a free", tone: "plain" as const },
          { text: "website proposal", tone: "plain" as const },
          { text: "in 3 days,", tone: "gradient" as const },
          { text: "no strings attached", tone: "gradient" as const },
        ],
        headingLinesMobile: [
          { text: "Get a free website proposal", tone: "plain" as const },
          { text: "in 3 days, no strings attached", tone: "gradient" as const },
        ],
        steps: [
          {
            title: "Fill out a form",
            body: "Tell me a few details about your project.",
            icon: "form" as const,
          },
          {
            title: "Proposal in 3 days",
            body: "I’ll prepare a homepage concept for your website.",
            icon: "monitor" as const,
          },
          {
            title: "You decide",
            body: "No commitment and no hidden conditions.",
            icon: "check" as const,
          },
        ],
        scribble: "Non-binding & free",
        cta: "I want a free proposal",
      }
    : {
        headingLinesDesktop: [
          { text: "Získejte návrh", tone: "plain" as const },
          { text: "webu zdarma", tone: "plain" as const },
          { text: "do 3 dnů", tone: "gradient" as const },
          { text: "bez závazků", tone: "gradient" as const },
        ],
        headingLinesMobile: [
          { text: "Získejte návrh webu zdarma", tone: "plain" as const },
          { text: "do 3 dnů bez závazků", tone: "gradient" as const },
        ],
        steps: [
          {
            title: "Vyplňte formulář",
            body: "Řekněte mi pár informací o vašem projektu.",
            icon: "form" as const,
          },
          {
            title: "Návrh do 3 dnů",
            body: "Připravím návrh úvodní stránky vašeho webu.",
            icon: "monitor" as const,
          },
          {
            title: "Rozhodnete se",
            body: "Bez závazků a skrytých podmínek.",
            icon: "check" as const,
          },
        ],
        scribble: "Nezávazně a zdarma",
        cta: "Chci návrh zdarma",
      };

  return (
    <section
      ref={sectionRef}
      className={`free-proposal-section${animClass}`}
      aria-labelledby="free-proposal-heading"
      style={{
        width: "100%",
        background: pk.hero,
        color: pk.onDark,
      }}
    >
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id={ICON_GRAD_ID} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--pk-accent-magenta)" />
            <stop offset="100%" stopColor="var(--pk-accent)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="free-proposal-inner">
        <div className="free-proposal-copy">
          <h2
            id="free-proposal-heading"
            className="pk-section-heading pk-section-heading--on-dark free-proposal-heading"
          >
            <span className="free-proposal-heading-desktop">
              {t.headingLinesDesktop.map((line, index) => (
                <span
                  key={`d-${line.text}-${index}`}
                  className={[
                    "free-proposal-heading-line",
                    "free-proposal-anim",
                    index < 2 ? "free-proposal-anim--heading" : "free-proposal-anim--subheading",
                    line.tone === "gradient" ? "free-proposal-heading-gradient" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {line.text}
                </span>
              ))}
            </span>
            <span className="free-proposal-heading-mobile">
              {t.headingLinesMobile.map((line, index) => (
                <span
                  key={`m-${line.text}-${index}`}
                  className={[
                    "free-proposal-heading-line",
                    "free-proposal-anim",
                    index === 0 ? "free-proposal-anim--heading" : "free-proposal-anim--subheading",
                    line.tone === "gradient" ? "free-proposal-heading-gradient" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {line.text}
                </span>
              ))}
            </span>
          </h2>
        </div>

        <ol className="free-proposal-steps" aria-label={isEn ? "How it works" : "Jak to funguje"}>
          {t.steps.map((step, index) => (
            <li
              key={step.title}
              className={`free-proposal-step free-proposal-anim free-proposal-anim--step-${index + 1}`}
            >
              {index > 0 ? (
                <span className="free-proposal-step-arrow" aria-hidden="true">
                  ›
                </span>
              ) : null}
              <div className="free-proposal-step-card">
                <span className="free-proposal-step-icon">
                  <StepIcon type={step.icon} />
                </span>
                <h3 className="free-proposal-step-title">{step.title}</h3>
                <p className="free-proposal-step-body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="free-proposal-cta-col">
          <div
            className="free-proposal-scribble free-proposal-anim free-proposal-anim--scribble"
            aria-hidden="true"
          >
            <span className="free-proposal-scribble-text">{t.scribble}</span>
            <svg
              className="free-proposal-scribble-arrow"
              viewBox="0 0 72 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 10C22 8 48 12 58 22C62 26 64 32 62 38"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M54 30L62 39L50 37"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <button
            type="button"
            className="free-proposal-cta free-proposal-anim free-proposal-anim--cta"
            onClick={() => scrollToSectionId("kontakt")}
          >
            {t.cta}
          </button>
        </div>
      </div>

      <style>{`
        .free-proposal-section {
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgb(255 255 255 / 0.06);
          border-bottom: 1px solid rgb(255 255 255 / 0.06);
        }
        .free-proposal-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 70% at 12% 40%, rgb(224 64 251 / 0.1), transparent 60%),
            radial-gradient(ellipse 50% 65% at 88% 55%, rgb(0 229 255 / 0.08), transparent 58%);
        }
        .free-proposal-inner {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 24px 48px;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.55fr) minmax(250px, 0.85fr);
          gap: 36px 36px;
          align-items: center;
        }
        .free-proposal-copy {
          min-width: 0;
        }
        .free-proposal-heading {
          margin: 0;
        }
        .free-proposal-heading-desktop {
          display: contents;
        }
        .free-proposal-heading-mobile {
          display: none;
        }
        .free-proposal-heading-line {
          display: block;
          white-space: nowrap;
        }
        .free-proposal-heading-gradient {
          background-image: var(--pk-gradient-popular);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .free-proposal-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 20px;
          min-width: 0;
        }
        .free-proposal-step {
          position: relative;
          flex: 1 1 0;
          min-width: 0;
          display: flex;
          align-items: stretch;
        }
        .free-proposal-step-arrow {
          position: absolute;
          left: -10px;
          top: 18px;
          transform: translateX(-50%);
          color: rgb(255 255 255 / 0.55);
          font-size: 22px;
          font-weight: 300;
          line-height: 1;
          z-index: 2;
          pointer-events: none;
        }
        .free-proposal-step-card {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 4px 0 0;
        }
        .free-proposal-step:last-child .free-proposal-step-card {
          padding-right: 0;
        }
        .free-proposal-step-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          filter: drop-shadow(0 0 10px rgb(224 64 251 / 0.28));
        }
        .free-proposal-step-icon svg {
          width: 42px;
          height: 42px;
        }
        .free-proposal-step-title {
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 19.2px;
          line-height: 1.25;
          letter-spacing: -0.015em;
          color: var(--pk-on-dark);
          white-space: nowrap;
        }
        .free-proposal-step-body {
          margin: 0 auto;
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 15.6px;
          line-height: 1.4;
          color: rgb(255 255 255 / 0.58);
          width: 100%;
          max-width: 100%;
          text-align: center;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          overflow: hidden;
        }
        .free-proposal-cta-col {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          gap: 14px;
          min-width: 0;
          padding-left: 28px;
          border-left: 1px solid rgb(255 255 255 / 0.12);
        }
        .free-proposal-scribble {
          position: absolute;
          top: -23px;
          right: 28px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0;
          color: #d06dff;
          pointer-events: none;
          transform: rotate(-6deg);
        }
        .free-proposal-scribble-text {
          display: inline-block;
          font-family: "Caveat", cursive !important;
          font-weight: 600;
          font-style: normal;
          font-size: 28px;
          line-height: 1;
          white-space: nowrap;
          clip-path: inset(0 100% 0 0);
          opacity: 0;
          transition:
            clip-path 1.05s cubic-bezier(0.22, 1, 0.36, 1),
            opacity 0.35s ease;
          will-change: clip-path, opacity;
        }
        .free-proposal-scribble-arrow {
          width: 56px;
          height: 38px;
          margin-right: 18px;
          margin-top: -2px;
          opacity: 0;
          transform: translate3d(-12px, 0, 0);
          transition:
            opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .free-proposal-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 34px;
          padding: 11px 22px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          background-image: var(--pk-gradient-popular);
          color: #fff;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 13px;
          line-height: 1;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          min-height: 37px;
          box-sizing: border-box;
          box-shadow:
            1px 2px 4px rgb(2 6 23 / 0.18),
            4px 8px 16px -2px rgb(224 64 251 / 0.35),
            8px 14px 24px -6px rgb(0 229 255 / 0.28);
          transition:
            transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.28s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.28s ease;
        }
        .free-proposal-cta:hover,
        .free-proposal-cta:focus-visible {
          transform: translateY(-2px) scale(1.01);
          filter: brightness(1.05);
          box-shadow:
            2px 3px 6px rgb(2 6 23 / 0.22),
            6px 12px 22px -2px rgb(224 64 251 / 0.45),
            10px 18px 32px -6px rgb(0 229 255 / 0.36);
        }
        .free-proposal-section.is-revealed .free-proposal-cta:hover,
        .free-proposal-section.is-revealed .free-proposal-cta:focus-visible {
          transform: translateY(-2px) scale(1.01);
        }
        .free-proposal-cta:focus-visible {
          outline: 2px solid var(--pk-accent);
          outline-offset: 3px;
        }

        /* Entrance animation — start hidden */
        .free-proposal-anim {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .free-proposal-anim--scribble {
          opacity: 1;
          transform: rotate(-6deg);
          transition: none;
        }
        .free-proposal-section.is-revealed .free-proposal-anim--heading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 0ms;
        }
        .free-proposal-section.is-revealed .free-proposal-anim--subheading {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 280ms;
        }
        .free-proposal-anim--step-1,
        .free-proposal-anim--step-2,
        .free-proposal-anim--step-3 {
          transition-duration: 0.47s;
        }
        .free-proposal-section.is-revealed .free-proposal-anim--step-1 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 520ms;
        }
        .free-proposal-section.is-revealed .free-proposal-anim--step-2 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 853ms;
        }
        .free-proposal-section.is-revealed .free-proposal-anim--step-3 {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 1187ms;
        }
        .free-proposal-section.is-revealed .free-proposal-anim--cta {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 1520ms;
        }
        .free-proposal-section.is-revealed .free-proposal-scribble-text {
          opacity: 1;
          clip-path: inset(0 0 0 0);
          transition-delay: 1853ms;
        }
        .free-proposal-section.is-revealed .free-proposal-scribble-arrow {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          transition-delay: 2120ms;
        }

        /* Smaller desktop / laptop — keep horizontal layout, tighten spacing */
        @media (max-width: 1180px) and (min-width: 769px) {
          .free-proposal-inner {
            grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.45fr) minmax(190px, 0.72fr);
            gap: 18px 18px;
            padding: 28px 20px 40px;
          }
          .free-proposal-heading {
            font-size: clamp(22px, 2.6vw, 34px);
          }
          .free-proposal-heading-line {
            white-space: normal;
          }
          .free-proposal-steps {
            gap: 8px;
          }
          .free-proposal-step-arrow {
            left: -6px;
            font-size: 18px;
          }
          .free-proposal-step-icon {
            width: 36px;
            height: 36px;
          }
          .free-proposal-step-icon svg {
            width: 36px;
            height: 36px;
          }
          .free-proposal-step-title {
            font-size: 15px;
            white-space: normal;
          }
          .free-proposal-step-body {
            font-size: 13px;
            line-height: 1.35;
            max-width: none;
            -webkit-line-clamp: 3;
            line-clamp: 3;
          }
          .free-proposal-cta-col {
            padding-left: 16px;
            border-left: 1px solid rgb(255 255 255 / 0.12);
            border-top: none;
            padding-top: 0;
            max-width: none;
          }
          .free-proposal-cta {
            margin-top: 28px;
            padding: 11px 12px;
            font-size: 11px;
            letter-spacing: 0.04em;
          }
          .free-proposal-scribble {
            right: 4px;
            top: -18px;
            left: auto;
          }
          .free-proposal-scribble-text {
            font-size: 22px;
          }
          .free-proposal-scribble-arrow {
            width: 48px;
            height: 32px;
            margin-right: 10px;
          }
        }

        @media (max-width: 768px) {
          .free-proposal-inner {
            grid-template-columns: 1fr;
            padding: 20px 24px;
            gap: 30px;
          }
          .free-proposal-copy,
          .free-proposal-heading {
            text-align: center;
          }
          .free-proposal-heading-desktop {
            display: none;
          }
          .free-proposal-heading-mobile {
            display: contents;
          }
          .free-proposal-heading-line {
            white-space: normal;
          }
          .free-proposal-steps {
            flex-direction: column;
            gap: 0;
          }
          .free-proposal-step {
            flex: none;
            width: 100%;
          }
          .free-proposal-step-arrow {
            left: 14px;
            top: -2px;
            transform: rotate(90deg);
            font-size: 20px;
          }
          .free-proposal-step-card {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            text-align: left;
            column-gap: 14px;
            row-gap: 6px;
            padding: 18px 0;
            border-bottom: 1px solid rgb(255 255 255 / 0.08);
          }
          .free-proposal-step:last-child .free-proposal-step-card {
            border-bottom: none;
            padding-bottom: 4px;
          }
          .free-proposal-step-icon {
            flex-shrink: 0;
            width: 30px;
            height: 30px;
          }
          .free-proposal-step-icon svg {
            width: 30px;
            height: 30px;
          }
          .free-proposal-step-title {
            flex: 1 1 0;
            min-width: 0;
            align-self: center;
            font-size: 15.5px;
            text-align: left;
          }
          .free-proposal-step-body {
            width: 100%;
            padding-left: 44px;
            font-size: 13px;
            text-align: left;
            max-width: none;
            -webkit-line-clamp: unset;
            line-clamp: unset;
            display: block;
            overflow: visible;
          }
          .free-proposal-cta-col {
            max-width: none;
            width: 100%;
            box-sizing: border-box;
            padding-top: 22px;
            padding-left: 15px;
            padding-right: 15px;
            gap: 12px;
            align-items: stretch;
            border-left: none;
            border-top: 1px solid rgb(255 255 255 / 0.12);
          }
          .free-proposal-scribble {
            position: static;
            align-self: center;
            transform: rotate(-4deg);
            margin-bottom: 2px;
          }
          .free-proposal-anim--scribble {
            transform: rotate(-4deg);
          }
          .free-proposal-scribble-text {
            font-size: 26px;
          }
          .free-proposal-scribble-arrow {
            display: none;
          }
          .free-proposal-cta {
            margin-top: 0;
            min-height: 37px;
            font-size: 13px;
            padding: 11px 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .free-proposal-anim {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .free-proposal-scribble,
          .free-proposal-anim--scribble {
            transform: rotate(-6deg) !important;
          }
          .free-proposal-scribble-text,
          .free-proposal-scribble-arrow {
            opacity: 1 !important;
            clip-path: none !important;
            transform: none !important;
            transition: none !important;
          }
          .free-proposal-cta,
          .free-proposal-cta:hover,
          .free-proposal-cta:focus-visible {
            transition: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};
