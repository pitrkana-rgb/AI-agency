import { useEffect, useRef, useState } from "react";
import { SectionDivider } from "../../components/SectionDivider";
import { useNavigate } from "react-router-dom";

type BeforeAfter = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
};

const BeforeAfterSlider = ({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
}: BeforeAfter): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState(55);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp, { once: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [dragging]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "360px",
        overflow: "hidden",
        touchAction: "pan-y",
        cursor: dragging ? "ew-resize" : "default",
        userSelect: "none",
      }}
      aria-label="Před/po porovnání"
      role="group"
      onPointerDown={(e) => {
        e.preventDefault();
        setDragging(true);
        updateFromClientX(e.clientX);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <img
        src={beforeSrc}
        alt={beforeLabel}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: `${100 - pos}%`,
          overflow: "hidden",
        }}
      >
        <img
          src={afterSrc}
          alt={afterLabel}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
        />

        {/* Pro badge - centered on the expanding (after) side */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "6px 12px",
            borderRadius: 999,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: "#000",
            background: "linear-gradient(135deg, rgba(224,64,251,0.95), rgba(0,229,255,0.95))",
            boxShadow: "0 0 18px rgba(0,229,255,0.18)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          {afterLabel}
        </div>
      </div>

      {/* Před badge - centered on the remaining (before) side */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: `${pos}%`,
          zIndex: 3,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "6px 12px",
            borderRadius: 999,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: "#000",
            background: "linear-gradient(135deg, rgba(224,64,251,0.95), rgba(0,229,255,0.95))",
            boxShadow: "0 0 18px rgba(0,229,255,0.18)",
            pointerEvents: "none",
          }}
        >
          {beforeLabel}
        </div>
      </div>

      {/* Divider line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          transform: "translateX(-1px)",
          background: "rgba(0,229,255,0.65)",
          boxShadow: "0 0 28px rgba(0,229,255,0.25)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Handle (clean & modern) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: `${pos}%`,
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          borderRadius: 999,
          background: "rgba(13,13,13,0.72)",
          border: "1px solid rgba(0,229,255,0.25)",
          boxShadow: "0 0 28px rgba(0,229,255,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          backdropFilter: "blur(8px)",
          zIndex: 6,
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,229,255,0.95)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="14 7 9 12 14 17" />
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,229,255,0.95)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="10 7 15 12 10 17" />
          </svg>
        </div>
      </div>
    </div>
  );
};

type Slide = {
  id: string;
  title: string;
  description: string;
  features: string[];
  cta: string;
  image?: string;
  beforeAfter?: BeforeAfter;
};

const slides: Slide[] = [
  {
    id: "tvorba-webu",
    title: "Tvorba webových stránek",
    description:
      "Moderní web, který jasně komunikuje vaši hodnotu, získává zákazníky a je připravený na růst s vaším podnikáním.",
    features: [
      "Konzultace a návrh webu zdarma",
      "Standardní dodání do 14 dnů",
      "Design zaměřený pro konverze",
      "Optimalizováno na mobil i počítač",
      "Jednoduchá správa bez vývojáře",
    ],
    cta: "Chci web",
    image: "/New.web-promotion-V2.png",
  },
  {
    id: "upgrade-webu",
    title: "Upgrade stávajícího webu",
    description:
      "Kompletní modernizace vašeho stávajícího webu — nový design, vyšší rychlost, lepší konverze.",
    features: [
      "Bezplatný audit webu",
      "Moderní redesign pro vyšší konverze",
      "Zrychlení webu a SEO optimalizace",
      "Vyšší stabilita a snadnější správa",
    ],
    cta: "Chci modernizaci",
    beforeAfter: {
      beforeSrc: "/Modernizace/modernizace_before.png",
      afterSrc: "/Modernizace/modernizace_after.png",
      beforeLabel: "Před",
      afterLabel: "Pro",
    },
  },
  {
    id: "automatizace-ai",
    title: "Automatizace a AI agenti",
    description:
      "Automatizujeme rutinní procesy a nasazujeme AI agenty, kteří šetří čas, snižují náklady a zvyšují výkon vašeho businessu.",
    features: [
      "Analýza procesů a návrh automatizací",
      "Implementace AI agentů (chat, email, interní nástroje)",
      "Napojení na CRM, API a interní systémy",
      "Automatizace zákaznické komunikace",
      "Reporting, optimalizace a škálování řešení",
    ],
    cta: "Chci automatizaci",
    image: "/AI.png",
  },
];

export const CoNabizimeSection = (): JSX.Element => {
  const navigate = useNavigate();
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [rowVisible, setRowVisible] = useState<boolean[]>([false, false]);

  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        setRowVisible((prev) => {
          const next = [...prev];
          for (const entry of entries) {
            const idxRaw = (entry.target as HTMLElement).dataset.idx;
            const idx = idxRaw ? Number(idxRaw) : NaN;
            if (Number.isNaN(idx)) continue;
            if ((entry.intersectionRatio ?? 0) >= 0.15) next[idx] = true;
          }
          return next;
        });
      },
      { threshold: [0, 0.15, 0.3] },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="co-nabizime"
      style={{ width: "100%", backgroundColor: "#000", padding: "80px 0 100px", marginTop: "-50px", marginBottom: "-50px" }}
    >
      <SectionDivider />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="offer-head" style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px,4.5vw,52px)",
              lineHeight: 1.1,
              color: "#fff",
              margin: "0 auto 20px",
              letterSpacing: "-0.02em",
              maxWidth: "700px",
            }}
          >
            Co{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#E040FB,#00E5FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              nabízíme
            </span>
          </h2>
          <p
            className="section-sub offer-subheading"
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 400,
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.65)",
              margin: "0 auto",
              maxWidth: "560px",
            }}
          >
            Od vytvoření nového webu přes vizuální redesign až po nasazení AI nástrojů – řešení pro začínající podnikatele i
            rostoucí firmy.
          </p>
        </div>

        <div className="offer-rows">
          {slides.map((slide, idx) => {
            const showReverse = idx % 2 === 1;
            const fadeDir = idx === 0 ? -1 : 1;
            const isVisible = rowVisible[idx] ?? false;

            return (
              <div
                key={slide.id}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                data-idx={idx}
                className={`offer-product-row ${showReverse ? "offer-row-reverse" : ""} ${isVisible ? "offer-row-visible" : ""}`}
                style={{ ["--shift" as any]: `${fadeDir * 180}px` }}
              >
                <div className="offer-product-media">
                  {slide.beforeAfter ? (
                    <BeforeAfterSlider {...slide.beforeAfter} />
                  ) : (
                    <img
                      src={slide.image}
                      alt={slide.title}
                      style={{ width: "100%", height: "100%", minHeight: "360px", objectFit: "cover", objectPosition: "center", display: "block" }}
                    />
                  )}
                </div>

                <div className="offer-product-content">
                  <h3 className="offer-title">{slide.title}</h3>
                  <div className="offer-title-underline" aria-hidden="true" />

                  <p className="offer-desc">{slide.description}</p>

                  <ul className="offer-bullets">
                    {slide.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => {
                      navigate("/kontakt");
                      setTimeout(() => {
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }, 180);
                    }}
                    className="offer-cta animate-pulse-glow hero-primary-btn"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .offer-rows{
          display:flex;
          flex-direction:column;
          gap:56px;
        }
        .offer-product-row{
          --shift: 0px;
          position:relative;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:56px;
          opacity: 0;
          transform: translateX(var(--shift));
          transition: opacity 700ms ease, transform 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
          will-change: transform, opacity;
        }
        .offer-row-reverse{
          flex-direction: row-reverse;
        }
        .offer-row-visible{
          opacity: 1;
          transform: translateX(0);
        }

        /* Clean “blob” style behind the image (no borders) */
        .offer-product-media{
          flex: 0 0 46%;
          min-width: 0;
          border-radius: 34px;
          overflow:hidden;
          background: rgba(255,255,255,0.02);
          box-shadow: 0 0 60px rgba(0,229,255,0.06);
          position:relative;
        }
        .offer-product-media::before{
          content:'';
          position:absolute;
          inset:-60px;
          background:
            radial-gradient(circle at 20% 10%, rgba(0,229,255,0.16) 0%, transparent 52%),
            radial-gradient(circle at 80% 20%, rgba(224,64,251,0.10) 0%, transparent 55%);
          pointer-events:none;
        }
        .offer-product-media > *{
          position:relative;
          z-index:1;
        }

        .offer-product-content{
          flex: 1 1 0;
          min-width: 0;
          max-width: 560px;
          padding: 10px 0;
        }

        .offer-title{
          fontFamily: "'Space Grotesk',sans-serif";
          fontWeight: 900;
          fontSize: clamp(22px, 3vw, 34px);
          color: #fff;
          margin: 0;
          letterSpacing: -0.02em;
          line-height: 1.15;
        }
        .offer-title-underline{
          width: 56px;
          height: 2px;
          margin: 12px 0 18px;
          background: linear-gradient(90deg, rgba(0,229,255,0.95), rgba(224,64,251,0.65));
          border-radius: 999px;
        }
        .offer-desc{
          fontFamily: "'Space Grotesk',sans-serif";
          fontWeight: 400;
          fontSize: 16px;
          lineHeight: 1.7;
          color: rgba(255,255,255,0.65);
          margin: 0 0 18px;
        }

        .offer-bullets{
          margin: 0 0 22px;
          padding-left: 20px;
          list-style: disc;
        }
        .offer-bullets li{
          margin: 10px 0;
          fontFamily: "'Space Grotesk',sans-serif";
          fontWeight: 500;
          fontSize: 15px;
          lineHeight: 1.45;
          color: rgba(255,255,255,0.78);
        }

        .offer-cta{
          background: linear-gradient(135deg, #0ABDC6 0%, #00E5FF 100%);
          color: #070B14;
          border: none;
          border-radius: 12px;
          padding: 15px 32px;
          fontFamily: "'Space Grotesk',sans-serif";
          fontWeight: 600;
          fontSize: 16px;
          cursor: pointer;
          transition: filter 0.25s ease, transform 0.25s ease;
          display:inline-flex;
          align-items:center;
          justify-content:center;
        }
        .offer-cta:hover{
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        @media(max-width:900px){
          .offer-product-row{
            flex-direction: column !important;
            gap: 18px !important;
            opacity: 1 !important;
            transform: translateX(0) !important;
            transition: none !important;
          }
          .offer-product-media{
            flex: 0 0 auto !important;
            width: 100% !important;
          }
          .offer-product-content{
            max-width: none !important;
            width: 100% !important;
          }
          .offer-title{ font-size: clamp(20px, 5vw, 28px) !important; }
          .offer-desc{ font-size: 14px !important; }
          .offer-bullets li{ font-size: 14px !important; }
        }
        @media(prefers-reduced-motion: reduce){
          .offer-product-row{
            transition: none !important;
            opacity: 1 !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  );
};

