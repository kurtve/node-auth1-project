const bcrypt = require('bcryptjs');
const express = require('express');

const usersModel = require('../users/users-model.js');

const router = express.Router();

// log in as an existing user
router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const [user] = await usersModel.findBy({ username });

    const isValid = await bcrypt.compare(password, user.password);

    if (user && isValid) {
      res.status(200).json({
        message: `Welcome ${user.username}!`,
      });
    } else {
      res.status(401).json({
        message: 'Invalid Credentials',
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
