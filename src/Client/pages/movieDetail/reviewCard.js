import React, { useEffect, useState } from "react";
import "./reviewCard.css"; // Pastikan path file CSS sudah benar

const ReviewCard = ({ dramaId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:7001/api/reviews/${dramaId}`);
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [dramaId]);

  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating / 2); // Bintang penuh
    const hasHalfStar = rating % 2 !== 0; // Cek jika ada setengah bintang

    for (let i = 1; i <= 5; i++) {
      if (i <= filledStars) {
        stars.push(<i key={i} className="fas fa-star filled" />); // Bintang penuh
      } else if (i === filledStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt filled" />); // Setengah bintang
      } else {
        stars.push(<i key={i} className="fas fa-star" />); // Bintang kosong
      }
    }
    return stars;
  };

  return (
    <div className="review-list">
      {reviews.length > 0 ? (
        reviews.map(
          (
            review // Hapus slice di sini untuk menampilkan semua review
          ) => (
            <div className="review" key={review.id}>
              <div className="review__content">
                <div className="review__title">
                  {review.author} (
                  {new Date(review.createdAt).toLocaleDateString()}) said:
                </div>
                <p>
                  {review.content.length > 200
                    ? review.content.slice(0, 200) + "..."
                    : review.content}
                </p>
              </div>
              <div className="review__rating">
                {renderStars(Math.round(review.rating))}{" "}
                {/* Menampilkan bintang */}
              </div>
            </div>
          )
        )
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default ReviewCard;
