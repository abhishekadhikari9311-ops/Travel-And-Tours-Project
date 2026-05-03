import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { IoStarSharp } from "react-icons/io5";
import "../css/Reviews.css";

function Reviews() {
  const {
    token,
    profileData,
    getReview,
    postReview,
    destinations,
    getDestination,
    reviews,
  } = useStore();
  // const [reviews, setReviews] = useState([]);
  const [destinationId, setDestinationId] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Determine if the logged-in user is an admin
  const isAdmin = profileData?.role === "admin";

  const fetchReviews = async () => {
    try {
      const data = await getReview();
      // setReviews(data?.reviews || []);
      return data;
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchReviews();
      getDestination();
    }
  }, [token]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!destinationId || rating === 0) return alert("Please fill all fields");
    try {
      const data = await postReview(destinationId, rating, reviewText);
      alert(data.message);
      setDestinationId("");
      setRating(0);
      setReviewText("");
      fetchReviews(); // Refresh list after posting
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/delete-review/${reviewId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="reviews-container">
      <h1 className="main-title">
        {isAdmin ? "Review Management" : "My Reviews"}
      </h1>

      {/* Show Post Form only for regular users */}
      {!isAdmin && (
        <section className="review-card post-section">
          <h3>Write a Review</h3>
          <form onSubmit={handleFormSubmit}>
            <select
              className="review-input"
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
            >
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <IoStarSharp
                  key={star}
                  className="star-icon"
                  color={rating >= star ? "#f15a2b" : "#e0e0e0"}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              className="review-input textarea"
              placeholder="Share your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button type="submit" className="submit-btn">
              Submit Review
            </button>
          </form>
        </section>
      )}

      {/* Review List */}
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-card item-card">
              <div className="card-header">
                <div className="user-info">
                  <span className="user-name">
                    {isAdmin ? review.userId?.name : review.destinationId?.name}
                  </span>
                  {isAdmin && (
                    <span className="on-text">
                      on {review.destinationId?.name}
                    </span>
                  )}
                </div>
                <div className="star-display">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <IoStarSharp
                      key={s}
                      color={review.rating >= s ? "#f15a2b" : "#e0e0e0"}
                    />
                  ))}
                </div>
                {isAdmin && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(review._id)}
                  >
                    🗑️
                  </button>
                )}
              </div>
              <p className="review-content">{review.reviewText}</p>
              <span className="review-date">
                {new Date(review.createdAt).toISOString().split("T")[0]}
              </span>
            </div>
          ))
        ) : (
          <p className="empty-msg">No reviews found.</p>
        )}
      </div>
    </div>
  );
}

export default Reviews;
