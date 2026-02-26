import { ChevronRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const pricingPlans = [
  {
    name: "Webdesign",
    description:
      "Moderní, rychlý a srozumitelný web, který od první sekundy vysvětlí, co děláte a proč by to mělo zajímat vaše klienty.",
    price: "od 24 900 Kč",
    period: "",
    discount: null,
    features: [
      "UX konzultace a návrh struktury webu",
      "Design na míru včetně mobilní verze",
      "Implementace v moderním frontendu",
      "Základní SEO a měření návštěvnosti",
    ],
    iconSrc: "/feature-icon.svg",
    highlighted: false,
    borderRadius: "rounded-[20px_0px_0px_20px]",
    nameColor: "text-white",
    nameSize: "text-lg",
    nameBold: "font-normal",
  },
  {
    name: "AI Agenti & Automatizace",
    description:
      "Návrh a implementace AI agentů a automatizací, které šetří čas vašemu týmu a zvyšují kvalitu služeb.",
    price: "od 29 900 Kč",
    period: "",
    discount: null,
    features: [
      "Workshop a mapování příležitostí pro AI",
      "Návrh konkrétního AI agenta nebo automatizace",
      "Napojení na vaše nástroje a data",
      "Nastavení metrik a průběžná optimalizace",
    ],
    iconSrc: "/feature-icon-2.svg",
    highlighted: true,
    borderRadius: "rounded-[0px_20px_20px_0px]",
    nameColor: "text-[#ff531f]",
    nameSize: "text-3xl",
    nameBold: "font-bold",
  },
];

export const SubscriptionPlansSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[1199px] items-center gap-[45px] relative mx-auto px-4">
      <header className="flex flex-col max-w-[780px] items-center gap-5 relative">
        <h2 className="relative flex items-center justify-center max-w-[600px] [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[64px] text-center tracking-[0] leading-[64px]">
          Vyberte službu
        </h2>

        <p className="relative flex items-center justify-center [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-colorwhitewhite-7 text-xl text-center tracking-[0] leading-6">
          Ať už potřebujete nový web, AI agenty nebo kombinaci obojího, vybereme
          společně formu spolupráce, která dává smysl vašemu týmu i rozpočtu.
        </p>
      </header>

      <div className="flex flex-col items-center gap-[25px] relative w-full">
        <div className="flex items-stretch relative w-full">
          {pricingPlans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`flex flex-col flex-1 items-center gap-[35px] px-[30px] py-5 relative bg-[#1b1b1c] border ${
                plan.highlighted
                  ? "border-[none] before:content-[''] before:absolute before:inset-0 before:p-[3px] before:rounded-[20px] before:[background:linear-gradient(180deg,rgba(255,112,68,1)_0%,rgba(100,24,0,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"
                  : "border-solid border-[#ffffff1a]"
              } ${plan.borderRadius}`}
            >
              <CardContent className="flex flex-col w-full gap-[35px] p-0">
                <div className="flex flex-col items-start gap-6 px-8 py-0 relative w-full">
                  <h3
                    className={`relative flex items-center justify-center w-fit [font-family:'Sk-Modernist-Bold',Helvetica] ${plan.nameBold} ${plan.nameColor} ${plan.nameSize} tracking-[0] leading-[normal] whitespace-nowrap`}
                  >
                    {plan.name}
                  </h3>

                  <p className="relative flex items-center justify-center w-fit [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-6 whitespace-pre-line">
                    {plan.description}
                  </p>

                  <div className="inline-flex items-center gap-2 relative">
                    <span className="relative flex items-center justify-center w-fit [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[40px] tracking-[-1.60px] leading-[normal] whitespace-nowrap">
                      {plan.price}
                    </span>

                    <span className="relative flex items-center justify-center w-fit [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-6 whitespace-nowrap">
                      {plan.period}
                    </span>

                    {plan.discount && (
                      <Badge className="inline-flex items-center justify-center gap-2.5 px-2 py-[5px] relative bg-[#ff531f] rounded-3xl border-none hover:bg-[#ff531f]">
                        <span className="relative flex items-center justify-center [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-xs tracking-[0] leading-[14px] whitespace-nowrap">
                          {plan.discount}
                        </span>
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="relative w-full h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_100%)]" />

                <div className="flex flex-col items-start gap-[15px] px-8 py-0 w-full">
                  <p className="flex items-center justify-center [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-6 w-full">
                    What&apos;s included
                  </p>

                  <ul className="flex flex-col items-start gap-3.5 relative w-full">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 relative w-full"
                      >
                        <img
                          className="relative w-6 h-6 flex-shrink-0"
                          alt="Feature icon"
                          src={plan.iconSrc}
                        />

                        <span className="relative flex items-center justify-center flex-1 [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffbf] text-base tracking-[0] leading-6">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="inline-flex flex-col items-start relative rounded-[10px]">
                  <Button className="inline-flex items-center gap-3 px-5 py-2.5 relative bg-dark-modecontainer-background rounded-lg border-none shadow-shadow-blur-sm backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-lg before:[background:linear-gradient(30deg,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none hover:bg-dark-modecontainer-background transition-transform duration-300 hover:scale-[1.03]">
                    <span className="relative flex items-center justify-center w-fit [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-white text-lg tracking-[0] leading-[normal]">
                      {plan.name === "Webdesign" ? "Chci web" : "Chci AI řešení"}
                    </span>

                    <ChevronRightIcon className="relative w-6 h-6" />
                  </Button>

                  <div className="absolute w-[calc(100%_+_20px)] h-[calc(100%_+_20px)] -top-2.5 -left-2.5 rounded-[10px] blur-[10px] [background:conic-gradient(from_164deg_at_50%_50%,rgba(255,84,31,1)_26%,rgba(255,84,31,1)_52%,rgba(255,84,31,1)_76%,rgba(255,84,31,1)_100%)] opacity-20 pointer-events-none" />

                  <div className="absolute w-full h-full top-0 left-0 rounded-lg border-none before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-lg before:[background:linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.5)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none pointer-events-none" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
