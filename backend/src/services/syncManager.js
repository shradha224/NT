const mongoose = require('mongoose');
const Batch = require('../models/Batch');
const User = require('../models/User');
const Device = require('../models/Device');
const MonitoringSession = require('../models/MonitoringSession');
const { systemLogger } = require('../utils/logger');

const CLOUD_API_URL = process.env.CLOUD_API_URL || 'http://localhost:5000/api';
const CLOUD_API_KEY = process.env.CLOUD_API_KEY || 'DEV_MOCK_KEY';

class SyncManager {
  static async pullFromCloud() {
    try {
      systemLogger.info('Checking cloud for any new updates...');
      
      const response = await fetch(`${CLOUD_API_URL}/sync/pull`, {
        headers: { 'Authorization': `Bearer ${CLOUD_API_KEY}` }
      });
      
      if (!response.ok) {
        throw new Error(`Cloud API responded with status ${response.status}`);
      }

      const updates = await response.json();
      const modelsMap = {
        'Batch': Batch,
        'User': User,
        'Device': Device,
        'MonitoringSession': MonitoringSession
      };

      let totalPulled = 0;

      for (const [modelName, records] of Object.entries(updates)) {
        const Model = modelsMap[modelName];
        if (!Model || !records || records.length === 0) continue;

        for (const cloudRecord of records) {
          const localRecord = await Model.findById(cloudRecord._id);
          
          if (!localRecord || new Date(cloudRecord.updatedAt) > new Date(localRecord.updatedAt)) {
            const updatePayload = { ...cloudRecord, syncStatus: 'SYNCED', lastCloudSync: new Date() };
            delete updatePayload._id; 

            await Model.findByIdAndUpdate(cloudRecord._id, updatePayload, { upsert: true, new: true, runValidators: false });
            totalPulled++;
          }
        }
      }
      
      systemLogger.info(`Cloud pull completed. Synced ${totalPulled} records to local.`);
    } catch (error) {
      systemLogger.error(`Cloud pull failed: ${error.message}`);
      throw error;
    }
  }

  static async pushToCloud() {
    try {
      systemLogger.info('Syncing local data back up to the cloud...');
      
      const BATCH_LIMIT = 100;
      const modelsMap = {
        'Batch': Batch,
        'User': User,
        'Device': Device,
        'MonitoringSession': MonitoringSession
      };
      
      let totalPushed = 0;

      for (const [modelName, Model] of Object.entries(modelsMap)) {
        let hasMore = true;
        
        while (hasMore) {
          const pendingRecords = await Model.find({ syncStatus: 'PENDING' }).limit(BATCH_LIMIT);
          
          if (pendingRecords.length === 0) {
            hasMore = false;
            break;
          }

          const response = await fetch(`${CLOUD_API_URL}/sync/push`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${CLOUD_API_KEY}` 
            },
            body: JSON.stringify({
              modelName,
              records: pendingRecords
            })
          });

          if (!response.ok) {
            throw new Error(`Cloud API responded with status ${response.status}`);
          }

          const ids = pendingRecords.map(r => r._id);
          const now = new Date();
          
          await Model.updateMany({ _id: { $in: ids } }, { $set: { syncStatus: 'SYNCED', lastCloudSync: now } });

          totalPushed += pendingRecords.length;
          
          if (pendingRecords.length < BATCH_LIMIT) {
            hasMore = false;
          }
        }
      }

      systemLogger.info(`Push completed. Successfully pushed ${totalPushed} records via API.`);
    } catch (error) {
      systemLogger.error(`Push failed: ${error.message}`);
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
    systemLogger.info(`SyncManager started HTTP two-way sync loop with interval ${intervalMs}ms`);
  }
}

module.exports = SyncManager;
