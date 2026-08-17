import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import LandingPage from './pages/common/LandingPage';
import LoginPage from './pages/common/LoginPage';
import RegisterPage from './pages/common/RegisterPage';

import FarmerDashboard from './pages/farmer/FarmerDashboard';
import RegisterBatch from './pages/farmer/RegisterBatch';
import BatchCreated from './pages/farmer/BatchCreated';
import FarmerScanBatch from './pages/farmer/FarmerScanBatch';

import AggregatorDashboard from './pages/aggregator/AggregatorDashboard';
import AggregatorScanBatch from './pages/aggregator/AggregatorScanBatch';
import BatchAssessment from './pages/aggregator/BatchAssessment';
import BatchHistory from './pages/aggregator/BatchHistory';

import QualityPassport from './pages/public/QualityPassport';

// In a real app, you would use auth context to protect these routes.
// For now, we will assume standard routing.
function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Farmer Routes */}
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/register-batch" element={<RegisterBatch />} />
        <Route path="/farmer/batch-created/:batchId" element={<BatchCreated />} />
        <Route path="/farmer/scan-batch" element={<FarmerScanBatch />} />

        {/* Aggregator Routes */}
        <Route path="/aggregator/dashboard" element={<AggregatorDashboard />} />
        <Route path="/aggregator/scan-batch" element={<AggregatorScanBatch />} />
        <Route path="/aggregator/batch-assessment/:batchId" element={<BatchAssessment />} />
        <Route path="/aggregator/batch-history/:batchId" element={<BatchHistory />} />

        {/* Public Routes */}
        <Route path="/quality-passport/:batchId" element={<QualityPassport />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
