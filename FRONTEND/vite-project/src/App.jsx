// import React from "react";
// import Register from "./components/Register";
// import Navbar from "./components/Navbar";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import VerifyEmail from "./components/VerifyEmail";
// import ResetPassword from "./components/ResetPassword";
// import UpdatePassword from "./components/UpdatePassword";
// import Profile from "./components/Profile";
// import AddDestination from "./components/AddDestination";
// import GetDestination from "./components/GetDestination";
// import PostPackage from "./components/PostPackage";
// import GetPackage from "./components/GetPackage";
// import PostContact from "./components/PostContact";
// import PostCategory from "./components/PostCategory";
// import GetAllUsers from "./components/Users";
// import ToggleUserStatus from "./components/ToggleUserStatus";
// import DeleteUser from "./components/DeleteUser";
// import EditDestination from "./components/EditDestination";
// import DeleteDestination from "./components/DeleteDestination";
// import LogOut from "./components/LogOut";
// import Home from "./components/Home";
// import EditPackage from "./components/EditPackage";
// import GetPackageById from "./components/GetPackageById";
// import DeletePackage from "./components/DeletePackage";
// import GetPackageHome from "./components/GetPackageHome";
// import AddBooking from "./components/AddBooking";
// import GetBookingByPackageId from "./components/GetBookingByPackageId";
// import ApproveBooking from "./components/ApproveBooking";
// import GetBookings from "./components/GetBookings";
// import RejectBooking from "./components/RejectBooking";
// import DeleteBooking from "./components/DeleteBooking";
// import PostReview from "./components/PostReview";
// import GetReview from "./components/GetReview";
// import DeleteReview from "./components/DeleteReview";
// import ChangePassword from "./components/ChangePassword";
// import UpdateProfile from "./components/UpdateProfile";
// import CreateEmailSetting from "./components/CreateEmailSetting";
// import UpdateEmailSetting from "./components/UpdateEmailSetting";
// import GetEmailSetting from "./components/GetEmailSetting";
// import GetEmailSettingById from "./components/GetEmailSettingById";
// import DeleteEmailSettingById from "./components/DeleteEmailSettingById";
// import EmailController from "./components/EmailController";
// import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import GetDestinationHome from "./components/GetDestinationHome";
// import Destination from "./components/Destination";
// import Package from "./components/Package";
// import Bookings from "./components/Bookings";
// import Reviews from "./components/Reviews";
// import EmailSetting from "./components/EmailSetting";
// import Overview from "./components/Overview";
// import Users from "./components/Users";
// import Destinations from "./components/Destinations";
// import "./App.css";

// function App() {
//   return (
//     <>
//       <h1>Hello, World!</h1>

