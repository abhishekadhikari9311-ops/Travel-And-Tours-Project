import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UpdatePassword() {
  const [updateData, setUpdateData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateData);

    try {
      const res = await fetch(
        `http://localhost:4000/user/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        },
      );
      console.log(
        res,
        "res from backend after hitting update password endpoint",
      );

      if (res.ok) {
        const data = await res.json();
        console.log(
          data,
          "data from backend after hitting update password endpoint",
        );
        alert(data.message);
        setUpdateData({
          newPassword: "",
          confirmNewPassword: "",
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <h1>Update Password</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={updateData.newPassword}
          onChange={(e) =>
            setUpdateData({ ...updateData, newPassword: e.target.value })
          }
        />
        <br />

        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={updateData.confirmNewPassword}
          onChange={(e) =>
            setUpdateData({ ...updateData, confirmNewPassword: e.target.value })
          }
        />
        <br />

        <button type="submit">Update Password</button>
      </form>
    </>
  );
}

export default UpdatePassword;
