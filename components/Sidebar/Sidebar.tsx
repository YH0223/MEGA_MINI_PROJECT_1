import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h3> Dashboard <span className="from-spark">from Spark</span> </h3>
      <ul>
        <li>Dashboard</li>
        <li>Projects</li>
        <li>Team</li>
        <li>Calendar</li>
        <li>Promote</li>
        <li>Help</li>
      </ul>
    </div>
  );
};

export default Sidebar;