import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Hapus data autentikasi dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);

    // Redirect ke halaman login
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src={require("../../components/image/logo.png")}
            alt="IMDb Logo"
          />
        </Link>
      </div>
      <div className="headerRight">
        <form className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => {}}
          />
          <button type="submit">Search</button>
        </form>

        {isAuthenticated ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="rounded-login-button">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
