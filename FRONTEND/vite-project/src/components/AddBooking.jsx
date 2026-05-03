import React from "react";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function AddBooking() {
  const [bookingData, setBookingData] = useState(null);
  const navigate = useNavigate();
  const { token } = useStore();
  const { packageId } = useParams();
  // const handleBooking = async (packageId) => {
  //   if (!token) {
  //     alert("Please login first");
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `http://localhost:4000/user/booking-add/${packageId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           // "Content-Type": "application/json",
  //         },
  //       },
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       alert(data.message);
  //       return;
  //     }

  //     alert("Booking successful!");
  //     navigate("/bookings");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div>
        <h2>Confirm Booking</h2>
        <button onClick={() => handleBooking(packageId)}>Book Now</button>
      </div>
    </>
  );
}

export default AddBooking;
