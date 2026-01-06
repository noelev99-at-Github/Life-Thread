import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with", email, password);
    
    try{
      const response = await axios.post("http://127.0.0.1:8000/login",{
        email, 
        password,
      });
      console.log("Server Response: ", response.data)
    }catch (err) {
      console.error("Login Error: ", err.response?.data || err.message);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">
        <h2 className="login-title">Memory Tap</h2>
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
