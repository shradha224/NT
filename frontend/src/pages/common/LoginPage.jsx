import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
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
      <div className="login-page-root">
        <header className="top-logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <NavyaLogo />
          </Link>
        </header>
        <main className="login-container">
          <div className="login-card selection-card">
            <div className="login-logo-box">
              <NavyaLogo />
            </div>
            <h1>Welcome Back</h1>
            <p className="subtitle">How would you like to sign in?</p>
            
            <div className="method-buttons">
              <button className="giant-method-btn primary" onClick={() => setLoginMethod('fingerprint')}>
                <span className="method-icon">👆</span>
                <div className="method-text">
                  <h3>Fingerprint Scan</h3>
                  <p>Fastest and easiest</p>
                </div>
              </button>

              <button className="giant-method-btn secondary" onClick={() => setLoginMethod('phone')}>
                <span className="method-icon">📱</span>
                <div className="method-text">
                  <h3>Phone Number</h3>
                  <p>Sign in using your mobile</p>
                </div>
              </button>

              <button className="giant-method-btn alt" onClick={() => setLoginMethod('email')}>
                <span className="method-icon">📧</span>
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
      </div>
    );
  }

  // Render Fingerprint Screen
  if (loginMethod === 'fingerprint') {
    return (
      <div className="login-page-root">
        <header className="top-logo">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <NavyaLogo />
          </Link>
        </header>
        <main className="login-container">
          <div className="login-card text-center">
            <button className="back-btn" onClick={() => setLoginMethod(null)}>← Go Back</button>
            <h1 style={{ marginTop: '20px' }}>Fingerprint Login</h1>
            <p className="subtitle">Place your finger on the sensor</p>
            
            {error && <div className="error-message">{error}</div>}

            <div className={`giant-fingerprint-box ${isScanning ? 'scanning' : ''} ${scanSuccess ? 'success' : ''}`} onClick={handleFingerprintLogin}>
              <span className="fp-icon">◎</span>
            </div>

            <p className="fp-status-text">
              {isScanning ? 'Scanning...' : scanSuccess ? 'Welcome back!' : 'Tap sensor to scan'}
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Render Form (Phone or Email)
  return (
    <div className="login-page-root">
      <header className="top-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavyaLogo />
        </Link>
      </header>

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
    </div>
  );
};

export default LoginPage;
