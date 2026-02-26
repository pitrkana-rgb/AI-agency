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
              Připraveni povýšit váš business s námi?
            </h2>

            <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffcc] text-lg sm:text-xl text-center tracking-[0] leading-[22.4px] max-w-[618px]">
              Ať už jste menší tým nebo rostoucí firma, můžeme začít nezávaznou
              konzultací, jednorázovým workshopem nebo konkrétním projektem.
              Společně vybereme tempo i rozsah spolupráce tak, aby vám dávala
              smysl dlouhodobě.
            </p>

            <Button className="inline-flex items-center justify-center gap-3 px-[34px] py-[15px] bg-gradient-to-r from-[#ff7a3b] to-[#ff531f] hover:from-[#ff8950] hover:to-[#ff531f] rounded-[10px] text-white [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-xl shadow-[0_0_25px_rgba(255,83,31,0.6)] hover:shadow-[0_0_40px_rgba(255,83,31,0.9)] transition-transform duration-300 hover:scale-[1.05]">
              Nezávazně nás kontaktujte
              <ArrowRightIcon className="w-[23px] h-[16px]" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
