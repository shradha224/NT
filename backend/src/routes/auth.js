const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { authLogger } = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { credential, role, username } = req.body;
    
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, we require a role to be passed from the frontend
      if (!role) {
        return res.status(400).json({ error: 'Role is required for new Google users' });
      }
      if (!username) {
        return res.status(400).json({ error: 'Username is required for registration' });
      }
      
      // Check if username is taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
      
      user = await User.create({
        username,
        email,
        name,
        passwordHash: '', // No password for Google auth users
        role: role.toUpperCase()
      });
      authLogger.info(`Google Signup successful for user: ${username} (${email}) - Role: ${role.toUpperCase()}`);
    } else {
      authLogger.info(`Google Login successful for user: ${user.username} (${email})`);
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    authLogger.error(`Google Auth Error for email ${req.body.email || 'unknown'}: ${error.message}`);
    console.error('Google Auth Error:', error);
    res.status(500).json({ error: 'Google authentication failed' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, phone, password, name, role, biometricId, organization, location } = req.body;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    // Check if username is taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      if (username === phone) {
        return res.status(400).json({ error: 'This phone number is already registered. Please log in instead.' });
      }
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Hash password
    const passwordHash = password ? await bcrypt.hash(password, 10) : '';

    const user = await User.create({
      username,
      email,
      phone,
      passwordHash,
      name,
      role,
      biometricId,
      organization,
      location
    });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    authLogger.info(`Normal Signup successful for user: ${username} - Role: ${role}`);
    res.status(201).json({ 
      message: 'User created successfully', 
      token, 
      role: user.role, 
      name: user.name 
    });
  } catch (error) {
    authLogger.error(`Signup Error for username ${req.body.username || 'unknown'}: ${error.message}`);
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

router.get('/check-username', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    
    const userExists = await User.exists({ username });
    res.json({ available: !userExists });
  } catch (error) {
    console.error('Check username error:', error);
    res.status(500).json({ error: 'Failed to check username' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    
    const identifier = email; // The frontend input sends it as 'email'

    const user = await User.findOne({
      $or: [
        { email: identifier || undefined },
        { phone: phone || undefined },
        { username: identifier || undefined }
      ]
    });

    if (!user) {
      authLogger.warn(`Failed login attempt for identifier: ${identifier} (User not found)`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      authLogger.warn(`Failed login attempt for identifier: ${identifier} (Invalid password)`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
    
    authLogger.info(`Normal Login successful for user: ${user.username}`);
    res.json({ token, role: user.role, name: user.name });
  } catch (error) {
    authLogger.error(`Login Error for identifier ${req.body.email || 'unknown'}: ${error.message}`);
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

const { authenticate } = require('../middleware/authMiddleware');

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/me', authenticate, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { name, email, phone, syncStatus: 'PENDING' } },
      { new: true, runValidators: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    authLogger.info(`User ${user.username} updated their profile`);
    res.json(user);
  } catch (error) {
    authLogger.error(`Failed to update profile for ${req.user.userId}: ${error.message}`);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
