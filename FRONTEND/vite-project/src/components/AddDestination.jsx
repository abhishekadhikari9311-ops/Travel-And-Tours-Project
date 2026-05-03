import React, { useState } from "react";
import { useStore } from "../store/store";
import { useEffect } from "react";
import "../css/AddDestination.css";
import "../css/GetDestination.css";
import { useNavigate } from "react-router-dom";

function AddDestination() {
  const navigate = useNavigate();
  const {
    token,
    categories,
    getCategory,
    destinationData,
    setDestinationData,
    addDestination,
    destinations,
    getDestination,
  } = useStore();

  useEffect(() => {
    if (token) {
      getCategory();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "destinationImage") {
      setDestinationData((prev) => {
        return { ...prev, destinationImage: files[0] };
      });
    } else {
      setDestinationData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  useEffect(() => {
    if (token) {
      getDestination();
    }
  }, [token]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await addDestination();

    await getDestination();
  };

  return (
    <>
      <div className="admin-container">
        <div className="modal-overlay">
          <div className="form-card">
            <div className="form-header">
              <h2 className="form-title">Add Destination</h2>
              <span
                className="close-icon"
                onClick={() => navigate("/admin/destinations")}
              >
                ✕
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="destination-form">
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={destinationData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={destinationData.country}
                  onChange={handleInputChange}
                />
              </div>

              <textarea
                placeholder="Description"
                name="description"
                rows="4"
                value={destinationData.description}
                onChange={handleInputChange}
              ></textarea>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="Best time to visit"
                  name="bestTimeToVisit"
                  value={destinationData.bestTimeToVisit}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Highlights (comma separated)"
                  name="highlights"
                  value={destinationData.highlights}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-row">
                <input
                  type="file"
                  name="destinationImage"
                  className="file-input"
                  onChange={handleInputChange}
                />
                <select
                  name="category"
                  value={destinationData.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="submit-add-btn">
                Add
              </button>
            </form>
          </div>
        </div>

        {destinations.length > 0 && (
          <div className="destination-grid">
            {destinations.map((destination) => (
              <div key={destination._id} className="destination-card">
                <div className="img-container">
                  <img
                    src={destination.destinationImage}
                    alt={destination.name}
                    className="destination-img"
                  />
                </div>

                <div className="card-content">
                  <h2 className="dest-title">
                    {destination.name}, {destination.country}
                  </h2>

                  <p className="dest-text">{destination.description}</p>

                  <div className="card-actions">
                    <button className="edit-btn">✏️ Edit</button>
                    <button className="delete-btn">🗑 Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AddDestination;
