// Import Libraries
const express = require('express');
const router = express.Router();
const { private, adminOnly } = require('../../middleware/authMW');
const {
  getUsers, getUser, updateUser, deleteUser,
  updateProduct, deleteProduct, createProduct,
  getAllOrders
} = require('../actions/adminController.js');

// GET: api/admin/users | get all users | private & adminOnly
// GET: api/admin/users/:id | get the user's information | private & adminOnly
// PUT: api/admin/users/:id | update the user's information | private & adminOnly
// DELETE: api/admin/users/:id | remove selected user | private & adminOnly
router.route('/users')
  .get(private, adminOnly, getUsers);
router.route('/users/:id')
  .get(private, adminOnly, getUser)
  .put(private, adminOnly, updateUser)
  .delete(private, adminOnly, deleteUser);

// POST: api/admin/products | create a new product | private & adminOnly
// PUT: api/admin/products/:id | edit the given product | private & adminOnly
// DELETE: api/admin/products/:id | remove the given product | private & adminOnly
router.route('/products')
  .post(private, adminOnly, createProduct);
router.route('/products/:id')
  .put(private, adminOnly, updateProduct)
  .delete(private, adminOnly, deleteProduct)

// GET: api/admin/orders | get all orders | private & adminOnly
router.route('/orders')
  .get(private, adminOnly, getAllOrders);

module.exports = router;
