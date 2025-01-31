import React, { useState } from "react";
import "./NewProject.css";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [period, setPeriod] = useState("");
  const [status, setStatus] = useState("Active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      projectName,
      projectManager,
      category,
      email,
      period,
      status,
    };
    console.log("새 프로젝트 생성:", newProject);
    alert("프로젝트가 생성되었습니다!");
    // 필요한 경우 여기에서 API 요청을 추가할 수 있음
  };

  return (
    <div className="new-project-container">
      <h2>새 프로젝트 만들기</h2>
      <form onSubmit={handleSubmit} className="new-project-form">
        <label>
          프로젝트 이름:
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </label>

        <label>
          프로젝트 관리자:
          <input
            type="text"
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
            required
          />
        </label>

        <label>
          분류:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>

        <label>
          이메일:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          기간:
          <input
            type="text"
            placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            required
          />
        </label>

        <label>
          상태:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

        <button type="submit" className="create-button">프로젝트 생성</button>
      </form>
    </div>
  );
};

export default NewProject;