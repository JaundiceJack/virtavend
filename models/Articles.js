const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  link: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  img: { type: String },
}, { timestamps: true } );

const Article = mongoose.model('articles', articleSchema);

module.exports = Article;
