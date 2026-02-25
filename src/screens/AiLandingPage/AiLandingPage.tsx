import { Button } from "../../components/ui/button";
import { AiDesignFeaturesSection } from "./sections/AiDesignFeaturesSection/AiDesignFeaturesSection";
import { CompanyMilestonesSection } from "./sections/CompanyMilestonesSection/CompanyMilestonesSection";
import { FrequentlyAskedQuestionsSection } from "./sections/FrequentlyAskedQuestionsSection";
import { MainHeroSection } from "./sections/MainHeroSection";
import { ReadyToDesignSection } from "./sections/ReadyToDesignSection";
import { SiteFooterSection } from "./sections/SiteFooterSection/SiteFooterSection";
import { SubscriptionPlansSection } from "./sections/SubscriptionPlansSection/SubscriptionPlansSection";
import { UserTestimonialsSection } from "./sections/UserTestimonialsSection";

const navigationItems = [
  { label: "Home", isActive: true },
  { label: "Services", isActive: false },
  { label: "Contact us", isActive: false },
  { label: "About us", isActive: false },
];

export const AiLandingPage = (): JSX.Element => {
  return (
    <div className="relative w-full min-h-screen bg-[#010101] overflow-hidden">
      <img
        className="absolute top-[calc(50.00%_-_1350px)] left-[calc(50.00%_-_562px)] w-[1282px] h-[1201px] pointer-events-none"
        alt="Dots"
        src="/dots.svg"
      />

      <div className="absolute top-[2722px] left-[-164px] w-[1483px] h-[925px] pointer-events-none">
        <img
          className="absolute top-0 left-[calc(50.00%_-_578px)] w-[1319px] h-[925px] object-cover"
          alt="Image"
          src="/image-88.png"
        />

        <div className="absolute top-[595px] left-0 w-[1483px] h-[330px] bg-[linear-gradient(0deg,rgba(1,1,1,1)_7%,rgba(1,1,1,0)_100%)]" />

        <div className="absolute top-[126px] left-[1027px] w-[582px] h-[330px] rotate-90 bg-[linear-gradient(0deg,rgba(1,1,1,1)_7%,rgba(1,1,1,0)_100%)]" />
      </div>

      <div className="absolute top-[4235px] left-[850px] w-[940px] h-[983px] rounded-[470px/491.5px] blur-[200px] [background:conic-gradient(from_180deg_at_50%_50%,rgba(250,84,36,0.3)_24%,rgba(194,44,0,0.3)_51%,rgba(152,35,0,0.3)_76%,rgba(251,30,30,0.3)_100%)] pointer-events-none" />

      <nav className="inline-flex items-center gap-[244px] absolute top-[50px] left-[calc(50.00%_-_601px)] z-50">
        <img
          className="relative w-[54px] h-[40.32px]"
          alt="Logo"
          src="/logo.png"
        />

        <div className="inline-flex items-start gap-[65px] relative flex-[0_0_auto]">
          {navigationItems.map((item, index) => (
            <div
              key={`nav-${index}`}
              className="flex flex-col items-center relative"
            >
              <div className="relative w-fit mt-[-1.00px] ml-[-0.50px] mr-[-0.50px] [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[22px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity">
                {item.label}
              </div>

              {item.isActive && (
                <div className="relative self-stretch w-full h-0.5 bg-[#ff531f] rounded-[1.5px]" />
              )}
            </div>
          ))}
        </div>

        <Button className="inline-flex items-center justify-center px-[35px] py-[15px] relative flex-[0_0_auto] bg-[#ff531f] hover:bg-[#ff531f]/90 rounded-[10px] overflow-hidden border-0">
          <span className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-xl tracking-[0] leading-[19.2px] whitespace-nowrap">
            Login
          </span>
        </Button>
      </nav>

      <div className="absolute top-[692px] left-[calc(50.00%_-_720px)] w-[1440px] h-[372px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />

      <div className="absolute top-[3726px] left-[-204px] w-[423px] h-[226px] rounded-[117.24px] border-[23.45px] border-solid border-[#ff9676] rotate-90 pointer-events-none" />

      <div className="absolute top-[calc(50.00%_+_1114px)] right-[-347px] w-[445px] h-[445px] rounded-[1172.35px] border-[23.45px] border-solid border-[#ff531f] pointer-events-none" />

      <div className="absolute left-[-413px] bottom-[957px] w-[637px] h-[226px] rounded-[117.24px] border-[23.45px] border-solid border-[#f6f6f6] pointer-events-none" />

      <img
        className="absolute top-[4124px] left-[531px] w-[909px] h-[1316px] pointer-events-none"
        alt="Line"
        src="/line-20.svg"
      />

      <img
        className="absolute top-[3959px] left-[490px] w-[950px] h-[1370px] pointer-events-none"
        alt="Line"
        src="/line-21.svg"
      />

      <MainHeroSection />
      <UserTestimonialsSection />
      <AiDesignFeaturesSection />
      <CompanyMilestonesSection />
      <SubscriptionPlansSection />
      <FrequentlyAskedQuestionsSection />
      <ReadyToDesignSection />
      <SiteFooterSection />
    </div>
  );
};
