import React, { useState } from "react";
import "./reviewForm.css";

const ReviewForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && rating && comment) {
      onSubmit({ name, rating, comment });
      setName("");
      setRating(0);
      setComment("");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div>
      {/* Heading moved outside form */}
      <h2 className="section-title">Add your review</h2>{" "}
      {/* Konsisten dengan section lainnya */}
      <div className="reviewForm">
        <form onSubmit={handleSubmit} className="reviewForm__form">
          <div className="reviewForm__group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="reviewForm__input"
              placeholder="Your name"
            />
          </div>

          <div className="reviewForm__group">
            <label>Rate</label>
            <div className="reviewForm__stars">
              {[...Array(5)].map((_, index) => (
                <i
                  key={index}
                  className={`fas fa-star ${index < rating ? "active" : ""}`}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
          </div>

          <div className="reviewForm__group">
            <label>Your thoughts</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="reviewForm__textarea"
              placeholder="Your review"
            />
          </div>

          <p className="reviewForm__note">
            You can only submit your comment once.
          </p>
          <button type="submit" className="reviewForm__submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
