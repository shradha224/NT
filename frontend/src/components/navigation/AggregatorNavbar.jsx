import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AggregatorNavbar = () => {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/aggregator/dashboard" className="brand">
          <span className="brand-icon">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 4C10.2 7.2 7.3 11.7 7.3 16.5C7.3 21.7 11.1 25.5 16 28C20.9 25.5 24.7 21.7 24.7 16.5C24.7 11.7 21.8 7.2 16 4Z" fill="currentColor"/>
              <path d="M16 10C13.8 13.2 12.9 16.2 13.2 19.1C13.5 22.2 15 24.6 16 26" fill="none" stroke="#f7f5ef" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          <span>Navya</span>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/aggregator/dashboard" className={location.pathname === '/aggregator/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/aggregator/scan-batch" className={location.pathname === '/aggregator/scan-batch' ? 'active' : ''}>Scan Batch</Link>
          <Link to="/aggregator/batch-assessment/TOM-024" className={location.pathname.includes('/batch-assessment') ? 'active' : ''}>Batch Assessment</Link>
        </nav>

        {/* Profile */}
        <button className="profile-button" aria-label="Profile">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9.5"></circle>
            <circle cx="12" cy="9" r="3"></circle>
            <path d="M6.8 18c1.4-2.2 3.2-3.3 5.2-3.3s3.8 1.1 5.2 3.3"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default AggregatorNavbar;
