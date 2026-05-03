import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import { NavLink } from "react-router-dom";

function GetPackageHome() {
  const [packages, setPackages] = useState([]);
  const { token } = useStore();

  const getPackageHome = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/destinations/get-packages",
        {
          method: "GET",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
      );

      console.log("Response from get-packages:", res);

      if (res.ok) {
        const data = await res.json();
        setPackages(data.packages);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    getPackageHome();
  }, []);

  return (
    <section className="packages-section">
      <div className="packages-header">
        <h1>Popular Tour Packages</h1>
        <p>Carefully crafted packages for every type of traveler</p>
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg._id}>
            <div className="package-image">
              <img src={pkg.destinationImage} alt={pkg.packageName} />
            </div>

            <div className="package-content">
              <h2>{pkg.packageName}</h2>

              <div className="package-info">
                <span className="days">⏱ {pkg.packageTime}</span>
                <span className="price">${pkg.packagePrice}</span>
              </div>

              <p className="description">{pkg.packageDescription}</p>

              <NavLink to={`/get-package`} className="details-btn">
                View Details
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GetPackageHome;
