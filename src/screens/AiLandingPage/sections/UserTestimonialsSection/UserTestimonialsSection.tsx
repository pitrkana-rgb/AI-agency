import { Separator } from "../../../../components/ui/separator";

const statsData = [
  {
    label: "Clients",
    value: "120K+",
  },
  {
    label: "Projects",
    value: "150+",
  },
  {
    label: "5-Star Reviews",
    value: "32K+",
  },
];

export const UserTestimonialsSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-[60px] border border-solid border-[#ffffff1a]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8 items-center">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-[13px]">
              <div className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ff531f] text-[23px] text-center tracking-[0] leading-[normal]">
                {stat.label}
              </div>
              <div className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[46px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
                {stat.value}
              </div>
              {index < statsData.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="absolute top-[calc(50%-67px)] h-[134px] w-0.5 bg-white/10"
                  style={{
                    left: `${((index + 1) * 100) / 3}%`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
