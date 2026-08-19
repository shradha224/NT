import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavyaLogo from '../common/NavyaLogo';
import ProfileDropdown from './ProfileDropdown';

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
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default AggregatorNavbar;
