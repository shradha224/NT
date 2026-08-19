import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavyaLogo from '../common/NavyaLogo';
import ProfileDropdown from './ProfileDropdown';
// Using inline SVGs as present in the original HTML

const FarmerNavbar = () => {
  const location = useLocation();

  return (
    <header className="navbar">
      <Link to="/farmer/dashboard" style={{ textDecoration: 'none' }}>
        <NavyaLogo />
      </Link>

      <nav className="nav-links">
        <Link to="/farmer/dashboard" className={location.pathname === '/farmer/dashboard' ? 'active' : ''}>Dashboard</Link>
        <Link to="/farmer/scan-batch" className={location.pathname === '/farmer/scan-batch' ? 'active' : ''}>Scan Batch</Link>
        <Link to="/farmer/register-batch" className={location.pathname === '/farmer/register-batch' ? 'active' : ''}>Register Batch</Link>
      </nav>

      <ProfileDropdown />
    </header>
  );
};

export default FarmerNavbar;
