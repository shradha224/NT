import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';
import '../../assets/css/register.css';
import GlobalFooter from '../../components/common/GlobalFooter';
import PublicHeader from '../../components/common/PublicHeader';
import registerImage from '../../assets/register-image.jpg';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Form State
  const [role, setRole] = useState(null);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [location, setLocation] = useState('');
  
  // Security State
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [fingerprintRegistered, setFingerprintRegistered] = useState(false);
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => {
    setError('');
    if (step === 1 && !role) {
      setError("Please select a role to continue.");
      return;
    }
    if (step === 2 && (!fullName || !phone || !username || !email)) {
      setError("Name, Username, Email, and Phone Number are required.");
      return;
    }
    if (step === 3 && (!organization || !location)) {
      setError("Please fill in your details.");
      return;
    }
    if (step === 4 && (!password || password !== confirmPassword)) {
      setError("Please enter a valid matching password.");
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
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: username,
          email: email,
          phone: phone,
          password: password, 
          name: fullName,
          role: role.toUpperCase(),
          biometricId: fingerprintRegistered ? 'fp_' + phone : undefined,
          organization: organization,
          location: location
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Auto-login successful
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      
      setIsSuccess(true);
      setTimeout(() => {
        if (data.role === 'FARMER') {
          navigate('/farmer/dashboard');
        } else {
          navigate('/aggregator/dashboard');
        }
      }, 1500);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-page-root page-wrapper">
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
              <div className={`progress-line ${step >= 5 ? 'active' : ''}`}></div>
              <div className={`progress-step ${step >= 5 ? 'active' : ''}`}>5</div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {isSuccess ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px 0' }}>
                <div style={{ width: '64px', height: '64px', background: '#eaf5ec', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h2 style={{ fontSize: '24px', color: '#003f2d', marginBottom: '8px' }}>Account Created Successfully!</h2>
                <p style={{ color: '#555b57', fontSize: '15px' }}>Logging you into your dashboard...</p>
              </div>
            ) : (
              <>
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
                        <div className="role-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                          </svg>
                        </div>
                        <span>I am a Farmer</span>
                      </button>
                      <button
                        type="button"
                        className={`role-card giant-role-card ${role === 'aggregator' ? 'active' : ''}`}
                        onClick={() => setRole('aggregator')}
                      >
                        <div className="role-icon">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                          </svg>
                        </div>
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
                      <label htmlFor="username">Username</label>
                      <input className="giant-input" type="text" id="username" placeholder="Choose a unique username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    
                    <div className="input-group">
                      <label htmlFor="email">Email Address</label>
                      <input className="giant-input" type="email" id="email" placeholder="e.g. you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
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

                {/* STEP 4: SECURITY (PASSWORD) */}
                {step === 4 && (
                  <div className="wizard-step">
                    <h1>Create Password</h1>
                    <p className="subtitle">Secure your account</p>

                    <div className="password-setup">
                      <div className="input-group">
                        <label htmlFor="password">Create Password</label>
                        <input className="giant-input" type="password" id="password" placeholder="Minimum 6 characters" value={password} onChange={e => setPassword(e.target.value)} />
                      </div>
                      <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input className="giant-input" type="password" id="confirmPassword" placeholder="Type password again" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: FINGERPRINT (OPTIONAL) */}
                {step === 5 && (
                  <div className="wizard-step">
                    <h1>Setup Fingerprint</h1>
                    <p className="subtitle">For faster logins on the farm (Optional)</p>

                    <div className="fingerprint-setup text-center">
                      <div style={{ marginBottom: '10px', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        * Hardware Simulation Mode
                      </div>
                      <div className={`giant-fingerprint-box ${isScanning ? 'scanning' : ''} ${fingerprintRegistered ? 'success' : ''}`} onClick={startFingerprintScan}>
                        <span className="fp-icon">
                          <Fingerprint size={48} strokeWidth={1.5} />
                        </span>
                      </div>
                      <p className="fp-status-text" style={{ marginBottom: '20px' }}>
                        {isScanning ? 'Scanning...' : fingerprintRegistered ? 'Fingerprint Saved!' : 'Tap sensor to simulate register'}
                      </p>
                      
                      {!fingerprintRegistered && (
                        <button className="text-btn" onClick={createAccount} style={{ color: '#666', borderBottom: '1px solid #666' }}>
                          Skip for now, create my account
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* WIZARD CONTROLS */}
                <div className="wizard-controls">
                  {step > 1 ? (
                    <button className="wizard-btn back" onClick={prevStep}>Back</button>
                  ) : (
                    <div style={{width: '100px'}}></div> // Spacer
                  )}

                  {step < 5 ? (
                    <button className="wizard-btn next" onClick={nextStep}>Next →</button>
                  ) : (
                    <button 
                      className="wizard-btn create" 
                      onClick={createAccount}
                      style={{ backgroundColor: '#059669' }}
                    >
                      Create Account
                    </button>
                  )}
                </div>
              </>
            )}

            {step === 1 && (
              <p className="login-text" style={{textAlign: 'center', marginTop: '30px'}}>
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            )}

          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default RegisterPage;

