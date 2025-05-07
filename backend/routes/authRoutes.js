const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile); // 👈 Update route
router.delete('/profile', protect, deleteProfile); // 👈 Delete route

module.exports = router;
