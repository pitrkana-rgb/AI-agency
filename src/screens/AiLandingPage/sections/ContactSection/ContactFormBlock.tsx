import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronDown, Send } from "lucide-react";
import { supabase } from "../../../../lib/supabase";

const PROJECT_TYPE_OPTIONS = [
  "Landing page (pro jeden produkt/službu)",
  "Firemní web / prezentační stránky",
  "E-shop (internetový obchod)",
  "Modernizace / redesign stávajícího webu",
  "Jiné",
];

const FEATURES_OPTIONS = [
  "Chatbot",
  "Cenový Kalkulátor",
  "Rezervační systém",
  "Lead management",
  "E-shop",
  "Galerie / Videa",
  "Kontaktní formuláře",
  "Napojení na sociální sítě",
  "Blog / články",
  "Napojení na analytiku (Google Analytics apod.)",
];

const DOMAIN_OPTIONS = ["Ano", "Ne"];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  features: string;
  hasDomain: string;
  budget: string;
  gdprConsent: boolean;
};

const init: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  features: "",
  hasDomain: "",
  budget: "",
  gdprConsent: false,
};

const FloatingField = ({
  label, id, type = "text", value, onChange, error, placeholder, isSelect, options
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder: string;
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
        color: focused ? "#00E5FF" : "rgba(255,255,255,0.4)",
        transition: "all 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        pointerEvents: "none", zIndex: 1,
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
              border: `1px solid ${focused ? "#00E5FF" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "16px",
              padding: active ? "26px 40px 10px 20px" : "20px 40px 20px 20px",
              fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px",
              color: value ? "#fff" : "transparent",
              outline: "none", width: "100%", appearance: "none",
              boxSizing: "border-box", cursor: "pointer",
              transition: "all 250ms ease",
              boxShadow: focused ? "0 0 0 4px rgba(0,229,255,0.1)" : "none",
            }}
          >
            <option value="" disabled hidden></option>
            {options?.map(opt => <option key={opt} value={opt} style={{ background: "#0D0D0D", color: "#fff" }}>{opt}</option>)}
          </select>
          <ChevronDown style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "18px", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
        </div>
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
            border: `1px solid ${focused ? "#00E5FF" : error ? "rgba(248,113,113,0.5)" : "rgba(255,255,255,0.1)"}`,
            borderRadius: "16px",
            padding: active ? "28px 20px 10px" : "20px",
            fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "16px", color: "#fff",
            outline: "none", width: "100%",
            boxSizing: "border-box", transition: "all 250ms ease",
            boxShadow: focused ? "0 0 0 4px rgba(0,229,255,0.1)" : "none",
          }}
        />
      )}
      {error && <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: "#F87171", paddingLeft: "4px", marginTop: "2px" }}>{error}</span>}
    </div>
  );
};

export const ContactFormBlock = (): JSX.Element => {
  const [form, setForm] = useState<FormState>(init);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = (f: keyof FormState) => (v: string | boolean) => {
    setForm(p => ({ ...p, [f]: v }));
    if (errors[f]) setErrors(p => ({ ...p, [f]: undefined }));
    if (submitError) setSubmitError(null);
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Zadejte jméno";
    if (!form.email.trim()) e.email = "Zadejte email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Neplatný email";
    if (!form.phone.trim()) e.phone = "Zadejte telefon";
    if (!form.projectType) e.projectType = "Vyberte typ projektu";
    if (!form.hasDomain) e.hasDomain = "Vyberte možnost";
    if (!form.gdprConsent) e.gdprConsent = "Pro odeslání je nutný souhlas se zpracováním osobních údajů.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError(null);
    const row = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      project_type: form.projectType,
      budget: form.budget.trim(),
      message: `Požadované funkce: ${form.features || "Žádné"}\nDoména/hosting: ${form.hasDomain}`,
    };
    try {
      const { error } = await supabase.from("leads").insert([row]);
      if (error) throw error;
      setForm(init);
      setSubmitted(true);
    } catch {
      setSubmitError("Odeslání se nepodařilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{ width: "100%", padding: "0 0 64px", position: "relative", backgroundColor: "transparent" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ marginBottom: "0" }}>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            padding: "48px 40px",
            boxSizing: "border-box",
          }} className="contact-form-card"
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{
                  width: "80px", height: "80px", borderRadius: "50%", background: "rgba(34,197,94,0.1)",
                  border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px"
                }}>
                  <CheckCircle2 color="#22C55E" size={40} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "28px", color: "#fff", marginBottom: "12px" }}>Děkujeme za odeslání.</h3>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.6)", marginBottom: "32px" }}>Ozveme se do 24 hodin.</p>
                <button type="button" onClick={() => setSubmitted(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif" }}>Odeslat další zprávu</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className="contact-form-grid">
                  <div className="contact-form-col" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <FloatingField id="f-name" label="Jméno (povinné)" value={form.name} onChange={set("name") as (v: string) => void} error={errors.name} placeholder="Jan Novák" />
                    <FloatingField id="f-email" label="E-mail (povinné)" type="email" value={form.email} onChange={set("email") as (v: string) => void} error={errors.email} placeholder="jan@firma.cz" />
                    <FloatingField id="f-type" label="Typ projektu (povinné)" isSelect options={PROJECT_TYPE_OPTIONS} value={form.projectType} onChange={set("projectType") as (v: string) => void} error={errors.projectType} placeholder="" />
                    <FloatingField id="f-features" label="Požadované funkce / AI nástroje" isSelect options={FEATURES_OPTIONS} value={form.features} onChange={set("features") as (v: string) => void} placeholder="" />
                  </div>
                  <div className="contact-form-col" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <FloatingField id="f-company" label="Firma" value={form.company} onChange={set("company") as (v: string) => void} placeholder="Firma s.r.o." />
                    <FloatingField id="f-phone" label="Telefon (povinné)" type="tel" value={form.phone} onChange={set("phone") as (v: string) => void} error={errors.phone} placeholder="+420 725 703 868" />
                    <FloatingField id="f-domain" label="Máte doménu / webhosting? (povinné)" isSelect options={DOMAIN_OPTIONS} value={form.hasDomain} onChange={set("hasDomain") as (v: string) => void} error={errors.hasDomain} placeholder="" />
                    <FloatingField id="f-budget" label="Rozpočet" value={form.budget} onChange={set("budget") as (v: string) => void} placeholder="např. 30 000 Kč" />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.85)" }}>
                    <input
                      type="checkbox"
                      checked={form.gdprConsent}
                      onChange={(e) => set("gdprConsent")(e.target.checked)}
                      style={{ marginTop: "4px", width: "18px", height: "18px", accentColor: "#00E5FF" }}
                      aria-invalid={!!errors.gdprConsent}
                    />
                    <span>
                      Souhlasím se zpracováním osobních údajů dle{" "}
                      <Link to="/zasady-ochrany-soukromi" style={{ color: "#00E5FF", textDecoration: "underline" }}>Zásad ochrany soukromí</Link>.
                    </span>
                  </label>
                  {errors.gdprConsent && (
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: "#F87171", paddingLeft: "30px" }}>{errors.gdprConsent}</span>
                  )}
                </div>

                {submitError && (
                  <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: "#F87171", margin: 0 }} role="alert">
                    {submitError}
                  </p>
                )}

                <div className="contact-form-submit-wrap flex w-full justify-center md:justify-start">
                  <button
                    type="submit"
                    disabled={loading}
                    id="contact-form-submit"
                    className="animate-pulse-glow hero-primary-btn"
                    style={{
                      marginTop: "8px",
                      padding: "15px 32px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #0ABDC6 0%, #00E5FF 100%)",
                      border: "none",
                      color: "#070B14",
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontWeight: 600,
                      fontSize: "16px",
                      cursor: loading ? "wait" : "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      transition: "transform 0.25s ease, filter 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      if (loading) return;
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.filter = "brightness(1.1)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.filter = "";
                    }}
                  >
                    {loading ? "Odesílám..." : <><Send size={20} /> Odeslat poptávku</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .contact-form-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-col:first-child { order: 1; }
          .contact-form-col:last-child  { order: 2; }
          .contact-form-card { padding: 28px 16px !important; }
          #contact-form-submit.hero-primary-btn {
            padding: 10px 20px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </section>
  );
};
