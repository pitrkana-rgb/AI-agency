import { useState } from "react";
import { PlusIcon, MinusIcon } from "lucide-react";

const faqData = [
  {
    question: "Jaké typy webových stránek tvoříte?",
    answer: "Vytvářím vše od jednoduchých landing page pro prezentaci služby až po komplexní weby pro firmy – včetně funkcí jako jsou rezervační systémy, poptávkové formuláře nebo napojení na další aplikace. Řešení vždy přizpůsobuji velikosti a potřebám vašeho podnikání.",
  },
  {
    question: "Jak dlouho trvá vytvoření webu?",
    answer: "Standardně dodávám kompletní web do 14 dnů. U rozsáhlejších projektů nebo modernizací se délka odvíjí od požadavků – konkrétní odhad dostanete po úvodní konzultaci.",
  },
  {
    question: "Jak probíhá první spolupráce?",
    answer: "Začínáme krátkým online callem nebo e-mailem, kde společně pojmenujeme cíle a vaše představy. Na základě toho připravím nezávaznou kalkulaci a návrh dalších kroků. Až poté se pustíme do samotné realizace.",
  },
  {
    question: "Co ode mě budete potřebovat?",
    answer: "Na začátku stačí základní informace: o čem vaše firma je, jaké máte cíle a představy o webu. Texty, obrázky a další podklady můžeme doplnit průběžně. U modernizace stávajícího webu pomůže přístup k současnému obsahu.",
  },
  {
    question: "Budu si moci web upravovat sám?",
    answer: "Ano. Weby připravuji tak, aby se daly snadno spravovat bez znalosti kódu – úpravy textů, obrázků nebo jednoduchých sekcí zvládnete sami. V případě potřeby nabízím i dlouhodobou správu a rozvoj.",
  },
  {
    question: "Co když už web mám a chci ho modernizovat?",
    answer: "Nabízím upgrade stávajícího webu: bezplatný audit, moderní redesign pro vyšší konverze, zrychlení a SEO optimalizaci, integraci AI nástrojů a lepší stabilitu. Ceny od 17 900 Kč podle rozsahu.",
  },
  {
    question: "Co se děje po spuštění webu?",
    answer: "Po předání vám ukážu, jak web spravovat. Nabízím možnost následné správy, údržby a optimalizace na základě dat. Můžeme také napojit analytiku a průběžně vylepšovat konverze.",
  },
  {
    question: "Můžete web napojit na další systémy?",
    answer: "Ano. Umím napojení na interní systémy, rezervační nebo objednávkové systémy, e-mailové nástroje a další aplikace. Konkrétní možnosti probereme podle vašich potřeb.",
  },
  {
    question: "Můžeme si nejdříve nezávazně zavolat?",
    answer: "Ano. Nezávazná konzultace je první krok – probereme vaše cíle, představy a rozpočet. Napište mi přes kontaktní formulář nebo na info@pk-digital.cz, ozvu se do 24 hodin.",
  },
];

import { SectionDivider } from "../../components/SectionDivider";

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ width: "100%", backgroundColor: "#000", padding: "96px 0 120px", marginTop: "-50px", marginBottom: "-80px" }}>
      <SectionDivider />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,56px)", color: "#fff", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Často kladené dotazy
          </h2>
          <p className="section-sub" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.65)", margin: 0 }}>
            Zajímá vás, jak spolupráce probíhá v praxi? Připravili jsme odpovědi na otázky, které od klientů dostáváme nejčastěji.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {faqData.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.question}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "24px 0", background: "none", border: "none", cursor: "pointer",
                    textAlign: "left", gap: "16px",
                    outline: "none",
                  }}
                  className="faq-trigger"
                >
                  <span style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: isOpen ? 600 : 500,
                    fontSize: "18px",
                    color: isOpen ? "#00E5FF" : "#F0F4F8",
                    lineHeight: 1.4,
                    transition: "color 200ms ease",
                  }}>
                    {faq.question}
                  </span>
                  <div style={{
                    flexShrink: 0, width: "32px", height: "32px", borderRadius: "50%",
                    background: isOpen ? "rgba(0,229,255,0.12)" : "rgba(13,27,42,0.65)",
                    border: `1px solid ${isOpen ? "rgba(0,229,255,0.35)" : "rgba(0,229,255,0.12)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 200ms ease, border-color 200ms ease, transform 200ms ease",
                    transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
                  }}>
                    {isOpen
                      ? <MinusIcon style={{ width: "14px", height: "14px", color: "#00E5FF" }} />
                      : <PlusIcon style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.6)" }} />
                    }
                  </div>
                </button>

                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  style={{
                    maxHeight: isOpen ? "600px" : "0",
                    overflow: "hidden",
                    transition: "max-height 300ms ease",
                  }}
                >
                  <p style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px",
                    lineHeight: 1.7, color: "rgba(255,255,255,0.65)", padding: "0 0 24px 0", margin: 0,
                  }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .faq-trigger:focus-visible{ outline:2px solid #00E5FF; outline-offset:2px; border-radius:4px; }
        @media(max-width:768px){
          .faq-section { padding: 48px 0 60px !important; }
          .faq-heading { font-size: 22px !important; margin-bottom: 8px !important; }
          .faq-subtitle { font-size: 13px !important; }
          .faq-header { margin-bottom: 32px !important; }
          .faq-trigger { padding: 12px 0 !important; }
          .faq-question { font-size: 15px !important; }
          .faq-answer { font-size: 13px !important; padding-bottom: 14px !important; line-height: 1.6 !important; }
          .faq-icon { width: 26px !important; height: 26px !important; }
        }
        @media(prefers-reduced-motion:reduce){ div[style*="max-height"]{ transition:none !important; } }
      `}</style>
    </section>
  );
};
