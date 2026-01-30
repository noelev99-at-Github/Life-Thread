import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data.status === "ok") {
        // 1. Trigger the "Ball of Light"
        setIsSuccess(true);

        // 2. Wait for the animation to finish (800ms) before changing pages
        setTimeout(() => {
          navigate("/dashboard");
        }, 2500);
      }
    } catch (err) {
      console.error("Login Error: ", err.response?.data || err.message);
    }
  };

  return (
    <div className="login-page">
      {/* This is the light that will "eat the screen" */}
      {isSuccess && <div className="screen-wash"></div>}

      <div className="wave-container">
        <svg className="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path className="wave-path" d="M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50"></path>
        </svg>
      </div>

      <div className={`login-card ${isSuccess ? "success-animation" : ""}`}>
        <h2 className="login-title">Life Thread</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <br />
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-footer">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;