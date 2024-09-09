import React, { useEffect, useState, useCallback } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  // Gunakan useCallback untuk mendefinisikan fungsi getData agar stabil dalam memoization
  const getData = useCallback(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results));
  }, [type]);

  useEffect(() => {
    getData();
  }, [getData]); // Tambahkan getData sebagai dependensi agar selalu dipanggil saat 'type' berubah

  return (
    <div className="movie__list">
      <div className="list__cards">
        {movieList.map((movie) => (
          <div className="cards" key={movie.id}>
            <Cards movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
