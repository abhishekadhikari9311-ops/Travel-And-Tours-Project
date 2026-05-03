import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GetBookings() {
  const [bookingData, setBookingData] = useState([]);
  const { token } = useStore();
  // const navigate = useNavigate();

  const getBookings = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/get-bookings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "Response from get-bookings API");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "Data from get-bookings API");
        setBookingData(data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getBookings();
    }
  }, [token]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/delete-booking/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from delete booking API");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "Data from delete booking API");
        // If the booking was successfully cancelled, refresh the booking list
        // navigate("/get-bookings");
        getBookings();
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <>
      <h1>GetBookings</h1>

      {bookingData.map((booking) => {
        return (
          <div key={booking._id}>
            <p>{booking.bookingDate}</p>
            <p>{booking.status}</p>
            {/* <p>{booking.isApproved}</p> */}
            <p>{booking?.packageId?.packageName}</p>
            <button onClick={() => handleCancelBooking(booking._id)}>
              Cancel Booking
            </button>
          </div>
        );
      })}
    </>
  );
}

export default GetBookings;
