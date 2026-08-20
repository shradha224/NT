const express = require('express');
const router = express.Router();
const SyncManager = require('../services/syncManager');
const { systemLogger } = require('../utils/logger');

// POST /api/sync/manual
// Force a two-way sync cycle immediately
router.post('/manual', async (req, res) => {
  try {
    systemLogger.info('Manual sync triggered by user.');
    await SyncManager.syncCycle();
    res.status(200).json({ 
      success: true, 
      message: 'Synchronization completed successfully.',
      timestamp: new Date()
    });
  } catch (error) {
    systemLogger.error(`Manual sync failed: ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Synchronization failed. Please try again later.'
    });
  }
});

// MOCK CLOUD ENDPOINTS FOR LOCAL TESTING
// In a real environment, these would be hosted on a separate central cloud server.

// POST /api/sync/push - Mock Cloud Endpoint to receive pushed data
router.post('/push', async (req, res) => {
  try {
    // In a real cloud, this would bulkWrite to the central MongoDB
    // For this mock, we just acknowledge receipt to simulate success
    const { modelName, records } = req.body;
    systemLogger.info(`[MOCK CLOUD] Received push for ${records?.length || 0} ${modelName} records.`);
    res.status(200).json({ success: true, message: 'Records securely stored in cloud.' });
  } catch (error) {
    systemLogger.error(`[MOCK CLOUD] Push failed: ${error.message}`);
    res.status(500).json({ success: false });
  }
});

// GET /api/sync/pull - Mock Cloud Endpoint to serve new updates
router.get('/pull', async (req, res) => {
  try {
    // In a real cloud, this would query central MongoDB for records updated since ?since= timestamp
    // For this mock, we pretend there are no new cloud updates to pull right now
    systemLogger.info(`[MOCK CLOUD] Received pull request. Returning no new records.`);
    res.status(200).json({
      Batch: [],
      User: [],
      Device: [],
      MonitoringSession: []
    });
  } catch (error) {
    systemLogger.error(`[MOCK CLOUD] Pull failed: ${error.message}`);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
