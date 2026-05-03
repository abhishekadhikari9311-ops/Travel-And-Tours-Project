import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import "../css/Booking.css";

function Bookings() {
  const { token, profileData, getBookings, bookings } = useStore(); // assume you store role (admin/user)

  useEffect(() => {
    if (token) getBookings();
  }, [token]);

  // ================= ADMIN ACTIONS =================
  const handleApprove = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/booking-approval-a/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) getBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/booking-approval-r/${id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) getBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= USER CANCEL =================
  const handleCancel = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/delete-booking/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) getBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="booking-container">
      <h1 className="title">Bookings</h1>

      {bookings.map((booking) => (
        <div className="booking-card" key={booking._id}>
          <img
            src={booking?.packageId?.destinationImage}
            alt="img"
            className="booking-img"
          />

          <div className="booking-info">
            <h2>{booking?.packageId?.packageName}</h2>
            <p>{booking.bookingDate}</p>
            <p className="price">${booking?.packageId?.packagePrice}</p>
          </div>

          <div className="booking-actions">
            <span
              className={`status ${
                booking.status === "approved"
                  ? "approved"
                  : booking.status === "rejected"
                    ? "rejected"
                    : "pending"
              }`}
            >
              {booking.status}
            </span>

            {/* ADMIN BUTTONS */}
            {profileData?.role === "admin" && booking.status === "pending" && (
              <>
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(booking._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(booking._id)}
                >
                  Reject
                </button>
              </>
            )}

            {/* USER CANCEL */}
            {profileData?.role === "user" && (
              <button
                className="cancel-btn"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Bookings;
