import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../store/store";
import "../css/EditDestination.css";

function EditDestination() {
  const { destinationId } = useParams();

  const navigate = useNavigate();

  const { token } = useStore();

  const [destination, setDestination] = useState({
    name: "",
    country: "",
    description: "",
    bestTimeToVisit: "",
    highlights: "",
    destinationImage: null,
    category: "",
  });
  const getDestination = async (destinationId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/get-destination/${destinationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(
        res,
        "res from backend after hitting get-destination single page",
      );

      if (res.ok) {
        const data = await res.json();
        console.log(
          data,
          "data from backend after hitting get-destination single page",
        );
        setDestination(data.destination);
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
    }
  };

  useEffect(() => {
    if (destinationId && token) {
      getDestination(destinationId);
    }
  }, [destinationId, token]);

  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/get-category-api`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res from backend after hitting get-category-api");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting get-category-api");
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getCategory();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "destinationImage") {
      setDestination((prev) => {
        return { ...prev, destinationImage: files[0] };
      });
    } else {
      setDestination((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", destination.name);
    formData.append("country", destination.country);
    formData.append("description", destination.description);
    formData.append("bestTimeToVisit", destination.bestTimeToVisit);
    formData.append("highlights", destination.highlights);
    formData.append("category", destination.category);
    formData.append("destinationImage", destination.destinationImage);

    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/edit-destination-api/${destinationId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res from backend after hitting edit-destination-api");

      if (res.ok) {
        const data = await res.json();
        console.log(
          data,
          "data from backend after hitting edit-destination-api",
        );
        alert(data.message);
        setDestination(data.destination);
        navigate("/get-destination");
      }
    } catch (error) {
      console.error("Error updating destination:", error);
    }
  };

  return (
    <>
      <div className="admin-container">
        {/* Modal Overlay Background */}
        <div className="modal-overlay">
          <div className="form-card">
            {/* Header with Title and Close Icon */}
            <div className="form-header">
              <h2 className="form-title">Edit Destination</h2>
              <span
                className="close-icon"
                onClick={() => navigate("/get-destination")}
              >
                ✕
              </span>
            </div>

            <form onSubmit={handleFormSubmit} className="destination-form">
              {/* Row 1: Name and Country */}
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={destination?.name || ""}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={destination?.country || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Description Textarea */}
              <textarea
                placeholder="Description"
                name="description"
                rows="4"
                value={destination?.description || ""}
                onChange={handleInputChange}
              ></textarea>

              {/* Row 2: Best Time and Highlights */}
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Best time to visit"
                  name="bestTimeToVisit"
                  value={destination?.bestTimeToVisit || ""}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Highlights (comma separated)"
                  name="highlights"
                  value={destination?.highlights || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Row 3: Image and Category */}
              <div className="input-row">
                <input
                  type="file"
                  name="destinationImage"
                  className="file-input"
                  onChange={handleInputChange}
                />
                <select
                  name="category"
                  value={destination?.category || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Action */}
              <button type="submit" className="submit-update-btn">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditDestination;
