const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const db = require('../config/db');

// Controller function to register a new user
const registerUser = (req, res) => {
  const { name, email, password, state, category, qualification, income } = req.body;

  if (!name || !email || !password || !state || !category || !qualification || !income) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  UserModel.findUserByEmail(email, (err, existingUser) => {
    if (err) return res.status(500).json({ message: 'Error checking email', error: err });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: 'Error hashing password', error: err });

      UserModel.createUser(name, email, hashedPassword, state, category, qualification, income, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error registering user', error: err });

        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
      });
    });
  });
};


// Controller function to login a user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  UserModel.findUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user.id;
    req.session.userName = user.name;

    res.json({ message: 'Login successful' });
  });
};

// Controller function to get user by email
const getUserByEmail = (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  UserModel.findUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });
};

// Controller function to get all users with blog count
const getAllUsers = (req, res) => {
  UserModel.getAllUsersWithBlogCount((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users', error: err });
    }
    res.json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  UserModel.findUserById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving user', error: err });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });
};

const getUserInfo = (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'User not logged in' });
  }

  const query = 'SELECT name, email, state, category, qualification, income FROM users WHERE id = ?';

  db.query(query, [req.session.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user info', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    res.json(user);
  });
};




module.exports = {
  getUserInfo,
  getUserById,
  registerUser,
  getUserByEmail,
  getAllUsers,
  loginUser,
};
