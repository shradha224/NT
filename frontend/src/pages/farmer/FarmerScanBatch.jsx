import React from 'react';
import { useNavigate } from 'react-router-dom';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import '../../assets/css/scan-qr.css';

const FarmerScanBatch = () => {
  const navigate = useNavigate();

  const handleScan = () => {
    // Dummy scan implementation
    // Navigate to quality passport
    navigate('/quality-passport/TOM-024');
  };

  return (
    <>
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

            {/* Batch Found notification (hide by default or manage with state later) */}
            <div className="batch-found">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div className="batch-info">
                <strong>Batch Found</strong>
                <span>Tomato (TOM-024)</span>
              </div>
            </div>
          </div>

          {/* Instruction */}
          <p className="scan-instruction">
            Point your camera at the QR code
          </p>

          {/* Scan button */}
          <button className="scan-button" onClick={handleScan}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 7 4"></polyline><polyline points="20 7 20 4 17 4"></polyline><polyline points="4 17 4 20 7 20"></polyline><polyline points="20 17 20 20 17 20"></polyline><line x1="4" y1="12" x2="20" y2="12"></line></svg>
            <span>Scan QR</span>
          </button>
        </section>
      </main>
    </>
  );
};

export default FarmerScanBatch;
