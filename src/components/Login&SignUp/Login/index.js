import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Footer from "../../Footer";
import UserContext from "../../Context/UserContext";

// Importing dummy user data
import { users } from "../user"; // Assuming your dummy data file is named dummyData.js

const LOGIN_URL = "/auth"; // from backend

const Login = () => {
  const { login } = useContext(UserContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  //use state for check visibility of the className
  const [isVisible, setIsVisible] = useState(false);

  //use effect for motion and focus
  useEffect(() => {
    if (currentPath === "/login") {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Find user with matching email
    const user = users.find((user) => user.email === email);

    if (!user) {
      setErrMsg("User not found");
      return;
    }

    // Check password
    if (user.password !== pwd) {
      setErrMsg("Incorrect password");
      return;
    }

    // If email and password are correct, set authentication and save userData
    login(user);
    navigate("/home");
  };

  return (
    <div className={`landing ${isVisible ? "background-l" : ""}`}>
      <section className={`container-l ${isVisible ? "show" : ""}`}>
        <h2>Login</h2>
        <p
          ref={errRef}
          className={errMsg ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              className="form-control"
              placeholder="Enter Password"
              required
            />
          </div>
          <button className="btn btn-primary">Login</button>
          <p>
            Didn't have an account?{" "}
            <Link to="/signup" className="link">
              SignUp
            </Link>
          </p>
        </form>
      </section>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Login;

//on submit change
// e.preventDefault();
//     try {
//       const response = await axios.post(
//         LOGIN_URL,
//         JSON.stringify({ email, pwd }),
//         {
//           headers: { "Content-Type": "application/json" },
//           withCredentials: true,
//         }
//       );
//       const accessToken = response?.data?.accessToken;
//       const roles = response?.data?.roles; // optional depend on backend
//       setAuth({ email, pwd, accessToken, roles });
//       setSuccess(true);
//       setPwd("");
//       setEmail("");
//     } catch (err) {
//       if (!err?.response) {
//         setErrMsg("No Server Response");
//       } else if (err.response?.status === 400) {
//         setErrMsg("Missing Email or Password");
//       } else if (err.response?.status === 401) {
//         setErrMsg("Unauthorized");
//       } else {
//         setErrMsg("Login Failed");
//       }
//       errRef.current.focus();
//     }
