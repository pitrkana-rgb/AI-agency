import { StarIcon } from "lucide-react";

const testimonials = [
  { name: "Jan Novák", role: "CEO, e‑shop s módou", text: "Za tři týdny jsme nasadili AI agenta pro zákaznickou podporu. Dnes odbaví většinu dotazů bez zásahu člověka a tým má čas řešit důležité požadavky." },
  { name: "Lucie Procházková", role: "Marketing, B2B SaaS", text: "Pomohli nám ujasnit, kde má AI smysl a kde ne. Díky automatizaci lead kvalifikace šetříme desítky hodin měsíčně." },
  { name: "Petr Svoboda", role: "Zakladatel, digitální agentura", text: "Nešlo jen o technologii, ale o celý proces. Od workshopu po nasazení jsme měli jasnou roadmapu a rychlé iterace." },
  { name: "Eva Černá", role: "COO, logistická firma", text: "AI agent nám výrazně zrychlil zpracování objednávek. Nejvíc oceňuji kombinaci technického přehledu a lidského přístupu." },
  { name: "Tomáš Dvořák", role: "Founder, konzultační studio", text: "Společně jsme postavili interní znalostního agenta. Tým má odpovědi na pár kliknutí a onboarding nových lidí je mnohem rychlejší." },
  { name: "Michaela Králová", role: "Head of CX, marketplace", text: "Design webu, AI chatbot i automatizace ticketů vznikaly paralelně. Výsledek je konzistentní a hlavně měřitelný." },
  { name: "Ondřej Konečný", role: "CTO, fintech startup", text: "Překvapilo mě, jak rychle dokázali pochopit naši architekturu. AI nástroje zapadly do stávajícího stacku bez zbytečného chaosu." },
  { name: "Barbora Veselá", role: "HR, technologická firma", text: "Automatizovali jsme část náboru a komunikaci s kandidáty. Ušetřený čas věnujeme osobním pohovorům místo administrativy." },
  { name: "Filip Hruška", role: "Product Owner, SaaS", text: "Pomohl nám otestovat několik AI konceptů na malých experimentech. Teď víme, do čeho má smysl investovat naplno." },
  { name: "Kristýna Malá", role: "CMO, služba pro freelancery", text: "Nový web i automatizované kampaně jsou navržené tak, aby šly dál rozvíjet. Nemáme pocit \u201ehotového webu\u201c, ale živého produktu." },
  { name: "Martin Pokorný", role: "Majitel, výrobní firma", text: "AI pomáhá plánovat kapacity a reporty. Líbí se mi, že řešení je praktické a ne jen \u201ehračka s AI\u201c." },
  { name: "Zuzana Jelínková", role: "Projektová manažerka, NGO", text: "Společně jsme zjednodušili formuláře a komunikaci s dárci. Automatizace běží na pozadí, ale pro uživatele je vše srozumitelné." },
  { name: "Daniel Beneš", role: "Founder, edtech projekt", text: "AI agent pro studenty nám pomáhá zodpovídat časté dotazy a šetří práci tutorů. Implementace byla rychlá a dobře zdokumentovaná." },
  { name: "Alena Růžičková", role: "Manažerka provozu, realitní kancelář", text: "Automatizace procesů a nový web nám pomohly lépe třídit poptávky. Máme přehled a méně manuální práce." },
  { name: "Jakub Mareš", role: "Spoluzakladatel, AI startup", text: "Byli pro nás sparring partnerem v produktovém přemýšlení. Od UX po technickou architekturu AI částí." },
];

const initials = (name: string) => name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
const colors = ["#FF6A2A", "#7B61FF", "#19B9A0", "#F59E0B", "#EC4899", "#3B82F6", "#10B981"];
const colorFor = (i: number) => colors[i % colors.length];

const TestimonialCard = ({ t, i }: { t: typeof testimonials[0]; i: number }) => (
  <div style={{
    flexShrink: 0,
    width: "340px",
    background: "linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }}>
    {/* Stars */}
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, si) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static
        <StarIcon key={si} fill="#FF5A1F" className="w-3.5 h-3.5 text-[#FF5A1F]" />
      ))}
    </div>
    {/* Quote */}
    <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: 1.65, color: "rgba(255,255,255,0.82)", margin: 0, flex: 1 }}>
      "{t.text}"
    </p>
    {/* Author */}
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{
        width: "38px", height: "38px", borderRadius: "50%", flexShrink: 0,
        background: `linear-gradient(135deg,${colorFor(i)},${colorFor(i + 3)})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "13px", color: "#fff",
      }}>
        {initials(t.name)}
      </div>
      <div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff" }}>{t.name}</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{t.role}</div>
      </div>
    </div>
  </div>
);

const row1 = [...testimonials, ...testimonials];

export const ClientTestimonialsSection = (): JSX.Element => (
  <section style={{ width: "100%", backgroundColor: "#000", padding: "96px 0" }}>
    {/* Header */}
    <div style={{ maxWidth: "1200px", margin: "0 auto 56px", padding: "0 24px" }}>
      <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: "clamp(28px,4vw,48px)", color: "#fff", marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        Co o spolupráci říkají klienti
      </h2>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 400, fontSize: "18px", color: "rgba(255,255,255,0.65)", margin: 0, maxWidth: "560px" }}>
        Reálné příběhy týmů, kterým pomáháme s webem, automatizací i nasazením AI agentů do každodenního provozu.
      </p>
    </div>

    {/* Marquee row */}
    <div style={{ position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { const wrapper = e.currentTarget.querySelector(".marquee-inner") as HTMLElement; if (wrapper) wrapper.style.animationPlayState = "paused"; }}
      onMouseLeave={e => { const wrapper = e.currentTarget.querySelector(".marquee-inner") as HTMLElement; if (wrapper) wrapper.style.animationPlayState = "running"; }}
    >
      {/* Edge fades */}
      <div style={{ position: "absolute", insetBlock: 0, left: 0, width: "120px", background: "linear-gradient(90deg,#000,transparent)", zIndex: 10, pointerEvents: "none" }} />
      <div style={{ position: "absolute", insetBlock: 0, right: 0, width: "120px", background: "linear-gradient(270deg,#000,transparent)", zIndex: 10, pointerEvents: "none" }} />

      <div
        className="marquee-inner"
        style={{
          display: "flex", gap: "20px", width: "max-content",
          animation: "marquee 50s linear infinite",
        }}
      >
        {row1.map((t, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: duplicated marquee
          <TestimonialCard key={i} t={t} i={i} />
        ))}
      </div>
    </div>

    <style>{`
      @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes marquee-reverse { from{transform:translateX(-50%)} to{transform:translateX(0)} }
      @media(prefers-reduced-motion:reduce){ .marquee-inner{ animation:none !important; } }
    `}</style>
  </section>
);
