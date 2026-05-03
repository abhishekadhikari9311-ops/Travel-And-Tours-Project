import React from "react";
import "../css/TravelerComponent.css";

function TravelerComponent() {
  return (
    <>
      <section className="testimonials">
        <h2>What Travelers Say</h2>

        <div className="testimonial-grid">
          <article className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              "Wanderlust made our honeymoon absolutely perfect. Every detail
              was taken care of!"
            </p>
            <h4 className="author">Emily R.</h4>
          </article>

          <article className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p className="quote">
              "Best travel experience I've ever had. The Japan tour was
              life-changing."
            </p>
            <h4 className="author">James K.</h4>
          </article>

          <article className="testimonial-card">
            <div className="stars">★★★★</div>
            <p className="quote">
              "Incredible service and amazing destinations. Already planning my
              next trip!"
            </p>
            <h4 className="author">Priya S.</h4>
          </article>
        </div>
      </section>
    </>
  );
}

export default TravelerComponent;
