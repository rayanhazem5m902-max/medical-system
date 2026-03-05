import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./patient.css";
import "./dashboard.css";
import "./setting.css";
import App from "./App";
import { Setting } from "./setting";
import Dashboard from "./dashboard";
import Patient from "./patient";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dispense from "./dispense";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/dispense" element={<Dispense />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
