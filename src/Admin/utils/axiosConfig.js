import axios from "axios";

// Base URL untuk semua request
axios.defaults.baseURL = "http://localhost:5000";

// Tambahkan token dari localStorage secara otomatis
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Redirect ke login jika token invalid
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      window.location.href = "/login"; // Redirect ke halaman login
    }
    return Promise.reject(error);
  }
);

export default axios;
