import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Using inline SVGs as present in the original HTML

const FarmerNavbar = () => {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="logo">
        <div className="logo-mark">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="logo-text">Navya</span>
      </div>

      <nav className="nav-links">
        <Link to="/farmer/dashboard" className={location.pathname === '/farmer/dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to="/farmer/scan-batch" className={location.pathname === '/farmer/scan-batch' ? 'active' : ''}>Scan Batch</Link>
        <Link to="/farmer/register-batch" className={location.pathname === '/farmer/register-batch' ? 'active' : ''}>Register Batch</Link>
      </nav>

      <button className="profile-btn" aria-label="Profile">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <path d="M7.5 17.5C8.5 15.7 10 14.8 12 14.8C14 14.8 15.5 15.7 16.5 17.5"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </header>
  );
};

export default FarmerNavbar;
