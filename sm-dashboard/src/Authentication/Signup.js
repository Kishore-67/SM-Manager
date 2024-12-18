import React from "react";
import "./Auth.css";
import loginImage from "../Asserts/login_back.png";

const SignUp = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Create an Account 🚀</h1>
        <form>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your name" />
          <label>Email</label>
          <input type="email" placeholder="Example@email.com" />
          <label>Password</label>
          <input type="password" placeholder="At least 8 characters" />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p>
          Already have an account? <a href="/">Sign in</a>
        </p>
      </div>
      <div className="auth-right">
        <img src={loginImage} alt="Background" />
      </div>
    </div>
  );
};

export default SignUp;
