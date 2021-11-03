const trycatch = require('express-async-handler');

// Create models
const Product =  require('../../models/Product.js');

// GET: api/products/ | return all products | public
const getProducts = trycatch( async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET: api/products/id | get one product by id | public
const getProductById = trycatch( async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) { res.json(product); }
  else {
    res.status(404);
    throw new Error("Requested product not found.");
  };
});

module.exports = { getProducts, getProductById };
