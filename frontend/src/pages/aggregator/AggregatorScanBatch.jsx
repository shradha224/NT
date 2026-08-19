import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import AggregatorNavbar from '../../components/navigation/AggregatorNavbar';
import '../../assets/css/scan-qr.css';

const AggregatorScanBatch = () => {
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
        setScanResult(result);
        
        // Use the scanned text (which is the batchId) to navigate
        navigate(`/aggregator/batch-assessment/${result}`);
      },
      (error) => {
        // Error callback (runs constantly as it fails to find a QR code, so just ignore it)
        // console.warn(error);
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
            Scan the QR code attached to the produce batch.
          </p>

          <div className="scanner">
            <div id="reader" style={{ width: '100%', border: 'none', borderRadius: '12px', overflow: 'hidden' }}></div>
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
