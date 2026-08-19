const mongoose = require('mongoose');
const User = require('./backend/src/models/User');
require('dotenv').config({ path: './backend/.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/navya')
  .then(async () => {
    const users = await User.find({});
    console.log(users);
    process.exit(0);
  });
