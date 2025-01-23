import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Spark</h1>
      </div>
      <div className="auth-right">
        <h2>Hello Again!</h2>
        <p>Welcome Back</p>
        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
