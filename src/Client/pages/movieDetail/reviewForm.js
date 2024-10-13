import React, { useState } from "react";
import "./reviewForm.css";

const ReviewForm = ({ dramaId, onReviewSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0); // Menggunakan skala 0.5
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && rating && comment) {
      const reviewData = {
        author: name,
        rating: rating * 2, // Kalikan rating dengan 2 untuk rentang 0-10
        content: comment,
        dramaId: dramaId,
      };

      try {
        const res = await fetch("http://localhost:5000/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        });

        const data = await res.json();
        if (res.ok) {
          onReviewSubmit(data);
          setName("");
          setRating(0);
          setComment("");
          alert("Review successfully submitted!"); // Tampilkan alert saat berhasil
        } else {
          alert("Failed to submit review.");
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("An error occurred while submitting the review.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  // Fungsi untuk menghitung nilai rating berdasarkan posisi klik
  const handleStarClick = (event, index) => {
    const rect = event.target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;

    if (clickX < width / 2) {
      setRating(index + 0.5); // Setengah bintang
    } else {
      setRating(index + 1); // Bintang penuh
    }
  };

  return (
    <div>
      <h2 className="section-title">Add your review</h2>
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
                <div
                  key={index}
                  className="reviewForm__star-wrapper"
                  onClick={(event) => handleStarClick(event, index)}
                >
                  <i
                    className={`fas fa-star ${
                      index + 1 <= rating ? "active" : ""
                    }`}
                  />
                  {rating > index && rating < index + 1 && (
                    <i className="fas fa-star-half-alt active" />
                  )}
                </div>
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
