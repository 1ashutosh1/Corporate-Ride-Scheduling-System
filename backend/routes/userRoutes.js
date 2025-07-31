const express = require('express');
const router = express.Router();

const { register } = require('../controllers/userController');

// Route for user registration
router.post('/register', register); 

module.exports = router;