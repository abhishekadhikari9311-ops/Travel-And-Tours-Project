import React from "react";
import "../css/footer.css";

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h2 className="logo">Wanderlust</h2>
            <p>
              Discover the world with us. We create unforgettable travel
              experiences tailored to your dreams.
            </p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#">Destinations</a>
              </li>
              <li>
                <a href="#">Tour Packages</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Top Destinations</h3>
            <ul>
              <li>Paris, France</li>
              <li>Bali, Indonesia</li>
              <li>Tokyo, Japan</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li>info@wanderlust.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Travel Ave, NYC</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Wanderlust Travel. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Footer;
