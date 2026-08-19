import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';
import '../../assets/css/login.css';
import GlobalFooter from '../../components/common/GlobalFooter';
import PublicHeader from '../../components/common/PublicHeader';
import NavyaLogo from '../../components/common/NavyaLogo';

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState(null); // 'fingerprint', 'phone', 'email'
  
  const [identifier, setIdentifier] = useState(''); // Stores phone or email depending on mode
  const [password, setPassword] = useState('');
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      
      if (data.role === 'FARMER') {
        navigate('/farmer/dashboard');
      } else if (data.role === 'AGGREGATOR') {
        navigate('/aggregator/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFingerprintLogin = () => {
    setIsScanning(true);
    setError('');
    
    // Simulate fingerprint login success after 2 seconds
    setTimeout(async () => {
      setIsScanning(false);
      setScanSuccess(true);
      
      try {
        // Mocking a successful fingerprint login for demo
        // In real life, you'd send a WebAuthn payload here
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'farmer1@navya.com', password: 'password123' }) // Mock user
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          navigate('/farmer/dashboard');
        } else {
          setScanSuccess(false);
          setError("Fingerprint not recognized.");
        }
      } catch (err) {
        setScanSuccess(false);
        setError("Network error during fingerprint scan.");
      }
    }, 2000);
  };

  // Render Method Selection
  if (loginMethod === null) {
    return (
      <div className="login-page-root page-wrapper">
        <PublicHeader />
        <main className="login-container">
          <div className="login-card selection-card">
            <div className="login-logo-box">
              <NavyaLogo />
            </div>
            <h1>Welcome Back</h1>
            <p className="subtitle">How would you like to sign in?</p>
            
            <div className="method-buttons">
              <button className="giant-method-btn primary" onClick={() => setLoginMethod('fingerprint')}>
                <span className="method-icon">
                  <Fingerprint size={28} />
                </span>
                <div className="method-text">
                  <h3>Fingerprint Scan</h3>
                  <p>Fastest and easiest</p>
                </div>
              </button>

              <button className="giant-method-btn secondary" onClick={() => setLoginMethod('phone')}>
                <span className="method-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </span>
                <div className="method-text">
                  <h3>Phone Number</h3>
                  <p>Sign in using your mobile</p>
                </div>
              </button>

              <button className="giant-method-btn alt" onClick={() => setLoginMethod('email')}>
                <span className="method-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <div className="method-text">
                  <h3>Username / Email</h3>
                  <p>Standard account login</p>
                </div>
              </button>
            </div>

            <div className="divider"></div>
            <div className="register-text">
              Don't have an account? <Link to="/register">Create one here</Link>
            </div>
          </div>
        </main>
        <GlobalFooter />
      </div>
    );
  }

  // Render Fingerprint Screen
  if (loginMethod === 'fingerprint') {
    return (
      <div className="login-page-root page-wrapper">
        <PublicHeader />
        <main className="login-container">
          <div className="login-card text-center">
            <button className="back-btn" onClick={() => setLoginMethod(null)}>← Go Back</button>
            <h1 style={{ marginTop: '20px' }}>Fingerprint Login</h1>
            <p className="subtitle">Place your finger on the sensor</p>
            
            {error && <div className="error-message">{error}</div>}

            <div style={{ marginBottom: '10px', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              * Hardware Simulation Mode
            </div>
            
            <div className={`giant-fingerprint-box ${isScanning ? 'scanning' : ''} ${scanSuccess ? 'success' : ''}`} onClick={handleFingerprintLogin}>
              <span className="fp-icon">
                <Fingerprint size={48} strokeWidth={1.5} />
              </span>
            </div>

            <p className="fp-status-text">
              {isScanning ? 'Scanning...' : scanSuccess ? 'Welcome back!' : 'Tap sensor to simulate login'}
            </p>
          </div>
        </main>
        <GlobalFooter />
      </div>
    );
  }

  // Render Form (Phone or Email)
  return (
    <div className="login-page-root page-wrapper">
      <PublicHeader />

      <main className="login-container">
        <div className="login-card">
          <button className="back-btn" onClick={() => { setLoginMethod(null); setError(''); }}>← Go Back</button>
          
          <h1 style={{ marginTop: '20px' }}>
            {loginMethod === 'phone' ? 'Phone Login' : 'Email Login'}
          </h1>
          <p className="subtitle">Enter your details below</p>

          {error && <div className="error-message">{error}</div>}

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="identifier">
                {loginMethod === 'phone' ? 'Mobile Number' : 'Email or Username'}
              </label>
              <div className="input-wrapper giant-input">
                <input
                  type={loginMethod === 'phone' ? 'tel' : 'text'}
                  id="identifier"
                  placeholder={loginMethod === 'phone' ? 'e.g. 9876543210' : 'Enter your email'}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  style={{ fontSize: '1.2rem', padding: '15px 20px' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper giant-input">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ fontSize: '1.2rem', padding: '15px 20px' }}
                />
              </div>
            </div>

            <button type="submit" className="login-button giant-submit">
              <span>Sign In</span>
            </button>
          </form>
        </div>
      </main>
        <GlobalFooter />
    </div>
  );
};

export default LoginPage;

