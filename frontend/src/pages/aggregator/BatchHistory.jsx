import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/css/batch-history.css';
import { mockIoTData, mockDashboardData } from '../../services/mockData';

const BatchHistory = () => {
  const { batchId } = useParams();
  const [activeTab, setActiveTab] = useState('Temperature');
  const data = mockIoTData;
  const dashboardData = mockDashboardData;

  return (
    <div className="batch-history-root">
      {/* HEADER */}
      <header className="top-header">
        <Link to={`/aggregator/batch-assessment/${batchId || data.currentBatch.id}`} className="back-link">
          <span className="back-arrow">←</span>
          <span>Back to Assessment</span>
        </Link>
        <div className="page-heading">
          <h1>Batch History &amp; Trends</h1>
          <p>Track how this batch has changed throughout monitoring.</p>
        </div>
        <div className="batch-mini-info">
          <div>
            <strong>{data.currentBatch.type}</strong>
            <span>{batchId || data.currentBatch.id}</span>
          </div>
          <div className="tomato-image">
            <div style={{width: '38px', height: '38px', backgroundColor: '#ef4444', borderRadius: '50%'}}></div>
          </div>
        </div>
      </header>

      <main className="page-container">
        {/* BATCH JOURNEY */}
        <section className="card journey-card">
          <div className="section-title-row">
            <h2>Batch Journey</h2>
            <Link to={`/aggregator/batch-assessment/${batchId || data.currentBatch.id}`} className="details-button">
              Click for Details
            </Link>
          </div>
          <div className="journey-scroll-wrap">
            <div className="journey">
              <div className="journey-line"></div>
              {data.journey.map((step, index) => (
                <div className={`journey-step ${step.cssClass}`} key={index}>
                  <div className="journey-circle">{step.step}</div>
                  <h3>{step.title}</h3>
                  <p>Cond: {step.score}</p>
                  <span className={`status-tag ${step.tagClass}`}>{step.statusText}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHART ROW */}
        <div className="charts-grid">
          {/* DETERIORATION TRAJECTORY */}
          <section className="card chart-card">
            <div className="section-title-row">
              <h2>Deterioration Trajectory</h2>
              <div className="legend">
                <span className="legend-item"><span className="legend-line actual"></span>Actual</span>
                <span className="legend-item"><span className="legend-line projected"></span>Projected</span>
              </div>
            </div>
            <div className="trajectory-chart">
              <svg viewBox="0 0 600 320" preserveAspectRatio="none" className="chart-svg">
                <line x1="40" y1="60" x2="570" y2="60" className="grid-line"/>
                <line x1="40" y1="140" x2="570" y2="140" className="grid-line"/>
                <line x1="40" y1="220" x2="570" y2="220" className="grid-line"/>
                <polyline points="45,62 190,82 325,145" className="actual-path" />
                <polyline points="325,145 455,205 570,250" className="projected-path" />
                <circle cx="45" cy="62" r="6" className="actual-point"/>
                <circle cx="190" cy="82" r="6" className="actual-point"/>
                <circle cx="325" cy="145" r="8" className="current-point"/>
                <circle cx="455" cy="205" r="6" className="projected-point"/>
                <circle cx="570" cy="250" r="6" className="projected-point"/>
              </svg>
              {data.trajectory.values.map((val, index) => (
                <span className={`chart-value value-${index + 1}`} key={index}>{val}</span>
              ))}
              <div className="x-axis">
                <span>Day 1</span><span>Day 2</span><strong>Day 3</strong><span>Day 4</span><span>Day 5</span>
              </div>
            </div>
            <div className="trajectory-message">
              <span className="trend-icon">⌁</span>
              <span>{data.trajectory.message}</span>
            </div>
          </section>

          {/* SENSOR TRENDS */}
          <section className="card chart-card sensor-card">
            <h2>Sensor Trends</h2>
            <div className="sensor-tabs">
              <button className={`sensor-tab ${activeTab === 'Temperature' ? 'active' : ''}`} onClick={() => setActiveTab('Temperature')}>
                Temperature
              </button>
              <button className={`sensor-tab ${activeTab === 'Humidity' ? 'active' : ''}`} onClick={() => setActiveTab('Humidity')}>
                Humidity
              </button>
              <button className={`sensor-tab ${activeTab === 'VOC / Gas' ? 'active' : ''}`} onClick={() => setActiveTab('VOC / Gas')}>
                VOC / Gas
              </button>
            </div>
            <div className="sensor-chart">
              <svg viewBox="0 0 600 300" preserveAspectRatio="none" className="chart-svg">
                <line x1="20" y1="80" x2="580" y2="80" className="grid-line"/>
                <line x1="20" y1="150" x2="580" y2="150" className="grid-line"/>
                <line x1="20" y1="220" x2="580" y2="220" className="grid-line"/>
                {activeTab === 'Temperature' && (
                  <path d="M 20 175 C 90 180, 140 175, 200 155 C 260 140, 320 105, 390 85 C 455 70, 520 90, 580 165" className="temperature-path" />
                )}
                {activeTab === 'Humidity' && (
                  <path d="M 20 120 C 100 140, 200 110, 300 130 C 400 150, 500 100, 580 115" stroke="#23804e" strokeWidth="3" fill="none" strokeLinecap="round" />
                )}
                {activeTab === 'VOC / Gas' && (
                  <path d="M 20 200 C 120 190, 220 210, 340 160 C 420 130, 510 110, 580 95" stroke="#a45b00" strokeWidth="3" fill="none" strokeLinecap="round" />
                )}
              </svg>
              <div className="peak-label">
                {activeTab === 'Temperature' && `Peak: ${data.sensorReadings.temperature.peak}`}
                {activeTab === 'Humidity' && `Peak: ${data.sensorReadings.humidity.peak}`}
                {activeTab === 'VOC / Gas' && `Peak: ${data.sensorReadings.voc.peak}`}
              </div>
              <div className="sensor-x-axis">
                <span>Day 1</span><span>Day 2</span><span>Day 3</span>
              </div>
            </div>
          </section>
        </div>

        {/* BOTTOM ROW */}
        <div className="bottom-grid">
          {/* PREVIOUS BATCH HISTORY */}
          <section className="card previous-history">
            <h2>Previous Batch History</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>BATCH ID</th>
                    <th>PRODUCE</th>
                    <th>LAST MONITORED</th>
                    <th>NAVYA SCORE</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.previousBatches.map((batch, index) => (
                    <tr key={index}>
                      <td>{batch.id}</td>
                      <td>{batch.type}</td>
                      <td>{batch.lastMonitored}</td>
                      <td className="score">{batch.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* BATCH COMPARISON */}
          <section className="card comparison-card">
            <h2>Batch Comparison</h2>
            <div className="comparison-controls">
              <select defaultValue={`${data.currentBatch.id} (Current)`}>
                <option value={`${data.currentBatch.id} (Current)`}>{data.currentBatch.id} (Current)</option>
                {dashboardData.previousBatches.map((batch, index) => (
                  <option value={batch.id} key={index}>{batch.id}</option>
                ))}
              </select>
              <span className="vs">vs</span>
              <select defaultValue={dashboardData.comparison.compareId}>
                {dashboardData.previousBatches.map((batch, index) => (
                  <option value={batch.id} key={index}>{batch.id}</option>
                ))}
              </select>
            </div>
            <div className="comparison-results">
              <div className="comparison-side">
                <span>Day 3 Cond.</span><strong>{dashboardData.comparison.currentScore}</strong><small>{data.currentBatch.id}</small>
              </div>
              <div className="comparison-icon">⇆</div>
              <div className="comparison-side">
                <span>Day 3 Cond.</span><strong>{dashboardData.comparison.compareScore}</strong><small>{dashboardData.comparison.compareId}</small>
              </div>
            </div>
            <div className="warning-box">
              <span className="warning-icon">⚠</span>
              <span>{dashboardData.comparison.warning}</span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BatchHistory;
