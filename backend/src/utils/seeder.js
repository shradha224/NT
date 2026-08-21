const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { systemLogger } = require('./logger');

/**
 * Seeds a default demo user on first startup so login works out-of-the-box.
 * Only creates the user if the database is empty (fresh clone).
 */
const seedDefaultUsers = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      systemLogger.info(`Database already has ${userCount} users. Skipping seed.`);
      return;
    }

    systemLogger.info('Empty database detected. Seeding default demo users...');

    const passwordHash = await bcrypt.hash('password123', 10);

    const demoUsers = [
      {
        username: 'farmer1',
        email: 'farmer1@navya.com',
        name: 'Farmer One',
        passwordHash,
        role: 'FARMER',
        phone: '9876543210',
        organization: 'Demo Farm',
        location: 'Demo Village'
      },
      {
        username: 'aggregator1',
        email: 'aggregator1@navya.com',
        name: 'Aggregator One',
        passwordHash,
        role: 'AGGREGATOR',
        phone: '9876543211',
        organization: 'Demo Aggregation Center',
        location: 'Demo City'
      }
    ];

    await User.insertMany(demoUsers);
    systemLogger.info('✅ Demo users seeded successfully:');
    systemLogger.info('   Farmer  → farmer1@navya.com / password123');
    systemLogger.info('   Aggregator → aggregator1@navya.com / password123');
  } catch (error) {
    systemLogger.error(`Seeding failed: ${error.message}`);
  }
};

module.exports = { seedDefaultUsers };
