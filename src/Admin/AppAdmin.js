import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Countries from "./pages/Countries";
import Awards from "./pages/Awards";
import Genres from "./pages/Genres";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import Actors from "./pages/Actors";
import Dramas from "./pages/Dramas";
import ValidateDramas from "./pages/ValidateDramas"; // Tambahkan ini untuk halaman Validasi
import InputNewDrama from "./pages/InputNewDrama"; // Tambahkan ini untuk halaman Input Drama Baru

const AppAdmin = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/dramas" element={<Dramas />} />{" "}
          {/* Rute utama Dramas */}
          <Route path="/dramas/validate" element={<ValidateDramas />} />{" "}
          {/* Rute untuk validasi */}
          <Route path="/dramas/input" element={<InputNewDrama />} />{" "}
          {/* Rute untuk input drama baru */}
        </Routes>
      </div>
    </div>
  );
};

export default AppAdmin;
