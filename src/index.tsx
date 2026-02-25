import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AiLandingPage } from "./screens/AiLandingPage/AiLandingPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <AiLandingPage />
  </StrictMode>,
);
