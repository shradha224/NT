const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/authMiddleware');
const Batch = require('../models/Batch');
const { batchLogger } = require('../utils/logger');

router.use(authenticate);
router.use(requireRole('FARMER'));

// Register a new batch
router.post('/batches', async (req, res) => {
  try {
    const { produceType, variety, quantity, harvestDate, origin } = req.body;
    
    // 1. Validate Input to prevent TypeErrors and NaN
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

    // 2. Generate unique batch ID safely
    const crypto = require('crypto');
    const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase(); // 6 chars hex
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
    batchLogger.error(`Batch registration failed for Farmer ${req.user.userId}: ${error.message}`);
    console.error(error);
    res.status(500).json({ error: 'Failed to register batch' });
  }
});

// Get farmer's batches
router.get('/batches', async (req, res) => {
  try {
    const batches = await Batch.find({ farmer: req.user.userId, isDeleted: { $ne: true } }).sort({ createdAt: -1 });
    res.json({ batches });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

// Soft delete a batch
router.delete('/batches/:id', async (req, res) => {
  try {
    const batch = await Batch.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user.userId },
      { $set: { isDeleted: true, syncStatus: 'PENDING' } },
      { new: true }
    );
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found or already deleted' });
    }
    batchLogger.info(`Batch ${req.params.id} soft deleted by Farmer ${req.user.userId}`);
    res.json({ message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete batch' });
  }
});

module.exports = router;
