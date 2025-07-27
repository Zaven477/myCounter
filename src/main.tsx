import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppData } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppData />
  </StrictMode>
);
