const mongoose = require('mongoose');
const Batch = require('./src/models/Batch');
const SyncManager = require('./src/services/syncManager');
const { wakeLocalMongo } = require('./src/utils/mongoWaker');
const { systemLogger } = require('./src/utils/logger');

async function runTests() {
  try {
    systemLogger.info('--- Starting Sync Tests ---');
    await mongoose.connect('mongodb://127.0.0.1:27017/agri-iot');

    systemLogger.info('1. Creating a new Batch with PENDING status...');
    const batch = new Batch({
      batchId: 'TEST-001',
      farmer: new mongoose.Types.ObjectId(),
      produceType: 'Tomato',
      variety: 'Roma',
      quantity: 100,
      harvestDate: new Date(),
      origin: 'Farm A',
      status: 'CREATED',
      syncStatus: 'PENDING'
    });
    await batch.save();
    systemLogger.info(`Batch created. ID: ${batch._id}`);

    systemLogger.info('2. Running Push Sync...');
    await SyncManager.pushToCloud();

    const syncedBatch = await Batch.findById(batch._id);
    systemLogger.info(`Batch sync status after push: ${syncedBatch.syncStatus}`);
    
    systemLogger.info('3. Testing Soft Delete (Tombstoning)...');
    syncedBatch.isDeleted = true;
    syncedBatch.syncStatus = 'PENDING';
    await syncedBatch.save();
    
    systemLogger.info('4. Running Push Sync for Tombstone...');
    await SyncManager.pushToCloud();

    const purgedBatch = await Batch.findById(batch._id);
    systemLogger.info(`Batch should be null after successful tombstone push: ${purgedBatch === null ? 'SUCCESS (Purged)' : 'FAILED'}`);

    systemLogger.info('--- Sync Tests Completed ---');
    process.exit(0);
  } catch (err) {
    systemLogger.error('Test failed', err);
    process.exit(1);
  }
}

runTests();
