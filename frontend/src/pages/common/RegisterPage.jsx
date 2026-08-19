import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/register.css';
import NavyaLogo from '../../components/common/NavyaLogo';
import registerImage from '../../assets/register-image.jpg';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Form State
  const [role, setRole] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  
  // Security State
  const [securityMethod, setSecurityMethod] = useState(null); // 'fingerprint' or 'password'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);
  
  const [error, setError] = useState('');

  const nextStep = () => {
    setError('');
    if (step === 1 && !role) {
      setError("Please select a role to continue.");
      return;
    }
    if (step === 2 && (!fullName || !phone)) {
      setError("Name and Phone Number are required.");
      return;
    }
    if (step === 3 && (!organization || !location)) {
      setError("Please fill in your details.");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const startFingerprintScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setFingerprintRegistered(true);
    }, 2000);
  };

  const createAccount = async () => {
    setError('');
    
    if (securityMethod === 'password' && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (securityMethod === 'fingerprint' && !fingerprintRegistered) {
      setError("Please scan your fingerprint first.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: phone, // Use phone as username for simplicity
          email: `${phone}@navya.com`, // Mock email
          password: securityMethod === 'password' ? password : 'fp_' + phone, 
          name: fullName,
          role: role.toUpperCase() 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      alert('Account created successfully! You can now log in.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page-root">
      <header className="site-header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavyaLogo />
        </Link>
      </header>

      <main className="register-container">
        <section className="image-panel">
          <img src={registerImage} alt="Agricultural field" />
          <div className="image-overlay"></div>
          <div className="image-content">
            <h2>Navya</h2>
            <p>Cultivating trust and transparency in every harvest.</p>
          </div>
        </section>

        <section className="form-panel">
          <div className="form-content wizard-container">
            
            {/* Progress Bar */}
            <div className="wizard-progress">
              <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
              <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
              <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>
              <div className={`progress-line ${step >= 4 ? 'active' : ''}`}></div>
              <div className={`progress-step ${step >= 4 ? 'active' : ''}`}>4</div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* STEP 1: ROLE */}
            {step === 1 && (
              <div className="wizard-step">
                <h1>Who are you?</h1>
                <p className="subtitle">Select your role to get started</p>
                
                <div className="role-options giant-options">
                  <button
                    type="button"
                    className={`role-card giant-role-card ${role === 'farmer' ? 'active' : ''}`}
                    onClick={() => setRole('farmer')}
                  >
                    <div className="role-icon">🌿</div>
                    <span>I am a Farmer</span>
                  </button>
                  <button
                    type="button"
                    className={`role-card giant-role-card ${role === 'aggregator' ? 'active' : ''}`}
                    onClick={() => setRole('aggregator')}
                  >
                    <div className="role-icon">▣</div>
                    <span>I am an Aggregator</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: BASIC INFO */}
            {step === 2 && (
              <div className="wizard-step">
                <h1>Basic Information</h1>
                <p className="subtitle">How should we contact you?</p>

                <div className="input-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input className="giant-input" type="text" id="fullName" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                
                <div className="input-group">
                  <label htmlFor="phone">Mobile Number</label>
                  <input className="giant-input" type="tel" id="phone" placeholder="e.g. 9876543210" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
            )}

            {/* STEP 3: FARM/ORG INFO */}
            {step === 3 && (
              <div className="wizard-step">
                <h1>{role === 'farmer' ? 'Farm Details' : 'Organization Details'}</h1>
                <p className="subtitle">Where do you work?</p>

                <div className="input-group">
                  <label htmlFor="organization">
                    {role === 'farmer' ? 'Farm Name' : 'Organization Name'}
                  </label>
                  <input className="giant-input" type="text" id="organization" placeholder={role === 'farmer' ? 'e.g. Green Acres' : 'e.g. Fresh Produce Inc'} value={organization} onChange={e => setOrganization(e.target.value)} />
                </div>
                
                <div className="input-group">
                  <label htmlFor="location">Village / City Location</label>
                  <input className="giant-input" type="text" id="location" placeholder="e.g. Punjab" value={location} onChange={e => setLocation(e.target.value)} />
                </div>
              </div>
            )}

            {/* STEP 4: SECURITY */}
            {step === 4 && (
              <div className="wizard-step">
                <h1>Secure your account</h1>
                <p className="subtitle">Choose how you want to log in</p>

                {!securityMethod ? (
                  <div className="security-options">
                    <button className="giant-method-btn primary" onClick={() => setSecurityMethod('fingerprint')}>
                      <span className="method-icon">👆</span>
                      <div className="method-text">
                        <h3>Use Fingerprint</h3>
                        <p>Recommended for Farmers</p>
                      </div>
                    </button>
                    <button className="giant-method-btn alt" onClick={() => setSecurityMethod('password')}>
                      <span className="method-icon">🔑</span>
                      <div className="method-text">
                        <h3>Use Password</h3>
                        <p>Traditional login</p>
                      </div>
                    </button>
                  </div>
                ) : securityMethod === 'fingerprint' ? (
                  <div className="fingerprint-setup text-center">
                    <div className={`giant-fingerprint-box ${isScanning ? 'scanning' : ''} ${fingerprintRegistered ? 'success' : ''}`} onClick={startFingerprintScan}>
                      <span className="fp-icon">◎</span>
                    </div>
                    <p className="fp-status-text">
                      {isScanning ? 'Scanning...' : fingerprintRegistered ? 'Fingerprint Saved!' : 'Tap sensor to register fingerprint'}
                    </p>
                    <button className="text-btn" onClick={() => setSecurityMethod(null)}>Choose another method</button>
                  </div>
                ) : (
                  <div className="password-setup">
                    <div className="input-group">
                      <label htmlFor="password">Create Password</label>
                      <input className="giant-input" type="password" id="password" placeholder="Minimum 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="input-group">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input className="giant-input" type="password" id="confirmPassword" placeholder="Type password again" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                    <button className="text-btn" onClick={() => setSecurityMethod(null)}>Choose another method</button>
                  </div>
                )}
              </div>
            )}

            {/* WIZARD CONTROLS */}
            <div className="wizard-controls">
              {step > 1 ? (
                <button className="wizard-btn back" onClick={prevStep}>Back</button>
              ) : (
                <div style={{width: '100px'}}></div> // Spacer
              )}

              {step < 4 ? (
                <button className="wizard-btn next" onClick={nextStep}>Next →</button>
              ) : (
                <button 
                  className="wizard-btn create" 
                  onClick={createAccount}
                  disabled={securityMethod === 'fingerprint' && !fingerprintRegistered}
                >
                  Create Account
                </button>
              )}
            </div>

            {step === 1 && (
              <p className="login-text" style={{textAlign: 'center', marginTop: '30px'}}>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            )}

          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;
