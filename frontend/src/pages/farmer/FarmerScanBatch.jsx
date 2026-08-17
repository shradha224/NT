import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import '../../assets/css/scan-qr.css';

const FarmerScanBatch = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null); // 'assessed', 'unassessed', null

  const handleScan = () => {
    // Dummy scan implementation: randomly pick assessed or unassessed, or just toggle
    const isAssessed = Math.random() > 0.5;
    
    if (isAssessed) {
      setScanResult('assessed');
      setTimeout(() => {
        navigate('/quality-passport/TOM-024');
      }, 1500);
    } else {
      setScanResult('unassessed');
    }
  };

  return (
    <div className="scan-qr-root">
      <FarmerNavbar />
      
      <main className="scan-page">
        <section className="scan-container">
          <h1>Scan Batch</h1>
          <p className="subtitle">
            Scan the QR code attached to the produce batch.
          </p>

          {/* ================= SCANNER ================= */}
          <div className="scanner">
            <div className="scanner-background" style={{ backgroundColor: '#1f2937', width: '100%', height: '100%' }}></div>
            <div className="scanner-overlay"></div>

            {/* Top scanning line */}
            <div className="scan-line"></div>

            {/* Scanner corners */}
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>

            {/* Scanner interface text */}
            <div className="scanner-message">
              <span className="scanner-title">QR Scanner Interface</span>
              <span className="scanner-subtitle">
                Align QR code within the frame
              </span>
            </div>

            {/* Batch Found notification */}
            {scanResult && (
              <div className={`batch-found ${scanResult === 'unassessed' ? 'unassessed-alert' : ''}`}>
                <div className="success-icon">
                  {scanResult === 'assessed' ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  )}
                </div>
                <div className="batch-info">
                  <strong>Batch Found (TOM-024)</strong>
                  {scanResult === 'assessed' ? (
                    <span>Quality Passport Available</span>
                  ) : (
                    <span style={{ color: '#d97706' }}>Not Yet Assessed</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Instruction */}
          {scanResult === 'unassessed' ? (
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a', color: '#92400e' }}>
              <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>Batch Not Yet Assessed</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
                This batch has been registered successfully, but quality assessment is not available yet. An aggregator must monitor the batch before its quality passport can be generated.
              </p>
              <button 
                onClick={() => setScanResult(null)} 
                style={{ marginTop: '15px', padding: '8px 16px', backgroundColor: '#92400e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Scan Another Batch
              </button>
            </div>
          ) : (
            <p className="scan-instruction">
              Point your camera at the QR code
            </p>
          )}

          {/* Scan button */}
          {!scanResult && (
            <button className="scan-button" onClick={handleScan}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 7 4"></polyline><polyline points="20 7 20 4 17 4"></polyline><polyline points="4 17 4 20 7 20"></polyline><polyline points="20 17 20 20 17 20"></polyline><line x1="4" y1="12" x2="20" y2="12"></line></svg>
              <span>Scan QR</span>
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default FarmerScanBatch;
