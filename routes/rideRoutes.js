const express = require('express');
const router = express.Router();
const { requestRide, getRideStatus, getRideHistory, acceptRide, rejectRide} = require('../controllers/rideController');

// POST /api/rides/request
router.post('/request', requestRide);
router.get('/:rideId/status', getRideStatus);
router.get('/history/:passengerId', getRideHistory);
router.post('/:rideId/accept', acceptRide);
router.post('/:rideId/reject', rejectRide);

module.exports = router;
