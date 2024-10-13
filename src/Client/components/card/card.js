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
          to={`/movie/${movie.id}`} // Menampilkan detail film berdasarkan ID dari database lokal
          style={{ textDecoration: "none", color: "white" }}
        >
          <Card className="cards h-100">
            <div className="cards__img-container">
              <Card.Img
                variant="top"
                src={
                  movie.posterUrl // Menggunakan poster URL dari database lokal
                    ? movie.posterUrl
                    : "https://via.placeholder.com/500x750"
                }
                alt={movie.title} // Menggunakan title dari database lokal
                className="cards__img"
              />
            </div>
            <Card.Body className="cards__overlay d-flex flex-column justify-content-end">
              <Card.Title className="card__title">
                {movie.title} {/* Menggunakan title dari database lokal */}
              </Card.Title>
              <Card.Text className="card__runtime">
                {movie.year} {/* Menggunakan year dari database lokal */}
                <span className="card__rating">
                  {movie.rating ? movie.rating.toFixed(1) : "N/A"}{" "}
                  <i className="fas fa-star" />
                </span>
              </Card.Text>
              <Card.Text className="card__description">
                {movie.synopsis ? movie.synopsis.slice(0, 118) + "..." : ""}{" "}
                {/* Menggunakan synopsis dari database lokal */}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      )}
    </>
  );
};

export default Cards;
