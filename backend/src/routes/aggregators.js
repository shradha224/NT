const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/authMiddleware');

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
    
    const batch = await req.prisma.batch.findUnique({
      where: { batchId },
      include: {
        assessments: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        sensorReadings: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    res.json({ batch });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch batch assessment' });
  }
});

module.exports = router;
