import { MessageCircleIcon, CheckCircle2Icon, Code2Icon, CogIcon } from "lucide-react";

const steps = [
  { num: "01", title: "Nezávazná poptávka", description: "Krátký call nebo zpráva, kde společně projdeme váš business, cíle a aktuální procesy. Navrhneme konkrétní AI příležitosti.", icon: MessageCircleIcon },
  { num: "02", title: "Validace & úpravy", description: "Ověříme, kde dává AI skutečně smysl. Společně doladíme zadání, aby návrh řešení zapadl do vašeho týmu i stávajících nástrojů.", icon: CheckCircle2Icon },
  { num: "03", title: "Spolupráce & vývoj", description: "Navrhujeme UX, automatizace i AI agenty. Vše průběžně testujeme, komunikujeme v češtině a doručujeme v jasných iteracích.", icon: Code2Icon },
  { num: "04", title: "Škálování & automatizace", description: "Napojíme nástroje, nastavíme metriky a vytrénujeme vaše AI agenty tak, aby se z experimentu stala dlouhodobá konkurenční výhoda.", icon: CogIcon },
];

export const AiDesignFeaturesSection = (): JSX.Element => (
  <section id="features" style={{ width: "100%", backgroundColor: "#000", padding: "96px 0 120px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

      {/* Section badge + headline */}
      <div style={{ marginBottom: "72px", textAlign: "center" }}>
        <span style={{
          display: "inline-block", background: "rgba(255,90,31,0.12)", border: "1px solid rgba(255,90,31,0.3)",
          borderRadius: "999px", padding: "6px 16px", fontFamily: "'Space Grotesk',sans-serif",
          fontWeight: 500, fontSize: "13px", letterSpacing: "0.06em", color: "#FF5A1F",
          textTransform: "uppercase" as const, marginBottom: "24px",
        }}>
          Jak to funguje
        </span>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(32px,4.5vw,52px)", lineHeight: 1.1, color: "#fff", margin: "0 auto 20px", letterSpacing: "-0.02em", maxWidth: "700px" }}>
          Povyšte váš business díky{" "}
          <span style={{ background: "linear-gradient(135deg,#FF6A2A,#FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI</span>
        </h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", margin: "0 auto", maxWidth: "560px" }}>
          Navrhujeme AI řešení, která propojují váš web, interní nástroje i tým. Od prvního nápadu až po škálování.
        </p>
      </div>

      {/* Horizontal stepper */}
      <div className="stepper-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0", position: "relative" }}>
        {/* Connecting gradient line */}
        <div style={{
          position: "absolute", top: "32px", left: "12.5%", right: "12.5%", height: "1px",
          background: "linear-gradient(90deg, #FF5A1F 0%, rgba(255,90,31,0.3) 50%, rgba(255,90,31,0.1) 100%)",
          zIndex: 0,
        }} className="stepper-line" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="step-block"
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 16px", position: "relative", zIndex: 1 }}
            >
              {/* Numbered circle */}
              <div
                className="step-circle"
                style={{
                  width: "64px", height: "64px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#FF6A2A,#FF3C00)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "24px", flexShrink: 0,
                  boxShadow: "0 0 0 0 rgba(255,90,31,0.4)",
                  transition: "box-shadow 250ms ease, transform 250ms ease",
                  position: "relative",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 0 0 12px rgba(255,90,31,0.15)"; el.style.transform = "scale(1.08)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = "0 0 0 0 rgba(255,90,31,0.4)"; el.style.transform = ""; }}
              >
                <Icon style={{ width: "24px", height: "24px", color: "#fff" }} strokeWidth={1.75} />
                <span style={{
                  position: "absolute", top: "-6px", right: "-6px",
                  width: "22px", height: "22px", borderRadius: "50%",
                  background: "#000", border: "1px solid rgba(255,90,31,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "10px", color: "#FF5A1F",
                }}>
                  {i + 1}
                </span>
              </div>

              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "18px", color: "#fff", marginBottom: "12px", lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>

    <style>{`
      @media(max-width:768px){
        .stepper-grid{ grid-template-columns:repeat(2,1fr) !important; gap:40px !important; }
        .stepper-line{ display:none !important; }
      }
      @media(max-width:480px){
        .stepper-grid{ grid-template-columns:1fr !important; }
        .step-block{ align-items:flex-start !important; text-align:left !important; flex-direction:row !important; gap:20px; }
        .step-circle{ margin-bottom:0 !important; flex-shrink:0; }
      }
      @media(prefers-reduced-motion:reduce){ .step-circle{ transition:none !important; } }
    `}</style>
  </section>
);
