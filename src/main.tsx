import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./patient.css";
import "./dashboard.css";
import "./setting.css";
import App from "./App";
import Setting from "./setting";
import Dashboard from "./dashboard";
import Patient from "./patient";
import Patients from "./patients";
import Employee from "./employee";
import Department from "./department";
import Payroll from "./payroll";
import SalaryManagement from "./salary_management";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dispense from "./dispense";
import Laboratory from "./laboratory";
import Reception from "./reception";
import Appointment from "./appointment";
import Services from "./services";
import DoctorManagement from "./doctor_management";
import Doctors from "./doctors";
import PharmacyInventory from "./pharmacy_inventory";
import Pharmacy from "./pharmacy";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/dispense" element={<Dispense />} />
        <Route path="/pharmacy-inventory" element={<PharmacyInventory />} />
        <Route path="/laboratory" element={<Laboratory />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/reception" element={<Reception />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor-management" element={<DoctorManagement />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/department" element={<Department />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/salary-management" element={<SalaryManagement />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
