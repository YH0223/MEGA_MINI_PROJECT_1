import React from "react";
import "./Dashboard.css"; // Dashboard 스타일 분리

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>DashStack</h2>
        <ul>
          <li>Dashboard</li>
          <li>Products</li>
          <li>Favorites</li>
          <li>Inbox</li>
        </ul>
      </nav>
      <main className="dashboard-main">
        <header>
          <h1>Dashboard</h1>
        </header>
        <section>
          <div>Total Users: 40,689</div>
          <div>Total Sales: $89,000</div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
