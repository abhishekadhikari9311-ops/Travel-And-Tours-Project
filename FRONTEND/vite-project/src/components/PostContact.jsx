import React, { useState } from "react";
import "../css/PostContact.css";
import { NavLink } from "react-router-dom";

function PostContact() {
  const [contactData, setContactData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/user/post-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });
      console.log(res, "res from backend after hitting post-contact");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting post-contact");
        alert(data.message);
        setContactData({
          fullName: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };

  return (
    <>
      <header className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </header>

      <section className="get-in-touch">
        <h2>Get in Touch</h2>

        <div className="contact-methods">
          <div className="contact-item">
            <div className="icon-box">✉</div>
            <div className="text-content">
              <h3>Email</h3>
              <p>info@wanderlust.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="icon-box">📞</div>
            <div className="text-content">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="icon-box">📍</div>
            <div className="text-content">
              <h3>Office</h3>
              <p>123 Travel Avenue, New York, NY 10001</p>
            </div>
          </div>
        </div>
      </section>

      {/* location */}

      <div className="map-wrapper">
        <NavLink
          to="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28264.31875591932!2d85.35827998861224!3d27.68516337009941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a419f80aa67%3A0x288ab8841508315f!2sMadhyapur%20Thimi!5e0!3m2!1sen!2snp!4v1776675373310!5m2!1sen!2snp"
          className="map-overlay-btn"
        >
          Open in Maps <span>↗</span>
        </NavLink>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28264.31875591932!2d85.35827998861224!3d27.68516337009941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1a419f80aa67%3A0x288ab8841508315f!2sMadhyapur%20Thimi!5e0!3m2!1sen!2snp!4v1776675373310!5m2!1sen!2snp"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact-container">
        <div className="contact-card">
          <h2 className="contact-title">Send a Message</h2>

          <form onSubmit={handleFormSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Your name"
                value={contactData.fullName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={contactData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="How can we help?"
                value={contactData.subject}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us more..."
                rows="5"
                value={contactData.message}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              <span className="icon">✈</span> Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostContact;
