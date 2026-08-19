import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AggregatorNavbar from '../../components/navigation/AggregatorNavbar';
import GlobalFooter from '../../components/common/GlobalFooter';
import '../../assets/css/batch-assessment.css';
import { Hourglass, CalendarDays, ArrowRight, BadgeCheck, Gauge, RadioTower, Thermometer, Wind, Droplets, Eye, Camera, Brain, CircleCheck } from 'lucide-react';
import { mockIoTData } from '../../services/mockData';

const BatchAssessment = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const data = mockIoTData;

  return (
    <div className="batch-assessment-root">
      <AggregatorNavbar />

      <main className="page-container">
        {/* BACK BUTTON */}
        <div style={{ marginBottom: '16px' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ background: 'none', border: 'none', color: '#003f2d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500', padding: 0 }}
          >
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back
          </button>
        </div>

        {/* BATCH HEADER */}
        <section className="batch-header">
          <div className="batch-info">
            <div className="batch-title-row">
              <h1>{data.currentBatch.type}</h1>
              <span className="batch-id">Batch ID: {batchId || data.currentBatch.id}</span>
            </div>
            <div className="batch-meta">
              <span>
                <Hourglass />
                Quantity: 250 kg
              </span>
              <span>
                <CalendarDays />
                Harvested: {data.currentBatch.harvestDate}
              </span>
            </div>
          </div>
          <div className="assessment-status">
            <Link to={`/aggregator/batch-history/${batchId || data.currentBatch.id}`} className="detailed-analysis">
              View Detailed Analysis
              <ArrowRight />
            </Link>
            <div className="quality-badge">
              <BadgeCheck />
              {data.qualitySummary.overallQuality.toUpperCase()} QUALITY
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
                  <strong>{data.qualitySummary.conditionScore}</strong>
                  <span>/100</span>
                </div>
              </div>
            </div>
            <div className="score-footer">
              <div>
                <span>Spoilage Risk</span>
                <strong className="risk-value">{data.qualitySummary.spoilageRisk}</strong>
              </div>
              <div className="vertical-divider"></div>
              <div>
                <span>Shelf Life</span>
                <strong>{data.qualitySummary.shelfLife}</strong>
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
                  <span>↑ 3.4{data.sensorReadings.temperature.unit}</span>
                </div>
                <h3>Temperature</h3>
                <strong>{data.sensorReadings.temperature.peak}</strong>
                <p>Above optimal range<br />(&lt; 25{data.sensorReadings.temperature.unit})</p>
              </div>

              {/* VOC */}
              <div className="environment-item">
                <div className="environment-top">
                  <Wind />
                  <span>↑18%</span>
                </div>
                <h3>VOC/Gas</h3>
                <strong>{data.sensorReadings.voc.current} {data.sensorReadings.voc.unit}</strong>
                <p className={data.sensorReadings.voc.status === 'Normal' ? 'normal' : 'warning'}>{data.sensorReadings.voc.status}</p>
              </div>

              {/* Humidity */}
              <div className="environment-item">
                <div className="environment-top">
                  <Droplets />
                  <span>↓3%</span>
                </div>
                <h3>Humidity</h3>
                <strong>{data.sensorReadings.humidity.current} {data.sensorReadings.humidity.unit}</strong>
                <p className={data.sensorReadings.humidity.status === 'Optimal' ? 'normal' : 'warning'}>{data.sensorReadings.humidity.status}</p>
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
                <img
                  src={data.latestAssessment.image}
                  alt="Produce Camera View"
                  style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}}
                />
                <div className="image-label">
                  <Camera />
                  Latest Produce Image
                </div>
              </div>

              <div className="visual-metrics">
                <div className="metric-box">
                  <span>Appearance</span>
                  <strong>{data.visualMetrics.appearance}</strong>
                </div>
                <div className="metric-box">
                  <span>Ripeness</span>
                  <strong className={data.visualMetrics.ripeness.cssClass}>{data.visualMetrics.ripeness.value}</strong>
                </div>
                <div className="metric-box">
                  <span>Colour Change</span>
                  <strong>{data.visualMetrics.colourChange}</strong>
                </div>
                <div className="metric-box">
                  <span>Visible Defects</span>
                  <strong>{data.visualMetrics.visibleDefects}</strong>
                </div>
                <div className="metric-box">
                  <span>Bruising</span>
                  <strong>{data.visualMetrics.bruising}</strong>
                </div>
                <div className="metric-box">
                  <span>Deterioration</span>
                  <strong className={data.visualMetrics.deterioration.cssClass}>{data.visualMetrics.deterioration.value}</strong>
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
              <span className="confidence">Confidence: {data.aiInsights.confidence}</span>
            </div>
            <p className="analysis-text">
              {data.aiInsights.analysisText}
            </p>
            <div className="storage-status">
              <CircleCheck />
              <div>
                <strong>Storage Environment</strong>
                <span>Status: {data.aiInsights.storageStatus}</span>
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
              {data.aiInsights.assessmentSummary}
            </p>
          </div>
          <div className="recommendation">
            <span>ACTION RECOMMENDATION</span>
            <strong>{data.aiInsights.recommendation}</strong>
          </div>
        </section>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default BatchAssessment;
