import React, { useState } from "react";
import { useStore } from "../store/store";

function PostPackage() {
  const { token } = useStore();

  const [packageData, setPackageData] = useState({
    packageName: "",
    packageTime: "",
    packagePrice: "",
    packageDescription: "",
    packageHighlights: "",
    destinationImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "destinationImage") {
      setPackageData((prev) => {
        return { ...prev, destinationImage: files[0] };
      });
    } else {
      setPackageData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("packageName", packageData.packageName);
    formData.append("packageTime", packageData.packageTime);
    formData.append("packagePrice", packageData.packagePrice);
    formData.append("packageDescription", packageData.packageDescription);
    formData.append("packageHighlights", packageData.packageHighlights);
    formData.append("destinationImage", packageData.destinationImage);

    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/post-package-api`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      console.log(res, "res from backend after hitting post-package-api");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting post-package-api");
        alert(data.message);
        setPackageData({
          packageName: "",
          packageTime: "",
          packagePrice: "",
          packageDescription: "",
          packageHighlights: "",
          destinationImage: null,
        });
      }
    } catch (error) {
      console.error("Error posting package:", error);
    }
  };

  return (
    <>
      <div>PostPackage</div>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="packageName">Package Name:</label>
        <input
          type="text"
          id="packageName"
          name="packageName"
          value={packageData.packageName}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packageTime">Package Time:</label>
        <input
          type="text"
          id="packageTime"
          name="packageTime"
          value={packageData.packageTime}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packagePrice">Package Price:</label>
        <input
          type="text"
          id="packagePrice"
          name="packagePrice"
          value={packageData.packagePrice}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packageDescription">Package Description:</label>
        <input
          type="text"
          id="packageDescription"
          name="packageDescription"
          value={packageData.packageDescription}
          onChange={handleInputChange}
        />
        <br />

        <label htmlFor="packageHighlights">Package Highlights:</label>
        <input
          type="text"
          id="packageHighlights"
          name="packageHighlights"
          value={packageData.packageHighlights}
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

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PostPackage;
