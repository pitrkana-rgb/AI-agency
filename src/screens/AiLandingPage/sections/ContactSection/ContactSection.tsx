import { useState } from "react";
import {
  Mail, Phone, MapPin, Linkedin, Instagram, Github,
  Calendar, CheckCircle2, ChevronDown, Send
} from "lucide-react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  source: string;
  description: string;
};

const init: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  source: "",
  description: ""
};

const FloatingField = ({
  label, id, type = "text", value, onChange, error, placeholder, multiline, isSelect, options
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder: string; multiline?: boolean;
  isSelect?: boolean; options?: string[];
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label htmlFor={id} style={{
        position: "absolute", left: "16px",
        top: active ? "8px" : "50%",
        transform: active ? "translateY(0) scale(0.85)" : "translateY(-50%)",
        transformOrigin: "left",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500,
        fontSize: active ? "12px" : "15px",
        color: focused ? "#FF5A1F" : "rgba(255,255,255,0.4)",
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: "none", zIndex: 1,
        ...(multiline ? { top: active ? "8px" : "20px", transform: "none" } : {}),
      }}>
        {label}
      </label>

      {isSelect ? (
        <div style={{ position: "relative" }}>
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${focused ? "#FF5A1F" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "16px",
              padding: active ? "26px 20px 10px" : "20px",
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: value ? "#fff" : "transparent",
              outline: "none", width: "100%", appearance: "none",
              boxSizing: "border-box", cursor: "pointer",
              transition: "all 250ms ease",
              boxShadow: focused ? "0 0 0 4px rgba(255,90,31,0.1)" : "none",
            }}
          >
            <option value="" disabled hidden></option>
            {options?.map(opt => <option key={opt} value={opt} style={{ background: "#0D0D0D", color: "#fff" }}>{opt}</option>)}
          </select>
          <ChevronDown style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "18px", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
        </div>
      ) : multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          rows={9}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "#FF5A1F" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            padding: active ? "32px 20px 16px" : "20px",
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "#fff",
            outline: "none", resize: "none", width: "100%",
            boxSizing: "border-box", transition: "all 250ms ease",
            boxShadow: focused ? "0 0 0 4px rgba(255,90,31,0.1)" : "none",
          }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${focused ? "#FF5A1F" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            padding: active ? "28px 20px 10px" : "20px",
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "#fff",
            outline: "none", width: "100%",
            boxSizing: "border-box", transition: "all 250ms ease",
            boxShadow: focused ? "0 0 0 4px rgba(255,90,31,0.1)" : "none",
          }}
        />
      )}
      {error && <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: "#F87171", paddingLeft: "4px", marginTop: "2px" }}>{error}</span>}
    </div>
  );
};

const ContactCard = ({ icon: Icon, title, value, href, delay }: { icon: any, title: string, value: string, href?: string, delay: number }) => (
  <a
    href={href}
    className="glass-card animate-fade-up"
    style={{
      display: "flex", alignItems: "center", gap: "20px",
      padding: "20px", background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px",
      textDecoration: "none", transition: "all 300ms ease",
      animationDelay: `${delay}ms`
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = "rgba(255,90,31,0.05)";
      e.currentTarget.style.borderColor = "rgba(255,90,31,0.3)";
      e.currentTarget.style.transform = "translateY(-5px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.transform = "";
    }}
  >
    <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(255,90,31,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF5A1F" }}>
      <Icon size={24} />
    </div>
    <div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.05em" }}>{title}</div>
      <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "16px", color: "#fff", fontWeight: 600 }}>{value}</div>
    </div>
  </a>
);

