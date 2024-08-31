import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Card className="cards h-100">
            <div className="cards__img-container">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/original${
                  movie ? movie.poster_path : ""
                }`}
                alt="Movie Poster"
                className="cards__img"
              />
            </div>
            <Card.Body className="cards__overlay d-flex flex-column justify-content-end">
              <Card.Title className="card__title">
                {movie ? movie.original_title : ""}
              </Card.Title>
              <Card.Text className="card__runtime">
                {movie ? movie.release_date : ""}
                <span className="card__rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star" />
                </span>
              </Card.Text>
              <Card.Text className="card__description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      )}
    </>
  );
};

export default Cards;
