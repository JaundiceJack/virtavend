// Import Libraries
const express = require('express');
const router = express.Router();
const { private, adminOnly } = require('../../middleware/authMW');
const { loginUser, getProfile, updateProfile, registerUser, validateToken }
  = require('../actions/userController.js');

// POST api/user | create a new user | public
router.route('/')
  .post(registerUser)
// POST: api/user/login | authorize user & get token | public
router.route('/login')
  .post(loginUser);
// GET: api/user/profile | get the user's information | private
// PUT: api/user/profile | update the user's information | private
router.route('/profile')
  .get(private, getProfile)
  .put(private, updateProfile);
// POST: api/user/validate | validate the given token | private
router.route('/validate')
  .post(private, validateToken);

module.exports = router;
