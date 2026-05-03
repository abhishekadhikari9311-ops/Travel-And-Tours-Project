import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GetEmailSetting() {
  const [emailSetting, setEmailSetting] = useState(null);
  const { token } = useStore();
  const navigate = useNavigate();

  const getEmailSetting = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/get-email-setting`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from getEmailSetting API");

      if (res.ok) {
        const data = await res.json();
        console.log("Email setting data:", data);
        setEmailSetting(data.emailSetting);
      }
    } catch (error) {
      console.error("Error fetching email setting:", error);
    }
  };

  useEffect(() => {
    getEmailSetting();
  }, [token]);

  const handleUpdate = (id) => {
    navigate(`/update-email-setting/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/delete-email-setting/${id}`);
  };

  return (
    <>
      <h1>GetEmailSetting</h1>
      {emailSetting && (
        <p>
          Email Setting:{" "}
          {emailSetting.map((emailSet) => {
            return (
              <div key={emailSet._id}>
                <p>host: {emailSet.smtpHost}</p>
                <p>port: {emailSet.smtpPort}</p>
                <p>secure: {emailSet.smtpSecure ? "true" : "false"}</p>
                <p>user: {emailSet.auth.smtpUser}</p>
                <p>pass: {emailSet.auth.smtpPass}</p>
                <button onClick={() => handleUpdate(emailSet._id)}>
                  Update Email Setting
                </button>
                <button onClick={() => handleDelete(emailSet._id)}>
                  Delete Email Setting
                </button>
              </div>
            );
          })}
        </p>
      )}
    </>
  );
}

export default GetEmailSetting;
