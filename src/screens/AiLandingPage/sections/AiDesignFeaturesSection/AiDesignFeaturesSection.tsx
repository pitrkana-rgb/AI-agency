import { Card, CardContent } from "../../../../components/ui/card";

const featureCards = [
  {
    title: "Instant Ideation",
    description:
      "Skip the blank canvas and spark creativity instantly. Our AI generates high-quality, on-brand design concepts within seconds",
    icon: "/background-1.svg",
    gradient: true,
    position: "top-0 left-0",
  },
  {
    title: "Smart Adaptability",
    description:
      "No two creators are the same, and neither are their styles. Our AI learns from your inputs, understands your aesthetic preferences, and fine-tunes every design",
    icon: "/background.svg",
    gradient: false,
    position: "top-0 left-[488px]",
  },
  {
    title: "Multi-Format Export",
    description:
      "Design once, export anywhere. Whether you need high-res graphics for print, responsive visuals for the web, mobile-optimized assets,",
    icon: "/background-1.svg",
    gradient: false,
    position: "top-[219px] left-0",
  },
  {
    title: "Seamless Revisions",
    description:
      "Say goodbye to repetitive tweaks and endless back-and-forths. With intuitive prompt-based editing",
    icon: "/background.svg",
    gradient: true,
    position: "top-[219px] left-[732px]",
  },
];

export const AiDesignFeaturesSection = (): JSX.Element => {
  return (
    <section className="relative w-full max-w-[1200px] mx-auto overflow-hidden py-16">
      <div className="relative flex flex-col gap-[9.2px] mb-16">
        <div className="flex">
          <h2 className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[64px] tracking-[0] leading-[70.4px]">
            <span className="text-white">
              Designed for Designers. Powered by{" "}
            </span>
            <span className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-[#ff531f]">
              AI
            </span>
            <span className="text-white">.</span>
          </h2>
        </div>

        <p className="max-w-[661px] [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffd9] text-lg tracking-[0] leading-[21.6px]">
          Unlock the full potential of your creativity with our AI-powered
          design assistant. <br />
          Explore new dimensions of desig
        </p>
      </div>

      <div className="relative h-[438px]">
        {featureCards.map((feature, index) => (
          <Card
            key={index}
            className={`absolute ${feature.position} ${
              index === 0
                ? "w-[calc(100%_-_732px)]"
                : index === 1
                  ? "w-[calc(100%_-_488px)]"
                  : index === 2
                    ? "w-[calc(100%_-_488px)]"
                    : "w-[calc(100%_-_732px)]"
            } h-[199px] rounded-[20px] overflow-hidden ${
              feature.gradient
                ? "bg-[linear-gradient(148deg,rgba(0,0,0,0)_0%,rgba(255,60,0,0.3)_100%),linear-gradient(0deg,rgba(39,40,41,0.7)_0%,rgba(39,40,41,0.7)_100%)] border-0"
                : "bg-[#272829b2] border-[1.25px] border-solid border-[#ff531f33]"
            }`}
          >
            <CardContent className="relative p-0 h-full">
              <p className="absolute top-[19px] left-5 max-w-[448px] [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#d9d9d9d9] text-lg tracking-[0] leading-[19.2px]">
                {feature.description}
              </p>

              <img
                className="absolute top-[13px] right-2.5 w-[71px] h-[71px]"
                alt="Feature icon"
                src={feature.icon}
              />

              <h3 className="absolute top-[124px] left-5 [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-white text-[34px] tracking-[0] leading-[40.8px] whitespace-nowrap">
                {feature.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <img
        className="absolute w-[18.09%] h-[32.21%] top-0 right-[8.08%]"
        alt="Decorative element"
        src="/-05.svg"
      />
    </section>
  );
};
