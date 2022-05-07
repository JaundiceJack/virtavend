// Import Libraries
const express = require('express');
const router = express.Router();
const { private, adminOnly } = require('../../middleware/authMW');
const { getProducts, getProductById, getFeaturedProduct, getDealProduct } =
  require('../actions/productsController.js');
const { deleteProduct, updateProduct } = require('../actions/adminController');

// GET: api/products/ | Retrieve all products | Public
router.route('/')
  .get(getProducts);
// GET: api/products/featured | Retrieve the details for the featured product | Public
router.route('/featured')
  .get(getFeaturedProduct);
// GET: api/products/deal | Retrieve the details for the product currently on sale | Public
router.route('/deal')
  .get(getDealProduct);
// GET: api/products/productId | Get the details for the given product | Public
router.route('/:id')
  .get(getProductById)
  .put(private, adminOnly, updateProduct)
  .delete(private, adminOnly, deleteProduct);

module.exports = router;
