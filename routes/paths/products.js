// Import Libraries
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getFeaturedProduct, getDealProduct } =
  require('../actions/productsController.js');

// GET: api/products/ | Retrieve all products | Public
router.route('/').get(getProducts);
// GET: api/products/featured | Retrieve the details for the featured product | Public
router.route('/featured').get(getFeaturedProduct);
// GET: api/products/deal | Retrieve the details for the product currently on sale | Public
router.route('/deal').get(getDealProduct);
// GET: api/products/productId | Get the details for the given product | Public
router.route('/:id').get(getProductById);

module.exports = router;
