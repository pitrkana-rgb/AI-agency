import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Domů", id: "hero", path: "/" },
  { label: "Služby", id: "pricing", path: "/" },
  { label: "FAQ", id: "faq", path: "/" },
  { label: "Kontakt", id: "company-info", path: "/kontakt" },
];

export const SiteFooterSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (location.pathname === link.path && link.path === "/kontakt" && link.id) {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (location.pathname === link.path && link.path === "/") {
      document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(link.path);
      if (link.path === "/") {
        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else if (link.path === "/kontakt" && link.id) {
        setTimeout(() => {
          document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  };

  return (
    <footer style={{ width: "100%", backgroundColor: "#000", position: "relative", overflow: "hidden" }}>
      {/* Orange gradient top border */}
      <div style={{ height: "1px", background: "linear-gradient(90deg,transparent 0%,#00E5FF 40%,rgba(0,229,255,0.25) 70%,transparent 100%)" }} />

      <div className="footer-wrapper" style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 40px" }}>
        <div className="footer-top" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "48px", flexWrap: "wrap", marginBottom: "48px" }}>

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src="/Company_logo_V2.png"
                alt="PK Digital logo"
                style={{ height: "40px", width: "auto", display: "block" }}
              />
            </div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>
              Navrhujeme moderní weby, automatizujeme procesy a stavíme AI agenty pro váš tým.
            </p>
          </div>

          {/* Nav + Contact — wrapped for mobile 2-column row */}
          <div className="footer-columns" style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>

            {/* Nav links */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.08em", color: "#00E5FF", textTransform: "uppercase" as const, marginBottom: "4px" }}>Navigace</span>
              {navLinks.map(link => (
                <button key={`${link.path}-${link.label}`} type="button" onClick={() => handleNavClick(link)}
                  style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", textAlign: "left", transition: "color 200ms ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Contact */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "0.08em", color: "#00E5FF", textTransform: "uppercase" as const, marginBottom: "4px" }}>Kontakt</span>
              <button type="button" onClick={() => navigate("/napiste-nam")}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", textAlign: "left", transition: "color 200ms ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                Napište nám
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            © 2025 PK-Digital. Všechna práva vyhrazena.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            <button type="button" onClick={() => navigate("/zasady-ochrany-soukromi")}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 200ms ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; }}
            >Zásady ochrany soukromí</button>
            <button type="button" onClick={() => navigate("/podminky-uziti")}
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "13px", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 200ms ease" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)"; }}
            >Podmínky užití</button>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){
          .footer-wrapper { padding: 40px 20px 28px !important; }
          .footer-top {
            flex-direction: column !important;
            gap: 32px !important;
            margin-bottom: 32px !important;
          }
          /* Brand block: full width on top */
          .footer-top > div:first-child {
            max-width: 100% !important;
            width: 100% !important;
          }
          /* Nav + Contact side by side */
          .footer-top > nav,
          .footer-top > div:last-child {
            flex: 1 1 0 !important;
          }
          /* Wrap only nav+contact into a row */
          .footer-columns {
            display: flex !important;
            flex-direction: row !important;
            gap: 32px !important;
            width: 100% !important;
          }
          /* Bottom bar: stacked */
          .footer-bottom {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
          }
          .footer-logo { height: 32px !important; }
        }
      `}</style>

    </footer>
  );
};
