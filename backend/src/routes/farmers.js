const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/authMiddleware');

router.use(authenticate);
router.use(requireRole('FARMER'));

// Register a new batch
router.post('/batches', async (req, res) => {
  try {
    const { produceType, variety, quantity, harvestDate, origin } = req.body;
    
    // Generate unique batch ID
    const batchIdStr = `${produceType.substring(0,3).toUpperCase()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const batch = await req.prisma.batch.create({
      data: {
        batchId: batchIdStr,
        farmerId: req.user.userId,
        produceType,
        variety,
        quantity: parseFloat(quantity),
        harvestDate: new Date(harvestDate),
        origin,
        status: 'CREATED'
      }
    });

    res.status(201).json({ batch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register batch' });
  }
});

// Get farmer's batches
router.get('/batches', async (req, res) => {
  try {
    const batches = await req.prisma.batch.findMany({
      where: { farmerId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ batches });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch batches' });
  }
});

module.exports = router;
