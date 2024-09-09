import React from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Countries from "./pages/Countries";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppAdmin = () => {
  return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/countries" element={<Countries />} />
          </Routes>
        </div>
      </div>
  );
};

export default AppAdmin;
