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
          <div className="footer-social">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
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
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>

        <div className="footer-links-group">
          <h4>Contact Us</h4>
          <a href="mailto:support@navya.com">support@navya.com</a>
          <a href="tel:+918001234567">+91 800-123-4567</a>
          <p style={{ color: '#a7f3d0', fontSize: '14px', marginTop: '10px' }}>
            Innovation Hub, <br/>
            New Delhi, India
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
