// src/pages/ForgotPassword.tsx
import React from "react";

const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Spark</h1>
      </div>
      <div className="auth-right">
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password</p>
        <form>
          <input type="email" placeholder="Email Address" />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
