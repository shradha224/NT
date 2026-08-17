import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavyaLogo from '../common/NavyaLogo';

const AggregatorNavbar = () => {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Logo */}
        <Link to="/aggregator/dashboard" className="brand" style={{ textDecoration: 'none' }}>
          <NavyaLogo />
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
