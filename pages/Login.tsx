import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const dummyUsers = [
  { id: 1, email: "admin@example.com", password: "password123" },
  { id: 2, email: "user1@example.com", password: "testpassword" },
  { id: 3, email: "user2@example.com", password: "securepass" },
];

const Login = () => {
  // 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태
  const navigate = useNavigate(); 
  
  // 로그인 처리 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // 에러 초기화

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 성공 시 (HTTP 상태 코드 200)
        const data = await response.json();
        alert("로그인 성공: " + data.message);
        navigate("/dashboard"); // 로그인 성공 시 대시보드로 이동
      } else if (response.status === 400) {
        // 실패 시 (HTTP 상태 코드 400)
        const errorMessage = await response.text();
        setError(errorMessage || "이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        setError("서버에서 오류가 발생했습니다. 다시 시도하세요.");
      }
    } catch (err) {
      setError("네트워크 오류가 발생했습니다. 다시 시도하세요.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Spark</h1>
      </div>
      <div className="auth-right">
        <h2>Hello Again!</h2>
        <p>Welcome Back</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* 오류 메시지 출력 */}
        <Link to="/forgot-password">Forgot Password?</Link>
        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
