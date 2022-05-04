const trycatch = require('express-async-handler');
const genToken = require('../../jwt/generateToken.js');

// Create models
const User = require('../../models/User.js');

// GET: api/user | get all users | private & adminOnly
const getUsers = trycatch( async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.json(users);
  }
  else { res.status(404); throw new Error("User not found.")}
});

// GET: api/user/:id | get the user's information | private & adminOnly
const getUser = trycatch( async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  }
  else { res.status(404); throw new Error("User not found.")}
});

// PUT: api/user/:id | update the user's information | private & adminOnly
const updateUser = trycatch( async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });
  }
  else { res.status(404); throw new Error("User not found.")}
});

// DELETE: api/user/:id | remove selected user | private & adminOnly
const deleteUser = trycatch( async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed."});
  }
  else { res.status(404); throw new Error("User not found.")}
});

module.exports = { getUsers, getUser, updateUser, deleteUser };
