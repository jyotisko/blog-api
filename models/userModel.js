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
    default: 'https://firebasestorage.googleapis.com/v0/b/blog-9603a.appspot.com/o/profile%2Fuser.png?alt=media&token=9c775745-ea96-4fc7-be7b-fb9d568482a9'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;