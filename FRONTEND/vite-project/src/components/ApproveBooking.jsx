import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function ApproveBooking() {
  const [bookingData, setBookingData] = useState([]);
  const { token, storeBookingApproval } = useStore();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handleApprove = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/booking-approval-a/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from booking approval API");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "Data from booking approval API");
        setBookingData(data.message);

        storeBookingApproval();
        navigate("/get-bookings");
      }
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  return (
    <>
      <h1>ApproveBooking</h1>

      <button onClick={handleApprove}>Approve</button>

      <p>{bookingData}</p>

      <button onClick={() => navigate("/get-bookings")}>
        Back to Bookings
      </button>
    </>
  );
}

export default ApproveBooking;
