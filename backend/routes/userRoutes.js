const express = require('express');
const router = express.Router();

const { register, login, getProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');

// Route for user registration
router.post('/register', register); 

router.post('/login', login);

//protected route
router.get('/profile', auth, getProfile);

module.exports = router;