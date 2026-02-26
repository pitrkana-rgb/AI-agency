import { MessageCircleIcon, CheckCircle2Icon, Code2Icon, CogIcon } from "lucide-react";

/* ── Geometric wire icon (SVG, thin stroke) ──────────────────────── */
const GeometricWireIcon = () => (
  <svg
    width="180"
    height="180"
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ opacity: 0.75 }}
  >
    {/* Outer octagon */}
    <polygon
      points="90,10 150,35 170,90 150,145 90,170 30,145 10,90 30,35"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Middle octagon */}
    <polygon
      points="90,32 136,52 152,90 136,128 90,148 44,128 28,90 44,52"
      stroke="rgba(255,255,255,0.35)"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Inner circle */}
    <circle
      cx="90"
      cy="90"
      r="32"
      stroke="rgba(255,255,255,0.25)"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Cross lines outer→inner */}
    <line x1="90" y1="10" x2="90" y2="32" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <line x1="90" y1="148" x2="90" y2="170" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <line x1="10" y1="90" x2="28" y2="90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    <line x1="152" y1="90" x2="170" y2="90" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
    {/* Diagonal lines */}
    <line x1="30" y1="35" x2="44" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="150" y1="35" x2="136" y2="52" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="30" y1="145" x2="44" y2="128" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    <line x1="150" y1="145" x2="136" y2="128" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
    {/* Inner accent dot */}
    <circle cx="90" cy="90" r="4" fill="#FF5A1F" opacity="0.8" />
    {/* Orbit tick marks */}
    <circle cx="90" cy="58" r="2.5" fill="rgba(255,255,255,0.4)" />
    <circle cx="90" cy="122" r="2.5" fill="rgba(255,255,255,0.4)" />
    <circle cx="58" cy="90" r="2.5" fill="rgba(255,255,255,0.4)" />
    <circle cx="122" cy="90" r="2.5" fill="rgba(255,255,255,0.4)" />
  </svg>
);

const featureCards = [
  {
    title: "Nezávazná poptávka",
    description:
      "Krátký call nebo zpráva, kde společně projdeme váš business, cíle a aktuální procesy. Navrhneme konkrétní AI příležitosti.",
    icon: MessageCircleIcon,
  },
  {
    title: "Validace & úpravy",
    description:
      "Ověříme, kde dává AI skutečně smysl. Společně doladíme zadání, aby návrh řešení zapadl do vašeho týmu i stávajících nástrojů.",
    icon: CheckCircle2Icon,
  },
  {
    title: "Spolupráce & vývoj",
    description:
      "Navrhujeme UX, automatizace i AI agenty. Vše průběžně testujeme, komunikujeme v češtině a doručujeme v jasných iteracích.",
    icon: Code2Icon,
  },
  {
    title: "Škálování & automatizace",
    description:
      "Napojíme nástroje, nastavíme metriky a vytrénujeme vaše AI agenty tak, aby se z experimentu stala dlouhodobá konkurenční výhoda.",
    icon: CogIcon,
  },
];

/* ── Feature card ──────────────────────────────────────────────────── */
const FeatureCard = ({
  title,
  description,
  icon: Icon,
}: (typeof featureCards)[0]) => (
  <div
    className="feature-card"
    style={{
      display: "flex",
      flexDirection: "column",
      position: "relative",
      background:
        "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "20px",
      padding: "36px",
      minHeight: "240px",
      overflow: "hidden",
      transition: "border-color 250ms ease, transform 250ms ease, box-shadow 250ms ease",
      cursor: "default",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = "rgba(255,90,31,0.5)";
      el.style.transform = "translateY(-6px)";
      el.style.boxShadow = "0 20px 40px rgba(255,90,31,0.15)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.borderColor = "rgba(255,255,255,0.08)";
      el.style.transform = "translateY(0)";
      el.style.boxShadow = "none";
    }}
    tabIndex={0}
  >
    {/* Icon — fixed top-right container */}
    <div
      style={{
        position: "absolute",
        top: "28px",
        right: "28px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "rgba(255,90,31,0.12)",
        border: "1px solid rgba(255,90,31,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon
        style={{ width: "20px", height: "20px", color: "#FF5A1F" }}
        strokeWidth={1.75}
      />
    </div>

    {/* Description — no overlap with icon (max-width 85%) */}
    <p
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 400,
        fontSize: "15px",
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.65)",
        maxWidth: "85%",
        marginBottom: "32px",
        marginTop: "0",
      }}
    >
      {description}
    </p>

    {/* Title — anchored to bottom via margin-top: auto */}
    <h3
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 600,
        fontSize: "clamp(24px, 2.5vw, 30px)",
        lineHeight: 1.15,
        color: "#FFFFFF",
        margin: "auto 0 0 0",
        letterSpacing: "-0.01em",
      }}
    >
      {title}
    </h3>
  </div>
);

/* ── Section ──────────────────────────────────────────────────────── */
export const AiDesignFeaturesSection = (): JSX.Element => {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#000000",
        padding: "96px 0 120px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* ── Two-column headline area ──────────────────────────────── */}
        <div
          className="features-headline"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "48px",
            marginBottom: "80px",
          }}
        >
          {/* Left: text */}
          <div style={{ flex: "1 1 auto", maxWidth: "560px" }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 1.1,
                color: "#FFFFFF",
                margin: "0 0 24px 0",
                letterSpacing: "-0.02em",
              }}
            >
              <span style={{ color: "#FFFFFF" }}>Povyšte váš business díky </span>
              <span
                style={{
                  color: "#FF5A1F",
                  textShadow: "0 0 20px rgba(255,90,31,0.35)",
                }}
              >
                AI
              </span>
            </h2>

            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.7)",
                margin: 0,
                maxWidth: "560px",
              }}
            >
              Navrhujeme AI řešení, která propojují váš web, interní nástroje i
              tým. Od prvního nápadu až po škálování běží vše v přehledném,
              měřitelném a srozumitelném procesu.
            </p>
          </div>

          {/* Right: geometric wire icon */}
          <div
            className="features-icon"
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GeometricWireIcon />
          </div>
        </div>

        {/* ── Feature cards grid ───────────────────────────────────── */}
        <div
          className="feature-cards-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px",
          }}
        >
          {featureCards.map((card, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <FeatureCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .features-headline {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .features-headline h2 {
            font-size: 44px !important;
          }
          .features-icon {
            align-self: center !important;
          }
          .feature-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .features-headline h2 {
            font-size: 34px !important;
          }
          .feature-card {
            padding: 28px !important;
            min-height: 200px !important;
          }
          .feature-card h3 {
            font-size: 24px !important;
          }
          .feature-card [style*="width: 48px"] {
            width: 44px !important;
            height: 44px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .feature-card {
            transition: none !important;
          }
        }
        .feature-card:focus-visible {
          outline: 2px solid #FF5A1F !important;
          outline-offset: 4px !important;
        }
      `}</style>
    </section>
  );
};
