import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import AggregatorNavbar from '../../components/navigation/AggregatorNavbar';
import '../../assets/css/scan-qr.css';

const AggregatorScanBatch = () => {
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
          setScanResult('found'); // Dummy check for now
          
          // Navigate to assessment page after delay
          setTimeout(() => {
            navigate(`/aggregator/batch-assessment/${batchId}`);
          }, 2500);
        } catch (e) {
          // Fallback if it's just a raw ID
          setScanResult('found');
          setBatchDetails({ id: result });
          setTimeout(() => {
            navigate(`/aggregator/batch-assessment/${result}`);
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
      <AggregatorNavbar />
      
      <main className="scan-page">
        <section className="scan-container">
          <h1>Scan Batch</h1>
          <p className="subtitle">
            Scan the QR code attached to the incoming produce batch to begin assessment.
          </p>

          <div className="scanner">
            <div id="reader" style={{ width: '100%', border: 'none', borderRadius: '12px', overflow: 'hidden' }}></div>

            {/* Batch Found notification */}
            {scanResult && (
              <div className="batch-found">
                <div className="success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="batch-info">
                  <strong>Batch Found: {batchDetails?.id}</strong>
                  {batchDetails?.crop && (
                    <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                      {batchDetails.crop} • {batchDetails.qty} • {batchDetails.origin}
                    </div>
                  )}
                  <div style={{ marginTop: '4px' }}>
                    <span style={{ color: '#059669', fontWeight: '500', fontSize: '13px' }}>Redirecting to Assessment...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="scan-instruction">
            Point your camera at the QR code
          </p>

        </section>
      </main>
    </div>
  );
};

export default AggregatorScanBatch;
