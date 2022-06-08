const trycatch = require("express-async-handler");

// Create models
const Product = require("../../models/Product.js");

// GET: api/products/ | return all products | public
const getProducts = trycatch(async (req, res) => {
  const perPage = 9;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            description: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
        ],
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(perPage)
    .skip(perPage * (page - 1));
  res.json({ products, page, numPages: Math.ceil(count / perPage) });
});

// GET: api/products/id | get one product by id | public
const getProductById = trycatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Requested product not found.");
  }
});

// GET: api/products/featured | get the currently featured product | Public
const getFeaturedProduct = trycatch(async (req, res) => {
  const products = await Product.find();
  if (products && products.length > 0) {
    // For now just feature the first product
    res.json(products[0]);
  } else {
    res.status(404);
    throw new Error("Featured product not found.");
  }
});

// GET: api/products/deal | get the current product on sale | Public
const getDealProduct = trycatch(async (req, res) => {
  const products = await Product.find();
  if (products && products.length > 1) {
    // For now just show the second product
    res.json(products[1]);
  } else {
    res.status(404);
    throw new Error("No deals found.");
  }
});

// POST: api/products/:id/review | create/update the product's review | private
const createProductReview = trycatch(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    console.log("alreadyReviewed:", alreadyReviewed);
    if (!alreadyReviewed) {
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((total, item) => total + item.rating, 0) /
        product.numReviews;
      const reviewSaved = await product.save();
      if (reviewSaved) {
        res.status(201).json({ message: "Review created." });
      } else {
        res.status(400);
        throw new Error("Unable to save product review.");
      }
    } else {
      res.status(400);
      throw new Error("Item already reviewed.");
    }
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

module.exports = {
  getProducts,
  getProductById,
  getFeaturedProduct,
  getDealProduct,
  createProductReview,
};
