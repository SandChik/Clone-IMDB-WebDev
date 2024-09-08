import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import ActorCard from "./actorCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewCard from "./reviewCard"; // Import review card
import ReviewForm from "./reviewForm";  // Import review form

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]); // State untuk reviews
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      const movieRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const movieData = await movieRes.json();
      setMovie(movieData);

      const actorsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63`
      );
      const actorsData = await actorsRes.json();
      setActors(actorsData.cast.slice(0, 10));

      const reviewsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=4e44d9029b1270a757cddc766a1bcb63`
      );
      const reviewsData = await reviewsRes.json();
      setReviews(reviewsData.results.slice(0, 5)); // Ambil 5 review teratas
    };

    fetchMovieData();
    window.scrollTo(0, 0);
  }, [id]);

  const groupedActors = (actors, size = 5) => {
    const result = [];
    for (let i = 0; i < actors.length; i += size) {
      result.push(actors.slice(i, i + size));
    }
    return result;
  };

  return (
    <div className="movie">
      <div className="movie__content">
        <div className="movie__poster-trailer">
          <div className="movie__posterBox">
            {currentMovieDetail && (
              <img
                className="movie__poster"
                src={`https://image.tmdb.org/t/p/original${currentMovieDetail.poster_path}`}
                alt={currentMovieDetail.original_title}
              />
            )}
          </div>
          <div className="movie__trailer">
            <iframe
              src="https://www.youtube.com/embed/{VIDEO_ID}"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="movie__detail">
          {currentMovieDetail && (
            <>
              <h1 className="movie__name">
                {currentMovieDetail.original_title}
              </h1>
              <div className="movie__info">
                <span className="movie__rating">
                  {currentMovieDetail.vote_average.toFixed(1)}{" "}
                  <i className="fas fa-star" style={{ color: "#FFD700" }} />
                </span>
                <span className="movie__runtime">
                  {currentMovieDetail.runtime} mins
                </span>
                <span className="movie__releaseDate">
                  {currentMovieDetail.release_date}
                </span>
              </div>
              <div className="movie__genres">
                {currentMovieDetail.genres.map((genre) => (
                  <span className="movie__genre" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="movie__synopsis">
                <p>{currentMovieDetail.overview}</p>
              </div>
              <div className="movie__availability">
                <strong>Availability:</strong> In Theaters / Streaming
              </div>
            </>
          )}

          <div className="movie__actors">
            <h2 className="section-title">Cast</h2>
            <Carousel
              showThumbs={false}
              autoPlay={false}
              transitionTime={500}
              infiniteLoop={true}
              showStatus={false}
              showArrows={true}
              swipeable={true}
              emulateTouch={true}
              swipeScrollTolerance={5}
            >
              {groupedActors(actors).map((group, index) => (
                <div key={index} className="actor-row">
                  {group.map((actor) => (
                    <div className="actor-card" key={actor.id}>
                      <ActorCard actor={actor} />
                    </div>
                  ))}
                </div>
              ))}
            </Carousel>
          </div>

          <div className="review-section">
            <h2 className="section-title">People think about this drama</h2>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            {/* Tambahkan form review */}
            <ReviewForm onSubmit={(review) => console.log(review)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
