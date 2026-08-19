const mongoose = require('mongoose');

const qualityAssessmentSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  assessor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conditionScore: { type: Number, required: true },
  spoilageRisk: { type: String, required: true },
  shelfLife: { type: String, required: true },
  visualAssessment: { type: String },
  environmentalData: { type: String },
  aiAssessment: { type: String },
  recommendation: { type: String },
  imageUrl: { type: String },
  syncStatus: { type: String, enum: ['PENDING', 'SYNCED'], required: true },
  isDeleted: { type: Boolean, default: false },
  lastCloudSync: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('QualityAssessment', qualityAssessmentSchema);
