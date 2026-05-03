import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useParams } from "react-router-dom";
import { useState } from "react";

function EditPackage() {
  const [destinationData, setDestinationData] = useState({
    packageName: "",
    packageTime: "",
    packagePrice: "",
    packageDescription: "",
    packageHighlights: "",
    destinationImage: null,
  });

  const { getPackageById, token } = useStore();

  const { packageId } = useParams();

  const fetchPackage = async (packageId) => {
    const data = await getPackageById(packageId);

    if (data) {
      setDestinationData({
        packageName: data.package.packageName || "",
        packageTime: data.package.packageTime || "",
        packagePrice: data.package.packagePrice || "",
        packageDescription: data.package.packageDescription || "",
        packageHighlights: data.package.packageHighlights || "",
        destinationImage: data.package.destinationImage || null,
      });
    }
  };

  useEffect(() => {
    if (packageId) {
      fetchPackage(packageId);
    }
  }, [packageId]);

  const handleInputChange = async (e) => {
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("packageName", destinationData.packageName);
    formData.append("packageTime", destinationData.packageTime);
    formData.append("packagePrice", destinationData.packagePrice);
    formData.append("packageDescription", destinationData.packageDescription);
    formData.append("packageHighlights", destinationData.packageHighlights);
    formData.append("destinationImage", destinationData.destinationImage);

    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/edit-package-api/${packageId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      console.log(res, "Response from edit package API");
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  return (
    <>
      <div>EditPackage</div>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="packageName">Package Name:</label>
        <input
          type="text"
          id="packageName"
          name="packageName"
          value={destinationData.packageName}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packageTime">Package Time:</label>
        <input
          type="text"
          id="packageTime"
          name="packageTime"
          value={destinationData.packageTime}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packagePrice">Package Price:</label>
        <input
          type="text"
          id="packagePrice"
          name="packagePrice"
          value={destinationData.packagePrice}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packageDescription">Package Description:</label>
        <input
          type="text"
          id="packageDescription"
          name="packageDescription"
          value={destinationData.packageDescription}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packageHighlights">Package Highlights:</label>
        <input
          type="text"
          id="packageHighlights"
          name="packageHighlights"
          value={destinationData.packageHighlights}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="destinationImage">Destination Image:</label>
        <input
          type="file"
          id="destinationImage"
          name="destinationImage"
          onChange={handleInputChange}
        />
        <br />

        <button type="submit">Edit Package</button>
      </form>
    </>
  );
}

export default EditPackage;
