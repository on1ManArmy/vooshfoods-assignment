const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
const signup = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request, Reason: Missing Field',
      error: null,
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        data: null,
        message: 'Email already exists.',
        error: null,
      });
    }

    const newUser = new User({ email, password: password, role: role });
    await newUser.save();

    res.status(201).json({
      status: 201,
      data: null,
      message: 'User created successfully.',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request, Reason: Missing Field',
      error: null,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'User not found.',
        error: null,
      });
    }

    const isPasswordValid = password === user.password;

    console.log("Password comparison result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: 401,
        data: null,
        message: 'Invalid credentials.',
        error: null,
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secretmine',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      status: 200,
      data: { token },
      message: 'Login successful.',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      data: null,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully.' });
};

module.exports = { signup, login, logout };
