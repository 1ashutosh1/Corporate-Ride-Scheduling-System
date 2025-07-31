const express = require("express");
const auth = require("../middleware/auth");
const { bookRide } = require("../controllers/rideController");
const router = express.Router();

router.post("/bookRide", auth, bookRide);

module.exports = router;
