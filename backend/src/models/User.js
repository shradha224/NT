const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, sparse: true },
  phone: { type: String, unique: true, sparse: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['FARMER', 'AGGREGATOR'], required: true },
  biometricId: { type: String },
  organization: { type: String },
  location: { type: String },
  batches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Batch' }],
  syncStatus: { type: String, enum: ['PENDING', 'SYNCED'], default: 'PENDING' },
  isDeleted: { type: Boolean, default: false },
  lastCloudSync: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
