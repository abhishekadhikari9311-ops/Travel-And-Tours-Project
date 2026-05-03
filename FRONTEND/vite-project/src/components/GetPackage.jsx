import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import "../css/GetPackage.css";

function GetPackage() {
  const [packages, setPackages] = useState([]);

  const { token, profileData } = useStore();

  const navigate = useNavigate();

  const getPackage = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/get-packages`, {
        method: "GET",

        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log(res, "res from backend after hitting get-packages");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting get-packages");
        setPackages(data.packages);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    getPackage();
  }, []);

  const handleEditPackage = (packageId) => {
    // Navigate to the edit package page with the package ID
    navigate(`/edit-package/${packageId}`);
  };

  const handleDeletePackage = async (packageId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/delete-package-api/${packageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from delete package API");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "Data from delete package API");
        // If the package was successfully deleted, refresh the package list

        setPackages((prev) => {
          return prev.filter((pkg) => pkg._id !== packageId);
        });
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  // const handleBooking = (packageId) => {
  //   navigate(`/add-booking/${packageId}`);
  // };

  const handleBooking = async (packageId) => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/user/booking-add/${packageId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/json",
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Booking successful!");
      navigate("/bookings");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <header class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Tour Packages</h1>
          <p class="hero-subtitle">
            Find the perfect package for your next adventure
          </p>
        </div>
      </header>

      <ul className="package-grid">
        {packages.map((pkg) => (
          <li key={pkg._id} className="package-card">
            <div className="package-card__image-container">
              {/* Replace with actual image source from your data */}
              <img
                src={pkg.destinationImage}
                alt={pkg.packageName}
                className="package-card__image"
              />
            </div>

            <div className="package-card__content">
              <h2 className="package-card__title">{pkg.packageName}</h2>

              <div className="package-card__meta">
                <span className="package-card__time">🕒 {pkg.packageTime}</span>
                <span className="package-card__price">
                  $ {pkg.packagePrice}
                </span>
              </div>

              <p className="package-card__description">
                {pkg.packageDescription}
              </p>

              <div className="package-card__highlights">
                <strong>Includes:</strong>
                <ul>
                  {/* Assuming highlights is an array or a comma-separated string */}
                  {pkg.packageHighlights.map((item, index) => (
                    <li key={index}>✓ {item.trim()}</li>
                  ))}
                </ul>
              </div>

              <div className="package-card__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => handleBooking(pkg._id)}
                >
                  Book Now
                </button>

                {/* <div className="admin-actions">
                  {profileData?.role === "admin" && (
                    <>
                      <button
                        className="btn btn--secondary"
                        onClick={() => handleEditPackage(pkg._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn--danger"
                        onClick={() => handleDeletePackage(pkg._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn--outline"
                    onClick={() => navigate(`/get-booking/${pkg._id}`)}
                  >
                    View Details
                  </button>
                </div> */}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetPackage;
