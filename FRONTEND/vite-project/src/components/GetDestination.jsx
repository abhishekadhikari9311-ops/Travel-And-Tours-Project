import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import "../css/GetDestination.css";

function GetDestination() {
  const navigate = useNavigate();

  const {
    token,
    profileData,
    getDestination,
    destinations,
    deleteDestination,
  } = useStore();

  useEffect(() => {
    if (token && profileData) {
      getDestination();
    }
  }, [token, profileData]);

  return (
    <>
      <div className="destinations-page">
        {/* Header Section */}
        <header className="page-header">
          <h1 className="header-title">Destinations</h1>

          {profileData && profileData.role === "admin" && (
            <button
              className="add-destination-btn"
              onClick={() => navigate("/add-destination")}
            >
              + Add Destination
            </button>
          )}
        </header>

        {/* Grid Container */}
        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div key={destination._id} className="destination-card">
              <div className="img-container">
                <img
                  src={destination.destinationImage}
                  alt={destination.name}
                  className="destination-img"
                />
              </div>

              <div className="card-content">
                <h2 className="dest-title">
                  {destination.name}, {destination.country}
                </h2>
                <p className="dest-text">{destination.description}</p>

                <div className="card-actions">
                  {profileData && profileData.role === "admin" && (
                    <>
                      <button
                        className="btn btn-edit"
                        onClick={() =>
                          navigate(`/edit-destination/${destination._id}`)
                        }
                      >
                        <span className="icon">✎</span> Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteDestination(destination._id)}
                      >
                        <span className="icon">🗑</span> Delete
                      </button>
                    </>
                  )}
                </div>

                {profileData && profileData.role !== "admin" && (
                  <button onClick={() => deleteDestination(destination._id)}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default GetDestination;

// import React, { useEffect, useState } from "react";
// import { useStore } from "../store/store";
// import AddDestination from "./AddDestination";
// import EditDestination from "./EditDestination";
// import "../css/GetDestination.css";

// function GetDestination() {
//   const { token, profileData } = useStore();
//   const [destinations, setDestinations] = useState([]);

//   const [showForm, setShowForm] = useState(null); // null | "add" | "edit"
//   const [editId, setEditId] = useState(null);

//   const getDestination = async () => {
//     try {
//       const res = await fetch(`http://localhost:4000/user/get-destinations`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(res, "res from backend after hitting get-destinations");

//       if (res.ok) {
//         const data = await res.json();
//         console.log(data, "data from backend after hitting get-destinations");
//         setDestinations(data.destinations);
//       }
//     } catch (error) {
//       console.error("Error fetching destinations:", error);
//     }
//   };

//   useEffect(() => {
//     if (token) getDestination();
//   }, [token]);

//   const handleSuccess = () => {
//     setShowForm(null);
//     getDestination();
//   };

//   // --- ADD FORM ---
//   if (showForm === "add") {
//     return (
//       <div className="destinations-page">
//         <button className="btn" onClick={() => setShowForm(null)}>
//           ← Back to List
//         </button>
//         <AddDestination onSuccess={handleSuccess} />
//       </div>
//     );
//   }

//   // --- EDIT FORM ---
//   if (showForm === "edit") {
//     return (
//       <div className="destinations-page">
//         <button className="btn" onClick={() => setShowForm(null)}>
//           ← Back to List
//         </button>
//         <EditDestination destinationId={editId} onSuccess={handleSuccess} />
//       </div>
//     );
//   }

//   const deleteDestination = async (destinationId) => {
//     try {
//       const res = await fetch(
//         `http://localhost:4000/user/delete-destination/${destinationId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       console.log(res, "res from backend after hitting delete-destination-api");

//       if (res.ok) {
//         const data = await res.json();
//         console.log(
//           data,
//           "data from backend after hitting delete-destination-api",
//         );
//         alert(data.message);
//         setDestinations((prev) =>
//           prev.filter((destination) => destination._id !== destinationId),
//         );
//       }
//     } catch (error) {
//       console.error("Error deleting destination:", error);
//     }
//   };

//   // --- LIST VIEW ---
//   return (
//     <div className="destinations-page">
//       <header className="page-header">
//         <h1 className="header-title">Destinations</h1>

//         {profileData?.role === "admin" && (
//           <button
//             className="add-destination-btn"
//             onClick={() => setShowForm("add")}
//           >
//             + Add Destination
//           </button>
//         )}
//       </header>

//       <div className="destinations-grid">
//         {destinations.map((destination) => (
//           <div key={destination._id} className="destination-card">
//             <div className="img-container">
//               <img
//                 src={destination.destinationImage}
//                 alt={destination.name}
//                 className="destination-img"
//               />
//             </div>

//             <div className="card-content">
//               <h2 className="dest-title">
//                 {destination.name}, {destination.country}
//               </h2>

//               <p className="dest-text">{destination.description}</p>

//               <div className="card-actions">
//                 {profileData?.role === "admin" && (
//                   <>
//                     <button
//                       onClick={() => {
//                         setEditId(destination._id);
//                         setShowForm("edit");
//                       }}
//                     >
//                       ✎ Edit
//                     </button>

//                     <button
//                       onClick={() => deleteDestination(destination._id)}
//                       className="delete-btn"
//                     >
//                       🗑 Delete
//                     </button>

//                     {profileData?.role !== "admin" && (
//                       <button
//                         onClick={() => deleteDestination(destination._id)}
//                         className="delete-btn"
//                       >
//                         🗑 Remove
//                       </button>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default GetDestination;
