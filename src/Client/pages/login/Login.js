import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle untuk password visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const role = localStorage.getItem("role");
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "WRITER") {
        navigate("/writer/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, role, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // Konfigurasikan token di header default Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      setIsAuthenticated(true);
      setUserRole(role);

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "WRITER") {
          navigate("/writer/dashboard");
        } else {
          navigate("/");
        }
      }, 500);
    } catch (err) {
      setError("Invalid email or password");
      console.error("Error logging in:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-passwords"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </span>
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="register-link">
          <span>Don't have an account?</span>{" "}
          <Link to="/register" className="register-link-text">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
