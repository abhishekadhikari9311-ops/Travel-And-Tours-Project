import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useState } from "react";

function UpdateProfile() {
  const { token } = useStore();

  const [updateProfileData, setUpdateProfileData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const updateProfile = async () => {
    try {
      const res = await fetch(`http://localhost:4000/user/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateProfileData),
      });
      console.log("Update Profile Response:", res);

      if (res.ok) {
        const data = await res.json();
        console.log("Profile updated successfully:", data);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFormSubmit = (e) => {
    try {
      e.preventDefault();
      updateProfile();
    } catch (error) {
      console.error("Error handling form submit:", error);
    }
  };

  return (
    <>
      <h1>UpdateProfile</h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={updateProfileData.fullName}
          onChange={(e) =>
            setUpdateProfileData({
              ...updateProfileData,
              fullName: e.target.value,
            })
          }
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={updateProfileData.email}
          onChange={(e) =>
            setUpdateProfileData({
              ...updateProfileData,
              email: e.target.value,
            })
          }
        />
        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={updateProfileData.password}
          onChange={(e) =>
            setUpdateProfileData({
              ...updateProfileData,
              password: e.target.value,
            })
          }
        />
        <br />

        <button type="submit">Update Profile</button>
      </form>
    </>
  );
}

export default UpdateProfile;
