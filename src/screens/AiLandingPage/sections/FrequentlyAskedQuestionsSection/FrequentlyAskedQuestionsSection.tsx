import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

const faqData = [
  {
    question: "Jak probíhá první spolupráce?",
    answer:
      "Začínáme krátkým online callem, kde společně pojmenujeme cíle, aktuální situaci a možné překážky. Na základě toho navrhneme konkrétní další kroky – od jednorázového workshopu po dlouhodobější spolupráci. Vše dostanete přehledně sepsané.",
  },
  {
    question: "Je pro spolupráci potřeba mít jasno v zadání?",
    answer:
      "Nemusíte mít hotový brief ani přesně vědět, jaké AI řešení potřebujete. Pomůžeme vám od úplného začátku – společně zmapujeme příležitosti, ověříme nápady na malých experimentech a teprve potom se pouštíme do větší implementace.",
  },
  {
    question: "Jaké technologie a nástroje používáte?",
    answer:
      "Vycházíme z vašeho stávajícího stacku a procesů. Pracujeme s moderním webovým frontendem, nástroji pro automatizaci (např. Make, n8n, Zapier) a s AI modely, které dávají smysl pro daný use‑case. Vždy dbáme na bezpečné zacházení s daty.",
  },
  {
    question: "Dokážete pomoct i menším firmám nebo freelancerům?",
    answer:
      "Ano. Často začínáme právě s menšími týmy, kde má každá hodina navíc velký dopad. Umíme navrhnout řešení, které je finančně i časově realistické – od jednoduchého AI agenta přes chytré formuláře až po kompletní redesign webu.",
  },
  {
    question: "Jaká je orientační cena a doba dodání?",
    answer:
      "U webů se většina projektů pohybuje od 24 900 Kč výše, u AI agentů a automatizací od 29 900 Kč. Délka spolupráce bývá typicky 3–8 týdnů podle rozsahu. Konkrétní odhad vždy dostanete po úvodní konzultaci ještě před tím, než se do projektu pustíme.",
  },
];

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[892px] mx-auto flex flex-col items-center gap-[76px] px-4 mt-24">
      <header className="flex flex-col w-full max-w-[830px] items-center gap-[29px]">
        <h2 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[64px] text-center tracking-[0] leading-[64px]">
          Často kladené dotazy
        </h2>

        <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-colorwhitewhite-7 text-xl text-center tracking-[0] leading-[28.6px]">
          Zajímá vás, jak spolupráce probíhá v praxi? Připravili jsme odpovědi
          na otázky, které od klientů dostáváme nejčastěji.
        </p>
      </header>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="w-full flex flex-col gap-[22.66px]"
      >
        {faqData.map((faq, index) => (
          <AccordionItem
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            key={`item-${index}`}
            value={`item-${index}`}
            className="border-b-[1.19px] border-[#ffffff1a] pb-0"
          >
            <AccordionTrigger className="flex items-start justify-between p-[23.85px] hover:no-underline [&[data-state=open]>img]:rotate-180 transition-all duration-200">
              <span className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-colorwhitewhite text-xl tracking-[0] leading-[28.6px] text-left">
                {faq.question}
              </span>
              <img
                className="w-[28.62px] h-[28.62px] transition-transform duration-200 flex-shrink-0 ml-4"
                alt="Toggle icon"
                src="/faq-toggle-icon.svg"
              />
            </AccordionTrigger>
            <AccordionContent className="px-[23.85px] pb-[23.85px]">
              <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-colorwhitewhite-9 text-lg tracking-[-0.06px] leading-[23.9px]">
                {faq.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

