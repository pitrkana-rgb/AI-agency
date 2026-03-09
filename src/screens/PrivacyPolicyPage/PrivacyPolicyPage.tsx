import { useEffect } from "react";
import { Header } from "../../components/Header";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";

export const PrivacyPolicyPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#000", fontFamily: "'Space Grotesk', 'Inter', sans-serif", color: "#fff" }}
    >
      <Header />
      <main className="relative" style={{ zIndex: 1, paddingTop: "100px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", marginBottom: "32px", letterSpacing: "-0.02em" }}>
            Zásady ochrany soukromí
          </h1>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "24px" }}>
            Platnost od 1. 1. 2025. Tyto zásady popisují, jak PK-Digital („my“) zpracovává vaše osobní údaje v souvislosti s webem a službami.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>1. Jaká data sbíráme</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Můžeme zpracovávat: jméno, e-mail, telefon, název firmy, obsah zpráv z kontaktního formuláře; údaje o použití webu (IP, prohlížeč); cookies dle níže uvedeného.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>2. Účel zpracování</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Údaje z formuláře slouží k odpovědi na poptávku, nabídce služeb a správě vztahu s klientem. Technické údaje a cookies používáme k provozu webu, analýze návštěvnosti a zlepšení zážitku.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>3. Cookies</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Web může používat nezbytné cookies (funkčnost) a volitelné (analytika, preference). Volbu můžete změnit v nastavení prohlížeče nebo v cookie liště na webu.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>4. Třetí strany</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Data mohou být předána poskytovatelům hostingů, e-mailových a analytických nástrojů v rámci EU/EEA nebo s odpovídající ochranou. Neprodáváme vaše údaje třetím stranám pro marketing.
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>5. Vaše práva (GDPR)</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Máte právo na přístup k údajům, jejich opravu, výmaz („právo být zapomenut“), omezení zpracování, přenositelnost údajů a námitku. Pro uplatnění práva nás kontaktujte (kontakt níže). Máte též právo podat stížnost u dozorového úřadu (ÚOOÚ).
          </p>

          <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", marginTop: "32px", marginBottom: "12px" }}>6. Správce údajů a kontakt</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "16px" }}>
            Správce osobních údajů: <strong>PK-Digital</strong>, IČO: 21185301, sídlo: Němčice 329, 664 91 Ivančice. E-mail: info@pk-digital.cz, telefon: +420 725 703 868. Datová schránka: f4i6cbb.
          </p>
        </div>
      </main>
      <SiteFooterSection />
    </div>
  );
};
