import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/login.css';
import NavyaLogo from '../../components/common/NavyaLogo';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
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

  return (
    <div className="login-page-root">
      {/* Top-left Navya Logo */}
      <header className="top-logo">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavyaLogo />
        </Link>
      </header>

      {/* Login Section */}
      <main className="login-container">
        <div className="login-card">
          {/* Small Logo */}
          <div className="login-logo-box">
            <NavyaLogo className="" />
          </div>

          {/* Heading */}
          <h1>Welcome to Navya</h1>
          <p className="subtitle">Sign in to your agricultural dashboard</p>

          {error && <div style={{ color: '#c72222', marginBottom: '1rem', textAlign: 'center', fontSize: '14px', fontWeight: '500' }}>{error}</div>}

          {/* Login Form */}
          <form className="login-form" onSubmit={handleLogin}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email / Phone</label>
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <svg
                  className="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="forgot-wrapper">
              <a href="#">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-button">
              <span>Login</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          {/* Divider */}
          <div className="divider"></div>

          {/* Register */}
          <div className="register-text">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>

        {/* Security Text */}
        <p className="security-text">
          Secure connection. Powered by Navya System.
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
