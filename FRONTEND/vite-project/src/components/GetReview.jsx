import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";

function GetReview() {
  const [reviews, setReviews] = useState([]);
  const { token, getReview } = useStore();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReview();
        setReviews(data?.reviews || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchReviews();
    }
  }, [token]);

  const handleDelete = async (reviewId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/delete-review/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from delete review API");

      if (res.ok) {
        const data = await res.json();
        console.log("Review deleted successfully:", data);
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId),
        );
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <>
      <h1>GetReview</h1>

      {Array.isArray(reviews) && reviews.length > 0 ? (
        reviews.map((review) => {
          return (
            <div key={review._id}>
              {review.destinationId?.name} - {review.rating} -
              {review.reviewText}
              <br />
              <button onClick={() => handleDelete(review._id)}>Delete</button>
            </div>
          );
        })
      ) : (
        <div>No reviews found.</div>
      )}
    </>
  );
}

export default GetReview;
