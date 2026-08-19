const mongoose = require('mongoose');

const monitoringSessionSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  aggregator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED'], required: true },
  syncStatus: { type: String, enum: ['PENDING', 'SYNCED'], default: 'PENDING' },
  isDeleted: { type: Boolean, default: false },
  lastCloudSync: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('MonitoringSession', monitoringSessionSchema);
