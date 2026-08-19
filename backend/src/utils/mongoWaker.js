const fs = require('fs');
const path = require('path');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { systemLogger } = require('./logger');

let mongodServer = null;

const wakeLocalMongo = async () => {
  // Create a local data directory inside the backend folder for the edge server
  const dbPath = path.join(__dirname, '../../.mongo_data');
  
  if (!fs.existsSync(dbPath)) {
    systemLogger.info(`Creating local MongoDB data directory at ${dbPath}`);
    fs.mkdirSync(dbPath, { recursive: true });
  }

  systemLogger.info('Attempting to start embedded MongoDB (MongoMemoryServer)...');

  try {
    mongodServer = await MongoMemoryServer.create({
      instance: {
        dbPath: dbPath,
        port: 27017,
        storageEngine: 'wiredTiger',
      }
    });

    const uri = mongodServer.getUri();
    systemLogger.info(`Embedded MongoDB started successfully at ${uri}`);
    return uri;
  } catch (err) {
    if (err.message.includes('Port 27017 is already in use') || err.message.includes('EADDRINUSE')) {
      systemLogger.warn('Port 27017 is already in use, assuming an external MongoDB is already running locally.');
      return 'mongodb://127.0.0.1:27017/';
    } else if (err.message.includes('DBPathInUse') || err.message.includes('Unexpected non-whitespace character after JSON')) {
      systemLogger.error('Oops! The database is locked because another instance of Navya is already running in the background. Please close the other terminal and try again!');
      process.exit(1);
    } else {
      systemLogger.error(`Failed to start embedded MongoDB: ${err.message}`);
      throw err;
    }
  }
};

const stopLocalMongo = async () => {
  if (mongodServer) {
    systemLogger.info('Stopping embedded MongoDB gracefully...');
    // doCleanup: false ensures the local db directory isn't wiped
    await mongodServer.stop({ doCleanup: false });
    systemLogger.info('Embedded MongoDB stopped.');
  }
};

module.exports = { wakeLocalMongo, stopLocalMongo };
