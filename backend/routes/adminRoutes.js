const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');
const {
  approveRide,
  rejectRide,
  getAnalytics,
  getRidesByFilter
} = require('../controllers/adminController');

router.get('/rides', auth, isAdmin, getRidesByFilter);
router.patch('/rides/:id/approve', auth, isAdmin, approveRide);
router.patch('/rides/:id/reject', auth, isAdmin, rejectRide);
router.get('/analytics/rides', auth, isAdmin, getAnalytics);

module.exports = router;
