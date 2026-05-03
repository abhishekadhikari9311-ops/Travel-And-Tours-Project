import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaRegThumbsUp } from "react-icons/fa";

import GetPackageHome from "./GetPackageHome";
import "../css/home.css";
import "../css/GetPackageHome.css";
import Hero from "./Hero";
import GetDestinationHome from "./GetDestinationHome";
import "../css/GetDestinationHome.css";
import TravelerComponent from "./TravelerComponent";
import { FiSend } from "react-icons/fi";

function Home() {
  return (
    <>
      <Hero />

      <section className="featured-destinations">
        <div className="container">
          <h2 className="section-title">Featured Destinations</h2>
          <p className="section-subtitle">
            Handpicked destinations for unforgettable experiences
          </p>
        </div>
      </section>

      <GetDestinationHome />

      <GetPackageHome />

      <TravelerComponent />

      <section className="newsletter">
        <div className="newsletter-container">
          <h2>Stay Updated</h2>
          <p>Subscribe for exclusive deals and travel inspiration</p>

          <form className="subscribe-form">
            <input type="email" placeholder="Enter your email" required />

            <button type="submit">
              <FiSend />✈ Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Home;
