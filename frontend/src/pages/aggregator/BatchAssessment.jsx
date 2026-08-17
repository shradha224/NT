import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AggregatorNavbar from '../../components/navigation/AggregatorNavbar';
import '../../assets/css/batch-assessment.css';
import { Hourglass, CalendarDays, ArrowRight, BadgeCheck, Gauge, RadioTower, Thermometer, Wind, Droplets, Eye, Camera, Brain, CircleCheck } from 'lucide-react';

const BatchAssessment = () => {
  const { batchId } = useParams();

  return (
    <>
      <AggregatorNavbar />

      <main className="page-container">
        {/* BATCH HEADER */}
        <section className="batch-header">
          <div className="batch-info">
            <div className="batch-title-row">
              <h1>Tomato</h1>
              <span className="batch-id">Batch ID: {batchId || 'TOM-024'}</span>
            </div>
            <div className="batch-meta">
              <span>
                <Hourglass />
                Quantity: 250 kg
              </span>
              <span>
                <CalendarDays />
                Harvested: 12 Aug 2026
              </span>
            </div>
          </div>
          <div className="assessment-status">
            <Link to={`/aggregator/batch-history/${batchId || 'TOM-024'}`} className="detailed-analysis">
              View Detailed Analysis
              <ArrowRight />
            </Link>
            <div className="quality-badge">
              <BadgeCheck />
              GOOD QUALITY
            </div>
          </div>
        </section>

        {/* TOP GRID */}
        <section className="top-grid">
          {/* NAVYA CONDITION SCORE */}
          <div className="card condition-card">
            <div className="card-heading">
              <Gauge />
              <h2>NAVYA Condition Score</h2>
            </div>
            <div className="score-area">
              <div className="score-ring">
                <div className="score-inner">
                  <strong>82</strong>
                  <span>/100</span>
                </div>
              </div>
            </div>
            <div className="score-footer">
              <div>
                <span>Spoilage Risk</span>
                <strong className="risk-value">28%</strong>
              </div>
              <div className="vertical-divider"></div>
              <div>
                <span>Shelf Life</span>
                <strong>4 Days</strong>
              </div>
            </div>
          </div>

          {/* ENVIRONMENTAL MONITORING */}
          <div className="card environment-card">
            <div className="card-heading">
              <RadioTower />
              <h2>Environmental Monitoring</h2>
            </div>
            <div className="environment-grid">
              {/* Temperature */}
              <div className="environment-item temperature">
                <div className="environment-top">
                  <Thermometer />
                  <span>↑ 3.4°C</span>
                </div>
                <h3>Temperature</h3>
                <strong>28.4°C</strong>
                <p>Above optimal range<br />(&lt; 25°C)</p>
              </div>

              {/* VOC */}
              <div className="environment-item">
                <div className="environment-top">
                  <Wind />
                  <span>↑18%</span>
                </div>
                <h3>VOC/Gas</h3>
                <strong>412 ppm</strong>
                <p className="normal">Normal</p>
              </div>

              {/* Humidity */}
              <div className="environment-item">
                <div className="environment-top">
                  <Droplets />
                  <span>↓3%</span>
                </div>
                <h3>Humidity</h3>
                <strong>72 %</strong>
                <p className="normal">Normal</p>
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE GRID */}
        <section className="middle-grid">
          {/* VISUAL ASSESSMENT */}
          <div className="card visual-card">
            <div className="card-heading">
              <Eye />
              <h2>Visual Assessment Deep Dive</h2>
            </div>
            <div className="visual-content">
              <div className="produce-image">
                <div style={{width: '100%', height: '100%', backgroundColor: '#374151', borderRadius: '12px'}}>
                  {/* <img src="assets/tomato-batch.jpg" alt="Latest produce image" /> */}
                </div>
                <div className="image-label">
                  <Camera />
                  Latest Produce Image
                </div>
              </div>

              <div className="visual-metrics">
                <div className="metric-box">
                  <span>Appearance</span>
                  <strong>Good</strong>
                </div>
                <div className="metric-box">
                  <span>Ripeness</span>
                  <strong className="orange">76%</strong>
                </div>
                <div className="metric-box">
                  <span>Colour Change</span>
                  <strong>Low</strong>
                </div>
                <div className="metric-box">
                  <span>Visible Defects</span>
                  <strong>Low</strong>
                </div>
                <div className="metric-box">
                  <span>Bruising</span>
                  <strong>Minimal</strong>
                </div>
                <div className="metric-box">
                  <span>Deterioration</span>
                  <strong className="orange">Early</strong>
                </div>
              </div>
            </div>
          </div>

          {/* WHAT NAVYA IS SEEING */}
          <div className="card seeing-card">
            <div className="card-heading seeing-heading">
              <div>
                <Brain />
                <h2>What NAVYA is seeing</h2>
              </div>
              <span className="confidence">Confidence: 91%</span>
            </div>
            <p className="analysis-text">
              Deterioration is increasing gradually based on visual
              and environmental signals. The combination of slightly
              elevated VOC and early visual ripening signs suggests
              the batch will reach peak maturity sooner than initially
              projected.
            </p>
            <div className="storage-status">
              <CircleCheck />
              <div>
                <strong>Storage Environment</strong>
                <span>Status: Favourable</span>
              </div>
            </div>
          </div>
        </section>

        {/* AI ASSESSMENT */}
        <section className="ai-assessment">
          <div className="ai-content">
            <div className="ai-title">
              <Brain />
              <h2>AI Assessment</h2>
            </div>
            <p>
              "Current conditions indicate good quality with a
              relatively low spoilage risk."
            </p>
          </div>
          <div className="recommendation">
            <span>ACTION RECOMMENDATION</span>
            <strong>Prioritize this batch for sale within 2 days.</strong>
          </div>
        </section>
      </main>
    </>
  );
};

export default BatchAssessment;
