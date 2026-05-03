import { use, useState } from "react";
import { useEffect } from "react";
import { createContext, useContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const [packages, setPackages] = useState([]);

  const [bookings, setBookings] = useState([]);

  const [users, setUsers] = useState([]);

  const [destinationData, setDestinationData] = useState({
    name: "",
    country: "",
    description: "",
    bestTimeToVisit: "",
    highlights: "",
    destinationImage: null,
    category: "",
  });

  const [destinations, setDestinations] = useState([]);

  const [bookingApproved, setBookingApproved] = useState(
    localStorage.getItem("bookingApproved"),
  );

  const [packageData, setPackageData] = useState(null);

  const [profileData, setProfileData] = useState(null);

  const [categories, setCategories] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token"));
  const EmailVerified = async () => {
    localStorage.setItem("emailVerified", "true");
  };

  const storeToken = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // useEffect(() => {
  //   localStorage.setItem("totalBookings", bookings.length);
  // }, [bookings]);

  // useEffect(() => {
  //   localStorage.setItem("destinations", destinations.length);
  // }, [destinations]);

  // useEffect(() => {
  //   if (profileData && destinations) {
  //     const liked = destinations.filter((d) =>
  //       d.likes?.includes(profileData._id),
  //     );

  //     localStorage.setItem("wishlists", liked.length);
  //   }
  // }, [destinations, profileData]);

  const getUserProfile = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response in getUserProfile:", res);

      if (res.ok) {
        const data = await res.json();
        console.log("User profile data:", data);
        setProfileData(data.user);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  const getPackageById = async (packageId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/get-packages/${packageId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from getPackageById API");

      if (res.ok) {
        const data = await res.json();
        console.log("Package data:", data);
        setPackageData(data.package);
        return data.package;
      }
    } catch (error) {
      console.error("Error fetching package by ID:", error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/get-category-api`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res from backend after hitting get-category-api");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting get-category-api");
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const storeBookingApproval = () => {
    localStorage.setItem("bookingApproved", "true");
    setBookingApproved("true");
  };

  const storeBookingRejection = () => {
    localStorage.setItem("bookingApproved", "false");
    setBookingApproved("false");
  };

  const addDestination = async () => {
    try {
      const formData = new FormData();
      formData.append("name", destinationData.name);
      formData.append("country", destinationData.country);
      formData.append("description", destinationData.description);
      formData.append("bestTimeToVisit", destinationData.bestTimeToVisit);
      formData.append("highlights", destinationData.highlights);
      formData.append("destinationImage", destinationData.destinationImage);
      formData.append("category", destinationData.category);

      const res = await fetch(
        `http://localhost:4000/admin/dashboard/post-destination-api`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        },
      );
      console.log(res, "res from backend after hitting post-destination-api");

      if (res.ok) {
        const data = await res.json();
        console.log(
          data,
          "data from backend after hitting post-destination-api",
        );
        alert(data.message);
        setDestinationData({
          name: "",
          country: "",
          description: "",
          bestTimeToVisit: "",
          highlights: "",
          destinationImage: null,
          category: "",
        });
      }
    } catch (error) {
      console.error("Error adding destination:", error);
      alert("Failed to add destination!");
    }
  };

  const getDestination = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/get-destinations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "res from backend after hitting get-destinations");

      if (res.ok) {
        const data = await res.json();

        console.log("Data:", data);

        setDestinations(data.destinations);

        // wishlist count
        const liked = data.destinations.map((d) =>
          d.likes?.includes(profileData?._id),
        );
        console.log("Liked destinations:", liked);
        localStorage.setItem("wishlists", liked.length);

        localStorage.setItem("destinations", data.destinations.length);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const postReview = async (destinationId, rating, reviewText) => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/post-review/${destinationId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, reviewText }),
        },
      );
      console.log(res, "Response from postReview API");

      if (res.ok) {
        const data = await res.json();
        console.log("Review posted successfully:", data);
        return data;
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  const getReview = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/get-review`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();

        console.log("Fetched reviews:", data);

        // ✅ ALWAYS update reviews
        setReviews(data?.reviews || []);

        // ✅ ONLY calculate if profile exists
        if (profileData?._id) {
          const visitedSet = new Set(
            data.reviews
              .filter((review) => review.userId === profileData._id)
              .map((review) => review.destinationId?._id),
          );
          console.log("Visited Destinations Set:", visitedSet);

          localStorage.setItem(
            "destinationsVisited",
            visitedSet.size.toString(),
          );

          localStorage.setItem("totalReviews", data.reviews.length);
        }
      }
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const deleteDestination = async (destinationId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/delete-destination/${destinationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res from backend after hitting delete-destination-api");

      if (res.ok) {
        const data = await res.json();
        console.log(
          data,
          "data from backend after hitting delete-destination-api",
        );
        alert(data.message);
        await getDestination();
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/getAllUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res from backend after hitting getAllUsers");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting getAllUsers");
        alert(data.message);
        setUsers(data.users); // Update the users state with the fetched data

        // ✅ Store total users in localStorage

        localStorage.setItem("totalUsers", data.users.length);
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/toggle-user-status/${userId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res from backend after hitting toggle-user-status");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting toggle-user-status");
        alert(data.message);
        getAllUsers(); // Refresh the user list after toggling status
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/delete-user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "res from backend after hitting delete-user");

      if (res.ok) {
        const data = await res.json();
        console.log(data, "data from backend after hitting delete-user");
        alert(data.message);
        getAllUsers(); // Refresh the user list after deleting a user
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // ================= GET =================
  const fetchPackages = async () => {
    try {
      const res = await fetch("http://localhost:4000/user/get-packages", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setPackages(data.packages);

        console.log(data, "data from backend after hitting get-packages");

        const revenue = data.packages.reduce((total, pkg) => {
          return total + (Number(pkg.packagePrice) || 0);
        }, 0);
        console.log("Total revenue from packages:", revenue);

        localStorage.setItem("packages", data.packages.length);
        localStorage.setItem("totalRevenue", revenue);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FETCH BOOKINGS =================
  const getBookings = async () => {
    try {
      const res = await fetch("http://localhost:4000/user/get-bookings", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "Response from getBookings API");

      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings);
        console.log(data, "Data from getBookings API");
        localStorage.setItem("totalBookings", data.bookings.length);

        const myBookings = data.bookings.filter(
          (booking) => booking.userId._id === profileData._id,
        );
        localStorage.setItem("myBookings", myBookings.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token && profileData?._id) {
      getBookings();
    }
  }, [token, profileData]);

  return (
    <DataContext.Provider
      value={{
        EmailVerified,
        storeToken,
        removeToken,
        token,
        profileData,
        getPackageById,
        categories,
        getCategory,
        packageData,
        bookingApproved,
        storeBookingApproval,
        storeBookingRejection,
        destinationData,
        setDestinationData,
        addDestination,
        destinations,
        postReview,
        getReview,
        reviews,
        getDestination,
        deleteDestination,
        users,
        getAllUsers,
        toggleUserStatus,
        deleteUser,
        packages,
        fetchPackages,
        bookings,
        getBookings,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useStore must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useStore };
