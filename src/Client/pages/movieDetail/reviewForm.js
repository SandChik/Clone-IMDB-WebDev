import React, { useState } from "react";
import "./reviewForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = ({ dramaId, onReviewSubmit }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && rating && comment) {
      const userId = parseInt(localStorage.getItem("userId")); // Ambil userId dari localStorage
      if (!userId) {
        toast.error("Please log in to submit a review.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to submit a review.");
        return;
      }

      const reviewData = {
        author: name,
        content: comment,
        rating: parseFloat((rating * 2).toFixed(1)), // Pastikan rating adalah float
        dramaId: parseInt(dramaId), // Pastikan dramaId adalah integer
        userId: userId,
      };

      try {
        const res = await fetch("http://localhost:5000/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        });

        const data = await res.json();
        if (res.ok) {
          onReviewSubmit(data);
          setName("");
          setRating(0);
          setComment("");
          setModalOpen(true);
          setTimeout(() => {
            setModalOpen(false);
            window.location.reload(); // Refresh halaman setelah submit berhasil
          }, 2500);
        } else {
          toast.error(`Failed to submit review: ${data.message || ""}`);
        }
      } catch (error) {
        console.error("Error submitting review:", error);
        toast.error("An error occurred while submitting the review.");
      }
    } else {
      toast.warn("Please fill in all fields");
    }
  };


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

      {/* Modal for submission success */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-popup">
            <span className="close-modal" onClick={() => setModalOpen(false)}>
              &times;
            </span>
            <i className="fas fa-check-circle checkmark animate-check"></i>
            <h2>Review berhasil dikirim!</h2>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ReviewForm;
