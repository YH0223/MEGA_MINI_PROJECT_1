import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// 데이터 타입 정의
interface Post {
  id: number;
  title: string;
}

const App = () => {
  const [data, setData] = useState<Post[]>([]); // 타입 지정

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts") // 샘플 API
      .then((response) => {
        console.log("Data fetched:", response.data);
        setData(response.data); // 데이터 상태 업데이트
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      {/* 데이터가 제대로 불러와졌는지 확인 */}
      <div>
        <h1>Fetched Data</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.title}</li> // `id`와 `title` 사용
          ))}
        </ul>
      </div>
    </Router>
  );
};

export default App;
