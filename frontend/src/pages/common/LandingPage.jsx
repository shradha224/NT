import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';

const LandingPage = () => {
  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="navbar">
        <div className="logo">
          <svg
            className="logo-icon"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2 25.8C16.2 18.7 18.8 11.9 25.6 7.1C27.2 12.7 25.7 18.3 21.4 22.2C19.7 23.8 17.9 24.9 16.2 25.8Z"
              fill="currentColor"
            />
            <path
              d="M15.2 25.8C14.7 19.5 11.1 14.4 5.2 11.5C4.3 17.4 6.8 22.4 11.4 24.5C12.7 25.1 14 25.5 15.2 25.8Z"
              fill="currentColor"
            />
            <path
              d="M15.7 26.5V17.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span>Navya</span>
        </div>

        <nav className="nav-links">
          <a href="#solutions">Solutions</a>
          <a href="#technology">Technology</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="login-link">Log In</Link>
          <a href="#" className="get-started-nav">Get Started</a>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="hero-glow glow-left"></div>
          <div className="hero-glow glow-right"></div>

          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">◉</span>
              Intelligent Post-Harvest Analysis
            </div>

            <h1>
              Smarter Post-Harvest<br />
              Quality Monitoring
            </h1>

            <p className="hero-description">
              Monitor produce conditions, understand quality, predict spoilage
              risk, and make better decisions with intelligent sensing and AI.
            </p>

            <div className="hero-buttons">
              <a href="#" className="primary-button">
                Get Started
              </a>
              <a href="#workflow" className="secondary-button">
                How It Works
              </a>
            </div>
          </div>
        </section>

        {/* ================= WORKFLOW ================= */}
        <section className="workflow-section" id="workflow">
          <div className="section-heading">
            <h2>The Navya Workflow</h2>
            <p>A seamless journey from harvest to insight.</p>
          </div>

          <div className="workflow-grid">
            {/* STEP 1 */}
            <div className="workflow-card step-one">
              <div className="workflow-icon">🚜</div>
              <div className="step-label">STEP 1</div>
              <h3>Produce Intake</h3>
              <p>Raw goods enter the facility for initial assessment and baseline assessment.</p>
            </div>

            {/* STEP 2 */}
            <div className="workflow-card step-two">
              <div className="workflow-icon orange-icon">◉</div>
              <div className="step-label">STEP 2</div>
              <h3>Sensor Fusion</h3>
              <p>Cameras and environmental sensors capture detailed physical and atmospheric data.</p>
              <div className="orange-corner"></div>
            </div>

            {/* STEP 3 */}
            <div className="workflow-card step-three">
              <div className="workflow-icon dark-icon">✦</div>
              <div className="step-label">STEP 3</div>
              <h3>AI Analysis</h3>
              <p>Machine learning models process vast data points to detect subtle anomalies.</p>
            </div>

            {/* STEP 4 */}
            <div className="workflow-card step-four">
              <div className="workflow-icon">☑</div>
              <div className="quality-progress">
                <div className="progress-track">
                  <div className="progress-fill"></div>
                </div>
                <span>85% Quality Score</span>
              </div>
              <div className="step-label">STEP 4</div>
              <h3>Quality Assessment</h3>
              <p>Comprehensive scoring based on size, color, blemish detection, and firmness estimates.</p>
            </div>

            {/* STEP 5 */}
            <div className="workflow-card step-five">
              <div className="workflow-icon">✣</div>
              <div className="step-label">STEP 5</div>
              <h3>Actionable Insight</h3>
              <p>Predictive spoilage alerts and routing recommendations to minimize waste and maximize value.</p>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="features-section" id="solutions">
          <div className="features-grid">
            {/* MONITOR */}
            <article className="feature-card">
              <div className="feature-icon temperature-icon">L</div>
              <h3>Monitor</h3>
              <div className="feature-divider"></div>
              <p>
                Continuously track environmental conditions including temperature,
                humidity, and ethylene gas levels in real-time to ensure optimal
                storage environments.
              </p>
            </article>

            {/* ANALYZE */}
            <article className="feature-card">
              <div className="feature-icon analyze-icon">▦</div>
              <h3>Analyze</h3>
              <div className="feature-divider"></div>
              <p>
                Our AI seamlessly combines visual imagery with environmental sensor
                data, creating a holistic profile of produce health over time.
              </p>
            </article>

            {/* DECIDE */}
            <article className="feature-card">
              <div className="feature-icon decide-icon">⌘</div>
              <h3>Decide</h3>
              <div className="feature-divider"></div>
              <p>
                Accurately evaluate current quality and predict spoilage risk
                windows, empowering precise decision-making for inventory management.
              </p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
