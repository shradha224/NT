import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import FarmerNavbar from '../../components/navigation/FarmerNavbar';
import '../../assets/css/scan-qr.css';

const FarmerScanBatch = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [batchDetails, setBatchDetails] = useState(null);

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
        
        // Parse the URL to extract data
        try {
          const url = new URL(result);
          // Extract the batch ID from the pathname (e.g. /quality-passport/TOM-024)
          const pathParts = url.pathname.split('/');
          const batchId = pathParts[pathParts.length - 1];
          
          const details = {
            id: batchId,
            qty: url.searchParams.get('qty'),
            crop: url.searchParams.get('crop'),
            origin: url.searchParams.get('origin')
          };
          
          setBatchDetails(details);
          setScanResult('assessed'); // Dummy check for now
          
          // Navigate after delay
          setTimeout(() => {
            navigate(`/quality-passport/${batchId}`);
          }, 2500);
        } catch (e) {
          // Fallback if it's just a raw ID
          setScanResult('assessed');
          setBatchDetails({ id: result });
          setTimeout(() => {
            navigate(`/quality-passport/${result}`);
          }, 2500);
        }
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
        {/* BACK BUTTON */}
        <div style={{ marginBottom: '16px', padding: '0 20px' }}>
          <button 
            onClick={() => navigate('/farmer/dashboard')} 
            style={{ background: 'none', border: 'none', color: '#003f2d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', padding: 0 }}
          >
            ← Back to Dashboard
          </button>
        </div>

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
                  <strong>Batch Found: {batchDetails?.id}</strong>
                  {batchDetails?.crop && (
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                      {batchDetails.crop} • {batchDetails.qty} • {batchDetails.origin}
                    </div>
                  )}
                  <div style={{ marginTop: '4px' }}>
                    {scanResult === 'assessed' ? (
                      <span style={{ color: '#059669', fontWeight: '500', fontSize: '13px' }}>Redirecting to Quality Passport...</span>
                    ) : (
                      <span style={{ color: '#d97706', fontWeight: '500', fontSize: '13px' }}>Not Yet Assessed</span>
                    )}
                  </div>
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
