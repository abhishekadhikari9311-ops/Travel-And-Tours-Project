import React, { useState } from "react";

function ResetPassword() {
  const [resetData, setResetData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resetData);

    try {
      const res = await fetch(`http://localhost:4000/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });
      console.log(
        res,
        "res from backend after hitting reset password endpoint",
      );

      if (res.ok) {
        const data = await res.json();
        console.log(
          data,
          "data from backend after hitting reset password endpoint",
        );
        alert(data.message);
        setResetData({
          email: "",
        });
      }
    } catch (error) {
      console.error("Error requesting password reset:", error);
      alert("Failed to send reset password link. Please try again.");
    }
  };

  return (
    <>
      <h1>Reset Password</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={resetData.email}
          onChange={(e) =>
            setResetData({ ...resetData, email: e.target.value })
          }
        />
        <br />
        <button type="submit"> SEND RESET PASSWORD LINK</button>
      </form>
    </>
  );
}

export default ResetPassword;
