import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Komponen Sidebar untuk navigasi
import AdminDashboard from "./pages/AdminDashboard"; // Halaman Dashboard atau sapaan
import Countries from "./pages/Countries"; // Countries page
import Awards from "./pages/Awards"; // Awards page
import Genres from "./pages/Genres"; // Genres page
import Comments from "./pages/Comments"; // Comments page
import Users from "./pages/Users"; // Users page
import Actors from "./pages/Actors"; // Actors page
import ValidateDramas from "./pages/ValidateDramas"; // Halaman untuk validasi drama
import InputNewDrama from "./pages/InputNewDrama"; // Halaman untuk input drama baru
import "./AppAdmin.css"; // Tambahkan file CSS jika perlu

const AppAdmin = ({ setIsAuthenticated }) => {
  console.log("Admin component rendered");
  return (
    <div>
      {/* Header Tetap */}
      <header className="header">
        <h1>Admin Panel</h1>
      </header>

      {/* Kontainer Utama */}
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar setIsAuthenticated={setIsAuthenticated} />

        {/* Konten Utama */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/users" element={<Users />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/dramas/validate" element={<ValidateDramas />} />
            <Route path="/dramas/input" element={<InputNewDrama />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AppAdmin;
