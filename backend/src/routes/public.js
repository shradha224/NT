const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const { systemLogger } = require('../utils/logger');

// Public quality passport endpoint
router.get('/batches/:batchId/passport', async (req, res) => {
  try {
    const { batchId } = req.params;
    
    const batch = await Batch.findOne({ batchId, isDeleted: { $ne: true } }).populate({
      path: 'assessments',
      options: { sort: { createdAt: -1 }, limit: 1 }
    });

    if (!batch) {
      systemLogger.warn(`Public lookup failed for non-existent batch: ${batchId}`);
      return res.status(404).json({ error: 'Batch not found' });
    }

    systemLogger.info(`Public passport lookup for BatchID: ${batchId}`);

    // Only return public-facing data
    const publicData = {
      batchId: batch.batchId,
      produceType: batch.produceType,
      variety: batch.variety,
      harvestDate: batch.harvestDate,
      origin: batch.origin,
      status: batch.status,
      latestAssessment: batch.assessments[0] ? {
        conditionScore: batch.assessments[0].conditionScore,
        spoilageRisk: batch.assessments[0].spoilageRisk,
        shelfLife: batch.assessments[0].shelfLife,
        visualAssessment: batch.assessments[0].visualAssessment
      } : null
    };

    res.json({ passport: publicData });
  } catch (error) {
    systemLogger.error(`Error during public passport lookup for batch ${req.params.batchId}: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch quality passport' });
  }
});

module.exports = router;
