import React, { useEffect } from "react";
import { IoStarSharp } from "react-icons/io5";
import "../css/ratings.css";
import { useState } from "react";
import { useStore } from "../store/store";
import { useParams } from "react-router-dom";
function PostReview() {
  const [destinationId, setDestinationId] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const { token, getDestination, destinations, postReview } = useStore();

  const handleRatings = async (value) => {
    try {
      console.log("Selected rating:", value);
      setRating(value);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postReview(destinationId, rating, reviewText);

      alert(data.message);

      setDestinationId("");
      setRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getDestination();
    }
  }, [token]);

  return (
    <>
      <div>PostReview</div>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="destinationId">Destination ID:</label>
        <select
          name="destinationId"
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
        >
          <option value="">select destination</option>
          {destinations.map((destination) => {
            return (
              <option key={destination._id} value={destination._id}>
                {destination.name}
              </option>
            );
          })}
        </select>
        <br />

        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <IoStarSharp
              key={star}
              size={30}
              color={rating >= star ? "gold" : "lightgray"}
              onClick={() => handleRatings(star)}
            />
          );
        })}

        <br />

        <label htmlFor="reviewText">Review Text:</label>
        <input
          type="text"
          id="reviewText"
          name="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <br />

        <button type="submit">Submit Review</button>
      </form>
    </>
  );
}

export default PostReview;
