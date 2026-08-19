import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/profile-dropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const userName = localStorage.getItem('name') || 'User';
  const role = localStorage.getItem('role') || 'farmer';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <button 
        className="profile-btn" 
        aria-label="Profile"
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg viewBox="0 0 24 24" fill="none" width="32" height="32">
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
          <path d="M7.5 17.5C8.5 15.7 10 14.8 12 14.8C14 14.8 15.5 15.7 16.5 17.5"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {isOpen && (
        <div className="profile-dropdown-menu">
          <div className="dropdown-header">
            <strong>{userName}</strong>
            <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
          </div>
          <div className="dropdown-divider"></div>
          <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
            <span className="dropdown-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </span>
            My Profile & Sync
          </Link>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item logout-btn" onClick={handleLogout}>
            <span className="dropdown-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </span>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
