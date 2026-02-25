import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

export const MainHeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2 translate-x-[291px] w-[774px] h-[985px] object-cover"
          alt="Background decoration"
          src="/image-88.png"
        />
        <img
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-x-[483px] w-[666px] h-[985px]"
          alt="Background decoration"
          src="/image-87.png"
        />
      </div>

      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-y-[159px] -translate-x-[123px] w-[1259px] h-[796px] pointer-events-none"
        alt="Decorative element"
        src="/group-1707480375.png"
      />

      <div className="relative z-10 flex flex-col items-center gap-[27px] max-w-[1005px] mx-auto px-4">
        <Badge
          variant="outline"
          className="inline-flex items-center gap-[13.2px] px-[23.56px] py-[15.08px] rounded-[50.9px] border-[0.94px] border-[#ffffff26] bg-[linear-gradient(90deg,rgba(255,84,31,0.13)_0%,rgba(255,84,31,0.04)_100%)]"
        >
          <img
            className="w-[151.84px] h-[45.33px]"
            alt="Client avatars"
            src="/container-1.svg"
          />
          <div className="relative w-[141.84px] h-[42.14px] overflow-hidden">
            <img
              className="absolute top-0 left-0 w-[84px] h-4"
              alt="Rating stars"
              src="/container.svg"
            />
            <p className="absolute top-[19px] left-0 w-[142px] [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffa6] text-[16.9px] tracking-[-0.36px] leading-[21.8px] whitespace-nowrap">
              115+ happy clients
            </p>
          </div>
        </Badge>

        <h1 className="w-full [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-[80px] text-center tracking-[0] leading-[88px]">
          <span className="text-white">Automate </span>
          <span className="text-[#ff531f]">Intelligence</span>
          <span className="text-white">. Accelerate Growth.</span>
        </h1>

        <p className="max-w-[681px] [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffb2] text-[22px] text-center tracking-[0] leading-normal">
          Our AI-powered SaaS platform empowers businesses to streamline
          operations, automate repetitive tasks, and make smarter, data-driven
          decisions—all from one intuitive dashboard.
        </p>

        <div className="inline-flex items-center gap-[23px]">
          <Button className="px-[35px] py-[15px] bg-[#ff531f] hover:bg-[#ff531f]/90 rounded-[10px] [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-xl tracking-[0] leading-[19.2px]">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-[35px] py-[15px] rounded-[10px] border-[#fcfcfc3b] hover:bg-white/5 [font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-white text-xl tracking-[0] leading-[19.2px]"
          >
            See Details
          </Button>
        </div>
      </div>
    </section>
  );
};
