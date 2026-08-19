import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({ name: data.name || '', email: data.email || '', phone: data.phone || '' });
        localStorage.setItem('cachedProfile', JSON.stringify(data));
      } else {
        loadOfflineProfile();
      }
    } catch (err) {
      loadOfflineProfile();
    } finally {
      setIsLoading(false);
    }
  };

  const loadOfflineProfile = () => {
    const cached = localStorage.getItem('cachedProfile');
    if (cached) {
      const data = JSON.parse(cached);
      setProfile(data);
      setFormData({ name: data.name || '', email: data.email || '', phone: data.phone || '' });
      setError('You are offline. Showing cached profile data.');
    } else {
      // Create a basic profile from login data
      const basicData = {
        name: localStorage.getItem('name') || 'User',
        role: localStorage.getItem('role') || 'farmer',
        email: '',
        phone: ''
      };
      setProfile(basicData);
      setFormData(basicData);
      setError('You are offline. Some details may not be available.');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        localStorage.setItem('cachedProfile', JSON.stringify(updated));
        localStorage.setItem('name', updated.name); // update top level name too
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        setError('');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Cannot update profile while offline.');
    }
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    
    // Redirect to login
    navigate('/login');
  };

  if (isLoading) return <div className="loading">Loading Profile...</div>;

  return (
    <div className="container" style={{ paddingBottom: '100px' }}>
      <header className="page-header" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginRight: '1rem' }}>
          &larr; Back
        </button>
        <h1>My Profile</h1>
      </header>

      {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {message && <div className="success-message" style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>}

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#4caf50', 
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', fontWeight: 'bold', margin: '0 auto 1rem auto'
          }}>
            {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 style={{ margin: 0 }}>{profile?.username}</h2>
          <p style={{ color: '#666', margin: '5px 0' }}>Role: <strong>{profile?.role}</strong></p>
        </div>

        {!isEditing ? (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem' }}>Full Name</label>
              <div style={{ fontSize: '1.2rem', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>{profile?.name || 'Not set'}</div>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem' }}>Email</label>
              <div style={{ fontSize: '1.2rem', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>{profile?.email || 'Not set'}</div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', color: '#666', marginBottom: '0.5rem' }}>Phone Number</label>
              <div style={{ fontSize: '1.2rem', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>{profile?.phone || 'Not set'}</div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginBottom: '1rem' }}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                style={{ padding: '15px', fontSize: '1.1rem', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Email</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                style={{ padding: '15px', fontSize: '1.1rem', width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label>Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
                style={{ padding: '15px', fontSize: '1.1rem', width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '15px', fontSize: '1.1rem' }}>
                Save Changes
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '15px', fontSize: '1.1rem' }}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* OFFLINE & CLOUD SYNC CARD */}
      <div className="card" style={{ padding: '2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#003c2c' }}>Offline Sync</h2>
        </div>
        <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.5' }}>
          Navya operates offline-first to save your data and battery. Your app automatically syncs with the cloud every 12 hours. You can force a manual sync if you currently have a stable internet connection.
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
          <div>
            <div style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '4px' }}>Last Synced</div>
            <div style={{ fontWeight: '600', color: '#212529' }}>Just now</div>
          </div>
          <button 
            onClick={async () => {
              try {
                const btn = document.getElementById('sync-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Syncing... ↻';
                btn.disabled = true;
                
                await fetch('http://localhost:5000/api/sync/manual', { method: 'POST' });
                
                btn.innerHTML = 'Synced! ✓';
                btn.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                  btn.innerHTML = originalText;
                  btn.style.backgroundColor = '';
                  btn.disabled = false;
                }, 3000);
              } catch (e) {
                console.error(e);
              }
            }}
            id="sync-btn"
            style={{
              padding: '10px 20px',
              backgroundColor: '#003c2c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Sync Now
          </button>
        </div>
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <button 
          onClick={handleLogout}
          style={{ 
            backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '8px',
            padding: '15px 30px', fontSize: '1.2rem', fontWeight: 'bold', width: '100%',
            cursor: 'pointer', boxShadow: '0 4px 6px rgba(255, 77, 77, 0.2)'
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
