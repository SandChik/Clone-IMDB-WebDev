import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Komponen Sidebar untuk navigasi
import Dashboard from "./pages/Dashboard"; // Dashboard page
import Countries from "./pages/Countries"; // Countries page
import Awards from "./pages/Awards"; // Awards page
import Genres from "./pages/Genres"; // Genres page
import Comments from "./pages/Comments"; // Comments page
import Users from "./pages/Users"; // Users page
import Actors from "./pages/Actors"; // Actors page
import ValidateDramas from "./pages/ValidateDramas"; // Halaman untuk validasi drama
import InputNewDrama from "./pages/InputNewDrama"; // Halaman untuk input drama baru

const AppAdmin = () => {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar berada di sebelah kiri */}
      <Sidebar />
      {/* Bagian konten utama */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/dramas/validate" element={<ValidateDramas />} />{" "}
          <Route path="/dramas/input" element={<InputNewDrama />} />{" "}
        </Routes>
      </div>
    </div>
  );
};

export default AppAdmin;
