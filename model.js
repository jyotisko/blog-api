const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'A blog must have an author.']
  },
  body: {
    type: String,
    required: [true, 'A blog must have some content.']
  },
  title: {
    type: String,
    required: [true, 'A blog must have a title']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;