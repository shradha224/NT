const express = require('express');
const router = express.Router();

// Public quality passport endpoint
router.get('/batches/:batchId/passport', async (req, res) => {
  try {
    const { batchId } = req.params;
    
    const batch = await req.prisma.batch.findUnique({
      where: { batchId },
      include: {
        assessments: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

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
    res.status(500).json({ error: 'Failed to fetch quality passport' });
  }
});

module.exports = router;
