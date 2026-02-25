import { ArrowRightIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ReadyToDesignSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-20">
      <div className="container mx-auto px-4 max-w-[1120px]">
        <Card className="relative overflow-hidden bg-[#ffffff0a] border-[#ffffff33] rounded-[30px]">
          <div className="absolute inset-0 pointer-events-none">
            <img
              className="absolute w-full h-full object-cover"
              alt="Mask group"
              src="/mask-group.svg"
            />
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-410px] left-0 w-full h-[850px] rounded-[10px] [background:radial-gradient(50%_50%_at_50%_33%,rgba(255,255,255,0.4)_7%,rgba(255,84,31,0.32)_24%,rgba(247,175,153,0.4)_36%,rgba(255,84,31,0.4)_50%,rgba(0,0,0,0)_100%)]" />
          </div>

          <CardContent className="relative z-10 flex flex-col items-center gap-[35px] px-4 sm:px-8 md:px-[181px] py-14">
            <h2 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-4xl sm:text-5xl md:text-[64px] text-center tracking-[0] leading-normal max-w-[789px]">
              Ready to Design Smarter?
            </h2>

            <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffcc] text-lg sm:text-xl text-center tracking-[0] leading-[22.4px] max-w-[618px]">
              Whether you&#39;re a freelancer, a team, or a growing agency—our
              tools adapt to your workflow. Design faster. Deliver better.
            </p>

            <Button className="inline-flex items-center justify-center gap-3 px-[34px] py-[15px] bg-[#ff531f] hover:bg-[#ff531f]/90 rounded-[10px] text-white [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-xl">
              Get Started
              <ArrowRightIcon className="w-[23px] h-[16px]" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
