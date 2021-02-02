const mongoose = require('mongoose');

const bookmarksSchema = new mongoose.Schema({
  blogID: {
    type: String,
    required: [true, 'A bookmark should have a blog ID']
  },
  userID: {
    type: String,
    required: [true, 'A bookmark must have a User ID']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Bookmark = mongoose.model('Bookmark', bookmarksSchema)
module.exports = Bookmark;