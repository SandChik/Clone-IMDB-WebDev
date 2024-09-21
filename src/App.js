import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Client/components/header/Header";
import Home from "./Client/pages/home/home";
import MovieList from "./Client/components/movieList/movieList";
import Movie from "./Client/pages/movieDetail/movie";
import Footer from "./Client/components/footer/Footer";
import SearchResults from "./Client/pages/searchResult/SearchResult";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Import Admin Dashboard
import AppAdmin from "./Admin/AppAdmin"; // Path menuju admin dashboard

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Rute untuk client-side */}
          <Route path="/*" element={<ClientLayout />} />

          {/* Rute untuk admin-side */}
          <Route path="/admin/*" element={<AppAdmin />} />
        </Routes>
      </Router>
    </div>
  );
};

// Komponen ClientLayout untuk client-side
const ClientLayout = () => {
  return (
    <>
      <Header />
      <div className="main__content">
        <div className="page__content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="movies/:type" element={<MovieList />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="*" element={<h1>Error Page</h1>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
