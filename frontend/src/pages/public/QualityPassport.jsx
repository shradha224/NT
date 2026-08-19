import React from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/quality-passport.css';
import NavyaLogo from '../../components/common/NavyaLogo';
import { mockIoTData } from '../../services/mockData';

const QualityPassport = () => {
  const { batchId } = useParams();
  const data = mockIoTData;

  return (
    <div className="quality-passport-root">
      <header className="header">
        <div className="brand">
          <NavyaLogo />
        </div>
      </header>

      <main className="passport-container">
        {/* Hero */}
        <section className="hero">
          <h1>Produce Quality Passport</h1>
          <p className="hero-subtitle">Verified by Navya Agricultural Intelligence</p>
          <div className="batch-pill">
            <strong>Batch ID: {batchId || data.currentBatch.id}</strong>
            <span>•</span>
            <strong>{data.currentBatch.type}</strong>
          </div>
          <div className="quality-badge">
            <span className="badge-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </span>
            {data.qualitySummary.overallQuality} Quality
          </div>
        </section>

        {/* QUALITY SUMMARY */}
        <section className="section">
          <div className="section-heading">
            <h2>Quality Summary</h2>
          </div>
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon condition-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2v20"></path></svg>
              </div>
              <span className="summary-label">CONDITION SCORE</span>
              <div className="summary-value"><strong>{data.qualitySummary.conditionScore}</strong><span>/100</span></div>
            </div>
            <div className="summary-card">
              <div className="summary-icon thumbs-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              </div>
              <span className="summary-label">OVERALL QUALITY</span>
              <div className="summary-text green">{data.qualitySummary.overallQuality}</div>
            </div>
            <div className="summary-card">
              <div className="summary-icon warning-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
              </div>
              <span className="summary-label">SPOILAGE RISK</span>
              <div className="summary-text">{data.qualitySummary.spoilageRisk}</div>
            </div>
            <div className="summary-card">
              <div className="summary-icon calendar-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
              </div>
              <span className="summary-label">EST. SHELF LIFE</span>
              <div className="summary-text green">{data.qualitySummary.shelfLife}</div>
            </div>
          </div>
        </section>

        {/* LATEST ASSESSMENT */}
        <section className="section">
          <div className="section-heading">
            <h2>Latest Assessment</h2>
          </div>
          <div className="assessment-card">
            <div className="produce-image-container">
              <img
                src={data.latestAssessment.image}
                alt="Produce Camera View"
                className="produce-image"
              />
              <div className="image-label">
                <span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
                </span>
                Captured {data.latestAssessment.capturedTime}
              </div>
            </div>
            <div className="assessment-details">
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>
                </span>Appearance</div>
                <span className={`status ${data.latestAssessment.appearance.cssClass}`}>{data.latestAssessment.appearance.status}</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                </span>Ripeness</div>
                <span className={`status ${data.latestAssessment.ripeness.cssClass}`}>{data.latestAssessment.ripeness.status}</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path></svg>
                </span>Defects</div>
                <span className={`status ${data.latestAssessment.defects.cssClass}`}>{data.latestAssessment.defects.status}</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><line x1="3" x2="21" y1="9" y2="9"></line><line x1="3" x2="21" y1="15" y2="15"></line><line x1="9" x2="9" y1="3" y2="21"></line><line x1="15" x2="15" y1="3" y2="21"></line></svg>
                </span>Size Uniformity</div>
                <span className={`status ${data.latestAssessment.sizeUniformity.cssClass}`}>{data.latestAssessment.sizeUniformity.status}</span>
              </div>
            </div>
          </div>
        </section>

        {/* LOWER SECTION */}
        <section className="lower-grid">
          {/* QUALITY HISTORY */}
          <div className="history-section">
            <div className="section-heading">
              <h2>Quality History</h2>
            </div>
            <div className="history-card">
              {data.qualityHistory.map((item, index) => (
                <div className="history-row" key={index}>
                  <span>{item.day}</span>
                  <strong>{item.result}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* TRACEABILITY JOURNEY */}
          <div className="traceability-section">
            <div className="section-heading">
              <h2>Traceability Journey</h2>
            </div>
            <div className="traceability-card">
              <div className="timeline-item active">
                <div className="timeline-dot">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Origin Farm</h3><p>{data.currentBatch.originFarm}</p></div>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="timeline-item active">
                <div className="timeline-dot">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>
                </div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Harvested</h3></div>
                    <span>{data.currentBatch.harvestDate}</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item active">
                <div className="timeline-dot">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Quality Monitored</h3><p>Last Assessment by NAVYA</p></div>
                    <span>{data.currentBatch.qualityMonitoredDate}</span>
                  </div>
                </div>
              </div>
              <div className={`timeline-item ${data.currentBatch.status === 'In Transit' ? 'active' : ''}`}>
                <div className={`timeline-dot ${data.currentBatch.status !== 'In Transit' ? 'inactive' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>
                </div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Distributed</h3></div>
                    <span>{data.currentBatch.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="passport-footer">
          <p>
            This Quality Passport is automatically generated by Navya's agricultural
            monitoring systems. Data is securely tracked from origin to ensure
            transparency and freshness.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default QualityPassport;
