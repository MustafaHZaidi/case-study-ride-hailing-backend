const { rides, users } = require('../data/mockData');
const Ride = require('../models/ride');

const requestRide = (req, res) => {
  const { passengerId, pickup, drop, rideType } = req.body;

  if (!passengerId || !pickup || !drop || !rideType) {
    return res.status(400).json({ message: 'Missing required ride details' });
  }

  // Check if passenger exists and is valid
  const user = users.find(u => u.id === passengerId && u.type === 'passenger');
  if (!user) {
    return res.status(404).json({ message: 'Passenger not found' });
  }

  const rideId = rides.length + 1;
  const newRide = new Ride(rideId, passengerId, pickup, drop, rideType);
  rides.push(newRide);

  res.status(201).json({
    message: 'Ride requested successfully',
    ride: newRide
  });
};

module.exports = { requestRide };
