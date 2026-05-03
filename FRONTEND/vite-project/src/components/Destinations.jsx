import React, { useEffect, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const { token } = useStore();
  const navigate = useNavigate();

  const getDestination = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/destinations/get-destinations`,
        {
          method: "GET",
          headers: token
            ? { Authorization: `Bearer ${token}` } // send if exists
            : {}, // send nothing if not logged in
        },
      );
      console.log(res, "res from backend after hitting get-destinations");

      if (res.ok) {
        const data = await res.json();
        console.log("Data:", data);
        setDestinations(data.destinations);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    getDestination();
  }, []);

  const handleLike = async (destinationId) => {
    if (!token) {
      alert("Please log in to like destinations.");
      navigate("/login");
    }

    try {
      const res = await fetch(
        `http://localhost:4000/user/like-destination/${destinationId}`,
        {
          method: "PATCH",
          headers: token
            ? { Authorization: `Bearer ${token}` } // send if exists
            : {}, // send nothing if not logged in
        },
      );

      if (res.ok) {
        const data = await res.json();

        setDestinations((prev) =>
          prev.map((dest) =>
            dest._id === destinationId
              ? {
                  ...dest,
                  likes: new Array(data.likesCount),
                  isLiked: data.liked,
                }
              : dest,
          ),
        );
      }
    } catch (error) {
      console.error("Error liking destination:", error);
    }
  };

  return (
    <>
      <div className="dest-home-container">
        {destinations.map((destination) => (
          <div key={destination._id} className="dest-card">
            <div className="image-container">
              <img src={destination.destinationImage} alt={destination.name} />
            </div>

            <div className="dest-content">
              <div className="dest-header">
                <h2>{destination.name}</h2>
                <span className="rating">⭐ 4.8</span>
              </div>

              <p className="dest-location">
                <i className="location-icon">📍</i> {destination.country}
              </p>

              {/* Optional: Keep your highlights hidden or as small badges */}
              <div className="home-highlights-container">
                {destination.highlights.slice(0, 2).map((h, i) => (
                  <span key={i} className="highlight-badge">
                    {h}
                  </span>
                ))}
              </div>

              <div className="like-container">
                <button
                  className={`like-btn ${destination.isLiked ? "liked" : ""}`}
                  onClick={() => handleLike(destination._id)}
                >
                  <FaRegThumbsUp className="like-icon" />
                  <span className="like-text">Like</span>
                </button>

                <span className="like-count">
                  {destination.likes?.length || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Destinations;
