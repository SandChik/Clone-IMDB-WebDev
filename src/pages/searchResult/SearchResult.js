import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';
import axios from 'axios';
import Cards from '../../components/card/card'; // Pastikan path ini benar

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  // Fetch genres from TMDb API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=389185ad9f07711c72bfb4c59a7697f8&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch search results from TMDb API
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=389185ad9f07711c72bfb4c59a7697f8&query=${query}&language=en-US&page=1`
          );
          setResults(response.data.results);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
    };
    fetchSearchResults();
  }, [query]);

  // Handle genre filter change
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  // Handle year filter change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Handle status filter change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Filter results based on selected filters
  const filteredResults = results.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genre_ids.includes(parseInt(selectedGenre)) : true;
    const matchesYear = selectedYear ? new Date(movie.release_date).getFullYear() === parseInt(selectedYear) : true;
    const matchesStatus =
      selectedStatus ? (selectedStatus === 'Released' && new Date(movie.release_date) <= new Date()) ||
        (selectedStatus === 'Upcoming' && new Date(movie.release_date) > new Date()) : true;

    return matchesGenre && matchesYear && matchesStatus;
  });

  return (
    <div className="container">
      {/* Header with Filters */}
      <header className="filter-header">
        <h1>Search Results for "{query}"</h1>

        {/* Filter Section */}
        <div className="filter-container">
          <label htmlFor="genre-select">Genre: </label>
          <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
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
            onChange={handleYearChange}
          />

          <label htmlFor="status-select">Status: </label>
          <select id="status-select" value={selectedStatus} onChange={handleStatusChange}>
            <option value="">All</option>
            <option value="Released">Released</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
      </header>

      {/* Search Results */}
      <div className="row flex-nowrap overflow-auto">
        {filteredResults.length > 0 ? (
          filteredResults.map((movie) => (
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
