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
            style={{ backgroundColor: "#000000", fontFamily: "'Space Grotesk', 'Inter', sans-serif", color: "#fff" }}
        >
            {/* Grain Texture Overlay */}
            <div
                aria-hidden="true"
                style={{
                    position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
                    opacity: 0.03,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />

            <Header />

            {/* Hero Section */}
            <section style={{ position: "relative", paddingTop: "160px", paddingBottom: "80px", overflow: "hidden" }}>
                {/* Background Glows */}
                <div style={{
                    position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
                    width: "100%", maxWidth: "1200px", height: "100%",
                    background: "radial-gradient(circle at 20% 30%, rgba(255,90,31,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(123,97,255,0.05) 0%, transparent 60%)",
                    filter: "blur(80px)", pointerEvents: "none", zIndex: 0
                }} />

                {/* Floating Orbs */}
                <div className="animate-orb-float" style={{ position: "absolute", top: "15%", left: "10%", width: "300px", height: "300px", background: "rgba(255,90,31,0.05)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />
                <div className="animate-orb-float-delayed" style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", background: "rgba(123,97,255,0.03)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
                    <div style={{ marginBottom: "24px" }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(255,90,31,0.1)", border: "1px solid rgba(255,90,31,0.2)",
                            borderRadius: "99px", padding: "6px 16px",
                            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "12px", color: "#FF5A1F",
                            textTransform: "uppercase", letterSpacing: "0.1em"
                        }}>
                            <span style={{ width: "8px", height: "8px", background: "#FF5A1F", borderRadius: "50%", display: "inline-block" }} />
                            Odpovídáme do 24h
                        </span>
                    </div>

                    <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(40px, 8vw, 72px)", lineHeight: 1.1, color: "#fff", margin: "0 0 24px", letterSpacing: "-0.03em" }}>
                        Pojďme spolu <span style={{ background: "linear-gradient(135deg, #FF6A2A, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>tvořit</span>
                    </h1>

                    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.6, color: "rgba(255,255,255,0.6)", maxWidth: "700px", margin: "0 auto" }}>
                        Máte vizi? My máme technologie. Od prvního callu po hotové řešení v průměru za 4 týdny. Začněte změnu ještě dnes.
                    </p>
                </div>
            </section>

            <main className="relative" style={{ zIndex: 1 }}>
                <ContactSection />
            </main>

            <SiteFooterSection />

            <style>{`
                @keyframes orb-float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-orb-float { animation: orb-float 20s ease-in-out infinite; }
                .animate-orb-float-delayed { animation: orb-float 25s ease-in-out infinite; animation-delay: -5s; }
                
                @media(max-width:768px) {
                    h1 { font-size: clamp(36px, 10vw, 48px) !important; }
                    section { padding-top: 120px !important; padding-bottom: 40px !important; }
                }
            `}</style>
        </div>
    );
};
