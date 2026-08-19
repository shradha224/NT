import React from 'react';
import { Link } from 'react-router-dom';
import NavyaLogo from './NavyaLogo';
import '../../assets/css/layout.css';

const GlobalFooter = () => {
  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <NavyaLogo />
          </Link>
          <p>
            Intelligent Post-Harvest Analysis.<br/>
            Monitor produce conditions, predict spoilage risk, and make better decisions with AI.
          </p>
          
        </div>
        
        <div className="footer-links-group">
          <h4>Platform</h4>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        <div className="footer-links-group">
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <a href="#">Cookie Policy</a>
        </div>

        <div className="footer-links-group">
          <h4>Contact Us</h4>
          <a href="mailto:support@navya.com">support@navya.com</a>
          <a href="tel:+918001234567">+91 800-123-4567</a>
          <p style={{ color: '#a7f3d0', fontSize: '14px', marginTop: '10px' }}>
            Innovation Hub, <br/>
            ITER Bhubaneswar Odisha
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Navya AgriTech. All rights reserved.
      </div>
    </footer>
  );
};

export default GlobalFooter;


