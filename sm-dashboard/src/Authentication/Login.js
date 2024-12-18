import React from "react";
import "./Auth.css";
import loginImage from "../Asserts/login_back.png";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Welcome Back 👋</h1>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Example@email.com" />
          <label>Password</label>
          <input type="password" placeholder="At least 8 characters" />
          <div className="forgot-password">
            <a href="/">Forgot Password?</a>
          </div>
          <button type="submit" className="auth-button">Sign in</button>
        </form>
        <div className="auth-divider">Or</div>
        <div className="auth-social">
          <button className="google-btn">Sign in with Google</button>
          <button className="facebook-btn">Sign in with Facebook</button>
        </div>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
      <div className="auth-right">
        <img src={loginImage} alt="Background" />
      </div>
    </div>
  );
};

export default Login;
