// // import React from "react";
// // import { Navigate, NavLink } from "react-router-dom";
// // import "../css/navbar.css";
// // import { useStore } from "../store/store";

// // function Navbar() {
// //   const { token, profileData } = useStore();

// //   return (
// //     <>
// //       <nav className="navbar">
// //         {!token ? (
// //           <>
// //             <NavLink to={"/home"}>Home</NavLink>
// //             <NavLink to={"/post-contact"}> Contact</NavLink>
// //             <NavLink to="/register">Register</NavLink>
// //             <NavLink to="/login">Login</NavLink>
// //             <NavLink to={"/reset-password"}>Reset Password</NavLink>
// //             <NavLink to={"/destinations"}>Destinations</NavLink>
// //             <NavLink to={"/admin/packages"}> Packages</NavLink>
// //           </>
// //         ) : (
// //           <>
// //             <NavLink to={"/change-password"}>Change Password</NavLink>

// //             <NavLink to={"/get-user-profile"}>Profile</NavLink>
// //             <NavLink to={"/update-profile"}>Update Profile</NavLink>

// //             <NavLink to={"/logout"}>Log Out</NavLink>
// //             <NavLink to={"/reviews"}> Reviews</NavLink>

// //             <NavLink to={"/admin/destinations"}> Destinations</NavLink>

// //             <NavLink to={"/bookings"}> Bookings</NavLink>
// //             <NavLink to={"/overview"}> Overview</NavLink>

// //             {profileData && profileData.role === "admin" && (
// //               <>
// //                 <NavLink to={"/getAllUsers"}> Users</NavLink>
// //                 <NavLink to={"/post-category"}>Post Category</NavLink>
// //                 <NavLink to={"/email-setting"}> EmailSetting</NavLink>
// //                 <NavLink to={"/email-controller"}>Email Controller</NavLink>
// //               </>
// //             )}
// //           </>
// //         )}
// //       </nav>
// //     </>
// //   );
// // }

// // export default Navbar;

// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../css/navbar.css";
// import { useStore } from "../store/store";

// function Navbar() {
//   const { token, profileData } = useStore();

//   // Helper to render the Brand/Logo
//   const Brand = () => (
//     <div className="nav-brand">
//       <span className="brand-icon">✈</span>
//       <span className="brand-name">Wanderlust</span>
//     </div>
//   );

//   return (
//     <header className="navbar-container">
//       <nav className="navbar">
//         <Brand />

//         <div className="nav-links">
//           {!token ? (
//             /* PUBLIC NAV */
//             <>
//               <NavLink to="/home">Home</NavLink>
//               <NavLink to="/about">About</NavLink>
//               <NavLink to="/destinations">Destinations</NavLink>
//               <NavLink to="/admin/packages">Packages</NavLink>
//               <NavLink to="/post-contact">Contact</NavLink>
//             </>
//           ) : (
//             /* AUTHENTICATED / ADMIN NAV */
//             <>
//               <NavLink to="/overview">Overview</NavLink>
//               <NavLink to="/getAllUsers">Users</NavLink>
//               <NavLink to="/admin/destinations">Destinations</NavLink>
//               <NavLink to="/admin/packages">Packages</NavLink>
//               <NavLink to="/bookings">Bookings</NavLink>
//               <NavLink to="/reviews">Reviews</NavLink>
//             </>
//           )}
//         </div>

//         <div className="nav-auth">
//           {!token ? (
//             <>
//               <NavLink to="/login" className="login-link">
//                 Login
//               </NavLink>
//               <NavLink to="/register" className="register-btn">
//                 Register
//               </NavLink>
//             </>
//           ) : (
//             <div className="user-profile-section">
//               <span className="user-info">
//                 {profileData?.role} User • {profileData?.username || "admin"}
//               </span>
//               <NavLink to="/logout" className="logout-link">
//                 <span className="logout-icon">→</span> Logout
//               </NavLink>
//             </div>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Navbar;

import React from "react";
import { NavLink } from "react-router-dom";
import "../css/navbar.css";
import { useStore } from "../store/store";

function Navbar() {
  const { token, profileData } = useStore();

  const Brand = () => (
    <div className="nav-brand">
      <span className="brand-icon">✈</span>
      <span className="brand-name">Wanderlust</span>
    </div>
  );

  return (
    /* We toggle the class based on the token */
    <header className={!token ? "navbar-public" : "navbar-admin"}>
      <nav className="nav-content">
        <Brand />

        <div className="nav-links">
          {!token ? (
            /* PUBLIC NAV - Will appear as a Row at the top */
            <>
              <NavLink to="/home">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/destinations">Destinations</NavLink>
              <NavLink to="/get-package">Package</NavLink>
              <NavLink to="/post-contact">Contact</NavLink>
            </>
          ) : (
            /* AUTH NAV - Will appear as a Column on the left */
            <>
              <NavLink to="/overview">Overview</NavLink>
              {profileData?.role === "admin" && (
                <NavLink to="/getAllUsers">Users</NavLink>
              )}

              <NavLink to="/admin/destinations">Destinations</NavLink>
              <NavLink to="/admin/packages">Packages</NavLink>
              <NavLink to="/bookings">Bookings</NavLink>
              <NavLink to="/reviews">Reviews</NavLink>
            </>
          )}
        </div>

        <div className="nav-auth">
          {!token ? (
            <>
              <NavLink to="/login" className="login-link">
                Login
              </NavLink>
              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>
            </>
          ) : (
            <div className="admin-footer">
              <div className="user-info">
                {profileData?.role} • {profileData?.username || "admin"}
              </div>
              <NavLink to="/logout" className="logout-link">
                <span>→</span> Logout
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
