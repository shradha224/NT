const mongoose = require('mongoose');
const Batch = require('../models/Batch');
const User = require('../models/User');
const QualityAssessment = require('../models/QualityAssessment');
const SensorReading = require('../models/SensorReading');
const Device = require('../models/Device');
const MonitoringSession = require('../models/MonitoringSession');
const { systemLogger } = require('../utils/logger');

const CLOUD_API_URL = process.env.CLOUD_API_URL || 'https://cloud-api.example.com/sync';
const CLOUD_API_KEY = process.env.CLOUD_API_KEY || 'default-key';

class SyncManager {
  static async pullFromCloud() {
    try {
      systemLogger.info('Checking cloud for any new updates...');
      
      // In a real scenario:
      // 1. Fetch last known sync timestamp from a local settings document.
      // 2. Fetch from cloud: /sync/pull?since=<timestamp>
      // 3. Process records with Conflict Resolution (Last-Write-Wins based on updatedAt).
      // Example:
      // const updates = await fetch(`${CLOUD_API_URL}/pull?since=${lastSyncTime}`).then(r => r.json());
      // for (const cloudRecord of updates.batches) {
      //   const localRecord = await Batch.findById(cloudRecord._id);
      //   if (!localRecord || new Date(cloudRecord.updatedAt) > new Date(localRecord.updatedAt)) {
      //     await Batch.findByIdAndUpdate(cloudRecord._id, { ...cloudRecord, syncStatus: 'SYNCED', lastCloudSync: new Date() }, { upsert: true });
      //   }
      // }
      
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 500));
      systemLogger.info('Cloud pull completed.');
    } catch (error) {
      systemLogger.error(`Cloud pull failed: ${error.message}`);
      throw error; // If pull fails, we shouldn't push to avoid immediate overwrites
    }
  }

  static async pushToCloud() {
    let cloudDb = null;
    try {
      if (!process.env.CLOUD_MONGO_URI) {
        systemLogger.warn('CLOUD_MONGO_URI is not set. Aborting sync.');
        return;
      }
      
      systemLogger.info('Syncing local data back up to the cloud...');
      cloudDb = await mongoose.createConnection(process.env.CLOUD_MONGO_URI).asPromise();
      
      const BATCH_LIMIT = 500; // Prevent payload overload
      const models = [Batch, User, QualityAssessment, SensorReading, Device, MonitoringSession];
      
      let totalPushed = 0;

      for (const Model of models) {
        const CloudModel = cloudDb.model(Model.modelName, Model.schema);
        let hasMore = true;
        
        while (hasMore) {
          const pendingRecords = await Model.find({ syncStatus: 'PENDING' }).limit(BATCH_LIMIT);
          
          if (pendingRecords.length === 0) {
            hasMore = false;
            break;
          }

          const bulkOps = pendingRecords.map(doc => {
            const obj = doc.toObject();
            obj.syncStatus = 'SYNCED';
            obj.lastCloudSync = new Date();
            return {
              updateOne: {
                filter: { _id: doc._id },
                update: { $set: obj },
                upsert: true
              }
            };
          });

          if (bulkOps.length > 0) {
            await CloudModel.bulkWrite(bulkOps);
          }

          const ids = pendingRecords.map(r => r._id);
          const now = new Date();
          await Model.updateMany({ _id: { $in: ids } }, { $set: { syncStatus: 'SYNCED', lastCloudSync: now } });
          
          await Model.deleteMany({ _id: { $in: ids }, isDeleted: true });

          totalPushed += pendingRecords.length;
          
          if (pendingRecords.length < BATCH_LIMIT) {
            hasMore = false;
          }
        }
      }

      systemLogger.info(`Push completed. Successfully synced ${totalPushed} records.`);
    } catch (error) {
      systemLogger.error(`Push failed: ${error.message}`);
    } finally {
      if (cloudDb) {
        await cloudDb.close();
      }
    }
  }

  static async syncCycle() {
    try {
      await this.pullFromCloud();
      await this.pushToCloud();
    } catch (error) {
      systemLogger.error('Sync cycle aborted due to errors.');
    }
  }

  static startSyncLoop(intervalMs = 60000) {
    setInterval(() => this.syncCycle(), intervalMs);
    systemLogger.info(`SyncManager started two-way sync loop with interval ${intervalMs}ms`);
  }
}

module.exports = SyncManager;
