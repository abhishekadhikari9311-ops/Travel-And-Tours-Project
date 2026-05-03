import React from "react";
import { useState } from "react";
import { useStore } from "../store/store";

function CreateEmailSetting() {
  const [createEmailSetting, setCreateEmailSetting] = useState({
    smtpHost: "",
    smtpPort: "",
    smtpSecure: false,
    smtpUser: "",
    smtpPass: "",
  });

  const { token } = useStore();

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(
        `http://localhost:4000/admin/dashboard/create-email-setting`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(createEmailSetting),
        },
      );
      console.log(res, "Response from createEmailSetting API");

      if (res.ok) {
        const data = await res.json();
        console.log("Email setting created successfully:", data);
        // Optionally, you can reset the form or show a success message here
        setCreateEmailSetting({
          smtpHost: "",
          smtpPort: "",
          smtpSecure: false,
          smtpUser: "",
          smtpPass: "",
        });
      }
    } catch (error) {
      console.error("Error creating email setting:", error);
    }
  };

  return (
    <>
      <h1>CreateEmailSetting</h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="smtpHost">SMTP Host:</label>
        <input
          type="text"
          id="smtpHost"
          name="smtpHost"
          required
          value={createEmailSetting.smtpHost}
          onChange={(e) =>
            setCreateEmailSetting({
              ...createEmailSetting,
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
          value={createEmailSetting.smtpPort}
          onChange={(e) =>
            setCreateEmailSetting({
              ...createEmailSetting,
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
          checked={createEmailSetting.smtpSecure}
          onChange={(e) =>
            setCreateEmailSetting({
              ...createEmailSetting,
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
          value={createEmailSetting.smtpUser}
          onChange={(e) =>
            setCreateEmailSetting({
              ...createEmailSetting,
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
          value={createEmailSetting.smtpPass}
          onChange={(e) =>
            setCreateEmailSetting({
              ...createEmailSetting,
              smtpPass: e.target.value,
            })
          }
        />
        <br />

        <button type="submit">Create Email Setting</button>
      </form>
    </>
  );
}

export default CreateEmailSetting;
