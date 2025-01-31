import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import ProjectCard from './components/ProjectCard/ProjectCard';
import './App.css';
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project"
import Calendar from "./pages/Calendar"
import NewProject from "./pages/NewProject"

// 데이터 타입 정의
interface Post {
  id: number;
  title: string;
}

const App = () => {
  const [data, setData] = useState<Post[]>([]);

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
        {/* 인증 관련 페이지 */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* 대시보드 페이지 */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Project" element={<Project />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/NewProject" element={<NewProject />} />
      </Routes>
    </Router>
  );
};

export default App;