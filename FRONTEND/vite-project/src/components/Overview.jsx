// import React, { useEffect, useState } from "react";
// import { useStore } from "../store/store";

// function Overview() {
// const {
//   profileData,
//   bookings,
//   destinations,
//   reviews,
//   getReview,
//   packages,
//   users,
// } = useStore();

// const [totalBookingsGet, setTotalBookingsGet] = useState(0);
// const [totalDestinationsGet, setTotalDestinationsGet] = useState(0);
// const [totalWishlistsGet, setTotalWishlistsGet] = useState(0);
// const [destinationsVisited, setDestinationsVisited] = useState(0);
// const [reviewsGet, setReviewsGet] = useState([]);
// const [totalPackagesGet, setTotalPackagesGet] = useState(0);
// const [totalUsersGet, setTotalUsersGet] = useState(0);
// const [totalRevenue, setTotalRevenue] = useState(0);

// useEffect(() => {
//   const stored = localStorage.getItem("totalBookings");
//   setTotalBookingsGet(Number(stored) || 0);
// }, [bookings]); // update when bookings change

// useEffect(() => {
//   const destinations = localStorage.getItem("destinations");
//   setTotalDestinationsGet(Number(destinations) || 0);
// }, [destinations]);

// useEffect(() => {
//   const wishlist = localStorage.getItem("wishlists");
//   setTotalWishlistsGet(Number(wishlist) || 0);
// }, [destinations]);

// useEffect(() => {
//   const destinationVisited = localStorage.getItem("destinationsVisited");
//   console.log("Destinations Visited from localStorage:", destinationVisited);
//   setDestinationsVisited(Number(destinationVisited) || 0);
// }, [reviews.length]); // update when reviews change

// useEffect(() => {
//   const getReviews = localStorage.getItem("totalReviews");
//   console.log("Reviews from localStorage in Overview:", getReviews);
//   setReviewsGet(getReviews ? Number(getReviews) : 0);
// }, [reviews]);

// useEffect(() => {
//   if (profileData) {
//     console.log("Profile Data in Overview:", profileData);
//     getReview();
//   }
// }, [profileData]);

// useEffect(() => {
//   const storedPackages = localStorage.getItem("packages");
//   console.log("Packages from localStorage in Overview:", storedPackages);
//   setTotalPackagesGet(storedPackages ? Number(storedPackages) : 0);
// }, [packages]);

// useEffect(() => {
//   const storedUsers = localStorage.getItem("totalUsers");
//   console.log("Total Users from localStorage in Overview:", storedUsers);
//   setTotalUsersGet(storedUsers ? Number(storedUsers) : 0);
// }, [users]);

// useEffect(() => {
//   const revenue = localStorage.getItem("totalRevenue");
//   console.log("Total Revenue from localStorage in Overview:", revenue);
//   setTotalRevenue(Number(revenue) || 0);
// }, [packages]);

//   return (
//     <>
//       <h1>Overview</h1>

//       {profileData?.role !== "admin" ? (
//         <div>
//           <h2>My Bookings:</h2>
//           {totalBookingsGet > 0 ? (
//             <p>{totalBookingsGet}</p>
//           ) : (
//             <p>No bookings found.</p>
//           )}
//         </div>
//       ) : (
//         <div>
//           <h2>Total Bookings:</h2>
//           {totalBookingsGet > 0 ? (
//             <p>{totalBookingsGet}</p>
//           ) : (
//             <p>No bookings found.</p>
//           )}
//         </div>
//       )}

//       {profileData?.role === "admin" && (
//         <div>
//           <h2>Total Destinations:</h2>
//           <p>{totalDestinationsGet}</p>
//         </div>
//       )}

//       {profileData?.role !== "admin" && (
//         <div>
//           <h2>My Destinations:</h2>
//           <p>{totalWishlistsGet}</p>
//         </div>
//       )}

//       {profileData?.role !== "admin" && (
//         <div>
//           <h2>Destinations Visited:</h2>
//           <p>{destinationsVisited}</p>
//         </div>
//       )}

//       {profileData?.role === "admin" && (
//         <div>
//           <h2>Total Reviews:</h2>
//           <p>{reviewsGet}</p>
//         </div>
//       )}

//       {profileData?.role === "admin" && (
//         <div>
//           <h2>Total Packages:</h2>
//           <p>{totalPackagesGet}</p>
//         </div>
//       )}

//       {profileData?.role === "admin" && (
//         <div>
//           <h2>Total Users:</h2>
//           <p>{totalUsersGet}</p>
//         </div>
//       )}

//       {profileData?.role === "admin" && (
//         <div>
//           <h2>Total Revenue:</h2>
//           <p>${totalRevenue.toFixed(2)}</p>
//         </div>
//       )}
//     </>
//   );
// }

// export default Overview;

import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import "../css/Overview.css";

