import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Building, LogOut, ArrowLeft, CloudSync, Edit2, Save, X } from 'lucide-react';
import '../../assets/css/profile-page.css';
import GlobalFooter from '../../components/common/GlobalFooter';
import PublicHeader from '../../components/common/PublicHeader';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', username: '', organization: '', location: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();

  const handleSessionExpired = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    alert("Your session has expired. Please log in again.");
    navigate('/login');
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.status === 401) {
        return handleSessionExpired();
      }
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({ 
          name: data.name || '', 
          email: data.email || '', 
          phone: data.phone || '',
          username: data.username || '',
          organization: data.organization || '',
          location: data.location || ''
        });
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
      setFormData({ 
        name: data.name || '', 
        email: data.email || '', 
        phone: data.phone || '',
        username: data.username || '',
        organization: data.organization || '',
        location: data.location || ''
      });
      setError('You are offline. Showing cached profile data.');
    } else {
      const basicData = {
        name: localStorage.getItem('name') || 'User',
        role: localStorage.getItem('role') || 'farmer',
        email: '', phone: '', username: '', organization: '', location: ''
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
      if (response.status === 401) {
        return handleSessionExpired();
      }
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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    navigate('/login');
  };

  if (isLoading) return <div className="loading" style={{textAlign: 'center', marginTop: '100px'}}>Loading Profile...</div>;

  return (
    <div className="profile-page-root page-wrapper">
      <PublicHeader />

      <main className="profile-container">
        {error && <div style={{ background: '#fef2f2', color: '#991b1b', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        {message && <div style={{ background: '#ecfdf5', color: '#065f46', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{message}</div>}

        <section className="profile-card">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : <User size={40} />}
            </div>
            <h1 className="profile-username">{profile?.username || 'User'}</h1>
            <div className="profile-role-badge">{profile?.role || 'FARMER'}</div>
          </div>

          {!isEditing ? (
            <div className="profile-details">
              <div className="profile-info-row">
                <div className="profile-info-icon"><User size={20} /></div>
                <div className="profile-info-content">
                  <div className="profile-info-label">Full Name</div>
                  <div className="profile-info-value">{profile?.name || 'Not set'}</div>
                </div>
              </div>
              
              <div className="profile-info-row">
                <div className="profile-info-icon"><Mail size={20} /></div>
                <div className="profile-info-content">
                  <div className="profile-info-label">Email Address</div>
                  <div className="profile-info-value">{profile?.email || 'Not set'}</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon"><Phone size={20} /></div>
                <div className="profile-info-content">
                  <div className="profile-info-label">Phone Number</div>
                  <div className="profile-info-value">{profile?.phone || 'Not set'}</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon"><Building size={20} /></div>
                <div className="profile-info-content">
                  <div className="profile-info-label">Organization</div>
                  <div className="profile-info-value">{profile?.organization || 'Not set'}</div>
                </div>
              </div>

              <div className="profile-info-row">
                <div className="profile-info-icon"><MapPin size={20} /></div>
                <div className="profile-info-content">
                  <div className="profile-info-label">Location</div>
                  <div className="profile-info-value">{profile?.location || 'Not set'}</div>
                </div>
              </div>

              <button className="profile-btn-primary" onClick={() => setIsEditing(true)}>
                <Edit2 size={18} /> Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="profile-input-group">
                <label>Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="profile-input-group">
                <label>Username</label>
                <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              </div>
              
              <div className="profile-input-group">
                <label>Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="profile-input-group">
                <label>Phone Number</label>
                <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>

              <div className="profile-input-group">
                <label>Organization</label>
                <input type="text" value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} />
              </div>

              <div className="profile-input-group">
                <label>Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                <button type="submit" className="profile-btn-primary">
                  <Save size={18} /> Save
                </button>
                <button type="button" className="profile-btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="sync-card">
          <div className="sync-card-header">
            <CloudSync size={24} />
            <h2>Offline Sync</h2>
          </div>
          <p>
            Navya operates offline-first to save your data and battery. Your app automatically syncs with the cloud every 12 hours. You can force a manual sync if you currently have a stable internet connection.
          </p>
          <div className="sync-status-box">
            <div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>Last Synced</div>
              <div style={{ fontWeight: '600' }}>Just now</div>
            </div>
            <button 
              className="sync-btn"
              onClick={async (e) => {
                const btn = e.currentTarget;
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Syncing...';
                btn.disabled = true;
                
                try {
                  await fetch('http://localhost:5000/api/sync/manual', { method: 'POST' });
                  btn.innerHTML = 'Synced!';
                  btn.style.color = '#059669';
                } catch (err) {
                  btn.innerHTML = 'Failed';
                  btn.style.color = '#dc2626';
                }
                
                setTimeout(() => {
                  btn.innerHTML = originalText;
                  btn.style.color = '';
                  btn.disabled = false;
                }, 3000);
              }}
            >
              Sync Now
            </button>
          </div>
        </section>

        <button className="profile-btn-danger" onClick={handleLogout}>
          <LogOut size={18} /> Log Out
        </button>

      </main>
      <GlobalFooter />
    </div>
  );
};

export default ProfilePage;

