import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dramas");
        const data = await response.json();
        setPopularMovies(data);
      } catch (error) {
        console.error("Error fetching dramas:", error);
      }
    };

    fetchMovies();
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
                  src={movie.posterUrl || "https://via.placeholder.com/500x750"}
                  alt={movie.title}
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">{movie.title}</div>
                <div className="posterImage__runtime">
                  {movie.year}
                  <div className="posterImage__rating">
                    {movie.rating ? movie.rating.toFixed(1) : "N/A"}
                    <i className="fas fa-star" />
                  </div>
                </div>
                <div className="posterImage__description">{movie.synopsis}</div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
      <div className="movie__list-container">
        <h2 className="list__title">Movie List</h2>
        <MovieList />
      </div>
    </>
  );
};

export default Home;
