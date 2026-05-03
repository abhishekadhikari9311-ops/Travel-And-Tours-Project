import React from "react";
import { useState } from "react";
import { useStore } from "../store/store";

function ChangePassword() {
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { token } = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changePasswordData),
      });
      console.log("Change Password Response:", res);
      if (res.ok) {
        const data = await res.json();
        console.log("Change Password Success:", data);
        alert("Password changed successfully!");
        setChangePasswordData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <>
      <h1>Change Password</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="currentPassword">Current Password:</label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={changePasswordData.currentPassword}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={changePasswordData.newPassword}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={changePasswordData.confirmNewPassword}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit">Change Password</button>
      </form>
    </>
  );
}

export default ChangePassword;
