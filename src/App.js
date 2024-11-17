import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Client/components/header/Header";
import Home from "./Client/pages/home/home";
import MovieList from "./Client/components/movieList/movieList";
import Movie from "./Client/pages/movieDetail/movie";
import Footer from "./Client/components/footer/Footer";
import SearchResults from "./Client/pages/searchResult/SearchResult";
import ProtectedRoute from "./Client/components/routes/ProtectedRoute"; // Komponen ProtectedRoute
import Login from "./Client/pages/login/Login";
import AppAdmin from "./Admin/AppAdmin"; // Path menuju admin dashboard
import Register from "./Client/pages/Register/register";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NotAuthorized from "./Client/pages/routeResult/NotAuthorized"; // Halaman untuk unauthorized access

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Mengambil token dan role dari localStorage saat halaman pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  // Fungsi handleLogout untuk menghapus token dan status user
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari localStorage
    localStorage.removeItem("role"); // Hapus role dari localStorage
    setIsAuthenticated(false); // Set autentikasi ke false
    setUserRole(""); // Set userRole ke empty string
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Rute untuk admin dengan proteksi role */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                allowedRoles={["ADMIN"]} // Hanya admin yang boleh mengakses
              >
                <AppAdmin setIsAuthenticated={setIsAuthenticated} />
              </ProtectedRoute>
            }
          />

          {/* Rute untuk writer yang dapat mengakses halaman review */}
          <Route
            path="/review"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                role={userRole}
                allowedRoles={["WRITER", "ADMIN"]}
              >
                <Movie />
              </ProtectedRoute>
            }
          />

          {/* Rute untuk halaman login */}
          <Route
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setUserRole={setUserRole}
              />
            }
          />

          <Route path="/register" element={<Register />} />

          {/* Halaman Unauthorized */}
          <Route path="/not-authorized" element={<NotAuthorized />} />

          {/* Rute untuk client-side (terbuka untuk semua) */}
          <Route
            path="/*"
            element={
              <ClientLayout
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                handleLogout={handleLogout}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

// Komponen ClientLayout untuk client-side
const ClientLayout = ({ isAuthenticated, userRole, handleLogout }) => {
  return (
    <>
      <Header
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        handleLogout={handleLogout}
      />
      <div className="main__content">
        <Routes>
          <Route index element={<Home />} /> {/* Root / diarahkan ke Home */}
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="*" element={<h1>Error Page</h1>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
