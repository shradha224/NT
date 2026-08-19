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
            <span className="badge-icon">✿</span>
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
              <div className="summary-icon condition-icon">◩</div>
              <span className="summary-label">CONDITION SCORE</span>
              <div className="summary-value"><strong>{data.qualitySummary.conditionScore}</strong><span>/100</span></div>
            </div>
            <div className="summary-card">
              <div className="summary-icon thumbs-icon">♧</div>
              <span className="summary-label">OVERALL QUALITY</span>
              <div className="summary-text green">{data.qualitySummary.overallQuality}</div>
            </div>
            <div className="summary-card">
              <div className="summary-icon warning-icon">△</div>
              <span className="summary-label">SPOILAGE RISK</span>
              <div className="summary-text">{data.qualitySummary.spoilageRisk}</div>
            </div>
            <div className="summary-card">
              <div className="summary-icon calendar-icon">▣</div>
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
                <span>▣</span>
                Captured {data.latestAssessment.capturedTime}
              </div>
            </div>
            <div className="assessment-details">
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">◉</span>Appearance</div>
                <span className={`status ${data.latestAssessment.appearance.cssClass}`}>{data.latestAssessment.appearance.status}</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">⁙</span>Ripeness</div>
                <span className={`status ${data.latestAssessment.ripeness.cssClass}`}>{data.latestAssessment.ripeness.status}</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">▦</span>Defects</div>
                <span className={`status ${data.latestAssessment.defects.cssClass}`}>{data.latestAssessment.defects.status}</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">▤</span>Size Uniformity</div>
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
                <div className="timeline-dot">✓</div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Origin Farm</h3><p>{data.currentBatch.originFarm}</p></div>
                    <span></span>
                  </div>
                </div>
              </div>
              <div className="timeline-item active">
                <div className="timeline-dot">♣</div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Harvested</h3></div>
                    <span>{data.currentBatch.harvestDate}</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item active">
                <div className="timeline-dot">✥</div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Quality Monitored</h3><p>Last Assessment by NAVYA</p></div>
                    <span>{data.currentBatch.qualityMonitoredDate}</span>
                  </div>
                </div>
              </div>
              <div className={`timeline-item ${data.currentBatch.status === 'In Transit' ? 'active' : ''}`}>
                <div className={`timeline-dot ${data.currentBatch.status !== 'In Transit' ? 'inactive' : ''}`}>▣</div>
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
