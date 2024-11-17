import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import ActorCard from "./actorCard";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReviewCard from "./reviewCard";
import ReviewForm from "./reviewForm";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/dramas/${id}`);
        if (!res.ok) throw new Error("Failed to fetch movie details");
        const data = await res.json();
        setMovie(data);
        setActors(data.actors ? data.actors.map((actor) => actor.actor) : []); // Tambahkan pengecekan untuk actors
        setReviews(data.reviews || []); // Set reviews dengan fallback kosong jika tidak ada
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieData();
    window.scrollTo(0, 0);
  }, [id]);

  // Fungsi untuk memperbarui review setelah review baru ditambahkan
  const handleNewReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const groupedActors = (actors, size = 5) => {
    const result = [];
    for (let i = 0; i < actors.length; i += size) {
      result.push(actors.slice(i, i + size));
    }
    return result;
  };

  const renderTrailer = (linkTrailer) => {
    if (!linkTrailer) {
      return <p>No trailer available</p>;
    }

    // Check if the link is a YouTube video
    if (
      linkTrailer.includes("youtube.com") ||
      linkTrailer.includes("youtu.be")
    ) {
      const youtubeId =
        linkTrailer.split("v=")[1] || linkTrailer.split("/").pop();
      return (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    // Check if the link is from Vimeo or other sources
    if (linkTrailer.includes("vimeo.com")) {
      const vimeoId = linkTrailer.split("/").pop();
      return (
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    // Default to showing a clickable link for other formats
    return (
      <div className="trailer-link">
        <a href={linkTrailer} target="_blank" rel="noopener noreferrer">
          Watch Trailer
        </a>
      </div>
    );
  };

  return (
    <div className="movie">
      <div className="movie__content">
        <div className="movie__poster-trailer">
          <div className="movie__posterBox">
            {currentMovieDetail && (
              <img
                className="movie__poster"
                src={
                  currentMovieDetail.posterUrl ||
                  "https://via.placeholder.com/500x750"
                }
                alt={currentMovieDetail.title}
              />
            )}
          </div>
          <div className="movie__trailer">
            {currentMovieDetail &&
              renderTrailer(currentMovieDetail.linkTrailer)}
          </div>
        </div>

        <div className="movie__detail">
          {currentMovieDetail && (
            <>
              <h1 className="movie__name">{currentMovieDetail.title}</h1>
              <div className="movie__info">
                <span className="movie__rating">
                  {currentMovieDetail.rating
                    ? currentMovieDetail.rating.toFixed(1)
                    : "N/A"}{" "}
                  <i className="fas fa-star" style={{ color: "#FFD700" }} />
                </span>
                <span className="movie__runtime">
                  {currentMovieDetail.duration
                    ? `${currentMovieDetail.duration} mins`
                    : "N/A"}
                </span>
                <span className="movie__releaseDate">
                  {currentMovieDetail.year}
                </span>
                {currentMovieDetail && currentMovieDetail.country && (
                <span className="movie__country">
                  {currentMovieDetail.country.name}
                </span>
                )}
              </div>
              <div className="movie__genres">
                {currentMovieDetail.genres &&
                  currentMovieDetail.genres.map((genre) => (
                    <span className="movie__genre" key={genre.genre.id}>
                      {genre.genre.name}
                    </span>
                  ))}
              </div>
              <div className="movie__synopsis">
                <p>{currentMovieDetail.synopsis}</p>
              </div>
              <div className="movie__availability">
                <strong>Availability:</strong> {currentMovieDetail.availability}
              </div>
              <div className="movie__awards">
                <strong>Awards:</strong>
                {currentMovieDetail.awards &&
                currentMovieDetail.awards.length > 0 ? (
                  <ul>
                    {currentMovieDetail.awards.map((award) => (
                      <li key={award.id}>{award.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No awards available</p>
                )}
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
            <div className="review-list">
              <ReviewCard dramaId={id} reviews={reviews} />
            </div>
            <ReviewForm dramaId={id} onReviewSubmit={handleNewReview} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
