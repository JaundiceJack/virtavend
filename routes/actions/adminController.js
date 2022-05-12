const trycatch = require('express-async-handler');
const genToken = require('../../jwt/generateToken.js');

// Create models
const User = require('../../models/User.js');
const Product = require('../../models/Product.js');

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

// POST: api/products/ | create a new product | private & adminOnly
const createProduct = trycatch( async (req, res) => {
  // Validate entry
  // Save product
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock
  });
  const savedProduct = await product.save();
  // Return it
  if (savedProduct) res.json(savedProduct)
  else { res.status(404); throw new Error("Unable to save new product.")}
});

// PUT: api/products/:id | update the product's information | private & adminOnly
const updateProduct = trycatch( async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.brand = req.body.brand || product.brand;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }
  else { res.status(404); throw new Error("Product not found.")}
});

// DELETE: api/products/id | remove a product by id | private & adminOnly
const deleteProduct = trycatch( async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed." });
  }
  else { res.status(404); throw new Error("Requested product not found."); };
});

module.exports = { getUsers, getUser, updateUser, deleteUser, updateProduct, deleteProduct };