function Overview() {
  const {
    profileData,
    bookings,
    destinations,
    reviews,
    getReview,
    packages,
    users,
  } = useStore();

  const [totalBookingsGet, setTotalBookingsGet] = useState(0);
  const [myBookingsGet, setMyBookingsGet] = useState(0);
  const [totalDestinationsGet, setTotalDestinationsGet] = useState(0);
  const [totalWishlistsGet, setTotalWishlistsGet] = useState(0);
  const [destinationsVisited, setDestinationsVisited] = useState(0);
  const [reviewsGet, setReviewsGet] = useState([]);
  const [totalPackagesGet, setTotalPackagesGet] = useState(0);
  const [totalUsersGet, setTotalUsersGet] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("totalBookings");
    console.log("Total Bookings from localStorage in Overview:", stored);
    setTotalBookingsGet(Number(stored) || 0);
  }, [bookings]); // update when bookings change

  useEffect(() => {
    const stored = localStorage.getItem("myBookings");
    setMyBookingsGet(Number(stored) || 0);
  }, [bookings]);

  useEffect(() => {
    const destinations = localStorage.getItem("destinations");
    setTotalDestinationsGet(Number(destinations) || 0);
  }, [destinations]);

  useEffect(() => {
    const wishlist = localStorage.getItem("wishlists");

    setTotalWishlistsGet(Number(wishlist) || 0);
  }, [destinations]);

  useEffect(() => {
    const destinationVisited = localStorage.getItem("destinationsVisited");
    console.log("Destinations Visited from localStorage:", destinationVisited);
    setDestinationsVisited(Number(destinationVisited) || 0);
  }, [reviews.length]); // update when reviews change

  useEffect(() => {
    const getReviews = localStorage.getItem("totalReviews");
    console.log("Reviews from localStorage in Overview:", getReviews);
    setReviewsGet(getReviews ? Number(getReviews) : 0);
  }, [reviews]);

  useEffect(() => {
    if (profileData) {
      console.log("Profile Data in Overview:", profileData);
      getReview();
    }
  }, [profileData]);

  useEffect(() => {
    const storedPackages = localStorage.getItem("packages");
    console.log("Packages from localStorage in Overview:", storedPackages);
    setTotalPackagesGet(storedPackages ? Number(storedPackages) : 0);
  }, [packages]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("totalUsers");
    console.log("Total Users from localStorage in Overview:", storedUsers);
    setTotalUsersGet(storedUsers ? Number(storedUsers) : 0);
  }, [users]);

  useEffect(() => {
    const revenue = localStorage.getItem("totalRevenue");
    console.log("Total Revenue from localStorage in Overview:", revenue);
    setTotalRevenue(Number(revenue) || 0);
  }, [packages]);

  return (
    <div className="overview-container">
      {profileData?.role !== "admin" ? (
        <h1 className="main-title">User Overview</h1>
      ) : (
        <h1 className="main-title">Admin Overview</h1>
      )}

      <p className="subtitle">Manage your travel platform</p>

      {/* ✅ CARDS */}
      <div className="card-grid">
        {profileData?.role === "admin" && (
          <div className="card">
            <h3>Total Users</h3>
            <p>{totalUsersGet}</p>
          </div>
        )}

        {profileData?.role === "admin" && (
          <div className="card">
            <h3>Destinations</h3>
            <p>{totalDestinationsGet}</p>
          </div>
        )}

        {profileData?.role !== "admin" && (
          <div className="card">
            <h3>Wishlists</h3>
            <p>{totalWishlistsGet}</p>
          </div>
        )}

        {profileData?.role === "admin" && (
          <div className="card">
            <h3>Tour Packages</h3>
            <p>{totalPackagesGet}</p>
          </div>
        )}

        {profileData?.role === "admin" ? (
          totalBookingsGet > 0 ? (
            <div className="card">
              <h3>Total Bookings</h3>
              <p>{totalBookingsGet}</p>
            </div>
          ) : (
            <p>No bookings found.</p>
          )
        ) : myBookingsGet > 0 ? (
          <div className="card">
            <h3>My Bookings</h3>
            <p>{myBookingsGet}</p>
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
        {profileData?.role === "admin" && (
          <div className="card">
            <h3>Revenue</h3>
            <p>${totalRevenue}</p>
          </div>
        )}

        {profileData?.role === "admin" && (
          <div className="card">
            <h3>Reviews</h3>
            <p>{reviewsGet}</p>
          </div>
        )}

        {profileData?.role !== "admin" && (
          <div className="card">
            <h3>Destinations Visited</h3>
            <p>{destinationsVisited}</p>
          </div>
        )}
      </div>

      {/* <div className="section">
        <h2>Recent Bookings</h2>
        {recentBookings.length > 0 ? (
          recentBookings.map((b) => (
            <div className="list-item" key={b._id}>
              <div>
                <strong>{b?.userId?.name}</strong> → {b?.packageId?.packageName}
                <p>{b?.bookingDate}</p>
              </div>
              <span className={`status ${b.status}`}>{b.status}</span>
            </div>
          ))
        ) : (
          <p>No bookings found</p>
        )}
      </div> */}

      {/* <div className="section">
        <h2>Recent Reviews</h2>
        {recentReviews.length > 0 ? (
          recentReviews.map((r) => (
            <div className="list-item" key={r._id}>
              <div>
                <strong>{r?.userId?.name}</strong> on {r?.destinationId?.name}
                <p>{r?.reviewText}</p>
              </div>
              <div className="stars">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div> */}
    </div>
  );
}

export default Overview;
