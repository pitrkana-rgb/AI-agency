import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AiLandingPage } from "./screens/AiLandingPage/AiLandingPage";
import { ContactPage } from "./screens/ContactPage/ContactPage";
import { AboutPage } from "./screens/AboutPage/AboutPage";
import { PrivacyPolicyPage } from "./screens/PrivacyPolicyPage/PrivacyPolicyPage";
import { TermsPage } from "./screens/TermsPage/TermsPage";
import { NotFoundPage } from "./screens/NotFoundPage/NotFoundPage";
import { CookieConsentBanner } from "./components/CookieConsentBanner";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AiLandingPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/o-nas" element={<AboutPage />} />
        <Route path="/zasady-ochrany-soukromi" element={<PrivacyPolicyPage />} />
        <Route path="/podminky-uziti" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CookieConsentBanner />
    </BrowserRouter>
  </StrictMode>,
);
