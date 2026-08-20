const mongoose = require('mongoose');

const qualityAssessmentSchema = new mongoose.Schema({
  assessor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  conditionScore: { type: Number, required: true },
  spoilageRisk: { type: String, required: true },
  shelfLife: { type: String, required: true },
  visualAssessment: { type: String },
  environmentalData: { type: String },
  aiAssessment: { type: String },
  recommendation: { type: String },
  imageUrl: { type: String }
}, { _id: true, timestamps: true });

const sensorReadingSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  timestamp: { type: Date, required: true },
  temperature: { type: Number },
  humidity: { type: Number },
  voc: { type: Number }
}, { _id: true });

const batchSchema = new mongoose.Schema({
  batchId: { type: String, unique: true, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produceType: { type: String, required: true },
  variety: { type: String, required: true },
  quantity: { type: Number, required: true },
  harvestDate: { type: Date, required: true },
  origin: { type: String, required: true },
  status: { type: String, enum: ['CREATED', 'MONITORING_PENDING', 'MONITORED', 'IN_TRANSIT', 'DISTRIBUTED', 'COMPLETED'], required: true },
  
  // Embedded Subdocuments (Ponytail Philosophy: Native NoSQL Data locality)
  assessments: [qualityAssessmentSchema],
  sensorReadings: [sensorReadingSchema],
  
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MonitoringSession' }],
  
  syncStatus: { type: String, enum: ['PENDING', 'SYNCED'], default: 'PENDING' },
  isDeleted: { type: Boolean, default: false },
  lastCloudSync: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);
