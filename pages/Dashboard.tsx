import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>from Spark</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li><Link to="/newproject">Projects</Link></li>
          <li>Team</li>
          <li><Link to="/calendar">Calendar</Link></li>
          <li>Promote</li>
          <li>Help</li>
        </ul>
        <div className="sidebar-footer">
          <button className="upgrade-button">Upgrade Spark Trial !!!</button>
          <div className="user-info">
            <img
              src="https://via.placeholder.com/40"
              alt="그림"
              style={{ borderRadius: "50%" }}
            />
             ID
             Project Spark
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Hello ID 👋</h1>
        </header>

        <section className="stats-container">
          <div className="stats-card">
            <h2>Team Members</h2>
            <p>34</p>
            <span className="percentage positive">↑ 16% this month</span>
          </div>
          <div className="stats-card">
            <h2>New Members</h2>
            <p>2</p>
            <span className="percentage negative">↓ 1% this month</span>
          </div>
          <div className="stats-card">
            <h2>Active Now</h2>
            <p>189</p>
          </div>
        </section>

        <section className="table-container">
          <div className="Search">
            <h3>All Projects</h3>
            <input type="text" placeholder="Search" />
          </div>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Project Manager</th>
                <th>Class</th>
                <th>Email</th>
                <th>Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JAVA SPRING</td>
                <td>Jane Doe</td>
                <td>Web Development</td>
                <td>janedoe@example.com</td>
                <td>Jan 2025 - Jun 2025</td>
                <td className="status-active">In Progress</td>
              </tr>
              {/* 다른 데이터 추가 */}
            </tbody>
          </table>
        </section>

        <div className="pagination">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>...</button>
          <button>40</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
