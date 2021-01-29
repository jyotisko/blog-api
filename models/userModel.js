const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'An user should have a username']
  },
  userID: {
    type: String,
    required: [true, 'A user must have a User ID'],
    unique: [true, 'Two users can\'t have the same userID!']
  },
  bio: {
    type: String,
    default: ''
  },
  profilePicUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;