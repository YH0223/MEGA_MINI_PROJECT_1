import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header"> 
      <div className="header-controls">
        <button>Profile</button>
        <button>Notifications</button>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Header;