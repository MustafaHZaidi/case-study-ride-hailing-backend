const User = require('../models/User');

let users = [
  new User(1, 'Amna', 'passenger'),
  new User(2, 'Bilal', 'driver'),
  new User(3, 'Fatima', 'passenger')
];

let rides = [];

module.exports = { users, rides };
