// Import Libraries
const express = require("express");
const router = express.Router();
const { private, adminOnly } = require("../../middleware/authMW");
const {
  getProducts,
  getProductById,
  getFeaturedProduct,
  getDealProduct,
  createProductReview,
} = require("../actions/productsController.js");

// GET: api/products/featured | Retrieve the details for the featured product | Public
router.route("/featured").get(getFeaturedProduct);
// GET: api/products/deal | Retrieve the details for the product currently on sale | Public
router.route("/deal").get(getDealProduct);
// POST: api/products/:id/review | create/update the product's review | private
router.route("/:id/review").post(private, createProductReview);
// GET: api/products/productId | Get the details for the given product | Public
router.route("/:id").get(getProductById);
// POST: api/products/search | Use a post-body with keyword/page/categories to get products | Public
router.route("/search").post(getProducts);

module.exports = router;
