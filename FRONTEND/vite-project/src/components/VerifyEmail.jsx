import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const { token } = useParams();

  const getEmailVerified = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/user/verify-email/${token}`,
        {
          method: "GET",
        },
      );
      console.log(res, "res from backend after hitting verify email endpoint");

      if (res.ok) {
        const data = await res.json();
        console.log(
          data,
          "data from backend after hitting verify email endpoint",
        );
        alert(data.message);
        setVerificationStatus("verified");
      }
    } catch (err) {
      console.log(err, "error from hitting verify email endpoint");
    }
  };

  useEffect(() => {
    if (token) {
      getEmailVerified();
    }
  }, [token]);

  useEffect(() => {
    const isVerified = localStorage.getItem("emailVerified");

    if (isVerified === "true") {
      setVerificationStatus("verified");
    } else {
      localStorage.removeItem("emailVerified");
      setVerificationStatus(null);
    }
  }, [verificationStatus]);

  return (
    <>
      <h1>VerifyEmail</h1>

      {verificationStatus === "verified" ? (
        <p>Your email has been successfully verified!</p>
      ) : (
        <p>Verifying your email...</p>
      )}
    </>
  );
}

export default VerifyEmail;
