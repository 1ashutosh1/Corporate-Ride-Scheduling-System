const express = require("express");
const auth = require("../middleware/auth");
const { bookRide, getUserRides, getRideDetails, cancelRide } = require("../controllers/rideController");
const router = express.Router();

/**
 * @swagger
 * /rides/bookRide:
 *   post:
 *     summary: Book a new ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [pickup, dropoff, date]
 *             properties:
 *               pickup:
 *                 type: string
 *               dropoff:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Ride booked successfully
 *       400:
 *         description: Invalid input or date
 *       401:
 *         description: Unauthorized
 */
router.post('/bookRide', auth, bookRide);

/**
 * @swagger
 * /rides/getUserRides:
 *   get:
 *     summary: Get all rides for the logged-in user
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's rides
 *       401:
 *         description: Unauthorized
 */
router.get('/getUserRides', auth, getUserRides);

/**
 * @swagger
 * /rides/getRideDetails/{id}:
 *   get:
 *     summary: Get details of a specific ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride details
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 */
router.get('/getRideDetails/:id', auth, getRideDetails);

/**
 * @swagger
 * /rides/cancelRide/{id}:
 *   delete:
 *     summary: Cancel a ride
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride cancelled successfully
 *       400:
 *         description: Cannot cancel ride (already happened or already cancelled)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ride not found
 */
router.delete('/cancelRide/:id', auth, cancelRide);

module.exports = router;
