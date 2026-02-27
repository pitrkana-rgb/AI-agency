import { Header } from "../../components/Header";
import { SiteFooterSection } from "../AiLandingPage/sections/SiteFooterSection/SiteFooterSection";
import { ContactSection } from "../AiLandingPage/sections/ContactSection/ContactSection";
import { useEffect } from "react";

export const ContactPage = (): JSX.Element => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div
            className="relative w-full min-h-screen overflow-x-hidden"
            style={{ backgroundColor: "#000000", fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
        >
            <Header />

            <main className="relative pt-32" style={{ zIndex: 1 }}>
                <ContactSection />
            </main>

            <SiteFooterSection />

            <style>{`
        @media(max-width:768px) {
          h1 { font-size: clamp(32px, 8vw, 42px) !important; }
          h2 { font-size: clamp(28px, 6vw, 32px) !important; }
        }
      `}</style>
        </div>
    );
};
