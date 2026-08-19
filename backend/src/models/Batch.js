const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchId: { type: String, unique: true, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  produceType: { type: String, required: true },
  variety: { type: String, required: true },
  quantity: { type: Number, required: true },
  harvestDate: { type: Date, required: true },
  origin: { type: String, required: true },
  status: { type: String, enum: ['CREATED', 'MONITORING_PENDING', 'MONITORED', 'IN_TRANSIT', 'DISTRIBUTED', 'COMPLETED'], required: true },
  assessments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QualityAssessment' }],
  sensorReadings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorReading' }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MonitoringSession' }],
  syncStatus: { type: String, enum: ['PENDING', 'SYNCED'], default: 'PENDING' },
  isDeleted: { type: Boolean, default: false },
  lastCloudSync: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);
