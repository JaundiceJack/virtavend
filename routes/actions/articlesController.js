const trycatch = require('express-async-handler');
const preview = require('link-preview-generator');
const Articles = require('../../models/Articles.js');

// GET: /api/articles/ | Retrieve the article links | Public
const getArticles = trycatch( async (req, res) => {
  const articles = await Articles.find();
  if (articles) { res.status(200).json(articles); }
  else { res.status(404); throw new Error("No articles here ¯\_(ツ)_/¯"); }
});

// POST: /api/articles/ | Retrieve the posted link's details for a link preview | Public
const getArticleDetails = trycatch( async (req, res) => {
  const article = await Articles.findOne({ link: req.body.link });
  if (article) {
    // If the article details have already been saved, respond with them
    if (article.img && article.description && article.title) {
      res.status(200).json(article);
    }
    // If not, use the link-preview-generator to get the link's details
    else {
      const details = await preview(article.link);
      if (details) {
        article.title = details.title;
        article.img = details.img;
        article.description = details.description;
        // Save the details for faster retrieval later, and respond with the article
        const savedArticle = await article.save();
        if (savedArticle) { res.status(200).json(savedArticle);
        } else { res.status(400); throw new Error("Unable to preview link."); }
      } else { res.status(400); throw new Error("Unable to preview link."); }
    }
  } else { res.status(404); throw new Error("No articles here ¯\_(ツ)_/¯")}
});

module.exports = { getArticles, getArticleDetails };
