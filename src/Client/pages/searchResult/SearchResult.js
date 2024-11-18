import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchResult.css";
import axios from "axios";
import Cards from "../../components/card/card";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  // Mendapatkan genre dari backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);

  // Mendapatkan country dari backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/countries");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  // Mendapatkan hasil pencarian berdasarkan parameter yang dipilih
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // Log parameter yang dikirim untuk debugging
        console.log("Filter parameters:", {
          name: query || "",
          genre: selectedGenre || "",
          year: selectedYear || "",
          rating: selectedRating || "",
          country: selectedCountry || "",
        });

        const response = await axios.get(
          "http://localhost:5000/api/dramas/search",
          {
            params: {
              name: query || "",
              genre: selectedGenre || "",
              year: selectedYear || "",
              rating: selectedRating || "",
              country: selectedCountry || "",
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Tambahkan header Authorization
            },
          }
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Panggil fetchSearchResults ketika salah satu dari parameter filter berubah
    fetchSearchResults();
  }, [query, selectedGenre, selectedYear, selectedRating, selectedCountry]);

  return (
    <div className="container">
      <header className="filter-header">
        <h1>Search Results for "{query}"</h1>
        <div className="filter-container">
          <label htmlFor="genre-select">Genre: </label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>

          <label htmlFor="year-input">Year: </label>
          <input
            type="number"
            id="year-input"
            placeholder="Enter Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />

          <label htmlFor="rating-input">Rating: </label>
          <input
            type="number"
            id="rating-input"
            placeholder="Min Rating"
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            min="0"
            max="10"
            step="0.1"
          />

          <label htmlFor="country-select">Country: </label>
          <select
            id="country-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select> 
        </div>
      </header>

      <div className="row flex-nowrap overflow-auto">
        {results.length > 0 ? (
          results.map((movie) => (
            <div className="col-3 mb-4" key={movie.id}>
              <Cards movie={movie} />
            </div>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
  