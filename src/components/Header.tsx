import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navigationItems = [
    { label: "Domů", targetId: "hero", path: "/" },
    { label: "Služby", targetId: "features", path: "/" },
    { label: "Ceník", targetId: "pricing", path: "/" },
    { label: "FAQ", targetId: "faq", path: "/" },
    { label: "Kontakt", targetId: "contact", path: "/kontakt" },
];

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
        <circle cx="10" cy="10" r="9" stroke="#FF5A1F" strokeWidth="1.5" />
        <rect x="6.5" y="6.5" width="7" height="7" rx="1.5" fill="#FF5A1F" opacity="0.9" />
        <line x1="10" y1="1" x2="10" y2="6.5" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="13.5" x2="10" y2="19" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="1" y1="10" x2="6.5" y2="10" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13.5" y1="10" x2="19" y2="10" stroke="#FF5A1F" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="1.5" fill="white" />
    </svg>
);

export const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (item: typeof navigationItems[0]) => {
        if (location.pathname === item.path && item.path === "/") {
            const element = document.getElementById(item.targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            navigate(item.path);
            // Wait for navigation and then scroll if it's the home page
            if (item.path === "/") {
                setTimeout(() => {
                    document.getElementById(item.targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
        setMenuOpen(false);
    };

    return (
        <header
            style={{ zIndex: 50 }}
            className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1280px] px-6 transition-all duration-300 ${isScrolled
                ? "backdrop-blur-xl bg-black/60 border border-white/5 rounded-2xl mt-4 shadow-lg"
                : "mt-5"
                }`}
        >
            <nav className="grid grid-cols-2 md:grid-cols-3 items-center py-5">
                <div className="flex justify-start">
                    <button
                        type="button"
                        onClick={() => handleNavClick(navigationItems[0])}
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

                <div className="hidden md:flex justify-center items-center gap-8">
                    {navigationItems.map((item, index) => (
                        <button
                            key={`nav-${index}`}
                            type="button"
                            onClick={() => handleNavClick(item)}
                            className="nav-link-underline flex flex-col items-center group focus-visible:outline-none"
                            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    color: (location.pathname === item.path && (item.path !== "/" || item.targetId === "hero")) ? "#FFFFFF" : "rgba(255,255,255,0.85)",
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

                <div className="flex justify-end items-center gap-4">
                    <div className="hidden md:block">
                        <Button
                            type="button"
                            onClick={() => navigate("/kontakt")}
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

                    <button
                        type="button"
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
                <div
                    onClick={() => setMenuOpen(false)}
                    style={{
                        position: "absolute", inset: 0,
                        background: "rgba(0,0,0,0.7)",
                        opacity: menuOpen ? 1 : 0,
                        transition: "opacity 300ms ease",
                        backdropFilter: "blur(12px)",
                    }}
                />
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
                            onClick={() => handleNavClick(item)}
                            style={{
                                background: "none", border: "none", cursor: "pointer",
                                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500,
                                fontSize: "18px", color: (location.pathname === item.path && (item.path !== "/" || item.targetId === "hero")) ? "#FF5A1F" : "rgba(255,255,255,0.8)",
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
                        onClick={() => { navigate("/kontakt"); setMenuOpen(false); }}
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
    );
};
