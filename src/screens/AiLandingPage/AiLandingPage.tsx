import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
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
        <nav className="flex items-center justify-between gap-10 py-5">
          {/* Logo */}
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

          {/* Navigation links */}
          <div className="hidden md:inline-flex items-center gap-8">
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

          {/* Header CTA button */}
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
        </nav>
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
