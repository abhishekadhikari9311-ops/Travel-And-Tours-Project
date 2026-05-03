// import React, { useState } from "react";
// import { useStore } from "../store/store";

// function Login() {
//   const { storeToken } = useStore();
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     console.log(loginData);

//     try {
//       const res = await fetch(`http://localhost:4000/user/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),
//       });
//       console.log(res, "res from backend after hitting login endpoint");

//       if (res.ok) {
//         const data = await res.json();
//         console.log(data, "data from backend after hitting login endpoint");
//         storeToken(data.token);
//         alert(data.message);
//         setLoginData({
//           email: "",
//           password: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error logging in user:", error);
//       alert("Login failed!");
//     }
//   };

//   return (
//     <>
//       <h1>Login</h1>

//       <form onSubmit={handleFormSubmit}>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={loginData.email}
//           onChange={(e) =>
//             setLoginData({ ...loginData, email: e.target.value })
//           }
//         />
//         <br />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={loginData.password}
//           onChange={(e) =>
//             setLoginData({ ...loginData, password: e.target.value })
//           }
//         />{" "}
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useStore } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import "../css/auth.css";
import { toast } from "react-toastify";

function Login() {
  const { storeToken } = useStore();

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (res.ok) {
      const data = await res.json();
      storeToken(data.token);
      toast(data.message);
      navigate("/overview");
    } else {
      toast("Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="brand">✈ Wanderlust</h2>
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>

          <button className="auth-btn">Sign In</button>
        </form>

        <p className="switch-text">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
