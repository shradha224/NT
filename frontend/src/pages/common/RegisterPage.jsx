import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/register.css';
import NavyaLogo from '../../components/common/NavyaLogo';
// Note: assuming register-image.jpg is in public folder or assets.
// We'll use a relative path for now or require it if we move it to assets.
import registerImage from '../../assets/register-image.jpg';

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');

  const startFingerprintScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setFingerprintRegistered(true);
    }, 2000);
  };

  const createAccount = async () => {
    setError('');
    
    // In a real app, fingerprint would be enforced, but for dev we allow password fallback
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: `${fullName.replace(/\s+/g, '').toLowerCase()}@navya.com`, // mock email for dev
          password, 
          name: fullName,
          role: selectedRole.toUpperCase() 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Success
      alert('Account created successfully! You can now log in.');
      window.location.href = '/login';
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page-root">
      {/* Top-left NAVYA Logo */}
      <header className="site-header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavyaLogo />
        </Link>
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

            {error && <div style={{ color: '#c72222', marginBottom: '1rem', fontWeight: 'bold', fontSize: '14px' }}>{error}</div>}

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
                <input type="text" id="fullName" placeholder="Jane Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" placeholder="+91 XXXXX XXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
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
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="location">Location</label>
                <input type="text" id="location" placeholder="City, Region" value={location} onChange={e => setLocation(e.target.value)} />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
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
    </div>
  );
};

export default RegisterPage;
