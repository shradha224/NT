import React from 'react';

const NavyaLogo = ({ className = "logo" }) => {
  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#063b2c' }}>
      <svg
        className="logo-icon"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '28px', height: '28px', flexShrink: 0 }}
      >
        <path
          d="M16.2 25.8C16.2 18.7 18.8 11.9 25.6 7.1C27.2 12.7 25.7 18.3 21.4 22.2C19.7 23.8 17.9 24.9 16.2 25.8Z"
          fill="currentColor"
        />
        <path
          d="M15.2 25.8C14.7 19.5 11.1 14.4 5.2 11.5C4.3 17.4 6.8 22.4 11.4 24.5C12.7 25.1 14 25.5 15.2 25.8Z"
          fill="currentColor"
        />
        <path
          d="M15.7 26.5V17.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span style={{ fontSize: '22px', fontWeight: '700', letterSpacing: '-0.5px', color: '#063b2c' }}>Navya</span>
    </div>
  );
};

export default NavyaLogo;
