import React from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/css/quality-passport.css';

const QualityPassport = () => {
  const { batchId } = useParams();

  return (
    <>
      <header className="header">
        <div className="brand">
          <div className="brand-icon">
            <span></span>
            <span></span>
          </div>
          <span className="brand-name">Navya</span>
        </div>
      </header>

      <main className="passport-container">
        {/* Hero */}
        <section className="hero">
          <h1>Produce Quality Passport</h1>
          <p className="hero-subtitle">Verified by Navya Agricultural Intelligence</p>
          <div className="batch-pill">
            <strong>Batch ID: {batchId || 'TOM-024'}</strong>
            <span>•</span>
            <strong>Tomato</strong>
          </div>
          <div className="quality-badge">
            <span className="badge-icon">✿</span>
            Good Quality
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
              <div className="summary-value"><strong>82</strong><span>/100</span></div>
            </div>
            <div className="summary-card">
              <div className="summary-icon thumbs-icon">♧</div>
              <span className="summary-label">OVERALL QUALITY</span>
              <div className="summary-text green">Good</div>
            </div>
            <div className="summary-card">
              <div className="summary-icon warning-icon">△</div>
              <span className="summary-label">SPOILAGE RISK</span>
              <div className="summary-text">28%</div>
            </div>
            <div className="summary-card">
              <div className="summary-icon calendar-icon">▣</div>
              <span className="summary-label">EST. SHELF LIFE</span>
              <div className="summary-text green">4 Days</div>
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
              <div style={{width: '100%', height: '200px', backgroundColor: '#374151', borderRadius: '12px'}}></div>
              <div className="image-label">
                <span>▣</span>
                Captured 2 hrs ago
              </div>
            </div>
            <div className="assessment-details">
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">◉</span>Appearance</div>
                <span className="status good">Good</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">⁙</span>Ripeness</div>
                <span className="status good">Optimal</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">▦</span>Defects</div>
                <span className="status neutral">Minimal</span>
              </div>
              <div className="assessment-row">
                <div className="assessment-name"><span className="detail-icon">▤</span>Size Uniformity</div>
                <span className="status good">Consistent</span>
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
              <div className="history-row"><span>Today (Day 4)</span><strong>Good</strong></div>
              <div className="history-row"><span>Today (Day 4)</span><strong>Good</strong></div>
              <div className="history-row"><span>Yesterday (Day 3)</span><strong>Good</strong></div>
              <div className="history-row"><span>Yesterday (Day 3)</span><strong>Good</strong></div>
              <div className="history-row"><span>Yesterday (Day 3)</span><strong>Good</strong></div>
              <div className="history-row"><span>Oct 24 (Day 2)</span><strong>Excellent</strong></div>
              <div className="history-row"><span>Oct 23 (Day 1)</span><strong>Fresh Picked</strong></div>
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
                    <div><h3>Origin Farm</h3><p>Sunnyvale Acres, California</p></div>
                    <span>Oct 22, 2023</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item active">
                <div className="timeline-dot">♣</div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Harvested</h3></div>
                    <span>Oct 23, 2023 - 06:00 AM</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item active">
                <div className="timeline-dot">✥</div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Quality Monitored</h3><p>Last Assessment by NAVYA</p></div>
                    <span>Oct 23, 2023 - 02:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot inactive">▣</div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Distributed</h3></div>
                    <span>In Transit</span>
                  </div>
                </div>
              </div>
              <div className="timeline-item pending">
                <div className="timeline-dot inactive">▢</div>
                <div className="timeline-content">
                  <div className="timeline-top">
                    <div><h3>Buyer Arrival</h3></div>
                    <span>Pending</span>
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
    </>
  );
};

export default QualityPassport;
