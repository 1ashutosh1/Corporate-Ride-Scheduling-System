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

/**
 * @swagger
 * /admin/rides:
 *   get:
 *     summary: Get rides with optional filters (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, cancelled]
 *         description: Filter rides by status
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filter rides by user ID
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter rides from this date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Filter rides up to this date
 *     responses:
 *       200:
 *         description: List of rides
 *       400:
 *         description: Invalid filter
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/rides', auth, isAdmin, getRidesByFilter);

/**
 * @swagger
 * /admin/rides/{id}/approve:
 *   patch:
 *     summary: Approve a ride (admin only)
 *     tags: [Admin]
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
 *       201:
 *         description: Ride approved
 *       400:
 *         description: Cannot approve ride
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 */
router.patch('/rides/:id/approve', auth, isAdmin, approveRide);

/**
 * @swagger
 * /admin/rides/{id}/reject:
 *   patch:
 *     summary: Reject (cancel) a ride (admin only)
 *     tags: [Admin]
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
 *       201:
 *         description: Ride rejected successfully
 *       400:
 *         description: Cannot reject ride
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Ride not found
 */
router.patch('/rides/:id/reject', auth, isAdmin, rejectRide);

/**
 * @swagger
 * /admin/analytics/rides:
 *   get:
 *     summary: Get ride analytics (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Analytics from this date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Analytics up to this date
 *     responses:
 *       200:
 *         description: Ride analytics data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/analytics/rides', auth, isAdmin, getAnalytics);

module.exports = router;
