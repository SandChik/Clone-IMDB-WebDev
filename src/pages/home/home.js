import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => {
        setPopularMovies(data.results);

        // Cek jika tampilan adalah mobile
        if (window.matchMedia("(max-width: 576px)").matches) {
          // Batasi teks berdasarkan kata
          document
            .querySelectorAll(".posterImage__description")
            .forEach(function (element) {
              const maxWords = 20; // Batas maksimal kata
              let text = element.textContent;
              let words = text.split(" ");
              if (words.length > maxWords) {
                text = words.slice(0, maxWords).join(" ") + "...";
                element.textContent = text;
              }
            });
        }
      });
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={500}
          infiniteLoop={true}
          showStatus={false}
          showArrows={true}
          dynamicHeight={true}
          swipeable={true}
          emulateTouch={true}
          swipeScrollTolerance={5}
        >
          {popularMovies.map((movie) => (
            <Link
              key={movie.id}
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                  alt={movie.original_title}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? movie.release_date : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />
                  </span>
                </div>
                <div className="posterImage__description">
                  {movie ? movie.overview : ""}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="movie__list-container">
        <h2 className="list__title">POPULAR</h2>
        <MovieList />
      </div>
    </>
  );
};

export default Home;
  