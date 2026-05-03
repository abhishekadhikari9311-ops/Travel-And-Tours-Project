import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function GetBooking() {
  const [bookingData, setBookingData] = useState([]);
  const { token } = useStore();
  const { packageId } = useParams();
  const navigate = useNavigate();

  const getBooking = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/get-booking/${packageId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from get-booking API");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "Data from get-booking API");
        setBookingData(data.bookings);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  useEffect(() => {
    if (token && packageId) {
      getBooking();
    }
  }, [token, packageId]);

  return (
    <>
      <h1>GetBooking</h1>
      {bookingData.map((booking) => {
        return (
          <div key={booking._id}>
            <p>{booking.bookingDate}</p>
            <p>{booking.status}</p>
            {/* <p>{booking.isApproved}</p> */}
            <p>{booking._id}</p>
            <button onClick={() => navigate(`/approve-booking/${booking._id}`)}>
              Approve Booking
            </button>

            <button onClick={() => navigate(`/reject-booking/${booking._id}`)}>
              Reject Booking
            </button>
          </div>
        );
      })}
    </>
  );
}

export default GetBooking;
