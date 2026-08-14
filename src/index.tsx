import "./bootstrapFirstPaint";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AiLandingPage } from "./screens/AiLandingPage/AiLandingPage";
import { ContactPage } from "./screens/ContactPage/ContactPage";
import { NapisteNamPage } from "./screens/NapisteNamPage/NapisteNamPage";
import { CenikPage } from "./screens/CenikPage/CenikPage";
import { PrivacyPolicyPage } from "./screens/PrivacyPolicyPage/PrivacyPolicyPage";
import { TermsPage } from "./screens/TermsPage/TermsPage";
import { NotFoundPage } from "./screens/NotFoundPage/NotFoundPage";
import { CookieConsentBanner } from "./components/CookieConsentBanner";
import { LanguageProvider } from "./i18n/LanguageContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AiLandingPage />} />
          <Route path="/o-me" element={<ContactPage />} />
          <Route path="/kontakt" element={<Navigate to="/o-me" replace />} />
          <Route path="/napiste-nam" element={<NapisteNamPage />} />
          <Route path="/cenik" element={<CenikPage />} />
          <Route path="/o-nas" element={<Navigate to="/o-me" replace />} />
          <Route path="/zasady-ochrany-soukromi" element={<PrivacyPolicyPage />} />
          <Route path="/podminky-uziti" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <CookieConsentBanner />
        <Analytics />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);
