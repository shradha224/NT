import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/register.css';
// Note: assuming register-image.jpg is in public folder or assets.
// We'll use a relative path for now or require it if we move it to assets.
import registerImage from '../../assets/register-image.jpg';

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const startFingerprintScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setFingerprintRegistered(true);
    }, 2000);
  };

  const createAccount = () => {
    if (!fingerprintRegistered) {
      alert("Please register your fingerprint before creating your account.");
      return;
    }
    // TODO: get values and submit to backend
    console.log("Creating account for role:", selectedRole);
  };

  return (
    <>
      {/* Top-left NAVYA Logo */}
      <header className="site-header">
        <div className="brand">
          <div className="brand-icon">◆</div>
          <span>Navya</span>
        </div>
      </header>

      <main className="register-container">
        {/* LEFT IMAGE PANEL */}
        <section className="image-panel">
          <img src={registerImage} alt="Agricultural field" />
          <div className="image-overlay"></div>
          <div className="image-content">
            <h2>Navya</h2>
            <p>Cultivating trust and transparency in every harvest.</p>
          </div>
        </section>

        {/* RIGHT REGISTRATION PANEL */}
        <section className="form-panel">
          <div className="form-content">
            <h1>Create your Navya<br />account</h1>
            <p className="subtitle">Join our network of farmers and aggregators.</p>

            {/* ROLE */}
            <div className="form-section">
              <label className="section-label">I am a</label>
              <div className="role-options">
                <button
                  type="button"
                  className={`role-card ${selectedRole === 'farmer' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('farmer')}
                >
                  <div className="role-icon">🌿</div>
                  <span>Farmer</span>
                </button>
                <button
                  type="button"
                  className={`role-card ${selectedRole === 'aggregator' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('aggregator')}
                >
                  <div className="role-icon">▣</div>
                  <span>Aggregator</span>
                </button>
              </div>
            </div>

            {/* BASIC INFORMATION */}
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Jane Doe" />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            {/* ORGANIZATION */}
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="organization">
                  {selectedRole === 'farmer' ? 'Farm Name' : 'Organization Name'}
                </label>
                <input
                  type="text"
                  id="organization"
                  placeholder={selectedRole === 'farmer' ? 'Green Acres Farm' : 'Fresh Produce Aggregators'}
                />
              </div>
              <div className="input-group">
                <label htmlFor="location">Location</label>
                <input type="text" id="location" placeholder="City, Region" />
              </div>
            </div>

            {/* FINGERPRINT ENROLLMENT */}
            <div className="fingerprint-section">
              <div className="fingerprint-header">
                <div>
                  <h3>Fingerprint Authentication</h3>
                  <p>Register your fingerprint for secure authentication.</p>
                </div>
                <div className="fingerprint-icon">♢</div>
              </div>

              <div className={`fingerprint-box ${isScanning ? 'scanning' : ''} ${fingerprintRegistered ? 'registered' : ''}`}>
                <div className="fingerprint-symbol">
                  <span>◎</span>
                </div>
                <div className="fingerprint-text">
                  <strong>
                    {isScanning ? 'Scanning fingerprint...' : fingerprintRegistered ? 'Fingerprint registered' : 'Fingerprint not registered'}
                  </strong>
                  <span>
                    {isScanning ? 'Keep your finger on the sensor' : fingerprintRegistered ? 'Fingerprint captured successfully' : 'Place your finger on the sensor'}
                  </span>
                </div>
                <button
                  type="button"
                  className="scan-button"
                  onClick={startFingerprintScan}
                  disabled={isScanning || fingerprintRegistered}
                >
                  {isScanning ? 'Scanning...' : fingerprintRegistered ? 'Fingerprint Added' : 'Scan Fingerprint'}
                </button>
              </div>
              <p className="fingerprint-note">
                Your fingerprint will be securely linked to your Navya account and used for future login.
              </p>
            </div>

            {/* CREATE ACCOUNT */}
            <button
              type="button"
              className="create-button"
              onClick={createAccount}
            >
              Create Account
              <span>→</span>
            </button>

            {/* LOGIN */}
            <p className="login-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