{
  /* <BrowserRouter>
        <Navbar />

        <div className="main-layout">
          <main className="body-content">
            <Routes> */
}
{
  /* <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/hero" element={<Hero />} />
              <Route path="/verify-email/:token" element={<VerifyEmail />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/reset-password/:token"
                element={<UpdatePassword />}
              />
              <Route path="/get-user-profile" element={<Profile />} />
              <Route path="/add-destination" element={<AddDestination />} />
              <Route path="/get-destination" element={<GetDestination />} />
              <Route path="/post-package" element={<PostPackage />} />
              <Route path="/get-package" element={<GetPackage />} />
              <Route path="/post-contact" element={<PostContact />} />
              <Route path="/post-category" element={<PostCategory />} />
              <Route path="/getAllUsers" element={<Users />} />
              <Route
                path="/toggle-user-status"
                element={<ToggleUserStatus />}
              />
              <Route path="/delete-user" element={<DeleteUser />} />
              <Route
                path="/edit-destination/:destinationId"
                element={<EditDestination />}
              />
              <Route
                path="/delete-destination/:destinationId"
                element={<DeleteDestination />}
              />
              <Route path="/logout" element={<LogOut />} />
              <Route
                path="/edit-package/:packageId"
                element={<EditPackage />}
              />
              <Route
                path="/get-package/:packageId"
                element={<GetPackageById />}
              />
              <Route
                path="/delete-package/:packageId"
                element={<DeletePackage />}
              />
              <Route path="/get-packages" element={<GetPackageHome />} />
              <Route
                path="/get-destinations"
                element={<GetDestinationHome />}
              />
              <Route path="/add-booking/:packageId" element={<AddBooking />} />
              <Route
                path="/get-booking/:packageId"
                element={<GetBookingByPackageId />}
              />
              <Route
                path="/approve-booking/:bookingId"
                element={<ApproveBooking />}
              />
              <Route
                path="/reject-booking/:bookingId"
                element={<RejectBooking />}
              />
              <Route path="/get-bookings" element={<GetBookings />} />
              <Route
                path="/delete-booking/:bookingId"
                element={<DeleteBooking />}
              />
              <Route path="/post-review" element={<PostReview />} />

              <Route path="/get-review" element={<GetReview />} />
              <Route path="/delete-review" element={<DeleteReview />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/email-setting" element={<EmailSetting />} />
              <Route
                path="/create-email-setting"
                element={<CreateEmailSetting />}
              />
              <Route
                path="/update-email-setting/:id"
                element={<UpdateEmailSetting />}
              />
              <Route path="/get-email-setting" element={<GetEmailSetting />} />
              <Route
                path="/get-email-setting/:id"
                element={<GetEmailSettingById />}
              />
              <Route
                path="/delete-email-setting/:id"
                element={<DeleteEmailSettingById />}
              />
              <Route path="/email-controller" element={<EmailController />} />
              <Route path="/admin/destinations" element={<Destination />} />
              <Route path="/admin/packages" element={<Package />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/destinations" element={<Destinations />} /> */
}
{
  /* </Routes>
          </main>
        </div>
      </BrowserRouter> */
}

{
  /* <footer className="footer">
        <Footer />
      </footer>
    </>
  );
} */
}

// export default App;

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// all your imports...
import Register from "./components/Register";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import UpdatePassword from "./components/UpdatePassword";
import Home from "./components/Home";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import AddDestination from "./components/AddDestination";
import GetDestination from "./components/GetDestination";
import PostPackage from "./components/PostPackage";
import GetPackage from "./components/GetPackage";
import PostContact from "./components/PostContact";
import PostCategory from "./components/PostCategory";
import Users from "./components/Users";
import ToggleUserStatus from "./components/ToggleUserStatus";
import DeleteUser from "./components/DeleteUser";
import EditDestination from "./components/EditDestination";
import DeleteDestination from "./components/DeleteDestination";
import LogOut from "./components/LogOut";
import EditPackage from "./components/EditPackage";
import GetPackageById from "./components/GetPackageById";
import DeletePackage from "./components/DeletePackage";
import GetPackageHome from "./components/GetPackageHome";
import GetDestinationHome from "./components/GetDestinationHome";
import AddBooking from "./components/AddBooking";
import GetBookingByPackageId from "./components/GetBookingByPackageId";
import ApproveBooking from "./components/ApproveBooking";
import GetBookings from "./components/GetBookings";
import RejectBooking from "./components/RejectBooking";
import DeleteBooking from "./components/DeleteBooking";
import PostReview from "./components/PostReview";
import GetReview from "./components/GetReview";
import DeleteReview from "./components/DeleteReview";
import ChangePassword from "./components/ChangePassword";
import UpdateProfile from "./components/UpdateProfile";
import CreateEmailSetting from "./components/CreateEmailSetting";
import UpdateEmailSetting from "./components/UpdateEmailSetting";
import GetEmailSetting from "./components/GetEmailSetting";
import GetEmailSettingById from "./components/GetEmailSettingById";
import DeleteEmailSettingById from "./components/DeleteEmailSettingById";
import EmailController from "./components/EmailController";
import Destination from "./components/Destination";
import Package from "./components/Package";
import Bookings from "./components/Bookings";
import Reviews from "./components/Reviews";
import EmailSetting from "./components/EmailSetting";
import Overview from "./components/Overview";
import Destinations from "./components/Destinations";
// ... keep rest as is

