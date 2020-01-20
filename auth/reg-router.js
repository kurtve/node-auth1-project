const bcrypt = require('bcryptjs');
const express = require('express');

const usersModel = require('../users/users-model.js');

const router = express.Router();

// register a new user
router.post('/', async (req, res, next) => {
  try {
    // try to add the user
    const newUser = await usersModel.add(req.body);
    // if it was successful...
    res.status(201).json(newUser);
  } catch (err) {
    // otherwise
    next(err);
  }
});

module.exports = router;
