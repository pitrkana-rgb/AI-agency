import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const milestones = [
  {
    number: "2014",
    title: "Year of establishment",
    description: "More than 10 years in the field",
    image: "/images.png",
  },
  {
    number: "304",
    title: "Projects are launched",
    description: "A lot of projects are done",
    image: "/images-1.png",
  },
  {
    number: "189",
    title: "Clients are satisfied",
    description: "These people love us",
    image: "/images-2.png",
  },
  {
    number: "12",
    title: "Projects in work",
    description: "What we do right now",
    image: "/group-187.png",
  },
];

export const CompanyMilestonesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full max-w-[1245px] mx-auto items-center gap-[49px] px-4 py-8">
      <header className="flex items-start gap-[27px] w-full">
        <div className="opacity-60 [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-base tracking-[-0.48px] leading-[39.7px] text-white whitespace-nowrap">
          2025
        </div>

        <div className="flex-1 [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[28px] tracking-[-0.84px] leading-[39.2px]">
          Whether you&#39;re designing for personal projects, creative teams, or
          large-scale campaigns, our AI-powered platform is built to bring your
          ideas to life—quickly, beautifully, and intelligently.
          <br />
          And the results? The numbers speak for themselves:
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {milestones.map((milestone, index) => (
          <Card key={index} className="bg-transparent border-none">
            <CardContent className="p-0 flex flex-col gap-2">
              <div className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[67.1px] tracking-[-3.36px] leading-[74.6px] whitespace-nowrap">
                {milestone.number}
              </div>

              <div className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-white text-[22.4px] tracking-[-0.67px] leading-[29.8px] whitespace-nowrap">
                {milestone.title}
              </div>

              <div className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-textgrey text-[14.9px] tracking-[-0.45px] leading-[20.5px] whitespace-nowrap">
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

      <div className="flex flex-wrap items-center gap-[30px]">
        <Button className="inline-flex items-center justify-center gap-3 px-[34px] py-[15px] bg-[#ff531f] hover:bg-[#ff531f]/90 rounded-[10px] [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-xl tracking-[0] leading-[19.2px]">
          Get Started
          <img className="w-[23px] h-[16.1px]" alt="Arrow" src="/vector.svg" />
        </Button>

        <div className="flex items-center gap-2">
          <span className="opacity-60 [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-white text-[16.1px] tracking-[-0.48px] leading-[18.7px] whitespace-nowrap">
            Slots are avaliable
          </span>
          <Badge className="w-[7.46px] h-[7.46px] bg-avaliable rounded-[3.73px] p-0" />
        </div>
      </div>
    </section>
  );
};
