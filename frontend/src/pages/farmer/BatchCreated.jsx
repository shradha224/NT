import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/qr-generated.css';

const BatchCreated = () => {
  const { batchId } = useParams();

  const downloadQR = () => {
    // Dummy download implementation
    alert("Downloading QR...");
  };

  const printQR = () => {
    // Dummy print implementation
    alert("Printing QR...");
  };

  return (
    <>
      {/* Top-left Navya Logo */}
      <header className="top-header">
        <div className="brand">
          <div className="brand-icon">
            <span></span>
            <span></span>
          </div>
          <span className="brand-name">Navya</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="page-container">
        <section className="success-card">
          {/* Success Icon */}
          <div className="success-icon">
            <span className="checkmark">✓</span>
          </div>

          {/* Heading */}
          <h1>Batch Created Successfully</h1>

          {/* Batch ID */}
          <p className="batch-id">
            Batch ID: <span>{batchId || 'TOM-024'}</span>
          </p>

          {/* QR Container */}
          <div className="qr-container">
            <div className="qr-image-wrapper">
              <div className="qr-image" style={{ width: '200px', height: '200px', backgroundColor: '#e5e7eb', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                [QR Image Placeholder]
              </div>
            </div>
            <p className="qr-description">
              Attach this QR code to the physical batch.
            </p>
          </div>

          {/* Download QR */}
          <button className="download-btn" onClick={downloadQR}>
            <span className="download-icon">↓</span>
            <span>Download QR</span>
          </button>

          {/* Print QR */}
          <button className="print-btn" onClick={printQR}>
            <span className="print-icon">▣</span>
            <span>Print QR</span>
          </button>

          {/* Back */}
          <Link to="/farmer/dashboard" className="back-link">
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
        </section>
      </main>
    </>
  );
};

export default BatchCreated;
