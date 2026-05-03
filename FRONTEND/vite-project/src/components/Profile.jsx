import React from "react";
import { useStore } from "../store/store.jsx";
import { useEffect } from "react";
import { useState } from "react";

function Profile() {
  const { profileData } = useStore();

  return (
    <>
      <h1>Profile</h1>;
      {profileData ? (
        <>
          <h2>profile name:{profileData.fullName}</h2>
          <h3>profile role:{profileData.role}</h3>
          <p>approval:{profileData.isApproved ? "Approved" : "Not Approved"}</p>
          <p>email:{profileData.email}</p>
        </>
      ) : (
        <p>Loading profile data...</p>
      )}
    </>
  );
}

export default Profile;
