import { Separator } from "../../../../components/ui/separator";

const usefulLinks = [
  { label: "About" },
  { label: "Services" },
  { label: "Team" },
  { label: "Prices" },
];

const helpLinks = [
  { label: "Customer Support" },
  { label: "Terms & Conditions" },
  { label: "Privacy Policy" },
  { label: "Contact Us" },
];

const contactInfo = [
  { text: "27 Division St, New York,\nNY 10002, USA" },
  { text: "+123 324 2653" },
  { text: "username@mail.com" },
];

export const SiteFooterSection = (): JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-start gap-2.5 px-[101px] py-[66px] bg-[#ffffff0f]">
      <div className="w-full max-w-[1237px] mx-auto">
        <div className="grid grid-cols-4 gap-8 mb-[52px]">
          <div className="flex flex-col gap-[21px]">
            <h3 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[32px] tracking-[-0.95px] leading-[41.6px] whitespace-nowrap">
              About Us
            </h3>
            <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-neutral-02 text-lg tracking-[0] leading-[27px]">
              We&apos;re a team of designers, engineers, and innovators building
              AI tools that empower anyone to turn imagination into stunning
              visuals—faster, smarter, and effortlessly.
            </p>
          </div>

          <div className="flex flex-col gap-[22.91px]">
            <h4 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-[#ff531f] text-2xl tracking-[-0.48px] leading-[33.6px] whitespace-nowrap">
              Useful Links
            </h4>
            <nav className="flex flex-col gap-[15.27px]">
              {usefulLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-neutral-02 text-lg tracking-[0] leading-[27px] whitespace-nowrap hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-[22.91px]">
            <h4 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-[#ff531f] text-2xl tracking-[-0.48px] leading-[33.6px] whitespace-nowrap">
              Help
            </h4>
            <nav className="flex flex-col gap-[15.27px]">
              {helpLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-neutral-02 text-lg tracking-[0] leading-[27px] whitespace-nowrap hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-[22.91px]">
            <h4 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-[#ff531f] text-2xl tracking-[-0.48px] leading-[33.6px] whitespace-nowrap">
              Connect With Us
            </h4>
            <div className="flex flex-col gap-[22.91px]">
              {contactInfo.map((info, index) => (
                <p
                  key={index}
                  className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-neutral-02 text-lg tracking-[0] leading-[27px]"
                  style={{ whiteSpace: index === 0 ? "pre-line" : "nowrap" }}
                >
                  {info.text}
                </p>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 h-0.5 mb-[41px]" />

        <div className="flex items-center justify-between">
          <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-neutral-01 text-lg tracking-[0] leading-[27px] whitespace-nowrap">
            © 2024 All Right Reserved.
          </p>
          <img
            className="w-[145px] h-[31px]"
            alt="Social media icons"
            src="/frame-57.svg"
          />
        </div>
      </div>
    </footer>
  );
};
