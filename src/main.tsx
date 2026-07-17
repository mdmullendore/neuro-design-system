import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@neuro/design-system/neurotransmitters/index.scss";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
