import React from "react";
import "./Register.css"; // 스타일 분리

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Spark</h1>
      </div>
      <div className="auth-right">
        <h2>Hello!</h2>
        <p>Sign Up to Get Started</p>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
