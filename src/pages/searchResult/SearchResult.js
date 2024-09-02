import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';
import axios from 'axios';


const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

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

  return (
    <div className="container">
      <h1>Search Results for "{query}"</h1>
      <div className="row flex-nowrap overflow-auto">
        {results.length > 0 ? (
          results.map((movie) => (
            <div className="col-3 mb-4" key={movie.id}>
              <div className="card h-100">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    {movie.overview ? movie.overview.substring(0, 100) + '...' : 'No overview available.'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
