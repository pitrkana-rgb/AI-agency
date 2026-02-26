import { StarIcon } from "lucide-react";

/* ── SVG avatar fallbacks (no broken images) ──────────────────────── */
const AvatarSvg = ({
  initials,
  from,
  to,
}: {
  initials: string;
  from: string;
  to: string;
}) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id={`grad-${initials}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor={from} />
        <stop offset="100%" stopColor={to} />
      </linearGradient>
      <clipPath id={`clip-${initials}`}>
        <circle cx="22" cy="22" r="20" />
      </clipPath>
    </defs>
    <circle cx="22" cy="22" r="22" fill="#111" />
    <circle cx="22" cy="22" r="20" fill={`url(#grad-${initials})`} />
    <text
      x="22"
      y="27"
      textAnchor="middle"
      fontFamily="'Space Grotesk', sans-serif"
      fontWeight="700"
      fontSize="14"
      fill="white"
    >
      {initials}
    </text>
  </svg>
);

const avatars = [
  { initials: "MK", from: "#FF6A2A", to: "#c1440f" },
  { initials: "LN", from: "#7B61FF", to: "#3b2fc9" },
  { initials: "PV", from: "#19B9A0", to: "#0d7a6b" },
  { initials: "JH", from: "#FF5A1F", to: "#a82c00" },
  { initials: "AK", from: "#F59E0B", to: "#b45309" },
];

export const MainHeroSection = (): JSX.Element => {
  return (
    <section
      className="relative w-full flex items-center justify-center"
      style={{
        minHeight: "100vh",
        paddingTop: "88px",
        paddingBottom: "0",
      }}
    >
      <div
        className="relative z-10 flex flex-col items-center mx-auto px-4 animate-fade-in"
        style={{ maxWidth: "900px", textAlign: "center" }}
      >
        {/* ── Rating pill ─────────────────────────────────────────────── */}
        <div
          className="inline-flex items-center gap-4"
          style={{
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "999px",
            padding: "10px 18px",
            marginBottom: "40px",
          }}
          role="img"
          aria-label="Hodnocení 5.0 z 5 – 117 spokojených klientů"
        >
          {/* Avatar stack */}
          <div className="flex items-center" style={{ marginRight: "4px" }}>
            {avatars.map((av, i) => (
              <div
                key={av.initials}
                style={{
                  marginLeft: i === 0 ? 0 : "-12px",
                  border: "2px solid #111",
                  borderRadius: "50%",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
                  lineHeight: 0,
                  zIndex: avatars.length - i,
                  position: "relative",
                }}
              >
                <AvatarSvg initials={av.initials} from={av.from} to={av.to} />
              </div>
            ))}
          </div>

          {/* Stars + text */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static icon list
                <StarIcon key={index} fill="#FF5A1F" className="w-4 h-4 text-[#FF5A1F]" />
              ))}
            </div>
            <div className="flex flex-col items-start">
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#FFFFFF",
                  lineHeight: 1.3,
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                Hodnocení 5.0 / 5
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.3,
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                117+ spokojených klientů
              </p>
            </div>
          </div>
        </div>

        {/* ── Headline ─────────────────────────────────────────────────── */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(34px, 7vw, 62px)",
            lineHeight: 1.07,
            color: "#FFFFFF",
            margin: "0 0 24px 0",
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Využijte s námi sílu </span>
          <span
            style={{
              color: "#FF5A1F",
              textShadow: "0 0 24px rgba(255,90,31,0.35)",
            }}
          >
            AI
          </span>
          <span style={{ color: "#FFFFFF" }}> pro váš business</span>
        </h1>

        {/* ── Paragraph ────────────────────────────────────────────────── */}
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(16px, 2.2vw, 19px)",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.75)",
            maxWidth: "720px",
            margin: "0 auto 36px auto",
          }}
        >
          Navrhujeme moderní weby, automatizujeme procesy a stavíme šité na míru
          AI agenty, kteří pracují pro váš tým 24/7 – od prvního nápadu až po
          nasazení do provozu.
        </p>

        {/* ── CTA Buttons ───────────────────────────────────────────────── */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "16px" }}
        >
          {/* Primary CTA */}
          <button
            id="hero-primary-cta"
            type="button"
            className="animate-pulse-glow"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              background: "linear-gradient(135deg, #FF6A2A 0%, #FF3C00 100%)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "12px",
              padding: "14px 28px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              cursor: "pointer",
              transition: "transform 0.25s ease, filter 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px)";
            }}
          >
            Kontaktujte nás
          </button>

          {/* Secondary CTA */}
          <button
            id="hero-secondary-cta"
            type="button"
            onClick={() => {
              const el = document.getElementById("features");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              background: "#000000",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "14px 28px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#111111";
              btn.style.borderColor = "rgba(255,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = "#000000";
              btn.style.borderColor = "rgba(255,255,255,0.2)";
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            }}
          >
            Naše služby
          </button>
        </div>
      </div>
    </section>
  );
};
