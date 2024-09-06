import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import Movie from "./pages/movieDetail/movie";
import Footer from "./components/footer/Footer";
import React from "react";
import SearchResults from "./pages/searchResult/SearchResult";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main__content">
          <div className="page__content">
            <Routes>
              <Route index element={<Home />} />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="movies/:type" element={<MovieList />} />
              <Route path="/search" element={<SearchResults />} />{" "}
              {/* Rute pencarian */}
              <Route path="/*" element={<h1>Error Page</h1>} />
            </Routes>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
