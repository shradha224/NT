import React from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import '../../assets/css/farmer-dashboard.css';
import { mockDashboardData } from '../../services/mockData';

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name') || 'Farmer';

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
      </main>
    </div>
  );
};

export default FarmerDashboard;
