const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device', required: true },
  timestamp: { type: Date, required: true },
  temperature: { type: Number },
  humidity: { type: Number },
  voc: { type: Number },
  syncStatus: { type: String, enum: ['PENDING', 'SYNCED'], required: true },
  isDeleted: { type: Boolean, default: false },
  lastCloudSync: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('SensorReading', sensorReadingSchema);
