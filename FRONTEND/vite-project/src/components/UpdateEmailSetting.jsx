import React from "react";
import { useState } from "react";
import { useStore } from "../store/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateEmailSetting() {
  const { token } = useStore();
  const [updateEmailSetting, setUpdateEmailSetting] = useState({
    smtpHost: "",
    smtpPort: "",
    smtpSecure: false,
    smtpUser: "",
    smtpPass: "",
  });
  const { id } = useParams();

  const getEmailSettingById = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/get-email-setting/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(res, "Response from getEmailSettingById API");

      if (res.ok) {
        const data = await res.json();
        console.log("Email setting data by ID:", data);

        setUpdateEmailSetting({
          smtpHost: data.emailSetting.smtpHost,
          smtpPort: data.emailSetting.smtpPort,
          smtpSecure: data.emailSetting.smtpSecure,
          smtpUser: data.emailSetting.auth.smtpUser,
          smtpPass: data.emailSetting.auth.smtpPass,
        });
      }
    } catch (error) {
      console.error("Error fetching email setting by ID:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getEmailSettingById();
    }
  }, [token, id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:4000/admin/dashboard/update-email-setting/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateEmailSetting),
        },
      );
      console.log(res, "Response from updateEmailSetting API");

      if (res.ok) {
        const data = await res.json();
        console.log("Email setting updated successfully:", data);
        // Optionally, you can reset the form or show a success message here
        setUpdateEmailSetting({
          smtpHost: "",
          smtpPort: "",
          smtpSecure: false,
          smtpUser: "",
          smtpPass: "",
        });
      }
    } catch (error) {
      console.error("Error updating email setting:", error);
    }
  };

  return (
    <>
      <h1>UpdateEmailSetting</h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="smtpHost">SMTP Host:</label>
        <input
          type="text"
          id="smtpHost"
          name="smtpHost"
          required
          value={updateEmailSetting.smtpHost}
          onChange={(e) =>
            setUpdateEmailSetting({
              ...updateEmailSetting,
              smtpHost: e.target.value,
            })
          }
        />
        <br />

        <label htmlFor="smtpPort">SMTP Port:</label>
        <input
          type="number"
          id="smtpPort"
          name="smtpPort"
          required
          value={updateEmailSetting.smtpPort}
          onChange={(e) =>
            setUpdateEmailSetting({
              ...updateEmailSetting,
              smtpPort: e.target.value,
            })
          }
        />
        <br />

        <label htmlFor="smtpSecure">SMTP Secure:</label>
        <input
          type="checkbox"
          id="smtpSecure"
          name="smtpSecure"
          checked={updateEmailSetting.smtpSecure}
          onChange={(e) =>
            setUpdateEmailSetting({
              ...updateEmailSetting,
              smtpSecure: e.target.checked,
            })
          }
        />
        <br />

        <label htmlFor="smtpUser">SMTP User:</label>
        <input
          type="text"
          id="smtpUser"
          name="smtpUser"
          required
          value={updateEmailSetting.smtpUser}
          onChange={(e) =>
            setUpdateEmailSetting({
              ...updateEmailSetting,
              smtpUser: e.target.value,
            })
          }
        />
        <br />

        <label htmlFor="smtpPass">SMTP Pass:</label>
        <input
          type="password"
          id="smtpPass"
          name="smtpPass"
          required
          value={updateEmailSetting.smtpPass}
          onChange={(e) =>
            setUpdateEmailSetting({
              ...updateEmailSetting,
              smtpPass: e.target.value,
            })
          }
        />
        <br />

        <button type="submit">Update Email Setting</button>
      </form>
    </>
  );
}

export default UpdateEmailSetting;
