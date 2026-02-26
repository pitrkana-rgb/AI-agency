import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

type FormState = {
  name: string;
  email: string;
  phone: string;
  project: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  project: "",
};

export const ContactSection = (): JSX.Element => {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!form.name.trim()) {
      newErrors.name = "Zadejte prosím své jméno.";
    }
    if (!form.email.trim()) {
      newErrors.email = "Zadejte prosím svůj e‑mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Zadejte prosím platnou e‑mailovou adresu.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Zadejte prosím telefon.";
    }
    if (!form.project.trim()) {
      newErrors.project = "Napište nám krátce o vašem projektu.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setSubmitted(true);
    setForm(initialState);
  };

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  return (
    <section className="relative w-full py-20">
      <div className="container mx-auto px-4 max-w-[900px]">
        <header className="flex flex-col gap-4 mb-10">
          <h2 className="[font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-white text-[40px] md:text-[52px] tracking-[0] leading-tight">
            Napište nám o vašem projektu
          </h2>
          <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffffb2] text-lg max-w-[600px]">
            Pár vět stačí. Ozveme se vám do 24 hodin, projdeme vaše cíle a
            navrhneme konkrétní další kroky – bez závazku.
          </p>
        </header>

        <Card className="bg-[#111112] border border-[#ffffff1a] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <CardContent className="p-6 sm:p-8">
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-sm text-[#ffffffb2]">
                    Jméno
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    className="w-full rounded-lg bg-[#1a1a1b] border border-[#ffffff26] px-3 py-2 text-white text-sm outline-none focus:border-[#ff531f] focus:ring-1 focus:ring-[#ff531f] transition-colors"
                    placeholder="Jak vám můžeme říkat?"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-sm text-[#ffffffb2]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    className="w-full rounded-lg bg-[#1a1a1b] border border-[#ffffff26] px-3 py-2 text-white text-sm outline-none focus:border-[#ff531f] focus:ring-1 focus:ring-[#ff531f] transition-colors"
                    placeholder="napriklad@firma.cz"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-sm text-[#ffffffb2]">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className="w-full rounded-lg bg-[#1a1a1b] border border-[#ffffff26] px-3 py-2 text-white text-sm outline-none focus:border-[#ff531f] focus:ring-1 focus:ring-[#ff531f] transition-colors"
                    placeholder="+420 ..."
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 md:col-span-1">
                  <label className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-sm text-[#ffffffb2]">
                    Popis projektu
                  </label>
                  <textarea
                    value={form.project}
                    onChange={handleChange("project")}
                    className="min-h-[120px] w-full rounded-lg bg-[#1a1a1b] border border-[#ffffff26] px-3 py-2 text-white text-sm outline-none focus:border-[#ff531f] focus:ring-1 focus:ring-[#ff531f] transition-colors resize-none"
                    placeholder="Stručně nám napište, co chcete řešit (web, AI agent, automatizace...)"
                  />
                  {errors.project && (
                    <p className="text-xs text-red-400">{errors.project}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <Button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#ff7a3b] to-[#ff531f] hover:from-[#ff8950] hover:to-[#ff531f] rounded-[10px] text-white [font-family:'Sk-Modernist-Bold',Helvetica] font-bold text-base shadow-[0_0_25px_rgba(255,83,31,0.6)] hover:shadow-[0_0_40px_rgba(255,83,31,0.9)] transition-transform duration-300 hover:scale-[1.05]"
                >
                  Odeslat poptávku
                </Button>

                <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#ffffff80] text-xs sm:text-sm max-w-[320px]">
                  Děkujeme, ozveme se vám do 24 hodin s návrhem konkrétních
                  dalších kroků.
                </p>
              </div>

              {submitted && (
                <div className="mt-4 rounded-lg bg-[#102114] border border-[#2ecc71] px-4 py-3">
                  <p className="[font-family:'Sk-Modernist-Regular',Helvetica] font-normal text-[#b5f5c6] text-sm">
                    Děkujeme, ozveme se vám do 24 hodin.
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

