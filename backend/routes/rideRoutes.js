const express = require("express");
const auth = require("../middleware/auth");
const { bookRide, getUserRides, getRideDetails, cancelRide } = require("../controllers/rideController");
const router = express.Router();

router.post('/bookRide', auth, bookRide);
router.get('/getUserRides', auth, getUserRides);
router.get('/getRideDetails/:id', auth, getRideDetails);
router.delete('/cancelRide/:id', auth, cancelRide);

module.exports = router;
