import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Nav.css';
const Nav = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">SM Dashboard</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/Post Scheduling">Post Scheduling</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
        <div className="profile-menu">
          <button className="profile-button" onClick={toggleProfile}>
            <img
              src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
              alt="Profile"
              className="profile-image"
            />
          </button>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <Link to="/profile" onClick={toggleProfile}>My Profile</Link>
             
              <div className="dropdown-divider"></div>
              <button className="logout-button">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
