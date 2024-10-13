import React, { useEffect, useState } from "react";
import "./movieList.css";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  // Fungsi untuk mengambil data drama dari database
  const fetchMovieList = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dramas");
      const data = await res.json();
      setMovieList(data); // Memperbarui state dengan data yang diperoleh
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    fetchMovieList(); // Memanggil fungsi untuk mengambil data dari API
  }, []);

  return (
    <div className="movie__list">
      <div className="list__cards">
        {movieList.map((drama) => (
          <div className="cards" key={drama.id}>
            <Cards movie={drama} />{" "}
            {/* Mengirim data drama ke komponen Cards */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
