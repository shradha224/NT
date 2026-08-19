const { createLogger, format, transports } = require('winston');
const { combine, printf, errors } = format;
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Custom format for Indian Standard Time
const istTimestampFormat = format((info) => {
  info.timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  return info;
});

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
});

const consoleFormat = printf(({ level, message, timestamp }) => {
  let emoji = 'ℹ️';
  if (level === 'warn') emoji = '⚠️';
  if (level === 'error') emoji = '❌';
  if (message.includes('successfully') || message.includes('Connected')) emoji = '✅';
  return `[${timestamp}] ${emoji} ${message}`;
});

const createDomainLogger = (filename) => {
  return createLogger({
    level: 'info',
    transports: [
      new transports.File({ 
        filename: path.join(logDir, filename),
        format: combine(istTimestampFormat(), errors({ stack: true }), myFormat)
      }),
      new transports.Console({
        format: combine(istTimestampFormat(), consoleFormat)
      })
    ]
  });
};

const authLogger = createDomainLogger('auth.log');
const batchLogger = createDomainLogger('batch.log');
const systemLogger = createDomainLogger('system.log');

module.exports = {
  authLogger,
  batchLogger,
  systemLogger
};
