import React from 'react';
import { Link } from 'react-router-dom';
import AggregatorNavbar from '../../components/navigation/AggregatorNavbar';
import '../../assets/css/aggregator-dashboard.css';
import { mockDashboardData } from '../../services/mockData';

const AggregatorDashboard = () => {
  const data = mockDashboardData;
  const userName = localStorage.getItem('name') || 'Aggregator';

  return (
    <div className="aggregator-dashboard-root">
      <AggregatorNavbar />

      <main className="dashboard">
        {/* Welcome */}
        <section className="welcome-section">
          <h1>Welcome, {userName}</h1>
          <p>
            Monitor incoming produce and scan a batch to view its latest
            quality assessment.
          </p>
        </section>

        {/* DASHBOARD GRID */}
        <section className="dashboard-grid">
          {/* SCAN CARD */}
          <div className="scan-card">
            <div className="scan-content">
              {/* QR icon */}
              <div className="qr-icon">
                <svg viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M8 8h11v11H8z" fill="none" stroke="currentColor" strokeWidth="3"/>
                  <path d="M29 8h11v11H29z" fill="none" stroke="currentColor" strokeWidth="3"/>
                  <path d="M8 29h11v11H8z" fill="none" stroke="currentColor" strokeWidth="3"/>
                  <path d="M29 29h4v4h-4z" fill="currentColor"/>
                  <path d="M36 29h4v11h-4z" fill="currentColor"/>
                  <path d="M29 36h4v4h-4z" fill="currentColor"/>
                  <path d="M22 22h4v4h-4z" fill="currentColor"/>
                  <path d="M29 22h4v4h-4z" fill="currentColor"/>
                </svg>
              </div>

              <h2>Scan Batch</h2>
              <p>
                Scan the QR attached to a produce batch to begin
                monitoring.
              </p>

              <Link to="/aggregator/scan-batch" className="scan-button">
                Scan Batch
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="right-column">
            {/* NEEDS ATTENTION */}
            <section className="attention-card">
              <div className="card-header">
                <div className="attention-title">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3L2.5 20h19L12 3z"></path>
                    <path d="M12 9v5"></path>
                    <circle cx="12" cy="17.5" r=".7" fill="currentColor" stroke="none"></circle>
                  </svg>
                  <h2>Needs Attention</h2>
                </div>
              </div>

              <div className="divider"></div>

              {data.activeBatches.map((batch, index) => (
                <div className="alert-item" key={index}>
                  <div className="alert-icon">
                    <span></span>
                  </div>
                  <div className="alert-content">
                    <p>{batch.alert}</p>
                    <span>Batch: {batch.id}</span>
                  </div>
                </div>
              ))}
            </section>

            {/* MONITORING UNIT */}
            <section className="monitoring-card">
              <div className="monitoring-header">
                <h2>Monitoring Unit</h2>
                <span>Last Sync: {data.systemStatus.lastSync}</span>
              </div>

              <div className="divider"></div>

              {/* Device */}
              <div className="sensor-row">
                <div className="sensor-name">
                  <svg viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2"></rect>
                    <path d="M9 3v3M15 3v3M9 18v3M15 18v3"></path>
                    <path d="M3 9h3M3 15h3M18 9h3M18 15h3"></path>
                  </svg>
                  <span>Device</span>
                </div>
                <span className={`status-dot ${data.systemStatus.sensors.device}`}></span>
              </div>

              {/* Camera */}
              <div className="sensor-row">
                <div className="sensor-name">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="7" width="14" height="10" rx="2"></rect>
                    <path d="M17 10l4-2v8l-4-2"></path>
                  </svg>
                  <span>Camera</span>
                </div>
                <span className={`status-dot ${data.systemStatus.sensors.camera}`}></span>
              </div>

              {/* Temperature */}
              <div className="sensor-row">
                <div className="sensor-name">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 4v10"></path>
                    <circle cx="12" cy="17" r="4"></circle>
                    <path d="M12 8h2M12 11h2"></path>
                  </svg>
                  <span>Temperature</span>
                </div>
                <span className={`status-dot ${data.systemStatus.sensors.temperature}`}></span>
              </div>

              {/* Humidity */}
              <div className="sensor-row">
                <div className="sensor-name">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3C12 3 6.5 10 6.5 14.5 A5.5 5.5 0 0 0 17.5 14.5 C17.5 10 12 3 12 3Z"></path>
                  </svg>
                  <span>Humidity</span>
                </div>
                <span className={`status-dot ${data.systemStatus.sensors.humidity}`}></span>
              </div>

              {/* VOC */}
              <div className="sensor-row">
                <div className="sensor-name">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 10h7"></path>
                    <path d="M4 14h10"></path>
                    <path d="M4 18h5"></path>
                    <path d="M14 8c3 0 5 2 5 4s-2 4-5 4"></path>
                  </svg>
                  <span>VOC/Gas</span>
                </div>
                <span className={`status-dot ${data.systemStatus.sensors.voc}`}></span>
              </div>
            </section>
          </div>
        </section>

        {/* SYSTEM STATUS */}
        <div className="system-status">
          <span className="system-dot"></span>
          <span>{data.systemStatus.connected ? 'Monitoring System Connected' : 'System Offline'}</span>
        </div>
      </main>
    </div>
  );
};

export default AggregatorDashboard;
