import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  };

  return (
    <div className="movie">
      <div className="movie__background">
        <img
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail ? currentMovieDetail.backdrop_path : ""
          }`}
          alt="Movie Background"
          className="movie__backgroundImage"
        />
      </div>
      <div className="movie__content">
        <div className="movie__poster-trailer">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.poster_path : ""
              }`}
              alt="Movie Poster"
            />
          </div>
          <div className="movie__trailer">
            <iframe
              src="https://www.youtube.com/embed/{VIDEO_ID}" // Ganti {VIDEO_ID} dengan ID video YouTube yang sesuai
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="movie__detail">
          <h1 className="movie__name">
            {currentMovieDetail ? currentMovieDetail.original_title : ""}
          </h1>
          <div className="movie__info">
            <span className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}{" "}
              <i className="fas fa-star" />
            </span>
            <span className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
            </span>
            <span className="movie__releaseDate">
              {currentMovieDetail ? currentMovieDetail.release_date : ""}
            </span>
          </div>
          <div className="movie__genres">
            {currentMovieDetail && currentMovieDetail.genres
              ? currentMovieDetail.genres.map((genre) => (
                  <span className="movie__genre" id={genre.id} key={genre.id}>
                    {genre.name}
                  </span>
                ))
              : ""}
          </div>
          <div className="movie__synopsis">
            <p>{currentMovieDetail ? currentMovieDetail.overview : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
