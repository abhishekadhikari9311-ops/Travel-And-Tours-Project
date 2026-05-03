import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import "../css/Package.css";

function Package() {
  const { token, profileData, fetchPackages, packages } = useStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    packageName: "",
    packageTime: "",
    packagePrice: "",
    packageDescription: "",
    packageHighlights: "",
    destinationImage: null,
  });

  useEffect(() => {
    if (token) fetchPackages();
  }, [token]);

  // ================= INPUT =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "destinationImage") {
      setFormData((prev) => ({ ...prev, destinationImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ================= ADD / EDIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(formData).forEach((key) => {
      fd.append(key, formData[key]);
    });

    try {
      const url = editingId
        ? `http://localhost:4000/admin/dashboard/edit-package-api/${editingId}`
        : `http://localhost:4000/admin/dashboard/post-package-api`;

      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (res.ok) {
        fetchPackages();
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      packageName: "",
      packageTime: "",
      packagePrice: "",
      packageDescription: "",
      packageHighlights: "",
      destinationImage: null,
    });
  };

  // ================= EDIT =================
  const handleEdit = (pkg) => {
    setShowForm(true);
    setEditingId(pkg._id);

    setFormData({
      packageName: pkg.packageName,
      packageTime: pkg.packageTime,
      packagePrice: pkg.packagePrice,
      packageDescription: pkg.packageDescription,
      packageHighlights: pkg.packageHighlights.join(", "),
      destinationImage: null,
    });
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/delete-package-api/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) {
        fetchPackages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="package-container">
      {/* HEADER */}
      <div className="package-header">
        <h1>Tour Packages</h1>
        {profileData?.role === "admin" && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Package
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div className="package-form">
          <h2>{editingId ? "Edit Package" : "Add Package"}</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="packageName"
              placeholder="Package Name"
              value={formData.packageName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="packageTime"
              placeholder="Duration"
              value={formData.packageTime}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="packagePrice"
              placeholder="Price"
              value={formData.packagePrice}
              onChange={handleChange}
              required
            />

            <textarea
              name="packageDescription"
              placeholder="Description"
              value={formData.packageDescription}
              onChange={handleChange}
            />

            <input
              type="text"
              name="packageHighlights"
              placeholder="Highlights (comma separated)"
              value={formData.packageHighlights}
              onChange={handleChange}
            />

            <input
              type="file"
              name="destinationImage"
              onChange={handleChange}
            />

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {editingId ? "Update" : "Save"}
              </button>
              <button type="button" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <table className="package-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Includes</th>
            {profileData?.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg._id}>
              <td>{pkg.packageName}</td>
              <td>{pkg.packageTime}</td>
              <td className="price">${pkg.packagePrice}</td>
              <td>{pkg.packageHighlights.join(", ")}</td>

              {profileData?.role === "admin" && (
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(pkg)}>
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(pkg._id)}
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Package;
