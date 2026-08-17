import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/qr-generated.css';
import NavyaLogo from '../../components/common/NavyaLogo';

const BatchCreated = () => {
  const { batchId } = useParams();
  const currentBatchId = batchId || 'TOM-024';

  const downloadQR = () => {
    alert(`Downloading QR code for ${currentBatchId}...`);
  };

  const printQR = () => {
    window.print();
  };

  return (
    <div className="qr-generated-root">
      {/* Top-left Navya Logo */}
      <header className="top-header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <NavyaLogo />
        </Link>
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
            Batch ID: <span>{currentBatchId}</span>
          </p>

          {/* QR Container */}
          <div className="qr-container">
            <div className="qr-image-wrapper">
              <svg viewBox="0 0 100 100" className="qr-image" fill="#003d2d">
                {/* Simulated High-Res QR code pattern */}
                <rect x="0" y="0" width="30" height="30" fill="#003d2d" rx="2" />
                <rect x="5" y="5" width="20" height="20" fill="#ffffff" rx="1" />
                <rect x="10" y="10" width="10" height="10" fill="#003d2d" rx="1" />

                <rect x="70" y="0" width="30" height="30" fill="#003d2d" rx="2" />
                <rect x="75" y="5" width="20" height="20" fill="#ffffff" rx="1" />
                <rect x="80" y="10" width="10" height="10" fill="#003d2d" rx="1" />

                <rect x="0" y="70" width="30" height="30" fill="#003d2d" rx="2" />
                <rect x="5" y="75" width="20" height="20" fill="#ffffff" rx="1" />
                <rect x="10" y="80" width="10" height="10" fill="#003d2d" rx="1" />

                <rect x="36" y="8" width="8" height="8" />
                <rect x="52" y="12" width="8" height="8" />
                <rect x="40" y="24" width="8" height="8" />
                <rect x="56" y="28" width="8" height="8" />

                <rect x="8" y="38" width="8" height="8" />
                <rect x="22" y="44" width="8" height="8" />
                <rect x="38" y="40" width="12" height="12" />
                <rect x="54" y="48" width="8" height="8" />
                <rect x="68" y="38" width="8" height="8" />
                <rect x="84" y="44" width="8" height="8" />

                <rect x="38" y="68" width="8" height="8" />
                <rect x="52" y="72" width="8" height="8" />
                <rect x="44" y="84" width="8" height="8" />
                <rect x="68" y="76" width="8" height="8" />
                <rect x="80" y="84" width="12" height="12" />
              </svg>
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
    </div>
  );
};

export default BatchCreated;
