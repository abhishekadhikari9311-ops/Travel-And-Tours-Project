import React from "react";
import "../css/hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Explore the World's Wonders</h1>

          <p>
            Discover breathtaking destinations and create memories that last a
            lifetime with our curated travel experiences.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/get-package")}
            >
              Book Now →
            </button>

            <button
              className="btn-secondary"
              onClick={() => navigate("/destinations")}
            >
              Explore Destinations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
