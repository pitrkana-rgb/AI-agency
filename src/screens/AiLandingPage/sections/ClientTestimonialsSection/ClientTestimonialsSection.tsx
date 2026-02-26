import { StarIcon } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

const testimonials = [
  {
    name: "Jan Novák",
    role: "CEO, e‑shop s módou",
    text: "Za tři týdny jsme nasadili AI agenta pro zákaznickou podporu. Dnes odbaví většinu dotazů bez zásahu člověka a tým má čas řešit důležité požadavky.",
  },
  {
    name: "Lucie Procházková",
    role: "Marketing, B2B SaaS",
    text: "Pomohli nám ujasnit, kde má AI smysl a kde ne. Díky automatizaci lead kvalifikace šetříme desítky hodin měsíčně.",
  },
  {
    name: "Petr Svoboda",
    role: "Zakladatel, digitální agentura",
    text: "Nešlo jen o technologii, ale o celý proces. Od workshopu po nasazení jsme měli jasnou roadmapu a rychlé iterace.",
  },
  {
    name: "Eva Černá",
    role: "COO, logistická firma",
    text: "AI agent nám výrazně zrychlil zpracování objednávek. Nejvíc oceňuji kombinaci technického přehledu a lidského přístupu.",
  },
  {
    name: "Tomáš Dvořák",
    role: "Founder, konzultační studio",
    text: "Společně jsme postavili interní znalostního agenta. Tým má odpovědi na pár kliknutí a onboarding nových lidí je mnohem rychlejší.",
  },
  {
    name: "Michaela Králová",
    role: "Head of CX, marketplace",
    text: "Design webu, AI chatbot i automatizace ticketů vznikaly paralelně. Výsledek je konzistentní a hlavně měřitelný.",
  },
  {
    name: "Ondřej Konečný",
    role: "CTO, fintech startup",
    text: "Překvapilo mě, jak rychle dokázali pochopit naši architekturu. AI nástroje zapadly do stávajícího stacku bez zbytečného chaosu.",
  },
  {
    name: "Barbora Veselá",
    role: "HR, technologická firma",
    text: "Automatizovali jsme část náboru a komunikaci s kandidáty. Ušetřený čas věnujeme osobním pohovorům místo administrativy.",
  },
  {
    name: "Filip Hruška",
    role: "Product Owner, SaaS",
    text: "Pomohl nám otestovat několik AI konceptů na malých experimentech. Teď víme, do čeho má smysl investovat naplno.",
  },
  {
    name: "Kristýna Malá",
    role: "CMO, služba pro freelancery",
    text: "Nový web i automatizované kampaně jsou navržené tak, aby šly dál rozvíjet. Nemáme pocit „hotového webu“, ale živého produktu.",
  },
  {
    name: "Martin Pokorný",
    role: "Majitel, výrobní firma",
    text: "AI pomáhá plánovat kapacity a reporty. Líbí se mi, že řešení je praktické a ne jen „hračka s AI“.",
  },
  {
    name: "Zuzana Jelínková",
    role: "Projektová manažerka, NGO",
    text: "Společně jsme zjednodušili formuláře a komunikaci s dárci. Automatizace běží na pozadí, ale pro uživatele je vše srozumitelné.",
  },
  {
    name: "Daniel Beneš",
    role: "Founder, edtech projekt",
    text: "AI agent pro studenty nám pomáhá zodpovídat časté dotazy a šetří práci tutorů. Implementace byla rychlá a dobře zdokumentovaná.",
  },
  {
    name: "Alena Růžičková",
    role: "Manažerka provozu, realitní kancelář",
    text: "Automatizace procesů a nový web nám pomohly lépe třídit poptávky. Máme přehled a méně manuální práce.",
  },
  {
    name: "Jakub Mareš",
    role: "Spoluzakladatel, AI startup",
    text: "Byli pro nás sparring partnerem v produktovém přemýšlení. Od UX po technickou architekturu AI částí.",
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

export const ClientTestimonialsSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-20">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <header className="flex flex-col gap-4 mb-10">
          <h2 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[40px] md:text-[52px] tracking-[0] leading-tight">
            Co o spolupráci říkají klienti
          </h2>
          <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffb2] text-lg max-w-[640px]">
            Reálné příběhy týmů, kterým pomáháme s webem, automatizací i
            nasazením AI agentů do každodenního provozu.
          </p>
        </header>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#010101] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#010101] to-transparent z-10" />

          <div className="flex gap-6 min-w-max" style={{ animation: "marquee 45s linear infinite" }}>
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card
                // biome-ignore lint/suspicious/noArrayIndexKey: duplicated static list
                key={index}
                className="relative w-[320px] md:w-[360px] lg:w-[380px] bg-[#141415] border border-[#ffffff1a] rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,83,31,0.4)]"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[radial-gradient(circle_at_30%_20%,#fff_0%,#ffb89b_40%,#ff531f_80%)] shadow-[0_0_0_2px_rgba(0,0,0,0.7)]" />
                      <div className="flex flex-col">
                        <span className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-sm">
                          {testimonial.name}
                        </span>
                        <span className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffff80] text-xs">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: static stars
                        <StarIcon
                          key={starIndex}
                          className="w-3.5 h-3.5 text-[#ffb547]"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffcc] text-sm leading-relaxed">
                    {testimonial.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

