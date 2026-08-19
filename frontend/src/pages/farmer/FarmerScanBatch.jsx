import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import '../../assets/css/scan-qr.css';

const FarmerScanBatch = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    // Only initialize the scanner once
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
    });

    scanner.render(
      (result) => {
        // Success callback
        scanner.clear(); // Stop scanning once successfully decoded
        setScanResult('assessed'); // Dummy check for now
        
        // Use the scanned text (which is the batchId) to navigate after a delay
        setTimeout(() => {
          navigate(`/quality-passport/${result}`);
        }, 1500);
      },
      (error) => {
        // Error callback (runs constantly as it fails to find a QR code, so just ignore it)
      }
    );

    // Cleanup function when component unmounts
    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [navigate]);

  return (
    <div className="scan-qr-root">
      <FarmerNavbar />
      
      <main className="scan-page">
        <section className="scan-container">
          <h1>Scan Batch</h1>
          <p className="subtitle">
            Scan the QR code attached to the produce batch.
          </p>

          <div className="scanner">
            <div id="reader" style={{ width: '100%', border: 'none', borderRadius: '12px', overflow: 'hidden' }}></div>

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
                  <strong>Batch Found</strong>
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
                onClick={() => window.location.reload()} 
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

        </section>
      </main>
    </div>
  );
};

export default FarmerScanBatch;
