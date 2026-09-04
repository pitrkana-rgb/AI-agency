import { useId, useState, type CSSProperties } from "react";
import { AppWindow, ChevronDown, MousePointer2, Smartphone, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import { useEntranceOnce } from "../../hooks/useInViewOnce";
import { pk } from "../../design/pkLandingColors";
import {
  headerPrimaryCtaClassName,
  headerPrimaryCtaStyle,
} from "../../design/headerCtaStyle";

const CENIK_CARDS_ENTRANCE_ID = "cenik-cards-entrance";
const CENIK_CARD_STAGGER_S = 0.5;
const CENIK_CARD_ENTER_MS = 900;

type PricingPlan = {
  id: string;
  category: string;
  tier: string;
  price: string;
  suitedFor: string;
  features: string[];
  highlighted?: boolean;
  /** 1–3 complexity stars */
  stars: 1 | 2 | 3;
  variant: "website" | "app";
};

const VISIBLE_FEATURES = 4;

const plansCs: PricingPlan[] = [
  {
    id: "landing",
    category: "Landing page",
    tier: "BASIC web na míru",
    price: "od 9 490 Kč",
    suitedFor: "Vhodné pro podnikatele, kampaně a blogy",
    stars: 1,
    variant: "website",
    features: [
      "Jednostránkový web na míru",
      "Responzivní design pro mobil i desktop",
      "Kontaktní / poptávkový formulář",
      "Základní SEO nastavení",
      "Google Analytics a měření návštěvnosti",
      "Propojení se sociálními sítěmi",
      "Nasazení na vlastní doménu",
      "Zabezpečení webu a SSL certifikát",
    ],
  },
  {
    id: "business",
    category: "Firemní web",
    tier: "BUSINESS web na míru",
    price: "od 19 490 Kč",
    suitedFor: "Vhodné pro malé a střední firmy",
    highlighted: true,
    stars: 2,
    variant: "website",
    features: [
      "Vícestránkový firemní web",
      "Responzivní design pro mobil i desktop",
      "Design přizpůsobený firemní identitě",
      "Kontaktní a poptávkové formuláře",
      "Pokročilé SEO nastavení",
      "Google Analytics a měření konverzí",
      "Správa a jednoduchá aktualizace obsahu",
      "Reference, galerie, aktuality nebo blog",
      "Propojení se sociálními sítěmi",
      "Nasazení na vlastní doménu + SSL",
    ],
  },
  {
    id: "enterprise",
    category: "Pokročilý web",
    tier: "ENTERPRISE web na míru",
    price: "od 49 490 Kč",
    suitedFor: "Vhodné pro větší firmy a AI řešení",
    stars: 3,
    variant: "website",
    features: [
      "Rozsáhlý web kompletně na míru",
      "Individuální UX/UI a struktura webu",
      "Pokročilé animace a interaktivní prvky",
      "Vlastní administrační rozhraní",
      "Databáze a dynamický obsah",
      "Pokročilé formuláře a workflow",
      "Pokročilé SEO a technická optimalizace",
      "Google Analytics a měření konverzí",
      "Integrace externích služeb a API",
      "Napojení CRM a dalších systémů",
      "Automatizace firemních procesů",
      "AI funkce a chytré nástroje",
    ],
  },
  {
    id: "custom",
    category: "Webová aplikace",
    tier: "CUSTOM aplikace",
    price: "od 29 490 Kč",
    suitedFor: "Vhodné pro webové a mobilní aplikace",
    stars: 3,
    variant: "app",
    features: [
      "Webová aplikace vyvinutá na míru",
      "Individuální UX/UI aplikace",
      "Uživatelské účty a zabezpečené přihlášení",
      "Uživatelské role a oprávnění",
      "Vlastní administrační rozhraní",
      "Databáze a pokročilá práce s daty",
      "Automatizované procesy a workflow",
      "Integrace externích systémů a API",
      "Napojení CRM, ERP a dalších nástrojů",
      "AI funkce a automatizace na míru",
      "Reporting, dashboardy a analytika",
      "Individuální funkcionality podle zadání",
    ],
  },
];

const plansEn: PricingPlan[] = [
  {
    id: "landing",
    category: "Landing page",
    tier: "BASIC custom website",
    price: "from CZK 9,490",
    suitedFor: "Ideal for entrepreneurs, campaigns, and blogs",
    stars: 1,
    variant: "website",
    features: [
      "Custom one-page website",
      "Responsive design for mobile and desktop",
      "Contact / inquiry form",
      "Basic SEO setup",
      "Google Analytics and traffic measurement",
      "Social media integration",
      "Deployment on your own domain",
      "Website security and SSL certificate",
    ],
  },
  {
    id: "business",
    category: "Business website",
    tier: "BUSINESS custom website",
    price: "from CZK 19,490",
    suitedFor: "Ideal for small and medium-sized businesses",
    highlighted: true,
    stars: 2,
    variant: "website",
    features: [
      "Multi-page business website",
      "Responsive design for mobile and desktop",
      "Design tailored to your brand identity",
      "Contact and inquiry forms",
      "Advanced SEO setup",
      "Google Analytics and conversion tracking",
      "Simple content management and updates",
      "References, gallery, news, or blog",
      "Social media integration",
      "Deployment on your own domain + SSL",
    ],
  },
  {
    id: "enterprise",
    category: "Advanced website",
    tier: "ENTERPRISE custom website",
    price: "from CZK 49,490",
    suitedFor: "Ideal for larger companies and AI solutions",
    stars: 3,
    variant: "website",
    features: [
      "Extensive fully custom website",
      "Individual UX/UI and site structure",
      "Advanced animations and interactive elements",
      "Custom admin interface",
      "Database and dynamic content",
      "Advanced forms and workflows",
      "Advanced SEO and technical optimization",
      "Google Analytics and conversion tracking",
      "External services and API integrations",
      "CRM and other system connections",
      "Business process automation",
      "AI features and smart tools",
    ],
  },
  {
    id: "custom",
    category: "Web application",
    tier: "CUSTOM application",
    price: "from CZK 29,490",
    suitedFor: "Ideal for web and mobile applications",
    stars: 3,
    variant: "app",
    features: [
      "Custom-built web application",
      "Individual application UX/UI",
      "User accounts and secure login",
      "User roles and permissions",
      "Custom admin interface",
      "Database and advanced data handling",
      "Automated processes and workflows",
      "External systems and API integrations",
      "CRM, ERP and other tool connections",
      "Custom AI features and automation",
      "Reporting, dashboards and analytics",
      "Individual features based on your brief",
    ],
  },
];

const PricingCard = ({
  plan,
  popularLabel,
  showMoreLabel,
  showLessLabel,
  ctaLabel,
  onCta,
  index,
  animateEnter,
}: {
  plan: PricingPlan;
  popularLabel: string;
  showMoreLabel: string;
  showLessLabel: string;
  ctaLabel: string;
  onCta: () => void;
  index: number;
  animateEnter: boolean;
}): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const primaryFeatures = plan.features.slice(0, VISIBLE_FEATURES);
  const extraFeatures = plan.features.slice(VISIBLE_FEATURES);
  const hasMore = extraFeatures.length > 0;

  return (
    <article
      className={`cenik-card${plan.highlighted ? " cenik-card--popular" : ""}${
        animateEnter ? " cenik-card--enter" : ""
      }`}
      style={
        animateEnter
          ? ({ ["--cenik-enter-delay" as string]: `${index * CENIK_CARD_STAGGER_S}s` } as CSSProperties)
          : undefined
      }
    >
      {plan.highlighted ? (
        <div className="cenik-card-badge" aria-hidden="true">
          {popularLabel}
        </div>
      ) : null}

      <div className="cenik-card-inner">
        <div className="cenik-card-icon" aria-hidden="true">
          {plan.variant === "app" ? (
            <Smartphone size={28} strokeWidth={1.5} />
          ) : (
            <span className="cenik-card-icon-stack">
              <AppWindow size={28} strokeWidth={1.5} />
              <MousePointer2
                className="cenik-card-pointer"
                size={13}
                strokeWidth={1.75}
              />
            </span>
          )}
          {plan.stars > 0 ? (
            <span className="cenik-card-stars" data-count={plan.stars}>
              {Array.from({ length: plan.stars }, (_, i) => (
                <Star key={i} size={9} strokeWidth={0} fill="currentColor" />
              ))}
            </span>
          ) : null}
        </div>

        <header className="cenik-card-head">
          <p className="cenik-card-category">{plan.category}</p>
          <h3 className="cenik-card-tier">{plan.tier}</h3>
          <p className="cenik-card-price">{plan.price}</p>
          <p className="cenik-card-suited">{plan.suitedFor}</p>
        </header>

        <div className="cenik-card-divider" aria-hidden="true" />

        <div id={listId} className="cenik-card-features-wrap">
          <ul className="cenik-card-features cenik-card-features--checks">
            {primaryFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          {hasMore ? (
            <div
              className={`cenik-features-extra${expanded ? " is-open" : ""}`}
              aria-hidden={!expanded}
            >
              <div className="cenik-features-extra-inner">
                <ul className="cenik-card-features cenik-card-features--checks">
                  {extraFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>

        {hasMore ? (
          <button
            type="button"
            className="cenik-toggle"
            aria-expanded={expanded}
            aria-controls={listId}
            onClick={() => setExpanded((v) => !v)}
          >
            <span>{expanded ? showLessLabel : showMoreLabel}</span>
            <ChevronDown
              size={16}
              strokeWidth={2.25}
              className={`cenik-toggle-icon${expanded ? " is-open" : ""}`}
              aria-hidden
            />
          </button>
        ) : null}

        <button
          type="button"
          className={`${headerPrimaryCtaClassName} cenik-card-cta`}
          style={headerPrimaryCtaStyle}
          onClick={onCta}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  );
};

export const CenikPricingSection = (): JSX.Element => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isEn = language === "en";
  const plans = isEn ? plansEn : plansCs;
  const animateEnter = useEntranceOnce(
    true,
    CENIK_CARDS_ENTRANCE_ID,
    Math.round((plans.length - 1) * CENIK_CARD_STAGGER_S * 1000 + CENIK_CARD_ENTER_MS),
  );

  const t = isEn
    ? {
        heading: "Digital services pricing",
        subheading:
          "Every website is custom-built. Below you’ll find indicative prices by project scope — I always prepare a concrete quote in advance.",
        popular: "Most popular solution",
        showMore: "Show more",
        showLess: "Show less",
        cta: "I'm interested",
        disclaimer:
          "Prices for every project are prepared individually and tailored to a scalable scope of services. These are not fixed service packages, but an indicative overview of options and solution scope. A number of successful and growing companies and entrepreneurs trust our services.",
      }
    : {
        heading: "Ceník digitálních služeb",
        subheading:
          "Každý web tvořím na míru. Níže najdete orientační ceny podle rozsahu projektu – konkrétní nabídku vždy připravím předem.",
        popular: "Nejoblíbenější řešení",
        showMore: "Zobrazit více",
        showLess: "Zobrazit méně",
        cta: "Mám zájem",
        disclaimer:
          "Ceny pro každý projekt připravujeme individuálně a na míru dle škálovatelného rozsahu služeb. Nejedná se o pevně definované balíčky služeb, ale o orientační znázornění možností a rozsahu řešení. Našim službám důvěřuje řada úspěšných a rostoucích firem i podnikatelů.",
      };

  return (
    <section
      className={`cenik-section${animateEnter ? " cenik-section--entering" : ""}`}
      aria-labelledby="cenik-heading"
    >
      <div className="cenik-shell">
        <header className={`cenik-hero${animateEnter ? " cenik-hero--enter" : ""}`}>
          <h1 id="cenik-heading" className="pk-section-heading cenik-heading">
            {t.heading}
          </h1>
          <p className="cenik-subheading section-sub">{t.subheading}</p>
        </header>

        <div className="cenik-grid">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              index={index}
              animateEnter={animateEnter}
              popularLabel={t.popular}
              showMoreLabel={t.showMore}
              showLessLabel={t.showLess}
              ctaLabel={t.cta}
              onCta={() => navigate("/napiste-nam")}
            />
          ))}
        </div>

        <aside
          className={`cenik-disclaimer${animateEnter ? " cenik-disclaimer--enter" : ""}`}
          aria-label={isEn ? "Pricing note" : "Poznámka k cenám"}
        >
          <p>{t.disclaimer}</p>
        </aside>
      </div>

      <style>{`
        .cenik-section {
          width: 100%;
          background: ${pk.page};
          color: ${pk.ink};
          padding: 8px 0 88px;
          overflow: visible;
        }
        .cenik-shell {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          box-sizing: border-box;
          overflow: visible;
        }
        .cenik-hero {
          max-width: 1280px;
          margin: 0 auto 56px;
          text-align: center;
        }
        .cenik-heading {
          margin: 0 0 18px;
        }
        .cenik-subheading {
          margin: 0 auto;
          font-family: "Montserrat", sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 1.65;
          color: ${pk.ink70};
          max-width: 100%;
        }
        .cenik-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
          overflow: visible;
          padding: 36px 8px 52px;
          margin: -12px -8px 0;
        }
        .cenik-card {
          position: relative;
          border-radius: 24px;
          background: transparent;
          transition:
            transform 480ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 16px 40px ${pk.slateTint06};
          height: 100%;
          display: flex;
          flex-direction: column;
          min-width: 0;
          transform: scale(1);
          transform-origin: center center;
          z-index: 1;
          will-change: transform;
        }
        .cenik-card--popular {
          z-index: 3;
          box-shadow: 0 22px 58px ${pk.slateTint12};
          transform: scale(1.1);
        }
        .cenik-section--entering {
          overflow-x: clip;
        }
        .cenik-hero--enter {
          opacity: 0;
          animation: cenik-hero-enter 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.04s forwards;
        }
        .cenik-card--enter {
          opacity: 0;
          pointer-events: none;
          animation: cenik-card-enter ${CENIK_CARD_ENTER_MS}ms cubic-bezier(0.22, 1, 0.36, 1) var(--cenik-enter-delay, 0s) forwards;
        }
        .cenik-card--popular.cenik-card--enter {
          animation-name: cenik-card-enter-popular;
        }
        .cenik-disclaimer--enter {
          opacity: 0;
          animation: cenik-hero-enter 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${
            (plans.length - 1) * CENIK_CARD_STAGGER_S + 0.35
          }s forwards;
        }
        @keyframes cenik-hero-enter {
          from {
            opacity: 0;
            transform: translate3d(0, 14px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes cenik-card-enter {
          from {
            opacity: 0;
            transform: translate3d(min(58vw, 620px), 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        @keyframes cenik-card-enter-popular {
          from {
            opacity: 0;
            transform: translate3d(min(58vw, 620px), 0, 0) scale(1.1);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.1);
          }
        }
        .cenik-card-badge {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          background: ${pk.gradientPopular};
          border-radius: 999px;
          padding: 5px 14px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: ${pk.hero};
          white-space: nowrap;
          box-shadow: 0 8px 20px ${pk.slateTint12};
        }
        .cenik-card-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-height: 0;
          min-width: 0;
          background:
            radial-gradient(ellipse 70% 55% at 50% -8%, ${pk.accent10} 0%, ${pk.accent00} 70%),
            ${pk.page};
          border: 1px solid ${pk.slateTint10};
          border-radius: 24px;
          padding: 26px 14px 22px;
          box-sizing: border-box;
        }
        .cenik-card--popular .cenik-card-inner {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border: 2px solid ${pk.coolGray22};
          border-radius: 22px;
          padding: 28px 14px 24px;
          background:
            radial-gradient(ellipse 70% 60% at 50% -12%, ${pk.accent10} 0%, ${pk.accent00} 68%),
            ${pk.page};
          transition:
            box-shadow 480ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 480ms ease;
        }
        .cenik-card--popular .cenik-card-inner > * {
          position: relative;
          z-index: 1;
        }
        .cenik-card--popular .cenik-card-inner::after {
          content: "";
          position: absolute;
          inset: -8% -35%;
          z-index: 0;
          pointer-events: none;
          background-image: linear-gradient(
            118deg,
            transparent 0%,
            transparent 36%,
            color-mix(in srgb, ${pk.accentMagenta} 7%, transparent) 43%,
            color-mix(in srgb, ${pk.accent} 11%, transparent) 49%,
            color-mix(in srgb, ${pk.accentTeal} 9%, transparent) 54%,
            color-mix(in srgb, ${pk.cyan500} 6%, transparent) 58%,
            transparent 66%,
            transparent 100%
          );
          filter: blur(10px);
          opacity: 0.95;
          transform: translateX(-62%) skewX(-12deg);
          animation: cenik-popular-shimmer 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .cenik-card--popular .cenik-card-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px transparent;
          animation: cenik-popular-border-glow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes cenik-popular-shimmer {
          0%,
          4% {
            transform: translateX(-62%) skewX(-12deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          38% {
            transform: translateX(62%) skewX(-12deg);
            opacity: 0.85;
          }
          44%,
          100% {
            transform: translateX(62%) skewX(-12deg);
            opacity: 0;
          }
        }
        @keyframes cenik-popular-border-glow {
          0%,
          6% {
            box-shadow:
              inset 0 0 0 1px transparent,
              0 0 0 0 transparent;
          }
          20% {
            box-shadow:
              inset 0 0 0 1px color-mix(in srgb, ${pk.accent} 22%, transparent),
              0 0 18px color-mix(in srgb, ${pk.accent} 12%, transparent);
          }
          34% {
            box-shadow:
              inset 0 0 0 1px color-mix(in srgb, ${pk.accentTeal} 18%, transparent),
              0 0 16px color-mix(in srgb, ${pk.cyan500} 10%, transparent);
          }
          46%,
          100% {
            box-shadow:
              inset 0 0 0 1px transparent,
              0 0 0 0 transparent;
          }
        }
        .cenik-card-icon {
          position: relative;
          width: 40px;
          height: 40px;
          margin: 0 auto 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${pk.ink};
          background: none;
          border: none;
        }
        .cenik-card--popular .cenik-card-icon {
          color: ${pk.ink};
          background: none;
          border: none;
        }
        .cenik-card-icon-stack {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
        }
        .cenik-card-pointer {
          position: absolute;
          right: -5px;
          bottom: -4px;
          color: ${pk.ink};
          pointer-events: none;
        }
        .cenik-card-stars {
          position: absolute;
          top: -2px;
          right: -6px;
          display: inline-flex;
          align-items: center;
          gap: 1px;
          color: ${pk.ink};
          line-height: 1;
        }
        .cenik-card-stars[data-count="2"] {
          right: -10px;
        }
        .cenik-card-stars[data-count="3"] {
          right: -14px;
        }
        .cenik-card-head {
          text-align: center;
          min-width: 0;
        }
        .cenik-card-category {
          margin: 0 0 8px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: ${pk.ink55};
          white-space: nowrap;
        }
        .cenik-card-tier {
          margin: 0 0 10px;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 16px;
          letter-spacing: -0.03em;
          line-height: 1.2;
          color: ${pk.ink};
          white-space: nowrap;
        }
        .cenik-card--popular .cenik-card-tier {
          font-size: 16px;
        }
        .cenik-card-price {
          margin: 0 0 10px;
          font-family: "Montserrat", sans-serif;
          font-weight: 700;
          font-size: 20.7px;
          letter-spacing: -0.02em;
          color: ${pk.ink};
          white-space: nowrap;
        }
        .cenik-card-suited {
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 1.45;
          letter-spacing: 0.01em;
          color: ${pk.ink55};
          white-space: nowrap;
        }
        .cenik-card-divider {
          height: 1px;
          background: linear-gradient(90deg, ${pk.black00}, ${pk.slateTint12}, ${pk.black00});
        }
        .cenik-card-features-wrap {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          min-width: 0;
        }
        .cenik-card-features {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
        }
        .cenik-features-extra {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 320ms ease;
        }
        .cenik-features-extra.is-open {
          grid-template-rows: 1fr;
        }
        .cenik-features-extra-inner {
          overflow: hidden;
          min-height: 0;
        }
        .cenik-features-extra .cenik-card-features {
          padding-top: 10px;
        }
        .cenik-card-features li {
          display: block;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 12px;
          line-height: 1.35;
          color: ${pk.ink};
          white-space: nowrap;
          min-width: 0;
        }
        .cenik-card-features--checks {
          list-style: none;
          padding-left: 0;
        }
        .cenik-card-features--checks li {
          position: relative;
          padding-left: 22px;
        }
        .cenik-card-features--checks li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0.05em;
          font-family: "Montserrat", sans-serif;
          font-weight: 800;
          font-size: 1.05em;
          line-height: 1;
          color: ${pk.ink};
        }
        .cenik-card-cta {
          width: 100%;
          margin-top: auto;
        }
        .cenik-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          align-self: center;
          margin: 0;
          padding: 0;
          border: none;
          background: none;
          cursor: pointer;
          font-family: "Montserrat", sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.02em;
          color: ${pk.ink70};
          transition: color 200ms ease;
        }
        .cenik-toggle:hover,
        .cenik-toggle:focus-visible {
          color: ${pk.ink};
        }
        .cenik-toggle:focus-visible {
          outline: 2px solid ${pk.accent};
          outline-offset: 3px;
          border-radius: 4px;
        }
        .cenik-toggle-icon {
          transition: transform 240ms ease;
        }
        .cenik-toggle-icon.is-open {
          transform: rotate(180deg);
        }
        .cenik-disclaimer {
          margin: 40px auto 0;
          max-width: 1280px;
          text-align: center;
          padding: 22px 28px;
          border-radius: 18px;
          background: ${pk.slateTint04};
          border: 1px solid ${pk.slateTint08};
          box-sizing: border-box;
        }
        .cenik-disclaimer p {
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 1.65;
          color: ${pk.ink68};
        }
        @media (hover: hover) and (pointer: fine) and (min-width: 1181px) {
          .cenik-card-cta {
            opacity: 0;
            transform: translateY(8px);
            pointer-events: none;
            transition:
              opacity 320ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .cenik-card:hover .cenik-card-cta,
          .cenik-card:focus-within .cenik-card-cta {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
          .cenik-card:hover {
            transform: scale(1.24);
            z-index: 20;
            box-shadow:
              0 28px 70px ${pk.slateTint18},
              0 10px 28px ${pk.slateShadow14};
          }
          .cenik-card--popular:hover {
            transform: scale(1.28);
            z-index: 22;
            box-shadow:
              0 0 0 1px ${pk.accent22},
              0 34px 84px ${pk.slateTint18},
              0 14px 36px ${pk.slateShadow14};
          }
        }
        @media (max-width: 1320px) {
          .cenik-card-tier,
          .cenik-card--popular .cenik-card-tier {
            font-size: 14.5px;
          }
          .cenik-card-suited {
            font-size: 11px;
          }
          .cenik-card-features li {
            font-size: 11px;
          }
          .cenik-card-features--checks li {
            padding-left: 20px;
          }
        }
        @media (max-width: 1180px) {
          .cenik-shell {
            padding: 0 24px;
          }
          .cenik-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 22px;
            padding: 12px 0 24px;
            margin: 0;
          }
          .cenik-card,
          .cenik-card--popular {
            transform: none;
            will-change: auto;
          }
          .cenik-card:hover,
          .cenik-card--popular:hover {
            transform: none;
          }
          .cenik-card--popular.cenik-card--enter {
            animation-name: cenik-card-enter;
          }
          .cenik-card-inner,
          .cenik-card--popular .cenik-card-inner {
            padding-left: 22px;
            padding-right: 22px;
          }
          .cenik-card-tier,
          .cenik-card--popular .cenik-card-tier {
            font-size: 22px;
          }
          .cenik-card-price {
            font-size: 23px;
          }
          .cenik-card-suited {
            font-size: 13px;
            white-space: normal;
          }
          .cenik-card-category {
            font-size: 12px;
          }
          .cenik-card-features li {
            font-size: 14px;
            line-height: 1.65;
          }
          .cenik-card-features--checks li {
            padding-left: 28px;
          }
        }
        @media (max-width: 768px) {
          .cenik-section {
            padding: 0 0 64px;
          }
          .cenik-hero {
            margin-bottom: 36px;
            max-width: 100%;
          }
          .cenik-subheading {
            font-size: 15px;
            line-height: 1.6;
          }
          .cenik-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            max-width: 480px;
            margin: 0 auto;
          }
          .cenik-card--popular {
            order: -1;
          }
          .cenik-card-tier,
          .cenik-card--popular .cenik-card-tier {
            font-size: 20px;
          }
          .cenik-card-features li {
            font-size: 13.5px;
          }
          .cenik-disclaimer {
            margin-top: 32px;
            max-width: 100%;
            padding: 18px 16px;
          }
          .cenik-disclaimer p {
            font-size: 13px;
          }
        }
        @media (max-width: 400px) {
          .cenik-card-tier,
          .cenik-card--popular .cenik-card-tier {
            font-size: 16px;
          }
          .cenik-card-features li {
            font-size: 12px;
          }
          .cenik-card-inner,
          .cenik-card--popular .cenik-card-inner {
            padding-left: 14px;
            padding-right: 14px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cenik-card,
          .cenik-card:hover,
          .cenik-card--popular,
          .cenik-card--popular:hover,
          .cenik-toggle-icon,
          .cenik-features-extra {
            transition: none !important;
            transform: none !important;
          }
          .cenik-card--popular .cenik-card-inner::after,
          .cenik-card--popular .cenik-card-inner::before {
            animation: none !important;
            opacity: 0 !important;
            box-shadow: none !important;
          }
          .cenik-hero--enter,
          .cenik-card--enter,
          .cenik-disclaimer--enter {
            opacity: 1 !important;
            animation: none !important;
            transform: none !important;
            pointer-events: auto !important;
          }
          .cenik-features-extra:not(.is-open) {
            display: none;
          }
          .cenik-features-extra.is-open {
            display: block;
          }
        }
      `}</style>
    </section>
  );
};
