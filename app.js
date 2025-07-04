const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const rideRoutes = require('./routes/rideRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/rides', rideRoutes);
app.use('/api/auth', authRoutes);

// Optional root route
app.get('/', (req, res) => {
  res.send('Jeeny Ride Booking Backend is running');
});

module.exports = app;
