import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Project from "./Project"; // ✅ Project.tsx 가져오기
import "./Dashboard.css";
import NewProject from "./NewProject"; // ✅ New Project 페이지 컴포넌트
import Profile from "./Profile"; // ✅ Profile 페이지 컴포넌트
import Calendar from "./Calendar"; // ✅ Calendar 페이지 컴포넌트
import Settings from "./Settings"; // ✅ Settings 페이지 컴포넌트

// ✅ 프로젝트 데이터 타입 정의
interface Project {
  projectId: number;
  projectName: string;
  projectManager: string;
  startdate: string;
  deadline: string;
}

interface Invitation {
  invitationId: number;
  projectId: number;
  inviterId: string;
  inviteeId: string;
  status: string;
}
interface ProjectStatus {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
}
interface TaskProgress {
  percentage: number;
}

interface UserProfile {
  userName: string;
  img_url: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]); // ✅ 프로젝트 배열로 수정
  const [taskProgress, setTaskProgress] = useState<{ [key: number]: TaskProgress }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); // ✅ 올바른 타입 적용
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // ✅ 선택한 프로젝트 ID
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("dashboard"); // ✅ 활성화된 탭 관리

  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [showInvitationDropdown, setShowInvitationDropdown] = useState(false);


  const [status, setStatus] = useState<ProjectStatus>({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0});
  const [activeFilter, setActiveFilter] = useState<string>("all"); // ✅ 필터 상태 추가
  useEffect(() => {
    fetchUserProfile();
    fetchProjects();
    fetchInvitations();
  }, []);

  const fetchInvitations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/invitations", {
        withCredentials: true,
      });
      setInvitations(response.data);
    } catch (error) {
      console.error("🚨 초대 목록 불러오기 오류:", error);
    }
  };


  const declineInvitation = async (invitationId: number) => {
    try {
      await axios.put(
          `http://localhost:8080/api/invite/${invitationId}/decline`,
          {},
          { withCredentials: true }
      );
      alert("✅ 초대를 거절했습니다!");
      setInvitations(invitations.filter((inv) => inv.invitationId !== invitationId));
    } catch (error) {
      console.error("❌ 초대 거절 오류:", error);
      alert("초대 거절 중 오류가 발생했습니다.");
    }
  };

  const acceptInvitation = async (invitationId: number) => {
    try {
      await axios.put(
          `http://localhost:8080/api/invite/${invitationId}/accept`,
          {},
          { withCredentials: true }
      );
      alert("✅ 초대를 수락했습니다!");
      setInvitations(invitations.filter((inv) => inv.invitationId !== invitationId));
    } catch (error) {
      console.error("❌ 초대 수락 오류:", error);
      alert("초대 수락 중 오류가 발생했습니다.");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user/profile", { withCredentials: true });
      setUserProfile(response.data);
    } catch (error) {
      console.error("🚨 사용자 프로필 불러오기 오류:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user", { withCredentials: true });
      setProjects(response.data); // ✅ response.data가 Project[]이므로 직접 할당
      response.data.forEach((project: Project) => {
        fetchTaskProgress(project.projectId);
      });
    } catch (error) {
      console.error("🚨 프로젝트 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const fetchTaskProgress = async (projectId: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/task/progress/${projectId}`, { withCredentials: true });

      if (typeof response.data.percentage === "number") {
        setTaskProgress(prev => ({
          ...prev,
          [projectId]: response.data.percentage
        }));
      } else {
        setTaskProgress(prev => ({ ...prev, [projectId]: 0 }));
      }
    } catch (error) {
      console.error(`🚨 프로젝트 ${projectId}의 Task 진행률을 불러오는 중 오류 발생:`, error);
      setTaskProgress(prev => ({ ...prev, [projectId]: 0 }));
    }
  };

  const getStatusColor = (percentage: number) => {
    if (percentage < 33) return "#f44b42";
    if (percentage < 66) return "#f6d122";
    if (percentage < 99) return "#3ef141";
    return "#5395f3";
  };

  useEffect(() => {
    setFilteredProjects(
        projects.filter((project) => {
          const progress = taskProgress[project.projectId] ?? 0;

          // ✅ 상태(activeFilter)에 따른 필터링 적용
          if (activeFilter === "inProgress" && progress === 100) return false;
          if (activeFilter === "completed" && progress < 100) return false;

          // ✅ 검색어 필터 적용
          return project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
        })
    );
  }, [searchTerm, projects, activeFilter, taskProgress]); // ✅ activeFilter, taskProgress 추가


  useEffect(() => {
    fetchUserProfile();
    fetchProjects();
    axios.get("http://localhost:8080/api/projects/status", { withCredentials: true })
        .then(response => {
          console.log("📊 프로젝트 상태 데이터:", response.data);
          setStatus(response.data);
        })
        .catch(error => {
          console.error("🚨 프로젝트 상태 데이터를 불러오는 중 오류 발생:", error);
        });
  }, []);
  /** ✅ 모달 닫기 함수 */
  const closeModal = () => setActiveModal(null);

  /** ✅ 프로젝트 클릭 시 세션 유지한 채로 표시 */
  const handleProjectClick = (projectId: number) => {
    console.log("🔍 선택한 프로젝트 ID:", projectId);
    setSelectedProjectId(projectId);
  };
  /** ✅ Calendar에서 클릭한 프로젝트를 `table-container`에 추가 */
  const handleProjectSelectFromCalendar = (projectId: number) => {
    console.log("📌 캘린더에서 선택된 프로젝트 ID:", projectId);
    setSelectedProjectId(projectId);
    setActiveModal(null); // ✅ 모달 닫기
  };
  const handleProjectCreated = () => {
    console.log("📌 새 프로젝트가 생성되었습니다.");
    setActiveModal(null); // ✅ 모달 닫기
    fetchProjects(); // ✅ 새 프로젝트 추가 후 목록 새로고침
  };

  return (
      <div className="dashboard-container">
        {/* ✅ 유저 프로필 추가 */}
        <nav className="sidebar">
          <div className="user-profile">
            {userProfile && (
                <>
                  <img
                      src={userProfile?.img_url || "/default_profile.png"}
                      alt="Profile"
                      className="user-avatar"
                      onClick={() => setActiveModal("profile")}
                  />
                  <span className="user-name">{userProfile.userName}</span>
                </>
            )}
          </div>
          <h2>from Spark</h2>
          <ul>
            <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
              Dashboard
            </li>
            <li className={activeTab === "newProject" ? "active" : ""} onClick={() => setActiveModal("newProject")}>
              New Project
            </li>
            <li className={activeTab === "calendar" ? "active" : ""} onClick={() => setActiveModal("calendar")}>
              Calendar
            </li>
            <li className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveModal("settings")}>
              Settings
            </li>
          </ul>
        </nav>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <h1>Hello {userProfile ? userProfile.userName : "Guest"} 👋</h1>
            {/* 🔔 초대 알림 버튼 */}
            <div className="notification-icon" onClick={() => setShowInvitationDropdown(!showInvitationDropdown)}>
              🔔 {invitations.length > 0 && <span className="badge">{invitations.length}</span>}
            </div>
            {/* 초대 드롭다운 메뉴 */}
            {showInvitationDropdown && (
                <div className="invitation-dropdown">
                  <h3>초대 목록</h3>
                  {invitations.length === 0 ? (
                      <p>현재 초대가 없습니다.</p>
                  ) : (
                      <ul>
                        {invitations.map((invitation) => (
                            <li key={invitation.invitationId}>
                              <p>프로젝트 ID: {invitation.projectId}</p>
                              <p>초대자: {invitation.inviterId}</p>
                              <button onClick={() => acceptInvitation(invitation.invitationId)}>수락</button>
                              <button onClick={() => declineInvitation(invitation.invitationId)}>
                                거절
                              </button>
                            </li>
                        ))}
                      </ul>
                  )}
                </div>
            )}
          </header>
          {/* ✅ 프로젝트 개수 통계 추가 */}

          <div className="stats-container">
            <div
                className={`stats-card total ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
            >
              <h2>📊 전체 프로젝트</h2>
              <p>{status.totalProjects} 개</p>
            </div>

            <div
                className={`stats-card in-progress ${activeFilter === "inProgress" ? "active" : ""}`}
                onClick={() => setActiveFilter("inProgress")}
            >
              <h2>🚀 진행 중</h2>
              <p>{status.inProgressProjects} 개</p>
            </div>

            <div
                className={`stats-card completed ${activeFilter === "completed" ? "active" : ""}`}
                onClick={() => setActiveFilter("completed")}
            >
              <h2>✅ 완료</h2>
              <p>{status.completedProjects} 개</p>
            </div>
          </div>

          <section className="table-container">

            {selectedProjectId ? (
                <>
                  <button className="back-button" onClick={() => setSelectedProjectId(null)}>
                    🔙 Back to Projects
                  </button>
                  <Project projectId={selectedProjectId} />
                </>
            ) : (
                <>
                  <h3>All Projects</h3>
                  <table>
                    <thead>
                    <tr>
                      <th>Project</th>
                      <th>Project Manager</th>
                      <th>Start Date</th>
                      <th>Deadline</th>
                      <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProjects.map((project) => {
                      const completion = taskProgress[project.projectId] ?? 0;
                      const statusColor = getStatusColor(completion);

                      return (
                          <tr key={project.projectId} onClick={() => handleProjectClick(project.projectId)} className="clickable-row">
                            <td>{project.projectName}</td>
                            <td>{project.projectManager}</td>
                            <td>{new Date(project.startdate).toLocaleDateString()}</td>
                            <td>{new Date(project.deadline).toLocaleDateString()}</td>
                            <td>
                              <div className="progress-bar-container">
                                <span className="progress-text">{completion.toFixed(0)}%</span>
                                <div className="progress-bar" style={{ width: `${completion}%`, backgroundColor: statusColor }} />
                              </div>
                            </td>
                          </tr>
                      );
                    })}
                    </tbody>
                  </table>
                </>
            )}
          </section>
        </main>

        {activeModal && (
            <div className="modal-overlay" onClick={closeModal}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={closeModal}>&times;</span>
                {activeModal === "newProject" && <NewProject onProjectCreated={handleProjectCreated} />} {/* ✅ 함수 전달 */}
                {activeModal === "profile" && <Profile />}
                {activeModal === "calendar" && <Calendar onProjectSelect={handleProjectSelectFromCalendar} />}
                {activeModal === "settings" && <Settings />}
              </div>
            </div>
        )}
      </div>
  );
};

export default Dashboard;
