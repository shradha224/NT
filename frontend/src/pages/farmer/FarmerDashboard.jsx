import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import '../../assets/css/farmer-dashboard.css';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name') || 'Farmer';
  
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSessionExpired = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    alert("Your session has expired. Please log in again.");
    navigate('/login');
  };

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/farmers/batches', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (response.status === 401) {
          return handleSessionExpired();
        }
        if (response.ok) {
          const data = await response.json();
          setBatches(data.batches || []);
        }
      } catch (err) {
        console.error("Failed to fetch batches:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBatches();
  }, []);

  return (
    <div className="farmer-dashboard-root">
      <FarmerNavbar />
      <main className="dashboard">
        <section className="welcome-section">
          <h1>Welcome, {userName}</h1>
          <p>
            Register a new produce batch or scan a batch to view its latest assessment.
          </p>
        </section>

        <section className="action-grid">
          {/* Register Batch */}
          <button className="action-card" onClick={() => navigate('/farmer/register-batch')}>
            <div className="action-icon plus-icon">
              <span></span>
              <span></span>
            </div>
            <h2>Register New Batch</h2>
            <p>
              Log new harvest details into the Navya system.
            </p>
          </button>

          {/* Scan Batch */}
          <button className="action-card" onClick={() => navigate('/farmer/scan-batch')}>
            <div className="action-icon qr-icon">
              <div className="qr-pattern">
                <span className="corner top-left"></span>
                <span className="corner top-right"></span>
                <span className="corner bottom-left"></span>
                <span className="qr-square square-one"></span>
                <span className="qr-square square-two"></span>
                <span className="qr-square square-three"></span>
                <span className="qr-dot"></span>
              </div>
            </div>
            <h2>Scan Batch</h2>
            <p>
              Scan a QR code to view real-time assessment data.
            </p>
          </button>
        </section>

        <section className="recent-batches-section" style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#003c2c' }}>Recent Batches</h2>
          {isLoading ? (
            <p>Loading batches...</p>
          ) : batches.length === 0 ? (
            <div className="empty-state" style={{ 
              textAlign: 'center', 
              padding: '3rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '12px',
              border: '2px dashed #ccc'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                </svg>
              </div>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>You haven't registered any crops yet!</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>Start tracking your harvest to build trust with buyers.</p>
              <button 
                onClick={() => navigate('/farmer/register-batch')}
                style={{ 
                  backgroundColor: '#059669', color: 'white', border: 'none', 
                  padding: '12px 24px', borderRadius: '8px', fontSize: '1.1rem',
                  cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                + Register First Batch
              </button>
            </div>
          ) : (
            <div className="batches-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {batches.slice(0, 5).map(batch => (
                <div key={batch._id} style={{ 
                  padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px', 
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', borderLeft: '4px solid #059669'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{batch.produceType} - {batch.variety}</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      ID: {batch.batchId} | Date: {new Date(batch.harvestDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ 
                    backgroundColor: '#e6f4ea', color: '#137333', padding: '5px 12px', 
                    borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' 
                  }}>
                    {batch.quantity} kg
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default FarmerDashboard;
