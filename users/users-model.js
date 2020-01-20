const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

// get all users
const find = async () => {
  const users = await db('users').select('id', 'username');
  return users;
};

// get users, using the passed filter criteria
const findBy = async filter => {
  const users = await db('users')
    .where(filter)
    .select('id', 'username', 'password');
  return users;
};

// get a single user by user Id
const findById = async id => {
  const user = await db('users')
    .where({ id })
    .first('id', 'username');
  return user;
};

// add user to database, after hashing password
const add = async user => {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db('users').insert(user);
  return findById(id);
};

module.exports = {
  add,
  find,
  findBy,
  findById,
};
