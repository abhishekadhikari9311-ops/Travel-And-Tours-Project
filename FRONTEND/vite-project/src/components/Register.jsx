// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [registerData, setRegisterData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log(registerData);

//     const res = await fetch(`http://localhost:4000/user/register`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(registerData),
//     });
//     console.log(res, "res from backend after hitting register endpoint");

//     if (res.ok) {
//       const data = await res.json();
//       console.log(data, "data from backend after hitting register endpoint");
//       alert(data.message);
//       setRegisterData({
//         fullName: "",
//         email: "",
//         password: "",
//       });
//       navigate("/login");
//     } else {
//       alert("Registration failed!");
//     }
//   };

//   return (
//     <>
//       <h1>Register</h1>

//       <form onSubmit={handleFormSubmit}>
//         <label htmlFor="fullName">Full Name:</label>
//         <input
//           type="text"
//           id="fullName"
//           name="fullName"
//           value={registerData.fullName}
//           onChange={(e) =>
//             setRegisterData({ ...registerData, fullName: e.target.value })
//           }
//         />
//         <br />
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={registerData.email}
//           onChange={(e) =>
//             setRegisterData({ ...registerData, email: e.target.value })
//           }
//         />
//         <br />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={registerData.password}
//           onChange={(e) =>
//             setRegisterData({ ...registerData, password: e.target.value })
//           }
//         />
//         <br />
//         <button type="submit">Register</button>
//       </form>
//     </>
//   );
// }

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/auth.css";
import { toast } from "react-toastify";

function Register() {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    if (res.ok) {
      const data = await res.json();
      toast(data.message);
      navigate("/login");
    } else {
      toast("Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="brand">✈ Wanderlust</h2>
        <h1>Create Account</h1>
        <p className="subtitle">Start your travel journey today</p>

        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={registerData.fullName}
              onChange={(e) =>
                setRegisterData({ ...registerData, fullName: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
          </div>

          <button className="auth-btn">Create Account</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
