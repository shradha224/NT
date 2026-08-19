import React, { useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import '../../assets/css/qr-generated.css';
import NavyaLogo from '../../components/common/NavyaLogo';

const BatchCreated = () => {
  const { batchId } = useParams();
  const location = useLocation();
  const currentBatchId = batchId || 'TOM-024';
  const qrRef = useRef(null);
  const formData = location.state || { quantity: '100kg', crop: 'Tomato', origin: 'Pune Farm', date: '2023-10-01' };

  // Create a rich URL for the QR code
  const appBaseUrl = window.location.origin;
  const qrUrl = new URL(`${appBaseUrl}/quality-passport/${currentBatchId}`);
  qrUrl.searchParams.append('qty', formData.quantity);
  qrUrl.searchParams.append('crop', formData.crop);
  qrUrl.searchParams.append('origin', formData.origin);
  qrUrl.searchParams.append('date', formData.date);
  
  const qrValue = qrUrl.toString();

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `Batch-${currentBatchId}-QR.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
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
            <div className="qr-image-wrapper" ref={qrRef} style={{ padding: '16px', background: 'white', borderRadius: '8px' }}>
              <QRCodeSVG 
                value={qrValue} 
                size={200}
                level={"H"}
                fgColor={"#003d2d"}
                bgColor={"#ffffff"}
              />
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
