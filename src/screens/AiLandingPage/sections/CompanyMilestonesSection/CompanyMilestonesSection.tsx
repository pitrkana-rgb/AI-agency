import { Card, CardContent } from "../../../../components/ui/card";

const milestones = [
  {
    number: "2024",
    title: "Založení studia",
    description: "Kombinujeme webdesign, automatizaci a AI agenty.",
    image: "/images.png",
  },
  {
    number: "38+",
    title: "Realizovaných AI projektů",
    description: "Od proof‑of‑conceptů po dlouhodobě škálovaná řešení.",
    image: "/images-1.png",
  },
  {
    number: "15+",
    title: "Oborů, ve kterých působíme",
    description: "E‑commerce, SaaS, služby, výroba a další.",
    image: "/images-2.png",
  },
  {
    number: "4",
    title: "Lidé v core týmu",
    description: "Seniorní product, design, vývoj a automatizace.",
    image: "/group-187.png",
  },
];

export const CompanyMilestonesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[1245px] mx-auto items-center gap-[49px] px-4 py-16">
      <header className="flex items-start gap-[27px] w-full">
        <div className="opacity-60 [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-base tracking-[-0.48px] leading-[39.7px] text-white whitespace-nowrap">
          2025
        </div>

        <div className="flex-1 [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[28px] tracking-[-0.84px] leading-[39.2px]">
          Začínali jsme jako malé studio pro weby a automatizace. Dnes navrhujeme
          a implementujeme AI řešení, která šetří čas, zvyšují tržby a uvolňují
          ruce vašim týmům.
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {milestones.map((milestone, index) => (
          <Card
            // biome-ignore lint/suspicious/noArrayIndexKey: statická mapa
            key={index}
            className="bg-transparent border-none"
          >
            <CardContent className="p-0 flex flex-col gap-3">
              <div className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[67.1px] tracking-[-3.36px] leading-[74.6px] whitespace-nowrap">
                {milestone.number}
              </div>

              <div className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-white text-[22.4px] tracking-[-0.67px] leading-[29.8px] whitespace-nowrap">
                {milestone.title}
              </div>

              <div className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-textgrey text-[14.9px] tracking-[-0.45px] leading-[20.5px]">
                {milestone.description}
              </div>

              <img
                className="w-full h-auto mt-4"
                alt={milestone.title}
                src={milestone.image}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
