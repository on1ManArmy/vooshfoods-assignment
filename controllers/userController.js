const User = require('../models/User');
const bcrypt = require('bcryptjs');

const addUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request: Missing required fields.',
      error: null,
    });
  }

  if (role === 'admin') {
    return res.status(403).json({
      status: 403,
      data: null,
      message: 'Forbidden: Cannot create user with admin role.',
      error: null,
    });
  }

  if (!['editor', 'viewer'].includes(role)) {
    return res.status(400).json({
      status: 400,
      data: null,
      message: 'Bad Request: Invalid role. Only "editor" or "viewer" allowed.',
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

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

const getUsers = async (req, res) => {
  try {
    const { limit = 5, offset = 0, role } = req.query; 

    // Build query for getting users based on role if provided
    const query = role ? { role: role } : {};

    const users = await User.find(query)
      .skip(Number(offset)) 
      .limit(Number(limit)); 

    res.status(200).json({
      status: 200,
      data: users,
      message: 'Users retrieved successfully.',
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

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: 404,
        data: null,
        message: 'User not found.',
        error: null,
      });
    }

    res.status(200).json({
      status: 200,
      data: null,
      message: 'User deleted successfully.',
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

const updatePassword = async (req, res) => {
    const { old_password, new_password } = req.body;
    const userId = req.user._id
    console.log("Userid: ", userId)
    // Validate input
    if (!old_password || !new_password) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: 'Bad Request, Reason: Missing fields.',
        error: null,
      });
    }
  
    try {
      // Find user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          status: 404,
          data: null,
          message: 'User not found.',
          error: null,
        });
      }
  
      // Compare old password with stored password
      if (old_password !== user.password) {
        return res.status(403).json({
          status: 403,
          data: null,
          message: 'Current password is incorrect.',
          error: null,
        });
      }
  
      user.password = new_password;
  
      await user.save();
  
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({
        status: 500,
        data: null,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  };
  

module.exports = { addUser, getUsers, deleteUser, updatePassword };
