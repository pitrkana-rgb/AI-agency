import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { AiDesignFeaturesSection } from "./sections/AiDesignFeaturesSection/AiDesignFeaturesSection";
import { CompanyMilestonesSection } from "./sections/CompanyMilestonesSection/CompanyMilestonesSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { MainHeroSection } from "./sections/MainHeroSection";
import { ReadyToDesignSection } from "./sections/ReadyToDesignSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { SubscriptionPlansSection } from "./sections/SubscriptionPlansSection/SubscriptionPlansSection";
import { UserTestimonialsSection } from "./sections/UserTestimonialsSection";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { ContactSection } from "./sections/ContactSection/ContactSection";

const navigationItems = [
  { label: "Domů", targetId: "hero", isActive: true },
  { label: "Služby", targetId: "features", isActive: false },
  { label: "Ceník", targetId: "pricing", isActive: false },
  { label: "FAQ", targetId: "faq", isActive: false },
  { label: "Kontakt", targetId: "contact", isActive: false },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/** Minimal AI chip / neural node icon */
const AiChipIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer ring */}
    <circle cx="10" cy="10" r="9" stroke="#FF5A1F" strokeWidth="1.5" />
    {/* Inner hexagon-ish chip body */}
    <rect x="6.5" y="6.5" width="7" height="7" rx="1.5" fill="#FF5A1F" opacity="0.9" />
    {/* Circuit lines */}
    <line x1="10" y1="1" x2="10" y2="6.5" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="13.5" x2="10" y2="19" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="10" x2="6.5" y2="10" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="13.5" y1="10" x2="19" y2="10" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
    {/* Center dot */}
    <circle cx="10" cy="10" r="1.5" fill="white" />
  </svg>
);

export const AiLandingPage = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-animate-on-scroll]",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      { threshold: 0.15 },
    );

    sections.forEach((section) => {
      section.classList.add("opacity-0", "translate-y-6");
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#000000", fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
    >
      {/* ── Noise texture overlay ───────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
      {/* ── Top hero background: zooming image + bottom fade ─────────── */}
      <div
        className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden"
        style={{ height: "900px", zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Animated zoom layer — scaled slightly oversized so edges never peek */}
        <div
          className="animate-bg-zoom absolute"
          style={{
            inset: "-5%",
            backgroundImage: `url('/background.png')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Gradient fade overlay — sits on top, not animated */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 70%, #000000 100%)",
          }}
        />
      </div>

      {/* ── Fixed Header ─────────────────────────────────────────────── */}
      <header
        style={{ zIndex: 50 }}
        className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] px-6 transition-all duration-300 ${isScrolled
          ? "backdrop-blur-xl bg-black/60 border border-white/5 rounded-2xl mt-4 shadow-lg"
          : "mt-5"
          }`}
      >
        <nav className="grid grid-cols-2 md:grid-cols-3 items-center py-5">
          {/* Logo - Left column */}
          <div className="flex justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A1F] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-md"
              aria-label="AI-agency – zpět na začátek"
            >
              <AiChipIcon />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  letterSpacing: "0.02em",
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                AI-agency
              </span>
            </button>
          </div>

          {/* Navigation links - Center column (Desktop only) */}
          <div className="hidden md:flex justify-center items-center gap-8">
            {navigationItems.map((item, index) => (
              <button
                key={`nav-${index}`}
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                className="nav-link-underline flex flex-col items-center group focus-visible:outline-none"
                data-active={item.isActive ? "true" : "false"}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: item.isActive ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  className="group-hover:!text-white"
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* CTA & Hamburger - Right column */}
          <div className="flex justify-end items-center gap-4">
            {/* Header CTA – Desktop only */}
            <div className="hidden md:block">
              <Button
                type="button"
                id="header-cta-btn"
                onClick={() => scrollToSection("contact")}
                style={{
                  background: "linear-gradient(135deg, #FF6A2A 0%, #FF3C00 100%)",
                  color: "#FFFFFF",
                  borderRadius: "999px",
                  padding: "12px 22px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  border: "none",
                  transition: "filter 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0 4px 20px rgba(255,90,31,0.35)",
                }}
                className="hover:brightness-105 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#FF5A1F]"
              >
                Napište nám
              </Button>
            </div>

            {/* Hamburger button (mobile only) */}
            <button
              type="button"
              id="hamburger-btn"
              aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
              className="flex md:hidden items-center justify-center"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                padding: "8px",
              }}
            >
              {menuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          aria-label="Mobile navigation"
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            pointerEvents: menuOpen ? "all" : "none",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.7)",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 300ms ease",
              backdropFilter: "blur(4px)",
            }}
          />
          {/* Drawer panel */}
          <div style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: "280px",
            background: "#0A0A0A",
            borderLeft: "1px solid rgba(255,255,255,0.08)",
            padding: "24px",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 300ms ease",
            display: "flex", flexDirection: "column", gap: "8px",
          }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
              <button type="button" onClick={() => setMenuOpen(false)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", padding: "4px" }}>
                <XIcon size={20} />
              </button>
            </div>
            {navigationItems.map(item => (
              <button
                key={item.targetId}
                type="button"
                onClick={() => { scrollToSection(item.targetId); setMenuOpen(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                  fontSize: "18px", color: item.isActive ? "#FF5A1F" : "rgba(255,255,255,0.8)",
                  textAlign: "left", padding: "12px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  transition: "color 200ms ease",
                }}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { scrollToSection("contact"); setMenuOpen(false); }}
              style={{
                marginTop: "24px",
                background: "linear-gradient(135deg,#FF6A2A,#FF3C00)",
                color: "#fff", border: "none", borderRadius: "999px",
                padding: "14px 24px",
                fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Napište nám
            </button>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <main className="relative" style={{ zIndex: 1 }}>
        <section id="hero">
          <MainHeroSection />
        </section>

        <section id="trust" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <UserTestimonialsSection />
        </section>

        <section id="features" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <AiDesignFeaturesSection />
        </section>

        <section id="timeline" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <CompanyMilestonesSection />
        </section>

        <section data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <ClientTestimonialsSection />
        </section>

        <section id="pricing" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <SubscriptionPlansSection />
        </section>

        <section id="faq" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <FrequentlyAskedQuestionsSection />
        </section>

        <section data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <ReadyToDesignSection />
        </section>

        <section id="contact" data-animate-on-scroll style={{ backgroundColor: "#000000" }}>
          <ContactSection />
        </section>

        <SiteFooterSection />
      </main>
    </div>
  );
};
