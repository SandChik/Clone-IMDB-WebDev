import React from "react";
import "./reviewCard.css"; // Pastikan path file CSS sudah benar

const ReviewCard = ({ review }) => {
  return (
    <div className="review">
      <div className="review__content">
        <div className="review__title">
          {review.author} ({new Date(review.created_at).toLocaleDateString()})
          said:
        </div>
        <p>{review.content.slice(0, 200)}...</p>{" "}
      </div>
      <div className="review__rating">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <i
              key={i}
              className={`fas fa-star ${
                i < Math.round(review.author_details.rating / 2) ? "filled" : ""
              }`}
            />
          ))}
      </div>
    </div>
  );
};

export default ReviewCard;
