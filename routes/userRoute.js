const {authenticateUser, registerUser, getUserProfile, updateUserProfile} = require('../controllers/userController');
const protect = require('../middleware/auth');
const express = require('express');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authenticateUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

module.exports = router;