const FAQItem = ({ q, a, delay }: { q: string, a: string, delay: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${delay}ms`, borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "24px 0", background: "none", border: "none",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", textAlign: "left"
        }}
      >
        <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "17px", color: open ? "#FF5A1F" : "#fff", transition: "color 250ms ease" }}>{q}</span>
        <ChevronDown style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 300ms ease", color: open ? "#FF5A1F" : "rgba(255,255,255,0.3)" }} />
      </button>
      <div style={{
        maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0,
        transition: "all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        paddingBottom: open ? "24px" : "0",
        fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6
      }}>
        {a}
      </div>
    </div>
  );
};

export const ContactSection = (): JSX.Element => {
  const [form, setForm] = useState<FormState>(init);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (f: keyof FormState) => (v: string) => {
    setForm(p => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Zadejte jméno";
    if (!form.email.trim()) e.email = "Zadejte email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Neplatný email";
    if (!form.projectType) e.projectType = "Vyberte typ";
    if (!form.description.trim()) e.description = "Napište nám o projektu";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    setForm(init);
  };

  return (
    <section id="contact" style={{ width: "100%", padding: "60px 0 100px", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* Split Info + Form */}
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "80px", marginBottom: "100px" }}>

          {/* Left Column — Info & Trust */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            <div className="animate-fade-up">
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "36px", color: "#fff", marginBottom: "16px", lineHeight: 1.2 }}>
                Kontaktní údaje
              </h2>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                Jsme tu pro vás. Ozvěte se nám jakkoliv vám to vyhovuje – emailem, telefonem nebo si rovnou zarezervujte call.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <ContactCard icon={Mail} title="Email" value="info@ai-agency.com" href="mailto:info@ai-agency.com" delay={100} />
              <ContactCard icon={Phone} title="Telefon" value="+420 725 703 868" href="tel:+420725703868" delay={200} />
              <ContactCard icon={MapPin} title="Adresa" value="Němčice 329, Ivančice 664 91" delay={300} />
            </div>

            <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
              <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
                {[Linkedin, Instagram, Github].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: "44px", height: "44px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", transition: "all 250ms ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#FF5A1F"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                    <Icon size={20} />
                  </a>
                ))}
              </div>

              {/* Trust Badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "24px", background: "linear-gradient(135deg, rgba(255,255,255,0.05), transparent)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", marginLeft: "8px" }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid #000", marginLeft: "-10px", overflow: "hidden", background: "#333" }}>
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="client" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff" }}>117+ spokojených klientů</div>
                  <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Pracujeme po celém světě</div>
                </div>
              </div>
            </div>

            <button className="animate-fade-up" style={{
              animationDelay: "500ms", display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
              padding: "18px 32px", background: "transparent", border: "1px solid #FF5A1F", borderRadius: "14px",
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px", color: "#FF5A1F",
              cursor: "pointer", transition: "all 250ms ease"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,90,31,0.05)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = ""; }}>
              <Calendar size={20} />
              Zarezervujte si 15min call
            </button>
          </div>

          {/* Right Column — Form */}
          <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div style={{
              background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: "32px",
              padding: "48px", position: "relative", boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
            }}>
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: "radial-gradient(circle at 100% 0%, rgba(255,90,31,0.1), transparent 70%)", pointerEvents: "none" }} />

              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div className="checkmark-animate" style={{
                    width: "80px", height: "80px", borderRadius: "50%", background: "rgba(34,197,94,0.1)",
                    border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px"
                  }}>
                    <CheckCircle2 color="#22C55E" size={40} />
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "28px", color: "#fff", marginBottom: "12px" }}>Děkujeme!</h3>
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>Vaše poptávka byla přijata. Ozveme se vám do 24 hodin.</p>
                  <button onClick={() => setSubmitted(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif" }}>Odeslat další zprávu</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                    <FloatingField id="f-name" label="Jméno a příjmení" value={form.name} onChange={set("name")} error={errors.name} placeholder="Jan Novák" />
                    <FloatingField id="f-email" label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="jan@firma.cz" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                    <FloatingField id="f-phone" label="Telefon" type="tel" value={form.phone} onChange={set("phone")} placeholder="+420 725..." />
                    <FloatingField id="f-type" label="Typ projektu" isSelect options={["Web", "AI Agent", "Automatizace", "Jiné"]} value={form.projectType} onChange={set("projectType")} error={errors.projectType} placeholder="" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="form-row">
                    <FloatingField id="f-budget" label="Rozpočet" isSelect options={["do 25k", "25-50k", "50-100k", "100k+"]} value={form.budget} onChange={set("budget")} placeholder="" />
                    <FloatingField id="f-source" label="Jak jste se o nás dozvěděli?" isSelect options={["Google", "Sociální sítě", "Doporučení", "Jiné"]} value={form.source} onChange={set("source")} placeholder="" />
                  </div>
                  <FloatingField id="f-project" label="Popis projektu" value={form.description} onChange={set("description")} error={errors.description} placeholder="Stručně nám napište o vašem projektu..." multiline />

                  <button
                    disabled={loading}
                    style={{
                      marginTop: "8px", padding: "18px", borderRadius: "16px",
                      background: "linear-gradient(135deg, #FF6A2A, #FF3C00)",
                      border: "none", color: "#fff", fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 700, fontSize: "17px", cursor: loading ? "wait" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                      transition: "all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)",
                      boxShadow: "0 16px 40px rgba(255,90,31,0.3)"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(255,90,31,0.45)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.filter = ""; e.currentTarget.style.boxShadow = "0 16px 40px rgba(255,90,31,0.3)"; }}
                  >
                    {loading ? <div style={{ width: "22px", height: "22px", border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : <><Send size={20} /> Odeslat poptávku</>}
                  </button>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                    <span>🔒 Vaše data nikdy nesdílíme s třetími stranami.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map + Mini FAQ Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "60px", alignItems: "flex-start" }} className="bottom-grid">
          {/* Map */}
          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <div style={{
              borderRadius: "32px", overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)", height: "450px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2612.981881518349!2d16.376824976939943!3d49.10609338356163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712959828766103%3A0xc0fb13a79d029583!2zTsSbbsSNaWNlIDMyOSwgNjY0IDkxIEl2YW7EjWljZQ!5e0!3m2!1scs!2scz!4v1709030000000!5m2!1scs!2scz"
                width="100%" height="100%" style={{ border: 0, filter: "grayscale(1) invert(1) opacity(0.7)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Mini FAQ */}
          <div className="animate-fade-up" style={{ animationDelay: "600ms" }}>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff", marginBottom: "24px" }}>Často kladené dotazy</h3>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <FAQItem
                delay={700}
                q="Jak rychle odpovídáte?"
                a="Garantujeme odpověď do 24 hodin, ale většinou se ozýváme mnohem dříve – často už během pár hodin."
              />
              <FAQItem
                delay={800}
                q="Je první konzultace zdarma?"
                a="Ano, první 15-30minutová konzultace je zcela zdarma. Probereme váš nápad a zjistíme, zda jsme pro sebe vhodní partneři."
              />
              <FAQItem
                delay={900}
                q="Můžeme se potkat osobně?"
                a="Určitě! Sídlíme v Ivančicích u Brna a rádi vás uvidíme u nás v kanceláři nebo přijedeme za vámi v rámci Jihomoravského kraje. Jinak fungujeme skvěle online."
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkmark-animate { animation: scale-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1.2) forwards; }
        @keyframes scale-in { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @media(max-width:992px){
          .contact-grid{ grid-template-columns: 1fr !important; gap: 60px !important; margin-bottom: 60px !important; }
          .bottom-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
        @media(max-width:600px){ .form-row{ grid-template-columns: 1fr !important; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
};
