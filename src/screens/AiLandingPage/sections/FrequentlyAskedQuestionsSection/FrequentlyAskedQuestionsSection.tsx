import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";

const faqData = [
  {
    question: "What is this platform used for?",
    answer:
      "It's an AI-powered design assistant that helps you generate, customize, and export creative assets in seconds—whether for personal projects, brand work, or commercial use.",
  },
  {
    question: "What happens if I hit my free generation limit?",
    answer: "",
  },
  {
    question: "Do I need design experience to use it?",
    answer: "",
  },
  {
    question: "Can I collaborate with my team?",
    answer: "",
  },
  {
    question: "Is it really free to use?",
    answer: "",
  },
];

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  return (
    <section className="w-full max-w-[892px] mx-auto flex flex-col items-center gap-[76px] px-4">
      <header className="flex flex-col w-full max-w-[830px] items-center gap-[29px]">
        <h2 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[64px] text-center tracking-[0] leading-[64px]">
          Frequently Asked <br />
          Questions
        </h2>

        <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-colorwhitewhite-7 text-xl text-center tracking-[0] leading-[28.6px]">
          Got questions? We've got answers. Find everything you need to know
          about using our platform, plans, and features.
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
            key={`item-${index}`}
            value={`item-${index}`}
            className="border-b-[1.19px] border-[#ffffff1a] pb-0"
          >
            <AccordionTrigger className="flex items-start justify-between p-[23.85px] hover:no-underline [&[data-state=open]>img]:rotate-180">
              <span className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-colorwhitewhite text-xl tracking-[0] leading-[28.6px] text-left">
                {faq.question}
              </span>
              <img
                className="w-[28.62px] h-[28.62px] transition-transform duration-200 flex-shrink-0 ml-4"
                alt="Toggle icon"
                src="/faq-toggle-icon.svg"
              />
            </AccordionTrigger>
            {faq.answer && (
              <AccordionContent className="px-[23.85px] pb-[23.85px]">
                <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-colorwhitewhite-9 text-lg tracking-[-0.06px] leading-[23.9px]">
                  {faq.answer}
                </p>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
