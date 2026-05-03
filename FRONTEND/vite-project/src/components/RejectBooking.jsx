import React, { useState } from "react";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";

function RejectBooking() {
  const [bookingData, setBookingData] = useState([]);
  const { token, storeBookingRejection } = useStore();
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handleReject = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/booking-approval-r/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from booking rejection API");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "Data from booking rejection API");
        setBookingData(data.message);
        storeBookingRejection();
        navigate("/get-bookings");
      }
    } catch (error) {
      console.error("Error rejecting booking:", error);
    }
  };

  return (
    <>
      <h1>RejectBooking</h1>

      <button onClick={handleReject}>Reject</button>
    </>
  );
}

export default RejectBooking;
