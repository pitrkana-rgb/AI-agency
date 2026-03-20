import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";

export const TermsPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingStylePageRoot>
      <Header />
      <main className="relative" style={{ zIndex: 1, paddingTop: "100px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", marginBottom: "32px", letterSpacing: "-0.02em" }}>
            Podmínky užití
          </h1>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "24px" }}>
            Platnost od 1. 1. 2025. Používáním webu pk-digital.cz a souvisejících služeb souhlasíte s těmito podmínkami.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>1. Rozsah služeb</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Web slouží k informování o službách PK-Digital (tvorba webů, modernizace, integrace AI). Konkrétní rozsah plnění upravuje smlouva nebo objednávka s klientem.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>2. Duševní vlastnictví</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Veškerý obsah webu (texty, grafika, loga, layout) je chráněn autorským právem a patří PK-Digital nebo poskytovatelům licencí. Bez písemného souhlasu není dovoleno kopírovat ani šířit obsah pro komerční účely.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>3. Omezení odpovědnosti</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Informace na webu jsou poskytovány „jak jsou“. Nepřebíráme odpovědnost za nepřesnosti nebo škody vzniklé jejich použitím. Odpovědnost za konkrétní zakázku se řídí smlouvou s klientem.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>4. Rozhodné právo a místo plnění</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Pro veškeré vztahy z užití webu a poskytování služeb platí právo České republiky. Místem plnění je sídlo PK-Digital (Němčice 329, 664 91 Ivančice).
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>5. Řešení sporů</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Spory se snažíme řešit dohodou. V případě potřeby jsou příslušné soudy České republiky. Spotřebitelé mohou využít mimosoudní řešení spotřebitelských sporů (např. platforma ODR EU).
          </p>
        </div>
      </main>
      <SiteFooterSection />
    </LandingStylePageRoot>
  );
};
