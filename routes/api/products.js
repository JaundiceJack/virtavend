// Import Libraries
const express = require('express');
const mongoose = require('mongoose');
const trycatch = require('express-async-handler');
const router = express.Router();

// Create models
const Product = mongoose.connection.model(
  'product', require('../../schemas/Product.js'));

// GET: api/products/ | return all products | public
router.get('/', trycatch(async (req, res) => {
  const products = await Product.find();
  res.json(products);
}));

// GET: api/products/id | get one product by id | public
router.get('/:id', trycatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) { res.json(product); }
  else {
    res.status(404);
    throw new Error("Requested product not found.");
  };
}));

module.exports = router;
