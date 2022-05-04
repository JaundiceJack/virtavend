// Import Libraries
const express = require('express');
const router = express.Router();
const { private, adminOnly } = require('../../middleware/authMW');
const { loginUser, getProfile, updateProfile, registerUser }
  = require('../actions/userController.js');
const { getUsers, getUser, updateUser, deleteUser }
  = require('../actions/adminController.js');

// POST api/user | create a new user | public
// GET: api/user | get all users | private & adminOnly
router.route('/')
  .post(registerUser)
  .get(private, adminOnly, getUsers);
// POST: api/user/login | authorize user & get token | public
router.route('/login')
  .post(loginUser);
// GET: api/user/profile | get the user's information | private
// PUT: api/user/profile | update the user's information | private
router.route('/profile')
  .get(private, getProfile)
  .put(private, updateProfile);
// GET: api/user/:id | get the user's information | private & adminOnly
// PUT: api/user/:id | update the user's information | private & adminOnly
// DELETE: api/user/:id | remove selected user | private & adminOnly
router.route('/:id')
  .get(private, adminOnly, getUser)
  .put(private, adminOnly, updateUser)
  .delete(private, adminOnly, deleteUser);

module.exports = router;
