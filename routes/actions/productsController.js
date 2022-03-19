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

// GET: api/products/featured | get the currently featured product | Public
const getFeaturedProduct = trycatch( async (req, res) => {
  const products = await Product.find();
  if (products && products.length > 0) {
    // For now just feature the first product
    res.json(products[0])
  }
  else { res.status(404); throw new Error("Featured product not found.")};
})

// GET: api/products/deal | get the current product on sale | Public
const getDealProduct = trycatch( async (req, res) => {
  const products = await Product.find();
  if (products && products.length > 1) {
    // For now just show the second product
    res.json(products[1])
  }
  else { res.status(404); throw new Error("No deals found.")};
})

module.exports = { getProducts, getProductById, getFeaturedProduct, getDealProduct };