function Layout() {
  const location = useLocation();

  // ✅ Pages where footer SHOULD be visible
  const publicRoutes = ["/", "/home", "/login", "/register"];

  // ✅ Handle dynamic routes
  const isVerifyEmail = location.pathname.startsWith("/verify-email");
  const isResetPassword =
    location.pathname === "/reset-password" ||
    location.pathname.startsWith("/reset-password/");

  // ✅ Final decision
  const showFooter =
    publicRoutes.includes(location.pathname) ||
    isVerifyEmail ||
    isResetPassword;

  // Routes where footer should NOT appear
  const hideFooterRoutes = ["/login", "/register", "/reset-password"];

  // Check dynamic routes like /reset-password/:token or /verify-email/:token
  const hideFooter =
    hideFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/verify-email") ||
    location.pathname.startsWith("/reset-password/");

  // if (location.pathname === "/login" || location.pathname === "/register") {
  //   return <Outlet />;
  // }

  return (
    <>
      <Navbar />

      <div className="main-layout">
        <main className="body-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/reset-password/:token" element={<UpdatePassword />} />
            <Route path="/get-user-profile" element={<Profile />} />
            <Route path="/add-destination" element={<AddDestination />} />
            <Route path="/get-destination" element={<GetDestination />} />
            <Route path="/post-package" element={<PostPackage />} />
            <Route path="/get-package" element={<GetPackage />} />
            <Route path="/post-contact" element={<PostContact />} />
            <Route path="/post-category" element={<PostCategory />} />
            <Route path="/getAllUsers" element={<Users />} />
            <Route path="/toggle-user-status" element={<ToggleUserStatus />} />
            <Route path="/delete-user" element={<DeleteUser />} />
            <Route
              path="/edit-destination/:destinationId"
              element={<EditDestination />}
            />
            <Route
              path="/delete-destination/:destinationId"
              element={<DeleteDestination />}
            />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/edit-package/:packageId" element={<EditPackage />} />
            <Route
              path="/get-package/:packageId"
              element={<GetPackageById />}
            />
            <Route
              path="/delete-package/:packageId"
              element={<DeletePackage />}
            />
            <Route path="/get-packages" element={<GetPackageHome />} />
            <Route path="/get-destinations" element={<GetDestinationHome />} />
            <Route path="/add-booking/:packageId" element={<AddBooking />} />
            <Route
              path="/get-booking/:packageId"
              element={<GetBookingByPackageId />}
            />
            <Route
              path="/approve-booking/:bookingId"
              element={<ApproveBooking />}
            />
            <Route
              path="/reject-booking/:bookingId"
              element={<RejectBooking />}
            />
            <Route path="/get-bookings" element={<GetBookings />} />
            <Route
              path="/delete-booking/:bookingId"
              element={<DeleteBooking />}
            />
            <Route path="/post-review" element={<PostReview />} />

            <Route path="/get-review" element={<GetReview />} />
            <Route path="/delete-review" element={<DeleteReview />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/email-setting" element={<EmailSetting />} />
            <Route
              path="/create-email-setting"
              element={<CreateEmailSetting />}
            />
            <Route
              path="/update-email-setting/:id"
              element={<UpdateEmailSetting />}
            />
            <Route path="/get-email-setting" element={<GetEmailSetting />} />
            <Route
              path="/get-email-setting/:id"
              element={<GetEmailSettingById />}
            />
            <Route
              path="/delete-email-setting/:id"
              element={<DeleteEmailSettingById />}
            />
            <Route path="/email-controller" element={<EmailController />} />
            <Route path="/admin/destinations" element={<Destination />} />
            <Route path="/admin/packages" element={<Package />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/destinations" element={<Destinations />} />
          </Routes>
        </main>
      </div>

      {/* ✅ Conditional Footer */}
      {showFooter && (
        <footer className="footer">
          <Footer />
        </footer>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
