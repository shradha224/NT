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

module.exports = router;
