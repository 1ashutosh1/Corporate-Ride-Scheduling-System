const express = require("express");
const auth = require("../middleware/auth");
const { bookRide, getUserRides, getRideDetails } = require("../controllers/rideController");
const router = express.Router();

router.post('/bookRide', auth, bookRide);
router.get('/getUserRides', auth, getUserRides);
router.get('/getRideDetails/:id', auth, getRideDetails);

module.exports = router;
