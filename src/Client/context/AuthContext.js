// src/Client/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Membuat AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State untuk menyimpan user data

  // Fungsi login
  const login = (username, role) => {
    setUser({ username, role });
  };

  // Fungsi logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook custom untuk mengakses AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
