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
    
    // Generate unique batch ID
    const batchIdStr = `${produceType.substring(0,3).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const batch = await Batch.create({
      batchId: batchIdStr,
      farmer: req.user.userId,
      produceType,
      variety,
      quantity: parseFloat(quantity),
      harvestDate: new Date(harvestDate),
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
