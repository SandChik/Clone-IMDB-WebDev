import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, role, allowedRoles, children }) => {
  // Jika status autentikasi belum selesai di-load, tampilkan loading atau kosongkan
  if (isAuthenticated === null || role === "") {
    return null; // Atau bisa tambahkan spinner untuk loading
  }

  // Jika user tidak memiliki izin, arahkan ke halaman Not Authorized
  if (!isAuthenticated || !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  // Jika user memiliki izin, render children
  return children;
};

export default ProtectedRoute;
