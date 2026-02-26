const statsData = [
  {
    label: "REALIZOVANÝCH PROJEKTŮ",
    value: "120+",
    description: "Od prvních MVP až po škálované AI řešení.",
  },
  {
    label: "KLIENTŮ S NÁMI POKRAČUJE",
    value: "95 %",
    description: "Dlouhodobé partnerství místo jednorázových zakázek.",
  },
  {
    label: "UŠETŘENÉHO ČASU AUTOMATIZACÍ",
    value: "3 000+ h",
    description: "Procesy, které běží samy a bez chyb.",
  },
];

export const UserTestimonialsSection = (): JSX.Element => {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#000000",
        paddingTop: "0",
        paddingBottom: "48px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* ── Stat strip ───────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
          }}
          className="stats-strip"
        >
          {statsData.map((stat, index) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "0 48px",
                borderLeft:
                  index === 0
                    ? "none"
                    : "1px solid rgba(255,255,255,0.08)",
                paddingLeft: index === 0 ? "0" : "48px",
              }}
            >
              {/* Label */}
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  color: "#FF5A1F",
                  textTransform: "uppercase" as const,
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </span>

              {/* Big number */}
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5vw, 54px)",
                  color: "#FFFFFF",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .stats-strip {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .stats-strip > div {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 32px;
          }
          .stats-strip > div:first-child {
            border-top: none !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
