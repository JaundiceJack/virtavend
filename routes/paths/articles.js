// Import Libraries
const express = require('express');
const router = express.Router();
const { getArticles, getArticleDetails } =
  require('../actions/articlesController.js');

// GET: /api/articles/ | Retrieve the article links | Public
// POST: ... | Retrieve the posted link's details for a link preview | Public
router.route('/').get(getArticles).post(getArticleDetails);

module.exports = router;
