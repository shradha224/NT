const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const Batch = require('../models/Batch');
const { batchLogger, systemLogger } = require('../utils/logger');
const crypto = require('crypto');

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Public quality passport endpoint
router.get('/:batchId/passport', async (req, res) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({ batchId, isDeleted: { $ne: true } });
    if (!batch) {
      systemLogger.warn(`Public lookup failed for non-existent batch: ${batchId}`);
      return res.status(404).json({ error: 'Batch not found' });
    }
    systemLogger.info(`Public passport lookup for BatchID: ${batchId}`);

    // Pick the most recent assessment directly from the embedded array
    const latestAssessment = batch.assessments && batch.assessments.length > 0 
      ? batch.assessments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] 
      : null;

    res.json({
      passport: {
        batchId: batch.batchId,
        produceType: batch.produceType,
        variety: batch.variety,
        harvestDate: batch.harvestDate,
        origin: batch.origin,
        status: batch.status,
        latestAssessment: latestAssessment ? {
          conditionScore: latestAssessment.conditionScore,
          spoilageRisk: latestAssessment.spoilageRisk,
          shelfLife: latestAssessment.shelfLife,
          visualAssessment: latestAssessment.visualAssessment
        } : null
      }
    });
  } catch (error) {
    systemLogger.error(`Error during public passport lookup: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch quality passport' });
  }
});


// ==========================================
// PROTECTED ROUTES (Requires Authentication)
// ==========================================
router.use(authenticate);

// ------------------------------------------
// FARMER SPECIFIC
// ------------------------------------------

// Register a new batch
router.post('/', requireRole('FARMER'), async (req, res) => {
  try {
    const { produceType, variety, quantity, harvestDate, origin } = req.body;
    
    if (!produceType || typeof produceType !== 'string' || produceType.length < 3) {
      return res.status(400).json({ error: 'produceType is required and must be at least 3 characters' });
    }
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ error: 'quantity must be a valid positive number' });
    }
    const parsedDate = new Date(harvestDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'harvestDate must be a valid date' });
    }

    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
    const batchIdStr = `${produceType.substring(0,3).toUpperCase()}-${randomHex}`;
    
    const batch = await Batch.create({
      batchId: batchIdStr,
      farmer: req.user.userId,
      produceType,
      variety,
      quantity: parsedQuantity,
      harvestDate: parsedDate,
      origin,
      status: 'CREATED'
    });

    batchLogger.info(`Batch registered by Farmer ${req.user.userId} - BatchID: ${batchIdStr}`);
    res.status(201).json({ batch });
  } catch (error) {
    batchLogger.error(`Batch registration failed: ${error.message}`);
    res.status(500).json({ error: 'Failed to register batch' });
  }
});

// Get farmer's batches
router.get('/', requireRole('FARMER'), async (req, res) => {
  try {
    const batches = await Batch.find({ farmer: req.user.userId, isDeleted: { $ne: true } }).sort({ createdAt: -1 });
    res.json({ batches });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

// Update batch status
router.patch('/:id/status', requireRole('FARMER'), async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['CREATED', 'MONITORING_PENDING', 'MONITORED', 'IN_TRANSIT', 'DISTRIBUTED', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const batch = await Batch.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user.userId, isDeleted: { $ne: true } },
      { status, syncStatus: 'PENDING' }, // Always flag for sync
      { new: true }
    );

    if (!batch) return res.status(404).json({ error: 'Batch not found' });
    res.json({ message: 'Batch status updated successfully', batch });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update batch status' });
  }
});

// Soft delete a batch
router.delete('/:id', requireRole('FARMER'), async (req, res) => {
  try {
    const batch = await Batch.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user.userId },
      { $set: { isDeleted: true, syncStatus: 'PENDING' } },
      { new: true }
    );
    if (!batch) return res.status(404).json({ error: 'Batch not found' });
    
    batchLogger.info(`Batch ${req.params.id} soft deleted by Farmer`);
    res.json({ message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete batch' });
  }
});

// ------------------------------------------
// AGGREGATOR SPECIFIC
// ------------------------------------------

// Hardware Device Status (Mock abstraction)
router.get('/devices/status', requireRole('AGGREGATOR'), async (req, res) => {
  res.json({
    status: 'ONLINE',
    camera: 'ONLINE',
    temperature: 'WARNING',
    humidity: 'ONLINE',
    voc: 'ONLINE',
    lastSync: new Date().toISOString()
  });
});

// Get a batch assessment (Aggregator View)
router.get('/:batchId/assessments', requireRole('AGGREGATOR'), async (req, res) => {
  try {
    const batch = await Batch.findOne({ batchId: req.params.batchId, isDeleted: { $ne: true } });
    if (!batch) {
      batchLogger.warn(`Aggregator ${req.user.userId} attempted to scan non-existent batch.`);
      return res.status(404).json({ error: 'Batch not found' });
    }

    // Sort embedded arrays
    if (batch.assessments) batch.assessments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (batch.sensorReadings) batch.sensorReadings.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    batchLogger.info(`Batch scanned by Aggregator ${req.user.userId}`);
    res.json({ batch });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch batch assessment' });
  }
});

module.exports = router;
