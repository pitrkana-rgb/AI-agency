import { useEffect } from "react";
import { Header } from "../../components/Header";
import { LandingStylePageRoot } from "../../components/PageBackground";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { pk } from "../../design/pkLandingColors";
import { CenikPricingSection } from "./CenikPricingSection";

export const CenikPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <LandingStylePageRoot
      style={{
        backgroundColor: pk.page,
        backgroundImage: "none",
        color: pk.ink,
      }}
    >
      <Header />

      <main className="relative cenik-page-main" style={{ zIndex: 1 }}>
        <CenikPricingSection />
      </main>

      <SiteFooterSection />

      <style>{`
        .cenik-page-main {
          padding-top: 120px;
        }
        @media (max-width: 768px) {
          .cenik-page-main {
            padding-top: 100px;
          }
        }
      `}</style>
    </LandingStylePageRoot>
  );
};
