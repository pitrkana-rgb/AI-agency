import { useState } from "react";

type FormState = { name: string; email: string; phone: string; project: string; };
const init: FormState = { name: "", email: "", phone: "", project: "" };

const FloatingField = ({
  label, id, type = "text", value, onChange, error, placeholder, multiline,
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; placeholder: string; multiline?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const Tag = multiline ? "textarea" : "input";
  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "4px" }}>
      <label htmlFor={id} style={{
        position: "absolute", left: "16px",
        top: active ? "8px" : "50%",
        transform: active ? "translateY(0) scale(0.8)" : "translateY(-50%)",
        transformOrigin: "left",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 500,
        fontSize: active ? "11px" : "14px",
        color: focused ? "#FF5A1F" : "rgba(255,255,255,0.45)",
        transition: "all 200ms ease",
        pointerEvents: "none", zIndex: 1,
        ...(multiline ? { top: active ? "8px" : "20px", transform: "none", fontSize: active ? "11px" : "14px" } : {}),
      }}>
        {label}
      </label>
      <Tag
        id={id}
        type={!multiline ? (type as string) : undefined}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        rows={multiline ? 4 : undefined}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${focused ? "#FF5A1F" : error ? "rgba(248,113,113,0.6)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "12px",
          padding: active ? (multiline ? "28px 16px 12px" : "24px 16px 8px") : "16px",
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "#fff",
          outline: "none", resize: "none", width: "100%",
          boxSizing: "border-box" as const,
          transition: "border-color 200ms ease",
          boxShadow: focused ? "0 0 0 3px rgba(255,90,31,0.12)" : "none",
        }}
      />
      {error && <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "12px", color: "rgba(248,113,113,0.9)", paddingLeft: "4px" }}>{error}</span>}
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
    if (!form.name.trim()) e.name = "Zadejte prosím své jméno.";
    if (!form.email.trim()) e.email = "Zadejte prosím svůj e‑mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Zadejte platnou e‑mailovou adresu.";
    if (!form.phone.trim()) e.phone = "Zadejte prosím telefon.";
    if (!form.project.trim()) e.project = "Napište nám krátce o vašem projektu.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setForm(init);
  };

  return (
    <section style={{ width: "100%", backgroundColor: "#000", padding: "96px 0 120px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>

          {/* Left: headline + trust */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,3.5vw,48px)", color: "#fff", margin: "0 0 20px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                Napište nám o vašem projektu
              </h2>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                Pár vět stačí. Ozveme se vám do 24 hodin, projdeme vaše cíle a navrhneme konkrétní další kroky – bez závazku.
              </p>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {["Odpovídáme do 24 hodin", "Nezávazná konzultace zdarma", "Pracujeme po celé ČR i online"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,90,31,0.15)", border: "1px solid rgba(255,90,31,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF5A1F" }} />
                  </div>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.7)" }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Ambient glow */}
            <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,90,31,0.15) 0%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
          </div>

          {/* Right: form */}
          <div style={{
            background: "linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px", padding: "40px",
          }}>
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "32px 0", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "20px", color: "#fff", margin: 0 }}>Zpráva odeslána!</h3>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "15px", color: "rgba(255,255,255,0.6)", margin: 0 }}>Děkujeme, ozveme se vám do 24 hodin.</p>
                <button type="button" onClick={() => setSubmitted(false)}
                  style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", padding: "8px 20px", fontFamily: "'Space Grotesk',sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.6)", cursor: "pointer", marginTop: "8px" }}>
                  Odeslat další
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <FloatingField id="f-name" label="Jméno" value={form.name} onChange={set("name")} error={errors.name} placeholder="Jan Novák" />
                  <FloatingField id="f-email" label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="jan@firma.cz" />
                </div>
                <FloatingField id="f-phone" label="Telefon" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} placeholder="+420 123 456 789" />
                <FloatingField id="f-project" label="Popis projektu" value={form.project} onChange={set("project")} error={errors.project} placeholder="Stručně nám napište o vašem projektu..." multiline />

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: "15px 32px",
                    background: loading ? "rgba(255,90,31,0.5)" : "linear-gradient(135deg,#FF6A2A,#FF3C00)",
                    border: "none", borderRadius: "12px",
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "16px", color: "#fff",
                    cursor: loading ? "wait" : "pointer",
                    transition: "filter 250ms ease, transform 250ms ease",
                    boxShadow: "0 12px 30px rgba(255,90,31,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  }}
                  onMouseEnter={e => { if (!loading) { const b = e.currentTarget as HTMLButtonElement; b.style.filter = "brightness(1.08)"; b.style.transform = "translateY(-2px)"; } }}
                  onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.filter = ""; b.style.transform = ""; }}
                >
                  {loading ? (
                    <>
                      <div style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Odesílám...
                    </>
                  ) : "Odeslat poptávku"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){ .contact-grid{ grid-template-columns:1fr !important; gap:40px !important; } .form-row{ grid-template-columns:1fr !important; } }
        @keyframes spin{ to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
};
