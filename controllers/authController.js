const { users } = require('../data/mockData');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { name, type, password } = req.body;

  if (!name || !type || !password) {
    return res.status(400).json({ message: 'Name, type, and password are required' });
  }

  const existingUser = users.find(u => u.name === name && u.type === type);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = users.length + 1;
  const newUser = new User(id, name, type, hashedPassword);
  users.push(newUser);

  res.status(201).json({
    message: 'Signup successful',
    userId: newUser.id,
    userType: newUser.type
  });
};

const login = async (req, res) => {
  const { name, type, password } = req.body;

  if (!name || !type || !password) {
    return res.status(400).json({ message: 'Name, type, and password are required' });
  }

  const user = users.find(u => u.name === name && u.type === type);

  if (!user) {
    return res.status(404).json({ message: 'User not found. Please sign up first.' });
  }

  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  res.status(200).json({
    message: 'Login successful',
    userId: user.id,
    userType: user.type
  });
};

module.exports = { signup, login };
