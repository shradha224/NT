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
import LegalPage from './pages/public/LegalPage';

import ProfilePage from './pages/common/ProfilePage';

// Protected Route component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && role !== allowedRole) {
    // If they have wrong role, send them back home or login
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        {/* Farmer Routes */}
        <Route path="/farmer/dashboard" element={<ProtectedRoute allowedRole="FARMER"><FarmerDashboard /></ProtectedRoute>} />
        <Route path="/farmer/register-batch" element={<ProtectedRoute allowedRole="FARMER"><RegisterBatch /></ProtectedRoute>} />
        <Route path="/farmer/batch-created/:batchId" element={<ProtectedRoute allowedRole="FARMER"><BatchCreated /></ProtectedRoute>} />
        <Route path="/farmer/scan-batch" element={<ProtectedRoute allowedRole="FARMER"><FarmerScanBatch /></ProtectedRoute>} />

        {/* Aggregator Routes */}
        <Route path="/aggregator/dashboard" element={<ProtectedRoute allowedRole="AGGREGATOR"><AggregatorDashboard /></ProtectedRoute>} />
        <Route path="/aggregator/scan-batch" element={<ProtectedRoute allowedRole="AGGREGATOR"><AggregatorScanBatch /></ProtectedRoute>} />
        <Route path="/aggregator/batch-assessment/:batchId" element={<ProtectedRoute allowedRole="AGGREGATOR"><BatchAssessment /></ProtectedRoute>} />
        <Route path="/aggregator/batch-history/:batchId" element={<ProtectedRoute allowedRole="AGGREGATOR"><BatchHistory /></ProtectedRoute>} />

        {/* Public Routes */}
        <Route path="/quality-passport/:batchId" element={<QualityPassport />} />
        <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
        <Route path="/terms-of-service" element={<LegalPage type="terms" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

