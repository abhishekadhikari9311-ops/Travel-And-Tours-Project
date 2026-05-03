import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { FaRegThumbsUp } from "react-icons/fa";
import "../css/GetDestinationHome.css";
import { NavLink } from "react-router-dom";

function GetDestinationHome() {
  const { token } = useStore();

  const [destinations, setDestinations] = useState([]);

  const getDestination = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/destinations/get-destinations`,
        {
          method: "GET",
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

  // const handleLike = async (destinationId) => {
  //   if (!token) {
  //     alert("Please log in to like destinations.");
  //     window.location.href = "/login";
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/user/like-destination/${destinationId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     if (res.ok) {
  //       const data = await res.json();

  //       setDestinations((prev) =>
  //         prev.map((dest) =>
  //           dest._id === destinationId
  //             ? {
  //                 ...dest,
  //                 likes: new Array(data.likesCount),
  //                 isLiked: data.liked,
  //               }
  //             : dest,
  //         ),
  //       );
  //       getDestination(); // 🔥 refresh data immediately
  //     }
  //   } catch (error) {
  //     console.error("Error liking destination:", error);
  //   }
  // };

  return (
    <NavLink to="/destinations">
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

              {/* <div className="like-container">
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
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </NavLink>
  );
}

export default GetDestinationHome;
