const express = require("express");
const auth = require("../middleware/auth");
const { bookRide, getUserRides } = require("../controllers/rideController");
const router = express.Router();

router.post('/bookRide', auth, bookRide);
router.get('/getUserRides', auth, getUserRides);

module.exports = router;
