const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const Batch = require('../models/Batch');
const { batchLogger } = require('../utils/logger');

router.use(authenticate);
router.use(requireRole('AGGREGATOR'));

// Hardware Device Status (Mock abstraction)
router.get('/devices/status', async (req, res) => {
  // Returns mock status for the dashboard
  res.json({
    status: 'ONLINE',
    camera: 'ONLINE',
    temperature: 'WARNING',
    humidity: 'ONLINE',
    voc: 'ONLINE',
    lastSync: new Date().toISOString()
  });
});

// Get a batch assessment
router.get('/batches/:batchId/assessments', async (req, res) => {
  try {
    const { batchId } = req.params;
    
    const batch = await Batch.findOne({ batchId, isDeleted: { $ne: true } })
      .populate({
        path: 'assessments',
        options: { sort: { createdAt: -1 }, limit: 1 }
      })
      .populate({
        path: 'sensorReadings',
        options: { sort: { timestamp: -1 }, limit: 1 }
      });

    if (!batch) {
      batchLogger.warn(`Aggregator ${req.user.userId} attempted to scan non-existent batch: ${batchId}`);
      return res.status(404).json({ error: 'Batch not found' });
    }

    batchLogger.info(`Batch scanned by Aggregator ${req.user.userId} - BatchID: ${batchId}`);
    res.json({ batch });
  } catch (error) {
    batchLogger.error(`Error scanning batch ${req.params.batchId} by Aggregator ${req.user.userId}: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch batch assessment' });
  }
});

module.exports = router;
