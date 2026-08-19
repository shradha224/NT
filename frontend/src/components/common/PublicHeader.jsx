import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavyaLogo from './NavyaLogo';
import { Home } from 'lucide-react';

const PublicHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '15px 30px', boxSizing: 'border-box', position: 'relative', top: 0, zIndex: 10 }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <NavyaLogo />
      </Link>
      
      <div>
        <button 
          onClick={() => navigate('/')} 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            background: '#eaf5ec', color: '#059669', 
            border: 'none', padding: '8px 16px', borderRadius: '20px', 
            fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' 
          }}
        >
          <Home size={16} /> Back to Home
        </button>
      </div>
    </header>
  );
};

export default PublicHeader;

