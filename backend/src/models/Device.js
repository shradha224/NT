const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, unique: true, required: true },
  aggregator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['ONLINE', 'WARNING', 'OFFLINE', 'ERROR'], required: true },
  cameraStatus: { type: String },
  tempStatus: { type: String },
  humidityStatus: { type: String },
  vocStatus: { type: String },
  lastSeen: { type: Date },
  sensorReadings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SensorReading' }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MonitoringSession' }],
  syncStatus: { type: String, enum: ['PENDING', 'SYNCED'], default: 'PENDING' },
  isDeleted: { type: Boolean, default: false },
  lastCloudSync: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);
