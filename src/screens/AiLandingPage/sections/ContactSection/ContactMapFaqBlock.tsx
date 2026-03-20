import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "24px 0",
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600,
            fontSize: "17px",
            color: open ? "#00E5FF" : "#fff",
            transition: "color 250ms ease",
          }}
        >
          {q}
        </span>
        <ChevronDown
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 300ms ease",
            color: open ? "#00E5FF" : "rgba(255,255,255,0.3)",
          }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0",
          opacity: open ? 1 : 0,
          transition: "all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          paddingBottom: open ? "24px" : "0",
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "15px",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.6,
        }}
      >
        {a}
      </div>
    </div>
  );
};

export const ContactMapFaqBlock = (): JSX.Element => (
  <section
    style={{
      width: "100%",
      padding: "0 0 100px",
      position: "relative",
      backgroundColor: "transparent",
    }}
  >
    <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "60px",
          alignItems: "flex-start",
        }}
        className="contact-bottom-grid"
      >
        <div>
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              height: "400px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
            }}
          >
            <iframe
              title="Mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.981881518349!2d16.376824976939943!3d49.10609338356163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712959828766103%3A0xc0fb13a79d029583!2zTsSbbsSNaWNlIDMyOSwgNjY0IDkxIEl2YW7EjWljZQ!5e0!3m2!1scs!2scz!4v1709030000000!5m2!1scs!2scz"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(1) opacity(0.7)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontWeight: 700,
              fontSize: "24px",
              color: "#fff",
              marginBottom: "24px",
            }}
          >
            Často kladené dotazy
          </h3>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FAQItem
              q="Jak rychle odpovídáte?"
              a="Garantujeme odpověď do 24 hodin, ale většinou se ozýváme mnohem dříve – často už během pár hodin."
            />
            <FAQItem
              q="Je první konzultace zdarma?"
              a="Ano, první 15-30minutová konzultace je zcela zdarma. Probereme váš nápad a zjistíme, zda jsme pro sebe vhodní partneři."
            />
            <FAQItem
              q="Můžeme se potkat osobně?"
              a="Určitě! Sídlíme v Ivančicích u Brna a rádi vás uvidíme u nás v kanceláři nebo přijedeme za vámi v rámci Jihomoravského kraje. Jinak fungujeme skvěle online."
            />
          </div>
        </div>
      </div>
    </div>
    <style>{`
      @media (max-width: 768px) {
        .contact-bottom-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);
