import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import TaskComponent from "./pages/Task";
import NoticeComponent from "./pages/NoticeComponent";
import NoticeDetail from "./pages/NoticeDetail";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Calendar from "./pages/Calendar";
import NewProject from "./pages/NewProject";

// Axios 기본 설정 (세션 유지)
axios.defaults.withCredentials = true;

// 🔥 전역 로그인 상태를 관리할 Context 생성
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// 🔥 로그인 여부에 따라 보호된 페이지를 가로채는 컴포넌트
const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
    const auth = useContext(AuthContext);
    return auth?.isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/session")
            .then(response => {
                console.log("✅ 로그인 유지됨. 사용자:", response.data);
                setIsAuthenticated(true);
            })
            .catch(() => {
                console.log("❌ 로그인 세션 없음");
                setIsAuthenticated(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Router>
                <Routes>
                    {/* 인증 관련 페이지 */}
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* 보호된 페이지: 로그인한 사용자만 접근 가능 */}
                    <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                    <Route path="/Project" element={<PrivateRoute element={<Project />} />} />
                    <Route path="/Calendar" element={<PrivateRoute element={<Calendar />} />} />
                    <Route path="/NewProject" element={<PrivateRoute element={<NewProject />} />} />

                    {/* 프로젝트 관련 페이지 */}
                    <Route path="/task/:projectId" element={<PrivateRoute element={<TaskPage />} />} />
                    <Route path="/notice/:projectId" element={<PrivateRoute element={<NoticePage />} />} />
                    <Route path="/notice/detail/:noticeId" element={<PrivateRoute element={<NoticeDetail />} />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

// 🔹 Task 페이지 (projectId를 URL에서 가져와서 전달)
const TaskPage = () => {
    const { projectId } = useParams<{ projectId?: string }>();
    const parsedProjectId = projectId ? parseInt(projectId, 10) : undefined;

    if (!parsedProjectId) return <p>잘못된 요청입니다.</p>;

    return <TaskComponent projectId={parsedProjectId} />;
};

// 🔹 Notice 페이지 (projectId를 URL에서 가져와서 전달)
const NoticePage = () => {
    const { projectId } = useParams<{ projectId?: string }>();
    const parsedProjectId = projectId ? parseInt(projectId, 10) : undefined;

    if (!parsedProjectId) return <p>잘못된 요청입니다.</p>;

    return <NoticeComponent projectId={parsedProjectId} />;
};

export default App;
