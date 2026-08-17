import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/login.css';

const LoginPage = () => {
  return (
    <>
      {/* Top-left Navya Logo */}
      <header className="top-logo">
        <div className="navya-logo">
          <div className="leaf-logo">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Navya</span>
        </div>
      </header>

      {/* Login Section */}
      <main className="login-container">
        <div className="login-card">
          {/* Small Logo */}
          <div className="login-logo-box">
            <div className="leaf-logo small">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          {/* Heading */}
          <h1>Welcome to Navya</h1>
          <p className="subtitle">Sign in to your agricultural dashboard</p>

          {/* Login Form */}
          <form className="login-form">
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
    </>
  );
};

export default LoginPage;
