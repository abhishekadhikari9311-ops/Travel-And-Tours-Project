// import React, { useState } from "react";
// import { useStore } from "../store/store";

// function EmailController() {
//   const [email, setEmail] = useState({
//     to: "",
//     subject: "",
//     text: "",
//   });

//   const { token } = useStore();

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(
//         `http://localhost:4000/admin/dashboard/email-controller`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(email),
//         },
//       );
//       console.log(res, "Response from emailController API");

//       if (res.ok) {
//         const data = await res.json();
//         console.log(data.message, "Data from emailController API");
//         alert(data.message);
//         setEmail({
//           to: "",
//           subject: "",
//           text: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error sending email:", error);
//       alert("Failed to send email");
//     }
//   };

//   return (
//     <>
//       <h1>EmailController</h1>

//       <form onSubmit={handleFormSubmit}>
//         <label htmlFor="to">Email:</label>
//         <input
//           type="email"
//           id="to"
//           name="to"
//           value={email.to}
//           onChange={(e) => setEmail({ ...email, to: e.target.value })}
//           required
//         />
//         <br />

//         <label htmlFor="subject">Subject:</label>
//         <input
//           type="text"
//           id="subject"
//           name="subject"
//           value={email.subject}
//           onChange={(e) => setEmail({ ...email, subject: e.target.value })}
//           required
//         />
//         <br />

//         <label htmlFor="text">Message:</label>
//         <textarea
//           id="text"
//           name="text"
//           value={email.text}
//           onChange={(e) => setEmail({ ...email, text: e.target.value })}
//           required
//         ></textarea>
//         <br />

//         <button type="submit">Send Email</button>
//       </form>
//     </>
//   );
// }

// export default EmailController;

import React, { useEffect, useState } from "react";
import { useStore } from "../store/store";
import "../css/EmailSetting.css";

function EmailSetting() {
  const { token } = useStore();

  const [email, setEmail] = useState({
    to: "",
    subject: "",
    text: "",
  });

  // ================= CREATE EMAIL =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:4000/admin/dashboard/email-controller`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(email),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        setEmail({ to: "", subject: "", text: "" });
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting email");
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setEmail({
      to: item.to,
      subject: item.subject,
      text: item.text,
    });
    setEditId(item._id);
  };

  return (
    <div className="email-container">
      <h1>Email Settings</h1>

      {/* ================= FORM ================= */}
      <form className="email-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email To</label>
          <input
            type="email"
            value={email.to}
            onChange={(e) => setEmail({ ...email, to: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            rows="4"
            value={email.text}
            onChange={(e) => setEmail({ ...email, text: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn-submit">
          Send Email
        </button>
      </form>
    </div>
  );
}

export default EmailSetting;
