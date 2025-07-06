const { rides, users } = require('../data/mockData');
const Ride = require('../models/ride');

const requestRide = (req, res) => {
  const { passengerId, pickup, drop, rideType } = req.body;

  if (!passengerId || !pickup || !drop || !rideType) {
    return res.status(400).json({ message: 'Missing required ride details' });
  }

  const user = users.find(u => u.id === passengerId && u.type === 'passenger');
  if (!user) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  const activeRide = rides.find(r =>
    r.passengerId === passengerId &&
    ['Requested', 'Accepted', 'InProgress'].includes(r.status)
  );

  if (activeRide) {
    return res.status(400).json({ message: 'You already have a ride in progress' });
  }

  const rideId = rides.length + 1;
  const newRide = new Ride(rideId, passengerId, pickup, drop, rideType);
  rides.push(newRide);

  res.status(201).json({
    message: 'Ride requested successfully',
    ride: newRide
  });
};

const getRideStatus = (req, res) => {
  const rideId = parseInt(req.params.rideId);

  const ride = rides.find(r => r.id === rideId);
  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  res.status(200).json({
    rideId: ride.id,
    status: ride.status
  });
};

const getRideHistory = (req, res) => {
  const passengerId = parseInt(req.params.passengerId);

  const user = users.find(u => u.id === passengerId && u.type === 'passenger');
  if (!user) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  const history = rides.filter(r => r.passengerId === passengerId);

  res.status(200).json({ rides: history });
};

const acceptRide = (req, res) => {
  const rideId = parseInt(req.params.rideId);
  const { driverId } = req.body;

  const driver = users.find(u => u.id === driverId && u.type === 'driver');
  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  const ride = rides.find(r => r.id === rideId);
  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  if (ride.status !== 'Requested') {
    return res.status(400).json({ message: 'Ride is not available for acceptance' });
  }

  ride.driverId = driverId;
  ride.status = 'Accepted';

  res.status(200).json({
    message: 'Ride accepted successfully',
    ride
  });
};

const rejectRide = (req, res) => {
  const rideId = parseInt(req.params.rideId);
  const { driverId } = req.body;

  const driver = users.find(u => u.id === driverId && u.type === 'driver');
  if (!driver) {
    return res.status(404).json({ message: 'Driver not found' });
  }

  const ride = rides.find(r => r.id === rideId);
  if (!ride) {
    return res.status(404).json({ message: 'Ride not found' });
  }

  if (ride.status !== 'Requested') {
    return res.status(400).json({ message: 'Ride is not available for rejection' });
  }

  ride.status = 'Rejected';

  res.status(200).json({
    message: 'Ride rejected',
    ride
  });
};

const startRide = (req, res) => {
  const rideId = parseInt(req.params.rideId);
  const { driverId } = req.body;

  const ride = rides.find(r => r.id === rideId);
  if (!ride) return res.status(404).json({ message: 'Ride not found' });

  if (ride.driverId !== driverId) {
    return res.status(403).json({ message: 'You are not assigned to this ride' });
  }

  if (ride.status !== 'Accepted') {
    return res.status(400).json({ message: 'Ride cannot be started' });
  }

  ride.status = 'InProgress';
  res.status(200).json({ message: 'Ride started', ride });
};

const completeRide = (req, res) => {
  const rideId = parseInt(req.params.rideId);
  const { driverId } = req.body;

  const ride = rides.find(r => r.id === rideId);
  if (!ride) return res.status(404).json({ message: 'Ride not found' });

  if (ride.driverId !== driverId) {
    return res.status(403).json({ message: 'You are not assigned to this ride' });
  }

  if (ride.status !== 'InProgress') {
    return res.status(400).json({ message: 'Ride cannot be completed' });
  }

  ride.status = 'Completed';
  res.status(200).json({ message: 'Ride completed', ride });
};


module.exports = { requestRide, getRideStatus, getRideHistory, acceptRide, rejectRide, startRide, completeRide };
