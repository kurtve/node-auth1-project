const bcrypt = require('bcryptjs');
const express = require('express');
const usersModel = require('./users-model');

const router = express.Router();

const restricted = () => {
  const errorMessage = {
    message: 'Invalid credentials',
  };

  return async (req, res, next) => {
    try {
      const { username, password } = req.headers;

      // make sure the values aren't empty
      if (!username || !password) {
        return res.status(401).json(errorMessage);
      }

      // make sure user exists in the database
      const [user] = await usersModel.findBy({ username });
      if (!user) {
        return res.status(401).json(errorMessage);
      }

      const isValid = await bcrypt.compare(password, user.password);
      // make sure password is correct
      if (!isValid) {
        return res.status(401).json(errorMessage);
      }

      // if we reach this point, the user is authenticated!
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.get('/', restricted(), async (req, res, next) => {
  try {
    const users = await usersModel.find();

    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
