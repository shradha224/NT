const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const { wakeLocalMongo } = require('./utils/mongoWaker');

// Wrap initialization in an async IIFE to support await
(async () => {
  // 1. Wake up local MongoDB if not running
  await wakeLocalMongo();

  // 2. Override MONGO_URI to enforce Local Edge Node usage (localhost)
  // Optional: only override if an EDGE_NODE env var is set, but we'll force it for now.
  process.env.MONGO_URI = process.env.LOCAL_MONGO_URI || 'mongodb://127.0.0.1:27017/agri-iot';

  // 3. Connect to MongoDB
  await connectDB();

const authRoutes = require('./routes/auth');
const farmerRoutes = require('./routes/farmers');
const aggregatorRoutes = require('./routes/aggregators');
const publicRoutes = require('./routes/public');
const syncRoutes = require('./routes/sync');

const app = express();

const { systemLogger } = require('./utils/logger');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/aggregators', aggregatorRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/sync', syncRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  systemLogger.error(`Unhandled Error: ${err.message}`, { stack: err.stack });
  res.status(500).json({ error: 'Internal Server Error' });
});

const SyncManager = require('./services/syncManager');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  systemLogger.info(`Server running on port ${PORT}`);
  // Start the background sync loop for local edge server (every 12 hours)
  SyncManager.startSyncLoop(43200000);
});
})();
